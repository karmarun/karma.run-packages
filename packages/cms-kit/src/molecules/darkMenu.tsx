import React, {ReactNode} from 'react'

import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize} from '../style/helpers'
import {Spacing} from '../style/helpers'
import {Value, Editor} from 'slate'

export const DarkMenuStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark,
  padding: pxToRem(Spacing.Tiny),
  borderRadius: '5px'
}))

export interface DarkMenuProps {
  readonly children: ReactNode
}

export function DarkMenu({children}: DarkMenuProps) {
  const {css} = useThemeStyle()

  return <div className={css(DarkMenuStyle)}>{children}</div>
}

/**
 *
 * Rich Text Edit Button
 */
export const DarkMenuButtonStyle = cssRuleWithTheme<{isActive: boolean}>(({isActive, theme}) => ({
  fill: isActive ? theme.colors.action : theme.colors.white,
  fontSize: pxToRem(FontSize.Medium),
  paddingLeft: pxToRem(Spacing.Tiny / 2),
  paddingRight: pxToRem(Spacing.Tiny / 2),
  '&:hover': {
    backgroundColor: theme.colors.grayDark
  }
}))

export interface DarkMenuButton {
  readonly icon: IconType
  readonly label: string
  onClick(editor: Editor, value: Value, label: string): void
  isActive(editor: Editor, value: Value, label: string): boolean
}

export interface DarkMenuButtonProps extends DarkMenuButton {
  readonly editor: Editor
}

export function DarkMenuButton({editor, onClick, icon, label, isActive}: DarkMenuButtonProps) {
  return (
    <BaseButton
      onClick={e => onClick(editor, editor.value, label)}
      style={DarkMenuButtonStyle}
      styleProps={{isActive: isActive(editor, editor.value, label)}}>
      <Icon type={icon} scale={IconScale.Equal} />
    </BaseButton>
  )
}
