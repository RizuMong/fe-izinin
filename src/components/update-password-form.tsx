"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)
  const router = useRouter()

  const validateInput = (pass: string, confirm: string): string[] => {
    const errs: string[] = []
    
    if (pass.length < 6) {
      errs.push('Password must be at least 6 characters')
    }
    if (!/[A-Z]/.test(pass)) {
      errs.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(pass)) {
      errs.push('Password must contain at least one lowercase letter')
    }
    if (!/[0-9]/.test(pass)) {
      errs.push('Password must contain at least one number')
    }
    if (!/[^A-Za-z0-9]/.test(pass)) {
      errs.push('Password must contain at least one special character')
    }
    if (confirm && pass !== confirm) {
      errs.push('Passwords do not match')
    }
    
    return errs
  }

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace("/auth/login")
        return
      }

      setIsValidSession(true)
    }

    checkSession()
  }, [router])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validationErrors = validateInput(password, confirmPassword)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error: supabaseError } = await supabase.auth.updateUser({ password })
      if (supabaseError) throw supabaseError

      await supabase.auth.signOut()
      router.replace("/auth/login")
    } catch (error: unknown) {
      setErrors([error instanceof Error ? error.message : "Something went wrong. Please try again."])
    } finally {
      setIsLoading(false)
    }
  }

  if (isValidSession === null) return null

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below to complete the reset.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col gap-6">
              {/* New Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    required
                    value={password}
                    onChange={(e) => {
                      const val = e.target.value
                      setPassword(val)
                      if (val || confirmPassword) {
                        setErrors(validateInput(val, confirmPassword))
                      } else {
                        setErrors([])
                      }
                    }}
                    className="pr-10" // Add padding to prevent text overlap with the icon
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      const val = e.target.value
                      setConfirmPassword(val)
                      if (password || val) {
                        setErrors(validateInput(password, val))
                      } else {
                        setErrors([])
                      }
                    }}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errors.length > 0 && (
                <ul className="text-sm text-red-500 font-medium list-disc ml-4 space-y-1">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save New Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}