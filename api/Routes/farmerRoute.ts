import express from "express";
import FarmerController from "../Controllers/farmerController";
import tryCatch from "../utils/tryCatch";
const router = express.Router();



router.post("/api/farmers", tryCatch(FarmerController.createFarmerHandler))
router.get("/api/farmers", tryCatch(FarmerController.getAllFarmers));
router.get("/api/farmers/:id", tryCatch(FarmerController.getOneFarmer))
router.put("/api/farmers/:id", tryCatch(FarmerController.updateOneFarmer))
router.delete("/api/farmers/:id", tryCatch(FarmerController.deleteOneFarmer))





export default router;
