import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {SelectChangeEvent, Select} from './select'

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface CheckboxProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectChangeEvent): void
  readonly className?: string
}

export function Checkbox(props: CheckboxProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <Select
        id={props.id}
        className={css(CheckboxStyle)}
        type="checkbox"
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
