import React from 'react'

import {pxToRem, FontSize, Spacing} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {BaseInput, InputType} from './baseInput'
import {FontInlineSmall} from '../style/textStyles'

const CheckboxContainerStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  cursor: 'pointer',

  width: '100%'
}))

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',

  width: 0,
  height: 0,
  opacity: 0,

  appearance: 'none',

  ':checked + span': {
    backgroundColor: theme.colors.action,
    borderColor: theme.colors.actionDark
  },

  ':checked + span::after': {
    display: 'block',

    top: pxToRem(1),
    left: pxToRem(6),
    width: pxToRem(6),
    height: pxToRem(13),

    border: `solid ${theme.colors.white}`,
    borderWidth: `0 ${pxToRem(2)} ${pxToRem(2)} 0`,
    transform: 'rotate(42deg)'
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',

  width: pxToRem(20),
  height: pxToRem(20),
  borderRadius: pxToRem(2),
  backgroundColor: theme.colors.light,
  border: `1px solid ${theme.colors.grayDark}`,

  '::after': {
    content: '""',
    position: 'absolute',
    display: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.dark,
  fontSize: pxToRem(FontSize.Medium),
  marginLeft: pxToRem(Spacing.ExtraSmall)
}))

export interface CheckboxProps {
  readonly id?: string
  readonly label: string
  readonly value: boolean
  readonly disabled?: boolean

  onChange(value: boolean, event: React.ChangeEvent<HTMLInputElement>): void
}

export function Checkbox({id, label, ...props}: CheckboxProps) {
  const {css} = useThemeStyle()

  return (
    <label className={css(CheckboxContainerStyle)} htmlFor={id}>
      <BaseInput id={id} type={InputType.Checkbox} style={CheckboxStyle} {...props} />
      <span className={css(CheckMarkStyle)} />
      <span className={css(LabelStyle)}>
        <FontInlineSmall>{label}</FontInlineSmall>
      </span>
    </label>
  )
}
