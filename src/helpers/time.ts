export function getDayNumber(day: string): number {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days.findIndex((dayName) => dayName === day) + 1;
}

export function getDayTranslation(day: string): string {
  const translatedDays = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];

  return translatedDays[getDayNumber(day) - 1];
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

export function getTimeOptions() {
  const quarterHours = ['00', '15', '30', '45'];

  const times = [];
  for (let i = 0; i < 24; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      times.push(`${(`0${i}`).slice(-2)}:${quarterHours[j]}`);
    }
  }
  return times;
}
