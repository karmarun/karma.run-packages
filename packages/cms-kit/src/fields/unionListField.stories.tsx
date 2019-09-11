import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'

import {UnionListField, UnionListValue} from './unionListField'
import {TextField} from './textField'
import {useField, useUnionField} from './hooks'
import {IconType} from '../atoms/icon'

export type TextValue = UnionListValue<'text', string>
export type NumberValue = UnionListValue<'number', number>
export type WrapperValue = TextValue | NumberValue

export function UnionListFieldWrapper() {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <UnionListField value={values} onChange={setValues} defaultValue={''}>
      {{
        text: useUnionField(props => <TextField {...props} />, '', {
          title: 'Text',
          icon: IconType.Replace
        }),

        number: useUnionField(props => <TextField {...props} />, '', {
          title: 'Text',
          icon: IconType.Replace
        })
      }}
    </UnionListField>
  )
}

storiesOf('Fields|UnionListField', module).add('Default', () => <UnionListFieldWrapper />)
