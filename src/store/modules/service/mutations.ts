import Service from '@/types/service';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_SERVICES](state: S, payload: Service[]): void;
  [LocalMutationTypes.ADD_SERVICE](state: S, payload: Service): void;
  [LocalMutationTypes.UPDATE_SERVICE_BY_ID](state: S, payload: Service): void;
  [LocalMutationTypes.REMOVE_SERVICE_BY_ID](state: S, payload: Service): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_SERVICES](state, payload: Service[]) {
    state.services = payload;
  },
  [LocalMutationTypes.ADD_SERVICE](state, payload: Service) {
    state.services.push(payload);
  },
  [LocalMutationTypes.UPDATE_SERVICE_BY_ID](state, payload: Service) {
    const staffToUpdateIndex = state.services.findIndex((worker) => worker.id === payload.id);
    if (staffToUpdateIndex > -1) {
      state.services[staffToUpdateIndex] = payload;
    }
  },
  [LocalMutationTypes.REMOVE_SERVICE_BY_ID](state, payload: Service) {
    const staffToUpdateIndex = state.services.findIndex((service) => service.id === payload.id);
    if (staffToUpdateIndex > 0) {
      state.services.splice(staffToUpdateIndex, 1);
    }
  },
};
