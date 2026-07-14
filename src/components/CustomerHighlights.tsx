

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const customerPhotos = [
  { image: "/images/customer-highlights/highlight_1.jpeg" },
  { image: "/images/customer-highlights/highlight_2.jpeg" },
  { image: "/images/customer-highlights/highlight_3.jpeg" },
  { image: "/images/customer-highlights/highlight_4.jpeg" },
  { image: "/images/customer-highlights/highlight_5.jpeg" },
  { image: "/images/customer-highlights/highlight_6.jpeg" },
  { image: "/images/customer-highlights/highlight_7.jpeg" },
  { image: "/images/customer-highlights/highlight_8.jpeg" },
  { image: "/images/customer-highlights/highlight_9.jpeg" },
];

export function CustomerHighlights() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
    resetZoom();
  }, [resetZoom]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null
        ? (prev - 1 + customerPhotos.length) % customerPhotos.length
        : null,
    );
    resetZoom();
  }, [activePhotoIndex, resetZoom]);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev + 1) % customerPhotos.length : null,
    );
    resetZoom();
  }, [activePhotoIndex, resetZoom]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.5, 1);
      if (nextScale === 1) {
        setOffset({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  // Prevent scroll when open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePhotoIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, closeLightbox, handlePrev, handleNext]);

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag / Pan handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - offset.x,
      y: touch.clientY - offset.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (activePhotoIndex === null) return;
    e.preventDefault();
    const zoomIntensity = 0.1;
    const direction = e.deltaY < 0 ? 1 : -1;
    setScale((prev) => {
      const nextScale = Math.min(
        Math.max(prev + direction * zoomIntensity, 1),
        5,
      );
      if (nextScale === 1) {
        setOffset({ x: 0, y: 0 });
      }
      return nextScale;
    });
  };

  return (
    <section
      className="py-4 md:py-6"
      style={{
        background: "linear-gradient(160deg, #f9f0ff 0%, #e0faff 100%)",
      }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6 tracking-tight pink-cyan-text">
          Customer Highlights
        </h2>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {customerPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group cursor-pointer rounded-2xl shadow-md"
              onClick={() => setActivePhotoIndex(index)}
            >
              <Image
                src={photo.image}
                alt={`Customer highlight ${index + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 550px"
                quality={95}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Pink/cyan gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,45,120,0.85) 0%, rgba(176,32,255,0.45) 100%)",
                }}
              >
                <div className="p-3 text-white flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-bold tracking-wide font-poppins uppercase">
                    Click to Zoom
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md select-none transition-all duration-300 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Header Controls */}
          <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-10 bg-gradient-to-b from-black/50 to-transparent">
            <span className="text-white font-poppins text-sm font-semibold tracking-wide">
              {activePhotoIndex + 1} / {customerPhotos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-10 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 z-10 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Canvas Container */}
          <div
            className="w-full h-full flex items-center justify-center p-4 overflow-hidden"
            onWheel={handleWheel}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            <div
              className={`relative max-w-full max-h-[75vh] flex items-center justify-center transition-transform duration-200 ${isDragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : ""
                }`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                ref={imageRef}
                src={customerPhotos[activePhotoIndex].image}
                alt={`Customer highlight ${activePhotoIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-6 inset-x-6 flex flex-col items-center gap-3 z-10 pointer-events-none">
            <div className="bg-black/75 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 border border-white/10 shadow-lg pointer-events-auto">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 1}
                className="p-1.5 text-white/80 hover:text-white disabled:text-white/35 disabled:hover:text-white/35 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <span className="text-white font-mono text-xs w-10 text-center font-medium select-none">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={scale >= 5}
                className="p-1.5 text-white/80 hover:text-white disabled:text-white/35 disabled:hover:text-white/35 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="w-[1px] h-4 bg-white/20" />

              <button
                onClick={resetZoom}
                disabled={scale === 1 && offset.x === 0 && offset.y === 0}
                className="p-1.5 text-white/80 hover:text-white disabled:text-white/35 disabled:hover:text-white/35 transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
