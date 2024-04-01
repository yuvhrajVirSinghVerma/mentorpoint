import apiClient from "./client";

const getOpportunities = () => {
  return apiClient.get("/opportunities");
};

const addOpportunity = (payload) => {
  return apiClient.post("/opportunities", payload);
};

const apply = (data) => {
  console.log("dt ",data)
  return apiClient.post("/opportunities/apply", { data });
};


export default { getOpportunities, addOpportunity,apply };
