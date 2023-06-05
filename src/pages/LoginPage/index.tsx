import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import PasswordTextField from '@/components/ui/input/PasswordTextField'
import { useFormik } from 'formik'
import LoginSchema from '@/helpers/validators/LoginSchema'
import useAppDispatch from '@/hooks/useAppDispatch'
import { authUser } from '@/store/actions/main'
import { ILoginForm } from '@/types'
import useFetching from '@/hooks/useFetching'

const Index = () => {
  const dispatch = useAppDispatch()

  const [fetchLogin, isLoading] = useFetching(async (data: ILoginForm) => {
    await dispatch(authUser(data))
  })

  const { errors, touched, handleBlur, isValid, handleSubmit, handleChange, values } =
    useFormik<ILoginForm>({
      initialValues: {
        email: '',
        password: '',
        rememberMe: false,
      },
      validateOnBlur: true,
      validationSchema: LoginSchema,
      onSubmit: (data) => fetchLogin(data),
    })

  return (
    <LoginCard>
      <form onSubmit={handleSubmit}>
        <LoginCardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Авторизация
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            name='email'
            placeholder='Email'
            autoComplete='username'
            inputMode='email'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={!!errors.email && touched.email}
            helperText={touched.email && errors?.email}
          />
          <PasswordTextField
            fullWidth
            variant='outlined'
            name='password'
            placeholder='Пароль'
            autoComplete='current-password'
            inputMode='text'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={!!errors.password && touched.password}
            helperText={touched.password && errors?.password}
          />
          <FormGroup>
            <FormControlLabel
              name='rememberMe'
              checked={values.rememberMe}
              onChange={handleChange}
              control={<Checkbox />}
              label='Запомнить меня'
            />
          </FormGroup>
        </LoginCardContent>
        <CardActions>
          <Button
            type='submit'
            disabled={!isValid || isLoading}
            color='error'
            fullWidth
            size='small'
            variant='contained'
          >
            Войти
          </Button>
        </CardActions>
      </form>
    </LoginCard>
  )
}

export default Index

const LoginCard = styled(Card)`
  width: 450px;
`

const LoginCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
