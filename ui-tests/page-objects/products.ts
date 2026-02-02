import { BasePage } from './base';
import { ProductTile } from './components/product-container';
import { LoggedInNavigation } from './logged-in-navigation';

export class ProductsController extends BasePage {
  readonly navigation = new LoggedInNavigation(this.page, 'Cart');
  readonly productComponent = new ProductTile(this.page);
  readonly goToCheckoutButton = this.page.getByRole('button', {
    name: 'Checkout',
  });
  readonly removeFromCartButton = this.page.getByRole('button', {
    name: 'Remove',
  });
  async goToCheckout() {
    await this.goToCheckoutButton.click();
  }
  async removeItem(productName: string) {
    await this.productComponent
      .getProduct(productName)
      .locator(this.removeFromCartButton)
      .click();
  }
}
