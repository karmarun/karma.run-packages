import React, {ReactNode, useEffect} from 'react'

import {styled} from '@karma.run/react'
import Transition, {TransitionStatus} from 'react-transition-group/Transition'
import {createPortal} from 'react-dom'

import {Theme, themeMiddleware} from '../style/themeContext'

import {
  Spacing,
  FontSize,
  hexToRgba,
  BorderWidth,
  TransitionDurationRaw,
  TransitionDuration,
  BorderRadius,
  ZIndex
} from '../style/helpers'

function borderColorForType(type: ToastType, theme: Theme): string {
  switch (type) {
    case 'info':
      return theme.colors.actionDark
    case 'success':
      return theme.colors.successDark
    case 'error':
      return theme.colors.alertDark
  }
}

function backgroundColorForType(type: ToastType, theme: Theme): string {
  switch (type) {
    case 'info':
      return theme.colors.action
    case 'success':
      return theme.colors.success
    case 'error':
      return theme.colors.alert
  }
}

export type ToastType = 'info' | 'success' | 'error'

interface ToastContainerProps {
  type: ToastType
  theme: Theme
  transitionStatus: TransitionStatus
}

const ToastContainer = styled(
  'div',
  ({type, theme, transitionStatus}: ToastContainerProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Toast' : undefined,

    cursor: 'pointer',
    position: 'fixed',
    left: '50%',
    top: Spacing.Medium,
    zIndex: ZIndex.Toast,

    transform: `translateX(-50%) scale(${transitionStatus === 'entered' ? 1 : 0.5})`,
    transformOrigin: 'center',

    opacity: transitionStatus === 'entered' ? 1 : 0,

    backgroundColor: hexToRgba(backgroundColorForType(type, theme), 0.85),

    textAlign: 'center',
    fontSize: FontSize.Medium,
    fontWeight: 'bold',
    color: theme.colors.white,

    borderRadius: BorderRadius.Small,
    borderWidth: BorderWidth.Small,
    borderStyle: 'solid',
    borderColor: hexToRgba(borderColorForType(type, theme), 0.85),

    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',

    transitionProperty: 'opacity, transform',
    transitionDuration: TransitionDuration.Slow,
    transitionTimingFunction: 'linear, cubic-bezier(0.5, 0.5, 0.5, 2)',

    padding: Spacing.ExtraSmall
  }),
  themeMiddleware
)

export interface ToastProps {
  type: ToastType
  open: boolean
  autoHideDuration?: number
  children?: ReactNode

  onClose?: () => void
}

export function Toast({type, open, autoHideDuration, onClose, children}: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(() => onClose && onClose(), autoHideDuration)
    return () => clearTimeout(timeout)
  })

  return (
    <Transition in={open} timeout={TransitionDurationRaw.Slow} unmountOnExit>
      {transitionStatus =>
        createPortal(
          <ToastContainer
            styleProps={{type, transitionStatus}}
            onClick={() => onClose && onClose()}>
            {children}
          </ToastContainer>,
          document.body
        )
      }
    </Transition>
  )
}
