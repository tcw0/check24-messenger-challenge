import { AddressDocument, AddressService } from "../models/AddressModel"

export const createNewAddress = async (
  address: AddressDocument
): Promise<AddressDocument> => {
  const newAddress = await AddressService.create({
    street: address.street,
    city: address.city,
    zipCode: address.zipCode,
  })

  if (!newAddress) {
    throw new Error("Could not create new address.")
  }
  return newAddress
}
