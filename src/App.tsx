import React from "react";
import { useSelector } from "react-redux";
import JoinRoom from "./components/JoinRoom";
import Layout from "./components/layout";
import { selectRoom } from "./features/roomSlice";
import ChatRoom from "./components/ChatRoom";

function App() {
  const roomNo = useSelector(selectRoom);
  return (
    <div>
      <Layout>{roomNo ? <ChatRoom /> : <JoinRoom />}</Layout>
    </div>
  );
}

export default App;
