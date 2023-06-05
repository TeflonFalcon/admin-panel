import * as Yup from 'yup'

const CreateComplaintSchema = Yup.object().shape({
  id: Yup.string().required('Данное поле обязательное'),
  name: Yup.string().required('Данное поле обязательное'),
  subject: Yup.string().required('Данное поле обязательное'),
  description: Yup.string().required('Данное поле обязательное'),
  answer: Yup.string().nullable(),
})

export default CreateComplaintSchema
