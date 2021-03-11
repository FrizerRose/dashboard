export function getDayNumber(day: string): number {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days.findIndex((dayName) => dayName === day) + 1;
}

export function formatDateString(oldFormat: string): string {
  const date = new Date(oldFormat);
  const dd = String(date.getDate());
  let mm = String(date.getMonth() + 1); // January is 0!
  const yyyy = date.getFullYear();

  if (mm.length < 2) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}

export function getDateStringFromDate(date: Date): string {
  const dd = String(date.getDate());
  let mm = String(date.getMonth() + 1); // January is 0!
  const yyyy = date.getFullYear();

  if (mm.length < 2) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}
