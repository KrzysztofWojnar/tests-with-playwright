import { BasePage } from './base';
import { LoggedInNavigation } from './logged-in-navigation';

export class ShippingInformations extends BasePage {
  readonly navigation = new LoggedInNavigation(
    this.page,
    'Checkout: Your Information'
  );
  readonly firstNameInput = this.page.getByRole('textbox', {
    name: 'First Name',
  });
  readonly lastNameInput = this.page.getByRole('textbox', {
    name: 'Last Name',
  });
  readonly postalCodeInput = this.page.getByRole('textbox', {
    name: 'Zip/Postal Code',
  });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });

  async fillShippingInformations(shippingData: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.firstNameInput.fill(shippingData.firstName);
    await this.lastNameInput.fill(shippingData.lastName);
    await this.postalCodeInput.fill(shippingData.postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
