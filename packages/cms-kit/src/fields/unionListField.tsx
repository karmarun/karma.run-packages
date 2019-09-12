import React, {memo, useCallback, useState, Fragment} from 'react'
import nanoid from 'nanoid'

import {isFunctionalUpdate, isValueConstructor} from '@karma.run/react'

import {FieldProps, UnionListValue, UnionListCaseMapForValue, UnionFieldCaseMap} from './types'
import {Icon} from '../atoms/icon'

export interface UnionListItemProps<T extends string = string, V = any> {
  readonly index: number
  readonly value: UnionListValue<T, V>
  readonly onChange: (index: number, value: React.SetStateAction<UnionListValue<T, V>>) => void
  readonly onRemove: (index: number) => void
  readonly children: (props: FieldProps<V>) => JSX.Element
}

function ListItem({index, value, onChange, onRemove, children}: UnionListItemProps) {
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
}

export interface UnionListFieldProps<V extends UnionListValue> extends FieldProps<V[]> {
  readonly label?: string
  readonly children: UnionListCaseMapForValue<V>
}

export function UnionListField<V extends UnionListValue>({
  value: values,
  label,
  children,
  onChange
}: UnionListFieldProps<V>) {
  const [casePickerIndex, setCasePickerIndex] = useState<number | null>(null)
  const unionFieldMap = children as UnionFieldCaseMap

  function handleItemChange(index: number, itemValue: React.SetStateAction<UnionListValue>) {
    onChange(value =>
      Object.assign([], value, {
        [index]: isFunctionalUpdate(itemValue) ? itemValue(value[index]) : itemValue
      })
    )
  }

  function handleAdd(index: number, type: string) {
    onChange(values => {
      const {defaultValue} = unionFieldMap[type]
      const valuesCopy = values.slice()

      valuesCopy.splice(index + 1, 0, {
        id: nanoid(),
        type,
        value: isValueConstructor(defaultValue) ? defaultValue() : defaultValue
      } as V)

      return valuesCopy
    })

    setCasePickerIndex(null)
  }

  function handleRemove(itemIndex: number) {
    onChange(value => value.filter((_, index) => index !== itemIndex))
  }

  function addButtonForIndex(index: number) {
    return (
      <>
        <button
          onClick={() => {
            setCasePickerIndex(index)
          }}>
          +
        </button>
        <div>
          {casePickerIndex === index &&
            Object.entries(unionFieldMap).map(([type, value]) => (
              <button key={type} onClick={() => handleAdd(index, type)}>
                <Icon type={value.icon} />
                {value.label}
              </button>
            ))}
        </div>
      </>
    )
  }

  return (
    <div>
      {label && <label>{label}</label>}
      {values.map((value, index) => (
        <Fragment key={value.id}>
          <ListItem index={index} value={value} onChange={handleItemChange} onRemove={handleRemove}>
            {unionFieldMap[value.type].field}
          </ListItem>
          {addButtonForIndex(index)}
        </Fragment>
      ))}

      {values.length === 0 && addButtonForIndex(values.length - 1)}
    </div>
  )
}
