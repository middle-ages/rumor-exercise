import { camelCaseKey } from '../../util.js'

const URL = 'https://api.unsplash.com/search/photos'

const clientId = getClientId()

export interface UnsplashSearch {
  query: string
  page: number
  perPage: number
}

export type PhotoUrlKeys = 'full' | 'small' | 'thumb'
export type PhotoUrls = Record<PhotoUrlKeys, string>

export interface UnsplashResult {
  id: string
  altDescription: string
  urls: PhotoUrls
}

export interface UnsplashResults {
  total: number
  results: UnsplashResult[]
}

export const searchUnsplash = async (
  search: UnsplashSearch,
  controller: AbortController,
): Promise<UnsplashResults> => {
  const response = await fetch(makeUrl(search), { signal: controller.signal })
  const json = (await response.json()) as UnsplashResults
  return {
    ...json,
    results: json.results.map(camelCaseKey('altDescription')),
  }
}

function makeUrl({ page, perPage, query }: UnsplashSearch) {
  const parameters = new URLSearchParams()
  parameters.set('client_id', clientId)
  parameters.set('page', page.toString())
  parameters.set('per_page', perPage.toString())
  parameters.set('query', query)
  return URL + '?' + parameters.toString()
}

function getClientId(): string {
  //  const clientId = import.meta.env.UNSPLASH_API_TOKEN
  //  if (clientId === undefined)
  //    throw new Error('Cannot boot because UNSPLASH_API_TOKEN unset')
  //  return clientId
  return 'ta4Zr4lFqAurRiOxAtPEvcYPVlvkjpSGXQ29O9zqipk'
}