// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { FaqService } from '@/api';
import { ApiError } from '@/types/customError';
import Faq from '@/types/faq';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
// import SharedMutationTypes from '../shared/mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(
    key: K,
    payload: Parameters<SharedMutations[K]>[1],
  ): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_FAQ](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: object
  ): Promise<Faq[]>;
}

// API access.
const faqService = new FaqService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.FETCH_FAQ]({ commit }, payload: object): Promise<Faq[]> {
    return new Promise((resolve, reject) => (async () => {
      const response = await faqService.get('');
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.CHANGE_FAQ, response.data);
        resolve(response.data as Faq[]);
      } else {
        reject(new ApiError('Could not find faqs.'));
      }
    })());
  },
};
