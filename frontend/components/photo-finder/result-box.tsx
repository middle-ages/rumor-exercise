import React from 'react'
import type { UnsplashResults } from './unsplash.js'

export const ResultBox: React.FC<UnsplashResults> = ({ results }) => {
  return (
    <div>
      {results.map(result => (
        <div style={{ display: 'flex' }} key={result.id}>
          <div>{result.description}</div>
          <img src={result.urls.small} />
        </div>
      ))}
    </div>
  )
}
