import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Toggle} from './toggle'
import {Checkbox} from './checkbox'

storiesOf('Atoms|Selects', module)
  .addDecorator(centerLayoutDecorator())
  .add('Toggle', () => <Toggle isChecked={true} onChange={checked => {}} />)
  .add('Checkbox', () => (
    <Checkbox isChecked={true} onChange={checked => {}} label={'Checkbox label'} />
  ))
