// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { StaffService } from '@/api';
import { ApiError } from '@/types/customError';
import Appointment from '@/types/appointment';
import LocalActionTypes from './action-types';
// import LocalMutationTypes from './mutation-types';
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
    { commit }: AugmentedSharedActionContext,
    IDs: number[]
  ): Promise<unknown>;
}

// API access.
const staffService = new StaffService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_STAFF_BY_ID]({ commit }, IDs: number[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      IDs.forEach(async (id) => {
        const response = await staffService.get(id);

        if (response.status === 200 && response.data) {
          const formattedAppointments = response.data.appointments.map((appointment: Appointment) => {
            const newAppointment = { ...appointment };
            // Removing ':00' from the time attribute
            newAppointment.time = appointment.time.slice(0, -3);
            // Add the Staff who is responsible for the appointment
            newAppointment.staff = response.data;

            return newAppointment;
          });

          commit(SharedMutationTypes.ADD_RESERVED_APPOINTMENTS, formattedAppointments);
        } else {
          reject(new ApiError('No staff by this ID.'));
        }
      });

      resolve(true);
    });
  },
};
