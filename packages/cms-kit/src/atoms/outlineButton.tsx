import React from 'react'
import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {FontSize} from '../style/fontSize'
import {TransitionDuration} from '../style/transition'

export const OutlineButtonStyle = cssRuleWithTheme(({theme}) => ({
  border: `1px ${theme.colors.action}  solid`,
  borderRadius: pxToRem(10),
  padding: pxToRem(10),
  color: theme.colors.action,
  fontSize: pxToRem(FontSize.Medium),
  minWidth: pxToRem(140),
  transition: 'background-color ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover': {
    backgroundColor: theme.colors.light
  },

  '&:active': {
    backgroundColor: theme.colors.actionDark
  },

  '&:disabled': {
    backgroundColor: theme.colors.light,
    borderColor: theme.colors.grayLight,
    color: theme.colors.gray,
    ':hover': {
      backgroundColor: theme.colors.light,
      borderColor: theme.colors.grayLight,
      color: theme.colors.gray
    }
  }
}))

export interface OutlineButtonProps extends ButtonProps {
  readonly label: string
}

export function OutlineButton({label, ...rest}: OutlineButtonProps) {
  return (
    <BaseButton {...rest} style={OutlineButtonStyle}>
      {label}
    </BaseButton>
  )
}
