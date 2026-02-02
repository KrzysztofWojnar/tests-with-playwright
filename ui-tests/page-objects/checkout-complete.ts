import { BasePage } from './base';
import { LoggedInNavigation } from './logged-in-navigation';

export class CheckoutComplete extends BasePage {
  readonly navigation = new LoggedInNavigation(
    this.page,
    'Checkout: Complete!'
  );
  readonly successHeader = this.page.getByRole('heading', {
    level: 2,
    name: 'Thank you for your order!',
  });
  readonly successMessage = this.page.getByText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  );
}
