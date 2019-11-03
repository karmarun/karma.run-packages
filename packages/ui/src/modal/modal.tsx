import React, {ReactNode, useEffect} from 'react'
import {createPortal} from 'react-dom'
import {Transition} from 'react-transition-group'
import {styled, useStaticStyle} from '@karma.run/react'
import {hexToRgba, TransitionDuration, TransitionDurationRaw} from '../style/helpers'
import {themeMiddleware, Theme} from '../style/themeContext'
import {TransitionStatus} from 'react-transition-group/Transition'

const ModalContainer = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ModalContainer' : undefined,

  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}))

interface ModalBackgroundProps {
  transitionStatus: TransitionStatus
  theme: Theme
}

const ModalBackground = styled(
  'div',
  ({theme, transitionStatus}: ModalBackgroundProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'ModalBackground' : undefined,

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    backgroundColor: hexToRgba(theme.colors.dark, 0.5),
    backdropFilter: 'blur(2px)',
    transitionProperty: 'opacity',
    transitionDuration: '500ms',

    opacity: {
      entering: 0,
      entered: 1,
      exiting: 0,
      exited: 0,
      unmounted: 0
    }[transitionStatus]
  }),
  themeMiddleware
)

const ModalContent = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ModalContent' : undefined,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}))

export interface ModalProps {
  open: boolean
  onClose?: () => void
  children?: (transitionStatus: TransitionStatus) => ReactNode
}

export function Modal({children, onClose, open}: ModalProps) {
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '' // TODO: Move into context
  })

  return (
    <Transition in={open} timeout={500} unmountOnExit>
      {transitionStatus =>
        createPortal(
          <ModalContainer>
            <ModalBackground styleProps={{transitionStatus}} />
            <ModalContent onClick={e => e.target === e.currentTarget && onClose && onClose()}>
              {children && children(transitionStatus)}
            </ModalContent>
          </ModalContainer>,
          document.body
        )
      }
    </Transition>
  )
}
