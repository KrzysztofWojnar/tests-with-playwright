import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { users } from '../test-data/users';
import { defaultShippingData } from '../test-data/default-shipping-data';

const allProducts = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
] as const;

test.describe('ui scenarios', () => {
  test('happy path', async ({
    login,
    inventoryPage,
    cartPage,
    shippingInformationsPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await test.step('Log in as a standard user', () => login(users.standard));
    await test.step('Add all items to the cart', async () => {
      await expect(inventoryPage.navigation.heading).toBeVisible();
      for (const productName of allProducts) {
        await inventoryPage.addToCart(productName);
      }
      await expect(cartPage.navigation.cartQtyBadge).toHaveText(
        String(allProducts.length)
      );
      await expect(inventoryPage.removeFromCartButton).toHaveCount(
        allProducts.length
      );
    });

    await test.step('Go to the cart', async () => {
      await inventoryPage.navigation.goToCart();
      await expect(cartPage.navigation.heading).toBeVisible();
    });

    const removedElement =
      await test.step('Find third item and remove it from the cart', async () => {
        const elementToRemove = allProducts[2];
        await cartPage.removeItem(elementToRemove);
        return elementToRemove;
      });
    const updatedProducts = allProducts.toSpliced(2, 1);

    await test.step('Validate in the Checkout Overview that it only contains the items that you want to purchase, as well as the total count of items', async () => {
      await expect(cartPage.navigation.cartQtyBadge).toHaveText(
        String(updatedProducts.length)
      );
      await cartPage.goToCheckout();
      await expect(shippingInformationsPage.navigation.heading).toBeVisible();
      await shippingInformationsPage.fillShippingInformations(
        defaultShippingData
      );
      await shippingInformationsPage.clickContinue();
      await Promise.all(
        updatedProducts.map(productName =>
          expect
            .soft(checkoutOverviewPage.productComponent.getProduct(productName))
            .toBeVisible()
        )
      );
      expect(test.info().errors).toHaveLength(0);
      await expect(
        checkoutOverviewPage.productComponent.getProduct(removedElement)
      ).toBeHidden();
    });

    await test.step('Finish the purchase', async () => {
      await checkoutOverviewPage.submit();
      await expect(checkoutCompletePage.navigation.heading).toBeVisible();
    });

    await test.step('Validate that the website confirms the order', async () => {
      await expect(checkoutCompletePage.successHeader).toBeVisible();
      await expect(checkoutCompletePage.successMessage).toBeVisible();
    });
  });

  test('validate item in cart', async ({
    login,
    cartPage,
    inventoryPage,
    inventoryItemPage,
  }) => {
    await test.step('Log in as a problem user', () => login(users.problem));
    const itemToAdd = allProducts[1];
    await test.step('Find one item by name, click on the item', async () => {
      await expect(inventoryPage.navigation.heading).toBeVisible();
      await inventoryPage.goToProductDetails(itemToAdd);
      await expect(inventoryItemPage.navigation.heading).toBeVisible();
    });

    await test.step('Add this product to the cart from item page', async () => {
      test.fail(true, 'Known bug related to the problem_user');
      await inventoryItemPage.addItem();
      await expect(inventoryItemPage.navigation.cartQtyBadge).toHaveText('1');
    });

    await test.step('Go to the cart', async () => {
      await inventoryItemPage.navigation.goToCart();
      await expect(cartPage.navigation.heading).toBeVisible();
    });

    await test.step('Validate that item was added', async () => {
      await expect(
        cartPage.productComponent.getProduct(itemToAdd)
      ).toBeVisible();
    });
  });
  test('sorting', async ({ login, inventoryPage }) => {
    await test.step('Log in as a standard user', () => login(users.standard));
    await test.step('Sort products by name', async () => {
      await expect(inventoryPage.navigation.heading).toBeVisible();
      await inventoryPage.selectSorting('Price (low to high)'); // sorting by name is the default option, so let's change the sorting rules first
      await inventoryPage.selectSorting('Name (A to Z)');
    });
    await test.step('Validate that items sorted as expected', async () => {
      const sorted = [...allProducts].toSorted(); // redundant as the elements are actually sorted. Kept for readibility
      const actualProductsOrder =
        await inventoryPage.productComponent.productName.allInnerTexts();
      expect(actualProductsOrder).toEqual(sorted);
    });
  });
  test('locked user', async ({ login, loginPage }) => {
    await test.step('Log in as a locked user', () => login(users.locked));
    await test.step('Validate that login failed ', () =>
      expect(loginPage.lockedUserAlert).toBeVisible());
  });
});
