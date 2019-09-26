import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toggle} from './toggle'
import {ToggleWithLabel} from '../molecules/toggleWithLabel'

export function SelectWrapper() {
  const [checked, setChecked] = useState(false)

  return (
    <Toggle
      checked={checked}
      onSelectChange={event => {
        setChecked(event.isChecked)
      }}
      id={'1'}
    />
  )
}

storiesOf('Atoms|Selects', module)
  .addDecorator(centerLayoutDecorator())
  .add('Toggle', () => <SelectWrapper />)
  .add('ToggleWithLabel', () => {
    return (
      <div>
        <ToggleWithLabel
          label={'Value'}
          description={'Description text'}
          onSelectChange={checked => {}}
          id={'4'}
          checked
        />
        <ToggleWithLabel
          label={'Value'}
          description={'Description text'}
          onSelectChange={checked => {}}
          id={'5'}
        />
      </div>
    )
  })
