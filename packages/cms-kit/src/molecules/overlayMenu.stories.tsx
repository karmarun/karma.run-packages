import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from '../atoms/icon'
import {OverlayMenu} from './overlayMenu'

export default {
  component: OverlayMenu,
  title: 'Molecules|OverlayMenu',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <OverlayMenu
    inline={false}
    menuItems={[
      {id: 'text', icon: IconType.Text, label: 'Text'},
      {id: 'image', icon: IconType.Image, label: 'Image'},
      {id: 'slideshow', icon: IconType.Gallery, label: 'Slideshow'},
      {id: 'video', icon: IconType.Video, label: 'Video'},
      {id: 'embed', icon: IconType.Embed, label: 'Embed'},
      {id: 'quote', icon: IconType.Quote, label: 'Quote'}
    ]}
    onMenuItemClick={item => {}}
  />
)

export const Inline = () => (
  <OverlayMenu
    inline={true}
    menuItems={[
      {id: 'copy', icon: IconType.Copy, label: 'Copy'},
      {id: 'archive', icon: IconType.Archive, label: 'Archive'}
    ]}
    onMenuItemClick={item => {}}
  />
)
