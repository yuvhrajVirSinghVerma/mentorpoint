import apiClient from "./client";

const signIn = (payload) => {
  console.log("payloadsigin",payload)
  return apiClient.post("/users/signin", payload);
};

const signUp = (payload) => {
  console.log("payload ",payload)
  return apiClient.post("/users/signup", payload);
};

export default { signIn, signUp };
