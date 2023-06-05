import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import NavigationMenu from '@/components/NavigationMenu'
import AppBar from '@/components/AppBar'
import AuthProvider from '@/components/AuthProvider'

const Index = () => {
  return (
    <AuthProvider requestAuth={true}>
      <Stack width='100%' height='100%'>
        <AppBar />
        <Stack direction='row' height='100%'>
          <NavigationMenu />
          <Stack padding='20px' flex={1}>
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    </AuthProvider>
  )
}

export default Index
