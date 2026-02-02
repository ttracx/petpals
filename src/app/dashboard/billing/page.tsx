"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import Sidebar from "@/components/sidebar"
import { CreditCard, Check, Sparkles } from "lucide-react"

export default function Billing() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Billing</h1>
          <p className="text-slate-600 mb-8">Manage your subscription and payment methods</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="card">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Free Plan</h2>
              <p className="text-3xl font-bold text-slate-900 mb-4">$0<span className="text-lg font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <PlanFeature>Up to 2 pets</PlanFeature>
                <PlanFeature>Basic health tracking</PlanFeature>
                <PlanFeature>Vet visit history</PlanFeature>
                <PlanFeature>5 photos per pet</PlanFeature>
              </ul>
              <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-center font-medium">
                Current Plan
              </div>
            </div>

            {/* Premium Plan */}
            <div className="card border-violet-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Premium
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Premium Plan</h2>
              <p className="text-3xl font-bold text-slate-900 mb-4">$4.99<span className="text-lg font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 mb-6">
                <PlanFeature>Unlimited pets</PlanFeature>
                <PlanFeature>Advanced health analytics</PlanFeature>
                <PlanFeature>Medication reminders</PlanFeature>
                <PlanFeature>Unlimited photo storage</PlanFeature>
                <PlanFeature>Export health records</PlanFeature>
                <PlanFeature>Priority support</PlanFeature>
              </ul>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {loading ? "Loading..." : "Upgrade to Premium"}
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="card mt-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment History</h2>
            <p className="text-slate-500 text-center py-8">No payment history yet</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function PlanFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-slate-600">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      {children}
    </li>
  )
}
