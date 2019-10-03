import React, {useRef, useState, ReactNode} from 'react'

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
import {DarkMenu, DarkMenuButton} from './darkMenu'
import {cssRule, useStyle} from '@karma.run/react'
import {PositionableOverlay} from '../atoms/positionableOverlay'

const outside = -10000

const RichtextBlockStyle = cssRuleWithTheme(({theme}) => ({}))

export interface RichtextBlockProps {
  readonly value: Value
  readonly editorMenu: ReactNode
  onChange?(value: Value): void
  renderMark?(props: RenderMarkProps, editor: CoreEditor, next: () => any): any
  renderBlock?(props: RenderBlockProps, editor: CoreEditor, next: () => any): any
}

export function RichtextBlock({
  editorMenu,
  value,
  onChange,
  renderMark,
  renderBlock
}: RichtextBlockProps) {
  const {css} = useThemeStyle()

  const ref = useRef<HTMLDivElement>(null)
  const renderRef = useRef<Plugin['renderEditor']>()

  const {fragment, selection} = value
  const [{currentTop, currentLeft}, setMenuPosition] = useState({
    currentTop: outside,
    currentLeft: outside
  })

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
        <PositionableOverlay
          top={currentTop}
          left={currentLeft}
          show={currentTop > outside}
          ref={ref}>
          {editorMenu}
        </PositionableOverlay>
      </React.Fragment>
    )
  }

  return (
    <div className={css(RichtextBlockStyle)} onClick={checkForSelection} onBlur={checkForSelection}>
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
