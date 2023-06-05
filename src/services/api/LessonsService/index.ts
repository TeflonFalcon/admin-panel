import { IAction, IChangeLessonStatusRequest, ILesson, IPaginationRequest, ITask } from '@/types'
import api from '@/services/axios'
import { AxiosResponse } from 'axios'

const LessonsService = {
  getPaginateLessons: (params: IPaginationRequest): Promise<AxiosResponse<ILesson[]>> =>
    api.get('/lessons', { params }),
  getLesson: (id: string): Promise<AxiosResponse<ILesson>> => api.get(`/lessons/${id}`),
  getTasksByLesson: (lessonId: string): Promise<AxiosResponse<ITask[]>> =>
    api.get(`/tasks?lessonId=${lessonId}`),
  getActionsByLesson: (lessonId: string): Promise<AxiosResponse<IAction[]>> =>
    api.get(`/actions?lessonId=${lessonId}`),
  changeLessonStatus: ({
    id,
    status,
  }: IChangeLessonStatusRequest): Promise<AxiosResponse<ILesson>> =>
    api.patch(`/lessons/${id}`, { status }),
}

export default LessonsService
