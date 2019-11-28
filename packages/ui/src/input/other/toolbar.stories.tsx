import React, {useState, useMemo, useCallback, ReactNode, useEffect} from 'react'

// import {Value, DocumentJSON, ValueJSON, Editor as CoreEditor} from 'slate'
// import {RenderMarkProps, RenderBlockProps, Plugin, Slate, Editable} from 'slate-react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {Toolbar, ToolbarButton, ToolbarButtonProps} from './toolbar'
import {Typography} from '../../layout/typography'

import {
  MaterialIconFormatBold,
  MaterialIconFormatItalic,
  MaterialIconFormatUnderlined,
  MaterialIconFormatStrikethrough,
  MaterialIconLooksTwoOutlined,
  MaterialIconLooks3Outlined,
  MaterialIconFormatListBulleted,
  MaterialIconFormatListNumbered,
  MaterialIconLink,
  MaterialIconLooksOne,
  MaterialIconLooksOneOutlined
} from '@karma.run/icons'

import {createEditor, Node, Element, Editor} from 'slate'
import {Slate, Editable, withReact, useSlate} from 'slate-react'
import {withHistory} from 'slate-history'
import {withSchema, SchemaRule} from 'slate-schema'
import {CustomElementProps, CustomMarkProps} from 'slate-react/lib/components/custom'

export default {
  component: Toolbar,
  title: 'Input|Other/Toolbar',
  decorators: [centerLayoutDecorator(0.8)]
}

enum RichtextBlockType {
  H1 = 'heading-one',
  H2 = 'heading-two',
  H3 = 'heading-three',
  Paragraph = 'paragraph',
  UnorderedList = 'unordered-list',
  OrderedList = 'ordered-list',
  ListItem = 'list-item'
}

enum RichtextMarkType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough'
}

// function hasMark(editor: CoreEditor, value: Value, label: string) {
//   return value.activeMarks.some(mark => mark.type === label)
// }

// function hasType(editor: CoreEditor, value: Value, label: string) {
//   return hasBlock(value, label)
// }

// function hasBlock(value: Value, label: string) {
//   return value.blocks.some(block => {
//     return block.type === label
//   })
// }

// function hasInlines(editor: CoreEditor, value: Value, label: string) {
//   return value.inlines.some(inline => inline.type === label)
// }

// function isListOfType(editor: CoreEditor, val: Value, label: string) {
//   const {blocks} = val
//   const first = blocks.first()
//   const isListItem = blocks.some(blocks => blocks.type === 'list-item')

//   return editor.value.blocks.some(block => {
//     if (isListItem) {
//       const parent = val.document.getClosest(
//         first.key,
//         parent => parent.object == 'block' && parent.type == label
//       )

//       return parent != undefined
//     }
//   })
// }

// function toggleMark(editor: CoreEditor, value: Value, label: string) {
//   editor.toggleMark(label)
// }

// function toggleTitle(editor: CoreEditor, value: Value, isH2: boolean) {
//   const type = isH2 ? RichtextType.H2 : RichtextType.H3
//   const isActive = hasBlock(value, type)
//   const isList = hasBlock(value, 'list-item')

//   if (isList) {
//     editor
//       .setBlocks(isActive ? DEFAULT_NODE : type)
//       .unwrapBlock('bulleted-list')
//       .unwrapBlock('numbered-list')
//   } else {
//     editor.setBlocks(isActive ? DEFAULT_NODE : type)
//   }
// }

// function toggleList(editor: CoreEditor, value: Value, listType: string) {
//   // Handle the extra wrapping required for list buttons.
//   const isList = hasBlock(value, RichtextType.ListItem)
//   const isType = value.blocks.some(block => {
//     return !!value.document.getClosest(
//       block.key,
//       parent => parent.object == 'block' && parent.type === listType
//     )
//   })

//   if (isList && isType) {
//     editor
//       .setBlocks(DEFAULT_NODE)
//       .unwrapBlock(RichtextType.BulletList)
//       .unwrapBlock(RichtextType.NumberedList)
//   } else if (isList) {
//     editor
//       .unwrapBlock(
//         listType === RichtextType.BulletList ? RichtextType.NumberedList : RichtextType.BulletList
//       )
//       .wrapBlock(listType)
//   } else {
//     editor.setBlocks(RichtextType.ListItem).wrapBlock(listType)
//   }
// }

