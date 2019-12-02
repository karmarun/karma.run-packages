import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {TagSelect} from './tagSelect'

export default {
  component: TagSelect,
  title: 'Input|TagSelect',
  decorators: [centerLayoutDecorator(0.6)]
}

export const Standard = () => {
  return (
    <TagSelect
      label={'Tags'}
      placeholder={'Add Tag'}
      options={mockListBoxOptions}
      onUpdate={() => {}}
    />
  )
}

export const mockListBoxOptions: AutocompleteOptions[] = [
  {id: '0', name: 'afilter'},
  {id: '1', name: 'filter'},
  {id: '2', name: 'filter2'},
  {id: '3', name: 'filter3'}
]
