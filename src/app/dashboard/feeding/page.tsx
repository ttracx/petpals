"use client"

import Sidebar from "@/components/sidebar"
import { Utensils, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Feeding() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Feeding Schedules</h1>
          <p className="text-slate-600 mb-8">Manage feeding times and portions for all your pets</p>

          <div className="card text-center py-12">
            <Utensils className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">View Feeding by Pet</h2>
            <p className="text-slate-600 mb-6">Select a pet to view and manage their feeding schedule</p>
            <Link href="/dashboard/pets" className="btn-primary inline-flex items-center gap-2">
              Go to Pets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
