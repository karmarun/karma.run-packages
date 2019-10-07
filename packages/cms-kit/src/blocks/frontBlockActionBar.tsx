import React from 'react'
import {BlockActionBar} from './blockActionBar'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {IconType} from '../atoms/icon'

export interface FrontBlockActionBarProps {
  onEdit(): void
  onReplace(): void
}

export function FrontBlockActionBar({onEdit, onReplace}: FrontBlockActionBarProps) {
  return (
    <BlockActionBar
      buttonsRight={
        <>
          <OptionButtonSmall icon={IconType.Edit} onClick={onEdit} />
          <OptionButtonSmall icon={IconType.Replace} onClick={onReplace} />
        </>
      }
    />
  )
}
