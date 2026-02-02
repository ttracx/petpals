"use client"

import Sidebar from "@/components/sidebar"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Health() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Health Records</h1>
          <p className="text-slate-600 mb-8">View vaccinations, conditions, and health history</p>

          <div className="card text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">View Health Records by Pet</h2>
            <p className="text-slate-600 mb-6">Select a pet to view and manage their health records</p>
            <Link href="/dashboard/pets" className="btn-primary inline-flex items-center gap-2">
              Go to Pets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
