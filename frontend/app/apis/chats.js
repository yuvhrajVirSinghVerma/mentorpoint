import apiClient from "./client";

const addChat = (sessionId, chats) => {
  return apiClient.post("sessions/chats", { _id: sessionId, chats: chats ,read:false});
};

const getChats = (sessionId) => {
  return apiClient.get("sessions/chats", { _id: sessionId });
};

export default { addChat, getChats };
