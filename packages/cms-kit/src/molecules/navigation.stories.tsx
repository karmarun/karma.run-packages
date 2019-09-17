import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from '../atoms/icon'
import {Navigation} from './navigation'

export function NavigationWrapper() {
  const [isOpen, setOpen] = useState(true)

  return (
    <Navigation
      isOpen={isOpen}
      onChange={() => {
        setOpen(!isOpen)
      }}
      menuItems={mockNaviItems}
    />
  )
}

export function LayoutWrapper() {
  const [isOpen, setOpen] = useState(true)

  return (
    <div>
      <Navigation
        isOpen={isOpen}
        onChange={() => {
          setOpen(!isOpen)
        }}
        menuItems={mockNaviItems}
      />
      <div>content</div>
    </div>
  )
}

storiesOf('Molecules|Navigation', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <NavigationWrapper />)

storiesOf('Molecules|Navigation', module).add('in layout', () => <LayoutWrapper />)

const mockNaviItems = [
  {id: 'article', icon: IconType.Article, label: 'Article'},
  {id: 'pages', icon: IconType.Page, label: 'Pages'},
  {id: 'mediaLibrary', icon: IconType.MediaLibrary, label: 'Media Library'},
  {id: 'proofreading', icon: IconType.Proofreading, label: 'Proofreading'},
  {id: 'menu', icon: IconType.Menu, label: 'Menu'},
  {id: 'logout', icon: IconType.Logout, label: 'Logout'}
]
