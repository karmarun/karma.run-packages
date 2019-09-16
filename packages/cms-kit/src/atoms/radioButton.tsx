import React from 'react'
import {SelectValue} from './checkbox'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

const RadioButtonStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface RadioButtonProps {
  readonly id: string
  readonly label: string
  readonly isChecked: boolean
  onChange(value: SelectValue): void
  readonly className?: string
}

export function RadioButton(props: RadioButtonProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <input className={css(RadioButtonStyle)} id={props.id} type="radio" onInput={onChange} />
      <label className={css(LabelStyle)}>{props.label}</label>
    </div>
  )

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange({
      id: props.id,
      checked: event.target.checked
    })
  }
}
