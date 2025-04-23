// src/routes/branch.js
import {
  createBranch,
  deleteBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
} from "../controllers/branch/branch.js";

export const branchRoutes = async (fastify, options) => {
  fastify.get("/branches", getAllBranches);
  fastify.get("/branches/:id", getBranchById);
  fastify.post("/branches", createBranch);
  fastify.put("/branches/:id", updateBranch);
  fastify.delete("/branches/:id", deleteBranch);
};
