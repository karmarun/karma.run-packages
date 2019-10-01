import {CSSStyle} from '@karma.run/react'

export enum Breakpoint {
  Mobile = 0,
  Desktop = 750
}

export enum ZIndex {
  Default = 0,
  NavigationBar = 10
}

export enum Spacing {
  None = 0,
  Tiny = 5,
  ExtraSmall = 10,
  Small = 20,
  Medium = 30,
  Large = 40,
  ExtraLarge = 60
}

export enum FontSize {
  Small = 12,
  Medium = 16,
  Heading3 = 20,
  Heading2 = 24,
  Heading1 = 28,
  ExtraLarge = 60
}

export enum BorderWidth {
  Small = '1px'
}

export enum BorderRadius {
  Small = 5,
  Medium = 10
}

export enum TransitionDuration {
  Fast = '50ms',
  Slow = '200ms'
}

export function pxToRem(px: number) {
  return `${px / 10}rem`
}

export function pxToEm(px: number) {
  return `${px / 10}em`
}

export function onlyMobile(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (max-width: ${Breakpoint.Desktop - 1}px)`]: styles
  }
}

export function whenDesktop(styles: CSSStyle) {
  // prettier-ignore
  return {
    [`@media screen and (min-width: ${Breakpoint.Desktop}px)`]: styles
  }
}

export function hexToRgba(hex: string | number, alpha: number) {
  hex = typeof hex === 'string' ? parseInt(hex[0] === '#' ? hex.slice(1) : hex, 16) : hex

  const red = 0xff & hex
  const green = 0xff & (hex >> 4)
  const blue = 0xff & (hex >> 4)

  console.log('RED', red.toString(16), green.toString(16), blue.toString(16))
}

console.log('HEX', hexToRgba('#FFEECC', 0.5))
