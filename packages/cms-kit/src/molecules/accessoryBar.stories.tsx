import React, {useState} from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {AccessoryBar} from './accessoryBar'

export default {
  component: AccessoryBar,
  title: 'Molecules|AccessoryBar',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => <AccessoryBar onEdit={() => {}} />

export const Favor = () => {
  const [isFavorite, setFavorite] = useState(false)
  return (
    <AccessoryBar
      onEdit={() => {}}
      isLead={{
        isFavorite: isFavorite,
        onFavoriteChange: () => {
          setFavorite(!isFavorite)
        }
      }}
    />
  )
}

export const Slideshow = () => (
  <AccessoryBar onEdit={() => {}} onPrevious={() => {}} onNext={() => {}} />
)
