import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { supabase } = useAuth();

  const formatAuthError = (message: string): string => {
    const normalized = message.toLowerCase();
    if (
      normalized.includes("invalid login credentials") ||
      (normalized.includes("invalid") && normalized.includes("password"))
    ) {
      return "Invalid email or password";
    }
    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmittingEmail(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(formatAuthError(error.message));
        return;
      }
      if (data.session) {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(formatAuthError((err as Error).message));
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSubmittingGoogle(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) {
        setErrorMessage(formatAuthError(error.message));
        setIsSubmittingGoogle(false);
      }
    } catch (err) {
      setErrorMessage(formatAuthError((err as Error).message));
      setIsSubmittingGoogle(false);
    }
  };

  return (
    <div className="bg-[#FBFDFF] rounded-3xl p-8 shadow-sm border border-border w-[500px]">
      {/* Header with Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Mic className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-primary font-semibold text-sm">Talk Beta</span>
        </div>

        <h1 className="text-2xl text-left font-bold text-[#001F54] mb-2 text-balance">
          Welcome back to Talk Beta!
        </h1>
        <p className="text-[#616161] text-sm text-left">
          Sign in to continue your fluency journey
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-2"
      >
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-sm font-normal text-[#212121]"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-lg border-border bg-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-normal text-[#212121]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-lg border-border bg-input"
            required
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-border"
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <button
            type="button"
            className="text-sm text-primary cursor-pointer hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isSubmittingEmail || isSubmittingGoogle}
          className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isSubmittingEmail && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"
              aria-hidden="true"
            />
          )}
          {isSubmittingEmail ? "Logging in..." : "Log In"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#FBFDFF] px-4 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isSubmittingEmail || isSubmittingGoogle}
          className="w-full h-12 rounded-lg border-border bg-background hover:bg-muted/50 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {!isSubmittingGoogle && (
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {isSubmittingGoogle && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 border-muted-foreground border-t-transparent animate-spin mr-2"
              aria-hidden="true"
            />
          )}
          {isSubmittingGoogle
            ? "Connecting to Google..."
            : "Sign in with Google"}
        </Button>

        {errorMessage && (
          <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
            {errorMessage}
          </div>
        )}

        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
            >
              <Link to="/signup">Sign Up</Link>
            </button>
          </span>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© Talk Beta 2025</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-primary">Terms</button>
            <button className="hover:text-primary">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
