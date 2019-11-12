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

  // remove last tag with backspace
  function handleKeyDown(event: React.KeyboardEvent) {
    if (tags.length && !inputValue.length && event.key === 'Backspace') {
      setTags(tags.slice(0, tags.length - 1))
    }
  }

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

  return (
    <Downshift
      inputValue={inputValue}
      onSelect={handleInput}
      itemToString={item => {
        return item && item.name
      }}>
      {downshift => {
        const {onChange, onKeyDown} = downshift.getInputProps({
          onKeyDown: handleKeyDown,
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
                  onChange={(
                    event: React.ChangeEvent<{value: string}> | React.ChangeEvent<HTMLInputElement>
                  ) => {
                    onInputChange(event)
                    onChange!(event as React.ChangeEvent<HTMLInputElement>)
                  }}
                  onKeyDown={e => {
                    if (e.key == 'Enter') {
                      const item = {id: inputValue, name: inputValue}
                      options.push(item)
                      downshift.selectItem(item)
                    }
                    onKeyDown(e)
                  }}
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
