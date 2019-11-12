import React, {useState} from 'react'
import Downshift, {ControllerStateAndHelpers} from 'downshift'
import {ListBox, AutocompleteOptions} from './listBox'
import {useThemeStyle} from '../../style/themeContext'
import {FilterTag} from '../../atoms/filterTag'
import {
  TextInputStyleProps,
  TextInputWrapperStyle,
  TextInputStyle,
  LabelStyle
} from '../../atoms/textInput'
import {BaseInput, InputType} from '../../atoms/baseInput'

export interface TagSelectProps {
  readonly label: string
  readonly options: AutocompleteOptions[]
  onUpdate(tags: AutocompleteOptions[]): void
}

export function TagSelect({label, options, onUpdate}: TagSelectProps) {
  const styleProps = {hasError: false, hasIcon: false}
  const css = useThemeStyle<TextInputStyleProps>(styleProps)

  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState<Array<AutocompleteOptions>>([])

  function handleInput(item: AutocompleteOptions, downshift: ControllerStateAndHelpers<any>) {
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

  const handleDelete = (item: AutocompleteOptions) => () => {
    const newTags = [...tags]
    newTags.splice(newTags.indexOf(item), 1)
    onUpdate(newTags)
    setTags(newTags)
  }

  function addAndSelect(name: string, downshift: ControllerStateAndHelpers<any>) {
    console.log('try to add', name)
    let item = {id: name, name: name}
    if (tagExists(name)) {
      item = options.filter(option => {
        return option.name == name
      })[0]
    } else {
      options.push(item)
    }
    downshift.selectItem(item)
    console.log('select item', item)
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
      setTags(tags.slice(0, tags.length - 1))
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
      onSelect={handleInput}
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
          <div>
            <div>
              {tags.map((tag, index) => (
                <FilterTag key={index} text={tag.name} onDismiss={handleDelete(tag)} />
              ))}
              <label {...downshift.getLabelProps()} className={css(TextInputWrapperStyle)}>
                <BaseInput
                  type={InputType.Text}
                  {...downshift.getInputProps()}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  value={inputValue}
                  placeholder={label}
                  style={TextInputStyle}
                  styleProps={styleProps}
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
