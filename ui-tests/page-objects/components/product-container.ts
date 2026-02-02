import { BasePage } from '../base';

export class ProductTile extends BasePage {
  private readonly inventoryItem = this.page.getByTestId('inventory-item');
  readonly productName = this.inventoryItem.getByTestId('inventory-item-name');
  getProduct(productName: string) {
    return this.inventoryItem.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }
}
