// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { AppointmentService } from '@/api';
import { ApiError, ValidationError } from '@/types/customError';
import { AxiosResponse } from 'axios';
import Appointment from '@/types/appointment';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import SharedMutationTypes from '../shared/mutation-types';
import StaffMutationTypes from '../staff/mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { Mutations as StaffMutations } from '../staff/mutations';
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

type AugmentedStaffActionContext = {
  commit<K extends keyof StaffMutations>(
    key: K,
    payload: Parameters<StaffMutations[K]>[1],
  ): ReturnType<StaffMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_APPOINTMENT](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext & AugmentedStaffActionContext,
    id: number
  ): Promise<AxiosResponse>;
  [LocalActionTypes.FETCH_APPOINTMENTS_ON_DATE](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    payload: {companyID: number; dateString: string}
  ): Promise<AxiosResponse>;
  [LocalActionTypes.CREATE_APPOINTMENT](
    { commit }: AugmentedSharedActionContext,
    payload: object
  ): Promise<unknown>;
  [LocalActionTypes.UPDATE_APPOINTMENT](
    { commit }: AugmentedSharedActionContext,
    payload: object
  ): Promise<unknown>;
  [LocalActionTypes.CANCEL_APPOINTMENT](
    { commit }: AugmentedSharedActionContext,
    payload: {id: number | undefined; isReschedule: boolean}
  ): Promise<unknown>;
}

// API access.
const appointmentService = new AppointmentService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_APPOINTMENT]({ commit }, id: number): Promise<AxiosResponse> {
    const response = await appointmentService.get(id);
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_APPOINTMENT, response.data);
      commit(SharedMutationTypes.CHANGE_SELECTED_SERVICE, response.data.service);
      commit(SharedMutationTypes.CHANGE_SELECTED_CUSTOMER, response.data.customer);
      if (response.data.service.staff[0] === undefined) {
        commit(StaffMutationTypes.CHANGE_STAFF, [response.data.service.staff]);
      } else {
        commit(StaffMutationTypes.CHANGE_STAFF, response.data.service.staff);
      }
    } else {
      throw new ApiError('No appointment by this ID.');
    }

    return response;
  },
  async [LocalActionTypes.FETCH_APPOINTMENTS_ON_DATE](
    { commit },
    payload: {companyID: number; dateString: string},
  ): Promise<AxiosResponse> {
    const response = await appointmentService.get(`company/${payload.companyID.toString()}/${payload.dateString}`);
    if (response.status === 200 && response.data) {
      commit(SharedMutationTypes.CHANGE_RESERVED_APPOINTMENTS, response.data as Appointment[]);
    } else {
      throw new ApiError('No appointment by this ID.');
    }

    return response;
  },
  async [LocalActionTypes.CREATE_APPOINTMENT]({ commit }, payload): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await appointmentService.create(payload);
      if (response.status === 201) {
        commit(SharedMutationTypes.ADD_RESERVED_APPOINTMENTS, [{ ...response.data }]);
        resolve(true);
      } else {
        reject(new ApiError('Could not create an appointment.'));
      }
    })());
  },
  async [LocalActionTypes.UPDATE_APPOINTMENT]({ commit }, payload): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await appointmentService.update(payload);
      if (response.status === 200) {
        commit(SharedMutationTypes.CHANGE_CALENDAR_SELECTED_APPOINTMENT, response.data);
        resolve(true);
      } else {
        reject(new ApiError('Could not update an appointment.'));
      }
    })());
  },
  async [LocalActionTypes.CANCEL_APPOINTMENT]({ commit }, payload: {id: number | undefined; isReschedule: boolean}): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      if (payload.id !== undefined) {
        const response = await appointmentService.destroy(`${payload.id.toString()}?reschedule=${payload.isReschedule.toString()}`);
        if (response.status === 200) {
          commit(SharedMutationTypes.REMOVE_RESERVED_APPOINTMENT_BY_ID, payload.id);
          resolve(true);
        } else {
          reject(new ApiError('Could not delete an appointment.'));
        }
      } else {
        reject(new ValidationError('ID not a number'));
      }
    })());
  },
};
