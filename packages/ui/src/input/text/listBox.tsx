import React from 'react'
import {GetMenuPropsOptions, GetPropsCommonOptions, GetItemPropsOptions} from 'downshift'
import {FilterOption} from '../../molecules/searchBar'
import {Typography} from '../../layout/typography'
import {Spacing} from '../../style/helpers'
import {cssRule, useStyle, padding} from '@karma.run/react'

const ListStyle = cssRule({
  margin: 0,
  padding: 0,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  listStyleType: 'none'
})

const ListItemStyle = cssRule({
  ...padding(Spacing.Tiny, Spacing.ExtraSmall, Spacing.Tiny, Spacing.ExtraSmall)
})

export interface AutocompleteOptions {
  id: string
  name: string
}

export interface ListBoxProps {
  readonly options: AutocompleteOptions[]
  readonly isOpen: boolean
  readonly inputValue: any
  readonly highlightedIndex: any
  readonly selectedItem?: any
  getMenuProps: (
    options?: GetMenuPropsOptions | undefined,
    otherOptions?: GetPropsCommonOptions | undefined
  ) => any
  getItemProps: (options: GetItemPropsOptions<FilterOption>) => any
}

export function ListBox({
  options,
  getMenuProps,
  isOpen,
  getItemProps,
  inputValue,
  highlightedIndex,
  selectedItem
}: ListBoxProps) {
  const css = useStyle()
  return (
    <ul className={css(ListStyle)} {...getMenuProps()}>
      {isOpen
        ? options
            .filter(options => !inputValue || options.name.includes(inputValue))
            .map((item, index: number) => (
              <li
                className={css(ListItemStyle)}
                {...getItemProps({
                  key: item.name,
                  index,
                  item,
                  style: {
                    backgroundColor: highlightedIndex === index ? '#f4f4f4' : 'white',
                    fontWeight: selectedItem && selectedItem === item ? 'bold' : 'normal'
                  }
                })}>
                <Typography variant="body1">{item.name}</Typography>
              </li>
            ))
        : null}
    </ul>
  )
}
