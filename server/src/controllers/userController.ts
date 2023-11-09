/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from "express-async-handler"
import { UserService, UserTypeEnum } from "../models/UserModel"
import { generateToken } from "../config/generateToken"
import bcrypt from "bcrypt"

export const convertUserType = (user_type: string): UserTypeEnum => {
  switch (user_type) {
    case "customer":
      return UserTypeEnum.CUSTOMER
    case "service_provider":
      return UserTypeEnum.SERVICEPROVIDER
    default:
      throw new Error("Invalid user type.")
  }
}

export const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, url, picture, address, user_type } =
    req.body

  if (!name || !email || !password || !phone || !address || !user_type) {
    res.status(400).send()
    throw new Error("Please enter all necessary information")
  }

  // Create Salt to ensure same passwords don't have the same hash value
  const salt = await bcrypt.genSalt()
  // Hash password including salt
  const hash = await bcrypt.hash(password, salt)

  if (await UserService.findOne({ email: email })) {
    res.status(400).send()
    throw new Error("User with this email already exists.")
  }

  const newUser = await UserService.create({
    name: name,
    email: email,
    password: hash,
    phone: phone,
    url: url,
    picture: picture,
    registeredSince: new Date(),
    rating: -1,
    address: address,
    user_type: convertUserType(user_type),
  })

  if (!newUser) {
    res.status(400).send()
    throw new Error("Error creating new user.")
  }

  res.status(200).json({
    id: newUser._id,
    name: newUser.name,
    picture: newUser.picture,
    token: generateToken(newUser._id),
  })
})

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await UserService.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).send()
    throw new Error("Invalid email or password.")
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    picture: user.picture,
    token: generateToken(user._id),
  })
})
