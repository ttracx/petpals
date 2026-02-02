# PetPals 🐾

A modern pet care tracking application built with Next.js 15, TypeScript, Prisma, and Neon PostgreSQL.

## Features

- **Pet Profiles** - Create detailed profiles for each of your furry friends
- **Vet Visit Tracking** - Track appointments, diagnoses, and treatments
- **Medication Reminders** - Never miss a dose with scheduled reminders
- **Feeding Schedules** - Manage meal times and portions
- **Photo Gallery** - Capture and organize precious moments
- **Health Records** - Keep vaccinations and medical history in one place

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Payments**: Stripe ($4.99/month subscription)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Push database schema: `npx prisma db push`
5. Run development server: `npm run dev`

## Environment Variables

```env
DATABASE_URL=your_neon_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRICE_ID=your_stripe_price_id
```

## License

MIT
