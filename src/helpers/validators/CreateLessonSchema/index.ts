import * as Yup from 'yup'

const yupTask = Yup.object().shape({
  area: Yup.string().required('Данное поле обязательное!'),
  title: Yup.string().required('Данное поле обязательное!'),
  actions: Yup.array().of(Yup.string().required('Данное поле обязательное!')),
  awards: Yup.array().of(Yup.string().required('Данное поле обязательное!')),
  date: Yup.date().required('Данное поле обязательное!'),
  images: Yup.array().of(Yup.string().required('Данное поле обязательное!')),
  points: Yup.number().required('Данное поле обязательное!'),
})

const yupAction = Yup.object().shape({
  task: Yup.string().required('Данное поле обязательное!'),
  title: Yup.string().required('Данное поле обязательное!'),
  date: Yup.date().required('Данное поле обязательное!'),
  time: Yup.string().required('Данное поле обязательное!'),
  points: Yup.number()
    .required('Данное поле обязательное!')
    .positive('Данное поле должно быть больше 0!'),
})

const CreateLessonSchema = Yup.object().shape({
  title: Yup.string().required('Данное поле обязательное!'),
  description: Yup.string().required('Данное поле обязательное!'),
  url: Yup.string().url('Невалидная ссылка').required('Данное поле обязательное!'),
  edges: Yup.array()
    .of(Yup.string().required('Данное поле обязательное!'))
    .min(1, ({ min }) => `Минимальное количество преимуществ ${min}`)
    .max(3, ({ max }) => `Максимальное количество преимуществ ${max}`),
  tasks: Yup.array()
    .of(yupTask)
    .min(1, ({ min }) => `Минимальное количество действий ${min}`)
    .max(3, ({ max }) => `Максимальное количество действий ${max}`),
  actions: Yup.array()
    .of(yupAction)
    .min(1, ({ min }) => `Минимальное количество действий ${min}`)
    .max(3, ({ max }) => `Максимальное количество действий ${max}`),
})

export default CreateLessonSchema
