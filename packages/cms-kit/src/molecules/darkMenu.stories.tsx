import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {DarkMenu, DarkMenuButton} from './darkMenu'
import {IconType} from '../atoms/icon'

export default {
  component: DarkMenu,
  title: 'Molecules|RichtextEditOverlay',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <DarkMenu>
    <DarkMenuButton
      icon={IconType.Bold}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.Italic}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.Underline}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.Striked}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.H2}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.H3}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.ListUnsorted}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.ListSorted}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <DarkMenuButton
      icon={IconType.Link}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
  </DarkMenu>
)
