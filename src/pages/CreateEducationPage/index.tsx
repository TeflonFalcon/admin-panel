import React from 'react'
import { ICreateComplaintForm, ICreateLessonForm } from '@/types'
import { Button, Card, IconButton, Stack, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import useFetching from '@/hooks/useFetching'
import useAppDispatch from '@/hooks/useAppDispatch'
import { createComplaint } from '@/store/actions/main'
import CreateLessonSchema from '@/helpers/validators/CreateLessonSchema'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ActionLessonCard from '@/components/ActionLessonCard'
import { nanoid } from 'nanoid'
import TaskLessonCard from '@/components/TaskLessonCard'
import EducationTextField from '@/components/ui/input/EducationTextField'
import ButtonMenu, { IItemButtonMenu } from '@/components/ui/button/ButtonMenu'

const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [fetchComplaint] = useFetching(async (data: ICreateComplaintForm) => {
    await dispatch(createComplaint(data))
    navigate(-1)
  })

  const {
    setFieldValue,
    errors,
    values,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    isValid,
  } = useFormik<ICreateLessonForm>({
    initialValues: {
      title: '',
      url: '',
      description: '',
      edges: [''],
      tasks: [],
      actions: [],
    },
    validationSchema: CreateLessonSchema,
    onSubmit: (values) => fetchComplaint(values),
  })

  const items: IItemButtonMenu[] = [
    {
      label: 'Добавить действие',
      onClick: () => {
        setFieldValue('actions', [
          ...values.actions,
          { task: '', title: '', id: nanoid(), lessonId: 'id', points: 0 },
        ])
      },
    },
    {
      label: 'Добавить цель',
      onClick: () => {
        setFieldValue('tasks', [
          ...values.tasks,
          {
            description: '',
            title: '',
            id: nanoid(),
            lessonId: 'id',
            points: 0,
            url: '',
            actions: [''],
            awards: [''],
          },
        ])
      },
    },
  ]

  const handleRemoveAction = (removeId: string) => {
    setFieldValue(
      'actions',
      values.actions.filter((action) => action.id !== removeId),
    )
  }

  const handleRemoveTask = (removeId: string) => {
    setFieldValue(
      'tasks',
      values.tasks.filter((task) => task.id !== removeId),
    )
  }

  return (
    <EducationForm onSubmit={handleSubmit}>
      <EducationCard>
        <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
          <Typography flex={1}>Название</Typography>
          <EducationTextField
            name='title'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            size='small'
            placeholder='Название'
            errors={errors}
            touched={touched}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
          <Typography flex={1}>Описание</Typography>
          <EducationTextField
            name='description'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            size='small'
            placeholder='Описание'
            errors={errors}
            touched={touched}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
          <Typography flex={1}>Преимущества</Typography>
          <Stack gap='10px' flex={3}>
            {values.edges.map((edge, index) => (
              <Stack key={`edges_${index}`} direction='row' alignItems='center'>
                <EducationTextField
                  name={`edges[${index}]`}
                  value={values.edges[index]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  size='small'
                  placeholder='Преимущества'
                  errors={errors}
                  touched={touched}
                />
                <IconButton
                  color='error'
                  onClick={() =>
                    setFieldValue(
                      'edges',
                      values.edges.filter((value, arrayIndex) => arrayIndex !== index),
                    )
                  }
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Stack>
            ))}
            <Button onClick={() => setFieldValue('edges', [...values.edges, ''])}>Добавить</Button>
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between' gap='30px' width='50%'>
          <Typography flex={1}>Ссылка</Typography>
          <EducationTextField
            name='url'
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            size='small'
            placeholder='Ссылка'
            errors={errors}
            touched={touched}
          />
        </Stack>
        <Button disabled={!isValid}>Отправить</Button>
        <ButtonMenu items={items} color='error' variant='contained'>
          Добавить
        </ButtonMenu>
      </EducationCard>
      {values.actions.map((action, index) => (
        <ActionLessonCard
          handleRemove={() => handleRemoveAction(values.actions[index].id)}
          key={`action_${index}`}
          index={index}
          values={values.actions}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      ))}
      {values.tasks.map((task, index) => (
        <TaskLessonCard
          handleRemove={() => handleRemoveTask(values.tasks[index].id)}
          key={`action_${index}`}
          index={index}
          values={values.tasks}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        />
      ))}
    </EducationForm>
  )
}

export default Index

const EducationCard = styled(Card)`
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`

const EducationForm = styled('form')`
  gap: 20px;
  display: flex;
  flex-direction: column;
`
