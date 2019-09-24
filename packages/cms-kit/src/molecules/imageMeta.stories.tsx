import React from 'react'

import {centerLayoutDecorator, darkBackgroundDecorator} from '../.storybook/decorators'
import {FocalPoint} from './imageMeta'

export default {
  component: FocalPoint,
  title: 'Molecules|ImageMeta',
  decorators: [darkBackgroundDecorator(), centerLayoutDecorator()]
}

export const Standard = () => <FocalPoint />
