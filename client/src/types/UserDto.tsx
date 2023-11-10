export enum UserTypeEnum {
  CUSTOMER = "customer",
  SERVICEPROVIDER = "service_provider",
}

export type UserDto = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  url?: string
  picture: string
  registeredSince: Date
  rating: number
  address_id: string
  user_type: UserTypeEnum
}
