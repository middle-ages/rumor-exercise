import React, { useEffect } from 'react'
import { useAbortController } from './abort-hook.js'
import { useLoading } from './loading-hook.js'
import type { UnsplashResults, UnsplashSearch } from './unsplash.js'
import { emptyResults, initSearch, searchUnsplash } from './unsplash.js'

export const usePhotoFinder = (): {
  isLoading: boolean
  search: UnsplashSearch
  results: UnsplashResults | undefined
  setQuery: (query: string) => void
  error: Error | undefined
} => {
  const {
    error,
    isLoading,
    results,
    setDone,
    setError,
    setLoading,
    setNotLoading,
  } = useLoading()

  const [controller, resetController] = useAbortController()

  const [search, setSearch] = React.useState(() => initSearch())

  const doNotQuery = isLoading || results !== undefined || search.query === ''

  const setQuery = (newQuery: string) => {
    if (search.query === newQuery) return
    // every new query aborts the running query
    resetController()
    setSearch(initSearch(newQuery))
    setNotLoading()
  }

  useEffect(() => {
    if (doNotQuery) return

    const [setAbort, isAbort] = (() => {
      // Trick is taken from https://react.dev/reference/react/useEffect#fetching-data-with-effects
      let abort = false
      return [
        () => {
          abort = true
        },
        abort,
      ]
    })()

    const request = async () => {
      let result: UnsplashResults = emptyResults
      try {
        result = await searchUnsplash(search, controller)
      } catch (rawError) {
        const error = rawError as Error
        // ignore aborts
        if (error.name !== 'AbortError') setError(error)
      }

      if (isAbort) controller.abort()
      else setDone(result)
    }

    setLoading()
    void request()

    return setAbort
  }, [controller, doNotQuery, search, setDone, setError, setLoading])

  return {
    isLoading,
    search,
    results,
    setQuery,
    error,
  }
}
