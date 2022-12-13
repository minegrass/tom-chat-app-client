import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom, setName } from "../features/roomSlice";
import { emitEvent } from "../features/socketSlice";

export default function JoinRoom() {
  const dispatch = useDispatch();
  const [roomNo, setRoomNo] = useState("");
  const [username, setUsername] = useState("");
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(emitEvent({ event: "join_room", data: { room: roomNo } }));
    dispatch(setRoom(roomNo));
    dispatch(setName(username));
    setRoomNo("");
    setUsername("");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <form
        className="flex flex-col justify-center items-center gap-y-2"
        onSubmit={joinRoom}
      >
        <h1 className="text-2xl">Hello welcome to Tom Chat Room</h1>
        <h2 className="text-xl">Room No.</h2>
        <input
          type="number"
          required={true}
          onChange={(e) => {
            setRoomNo(e.target.value);
          }}
          className="px-2 border-2 border-black rounded-full focus:border-blue-500 focus:outline-none"
        />
        <h2 className="text-xl">Name</h2>
        <input
          type="text"
          required={true}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="px-2 border-2 border-black rounded-full focus:border-blue-500 focus:outline-none"
        />
        <button
          className="bg-orange-600 font-bold text-l rounded-lg p-2 border-r-2 border-b-2 border-black hover:border-blue-600 hover:text-blue-600"
          type="submit"
        >
          Join
        </button>
      </form>
    </div>
  );
}
