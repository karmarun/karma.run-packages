import React, {useState} from 'react'
import {Value, DocumentJSON, ValueJSON, Editor as CoreEditor} from 'slate'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {RichtextBlock} from './richtextBlock'
import {IconType} from '../atoms/icon'
import {RenderMarkProps, RenderBlockProps} from 'slate-react'

export default {
  component: RichtextBlock,
  title: 'Molecules|RichtextBlock',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => {
  const val: ValueJSON = {object: 'value', document: {...mockRichTextValue}}
  const [value, setValue] = useState(Value.create(val))

  function onChange(value: Value) {
    setValue(value)
  }

  function renderMark(props: RenderMarkProps, editor: CoreEditor, next: () => any) {
    const {children, mark, attributes} = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  function renderBlock(props: RenderBlockProps, editor: CoreEditor, next: () => any) {
    return next()
  }

  return (
    <RichtextBlock
      editItems={standardRichTextEditItems}
      value={value}
      onChange={onChange}
      renderMark={renderMark}
      renderBlock={renderBlock}
    />
  )
}

const isActive = (editor: CoreEditor, value: Value, label: string) =>
  value.activeMarks.some(mark => mark.type === label)
const toggleMark = (editor: CoreEditor, value: Value, label: string) => editor.toggleMark(label)

export const standardRichTextEditItems = [
  {
    icon: IconType.Bold,
    label: 'bold',
    onClick: toggleMark,
    isActive: isActive
  },
  {
    icon: IconType.Italic,
    label: 'italic',
    onClick: toggleMark,
    isActive: isActive
  },
  {
    icon: IconType.Underline,
    label: 'underline',
    onClick: toggleMark,
    isActive: isActive
  },
  {
    icon: IconType.Striked,
    label: 'striked',
    onClick: toggleMark,
    isActive: isActive
  },
  {
    icon: IconType.H2,
    label: 'h2',
    onClick: (editor: CoreEditor, value: Value) => {},
    isActive: isActive
  },
  {
    icon: IconType.H3,
    label: 'h3',
    onClick: (editor: CoreEditor, value: Value) => {},
    isActive: isActive
  },
  {
    icon: IconType.ListUnsorted,
    label: 'listUnsorted',
    onClick: (editor: CoreEditor, value: Value) => {},
    isActive: isActive
  },
  {
    icon: IconType.ListSorted,
    label: 'listSorted',
    onClick: (editor: CoreEditor, value: Value) => {},
    isActive: isActive
  },
  {
    icon: IconType.Link,
    label: 'link',
    onClick: (editor: CoreEditor, value: Value) => {},
    isActive: isActive
  }
]

export const mockRichTextValue: DocumentJSON = {
  object: 'document',
  nodes: [
    {
      object: 'block',
      key: '90',
      type: 'heading-two',
      nodes: [
        {
          object: 'text',
          key: '10',
          text: 'This is a H2 '
        }
      ]
    },
    {
      object: 'block',
      key: '1',
      type: 'heading-three',
      nodes: [
        {
          object: 'text',
          key: '11',
          text: 'This is a H3'
        }
      ]
    },
    {
      object: 'block',
      key: '2',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          key: '12',
          text: "Since it's rich text, you can do things like turn a selection of text "
        },
        {
          object: 'text',
          key: '91',
          text: 'bold',
          marks: [{type: 'bold'}]
        },
        {
          object: 'text',
          key: '32',
          text: ', or '
        },
        {
          object: 'text',
          key: '3',
          text: 'italic',
          marks: [{type: 'italic'}]
        },
        {
          object: 'text',
          key: '4',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      key: '43',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          key: '13',
          text: 'In addition to block nodes, you can create inline nodes, like '
        },
        {
          object: 'inline',
          key: '22',
          type: 'link',
          data: {
            href: 'https://en.wikipedia.org/wiki/Hypertext'
          },
          nodes: [
            {
              object: 'text',
              key: '14',
              text: 'hyperlinks'
            }
          ]
        },
        {
          object: 'text',
          key: '37',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      key: '40',
      type: 'bulleted-list',
      nodes: [
        {
          object: 'block',
          key: '95',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '16',
              text: 'bullet one'
            }
          ]
        },
        {
          object: 'block',
          key: '23',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '17',
              text: 'bullet two',
              marks: [{type: 'bold'}, {type: 'italic'}]
            }
          ]
        }
      ]
    },
    {
      object: 'block',
      key: '5',
      type: 'numbered-list',
      nodes: [
        {
          object: 'block',
          key: '18',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '20',
              text: 'nubmer one'
            }
          ]
        },
        {
          object: 'block',
          key: '24',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '19',
              text: 'number two',
              marks: [{type: 'italic'}]
            }
          ]
        }
      ]
    }
  ]
}
