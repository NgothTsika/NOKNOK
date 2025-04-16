import { appAxios } from "./apiInterceptors";

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: "676deb77f5fe6b6e07e9ca6f",
      totalPrice: totalPrice,
    });
    // const { customer } = response.data;
    return response.data;
  } catch (error) {
    console.error("Create Order Error", error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.log("Fetch Order Error", error);

    return null;
  }
};

export const fetchCustomerOrder = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {}
};
