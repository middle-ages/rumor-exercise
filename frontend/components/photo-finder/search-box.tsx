import React from 'react'
import { UnsplashResults, UnsplashSearch } from './unsplash.js'

const toggleHeightPx = 48

export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export interface SearchBoxProps {
  search: UnsplashSearch
  nextPage: () => void
  previousPage: () => void
  results: UnsplashResults | undefined
  isLoading: boolean
  isFirst: boolean
  isLast: boolean
  currentQuery: string
  setQuery: (query: string) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  currentQuery,
  isFirst,
  isLast,
  isLoading,
  nextPage,
  previousPage,
  results,
  setQuery,
}) => {
  const [value, setValue] = React.useState('')

  const [disableNext, disablePrevious] =
    isLoading ||
    currentQuery === '' ||
    results === undefined ||
    results.results.length === 0
      ? [true, true]
      : [isLast, isFirst]

  const onChange: ChangeHandler = event => {
    const newValue = event.target.value
    if (value === newValue) return
    setValue(newValue) // immediate feedback
    setQuery(newValue) // restart search with new debounced query
  }

  return (
    <div style={{ height: toggleHeightPx, padding: toggleHeightPx / 4 }}>
      <input placeholder="Enter keywords..." {...{ value, onChange }} />
      <button onClick={previousPage} disabled={disablePrevious}>
        Previous
      </button>
      <button onClick={nextPage} disabled={disableNext}>
        Next
      </button>
    </div>
  )
}
