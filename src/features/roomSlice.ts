import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface roomState {
  room: string;
  name: string;
}

// Define the initial state using that type
const initialState: roomState = {
  room: "",
  name: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setRoom, setName } = roomSlice.actions;

export const selectRoom = (state: RootState) => state.room.room;
export const selectName = (state: RootState) => state.room.name;

export default roomSlice.reducer;
