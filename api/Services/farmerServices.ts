import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AppError from "../helpers/appError";
const prisma = new PrismaClient();

class FarmerService {
	static async createFarmer(
		name: string,
		idCardNumber: string,
		birthDate: string
	) {
		// Check for uniqueness of the ID card number
		const existingFarmer = await prisma.farmer.findUnique({
			where: { idCardNumber },
		});

		if (existingFarmer) {
			throw new AppError(200, "ID card number must be unique", 400);
		}

		// Proceed with creation if the ID card number is unique
		return await prisma.farmer.create({
			data: {
				name,
				idCardNumber: idCardNumber.padStart(7, "0"), // Ensure leading zeros
				birthDate: new Date(birthDate),
			},
		});
	}

	static async findAllFarmers() {
		return await prisma.farmer.findMany();
	}

	static async findOneFarmer(id: number) {
		return await prisma.farmer.findUnique({
			where: {
				id: id,
			},
		});
	}
	static async deleteFarmer(id: number) {
		return await prisma.farmer.delete({
			where: {
				id: id,
			},
		});
	}
	static async updateFarmer(
		name: string,
		idCardNumber: string,
		birthDate: string,
		id: number
	) {
		return await prisma.farmer.update({
			where: { id: Number(id) },
			data: {
				name,
				idCardNumber,
				birthDate: new Date(birthDate),
			},
		});
	}
}
export default FarmerService;
