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
  readonly title: string
  readonly icon: IconType
}

export function useUnionField<T extends string, V = any>(
  fieldFn: FieldConstructorFn<V>,
  defaultValue: ValueConstructor<V>,
  opts: UnionFieldOptions,
  deps: readonly any[] = []
): UnionFieldCaseProps<V> {
  return useMemo(
    () => ({
      title: opts.title,
      icon: opts.icon,
      defaultValue,
      fieldFn: useCallback(fieldFn, deps)
    }),
    [opts.title, opts.icon, ...deps]
  )
}
