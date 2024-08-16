export function formatTime(time: number): string {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}
