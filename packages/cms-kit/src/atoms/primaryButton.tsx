import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration} from '../style/helpers'
import {FontMedium, FontFace} from '../style/textStyles'

export const PrimaryButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.white,
  minWidth: pxToRem(140),
  transition: 'background-color ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.grayLight
  },

  ':disabled': {
    backgroundColor: theme.colors.grayLight,
    color: theme.colors.gray
  }
}))

export interface PrimaryButtonProps extends ButtonProps {
  readonly label: string
}

export function PrimaryButton({label, ...rest}: PrimaryButtonProps) {
  return (
    <BaseButton {...rest} style={PrimaryButtonStyle}>
      <FontMedium fontFace={FontFace.Bold}>{label}</FontMedium>
    </BaseButton>
  )
}
