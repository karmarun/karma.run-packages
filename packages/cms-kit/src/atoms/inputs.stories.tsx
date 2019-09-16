import React from 'react'

import {storiesOf} from '@storybook/react'
import {Input} from './input'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'
import {TextArea} from './textArea'
import {FilterTag} from './filterTag'

storiesOf('Atoms|Inputs', module)
  .addDecorator(centerLayoutDecorator())
  .add('default placeholder', () => (
    <Input
      label={'Label'}
      value={''}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('default text', () => (
    <Input
      label={'Label'}
      value={'Value'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('no label', () => (
    <Input
      value={''}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('error', () => (
    <Input
      label={'Label'}
      value={''}
      placeholder={'Placeholder-Label'}
      errorText={'Error text'}
      onValueChange={value => {}}
    />
  ))
  .add('icon', () => (
    <Input
      label={'Label'}
      value={''}
      icon={IconType.DropHere}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))

storiesOf('Atoms|TextArea', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => (
    <TextArea
      value={''}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('default with value', () => (
    <TextArea
      value={
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
      }
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))
  .add('with label', () => (
    <TextArea
      value={''}
      label={'Label'}
      placeholder={'Placeholder-Label'}
      description={'Description Text'}
      onValueChange={value => {}}
    />
  ))

storiesOf('Atoms|FilterTag', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <FilterTag text={'Article tag'} onDismiss={() => {}} />)
