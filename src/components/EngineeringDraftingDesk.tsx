import { useState, useRef, useEffect, useCallback } from 'react';
import { Subject } from '../types/notebook';
import {
  Move,
  PenTool,
  Highlighter,
  ArrowRight,
  Square,
  Circle,
  Type,
  StickyNote,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  BookOpen,
  Grid,
  AlignJustify,
  Layers,
  ChevronDown,
  Copy,
  SlidersHorizontal,
  X
} from 'lucide-react';

export type DrawingTool = 'move' | 'pen' | 'highlighter' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'sticky' | 'eraser';
export type BoardTheme = 'grid' | 'ruled' | 'plain' | 'blueprint';
export type FontSize = 'S' | 'M' | 'L' | 'XL';
export type FontFamily = 'mono' | 'sans' | 'hand' | 'serif';
export type StrokeStyle = 'solid' | 'dashed' | 'dotted';
export type FillStyle = 'none' | 'tint' | 'solid';

interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  id: string;
  type: 'path' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'sticky';
  points: Point[];
  color: string;
  strokeWidth: number;
  isHighlighter?: boolean;
  text?: string;
  width?: number;
  height?: number;
  stickyColor?: string;
  fontSize?: FontSize;
  fontFamily?: FontFamily;
  strokeStyle?: StrokeStyle;
  fillStyle?: FillStyle;
  controlPoint?: Point;
}

const STICKY_COLORS = [
  { name: 'Canary Yellow', bg: '#FEF08A', border: '#FACC15', text: '#713F12' },
  { name: 'Pastel Mint', bg: '#BBF7D0', border: '#86EFAC', text: '#14532D' },
  { name: 'Pastel Sky', bg: '#BAE6FD', border: '#7DD3FC', text: '#0C4A6E' },
  { name: 'Pastel Rose', bg: '#FECDD3', border: '#FDA4AF', text: '#881337' },
  { name: 'Pastel Purple', bg: '#E9D5FF', border: '#D8B4FE', text: '#581C87' }
];

const FONT_FAMILIES: Record<FontFamily, { name: string; font: string; label: string; sample: string }> = {
  mono: { name: 'Mono', font: '"JetBrains Mono", monospace', label: 'Mono', sample: 'Aa' },
  sans: { name: 'Sans', font: '"Plus Jakarta Sans", sans-serif', label: 'Sans', sample: 'Aa' },
  hand: { name: 'Hand', font: '"Caveat", cursive, sans-serif', label: 'Hand', sample: 'Aa' },
  serif: { name: 'Serif', font: '"Newsreader", serif', label: 'Serif', sample: 'Aa' }
};

const FONT_SIZES: Record<FontSize, { label: string; px: number; lineHeight: number }> = {
  S: { label: 'S', px: 13, lineHeight: 18 },
  M: { label: 'M', px: 16, lineHeight: 22 },
  L: { label: 'L', px: 24, lineHeight: 32 },
  XL: { label: 'XL', px: 32, lineHeight: 40 }
};

const TL_COLORS = [
  { name: 'Black', color: '#1E1E1E' },
  { name: 'Grey', color: '#78716C' },
  { name: 'Light Violet', color: '#C084FC' },
  { name: 'Violet', color: '#7E22CE' },
  { name: 'Blue', color: '#2563EB' },
  { name: 'Light Blue', color: '#38BDF8' },
  { name: 'Yellow', color: '#EAB308' },
  { name: 'Orange', color: '#F97316' },
  { name: 'Green', color: '#16A34A' },
  { name: 'Light Green', color: '#4ADE80' },
  { name: 'Light Red', color: '#FB7185' },
  { name: 'Red', color: '#E11D48' }
];

interface EngineeringDraftingDeskProps {
  activeSubject: Subject;
  allSubjects: Subject[];
  onGoToNotebook: () => void;
}

const INK_PALETTE = [
  { name: 'Royal Blue', color: '#2457D6', bg: 'bg-[#2457D6]' },
  { name: 'Ink Black', color: '#171717', bg: 'bg-[#171717]' },
  { name: 'Critical Red', color: '#D94A4A', bg: 'bg-[#D94A4A]' },
  { name: 'Logic Green', color: '#2E7D32', bg: 'bg-[#2E7D32]' },
  { name: 'Amber Glow', color: '#D97706', bg: 'bg-[#D97706]' },
  { name: 'Purple Ink', color: '#7C3AED', bg: 'bg-[#7C3AED]' }
];

const STROKE_WIDTHS = [
  { label: 'Fine', value: 2 },
  { label: 'Medium', value: 4 },
  { label: 'Bold', value: 8 }
];

