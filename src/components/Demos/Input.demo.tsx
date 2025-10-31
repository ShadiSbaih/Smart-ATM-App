import { ArrowRight, Lock, Mail, Plus, Search, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function InputDemo() {
    return (
        <div className="p-8 space-y-4 bg-background text-foreground flex flex-col">
            <h1 className='text-2xl font-bold text-center'>Input Demo</h1>
            <Input
                placeholder="Email"
                leftIcon={<Mail size={18} />}
                type="email"
            />
            {/* <Input
                placeholder="Search..."
                leftIcon={<Search size={18} />}
                rightIcon={<X size={18} />}
                onClickAction={() => alert("Right icon clicked! 🔍")}
            /> */}

            <Input
                leftIcon={<Lock size={18} />}
                type="password"
                placeholder="Enter password"
                togglePassword
            />
            <Button icon={<ArrowRight />} iconPosition="right"  className='w-32' isLoading>
                Continue
            </Button>

            <Button size="icon" icon={<Plus />} aria-label="Add" />


            {/* <Input
                label="Email"
                placeholder="you@example.com"
                helperText="We'll never share your email"
            />
            <Input
                label="Password"
                type="password"
                error
                errorMessage="Password must be at least 8 characters"
            />
            <Input variant="filled" placeholder="Filled input" />
            <Input variant="ghost" placeholder="Ghost input" />
            <Input loading placeholder="Loading..." />
            <Input inputSize="sm" placeholder="Small" />
            <Input inputSize="md" placeholder="Medium" />
            <Input inputSize="lg" placeholder="Large" />
            <Input fullWidth placeholder="Full width" /> */}

        </div>
    )
}

export default InputDemo