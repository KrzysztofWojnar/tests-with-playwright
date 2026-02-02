import { APIRequestContext } from '@playwright/test';

export class BaseController {
  constructor(protected readonly apiRequestContext: APIRequestContext) {
    apiRequestContext.post('');
  }
}
