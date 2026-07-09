import api from "./api";

export const getAnalytics = async () => {
  const response = await api.get("/analytics");
  return response.data;
};

export const getAnalyticsByLinkId = async (linkId) => {
  const response = await api.get(`/analytics/${linkId}`);
  return response.data;
};
