import React from 'react'

import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {IconType} from '../atoms/icon'
import {FavorButton, FavorButtonProps} from '../atoms/favorButton'
import {BlockActionBar} from './blockActionBar'

export interface EditorBlockActionBarProps {
  onEdit(): void
  onNext?(): void
  onPrevious?(): void
  isLead?: FavorButtonProps
}

export function EditorBlockActionBar({
  onEdit,
  isLead,
  onNext,
  onPrevious
}: EditorBlockActionBarProps) {
  return (
    <BlockActionBar
      buttonsCenter={
        <>
          {onPrevious && <OptionButtonSmall icon={IconType.ChevronLeft} onClick={onPrevious} />}
          {onNext && <OptionButtonSmall icon={IconType.ChevronRight} onClick={onNext} />}
        </>
      }
      buttonsRight={
        <>
          <OptionButtonSmall icon={IconType.Edit} onClick={onEdit} />
          {isLead && (
            <FavorButton
              isFavorite={isLead.isFavorite}
              onFavoriteChange={isLead.onFavoriteChange}
            />
          )}
        </>
      }
    />
  )
}
