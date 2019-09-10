import {FieldProps, UnionField, FieldConstructorFn} from './types'
import {useCallback} from 'react'
import {IconType} from '../atoms/icon'

export function useField<T>(
  fieldFn: (props: FieldProps<T>) => JSX.Element,
  deps: readonly any[] = []
): (props: FieldProps<T>) => JSX.Element {
  return useCallback(fieldFn, deps)
}

export function useUnionField<T extends string, P = any>(
  type: T,
  title: string,
  icon: IconType,
  fieldFn: FieldConstructorFn<P>,
  deps: readonly any[] = []
): UnionField<T, P> {
  return {type, title, icon, fieldFn: useCallback(fieldFn, deps)}
}
