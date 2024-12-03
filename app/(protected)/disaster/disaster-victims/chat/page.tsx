"use client";


import { useRouter } from "next/router";
import { useState, useEffect, use } from "react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import DefaultProfilePic from "@/public/assets/default_profile_pic.png";

import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { set } from "zod";
import { Type } from "lucide-react";


export default function Admin() {
  const urlParams = new URLSearchParams(window.location.search);
  const _type = urlParams.get("Type"); // Get the value of the 'Type' parameter

  console.log(window.location.href);
  console.log(_type);

  const [message, setMessage] = useState("");
  const [UserId, setUserId] = useState("null");

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  console.log(UserId);
  const handleClose = async (): Promise<void> => {
    const response: AxiosResponse<SendMessageResponse> = await axios.post(
      "http://localhost:8080/api/disaster/disaster-victims/chat/close",
      {
        UserId: UserId,
      }
    );
    location.reload();
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
          UserId: UserId,
        }
      );

      // Handle successful response
      console.log("Message sent:", response.data);
      setMessage(""); // Clear input field

      window.location.reload(); // Reload the page to fetch the updated data
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
      radius: string;
    }[]
  >([]);

  const [chatMessages, setChatMessages] = useState<
    {
      owner: string;
      message: string;
    }[]
  >([]);

  const [VictimImage, setVictimImage] = useState("");
  const [VictimName, setVictimName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/disaster/disaster-victims/chat?UserId=${userId}`
      );
      console.log(response.data);

      setVictimName(response.data.victim_name);
      setDisasters(response.data.disasters);
      setChatMessages(response.data.chat_messages);
      setVictimImage(response.data.victim_image);
      setMobileNumber(response.data.mobile_number);
      setEmail(response.data.email);
      setAddress(response.data.address);
      setUserId(userId);
    } catch (error) {
      console.error("Error fetching victim stats:", error);
    }
  };

  const fetchUsersToRely = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/disaster/disaster-victims/chat?UserId=null&Type=${_type}`
      );

      // console.log(response.data);
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
          <p className="font-bold text-xl">
            Disaster Victims Chat (
            {(() => {
              switch (_type) {
                case "ToReply":
                  return "ToReply";
                  break;
                case "Replied":
                  return "Replied";
                  break;
                case "Closed":
                  return "Closed";
                  break;
              }
            })()}
            )
          </p>
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

              <div className="h-5/6 pl-9 flex flex-col gap-2 overflow-y-auto custom-scrollbar w-full">
                {filteredUsers.map((user) => (
                  // console.log(`/api/disaster/disaster-victims/chat-ToReply?UserId=${user.id}`),

                  <div className="relative bg-slate-100 rounded-2xl mr-8  hover:bg-slate-200 transition-all duration-300 cursor-pointer">
                    <a
                      key={user.id}
                      className="w-1/3"
                      onClick={() => handleClick(user.id)}
                    >
                      <div className="flex flex-row items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            className="scale-150"
                            src={
                              user.image || "/assets/default_profile_pic.png"
                            }
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p>{user.name}</p>
                      </div>
                    </a>
                  </div>
                ))}

              </div>
            </div>

            <div className="h-full w-2/4 bg-white rounded-2xl shadow-md shadow-gray-400">
              <div className="h-[12%] w-full flex items-center px-7">
                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        className="scale-150"
                        src={VictimImage || "/assets/default_profile_pic.png"}
                      />
                    </Avatar>
                    <p>{VictimName}</p>
                  </div>

                  <div>
                    <button
                      className={`py-2 px-5 rounded-md transition-all duration-300 ${
                        _type === "Closed"
                          ? "bg-yellow-900 text-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105"
                      }`}
                      onClick={_type !== "Closed" ? handleClose : undefined} // Disable click when closed
                      disabled={_type === "Closed"} // Optional: Disable the button
                    >
                      {_type === "Closed" ? "Closed" : "Close"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 h-[75%] mx-7 rounded-2xl overflow-y-auto flex flex-col px-5 pt-2">
                {chatMessages.map((chatMessage) => (
                  <div
                    className={`flex mb-2 ${
                      chatMessage.owner === "DMC_OFFICER"
                        ? "justify-end bg"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex flex-co p-2 rounded max-w-[66.67%] min-w-[20%] 
                    ${
                      chatMessage.owner === "DMC_OFFICER"
                        ? "bg-slate-200"
                        : "bg-slate-300"
                    }
                      `}
                    >
                      {/* <p>{chatMessage.owner}</p> */}
                      <p>{chatMessage.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="h-[13%] px-7 pt-5 flex flex-row gap-2 w-full align-top">
                <Input
                  type="text"
                  placeholder="Write your message"
                  value={message}
                  onChange={handleInputChange}
                  className="border rounded-md bg-slate-100"
                />
                <div className="h-full w-2/12">
                  <button
                    className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div> */}

              <div className="h-[13%] px-7 pt-5 flex flex-row gap-2 w-full align-top">
                <Input
                  type="text"
                  placeholder="Write your message"
                  value={message}
                  onChange={handleInputChange}
                  className={`border rounded-md ${
                    _type === "Closed"
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-slate-100"
                  }`}
                  disabled={_type === "Closed"} // Disable input when closed
                />
                <div className="h-full w-2/12">
                  <button
                    className={`w-full py-2 rounded-md transition-all duration-300 ${
                      _type === "Closed"
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
                    }`}
                    onClick={_type !== "Closed" ? handleSendMessage : undefined} // Disable click when closed
                    disabled={_type === "Closed"} // Optional: Disable button
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="h-full w-1/4 bg-white rounded-2xl shadow-md shadow-gray-400">
              <div className="h-2/5 flex flex-col p-5">
                <div className="bg-slate-100 h-full rounded-2xl w-full p-5">
                  <div className="flex justify-center">
                    <p className="mt-[-10px] text-lg font-bold">
                      {VictimName || "Disaster Victim Name"}
                    </p>
                  </div>

                  <div className="flex flex-col justify-start items-start">
                    <div className="flex flex-col justify-start items-start">
                      <b>
                        <p className="text-center">Mobile Number</p>
                      </b>
                      <p className="text-center">{mobile_number}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <b>
                        <p className="text-center">Email</p>
                      </b>
                      <p className="text-center">{email}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <b>
                        <p className="text-center">Address</p>
                      </b>
                      <p className="text-center">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-3/5 p-5 pt-0">
                <div className="bg-slate-100 h-full rounded-2xl">
                  <p className="text-center font-bold pt-5">
                    Disasters Information
                  </p>

                  {
                    <div className="p-5 flex flex-col overflow-y-auto h-5/6">
                      {disasters.map((disaster) => (
                        <div className="flex flex-col pb-3">
                          <b>Dsaster {disasters.indexOf(disaster) + 1}</b>
                          <p>type: {disaster.type}</p>
                          <p>radius: {disaster.radius}m</p>

                          {/* <p>id: {disaster.id}</p> */}
                          {/* <p>latitude: {disaster.latitude}</p>
                          <p>longitude: {disaster.longitude}</p>
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
