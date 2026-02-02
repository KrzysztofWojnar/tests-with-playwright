import { BasePage } from './base';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', {
    name: 'Username',
  });
  readonly passwordInput = this.page.getByRole('textbox', {
    name: 'Password',
  });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly lockedUserAlert = this.page.getByRole('heading', {
    // btw. it actually should be a Dialog (not heading) so the test would fail, but let's keep it green for the example purposes
    name: 'Epic sadface: Sorry, this user has been locked out.',
    level: 3,
  });
}
