import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TextInput} from './textInput'
import {IconType} from './icon'

export default {
  component: TextInput,
  title: 'Atoms|Input/TextInput',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <TextInput label={'Label'} value={''} description={'Description'} onChange={() => {}} />
)

export const WithValue = () => (
  <TextInput label={'Label'} value={'Value'} description={'Description'} onChange={() => {}} />
)

export const WithIcon = () => (
  <TextInput
    icon={IconType.Search}
    label={'Label'}
    value={''}
    description={'Description'}
    onChange={() => {}}
  />
)

export const Disabled = () => (
  <TextInput label={'Label'} value={''} onChange={() => {}} description={'Description'} disabled />
)

export const Interactive = () => {
  const [value, setValue] = useState('')
  return (
    <TextInput
      icon={IconType.Search}
      label={'Label'}
      value={value}
      onChange={value => setValue(value)}
      description={'Description'}
    />
  )
}
