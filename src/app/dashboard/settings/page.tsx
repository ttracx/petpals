"use client"

import { useSession } from "next-auth/react"
import Sidebar from "@/components/sidebar"
import { User, Mail, Bell } from "lucide-react"

export default function Settings() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600 mb-8">Manage your account preferences</p>

          {/* Profile */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input type="text" value={session?.user?.name || ""} className="input" readOnly />
              </div>
              <div>
                <label className="label flex items-center gap-1">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input type="email" value={session?.user?.email || ""} className="input" readOnly />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-violet-600" />
                <span className="text-slate-700">Medication reminders</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-violet-600" />
                <span className="text-slate-700">Vet appointment reminders</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-violet-600" />
                <span className="text-slate-700">Feeding schedule alerts</span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
