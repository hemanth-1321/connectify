import { z } from "zod";
export const signupSchema = z.object({
  fullname: z
    .string()
    .nonempty("Fullname is required.")
    .regex(/^[a-zA-Z\s]*$/, "Fullname must contain only letters and spaces."),
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    ),
});
