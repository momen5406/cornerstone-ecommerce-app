import * as z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters"),
    email: z.email("Invalid Email"),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 1 small letter, 1 capital letter, 1 number & 1 symbol"
      ),
    rePassword: z.string(),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter egyptian phone number"),
  })
  .refine((values) => values.password === values.rePassword, {
    message: "Password Doesn't match",
    path: ["rePassword"],
  });

export default registerSchema;
