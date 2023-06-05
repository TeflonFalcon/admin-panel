import React from 'react'
import { ENUM_COMPLAINT_STATUS, ICreateComplaintForm } from '@/types'
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import useAppSelector from '@/hooks/useAppSelector'
import { selectUser } from '@/store/selectors/main'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import useFetching from '@/hooks/useFetching'
import useAppDispatch from '@/hooks/useAppDispatch'
import { createComplaint } from '@/store/actions/main'
import { nanoid } from 'nanoid'
import CreateComplaintSchema from '@/helpers/validators/CreateComplaintSchema'

const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  const [fetchComplaint, isLoading] = useFetching(async (data: ICreateComplaintForm) => {
    await dispatch(createComplaint(data))
    navigate(-1)
  })

  const { errors, values, handleChange, handleBlur, touched, handleSubmit, isValid } =
    useFormik<ICreateComplaintForm>({
      initialValues: {
        id: nanoid(),
        description: '',
        name: user?.name || '',
        subject: '',
        status: ENUM_COMPLAINT_STATUS.new,
        createdAt: dayjs().format(),
        answer: null,
      },
      validationSchema: CreateComplaintSchema,
      onSubmit: (values) => fetchComplaint(values),
    })
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap='20px' maxWidth='50%'>
        <Stack gap='5px'>
          <Typography variant='body2'>Заголовок жалобы</Typography>
          <TextField
            name='subject'
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subject && !!errors.subject}
            helperText={touched.subject && errors?.subject}
            fullWidth
          />
        </Stack>

        <Stack gap='5px'>
          <Typography variant='body2'>Описание</Typography>
          <TextField
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors?.description}
            fullWidth
            placeholder='Введите текст'
            color='success'
            multiline
            rows={10}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between' gap='10px'>
          <Button onClick={() => navigate(-1)} fullWidth variant='outlined' color='error'>
            Вернуться назад
          </Button>
          <Button
            disabled={isLoading || !isValid}
            type='submit'
            fullWidth
            variant='contained'
            color='success'
          >
            {isLoading ? <CircularProgress size={10} /> : 'Отправить'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default Index
