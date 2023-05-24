import express from 'express'
import type { Express, Response, Request } from 'express'

const port = 8888

const unsplashToken = process.env['UNSPLASH_API_TOKEN']
if (unsplashToken === undefined)
  throw new Error('Cannot boot because UNSPLASH_API_TOKEN unset')

interface Query {
  find: string
  page: number
  perPage: number
}

/**
 * # Start Rumor-Exercise Server
 *
 * Serves the following endpoints:
 *
 * 1. `GET /unsplash?find=<string>&page=<number>&perPage=<number>` ⇒ proxy
 *     request to the unsplash API
 * 1. `GET /*` ⇒ static, served from `dist/frontend/*`.
 *     The files are built by Vite, where `outDir` is configured to be
 *     `dist/frontend`. Vite will copy the `public/` folder here as well
 *
 **/
const start = () => {
  const app: Express = express()

  app.use(express.static('dist/frontend'))

  app.get('/unsplash', (request: Request, response: Response) => {
    const query: Query = parseQuery(request)
    console.log(query)
    response.status(200).send('hello')
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
  query: { find = '', page = '1', perPage = '10' },
}: Request): Query {
  return {
    find: forceString(find),
    page: forceNumber(page),
    perPage: forceNumber(perPage),
  }
}

function forceNumber(s: unknown): number {
  return typeof s === 'string' ? Number.parseInt(s) : 1
}

function forceString(s: unknown): string {
  return typeof s === 'string' ? s : ''
}
