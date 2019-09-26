import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {RadioButton} from './radioButton'

export default {
  component: RadioButton,
  title: 'Atoms|Input/RadioButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <RadioButton name="radiobutton" label="Label" value={false} onChange={() => {}} />
)
export const Checked = () => (
  <RadioButton name="radiobutton" label="Label" value={true} onChange={() => {}} />
)

export const Disabled = () => (
  <RadioButton name="radiobutton" label="Label" value={false} onChange={() => {}} disabled />
)

export const DisabledAndChecked = () => (
  <RadioButton name="radiobutton" label={'Label'} value={true} onChange={() => {}} disabled />
)

export const Interactive = () => {
  const [value, setValue] = useState(false)

  return (
    <>
      <RadioButton
        name="radiobutton"
        label={'Label'}
        value={value}
        onChange={value => setValue(value)}
      />
      <RadioButton
        name="radiobutton"
        label={'Label'}
        value={value}
        onChange={value => setValue(value)}
      />
    </>
  )
}
