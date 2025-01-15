"use server";
import prisma from "@/db";
import { Register } from "./types";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const saltRounds = 10;
export async function Signup({ fullname, email, password }: Register) {
  console.log(email, password);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email",
        status: 401,
      };
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: { fullname, email, password: hashedPassword },
    });

    // Create a plain object with serialized dates
    const serializedUser = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return {
      success: true,
      message: "User created successfully",
      user: serializedUser,
      status: 201,
    };
  } catch (error: any) {
    console.log("error creating user", error.message);
    return {
      success: false,
      message: "Signup failed",
      status: 400,
    };
  }
}
