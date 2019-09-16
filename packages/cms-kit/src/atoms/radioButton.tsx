import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {SelectChangeEvent, Select} from './select'

const RadioButtonStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface RadioButtonProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectChangeEvent): void
  readonly className?: string
}

export function RadioButton(props: RadioButtonProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <Select
        className={css(RadioButtonStyle)}
        id={props.id}
        type="radio"
        checked={props.isChecked}
        onInput={onChange}
      />
      <label className={css(LabelStyle)} htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  )

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange({
      id: props.id,
      isChecked: event.target.checked,
      event: event
    })
  }
}
