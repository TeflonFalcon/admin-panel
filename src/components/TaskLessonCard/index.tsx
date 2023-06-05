import React from 'react'
import { Button, Card, Divider, IconButton, Stack, styled, Typography } from '@mui/material'
import { FormikErrors, FormikTouched } from 'formik'
import { ICreateLessonForm, ITask } from '@/types'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import EducationTextField from '../ui/input/EducationTextField'

interface TaskLessonCardProps {
  index: number
  values: ITask[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errors: any
  touched: FormikTouched<ICreateLessonForm>
  handleRemove: () => void
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<ICreateLessonForm>> | Promise<void>
}

const Index: React.FC<TaskLessonCardProps> = ({
  index,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  handleRemove,
  setFieldValue,
}) => {
  return (
    <ActionCard>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4'>Цель</Typography>
        <IconButton onClick={handleRemove}>
          <RemoveCircleOutlineIcon color='error' />
        </IconButton>
      </Stack>
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Сфера</Typography>
        <EducationTextField
          name={`tasks[${index}].area`}
          value={values[index].area}
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
          name={`tasks[${index}].title`}
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
        <Typography flex={1}>Действия</Typography>
        <Stack gap='10px' flex={3}>
          {values[index].actions.map((action, indexAction) => (
            <Stack key={`tasks_action${index}`} direction='row' alignItems='center'>
              <EducationTextField
                name={`tasks[${index}].actions[${indexAction}]`}
                value={values[index].actions[indexAction]}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                size='small'
                placeholder='Действия'
                errors={errors}
                touched={touched}
              />
              <IconButton
                color='error'
                onClick={() =>
                  setFieldValue(
                    `tasks[${index}].actions`,
                    values[index].actions.filter((value, arrayIndex) => arrayIndex !== index),
                  )
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            onClick={() => setFieldValue(`tasks[${index}].actions`, [...values[index].actions, ''])}
          >
            Добавить
          </Button>
        </Stack>
      </Stack>

      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Награды</Typography>
        <Stack gap='10px' flex={3}>
          {values[index].awards.map((action, indexAction) => (
            <Stack key={`tasks_award${index}`} direction='row' alignItems='center'>
              <EducationTextField
                name={`tasks[${index}].awards[${indexAction}]`}
                value={values[index].awards[indexAction]}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                size='small'
                placeholder='Награды'
                errors={errors}
                touched={touched}
              />
              <IconButton
                color='error'
                onClick={() =>
                  setFieldValue(
                    `tasks[${index}].awards`,
                    values[index].awards.filter((value, arrayIndex) => arrayIndex !== index),
                  )
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            onClick={() => setFieldValue(`tasks[${index}].awards`, [...values[index].awards, ''])}
          >
            Добавить
          </Button>
        </Stack>
      </Stack>

      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Дата</Typography>
        <EducationTextField
          type='date'
          name={`tasks[${index}].date`}
          value={values[index].date}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          size='small'
          touched={touched}
          errors={errors}
        />
      </Stack>
      <Divider />
      <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
        <Typography flex={1}>Баллы</Typography>
        <EducationTextField
          type='number'
          name={`tasks[${index}].points`}
          value={values[index].points}
          onChange={handleChange}
          onBlur={handleBlur}
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
