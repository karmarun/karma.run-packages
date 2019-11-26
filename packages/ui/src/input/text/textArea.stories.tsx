import React, {useState} from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {TextArea} from './textArea'

export default {
  component: TextArea,
  title: 'Input|Text/TextArea',
  decorators: [centerLayoutDecorator(0.3)]
}

export const Default = () => {
  const [value, setValue] = useState('')

  return (
    <TextArea
      value={value}
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onChange={e => {
        setValue(e.target.value)
      }}
    />
  )
}
