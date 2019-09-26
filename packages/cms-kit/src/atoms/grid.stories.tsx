import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Grid} from './grid'
import {Placeholder} from './placeholder'

export default {
  component: Grid,
  title: 'Atoms|Grid',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <Grid numColumns={6}>
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Grid>
)
