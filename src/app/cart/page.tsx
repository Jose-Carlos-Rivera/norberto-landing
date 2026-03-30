"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import content from "@/content/site-content.json";

function CartContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const product = content.products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product || product.type === "sandal") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-brown-dark mb-4">
            Producto no encontrado
          </h1>
          <Link href="/" className="text-tan hover:text-tan-dark transition-colors">
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-brown-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-tan-light">
            {content.brand.name}
          </Link>
          <div className="text-cream/60 text-sm">Carrito de Compras</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-brown-light mb-8">
          <Link href="/" className="text-tan hover:text-tan-dark">Inicio</Link>
          <span>/</span>
          <span>Carrito</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-dark mb-8">
          Tu Carrito
        </h1>

        {/* Cart item */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Product image placeholder */}
            <div className="w-full sm:w-32 h-32 bg-cream-dark rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-12 h-12 text-tan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Product details */}
            <div className="flex-grow">
              <p className="text-tan text-xs tracking-widest uppercase">{product.category}</p>
              <h3 className="font-serif text-xl font-bold text-brown-dark">{product.name}</h3>
              <p className="text-brown-light text-sm mt-1">{product.description}</p>
            </div>

            {/* Quantity and price */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-brown-light/30 rounded flex items-center justify-center hover:bg-cream-dark transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-brown-light/30 rounded flex items-center justify-center hover:bg-cream-dark transition-colors"
                >
                  +
                </button>
              </div>
              <p className="font-serif text-2xl font-bold text-brown-dark">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="font-serif text-xl font-bold text-brown-dark mb-4">Resumen del Pedido</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brown-light">Subtotal</span>
              <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-light">Envío</span>
              <span className="text-tan font-semibold">Gratis</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg">
              <span className="font-bold text-brown-dark">Total</span>
              <span className="font-serif font-bold text-brown-dark">{formatPrice(product.price * quantity)}</span>
            </div>
          </div>
          <Link
            href={`/checkout?product=${product.id}&qty=${quantity}`}
            className="block w-full bg-tan hover:bg-tan-dark text-white text-center py-3 sm:py-4 mt-6 text-sm tracking-widest uppercase transition-colors rounded-sm"
          >
            Proceder al Pago
          </Link>
          <Link
            href="/"
            className="block text-center text-tan hover:text-tan-dark transition-colors text-sm mt-4"
          >
            &larr; Seguir Comprando
          </Link>
        </div>

        {/* Simulated notice */}
        <div className="mt-6 bg-tan/10 border border-tan/20 rounded-lg p-4 text-center">
          <p className="text-brown-light text-xs">
            Esta es una experiencia de compra demostrativa para conocer nuestros productos.
            Para adquirir nuestras sandalias, visita nuestra{" "}
            <a
              href={content.kickstarter.campaignUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tan font-semibold hover:text-tan-dark"
            >
              campaña en Kickstarter
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <CartContent />
    </Suspense>
  );
}
