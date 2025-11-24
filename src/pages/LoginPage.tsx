import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '@/pages/LoginForm'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/schemas/loginSchema'
import Alert from '@/components/ui/alert'
import { toast } from 'sonner'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: { username: string; pin: string }) => {
    try {
  setError(null)
  await loginSchema.validate(data)
  await login(data.username, data.pin)
  navigate('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
      toast.error(msg)
    }
  }

  return (
    <div className="h-auto flex justify-center bg-white">
      <div className="w-full">
        <LoginForm onSubmit={handleSubmit} />
        {error && <Alert title="Login failed" description={error} />}
      </div>
    </div>
  )
}
