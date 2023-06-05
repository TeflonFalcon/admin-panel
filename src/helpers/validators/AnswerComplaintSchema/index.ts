import * as Yup from 'yup'

const AnswerComplaintSchema = Yup.object().shape({
  text: Yup.string().required('Данное поле обязательное'),
})

export default AnswerComplaintSchema
