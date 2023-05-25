import React from 'react'
import type { UnsplashResults, UnsplashSearch } from './unsplash.js'
import { initSearch } from './unsplash.js'
import { emptyResults } from './unsplash.js'

export interface LoadingHook {
  doNotQuery: boolean
  search: UnsplashSearch
  error: Error | undefined
  isLoading: boolean
  results: UnsplashResults | undefined
  setLoading: () => void
  setDone: (results: UnsplashResults) => void
  setNotLoading: (search: UnsplashSearch) => void
  setError: (error: Error) => void
}

export const useLoading = (): LoadingHook => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | undefined>()
  const [search, setSearch] = React.useState(() => initSearch())

  // undefined means we are init or loading, empty means no results
  const [results, setResults] = React.useState<UnsplashResults | undefined>()
  const none = undefined

  const setLoading = () => {
    setError(none)
    setIsLoading(true)
    setResults(emptyResults)
  }

  const setDone = (results: UnsplashResults) => {
    setIsLoading(false)
    setResults(results)
  }

  const setNotLoading = (search: UnsplashSearch) => {
    setIsLoading(false)
    setResults(none)
    setSearch(search)
  }

  return {
    doNotQuery: isLoading || results !== undefined || search.query === '',
    search,
    error,
    isLoading,
    results,
    setLoading,
    setDone,
    setNotLoading,
    setError,
  }
}
