import React from 'react'
import { SearchBox } from './photo-finder/search-box.js'
import { usePhotoFinderState } from './photo-finder/state-hook.js'
//import { useDebounce } from 'react-use'

export const PhotoFinder: React.FC = () => {
  const {
    results,
    search: { query },
    setQuery,
  } = usePhotoFinderState()

  return (
    <div>
      <div>query(PhotoFinder)={query}</div>
      <div>total(PhotoFinder)={results?.total ?? 'NONE'}</div>
      <div>got(PhotoFinder)={results?.results.length ?? 'NONE'}</div>
      <div>
        <SearchBox {...{ setQuery }} />
      </div>
    </div>
  )
}
