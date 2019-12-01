import React, {ReactNode, forwardRef, ButtonHTMLAttributes} from 'react'

import {IconType, Icon, IconScale} from '../../atoms/icon'
import {cssRuleWithTheme, useThemeStyle, themeMiddleware, Theme} from '../../style/themeContext'
import {FontSize, Spacing, TransitionDuration, ZIndex, BorderRadius} from '../../style/helpers'
import {styled} from '@karma.run/react'

interface ToolbarStyleProps {
  readonly fadeOut?: boolean
}

const ToolbarStyle = cssRuleWithTheme<ToolbarStyleProps>(({fadeOut, theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'sticky',
  zIndex: ZIndex.Default,
  top: 0,
  backgroundColor: theme.colors.white,
  marginBottom: Spacing.ExtraSmall,
  opacity: fadeOut ? 0.3 : 1,
  transitionProperty: 'opacity',
  transitionDuration: TransitionDuration.Fast
}))

export interface ToolbarProps {
  readonly fadeOut?: boolean
  readonly children?: ReactNode
}

export function Toolbar({fadeOut, children}: ToolbarProps) {
  const css = useThemeStyle({fadeOut})
  return <div className={css(ToolbarStyle)}>{children}</div>
}

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: IconType
  readonly active?: boolean
}

interface ToolbarButtonElementStyleProps {
  readonly isActive?: boolean
  readonly theme: Theme
}

export const ToolbarButtonElement = styled(
  'button',
  ({isActive, theme}: ToolbarButtonElementStyleProps) => ({
    fill: isActive ? theme.colors.action : theme.colors.dark,
    fontSize: FontSize.Medium,

    cursor: 'pointer',
    border: 'none',
    borderRadius: BorderRadius.Tiny,
    backgroundColor: 'transparent',

    padding: Spacing.ExtraTiny,

    ':hover': {
      backgroundColor: theme.colors.grayLight
    },

    ':focus': {
      outline: 'none',
      backgroundColor: theme.colors.grayLight
    }
  }),
  themeMiddleware
)

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton({icon, active, ...props}, ref) {
    return (
      <ToolbarButtonElement ref={ref} styleProps={{isActive: active}} {...props}>
        <Icon element={icon} scale={IconScale.Equal} block />
      </ToolbarButtonElement>
    )
  }
)
