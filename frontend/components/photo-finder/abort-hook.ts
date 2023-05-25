import React from 'react'

export const useAbortController = (): [
  AbortController,
  () => AbortController,
] => {
  const [controller, setController] = React.useState(
    () => new AbortController(),
  )

  // abort and setup a new controller
  const reset = () => {
    controller.abort()
    const newController = new AbortController()
    setController(newController)
    return newController
  }

  return [controller, reset]
}
