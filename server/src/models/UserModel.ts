import { model, Document, Schema, ObjectId } from "mongoose"
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
  url?: string
  picture: string
  registeredSince: Date
  ratings: number[]
  address_id: ObjectId
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
  url: { type: Schema.Types.String, required: false },
  picture: {
    type: Schema.Types.String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  registeredSince: { type: Schema.Types.Date, required: true },
  ratings: { type: [Schema.Types.Number], required: true },
  address: { type: Schema.Types.String, required: true },
  user_type: {
    type: Schema.Types.String,
    enum: Object.values(UserTypeEnum),
    required: true,
  },
})

export const UserService = model("User", UserSchema)
