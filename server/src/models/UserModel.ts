import { model, Document, Schema } from "mongoose"
import { emailValidator } from "./validator"

export enum UserTypeEnum {
  CUSTOMER = "customer",
  SERVICEPROVIDER = "service_provider",
}

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  phone: string
  picture: string
  registeredSince: Date
  rating: number
  address_id: string
  user_type: UserTypeEnum
}

const UserSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  password: { type: Schema.Types.String, required: true },
  phone: { type: Schema.Types.String, required: true },
  picture: {
    type: Schema.Types.String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  registeredSince: { type: Schema.Types.Date, required: true },
  rating: { type: Schema.Types.Number, required: true },
  address_id: { type: Schema.Types.ObjectId, required: true, ref: "Address" },
  user_type: {
    type: Schema.Types.String,
    enum: Object.values(UserTypeEnum),
    required: true,
  },
})

export const UserService = model("User", UserSchema)
