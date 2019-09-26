import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {RichtextBlock} from './richtextBlock'

export default {
  component: RichtextBlock,
  title: 'Molecules|RichtextBlock',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const [value, setValue] = useState('')
  return (
    <RichtextBlock
      value={value}
      onChange={val => {
        setValue(val)
      }}
    />
  )
}
