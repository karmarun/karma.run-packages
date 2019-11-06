import React from 'react'

import {NavigationButton, NavigationLinkButton} from './navigationButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconSaveOutlined} from '@karma.run/icons'

export default {
  component: NavigationButton,
  title: 'Input|Buttons/NavigationButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => <NavigationButton icon={MaterialIconSaveOutlined} label="Label" />

export const Disabled = () => (
  <NavigationButton icon={MaterialIconSaveOutlined} label="Label" disabled />
)

export const DefaultLink = () => (
  <NavigationLinkButton href="#" icon={MaterialIconSaveOutlined} label="Label" />
)

export const DisabledLink = () => (
  <NavigationLinkButton href="#" icon={MaterialIconSaveOutlined} label="Label" disabled />
)
