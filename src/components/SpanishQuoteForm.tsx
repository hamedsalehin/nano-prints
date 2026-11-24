"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  CheckCircle2,
  Phone,
  MessageSquare,
  Zap,
  ShieldCheck,
  Star,
  Check,
  Send,
  MapPin,
  Clock,
  Award,
  Lock,
} from "lucide-react";

const CATEGORIAS_ES = [
  { id: "letreros-comerciales", label: "Letreros de Fachada y Comerciales", defaultUnit: "ft" },
  { id: "channel-letters", label: "Letras Tridimensionales (Channel Letters)", defaultUnit: "in" },
  { id: "letreros-led", label: "Pantallas LED Programables", defaultUnit: "ft" },
  { id: "neon-led", label: "Neón LED Personalizado", defaultUnit: "in" },
  { id: "banners-pancartas", label: "Banners y Lonas Vinílicas", defaultUnit: "ft" },
  { id: "roll-up-stands", label: "Banners Retráctiles (Roll-Up Stands)", defaultUnit: "in" },
  { id: "rotulacion-vehicular", label: "Rotulación de Vehículos y Magnéticos", defaultUnit: "ft" },
  { id: "yard-signs", label: "Letreros para Jardín / Coroplast (Yard Signs)", defaultUnit: "in" },
  { id: "otro", label: "Otro Letrero / Proyecto Especial", defaultUnit: "ft" },
];

