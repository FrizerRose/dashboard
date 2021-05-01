// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { PaymentService } from '@/api';
import { ApiError } from '@/types/customError';
import Payment from '@/types/payment';
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
  [LocalActionTypes.CREATE_PAYMENT](
    { commit }: AugmentedActionContext,
    payload: Payment,
  ): Promise<Payment>;
  [LocalActionTypes.FETCH_PAYMENTS]({ commit }: AugmentedActionContext, params: object): void;
  [LocalActionTypes.UPDATE_PAYMENT]({ commit }: AugmentedActionContext, payment: Payment): Promise<unknown>;
}

// API access.
const paymentService = new PaymentService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.CREATE_PAYMENT]({ commit }, payload: Payment): Promise<Payment> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await paymentService.create(payload);
        if (response.status === 201 && response.data) {
          commit(LocalMutationTypes.CHANGE_PAYMENT, response.data);
          resolve(response.data as Payment);
        } else {
          reject(new ApiError('Could not create a payment.'));
        }
      } catch {
        reject(new ApiError('Could not create a payment.'));
      }
    })());
  },
  async [LocalActionTypes.FETCH_PAYMENTS]({ commit }, params: object) {
    const response = await paymentService.query(params);
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_PAYMENTS, response.data);
    } else {
      throw new ApiError('No services with this company ID.');
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.UPDATE_PAYMENT]({ commit }, payment: Payment): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await paymentService.update(payment);
        if (response.status === 200 && response.data) {
          resolve(true);
        } else {
          reject(new ApiError('Updating payment failed.'));
        }
      } catch {
        reject(new ApiError('Updating payment failed.'));
      }
    })());
  },
};
