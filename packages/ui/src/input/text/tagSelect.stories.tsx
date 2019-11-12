import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TagSelect} from './tagSelect'
import {mockListBoxOptions} from './listBox.stories'

export default {
  component: TagSelect,
  title: 'Input|Text/TagSelect',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  return <TagSelect label={'Select filter'} options={mockListBoxOptions} onUpdate={() => {}} />
}
