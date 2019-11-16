import React from 'react'
import {IconButton} from './iconButton'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {MaterialIconKeyboardArrowDown} from '@karma.run/icons'
import {Box} from '../../layout/box'
import {Spacing} from '../../style/helpers'

export default {
  component: IconButton,
  title: 'Input|Buttons/IconButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <>
    <Box flex flexDirection="row">
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} />
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} disabled />
    </Box>
  </>
)

export const Large = () => (
  <>
    <Box flex flexDirection="row">
      <IconButton icon={MaterialIconKeyboardArrowDown} margin={Spacing.Tiny} variant="large" />
      <IconButton
        icon={MaterialIconKeyboardArrowDown}
        margin={Spacing.Tiny}
        variant="large"
        disabled
      />
    </Box>
  </>
)
