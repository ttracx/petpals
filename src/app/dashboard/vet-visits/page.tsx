"use client"

import Sidebar from "@/components/sidebar"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VetVisits() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Vet Visits</h1>
          <p className="text-slate-600 mb-8">Track all veterinary appointments across your pets</p>

          <div className="card text-center py-12">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">View Vet Visits by Pet</h2>
            <p className="text-slate-600 mb-6">Select a pet to view and manage their vet visit history</p>
            <Link href="/dashboard/pets" className="btn-primary inline-flex items-center gap-2">
              Go to Pets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
