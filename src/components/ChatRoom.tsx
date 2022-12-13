import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectName, selectRoom, setRoom } from "../features/roomSlice";
import { emitEvent, selectSocket } from "../features/socketSlice";
import PaperAirplaneIcon from "../svg/PaperAirplane";
import ArrowBackIcon from "../svg/ArrowBack";
type receivedMsg = {
  msg: string;
  isMe?: boolean;
  username: string;
};

export default function ChatRoom() {
  const roomNo = useSelector(selectRoom);
  const username = useSelector(selectName);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState<receivedMsg[]>([]);

  const leaveRoom = () => {
    dispatch(setRoom(""));
    dispatch(emitEvent({ event: "leave_room", data: { room: roomNo } }));
  };
  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    setReceivedMsg((prev) => [...prev, { msg, isMe: true, username }]);
    dispatch(
      emitEvent({ event: "send_msg", data: { room: roomNo, msg, username } })
    );
    setMsg("");
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setReceivedMsg((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
      <div className="justify-center items-center flex flex-col ">
        <div className="flex-row flex w-1/2 justify-between items-center">
          <button onClick={leaveRoom}>
            <div className=" text-orange-600 hover:text-orange-300">
              <ArrowBackIcon className="w-10 h-10" />
            </div>
          </button>

          <h1>
            Name :
            <span className="font-bold text-red-500 outline-2">{username}</span>
          </h1>
          <h1>
            ROOM :
            <span className="font-bold text-red-500 outline-2">{roomNo}</span>
          </h1>
        </div>

        <div className="border-black border-2 flex-col gap-y-2 p-5 m-2 w-1/2 justify-center items-center flex rounded-lg ">
          <div className="w-full flex-col h-[20rem] overflow-y-scroll">
            {receivedMsg.map((msg) => {
              if (msg.msg) {
                if (msg.isMe) {
                  return (
                    <div className="flex-wrap-reverse flex flex-row-reverse pt-2">
                      <div className=" bg-green-600 text-white border-black border-r-2 border-b-2 font-bold p-2 rounded-full text-right">
                        {msg.msg}
                      </div>
                    </div>
                  );
                }
                return (
                  <>
                    <div className="mr-2">
                      <h1 className="text-xs text-gray-400 pr-2">
                        {msg.username || "Unknown"}
                      </h1>
                    </div>
                    <div className="flex-wrap flex flex-row pt-2">
                      <div className="bg-blue-600 text-white font-bold border-black border-r-2 border-b-2 p-2 rounded-full ri">
                        {msg.msg}
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <form
            onSubmit={sendMsg}
            className="w-full flex flex-row gap-x-2 justify-center items-center"
          >
            <input
              required={true}
              className="flex-1 hover:outline-blue-600 focus:outline-blue-600 border-black border-2 rounded-full py-2 px-1"
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={msg}
              type="text"
            />
            <button type="submit">
              <div className="text-white bg-orange-600 p-2 rounded-full hover:bg-orange-300">
                <PaperAirplaneIcon />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
