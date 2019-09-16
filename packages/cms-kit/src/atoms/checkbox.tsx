import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface CheckboxProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectValue): void
  readonly className?: string
}

export interface SelectValue {
  id: string
  checked: boolean
}

export function Checkbox(props: CheckboxProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <input
        id={props.id}
        className={css(CheckboxStyle)}
        type="checkbox"
        defaultChecked={props.isChecked}
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
      checked: event.target.checked
    })
  }
}
