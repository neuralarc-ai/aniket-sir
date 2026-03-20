interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function KiwiIcon({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: { width: 100, height: 100 },
    md: { width: 140, height: 140 },
    lg: { width: 240, height: 240 },
  };

  const config = sizeClasses[size];

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 160 160" 
      width={config.width} 
      height={config.height}
      className={className}
    >
      <defs>
        <radialGradient id="flesh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a9e8e"/>
          <stop offset="60%" stopColor="#3d8577"/>
          <stop offset="100%" stopColor="#2e6b5e"/>
        </radialGradient>
        <radialGradient id="glow-center" cx="50%" cy="48%" r="40%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        <clipPath id="inner-clip">
          <circle cx="80" cy="80" r="33"/>
        </clipPath>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="outer-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2e6b5e" floodOpacity="0.35"/>
        </filter>
      </defs>

      {/* Outer teal ring */}
      <circle cx="80" cy="80" r="44" fill="#2e6b5e" filter="url(#outer-shadow)"/>

      {/* White border ring */}
      <circle cx="80" cy="80" r="35" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>

      {/* Flesh fill */}
      <circle cx="80" cy="80" r="33" fill="url(#flesh)"/>

      {/* Conic radial lines */}
      <g clipPath="url(#inner-clip)" opacity="0.18">
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(22.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(45,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(67.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(90,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(112.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(135,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(157.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(180,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(202.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(225,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(247.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(270,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(292.5,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(315,80,80)"/>
        <line x1="80" y1="80" x2="80" y2="47" stroke="white" strokeWidth="0.6" transform="rotate(337.5,80,80)"/>
      </g>

      {/* Seeds (16 white teardrops at r=24 from center) */}
      <g fill="white">
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(0,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(22.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(45,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(67.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(90,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(112.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(135,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(157.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(180,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(202.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(225,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(247.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(270,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(292.5,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(315,80,80)"/>
        <ellipse cx="80" cy="56" rx="2" ry="3" transform="rotate(337.5,80,80)"/>
      </g>

      {/* Center highlight */}
      <ellipse cx="80" cy="78" rx="10" ry="12" fill="url(#glow-center)" transform="rotate(12,80,80)"/>
    </svg>
  );
}
