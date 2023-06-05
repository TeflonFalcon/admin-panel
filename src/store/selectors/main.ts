import { RootState } from '@/store'

export const selectUser = (state: RootState) => state.main.user
export const selectComplaint = (state: RootState) => state.main.complaint
export const selectComplaintsList = (state: RootState) => state.main.complaintsList
export const selectUsers = (state: RootState) => state.main.users
export const selectUsersList = (state: RootState) => state.main.usersList
export const selectLesson = (state: RootState) => state.main.lesson
export const selectLessonsList = (state: RootState) => state.main.lessonsList
export const selectTasks = (state: RootState) => state.main.tasks
export const selectActions = (state: RootState) => state.main.actions
