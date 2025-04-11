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
