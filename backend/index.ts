/// <reference lib="dom" />

// note the reference lib above: Typescript d.ts does not have Node.js fetch
// types yet so we use the browser types

import express from 'express'
import type { Express, Response, Request } from 'express'
import { URL } from 'node:url'

const port = 8888

const unsplashUrl = 'https://api.unsplash.com/search/photos'

const unsplashToken = process.env['UNSPLASH_API_TOKEN']
if (unsplashToken === undefined)
  throw new Error('Cannot boot because UNSPLASH_API_TOKEN unset')

interface Query {
  query: string
  page: number
  perPage: number
}

/**
 * # Start Rumor-Exercise Server
 *
 * Serves the following endpoints:
 *
 * 1. `GET /unsplash?query=<string>&page=<number>&perPage=<number>` ⇒ proxy
 *     request to the unsplash API. Try this for example:
 *     `curl -v 'localhost:8888/unsplash?page=1&perPage=2&query=cat' | jq`
 *
 * 1. `GET /*` ⇒ static, served from `dist/frontend/*`.
 *    The folder `dist/frontend` is populated with `vite build`
 *    Vite will also copy the `public/` folder there
 *
 **/
const start = () => {
  const app: Express = express()

  app.use(express.static('dist/frontend'))

  app.get('/unsplash', (request: Request, response: Response) => {
    const query: Query = parseQuery(request)
    const url = makeUnsplashUrl(query)

    fetch(url)
      .then((results: globalThis.Response) => results.json())
      .then(json => response.json(json))
      .catch(error => {
        console.error(`Unsplash error: ${(error as Error).toString()}`)
        response.status(500).send()
      })
  })

  const server = app.listen(port, () =>
    console.log(`Listening on port ${port}`),
  )

  process.on('SIGINT', () => {
    process.stdout.write('\nGot ctrl-C, closing,')
    server.close(() => console.log(' closed.'))
  })
}

start()

function parseQuery({
  query: { page = '1', perPage = '10', query = '' },
}: Request): Query {
  return {
    query: forceString(query),
    page: forceNumber(page),
    perPage: forceNumber(perPage),
  }
}

function makeUnsplashUrl({ page, perPage, query }: Query) {
  const url = new URL(unsplashUrl)
  const parameters = url.searchParams
  parameters.set('client_id', unsplashToken ?? '')
  parameters.set('page', page.toString())
  parameters.set('per_page', perPage.toString())
  parameters.set('query', query)
  return url.toString()
}

function forceNumber(s: unknown): number {
  return typeof s === 'string' ? Number.parseInt(s) : 1
}

function forceString(s: unknown): string {
  return typeof s === 'string' ? s : ''
}
