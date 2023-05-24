import React, { useEffect } from 'react'
import { SearchBox } from './photo-finder/search-box.js'
import { done, init, working } from './photo-finder/state.js'
import type { PhotoFinderStateEffect } from './photo-finder/state.js'
import { searchUnsplash } from './photo-finder/unsplash.js'
import { useAbortController } from './photo-finder/abort-controller.js'
//import { useDebounce } from 'react-use'

const usePhotoFinderState = (): PhotoFinderStateEffect => {
  const [state, effect] = React.useState(init)

  const [controller, resetController] = useAbortController()

  //  const foo = useDebounce()

  useEffect(() => {
    const { currentQuery: query, phase } = state
    if (query === '' || phase !== 'init') return

    const newController = resetController()

    const { page, perPage } = state

    const search = async () => {
      effect(working(state))

      const result = await searchUnsplash(
        { query, page, perPage },
        newController,
      )

      effect(done(state, result.results))
    }

    void search()

    // return () => newController.abort()
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

export const PhotoFinder: React.FC = () => {
  const {
    setCurrentQuery,
    state: {
      currentQuery,
      results: { length },
    },
  }: PhotoFinderStateEffect = usePhotoFinderState()

  return (
    <div>
      <div>currentQuery(PhotoFinder)={currentQuery}</div>
      <div>currentResultCount(PhotoFinder)={length}</div>
      <div>
        <SearchBox {...{ currentQuery, setCurrentQuery }} />
      </div>
    </div>
  )
}
