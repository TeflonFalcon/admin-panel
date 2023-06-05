import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { ENUM_COMPLAINT_STATUS, IComplaint } from '@/types'
import useFetching from '@/hooks/useFetching'
import { answerComplaint, changeComplaintStatus } from '@/store/actions/main'
import useAppDispatch from '@/hooks/useAppDispatch'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import useAppSelector from '@/hooks/useAppSelector'
import { selectUser } from '@/store/selectors/main'
import { useFormik } from 'formik'
import AnswerComplaintSchema from '@/helpers/validators/AnswerComplaintSchema'

interface DetailComplaintProps {
  complaint: IComplaint
}

const Index: React.FC<DetailComplaintProps> = ({ complaint }) => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [fetchDecline] = useFetching(async () => {
    const response = await dispatch(
      changeComplaintStatus({ id: complaint.id, status: ENUM_COMPLAINT_STATUS.rejected }),
    )
    if (response.payload) {
      navigate(-1)
      alert('Жалоба успешно отклонена!')
    } else {
      alert('Не удалось отклонить жалобу!')
    }
  })

  const [fetchAnswer, isLoading] = useFetching(async (id: string, text: string) => {
    await dispatch(
      answerComplaint({
        id,
        answer: {
          name: user?.name || '',
          text,
          createdAt: dayjs().format(),
        },
      }),
    )
    navigate(-1)
  })

  const { isValid, values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: AnswerComplaintSchema,
    onSubmit: ({ text }) => fetchAnswer(complaint.id, text),
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap='20px'>
        <TextField value={complaint.name} sx={{ width: '300px' }} contentEditable={false} />
        <Stack gap='10px'>
          <Typography variant='body2'>Описание</Typography>
          <TextField
            placeholder='Введите текст'
            color='success'
            fullWidth
            multiline
            rows={10}
            value={complaint.description}
            contentEditable={false}
          />
        </Stack>

        {/* Если требует ответа */}
        {[ENUM_COMPLAINT_STATUS.new, ENUM_COMPLAINT_STATUS.progress].includes(complaint.status) && (
          <React.Fragment>
            <Stack gap='10px'>
              <Typography variant='body2'>Ответ</Typography>
              <TextField
                name='text'
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.text && !!errors.text}
                helperText={touched.text && errors?.text}
                placeholder='Введите текст'
                color='success'
                fullWidth
                multiline
                rows={10}
              />
            </Stack>

            <Stack direction='row' justifyContent='space-between' gap='10px'>
              <Button
                disabled={isLoading || !isValid}
                type='submit'
                fullWidth
                variant='contained'
                color='error'
              >
                Ответить
              </Button>
              <Button onClick={fetchDecline} fullWidth variant='outlined' color='error'>
                Отклонить
              </Button>
            </Stack>
          </React.Fragment>
        )}

        {/* Если уже есть ответ */}
        {![ENUM_COMPLAINT_STATUS.new, ENUM_COMPLAINT_STATUS.progress].includes(
          complaint.status,
        ) && (
          <React.Fragment>
            <Stack gap='10px'>
              <Typography variant='body2'>
                Ответил {complaint.answer?.name}. Дата ответа:{' '}
                {dayjs(complaint.answer?.createdAt).format('DD/MM/YYYY, hh:mm:ss')}
              </Typography>
              <TextField
                color='success'
                fullWidth
                multiline
                rows={10}
                value={complaint.answer?.text}
                contentEditable={false}
              />
            </Stack>
            <Button onClick={() => navigate(-1)} fullWidth variant='outlined' color='error'>
              Назад
            </Button>
          </React.Fragment>
        )}
      </Stack>
    </form>
  )
}

export default Index
