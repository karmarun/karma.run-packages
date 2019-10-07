import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {EditMenu, EditMenuButton} from './editMenu'
import {IconType} from '../atoms/icon'

export default {
  component: EditMenu,
  title: 'Blocks|Interactivty/RichtextEditorMenu',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <EditMenu>
    <EditMenuButton
      editor={null}
      icon={IconType.Bold}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Italic}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Underline}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Striked}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.H2}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.H3}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.ListUnsorted}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.ListSorted}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
    <EditMenuButton
      editor={null}
      icon={IconType.Link}
      label={''}
      onClick={() => {}}
      isActive={() => false}
    />
  </EditMenu>
)