export function EngineeringDraftingDesk({
  activeSubject,
  allSubjects,
  onGoToNotebook
}: EngineeringDraftingDeskProps) {
  const [currentSubjectId, setCurrentSubjectId] = useState<string>(activeSubject.id);
  const [activeTool, setActiveTool] = useState<DrawingTool>('pen');
  const [currentColor, setCurrentColor] = useState<string>('#2457D6');
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('grid');

  // Element storage & undo/redo
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [history, setHistory] = useState<DrawingElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Active drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);

  // Text insertion state
  const [textInputPos, setTextInputPos] = useState<Point | null>(null);
  const [textInputValue, setTextInputValue] = useState('');
  const textInputRef = useRef<HTMLTextAreaElement | null>(null);
  const isCommittingTextRef = useRef(false);
  const isJustPlacedRef = useRef(false);

  // Mouse hover tracking for eraser cursor
  const [mousePos, setMousePos] = useState<Point | null>(null);

  // Sticky Note state
  const [stickyInputPos, setStickyInputPos] = useState<Point | null>(null);
  const [stickyInputValue, setStickyInputValue] = useState('');
  const [activeStickyColor, setActiveStickyColor] = useState<string>('#FEF08A');
  const stickyInputRef = useRef<HTMLTextAreaElement | null>(null);
  const isJustPlacedStickyRef = useRef(false);
  const isCommittingStickyRef = useRef(false);

  // Select & Move state
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [dragLastPoint, setDragLastPoint] = useState<Point | null>(null);
  const [isDraggingAll, setIsDraggingAll] = useState(false);
  const [draggedHandle, setDraggedHandle] = useState<'start' | 'control' | 'end' | null>(null);
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [editingStickyId, setEditingStickyId] = useState<string | null>(null);

  // Viewport pan & zoom
  const [viewOffset, setViewOffset] = useState<Point>({ x: 0, y: 0 });
  const [viewScale, setViewScale] = useState<number>(1);
  const viewOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const viewScaleRef = useRef<number>(1);
  // Keep refs in sync so wheel handler (closure) gets fresh values
  useEffect(() => { viewOffsetRef.current = viewOffset; }, [viewOffset]);
  useEffect(() => { viewScaleRef.current = viewScale; }, [viewScale]);

  // Floating Inspector & Typography State
  const [activeFontSize, setActiveFontSize] = useState<FontSize>('M');
  const [activeFontFamily, setActiveFontFamily] = useState<FontFamily>('mono');
  const [activeStrokeStyle, setActiveStrokeStyle] = useState<StrokeStyle>('solid');
  const [activeFillStyle, setActiveFillStyle] = useState<FillStyle>('none');
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // Sync inspector with currently selected element or currently editing element
  useEffect(() => {
    const targetId = editingElementId || selectedElementId;
    if (!targetId) return;
    const el = elements.find(item => item.id === targetId);
    if (!el) return;
    if (el.color) setCurrentColor(el.color);
    if (el.strokeWidth) setStrokeWidth(el.strokeWidth);
    if (el.fontSize) setActiveFontSize(el.fontSize);
    if (el.fontFamily) setActiveFontFamily(el.fontFamily);
    if (el.strokeStyle) setActiveStrokeStyle(el.strokeStyle);
    if (el.fillStyle) setActiveFillStyle(el.fillStyle);
  }, [selectedElementId, editingElementId, elements]);

  // Auto-resize textarea when text, font size, or font family changes or on mount
  useEffect(() => {
    if (textInputPos && textInputRef.current) {
      const textarea = textInputRef.current;
      const lines = textInputValue.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length), 2);
      const sizeMeta = FONT_SIZES[activeFontSize] || FONT_SIZES.M;
      const charWidth = sizeMeta.px * 0.65;
      const calculatedWidth = Math.max(90, Math.ceil(maxLen * charWidth + 28));
      const calculatedHeight = Math.max(sizeMeta.lineHeight + 10, Math.ceil(lines.length * sizeMeta.lineHeight + 10));

      textarea.style.width = `${calculatedWidth}px`;
      textarea.style.height = `${calculatedHeight}px`;
    }
  }, [textInputPos, textInputValue, activeFontSize, activeFontFamily]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inspectorRef = useRef<HTMLDivElement | null>(null);

  // Reliable programmatic focus when sticky note is placed
  useEffect(() => {
    if (stickyInputPos) {
      isJustPlacedStickyRef.current = true;
      if (stickyInputRef.current) {
        stickyInputRef.current.focus();
      }
      const timer = setTimeout(() => {
        if (stickyInputRef.current) {
          stickyInputRef.current.focus();
        }
      }, 50);
      const safetyTimer = setTimeout(() => {
        isJustPlacedStickyRef.current = false;
      }, 400);
      return () => {
        clearTimeout(timer);
        clearTimeout(safetyTimer);
      };
    }
  }, [stickyInputPos]);

  // Reliable programmatic focus when text input is placed
  useEffect(() => {
    if (textInputPos) {
      isJustPlacedRef.current = true;
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
      const timer = setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 50);
      const safetyTimer = setTimeout(() => {
        isJustPlacedRef.current = false;
      }, 400);
      return () => {
        clearTimeout(timer);
        clearTimeout(safetyTimer);
      };
    }
  }, [textInputPos]);

  // -------------------------------------------------------------
  // Storage Key for current subject board
  // -------------------------------------------------------------
  const getStorageKey = useCallback((subjectId: string) => {
    return `codeink_drafting_elements_${subjectId}`;
  }, []);

  // Load drawings from localStorage when switching boards
  useEffect(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(currentSubjectId));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setElements(parsed);
          setHistory([parsed]);
          setHistoryIndex(0);
          return;
        }
      }
    } catch {
      // Fallback
    }
    setElements([]);
    setHistory([[]]);
    setHistoryIndex(0);
  }, [currentSubjectId, getStorageKey]);

  // Auto-save elements to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(getStorageKey(currentSubjectId), JSON.stringify(elements));
    } catch {
      // Storage limit handling
    }
  }, [elements, currentSubjectId, getStorageKey]);

  // -------------------------------------------------------------
  // Canvas Resolution & Resize Handling
  // -------------------------------------------------------------
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const scale = viewScaleRef.current;
    const offset = viewOffsetRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply viewport transform: pan + zoom
    ctx.save();
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offset.x * dpr, offset.y * dpr);

    // Render all elements
    const renderList = currentElement ? [...elements, currentElement] : elements;

    renderList.forEach((el) => {
      // Don't render element on canvas if currently being live-edited in editor
      if (el.id === editingElementId || el.id === editingStickyId) return;

      ctx.save();
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.color;
      ctx.lineWidth = el.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (el.isHighlighter) {
        ctx.globalAlpha = 0.35;
      }

      // Stroke dash pattern
      if (el.strokeStyle === 'dashed') {
        ctx.setLineDash([8, 6]);
      } else if (el.strokeStyle === 'dotted') {
        ctx.setLineDash([2, 5]);
      } else {
        ctx.setLineDash([]);
      }

      if (el.type === 'path' && el.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(el.points[0].x, el.points[0].y);
        for (let i = 1; i < el.points.length; i++) {
          const xc = (el.points[i].x + el.points[i - 1].x) / 2;
          const yc = (el.points[i].y + el.points[i - 1].y) / 2;
          ctx.quadraticCurveTo(el.points[i - 1].x, el.points[i - 1].y, xc, yc);
        }
        if (el.points.length > 1) {
          const last = el.points[el.points.length - 1];
          ctx.lineTo(last.x, last.y);
        }
        ctx.stroke();
      } else if (el.type === 'rectangle' && el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[el.points.length - 1];
        const width = end.x - start.x;
        const height = end.y - start.y;
        if (el.fillStyle === 'tint') {
          ctx.save();
          ctx.fillStyle = el.color;
          ctx.globalAlpha = 0.15;
          ctx.fillRect(start.x, start.y, width, height);
          ctx.restore();
        } else if (el.fillStyle === 'solid') {
          ctx.save();
          ctx.fillStyle = el.color;
          ctx.fillRect(start.x, start.y, width, height);
          ctx.restore();
        }
        ctx.strokeRect(start.x, start.y, width, height);
      } else if (el.type === 'circle' && el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[el.points.length - 1];
        const radius = Math.hypot(end.x - start.x, end.y - start.y);
        ctx.beginPath();
        ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        if (el.fillStyle === 'tint') {
          ctx.save();
          ctx.fillStyle = el.color;
          ctx.globalAlpha = 0.15;
          ctx.fill();
          ctx.restore();
        } else if (el.fillStyle === 'solid') {
          ctx.save();
          ctx.fillStyle = el.color;
          ctx.fill();
          ctx.restore();
        }
        ctx.stroke();
      } else if (el.type === 'arrow' && el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[el.points.length - 1];
        const ctrl = el.controlPoint || {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        };

        // Curved arrow line
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(ctrl.x, ctrl.y, end.x, end.y);
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(end.y - ctrl.y, end.x - ctrl.x);
        const headLength = Math.max(12, el.strokeWidth * 3);
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - headLength * Math.cos(angle - Math.PI / 6),
          end.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          end.x - headLength * Math.cos(angle + Math.PI / 6),
          end.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // If selected: render interactive circular handles and dashed control tangents
        if (selectedElementId === el.id) {
          ctx.save();
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(ctrl.x, ctrl.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();

          // 3 Circular Control Handles
          const handles = [
            { x: start.x, y: start.y, isCtrl: false },
            { x: ctrl.x, y: ctrl.y, isCtrl: true },
            { x: end.x, y: end.y, isCtrl: false }
          ];

          handles.forEach(h => {
            ctx.beginPath();
            ctx.arc(h.x, h.y, h.isCtrl ? 6.5 : 5.5, 0, 2 * Math.PI);
            ctx.fillStyle = h.isCtrl ? '#38BDF8' : '#FFFFFF';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#2563EB';
            ctx.setLineDash([]);
            ctx.stroke();
          });
          ctx.restore();
        }
      } else if (el.type === 'text' && el.points.length > 0 && el.text) {
        const fontMeta = FONT_FAMILIES[el.fontFamily || 'mono'] || FONT_FAMILIES.mono;
        const sizeMeta = FONT_SIZES[el.fontSize || 'M'] || FONT_SIZES.M;
        ctx.font = `bold ${sizeMeta.px}px ${fontMeta.font}`;
        ctx.textBaseline = 'top';
        const lines = el.text.split('\n');
        const lineHeight = sizeMeta.lineHeight;
        lines.forEach((line, index) => {
          ctx.fillText(line, el.points[0].x, el.points[0].y + (index * lineHeight));
        });
      } else if (el.type === 'sticky' && el.points.length > 0) {
        const p = el.points[0];
        const w = el.width || 230;
        const h = el.height || 180;
        const noteBg = el.stickyColor || el.color || '#FEF08A';

        ctx.save();
        // Drop shadow for realistic sticky note
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;

        // Note body (rounded rect)
        ctx.fillStyle = noteBg;
        const radius = 8;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(p.x, p.y, w, h, radius);
        } else {
          ctx.rect(p.x, p.y, w, h);
        }
        ctx.fill();

        // Top accent line / tape
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(p.x, p.y, w, 8);

        // Text inside sticky note
        if (el.text) {
          ctx.fillStyle = '#1E293B';
          ctx.font = '500 13px "JetBrains Mono", monospace';
          ctx.textBaseline = 'top';
          const lines = el.text.split('\n');
          const lineHeight = 19;
          const maxVisibleLines = Math.floor((h - 24) / lineHeight);
          lines.slice(0, maxVisibleLines).forEach((line, index) => {
            ctx.fillText(line, p.x + 12, p.y + 16 + (index * lineHeight), w - 24);
          });
        }
        ctx.restore();
      }

      // Highlight outline for selected element (for non-arrow elements)
      if (selectedElementId === el.id && el.type !== 'arrow' && (!isDrawing || activeTool === 'move')) {
        ctx.save();
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        const xs = el.points.map(p => p.x);
        const ys = el.points.map(p => p.y);
        const minX = Math.min(...xs) - 6;
        const sizeMeta = FONT_SIZES[el.fontSize || 'M'] || FONT_SIZES.M;
        const lines = el.text?.split('\n') || [];
        const maxLineLen = lines.reduce((m, l) => Math.max(m, l.length), 0);
        const charWidth = sizeMeta.px * 0.65;
        const extraW = el.width || (el.type === 'text' ? Math.max(50, maxLineLen * charWidth + 20) : 0);
        const maxX = Math.max(...xs) + extraW + 6;
        const minY = Math.min(...ys) - 6;
        const extraH = el.height || (el.type === 'text' ? Math.max(sizeMeta.lineHeight, lines.length * sizeMeta.lineHeight + 8) : 0);
        const maxY = Math.max(...ys) + extraH + 6;
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        ctx.restore();
      }

      ctx.restore();
    });

    // Restore transform after rendering all elements
    ctx.restore();
  }, [elements, currentElement, selectedElementId, activeTool, editingElementId, editingStickyId, viewScale, viewOffset]);

  // Adjust canvas size to parent container
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Do NOT call ctx.scale(dpr,dpr) here — setTransform handles dpr in redrawCanvas
      redrawCanvas();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  // Wheel handler: two-finger scroll = pan, Ctrl+scroll / pinch = zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle when not in a text/sticky input
      if (
        document.activeElement === textInputRef.current ||
        document.activeElement === stickyInputRef.current
      ) return;

      // Do not intercept wheel scrolling when cursor is inside the Styles & Properties inspector
      if (
        inspectorRef.current &&
        e.target instanceof Node &&
        inspectorRef.current.contains(e.target)
      ) {
        return;
      }

      e.preventDefault();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      if (e.ctrlKey || e.metaKey) {
        // ZOOM — pivot around mouse cursor
        const ZOOM_SPEED = 0.0015;
        const delta = -e.deltaY * ZOOM_SPEED;
        const newScale = Math.min(8, Math.max(0.1, viewScaleRef.current * (1 + delta)));
        const ratio = newScale / viewScaleRef.current;

        // Cursor position in canvas CSS px
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Adjust offset so the point under the cursor stays fixed
        const newOffsetX = mouseX - ratio * (mouseX - viewOffsetRef.current.x);
        const newOffsetY = mouseY - ratio * (mouseY - viewOffsetRef.current.y);

        viewScaleRef.current = newScale;
        viewOffsetRef.current = { x: newOffsetX, y: newOffsetY };
        setViewScale(newScale);
        setViewOffset({ x: newOffsetX, y: newOffsetY });
      } else {
        // PAN — two-finger scroll
        const newOffset = {
          x: viewOffsetRef.current.x - e.deltaX,
          y: viewOffsetRef.current.y - e.deltaY
        };
        viewOffsetRef.current = newOffset;
        setViewOffset(newOffset);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // -------------------------------------------------------------
  // Pointer Drawing Events
  // -------------------------------------------------------------
  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let screenX: number;
    let screenY: number;

    if ('touches' in e) {
      const touch = e.touches[0];
      screenX = touch.clientX - rect.left;
      screenY = touch.clientY - rect.top;
    } else {
      screenX = e.clientX - rect.left;
      screenY = e.clientY - rect.top;
    }

    // Un-transform from viewport space to world space
    const scale = viewScaleRef.current;
    const offset = viewOffsetRef.current;
    return {
      x: (screenX - offset.x) / scale,
      y: (screenY - offset.y) / scale
    };
  };

  // Helper: check if element is touched by eraser radius
  const eraserRadius = 18;
  const isElementHitByEraser = (el: DrawingElement, pt: Point): boolean => {
    const r = eraserRadius;
    if (el.type === 'path') {
      return el.points.some(p => Math.hypot(p.x - pt.x, p.y - pt.y) <= r + (el.strokeWidth / 2));
    }
    if (el.type === 'arrow' && el.points.length >= 2) {
      const p0 = el.points[0];
      const p2 = el.points[el.points.length - 1];
      const p1 = el.controlPoint || { x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2 };
      for (let t = 0; t <= 1; t += 0.08) {
        const invT = 1 - t;
        const bx = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
        const by = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;
        if (Math.hypot(bx - pt.x, by - pt.y) <= r + (el.strokeWidth / 2)) {
          return true;
        }
      }
      return false;
    }
    if (el.type === 'rectangle' && el.points.length >= 2) {
      const p1 = el.points[0];
      const p2 = el.points[el.points.length - 1];
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);

      // If rectangle has a solid or tinted fill, whole interior is hit-tested
      if (el.fillStyle === 'tint' || el.fillStyle === 'solid') {
        return pt.x >= minX - r && pt.x <= maxX + r && pt.y >= minY - r && pt.y <= maxY + r;
      }

      // Hollow rectangle: only the perimeter edges are hit-tested (tldraw style, so interior text is not blocked)
      const nearLeft = Math.abs(pt.x - minX) <= r && pt.y >= minY - r && pt.y <= maxY + r;
      const nearRight = Math.abs(pt.x - maxX) <= r && pt.y >= minY - r && pt.y <= maxY + r;
      const nearTop = Math.abs(pt.y - minY) <= r && pt.x >= minX - r && pt.x <= maxX + r;
      const nearBottom = Math.abs(pt.y - maxY) <= r && pt.x >= minX - r && pt.x <= maxX + r;
      return nearLeft || nearRight || nearTop || nearBottom;
    }
    if (el.type === 'circle' && el.points.length >= 2) {
      const center = el.points[0];
      const edge = el.points[el.points.length - 1];
      const circleR = Math.hypot(edge.x - center.x, edge.y - center.y);
      const dist = Math.hypot(pt.x - center.x, pt.y - center.y);
      if (el.fillStyle === 'tint' || el.fillStyle === 'solid') {
        return dist <= circleR + r;
      }
      // Hollow circle: perimeter only
      return Math.abs(dist - circleR) <= r;
    }
    if (el.type === 'text' && el.points.length > 0 && el.text) {
      const p = el.points[0];
      const sizeMeta = FONT_SIZES[el.fontSize || 'M'] || FONT_SIZES.M;
      const lines = el.text.split('\n');
      const maxLineLen = Math.max(...lines.map(l => l.length), 1);
      const charWidth = sizeMeta.px * 0.65;
      const textW = Math.max(50, maxLineLen * charWidth + 24);
      const textH = Math.max(sizeMeta.lineHeight, lines.length * sizeMeta.lineHeight + 10);
      const textPad = 14;
      return pt.x >= p.x - r - textPad && pt.x <= p.x + textW + r + textPad && pt.y >= p.y - r - textPad && pt.y <= p.y + textH + r + textPad;
    }
    if (el.type === 'sticky' && el.points.length > 0) {
      const p = el.points[0];
      const w = el.width || 230;
      const h = el.height || 180;
      return pt.x >= p.x - r && pt.x <= p.x + w + r && pt.y >= p.y - r && pt.y <= p.y + h + r;
    }
    return false;
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const point = getCanvasCoordinates(e);

    // If text tool: if already typing elsewhere, commit first
    if (activeTool === 'text') {
      e.preventDefault();
      // Check if clicked directly on an existing text element to edit it!
      let clickedTextEl: DrawingElement | null = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        if (elements[i].type === 'text' && isElementHitByEraser(elements[i], point)) {
          clickedTextEl = elements[i];
          break;
        }
      }

      if (clickedTextEl) {
        if (textInputPos && textInputValue.trim()) {
          handleCommitText();
        }
        setSelectedElementId(clickedTextEl.id);
        setEditingElementId(clickedTextEl.id);
        setTextInputPos(clickedTextEl.points[0]);
        setTextInputValue(clickedTextEl.text || '');
        setCurrentColor(clickedTextEl.color);
        if (clickedTextEl.fontSize) setActiveFontSize(clickedTextEl.fontSize);
        if (clickedTextEl.fontFamily) setActiveFontFamily(clickedTextEl.fontFamily);
        isJustPlacedRef.current = true;
        return;
      }

      if (textInputPos && textInputValue.trim()) {
        handleCommitText();
      }
      if (stickyInputPos && stickyInputValue.trim()) {
        handleCommitSticky();
      } else {
        setStickyInputPos(null);
        setStickyInputValue('');
      }
      setEditingElementId(null);
      isJustPlacedRef.current = true;
      setTextInputPos(point);
      setTextInputValue('');
      return;
    }

    // If sticky note tool:
    if (activeTool === 'sticky') {
      e.preventDefault();
      // Check if clicked directly on an existing sticky note to edit it!
      let clickedStickyEl: DrawingElement | null = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        if (elements[i].type === 'sticky' && isElementHitByEraser(elements[i], point)) {
          clickedStickyEl = elements[i];
          break;
        }
      }

      if (clickedStickyEl) {
        if (stickyInputPos && stickyInputValue.trim()) {
          handleCommitSticky();
        }
        setSelectedElementId(clickedStickyEl.id);
        setEditingStickyId(clickedStickyEl.id);
        setStickyInputPos(clickedStickyEl.points[0]);
        setStickyInputValue(clickedStickyEl.text || '');
        setActiveStickyColor(clickedStickyEl.stickyColor || clickedStickyEl.color || '#FEF08A');
        isJustPlacedStickyRef.current = true;
        return;
      }

      if (stickyInputPos && stickyInputValue.trim()) {
        handleCommitSticky();
      }
      if (textInputPos && textInputValue.trim()) {
        handleCommitText();
      } else {
        setTextInputPos(null);
        setTextInputValue('');
      }
      setEditingStickyId(null);
      isJustPlacedStickyRef.current = true;
      setStickyInputPos(point);
      setStickyInputValue('');
      return;
    }

    // If clicked canvas with another tool while text/sticky editing was active, commit first
    if (textInputPos) {
      if (textInputValue.trim()) {
        handleCommitText();
      } else {
        setTextInputPos(null);
        setTextInputValue('');
      }
    }

    if (stickyInputPos) {
      if (stickyInputValue.trim()) {
        handleCommitSticky();
      } else {
        setStickyInputPos(null);
        setStickyInputValue('');
      }
    }

    // Move tool: drag handle, drag element or pan
    if (activeTool === 'move') {
      // Check if user clicked on one of the 3 handles of a selected curved arrow
      if (selectedElementId) {
        const selEl = elements.find(item => item.id === selectedElementId);
        if (selEl && selEl.type === 'arrow' && selEl.points.length >= 2) {
          const start = selEl.points[0];
          const end = selEl.points[selEl.points.length - 1];
          const ctrl = selEl.controlPoint || {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
          };
          const handleR = 14;
          if (Math.hypot(point.x - ctrl.x, point.y - ctrl.y) <= handleR) {
            setDraggedHandle('control');
            setIsDrawing(true);
            setDragLastPoint(point);
            return;
          } else if (Math.hypot(point.x - start.x, point.y - start.y) <= handleR) {
            setDraggedHandle('start');
            setIsDrawing(true);
            setDragLastPoint(point);
            return;
          } else if (Math.hypot(point.x - end.x, point.y - end.y) <= handleR) {
            setDraggedHandle('end');
            setIsDrawing(true);
            setDragLastPoint(point);
            return;
          }
        }
      }

      setIsDrawing(true);
      let hitElement: DrawingElement | null = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        if (isElementHitByEraser(elements[i], point)) {
          hitElement = elements[i];
          break;
        }
      }
      if (hitElement) {
        setSelectedElementId(hitElement.id);
        setIsDraggingAll(false);
      } else {
        setSelectedElementId(null);
        setIsDraggingAll(true);
      }
      setDragLastPoint(point);
      return;
    }

    // Eraser mode: continuous drag erase
    if (activeTool === 'eraser') {
      setIsDrawing(true);
      const filtered = elements.filter(el => !isElementHitByEraser(el, point));
      if (filtered.length !== elements.length) {
        setElements(filtered);
      }
      return;
    }

    setIsDrawing(true);
    const newEl: DrawingElement = {
      id: `el_${Date.now()}`,
      type:
        activeTool === 'arrow'
          ? 'arrow'
          : activeTool === 'rectangle'
          ? 'rectangle'
          : activeTool === 'circle'
          ? 'circle'
          : 'path',
      points: [point],
      color: currentColor,
      strokeWidth: activeTool === 'highlighter' ? strokeWidth * 3 : strokeWidth,
      isHighlighter: activeTool === 'highlighter',
      strokeStyle: activeStrokeStyle,
      fillStyle: activeFillStyle,
      fontSize: activeFontSize,
      fontFamily: activeFontFamily
    };
    setCurrentElement(newEl);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const point = getCanvasCoordinates(e);
    setMousePos(point);

    if (!isDrawing) return;

    // 1. Dragging an arrow vertex or curve bend handle
    if (activeTool === 'move' && draggedHandle && selectedElementId) {
      setElements(prev =>
        prev.map(el => {
          if (el.id !== selectedElementId || el.type !== 'arrow') return el;
          if (draggedHandle === 'control') {
            return { ...el, controlPoint: point };
          } else if (draggedHandle === 'start') {
            return { ...el, points: [point, el.points[el.points.length - 1]] };
          } else if (draggedHandle === 'end') {
            return { ...el, points: [el.points[0], point] };
          }
          return el;
        })
      );
      return;
    }

    // 2. Move tool dragging entire element(s)
    if (activeTool === 'move' && dragLastPoint) {
      const dx = point.x - dragLastPoint.x;
      const dy = point.y - dragLastPoint.y;
      if (dx === 0 && dy === 0) return;

      if (selectedElementId) {
        setElements(prev =>
          prev.map(el =>
            el.id === selectedElementId
              ? {
                  ...el,
                  points: el.points.map(p => ({ x: p.x + dx, y: p.y + dy })),
                  controlPoint: el.controlPoint
                    ? { x: el.controlPoint.x + dx, y: el.controlPoint.y + dy }
                    : undefined
                }
              : el
          )
        );
      } else if (isDraggingAll) {
        setElements(prev =>
          prev.map(el => ({
            ...el,
            points: el.points.map(p => ({ x: p.x + dx, y: p.y + dy })),
            controlPoint: el.controlPoint
              ? { x: el.controlPoint.x + dx, y: el.controlPoint.y + dy }
              : undefined
          }))
        );
      }
      setDragLastPoint(point);
      return;
    }

    // Continuous real-time drag erasing
    if (activeTool === 'eraser') {
      const filtered = elements.filter(el => !isElementHitByEraser(el, point));
      if (filtered.length !== elements.length) {
        setElements(filtered);
      }
      return;
    }

    if (!currentElement) return;

    if (currentElement.type === 'path') {
      setCurrentElement(prev => (prev ? { ...prev, points: [...prev.points, point] } : null));
    } else if (currentElement.type === 'arrow') {
      const start = currentElement.points[0];
      const end = point;
      const ctrl = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
      setCurrentElement(prev => (prev ? { ...prev, points: [start, end], controlPoint: ctrl } : null));
    } else {
      // Shapes: keep origin start point, update target end point
      setCurrentElement(prev => (prev ? { ...prev, points: [prev.points[0], point] } : null));
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (draggedHandle) {
      setDraggedHandle(null);
      commitElements(elements);
      return;
    }

    if (activeTool === 'move') {
      setDragLastPoint(null);
      setIsDraggingAll(false);
      commitElements(elements);
      return;
    }

    if (activeTool === 'eraser') {
      // Commit final erased state to history for Undo/Redo
      commitElements(elements);
      return;
    }

    if (!currentElement) return;
    const updated = [...elements, currentElement];
    commitElements(updated);
    setSelectedElementId(currentElement.id);
    setCurrentElement(null);
  };

  // Commit and maintain undo/redo history
  const commitElements = (newElements: DrawingElement[]) => {
    setElements(newElements);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    if (newHistory.length > 30) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
    }
  };

  const handleClear = () => {
    if (elements.length === 0) return;
    if (window.confirm('Clear all drawings on this drafting board?')) {
      commitElements([]);
    }
  };

  const handleCommitText = () => {
    if (!textInputPos || !textInputValue.trim() || isCommittingTextRef.current) {
      setTextInputPos(null);
      setTextInputValue('');
      setEditingElementId(null);
      return;
    }
    isCommittingTextRef.current = true;
    if (editingElementId) {
      const updated = elements.map(el =>
        el.id === editingElementId
          ? {
              ...el,
              text: textInputValue.trim(),
              color: currentColor,
              fontSize: activeFontSize,
              fontFamily: activeFontFamily
            }
          : el
      );
      commitElements(updated);
      setSelectedElementId(editingElementId);
    } else {
      const newId = `text_${Date.now()}`;
      const newEl: DrawingElement = {
        id: newId,
        type: 'text',
        points: [textInputPos],
        color: currentColor,
        strokeWidth,
        text: textInputValue.trim(),
        fontSize: activeFontSize,
        fontFamily: activeFontFamily
      };
      commitElements([...elements, newEl]);
      setSelectedElementId(newId);
    }
    setEditingElementId(null);
    setTextInputPos(null);
    setTextInputValue('');
    setTimeout(() => {
      isCommittingTextRef.current = false;
    }, 60);
  };

  const handleCommitSticky = () => {
    if (!stickyInputPos || !stickyInputValue.trim() || isCommittingStickyRef.current) {
      setStickyInputPos(null);
      setStickyInputValue('');
      setEditingStickyId(null);
      return;
    }
    isCommittingStickyRef.current = true;
    if (editingStickyId) {
      const updated = elements.map(el =>
        el.id === editingStickyId
          ? {
              ...el,
              text: stickyInputValue.trim(),
              color: activeStickyColor,
              stickyColor: activeStickyColor
            }
          : el
      );
      commitElements(updated);
      setSelectedElementId(editingStickyId);
    } else {
      const newId = `sticky_${Date.now()}`;
      const newEl: DrawingElement = {
        id: newId,
        type: 'sticky',
        points: [stickyInputPos],
        color: activeStickyColor,
        strokeWidth: 1,
        text: stickyInputValue.trim(),
        width: 230,
        height: 180,
        stickyColor: activeStickyColor
      };
      commitElements([...elements, newEl]);
      setSelectedElementId(newId);
    }
    setEditingStickyId(null);
    setStickyInputPos(null);
    setStickyInputValue('');
    setTimeout(() => {
      isCommittingStickyRef.current = false;
    }, 60);
  };

  // Double click on canvas to re-edit existing text or sticky note
  const handleDoubleClick = (e: React.MouseEvent) => {
    const point = getCanvasCoordinates(e);
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (isElementHitByEraser(el, point)) {
        if (el.type === 'text') {
          setSelectedElementId(el.id);
          setEditingElementId(el.id);
          setTextInputPos(el.points[0]);
          setTextInputValue(el.text || '');
          setCurrentColor(el.color);
          if (el.fontSize) setActiveFontSize(el.fontSize);
          if (el.fontFamily) setActiveFontFamily(el.fontFamily);
          isJustPlacedRef.current = true;
          return;
        } else if (el.type === 'sticky') {
          setSelectedElementId(el.id);
          setEditingStickyId(el.id);
          setStickyInputPos(el.points[0]);
          setStickyInputValue(el.text || '');
          setActiveStickyColor(el.stickyColor || el.color || '#FEF08A');
          isJustPlacedStickyRef.current = true;
          return;
        }
      }
    }
  };

  // Color change: applies to currently selected or editing element, or sets upcoming ink
  const handleSelectColor = (color: string) => {
    setCurrentColor(color);
    const targetId = editingElementId || selectedElementId;
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId
          ? {
              ...el,
              color: color,
              stickyColor: el.type === 'sticky' ? color : el.stickyColor
            }
          : el
      );
      commitElements(updated);
    }
  };

  // Stroke weight change: applies to selected/editing element or sets upcoming weight
  const handleSelectStrokeWidth = (val: number) => {
    setStrokeWidth(val);
    const targetId = editingElementId || selectedElementId;
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId ? { ...el, strokeWidth: val } : el
      );
      commitElements(updated);
    }
  };

  // Duplicate currently selected element (or via Ctrl+D)
  const handleDuplicate = () => {
    if (!selectedElementId) return;
    const el = elements.find(item => item.id === selectedElementId);
    if (!el) return;
    const newId = `el_${Date.now()}`;
    const offset = 26;
    const duplicated: DrawingElement = {
      ...el,
      id: newId,
      points: el.points.map(p => ({ x: p.x + offset, y: p.y + offset })),
      controlPoint: el.controlPoint
        ? { x: el.controlPoint.x + offset, y: el.controlPoint.y + offset }
        : undefined
    };
    commitElements([...elements, duplicated]);
    setSelectedElementId(newId);
  };

  const handleDeleteSelected = () => {
    if (!selectedElementId) return;
    const updated = elements.filter(el => el.id !== selectedElementId);
    commitElements(updated);
    setSelectedElementId(null);
  };

  const handleUpdateColor = (color: string) => {
    setCurrentColor(color);
    let targetId = editingElementId || selectedElementId;
    if (!targetId && elements.length > 0) {
      targetId = elements[elements.length - 1].id;
      setSelectedElementId(targetId);
    }
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId
          ? {
              ...el,
              color,
              stickyColor: el.type === 'sticky' ? color : el.stickyColor
            }
          : el
      );
      commitElements(updated);
    }
  };

  const handleUpdateStrokeStyle = (style: StrokeStyle) => {
    setActiveStrokeStyle(style);
    let targetId = editingElementId || selectedElementId;
    if (!targetId && elements.length > 0) {
      targetId = elements[elements.length - 1].id;
      setSelectedElementId(targetId);
    }
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId ? { ...el, strokeStyle: style } : el
      );
      commitElements(updated);
    }
  };

  const handleUpdateFillStyle = (style: FillStyle) => {
    setActiveFillStyle(style);
    let targetId = editingElementId || selectedElementId;
    if (!targetId) {
      const lastShape = [...elements].reverse().find(el => el.type === 'rectangle' || el.type === 'circle');
      if (lastShape) {
        targetId = lastShape.id;
        setSelectedElementId(lastShape.id);
      }
    }
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId ? { ...el, fillStyle: style } : el
      );
      commitElements(updated);
    }
  };

  const handleUpdateFontSize = (size: FontSize) => {
    setActiveFontSize(size);
    const mappedWidth = size === 'S' ? 2 : size === 'M' ? 4 : size === 'L' ? 8 : 12;
    setStrokeWidth(mappedWidth);
    let targetId = editingElementId || selectedElementId;
    if (!targetId && elements.length > 0) {
      const lastEl = elements[elements.length - 1];
      targetId = lastEl.id;
      setSelectedElementId(lastEl.id);
    }
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId ? { ...el, fontSize: size, strokeWidth: mappedWidth } : el
      );
      commitElements(updated);
    }
  };

  const handleUpdateFontFamily = (family: FontFamily) => {
    setActiveFontFamily(family);
    let targetId = editingElementId || selectedElementId;
    if (!targetId) {
      const lastText = [...elements].reverse().find(el => el.type === 'text');
      if (lastText) {
        targetId = lastText.id;
        setSelectedElementId(lastText.id);
      }
    }
    if (targetId) {
      const updated = elements.map(el =>
        el.id === targetId ? { ...el, fontFamily: family } : el
      );
      commitElements(updated);
    }
  };

  // Export Canvas as PNG
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = boardTheme === 'blueprint' ? '#0F172A' : '#FFFFFF';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.fillStyle = boardTheme === 'blueprint' ? '#38BDF8' : '#2457D6';
    ctx.fillText('CODE INK · Engineering Drafting Desk', 20, exportCanvas.height - 20);

    const link = document.createElement('a');
    link.download = `codeink-drafting-${currentSubjectId}-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  // Selected element bounding box calculation for floating actions
  const selectedElement = elements.find(el => el.id === selectedElementId);
  let selectionBox: { minX: number; minY: number; maxX: number; maxY: number } | null = null;
  if (selectedElement) {
    const xs = selectedElement.points.map(p => p.x);
    const ys = selectedElement.points.map(p => p.y);
    if (selectedElement.controlPoint) {
      xs.push(selectedElement.controlPoint.x);
      ys.push(selectedElement.controlPoint.y);
    }
    const sizeMeta = FONT_SIZES[selectedElement.fontSize || 'M'] || FONT_SIZES.M;
    const lines = selectedElement.text?.split('\n') || [];
    const maxLineLen = lines.reduce((m, l) => Math.max(m, l.length), 0);
    const charWidth = sizeMeta.px * 0.65;
    const extraW = selectedElement.width || (selectedElement.type === 'text' ? Math.max(60, maxLineLen * charWidth + 20) : 0);
    const extraH = selectedElement.height || (selectedElement.type === 'text' ? Math.max(sizeMeta.lineHeight, lines.length * sizeMeta.lineHeight + 8) : 0);
    selectionBox = {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs) + extraW,
      maxY: Math.max(...ys) + extraH
    };
  }

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+D, Esc, Delete)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        // Reset viewport to 100%
        e.preventDefault();
        viewScaleRef.current = 1;
        viewOffsetRef.current = { x: 0, y: 0 };
        setViewScale(1);
        setViewOffset({ x: 0, y: 0 });
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        const canvas = canvasRef.current;
        const newScale = Math.min(8, viewScaleRef.current * 1.2);
        if (canvas) {
          const cx = canvas.getBoundingClientRect().width / 2;
          const cy = canvas.getBoundingClientRect().height / 2;
          const ratio = newScale / viewScaleRef.current;
          const nx = cx - ratio * (cx - viewOffsetRef.current.x);
          const ny = cy - ratio * (cy - viewOffsetRef.current.y);
          viewScaleRef.current = newScale;
          viewOffsetRef.current = { x: nx, y: ny };
          setViewScale(newScale);
          setViewOffset({ x: nx, y: ny });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        const canvas = canvasRef.current;
        const newScale = Math.max(0.1, viewScaleRef.current / 1.2);
        if (canvas) {
          const cx = canvas.getBoundingClientRect().width / 2;
          const cy = canvas.getBoundingClientRect().height / 2;
          const ratio = newScale / viewScaleRef.current;
          const nx = cx - ratio * (cx - viewOffsetRef.current.x);
          const ny = cy - ratio * (cy - viewOffsetRef.current.y);
          viewScaleRef.current = newScale;
          viewOffsetRef.current = { x: nx, y: ny };
          setViewScale(newScale);
          setViewOffset({ x: nx, y: ny });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        if (
          selectedElementId &&
          document.activeElement !== textInputRef.current &&
          document.activeElement !== stickyInputRef.current
        ) {
          e.preventDefault();
          handleDuplicate();
        }
      } else if (e.key === 'Escape') {
        setTextInputPos(null);
        setStickyInputPos(null);
        setEditingElementId(null);
        setEditingStickyId(null);
        setSelectedElementId(null);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (
          selectedElementId &&
          document.activeElement !== textInputRef.current &&
          document.activeElement !== stickyInputRef.current
        ) {
          e.preventDefault();
          const updated = elements.filter(el => el.id !== selectedElementId);
          commitElements(updated);
          setSelectedElementId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#1A1918] select-none text-stone-200 overflow-hidden font-sans">
      {/* ================= TOP DRAFTING DESK HEADER & CONTROLS ================= */}
      <div className="h-14 border-b border-stone-800 bg-[#21201D] px-3 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-30">
        {/* Left: Branding & Subject Board Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2457D6] flex items-center justify-center text-white shadow-xs">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white font-sans">
                Engineering Drafting Desk
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono font-bold border border-blue-800">
                Whiteboard
              </span>
            </div>
            <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
              <span>Board:</span>
              <select
                value={currentSubjectId}
                onChange={(e) => setCurrentSubjectId(e.target.value)}
                className="bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded px-1.5 py-0.5 cursor-pointer hover:border-stone-500 focus:outline-none"
              >
                {allSubjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.shortCode || sub.name} Scratchpad
                  </option>
                ))}
                <option value="global">Global Engineering Scratchpad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Center: Tools Palette */}
        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800">
          <button
            type="button"
            onClick={() => setActiveTool('move')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'move' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Select & Move Element / Pan Canvas (Drag to move smoothly)"
          >
            <Move className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('pen')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'pen' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Freehand Technical Pen"
          >
            <PenTool className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('highlighter')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'highlighter' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Translucent Highlighter"
          >
            <Highlighter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('arrow')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'arrow' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Pointer Arrow (Flowcharts & Dereferencing)"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('rectangle')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'rectangle' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Memory Block / Struct (Rectangle)"
          >
            <Square className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('circle')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'circle' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Tree / Graph Node (Circle)"
          >
            <Circle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('text')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'text' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Type Label / Annotation (Click canvas to type)"
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('sticky')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'sticky' ? 'bg-[#2457D6] text-white shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Engineering Sticky Note / Memo"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('eraser')}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              activeTool === 'eraser' ? 'bg-rose-900/60 text-rose-300 shadow-xs' : 'text-stone-400 hover:text-white'
            }`}
            title="Stroke Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions (Undo, Redo, Export, Return) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center bg-stone-900 rounded-lg border border-stone-800 p-0.5">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 cursor-pointer"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 text-stone-400 hover:text-white disabled:opacity-30 disabled:hover:text-stone-400 cursor-pointer"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Clear Drafting Board"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleExportPNG}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
            title="Export as High-Resolution PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>

          <button
            type="button"
            onClick={onGoToNotebook}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2457D6] hover:bg-[#1d47b3] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Back to Book</span>
          </button>
        </div>
      </div>

      {/* ================= SECONDARY DRAFTING BAR (COLOR, THICKNESS, THEME) ================= */}
      <div className="h-10 border-b border-stone-800/80 bg-[#1C1B19] px-4 sm:px-6 flex items-center justify-between text-xs shrink-0 z-20 overflow-x-auto scrollbar-none">
        {/* Colors Palette */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-500 text-[10px] uppercase font-bold mr-1">Ink:</span>
          {INK_PALETTE.map((c) => (
            <button
              key={c.color}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectColor(c.color)}
              className={`w-5 h-5 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                c.bg
              } ${currentColor.toLowerCase() === c.color.toLowerCase() ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-stone-900' : 'hover:scale-110'}`}
              title={c.name}
            />
          ))}
        </div>

        {/* Stroke Width Selector */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-stone-500 text-[10px] uppercase font-bold mr-1">Weight:</span>
          {STROKE_WIDTHS.map((sw) => (
            <button
              key={sw.value}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelectStrokeWidth(sw.value)}
              className={`px-2 py-0.5 rounded font-mono text-[11px] cursor-pointer transition-colors ${
                strokeWidth === sw.value
                  ? 'bg-stone-200 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white bg-stone-900 border border-stone-800'
              }`}
            >
              {sw.label}
            </button>
          ))}
        </div>

        {/* Board Background Pattern Selector */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-stone-500 text-[10px] uppercase font-bold mr-1">Pattern:</span>
          <div className="flex items-center bg-stone-900 rounded p-0.5 border border-stone-800 text-[11px]">
            <button
              type="button"
              onClick={() => setBoardTheme('grid')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                boardTheme === 'grid' ? 'bg-[#2457D6] text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
              title="Engineering Graph Grid"
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setBoardTheme('ruled')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                boardTheme === 'ruled' ? 'bg-[#2457D6] text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
              title="Ruled Notebook Lines"
            >
              Ruled
            </button>
            <button
              type="button"
              onClick={() => setBoardTheme('plain')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                boardTheme === 'plain' ? 'bg-[#2457D6] text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
              title="Pure Minimal Whiteboard"
            >
              Plain
            </button>
            <button
              type="button"
              onClick={() => setBoardTheme('blueprint')}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                boardTheme === 'blueprint' ? 'bg-[#2457D6] text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
              title="Engineering Blueprint"
            >
              Blueprint
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN DRAFTING CANVAS SURFACE ================= */}
      <div
        ref={containerRef}
        className={`flex-1 relative overflow-hidden cursor-crosshair transition-colors ${
          boardTheme === 'grid'
            ? 'bg-[#FCFBF8] [background-image:linear-gradient(to_right,rgba(36,87,214,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,87,214,0.08)_1px,transparent_1px)] [background-size:24px_24px]'
            : boardTheme === 'ruled'
            ? 'bg-[#FFFDF9] [background-image:linear-gradient(to_bottom,transparent_31px,rgba(36,87,214,0.1)_32px)] [background-size:100%_32px]'
            : boardTheme === 'blueprint'
            ? 'bg-[#0F172A] [background-image:linear-gradient(to_right,rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:24px_24px]'
            : 'bg-white'
        }`}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          style={{
            cursor:
              activeTool === 'eraser'
                ? 'none'
                : activeTool === 'text'
                ? 'text'
                : activeTool === 'sticky'
                ? 'copy'
                : activeTool === 'move'
                ? isDrawing
                  ? 'grabbing'
                  : 'grab'
                : 'crosshair'
          }}
          className="absolute inset-0 block touch-none"
        />

        {/* Pure Direct Inline Text Writing (Cardless / Borderless Excalidraw Style) */}
        {textInputPos && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: `${textInputPos.x * viewScale + viewOffset.x}px`,
              top: `${textInputPos.y * viewScale + viewOffset.y}px`,
              zIndex: 50,
              transform: `scale(${viewScale})`,
              transformOrigin: 'top left'
            }}
          >
            <textarea
              ref={textInputRef}
              value={textInputValue}
              onChange={(e) => {
                setTextInputValue(e.target.value);
                const lines = e.target.value.split('\n');
                const maxLen = Math.max(...lines.map(l => l.length), 2);
                const sizeMeta = FONT_SIZES[activeFontSize] || FONT_SIZES.M;
                const charWidth = sizeMeta.px * 0.65;
                e.target.style.width = `${Math.max(90, Math.ceil(maxLen * charWidth + 28))}px`;
                e.target.style.height = `${Math.max(sizeMeta.lineHeight + 10, Math.ceil(lines.length * sizeMeta.lineHeight + 10))}px`;
              }}
              onPaste={() => {
                setTimeout(() => {
                  if (textInputRef.current) {
                    const val = textInputRef.current.value;
                    setTextInputValue(val);
                    const lines = val.split('\n');
                    const maxLen = Math.max(...lines.map(l => l.length), 2);
                    const sizeMeta = FONT_SIZES[activeFontSize] || FONT_SIZES.M;
                    const charWidth = sizeMeta.px * 0.65;
                    textInputRef.current.style.width = `${Math.max(90, Math.ceil(maxLen * charWidth + 28))}px`;
                    textInputRef.current.style.height = `${Math.max(sizeMeta.lineHeight + 10, Math.ceil(lines.length * sizeMeta.lineHeight + 10))}px`;
                  }
                }, 10);
              }}
              onBlur={() => {
                if (isJustPlacedRef.current) {
                  textInputRef.current?.focus();
                  return;
                }
                if (textInputValue.trim()) {
                  handleCommitText();
                } else {
                  setTextInputPos(null);
                  setTextInputValue('');
                  setEditingElementId(null);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setTextInputPos(null);
                  setTextInputValue('');
                  setEditingElementId(null);
                } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleCommitText();
                }
                // Plain 'Enter' naturally creates a new line without committing!
              }}
              autoFocus
              style={{
                color: currentColor,
                caretColor: currentColor,
                fontFamily: FONT_FAMILIES[activeFontFamily]?.font || '"JetBrains Mono", monospace',
                fontSize: `${FONT_SIZES[activeFontSize]?.px || 16}px`,
                fontWeight: 700,
                lineHeight: `${FONT_SIZES[activeFontSize]?.lineHeight || 22}px`,
                background: 'transparent',
                border: `1.5px dashed ${currentColor}99`,
                borderRadius: '4px',
                outline: 'none',
                padding: '4px 8px',
                margin: '0px',
                minWidth: '90px',
                minHeight: '28px',
                resize: 'none',
                overflow: 'hidden',
                boxShadow: 'none',
                whiteSpace: 'pre',
                tabSize: 2
              }}
            />
          </div>
        )}

        {/* Floating Quick Action Pill above selected element (hidden while typing/editing) */}
        {selectedElementId && !editingElementId && !editingStickyId && selectionBox && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: `${Math.max(12, selectionBox.minX * viewScale + viewOffset.x)}px`,
              top: `${Math.max(8, selectionBox.minY * viewScale + viewOffset.y - 44)}px`,
              zIndex: 45
            }}
            className="flex items-center gap-1.5 bg-[#1E1E1E]/95 backdrop-blur-md px-2 py-1 rounded-xl border border-stone-700 shadow-2xl animate-in fade-in zoom-in-95 duration-100"
          >
            <button
              type="button"
              onClick={handleDuplicate}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-stone-800 text-stone-200 transition-colors cursor-pointer text-xs"
              title="Duplicate Element (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-mono font-medium">Duplicate</span>
            </button>
            <div className="w-px h-4 bg-stone-700" />
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="p-1 rounded-lg hover:bg-rose-950/60 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Delete (Del / Backspace)"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-stone-700" />
            <button
              type="button"
              onClick={() => setIsInspectorOpen(prev => !prev)}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isInspectorOpen ? 'bg-blue-600/30 text-blue-300' : 'hover:bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Toggle Styles Inspector"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating Right Inspector / Properties Panel (tldraw style) */}
        {isInspectorOpen && (
          <div
            ref={inspectorRef}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 z-40 w-56 bg-[#1E1E1E]/95 backdrop-blur-md border border-stone-800 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-2 select-none animate-in fade-in slide-in-from-right-2 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-200">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Styles & Properties</span>
              </div>
              <div className="flex items-center gap-1.5">
                {selectedElement ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 capitalize">
                    {selectedElement.type}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800/80 text-stone-400">
                    Default
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="text-stone-400 hover:text-white p-1 rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Collapse Panel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 12 Color Palette Swatches */}
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Color</span>
                <span className="text-[9px] text-stone-500 font-normal">{currentColor}</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {TL_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleUpdateColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-5.5 h-5.5 rounded-full transition-transform cursor-pointer relative ${
                      currentColor.toLowerCase() === c.color.toLowerCase()
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-stone-900 scale-110 z-10'
                        : 'hover:scale-110 border border-white/10'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Fill Style */}
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">Fill</div>
              <div className="grid grid-cols-3 gap-1 bg-stone-900/80 p-0.5 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateFillStyle('none')}
                  className={`py-1 text-[11px] rounded-md font-medium transition-all cursor-pointer ${
                    activeFillStyle === 'none'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="No fill (Transparent)"
                >
                  None
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateFillStyle('tint')}
                  className={`py-1 text-[11px] rounded-md font-medium transition-all cursor-pointer ${
                    activeFillStyle === 'tint'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Tint (15% Translucent fill)"
                >
                  Tint
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateFillStyle('solid')}
                  className={`py-1 text-[11px] rounded-md font-medium transition-all cursor-pointer ${
                    activeFillStyle === 'solid'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Solid opaque fill"
                >
                  Solid
                </button>
              </div>
            </div>

            {/* Stroke Dash Style */}
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">Stroke Dash</div>
              <div className="grid grid-cols-3 gap-1 bg-stone-900/80 p-0.5 rounded-lg border border-stone-800">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateStrokeStyle('solid')}
                  className={`py-0.5 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeStrokeStyle === 'solid'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Solid continuous stroke"
                >
                  ———
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateStrokeStyle('dashed')}
                  className={`py-0.5 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeStrokeStyle === 'dashed'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Dashed stroke"
                >
                  - - -
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUpdateStrokeStyle('dotted')}
                  className={`py-0.5 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeStrokeStyle === 'dotted'
                      ? 'bg-stone-700 text-white shadow-xs font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Dotted stroke"
                >
                  ······
                </button>
              </div>
            </div>

            {/* Size (S, M, L, XL) */}
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">Size</div>
              <div className="grid grid-cols-4 gap-1 bg-stone-900/80 p-0.5 rounded-lg border border-stone-800">
                {(['S', 'M', 'L', 'XL'] as FontSize[]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleUpdateFontSize(sz)}
                    className={`py-0.5 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                      activeFontSize === sz
                        ? 'bg-[#2457D6] text-white shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Font Family */}
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Font Family</span>
                <span className="text-[9px] text-stone-500 font-normal">{FONT_FAMILIES[activeFontFamily]?.label || 'Mono'}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 bg-stone-900/80 p-0.5 rounded-lg border border-stone-800">
                {(Object.keys(FONT_FAMILIES) as FontFamily[]).map((f) => {
                  const meta = FONT_FAMILIES[f];
                  return (
                    <button
                      key={f}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleUpdateFontFamily(f)}
                      style={{ fontFamily: meta.font }}
                      className={`py-1 text-[11px] rounded-md font-medium transition-all text-center cursor-pointer ${
                        activeFontFamily === f
                          ? 'bg-[#2457D6] text-white font-bold shadow-xs'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                      title={`${meta.name} (${meta.label})`}
                    >
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Inspector Button (when closed) */}
        {!isInspectorOpen && (
          <button
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className="absolute top-4 right-4 z-40 bg-[#1E1E1E]/95 hover:bg-stone-800 text-stone-300 hover:text-white px-3 py-1.5 rounded-xl border border-stone-800 shadow-xl text-xs flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
            title="Open Styles Inspector"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>Styles</span>
          </button>
        )}

        {/* Interactive Sticky Note Placer */}
        {stickyInputPos && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: `${stickyInputPos.x * viewScale + viewOffset.x}px`,
              top: `${stickyInputPos.y * viewScale + viewOffset.y}px`,
              zIndex: 55,
              width: `${230 * viewScale}px`,
              minHeight: `${180 * viewScale}px`,
              backgroundColor: activeStickyColor,
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            {/* Sticky Header / Color Switcher */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="h-7 px-2.5 flex items-center justify-between border-b border-black/5 bg-black/[0.04] select-none"
            >
              <div className="flex items-center gap-1.5">
                {STICKY_COLORS.map((sc) => (
                  <button
                    key={sc.bg}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStickyColor(sc.bg);
                      stickyInputRef.current?.focus();
                    }}
                    style={{ backgroundColor: sc.bg }}
                    className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                      activeStickyColor === sc.bg ? 'scale-125 border-stone-800 ring-1 ring-black/30' : 'border-black/20 hover:scale-110'
                    }`}
                    title={sc.name}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-600 font-mono font-medium select-none">Ctrl+Enter</span>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (stickyInputValue.trim()) handleCommitSticky();
                    else setStickyInputPos(null);
                  }}
                  className="text-stone-600 hover:text-stone-950 text-xs px-1 font-bold cursor-pointer"
                  title="Pin / Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Sticky Note Content */}
            <textarea
              ref={stickyInputRef}
              value={stickyInputValue}
              onChange={(e) => setStickyInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setStickyInputPos(null);
                  setStickyInputValue('');
                } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleCommitSticky();
                }
              }}
              onBlur={() => {
                if (isJustPlacedStickyRef.current) {
                  stickyInputRef.current?.focus();
                  return;
                }
                if (stickyInputValue.trim()) {
                  handleCommitSticky();
                } else {
                  setStickyInputPos(null);
                  setStickyInputValue('');
                }
              }}
              placeholder="Write memo, formula or paste code..."
              autoFocus
              className="flex-1 w-full p-2.5 bg-transparent resize-none outline-none font-mono text-[13px] text-stone-900 leading-relaxed placeholder:text-stone-500/70"
              style={{ whiteSpace: 'pre-wrap', tabSize: 2, minHeight: '140px' }}
            />
          </div>
        )}

        {/* MS Paint Style Floating Eraser Box */}
        {activeTool === 'eraser' && mousePos && (
          <div
            style={{
              left: `${mousePos.x - 12}px`,
              top: `${mousePos.y - 12}px`,
              width: '24px',
              height: '24px',
              pointerEvents: 'none'
            }}
            className="absolute rounded-md border-2 border-stone-800 bg-white/85 shadow-md z-30 transition-none flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </div>
        )}
      </div>

      {/* ================= FOOTER DRAFTING DESK STATUS BAR ================= */}
      <div className="h-7 bg-[#141412] border-t border-stone-800 px-4 flex items-center justify-between text-[11px] font-mono text-stone-500 shrink-0">
        <div className="flex items-center gap-3">
          <span>📐 Tool: <strong>{activeTool.toUpperCase()}</strong></span>
          <span>·</span>
          <span>Strokes: <strong>{elements.length}</strong></span>
          <span>·</span>
          <span className="text-emerald-400">● Auto-Saved</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const newScale = Math.max(0.1, viewScale / 1.2);
                const canvas = canvasRef.current;
                if (canvas) {
                  const cx = canvas.getBoundingClientRect().width / 2;
                  const cy = canvas.getBoundingClientRect().height / 2;
                  const ratio = newScale / viewScale;
                  const nx = cx - ratio * (cx - viewOffset.x);
                  const ny = cy - ratio * (cy - viewOffset.y);
                  viewScaleRef.current = newScale;
                  viewOffsetRef.current = { x: nx, y: ny };
                  setViewScale(newScale); setViewOffset({ x: nx, y: ny });
                }
              }}
              className="px-1.5 py-0.5 rounded hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out (Ctrl+-)">
              −
            </button>
            <button
              type="button"
              onClick={() => {
                viewScaleRef.current = 1; viewOffsetRef.current = { x: 0, y: 0 };
                setViewScale(1); setViewOffset({ x: 0, y: 0 });
              }}
              className="px-2 py-0.5 rounded hover:bg-stone-800 hover:text-white transition-colors cursor-pointer tabular-nums"
              title="Reset zoom to 100% (Ctrl+0)">
              {Math.round(viewScale * 100)}%
            </button>
            <button
              type="button"
              onClick={() => {
                const newScale = Math.min(8, viewScale * 1.2);
                const canvas = canvasRef.current;
                if (canvas) {
                  const cx = canvas.getBoundingClientRect().width / 2;
                  const cy = canvas.getBoundingClientRect().height / 2;
                  const ratio = newScale / viewScale;
                  const nx = cx - ratio * (cx - viewOffset.x);
                  const ny = cy - ratio * (cy - viewOffset.y);
                  viewScaleRef.current = newScale;
                  viewOffsetRef.current = { x: nx, y: ny };
                  setViewScale(newScale); setViewOffset({ x: nx, y: ny });
                }
              }}
              className="px-1.5 py-0.5 rounded hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
              title="Zoom In (Ctrl+=)">
              +
            </button>
          </div>
          <span className="hidden sm:block text-stone-600">·</span>
          <span className="hidden sm:block text-stone-600">Scroll to pan · Ctrl+Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
