import { useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { reviewService } from '../../services/review.service'
import type { Review } from '../../types/review'

const galleryImages = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU-tGeSve214G6A5mgdTkljd60WcpRrqEV0d2QQjI-m-5euJ3Ei5m-UOxucKHBy9gdz04WrqCSrcyxZgtqE1hrDn5hlSuy48QGvryeG9JybMyC-ZzosIT3VUL1zoqVknkif_3_JPv9qWgltJebyAQMYinWjCze8oGyk0SYmF2iN7AqfEl0e8WwkLh92Ces35iKqE7IGRi67GmjQClSsum4rndqZ3nMykPXJfOFYRLslB39cCp-ZV7LX8R2MMVsK8F4SMwoTY46ZhHP',
    aspect: 'aspect-square',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfnsK9meq4N8rt5Oqo4qfjwVKQOl1My4iMdRdny0auwCVsCLXGlK7z8MKjB5KiacYXygLe-5BmydJnR1tCEYlcn-cOYBtNd8yezzHXYOeXyh7nBR_aCiHM1_7Wg9jyqyL3M6MZeBou5omMwRwEUckTXWjbA_8ptNtu2LObUa5wouHV4ZUPhghqDH-s-dWYwodxrDxbL_vrzOBF6YOzp7f9aQw3J3UexfWXLJVkwwSAJx140L1mkEH4q0kMp05eIS5a_6eiYeMi-GdL',
    aspect: 'aspect-[3/4]',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNq6A3XxAbx9zqXRbCdV5CZLlcRQ-EDdHJNiAy4EK8LemrNatbkvY4Xa9YhM6_eAIVm8D_fj5ez1KwFBdeF1c0jnoS3wT5aDVVynTh-VfpbmvhuZy0UhBUdeG4Ty-4gz2rBiXlov_A08bIA2h0u_doXS-wWFEJHg4vm264EQAQ5sXdLooUsRdvkqlC5qh9XurgNaVM3ccN6bQh-OetmJLH9YWShAEtIHfh1tZRmi0WUQYquh_5CgPTCDMND5jpJlpzIOrhTg2Hm2Kv',
    aspect: 'aspect-[3/4]',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT-QjapQnXLkdBhMZdEWG40oZOhcXd85tVG3Mv10jD_JouH47VGixUp_FxXIxtHCvqcJmK21ffsm2P0UGvgno90qjk8sRmz3rijrCk19pHINKsm02vJPX-l1REkq_73deH0XDe0UhRpOB2K99GYnTfqFghw38oTxrtzXRytVrZz0qCJ2B5pNjRiYqVGtkEW7BjslfeI1tmpdRtW70OaQ4Tx5Sk2ymu227BK9o9OLqZ01zFufU_OxHwgkTaLJq0xnLrY6GUVN2PI3at',
    aspect: 'aspect-square',
  },
]

export default function TestimonialsSection() {
  const [ref, isInView] = useInView(0.1)
  const [avis, setAvis] = useState<Review | null>(null)

  useEffect(() => {
    reviewService.listReviews({ tri: 'note_desc', limite: 10 })
      .then(res => {
        const list = res.data.avis ?? []
        // Prendre le premier avis 5 étoiles non masqué avec contenu
        const best = list.find(a => a.note === 5 && !a.masque && a.contenu)
          ?? list.find(a => !a.masque && a.contenu)
          ?? list[0]
        if (best) setAvis(best)
      })
      .catch(() => {})
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">

            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 text-sage-deep/5 select-none font-display-lg text-[200px] leading-none">
                "
              </div>
              <div className="relative z-10 space-y-12">
                <div>
                  {avis ? (
                    <>
                      <p className="font-headline-sm text-headline-sm italic text-sage-deep mb-6">
                        "{avis.contenu}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-sage-deep/10 flex items-center justify-center">
                          {avis.utilisateur?.avatar ? (
                            <img src={avis.utilisateur.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-sage-deep text-sm">
                              {avis.utilisateur?.firstName?.[0]}{avis.utilisateur?.lastName?.[0]}
                            </span>
                          )}
                        </div>
                        <div>
                          <h5 className="font-label-md text-label-md text-sage-deep">
                            {avis.utilisateur?.firstName} {avis.utilisateur?.lastName?.[0]}.
                          </h5>
                          <div className="flex text-status-pending text-sm">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className="material-symbols-outlined text-base"
                                style={{ fontVariationSettings: `'FILL' ${i < avis.note ? 1 : 0}` }}
                              >
                                star
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Skeleton pendant le chargement */
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-outline-variant/20 rounded w-full" />
                      <div className="h-4 bg-outline-variant/20 rounded w-5/6" />
                      <div className="h-4 bg-outline-variant/20 rounded w-4/6" />
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-12 h-12 rounded-full bg-outline-variant/20" />
                        <div className="space-y-2">
                          <div className="h-3 bg-outline-variant/20 rounded w-24" />
                          <div className="h-3 bg-outline-variant/10 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Gallery grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {/* Left column — offset top */}
            <div className="space-y-4 pt-12">
              <div className={`${galleryImages[0].aspect} rounded-xl overflow-hidden shadow-lg`}>
                <img src={galleryImages[0].src} alt="" className="w-full h-full object-cover" />
              </div>
              <div className={`${galleryImages[1].aspect} rounded-xl overflow-hidden shadow-lg`}>
                <img src={galleryImages[1].src} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Right column */}
            <div className="space-y-4">
              <div className={`${galleryImages[2].aspect} rounded-xl overflow-hidden shadow-lg`}>
                <img src={galleryImages[2].src} alt="" className="w-full h-full object-cover" />
              </div>
              <div className={`${galleryImages[3].aspect} rounded-xl overflow-hidden shadow-lg`}>
                <img src={galleryImages[3].src} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
