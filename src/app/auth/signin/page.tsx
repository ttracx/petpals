"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PawPrint, Mail, User } from "lucide-react"
import Link from "next/link"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await signIn("credentials", {
      email,
      name,
      redirect: false,
    })
    
    if (result?.ok) {
      router.push("/dashboard")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <PawPrint className="w-10 h-10 text-violet-600" />
            <span className="text-2xl font-bold text-slate-900">PetPals</span>
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">Welcome to PetPals</h1>
          <p className="text-slate-600">Sign in or create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <User className="w-4 h-4 inline mr-1" />
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="label">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
