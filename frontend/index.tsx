/** Rumor Exercise Application **/

import React from 'react'
import { createRoot } from 'react-dom/client'
import { PhotoFinder } from './components/photo-finder.js'

const rootElement = document.querySelector('#root')
if (!rootElement) throw new Error('No root element.')

createRoot(rootElement).render(
  <React.StrictMode>
    <div
      style={{
        background: 'var(--page-bg)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <PhotoFinder />
    </div>
  </React.StrictMode>,
)
