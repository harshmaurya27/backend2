import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // req has cookies access
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", ""); // mobile application may not have cookies so header in postman we send like Authorization : Bearer <token>

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id).select(
      "password -refreshToken"
    );
    if (!user) {
      // TODO next video: discuss about frontend
      throw new ApiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
