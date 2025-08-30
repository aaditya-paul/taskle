"use client";

import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  Building,
} from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would create the account with your backend
      console.log("Sign up attempt:", formData);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign up error:", error);
      setErrors({submit: "Failed to create account. Please try again."});
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        setErrors({submit: "Google authentication failed. Please try again."});
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Google auth error:", error);
      setErrors({submit: "Google authentication failed. Please try again."});
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return {strength: 0, label: ""};

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score < 2) return {strength: 25, label: "Weak", color: "bg-red-400"};
    if (score < 4) return {strength: 50, label: "Fair", color: "bg-yellow-400"};
    if (score < 5) return {strength: 75, label: "Good", color: "bg-blue-400"};
    return {strength: 100, label: "Strong", color: "bg-green-400"};
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-virgil text-yellow-300 font-bold mb-3">
            Join Taskle
          </h1>
          <p className="text-lg font-patrick-hand text-foreground/70">
            Start your productivity journey today
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-secondary/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
          {/* Google Auth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full mb-6 px-6 py-4 bg-white/10 border border-gray-600/50 rounded-xl text-foreground font-patrick-hand hover:bg-white/20 hover:border-yellow-400/30 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-secondary/50 font-patrick-hand text-foreground/60">
                or create your account
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/30 border rounded-xl pl-10 pr-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200 ${
                      errors.firstName
                        ? "border-red-400/50"
                        : "border-gray-600/50"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-sm font-patrick-hand mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700/30 border rounded-xl pl-10 pr-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200 ${
                      errors.lastName
                        ? "border-red-400/50"
                        : "border-gray-600/50"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle size={20} className="text-red-400" />
                    </div>
                  )}
                </div>
                {errors.lastName && (
                  <p className="text-red-400 text-sm font-patrick-hand mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/30 border rounded-xl pl-10 pr-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200 ${
                    errors.email ? "border-red-400/50" : "border-gray-600/50"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm font-patrick-hand mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Company Field (Optional) */}
            <div>
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Company <span className="text-foreground/50">(Optional)</span>
              </label>
              <div className="relative">
                <Building
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/30 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/30 border rounded-xl pl-10 pr-12 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200 ${
                    errors.password ? "border-red-400/50" : "border-gray-600/50"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && !showPassword && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                )}
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-patrick-hand text-foreground/60">
                      Password strength
                    </span>
                    <span
                      className={`text-xs font-patrick-hand ${
                        passwordStrength.strength >= 75
                          ? "text-green-400"
                          : passwordStrength.strength >= 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{width: `${passwordStrength.strength}%`}}
                    />
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-400 text-sm font-patrick-hand mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-patrick-hand text-foreground/80 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700/30 border rounded-xl pl-10 pr-12 py-3 text-foreground font-patrick-hand focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200 ${
                    errors.confirmPassword
                      ? "border-red-400/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <CheckCircle size={20} className="text-green-400" />
                    </div>
                  )}
                {errors.confirmPassword && !showConfirmPassword && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm font-patrick-hand mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-yellow-400 bg-gray-700/30 border-gray-600/50 rounded focus:ring-yellow-400/50 focus:ring-2"
                />
                <span className="text-sm font-patrick-hand text-foreground/70 leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-yellow-300 hover:text-yellow-400 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-yellow-300 hover:text-yellow-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-400 text-sm font-patrick-hand mt-1">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-400/10 border border-red-400/30 rounded-xl">
                <p className="text-red-400 text-sm font-patrick-hand flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 font-patrick-hand font-bold rounded-xl hover:from-yellow-400 hover:to-yellow-500 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/20 hover:shadow-2xl"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="font-patrick-hand text-foreground/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-yellow-300 hover:text-yellow-400 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm font-patrick-hand text-foreground/50">
            By creating an account, you&apos;re joining thousands of users who
            trust Taskle to boost their productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
