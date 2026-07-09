import { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import HeroSection from '../components/about/HeroSection'
import MissionSection from '../components/about/MissionSection'
import ValuesSection from '../components/about/ValuesSection'
import SanctuarySection from '../components/about/SanctuarySection'
import QuoteSection from '../components/about/QuoteSection'

export default function About() {
  useEffect(() => {
    document.title = 'À propos | Zen Massage & Wellness Gabon'
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <SanctuarySection />
      <QuoteSection />
    </MainLayout>
  )
}
