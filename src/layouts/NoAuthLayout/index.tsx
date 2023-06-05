import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import AuthProvider from '@/components/AuthProvider'

const Index = () => {
  return (
    <AuthProvider requestAuth={false}>
      <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
        <Outlet />
      </Stack>
    </AuthProvider>
  )
}

export default Index
