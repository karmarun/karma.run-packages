import {FieldProps, UnionFieldCaseProps, FieldConstructorFn} from './types'
import {useCallback, useMemo} from 'react'
import {IconType} from '../atoms/icon'
import {ValueConstructor} from '@karma.run/react'

export function useField<T>(
  fieldFn: (props: FieldProps<T>) => JSX.Element,
  deps: readonly any[] = []
): (props: FieldProps<T>) => JSX.Element {
  return useCallback(fieldFn, deps)
}

export interface UnionFieldOptions {
  readonly label: string
  readonly icon: IconType
}

export function useUnionField<V = any>(
  field: FieldConstructorFn<V>,
  defaultValue: ValueConstructor<V>,
  {label, icon}: UnionFieldOptions,
  deps: readonly any[] = []
): UnionFieldCaseProps<V> {
  return useMemo(
    () => ({
      label,
      icon,
      defaultValue,
      field
    }),
    [label, icon, ...deps]
  )
}
