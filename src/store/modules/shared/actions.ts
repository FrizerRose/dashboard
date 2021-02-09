// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { AdviceService } from '@/api';
import { ApiError } from '@/types/customError';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

// Blueprint for actions. All of them have to be implemented.
export interface Actions {
  [LocalActionTypes.FETCH_ADVICE](
    { commit }: AugmentedActionContext,
    id: number,
  ): void;
}

// API access.
const adviceService = new AdviceService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_ADVICE]({ commit }, id: number) {
    const response = await adviceService.get(id);
    if (response.data.message === undefined) {
      const parsedResponse = JSON.parse(`${response.data}}`);
      commit(LocalMutationTypes.CHANGE_ADVICE, parsedResponse.slip.advice);
    } else {
      throw new ApiError('No Advice for this ID.');
    }
  },
};
