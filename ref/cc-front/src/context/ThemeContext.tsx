/* ----------- RESOURCES ----------- */
import { createContext, useState } from 'react'
import { useCookie } from 'react-use'

/* ----------- TYPES ----------- */
import {
  CustomThemeContextProps,
  CustomThemeProviderProps,
  ThemeStateProps
} from 'Contracts/ThemeContext'

export const ThemeContext = createContext({} as CustomThemeContextProps)

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [cookieTheme, updateCookieTheme] = useCookie('civil_theme')
  const [theme, setTheme] = useState<ThemeStateProps>(cookieTheme as ThemeStateProps ?? 'light')

  const toggleTheme = (themeType: ThemeStateProps) => {
    setTheme(themeType)
    updateCookieTheme(themeType)
  }

  const themeProps: CustomThemeContextProps = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={themeProps}>
      { children }
    </ThemeContext.Provider>
  )
}