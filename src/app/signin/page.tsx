"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.error("Authentication error:", res.error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please check your credentials ",
        });
      } else {
        toast({ description: "Sigin successful!" });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="max-w-sm w-full mt-24 md:mt-6 lg:mt-6 mx-auto rounded-lg p-8 shadow-input bg-slate-200 dark:bg-black">
      <h2 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 text-center">
        Welcome back to Connectify
      </h2>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="email@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 dark:to-zinc-800 w-full text-white rounded h-9 font-medium"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in" : "Sign in"} &rarr;
        </button>

        <div className="border-t border-neutral-300 dark:border-neutral-700 my-4" />

        <div className="space-y-3">
          <button
            className="flex items-center justify-center space-x-2 w-full h-9 bg-gray-50 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-300 rounded"
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <IconBrandGithub className="h-4 w-4" />
            <span>GitHub</span>
          </button>
          <button
            className="flex items-center justify-center space-x-2 w-full h-9 bg-gray-50 dark:bg-zinc-900 text-neutral-700 dark:text-neutral-300 rounded"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <IconBrandGoogle className="h-4 w-4" />
            <span>Google</span>
          </button>
        </div>
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
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
