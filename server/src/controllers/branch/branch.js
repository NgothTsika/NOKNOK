// src/controllers/branch/branch.js
import Branch from "../../models/branch.js";

export const getAllBranches = async (req, reply) => {
  try {
    const branches = await Branch.find();
    return reply.send({ branches });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to load branches", error });
  }
};
export const getBranchById = async (req, reply) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return reply.status(404).send({ message: "Branch not found" });
    }
    return reply.send({ branch });
  } catch (error) {
    return reply.status(500).send({ message: "Failed to load branch", error });
  }
};
export const createBranch = async (req, reply) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    return reply.status(201).send({ branch });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to create branch", error });
  }
};
export const updateBranch = async (req, reply) => {
  try {
    const { userId } = req.user; // Comes from token
    const updates = req.body;

    const updatedUser = await DeliveryPartner.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.send({ user: updatedUser });
  } catch (error) {
    console.error("❌ Error updating delivery partner:", error);
    return reply
      .status(500)
      .send({ message: "Failed to update profile", error });
  }
};
export const deleteBranch = async (req, reply) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) {
      return reply.status(404).send({ message: "Branch not found" });
    }
    return reply.send({ message: "Branch deleted successfully" });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to delete branch", error });
  }
};
export const addDeliveryPartner = async (req, reply) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return reply.status(404).send({ message: "Branch not found" });
    }
    branch.deliveryPartners.push(req.body.deliveryPartnerId);
    await branch.save();
    return reply.send({ branch });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Failed to add delivery partner", error });
  }
};
