import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Box} from './box'
import {Spacing} from '../style/helpers'

export default {
  component: Box,
  title: 'Layout|Box',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Box flex flexDirection="column" margin={-Spacing.Tiny}>
    <Box padding={Spacing.Tiny}>Test</Box>
    <Box padding={Spacing.Tiny}>Test</Box>
    <Box padding={Spacing.Tiny}>Test</Box>
  </Box>
)
