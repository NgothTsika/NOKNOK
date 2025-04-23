import axios from "axios";
import { appAxios } from "./apiInterceptors";
import { BASE_URL } from "./config";

export const getBranches = async () => {
  const response = await axios.get(`${BASE_URL}/branches`);
  return response.data.branches;
};

export const updateDeliveryPartnerProfile = async (data: any) => {
  const response = await appAxios.patch(`/delivery-partner/update`, data);
  return response.data.user;
};
