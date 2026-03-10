import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// Pyro Element — flame/fire
export function PyroIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4C32 4 18 20 18 36c0 7.7 6.3 14 14 14s14-6.3 14-14C46 20 32 4 32 4z" fill={color} opacity="0.9" />
      <path d="M32 18c0 0-8 10-8 20 0 4.4 3.6 8 8 8s8-3.6 8-8c0-10-8-20-8-20z" fill={color} opacity="0.5" />
      <circle cx="32" cy="38" r="4" fill={color} opacity="0.3" />
    </svg>
  );
}

// Hydro Element — water droplet
export function HydroIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 6L18 32c0 0-2 4-2 10 0 8.8 7.2 16 16 16s16-7.2 16-16c0-6-2-10-2-10L32 6z" fill={color} opacity="0.85" />
      <path d="M32 16L24 34c0 0-1 3-1 6 0 5 4 9 9 9s9-4 9-9c0-3-1-6-1-6L32 16z" fill={color} opacity="0.4" />
      <ellipse cx="28" cy="38" rx="3" ry="4" fill={color} opacity="0.2" transform="rotate(-15 28 38)" />
    </svg>
  );
}

// Anemo Element — swirl/wind
export function AnemoIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="8" fill={color} opacity="0.4" />
      <path d="M32 24C32 24 38 18 44 18c3.3 0 6 2.7 6 6s-2.7 6-6 6H32" stroke={color} strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M32 40C32 40 26 46 20 46c-3.3 0-6-2.7-6-6s2.7-6 6-6H32" stroke={color} strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M24 32C24 32 18 26 18 20c0-3.3 2.7-6 6-6s6 2.7 6 6V32" stroke={color} strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M40 32C40 32 46 38 46 44c0 3.3-2.7 6-6 6s-6-2.7-6-6V32" stroke={color} strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

// Electro Element — lightning
export function ElectroIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <polygon points="36,4 20,36 30,36 24,60 48,26 36,26 42,4" fill={color} opacity="0.9" />
      <polygon points="34,14 26,34 32,34 28,52 42,28 36,28 38,14" fill={color} opacity="0.4" />
    </svg>
  );
}

// Dendro Element — leaf/nature
export function DendroIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8C20 8 10 22 10 36c0 8 4 14 10 18l12-12 12 12c6-4 10-10 10-18C54 22 44 8 32 8z" fill={color} opacity="0.8" />
      <line x1="32" y1="28" x2="32" y2="56" stroke={color} strokeWidth="2.5" opacity="0.5" strokeLinecap="round" />
      <line x1="32" y1="34" x2="24" y2="26" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="32" y1="40" x2="40" y2="32" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

// Cryo Element — snowflake/ice
export function CryoIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <line x1="32" y1="6" x2="32" y2="58" stroke={color} strokeWidth="3" opacity="0.8" strokeLinecap="round" />
      <line x1="9.4" y1="19" x2="54.6" y2="45" stroke={color} strokeWidth="3" opacity="0.8" strokeLinecap="round" />
      <line x1="9.4" y1="45" x2="54.6" y2="19" stroke={color} strokeWidth="3" opacity="0.8" strokeLinecap="round" />
      <line x1="32" y1="6" x2="26" y2="14" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="32" y1="6" x2="38" y2="14" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="32" y1="58" x2="26" y2="50" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="32" y1="58" x2="38" y2="50" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <circle cx="32" cy="32" r="5" fill={color} opacity="0.3" />
    </svg>
  );
}

// Geo Element — diamond/earth
export function GeoIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <polygon points="32,6 54,24 54,44 32,58 10,44 10,24" fill={color} opacity="0.8" />
      <polygon points="32,14 46,26 46,40 32,50 18,40 18,26" fill={color} opacity="0.35" />
      <polygon points="32,22 38,28 38,36 32,42 26,36 26,28" fill={color} opacity="0.15" />
    </svg>
  );
}

// Wish/Intertwined Fate — star symbol
export function WishIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L37 24L56 20L42 32L56 44L37 40L32 60L27 40L8 44L22 32L8 20L27 24Z" fill={color} opacity="0.85" />
      <circle cx="32" cy="32" r="6" fill={color} opacity="0.3" />
    </svg>
  );
}

// Vision Orb — the elemental vision symbol
export function VisionIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <circle cx="32" cy="32" r="16" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="32" cy="32" r="8" fill={color} opacity="0.5" />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.8" />
      {/* Decorative arcs */}
      <path d="M32 8 A24 24 0 0 1 56 32" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M32 56 A24 24 0 0 1 8 32" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  );
}

// Paimon star (simplified) — for misc navigation
export function PaimonStarIcon({ size = 24, className, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 8L36 28L56 32L36 36L32 56L28 36L8 32L28 28Z" fill={color} opacity="0.8" />
      <path d="M32 18L34 28L44 32L34 36L32 46L30 36L20 32L30 28Z" fill={color} opacity="0.35" />
    </svg>
  );
}

// Map of element icon components by name for easy lookup
export const ELEMENT_ICONS: Record<string, React.FC<IconProps>> = {
  pyro: PyroIcon,
  hydro: HydroIcon,
  anemo: AnemoIcon,
  electro: ElectroIcon,
  dendro: DendroIcon,
  cryo: CryoIcon,
  geo: GeoIcon,
  wish: WishIcon,
  vision: VisionIcon,
  star: PaimonStarIcon,
};

export function ElementIcon({ element, ...props }: IconProps & { element: string }) {
  const Icon = ELEMENT_ICONS[element] || PaimonStarIcon;
  return <Icon {...props} />;
}