// const standardRichTextEditItems = [
//   {
//     icon: MaterialIconFormatBold,
//     label: 'bold',
//     onApply: toggleMark,
//     isActive: hasMark
//   },
//   {
//     icon: MaterialIconFormatItalic,
//     label: 'italic',
//     onApply: toggleMark,
//     isActive: hasMark
//   },
//   {
//     icon: MaterialIconFormatUnderlined,
//     label: 'underline',
//     onApply: toggleMark,
//     isActive: hasMark
//   },
//   {
//     icon: MaterialIconFormatStrikethrough,
//     label: 'strikethrough',
//     onApply: toggleMark,
//     isActive: hasMark
//   },
//   {
//     icon: MaterialIconLooksTwoOutlined,
//     label: 'heading-two',
//     onApply: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, true),
//     isActive: hasType
//   },
//   {
//     icon: MaterialIconLooks3Outlined,
//     label: 'heading-three',
//     onApply: (editor: CoreEditor, value: Value) => toggleTitle(editor, value, false),
//     isActive: hasType
//   },
//   {
//     icon: MaterialIconFormatListBulleted,
//     label: 'bulleted-list',
//     onApply: (editor: CoreEditor, value: Value) =>
//       toggleList(editor, value, RichtextType.BulletList),
//     isActive: isListOfType
//   },
//   {
//     icon: MaterialIconFormatListNumbered,
//     label: 'numbered-list',
//     onApply: (editor: CoreEditor, value: Value) =>
//       toggleList(editor, value, RichtextType.NumberedList),
//     isActive: isListOfType
//   },
//   {
//     icon: MaterialIconLink,
//     label: 'link',
//     onApply: (editor: CoreEditor, value: Value) => {},
//     isActive: hasInlines
//   }
// ]

