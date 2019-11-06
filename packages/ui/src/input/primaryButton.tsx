import React, {forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react'
import {styled, padding, cssRule} from '@karma.run/react'

import {ButtonResetStyle} from '../atoms/baseButton'
import {themeMiddleware, Theme} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'

interface PrimaryButtonStyleProps {
  readonly fill?: boolean
  readonly disabled?: boolean
  readonly theme: Theme
}

const PrimaryButtonStyle = cssRule<PrimaryButtonStyleProps>(({fill, disabled, theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PrimaryButton' : undefined,

  ...ButtonResetStyle,
  ...padding(pxToRem(Spacing.ExtraSmall)),

  width: fill ? '100%' : undefined,
  minWidth: pxToRem(140),
  borderRadius: pxToRem(Spacing.ExtraSmall),

  color: disabled ? theme.colors.gray : theme.colors.white,
  backgroundColor: disabled ? theme.colors.grayLight : theme.colors.primary,

  fontSize: pxToRem(FontSize.Medium),
  fontWeight: 'bold',
  textAlign: 'center',

  transitionProperty: 'background-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  pointerEvents: disabled ? 'none' : undefined,

  ':link': {
    color: disabled ? theme.colors.gray : theme.colors.white
  },

  ':visited': {
    color: disabled ? theme.colors.gray : theme.colors.white
  },

  ':hover': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.light
  },

  ':active': {
    backgroundColor: theme.colors.primaryDark,
    color: theme.colors.grayLight
  }
}))

export interface BasePrimaryButtonProps {
  readonly label: string
  readonly fill?: boolean
  readonly disabled?: boolean
}

export type PrimaryButtonProps = BasePrimaryButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
export type PrimaryLinkButtonProps = BasePrimaryButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

const PrimaryButtonWrapper = styled('button', PrimaryButtonStyle, themeMiddleware)
const PrimaryLinkButtonWrapper = styled('a', PrimaryButtonStyle, themeMiddleware)

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton({label, fill, disabled, ...props}, ref) {
    return (
      <PrimaryButtonWrapper ref={ref} styleProps={{fill, disabled}} {...props}>
        {label}
      </PrimaryButtonWrapper>
    )
  }
)

export const PrimaryLinkButton = forwardRef<HTMLAnchorElement, PrimaryLinkButtonProps>(
  function PrimaryLinkButton({label, fill, disabled, ...props}, ref) {
    return (
      <PrimaryLinkButtonWrapper ref={ref} styleProps={{fill, disabled}} {...props}>
        {label}
      </PrimaryLinkButtonWrapper>
    )
  }
)
