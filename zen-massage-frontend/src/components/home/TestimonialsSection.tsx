import { useInView } from '../../hooks/useInView'

const avatarImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAOG-2ftrrnl0-jC0KpbksPY3K6ODLYifNav8nGqagEUWKSIzXFyhRdp1QYijSBelvFehl9AfAJ0lhx8W8UTeH31OQSlWUefQl_k9IEUIkxYuQ91G1RvNkVZRzEwj9mw72elbB80FyBRlIStiYzErt2org47YBx4q2kHrGKS32WPxbpOILWf_8EoRzKltWxtIGjH7fWkiisco8voOnevgEirexvMyViIvb-H246kO5S72Z1_StInts0vtJ-2izLNxDCXlcnRrsl0M0D'

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

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap overflow-hidden transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Testimonial */}
          <div className="lg:w-1/2 relative">
            {/* Decorative large quote mark */}
            <div className="absolute -top-10 -left-10 text-sage-deep/5 select-none font-display-lg text-[200px] leading-none">
              "
            </div>
            <div className="relative z-10 space-y-12">
              <div>
                <p className="font-headline-sm text-headline-sm italic text-sage-deep mb-6">
                  "Une véritable évasion au cœur de Libreville. Le soin 'Signature Gabon' m'a
                  transporté. L'accueil est digne des plus grands palaces."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={avatarImg}
                      alt="Marie-Thérèse O."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-label-md text-label-md text-sage-deep">Marie-Thérèse O.</h5>
                    <div className="flex text-status-pending text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
