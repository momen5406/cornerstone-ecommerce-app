import * as z from "zod";

const checkoutSchema = z.object({
  details: z.string().min(1, "Details is required"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter egyptian phone number"),
  city: z.string().min(1, "City is required"),
});

export default checkoutSchema;
