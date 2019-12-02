import React, {useState} from 'react'

import {Icon, IconScale} from '../data/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BorderRadius, FontSize, Spacing} from '../style/helpers'
import {MaterialIconClose, MaterialIconKeyboardArrowDown} from '@karma.run/icons'

const SearchBarStyle = cssRuleWithTheme(({theme}) => ({
  border: `1px solid ${theme.colors.grayLight}`,
  borderRadius: BorderRadius.Medium,
  display: 'flex',
  fontSize: FontSize.Medium,
  padding: Spacing.ExtraSmall,

  '> input': {
    fontSize: FontSize.Medium
  }
}))

export interface FilterOption {
  id: string
  name: string
}

export interface SearchInputProps {
  readonly filterOptions: FilterOption[]
  readonly searchValue: string
  onFilterSelected(id: string): void
  onTextInput(value: string): void
  onClear(): void
}

export function SearchInput({
  filterOptions,
  searchValue,
  onFilterSelected,
  onTextInput,
  onClear
}: SearchInputProps) {
  const css = useThemeStyle()
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div>
      <div className={css(SearchBarStyle)}>
        <div>
          {'Filters'}
          <button onClick={e => setShowOptions(!showOptions)}>
            <Icon element={MaterialIconKeyboardArrowDown} scale={IconScale.Equal} />
          </button>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={e => onTextInput(e.target.value)}
          placeholder={'Search'}
        />
      </div>
      {showOptions && (
        <div>
          {filterOptions.map((item, index) => (
            <div key={index} onClick={e => onFilterSelected(item.id)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
      {searchValue.length > 0 && (
        <div>
          <button onClick={onClear}>
            <Icon element={MaterialIconClose} scale={IconScale.Equal} />
          </button>
          {'Clear current search query, filters and sorts'}
        </div>
      )}
    </div>
  )
}
