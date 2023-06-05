import React, { useState } from 'react'
import { IconButton, TextField, TextFieldProps } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Index: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setShowPassword((prevState) => !prevState)}>
            {!showPassword ? (
              <VisibilityIcon color='primary' />
            ) : (
              <VisibilityOffIcon color='primary' />
            )}
          </IconButton>
        ),
        ...props.InputProps,
      }}
    />
  )
}

export default Index
