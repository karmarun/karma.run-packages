import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TextInput} from './textInput'
import {MaterialIconSearch} from '@karma.run/icons'
import {Spacing} from '../../style/helpers'

export default {
  component: TextInput,
  title: 'Input|Text/TextInput',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Interactive = () => {
  const [value, setValue] = useState('')

  return (
    <TextInput
      label="Label"
      description="Some description text"
      value={value}
      onChange={event => setValue(event.target.value)}
      marginBottom={Spacing.ExtraSmall}
    />
  )
}

export const WithValue = () => (
  <TextInput label={'Label'} value={'Value'} description={'Description'} onChange={() => {}} />
)

export const WithIcon = () => (
  <TextInput
    icon={MaterialIconSearch}
    label="Label"
    value=""
    description="Description"
    onChange={() => {}}
  />
)

export const Disabled = () => (
  <TextInput label={'Label'} value={''} onChange={() => {}} description={'Description'} disabled />
)
