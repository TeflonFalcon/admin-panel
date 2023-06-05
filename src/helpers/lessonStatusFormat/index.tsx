import React from 'react'
import { ENUM_LESSON_STATUS } from '@/types'
import { Chip } from '@mui/material'

export const lessonStatus: { [key in ENUM_LESSON_STATUS]: string } = {
  [ENUM_LESSON_STATUS.active]: 'Активный',
  [ENUM_LESSON_STATUS.stop]: 'Приостановлен',
  [ENUM_LESSON_STATUS.deleted]: 'Удален',
}

export const lessonStatusChip: { [key in ENUM_LESSON_STATUS]: React.ReactNode } = {
  [ENUM_LESSON_STATUS.active]: <Chip color='success' label={'Активный'} />,
  [ENUM_LESSON_STATUS.stop]: <Chip color='warning' label={'Приостановлен'} />,
  [ENUM_LESSON_STATUS.deleted]: <Chip color='error' label={'Удален'} />,
}

const lessonStatusFormat = (status: ENUM_LESSON_STATUS) => lessonStatus[status]
export const lessonStatusChipFormat = (status: ENUM_LESSON_STATUS) => lessonStatusChip[status]

export default lessonStatusFormat
