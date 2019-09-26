import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'
import {TextArea} from './textArea'

export function TextAreaInputWrapper() {
  const [value, setValue] = useState('')

  return (
    <TextArea
      value={value}
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {
        setValue(value)
      }}
    />
  )
}

storiesOf('Atoms|Input/TextArea', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <TextAreaInputWrapper />)

  .add('default with value', () => (
    <TextArea
      label={'Label'}
      value={
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
      }
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
