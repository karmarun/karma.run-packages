import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {Spacing, BorderRadius, ZIndex} from '../style/helpers'
import {cssRule} from '@karma.run/react'

const contentMaxWidth = 520

const LoginTemplateStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.light,

  width: '100%',
  height: '100%'
}))

const LoginTemplateContentStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
  zIndex: ZIndex.Default,

  width: '100%',
  maxWidth: contentMaxWidth + Spacing.Large,

  padding: Spacing.Large,

  backgroundColor: theme.colors.white,
  borderRadius: BorderRadius.Medium,

  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)'
}))

const LoginBackgroundStyle = cssRule(() => ({
  position: 'absolute',

  top: '50%',
  left: '50%',

  transform: 'translate(-50%)',
  zIndex: ZIndex.Background
}))

export interface LoginTemplateProps {
  readonly children?: ReactNode
  readonly backgroundChildren?: ReactNode
}

export function LoginTemplate({backgroundChildren, children}: LoginTemplateProps) {
  const css = useThemeStyle()

  return (
    <div className={css(LoginTemplateStyle)}>
      <div className={css(LoginTemplateContentStyle)}>{children}</div>
      <div className={css(LoginBackgroundStyle)}>{backgroundChildren}</div>
    </div>
  )
}
