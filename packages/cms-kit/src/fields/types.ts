import {IconType} from '../atoms/icon'

export interface FieldProps<V = any> {
  readonly value: V
  readonly onChange: React.Dispatch<React.SetStateAction<V>>
}

export type FieldConstructorFn<V = any> = (props: FieldProps<V>) => JSX.Element

export interface UnionFieldProps<T extends string, V = any> {
  readonly title: string
  readonly icon: IconType
  readonly type: T
  readonly fieldFn: FieldConstructorFn<V>
}
