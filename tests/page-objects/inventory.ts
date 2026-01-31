import { BasePage } from './base';
import { ProductTile } from './components/product-container';
import { LoggedInNavigation } from './logged-in-navigation';

type ValidSortingMethods =
  | 'Name (A to Z)'
  | 'Name (Z to A)'
  | 'Price (low to high)'
  | 'Price (high to low)';

export class InventoryPage extends BasePage {
  readonly removeFromCartButton = this.page.getByRole('button', {
    name: 'Remove',
  });
  readonly navigation = new LoggedInNavigation(this.page, 'Products');
  readonly productComponent = new ProductTile(this.page);
  private readonly addToCartButton = this.page.getByRole('button', {
    name: 'Add to cart',
  });
  private readonly sortingSelect = this.page
    .getByTestId('secondary-header')
    .getByRole('combobox');

  async addToCart(productToAdd: string) {
    await this.productComponent
      .getProduct(productToAdd)
      .locator(this.addToCartButton)
      .click({ force: true });
  }

  async goToProductDetails(productToAdd: string) {
    await this.productComponent
      .getProduct(productToAdd)
      .getByText(productToAdd, { exact: true })
      .click();
  }

  async selectSorting(sortingMethodToSelect: ValidSortingMethods) {
    await this.sortingSelect.selectOption({ label: sortingMethodToSelect });
  }
}
