import { useEffect } from 'react'
import MainLayout from '../components/layout/MainLayout'
import HeroSection from '../components/home/HeroSection'
import ServicesSection from '../components/home/ServicesSection'
import ProductsSection from '../components/home/ProductsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CtaSection from '../components/home/CtaSection'

export default function Home() {
  useEffect(() => {
    document.title = 'Zen Massage & Wellness Gabon'
  }, [])

  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CtaSection />
    </MainLayout>
  )
}
