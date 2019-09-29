import React from 'react'
import {BaseButton, ButtonProps} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'

import {pxToRem, Spacing, TransitionDuration, FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule} from '@karma.run/react'

interface MenuIconButtonStyleProps {
  readonly hideLabel: boolean
}

const MenuIconButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  padding: `${pxToRem(12)} ${pxToRem(18)}`,

  width: '100%',
  fontSize: pxToRem(FontSize.Medium),
  textAlign: 'left',

  fill: theme.colors.dark,

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  ':hover:enabled': {
    backgroundColor: theme.colors.grayLight,
    fill: theme.colors.dark
  },

  ':active:enabled': {
    backgroundColor: theme.colors.white,
    fill: theme.colors.primaryDark
  }
}))

const LabelStyle = cssRuleWithTheme<MenuIconButtonStyleProps>(({hideLabel, theme}) => ({
  marginLeft: pxToRem(Spacing.ExtraSmall),
  whiteSpace: 'nowrap',
  opacity: hideLabel ? 0 : 1,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast
}))

export interface MenuIconButtonProps extends ButtonProps {
  readonly label?: string
  readonly icon: IconType
  readonly iconScale?: IconScale
  readonly hideLabel?: boolean
}

export function MenuIconButton({
  label,
  hideLabel = false,
  iconScale = IconScale.Larger,
  icon,
  href,
  onClick
}: MenuIconButtonProps) {
  const {css} = useThemeStyle({hideLabel})

  return (
    <BaseButton href={href} onClick={onClick} style={MenuIconButtonStyle}>
      <Icon type={icon} scale={iconScale} />
      <span className={css(LabelStyle)}>{label}</span>
    </BaseButton>
  )
}
