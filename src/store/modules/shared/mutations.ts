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
  [LocalMutationTypes.CHANGE_IS_MOBILE](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_MENU_OPEN](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_CURRENT_STEP](state: S, payload: number): void;
  [LocalMutationTypes.CHANGE_SELECTED_COMPANY](state: S, payload: Company | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_SERVICE](state: S, payload: Service | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_STAFF](state: S, payload: Staff | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_WORKER](state: S, payload: Staff | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_DATETIME](state: S, payload: { date: string; time: string }): void;
  [LocalMutationTypes.CHANGE_SELECTED_CUSTOMER](state: S, payload: Customer | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_APPOINTMENT](state: S, payload: Appointment | null): void;
  [LocalMutationTypes.CHANGE_SELECTED_NOTICE](state: S, payload: string): void;
  [LocalMutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_OPEN_CALENDAR_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL](state: S, payload: boolean): void;
  [LocalMutationTypes.CHANGE_RESERVED_APPOINTMENTS](state: S, payload: Appointment[]): void;
  [LocalMutationTypes.ADD_RESERVED_APPOINTMENTS](state: S, payload: Appointment[]): void;
  [LocalMutationTypes.REMOVE_RESERVED_APPOINTMENT_BY_ID](state: S, payload: number): void;
  [LocalMutationTypes.CHANGE_TOUR](state: S, payload: {show: Function; next: Function; isActive: Function; cancel: Function} | null): void;
  [LocalMutationTypes.CHANGE_CALENDAR_SELECTED_APPOINTMENT](state: S, payload: Appointment): void;
  [LocalMutationTypes.CHANGE_CUSTOMERS_APPOINTMENTS](state: S, payload: Appointment[]): void;
};

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_IS_MOBILE](state, payload: boolean) {
    state.isMobile = payload;
  },
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
  [LocalMutationTypes.CHANGE_SELECTED_WORKER](state, payload: Staff | null) {
    state.selectedWorker = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_DATETIME](state, payload: { date: string; time: string }) {
    state.selectedDateTime = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_CUSTOMER](state, payload: Customer | null) {
    state.selectedCustomer = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_APPOINTMENT](state, payload: Appointment | null) {
    state.selectedAppointment = payload;
  },
  [LocalMutationTypes.CHANGE_SELECTED_NOTICE](state, payload: string) {
    state.selectedNotice = payload;
  },
  [LocalMutationTypes.CHANGE_OPEN_SERVICE_CREATE_MODAL](state, payload: boolean) {
    state.isServicesCreateOpen = payload;
  },
  [LocalMutationTypes.CHANGE_OPEN_CALENDAR_MODAL](state, payload: boolean) {
    state.isCalendarModalOpen = payload;
  },
  [LocalMutationTypes.CHANGE_OPEN_SERVICE_EDIT_MODAL](state, payload: boolean) {
    state.isServicesEditOpen = payload;
  },
  [LocalMutationTypes.CHANGE_OPEN_STAFF_CREATE_MODAL](state, payload: boolean) {
    state.isStaffCreateOpen = payload;
  },
  [LocalMutationTypes.CHANGE_OPEN_STAFF_EDIT_MODAL](state, payload: boolean) {
    state.isStaffEditOpen = payload;
  },
  [LocalMutationTypes.CHANGE_RESERVED_APPOINTMENTS](state, payload: Appointment[]) {
    state.reservedAppointments = payload;
  },
  [LocalMutationTypes.ADD_RESERVED_APPOINTMENTS](state, payload: Appointment[]) {
    state.reservedAppointments.push(...payload);
  },
  [LocalMutationTypes.REMOVE_RESERVED_APPOINTMENT_BY_ID](state, payload: number) {
    const appointmentToRemoveIndex = state.reservedAppointments.findIndex((app) => app.id === payload);
    state.reservedAppointments.splice(appointmentToRemoveIndex, 1);
  },
  [LocalMutationTypes.CHANGE_TOUR](state, payload: {show: Function; next: Function; isActive: Function; cancel: Function} | null) {
    state.tour = payload;
  },
  [LocalMutationTypes.CHANGE_CALENDAR_SELECTED_APPOINTMENT](state, payload: Appointment) {
    const appointmentIndex = state.reservedAppointments.findIndex((app) => app.id === payload.id);
    state.reservedAppointments[appointmentIndex] = payload;
  },
  [LocalMutationTypes.CHANGE_CUSTOMERS_APPOINTMENTS](state, payload: Appointment[]) {
    state.selectedCustomerAppointments = payload;
  },
};
