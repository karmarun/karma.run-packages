import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {FontSize} from '../style/fontSize'
import {TransitionDuration} from '../style/transition'

export const PrimaryButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.white,
  fontSize: pxToRem(FontSize.Medium),
  minWidth: pxToRem(140),
  fontWeight: 'bold',
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
      {label}
    </BaseButton>
  )
}
