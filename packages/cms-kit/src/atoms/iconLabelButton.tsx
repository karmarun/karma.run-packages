import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {IconType, Icon, IconSize} from './icon'
import {cssRuleWithTheme} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/spacing'
import {TransitionDuration} from '../style/transition'
import {FontSize} from '../style/fontSize'

export const IconLabelButtonStyle = cssRuleWithTheme(({theme}) => ({
  minWidth: pxToRem(70),
  borderRadius: pxToRem(2),

  fontSize: pxToRem(FontSize.Small),

  padding: pxToRem(Spacing.Tiny),

  transition: 'fill ease-in, background-color ease-in',
  transitionDuration: TransitionDuration.Fast,

  '&:hover:enabled': {
    fill: theme.colors.action
  },

  '&:active:enabled': {
    fill: theme.colors.actionDark,
    backgroundColor: theme.colors.light
  },

  '&:disabled': {
    fill: theme.colors.gray,
    color: theme.colors.gray
  }
}))

export const IconLabelIconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Medium)
}))

export interface IconLabelButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly label: string
}

export function IconLabelButton({label, icon, ...rest}: IconLabelButtonProps) {
  return (
    <BaseButton {...rest} style={IconLabelButtonStyle}>
      <>
        <Icon type={icon} style={IconLabelIconStyle} />
        <div>{label}</div>
      </>
    </BaseButton>
  )
}
