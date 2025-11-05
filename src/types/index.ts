// ===== User & Transaction Types =====
export type Transaction = {
  id: number
  type: string
  amount: number
  currency: string
  date: string
  target_user?: string
}

export type User = {
  id: number
  user_name: string
  first_name: string
  last_name: string
  profile_img?: string
  pin?: string
  balance: number
  birthday?: string
  transactions?: Transaction[]
}

// ===== Currency Types =====
export type Currency = {
  code: string
  rate: number
}

export type CurrencyCode = 'ILS' | 'USD' | 'EUR' | 'GBP'

// ===== Form Types =====
export interface TransactionInput {
  type: 'Deposit' | 'Withdraw' | 'Transfer'
  amount: number
  currency?: string
  target_user?: string
}

// ===== Component Props Types =====
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  togglePassword?: boolean
  onClickAction?: () => void
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export type AlertProps = {
  title?: string
  description?: string
}

export interface LoginFormProps {
  onSubmit?: (data: { username: string; pin: string }) => void
}

export type ProtectedRouteProps = {
  children: React.ReactNode
}

export type MainLayoutProps = {
  children: React.ReactNode
}

export interface SummaryBarProps {
  user: User | null
}

export interface BirthdayPopupProps {
  user: User | null
}

export interface BalanceCardProps {
  balance: number
}

export type CurrencyListProps = {
  currencies: Currency[]
}

export interface DepositFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface WithdrawFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface TransactionHistoryProps {
  transactions: Transaction[]
  itemsPerPage?: number
}