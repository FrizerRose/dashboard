// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore,
} from 'vuex';
// eslint-disable-next-line import/no-cycle
import { actions, Actions } from './actions';
// eslint-disable-next-line import/no-cycle
import { getters, Getters } from './getters';
import { mutations, Mutations } from './mutations';
import type { State } from './state';
import state from './state';

export { State };

// Removes getter, commit and dispatch definitions from the VuexStore and replaces them with our own,
// fully-typed versions.
export type StaffStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  } & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload: Parameters<Actions[K]>[1],
      options?: DispatchOptions
      ): ReturnType<Actions[K]>;
    } & {
      getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
      };
    };

// Important: Modules can't be namespaced!
export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
