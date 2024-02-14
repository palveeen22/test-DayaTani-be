import { Request, Response } from "express";
import FarmerService from "../Services/farmerServices";
import AppError from "../helpers/appError";

class FarmerController {
	static async createFarmerHandler(req: Request, res: Response): Promise<Response> {
        const { name, idCardNumber, birthDate } = req.body;

        // Input validation
        if (!name || !idCardNumber || !birthDate) {
            throw new AppError(201, "Missing required fields",400);
        }

        // Attempt to create the farmer
        await FarmerService.createFarmer(name, idCardNumber, birthDate);

        // Respond with 201 Created status code, no response body
		return res.status(201).json({ message: "Success: Farmer created." });
       
	}
	
	static async getAllFarmers(req: Request, res: Response): Promise<Response> {
		const farmers = await FarmerService.findAllFarmers();

		if (!farmers) {
			throw new AppError(204, "There are no users", 404);
		}

		return res.status(200).json({ farmers });
	}

	static async getOneFarmer(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		// Parse id to number as findOneFarmer expects a number
		const farmerId = Number(id);
		if (!farmerId) {
			return res.status(400).send({ error: "Invalid ID" });
		}

		const farmer = await FarmerService.findOneFarmer(farmerId);
		if (!farmer) {
			return res.status(404).send({ error: "Farmer not found" });
		}

		// Assuming you want to return the farmer object as JSON
		return res.json(farmer);
	}

	static async deleteOneFarmer(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		// Parse id to number as findOneFarmer expects a number
		const farmerId = Number(id);

		if (!farmerId) {
			return res.status(400).send({ error: "Invalid ID" });
		}

		const farmer = await FarmerService.deleteFarmer(farmerId);

		if (!farmer) {
			return res.status(404).send({ error: "Farmer not found" });
		}

		// Assuming you want to return the farmer object as JSON
		return res.status(200).json({ message: "Success: Farmer deleted." });
	}
	static async updateOneFarmer(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, idCardNumber, birthDate } = req.body;

		// Check if the farmer exists
		const farmerExists = await FarmerService.findOneFarmer(+id);
		if (!farmerExists) {
			throw new AppError(204, "Farmer not found", 404);
		}

		// Update the farmer
		await FarmerService.updateFarmer(name, idCardNumber, birthDate, +id);

		return res.status(200).json({ message: "Success: Farmer updated." });
	}
}
export default FarmerController;
