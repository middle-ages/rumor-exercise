/** Rumor Exercise Application **/

import React from 'react'
import { createRoot } from 'react-dom/client'
import { PhotoFinder } from './components/photo-finder.js'

const rootElement = document.querySelector('#root')
if (!rootElement) throw new Error('No root element.')

createRoot(rootElement).render(
  <React.StrictMode>
    <PhotoFinder />
  </React.StrictMode>,
)
