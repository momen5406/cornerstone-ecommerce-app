import * as z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least 1 small letter, 1 capital letter, 1 number & 1 symbol"
    ),
});

export default loginSchema;
