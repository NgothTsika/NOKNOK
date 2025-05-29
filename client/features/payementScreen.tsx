import { initiatePayment, checkPaymentStatus } from "@/service/orderService";

const handlePayment = async () => {
  const orderId = "12345"; // Replace with actual order ID
  const amount = 100; // Replace with actual amount
  const phoneNumber = "233XXXXXXXXX"; // Replace with customer's phone number

  const paymentResponse = await initiatePayment(orderId, amount, phoneNumber);

  if (paymentResponse) {
    console.log("Payment Initiated:", paymentResponse);

    // Check payment status after some time
    setTimeout(async () => {
      const statusResponse = await checkPaymentStatus(
        paymentResponse.paymentId
      );
      console.log("Payment Status:", statusResponse);
    }, 5000);
  } else {
    console.error("Failed to initiate payment");
  }
};
