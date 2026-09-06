export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function toInputDate(date: string): string {
  return date.slice(0, 10)
}

export function fromInputDate(date: string): string {
  return new Date(date).toISOString().slice(0, 10)
}
