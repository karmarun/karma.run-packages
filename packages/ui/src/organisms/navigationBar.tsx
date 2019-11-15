import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import { Spacing} from '../style/helpers'

const NavigationBarStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
  backgroundColor: theme.colors.white,
  borderBottom: `solid 1px ${theme.colors.grayLight}`
}))

const NavigationBarLeftWrapperStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flex: 1
}))

const NavigationBarCenterWrapperStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  margin: `0 ${Spacing.ExtraSmall}`
}))

const NavigationBarRightWrapperStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end'
}))

export interface NavigationBarProps {
  leftChildren?: ReactNode
  rightChildren?: ReactNode
  centerChildren?: ReactNode
}

export function NavigationBar({leftChildren, rightChildren, centerChildren}: NavigationBarProps) {
  const css = useThemeStyle()

  return (
    <div className={css(NavigationBarStyle)}>
      <div className={css(NavigationBarLeftWrapperStyle)}>{leftChildren}</div>
      <div className={css(NavigationBarCenterWrapperStyle)}>{centerChildren}</div>
      <div className={css(NavigationBarRightWrapperStyle)}>{rightChildren}</div>
    </div>
  )
}
