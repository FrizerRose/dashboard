import axios, { AxiosStatic } from 'axios';
import { ApiError } from '@/types/customError';

export default class ApiService {
  client: AxiosStatic;

  constructor() {
    this.client = axios;
    this.client.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
  }

  setHeader() {
    this.client.defaults.headers.common.Authorization = 'blabla';
  }

  async query(resource: string, params: object) {
    try {
      return this.client.get(resource, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async get(resource: string, slug: string | number) {
    try {
      return this.client.get(`${resource}/${slug}`);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async post(resource: string, params: object) {
    try {
      return this.client.post(`${resource}`, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async update(resource: string, slug: string, params: object) {
    try {
      return this.client.put(`${resource}/${slug}`, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async put(resource: string, params: object) {
    try {
      return this.client.put(`${resource}`, params);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  delete(resource: string, slug: string) {
    // try {
    //   return this.client.delete(`${resource}/${slug}`);
    // } catch (error) {
    //   throw new ApiError(error);
    // }

    return this.client.delete(`${resource}/${slug}`).catch((error) => {
      throw new Error(`ApiService ${error}`);
    });
  }
}

export class AdviceService {
  apiService: ApiService;

  resource: string;

  constructor() {
    this.apiService = new ApiService();
    this.resource = 'advice';
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
    return this.apiService.post(this.resource, { article: params });
  }

  update(slug: string, params: object) {
    return this.apiService.update(this.resource, slug, { article: params });
  }

  destroy(slug: string) {
    return this.apiService.delete(this.resource, slug);
  }
}
