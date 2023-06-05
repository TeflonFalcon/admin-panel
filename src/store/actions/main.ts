import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ENUM_USER_STATUS,
  IAnswerComplaintRequest,
  IChangeComplaintStatusRequest,
  IChangeLessonStatusRequest,
  IChangeUserStatusRequest,
  ICreateComplaintForm,
  ILoginForm,
  IPaginationRequest,
} from '@/types'
import UserService from '@/services/api/UserService'
import {
  SET_ACTIONS,
  SET_COMPLAINT,
  SET_COMPLAINTS_LIST,
  SET_LESSON,
  SET_LESSONS_LIST,
  SET_TASKS,
  SET_USER,
  SET_USERS,
  SET_USERS_LIST,
  UPDATE_COMPLAINT,
  UPDATE_LESSON,
  UPDATE_USER,
} from '@/store/slices/main'
import router from '@/router'
import ComplaintsService from '@/services/api/ComplaintsService'
import LessonsService from '@/services/api/LessonsService'

export const authUser = createAsyncThunk(
  'main/authUser',
  async ({ email, password }: ILoginForm, { dispatch }) => {
    try {
      const response = await UserService.auth({ email, password })
      if (response.data.length) {
        const user = response.data[0]
        if (user.status === ENUM_USER_STATUS.active) {
          dispatch(SET_USER(user))
          router.navigate('/')
          localStorage.setItem('user', user.id)
        } else {
          alert('Данный аккаунт приостановлен/удален!')
        }
      } else {
        alert('Неверный email или пароль!')
      }
    } catch (e) {
      alert('Неверный email или пароль!')
      return false
    }
  },
)

export const getUser = createAsyncThunk('main/getUser', async (id: string, { dispatch }) => {
  try {
    const response = await UserService.getUser(id)
    if (response.data) {
      dispatch(SET_USER(response.data))
    }
  } catch (e) {
    dispatch(logoutUser(false))
    return false
  }
})

export const logoutUser = createAsyncThunk(
  'main/logoutUser',
  async (withRedirect: boolean, { dispatch }) => {
    await dispatch(SET_USER(null))
    if (withRedirect) router.navigate('/')
    localStorage.removeItem('user')
  },
)

export const getPaginateComplaints = createAsyncThunk(
  'main/getPaginateComplaints',
  async (params: IPaginationRequest, { dispatch }) => {
    try {
      const response = await ComplaintsService.getPaginateComplaints(params)
      dispatch(
        SET_COMPLAINTS_LIST({
          complaints: response.data,
          total: response.headers['x-total-count'],
        }),
      )
    } catch (e) {
      return false
    }
  },
)

export const changeComplaintStatus = createAsyncThunk(
  'main/changeComplaintStatus',
  async (params: IChangeComplaintStatusRequest, { dispatch }) => {
    try {
      const response = await ComplaintsService.changeComplaintStatus(params)
      dispatch(UPDATE_COMPLAINT(response.data))
      return true
    } catch (e) {
      return false
    }
  },
)

export const getComplaint = createAsyncThunk(
  'main/getComplaint',
  async (id: string, { dispatch }) => {
    try {
      const response = await ComplaintsService.getComplaint(id)
      dispatch(SET_COMPLAINT(response.data))
    } catch (e) {
      return false
    }
  },
)

export const createComplaint = createAsyncThunk(
  'main/createComplaint',
  async (data: ICreateComplaintForm) => {
    try {
      await ComplaintsService.createComplaint(data)
      alert('Жалоба успешно создана!')
      return true
    } catch (e) {
      alert('Не удалось создать жалобу!')
      return false
    }
  },
)

export const answerComplaint = createAsyncThunk(
  'main/answerComplaint',
  async (params: IAnswerComplaintRequest, { dispatch }) => {
    try {
      const response = await ComplaintsService.answerComplaint(params)
      dispatch(UPDATE_COMPLAINT(response.data))
      return true
    } catch (e) {
      return false
    }
  },
)

export const getUsers = createAsyncThunk('main/getUsers', async (_, { dispatch }) => {
  try {
    const response = await UserService.getUsers()
    if (response.data) {
      dispatch(SET_USERS(response.data))
    }
  } catch (e) {
    return false
  }
})

export const getPaginateUsers = createAsyncThunk(
  'main/getPaginateUsers',
  async (params: IPaginationRequest, { dispatch }) => {
    try {
      const response = await UserService.getPaginateUsers(params)
      dispatch(
        SET_USERS_LIST({
          users: response.data,
          total: response.headers['x-total-count'],
        }),
      )
    } catch (e) {
      return false
    }
  },
)

export const changeUserStatus = createAsyncThunk(
  'main/changeUserStatus',
  async (params: IChangeUserStatusRequest, { dispatch }) => {
    try {
      const response = await UserService.changeUserStatus(params)
      dispatch(UPDATE_USER(response.data))
      return true
    } catch (e) {
      return false
    }
  },
)

export const getLesson = createAsyncThunk('main/getLesson', async (id: string, { dispatch }) => {
  try {
    const response = await LessonsService.getLesson(id)
    if (response.data) {
      dispatch(SET_LESSON(response.data))
    }
  } catch (e) {
    return false
  }
})

export const getTasksByLesson = createAsyncThunk(
  'main/getTasksByLesson',
  async (lessonId: string, { dispatch }) => {
    try {
      const response = await LessonsService.getTasksByLesson(lessonId)
      if (response.data) {
        dispatch(SET_TASKS(response.data))
      }
    } catch (e) {
      return false
    }
  },
)

export const getActionsByLesson = createAsyncThunk(
  'main/getActionsByLesson',
  async (lessonId: string, { dispatch }) => {
    try {
      const response = await LessonsService.getActionsByLesson(lessonId)
      if (response.data) {
        dispatch(SET_ACTIONS(response.data))
      }
    } catch (e) {
      return false
    }
  },
)

export const getPaginateLessons = createAsyncThunk(
  'main/getPaginateLessons',
  async (params: IPaginationRequest, { dispatch }) => {
    try {
      const response = await LessonsService.getPaginateLessons(params)
      dispatch(
        SET_LESSONS_LIST({
          lessons: response.data,
          total: response.headers['x-total-count'],
        }),
      )
    } catch (e) {
      return false
    }
  },
)

export const changeLessonStatus = createAsyncThunk(
  'main/changeLessonStatus',
  async (params: IChangeLessonStatusRequest, { dispatch }) => {
    try {
      const response = await LessonsService.changeLessonStatus(params)
      dispatch(UPDATE_LESSON(response.data))
      return true
    } catch (e) {
      return false
    }
  },
)
