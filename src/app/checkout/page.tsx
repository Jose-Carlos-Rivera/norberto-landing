"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import content from "@/content/site-content.json";

type Step = "info" | "shipping" | "payment" | "confirmation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const qty = parseInt(searchParams.get("qty") || "1");
  const product = content.products.find((p) => p.id === productId);
  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
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

  const steps: { key: Step; label: string }[] = [
    { key: "info", label: "Información" },
    { key: "shipping", label: "Dirección" },
    { key: "payment", label: "Pago" },
    { key: "confirmation", label: "Confirmación" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full border border-brown-light/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-tan focus:ring-1 focus:ring-tan bg-white";

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-brown-dark text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-tan-light">
            {content.brand.name}
          </Link>
          <div className="text-cream/60 text-sm">Checkout</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress steps */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= currentStepIndex
                      ? "bg-tan text-white"
                      : "bg-brown-light/20 text-brown-light"
                  }`}
                >
                  {i < currentStepIndex ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-xs mt-1 text-brown-light hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
                    i < currentStepIndex ? "bg-tan" : "bg-brown-light/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-6">
                  Información Personal
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+52 55 1234 5678"
                    />
                  </div>
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full bg-tan hover:bg-tan-dark text-white py-3 text-sm tracking-widest uppercase transition-colors rounded-sm mt-4"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === "shipping" && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-6">
                  Dirección de Envío
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ciudad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Estado"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="00000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        País
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="México"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setStep("info")}
                      className="flex-1 border border-brown-light/30 text-brown-dark py-3 text-sm tracking-widest uppercase transition-colors rounded-sm hover:bg-cream-dark"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => setStep("payment")}
                      className="flex-1 bg-tan hover:bg-tan-dark text-white py-3 text-sm tracking-widest uppercase transition-colors rounded-sm"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="font-serif text-2xl font-bold text-brown-dark mb-6">
                  Método de Pago
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-dark mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="NOMBRE COMPLETO"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="bg-tan/10 border border-tan/20 rounded-lg p-4 mt-2">
                    <p className="text-brown-light text-xs text-center">
                      Esta es una experiencia de compra demostrativa. No se realizará ningún cargo real.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setStep("shipping")}
                      className="flex-1 border border-brown-light/30 text-brown-dark py-3 text-sm tracking-widest uppercase transition-colors rounded-sm hover:bg-cream-dark"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => setStep("confirmation")}
                      className="flex-1 bg-tan hover:bg-tan-dark text-white py-3 text-sm tracking-widest uppercase transition-colors rounded-sm"
                    >
                      Confirmar Pedido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "confirmation" && (
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl font-bold text-brown-dark mb-4">
                  Gracias por tu interés
                </h2>
                <p className="text-brown-light mb-6 max-w-md mx-auto">
                  Esta fue una experiencia de compra demostrativa para que conozcas nuestros productos.
                  Para adquirir nuestras sandalias artesanales, te invitamos a apoyar nuestra campaña en Kickstarter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={content.kickstarter.campaignUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold hover:bg-gold-light text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors rounded-sm"
                  >
                    Ir a Kickstarter
                  </a>
                  <Link
                    href="/"
                    className="border border-brown-light/30 text-brown-dark px-8 py-3 text-sm tracking-widest uppercase transition-colors rounded-sm hover:bg-cream-dark"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-brown-dark mb-4">
                Tu Pedido
              </h3>
              <div className="flex gap-3 pb-4 border-b border-cream-dark">
                <div className="w-16 h-16 bg-cream-dark rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-tan/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brown-dark text-sm">{product.name}</p>
                  <p className="text-brown-light text-xs">Cantidad: {qty}</p>
                </div>
              </div>
              <div className="space-y-2 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-brown-light">Subtotal</span>
                  <span>{formatPrice(product.price * qty)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown-light">Envío</span>
                  <span className="text-tan">Gratis</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-brown-dark">
                  <span>Total</span>
                  <span className="font-serif">{formatPrice(product.price * qty)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <CheckoutContent />
    </Suspense>
  );
}
