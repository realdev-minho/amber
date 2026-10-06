import { z } from "zod";

const nameRegex = /^[A-Za-z\s'-]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

export const addressSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .regex(nameRegex, "Full name cannot contain numbers"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Enter a valid phone number (10-15 digits)"),
  street: z.string().trim().min(5, "Street address is required"),
  apartment: z.string().trim().optional(),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  country: z.string().trim().min(2, "Country is required"),
  postalCode: z.string().trim().min(3, "Postal code is required"),
  isDefault: z.boolean().default(false),
});

export const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "transfer", "ussd", "paystack", "crypto"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  savePaymentInfo: z.boolean().default(false),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
