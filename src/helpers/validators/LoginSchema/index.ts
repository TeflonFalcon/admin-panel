import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Данное поле обязательное').email('Невалидный email!'),
  password: Yup.string().required('Данное поле обязательное'),
  rememberMe: Yup.boolean(),
})

export default LoginSchema
