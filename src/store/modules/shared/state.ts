import Appointment from '@/types/appointment';
import Company from '@/types/company';
import Customer from '@/types/customer';
import Service from '@/types/service';
import Staff from '@/types/staff';

export interface State {
  isMobile: boolean;
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
  selectedDateTime: { date: string; time: string };
  selectedCustomer: Customer | null;
  selectedAppointment: Appointment | null;
  selectedNotice: string;
  reservedAppointments: Appointment[];
  calendarSelectedAppointmentID: number;
  selectedWorker: Staff | null;
  tour: {show: Function; next: Function; isActive: Function; cancel: Function} | null;
  selectedCustomerAppointments: Appointment[];
  isCompanyFetched: boolean;
}

const state: State = {
  isMobile: false,
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
  selectedAppointment: null,
  selectedNotice: '',
  reservedAppointments: [],
  calendarSelectedAppointmentID: -1,
  selectedWorker: null,
  tour: null,
  selectedCustomerAppointments: [],
  isCompanyFetched: false,
};

export default state;
