import React from 'react'

export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export interface SearchBoxProps {
  setQuery: (query: string) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ setQuery }) => {
  const [value, setValue] = React.useState('')

  const onChange: ChangeHandler = event => {
    const newValue = event.target.value
    if (value === newValue) return
    setValue(newValue) // immediate feedback
    setQuery(newValue) // restart search with new query, possibly debounced
  }

  return (
    <div>
      <div>shown(SearchBox)={value}</div>
      <input placeholder="Enter keywords..." {...{ value, onChange }} />
    </div>
  )
}
