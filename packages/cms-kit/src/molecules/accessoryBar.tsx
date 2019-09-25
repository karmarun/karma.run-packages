import React from 'react'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {IconType} from '../atoms/icon'
import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem} from '../style/helpers'
import {Spacing} from '../style/helpers'
import {FavorButton, FavorButtonProps} from '../atoms/favorButton'

export const AccessoryBarStyle = cssRule({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: pxToRem(Spacing.ExtraSmall)
})

const ChevronsStyle = cssRule({
  display: 'flex',

  '& button': {
    marginLeft: pxToRem(Spacing.Tiny),
    marginRight: pxToRem(Spacing.Tiny)
  }
})

const OptionsStyle = cssRule({
  '&:first-child': {
    marginBottom: pxToRem(Spacing.ExtraSmall)
  }
})

export interface AccessoryBarProps {
  onEdit(): void
  onNext?(): void
  onPrevious?(): void
  isLead?: FavorButtonProps
}

export function AccessoryBar({onEdit, isLead, onNext, onPrevious}: AccessoryBarProps) {
  const {css} = useStyle()
  return (
    <div className={css(AccessoryBarStyle)}>
      <div></div>
      <div className={css(ChevronsStyle)}>
        {onPrevious && <OptionButtonSmall icon={IconType.ChevronLeft} onClick={onPrevious} />}
        {onNext && <OptionButtonSmall icon={IconType.ChevronRight} onClick={onNext} />}
      </div>
      <div className={css(OptionsStyle)}>
        <OptionButtonSmall icon={IconType.Edit} onClick={onEdit} />
        {isLead && (
          <FavorButton isFavorite={isLead.isFavorite} onFavoriteChange={isLead.onFavoriteChange} />
        )}
      </div>
    </div>
  )
}
