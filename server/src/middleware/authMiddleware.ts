import jwt from "jsonwebtoken"
import { UserService } from "../models/UserModel"
import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"

interface JwtPayload {
  id: string
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]

        const { id } = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload

        req.user = await UserService.findById(id).select("-password")

        next()
      } catch (error) {
        console.error(error)
        res.status(401).send()
        throw new Error("Not authorized, token failed")
      }
    }

    if (!token) {
      res.status(401)
      throw new Error("Not authorized, no token")
    }
  }
)
