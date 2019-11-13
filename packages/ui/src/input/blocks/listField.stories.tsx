import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {ListField, ListValue} from './listField'
import {TextInputBlock} from './textInputBlock'

export default {
  component: ListField,
  title: 'Input|Blocks/ListField',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [values, setValues] = useState<ListValue<string>[]>([])

  return (
    <ListField value={values} onChange={setValues} defaultValue={''}>
      {props => <TextInputBlock {...props} />}
    </ListField>
  )
}