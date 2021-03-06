import React from 'react'
import {IconButton} from './iconButton'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {MaterialIconAdd} from '@karma.run/icons'
import {ZIndex, hexToRgba} from '../style/helpers'

interface AddBlockButtonStyleProps {
  active: boolean
  subtle: boolean
}

const AddBlockButtonStyle = cssRuleWithTheme<AddBlockButtonStyleProps>(
  ({theme, active, subtle}) => {
    const color = subtle ? theme.colors.grayLight : theme.colors.action

    return {
      _className: process.env.NODE_ENV !== 'production' ? 'AddBlockButton' : undefined,

      display: 'flex',
      position: 'relative',

      alignItems: 'center',
      justifyContent: 'center',

      width: '100%',

      '&::before': {
        content: '""',

        position: 'absolute',
        zIndex: ZIndex.Default,
        display: 'block',

        top: '50%',

        width: '100%',
        height: '1px',

        background: `linear-gradient(90deg, ${hexToRgba(color, 0)}, ${color}, ${hexToRgba(
          color,
          0
        )})`
      }
    }
  }
)

const AddBlockButtonContentStyle = cssRuleWithTheme(() => ({
  _className: process.env.NODE_ENV !== 'production' ? 'AddBlockButtonContent' : undefined,
  zIndex: ZIndex.Default
}))

export interface AddBlockButtonProps {
  active?: boolean
  subtle?: boolean
  disabled?: boolean

  onClick: () => void
}

export function AddBlockButton({
  onClick,
  active = false,
  subtle = false,
  disabled
}: AddBlockButtonProps) {
  const css = useThemeStyle<AddBlockButtonStyleProps>({active, subtle})

  return (
    <div className={css(AddBlockButtonStyle)}>
      <div className={css(AddBlockButtonContentStyle)}>
        <IconButton
          title="Add Block"
          active={active}
          icon={MaterialIconAdd}
          onClick={() => onClick()}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
