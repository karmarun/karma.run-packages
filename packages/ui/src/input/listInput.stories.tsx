import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ListField, ListValue} from './listInput'
import {TextInput} from './textInput'

export default {
  component: ListField,
  title: 'Input|ListInput',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => {
  const [values, setValues] = useState<ListValue<string>[]>([
    {id: '1', value: 'Hello'},
    {id: '2', value: 'World'},
    {id: '3', value: 'Test'}
  ])

  return (
    <ListField value={values} onChange={setValues} defaultValue={''}>
      {props => (
        <TextInput
          label="Label"
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
        />
      )}
    </ListField>
  )
}

export const Disabled = () => {
  const [values, setValues] = useState<ListValue<string>[]>([
    {id: '1', value: 'Hello'},
    {id: '2', value: 'World'},
    {id: '3', value: 'Test'}
  ])

  return (
    <ListField value={values} onChange={setValues} defaultValue={''} disabled>
      {props => (
        <TextInput
          label="Label"
          value={props.value}
          onChange={e => props.onChange(e.currentTarget.value)}
        />
      )}
    </ListField>
  )
}
