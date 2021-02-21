import Service from './service';
import Staff from './staff';

type Company = {
  id: number;
  name: string;
  bookingPageSlug: string;
  services: Service[];
  staff: Staff[];
}

export default Company;
