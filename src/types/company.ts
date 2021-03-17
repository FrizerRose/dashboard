import CompanyPreferences from './companyPreferences';
import Image from './image';
import Service from './service';
import Staff from './staff';
import { WorkingHours } from './workingHours';

type Company = {
  id: number;
  name: string;
  bookingPageSlug: string;
  about: string;
  contactEmail: string;
  phoneNumber: string;
  city: string;
  streetName: string;
  services: Service[];
  staff: Staff[];
  preferences: CompanyPreferences;
  hours: WorkingHours;
  image: Image;
}

export default Company;
