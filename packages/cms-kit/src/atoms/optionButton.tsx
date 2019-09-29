import React from 'react'

import {BaseButton, ButtonProps} from './baseButton'
import {cssRuleWithTheme} from '../style/themeContext'
import {IconType, Icon} from './icon'
import {pxToRem, TransitionDuration, FontSize} from '../style/helpers'

const OptionButtonStyle = cssRuleWithTheme(({theme}) => ({
  width: pxToRem(40),
  height: pxToRem(40),

  fontSize: pxToRem(FontSize.Heading2),
  lineHeight: 1,

  backgroundColor: theme.colors.white,
  border: 'none',
  borderRadius: '100%',

  transition: 'background-color ease-in',
  transitionDuration: TransitionDuration.Fast,

  fill: theme.colors.action,

  ':hover:enabled': {
    backgroundColor: theme.colors.light
  },

  ':active:enabled': {
    backgroundColor: theme.colors.actionDark
  },

  ':disabled': {
    fill: theme.colors.gray
  }
}))

export interface OptionButtonProps extends ButtonProps {
  readonly icon: IconType
}

export function OptionButton({icon, ...rest}: OptionButtonProps) {
  return (
    <BaseButton {...rest} style={OptionButtonStyle}>
      <Icon type={icon} />
    </BaseButton>
  )
}
