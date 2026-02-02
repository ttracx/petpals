"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPet() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    species: "dog",
    breed: "",
    birthDate: "",
    weight: "",
    color: "",
    microchipId: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          weight: form.weight ? parseFloat(form.weight) : null,
          birthDate: form.birthDate ? new Date(form.birthDate).toISOString() : null,
        }),
      })

      if (res.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Failed to create pet:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="card">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Pet</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Pet Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Species *</label>
                  <select
                    value={form.species}
                    onChange={(e) => setForm({ ...form, species: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="fish">Fish</option>
                    <option value="reptile">Reptile</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="hamster">Hamster</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Breed</label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                    className="input"
                    placeholder="e.g., Golden Retriever"
                  />
                </div>
                <div>
                  <label className="label">Birth Date</label>
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    className="input"
                    placeholder="e.g., 25.5"
                  />
                </div>
                <div>
                  <label className="label">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="input"
                    placeholder="e.g., Golden"
                  />
                </div>
              </div>

              <div>
                <label className="label">Microchip ID</label>
                <input
                  type="text"
                  value={form.microchipId}
                  onChange={(e) => setForm({ ...form, microchipId: e.target.value })}
                  className="input"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="label">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input min-h-[100px]"
                  placeholder="Any additional information about your pet..."
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? "Adding Pet..." : "Add Pet"}
                </button>
                <Link href="/dashboard" className="btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
