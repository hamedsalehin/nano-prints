"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { ClipartItem } from "./ClipartLibrary";
import * as Icons from "lucide-react";

export type ElementType = "text" | "shape" | "clipart" | "image";

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number; // percentage (0 to 100) of canvas width
  y: number; // percentage (0 to 100) of canvas height
  width: number; // percentage of canvas width
  height: number; // percentage of canvas height
  rotation: number; // degrees (0 to 360)
  opacity?: number; // 0 to 1
  aspectLocked?: boolean;

  // Text specific
  content?: string;
  fontFamily?: string;
  fontSize?: number; // in pixels relative to 1000px virtual width
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: "left" | "center" | "right";

  // Shape specific
  shapeType?: "rect" | "circle" | "triangle" | "star" | "line";
  fillColor?: string;
  borderWidth?: number;
  borderColor?: string;

  // Clipart specific
  clipartId?: string;

  // Image specific
  imageUrl?: string;
  imageFile?: File;
  resolutionQuality?: "excellent" | "good" | "poor";
}

interface DesignCanvasProps {
  elements: CanvasElement[];
  selectedId: string | null;
  canvasSize: { width: number; height: number }; // Aspect ratio (e.g. 24x18 is 4:3)
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: string | null;
  showGrid: boolean;
  snapToGrid: boolean;
  onElementsChange: (elements: CanvasElement[]) => void;
  onSelectElement: (id: string | null) => void;
  historyPush: (elements: CanvasElement[]) => void;
}

