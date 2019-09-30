import React, {ReactNode, ElementType, CSSProperties} from 'react'

import {pxToRem, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle, ThemeColors} from '../style/themeContext'

export type TypographyStyle =
  | 'title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'

export type TypographyTextAlign = 'left' | 'center' | 'right'
export type TypographyDisplay = 'block' | 'inline'
export type TypographySpacing = 'small' | 'large'

interface TypographStyleProps {
  readonly style: TypographyStyle
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing?: TypographySpacing
  readonly noWrap?: boolean
}

const TypographStyle = cssRuleWithTheme<TypographStyleProps>(
  ({style, color, align, display, spacing, noWrap, theme}) => ({
    display,
    textAlign: align,
    color: color ? theme.colors[color] : undefined,
    whiteSpace: noWrap ? 'nowrap' : undefined,
    textOverflow: noWrap ? 'ellipsis' : undefined,
    overflow: noWrap ? 'hidden' : undefined,
    marginTop: 0,
    marginBottom: spacing ? marginForTypographySpacing(spacing) : 0,
    ...stylesForTypographyStyle(style)
  })
)

export interface TypographyProps {
  readonly style?: TypographyStyle
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing?: TypographySpacing
  readonly noWrap?: boolean
  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

export function Typography({
  style = 'body1',
  color,
  align,
  display,
  spacing,
  noWrap,
  element = elementForTypographyVariant(style),
  children
}: TypographyProps) {
  const Element = element
  const {css} = useThemeStyle<TypographStyleProps>({style, color, align, display, spacing, noWrap})

  return <Element className={css(TypographStyle)}>{children}</Element>
}

export function elementForTypographyVariant(variant: TypographyStyle) {
  switch (variant) {
    case 'title':
      return 'h1'

    case 'h1':
      return 'h1'

    case 'h2':
      return 'h2'

    case 'h3':
      return 'h3'

    default:
      return 'p'
  }
}

export function marginForTypographySpacing(spacing: TypographySpacing): string {
  switch (spacing) {
    case 'small':
      return '0.4em'

    case 'large':
      return '0.8em'
  }
}

export function stylesForTypographyStyle(style: TypographyStyle): CSSProperties {
  switch (style) {
    case 'title':
      return {
        fontSize: pxToRem(FontSize.ExtraLarge)
      }

    case 'h1':
      return {
        fontSize: pxToRem(FontSize.Heading1)
      }

    case 'h2':
      return {
        fontSize: pxToRem(FontSize.Heading2)
      }

    case 'h3':
      return {
        fontSize: pxToRem(FontSize.Heading3)
      }

    case 'body1':
    case 'body2':
      return {
        fontSize: pxToRem(FontSize.Medium),
        fontWeight: style === 'body2' ? 'bold' : undefined
      }

    case 'subtitle1':
    case 'subtitle2':
      return {
        fontSize: pxToRem(FontSize.Small),
        fontStyle: style === 'subtitle2' ? 'italic' : undefined
      }
  }
}
