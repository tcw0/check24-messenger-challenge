import { ValidateOpts } from 'mongoose'

/**
 * Mongoose validator for integer values
 */
export const intValidator: ValidateOpts<unknown> = {
  validator: Number.isInteger,
  message: '{VALUE} is not an integer value',
}

/**
 * Mongoose validator for email addresses
 */
export const emailValidator: ValidateOpts<string> = {
  validator: (value: string): boolean => {
    // Check if the value is a valid email address
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  message: '{VALUE} is not a valid email address',
}