function renderElement({attributes, children, element}: CustomElementProps) {
  switch (element.type) {
    case RichtextBlockType.H1:
      return (
        <Typography variant="h1" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextBlockType.H2:
      return (
        <Typography variant="h2" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextBlockType.H3:
      return (
        <Typography variant="h3" spacing="small" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextBlockType.Paragraph:
      return (
        <Typography variant="body1" spacing="large" {...attributes}>
          {children}
        </Typography>
      )

    case RichtextBlockType.UnorderedList:
      return <ul {...attributes}>{children}</ul>

    case RichtextBlockType.OrderedList:
      return <ol {...attributes}>{children}</ol>

    case RichtextBlockType.ListItem:
      return <li {...attributes}>{children}</li>
  }
}

function renderMark({attributes, children, mark}: CustomMarkProps) {
  switch (mark.type) {
    case RichtextMarkType.Bold:
      return <strong {...attributes}>{children}</strong>

    case RichtextMarkType.Italic:
      return <em {...attributes}>{children}</em>

    case RichtextMarkType.Underline:
      return <u {...attributes}>{children}</u>

    case RichtextMarkType.Strikethrough:
      return <del {...attributes}>{children}</del>
  }
}

const schema: SchemaRule[] = [
  {
    for: 'node',
    match: 'editor',
    validate: {
      children: [
        {match: [([node]) => node.type === RichtextBlockType.H1]},
        {match: [([node]) => node.type === RichtextBlockType.H2]},
        {match: [([node]) => node.type === RichtextBlockType.H3]},
        {match: [([node]) => node.type === RichtextBlockType.UnorderedList]},
        {match: [([node]) => node.type === RichtextBlockType.OrderedList]},
        {match: [([node]) => node.type === RichtextBlockType.Paragraph]}
      ]
    },
    normalize: (editor, error) => {
      const {code, path} = error

      switch (code) {
        case 'child_invalid':
          Editor.setNodes(editor, {type: RichtextBlockType.Paragraph}, {at: path})
          break
      }
    }
  },

  {
    for: 'node',
    match: ([node]) =>
      node.type === RichtextBlockType.UnorderedList || node.type === RichtextBlockType.OrderedList,
    validate: {
      children: [{match: [([node]) => node.type === RichtextBlockType.ListItem]}]
    },
    normalize: (editor, error) => {
      const {code, path} = error

      switch (code) {
        case 'child_invalid':
          Editor.setNodes(editor, {type: RichtextBlockType.Paragraph}, {at: path})
          break
      }
    }
  }
]

export const Default = () => {
  const editor = useMemo(
    () => withSchema(withRichText(withHistory(withReact(createEditor()))), schema),
    []
  )
  const [value, setValue] = useState<Node[]>(mockRichTextValue)

  return (
    <Slate editor={editor} defaultValue={value} onChange={nodes => setValue(nodes)}>
      <>
        <SlateEditMenu>
          <SlateBlockButton icon={MaterialIconLooksOneOutlined} blockType={RichtextBlockType.H1} />
          <SlateBlockButton icon={MaterialIconLooksTwoOutlined} blockType={RichtextBlockType.H2} />
          <SlateBlockButton icon={MaterialIconLooks3Outlined} blockType={RichtextBlockType.H3} />
          <SlateBlockButton
            icon={MaterialIconFormatListBulleted}
            blockType={RichtextBlockType.UnorderedList}
          />
          <SlateBlockButton
            icon={MaterialIconFormatListNumbered}
            blockType={RichtextBlockType.OrderedList}
          />
        </SlateEditMenu>
        <Editable
          onDOMBeforeInput={undefined}
          placeholder="Start writing..."
          renderElement={renderElement}
          renderMark={renderMark}
        />
      </>
    </Slate>
  )
}

interface SlateEditMenuProps {
  readonly children?: ReactNode
}

function SlateEditMenu({children}: SlateEditMenuProps) {
  const editor = useSlate()
  return <Toolbar fadeOut={editor.selection != undefined}>{children}</Toolbar>
}

interface SlateBlockButtonProps extends ToolbarButtonProps {
  readonly blockType: RichtextBlockType
}

function SlateBlockButton({icon, blockType}: SlateBlockButtonProps) {
  const editor = useSlate()

  return (
    <ToolbarButton
      icon={icon}
      active={isBlockActive(editor, blockType)}
      onMouseDown={e => {
        e.preventDefault()
        editor.exec({type: 'toggle_block', block: blockType})
      }}
    />
  )
}

function isBlockActive(editor: Editor, type: RichtextBlockType) {
  const {selection} = editor
  if (!selection) return false
  const match = Editor.match(editor, selection, {type})
  return !!match
}

function isMarkActive(editor: Editor, type: RichtextMarkType) {
  const marks = Editor.activeMarks(editor)
  const isActive = marks.some(mark => mark.type === type)
  return isActive
}

function withRichText(editor: Editor): Editor {
  const {exec} = editor

  editor.exec = command => {
    if (command.type === 'toggle_block') {
      const {block: type} = command
      const isActive = isBlockActive(editor, type)

      const isListType =
        type === RichtextBlockType.UnorderedList || type === RichtextBlockType.OrderedList

      Editor.unwrapNodes(editor, {match: {type: RichtextBlockType.UnorderedList}})
      Editor.unwrapNodes(editor, {match: {type: RichtextBlockType.OrderedList}})

      const newType = isActive
        ? RichtextBlockType.Paragraph
        : isListType
        ? RichtextBlockType.ListItem
        : type

      Editor.setNodes(editor, {type: newType})

      if (!isActive && isListType) {
        Editor.wrapNodes(editor, {type, children: []})
      }

      return
    }

    if (command.type === 'toggle_mark') {
      const {mark: type} = command
      const isActive = isMarkActive(editor, type)
      const cmd = isActive ? 'remove_mark' : 'add_mark'
      editor.exec({type: cmd, mark: {type}})
      return
    }

    exec(command)
  }

  return editor
}

const mockRichTextValue: Element[] = [
  {
    type: RichtextBlockType.H1,
    children: [
      {
        text: 'This is a H1',
        marks: []
      }
    ]
  },
  {
    type: RichtextBlockType.H2,
    children: [
      {
        text: 'This is a H2',
        marks: []
      }
    ]
  },
  {
    type: RichtextBlockType.H3,
    children: [
      {
        text: 'This is a H3',
        marks: []
      }
    ]
  },
  {
    type: RichtextBlockType.Paragraph,
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
        marks: []
      },
      {
        text: 'bold',
        marks: [{type: RichtextMarkType.Bold}]
      },
      {
        text: ', or ',
        marks: []
      },
      {
        text: 'italic',
        marks: [{type: RichtextMarkType.Italic}]
      },
      {
        text: '!',
        marks: []
      }
    ]
  },
  {
    type: RichtextBlockType.Paragraph,
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
        marks: []
      },
      {
        text: '!',
        marks: []
      }
    ]
  },
  {
    type: RichtextBlockType.UnorderedList,
    children: [
      {
        type: RichtextBlockType.ListItem,
        children: [
          {
            text: 'Bullet one',
            marks: []
          }
        ]
      },
      {
        type: RichtextBlockType.ListItem,
        children: [
          {
            text: 'Bullet two',
            marks: [{type: RichtextMarkType.Bold}, {type: RichtextMarkType.Italic}]
          }
        ]
      }
    ]
  },
  {
    type: RichtextBlockType.OrderedList,
    children: [
      {
        type: RichtextBlockType.ListItem,
        children: [
          {
            text: 'Number one',
            marks: []
          }
        ]
      },
      {
        type: RichtextBlockType.ListItem,
        children: [
          {
            text: 'Number two',
            marks: [{type: RichtextMarkType.Bold}]
          }
        ]
      }
    ]
  }
]
