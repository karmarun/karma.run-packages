import React from 'react'
import {styled} from '@karma.run/react'
import {hexToRgba, TransitionDuration} from '../style/helpers'
import {themeMiddleware, Theme} from '../style/themeContext'
import {TransitionStatus} from 'react-transition-group/Transition'
import {Modal, ModalProps} from './modal'

interface ModalBackgroundProps {
  transitionStatus: TransitionStatus
  theme: Theme
}

const DrawerContainer = styled(
  'div',
  ({theme, transitionStatus}: ModalBackgroundProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'DrawerContainer' : undefined,

    position: 'absolute',

    right: 0,
    height: '100%',

    backgroundColor: hexToRgba(theme.colors.dark, 0.5),
    transitionProperty: 'transform box-shadow',
    transitionDuration: TransitionDuration.Slow,

    boxShadow:
      transitionStatus === 'entered'
        ? '0 0 10px 0 rgba(0, 0, 0, 0.2)'
        : '0 0 10px 0 rgba(0, 0, 0, 0)',

    transform: transitionStatus === 'entered' ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'
  }),
  themeMiddleware
)

export function Drawer({children, ...props}: ModalProps) {
  return (
    <Modal {...props}>
      {transitionStatus => (
        <DrawerContainer styleProps={{transitionStatus}}>
          {children && children(transitionStatus)}
        </DrawerContainer>
      )}
    </Modal>
  )
}
