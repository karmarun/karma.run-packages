import React from 'react'
import {MenuItem} from './blockSelectorMenu'
import {MenuIconButton} from '../atoms/menuIconButton'
import {IconSize, Icon, IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'

export const NavigationStyle = cssRuleWithTheme(({theme}) => ({
  borderRight: `${pxToRem(1)} solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light
}))

export interface NavigationProps {
  isOpen: boolean
  onChange(): void
  menuItems: Array<MenuItem>
}

export function Navigation({isOpen, onChange, menuItems}: NavigationProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(NavigationStyle)}>
      <NavigationButton isOpen={isOpen} onChange={onChange} />
      {menuItems.map(item => (
        <MenuIconButton
          icon={item.icon}
          iconSize={IconSize.Default}
          title={isOpen ? item.label : undefined}
        />
      ))}
    </div>
  )
}

const NavigationButtonStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  border: 'none',
  height: pxToRem(iconSize)
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  height: pxToRem(iconSize),

  '& path': {
    fill: theme.colors.gray
  }
}))

export interface NavigationButtonProps {
  isOpen: boolean
  onChange(): void
}

export function NavigationButton({isOpen, onChange}: NavigationButtonProps) {
  const {css} = useThemeStyle()
  const iconSize = IconSize.Small

  return (
    <BaseButton onClick={onChange} style={NavigationButtonStyle} styleProps={{iconSize: iconSize}}>
      <Icon
        type={isOpen ? IconType.ChevronLeft : IconType.ChevronRight}
        style={IconStyle}
        styleProps={{iconSize: iconSize}}
      />
    </BaseButton>
  )
}
