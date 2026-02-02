"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import { Plus, PawPrint } from "lucide-react"
import Link from "next/link"

interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  imageUrl?: string
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPets()
  }, [])

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Pets</h1>
              <p className="text-slate-600">Manage all your furry friends</p>
            </div>
            <Link href="/dashboard/pets/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Pet
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
          ) : pets.length === 0 ? (
            <div className="card text-center py-12">
              <PawPrint className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 mb-2">No pets yet</h2>
              <p className="text-slate-600 mb-6">Add your first pet to start tracking their health</p>
              <Link href="/dashboard/pets/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Your First Pet
              </Link>
            </div>
          ) : (
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
