import React, {ReactNode} from 'react'

import {cssRule} from '@karma.run/react'

import {
  MaterialIconDeleteOutlined,
  MaterialIconKeyboardArrowDown,
  MaterialIconKeyboardArrowUp
} from '@karma.run/icons'

import {Card} from '../atoms/card'
import {Icon, IconType} from '../atoms/icon'
import {IconButton} from '../input/buttons/iconButton'
import {Spacing} from '../style/helpers'
import {Box} from '../layout/box'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

const ListItemWrapperStyle = cssRule({
  display: 'flex',
  width: '100%'
})

const ListItemWrapperActionStyle = cssRule({
  display: 'flex',
  flexDirection: 'column',
  width: 24,
  marginRight: Spacing.ExtraSmall
})

const ListItemWrapperAccessoryStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 24,
  marginLeft: Spacing.ExtraSmall,
  fontSize: 24,
  fill: theme.colors.gray
}))

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
  const css = useThemeStyle()

  return (
    <div className={css(ListItemWrapperStyle)}>
      <div className={css(ListItemWrapperActionStyle)}>
        <IconButton
          title="Delete"
          icon={MaterialIconDeleteOutlined}
          onClick={onDelete}
          disabled={onDelete == null}
        />
        <Box flexGrow={1} />
        <Box marginTop={Spacing.ExtraSmall} marginBottom={Spacing.Tiny}>
          <IconButton
            title="Move Up"
            icon={MaterialIconKeyboardArrowUp}
            onClick={onMoveUp}
            disabled={onMoveUp == null}
          />
        </Box>
        <Box marginBottom={Spacing.ExtraSmall}>
          <IconButton
            title="Move Down"
            icon={MaterialIconKeyboardArrowDown}
            onClick={onMoveDown}
            disabled={onMoveDown == null}
          />
        </Box>
        <Box flexGrow={1} />
      </div>
      <div className={css(ListItemWrapperContentStyle)}>
        <Card>
          <Box padding={Spacing.Small} minHeight="100%">
            {children}
          </Box>
        </Card>
      </div>
      <div className={css(ListItemWrapperAccessoryStyle)}>{icon && <Icon element={icon} />}</div>
    </div>
  )
}
