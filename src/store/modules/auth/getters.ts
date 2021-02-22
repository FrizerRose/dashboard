// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import User from '@/types/user';
import { State } from './state';

export type Getters = {
  getUser(state: State): User | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getUser: (state) => (typeof state.user === 'string' ? JSON.parse(state.user) as User : null),
};
