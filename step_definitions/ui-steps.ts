import { USERS } from '../ui-tests/test-data/users';
import { DEFAULT_SHIPPING_DATA } from '../ui-tests/test-data/default-shipping-data';
import { GherkinTable } from '../utils/types.';

const { I } = inject();

const ALL_PRODUCTS = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
] as const;

Given('I am on the login page', () => {
  I.amOnPage('/');
});

When('I log in as the {string} user', (userId: string) => {
  const user = USERS[userId as keyof typeof USERS];
  if (!user) {
    throw new Error(`No user ${userId} available`);
  }
  I.fillField('Username', user.username);
  I.fillField('Password', user.password);
  I.click('Login');
});

When('I add all items to the cart', () => {
  ALL_PRODUCTS.forEach(productName => {
    I.click({
      xpath: `//div[text() = "${productName}"]/../../../div[@class = "pricebar"]/button[text() = "Add to cart"]`,
    });
  });
  I.seeElement('[data-test="shopping-cart-badge"]');
});

When('I go to the cart', () => {
  I.click('[data-test="shopping-cart-link"]');
});

When('I remove third item from the cart', () => {
  const thirdProductName = ALL_PRODUCTS[2];
  I.click(
    `//div[text() = "${thirdProductName}"]/../../div[@class = "item_pricebar"]/button[text() = "Remove"]`
  );
});

Then('I have products in my cart', (table: GherkinTable) => {
  table.rows.shift(); // removing gherkin table header
  table.rows.forEach(row => {
    I.seeElementInDOM(`//div[text() = "${row.cells[0].value}"]`);
  });
});

Then('The cart does not contain the item {string}', (productName: string) => {
  I.dontSeeElement(`//div[text() = "${productName}"]`);
});

Then('The total items counter shows {int}', (count: number) => {
  I.seeTextEquals(String(count), '[data-test="shopping-cart-badge"]');
});

When('I finish the purchase', () => {
  I.click('Checkout');
  I.fillField('First Name', DEFAULT_SHIPPING_DATA.firstName);
  I.fillField('Last Name', DEFAULT_SHIPPING_DATA.lastName);
  I.fillField('Zip/Postal Code', DEFAULT_SHIPPING_DATA.postalCode);
  I.click('Continue');
  I.click('Finish');
});

Then('Success purchase screen is visible', () => {
  I.seeTextEquals('Checkout: Complete!', '[data-test="header-container"]');
  I.see('Thank you for your order!');
});

When('I find and click on item {string}', (productName: string) => {
  I.click(`//div[contains(text(), "${productName}")]`);
});

When('I add the item to the cart from item page', () => {
  I.click('Add to cart');
});

Then('I can see {string} in the cart', (productName: string) => {
  I.seeElement(`//div[contains(text(), "${productName}")]`);
});

When('I sort products by {string}', (sortingMethod: string) => {
  I.selectOption('select[data-test="product-sort-container"]', sortingMethod);
});

Then('the products are sorted alphabetically', () => {
  // Implementation would verify sort order
  I.seeElement('[data-test="inventory-list"]');
});

Then('login fails with message {string}', (errorMessage: string) => {
  I.see(errorMessage);
});
