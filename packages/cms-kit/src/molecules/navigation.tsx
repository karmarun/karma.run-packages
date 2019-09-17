import React from 'react'
import {MenuItem} from './blockSelectorMenu'
import {MenuIconButton} from '../atoms/menuIconButton'
import {IconSize, Icon, IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {Button} from '../atoms/button'
import {IconButton} from '../atoms/iconButton'
import {pxToRem} from '../style/helpers'

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
          label={isOpen ? item.label : undefined}
        />
      ))}
    </div>
  )
}

export const NavigationButtonStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.light,

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
  return (
    <IconButton
      className={css(NavigationButtonStyle)}
      icon={isOpen ? IconType.ChevronLeft : IconType.ChevronRight}
      onClick={onChange}
      iconSize={IconSize.Small}
    />
  )
}
