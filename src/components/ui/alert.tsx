import { AlertCircle } from 'lucide-react'
import type { AlertProps } from '@/types'

export default function Alert({ title, description }: AlertProps) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 shadow-sm">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-red-100 text-red-700">
        <AlertCircle size={18} />
      </div>
      <div>
        {title && <div className="text-sm font-semibold text-red-800">{title}</div>}
        {description && <div className="mt-1 text-sm text-red-700/90">{description}</div>}
      </div>
    </div>
  )
}
