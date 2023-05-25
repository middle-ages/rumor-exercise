import React from 'react'
import type { UnsplashResults } from './unsplash.js'
import { emptyResults } from './unsplash.js'

export interface LoadingHook {
  error: Error | undefined
  isLoading: boolean
  results: UnsplashResults | undefined
  setLoading: () => void
  setDone: (results: UnsplashResults) => void
  setNotLoading: () => void
  setError: (error: Error) => void
}

export const useLoading = (): LoadingHook => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | undefined>()

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

  const setNotLoading = () => {
    setIsLoading(false)
    setResults(none)
  }

  return {
    error,
    isLoading,
    results,
    setLoading,
    setDone,
    setNotLoading,
    setError,
  }
}
