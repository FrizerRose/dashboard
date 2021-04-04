// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { StaffService, AuthService } from '@/api';
import { ApiError } from '@/types/customError';
import Appointment from '@/types/appointment';
import Staff from '@/types/staff';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import SharedMutationTypes from '../shared/mutation-types';
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
  [LocalActionTypes.FETCH_STAFF_BY_ID](
    { commit }: AugmentedSharedActionContext & AugmentedSharedActionContext,
    payload: {id: number; customDates?: {start: string; end: string}}
  ): Promise<unknown>;
  [LocalActionTypes.FETCH_STAFF](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext,
    ID: number | string
  ): Promise<unknown>;
  [LocalActionTypes.CREATE_STAFF](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): Promise<unknown>;
  [LocalActionTypes.CREATE_STAFF_USER](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): Promise<{id: number}>;
  [LocalActionTypes.UPDATE_STAFF](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): Promise<unknown>;
  [LocalActionTypes.DELETE_STAFF](
    { commit }: AugmentedActionContext,
    staff: Staff
  ): Promise<unknown>;
}

// API access.
const staffService = new StaffService();
const authService = new AuthService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_STAFF_BY_ID]({ commit }, payload: {
    id: number;
    customDates: {start: string; end: string};
  }): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await staffService.query(payload.id, payload.customDates);

        if (response.status === 200 && response.data) {
          const formattedAppointments = response.data.appointments.map((appointment: Appointment) => {
            const newAppointment = { ...appointment };
            // Removing ':00' from the time attribute
            newAppointment.time = appointment.time.slice(0, -3);
            // Add the Staff who is responsible for the appointment
            newAppointment.staff = response.data;

            return newAppointment;
          });

          commit(SharedMutationTypes.CHANGE_RESERVED_APPOINTMENTS, formattedAppointments);
          resolve(true);
        } else {
          reject(new ApiError('No staff by this ID.'));
        }
      } catch {
        reject(new ApiError('No staff by this ID.'));
      }
    })());
  },
  async [LocalActionTypes.FETCH_STAFF]({ commit }, companyID: number | string) {
    try {
      const response = await staffService.getByCompanyID(companyID);
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.CHANGE_STAFF, response.data as Staff[]);
        commit(SharedMutationTypes.CHANGE_SELECTED_WORKER, response.data[0] as Staff);
      } else {
        throw new ApiError('No staff with this company ID.');
      }
    } catch {
      throw new ApiError('No staff with this company ID.');
    }
  },
  async [LocalActionTypes.CREATE_STAFF]({ commit }, staff: Staff): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await staffService.create(staff);
        if (response.status === 201 && response.data) {
          commit(LocalMutationTypes.ADD_STAFF, response.data as Staff);
          resolve(true);
        } else {
          reject(new ApiError('Creating staff failed.'));
        }
      } catch {
        reject(new ApiError('Creating staff failed.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.CREATE_STAFF_USER]({ commit }, staff: Staff): Promise<{id: number}> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const randomPassword = Math.random().toString(36).substr(2, 8) + Date.now();
        const response = await authService.create({
          name: staff.name, email: staff.email, isAdminAccount: false, password: randomPassword,
        });
        if (response.status === 201 && response.data?.user) {
          resolve(response.data.user);
        } else {
          reject(new ApiError('Creating user failed.'));
        }
      } catch {
        reject(new ApiError('Creating user failed.'));
      }
    })());
  },
  async [LocalActionTypes.UPDATE_STAFF]({ commit }, staff: Staff): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await staffService.update(staff);
        if (response.status === 200 && response.data) {
          commit(LocalMutationTypes.UPDATE_STAFF_BY_ID, response.data as Staff);
          resolve(true);
        } else {
          reject(new ApiError('Updating staff failed.'));
        }
      } catch {
        reject(new ApiError('Updating staff failed.'));
      }
    })());
  },
  async [LocalActionTypes.DELETE_STAFF]({ commit }, staff: Staff): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await staffService.destroy(staff.id);
        if (response.status === 200 && response.data) {
          commit(LocalMutationTypes.REMOVE_STAFF_BY_ID, { id: staff.id, ...response.data } as Staff);
          resolve(true);
        } else {
          reject(new ApiError('Deleting staff failed.'));
        }
      } catch {
        reject(new ApiError('Deleting staff failed.'));
      }
    })());
  },
};
