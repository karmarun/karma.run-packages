import React from 'react'

import {IconType} from '../atoms/icon'
import {IconLabelButton} from './iconLabelButton'
import {OptionButtonShadow} from './optionButtonShadow'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

const SelectorMenuStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({}))

const AddButtonStyle = cssRuleWithTheme<{isOpen: boolean}>(({isOpen, theme}) => ({
  '& path': {
    fill: isOpen ? theme.colors.dark : theme.colors.action
  }
}))

export interface BlockSelectorMenuProps {
  isOpen: boolean
  onAddClick(): void
  menuItems: Array<MenuItem>
}

export interface MenuItem {
  id: string
  icon: IconType
  label: string
  href?: string
  onClick?(id: string): void
}

// todo routes
export function BlockSelectorMenu({isOpen, menuItems, onAddClick}: BlockSelectorMenuProps) {
  const {css} = useThemeStyle({isOpen: isOpen})

  const menuButtons = menuItems.map((item, index) => mapButtons(item))
  function mapButtons(item: MenuItem) {
    if (item.href) {
      //const Route = route('test', routePath`${item.href}`, null)
    }
  }

  return (
    <div className={css(SelectorMenuStyle)}>
      <div className={css(AddButtonStyle)}>
        <OptionButtonShadow icon={IconType.Add} onClick={onAddClick} />
      </div>
      {isOpen &&
        menuItems.map((item, index) => (
          <IconLabelButton
            key={index}
            id={item.id}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
    </div>
  )
}
