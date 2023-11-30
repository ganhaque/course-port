export function getAMPMTime(minutes: number): string {
  /* if (isNaN(minutes)) { */
  /*   return "TBA"; */
  /* } */
  if (minutes < 0 || minutes > 1439) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  const ampm: string = hours >= 12 ? 'PM' : 'AM';
  const displayHours: number = hours % 12 || 12;

  const formattedTime: string = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;

  return formattedTime;
}

export function getTimeWithoutAMPM(minutes: number): string {
  /* if (isNaN(minutes)) { */
  /*   return "TBA"; */
  /* } */
  if (minutes < 0 || minutes > 1439) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  /* const ampm: string = hours >= 12 ? 'PM' : 'AM'; */
  const displayHours: number = hours % 12 || 12;

  const formattedTime: string = `${displayHours}:${mins.toString().padStart(2, '0')}`;

  return formattedTime;
}

export function getHourMinuteString(minutes: number): string {
  if (isNaN(minutes)) {
    return "TBA";
  }
  if (minutes < 0) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h${mins}m`;
  }
}

