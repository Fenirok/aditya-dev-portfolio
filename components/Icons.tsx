type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const GitHubIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const LinkedInIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ExternalIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/** Google Play – outlined "play" triangle */
export const PlayStoreIcon = ({ className }: P) => (
  <svg {...base} strokeWidth={1.8} className={className} aria-hidden>
    <path d="M4.5 3.2v17.6a.8.8 0 0 0 1.2.7l15.1-8.8a.8.8 0 0 0 0-1.4L5.7 2.5a.8.8 0 0 0-1.2.7Z" />
    <path d="M4.8 3 14.5 12l-9.7 9" />
    <path d="m14.5 12 3-3M14.5 12l3 3" />
  </svg>
);

export const FolderIcon = ({ className }: P) => (
  <svg {...base} strokeWidth={1} className={className} aria-hidden>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const MediumIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <ellipse cx="7" cy="12" rx="5.5" ry="5.5" />
    <ellipse cx="16.3" cy="12" rx="2.7" ry="5.1" />
    <ellipse cx="21.2" cy="12" rx="1" ry="4.5" />
  </svg>
);

export const YouTubeIcon = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <polygon points="10 9 15.5 12 10 15" fill="currentColor" />
  </svg>
);

export const XIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.8-6.3L5.4 21H2.3l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
  </svg>
);

export const SocialIcon = ({ name, className }: P & { name: string }) => {
  switch (name) {
    case "GitHub":
      return <GitHubIcon className={className} />;
    case "LinkedIn":
      return <LinkedInIcon className={className} />;
    case "Medium":
      return <MediumIcon className={className} />;
    case "YouTube":
      return <YouTubeIcon className={className} />;
    default:
      return <XIcon className={className} />;
  }
};

/** Hexagon logo with an "A" */
export const Logo = ({ className, animate = false }: P & { animate?: boolean }) => (
  <svg viewBox="0 0 84 96" className={className} aria-label="Logo" role="img">
    <g transform="translate(-8, -2)">
      <g transform="translate(11, 5)">
        <polygon
          points="39 0 0 22 0 67 39 90 78 68 78 23"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            animate
              ? { strokeDasharray: 400, strokeDashoffset: 400, animation: "drawHex 1.2s ease-in-out forwards" }
              : undefined
          }
        />
        <text
          x="39"
          y="58"
          textAnchor="middle"
          fill="currentColor"
          fontSize="44"
          fontWeight="700"
          fontFamily="var(--font-sans)"
          style={animate ? { opacity: 0, animation: "fadeIn 0.4s ease 1.1s forwards" } : undefined}
        >
          A
        </text>
      </g>
    </g>
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} className={className} aria-hidden>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </svg>
);
