import React, {ReactNode, forwardRef, ButtonHTMLAttributes} from 'react'

import {IconElement, Icon, IconScale} from '../data/icon'
import {themeMiddleware, Theme} from '../style/themeContext'
import {FontSize, Spacing, TransitionDuration, ZIndex, BorderRadius} from '../style/helpers'
import {styled} from '@karma.run/react'

const ToolbarElement = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Toolbar' : undefined,

  pointerEvents: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'sticky',
  top: 60 + Spacing.ExtraSmall, // TODO: Don't hardcode NavigationBar height into the toolbar, move all the position sticky stuff into own component
  zIndex: ZIndex.Default
}))

interface ToolbarContentStyleProps {
  readonly fadeOut: boolean
}

const ToolbarContent = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'ToolbarContent' : undefined,

    pointerEvents: 'auto',
    padding: Spacing.Tiny,
    backgroundColor: theme.colors.white,
    borderRadius: BorderRadius.Small,

    transitionProperty: 'opacity',
    transitionDuration: TransitionDuration.Fast
  }),
  themeMiddleware
)

const ToolbarInnerContent = styled(
  'div',
  ({fadeOut}: ToolbarContentStyleProps & {theme: Theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'ToolbarInnerContent' : undefined,

    display: 'flex',
    opacity: fadeOut ? 0.5 : 1,
    transitionProperty: 'opacity',
    transitionDuration: TransitionDuration.Fast
  }),
  themeMiddleware
)

export interface ToolbarProps {
  readonly fadeOut?: boolean
  readonly children?: ReactNode
}

export function Toolbar({fadeOut = false, children}: ToolbarProps) {
  return (
    <ToolbarElement>
      <ToolbarContent>
        <ToolbarInnerContent styleProps={{fadeOut}}>{children}</ToolbarInnerContent>
      </ToolbarContent>
    </ToolbarElement>
  )
}

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: IconElement
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

export const ToolbarDivider = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Divider' : undefined,

    width: '1px',
    alignSelf: 'stretch',

    marginLeft: Spacing.ExtraSmall,
    marginRight: Spacing.ExtraSmall,
    marginTop: Spacing.ExtraTiny,
    marginBottom: Spacing.ExtraTiny,

    backgroundColor: theme.colors.grayLight
  }),
  themeMiddleware
)
