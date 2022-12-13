import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import socketReducer from "../features/socketSlice";
import roomReducer from "../features/roomSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    socket: socketReducer,
    room: roomReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
