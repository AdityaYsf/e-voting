import { ReactNode, CSSProperties } from "react";

// ─── Union Types ─────────────────────────────────────────────────────────────

export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderVariant =
  | "light"
  | "dark"
  | "blur"
  | "transparent"
  | "gradient";
export type LoaderType = "spinner" | "dots" | "pulse" | "ring" | "bar";
export type LoaderPosition = "center" | "top" | "bottom";

// ─── Props Interface ──────────────────────────────────────────────────────────

export interface LoaderOverlayProps {
  /** Controls overlay visibility. Default: `true` */
  show?: boolean;
  /** Loading animation type. Default: `"spinner"` */
  type?: LoaderType;
  /** Size scale of the loader. Default: `"md"` */
  size?: LoaderSize;
  /** Overlay background & text theme. Default: `"dark"` */
  variant?: LoaderVariant;
  /** Accent color (any valid CSS color string). Default: `"#a78bfa"` */
  color?: string;
  /** Primary message shown below the loader. Default: `"Loading..."` */
  message?: ReactNode;
  /** Secondary hint string. Default: `""` */
  submessage?: ReactNode;
  /** `true` for `position: fixed` to cover the full viewport. Default: `false` */
  fullScreen?: boolean;
  /** CSS z-index value. Default: `999` */
  zIndex?: number;
  /** Overlay backdrop opacity (0–1). Default: `1` */
  opacity?: number;
  /** Backdrop blur strength in px. Default: `8` */
  blur?: number;
  /** Show an animated progress bar. Default: `false` */
  showProgress?: boolean;
  /** Progress bar value (0–100). Default: `0` */
  progress?: number;
  /** Show a ✕ close button. Default: `false` */
  closable?: boolean;
  /** Callback fired when the overlay is dismissed. */
  onClose?: () => void;
  /** Vertical alignment of the loader box. Default: `"center"` */
  position?: LoaderPosition;
  /** Apply fade-in animation on mount. Default: `true` */
  animateIn?: boolean;
  /** Auto-dismiss after N milliseconds. `0` to disable. Default: `0` */
  timeout?: number;
  /** Replace the loader icon with custom React content. */
  children?: ReactNode;
  /** Dismiss the overlay on backdrop click. Default: `false` */
  closeOnOutsideClick?: boolean;
  /** Callback fired when user clicks outside the loader box. */
  onOutsideClick?: () => void;
}

// ─── Icon Component Type ─────────────────────────────────────────────────────

export interface IconProps {
  /** Icon size in px */
  s: number;
  /** Accent color */
  color: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export declare const SIZES: Record<
  LoaderSize,
  { s: number; f: string; g: string }
>;
export declare const VARIANTS: Record<
  LoaderVariant,
  { bg: string; tx: string }
>;
export declare const ANIM_CSS: string;

// ─── Icon Components ─────────────────────────────────────────────────────────

export declare const SpinIcon: (props: IconProps) => JSX.Element;
export declare const DotsIcon: (props: IconProps) => JSX.Element;
export declare const PulseIcon: (props: IconProps) => JSX.Element;
export declare const RingIcon: (props: IconProps) => JSX.Element;
export declare const BarIcon: (props: IconProps) => JSX.Element;
export declare const ICONS: Record<LoaderType, (props: IconProps) => JSX.Element>;

// ─── Default Export ───────────────────────────────────────────────────────────

declare function LoaderOverlay(props: LoaderOverlayProps): JSX.Element | null;
export default LoaderOverlay;
export { LoaderOverlay };
