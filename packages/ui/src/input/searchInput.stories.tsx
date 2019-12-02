import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {SearchInput} from './searchInput'
import {useState} from '@storybook/addons'

export default {
  component: SearchInput,
  title: 'Input|SearchBar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => {
  const [searchVal, setSearchVal] = useState('')

  return (
    <SearchInput
      filterOptions={[{id: '1', name: 'filter'}]}
      searchValue={searchVal}
      onFilterSelected={() => {}}
      onTextInput={value => {
        setSearchVal(value)
      }}
      onClear={() => {
        setSearchVal('')
      }}></SearchInput>
  )
}
