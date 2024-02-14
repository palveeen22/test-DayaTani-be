import express from "express";
import FarmerController from "../Controllers/farmerController";
import tryCatch from "../utils/tryCatch";
const router = express.Router();



router.get("/api/farmers", tryCatch(FarmerController.getAllFarmers));
router.get("/api/farmers/:id", tryCatch(FarmerController.getOneFarmer))
router.delete("/api/farmers/:id", tryCatch(FarmerController.deleteOneFarmer))
router.post("/api/farmers", tryCatch(FarmerController.createFarmerHandler))




export default router;
