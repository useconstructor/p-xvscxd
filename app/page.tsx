'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Menu,
  X,
  MessageCircle,
  Phone,
  Clock,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  Users,
  CheckCircle,
  Truck,
  Shield,
  Wrench,
  Paintbrush,
  Droplets,
  Zap,
  Hammer,
  Package,
  Headphones,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  Send
} from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  is_featured: number
  is_deal: number
  discount_percent: number
  available: number
}

const categories = [
  { name: 'Herramientas Eléctricas', icon: Zap, description: 'Taladros, sierras, amoladoras y más' },
  { name: 'Herramientas Manuales', icon: Hammer, description: 'Martillos, destornilladores, llaves' },
  { name: 'Materiales de Construcción', icon: Package, description: 'Cemento, varillas, agregados' },
  { name: 'Pinturas y Acabados', icon: Paintbrush, description: 'Pinturas, esmaltes, impermeabilizantes' },
  { name: 'Plomería', icon: Droplets, description: 'Tubos, válvulas, accesorios' },
  { name: 'Electricidad', icon: Zap, description: 'Cables, breakers, tomacorrientes' },
]

const testimonials = [
  { initials: 'JR', name: 'Jefe de Obra', company: 'Constructora Regional', quote: 'El Constructor nos ha surtido 15 obras simultáneamente con entregas puntuales y precios imbatibles. La atención personalizada marca la diferencia.' },
  { initials: 'MC', name: 'Maestro de Obra', company: 'Proyecto Independiente', quote: 'Llevo 8 años comprando aquí. La calidad de las herramientas y el conocimiento del equipo me han ayudado en cientos de proyectos.' },
  { initials: 'AL', name: 'Arquitecta', company: 'Estudio de Diseño', quote: 'Excelente variedad de acabados y pinturas. El asesoramiento técnico me ayuda a recomendar los mejores materiales a mis clientes.' },
]

