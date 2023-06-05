export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginForm extends ILoginRequest {
  rememberMe: boolean
}

export interface IUserShort {
  id: string
  name: string
}

export interface IUser extends IUserShort {
  email: string
  password: string
  status: ENUM_USER_STATUS
  avatar: string
}

export enum ENUM_USER_STATUS {
  active = 'active',
  stop = 'stop',
  deleted = 'deleted',
}

export enum ENUM_COMPLAINT_STATUS {
  new = 'new',
  progress = 'progress',
  answered = 'answered',
  rejected = 'rejected',
}

export interface IComplaintAnswer {
  name: string
  createdAt: string
  text: string
}

export interface IComplaint {
  id: string
  name: string
  subject: string
  description: string
  status: ENUM_COMPLAINT_STATUS
  createdAt: string
  answer: IComplaintAnswer | null
}

export interface IPaginationRequest {
  _page: number
  _limit: number
  _order?: 'asc' | 'desc'
}

export interface IComplaintsList {
  complaints: IComplaint[]
  total: number
}

export interface IAnswerComplaintRequest {
  id: string
  answer: IComplaintAnswer
}

export type ICreateComplaintForm = IComplaint

export interface IUsersList {
  users: IUser[]
  total: number
}

export enum ENUM_LESSON_STATUS {
  active = 'active',
  stop = 'stop',
  deleted = 'deleted',
}

export interface ILesson {
  id: string
  title: string
  description: string
  edges: string[]
  link: string
  user: IUserShort
  status: ENUM_LESSON_STATUS
}

export interface ITask {
  id: string
  lessonId: string
  area: string
  title: string
  actions: string[]
  awards: string[]
  date: string
  images: string[]
  points: number
}

export interface IAction {
  id: string
  lessonId: string
  task: string
  title: string
  date: string
  time: string
  points: number
}

export interface ILessonsList {
  lessons: ILesson[]
  total: number
}

export interface IChangeStatusRequest<T> {
  id: string
  status: T
}

export type IChangeComplaintStatusRequest = IChangeStatusRequest<ENUM_COMPLAINT_STATUS>
export type IChangeUserStatusRequest = IChangeStatusRequest<ENUM_USER_STATUS>
export type IChangeLessonStatusRequest = IChangeStatusRequest<ENUM_LESSON_STATUS>

export interface ICreateLessonForm {
  title: string
  description: string
  edges: string[]
  tasks: ITask[]
  actions: IAction[]
  url: string
}
