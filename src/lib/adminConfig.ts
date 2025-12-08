// Admin email addresses that have full access
const ADMIN_EMAILS = [
  'admin@example.com', // Replace with your actual admin emails
]

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase())
}
