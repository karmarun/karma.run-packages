import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {RichtextEditOverlay, RichTextEditButton} from './richtextEditOverlay'
import {IconType} from '../atoms/icon'

export default {
  component: RichtextEditOverlay,
  title: 'Molecules|RichtextEditOverlay',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <RichtextEditOverlay>
    <RichTextEditButton icon={IconType.Bold} onClick={() => {}} />
    <RichTextEditButton icon={IconType.Italic} onClick={() => {}} />
    <RichTextEditButton icon={IconType.Underline} onClick={() => {}} />
    <RichTextEditButton icon={IconType.Striked} onClick={() => {}} />
    <RichTextEditButton icon={IconType.H2} onClick={() => {}} />
    <RichTextEditButton icon={IconType.H3} onClick={() => {}} />
    <RichTextEditButton icon={IconType.ListUnsorted} onClick={() => {}} />
    <RichTextEditButton icon={IconType.ListSorted} onClick={() => {}} />
    <RichTextEditButton icon={IconType.Link} onClick={() => {}} />
  </RichtextEditOverlay>
)
