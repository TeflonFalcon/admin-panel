import React from 'react'
import { AppBar as MuiAppBar, Stack, Toolbar, Typography } from '@mui/material'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AccountMenu from '@/components/AccountMenu'

const Index = () => {
  return (
    <MuiAppBar position='static'>
      <Toolbar>
        <Stack gap='5px' direction='row' alignItems='center' flexGrow='1'>
          <SportsEsportsIcon fontSize='large' />
          <Typography marginLeft='5px' variant='h6' component='div'>
            Life game
          </Typography>
        </Stack>
        <AccountMenu />
      </Toolbar>
    </MuiAppBar>
  )
}

export default Index
