import React from 'react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Dropdown} from './dropdown'

export default {
  component: Dropdown,
  title: 'Input|Dropdown',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Dropdown
    label={'Label'}
    options={values}
    value={values[0].name}
    description={'description text'}
    onValueChange={() => {}}
  />
)

const values = [
  {value: 'volvo', name: 'Volvo'},
  {value: 'saab', name: 'Saab'},
  {value: 'mercedes', name: 'Mercedes'},
  {value: 'audi', name: 'Audi'}
]
