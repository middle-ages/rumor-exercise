import React from 'react'
import type { UnsplashResults } from './unsplash.js'

// unsplash “thumb” width is 200px: https://unsplash.com/documentation#example-image-use
const thumbWidthPx = 200

export const ResultBox: React.FC<UnsplashResults> = ({ results }) => {
  return (
    <div>
      {results.map(result => (
        <img
          style={{ width: thumbWidthPx }}
          key={result.id}
          title={result.description}
          src={result.urls.thumb}
        />
      ))}
    </div>
  )
}
