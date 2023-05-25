const URL = '/unsplash'

const perPage = 40

export const computePageCount = (n: number) => 1 + Math.floor(n / perPage)

export interface UnsplashSearch {
  query: string
  page: number
  perPage: number
}

export type PhotoUrlKeys = 'full' | 'small' | 'thumb'
export type PhotoUrls = Record<PhotoUrlKeys, string>

/** As received from service */
export interface RawUnsplashResult {
  id: string
  description?: string | null
  altDescription?: string | null
  urls: PhotoUrls
}

/** Normalized as received by components */
export interface UnsplashResult {
  id: string
  description: string
  urls: PhotoUrls
}

export interface UnsplashResults {
  total: number
  results: UnsplashResult[]
}

export const emptyResults: UnsplashResults = {
  total: 0,
  results: [],
}

export const initSearch = (query = ''): UnsplashSearch => ({
  page: 0,
  perPage,
  query,
})

export const searchUnsplash = async (
  search: UnsplashSearch,
  controller: AbortController,
): Promise<UnsplashResults> => {
  const response = await fetch(makeUrl(search), { signal: controller.signal })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)

  const results = (await response.json()) as UnsplashResults
  return { ...results, results: normalizeResults(results) }
}

function normalizeResults(results: UnsplashResults) {
  return results.results.map(result => {
    const { altDescription, description, ...rest } = result as RawUnsplashResult

    const computed =
      description !== null && description !== '' && description !== undefined
        ? description
        : altDescription ?? 'Sadly, no description on this image'

    return { ...rest, description: computed }
  })
}

function makeUrl({ page, perPage, query }: UnsplashSearch) {
  const parameters = new URLSearchParams()
  parameters.set('page', page.toString())
  parameters.set('perPage', perPage.toString())
  parameters.set('query', query)
  return URL + '?' + parameters.toString()
}
