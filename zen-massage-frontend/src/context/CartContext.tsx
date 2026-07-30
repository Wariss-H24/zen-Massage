import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
export interface CartItem {
  id: string
  nom: string
  prix: number
  image: string
  stock: number
  qty: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; payload: Omit<CartItem, 'qty'> & { qty?: number } }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; items: CartItem[] }

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
}

/* ══════════════════════════════════════════
   REDUCER
══════════════════════════════════════════ */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const { qty = 1, ...item } = action.payload
      const existing = state.items.find(i => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === item.id
              ? { ...i, qty: Math.min(i.stock, i.qty + qty) }
              : i
          ),
        }
      }
      return { items: [...state.items, { ...item, qty: Math.min(item.stock, qty) }] }
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      return {
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: Math.min(i.stock, Math.max(1, action.qty)) } : i)
          .filter(i => i.qty > 0),
      }
    case 'CLEAR':
      return { items: [] }
    case 'LOAD':
      return { items: action.items }
    default:
      return state
  }
}

/* ══════════════════════════════════════════
   CONTEXT
══════════════════════════════════════════ */
const CartContext = createContext<CartContextValue | null>(null)
const LS_KEY = 'zen_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const items: CartItem[] = JSON.parse(raw)
        dispatch({ type: 'LOAD', items })
      }
    } catch { /* ignore */ }
  }, [])

  // Persister à chaque changement
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.prix * i.qty, 0)

  const value: CartContextValue = {
    items: state.items,
    totalItems,
    totalPrice,
    addItem: (item, qty = 1) => dispatch({ type: 'ADD', payload: { ...item, qty } }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
