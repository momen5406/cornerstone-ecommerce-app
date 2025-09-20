import * as z from "zod";

const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  details: z.string().min(1, "Details is required"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter egyptian phone number"),
  city: z.string().min(1, "City is required"),
});

export default addressSchema;
