import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import FarmerRoute from "./api/Routes/farmerRoute";
import { authMiddleware } from "./api/middleware/auth";
dotenv.config();

//port
const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// authentication
app.use(authMiddleware);

// farmer routers
app.use(FarmerRoute);


app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at ${PORT}`)
)
