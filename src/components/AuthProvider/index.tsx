import React, { useEffect } from 'react'
import useAppSelector from '@/hooks/useAppSelector'
import { selectUser } from '@/store/selectors/main'
import { Navigate } from 'react-router-dom'
import useAppDispatch from '@/hooks/useAppDispatch'
import { getUser } from '@/store/actions/main'

interface AuthProviderProps extends React.PropsWithChildren {
  requestAuth?: boolean
}

const Index: React.FC<AuthProviderProps> = ({ requestAuth = true, children }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const userId = localStorage.getItem('user')
  useEffect(() => {
    const getAsyncUser = async (id: string) => {
      await dispatch(getUser(id))
    }

    if (userId && !user) getAsyncUser(userId)
  }, [])

  if (!!userId !== requestAuth) {
    return <Navigate to={!requestAuth ? '/complaints' : '/denied'} />
  }
  return <>{children}</>
}

export default Index
