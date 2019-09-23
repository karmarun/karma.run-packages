import React, {ReactNode} from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, pxToEm, Spacing} from '../style/helpers'

const OverlayBackgroundStyle = cssRuleWithTheme(({theme}) => ({
  position: 'fixed',
  width: '100%',
  height: '100%'
}))

const OverlayStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  borderRadius: pxToRem(10),
  overflow: 'hidden',
  padding: pxToRem(Spacing.Small)
}))

export interface OverlayProps {
  readonly children: ReactNode
}

export function Overlay({children}: OverlayProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(OverlayBackgroundStyle)}>
      <div className={css(OverlayStyle)}>{children}</div>
    </div>
  )
}
