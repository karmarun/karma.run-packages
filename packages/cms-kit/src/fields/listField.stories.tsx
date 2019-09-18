import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import {ListField, ListValue} from './listField'
import {TextField} from './textField'

export function ListFieldWrapper() {
  const [values, setValues] = useState<ListValue<string>[]>([])

  return (
    <ListField value={values} onChange={setValues} defaultValue={''}>
      {props => <TextField {...props} />}
    </ListField>
  )
}

storiesOf('Fields|ListField', module).add('default', () => <ListFieldWrapper />)
