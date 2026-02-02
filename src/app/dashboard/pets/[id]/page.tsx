"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { ArrowLeft, PawPrint, Calendar, Pill, Utensils, Camera, FileText, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface Pet {
  id: string
  name: string
  species: string
  breed?: string
  birthDate?: string
  weight?: number
  color?: string
  microchipId?: string
  imageUrl?: string
  notes?: string
  vetVisits: any[]
  medications: any[]
  feedingSchedules: any[]
  photos: any[]
  healthRecords: any[]
}

export default function PetDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchPet()
  }, [id])

  const fetchPet = async () => {
    try {
      const res = await fetch(`/api/pets/${id}`)
      if (res.ok) {
        const data = await res.json()
        setPet(data)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Failed to fetch pet:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePet = async () => {
    if (!confirm("Are you sure you want to delete this pet? This cannot be undone.")) return
    
    await fetch(`/api/pets/${id}`, { method: "DELETE" })
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (!pet) return null

  const tabs = [
    { id: "overview", label: "Overview", icon: PawPrint },
    { id: "vet-visits", label: "Vet Visits", icon: Calendar },
    { id: "medications", label: "Medications", icon: Pill },
    { id: "feeding", label: "Feeding", icon: Utensils },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "health", label: "Health Records", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          {/* Pet Header */}
          <div className="card mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                  {pet.imageUrl ? (
                    <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                  ) : (
                    <PawPrint className="w-10 h-10 text-violet-600" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{pet.name}</h1>
                  <p className="text-slate-600 capitalize">{pet.breed || pet.species}</p>
                  {pet.birthDate && (
                    <p className="text-sm text-slate-500">
                      Born {format(new Date(pet.birthDate), "MMMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/pets/${id}/edit`} className="btn-secondary inline-flex items-center gap-1">
                  <Edit className="w-4 h-4" /> Edit
                </Link>
                <button onClick={deletePet} className="btn-danger inline-flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="card">
            {activeTab === "overview" && <OverviewTab pet={pet} />}
            {activeTab === "vet-visits" && <VetVisitsTab pet={pet} onRefresh={fetchPet} />}
            {activeTab === "medications" && <MedicationsTab pet={pet} onRefresh={fetchPet} />}
            {activeTab === "feeding" && <FeedingTab pet={pet} onRefresh={fetchPet} />}
            {activeTab === "photos" && <PhotosTab pet={pet} onRefresh={fetchPet} />}
            {activeTab === "health" && <HealthTab pet={pet} onRefresh={fetchPet} />}
          </div>
        </div>
      </main>
    </div>
  )
}

function OverviewTab({ pet }: { pet: Pet }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard label="Species" value={pet.species} />
        <InfoCard label="Breed" value={pet.breed || "Unknown"} />
        <InfoCard label="Weight" value={pet.weight ? `${pet.weight} lbs` : "Not set"} />
        <InfoCard label="Color" value={pet.color || "Not set"} />
      </div>
      {pet.microchipId && (
        <div>
          <h3 className="font-medium text-slate-900 mb-1">Microchip ID</h3>
          <p className="text-slate-600 font-mono">{pet.microchipId}</p>
        </div>
      )}
      {pet.notes && (
        <div>
          <h3 className="font-medium text-slate-900 mb-1">Notes</h3>
          <p className="text-slate-600">{pet.notes}</p>
        </div>
      )}
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-900 capitalize">{value}</p>
    </div>
  )
}

function VetVisitsTab({ pet, onRefresh }: { pet: Pet; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ visitDate: "", reason: "", diagnosis: "", treatment: "", vetName: "", vetClinic: "", cost: "", notes: "", nextVisit: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/pets/${pet.id}/vet-visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cost: form.cost ? parseFloat(form.cost) : null }),
    })
    setShowForm(false)
    setForm({ visitDate: "", reason: "", diagnosis: "", treatment: "", vetName: "", vetClinic: "", cost: "", notes: "", nextVisit: "" })
    onRefresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Vet Visits</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Visit
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Visit Date *</label>
              <input type="date" value={form.visitDate} onChange={(e) => setForm({ ...form, visitDate: e.target.value })} className="input" required />
            </div>
            <div>
              <label className="label">Reason *</label>
              <input type="text" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="input" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Vet Name</label>
              <input type="text" value={form.vetName} onChange={(e) => setForm({ ...form, vetName: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Clinic</label>
              <input type="text" value={form.vetClinic} onChange={(e) => setForm({ ...form, vetClinic: e.target.value })} className="input" />
            </div>
          </div>
          <div>
            <label className="label">Diagnosis</label>
            <textarea value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Treatment</label>
            <textarea value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} className="input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Cost ($)</label>
              <input type="number" step="0.01" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Next Visit</label>
              <input type="date" value={form.nextVisit} onChange={(e) => setForm({ ...form, nextVisit: e.target.value })} className="input" />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary">Save Visit</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {pet.vetVisits.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No vet visits recorded yet</p>
      ) : (
        <div className="space-y-3">
          {pet.vetVisits.map((visit: any) => (
            <div key={visit.id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900">{visit.reason}</p>
                  <p className="text-sm text-slate-600">{format(new Date(visit.visitDate), "MMMM d, yyyy")}</p>
                  {visit.vetClinic && <p className="text-sm text-slate-500">{visit.vetClinic}</p>}
                </div>
                {visit.cost && <span className="text-violet-600 font-medium">${visit.cost.toFixed(2)}</span>}
              </div>
              {visit.diagnosis && <p className="text-sm text-slate-600 mt-2">{visit.diagnosis}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MedicationsTab({ pet, onRefresh }: { pet: Pet; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", dosage: "", frequency: "daily", startDate: "", endDate: "", timeOfDay: "morning", instructions: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/pets/${pet.id}/medications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setShowForm(false)
    setForm({ name: "", dosage: "", frequency: "daily", startDate: "", endDate: "", timeOfDay: "morning", instructions: "" })
    onRefresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Medications</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Medication
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Medication Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
            </div>
            <div>
              <label className="label">Dosage *</label>
              <input type="text" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} className="input" placeholder="e.g., 50mg" required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Frequency *</label>
              <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className="input">
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as-needed">As Needed</option>
              </select>
            </div>
            <div>
              <label className="label">Time of Day</label>
              <select value={form.timeOfDay} onChange={(e) => setForm({ ...form, timeOfDay: e.target.value })} className="input">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div>
              <label className="label">Start Date *</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input" required />
            </div>
          </div>
          <div>
            <label className="label">Instructions</label>
            <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} className="input" placeholder="e.g., Give with food" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary">Save Medication</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {pet.medications.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No medications recorded yet</p>
      ) : (
        <div className="space-y-3">
          {pet.medications.map((med: any) => (
            <div key={med.id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900">{med.name}</p>
                  <p className="text-sm text-slate-600">{med.dosage} • {med.frequency} • {med.timeOfDay}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${med.isActive ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>
                  {med.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {med.instructions && <p className="text-sm text-slate-500 mt-2">{med.instructions}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FeedingTab({ pet, onRefresh }: { pet: Pet; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ mealName: "breakfast", time: "08:00", foodType: "", portion: "", notes: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/pets/${pet.id}/feeding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setShowForm(false)
    setForm({ mealName: "breakfast", time: "08:00", foodType: "", portion: "", notes: "" })
    onRefresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Feeding Schedule</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Schedule
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Meal *</label>
              <select value={form.mealName} onChange={(e) => setForm({ ...form, mealName: e.target.value })} className="input">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div>
              <label className="label">Time *</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Food Type *</label>
              <input type="text" value={form.foodType} onChange={(e) => setForm({ ...form, foodType: e.target.value })} className="input" placeholder="e.g., Dry kibble" required />
            </div>
            <div>
              <label className="label">Portion *</label>
              <input type="text" value={form.portion} onChange={(e) => setForm({ ...form, portion: e.target.value })} className="input" placeholder="e.g., 1 cup" required />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary">Save Schedule</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {pet.feedingSchedules.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No feeding schedules set up yet</p>
      ) : (
        <div className="space-y-3">
          {pet.feedingSchedules.map((schedule: any) => (
            <div key={schedule.id} className="bg-slate-50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900 capitalize">{schedule.mealName}</p>
                <p className="text-sm text-slate-600">{schedule.foodType} • {schedule.portion}</p>
              </div>
              <span className="text-lg font-medium text-violet-600">{schedule.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PhotosTab({ pet, onRefresh }: { pet: Pet; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ url: "", caption: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/pets/${pet.id}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setShowForm(false)
    setForm({ url: "", caption: "" })
    onRefresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Photo Gallery</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
          <div>
            <label className="label">Photo URL *</label>
            <input type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="input" placeholder="https://..." required />
          </div>
          <div>
            <label className="label">Caption</label>
            <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="input" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary">Add Photo</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {pet.photos.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No photos added yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pet.photos.map((photo: any) => (
            <div key={photo.id} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
              <img src={photo.url} alt={photo.caption || "Pet photo"} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HealthTab({ pet, onRefresh }: { pet: Pet; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ recordDate: "", recordType: "weight", title: "", value: "", unit: "", notes: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/pets/${pet.id}/health`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setShowForm(false)
    setForm({ recordDate: "", recordType: "weight", title: "", value: "", unit: "", notes: "" })
    onRefresh()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Health Records</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Record
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Record Type *</label>
              <select value={form.recordType} onChange={(e) => setForm({ ...form, recordType: e.target.value })} className="input">
                <option value="weight">Weight</option>
                <option value="vaccination">Vaccination</option>
                <option value="allergy">Allergy</option>
                <option value="condition">Condition</option>
                <option value="surgery">Surgery</option>
              </select>
            </div>
            <div>
              <label className="label">Date *</label>
              <input type="date" value={form.recordDate} onChange={(e) => setForm({ ...form, recordDate: e.target.value })} className="input" required />
            </div>
          </div>
          <div>
            <label className="label">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="e.g., Rabies Vaccine" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Value</label>
              <input type="text" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="input" placeholder="e.g., 25" />
            </div>
            <div>
              <label className="label">Unit</label>
              <input type="text" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input" placeholder="e.g., lbs" />
            </div>
          </div>
          <div>
            <label className="label">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary">Save Record</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {pet.healthRecords.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No health records yet</p>
      ) : (
        <div className="space-y-3">
          {pet.healthRecords.map((record: any) => (
            <div key={record.id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 capitalize mb-1">{record.recordType}</span>
                  <p className="font-medium text-slate-900">{record.title}</p>
                  <p className="text-sm text-slate-600">{format(new Date(record.recordDate), "MMMM d, yyyy")}</p>
                </div>
                {record.value && (
                  <span className="text-lg font-medium text-slate-900">{record.value} {record.unit}</span>
                )}
              </div>
              {record.notes && <p className="text-sm text-slate-500 mt-2">{record.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
