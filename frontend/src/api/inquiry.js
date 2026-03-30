import api from "./axios.js";

export const submitInquiry = async (inquiryData) => {
  const { data } = await api.post("/inquiries", inquiryData);
  return data;
};

export const getInquiries = async (params) => {
  const { data } = await api.get("/inquiries", { params });
  return data;
};

export const updateInquiryStatus = async (id, status) => {
  const { data } = await api.put(`/inquiries/${id}/status`, { status });
  return data;
};
