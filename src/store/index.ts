import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import mainReducer from '@/store/slices/main'

export const store = configureStore({
  reducer: {
    main: mainReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
