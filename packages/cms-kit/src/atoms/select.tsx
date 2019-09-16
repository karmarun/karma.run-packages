import React, {InputHTMLAttributes} from 'react'

export interface SelectProps extends InputHTMLAttributes<any> {}

export interface SelectChangeEvent {
  id: string
  isChecked: boolean
  event: React.ChangeEvent<HTMLInputElement>
}

export function Select({id, type, value, onInput, ...rest}: SelectProps) {
  return <input id={id} type={type} value={value} onInput={onInput} {...rest} />
}
