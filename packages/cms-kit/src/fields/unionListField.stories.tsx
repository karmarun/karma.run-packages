import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {UnionListField} from './unionListField'
import {TextField} from './textField'

import {UnionListValue} from './types'
import {ListField, ListValue} from './listField'
import {Grid, Column} from '../layout/grid'
import {Placeholder} from '../atoms/placeholder'

import {IconColumn4, IconColumn2, IconColumn2Alt} from '../icons/customIcons'
import {MaterialIconTextFormat, MaterialIconShortText} from '../icons/materialIcons'

export type StringValue = UnionListValue<'string', string>
export type StringArrayValue = UnionListValue<'stringArray', ListValue<string>[]>
export type WrapperValue = StringValue | StringArrayValue

export default {
  component: UnionListField,
  title: 'Fields|UnionListField',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const [values, setValues] = useState<WrapperValue[]>([])

  return (
    <UnionListField value={values} onChange={setValues}>
      {{
        string: {
          field: props => <TextField {...props} />,
          defaultValue: '',
          label: 'String',
          icon: MaterialIconTextFormat
        },

        stringArray: {
          field: props => (
            <ListField {...props} defaultValue="">
              {props => <TextField {...props} />}
            </ListField>
          ),
          defaultValue: [],
          label: 'String Array',
          icon: MaterialIconShortText
        }
      }}
    </UnionListField>
  )
}

export const WithGrid = () => {
  const [values, setValues] = useState([])

  return (
    <UnionListField value={values} onChange={setValues}>
      {{
        string: {
          field: props => (
            <Grid>
              <Column ratio={1 / 4}>
                <Placeholder></Placeholder>
              </Column>
              <Column ratio={1 / 4}>
                <Placeholder></Placeholder>
              </Column>
              <Column ratio={1 / 4}>
                <Placeholder></Placeholder>
              </Column>
              <Column ratio={1 / 4}>
                <Placeholder></Placeholder>
              </Column>
            </Grid>
          ),
          defaultValue: '',
          label: '4 Cols',
          icon: IconColumn4
        },

        column2: {
          field: props => (
            <Grid>
              <Column ratio={1 / 2}>
                <Placeholder></Placeholder>
              </Column>
              <Column ratio={1 / 2}>
                <Placeholder></Placeholder>
              </Column>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols',
          icon: IconColumn2
        },

        column2Alt: {
          field: props => (
            <Grid>
              <Column ratio={2 / 3}>
                <Placeholder></Placeholder>
              </Column>
              <Column ratio={1 / 3}>
                <Placeholder></Placeholder>
              </Column>
            </Grid>
          ),
          defaultValue: [],
          label: '2 Cols Alt',
          icon: IconColumn2Alt
        }
      }}
    </UnionListField>
  )
}
