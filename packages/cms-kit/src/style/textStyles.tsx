import React from 'react'

import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem, FontSize} from './helpers'
import {cssRuleWithTheme, useThemeStyle} from './themeContext'

export enum FontFace {
  Regular = 'regular',
  Bold = 'bold',
  Italic = 'italic'
}

export enum Align {
  Regular = 'initial',
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export interface TextStyleProps {
  fontFace: FontFace
  align: Align
}

export function getFontWeight(fontFace: FontFace) {
  if (fontFace === FontFace.Bold) return 'bold'
  else return 'normal'
}

export function getFontStyle(fontFace: FontFace) {
  if (fontFace === FontFace.Italic) return 'italic'
  else return 'normal'
}

export const TextStyle = cssRuleWithTheme<TextStyleProps>(({fontFace, align, theme}) => ({
  textAlign: align,
  fontWeight: getFontWeight(fontFace),
  fontStyle: getFontStyle(fontFace)
}))

export interface TextProps {
  readonly children: string
  readonly fontFace?: FontFace
  readonly align?: Align
}

// SMALL = 12px
export const TextSmallStyle = cssRule({
  fontSize: pxToRem(FontSize.Small)
})

export interface TextSmallProps extends TextProps {}

export function TextSmall({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextSmallProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, TextSmallStyle)}>{children}</div>
}

export function TextInlineSmall({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextSmallProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, TextSmallStyle)}>{children}</span>
}

// Label
export const LabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.grayDark
}))

export function Label({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextSmallProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(LabelStyle, TextStyle, TextSmallStyle)}>{children}</span>
}

// Description
export const DescriptionStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray
}))

export function Description({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextSmallProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(DescriptionStyle, TextStyle, TextSmallStyle)}>{children}</span>
}

// MEDIUM = 16px
export const TextMediumStyle = cssRule({
  fontSize: pxToRem(FontSize.Medium)
})

export interface TextMediumProps extends TextProps {}

export function TextMedium({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextMediumProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, TextMediumStyle)}>{children}</div>
}

export function TextInlineMedium({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextMediumProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, TextMediumStyle)}>{children}</span>
}

// Hint
export const HintStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray
}))

export function Hint({
  children,
  fontFace = FontFace.Regular,
  align = Align.Regular
}: TextMediumProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(HintStyle, TextStyle, TextMediumStyle)}>{children}</span>
}

// HEADING3 = 20px
export const Heading3Style = cssRule({
  fontSize: pxToRem(FontSize.Heading3)
})

export interface Heading3Props extends TextProps {}

export function Heading3({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading3Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, Heading3Style)}>{children}</div>
}

export function InlineHeading3({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading3Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, Heading3Style)}>{children}</span>
}

// HEADING2 = 24px
export const Heading2Style = cssRule({
  fontSize: pxToRem(FontSize.Heading2)
})

export interface Heading2Props extends TextProps {}

export function Heading2({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading2Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, Heading2Style)}>{children}</div>
}

export function InlineHeading2({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading2Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, Heading2Style)}>{children}</span>
}

// HEADING1 = 28px
export const Heading1Style = cssRule({
  fontSize: pxToRem(FontSize.Heading1)
})

export interface Heading1Props extends TextProps {}

export function Heading1({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading1Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, Heading1Style)}>{children}</div>
}

export function InlineHeading1({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: Heading1Props) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, Heading1Style)}>{children}</span>
}

// EXTRALARGE = 60px
export const TextExtraLargeStyle = cssRule({
  fontSize: pxToRem(FontSize.ExtraLarge)
})

export interface TextExtraLargeProps extends TextProps {}

export function TextExtraLarge({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: TextExtraLargeProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <div className={css(TextStyle, TextExtraLargeStyle)}>{children}</div>
}

export function TextInlineExtraLarge({
  children,
  fontFace = FontFace.Bold,
  align = Align.Regular
}: TextExtraLargeProps) {
  const style = {fontFace: fontFace, align: align}
  const {css} = useThemeStyle(style)
  return <span className={css(TextStyle, TextExtraLargeStyle)}>{children}</span>
}
