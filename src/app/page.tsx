"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { PawPrint, Heart, Calendar, Pill, Camera, FileText, ArrowRight, Check } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-violet-600" />
            <span className="text-xl font-bold text-slate-900">PetPals</span>
          </div>
          <div>
            {session ? (
              <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link href="/auth/signin" className="btn-primary">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Pet's Health, <span className="text-violet-200">Simplified</span>
          </h1>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Track vet visits, medications, feeding schedules, and precious memories - all in one place.
          </p>
          <Link href="/auth/signin" className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Everything Your Pet Needs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-rose-500" />}
              title="Pet Profiles"
              description="Create detailed profiles for each of your furry friends with photos, breed info, and more."
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-500" />}
              title="Vet Visit Tracking"
              description="Never miss an appointment. Track visits, diagnoses, and upcoming check-ups."
            />
            <FeatureCard
              icon={<Pill className="w-8 h-8 text-green-500" />}
              title="Medication Reminders"
              description="Set up medication schedules and get reminders so your pet never misses a dose."
            />
            <FeatureCard
              icon={<PawPrint className="w-8 h-8 text-amber-500" />}
              title="Feeding Schedules"
              description="Track feeding times, portions, and dietary requirements for healthy eating habits."
            />
            <FeatureCard
              icon={<Camera className="w-8 h-8 text-purple-500" />}
              title="Photo Gallery"
              description="Capture and organize precious moments with your pets in a beautiful gallery."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-cyan-500" />}
              title="Health Records"
              description="Keep all health records, vaccinations, and medical history in one secure place."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Simple Pricing</h2>
          <p className="text-center text-slate-600 mb-12">Start free, upgrade when you need more</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Free</h3>
              <p className="text-4xl font-bold text-slate-900 mb-6">$0<span className="text-lg font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <PricingItem>Up to 2 pets</PricingItem>
                <PricingItem>Basic health tracking</PricingItem>
                <PricingItem>Vet visit history</PricingItem>
                <PricingItem>5 photos per pet</PricingItem>
              </ul>
              <Link href="/auth/signin" className="btn-secondary w-full text-center block">Get Started</Link>
            </div>
            <div className="card border-violet-500 border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-slate-900 mb-6">$4.99<span className="text-lg font-normal text-slate-500">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <PricingItem>Unlimited pets</PricingItem>
                <PricingItem>Advanced health analytics</PricingItem>
                <PricingItem>Medication reminders</PricingItem>
                <PricingItem>Unlimited photo storage</PricingItem>
                <PricingItem>Export health records</PricingItem>
                <PricingItem>Priority support</PricingItem>
              </ul>
              <Link href="/auth/signin" className="btn-primary w-full text-center block">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PawPrint className="w-6 h-6 text-violet-400" />
            <span className="text-lg font-semibold text-white">PetPals</span>
          </div>
          <p className="text-sm">© 2024 PetPals. Made with ❤️ for pet lovers everywhere.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function PricingItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-slate-600">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      {children}
    </li>
  )
}
