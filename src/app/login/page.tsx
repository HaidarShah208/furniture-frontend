"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useLoginMutation } from "@/redux/dashboard/apis/auth";
import { setAuthCookie, isAuthenticated } from "@/redux/middleware/auth";
import type { LoginRequest } from "@/types/admin/auth";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        setAuthCookie(result.data.token);
        toast.success("Welcome back!");
        router.push("/admin/dashboard");
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f7] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-luxury-dark">
            LUXE <span className="text-luxury-gold">Admin</span>
          </h1>
          <p className="mt-1 text-sm text-luxury-muted">Sign in to your dashboard</p>
        </div>

        <div className="rounded-2xl border border-luxury-border bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-luxury-border bg-white px-4 py-3 text-sm text-luxury-dark transition-all duration-200 placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-luxury-dark">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-luxury-border bg-white px-4 py-3 pr-10 text-sm text-luxury-dark transition-all duration-200 placeholder:text-luxury-muted focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-luxury-dark"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-dark py-3 text-sm font-semibold text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="mt-4 text-center text-[11px] text-luxury-muted">
          admin@example.com / Admin@123
        </p>
      </motion.div>
    </div>
  );
}
