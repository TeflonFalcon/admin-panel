import React, { useEffect } from 'react'
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import useAppSelector from '@/hooks/useAppSelector'
import { selectUsers } from '@/store/selectors/main'
import useAppDispatch from '@/hooks/useAppDispatch'
import { getUsers } from '@/store/actions/main'

const Index = () => {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <Stack gap='20px' maxWidth='60%'>
      <Typography variant='h4'>Push</Typography>
      <TextField label='Выберите тип' select defaultValue=''>
        <MenuItem value='' disabled>
          Выберите тип
        </MenuItem>
        <MenuItem value='system'>Системное уведомление</MenuItem>
      </TextField>

      <Autocomplete
        multiple
        id='tags-outlined'
        options={users}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label='Выберите кому отправить'
            placeholder='Выберите кому отправить'
          />
        )}
      />

      <FormControlLabel control={<Checkbox />} label={'Отправить всем пользователям'} />

      <TextField placeholder='Введите текст' label='Тема' />

      <TextField multiline rows={10} placeholder='Введите текст' label='Описание' />

      <Stack direction='row' gap='10px' justifyContent='space-between'>
        <Button fullWidth variant='outlined' color='error'>
          Вернуться назад
        </Button>
        <Button fullWidth variant='contained' color='success'>
          Отправить
        </Button>
      </Stack>
    </Stack>
  )
}

export default Index
