import React from 'react'
import {OptionButtonSmall} from './optionButtonSmall'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconKeyboardArrowDown} from '@karma.run/icons'

export default {
  component: OptionButtonSmall,
  title: 'Atoms|Buttons/Icon/OptionButtonSmall',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <OptionButtonSmall icon={MaterialIconKeyboardArrowDown} />

/**
 * @description Test
 */
export const Disabled = () => <OptionButtonSmall icon={MaterialIconKeyboardArrowDown} disabled />