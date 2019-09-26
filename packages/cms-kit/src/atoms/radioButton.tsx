import React from 'react'

import {SelectChangeEvent, Select} from './select'

import {pxToRem, FontSize, Spacing} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BaseInput, InputType} from './baseInput'

const RadioBtnContainerStyle = cssRuleWithTheme(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  minHeight: pxToRem(30)
}))

const RadioButtonStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  width: 0,
  height: 0,

  ':checked ~ span': {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.actionDark
  },
  ':checked ~ span:after': {
    display: 'block',
    top: '2px',
    left: '2px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: theme.colors.action
  }
}))

const CheckMarkStyle = cssRuleWithTheme(({theme}) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: theme.colors.light,
  border: `1px solid ${theme.colors.grayDark}`,

  ':after': {
    content: '""',
    position: 'absolute',
    display: 'none'
  }
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  fontSize: pxToRem(FontSize.Medium),
  color: theme.colors.dark,
  marginLeft: pxToRem(Spacing.Medium)
}))

export interface RadioButtonProps {
  readonly id?: string
  readonly label: string
  readonly name: string
  readonly value: boolean
  readonly disabled?: boolean

  onChange(value: boolean): void
}

export function RadioButton({id, label, value, disabled, onChange}: RadioButtonProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(RadioBtnContainerStyle)}>
      <label className={css(LabelStyle)} htmlFor={id}>
        <BaseInput
          style={RadioButtonStyle}
          type={InputType.Radio}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={css(CheckMarkStyle)} />
        {label}
      </label>
    </div>
  )
}
