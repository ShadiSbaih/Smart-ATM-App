import LoginForm from '@/pages/LoginForm'

export default function LoginPage() {
  const handleSubmit = (data: { username: string; pin: string }) => {
    // placeholder - integrate with auth logic later
    console.log('login submit', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50">
      <div className="w-full max-w-5xl px-6">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
