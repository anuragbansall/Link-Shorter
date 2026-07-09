import api from "./api";

export const createLink = async (formData) => {
  const response = await api.post("/links", {
    originalUrl: formData.originalUrl,
    title: formData.title,
    slug: formData.slug,
    password: {
      isPasswordProtected: formData.isPasswordProtected,
      value: formData.password,
    },
    isOneTimeUse: formData.isOneTimeUse,
  });
  return response.data;
};

export const updateLink = async (linkId, formData) => {
  const response = await api.put(`/links/${linkId}`, {
    originalUrl: formData.originalUrl,
    title: formData.title,
    slug: formData.slug,
    password: {
      isPasswordProtected: formData.password ? true : false,
      value: formData.password,
    },
    isOneTimeUse: formData.isOneTimeUse,
  });

  return response.data;
};

export const getAllLinks = async () => {
  const response = await api.get("/links");
  return response.data;
};

export const getLinkById = async (linkId) => {
  const response = await api.get(`/links/${linkId}`);
  return response.data;
};

export const deleteLink = async (linkId) => {
  const response = await api.delete(`/links/${linkId}`);
  return response.data;
};
