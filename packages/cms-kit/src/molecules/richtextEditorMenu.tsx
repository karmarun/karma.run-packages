import React from 'react'
import {DarkMenuButton, DarkMenu} from './darkMenu'
import {Editor} from 'slate'

export interface RichtextEditorMenuProps {
  readonly editItems: DarkMenuButton[]
  readonly editor: Editor
}

export function RichtextEditorMenu({editItems, editor}: RichtextEditorMenuProps) {
  return (
    <DarkMenu>
      {editItems.map((item, idx) => (
        <DarkMenuButton
          key={idx}
          editor={editor}
          isActive={item.isActive}
          icon={item.icon}
          onClick={item.onClick}
          label={item.label}
        />
      ))}
    </DarkMenu>
  )
}
