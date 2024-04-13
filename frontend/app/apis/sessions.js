import apiClient from "./client";

const getSessions = (payload) => {
  return apiClient.get("/sessions", payload);
};

const updateSessions = (payload) => {
  return apiClient.put("/sessions", payload);
};

const bookSession = (payload) => {
  return apiClient.post("/sessions/booking", payload);
};

export default { getSessions, bookSession ,updateSessions};
