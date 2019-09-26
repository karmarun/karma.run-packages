import React, {ReactNode} from 'react'
import {BaseButton} from '../atoms/baseButton'
import {IconType, Icon, IconScale} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize} from '../style/helpers'
import {Spacing} from '../style/helpers'
import {cssRule} from '@karma.run/react'

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

//
export const RichTextEditButtonStyle = cssRuleWithTheme(({theme}) => ({
  fill: theme.colors.white,
  fontSize: pxToRem(FontSize.Medium),
  paddingLeft: pxToRem(Spacing.Tiny / 2),
  paddingRight: pxToRem(Spacing.Tiny / 2),
  '&:hover': {
    backgroundColor: theme.colors.grayDark
  }
}))

export interface RichTextEditButtonProps {
  onClick(): void
  icon: IconType
}

const SpanStyle = cssRule({})

export function RichTextEditButton({onClick, icon}: RichTextEditButtonProps) {
  return (
    <BaseButton onClick={onClick} style={RichTextEditButtonStyle}>
      <Icon type={icon} scale={IconScale.Equal} />
    </BaseButton>
  )
}
