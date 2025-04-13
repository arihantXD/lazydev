import z from "zod";

export const signUpSchema = z
  .object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    firstName: z.string().nonempty("First name is required").min(3).max(12),
    lastName: z.string().nonempty("Last name is required").min(3).max(12),
    password: z.string().nonempty("Password is required").min(4).max(8),
    confirmPassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(4)
      .max(8),
    aboutMe: z.string().min(150).max(200).optional(),
    phoneNumber: z.string().min(10).max(12).optional(),
    place: z.string().min(3).max(12).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password is not matching",
  });

export const userSchema = z.object({
  id: z.number(),
  aboutMe: z.string().min(150).max(250).optional(),
  phoneNumber: z.string().min(10).max(12).optional(),
  occupation: z.string().min(10).max(25).optional(),
  place: z.string().min(3).max(25).optional(),
});

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required").min(4),
});

export const skillSchema = z.object({
  id: z.number().optional(),
  index: z.number(),
  title: z.string().nonempty("Title is required").min(5).max(30),
  skills: z.string().nonempty("Skills are required").min(20).max(60),
  userId: z.number(),
});

export const educationSchema = z.object({
  id: z.number().optional(),
  index: z.number(),
  school: z.string().nonempty("School is required").min(4).max(30),
  course: z.string().nonempty("Course is required").min(3).max(25),
  score: z.string().nonempty("Score is required").min(1).max(5),
  from: z.string().min(3, "Date is required"),
  to: z.string().min(3, "Date is required"),
  userId: z.number(),
});

export enum Type {
  Personal = "personal",
  Professional = "professional",
}

export const experienceSchema = z.object({
  id: z.number().optional(),
  index: z.number(),
  about: z.string().min(130).max(200).optional(),
  role: z.string().min(3).max(30).optional(),
  companyName: z.string().nonempty("Company name is required").min(4).max(30),
  type: z.nativeEnum(Type),
  from: z.string().min(3, "Date is required"),
  to: z.string().min(3, "Date is required"),
  userId: z.number(),
  tasks: z.array(z.object({ value: z.string().min(90).max(150) })).max(2),
  gitHubLink: z.string().optional(),
  liveLink: z.string().optional(),
});

export const statSchema = z.object({
  id: z.number().optional(),
  index: z.number(),
  title: z.string().nonempty("Title is required").min(4).max(25),
  about: z.string().nonempty("About is required").min(40).max(100),
  userId: z.number(),
});

export enum LinkEnum {
  GitHub = "github",
  LinkedIn = "linkedin",
  Instagram = "instagram",
  Facebook = "facebook",
}

export const linkSchema = z.object({
  id: z.number().optional(),
  index: z.number(),
  title: z.nativeEnum(LinkEnum),
  url: z.string().nonempty("URL is required").url("Invalid URL"),
  userId: z.number(),
});
