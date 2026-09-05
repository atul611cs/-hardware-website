import api from "./axios.js";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
