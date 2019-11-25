import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Chip} from './chip'

export default {
  component: Chip,
  title: 'Data|Chip',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Chip label={'Chip'} imageURL="https://dummyimage.com/300x200/ccc/000" />
)
