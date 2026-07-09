import { useInView } from '../../hooks/useInView'

const massageImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJaw7TtIE3bqGVISnrXtoEDLvMAPZLOeOhSvMCNR3cWcHocm331R_2NL2T4I0aM3FfF37H-zlqvJ3azu2xAwp8RoKwC3R196133L_Cv3psrgmdjKsYIBNfwqzuRZDpeg2zaGaeY8SnHkaPib3sKe1apZjt-FQoQz5A61ZZLz6DoVPvTz3b2P7kcBH4FgDFRmry72J3-uGsONBRMPzlaOE8wBezakCf3O-cAQSC-9dTighJD9byiOUh-o1WmOVfKY8zVeCMUCp-B46C'
const aromaImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD6iyCuEM9ESoYo5u8KotZVEbqo7KU5G4rcEAHi-C8T5UaclOHUIi39yxzZgJkXMxlS-lAckTKa9h2tHYqPI8eca3sCsC4jevWgzrJE7sXjDToccVTkSXbZnyoIxx4v5PFzro2kKvTGkBv5ga-2ShA3Hcfe2dNPb4YK6yaLoIsqK2wjAvV72B3muOaGgIvw3CD6ffufVdClP_1ZHqaXyLqFbsjc03rBQWCTfzznwEOPS--PCFUuhzPg2ucuNHGQFm5En36UdPhX8zAt'
const reflexoImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC0hj9T-KFjYJJolbb3G5papeKjub9lyDu9Br9UVmWx0LXW4dbF2Xa7fQWmIuYm5332XvfDTVVztuSalh8CboNYiQBMg8h1DObCER2MzEVjo9sFd-GUlwMgCtaBhvfRYy8ssDuXJdw5AgM2f8lvH48MGj0FeiEEgyYC7iXYX_lRK-VuV8OJAyfhr1f57qXS47Dl0hAz-RfYrWSROpN9mqkD_rrE_aPHiZnHN4e6c7_d4mPh7qqgJorSjLxgkv0YKytf-FDhS5ecATe-'

export default function ServicesSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="font-display-lg text-headline-md text-sage-deep mb-4">L'Art du Soin</h2>
        <div className="h-1 w-20 bg-primary mx-auto opacity-30" />
      </div>

      {/* Bento grid — large card col-span-8, 2 small cards stacked in col-span-4 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

        {/* Large card */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container-low h-[500px] transition-transform duration-500 hover:-translate-y-2">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${massageImg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-stack-lg text-white">
            <h3 className="font-headline-sm text-headline-sm mb-2">Massages Thérapeutiques</h3>
            <p className="font-body-md text-body-md opacity-80 max-w-md">
              Libérez vos tensions avec nos techniques ancestrales fusionnées avec l'expertise moderne.
            </p>
          </div>
        </div>

        {/* Right column — 2 small cards stacked */}
        <div className="md:col-span-4 flex flex-col gap-gutter">

          {/* Aromathérapie */}
          <div className="group relative overflow-hidden rounded-xl bg-sand-light h-[240px] transition-transform duration-500 hover:-translate-y-2">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${aromaImg}')` }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-0 p-stack-md text-white">
              <h3 className="font-headline-sm text-headline-sm">Aromathérapie</h3>
            </div>
          </div>

          {/* Réflexologie */}
          <div className="group relative overflow-hidden rounded-xl bg-sage-deep h-[240px] transition-transform duration-500 hover:-translate-y-2">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${reflexoImg}')` }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 p-stack-md text-white">
              <h3 className="font-headline-sm text-headline-sm">Réflexologie</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
