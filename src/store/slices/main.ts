import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '@/store/states/main'
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

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_USER: (state, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload
    },
    SET_COMPLAINT: (state, { payload }: PayloadAction<IComplaint>) => {
      state.complaint = payload
    },
    SET_COMPLAINTS_LIST: (state, { payload }: PayloadAction<IComplaintsList>) => {
      state.complaintsList = payload
    },
    UPDATE_COMPLAINT: (state, { payload }: PayloadAction<IComplaint>) => {
      const complaintIndex = state.complaintsList.complaints.findIndex(
        (complaint) => complaint.id === payload.id,
      )
      if (complaintIndex !== -1) state.complaintsList.complaints[complaintIndex] = payload
    },
    SET_USERS: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload
    },
    SET_USERS_LIST: (state, { payload }: PayloadAction<IUsersList>) => {
      state.usersList = payload
    },
    UPDATE_USER: (state, { payload }: PayloadAction<IUser>) => {
      const userIndex = state.usersList.users.findIndex((user) => user.id === payload.id)
      if (userIndex !== -1) state.usersList.users[userIndex] = payload
    },
    SET_LESSON: (state, { payload }: PayloadAction<ILesson | null>) => {
      state.lesson = payload
    },
    SET_LESSONS_LIST: (state, { payload }: PayloadAction<ILessonsList>) => {
      state.lessonsList = payload
    },
    SET_TASKS: (state, { payload }: PayloadAction<ITask[]>) => {
      state.tasks = payload
    },
    SET_ACTIONS: (state, { payload }: PayloadAction<IAction[]>) => {
      state.actions = payload
    },
    UPDATE_LESSON: (state, { payload }: PayloadAction<ILesson>) => {
      const lessonIndex = state.lessonsList.lessons.findIndex((lesson) => lesson.id === payload.id)
      if (lessonIndex !== -1) state.lessonsList.lessons[lessonIndex] = payload
    },
  },
})

export const {
  SET_USER,
  SET_COMPLAINT,
  SET_COMPLAINTS_LIST,
  UPDATE_COMPLAINT,
  SET_USERS,
  SET_USERS_LIST,
  UPDATE_USER,
  SET_LESSON,
  SET_LESSONS_LIST,
  SET_TASKS,
  SET_ACTIONS,
  UPDATE_LESSON,
} = slice.actions

export default slice.reducer
