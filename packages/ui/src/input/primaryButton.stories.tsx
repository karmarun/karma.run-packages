import React from 'react'
import {PrimaryButton, PrimaryLinkButton} from './primaryButton'

import {centerLayoutDecorator} from '../.storybook/decorators'

export default {
  component: PrimaryButton,
  title: 'Input|Buttons/PrimaryButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => <PrimaryButton label="Label" />
export const Disabled = () => <PrimaryButton label="Label" disabled />

export const DefaultLink = () => <PrimaryLinkButton href="#" label="Label" />
export const DisabledLink = () => <PrimaryLinkButton href="#" label="Label" disabled />
