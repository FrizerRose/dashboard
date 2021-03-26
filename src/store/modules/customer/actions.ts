// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { CustomerService } from '@/api';
import { ApiError } from '@/types/customError';
import Customer from '@/types/customer';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import SharedMutationTypes from '../shared/mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(key: K, payload: Parameters<SharedMutations[K]>[1]): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [LocalActionTypes.CREATE_CUSTOMER](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: Customer,
  ): Promise<Customer>;
  [LocalActionTypes.FETCH_CUSTOMERS]({ commit }: AugmentedActionContext, params: object): void;
  [LocalActionTypes.FETCH_CUSTOMERS_BY_NAME](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: object,
  ): Promise<Customer[]>;
  [LocalActionTypes.UPDATE_CUSTOMER]({ commit }: AugmentedActionContext, customer: Customer): Promise<unknown>;
}

// API access.
const customerService = new CustomerService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.CREATE_CUSTOMER]({ commit }, payload: Customer): Promise<Customer> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await customerService.create(payload);
        if (response.status === 201 && response.data) {
          commit(LocalMutationTypes.CHANGE_CUSTOMER, response.data);
          commit(SharedMutationTypes.CHANGE_SELECTED_CUSTOMER, response.data);
          resolve(response.data as Customer);
        } else {
          reject(new ApiError('Could not create a customer.'));
        }
      } catch {
        reject(new ApiError('Could not create a customer.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.FETCH_CUSTOMERS_BY_NAME]({ commit }, payload: object): Promise<Customer[]> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await customerService.query(payload);
        if (response.status === 200 && response.data) {
          resolve(response.data as Customer[]);
        } else {
          reject(new ApiError('Could not find customers.'));
        }
      } catch {
        reject(new ApiError('Could not find customers.'));
      }
    })());
  },
  async [LocalActionTypes.FETCH_CUSTOMERS]({ commit }, params: object) {
    const response = await customerService.query(params);
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_CUSTOMERS, response.data);
    } else {
      throw new ApiError('No services with this company ID.');
    }
  },
  async [LocalActionTypes.UPDATE_CUSTOMER]({ commit }, customer: Customer): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await customerService.update(customer);
        if (response.status === 200 && response.data) {
          resolve(true);
        } else {
          reject(new ApiError('Updating customer failed.'));
        }
      } catch {
        reject(new ApiError('Updating customer failed.'));
      }
    })());
  },
};
