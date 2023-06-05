import React from 'react'
import { ENUM_USER_STATUS } from '@/types'
import { Chip } from '@mui/material'

export const userStatus: { [key in ENUM_USER_STATUS]: string } = {
  [ENUM_USER_STATUS.active]: 'Активный',
  [ENUM_USER_STATUS.stop]: 'Приостановлен',
  [ENUM_USER_STATUS.deleted]: 'Удален',
}

export const userStatusChip: { [key in ENUM_USER_STATUS]: React.ReactNode } = {
  [ENUM_USER_STATUS.active]: <Chip color='success' label={'Активный'} />,
  [ENUM_USER_STATUS.stop]: <Chip color='warning' label={'Приостановлен'} />,
  [ENUM_USER_STATUS.deleted]: <Chip color='error' label={'Удален'} />,
}

const userStatusFormat = (status: ENUM_USER_STATUS) => userStatus[status]
export const userStatusChipFormat = (status: ENUM_USER_STATUS) => userStatusChip[status]

export default userStatusFormat
