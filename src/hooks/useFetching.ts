import { useState } from 'react'

type TypeFetching = [(...args: any[]) => void, boolean, string]

function useFetching(callback: (...args: any[]) => void): TypeFetching {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true)
      await callback(...args)
    } catch (e) {
      setError('Error')
    } finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, error]
}

export default useFetching
