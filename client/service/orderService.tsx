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
  } catch (error: any) {
    const errorData = error?.response?.data;
    const status = error?.response?.status;
    const message =
      errorData?.message ||
      error?.message ||
      "Une erreur inconnue s'est produite";

    console.error("Fetch Order Error", {
      message,
      status,
      data: errorData,
      full: error,
    });

    return null;
  }
};
