import React, {InputHTMLAttributes} from 'react'

export interface SelectProps extends InputHTMLAttributes<any> {
  onSelectChange(value: SelectChangeEvent): void
}

export interface SelectChangeEvent {
  id?: string
  isChecked: boolean
  event: React.ChangeEvent<HTMLInputElement>
}

export function Select({id, type, checked, onSelectChange, ...rest}: SelectProps) {
  return <input id={id} type={type} checked={checked} onInput={onChange} {...rest} />

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (id) {
      onSelectChange({
        id: id,
        isChecked: event.target.checked,
        event: event
      })
    } else {
      onSelectChange({
        isChecked: event.target.checked,
        event: event
      })
    }
  }
}
