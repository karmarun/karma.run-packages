import React, {ReactNode, useState} from 'react'
import {IconType, BlockIcon} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, TransitionDuration, Spacing, FontSize} from '../style/helpers'
import {BaseButton} from '../atoms/baseButton'

export const navigationWidth = 280
export const navigationWidthCollapsed = 60

export interface NavigationStyleProps {
  readonly isCollapsed: boolean
}

const NavigationStyle = cssRuleWithTheme<NavigationStyleProps>(({isCollapsed, theme}) => ({
  display: 'flex',
  flexDirection: 'column',

  width: isCollapsed ? pxToRem(navigationWidthCollapsed) : pxToRem(navigationWidth),
  height: '100%',

  overflow: 'hidden',
  borderRight: `1px solid ${theme.colors.gray}`,
  backgroundColor: theme.colors.light,

  transitionProperty: 'width',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast
}))

const NavigationItemContentStyle = cssRuleWithTheme<NavigationStyleProps>(({theme}) => ({
  marginTop: pxToRem(85),
  marginBottom: pxToRem(Spacing.Large),
  overflow: 'auto',

  '::-webkit-scrollbar': {
    width: pxToRem(Spacing.Tiny)
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.gray,
    borderTopLeftRadius: pxToRem(Spacing.Tiny),
    borderBottomLeftRadius: pxToRem(Spacing.Tiny)
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: theme.colors.grayLight,
    borderTopLeftRadius: pxToRem(Spacing.Tiny),
    borderBottomLeftRadius: pxToRem(Spacing.Tiny)
  }
}))

export interface NavigationProps {
  readonly children?: (isCollapsed: boolean) => ReactNode
}

export function Navigation({children}: NavigationProps) {
  const [isCollapsed, setCollapsed] = useState(false)
  const {css} = useThemeStyle({isCollapsed})

  return (
    <div className={css(NavigationStyle)}>
      <NavigationButton isCollapsed={isCollapsed} onClick={() => setCollapsed(!isCollapsed)} />
      <div className={css(NavigationItemContentStyle)}>{children && children(isCollapsed)}</div>
    </div>
  )
}

const NavigationButtonStyle = cssRuleWithTheme(({theme}) => ({
  alignSelf: 'flex-end',

  padding: pxToRem(18),
  fontSize: pxToRem(FontSize.Heading2),
  fill: theme.colors.gray,

  ':focus': {
    fill: theme.colors.action
  }
}))

export interface NavigationButtonProps {
  readonly isCollapsed: boolean
  onClick(): void
}

export function NavigationButton({isCollapsed, onClick}: NavigationButtonProps) {
  return (
    <BaseButton onClick={onClick} style={NavigationButtonStyle}>
      <BlockIcon type={isCollapsed ? IconType.ChevronRight : IconType.ChevronLeft} />
    </BaseButton>
  )
}
