import Appointment from '@/types/appointment';
import Company from '@/types/company';
import Customer from '@/types/customer';
import Service from '@/types/service';
import Staff from '@/types/staff';

export interface State {
  isMenuOpen: boolean;
  isServicesCreateOpen: boolean;
  isCalendarModalOpen: boolean;
  isServicesEditOpen: boolean;
  isStaffCreateOpen: boolean;
  isStaffEditOpen: boolean;
  currentStep: number;
  selectedCompany: Company | null;
  selectedService: Service | null;
  selectedStaff: Staff | null;
  selectedDateTime: {date: string; time: string};
  selectedCustomer: Customer | null;
  selectedNotice: string;
  reservedAppointments: Appointment[];
  selectedWorker: Staff | null;
  tour: object | null;
}

const state: State = {
  isMenuOpen: false,
  isServicesCreateOpen: false,
  isCalendarModalOpen: false,
  isServicesEditOpen: false,
  isStaffCreateOpen: false,
  isStaffEditOpen: false,
  currentStep: 1,
  selectedCompany: null,
  selectedService: null,
  selectedStaff: null,
  selectedDateTime: { date: '', time: '' },
  selectedCustomer: null,
  selectedNotice: '',
  reservedAppointments: [],
  selectedWorker: null,
  tour: null,
};

export default state;
