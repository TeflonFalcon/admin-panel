import React from 'react'
import { Card, Divider, IconButton, Stack, styled, Typography } from '@mui/material'
import { FormikTouched } from 'formik'
import { IAction, ICreateLessonForm } from '@/types'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import EducationTextField from '../ui/input/EducationTextField'

interface ActionsLessonCardProps {
  index: number
  values: IAction[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errors: any
  touched: FormikTouched<ICreateLessonForm>
  handleRemove: () => void
}

const Index: React.FC<ActionsLessonCardProps> = ({
  index,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  handleRemove,
}) => {
  return (
    <ActionCard>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4'>Действие</Typography>
        <IconButton onClick={handleRemove}>
          <RemoveCircleOutlineIcon color='error' />
        </IconButton>
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Цель</Typography>
        <EducationTextField
          name={`actions[${index}].task`}
          value={values[index].task}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          size='small'
          placeholder='Цель'
          touched={touched}
          errors={errors}
        />
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Название</Typography>
        <EducationTextField
          name={`actions[${index}].title`}
          value={values[index].title}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          size='small'
          placeholder='Название'
          touched={touched}
          errors={errors}
        />
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Дата</Typography>
        <EducationTextField
          name={`actions[${index}].date`}
          value={values[index].date}
          onChange={handleChange}
          onBlur={handleBlur}
          type='date'
          fullWidth
          size='small'
          placeholder='Дата'
          touched={touched}
          errors={errors}
        />
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Время</Typography>
        <EducationTextField
          name={`actions[${index}].time`}
          value={values[index].time}
          onChange={handleChange}
          onBlur={handleBlur}
          type='time'
          fullWidth
          size='small'
          placeholder='Время'
          touched={touched}
          errors={errors}
        />
      </Stack>
      <Divider />
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Количество баллов</Typography>
        <EducationTextField
          name={`actions[${index}].points`}
          value={values[index].points}
          onChange={handleChange}
          onBlur={handleBlur}
          type='number'
          fullWidth
          size='small'
          placeholder='Баллы'
          touched={touched}
          errors={errors}
        />
      </Stack>
    </ActionCard>
  )
}

export default Index

const ActionCard = styled(Card)`
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`
