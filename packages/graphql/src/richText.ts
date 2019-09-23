import {GraphQLScalarType, Kind, valueFromASTUntyped, ASTNode, GraphQLError} from 'graphql'
import {DocumentJSON, NodeJSON, BlockJSON, TextJSON, MarkJSON} from 'slate'
import Maybe from 'graphql/tsutils/Maybe'
import {isObject} from '@karma.run/utility'

export function parseLiteral(ast: ASTNode, variables: Maybe<{[key: string]: any}>): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value

    case Kind.INT:
      return parseInt(ast.value)

    case Kind.FLOAT:
      return parseFloat(ast.value)

    case Kind.OBJECT:
      return ast.fields.reduce(
        (obj, value) => {
          obj[value.name.value] = parseLiteral(value.value, variables)
          return obj
        },
        {} as Record<string, any>
      )

    case Kind.LIST:
      return ast.values.map(value => parseLiteral(value, variables))

    case Kind.NULL:
      return null

    case Kind.VARIABLE:
      return variables ? variables[ast.name.value] : undefined

    default:
      return undefined
  }
}

export const GraphQLRichText = new GraphQLScalarType({
  name: 'GraphQLRichText',
  serialize(value: DocumentJSON) {
    return value
  },

  parseValue(value: unknown) {
    if (typeof value !== 'object' || value == null || Array.isArray(value)) {
      throw new TypeError(
        `GraphQLRichText cannot represent non string type ${JSON.stringify(value)}.`
      )
    }

    const node = validateDocumentJSON(value, [])

    // TODO: Check document

    return node
  },

  parseLiteral(ast, variables) {
    if (ast.kind !== Kind.OBJECT) {
      throw new GraphQLError(
        `GraphQLRichText cannot represent non object type ${JSON.stringify(
          valueFromASTUntyped(ast)
        )}.`,
        ast
      )
    }

    const node = validateNodeJSON(parseLiteral(ast, variables), [])

    // TODO: Check document

    return node
  }
})

export type PathArray = readonly (string | number)[]
export type UnknownNode = Record<string, {type: string}>

export function validateNodeJSON(node: unknown, path: PathArray): NodeJSON {
  if (!isObject(node)) {
    throw new GraphQLError(
      `Cannot represent a RichText node as non-object.`,
      undefined,
      undefined,
      undefined,
      path
    )
  }
}

// export function validateBlockNode(node: unknown): BlockJSON {}

// export function validateTextNode(node: unknown): TextJSON {}

// export function validateMarkNode(node: unknown): MarkJSON {}

export function validateDocumentJSON(node: NodeJSON, path: PathArray): DocumentJSON {
  if (!isObject(node)) {
    throw new GraphQLError(`Cannot represent slate `, undefined, undefined, undefined, path)
  }

  return {}
}

const mockRichTextValue: DocumentJSON = {
  object: 'document',
  nodes: [
    {
      object: 'block',
      key: '0',
      type: 'heading-two',
      nodes: [
        {
          object: 'text',
          key: '0',
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
          key: '0',
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
          key: '0',
          text: "Since it's rich text, you can do things like turn a selection of text "
        },
        {
          object: 'text',
          key: '1',
          text: 'bold',
          marks: [{type: 'bold'}]
        },
        {
          object: 'text',
          key: '2',
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
      key: '3',
      type: 'paragraph',
      nodes: [
        {
          object: 'text',
          key: '0',
          text: 'In addition to block nodes, you can create inline nodes, like '
        },
        {
          object: 'inline',
          key: '1',
          type: 'link',
          data: {
            href: 'https://en.wikipedia.org/wiki/Hypertext'
          },
          nodes: [
            {
              object: 'text',
              key: '0',
              text: 'hyperlinks'
            }
          ]
        },
        {
          object: 'text',
          key: '2',
          text: '!'
        }
      ]
    },
    {
      object: 'block',
      key: '4',
      type: 'bulleted-list',
      nodes: [
        {
          object: 'block',
          key: '0',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '0',
              text: 'bullet one'
            }
          ]
        },
        {
          object: 'block',
          key: '1',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '0',
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
          key: '0',
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
          key: '1',
          type: 'list-item',
          nodes: [
            {
              object: 'text',
              key: '0',
              text: 'number two',
              marks: [{type: 'italic'}]
            }
          ]
        }
      ]
    }
  ]
}