/**
 *
 * @param {number} timestamp - Timestamp of the date you wish to format
 * @returns {string} If the timestamp given is today: `Today at HH:mm`, if it is yesterday: `Yesterday at HH:mm` and otherwise `DD/MM/YY at HH:mm`
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  if (date.getDate() === now.getDate()) return `Today at ${padHours(date)}:${padMinutes(date)}`

  if (date.getDate() > now.getDate()) return `Yesterday at ${padHours(date)}:${padMinutes(date)}`

  return `${date.getDate()}${suffix(date.getDate())} ${months[date.getMonth()]} ${padYear(date)} at ${padHours(date)}:${padMinutes(date)}`
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const padHours = (date: Date): string => {
  return date.getHours().toString().padStart(2, "0");
}

const padMinutes = (date: Date): string => {
  return date.getMinutes().toString().padStart(2, "0");
}

const padYear = (date: Date): string => {
  return date.getFullYear().toString().slice(-2)
}

const suffix = (date: number) => {
  const day = date.toString()
  const lastNum = day[day.length - 1]
  if (lastNum === "1") return "st"
  if (lastNum === "2") return "nd"
  if (lastNum === "3") return "rd"
  if (lastNum === "4") return "th"
}
