import React from 'react'
import { SearchBox } from './photo-finder/search-box.js'
import type { PhotoFinderStateEffect } from './photo-finder/state.js'
import { usePhotoFinderState } from './photo-finder/use-state.js'
//import { useDebounce } from 'react-use'

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
