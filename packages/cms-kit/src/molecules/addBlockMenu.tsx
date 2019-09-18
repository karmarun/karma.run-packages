import React from 'react'

import {IconType} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {OverlayMenu, MenuItem} from './overlayMenu'
import {AddBlockButton} from './addBlockButton'

const SelectorMenuStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({}))

const AddButtonStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({
  '& path': {
    fill: isOpen ? theme.colors.dark : theme.colors.action
  }
}))

export interface AddBlockMenuProps {
  isOpen: boolean
  onAddClick(): void
  menuItems: Array<MenuItem>
}

export function AddBlockMenu({isOpen, menuItems, onAddClick}: AddBlockMenuProps) {
  const {css} = useThemeStyle({isOpen: isOpen})

  return (
    <div className={css(SelectorMenuStyle)}>
      <div className={css(AddButtonStyle)}>
        <AddBlockButton onClick={onAddClick} />
      </div>
      {isOpen && <OverlayMenu menuItems={menuItems} />}
    </div>
  )
}