export function SpanishQuoteForm() {
  const router = useRouter();

  const [selectedCatId, setSelectedCatId] = useState<string>("letreros-comerciales");
  const [showDimensions, setShowDimensions] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"ft" | "in">("ft");
  const [description, setDescription] = useState<string>("");
  const [isRushOrder, setIsRushOrder] = useState<boolean>(false);

  // Contact Info
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Form Submission
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeCategory = CATEGORIAS_ES.find((c) => c.id === selectedCatId) || CATEGORIAS_ES[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError("El archivo supera el límite de 25MB. Puede enviarlo directamente a info@nano-signs.com.");
      return;
    }

    setFile(selectedFile);
    setFileError(null);
    setFileUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      await fetch("/api/upload-artwork", { method: "POST", body: formData });
    } catch {
      // Non-blocking fallback
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !description.trim()) {
      setSubmitError("Por favor ingrese su nombre, correo y detalles del proyecto.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const formattedDimensions = width || height ? `${width || "?"} x ${height || "?"} ${unit}` : null;
    const rushPrefix = isRushOrder ? "[⚡ URGENTE SOLICITADO] " : "";

    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || "No proporcionado",
          description: `[ESPAÑOL] ${rushPrefix}[Categoría: ${activeCategory.label}] ${formattedDimensions ? `[Medidas: ${formattedDimensions}] ` : ""}${description.trim()}`,
          width: width ? `${width} ${unit}` : null,
          height: height ? `${height} ${unit}` : null,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("No pudimos enviar el formulario. Por favor llámenos al (305) 967-1005.");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err?.message || "Ocurrió un error. Por favor contáctenos al (305) 967-1005.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-emerald-100">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          ¡Cotización Recibida con Éxito!
        </h3>
        <p className="text-slate-600 text-base max-w-lg mx-auto mb-6">
          Gracias, <strong className="text-slate-900">{fullName}</strong>. Nuestro equipo de producción en Fort Lauderdale revisará sus dimensiones y le responderá en menos de 4 horas hábiles.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto mb-8 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-1">¿Necesita atención inmediata o un pedido para mañana?</p>
          <p>Llámenos directamente o envíenos mensaje de WhatsApp:</p>
          <a href="tel:305-967-1005" className="inline-block mt-2 text-base font-extrabold text-[#ff2d78] hover:underline">
            📞 (305) 967-1005
          </a>
        </div>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setDescription("");
            setFullName("");
            setEmail("");
            setPhone("");
            setFile(null);
          }}
          className="text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-800"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 sm:p-10">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h2 className="font-poppins text-xl sm:text-2xl font-black text-slate-900 mb-1">
          Pida su Presupuesto sin Compromiso
        </h2>
        <p className="text-slate-500 text-sm">
          Respuesta garantizada en menos de 4 horas. Precios directos de fábrica en Fort Lauderdale.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {submitError}
        </div>
      )}

      {/* 1. Selección de Producto */}
      <div className="mb-6">
        <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          1. ¿Qué tipo de letrero o producto necesita? *
        </label>
        <select
          value={selectedCatId}
          onChange={(e) => setSelectedCatId(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-[#ff2d78] focus:bg-white text-sm"
        >
          {CATEGORIAS_ES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Medidas Opcionales */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider">
            2. Medidas Estimadas (Opcional)
          </label>
          <button
            type="button"
            onClick={() => setShowDimensions(!showDimensions)}
            className="text-xs font-bold text-[#ff2d78] hover:underline"
          >
            {showDimensions ? "Ocultar medidas" : "+ Agregar ancho y alto"}
          </button>
        </div>

        {showDimensions && (
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Ancho</span>
              <input
                type="text"
                placeholder="Ej. 6"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Alto</span>
              <input
                type="text"
                placeholder="Ej. 3"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">Unidad</span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as "ft" | "in")}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold"
              >
                <option value="ft">Pies (ft)</option>
                <option value="in">Pulgadas (in)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 3. Detalles del Proyecto */}
      <div className="mb-6">
        <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          3. Cuéntenos sobre su letrero o negocio *
        </label>
        <textarea
          rows={3}
          required
          placeholder="Ej: Necesitamos un letrero luminoso de fachada para un restaurante en Oakland Park, o 3 banners retráctiles para un evento el próximo viernes."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-normal text-slate-900 focus:outline-none focus:border-[#ff2d78] focus:bg-white text-sm"
        />
      </div>

      {/* 4. Subir Archivo o Logo */}
      <div className="mb-6">
        <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          4. Subir Logo o Foto de la Fachada (Opcional)
        </label>
        <div className="border-2 border-dashed border-slate-200 hover:border-pink-300 rounded-2xl p-4 text-center bg-slate-50/50 transition-colors">
          <input
            type="file"
            id="file-upload-es"
            className="hidden"
            accept="image/*,.pdf,.ai,.eps,.psd"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload-es" className="cursor-pointer flex flex-col items-center justify-center gap-1.5">
            <UploadCloud className="w-6 h-6 text-pink-500" />
            <span className="text-xs font-bold text-slate-700">
              {file ? file.name : "Haga clic para adjuntar archivo (PDF, JPG, PNG, AI)"}
            </span>
            <span className="text-[10px] text-slate-400">Hasta 25MB • Lo revisamos gratis</span>
          </label>
        </div>
        {fileUploading && <p className="text-xs text-pink-600 mt-1">Cargando archivo...</p>}
        {fileError && <p className="text-xs text-red-600 mt-1">{fileError}</p>}
      </div>

      {/* 5. Datos de Contacto */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Su Nombre Completo *
          </label>
          <input
            type="text"
            required
            placeholder="Juan Pérez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:bg-white"
          />
        </div>
        <div>
          <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Teléfono o WhatsApp *
          </label>
          <input
            type="tel"
            required
            placeholder="(305) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:bg-white"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-poppins text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Correo Electrónico *
          </label>
          <input
            type="email"
            required
            placeholder="correo@sunegocio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:bg-white"
          />
        </div>
      </div>

      {/* Pedido Urgente */}
      <div className="mb-6 flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
        <input
          type="checkbox"
          id="rush-order-es"
          checked={isRushOrder}
          onChange={(e) => setIsRushOrder(e.target.checked)}
          className="w-4 h-4 text-[#ff2d78] rounded focus:ring-pink-500"
        />
        <label htmlFor="rush-order-es" className="text-xs font-bold text-amber-900 cursor-pointer">
          ⚡ ¿Es un pedido urgente para entrega en 24 horas? (Marcar esta opción)
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl text-white font-poppins font-black text-base brand-gradient shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {submitting ? (
          <span>Enviando información...</span>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>SOLICITAR COTIZACIÓN GRATIS EN ESPAÑOL</span>
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 text-center">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          Respuesta en 4 horas
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
          Sin compromiso de compra
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          Retiro en taller (Fort Lauderdale, FL)
        </span>
      </div>
    </form>
  );
}

export default SpanishQuoteForm;
