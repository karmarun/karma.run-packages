import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toggle} from './toggle'
import {Checkbox} from './checkbox'
import {RadioButton} from './radioButton'

storiesOf('Atoms|Selects', module)
  .addDecorator(centerLayoutDecorator())
  .add('Toggle', () => <Toggle isChecked={true} onChange={checked => {}} id={'1'} />)
  .add('Checkbox', () => (
    <Checkbox isChecked={true} onChange={checked => {}} label={'Checkbox label'} id={'2'} />
  ))
  .add('RadioButton', () => (
    <RadioButton isChecked={true} onChange={checked => {}} label={'Radio label'} id={'3'} />
  ))
