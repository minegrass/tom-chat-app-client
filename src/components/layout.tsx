import React from "react";

export default function layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-[3rem]">
        <div className="bg-green-600 text-white p-2">
          <a href="/" className="font-bold text-3xl ">
            TOM CHAT ROOM
          </a>
        </div>
      </div>
      <div>{props.children}</div>
      <div className="flex justify-center items-center mt-2">
        <div>©Copyright 2022</div>
      </div>
    </div>
  );
}
