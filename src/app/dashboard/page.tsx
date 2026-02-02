"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Plus, PawPrint, Calendar, Pill, Heart } from "lucide-react"
import Link from "next/link"

interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  imageUrl?: string
  _count: {
    vetVisits: number
    medications: number
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPets()
    }
  }, [session])

  const fetchPets = async () => {
    try {
      const res = await fetch("/api/pets")
      const data = await res.json()
      setPets(data)
    } catch (error) {
      console.error("Failed to fetch pets:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome back, {session?.user?.name}!</h1>
              <p className="text-slate-600">Here's an overview of your pets</p>
            </div>
            <Link href="/dashboard/pets/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Pet
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="card text-center py-12">
              <PawPrint className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 mb-2">No pets yet</h2>
              <p className="text-slate-600 mb-6">Add your first pet to start tracking their health</p>
              <Link href="/dashboard/pets/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Your First Pet
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={<PawPrint className="w-6 h-6 text-violet-600" />} label="Total Pets" value={pets.length} />
                <StatCard icon={<Calendar className="w-6 h-6 text-blue-600" />} label="Vet Visits" value={pets.reduce((acc, p) => acc + p._count.vetVisits, 0)} />
                <StatCard icon={<Pill className="w-6 h-6 text-green-600" />} label="Active Meds" value={pets.reduce((acc, p) => acc + p._count.medications, 0)} />
                <StatCard icon={<Heart className="w-6 h-6 text-rose-600" />} label="Healthy Pets" value={pets.length} />
              </div>

              {/* Pet Grid */}
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Pets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <Link key={pet.id} href={`/dashboard/pets/${pet.id}`}>
                    <div className="card hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                          {pet.imageUrl ? (
                            <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                          ) : (
                            <PawPrint className="w-8 h-8 text-violet-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{pet.name}</h3>
                          <p className="text-slate-600 capitalize">{pet.breed || pet.species}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-500">{pet._count.vetVisits} vet visits</span>
                        <span className="text-sm text-slate-500">{pet._count.medications} medications</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="p-3 bg-slate-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  )
}
