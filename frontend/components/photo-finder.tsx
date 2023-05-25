import React from 'react'
import { ResultBox } from './photo-finder/result-box.js'
import { SearchBox } from './photo-finder/search-box.js'
import { usePhotoFinder } from './photo-finder/search-hook.js'
import { computePageCount } from './photo-finder/unsplash.js'

const Spacer = () => <div style={{ flex: 1 }} />

const Status = ({ label }: { label: string }) => (
  <div style={{ paddingLeft: '2ch' }}>{label}</div>
)

export const PhotoFinder: React.FC = () => {
  const { error, isLoading, page, results, ...rest } = usePhotoFinder()

  const pageCount =
      results?.total === undefined ? 0 : computePageCount(results.total),
    [isFirst, isLast] =
      results === undefined
        ? [true, true]
        : [page === 0, pageCount === page + 1]

  return (
    <div>
      <SearchBox {...{ isLoading, results, isFirst, isLast, ...rest }} />
      {error === undefined ? (
        isLoading ? (
          <Status label="Searching..." />
        ) : results === undefined ? (
          <Status label="Ready." />
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
