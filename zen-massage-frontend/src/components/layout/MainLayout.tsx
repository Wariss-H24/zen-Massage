import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-sans selection:bg-primary-fixed selection:text-primary">
      <Navbar />
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
