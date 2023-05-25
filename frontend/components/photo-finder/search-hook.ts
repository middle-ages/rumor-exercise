import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useAbortController } from './abort-hook.js'
import { useLoading } from './loading-hook.js'
import type { UnsplashResults, UnsplashSearch } from './unsplash.js'
import { emptyResults, initSearch, searchUnsplash } from './unsplash.js'

const debounceMilliseconds = 800

export const usePhotoFinder = (): {
  search: UnsplashSearch
  page: number
  error: Error | undefined
  isLoading: boolean
  results: UnsplashResults | undefined
  currentQuery: string
  setQuery: (query: string) => void
  nextPage: () => void
  previousPage: () => void
} => {
  const {
    doNotQuery,
    error,
    isLoading,
    results,
    search,
    setDone,
    setError,
    setLoading,
    setNotLoading,
  } = useLoading()

  const [controller, resetController] = useAbortController()

  const setQuery = useDebouncedCallback((newQuery: string) => {
    if (search.query === newQuery) return
    resetController() // new query ⇒ abort existing
    setNotLoading(initSearch(newQuery))
  }, debounceMilliseconds)

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

    setQuery.cancel() // cancel running debounces
    setLoading()
    void request()
    return setAbort
  }, [controller, doNotQuery, search, setDone, setError, setLoading, setQuery])

  return {
    search,
    page: search.page,
    error,
    isLoading,
    results,
    setQuery,
    currentQuery: search.query,
    previousPage: () => setNotLoading({ ...search, page: search.page - 1 }),
    nextPage: () => setNotLoading({ ...search, page: search.page + 1 }),
  }
}
