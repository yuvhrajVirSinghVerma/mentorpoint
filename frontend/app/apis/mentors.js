import apiClient from "./client";
const getMentors = (payload) => {
  console.log("payload ",payload)
  return apiClient.get("/users",payload);
};

const updateMentor = (payload) => {
  console.log("payload ",payload)
  return apiClient.put("/users", payload);
};

const updatePhoto = (payload) => {
  return apiClient.put("/users/profile", payload);
};

const addPhoto = (payload) => {
  return apiClient.post("/users/profile", payload);
};

export default { getMentors, updateMentor, updatePhoto, addPhoto };
