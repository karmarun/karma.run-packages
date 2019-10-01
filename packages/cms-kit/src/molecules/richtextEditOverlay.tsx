import React, {ReactNode} from 'react'
import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize} from '../style/helpers'
import {Spacing} from '../style/helpers'
import {Editor} from 'slate-react'
import {Value} from 'slate'

export const RichtextEditOverlayStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark,
  padding: pxToRem(Spacing.Tiny),
  borderRadius: '5px'
}))

export interface RichtextEditOverlayProps {
  readonly children: ReactNode
}

export function RichtextEditOverlay({children}: RichtextEditOverlayProps) {
  const {css} = useThemeStyle()

  return <div className={css(RichtextEditOverlayStyle)}>{children}</div>
}

/**
 *
 * Rich Text Edit Button
 */
export const RichTextEditButtonStyle = cssRuleWithTheme<{isActive: boolean}>(
  ({isActive, theme}) => ({
    fill: isActive ? theme.colors.action : theme.colors.white,
    fontSize: pxToRem(FontSize.Medium),
    paddingLeft: pxToRem(Spacing.Tiny / 2),
    paddingRight: pxToRem(Spacing.Tiny / 2),
    '&:hover': {
      backgroundColor: theme.colors.grayDark
    }
  })
)

export interface RichTextEditButton {
  readonly icon: IconType
  readonly label: string
  onClick(editor: Editor, value: Value, label: string): void
  isActive(editor: Editor, value: Value): boolean
}

export interface RichTextEditButtonProps extends RichTextEditButton {
  readonly editor?: Editor
}

export function RichTextEditButton({
  editor,
  onClick,
  icon,
  label,
  isActive
}: RichTextEditButtonProps) {
  return (
    <BaseButton
      //onClick={e => onClick(editor, editor.value, label)}
      style={RichTextEditButtonStyle}
      //styleProps={{isActive: isActive(editor, editor.value)}}
      styleProps={{isActive: true}}>
      <Icon type={icon} scale={IconScale.Equal} />
    </BaseButton>
  )
}
