import React, { useEffect } from 'react'
import { useAbortController } from './abort-hook.js'
import { useLoading } from './loading-hook.js'
import type { UnsplashResults, UnsplashSearch } from './unsplash.js'
import { emptyResults, initSearch, searchUnsplash } from './unsplash.js'

export const usePhotoFinderState = (): {
  search: UnsplashSearch
  results: UnsplashResults | undefined
  setQuery: (query: string) => void
} => {
  const { isLoading, results, setDone, setLoading, setNotLoading } =
    useLoading()

  const [isAborted, controller, resetController] = useAbortController()

  const [search, setSearch] = React.useState(() => initSearch())

  const [query, hasResults] = [search.query, results !== undefined]

  const setQuery = (newQuery: string) => {
    if (query === newQuery) return
    resetController()
    setSearch(initSearch(newQuery))
    setNotLoading()
  }

  useEffect(() => {
    if (isLoading || hasResults || search.query === '') return

    const [setAbort, isAbort] = (() => {
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
      } catch (error) {
        // ignore aborts
        if ((error as Error).name !== 'AbortError') throw error
      }

      if (isAbort) controller.abort()
      else setDone(result)
    }

    setLoading()
    void request()

    return setAbort
  }, [
    controller,
    hasResults,
    isAborted,
    isLoading,
    search,
    setDone,
    setLoading,
  ])

  return {
    search,
    results,
    setQuery,
  }
}
