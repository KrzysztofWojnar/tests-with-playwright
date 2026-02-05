import { expect } from '@playwright/test';
import { Product, Products } from '../api-tests/models/products';
import { GherkinTable } from '../utils/types.';

const { I } = inject() as any;

let lastResponse: any;
let lastProduct: any;
let productToUpdate: any;
let lastResponseTime = 0;

When('I request all products with no limit', async () => {
  lastResponse = await I.sendGetRequest('/products?limit=0');
});

Then('the request was successful', () => {
  const status = lastResponse?.status;
  if (!status) {
    throw new Error(
      "Failed to get the last response's status.\nLast response:\n" +
        JSON.stringify(lastResponse)
    );
  }
  expect(status).toBeLessThan(300);
  expect(status).toBeGreaterThanOrEqual(200);
});

Then(
  'I print titles of products with odd ID numbers to console or to test report',
  () => {
    const data = lastResponse?.data;
    if (!data) {
      throw new Error(
        "Failed to get the last response's data.\nLast response:\n" +
          JSON.stringify(lastResponse)
      );
    }
    const allProducts = Products.parse(data);
    const isOddId = (product: { id: number }) => product.id % 2;
    const oddIdProducts = allProducts.products
      .filter(isOddId)
      .map(product => product.title)
      .join('\n');

    console.log('Products with odd IDs:', oddIdProducts);
  }
);

When(
  'I create a product with the following data:',
  async (table: GherkinTable) => {
    const productData: Record<string, string | number> = {};
    table.rows.shift(); // removing gherkin table header
    table.rows.forEach(row => {
      const [key, value] = row.cells.map(cell => cell.value);
      productData[key] = key === 'price' ? Number(value as string) : value;
    });
    lastProduct = productData;
    lastResponse = await I.sendPostRequest('/products/add', productData);
  }
);

Then('the created product has a valid id', () => {
  const data = lastResponse?.data;
  if (!data) {
    throw new Error(
      "Failed to get the last response's data.\nLast response:\n" +
        JSON.stringify(lastResponse)
    );
  }
  expect(data.id).toBeGreaterThanOrEqual(0);
});

Then('the product data matches what was sent', () => {
  const data = lastResponse?.data;
  if (!data) {
    throw new Error(
      "Failed to get the last response's data.\nLast response:\n" +
        JSON.stringify(lastResponse)
    );
  }
  const createdProduct = Product.parse(data);
  expect(createdProduct).toMatchObject(lastProduct);
});

When('I get product with ID {int}', async (productId: number) => {
  lastResponse = await I.sendGetRequest(`/products/${productId}`);
  const data = lastResponse?.data;
  productToUpdate = data;
});

When('I update the product price by {int}', async (priceIncrease: number) => {
  const newPrice = productToUpdate.price + priceIncrease;
  lastResponse = await I.sendPutRequest(`/products/${productToUpdate.id}`, {
    price: newPrice,
  });
});

Then('the product price was updated correctly', () => {
  const data = lastResponse?.data;
  if (!data) {
    throw new Error(
      "Failed to get the last response's data.\nLast response:\n" +
        JSON.stringify(lastResponse)
    );
  }
  expect(data.price).toBe(productToUpdate.price + 1);
});

When('I request all products with delay {int}', async (delay: number) => {
  const start = Date.now();
  lastResponse = await I.sendGetRequest(`/products?delay=${delay}&limit=0`);
  lastResponseTime = Date.now() - start;
});

Then('the response time is no longer than 1000 milliseconds', () => {
  expect(lastResponseTime).toBeLessThanOrEqual(1000);
});
