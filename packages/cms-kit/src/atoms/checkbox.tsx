import React from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

const CheckboxStyle = cssRuleWithTheme(({theme}) => ({}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface CheckboxProps {
  readonly label: string
  readonly isChecked: boolean
  onChange(isChecked: boolean): void
  readonly className?: string
}

export function Checkbox(props: CheckboxProps) {
  const {css} = useThemeStyle()
  return (
    <div className={props.className}>
      <input
        className={css(CheckboxStyle)}
        type="checkbox"
        defaultChecked={props.isChecked}
        onChange={onChange}
      />
      <label className={css(LabelStyle)}>{props.label}</label>
    </div>
  )

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.checked)
  }
}
