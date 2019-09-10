import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import {UnionListField, UnionListValue} from './unionListField'
import {TextField} from './textField'
import {useField} from './hooks'

export function UnionListFieldWrapper() {
  const [values, setValues] = useState<UnionListValue<string>[]>([])

  return (
    <UnionListField value={values} onChange={setValues} defaultValue={''}>
      {[useField(props => <TextField {...props} />)]}
    </UnionListField>
  )
}

storiesOf('Fields|UnionListField', module).add('Default', () => <UnionListFieldWrapper />)
