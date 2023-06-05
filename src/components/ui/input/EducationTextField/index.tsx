import React, { useMemo } from 'react'
import {
  styled,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'
import { FormikTouched } from 'formik'
import * as lodash from 'lodash'

interface EducationTextFieldProps<T> {
  errors: any
  touched: FormikTouched<T>
  name: string
}

type TextFieldProps<T> = Omit<MuiTextFieldProps, 'name'> & EducationTextFieldProps<T>

const Index = <T,>(props: TextFieldProps<T>) => {
  const { touched, name, errors } = props

  const isTouched = useMemo(() => lodash.get(touched, name), [touched, name])
  const errorMessage = useMemo(() => lodash.get(errors, name), [errors, name])
  return (
    <TextField
      {...props}
      error={isTouched && !!errorMessage}
      helperText={isTouched && errorMessage}
    />
  )
}

export default Index

/** Styled **/
const TextField = styled(MuiTextField)`
  flex: 3;
`
