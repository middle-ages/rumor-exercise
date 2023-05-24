import React from 'react'

export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export interface SearchBoxProps {
  setCurrentQuery: (currentQuery: string) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ setCurrentQuery }) => {
  const [value, setValue] = React.useState('')

  const onChange: ChangeHandler = event => {
    const value = event.target.value
    setValue(value) // immediate feedback
    setCurrentQuery(value) // restart search with new query, possibly debounced
  }

  return (
    <div>
      <div>shown(SearchBox)={value}</div>
      <input placeholder="Enter keywords..." {...{ value, onChange }} />
    </div>
  )
}
