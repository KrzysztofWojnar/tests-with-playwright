// import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { Product, Products } from '../models/products';
import { NO_RESOURCES_LIMIT } from '../utils/dummy-json-url-params/limiting-resources';
import { saveTestInfo } from '../utils/test-info-logger';

test.describe('REST API Scenarios', () => {
  test('Get all products', async ({ productsController }) => {
    const allProductsResponse =
      await test.step('Get a list of all products', async () =>
        productsController.getProductList({ params: NO_RESOURCES_LIMIT }));
    const allProducts =
      await test.step('Validate that request was successful', async () => {
        await expect(allProductsResponse).toBeOK();
        const responseBody = await allProductsResponse.json();
        const allProducts = Products.parse(responseBody);
        expect(allProducts.limit).toBe(allProducts.total);
        return allProducts;
      });
    await test.step('Print titles of products with odd ID numbers to console or to test report', async () => {
      const isOddId = (product: { id: number }) => product.id % 2;
      await saveTestInfo(
        allProducts.products.filter(isOddId).map(product => product.title).join('\n')
      );
    });
  });
  test('Create a product', async ({ productsController }) => {
    const productToCreate = {
      title: 'Chałwa',
      description: 'W życiu nie ma nic za friko, nawet chałwa za 2 ziko.',
      price: 1.99,
      brand: 'Skawa',
    };
    const createdProductResponse =
      await test.step('Create a new product with required properties', () =>
        productsController.createProduct(productToCreate));
    const createdProduct =
      await test.step('Validate that request was successful', async () => {
        expect(createdProductResponse).toBeOK();
        const responseBody = await createdProductResponse.json();
        const createdProduct = Product.parse(responseBody);
        return createdProduct;
      });
    test.step('Validate response data', () => {
      expect(createdProduct.id).toBeGreaterThanOrEqual(0);
      expect(createdProduct).toMatchObject(productToCreate);
    });
  });
  test('Update a product', async ({ productsController }) => {
    const productIdToUpdate = 3;
    const productToUpdate =
      await test.step(`Get data for ${productIdToUpdate}. product`, async () => {
        const productResponse =
          await productsController.getProduct(productIdToUpdate);
        expect(productResponse).toBeOK();
        const createdProduct = await productResponse.json();
        return createdProduct;
      });

    const newPrice = productToUpdate.price + 1;
    const updateRequest = await test.step('Update the product', () =>
      productsController.updateProduct(productIdToUpdate, { price: newPrice }));

    await test.step('Validate that the update was successful', () =>
      expect(updateRequest).toBeOK());
    await test.step('Validate that the response data matches the product data from step 1 where applicable', async () => {
      const { price, ...oldValues } = await updateRequest.json();
      expect(price).toBe(newPrice);
      expect(productToUpdate).toMatchObject(oldValues);
    });
  });

  [0, 5000, 6000].forEach(delayMiliseconds =>
    test(`Get a product with ${delayMiliseconds} miliseconds delay`, async ({
      productsController,
    }) => {
      test.fail(1000 < delayMiliseconds, 'the requirements are contradictory');
      test.fail(
        5000 < delayMiliseconds,
        'Delay cannot be greater than 5 seconds for DummyJSON service'
      );
      const allProductsResponse =
        await test.step('Get a list of all products with 1000 ms timeout', () =>
          productsController.getProductList({
            timeout: 1000,
            params: { delay: delayMiliseconds, ...NO_RESOURCES_LIMIT },
          }));
      await test.step('Validate that request was successful', async () => {
        await expect(allProductsResponse).toBeOK();
        const responseBody = await allProductsResponse.json();
        const allProducts = Products.parse(responseBody);
        return allProducts;
      });
    })
  );
});
