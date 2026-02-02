"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { PawPrint, Home, Calendar, Pill, Utensils, Camera, FileText, CreditCard, LogOut, Settings } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/pets", label: "My Pets", icon: PawPrint },
  { href: "/dashboard/vet-visits", label: "Vet Visits", icon: Calendar },
  { href: "/dashboard/medications", label: "Medications", icon: Pill },
  { href: "/dashboard/feeding", label: "Feeding", icon: Utensils },
  { href: "/dashboard/photos", label: "Photos", icon: Camera },
  { href: "/dashboard/health", label: "Health Records", icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col">
      <Link href="/" className="flex items-center gap-2 px-4 py-3 mb-6">
        <PawPrint className="w-8 h-8 text-violet-600" />
        <span className="text-xl font-bold text-slate-900">PetPals</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 pt-4 space-y-1">
        <Link
          href="/dashboard/billing"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <CreditCard className="w-5 h-5" />
          Billing
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
