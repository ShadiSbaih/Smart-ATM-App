import type { Theme, ThemeProviderProps, ThemeProviderState } from "@/types"
import * as React from "react"

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = React.useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    React.useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}