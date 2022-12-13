import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import io, { Socket } from "socket.io-client";

const { REACT_APP_SERVER_DOMAIN } = process.env;
if (!REACT_APP_SERVER_DOMAIN) {
  throw Error("DOTENV CONFIG NOT FILLED");
}

// Define a type for the slice state
interface socketState {
  socket: Socket;
}

// Define the initial state using that type
const initialState: socketState = {
  socket: io(`${REACT_APP_SERVER_DOMAIN}`),
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    emitEvent: (state, action: { payload: { event: string; data: any } }) => {
      // emitEvent({event:'eventName',data:'dataItem'})
      console.log(action.payload.data);
      state.socket.emit(action.payload.event, action.payload.data);
      return state;
    },
  },
});

export const { emitEvent } = socketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSocket = (state: RootState) => state.socket.socket;

export default socketSlice.reducer;
