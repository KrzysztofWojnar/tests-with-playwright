import { BasePage } from './base';
import { ProductTile } from './components/product-container';
import { LoggedInNavigation } from './logged-in-navigation';

export class CheckoutOverview extends BasePage {
  readonly navigation = new LoggedInNavigation(this.page, 'Checkout: Overview');
  readonly productComponent = new ProductTile(this.page);
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  async submit() {
    await this.finishButton.click();
  }
}