const brands = ['DeWalt', 'Bosch', 'Makita', 'Argos', 'Comex', 'Pavco', 'Siemens', 'Grival']

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: '¿Realizan envíos a domicilio?',
      answer: 'Sí, realizamos envíos a domicilio en Bogotá el mismo día y en otras ciudades principales en 24-48 horas. Para pedidos grandes de obra, coordinamos entregas programadas directamente en tu proyecto.'
    },
    {
      question: '¿Qué formas de pago aceptan?',
      answer: 'Aceptamos múltiples formas de pago: Nequi, Daviplata, efectivo, tarjeta de crédito y débito. Para constructores y empresas, también ofrecemos crédito directo y facturación electrónica.'
    },
    {
      question: '¿Cómo puedo solicitar una cotización para obra?',
      answer: 'Puedes solicitar cotizaciones para obra por WhatsApp enviándonos la lista de materiales, o visitando nuestra tienda. Nuestro equipo te asesorará y te entregará la cotización en máximo 24 horas con precios especiales para proyectos grandes.'
    },
    {
      question: '¿Cuál es la garantía de los productos?',
      answer: 'Todos nuestros productos tienen garantía de fábrica. Las herramientas eléctricas tienen garantía de 1 a 3 años según la marca. Materiales de construcción cuentan con garantía de calidad y cambio por defectos de fábrica.'
    },
    {
      question: '¿Hacen devoluciones o cambios?',
      answer: 'Sí, aceptamos devoluciones y cambios dentro de los 8 días siguientes a la compra, presentando la factura. El producto debe estar en su empaque original y sin uso. Herramientas eléctricas se cambian únicamente por defectos de fábrica.'
    }
  ]

  useEffect(() => {
    async function loadProducts() {
      try {
        await fetch('/api/products/seed', { method: 'POST' })
        const res = await fetch('/api/products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
    loadProducts()
  }, [])

  const featuredProducts = products.filter(p => p.is_featured === 1)
  const dealProducts = products.filter(p => p.is_deal === 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price)
  }

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-[#1A1A1A]" />
              </div>
              <span className="text-white font-bold text-xl">El Constructor</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-300 hover:text-[#FFD700] transition-colors font-medium">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="https://wa.me/573001234567?text=Hola,%20quiero%20cotizar%20productos" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Cotizar
                </Button>
              </a>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-[#1A1A1A] border-t border-gray-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-[#FFD700] py-2 font-medium transition-all duration-300"
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="https://wa.me/573001234567?text=Hola,%20quiero%20cotizar%20productos" target="_blank" rel="noopener noreferrer" className="block pt-2">
              <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Cotizar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section id="inicio" className="pt-16 min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            <div className="space-y-8">
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-2">
                Tu Ferretería de Confianza en Colombia
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Encontrá Todo Para <span className="text-[#FFD700]">Tu Obra</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-lg">
                Herramientas, materiales y asesoría profesional en un solo lugar. Atendemos constructores, maestros de obra y proyectos del hogar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/573001234567?text=Hola,%20quiero%20cotizar%20productos" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold text-lg px-8 py-6 w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Cotizar por WhatsApp
                  </Button>
                </a>
                <a href="#productos">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1A1A1A] font-bold text-lg px-8 py-6 w-full sm:w-auto">
                    Ver Catálogo
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Ferretería El Constructor - Herramientas y materiales de construcción"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#FFD700] rounded-xl p-4 shadow-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-[#1A1A1A]" />
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Entregas Rápidas</p>
                    <p className="text-sm text-[#1A1A1A]/70">Mismo día en tu ciudad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#F5F5F5] py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '18,500+', label: 'Clientes Satisfechos' },
              { icon: CheckCircle, value: '2,400+', label: 'Proyectos Completados' },
              { icon: Truck, value: '2 Horas', label: 'Entrega en Bogotá' },
              { icon: Shield, value: '25+', label: 'Marcas Certificadas' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">Categorías de Productos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Todo lo que necesitas para tu proyecto de construcción en un solo lugar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <a key={i} href="#productos" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <cat.icon className="w-12 h-12 text-[#FFD700] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-gray-400">{cat.description}</p>
                <ChevronRight className="absolute bottom-8 right-8 w-6 h-6 text-[#FFD700] group-hover:translate-x-2 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-2">Productos Destacados</h2>
              <p className="text-gray-600">Las mejores herramientas y materiales para tu proyecto</p>
            </div>
            <a href="https://wa.me/573001234567?text=Hola,%20quiero%20ver%20el%20catálogo%20completo" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
                Ver Catálogo Completo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                    {product.available === 1 && (
                      <Badge className="absolute top-3 right-3 bg-[#FFD700] text-[#1A1A1A]">Disponible</Badge>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                    <h3 className="font-bold text-[#1A1A1A] mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-black text-[#FFD700]">{formatPrice(product.price)}</p>
                      <a href={`https://wa.me/573001234567?text=Hola,%20me%20interesa%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white">
                          Cotizar
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Deals Carousel */}
      {dealProducts.length > 0 && (
        <section className="py-20 bg-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <div>
                <Badge className="bg-red-500 text-white mb-3">Ofertas Limitadas</Badge>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Ofertas de la Semana</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white text-white hover:bg-white hover:text-[#1A1A1A]"
                  onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                  disabled={carouselIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white text-white hover:bg-white hover:text-[#1A1A1A]"
                  onClick={() => setCarouselIndex(Math.min(dealProducts.length - 1, carouselIndex + 1))}
                  disabled={carouselIndex >= dealProducts.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dealProducts.map((product) => (
                <Card key={product.id} className="relative overflow-hidden bg-white">
                  <div className="absolute top-4 left-0 bg-red-500 text-white px-4 py-1 text-sm font-bold z-10" style={{ transform: 'rotate(-45deg) translate(-30%, -10%)' }}>
                    {product.discount_percent}% OFF
                  </div>
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 flex items-center justify-center">
                      <Package className="w-16 h-16 text-[#FFD700]" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                      <h3 className="font-bold text-[#1A1A1A] mb-2">{product.name}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</p>
                        <p className="text-2xl font-black text-[#FFD700]">
                          {formatPrice(product.price * (1 - product.discount_percent / 100))}
                        </p>
                      </div>
                      <a href={`https://wa.me/573001234567?text=Hola,%20me%20interesa%20la%20oferta%20de%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold">
                          Aprovechar Oferta
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-gray-600">Miles de profesionales confían en nosotros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-[#F5F5F5] border-0">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center text-[#1A1A1A] font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List - Why Choose Us */}
      <section id="nosotros" className="py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">Por Qué Elegirnos</h2>
            <p className="text-gray-600">Tu éxito es nuestra prioridad</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Headphones, title: 'Asesoría Especializada', desc: 'Nuestro equipo responde todas tus preguntas técnicas y recomienda materiales según tu proyecto' },
              { icon: Truck, title: 'Entregas Rápidas a Domicilio', desc: 'Mismo día en ciudades principales, máximo 48 horas en departamentos, con tracking en tiempo real' },
              { icon: CreditCard, title: 'Precios para Constructores', desc: 'Descuentos especiales, crédito sin interés y factura directa para proyectos grandes' },
            ].map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <f.icon className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/feature.png"
                alt="Ferretería El Constructor - Materiales de construcción"
                width={700}
                height={500}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-[#FFD700]/20 text-[#1A1A1A] border-[#FFD700]">Desde 1998</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">Más de 25 Años Construyendo Confianza</h2>
              <p className="text-gray-600 text-lg">
                Ferretería El Constructor nació con la misión de ser el aliado de los constructores colombianos. Hoy atendemos desde el maestro de obra independiente hasta grandes constructoras, siempre con la misma dedicación y compromiso.
              </p>
              <ul className="space-y-4">
                {[
                  'Asesoría técnica personalizada',
                  'Crédito para constructores',
                  'Entregas programadas a obra',
                  'Productos de marcas certificadas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacto">
                <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold">
                  Conoce Más
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8 font-medium">Marcas Aliadas</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {brands.map((brand, i) => (
              <div key={i} className="text-2xl font-black text-gray-400 hover:text-[#1A1A1A] transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Full Width */}
      <section className="py-20 bg-[#FFD700]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">
            ¿Listo para Empezar tu Proyecto?
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg mb-8 max-w-2xl mx-auto">
            Cotiza tus materiales y herramientas por WhatsApp. Nuestro equipo te atenderá en minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/573001234567?text=Hola,%20quiero%20cotizar%20materiales%20para%20mi%20proyecto" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-bold text-lg px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar Ahora
              </Button>
            </a>
            <a href="tel:+573001234567">
              <Button size="lg" variant="outline" className="border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-bold text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Llamar
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Split */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-6">Contáctanos</h2>
              <p className="text-gray-600 mb-8">
                ¿Tienes preguntas sobre productos o necesitas una cotización especial? Escríbenos y te responderemos pronto.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">WhatsApp</p>
                    <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FFD700]">
                      Escríbenos para cotizaciones
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Correo</p>
                    <a href="mailto:contacto@elconstructor.co" className="text-gray-600 hover:text-[#FFD700]">
                      contacto@elconstructor.co
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">Horario</p>
                    <p className="text-gray-600">Lunes a Sábado</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <iframe
                  src="https://maps.google.com/maps?q=Ferreteria+Bogota+Colombia&output=embed"
                  className="w-full h-64 rounded-xl border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación Ferretería El Constructor"
                />
              </div>
            </div>

            <div>
              {formState === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Mensaje Enviado</h3>
                  <p className="text-gray-600">Te contactaremos pronto. ¡Gracias!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#F5F5F5] rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6">Envíanos un Mensaje</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <Input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Tu nombre"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                      <Input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Tu número de teléfono"
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                      <Textarea
                        required
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        placeholder="¿En qué podemos ayudarte?"
                        rows={4}
                        className="bg-white"
                      />
                    </div>
                    {formState === 'error' && (
                      <p className="text-red-500 text-sm">Hubo un error. Por favor intenta de nuevo.</p>
                    )}
                    <Button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#1A1A1A] font-bold"
                    >
                      {formState === 'loading' ? (
                        'Enviando...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-600">Resolvemos tus dudas más comunes</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-[#1A1A1A] pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#FFD700] flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <span className="font-bold text-xl">El Constructor</span>
              </div>
              <p className="text-gray-400 mb-4">
                Tu ferretería de confianza en Colombia. Herramientas, materiales y asesoría profesional.
              </p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFD700] hover:text-[#1A1A1A] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Productos</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 4).map((cat, i) => (
                  <li key={i}>
                    <a href="#productos" className="hover:text-[#FFD700] transition-colors">{cat.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#inicio" className="hover:text-[#FFD700] transition-colors">Inicio</a></li>
                <li><a href="#productos" className="hover:text-[#FFD700] transition-colors">Productos</a></li>
                <li><a href="#servicios" className="hover:text-[#FFD700] transition-colors">Servicios</a></li>
                <li><a href="#contacto" className="hover:text-[#FFD700] transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contacto</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#FFD700]" />
                  <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700]">WhatsApp</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FFD700]" />
                  <a href="mailto:contacto@elconstructor.co" className="hover:text-[#FFD700]">contacto@elconstructor.co</a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFD700]" />
                  <span>Lunes a Sábado</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Ferretería El Constructor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/573001234567?text=Hola,%20tengo%20una%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  )
}
