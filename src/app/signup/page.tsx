"use client";

import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { Signup } from "../actions/signup";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signupSchema } from "./schema";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [fullname, setFullname] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullname: string;
    email: string;
    password: string;
  }>({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const validatedData = signupSchema.parse({
        fullname,
        email,
        password,
      });

      // Call signup action with validated data
      const response = await Signup(validatedData);
      if (response.status === 201) {
        toast({ description: "Signup successful!" });
        router.push("/");
        console.log("Form submitted successfully");
      } else {
        if (response.status == 401) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "A user already exists with this email.",
            action: (
              <ToastAction altText="Please Login">Please Login</ToastAction>
            ),
          });
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false); // Set loading to false after submission process
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-24 lg:mt-4 md:mt-4 rounded-none  md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-200 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Connectify!
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4 ">
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Tyler Durden"
            type="text"
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm">{errors.fullname}</span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="projectmayhem@fc.com"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
          type="submit"
          onClick={() => handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing up" : "Sign up"} &rarr;
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
