import { appAxios } from "./apiInterceptors";

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: "6806d094424ef428b0d84df9",
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

export const fetchCustomerOrders = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {
    console.log("Fectch Customer Order Error", error);
    return;
  }
};

export const fetchOrders = async (
  status: string,
  userId: string,
  branchId: string
) => {
  let uri =
    status == "pending"
      ? `/order?status=${status}&branchId=${branchId}`
      : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

  try {
    const response = await appAxios.get(uri);
    return response.data;
  } catch (error) {
    console.log("Fectch Delivery Order Error", error);
    return;
  }
};

export const sendLiveOrderUpdates = async (
  id: string,
  location: any,
  status: string
) => {
  try {
    const response = await appAxios.patch(`/order/${id}/status`, {
      deliveryPersonLocation: location,
      status,
    });
    return response.data;
  } catch (error) {
    console.log("sendLiveOrderUpdates Error", error);

    return null;
  }
};
export const confirmOrder = async (id: string, location: any) => {
  try {
    const response = await appAxios.post(`/order/${id}/confirm`, {
      deliveryPersonLocation: location,
    });
    return response.data;
  } catch (error) {
    console.log("confirmOrder Error", error);

    return null;
  }
};

export const initiatePayment = async (
  orderId: string,
  amount: number,
  phoneNumber: string
) => {
  try {
    const response = await appAxios.post(`/payment/initiate`, {
      orderId,
      amount,
      phoneNumber,
    });
    return response.data; // Return payment initiation response
  } catch (error) {
    console.error("Initiate Payment Error", error);
    return null;
  }
};

export const checkPaymentStatus = async (paymentId: string) => {
  try {
    const response = await appAxios.get(`/payment/status/${paymentId}`);
    return response.data; // Return payment status
  } catch (error) {
    console.error("Check Payment Status Error", error);
    return null;
  }
};
