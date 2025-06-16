"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, ChevronDown, X, Minus, Plus } from "lucide-react"

interface Item {
  id: number
  name: string
  price: number
  inCart: boolean
}

interface CartItem extends Item {
  quantity: number
}

interface CardProps {
  item: Item
  onAddToCart: (id: number) => void
  onRemoveFromCart: (id: number) => void
}

const Card = ({ item, onAddToCart, onRemoveFromCart }: CardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col">
      <div className="h-32 bg-gray-100 flex items-center justify-center mb-3 rounded-full border-2 border-dashed border-gray-300">
        <span className="text-gray-400 text-xs text-center px-2">
          IMAGEM NÃO
          <br />
          DISPONÍVEL
        </span>
      </div>
      <h3 className="text-sm text-gray-800 mb-2 flex-grow text-center">{item.name}</h3>
      <p className="font-bold text-lg text-gray-900 mb-3 text-center">R$ {item.price.toFixed(2).replace(".", ",")}</p>
      <button
        onClick={() => (item.inCart ? onRemoveFromCart(item.id) : onAddToCart(item.id))}
        className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${
          item.inCart ? "bg-gray-400 hover:bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {item.inCart ? "no seu carrinho" : "Adicionar ao carrinho"}
      </button>
    </div>
  )
}

export default function WishlistPage() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Aspirador de pó e água", price: 280.64, inCart: false },
    { id: 2, name: "Geladeira Frost Free", price: 450.0, inCart: false },
    { id: 3, name: "Micro-ondas Digital", price: 320.5, inCart: false },
    { id: 4, name: "Aspirador de pó e água", price: 280.64, inCart: false },
    { id: 5, name: "Fogão 4 Bocas", price: 380.9, inCart: false },
    { id: 6, name: "Liquidificador Turbo", price: 150.75, inCart: false },
    { id: 7, name: "Aspirador de pó e água", price: 280.64, inCart: false },
    { id: 8, name: "Cafeteira Elétrica", price: 120.3, inCart: false },
    { id: 9, name: "Ventilador de Mesa", price: 89.99, inCart: false },
    { id: 10, name: "Ferro de Passar", price: 95.5, inCart: false },
  ])

  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [priceRange, setPriceRange] = useState(500)
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [showSortFilter, setShowSortFilter] = useState(false)
  const [showCart, setShowCart] = useState(false)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("wishlist-cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCart(parsedCart)

      // Update items inCart status based on saved cart
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          inCart: parsedCart.some((cartItem: CartItem) => cartItem.id === item.id),
        })),
      )
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("wishlist-cart", JSON.stringify(cart))
  }, [cart])

  const handleAddToCart = (itemId: number) => {
    const item = items.find((item) => item.id === itemId)
    if (item) {
      const existingCartItem = cart.find((cartItem) => cartItem.id === itemId)

      if (existingCartItem) {
        setCart((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
          ),
        )
      } else {
        setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }])
      }

      setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, inCart: true } : item)))
    }
  }

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, inCart: false } : item)))
  }

  const updateCartQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId)
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem)),
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Filter and sort logic
  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = item.price <= priceRange
      return matchesSearch && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "alphabetical":
          return a.name.localeCompare(b.name)
        case "popularity":
          return a.id - b.id
        default:
          return 0
      }
    })
  return (
    
    <div className="min-h-screen bg-gray-50">
      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-slate-600 text-white rounded-lg p-4 relative">
          <div className="flex items-center gap-4">
            <span className="text-sm">Ordenar por</span>

            <div className="relative">
              <button
                onClick={() => {
                  setShowPriceFilter(!showPriceFilter)
                  setShowSortFilter(false)
                }}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                  sortBy === "price" ? "bg-blue-500 text-white" : "bg-slate-500 text-white hover:bg-slate-400"
                }`}
              >
                Preço
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <span className="text-sm">ou</span>

            <div className="relative">
              <button
                onClick={() => {
                  setShowSortFilter(!showSortFilter)
                  setShowPriceFilter(false)
                }}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                  sortBy === "alphabetical" ? "bg-blue-500 text-white" : "bg-slate-500 text-white hover:bg-slate-400"
                }`}
              >
                A-Z
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 max-w-md relative ml-8">
              <input
                type="text"
                placeholder="Pesquisar... ex: geladeira"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-500 text-white placeholder-gray-300 px-4 py-2 rounded-full text-sm focus:outline-none focus:bg-slate-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowCart(!showCart)}
                className="bg-slate-500 p-2 rounded hover:bg-slate-400 transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Price Filter Dropdown */}
          {showPriceFilter && (
            <div className="absolute top-full left-20 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-20 w-80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">Filtro de Preço</span>
                <button onClick={() => setShowPriceFilter(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-gray-800">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>R$ 0</span>
                  <span>R$ 500</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="mt-2 text-sm text-gray-700">Até R$ {priceRange.toFixed(0)}</div>
                <button
                  onClick={() => {
                    setSortBy("price")
                    setShowPriceFilter(false)
                  }}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors w-full"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}

          {/* Sort Filter Dropdown */}
          {showSortFilter && (
            <div className="absolute top-full left-32 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-20 w-48">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">Ordenação</span>
                <button onClick={() => setShowSortFilter(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSortBy("alphabetical")
                    setShowSortFilter(false)
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  A-Z (Alfabética)
                </button>
                <button
                  onClick={() => {
                    setSortBy("price")
                    setShowSortFilter(false)
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Preço (Menor para Maior)
                </button>
              </div>
            </div>
          )}

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-96 z-20">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-800 font-medium">Carrinho ({getTotalItems()} itens)</h3>
                  <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">Carrinho vazio</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-800">Total:</span>
                    <span className="font-bold text-lg text-gray-900">
                      R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                    Finalizar Compra
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="mb-4 text-sm text-gray-600">
          {filteredItems.length} produto{filteredItems.length !== 1 ? "s" : ""} encontrado
          {filteredItems.length !== 1 ? "s" : ""}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} item={item} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou termo de pesquisa</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
