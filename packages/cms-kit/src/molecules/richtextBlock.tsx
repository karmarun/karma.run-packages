import React, {useRef, useState} from 'react'

import {
  Editor,
  OnChangeParam,
  EditorProps,
  Plugin,
  RenderMarkProps,
  RenderBlockProps
} from 'slate-react'
import {Value, Editor as CoreEditor} from 'slate'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, Spacing, TransitionDuration} from '../style/helpers'
import {RichtextEditOverlay, RichTextEditButton} from './richtextEditOverlay'
import {cssRule, useStyle} from '@karma.run/react'

const outside = -10000

interface EditMenuStyleProps {
  top: number
  left: number
}
const RichtextBlockStyle = cssRuleWithTheme(({theme}) => ({}))
const EditMenuStyle = cssRule<EditMenuStyleProps>(({top, left}) => ({
  position: 'absolute',
  opacity: top > outside ? 1 : 0,
  top: pxToRem(top),
  left: pxToRem(left),
  transition: `opacity ${TransitionDuration.Fast}`
}))

export interface RichtextBlockProps {
  readonly value: Value
  readonly editItems: RichTextEditButton[]
  onChange?(value: Value): void
  renderMark?(props: RenderMarkProps, editor: CoreEditor, next: () => any): any
  renderBlock?(props: RenderBlockProps, editor: CoreEditor, next: () => any): any
}

export function RichtextBlock({
  editItems,
  value,
  onChange,
  renderMark,
  renderBlock
}: RichtextBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const renderRef = useRef<Plugin['renderEditor']>()

  const {fragment, selection} = value
  const [{currentTop, currentLeft}, setMenuPosition] = useState({
    currentTop: outside,
    currentLeft: outside
  })

  const {css} = useThemeStyle({top: currentTop, left: currentLeft})

  function checkForSelection() {
    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      onDeselect()
    } else {
      const native = window.getSelection()

      if (native) {
        showMenu(native)
      }
    }
  }

  function showMenu(native: Selection) {
    const menu = ref.current
    if (!menu) return

    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    let temptop = rect.top + window.pageYOffset - menu.offsetHeight
    let templeft = rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2

    setMenuPosition({currentTop: temptop, currentLeft: templeft})
  }

  function onDeselect() {
    setMenuPosition({currentTop: outside, currentLeft: outside})
  }

  renderRef.current = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        {children}
        <div className={css(EditMenuStyle)} ref={ref}>
          <RichtextEditOverlay>
            {editItems.map((item, idx) => (
              <RichTextEditButton
                key={idx}
                editor={editor}
                isActive={item.isActive}
                icon={item.icon}
                onClick={item.onClick}
                label={item.label}
              />
            ))}
          </RichtextEditOverlay>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className={css(RichtextBlockStyle)} onClick={checkForSelection} onBlur={onDeselect}>
      {renderBlock ? (
        <Editor
          placeholder="Enter some text..."
          value={value}
          onChange={({value}: OnChangeParam) => {
            if (onChange) onChange(value)
          }}
          renderEditor={(...args) => renderRef.current!(...args)}
          renderMark={renderMark ? renderMark : undefined}
          renderBlock={renderBlock}
        />
      ) : (
        <Editor
          placeholder="Enter some text..."
          value={value}
          onChange={({value}: OnChangeParam) => {
            if (onChange) onChange(value)
          }}
          renderEditor={(...args) => renderRef.current!(...args)}
          renderMark={renderMark ? renderMark : undefined}
        />
      )}
    </div>
  )
}
