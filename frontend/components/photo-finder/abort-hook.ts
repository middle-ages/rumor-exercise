import React from 'react'

export const useAbortController = (): [
  boolean,
  AbortController,
  () => AbortController,
] => {
  const [controller, setController] = React.useState(
    () => new AbortController(),
  )

  const reset = () => {
    controller.abort()
    const newController = new AbortController()
    setController(newController)
    return newController
  }

  return [controller.signal.aborted, controller, reset]
}
