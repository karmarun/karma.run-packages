import React, {ReactNode, MouseEventHandler} from 'react'
import {cssRule} from '@karma.run/react'

import {toArray} from '../utility'
import {useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'

export interface ButtonProps {
  readonly href?: string
  readonly rel?: string
  readonly title?: string
  readonly children?: ReactNode
  readonly onClick?: MouseEventHandler
  readonly disabled?: boolean
}

export interface BaseButtonProps<P = undefined> extends ButtonProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseButtonPropsWithoutStyleProps extends ButtonProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseButtonPropsWithStyleProps<P = undefined> extends ButtonProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

const BaseButtonStyle = cssRule({
  display: 'inline-block',
  overflow: 'hidden',

  cursor: 'pointer',
  fontSize: 'inherit',
  fontFamily: 'inherit',

  padding: 0,
  margin: 0,

  border: 'none',
  backgroundColor: 'transparent',

  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',

  ':disabled': {
    cursor: 'default'
  },

  ':focus': {
    outline: 'none'
  }
})

export function BaseButton(props: BaseButtonPropsWithoutStyleProps): JSX.Element
export function BaseButton<P = undefined>(props: BaseButtonPropsWithStyleProps<P>): JSX.Element
export function BaseButton<P = undefined>({
  href,
  style,
  styleProps,
  children,
  ...props
}: BaseButtonProps<P>): JSX.Element {
  const {css} = useThemeStyle(styleProps)
  const Element = href ? 'a' : 'button'

  return (
    <Element {...props} href={href} className={css(BaseButtonStyle, ...toArray(style))}>
      {children}
    </Element>
  )
}
