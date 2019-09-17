import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from '../atoms/icon'
import {BlockSelectorMenu} from './blockSelectorMenu'

export function BlockSelectorMenuWrapper() {
  const [isOpen, setOpen] = useState(false)

  return (
    <BlockSelectorMenu
      isOpen={isOpen}
      onAddClick={() => {
        setOpen(!isOpen)
      }}
      menuItems={mockArticleBlockSelectors}
    />
  )
}

storiesOf('Molecules|SelectorMenu', module)
  .addDecorator(centerLayoutDecorator())
  .add('ArticleBlockSelectorMenu', () => <BlockSelectorMenuWrapper />)

// FrontBlockSelectors
const mockArticleBlockSelectors = [
  {id: 'text', icon: IconType.Text, label: 'Text'},
  {id: 'image', icon: IconType.Image, label: 'Image'},
  {id: 'slideshow', icon: IconType.Gallery, label: 'Slideshow'},
  {id: 'video', icon: IconType.Video, label: 'Video'},
  {id: 'embed', icon: IconType.Embed, label: 'Embed'},
  {id: 'quote', icon: IconType.Quote, label: 'Quote'}
]
