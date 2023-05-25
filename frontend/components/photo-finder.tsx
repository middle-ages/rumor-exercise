import React from 'react'
import { SearchBox } from './photo-finder/search-box.js'
import { ResultBox } from './photo-finder/result-box.js'
import { usePhotoFinder } from './photo-finder/search-hook.js'
//import { useDebounce } from 'react-use'

const Spacer = () => <div style={{ flex: 1 }} />

export const PhotoFinder: React.FC = () => {
  const {
    error,
    isLoading,
    results,
    search: { query },
    setQuery,
  } = usePhotoFinder()

  return (
    <div>
      <div>query(PhotoFinder)={query}</div>
      <div>total(PhotoFinder)={results?.total ?? 'NONE'}</div>
      <div>got(PhotoFinder)={results?.results.length ?? 'NONE'}</div>
      <div>
        <SearchBox {...{ setQuery }} />
        {error === undefined ? (
          isLoading ? (
            'Searching...'
          ) : results === undefined ? (
            'Ready.'
          ) : (
            <ResultBox {...results} />
          )
        ) : (
          <div style={{ display: 'flex' }}>
            <fieldset>
              <legend>SEARCH ERROR</legend>
              <div>{error.toString()}</div>
            </fieldset>
            <Spacer />
          </div>
        )}
      </div>
    </div>
  )
}
