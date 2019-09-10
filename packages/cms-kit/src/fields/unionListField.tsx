import React, {memo, useCallback} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, isValueConstructor, ValueConstructor} from '@karma.run/react'

import {FieldProps, UnionFieldProps} from './types'

export interface UnionListValue<T extends string, V = any> {
  readonly id: string
  readonly type: T
  readonly value: V
}

export interface UnionListProps<T extends string, V = any> extends FieldProps<UnionListValue<V>[]> {
  readonly label?: string
  readonly defaultValue: ValueConstructor<V>
  readonly children: readonly UnionFieldProps<T, V>[]
}

export interface UnionListItemProps<T extends string, V = any> {
  readonly index: number
  readonly value: UnionListValue<T, V>
  readonly onChange: (index: number, value: React.SetStateAction<UnionListValue<V>>) => void
  readonly onRemove: (index: number) => void
  readonly children: (props: FieldProps<V>) => JSX.Element
}

export const ListItem = memo<UnionListItemProps>(function ListItem({
  index,
  value,
  onChange,
  onRemove,
  children
}) {
  const handleValueChange = useCallback(
    (fieldValue: React.SetStateAction<any>) => {
      onChange(index, value => ({
        ...value,
        value: isFunctionalUpdate(fieldValue) ? fieldValue(value.value) : fieldValue
      }))
    },
    [index]
  )

  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [index])

  return (
    <div>
      {children({value: value.value, onChange: handleValueChange})}
      <button onClick={handleRemove}>-</button>
    </div>
  )
})

export function UnionListField<T>({
  value,
  label,
  defaultValue,
  children,
  onChange
}: UnionListProps<T>) {
  const handleItemChange = useCallback(
    (index: number, itemValue: React.SetStateAction<UnionListValue>) => {
      onChange(value =>
        Object.assign([], value, {
          [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
        })
      )
    },
    []
  )

  const handleAdd = useCallback(() => {
    onChange(value => [
      ...value,
      {id: nanoid(), value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue}
    ])
  }, [])

  const handleRemove = useCallback((itemIndex: number) => {
    onChange(value => value.filter((_, index) => index !== itemIndex))
  }, [])

  return (
    <div>
      {label && <label>{label}</label>}
      {value.map((value, index) => (
        <ListItem
          key={value.id}
          index={index}
          value={value}
          onChange={handleItemChange}
          onRemove={handleRemove}>
          {children}
        </ListItem>
      ))}
      <button onClick={handleAdd}>+</button>
    </div>
  )
}
