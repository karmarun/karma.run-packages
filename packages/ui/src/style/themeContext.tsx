import React, {createContext, ReactNode, useContext, ComponentType, forwardRef} from 'react'

import {
  useStyle,
  CSSRule,
  PropsForElementAndStyle,
  RefTypeForElement,
  StyleParameter
} from '@karma.run/react'

import {toArray} from '@karma.run/utility'

import {defaultTheme} from './defaultTheme'

export interface ThemeColors {
  primary: string
  primaryDark: string

  action: string
  actionDark: string

  success: string
  successDark: string

  alert: string
  alertDark: string

  gray: string
  grayDark: string
  grayLight: string

  light: string
  dark: string

  white: string
}

export interface Theme {
  colors: ThemeColors
}

export const ThemeContext = createContext<Theme>(defaultTheme)

export interface ThemeProviderProps {
  theme?: Theme
  children?: ReactNode
}

export function ThemeProvider({theme, children}: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme || defaultTheme}>{children}</ThemeContext.Provider>
}

export function useThemeStyle(): (...rules: CSSRule<{theme: Theme}>[]) => string
export function useThemeStyle<P>(props: P): (...rules: CSSRule<P & {theme: Theme}>[]) => string
export function useThemeStyle<P>(props?: P): (...rules: CSSRule<P & {theme: Theme}>[]) => string {
  const theme = useContext(ThemeContext)
  return useStyle({...props, theme} as P & {theme: Theme})
}

export type CSSRuleWithTheme<P = {}> = CSSRule<P & {theme: Theme}>

export function cssRuleWithTheme<P = {}>(styleFn: CSSRuleWithTheme<P>): CSSRuleWithTheme<P> {
  return styleFn
}

export function themeStyled<
  E extends (keyof JSX.IntrinsicElements) | ComponentType<{className?: string}>,
  S extends StyleParameter
>(element: E, styles: S) {
  const Element = element as any
  const forwardedRef = forwardRef<
    RefTypeForElement<E>,
    Omit<PropsForElementAndStyle<E, S>, 'theme'>
  >((props, ref) => {
    const style = useThemeStyle(props)
    return <Element ref={ref} {...props} className={style(...toArray(styles))} />
  })

  const displayName = typeof element === 'string' ? element : Element.displayName || Element.name
  forwardedRef.displayName = `ThemeStyled(${displayName})`

  return forwardedRef
}
