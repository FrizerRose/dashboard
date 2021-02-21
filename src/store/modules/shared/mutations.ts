import Appointment from '@/types/appointment';
import Company from '@/types/company';
import Customer from '@/types/customer';
import Service from '@/types/service';
import Staff from '@/types/staff';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_MENU_OPEN](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_CURRENT_STEP](state: S, payload: number): void;
  [LocalMutationTypes.CHANGE_SELECTED_COMPANY](state: S, payload: Company | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_SERVICE](state: S, payload: Service | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_STAFF](state: S, payload: Staff | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_DATETIME](state: S, payload: {date: string; time: string}): void;
  [LocalMutationTypes.CHANGE_SELECTED_CUSTOMER](state: S, payload: Customer | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_NOTICE](state: S, payload: string): void;
  [LocalMutationTypes.ADD_RESERVED_APPOINTMENTS](state: S, payload: Appointment[]): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_MENU_OPEN](state, payload: boolean) {
    state.isMenuOpen = payload;
  },
  [LocalMutationTypes.CHANGE_CURRENT_STEP](state, payload: number) {
    state.currentStep = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_COMPANY](state, payload: Company | null) {
    state.selectedCompany = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_SERVICE](state, payload: Service | null) {
    state.selectedService = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_STAFF](state, payload: Staff | null) {
    state.selectedStaff = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_DATETIME](state, payload: {date: string; time: string}) {
    state.selectedDateTime = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_CUSTOMER](state, payload: Customer | null) {
    state.selectedCustomer = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_NOTICE](state, payload: string) {
    state.selectedNotice = payload;
  },
  [LocalMutationTypes.ADD_RESERVED_APPOINTMENTS](state, payload: Appointment[]) {
    state.reservedAppointments.push(...payload);
  },
};
