import { ENUM_COMPLAINT_STATUS } from '@/types'

export const complaintsStatus: { [key in ENUM_COMPLAINT_STATUS]: string } = {
  [ENUM_COMPLAINT_STATUS.new]: 'Новая',
  [ENUM_COMPLAINT_STATUS.progress]: 'На проверке',
  [ENUM_COMPLAINT_STATUS.rejected]: 'Отклонено',
  [ENUM_COMPLAINT_STATUS.answered]: 'Отвечено',
}

const complaintStatusFormat = (status: ENUM_COMPLAINT_STATUS) => complaintsStatus[status]

export default complaintStatusFormat
