import axios, { AxiosStatic } from 'axios';
import { ApiError } from '@/types/customError';

export default class ApiService {
  client: AxiosStatic;

  constructor() {
    this.client = axios;
    this.client.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
  }

  setAuthHeader(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeAuthHeader() {
    delete this.client.defaults.headers.common.Authorization;
  }

  query(resource: string, params: object) {
    try {
      return this.client.get(resource, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  get(resource: string, slug: string | number) {
    try {
      return this.client.get(`${resource}/${slug}`);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  post(resource: string, params: object) {
    return this.client.post(`${resource}`, params);
  }

  update(resource: string, params: object) {
    try {
      return this.client.put(resource, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  put(resource: string, params: object) {
    try {
      return this.client.put(`${resource}`, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  delete(resource: string, slug: string | number) {
    return this.client.delete(`${resource}/${slug}`).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  }
}
export class ServicesService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'service';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number) {
    return this.apiService.get(this.resource, slug);
  }

  getByCompanyID(slug: number | string) {
    return this.apiService.get(this.resource, `company/${slug}`);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class ImageService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'image';
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class CompanyService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'company';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  getBySlug(slug: string) {
    return this.apiService.get(this.resource, `slug/${slug}`);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class StaffService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'staff';
  }

  query(slug: number, params: object) {
    return this.apiService.query(`${this.resource}/${slug.toString()}`, {
      params,
    });
  }

  get(slug: number) {
    return this.apiService.get(this.resource, slug);
  }

  getByCompanyID(slug: number | string) {
    return this.apiService.get(this.resource, `company/${slug}`);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class AppointmentService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'appointment';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  getByCustomerID(slug: number) {
    return this.apiService.get(this.resource, `customer/${slug}`);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class FaqService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'faq';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}

export class PaymentService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'payment';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class ContactService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'contact';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class CustomerService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'customer';
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number) {
    return this.apiService.get(this.resource, slug);
  }

  create(params: object) {
    return this.apiService.post(this.resource, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
export class AuthService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'auth';
  }

  setAuthHeader(token: string) {
    this.apiService.setAuthHeader(token);
  }

  removeAuthHeader() {
    this.apiService.removeAuthHeader();
  }

  query(params: object) {
    return this.apiService.query(this.resource, {
      params,
    });
  }

  get(slug: number | string) {
    return this.apiService.get(this.resource, slug);
  }

  create(params: object) {
    return this.apiService.post(`${this.resource}/register`, params);
  }

  login(params: object) {
    return this.apiService.post(`${this.resource}/login`, params);
  }

  resetPassword(params: object) {
    return this.apiService.post(`${this.resource}/reset-password`, params);
  }

  changePassword(params: object) {
    return this.apiService.post(`${this.resource}/change-password`, params);
  }

  update(params: object) {
    return this.apiService.update(this.resource, params);
  }

  destroy(slug: string | number) {
    return this.apiService.delete(this.resource, slug);
  }
}
