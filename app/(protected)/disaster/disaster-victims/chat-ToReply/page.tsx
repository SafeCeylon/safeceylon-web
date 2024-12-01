"use client";

import { useRouter } from "next/router";
import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import DefaultProfilePic from "@/public/assets/default_profile_pic.png";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

// var UserId = "null";  // Default value for userId
// const currentUrl = window.location.href;
//   let urlPart = currentUrl.split("chat-ToReply")[1];  // Gets the part after "chat-ToReply"
//   console.log(urlPart);

//   if(urlPart !== ""){
//     const userId = urlPart.split("=")[1];  // Gets the userId
//     console.log("userId: ", userId);
//     UserId = userId;
//   }else{
//     console.log("No userId found");
//   }

export default function Admin() {
  const [message, setMessage] = useState("");
  const [UserId, setUserId] = useState("null");

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  // Type for the response data
interface SendMessageResponse {
  message: string;
  // Add any other fields that might be returned from the server if needed
}

const handleSendMessage = async (): Promise<void> => {
  // Type check for message (assuming message is a string)
  if (!message.trim()) {
    alert("Message cannot be empty!");
    return;
  }

  try {
    // Making POST request with axios
    const response: AxiosResponse<SendMessageResponse> = await axios.post(
      "http://localhost:8080/api/disaster/disaster-victims/chat-ToReply",
      {
        message: message,
        UserId : UserId
      }
    );

    // Handle successful response
    console.log("Message sent:", response.data);
    setMessage(""); // Clear input field

  } catch (error: any) {
    if (error.response) {
      // The server responded with a status outside of 2xx
      console.error("Error response:", error.response.data);
      alert("Failed to send message: " + error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
      alert("Failed to send message: No response from server");
    } else {
      // Something else happened
      console.error("Error:", error.message);
      alert("An unexpected error occurred: " + error.message);
    }
  }
};

  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      nic: string;
      mobileNo: string;
      address: string;
      image: string;
      email: string;
    }[]
  >([]);

  const [disasters, setDisasters] = useState<
    {
      id: string;
      type: string;
      latitude: string;
      longitude: string;
      radius: string;
      reportedAt: string;
      resolved: string;
    }[]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/disaster/disaster-victims/chat-ToReply?UserId=${userId}`
      );
      console.log(response.data);
      setDisasters(response.data);
      setUserId(userId);
    } catch (error) {
      console.error("Error fetching victim stats:", error);
    }
  };

  const fetchUsersToRely = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/disaster/disaster-victims/chat-ToReply`
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching victim stats:", error);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchUsersToRely();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full">
      <div className="w-full h-full flex bg-white flex-col rounded-2xl">
        <div className="h-[10%] pl-10 flex items-center">
          <p className="font-bold text-xl">Disaster Victims Chat</p>
        </div>

        <div className=" w-full h-[90%] pl-10 pr-10 pb-10">
          <div className="w-full h-full bg-slate-200 p-10 rounded-2xl flex flex-row gap-10">
            <div className="h-full w-1/4 bg-white rounded-2xl shadow-md shadow-gray-400">
              <div className="relative p-7 h-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Search Name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-12 py-2 border rounded-md bg-slate-100"
                />
              </div>

              <div className="h-5/6 pl-9 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                {filteredUsers.map((user) => (
                  // console.log(`/api/disaster/disaster-victims/chat-ToReply?UserId=${user.id}`),
                  <a
                    key={user.id}
                    className="w-1/3"
                    onClick={() => handleClick(user.id)}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          className="scale-150"
                          src={user.image || "/assets/default_profile_pic.png"}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p>{user.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="h-full w-2/4 bg-white rounded-2xl shadow-md shadow-gray-400">
              <div className="h-[12%] flex items-center pl-7">
                <div className="flex flex-row items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      className="scale-150"
                      src="/assets/default_profile_pic.png"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>Use Name</p>
                </div>
              </div>

              <div className="bg-slate-100 h-[75%] mx-7 rounded-2xl">
                {/* Chat content goes here */}
              </div>

              <div className="h-[13%] mx-7 pt-5">
                <Input
                  type="text"
                  placeholder="Write your message"
                  value={message} 
                  onChange={handleInputChange}
                  className="border rounded-md bg-slate-100 w-full"
                />
                <div className="mt-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="h-full w-1/4 bg-white rounded-2xl shadow-md shadow-gray-400">
              <div className="h-2/5 flex flex-col items-center justify-center">
                <Image
                  src={DefaultProfilePic}
                  alt="Logo1"
                  className="h-4/6 w-auto"
                />
                <p className="mt-[-10px] text-lg font-bold">Use Name</p>
              </div>

              <div className="h-3/5 p-5 pt-0">
                <div className="bg-slate-100 h-full rounded-2xl">
                  <p className="text-center font-bold pt-5">
                    Disaster Information
                  </p>

                  {/* {disaster && (
                    <>
                      <p>id: {disaster?.id}</p>
                      <p>type: {disaster?.type} </p>
                      <p>latitude: {disaster?.latitude}</p>
                      <p>longitude: {disaster?.longitude}</p>
                      <p>radius: {disaster?.radius}</p>
                      <p>reportedAt: {disaster?.reportedAt}</p>
                      <p>resolved: {disaster?.resolved}</p>
                    </>
                  )} */}

                  {
                    <div className="p-5">
                      {disasters.map((disaster) => (
                        <div className="flex flex-col gap-2">
                          {/* <p>id: {disaster.id}</p> */}
                          <p>type: {disaster.type}</p>
                          {/* <p>latitude: {disaster.latitude}</p>
                          <p>longitude: {disaster.longitude}</p>
                          <p>radius: {disaster.radius}</p>
                          <p>reportedAt: {disaster.reportedAt}</p>
                          <p>resolved: {disaster.resolved}</p> */}
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
