import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {EditMenu, EditMenuButton} from './editMenu'
import {IconType} from '../atoms/icon'

export default {
  component: EditMenu,
  title: 'Molecules|RichtextEditOverlay',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <EditMenu>
    <EditMenuButton
      editor={null}
      icon={IconType.Bold}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Italic}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Underline}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Striked}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.H2}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.H3}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.ListUnsorted}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.ListSorted}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Link}
      label={''}
      onClick={(editor, value, label) => {}}
      isActive={(editor, value, label) => true}
    />
  </EditMenu>
)
