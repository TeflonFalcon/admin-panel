import { useEffect, useState } from 'react'

const useDebounce = (value: string | number, timeout = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value)
    }, timeout)
    return () => {
      clearTimeout(timerId)
    }
  }, [timeout, value])
  return debounceValue
}

export default useDebounce
