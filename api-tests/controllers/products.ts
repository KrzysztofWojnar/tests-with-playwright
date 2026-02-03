import { BaseController } from './base';
import type { DummyJsonSearchParams } from '../utils/dummy-json-url-params';
import { APIRequestContext } from '@playwright/test';

type ProductFields = {
  title: string;
  description?: string;
  price?: number;
  brand?: string;
};
type PlaywrightGetOptions = Parameters<APIRequestContext['get']>[1];

export class ProductsController extends BaseController {
  readonly endpoint = '/products';
  async getProductList(
    options: PlaywrightGetOptions & { params: DummyJsonSearchParams } = {
      params: {},
    }
  ) {
    return await this.apiRequestContext.get(this.endpoint, options);
  }
  async getProduct(
    id: number,
    options: PlaywrightGetOptions & { params: DummyJsonSearchParams } = {
      params: {},
    }
  ) {
    return await this.apiRequestContext.get(this.endpoint + '/' + id, options);
  }
  async createProduct(properties: ProductFields) {
    return await this.apiRequestContext.post(this.endpoint + '/add', {
      data: properties,
    });
  }
  async updateProduct(id: number, valuesToUpdate: Partial<ProductFields>) {
    return await this.apiRequestContext.patch(this.endpoint + '/' + id, {
      data: valuesToUpdate,
    });
  }
}
