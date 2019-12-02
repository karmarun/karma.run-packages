import React, {useState} from 'react'
import Downshift, {
  ControllerStateAndHelpers,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetItemPropsOptions
} from 'downshift'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {Chip} from '../data/chip'
import {TextInputStyleProps, TextInputWrapperStyle, TextInputStyle, LabelStyle} from './textInput'
import {cssRule, useStyle} from '@karma.run/react'
import {Spacing} from '../style/helpers'
import {FilterOption} from './searchInput'
import {Typography} from '../layout/typography'
import {MaterialIconClose} from '@karma.run/icons'

const TagSelectStyle = cssRuleWithTheme(({theme}) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.colors.gray}`,

  '& input': {
    border: 'none',
    ':placeholder-shown + span': {
      opacity: 1,
      transform: 'none'
    }
  }
}))

const TagSelectInputLineStyle = cssRule({
  marginBottom: Spacing.Tiny
})

const TagStyle = cssRule({
  marginRight: Spacing.Tiny
})

export interface TagSelectProps {
  readonly label: string
  readonly placeholder?: string
  readonly options: AutocompleteOptions[]
  onUpdate(tags: AutocompleteOptions[]): void
}

export function TagSelect({label, placeholder, options, onUpdate}: TagSelectProps) {
  const styleProps = {hasError: false, hasIcon: false}
  const css = useThemeStyle<TextInputStyleProps>(styleProps)

  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState<Array<AutocompleteOptions>>([])

  function handleSelect(item: AutocompleteOptions, downshift: ControllerStateAndHelpers<any>) {
    addTag(item)
    downshift.reset()
    setInputValue('')
  }

  function onInputChange(event: React.ChangeEvent<{value: string}>) {
    setInputValue(event.target.value)
  }

  function addTag(tag: AutocompleteOptions) {
    let newTags = [...tags]
    if (newTags.indexOf(tag) === -1) {
      newTags = [...newTags, tag]
    }
    onUpdate(newTags)
    setTags(newTags)
  }

  function handleDelete(item: AutocompleteOptions) {
    const newTags = [...tags]
    newTags.splice(newTags.indexOf(item), 1)
    onUpdate(newTags)
    setTags(newTags)
  }

  function addAndSelect(name: string, downshift: ControllerStateAndHelpers<any>) {
    let item = {id: name, name: name}
    if (tagExists(name)) {
      item = options.filter(option => {
        return option.name == name
      })[0]
    } else {
      options.push(item)
    }
    downshift.selectItem(item)
  }

  function tagExists(name: string): boolean {
    for (let option of options) {
      if (option.name == name) return true
    }
    return false
  }

  function onInputKeyDown(event: any, downshift: ControllerStateAndHelpers<any>) {
    // remove last tag with backspace
    if (tags.length && !inputValue.length && event.key === 'Backspace') {
      handleDelete(tags[tags.length - 1])
    }

    if (event.key == 'Enter') {
      event.nativeEvent.preventDownshiftDefault = true
      if (downshift.highlightedIndex) {
        downshift.selectHighlightedItem()
      } else {
        addAndSelect(inputValue, downshift)
      }
    }
  }

  return (
    <Downshift
      inputValue={inputValue}
      onSelect={handleSelect}
      itemToString={item => {
        return item && item.name
      }}>
      {downshift => {
        const {onChange, onKeyDown} = downshift.getInputProps({
          onChange: (event: React.ChangeEvent<{value: string}>) => {
            onInputChange(event)
          },
          onKeyDown: (event: any) => {
            onInputKeyDown(event, downshift)
          },
          placeholder: label
        })
        return (
          <div className={css(TagSelectStyle)}>
            <div className={css(TagSelectInputLineStyle)}>
              <label {...downshift.getLabelProps()} className={css(TextInputWrapperStyle)}>
                {tags.map((tag, index) => (
                  <div key={tag.name} className={css(TagStyle)}>
                    <Chip
                      label={tag.name}
                      icon={MaterialIconClose}
                      onIconClick={() => handleDelete(tag)}
                    />
                  </div>
                ))}
                <input
                  type="text"
                  {...downshift.getInputProps()}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  value={inputValue}
                  placeholder={placeholder}
                  style={TextInputStyle}
                />
                <span className={css(LabelStyle)}>{label}</span>
              </label>
            </div>
            <ListBox
              options={options}
              getMenuProps={downshift.getMenuProps}
              getItemProps={downshift.getItemProps}
              isOpen={downshift.isOpen}
              inputValue={inputValue}
              highlightedIndex={downshift.highlightedIndex}
            />
          </div>
        )
      }}
    </Downshift>
  )
}

const ListStyle = cssRule({
  margin: 0,
  padding: 0,
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  listStyleType: 'none'
})

const ListItemStyle = cssRule({
  padding: `${Spacing.Tiny} ${Spacing.ExtraSmall} ${Spacing.Tiny} ${Spacing.ExtraSmall}`
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
