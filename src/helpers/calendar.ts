import Staff from '@/types/staff';
import { Day } from '@/types/workingHours';
import { getDayNumber } from '@/helpers/time';

export function getFormattedBusinessHours(worker: Staff) {
  const formattedBusinessHours: {daysOfWeek: number[]; start: string; end: string}[] = [];
  Object.entries(worker.hours).forEach(([index, day]: [string, Day]) => {
    const dayNumber = getDayNumber(index);
    if (day.active && day.shifts.length) {
      const firstShiftStart = day.shifts[0].start;
      const lastShiftEnd = day.shifts[day.shifts.length - 1].end;
      formattedBusinessHours.push({
        daysOfWeek: [dayNumber],
        start: firstShiftStart,
        end: lastShiftEnd,
      });
    }
  });

  return formattedBusinessHours;
}

export function aa() {
  console.log(2);
}
