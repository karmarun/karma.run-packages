import React, {ReactNode} from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing, ZIndex} from '../style/helpers'
import {TextButton} from './textButton'
import {OutlineButton} from '..'
import {FontStyle} from '../style/textStyles'

const ModalStyle = cssRuleWithTheme(({theme}) => ({
  position: 'fixed',
  top: pxToRem(30),
  right: 0,
  bottom: 0,
  left: 0,
  WebkitOverflowScrolling: 'touch',
  overflow: 'hidden',
  ZIndex: 1050
}))

const ModalDialogStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  borderRadius: pxToRem(8),
  overflow: 'hidden',
  maxWidth: '500px'
}))

const ModalContentStyle = cssRuleWithTheme(({theme}) => ({}))

const ModalHeaderStyle = cssRuleWithTheme(({theme}) => ({
  textAlign: 'center'
}))

const ModalBodyStyle = cssRuleWithTheme(({theme}) => ({}))

const ModalFooterStyle = cssRuleWithTheme(({theme}) => ({
  float: 'right'
}))

export interface ModalProps {
  readonly title: string
  readonly children: ReactNode
  onConfirm?(): void
  onCancel?(): void
}

export function Modal({title, children, onConfirm, onCancel}: ModalProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(ModalStyle)}>
      <div className={css(ModalDialogStyle)}>
        <div className={css(ModalContentStyle)}>
          <div className={css(ModalHeaderStyle)}>
            <h3>{title}</h3>
          </div>
          <div className={css(ModalBodyStyle)}>{children}</div>
          <div className={css(ModalFooterStyle)}>
            {onCancel && <TextButton label={'Cancel'} onClick={onCancel} />}
            {onConfirm && <OutlineButton label={'Confirm'} onClick={onConfirm} />}
          </div>
        </div>
      </div>
    </div>
  )
}
