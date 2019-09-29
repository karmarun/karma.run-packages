import React, {ReactNode, ElementType, CSSProperties} from 'react'

import {pxToRem, FontSize, Spacing} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle, ThemeColors} from '../style/themeContext'

export type TypographyVariant =
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

interface TypographStyleProps {
  readonly variant: TypographyVariant
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing: Spacing
}

const TypographStyle = cssRuleWithTheme<TypographStyleProps>(
  ({variant, color, align, display, spacing, theme}) => ({
    display,
    textAlign: align,
    color: color ? theme.colors[color] : undefined,
    marginTop: 0,
    marginBottom: pxToRem(spacing),
    ...stylesForTypographyVariant(variant)
  })
)

export interface TypographyProps {
  readonly variant?: TypographyVariant
  readonly color?: keyof ThemeColors
  readonly align?: TypographyTextAlign
  readonly display?: TypographyDisplay
  readonly spacing?: Spacing
  readonly element?: ElementType<{className?: string}>
  readonly children?: ReactNode
}

export function Typography({
  variant = 'body1',
  color,
  align,
  display,
  spacing = Spacing.None,
  element,
  children
}: TypographyProps) {
  const Element = element || elementForTypographyVariant(variant)
  const {css} = useThemeStyle<TypographStyleProps>({variant, color, align, display, spacing})

  return <Element className={css(TypographStyle)}>{children}</Element>
}

export function elementForTypographyVariant(variant: TypographyVariant) {
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

export function stylesForTypographyVariant(variant: TypographyVariant): CSSProperties {
  switch (variant) {
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
        fontWeight: variant === 'body2' ? 'bold' : undefined
      }

    case 'subtitle1':
    case 'subtitle2':
      return {
        fontSize: pxToRem(FontSize.Small),
        fontStyle: variant === 'subtitle2' ? 'italic' : undefined
      }
  }
}
