import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

interface Product {
  id: number
  image: string
  name: string
  price: string
  badge?: { label: string; color: string }
}

const products: Product[] = [
  {
    id: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXs9BnSh60IdJ83PoQgReHv3on4OFGYDkfSs2EdgLY6fh0BB5EuhIUAkxLd8ZsYE9C5g45sBuBJeV0F49fH3pCwV_hJqd4I6BF5cfbPor0PpiZV4jh-eHa-T5ILlgfi788puh6k7h5PzHQrxKZDYoQR_3KwXcTo2XjK1gTlw3G4VMEhIMriHXaVve6ar9E8JePXg24sFOqWRvbwyC97UMToVSwCaI_k-t_mbShckXEoGKOMwxyoXrmVLn7PkOk-CioVxctFHMjGV9r',
    name: 'Huile de Forêt Équatoriale',
    price: '45,000 FCFA',
    badge: { label: 'Best Seller', color: 'bg-sage-deep' },
  },
  {
    id: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdYAZ8A90K5TfL9UsvsFwFn-_B4DxpwC33n3s3WENqdEmAuOtqTL7EgGzGWK4PxQh3yWCBbofumnAq1vhjuwOmuAkCuXeS4FFJ78Jp-b79HEYo3WD9q5ZzV-bAwvXpVP7yAjTUHvRVIRKXE93v0qexww1p9WrYg99dGAUiQhHfExJIJI5_wW3YxUdmj6PelJc2lByu21H9TITKPagwoiTc2ALBp5ySc0aEiUSTdiSirzsMYcy9QA-7kfZIiLwFU0t7Cz7gCZM__Q4q',
    name: "Infusion 'Nuit au Gabon'",
    price: '12,500 FCFA',
  },
  {
    id: 3,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfYMoKCTk6ip3-OLrFv8pzN_U3piA4j0JTeY1RtcBXEAy8_jTcNOXB4fkcXwgSiHJ69MyGYx7iu4PFvkkCATDyCIRUygVi7Q0q4O0_6w7jw5v3w52wHe3SGPzJIF2Pv9QXtS1IiTMQzqNUpmzzV7vIQU-_EMI-_RkhFQU_0FOzuognyKSvL4dyTKKM9dK88XxcFc4sSoX8unDfmIWXa4rbZmVkMNyNJxA_cty4YW_cusEXvbnU4DqrGYZsmBn1XhT4o2mBwP3sKAu',
    name: 'Coffret Pierres Chaudes',
    price: '65,000 FCFA',
  },
  {
    id: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgtGb5ymu2-5MeKMziYnkK1-OVzt80xvs-DL8Hf6Bs9SBAv53YrlnVEkWzQEswxJLn0MY_N08At42YZwt5Nt2cfMPlCXP_nXvp80ojAWC0-F9O7pwyXOgxbMpixDdnjyX61N4SymTbZHgVW44gnGie-h_m0ePlhlkpRoKmVMYzg02ZxQxXbAJ3bD2OcJO_EWE0f98vB3snK28Gz0SyikJI2tP4fi9-WFvjYJGZbifdppBpGFzeRSBmRJNu-ZDmo4jr_qRk8gmo4vMQ',
    name: "Bougie 'Brise de l'Estuaire'",
    price: '28,000 FCFA',
    badge: { label: 'Nouveau', color: 'bg-secondary' },
  },
]

export default function ProductsSection() {
  const [ref, isInView] = useInView(0.1)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-surface-container-low py-section-gap transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-2 block">
              La Boutique Ben
            </span>
            <h2 className="font-display-lg text-headline-md text-sage-deep">Élixirs de Sérénité</h2>
          </div>
          <Link
            to="/products"
            className="text-sage-deep font-label-md text-label-md flex items-center gap-2 hover:translate-x-2 transition-transform"
          >
            Voir toute la collection
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-white shadow-sm relative">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 ${product.badge.color} text-white text-[10px] uppercase tracking-tighter px-2 py-1 rounded-full`}
                  >
                    {product.badge.label}
                  </div>
                )}
              </div>
              <h4 className="font-body-md text-body-md font-medium text-sage-deep">{product.name}</h4>
              <p className="font-display-lg text-body-md italic text-primary">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
