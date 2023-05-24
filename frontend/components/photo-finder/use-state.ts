import React, { useEffect } from 'react'
import { useAbortController } from './abort-controller.js'
import type { PhotoFinderStateEffect } from './state.js'
import { done, init, working } from './state.js'
import { UnsplashResults, emptyResults, searchUnsplash } from './unsplash.js'
//import { useDebounce } from 'react-use'

export const usePhotoFinderState = (): PhotoFinderStateEffect => {
  const [state, effect] = React.useState(init)

  const [controller, resetController] = useAbortController()

  //  const foo = useDebounce()

  useEffect(() => {
    const { currentQuery: query, phase } = state
    if (query === '' || phase !== 'init') return

    const { page, perPage } = state

    const search = async () => {
      effect(working(state))

      const controller = resetController()

      let result: UnsplashResults = emptyResults
      try {
        result = await searchUnsplash({ query, page, perPage }, controller)
      } catch (error) {
        if (!controller.signal.aborted) throw error // ignore aborts
      }

      effect(done(state, result.results))
    }

    void search()

    return () => {
      if (!controller.signal.aborted) controller.abort()
    }
  }, [state, controller, resetController])

  return {
    state,
    effect,
    setCurrentQuery: (newQuery: string) => {
      controller.abort()
      effect(init(newQuery))
    },
  }
}
