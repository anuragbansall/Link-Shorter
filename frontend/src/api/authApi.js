import api from "./api";

export const loginUser = async (formData) => {
  const response = await api.post("/users/login", {
    email: formData.email,
    password: formData.password,
  });
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await api.post("/users/register", {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const updateUser = async (formData) => {
  console.log("Updating user with data:", formData);
  const response = await api.put("/users/profile", {
    username: formData.username,
    password: formData.password,
  });

  return response.data;
};
