import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Checkbox} from './checkbox'

export default {
  component: Checkbox,
  title: 'Atoms|Input/Checkbox',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Checkbox label={'Label'} value={false} onChange={() => {}} />
export const Checked = () => <Checkbox label={'Label'} value={true} onChange={() => {}} />

export const Disabled = () => (
  <Checkbox label={'Label'} value={false} onChange={() => {}} disabled />
)

export const DisabledAndChecked = () => (
  <Checkbox label={'Label'} value={true} onChange={() => {}} disabled />
)

export const Interactive = () => {
  const [value, setValue] = useState(false)
  return <Checkbox label={'Label'} value={value} onChange={value => setValue(value)} />
}
