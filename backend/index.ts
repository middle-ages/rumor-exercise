import express from 'express'
import type { Express, Response } from 'express'

const port = 8888

/**
 * # Start Rumor-Exercise Server
 *
 * Serves the following endpoints:
 *
 * 1. `get /serviceX` ⇒ proxy request to X service
 * 1. `get /serviceY` ⇒ proxy request to Y service
 * 1. `get /*` ⇒ static, served from `dist/frontend/*`. The files are built by
 *    Vite, where `outDir=dist/frontend`. Vite uses the folders `frontend/` and
 *    `public/` as source folders, so that after build this endpoint serves
 *    the root `index.html` + the Javascript transpiled from the Typescript in
 *    `frontend/` mixed with any assets in `public/`
 *
 **/
const start = () => {
  const app: Express = express()

  app.use(express.static('dist/frontend'))

  app.get('/hello', (_, response: Response) =>
    response.status(200).send('hello'),
  )

  const server = app.listen(port, () =>
    console.log(`Listening on port ${port}`),
  )

  process.on('SIGINT', () => {
    process.stdout.write('\nGot ctrl-C, closing,')
    server.close(() => console.log(' closed.'))
  })
}

start()
