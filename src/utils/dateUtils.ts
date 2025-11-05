/**
 * Date utility functions for Smart ATM App
 */

/**
 * Check if today is the user's birthday
 * @param birthday - Birthday in format YYYY-MM-DD
 * @returns true if today is the birthday
 */
export function isTodayBirthday(birthday?: string): boolean {
  if (!birthday) return false
  
  try {
    const today = new Date()
    const birthDate = new Date(birthday)
    
    return (
      today.getMonth() === birthDate.getMonth() &&
      today.getDate() === birthDate.getDate()
    )
  } catch {
    return false
  }
}

/**
 * Format date to readable string
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Calculate age from birthday
 * @param birthday - Birthday in format YYYY-MM-DD
 * @returns Age in years
 */
export function calculateAge(birthday?: string): number {
  if (!birthday) return 0
  
  try {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  } catch {
    return 0
  }
}

/**
 * Format birthday for display
 * @param birthday - Birthday in format YYYY-MM-DD
 * @returns Formatted birthday string (e.g., "October 20, 2000")
 */
export function formatBirthday(birthday?: string): string {
  if (!birthday) return 'Unknown'
  return formatDate(birthday)
}
