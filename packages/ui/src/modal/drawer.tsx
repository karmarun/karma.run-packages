import React from 'react'
import {styled} from '@karma.run/react'
import {hexToRgba, TransitionDuration, pxToRem} from '../style/helpers'
import {themeMiddleware, Theme} from '../style/themeContext'
import {TransitionStatus} from 'react-transition-group/Transition'
import {Modal, ModalProps} from './modal'

interface ModalBackgroundProps {
  readonly transitionStatus: TransitionStatus
  readonly theme: Theme
  readonly width?: number | string
}

const DrawerContainer = styled(
  'div',
  ({theme, transitionStatus, width}: ModalBackgroundProps) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'DrawerContainer' : undefined,

    position: 'absolute',

    right: 0,

    width: typeof width === 'number' ? pxToRem(width) : width,
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

export interface DrawerProps extends ModalProps {
  readonly width?: number
}

export function Drawer({children, width, ...props}: DrawerProps) {
  return (
    <Modal {...props}>
      {transitionStatus => (
        <DrawerContainer styleProps={{transitionStatus, width}}>
          {children && children(transitionStatus)}
        </DrawerContainer>
      )}
    </Modal>
  )
}
