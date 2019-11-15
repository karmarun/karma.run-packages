import React, {useState} from 'react'

import {OverlayMenu, MenuItem} from '../../molecules/overlayMenu'
import {AddBlockButton} from '../buttons/addBlockButton'
import {useStyle, cssRule} from '@karma.run/react'
import { Spacing, ZIndex} from '../../style/helpers'

const AddBlockInputStyle = cssRule(() => ({
  position: 'relative'
}))

const MenuWrapperStyle = cssRule(() => ({
  position: 'absolute',
  zIndex: ZIndex.Tooltip,
  left: '50%',
  top: Spacing.Medium,
  transform: 'translateX(-50%)',
  marginBottom: Spacing.Large
}))

export interface AddBlockInputProps {
  readonly menuItems: Array<MenuItem>
  readonly subtle?: boolean

  onMenuItemClick(item: MenuItem): void
}

export function AddBlockInput({menuItems, subtle, onMenuItemClick}: AddBlockInputProps) {
  const [isOpen, setOpen] = useState(false)
  const css = useStyle()

  return (
    <div className={css(AddBlockInputStyle)}>
      <AddBlockButton onClick={() => setOpen(!isOpen)} active={isOpen} subtle={subtle} />

      {isOpen && (
        <div className={css(MenuWrapperStyle)}>
          <OverlayMenu
            menuItems={menuItems}
            onMenuItemClick={item => {
              setOpen(false)
              onMenuItemClick(item)
            }}
          />
        </div>
      )}
    </div>
  )
}
