import React, {useContext} from 'react'
import {BaseButton, ButtonProps} from '../../atoms/baseButton'
import {IconType, Icon, IconScale} from '../../atoms/icon'

import {Spacing, TransitionDuration, FontSize} from '../../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../../style/themeContext'
import {NavigationContext} from '../../organisms/navigation'

interface MenuButtonStyleProps {
  readonly isCollapsed: boolean
}

const MenuButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  alignItems: 'center',

  padding: `12px 18px`,

  width: '100%',
  fontSize: FontSize.Medium,
  textAlign: 'left',

  fill: theme.colors.dark,
  color: theme.colors.dark,

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

const LabelStyle = cssRuleWithTheme<MenuButtonStyleProps>(({isCollapsed}) => ({
  marginLeft: Spacing.ExtraSmall,
  whiteSpace: 'nowrap',
  opacity: isCollapsed ? 0 : 1,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow
}))

export interface MenuButtonProps extends ButtonProps {
  readonly label?: string
  readonly icon: IconType
  readonly iconScale?: IconScale
  readonly hideLabel?: boolean
}

export function MenuButton({
  label,
  iconScale = IconScale.Larger,
  icon,
  href,
  onClick
}: MenuButtonProps) {
  const {isCollapsed} = useContext(NavigationContext)
  const css = useThemeStyle({isCollapsed})

  return (
    <BaseButton href={href} onClick={onClick} style={MenuButtonStyle}>
      <Icon element={icon} scale={iconScale} block />
      <span className={css(LabelStyle)}>{label}</span>
    </BaseButton>
  )
}
