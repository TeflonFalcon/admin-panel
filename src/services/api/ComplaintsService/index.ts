import {
  ENUM_COMPLAINT_STATUS,
  IAnswerComplaintRequest,
  IChangeComplaintStatusRequest,
  IComplaint,
  IPaginationRequest,
} from '@/types'
import api from '@/services/axios'
import { AxiosResponse } from 'axios'

const ComplaintsService = {
  getComplaint: (id: string): Promise<AxiosResponse<IComplaint>> => api.get(`/complaints/${id}`),
  getPaginateComplaints: (params: IPaginationRequest): Promise<AxiosResponse<IComplaint[]>> =>
    api.get('/complaints', { params: { ...params, _sort: 'createdAt' } }),
  createComplaint: (data: IComplaint) => api.post('/complaints', data),
  changeComplaintStatus: ({ status, id }: IChangeComplaintStatusRequest) =>
    api.patch(`/complaints/${id}`, { status }),
  answerComplaint: ({ answer, id }: IAnswerComplaintRequest) =>
    api.patch(`/complaints/${id}`, { answer, status: ENUM_COMPLAINT_STATUS.answered }),
}

export default ComplaintsService
