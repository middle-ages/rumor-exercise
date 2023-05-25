import React from 'react'
import { SearchBox } from './photo-finder/search-box.js'
import { ResultBox } from './photo-finder/result-box.js'
import { usePhotoFinder } from './photo-finder/search-hook.js'

const Spacer = () => <div style={{ flex: 1 }} />

export const PhotoFinder: React.FC = () => {
  const { currentQuery, error, isLoading, page, results, setQuery } =
    usePhotoFinder()

  const [isFirst, isLast] =
    results === undefined
      ? [true, true]
      : [page === 0, results.totalPages - 1 === page]

  return (
    <div>
      <SearchBox
        {...{ results, setQuery, currentQuery, isLoading, isFirst, isLast }}
      />
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
  )
}
