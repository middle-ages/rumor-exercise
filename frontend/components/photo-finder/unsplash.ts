const URL = '/unsplash'

const perPage = 30

export interface UnsplashSearch {
  query: string
  page: number
  perPage: number
}

export type PhotoUrlKeys = 'full' | 'small' | 'thumb'
export type PhotoUrls = Record<PhotoUrlKeys, string>

export interface RawUnsplashResult {
  id: string
  description?: string
  altDescription?: string
  urls: PhotoUrls
}

export interface UnsplashResult {
  id: string
  description: string
  urls: PhotoUrls
}

export interface UnsplashResults {
  total: number
  totalPages: number
  results: UnsplashResult[]
}

export const emptyResults: UnsplashResults = {
  total: 0,
  totalPages: 0,
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
  const json = (await response.json()) as UnsplashResults

  // normalize result descriptions
  const results = json.results.map(result => {
    const { altDescription, description, ...rest } = result as RawUnsplashResult
    return {
      ...rest,
      description:
        description !== undefined && description !== ''
          ? description
          : altDescription ?? 'No description',
    }
  })

  return { ...json, results }
}

function makeUrl({ page, perPage, query }: UnsplashSearch) {
  const parameters = new URLSearchParams()
  parameters.set('page', page.toString())
  parameters.set('perPage', perPage.toString())
  parameters.set('query', query)
  return URL + '?' + parameters.toString()
}
