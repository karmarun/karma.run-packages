import React, {ReactNode} from 'react'
import {MenuItem} from './blockSelectorMenu'
import {IconSize, Icon, IconType} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'

export const NavigationStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({
  borderRight: `${pxToRem(1)} solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light,
  width: isOpen ? pxToRem(280) : pxToRem(60),
  height: '100vh',
  float: 'left',
  transition: '200ms'
}))

const NavigationItems = cssRuleWithTheme(({theme}) => ({
  marginTop: pxToRem(85)
}))

export interface NavigationProps {
  isOpen: boolean
  onChange(): void
  children: ReactNode
  menuItems: Array<MenuItem>
}

export function Navigation({isOpen, onChange, children}: NavigationProps) {
  const {css} = useThemeStyle({isOpen: isOpen})

  return (
    <div className={css(NavigationStyle)}>
      <NavigationButton isOpen={isOpen} onChange={onChange} />
      <div className={css(NavigationItems)}>{children}</div>
    </div>
  )
}

const NavigationButtonStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  border: 'none',
  height: pxToRem(iconSize)
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  height: pxToRem(iconSize),
  fill: theme.colors.gray
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
