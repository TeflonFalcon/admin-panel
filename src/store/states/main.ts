import {
  IAction,
  IComplaint,
  IComplaintsList,
  ILesson,
  ILessonsList,
  ITask,
  IUser,
  IUsersList,
} from '@/types'

export interface initialStateInterface {
  user: IUser | null
  complaint: IComplaint | null
  complaintsList: IComplaintsList
  users: IUser[]
  usersList: IUsersList
  lesson: ILesson | null
  lessonsList: ILessonsList
  tasks: ITask[]
  actions: IAction[]
}

export const initialState: initialStateInterface = {
  user: null,
  complaint: null,
  complaintsList: {
    complaints: [],
    total: 0,
  },
  users: [],
  usersList: {
    users: [],
    total: 0,
  },
  lesson: null,
  lessonsList: {
    lessons: [],
    total: 0,
  },
  tasks: [],
  actions: [],
}
