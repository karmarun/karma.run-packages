import React, {ReactNode, forwardRef, Ref} from 'react'

import {
  FlexDirectionProperty,
  JustifyContentProperty,
  JustifySelfProperty,
  JustifyItemsProperty,
  AlignItemsProperty,
  AlignContentProperty,
  AlignSelfProperty,
  FlexBasisProperty,
  GlobalsNumber,
  FlexWrapProperty,
  MinWidthProperty,
  MaxWidthProperty,
  WidthProperty,
  HeightProperty,
  MinHeightProperty,
  MaxHeightProperty
} from 'csstype'

import {pxToRem} from '../style/helpers'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'

export interface BaseBoxProps {
  readonly flex?: boolean
  readonly inlineFlex?: boolean
  readonly inline?: boolean
  readonly block?: boolean

  readonly flexDirection?: FlexDirectionProperty
  readonly justifyContent?: JustifyContentProperty
  readonly justifyItems?: JustifyItemsProperty
  readonly justifySelf?: JustifySelfProperty
  readonly alignContent?: AlignContentProperty
  readonly alignItems?: AlignItemsProperty
  readonly alignSelf?: AlignSelfProperty
  readonly flexBasis?: FlexBasisProperty<string>
  readonly flexGrow?: GlobalsNumber
  readonly flexShrink?: GlobalsNumber
  readonly flexWrap?: FlexWrapProperty

  readonly width?: WidthProperty<string>
  readonly minWidth?: MinWidthProperty<string>
  readonly maxWidth?: MaxWidthProperty<string>

  readonly height?: HeightProperty<string>
  readonly minHeight?: MinHeightProperty<string>
  readonly maxHeight?: MaxHeightProperty<string>

  readonly padding?: number | string
  readonly paddingTop?: number | string
  readonly paddingBottom?: number | string
  readonly paddingLeft?: number | string
  readonly paddingRight?: number | string

  readonly margin?: number | string
  readonly marginTop?: number | string
  readonly marginBottom?: number | string
  readonly marginLeft?: number | string
  readonly marginRight?: number | string

  readonly element?: keyof JSX.IntrinsicElements
  readonly children?: ReactNode | ((props: {className: string}, ref: Ref<any>) => ReactNode)
}

type BoxStyleProps = Omit<Omit<BaseBoxProps, 'element'>, 'children'>

const BoxBaseStyle = cssRuleWithTheme<BoxStyleProps>(
  ({
    flex,
    inlineFlex,
    block,
    inline,
    margin,
    padding,
    theme,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...props
  }) => ({
    display: flex
      ? 'flex'
      : inlineFlex
      ? 'inline-flex'
      : block
      ? 'block'
      : inline
      ? 'inline'
      : undefined,
    margin: typeof margin === 'number' ? pxToRem(margin) : margin,
    marginTop: typeof marginTop === 'number' ? pxToRem(marginTop) : marginTop,
    marginBottom: typeof marginBottom === 'number' ? pxToRem(marginBottom) : marginBottom,
    marginLeft: typeof marginLeft === 'number' ? pxToRem(marginLeft) : marginLeft,
    marginRight: typeof marginRight === 'number' ? pxToRem(marginRight) : marginRight,

    padding: typeof padding === 'number' ? pxToRem(padding) : padding,
    paddingTop: typeof paddingTop === 'number' ? pxToRem(paddingTop) : paddingTop,
    paddingBottom: typeof paddingBottom === 'number' ? pxToRem(paddingBottom) : paddingBottom,
    paddingLeft: typeof paddingLeft === 'number' ? pxToRem(paddingLeft) : paddingLeft,
    paddingRight: typeof paddingRight === 'number' ? pxToRem(paddingRight) : paddingRight,

    ...props
  })
)

export const Box = forwardRef<any, BaseBoxProps>(
  ({element = 'div', children, ...props}, ref: any) => {
    const style = useThemeStyle(props)
    const className = style(BoxBaseStyle)

    const Element = element as any
    const anyChildren = children as any

    return typeof anyChildren === 'function' ? (
      anyChildren({className}, ref)
    ) : (
      <Element className={className} ref={ref}>
        {children}
      </Element>
    )
  }
)
