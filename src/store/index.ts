// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { SharedStore, State as SharedState, store as shared } from '@/store/modules/shared';
// eslint-disable-next-line import/no-cycle
import { ServiceStore, State as ServiceState, store as service } from '@/store/modules/service';
// eslint-disable-next-line import/no-cycle
import { CompanyStore, State as CompanyState, store as company } from '@/store/modules/company';
// eslint-disable-next-line import/no-cycle
import { StaffStore, State as StaffState, store as staff } from '@/store/modules/staff';
// eslint-disable-next-line import/no-cycle
import { AppointmentStore, State as AppointmentState, store as appointment } from '@/store/modules/appointment';
// eslint-disable-next-line import/no-cycle
import { CustomerStore, State as CustomerState, store as customer } from '@/store/modules/customer';
// eslint-disable-next-line import/no-cycle
import { FaqStore, State as FaqState, store as faq } from '@/store/modules/faq';
// eslint-disable-next-line import/no-cycle
import { AuthStore, State as AuthState, store as auth } from '@/store/modules/auth';
import { createLogger, createStore } from 'vuex';

export type RootState = {
  shared: SharedState;
  service: ServiceState;
  company: CompanyState;
  staff: StaffState;
  appointment: AppointmentState;
  customer: CustomerState;
  faq: FaqState;
  auth: AuthState;
};

export type Store = SharedStore<Pick<RootState, 'shared'>>
  & ServiceStore<Pick<RootState, 'service'>>
  & CompanyStore<Pick<RootState, 'company'>>
  & AppointmentStore<Pick<RootState, 'appointment'>>
  & CustomerStore<Pick<RootState, 'customer'>>
  & AuthStore<Pick<RootState, 'auth'>>
  & FaqStore<Pick<RootState, 'faq'>>
  & StaffStore<Pick<RootState, 'staff'>>;

// Plug in logger when in development environment
const isDebugMode = process.env.NODE_ENV !== 'production';
const plugins = isDebugMode ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    shared,
    service,
    company,
    staff,
    appointment,
    customer,
    faq,
    auth,
  },
});

export function useStore(): Store {
  return store as Store;
}
