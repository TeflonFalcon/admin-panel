import React from 'react'
import { Button, Card, CardActions, CardContent, styled, Typography } from '@mui/material'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <DeniedCard>
      <DeniedCardContent>
        <CancelRoundedIcon color='error' fontSize='large' />
        <Typography variant='h5' component='div' textAlign='center'>
          Вход в личный кабинет не выполнен!
        </Typography>
        <Typography variant='body1' component='div'>
          Произошла ошибка входа
        </Typography>
      </DeniedCardContent>
      <CardActions>
        <Button
          color='error'
          fullWidth
          size='small'
          variant='contained'
          onClick={() => navigate('/')}
        >
          На страницу авторизации
        </Button>
      </CardActions>
    </DeniedCard>
  )
}

export default Index

const DeniedCard = styled(Card)`
  width: 450px;
  padding: 10px;
`

const DeniedCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
