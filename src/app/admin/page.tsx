"use client";

import { useState, useEffect } from "react";

const REPO_OWNER = "Jose-Carlos-Rivera";
const REPO_NAME = "norberto-landing";
const FILE_PATH = "src/content/site-content.json";
const ADMIN_PASSWORD = "barquera2024";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [fileSha, setFileSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("brand");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setMessage("");
    } else {
      setMessage("Contraseña incorrecta");
    }
  };

  const fetchContent = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (!res.ok) throw new Error("Error al cargar contenido");
      const data = await res.json();
      setFileSha(data.sha);
      const decoded = JSON.parse(atob(data.content));
      setContent(decoded);
      setMessage("Contenido cargado correctamente");
    } catch {
      setMessage("Error: verifica tu token de GitHub");
    }
  };

  useEffect(() => {
    if (token && authenticated) {
      fetchContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authenticated]);

  const handleSave = async () => {
    if (!token || !content) return;
    setSaving(true);
    setMessage("Guardando cambios...");

    try {
      const updatedContent = btoa(
        unescape(encodeURIComponent(JSON.stringify(content, null, 2)))
      );

      const res = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Update site content via admin panel - ${new Date().toLocaleString("es-MX")}`,
            content: updatedContent,
            sha: fileSha,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al guardar");

      const data = await res.json();
      setFileSha(data.content.sha);
      setMessage(
        "Cambios guardados y publicados. El sitio se actualizará en unos segundos."
      );
    } catch {
      setMessage("Error al guardar. Verifica tu token de GitHub.");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (section: string, field: string, value: string | number) => {
    if (!content) return;
    const sectionData = content[section] as Record<string, unknown>;
    setContent({
      ...content,
      [section]: { ...sectionData, [field]: value },
    });
  };

  const updateProduct = (index: number, field: string, value: string | number) => {
    if (!content) return;
    const products = [...(content.products as Array<Record<string, unknown>>)];
    products[index] = { ...products[index], [field]: value };
    setContent({ ...content, products });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-500 text-sm">Barquera - Calzado Artesanal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Ingresa la contraseña"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
            >
              Entrar
            </button>
            {message && (
              <p className="text-red-500 text-sm text-center">{message}</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Token entry screen
  if (!token || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Conectar con GitHub
            </h1>
            <p className="text-gray-500 text-sm">
              Ingresa tu token de GitHub para editar el contenido del sitio
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>GitHub Personal Access Token</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className={inputClass}
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-400 mt-1">
                Necesitas un token con permisos de &quot;Contents&quot; (read &amp; write)
              </p>
            </div>
            <button
              onClick={fetchContent}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
            >
              Conectar
            </button>
            {message && (
              <p className="text-red-500 text-sm text-center mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "brand", label: "Marca" },
    { key: "hero", label: "Hero" },
    { key: "products", label: "Productos" },
    { key: "contact", label: "Contacto" },
    { key: "legal", label: "Legal" },
    { key: "kickstarter", label: "Kickstarter" },
  ];

  const brand = content.brand as Record<string, string>;
  const hero = content.hero as Record<string, string>;
  const products = content.products as Array<Record<string, string | number>>;
  const contact = content.contact as Record<string, string>;
  const legal = content.legal as Record<string, string>;
  const kickstarter = content.kickstarter as Record<string, string>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">Admin Panel</span>
            <span className="text-gray-400 text-sm">| Barquera</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Ver sitio &rarr;
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              {saving ? "Guardando..." : "Publicar Cambios"}
            </button>
          </div>
        </div>
      </header>

      {/* Status message */}
      {message && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
          {message}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-amber-700 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Brand tab */}
        {activeTab === "brand" && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Información de Marca</h2>
            <div>
              <label className={labelClass}>Nombre de la marca</label>
              <input
                type="text"
                value={brand.name}
                onChange={(e) => updateField("brand", "name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={brand.tagline}
                onChange={(e) => updateField("brand", "tagline", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                value={brand.description}
                onChange={(e) => updateField("brand", "description", e.target.value)}
                className={inputClass + " min-h-[100px]"}
              />
            </div>
            <div>
              <label className={labelClass}>Razón Social</label>
              <input
                type="text"
                value={brand.razónSocial}
                onChange={(e) => updateField("brand", "razónSocial", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Hero tab */}
        {activeTab === "hero" && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sección Hero</h2>
            <div>
              <label className={labelClass}>Título principal</label>
              <input
                type="text"
                value={hero.headline}
                onChange={(e) => updateField("hero", "headline", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtítulo</label>
              <textarea
                value={hero.subheadline}
                onChange={(e) => updateField("hero", "subheadline", e.target.value)}
                className={inputClass + " min-h-[80px]"}
              />
            </div>
            <div>
              <label className={labelClass}>Texto del botón</label>
              <input
                type="text"
                value={hero.ctaText}
                onChange={(e) => updateField("hero", "ctaText", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Products tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Productos</h2>
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Producto {index + 1}: {product.name as string}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      product.type === "sandal"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {product.type === "sandal" ? "Sandalia (Kickstarter)" : "Zapato (Simulado)"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nombre</label>
                    <input
                      type="text"
                      value={product.name as string}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Precio (MXN)</label>
                    <input
                      type="number"
                      value={product.price as number}
                      onChange={(e) =>
                        updateProduct(index, "price", parseInt(e.target.value) || 0)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Descripción</label>
                  <textarea
                    value={product.description as string}
                    onChange={(e) => updateProduct(index, "description", e.target.value)}
                    className={inputClass + " min-h-[80px]"}
                  />
                </div>
                <div>
                  <label className={labelClass}>Categoría</label>
                  <input
                    type="text"
                    value={product.category as string}
                    onChange={(e) => updateProduct(index, "category", e.target.value)}
                    className={inputClass}
                  />
                </div>
                {product.type === "sandal" && (
                  <div>
                    <label className={labelClass}>URL de Kickstarter</label>
                    <input
                      type="url"
                      value={product.kickstarterUrl as string}
                      onChange={(e) =>
                        updateProduct(index, "kickstarterUrl", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact tab */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h2>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => updateField("contact", "email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => updateField("contact", "phone", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp (solo números)</label>
              <input
                type="text"
                value={contact.whatsapp}
                onChange={(e) => updateField("contact", "whatsapp", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dirección</label>
              <input
                type="text"
                value={contact.address}
                onChange={(e) => updateField("contact", "address", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Legal tab */}
        {activeTab === "legal" && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Información Legal</h2>
            <div>
              <label className={labelClass}>Nombre de la empresa / persona moral</label>
              <input
                type="text"
                value={legal.companyName}
                onChange={(e) => updateField("legal", "companyName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tipo legal</label>
              <input
                type="text"
                value={legal.legalType}
                onChange={(e) => updateField("legal", "legalType", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>RFC</label>
              <input
                type="text"
                value={legal.rfc}
                onChange={(e) => updateField("legal", "rfc", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Dirección fiscal</label>
              <input
                type="text"
                value={legal.address}
                onChange={(e) => updateField("legal", "address", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* Kickstarter tab */}
        {activeTab === "kickstarter" && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Campaña de Kickstarter</h2>
            <div>
              <label className={labelClass}>URL de la campaña</label>
              <input
                type="url"
                value={kickstarter.campaignUrl}
                onChange={(e) =>
                  updateField("kickstarter", "campaignUrl", e.target.value)
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Texto del botón</label>
              <input
                type="text"
                value={kickstarter.ctaText}
                onChange={(e) => updateField("kickstarter", "ctaText", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Badge / etiqueta</label>
              <input
                type="text"
                value={kickstarter.badge}
                onChange={(e) => updateField("kickstarter", "badge", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
