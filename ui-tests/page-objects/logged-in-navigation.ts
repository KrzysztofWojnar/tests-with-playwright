import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base';

/**
 * This page object represents navigation elements available after logging in.
 */
export class LoggedInNavigation extends BasePage {
  readonly heading: Locator;
  readonly goToCartLink = this.page.getByTestId('shopping-cart-link');
  readonly cartQtyBadge = this.page.getByTestId('shopping-cart-badge');

  constructor(page: Page, pageName: string) {
    super(page);
    this.heading = this.page
      .getByTestId('header-container')
      .getByText(pageName);
  }
  async goToCart() {
    await this.goToCartLink.click();
  }
}
