import React, {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react'

import {IconType, Icon} from '../../atoms/icon'

import {themeMiddleware, Theme} from '../../style/themeContext'
import {
  FontSize,
  TransitionDuration,
  LineHeight,
  Spacing,
  MarginProps,
  extractStyleProps,
  WidthProps,
  FlexChildProps
} from '../../style/helpers'
import {cssRule, styled} from '@karma.run/react'

// TODO: Shares a lot of code with TextInput and TypographicTextArea, try deduplicate some stuff.
interface TextAreaStyleProps {
  readonly hasError: boolean
  readonly hasIcon: boolean
  readonly theme: Theme
}

interface TextAreaLayoutProps extends MarginProps, WidthProps, FlexChildProps {}

const IconStyle = cssRule(() => ({
  position: 'absolute'
}))

const TextAreaWrapper = styled('div', (props: TextAreaLayoutProps) => ({
  paddingTop: 16,
  ...props
}))

const TextAreaLabelWrapper = styled(
  'label',
  ({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    fontSize: FontSize.Medium,
    fill: theme.colors.dark
  }),
  themeMiddleware
)

const TextAreaLabel = styled(
  'span',
  ({hasError, theme}: TextAreaStyleProps) => ({
    color: hasError ? theme.colors.alert : theme.colors.gray,
    position: 'absolute',
    top: -FontSize.Medium,
    left: 0,
    fontSize: FontSize.Small,
    opacity: 1,
    transform: 'translateY(0%)',
    transitionProperty: 'transform, opacity, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

const TextAreaElement = styled(
  'textarea',
  ({hasIcon, theme}: TextAreaStyleProps) => ({
    resize: 'none',
    width: '100%',

    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: LineHeight.Default,

    border: 'none',
    borderBottom: `1px solid ${theme.colors.gray}`,

    transitionProperty: 'border-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    paddingLeft: hasIcon ? FontSize.Medium + Spacing.Tiny : undefined,

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':focus:valid': {
      borderColor: theme.colors.action
    },

    ':focus:valid + span': {
      color: theme.colors.action
    },

    ':focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':focus:invalid + span': {
      color: theme.colors.alert
    },

    ':invalid': {
      borderColor: theme.colors.alert
    },

    ':disabled': {
      opacity: 0.5
    },

    ':invalid + span': {
      color: theme.colors.alert
    },

    ':placeholder-shown + span': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + span': {
      color: theme.colors.action
    }
  }),
  themeMiddleware
)

const TextAreaInfo = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const TexAreaError = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface TextAreaProps
  extends MarginProps,
    WidthProps,
    FlexChildProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string
  readonly description?: string
  readonly errorMessage?: string
  readonly icon?: IconType
}

const AutoSizeBuffer = 2

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextInput(
  {label, description, errorMessage, icon, onChange, rows = 1, ...props},
  forwardRef
) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const styleProps = {hasError: errorMessage != undefined, hasIcon: icon != undefined}
  const [layoutProps, elementProps] = extractStyleProps(props)

  useImperativeHandle(forwardRef, () => ref.current!, [ref.current])

  useLayoutEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    // TODO: Consider using resize observer
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref])

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    handleResize()
    onChange?.(e)
  }

  function handleResize() {
    ref.current!.style.overflow = 'hidden'
    ref.current!.style.height = 'auto'
    ref.current!.style.height = `${ref.current!.scrollHeight + AutoSizeBuffer}px`
    ref.current!.style.overflow = ''
  }

  return (
    <TextAreaWrapper styleProps={layoutProps}>
      <TextAreaLabelWrapper>
        {icon && <Icon element={icon} style={IconStyle} />}
        <TextAreaElement
          ref={ref}
          placeholder={label}
          styleProps={styleProps}
          onChange={handleChange}
          rows={rows}
          {...elementProps}
        />
        <TextAreaLabel styleProps={styleProps}>{label}</TextAreaLabel>
      </TextAreaLabelWrapper>
      {description && <TextAreaInfo>{description}</TextAreaInfo>}
      {errorMessage && <TexAreaError>{errorMessage}</TexAreaError>}
    </TextAreaWrapper>
  )
})
