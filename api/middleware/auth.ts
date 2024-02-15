import basicAuth from 'express-basic-auth';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Define the authorizer function
const myAuthorizer = (username: string, password: string) => {
  const userMatches = basicAuth.safeCompare(username, process.env.AUTH_USERNAME || '');
  const passwordMatches = basicAuth.safeCompare(password, process.env.AUTH_PASSWORD || '');
  return userMatches && passwordMatches;
};

// Define the unauthorized response function
const getUnauthorizedResponse = (req: basicAuth.IBasicAuthedRequest) => {
  return req.auth
    ? `Credentials ${req.auth.user}:${req.auth.password} rejected`
    : 'No credentials provided';
};

// Create and export the middleware
export const authMiddleware = basicAuth({
  authorizer: myAuthorizer,
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
});
