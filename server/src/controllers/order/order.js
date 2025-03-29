import Branch from "../../models/branch.js";
import Order from "../../models/order.js";
import { Customer, DeliveryPartner } from "../../models/user.js";

// Create order
export const createOrder = async (req, reply) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;

    const customerData = await Customer.findById(userId);
    const branchData = await Branch.findById(branch);

    if (!customerData) {
      return reply.status(404).send({ message: " Customer not fund" });
    }

    const newOrder = new Order({
      customer: userId,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      branch,
      totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation.latitude,
        longitude: customerData.liveLocation.longitude,
        address: customerData.address || "No address available",
      },
      pickupLocation: {
        latitude: branchData.location.latitude,
        longitude: branchData.location.longitude,
        address: branchData.address || "No address available",
      },
    });
    const savedOrder = await newOrder.save();
    return reply.status(201).send(savedOrder);
  } catch (err) {
    console.log(err);
    return reply.status(500).send({ message: "Failed to create order", err });
  }
};

// Confirm order
export const confirmOrder = async (req, reply) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.user;
    const { deliveryPersonLocation } = req.body;

    const deliveryPerson = await DeliveryPartner.findById(userId);
    if (!deliveryPerson) {
      return reply.status(404).send({ message: " Delivery Person not found" });
    }
    const order = await Order.findById(orderId);
    if (!order) return reply.status(404).send({ message: " Order not found" });

    if (order.status !== "pending") {
      return reply.status(400).send({ message: "Order is not available" });
    }
    order.status = "confirmed";

    order.deliveryPartner = userId;
    order.deliveryPersonLocation = {
      latitude: deliveryPersonLocation?.latitude,
      longitude: deliveryPersonLocation?.longitude,
      address: deliveryPersonLocation.address || "",
    };

    req.server.io.to(orderId).emit("orderConfirmed", order);

    await order.save();
    return reply.send(order);
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to confirm order", error });
  }
};

// Update order
export const updateOrderStatus = async (req, reply) => {
  try {
    const { orderId } = req.params;
    const { status, deliveryPersonLocation } = req.body;
    const user = req.user;

    console.log(`Received orderId: ${orderId}`);
    console.log(`Received status: ${status}`);
    console.log(`Received deliveryPersonLocation: ${deliveryPersonLocation}`);
    console.log(`Received user object:`, user);

    // Extract userId from the user object
    const userId = user.userId?._id || user.userId || user._id;

    console.log(`Extracted userId: ${userId}`);

    const deliveryPerson = await DeliveryPartner.findById(userId);
    if (!deliveryPerson) {
      console.log(`Delivery Person with id ${userId} not found`);
      return reply.status(404).send({ message: "Delivery Person not found" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      console.log(`Order with id ${orderId} not found`);
      return reply.status(404).send({ message: "Order not found" });
    }

    if (["cancelled", "delivered"].includes(order.status)) {
      console.log(
        `Order with id ${orderId} cannot be updated because it is ${order.status}`
      );
      return reply.status(400).send({ message: "Order cannot be updated" });
    }

    if (order.deliveryPartner.toString() !== userId.toString()) {
      console.log(
        `Unauthorized update attempt by user ${JSON.stringify(
          req.user
        )} on order ${orderId}`
      );
      return reply.status(403).send({ message: "Unauthorized" });
    }

    order.status = status;
    order.deliveryPersonLocation = deliveryPersonLocation;
    await order.save();

    req.server.io.to(orderId).emit("liveTrackingUpdetes", order);

    console.log(`Order with id ${orderId} successfully updated`);
    return reply.send(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    return reply
      .status(500)
      .send({ message: "Failed to update order status", error });
  }
};

// get orders
export const getOrders = async (req, reply) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }
    if (customerId) {
      query.customer = customerId;
    }
    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId;
      query.branch = branchId;
    }

    console.log("Querying orders with:", query);

    const orders = await Order.find(query).populate(
      "customer branch items.item deliveryPartner"
    );
    return reply.send(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return reply
      .status(500)
      .send({ message: "Failed to retrieve orders", error });
  }
};

// retrieved order by id
export const getOrderById = async (req, reply) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate(
      "customer branch items.item deliveryPartner"
    );

    if (!order) {
      return reply.status(404).send({ message: " order not found" });
    }
    return reply.send(order);
  } catch (error) {
    console.log("Error retrieving order:", error);

    return reply
      .status(500)
      .send({ message: "Failed to retrieve orders", error });
  }
};
