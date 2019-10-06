import React, {ReactNode} from 'react'
import {Card} from '../atoms/card'
import {useStyle, cssRule} from '@karma.run/react'
import {IconType, Icon} from '../atoms/icon'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {pxToRem, Spacing} from '../style/helpers'
import {
  MaterialIconDeleteOutlined,
  MaterialIconKeyboardArrowUp,
  MaterialIconKeyboardArrowDown
} from '@karma.run/icons'

const ListItemWrapperStyle = cssRule({
  display: 'flex',
  width: '100%'
})

const ListItemWrapperActionStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  marginRight: pxToRem(Spacing.ExtraSmall)
})

const ListItemWrapperAccessoryStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: pxToRem(Spacing.ExtraSmall)
})

const ListItemWrapperContentStyle = cssRule({
  display: 'flex',
  width: '100%'
})

export interface ListItemWrapperProps {
  readonly children?: ReactNode
  readonly accessory?: ReactNode // TODO
  readonly icon?: IconType

  onDelete?(): void
  onMoveUp?(): void
  onMoveDown?(): void
}

export function ListItemWrapper({
  children,
  icon,
  onDelete,
  onMoveUp,
  onMoveDown
}: ListItemWrapperProps) {
  const {css} = useStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <OptionButtonSmall
          title="Delete"
          icon={MaterialIconDeleteOutlined}
          onClick={onDelete}
          disabled={onDelete == null}
        />
        <OptionButtonSmall
          title="Move Up"
          icon={MaterialIconKeyboardArrowUp}
          onClick={onMoveUp}
          disabled={onMoveUp == null}
        />
        <OptionButtonSmall
          title="Move Down"
          icon={MaterialIconKeyboardArrowDown}
          onClick={onMoveDown}
          disabled={onMoveDown == null}
        />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card>{children}</Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon element={icon} />}</div>
    </div>
  )
}
