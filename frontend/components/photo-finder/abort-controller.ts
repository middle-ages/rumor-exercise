import React from 'react'

export const useAbortController = (): [
  AbortController,
  () => AbortController,
] => {
  const [controller, setController] = React.useState(
    () => new AbortController(),
  )

  const reset = () => {
    controller.abort() // will NOP if aborted
    const newController = new AbortController()
    setController(newController)
    return newController
  }

  return [controller, reset]
}
