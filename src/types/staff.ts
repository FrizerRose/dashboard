import Break from './break';
import Image from './image';
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
  image: Image;
  user?: {id: number; name: string; email: string; isAdminAccount: boolean};
}

export default Staff;
