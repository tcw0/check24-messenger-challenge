import { model, Document, Schema } from "mongoose"

export interface AddressDocument extends Document {
  street: string
  city: string
  zipCode: string
}

const AddressSchema = new Schema({
  street: { type: Schema.Types.String, required: true },
  city: { type: Schema.Types.String, required: true },
  zipCode: { type: Schema.Types.String, required: true },
})

export const AddressService = model("Address", AddressSchema)
