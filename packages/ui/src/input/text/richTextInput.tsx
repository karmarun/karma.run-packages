import React, {ReactNode, forwardRef} from 'react'

import {Editor as CoreEditor, Value} from 'slate'
import {Editor, BasicEditorProps, Plugin, EditorProps} from 'slate-react'
import {useStyle, cssRule} from '@karma.run/react'

import {BaseButton} from '../../atoms/baseButton'
import {IconType, Icon, IconScale} from '../../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../../style/themeContext'
import {FontSize, Spacing, TransitionDuration, ZIndex} from '../../style/helpers'

const RichTextInputStyle = cssRule(() => ({
  width: '100%',
  minHeight: '100%'
}))

export interface RichTextInputProps extends BasicEditorProps {}

export const RichTextInput = forwardRef<Editor, RichTextInputProps>(function RichTextInput(
  props,
  ref
) {
  const css = useStyle()
  return <Editor ref={ref} {...props} className={css(RichTextInputStyle)} />
})

export function RichTextMenuPlugin(menuItems: EditMenuButton[]): Plugin {
  return {
    renderEditor(props: EditorProps, editor: CoreEditor, next: () => any) {
      return (
        <>
          <EditMenu focused={editor.value.selection.isFocused}>
            {menuItems.map((item, idx) => (
              <EditMenuButton
                key={idx}
                editor={editor}
                isActive={item.isActive}
                icon={item.icon}
                onApply={item.onApply}
                label={item.label}
              />
            ))}
          </EditMenu>
          {next()}
        </>
      )
    }
  }
}

type MenuStyleProps = Omit<EditMenuProps, 'children'>

const EditMenuStyle = cssRuleWithTheme<MenuStyleProps>(({focused, theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'sticky',
  zIndex: ZIndex.Default,
  top: 0,
  backgroundColor: theme.colors.white,
  marginBottom: Spacing.ExtraSmall,
  opacity: focused ? 1 : 0.3,
  transitionProperty: 'opacity',
  transitionDuration: TransitionDuration.Fast
}))

export interface EditMenuProps {
  readonly focused?: boolean
  readonly children: ReactNode
}

export function EditMenu({focused, children}: EditMenuProps) {
  const css = useThemeStyle({focused})
  return <div className={css(EditMenuStyle)}>{children}</div>
}

export const EditMenuButtonStyle = cssRuleWithTheme<{isActive: boolean}>(({isActive, theme}) => ({
  fill: isActive ? theme.colors.action : theme.colors.dark,
  fontSize: FontSize.Medium,
  paddingLeft: Spacing.Tiny / 2,
  paddingRight: Spacing.Tiny / 2,
  '&:hover': {
    backgroundColor: theme.colors.light
  }
}))

export interface EditMenuButton {
  readonly icon: IconType
  readonly label: string

  onApply(editor?: CoreEditor, value?: Value, label?: string): void
  isActive(editor?: CoreEditor, value?: Value, label?: string): boolean
}

export interface EditMenuButtonProps extends EditMenuButton {
  readonly editor?: CoreEditor
}

export function EditMenuButton({editor, onApply, icon, label, isActive}: EditMenuButtonProps) {
  return (
    <BaseButton
      onMouseDown={e => {
        e.preventDefault()
        onApply(editor, editor ? editor.value : undefined, label)
      }}
      style={EditMenuButtonStyle}
      styleProps={{isActive: isActive(editor, editor ? editor.value : undefined, label)}}>
      <Icon element={icon} scale={IconScale.Equal} />
    </BaseButton>
  )
}
