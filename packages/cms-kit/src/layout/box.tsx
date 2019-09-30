import React, {ElementType, ReactNode} from 'react'
import {CSSRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {toArray} from '../utility'
import {cssRule} from '@karma.run/react'
import {FlexDirectionProperty} from 'csstype'

export interface BaseBoxProps {
  readonly flex?: boolean
  readonly flexDirection?: FlexDirectionProperty

  readonly padding?: number | string
  readonly paddingTop?: number | string
  readonly paddingBottom?: number | string
  readonly paddingLeft?: number | string
  readonly paddingRight?: number | string

  readonly margin?: number | string
  readonly marginTop?: number | string
  readonly marginBottom?: number | string
  readonly marginLeft?: number | string
  readonly marginRight?: number | string

  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

export interface BoxProps<P = undefined> extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BoxPropsWithoutStyleProps extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BoxPropsWithStyleProps<P = undefined> extends BaseBoxProps {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

interface BoxStyleProps {
  readonly flex?: boolean
  readonly flexDirection?: FlexDirectionProperty

  readonly paddingTop?: string
  readonly paddingBottom?: string
  readonly paddingLeft?: string
  readonly paddingRight?: string

  readonly marginTop?: string
  readonly marginBottom?: string
  readonly marginLeft?: string
  readonly marginRight?: string

  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

const BoxStyle = cssRule<BoxStyleProps>(
  ({flex, marginTop, marginBottom, marginLeft, marginRight}) => ({
    display: flex ? 'flex' : 'block',
    marginTop,
    marginBottom,
    marginLeft,
    marginRight
  })
)

export function Box(props: BoxPropsWithoutStyleProps): JSX.Element
export function Box<P = undefined>(props: BoxPropsWithStyleProps<P>): JSX.Element
export function Box<P = undefined>({
  element = 'div',
  style,
  styleProps,
  children,
  ...props
}: BoxProps<P>): JSX.Element {
  const Element = element
  const {css} = useThemeStyle(Object.assign({}, props, styleProps))

  return <Element className={css(BoxStyle, ...toArray(style))}>{children}</Element>
}
