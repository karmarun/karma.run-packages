import React, {forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import {styled} from '@karma.run/react'

import {IconElement, Icon} from '../data/icon'
import {cssRuleWithTheme, themeMiddleware, Theme} from '../style/themeContext'

import {
  TransitionDuration,
  FontSize,
  MarginProps,
  FlexChildProps,
  extractStyleProps,
  BorderWidth
} from '../style/helpers'

export type IconButtonVariant = 'default' | 'light' | 'large'

interface IconButtonStyleProps extends MarginProps, FlexChildProps {
  active?: boolean
  disabled?: boolean
  variant: IconButtonVariant
  theme: Theme
}

const IconButtonStyle = cssRuleWithTheme<IconButtonStyleProps>(
  ({theme, active, disabled, variant, ...props}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'IconButton' : undefined,

    display: 'flex',

    flexShrink: 0,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',

    padding: 0,

    width: variant === 'large' ? 40 : 26,
    height: variant === 'large' ? 40 : 26,
    fontSize: variant === 'large' ? FontSize.Heading2 : FontSize.Large,
    lineHeight: 1,

    borderRadius: '100%',
    backgroundColor: variant === 'light' ? 'transparent' : theme.colors.white,

    borderStyle: variant === 'default' ? 'solid' : 'none',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.grayLight,

    fill: disabled
      ? theme.colors.grayLight
      : variant === 'large'
      ? theme.colors.action
      : theme.colors.grayDark,

    transitionProperty: 'background-color, border-color, fill',
    transitionDuration: TransitionDuration.Fast,
    transitionTimingFunction: 'ease',

    cursor: 'pointer',
    pointerEvents: disabled ? 'none' : undefined,

    ...props,

    ':hover': {
      borderColor: theme.colors.action,
      backgroundColor: theme.colors.light
    },

    ':active': {
      borderColor: theme.colors.action,
      backgroundColor: theme.colors.grayLight,
      fill: theme.colors.action
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ...(active
      ? {
          borderColor: theme.colors.action,
          backgroundColor: theme.colors.grayLight,
          fill: theme.colors.action
        }
      : {})
  })
)

const IconButtonElement = styled('button', IconButtonStyle, themeMiddleware)
const LinkIconButtonElement = styled('a', IconButtonStyle, themeMiddleware)

export interface BaseIconButtonProps extends MarginProps, FlexChildProps {
  active?: boolean
  icon: IconElement
  variant?: IconButtonVariant
  disabled?: boolean
}

export type IconButtonProps = BaseIconButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
export type LinkIconButtonProps = BaseIconButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {icon, variant = 'default', active, disabled, ...props},
  ref
) {
  const [marginProps, elementProps] = extractStyleProps(props)

  return (
    <IconButtonElement
      ref={ref}
      styleProps={{variant, active, disabled, ...marginProps}}
      disabled={disabled}
      {...elementProps}>
      <Icon element={icon} block />
    </IconButtonElement>
  )
})

export const LinkIconButton = forwardRef<HTMLAnchorElement, LinkIconButtonProps>(
  function LinkIconButton({icon, variant = 'default', active, disabled, ...props}, ref) {
    const [marginProps, elementProps] = extractStyleProps(props)

    return (
      <LinkIconButtonElement
        ref={ref}
        styleProps={{variant, active, disabled, ...marginProps}}
        tabIndex={disabled ? -1 : undefined}
        {...elementProps}>
        <Icon element={icon} block />
      </LinkIconButtonElement>
    )
  }
)
