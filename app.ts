import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import FarmerRoute from "./api/Routes/farmerRoute";
import basicAuth from 'express-basic-auth';
dotenv.config();

//port
const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());


// // Middleware for Basic Authentication
// const myAuthorizer = (username: string, password: string) => {
//   const userMatches = basicAuth.safeCompare(username, 'dayatani');
//   const passwordMatches = basicAuth.safeCompare(password, 'levellingupfarmersatscale');
//   return userMatches && passwordMatches;
// };

// app.use(basicAuth({
//   authorizer: myAuthorizer,
//   challenge: true,
//   unauthorizedResponse: (req:any) => req.auth
//     ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
//     : 'No credentials provided'
// }));

app.use(FarmerRoute);


app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at ${PORT}`)
)
