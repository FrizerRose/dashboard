import Break from './break';
import Service from './service';
import { WorkingHours } from './workingHours';

type Staff = {
  id: number;
  name: string;
  email: string;
  company: number;
  hours: WorkingHours;
  breaks: Break[];
  services: Service[];
}

export default Staff;
