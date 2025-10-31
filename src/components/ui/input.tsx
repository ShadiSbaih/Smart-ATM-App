import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  togglePassword?: boolean
  onClickAction?: () => void // 👈 الإضافة الجديدة
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      leftIcon,
      rightIcon,
      togglePassword = false,
      onClickAction,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    // Handle toggle if it's a password input
    const handleRightIconClick = () => {
      if (togglePassword && type === "password") {
        setShowPassword((prev) => !prev)
      } else if (onClickAction) {
        onClickAction()
      }
    }

    const inputType =
      togglePassword && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type

    return (
      <div className="relative flex items-center">
        {/* Left Icon */}
        {leftIcon && (
          <span className="absolute left-3 text-muted-foreground">
            {leftIcon}
          </span>
        )}

        {/* Input Field */}
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            leftIcon && "pl-10",
            (rightIcon || togglePassword) && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Right Icon */}
        {(rightIcon || togglePassword) && (
          <span
            className="absolute right-3 flex items-center text-muted-foreground cursor-pointer select-none"
            onClick={handleRightIconClick}
          >
            {togglePassword && type === "password" ? (
              showPassword ? (
                <EyeOff size={18} className="hover:text-foreground" />
              ) : (
                <Eye size={18} className="hover:text-foreground" />
              )
            ) : (
              rightIcon
            )}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