export function DesignCanvas({
  elements,
  selectedId,
  canvasSize,
  backgroundColor,
  backgroundGradient,
  backgroundImage,
  showGrid,
  snapToGrid,
  onElementsChange,
  onSelectElement,
  historyPush,
}: DesignCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedElement = elements.find((el) => el.id === selectedId);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dragging states
  const [dragState, setDragState] = useState<{
    type: "move" | "resize" | "rotate" | null;
    handle?: string;
    startX: number;
    startY: number;
    startElementX: number;
    startElementY: number;
    startElementW: number;
    startElementH: number;
    startRotation: number;
    startFontSize: number;
  }>({
    type: null,
    startX: 0,
    startY: 0,
    startElementX: 0,
    startElementY: 0,
    startElementW: 0,
    startElementH: 0,
    startRotation: 0,
    startFontSize: 0,
  });

  // Handle outside click to deselect
  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".designer-sidebar") &&
        !(e.target as Element).closest(".designer-toolbar") &&
        !(e.target as Element).closest(".designer-context-panel")
      ) {
        onSelectElement(null);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [onSelectElement]);

  // Keybindings (e.g., delete key to delete element)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      // Do not delete if typing in inputs/textareas
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        const updated = elements.filter((el) => el.id !== selectedId);
        onElementsChange(updated);
        historyPush(updated);
        onSelectElement(null);
      } else if (e.key === "d" && (e.ctrlKey || e.metaKey)) {
        // Duplicate
        e.preventDefault();
        const source = elements.find((el) => el.id === selectedId);
        if (source) {
          const duplicated: CanvasElement = {
            ...source,
            id: `el_${Date.now()}`,
            x: Math.min(80, source.x + 5),
            y: Math.min(80, source.y + 5),
          };
          const updated = [...elements, duplicated];
          onElementsChange(updated);
          historyPush(updated);
          onSelectElement(duplicated.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, elements, onElementsChange, onSelectElement, historyPush]);

  // Auto-fit text element dimensions to tightly wrap visible text content
  // Uses off-screen canvas to measure text width/height and adjusts element %
  const autoFitTextElements = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const refWidth = canvasSize.width > canvasSize.height ? 650 : 400;
    let changed = false;
    const updated = elements.map((el) => {
      if (el.type !== "text" || !el.content) return el;

      const fontSize = el.fontSize || 32;
      // Convert cqw font size to actual pixels at current container width
      const fontSizePx = (fontSize / refWidth) * rect.width;
      const fontWeight = el.bold ? "bold" : "normal";
      const fontStyle = el.italic ? "italic" : "normal";
      const fontFamily = el.fontFamily || "Inter";

      // Measure text using off-screen canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return el;

      ctx.font = `${fontStyle} ${fontWeight} ${fontSizePx}px ${fontFamily}`;
      const metrics = ctx.measureText(el.content);
      const textWidth = metrics.width;
      const textHeight = fontSizePx * 1.2; // lineHeight ~1.1 + small padding

      // Convert pixel dimensions to percentage of canvas container
      const newWidthPercent = Math.max(8, (textWidth / rect.width) * 100 + 3); // +3% padding
      const newHeightPercent = Math.max(5, (textHeight / rect.height) * 100 + 1.5); // +1.5% padding

      // Only update if dimensions differ significantly (>2% diff)
      const wDiff = Math.abs(newWidthPercent - el.width);
      const hDiff = Math.abs(newHeightPercent - el.height);
      if (wDiff > 2 || hDiff > 2) {
        changed = true;
        return { ...el, width: Math.round(newWidthPercent * 10) / 10, height: Math.round(newHeightPercent * 10) / 10 };
      }
      return el;
    });

    if (changed) {
      onElementsChange(updated);
    }
  }, [elements, canvasSize, onElementsChange]);

  // Run auto-fit on mount and when elements change content/fontSize
  useEffect(() => {
    // Small delay to let fonts load and container render
    const timer = setTimeout(autoFitTextElements, 100);
    return () => clearTimeout(timer);
  }, [autoFitTextElements]);

  // Get active clipart icon component
  const renderClipart = (clipartId: string, color: string = "#000000") => {
    const standardIcons = Icons as unknown as Record<
      string,
      React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    >;
    // Map kebab-case clipartId back to Lucide CamelCase
    const formattedId = clipartId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const IconComp = standardIcons[formattedId] || Icons.HelpCircle;
    return <IconComp className="w-full h-full" style={{ color }} />;
  };

  // Drag and Interaction handlers
  const handleInteractionStart = (
    e: React.PointerEvent,
    type: "move" | "resize" | "rotate",
    handle?: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedElement) return;

    setDragState({
      type,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startElementX: selectedElement.x,
      startElementY: selectedElement.y,
      startElementW: selectedElement.width,
      startElementH: selectedElement.height,
      startRotation: selectedElement.rotation,
      startFontSize: selectedElement.fontSize || 32,
    });
  };

  useEffect(() => {
    if (!dragState.type || !selectedElement) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      // Convert delta px to delta percentage
      const deltaPercentX = (deltaX / rect.width) * 100;
      const deltaPercentY = (deltaY / rect.height) * 100;

      const updatedElements = [...elements];
      const targetIdx = updatedElements.findIndex(
        (el) => el.id === selectedElement.id,
      );
      if (targetIdx === -1) return;

      const element = { ...updatedElements[targetIdx] };

      if (dragState.type === "move") {
        let newX = dragState.startElementX + deltaPercentX;
        let newY = dragState.startElementY + deltaPercentY;

        const centerX = newX + element.width / 2;
        const centerY = newY + element.height / 2;

        // Snap to X-axis center (50%) with 2% tolerance (always active)
        if (Math.abs(centerX - 50) < 2) {
          newX = 50 - element.width / 2;
        } else if (snapToGrid) {
          newX = Math.round(newX / 5) * 5;
        }

        // Snap to Y-axis center (50%) with 2% tolerance (always active)
        if (Math.abs(centerY - 50) < 2) {
          newY = 50 - element.height / 2;
        } else if (snapToGrid) {
          newY = Math.round(newY / 5) * 5;
        }

        // Allow elements to be dragged completely off-canvas (up to -200% to 200%)
        element.x = Math.max(-200, Math.min(200, newX));
        element.y = Math.max(-200, Math.min(200, newY));
      } else if (dragState.type === "resize" && dragState.handle) {
        const startW = dragState.startElementW;
        const startH = dragState.startElementH;
        const startX = dragState.startElementX;
        const startY = dragState.startElementY;
        const thetaRad = ((dragState.startRotation || 0) * Math.PI) / 180;
        const cos = Math.cos(thetaRad);
        const sin = Math.sin(thetaRad);

        // Transform client-space delta (pixels) to element's local coordinate system (pixels)
        const localDeltaX_px = deltaX * cos + deltaY * sin;
        const localDeltaY_px = -deltaX * sin + deltaY * cos;

        // Convert pixel delta to percentage of canvas dimensions
        const localDeltaX = (localDeltaX_px / rect.width) * 100;
        const localDeltaY = (localDeltaY_px / rect.height) * 100;

        const handle = dragState.handle;
        const aspectLocked = element.aspectLocked !== undefined 
          ? element.aspectLocked 
          : (element.type === "image" || element.type === "clipart");

        let newWidth = startW;
        let newHeight = startH;

        // Compute candidate dimensions based on active drag handles
        if (handle.includes("e")) {
          newWidth = startW + localDeltaX;
        } else if (handle.includes("w")) {
          newWidth = startW - localDeltaX;
        }

        if (handle.includes("s")) {
          newHeight = startH + localDeltaY;
        } else if (handle.includes("n")) {
          newHeight = startH - localDeltaY;
        }

        // Apply aspect ratio lock if active
        if (aspectLocked) {
          const startAspect = startW / startH;
          let scale = 1;
          if (handle === "e" || handle === "w") {
            scale = newWidth / startW;
          } else if (handle === "n" || handle === "s") {
            scale = newHeight / startH;
          } else {
            // Diagonal handles: compute X and Y scales, and pick the one with greater change
            const scaleX = newWidth / startW;
            const scaleY = newHeight / startH;
            scale = Math.abs(scaleX - 1) > Math.abs(scaleY - 1) ? scaleX : scaleY;
          }
          // Constrain sizes to avoid negative or tiny scales
          scale = Math.max(0.01, scale);
          newWidth = startW * scale;
          newHeight = startH * scale;
        }

        // Apply snapToGrid and clamp to minimum size
        if (snapToGrid) {
          newWidth = Math.round(newWidth / 5) * 5;
          newHeight = Math.round(newHeight / 5) * 5;
        }
        newWidth = Math.max(5, newWidth);
        newHeight = Math.max(5, newHeight);

        // For text elements, scale font size proportionally with resize
        if (element.type === "text" && element.fontSize) {
          const widthScale = newWidth / dragState.startElementW;
          const heightScale = newHeight / dragState.startElementH;
          const scale = Math.min(widthScale, heightScale);
          element.fontSize = Math.max(8, Math.round(dragState.startFontSize * scale));
        }

        // Anchor point in local unrotated element percentage space (relative to its center)
        let anchorLocalX = 0;
        if (handle.includes("e")) {
          anchorLocalX = -startW / 2;
        } else if (handle.includes("w")) {
          anchorLocalX = startW / 2;
        }

        let anchorLocalY = 0;
        if (handle.includes("s")) {
          anchorLocalY = -startH / 2;
        } else if (handle.includes("n")) {
          anchorLocalY = startH / 2;
        }

        // Convert start center and anchor point to pixel coordinates
        const startCenterX_px = (startX + startW / 2) * (rect.width / 100);
        const startCenterY_px = (startY + startH / 2) * (rect.height / 100);
        const anchorLocalX_px = anchorLocalX * (rect.width / 100);
        const anchorLocalY_px = anchorLocalY * (rect.height / 100);

        // Compute anchor point in world pixel coordinates
        const anchorWorldX_px = startCenterX_px + anchorLocalX_px * cos - anchorLocalY_px * sin;
        const anchorWorldY_px = startCenterY_px + anchorLocalX_px * sin + anchorLocalY_px * cos;

        // Anchor point in new local unrotated element percentage space (relative to its new center)
        let newAnchorLocalX = 0;
        if (handle.includes("e")) {
          newAnchorLocalX = -newWidth / 2;
        } else if (handle.includes("w")) {
          newAnchorLocalX = newWidth / 2;
        }

        let newAnchorLocalY = 0;
        if (handle.includes("s")) {
          newAnchorLocalY = -newHeight / 2;
        } else if (handle.includes("n")) {
          newAnchorLocalY = newHeight / 2;
        }

        // Convert new local anchor point to pixel units
        const newAnchorLocalX_px = newAnchorLocalX * (rect.width / 100);
        const newAnchorLocalY_px = newAnchorLocalY * (rect.height / 100);

        // Solve for newCenter_px
        const newCenterX_px = anchorWorldX_px - (newAnchorLocalX_px * cos - newAnchorLocalY_px * sin);
        const newCenterY_px = anchorWorldY_px - (newAnchorLocalX_px * sin + newAnchorLocalY_px * cos);

        // Convert new center back to percentage coordinates
        const newCenterX = (newCenterX_px / rect.width) * 100;
        const newCenterY = (newCenterY_px / rect.height) * 100;

        // Calculate new top-left corner coordinates (x, y)
        element.width = newWidth;
        element.height = newHeight;
        element.x = newCenterX - newWidth / 2;
        element.y = newCenterY - newHeight / 2;
      } else if (dragState.type === "rotate") {
        // Rotation logic relative to element center
        const elementCenterPx = {
          x: rect.left + (element.x + element.width / 2) * (rect.width / 100),
          y: rect.top + (element.y + element.height / 2) * (rect.height / 100),
        };

        const angleRad = Math.atan2(
          e.clientY - elementCenterPx.y,
          e.clientX - elementCenterPx.x,
        );
        let angleDeg = (angleRad * 180) / Math.PI + 90; // Add 90 offset because handle is pointing up
        if (angleDeg < 0) angleDeg += 360;

        if (snapToGrid) {
          // Snap to nearest 15 degrees
          angleDeg = Math.round(angleDeg / 15) * 15;
        }

        element.rotation = Math.round(angleDeg) % 360;
      }

      updatedElements[targetIdx] = element;
      onElementsChange(updatedElements);
    };

    const handlePointerUp = () => {
      setDragState({
        type: null,
        startX: 0,
        startY: 0,
        startElementX: 0,
        startElementY: 0,
        startElementW: 0,
        startElementH: 0,
        startRotation: 0,
        startFontSize: 0,
      });
      // Save state into history after completion of drag operation
      historyPush(elements);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    dragState,
    elements,
    selectedElement,
    snapToGrid,
    onElementsChange,
    historyPush,
  ]);

  // Render element borders and handles
  const renderSelectionFrame = (el: CanvasElement) => {
    if (selectedId !== el.id) return null;

    const handles = ["nw", "ne", "se", "sw", "n", "e", "s", "w"];

    return (
      <div className="absolute inset-0 border-2 border-[#ff2d78] pointer-events-none select-none">
        {/* Rotation Handle */}
        <div
          className="absolute left-1/2 -top-9 -translate-x-1/2 flex flex-col items-center cursor-alias pointer-events-auto"
          onPointerDown={(e) => handleInteractionStart(e, "rotate")}
        >
          <div className="w-0.5 h-5 bg-[#ff2d78]" />
          <div className="w-3.5 h-3.5 bg-[#ff2d78] hover:bg-yellow-300 rounded-full border-2 border-slate-900 shadow-md transition-colors" />
        </div>

        {/* Quick Toolbar overlay — counter-rotate so it stays readable */}
        <div
          className="absolute left-1/2 -bottom-14 -translate-x-1/2 flex items-center bg-slate-900 border border-slate-800 text-white rounded-lg px-2 py-1 shadow-xl gap-2 pointer-events-auto z-50"
          style={{ transform: `rotate(${-(el.rotation || 0)}deg)` }}
        >
          <button
            onClick={() => {
              const updated = elements.filter((item) => item.id !== el.id);
              onElementsChange(updated);
              historyPush(updated);
              onSelectElement(null);
            }}
            title="Delete"
            className="p-1 hover:bg-slate-800 text-red-400 hover:text-red-300 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const duplicated: CanvasElement = {
                ...el,
                id: `el_${Date.now()}`,
                x: Math.min(80, el.x + 5),
                y: Math.min(80, el.y + 5),
              };
              const updated = [...elements, duplicated];
              onElementsChange(updated);
              historyPush(updated);
              onSelectElement(duplicated.id);
            }}
            title="Duplicate"
            className="p-1 hover:bg-slate-800 text-slate-350 hover:text-slate-200 rounded transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const updated = [...elements];
              const idx = updated.findIndex((item) => item.id === el.id);
              if (idx !== -1 && idx < updated.length - 1) {
                // Move forward in array
                const tmp = updated[idx];
                updated[idx] = updated[idx + 1];
                updated[idx + 1] = tmp;
                onElementsChange(updated);
                historyPush(updated);
              }
            }}
            title="Bring Forward"
            className="p-1 hover:bg-slate-800 text-slate-350 hover:text-slate-200 rounded transition-colors"
          >
            <MoveUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const updated = [...elements];
              const idx = updated.findIndex((item) => item.id === el.id);
              if (idx > 0) {
                // Move backward in array
                const tmp = updated[idx];
                updated[idx] = updated[idx - 1];
                updated[idx - 1] = tmp;
                onElementsChange(updated);
                historyPush(updated);
              }
            }}
            title="Send Backward"
            className="p-1 hover:bg-slate-800 text-slate-350 hover:text-slate-200 rounded transition-colors"
          >
            <MoveDown className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 hover:text-white select-none cursor-pointer pl-2 border-l border-slate-700 ml-1">
            <input
              type="checkbox"
              id={`aspect-lock-${el.id}`}
              checked={el.aspectLocked !== undefined ? el.aspectLocked : (el.type === "image" || el.type === "clipart")}
              onChange={(e) => {
                const updated = elements.map((item) =>
                  item.id === el.id
                    ? { ...item, aspectLocked: e.target.checked }
                    : item,
                );
                onElementsChange(updated);
                historyPush(updated);
              }}
              className="accent-[#ff2d78] w-3 h-3 rounded bg-slate-850 border-slate-700 cursor-pointer"
            />
            <label htmlFor={`aspect-lock-${el.id}`} className="whitespace-nowrap cursor-pointer select-none">
              Lock Aspect
            </label>
          </div>
        </div>

        {/* Resize Handles */}
        {handles.map((h) => {
          let posClass = "";
          switch (h) {
            case "nw":
              posClass = "-left-1.5 -top-1.5 cursor-nwse-resize";
              break;
            case "ne":
              posClass = "-right-1.5 -top-1.5 cursor-nesw-resize";
              break;
            case "se":
              posClass = "-right-1.5 -bottom-1.5 cursor-nwse-resize";
              break;
            case "sw":
              posClass = "-left-1.5 -bottom-1.5 cursor-nesw-resize";
              break;
            case "n":
              posClass = "left-1/2 -top-1.5 -translate-x-1/2 cursor-ns-resize";
              break;
            case "e":
              posClass = "top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize";
              break;
            case "s":
              posClass =
                "left-1/2 -bottom-1.5 -translate-x-1/2 cursor-ns-resize";
              break;
            case "w":
              posClass = "top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize";
              break;
          }

          return (
            <div
              key={h}
              className={`absolute w-3 h-3 bg-white border-2 border-[#ff2d78] pointer-events-auto rounded-full shadow-md z-40 transition-transform hover:scale-125 ${posClass}`}
              onPointerDown={(e) => handleInteractionStart(e, "resize", h)}
            />
          );
        })}
      </div>
    );
  };

  const isDragging = dragState.type === "move";
  const showSnapX =
    isDragging &&
    selectedElement &&
    Math.abs(selectedElement.x + selectedElement.width / 2 - 50) < 0.05;
  const showSnapY =
    isDragging &&
    selectedElement &&
    Math.abs(selectedElement.y + selectedElement.height / 2 - 50) < 0.05;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-300 overflow-visible select-none transition-all duration-355 touch-none bg-white"
      style={{
        aspectRatio: `${canvasSize.width} / ${canvasSize.height}`,
        backgroundColor: backgroundColor,
        backgroundImage:
          backgroundGradient ||
          (backgroundImage ? `url(${backgroundImage})` : "none"),
        backgroundSize: "cover",
        backgroundPosition: "center",
        containerType: "inline-size",
      }}
      onClick={() => onSelectElement(null)}
    >
      {/* Center Snap Lines */}
      {showSnapX && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#ff2d78] z-35 pointer-events-none shadow-[0_0_8px_#ff2d78]"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        />
      )}
      {showSnapY && (
        <div
          className="absolute left-0 right-0 h-0.5 bg-[#ff2d78] z-35 pointer-events-none shadow-[0_0_8px_#ff2d78]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      )}
      {/* Grid Lines */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #475569 1px, transparent 1px),
              linear-gradient(to bottom, #475569 1px, transparent 1px)
            `,
            backgroundSize: "5% 5%",
          }}
        />
      )}

      {/* Print Bleed & Safety Guidelines */}
      <div
        className="absolute border border-dashed border-red-500/60 pointer-events-none z-20"
        style={{
          top: "2.5%",
          left: "2.5%",
          right: "2.5%",
          bottom: "2.5%",
        }}
      >
        <span className="absolute top-1 left-2 text-[8px] font-semibold text-red-500/80 bg-slate-900/10 px-1 rounded uppercase tracking-wider select-none">
          Safety Margin
        </span>
        <span className="absolute bottom-1 right-2 text-[8px] font-semibold text-red-500/80 bg-slate-900/10 px-1 rounded uppercase tracking-wider select-none">
          Bleed Area
        </span>
      </div>

      {/* Clipped Elements Content Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-10">
        {elements.map((el, idx) => {
          const isSelected = selectedId === el.id;
          const opacity = el.opacity !== undefined ? el.opacity : 1;
          const refWidth = canvasSize.width > canvasSize.height ? 650 : 400;

          return (
            <div
              key={el.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement(el.id);
              }}
              onDoubleClick={(e) => {
                if (el.type === "text") {
                  e.stopPropagation();
                  setEditingId(el.id);
                }
              }}
              onPointerDown={(e) => {
                if (editingId === el.id) return;
                handleInteractionStart(e, "move");
              }}
              className={`absolute transition-shadow pointer-events-auto ${
                editingId === el.id ? "cursor-text" : "cursor-move"
              } ${
                isSelected
                  ? "select-all"
                  : "hover:outline hover:outline-1 hover:outline-dashed hover:outline-yellow-400"
              }`}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: "center center",
                opacity: opacity,
                zIndex: idx,
              }}
            >
              {/* Content */}
              <div className={`w-full h-full flex items-center justify-center overflow-hidden ${editingId === el.id ? "select-text pointer-events-auto" : "select-none"}`}>
                {el.type === "text" && (
                  <div
                    contentEditable={editingId === el.id}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      if (editingId !== el.id) return;
                      const newText = e.currentTarget.textContent || "";
                      setEditingId(null);
                      if (newText !== el.content) {
                        const updated = elements.map((item) =>
                          item.id === el.id ? { ...item, content: newText } : item
                        );
                        onElementsChange(updated);
                        historyPush(updated);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (editingId !== el.id) return;
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.blur();
                      } else if (e.key === "Escape") {
                        e.preventDefault();
                        e.currentTarget.textContent = el.content || "";
                        e.currentTarget.blur();
                      }
                    }}
                    onFocus={(e) => {
                      const range = document.createRange();
                      range.selectNodeContents(e.currentTarget);
                      const selection = window.getSelection();
                      if (selection) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                      }
                    }}
                    ref={(node) => {
                      if (node && editingId === el.id && document.activeElement !== node) {
                        node.focus();
                      }
                    }}
                    className={`w-full h-full flex items-center select-text outline-none truncate ${
                      editingId === el.id ? "cursor-text pointer-events-auto" : "select-none pointer-events-none"
                    }`}
                    style={{
                      fontFamily: el.fontFamily || "Inter",
                      color: el.color || "#000000",
                      fontWeight: el.bold ? "bold" : "normal",
                      fontStyle: el.italic ? "italic" : "normal",
                      textDecoration: el.underline ? "underline" : "none",
                      justifyContent:
                        el.align === "left"
                          ? "flex-start"
                          : el.align === "right"
                            ? "flex-end"
                            : "center",
                      textAlign: el.align || "center",
                      fontSize: `${((el.fontSize || 32) / refWidth) * 100}cqw`,
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.1",
                      WebkitTextStroke: el.strokeColor
                        ? `${((el.strokeWidth || 1) / refWidth) * 100}cqw ${el.strokeColor}`
                        : "none",
                    }}
                  >
                    {el.content || "Double click to edit"}
                  </div>
                )}

                {el.type === "shape" && (
                  <div className="w-full h-full flex items-center justify-center p-1">
                    {el.shapeType === "rect" && (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                    {el.shapeType === "circle" && (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                        }}
                      />
                    )}
                    {el.shapeType === "triangle" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,5 95,95 5,95"
                          fill={el.fillColor || "#3b82f6"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "star" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,2 64,36 100,36 71,57 81,95 50,72 19,95 29,57 0,36 36,36"
                          fill={el.fillColor || "#eab308"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "line" && (
                      <div
                        className="w-full"
                        style={{
                          height: `${el.borderWidth || 4}px`,
                          backgroundColor: el.fillColor || "#000",
                        }}
                      />
                    )}
                  </div>
                )}

                {el.type === "clipart" && el.clipartId && (
                  <div className="w-full h-full p-1.5 flex items-center justify-center">
                    {renderClipart(el.clipartId, el.color)}
                  </div>
                )}

                {el.type === "image" && el.imageUrl && (
                  <div className="w-full h-full relative p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={el.imageUrl}
                      alt="Uploaded element"
                      className="w-full h-full object-fill pointer-events-none"
                    />
                    {el.resolutionQuality === "poor" && (
                      <div className="absolute top-1 right-1 bg-red-600/90 text-white text-[8px] font-bold px-1 rounded-sm shadow-md flex items-center gap-0.5 z-10 pointer-events-none">
                        Low Res!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unclipped Selection Frame & Handles Layer */}
      {selectedElement && (
        <div
          className="absolute pointer-events-none z-30"
          style={{
            left: `${selectedElement.x}%`,
            top: `${selectedElement.y}%`,
            width: `${selectedElement.width}%`,
            height: `${selectedElement.height}%`,
            transform: `rotate(${selectedElement.rotation || 0}deg)`,
            transformOrigin: "center center",
          }}
        >
          {renderSelectionFrame(selectedElement)}
        </div>
      )}
    </div>
  );
}
