import { IChangeUserStatusRequest, ILoginRequest, IPaginationRequest, IUser } from '@/types'
import api from '@/services/axios'
import { AxiosResponse } from 'axios'

const UserService = {
  auth: (params: ILoginRequest): Promise<AxiosResponse<IUser[]>> => api.get('/users', { params }),
  getUser: (id: string): Promise<AxiosResponse<IUser>> => api.get(`/users/${id}`),
  getUsers: (): Promise<AxiosResponse<IUser[]>> => api.get('/users'),
  getPaginateUsers: (params: IPaginationRequest): Promise<AxiosResponse<IUser[]>> =>
    api.get('/users', { params }),
  changeUserStatus: ({ status, id }: IChangeUserStatusRequest) =>
    api.patch(`/users/${id}`, { status }),
}

export default UserService
