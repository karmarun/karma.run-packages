import {IconType} from '../atoms/icon'
import {ValueConstructor} from '@karma.run/react'

export interface FieldProps<V = any> {
  readonly value: V
  readonly onChange: React.Dispatch<React.SetStateAction<V>>
}

export type FieldConstructorFn<V = any> = (props: FieldProps<V>) => JSX.Element

export interface UnionFieldCaseProps<V = any> {
  readonly title: string
  readonly icon: IconType
  readonly defaultValue: ValueConstructor<V>
  readonly fieldFn: FieldConstructorFn<V>
}
