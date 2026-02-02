import { test as base } from '@playwright/test';

import { ProductsController } from './controllers/products';

interface ControllerFixtures {
  productsController: ProductsController;
}

export const test = base.extend<ControllerFixtures>({
  productsController: async ({ request }, use) => {
    await use(new ProductsController(request));
  },
});
