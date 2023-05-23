/** Rumor Exercise Application **/

import React from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.querySelector('#root')
if (!rootElement) throw new Error('No root element.')

createRoot(rootElement).render(
  <React.StrictMode>
    <h1>hello</h1>
  </React.StrictMode>,
)
