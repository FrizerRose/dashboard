// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import LocalActionTypes from './action-types';
import SharedMutationTypes from '../shared/mutation-types';
import LocalMutationTypes from './mutation-types';
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
  [LocalActionTypes.FETCH_LIST_NAME](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    someId: string,
  ): Promise<boolean>;
}

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_LIST_NAME]({ commit }, someId: string) {
    return new Promise(() => {
      setTimeout(() => {
        const data = `${someId}abc`;
        commit(LocalMutationTypes.CHANGE_LIST_NAME, data);
        commit(SharedMutationTypes.CHANGE_NUMBER, 11);
        return true;
      }, 500);
    });
  },
};
