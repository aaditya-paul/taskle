"use client";

import React, {useState, useRef, useEffect} from "react";
import {
  Pen,
  Eraser,
  Square,
  Circle,
  Type,
  Download,
  Upload,
  Trash2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Save,
  Users,
  Share,
} from "lucide-react";

interface DrawingTool {
  type: "pen" | "eraser" | "rectangle" | "circle" | "text" | "move";
  color: string;
  size: number;
}

const WhiteboardPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<DrawingTool>({
    type: "pen",
    color: "#fbbf24", // yellow-400
    size: 3,
  });
  const [zoom, setZoom] = useState(100);

  const colors = [
    "#fbbf24", // yellow-400
    "#ffffff", // white
    "#000000", // black
    "#ef4444", // red-500
    "#3b82f6", // blue-500
    "#10b981", // green-500
    "#8b5cf6", // purple-500
    "#f97316", // orange-500
    "#ec4899", // pink-500
    "#06b6d4", // cyan-500
  ];

  const toolSizes = [1, 2, 3, 5, 8, 12, 16];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Set initial canvas background
    ctx.fillStyle = "#1f2937"; // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool.type === "move") return;

    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool.type === "move") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (tool.type === "pen") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = tool.color;
      ctx.lineWidth = tool.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool.type === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = tool.size * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#1f2937"; // gray-800
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex flex-col">
      {/* Header */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-gray-700/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-virgil text-yellow-300 font-bold">
              Project Whiteboard
            </h1>
            <p className="font-patrick-hand text-foreground/70">
              Collaborate and brainstorm with your team
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200">
              <Users size={16} />
              <span className="hidden md:inline">Collaborators</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-300 font-patrick-hand hover:bg-blue-600/30 transition-all duration-200">
              <Share size={16} />
              <span className="hidden md:inline">Share</span>
            </button>
            <button
              onClick={downloadCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-patrick-hand font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200"
            >
              <Save size={16} />
              <span className="hidden md:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Toolbar */}
        <div className="w-20 md:w-64 bg-secondary/50 backdrop-blur-sm border-r border-gray-700/50 p-4 space-y-4">
          {/* Drawing Tools */}
          <div className="space-y-3">
            <h3 className="hidden md:block text-sm font-patrick-hand text-foreground/80 font-medium">
              Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button
                onClick={() => setTool({...tool, type: "pen"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "pen"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Pen size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Pen
                </span>
              </button>
              <button
                onClick={() => setTool({...tool, type: "eraser"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "eraser"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Eraser size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Eraser
                </span>
              </button>
              <button
                onClick={() => setTool({...tool, type: "rectangle"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "rectangle"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Square size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Square
                </span>
              </button>
              <button
                onClick={() => setTool({...tool, type: "circle"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "circle"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Circle size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Circle
                </span>
              </button>
              <button
                onClick={() => setTool({...tool, type: "text"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "text"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Type size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Text
                </span>
              </button>
              <button
                onClick={() => setTool({...tool, type: "move"})}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  tool.type === "move"
                    ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                    : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                }`}
              >
                <Move size={20} className="mx-auto" />
                <span className="hidden md:block text-xs font-patrick-hand mt-1">
                  Move
                </span>
              </button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <h3 className="hidden md:block text-sm font-patrick-hand text-foreground/80 font-medium">
              Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setTool({...tool, color})}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                    tool.color === color
                      ? "border-yellow-400 scale-110"
                      : "border-gray-600/50 hover:border-gray-500/50"
                  }`}
                  style={{backgroundColor: color}}
                />
              ))}
            </div>
          </div>

          {/* Brush Size */}
          <div className="space-y-3">
            <h3 className="hidden md:block text-sm font-patrick-hand text-foreground/80 font-medium">
              Size
            </h3>
            <div className="hidden md:grid grid-cols-4 gap-2">
              {toolSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setTool({...tool, size})}
                  className={`p-2 rounded-lg border transition-all duration-200 ${
                    tool.size === size
                      ? "border-yellow-400/50 bg-yellow-400/20 text-yellow-300"
                      : "border-gray-600/50 bg-gray-700/20 text-foreground/70 hover:bg-gray-700/40"
                  }`}
                >
                  <div
                    className="w-full rounded-full bg-current mx-auto"
                    style={{height: `${Math.min(size, 12)}px`}}
                  />
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <input
                type="range"
                min="1"
                max="16"
                value={tool.size}
                onChange={(e) =>
                  setTool({...tool, size: parseInt(e.target.value)})
                }
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-700/50">
            <h3 className="hidden md:block text-sm font-patrick-hand text-foreground/80 font-medium">
              Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full p-2 md:p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200 flex items-center justify-center gap-2">
                <Undo size={16} />
                <span className="hidden md:inline">Undo</span>
              </button>
              <button className="w-full p-2 md:p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200 flex items-center justify-center gap-2">
                <Redo size={16} />
                <span className="hidden md:inline">Redo</span>
              </button>
              <button
                onClick={clearCanvas}
                className="w-full p-2 md:p-3 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300 font-patrick-hand hover:bg-red-600/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                <span className="hidden md:inline">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Controls */}
          <div className="bg-secondary/50 backdrop-blur-sm border-b border-gray-700/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={zoomOut}
                className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground hover:bg-gray-700/70 transition-all duration-200"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-sm font-patrick-hand text-foreground/70 min-w-16 text-center">
                {zoom}%
              </span>
              <button
                onClick={zoomIn}
                className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground hover:bg-gray-700/70 transition-all duration-200"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200">
                <Upload size={16} />
                Import
              </button>
              <button
                onClick={downloadCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-foreground font-patrick-hand hover:bg-gray-700/70 transition-all duration-200"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-4 overflow-auto bg-gray-900/20">
            <div className="flex items-center justify-center min-h-full">
              <div
                style={{transform: `scale(${zoom / 100})`}}
                className="border border-gray-600/50 rounded-lg overflow-hidden shadow-2xl"
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className={`bg-gray-800 ${
                    tool.type === "move" ? "cursor-move" : "cursor-crosshair"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;
