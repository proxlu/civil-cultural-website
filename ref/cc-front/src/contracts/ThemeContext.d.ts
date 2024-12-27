import { ReactNode } from 'react'
import { DefaultTheme } from 'styled-components'

export type ThemeStateProps = 'dark' | 'light'

export interface CustomThemeContextProps {
  theme: ThemeStateProps;
  toggleTheme: (themeType: ThemeStateProps) => void
}

export interface CustomThemeProviderProps {
  children: ReactNode
}