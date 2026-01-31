import { test as base } from '@playwright/test';
import { users } from './testdata/users';

import { Cart } from './page-objects/cart';
import { CheckoutComplete } from './page-objects/checkout-complete';
import { CheckoutOverview } from './page-objects/checkout-overview';
import { InventoryItemPage } from './page-objects/inventory-item';
import { InventoryPage } from './page-objects/inventory';
import { LoginPage } from './page-objects/login';
import { ShippingInformations } from './page-objects/shipping-informations';

interface PageFixtures {
  cartPage: Cart;
  checkoutCompletePage: CheckoutComplete;
  checkoutOverviewPage: CheckoutOverview;
  inventoryItemPage: InventoryItemPage;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  shippingInformationsPage: ShippingInformations;
}

type UserData = (typeof users)[keyof typeof users];
interface UtilFixtures {
  login: (userData: UserData) => Promise<void>;
}

export const test = base.extend<PageFixtures & UtilFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new Cart(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutComplete(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverview(page));
  },
  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  shippingInformationsPage: async ({ page }, use) => {
    await use(new ShippingInformations(page));
  },

  login: async ({ page, loginPage }, use) => {
    await use(async function ({ username, password }: UserData) {
      await page.goto('/');
      await loginPage.usernameInput.fill(username);
      await loginPage.passwordInput.fill(password);
      await loginPage.loginButton.click();
    });
  },
});
