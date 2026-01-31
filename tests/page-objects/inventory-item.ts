import { BasePage } from './base';
import { LoggedInNavigation } from './logged-in-navigation';

export class InventoryItemPage extends BasePage {
  readonly navigation = new LoggedInNavigation(this.page, 'Back to products');
  private readonly addItemToCartButton = this.page.getByRole('button', {
    name: 'Add to cart',
  });
  async addItem() {
    await this.addItemToCartButton.click();
  }
}
