import { UnsplashResult } from './unsplash.js'

/**
 * There are _three_ possible PhotoFinder states:
 *
 * 1. `init` - no search sent, no results received
 * 2. `working` - search is running
 * 3. `done` - results received
 */
type Phase = 'init' | 'working' | 'done'

export type PhotoFinderEffect = React.Dispatch<
  React.SetStateAction<PhotoFinderState>
>

export interface PhotoFinderState {
  currentQuery: string
  phase: Phase
  page: number
  perPage: number
  results: UnsplashResult[]
}

export interface PhotoFinderStateEffect {
  state: PhotoFinderState
  effect: PhotoFinderEffect
  setCurrentQuery: (query: string) => void
}

export const init = (currentQuery = ''): PhotoFinderState => ({
  page: 1,
  perPage: 3,
  currentQuery,
  phase: 'init',
  results: [],
})

export const working = (state: PhotoFinderState): PhotoFinderState => ({
  ...state,
  phase: 'working',
})

export const done = (
  state: PhotoFinderState,
  results: UnsplashResult[],
): PhotoFinderState => ({
  ...state,
  phase: 'done',
  results,
})
