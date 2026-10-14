/** Lightweight inline icon set (no icon library needed) */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p });

export const MenuIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const PlusIcon = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const TrashIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>);
export const SearchIcon = (p: P) => (<svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>);
export const ArrowIcon = (p: P) => (<svg {...base(p)} className={`rtl:-scale-x-100 ${p.className ?? ""}`}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const StarIcon = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" /></svg>);
export const PhoneIcon = (p: P) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const MailIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const PinIcon = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ClockIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const ShieldIcon = (p: P) => (<svg {...base(p)}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>);
export const WhatsAppIcon = (p: P) => (<svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden {...p}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.02c-.24.68-1.43 1.3-1.97 1.35-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.2-.14.32-.29.49-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.58 1.97 1.09.97 2 1.27 2.29 1.41.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.14.49.22.56.34.07.12.07.7-.17 1.37z" /></svg>);
export const InstagramIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>);
export const FacebookIcon = (p: P) => (<svg {...base(p)}><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" /></svg>);
export const YoutubeIcon = (p: P) => (<svg {...base(p)}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>);
export const TiktokIcon = (p: P) => (<svg {...base(p)}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.5" /></svg>);
export const UploadIcon = (p: P) => (<svg {...base(p)}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg>);
export const EyeIcon = (p: P) => (<svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>);
export const EyeOffIcon = (p: P) => (<svg {...base(p)}><path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>);
export const LogoutIcon = (p: P) => (<svg {...base(p)}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" /></svg>);
export const SaveIcon = (p: P) => (<svg {...base(p)}><path d="M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M7 3v5h8V3M7 21v-7h10v7" /></svg>);
export const GripIcon = (p: P) => (<svg {...base(p)}><circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" /></svg>);
export const StarOutlineIcon = (p: P) => (<svg {...base(p)}><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" /></svg>);
export const ExternalIcon = (p: P) => (<svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>);
export const LockIcon = (p: P) => (<svg {...base(p)}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>);

// ─── Interior & decoration ───
export const InteriorIcon = (p: P) => (<svg {...base(p)}><path d="M3 11l9-7 9 7" /><path d="M5 9.5V20h14V9.5" /><path d="M8.5 20v-4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V20" /><path d="M7 16.5h10" /></svg>);
export const FurnitureIcon = (p: P) => (<svg {...base(p)}><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3z" /><path d="M5 17v2M19 17v2" /></svg>);
export const PaintIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="15" height="6" rx="1.5" /><path d="M18 6h2.5v5.5H11v3" /><rect x="9.5" y="14.5" width="3" height="6.5" rx="1" /></svg>);
export const CeilingIcon = (p: P) => (<svg {...base(p)}><path d="M2 4h20M4 4v3h16V4" /><path d="M8 7v2M16 7v2" /><path d="M6.5 13l1.5-4 1.5 4M14.5 13l1.5-4 1.5 4" /><path d="M8 15v1.5M8 18.5V20M16 15v1.5M16 18.5V20" /></svg>);
export const KitchenIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="7" rx="1" /><rect x="3" y="13" width="18" height="8" rx="1" /><path d="M12 3v7M12 13v8M9.5 6.5v1M14.5 6.5v1M9.5 16v2M14.5 16v2" /></svg>);
export const TvIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></svg>);
export const BathIcon = (p: P) => (<svg {...base(p)}><path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" /><path d="M6 12V5.5A2.5 2.5 0 0 1 10.5 4" /><path d="M7 19l-1 2M17 19l1 2" /></svg>);
export const LightingIcon = (p: P) => (<svg {...base(p)}><path d="M12 2v5" /><path d="M5 15a7 7 0 0 1 14 0z" /><path d="M10 18a2 2 0 0 0 4 0" /></svg>);
export const FloorIcon = (p: P) => (<svg {...base(p)}><path d="M3 9l9-5 9 5-9 5z" /><path d="M3 14l9 5 9-5M7.5 6.5l9 5M16.5 6.5l-9 5" /></svg>);
export const WardrobeIcon = (p: P) => (<svg {...base(p)}><rect x="4" y="3" width="16" height="16" rx="1.5" /><path d="M12 3v16M10 10v2M14 10v2M6 19v2M18 19v2" /></svg>);
export const RulerIcon = (p: P) => (<svg {...base(p)}><path d="M3 17L17 3l4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>);
export const PencilIcon = (p: P) => (<svg {...base(p)}><path d="M4 20l1-5L16 4l4 4L9 19z" /><path d="M13.5 6.5l4 4" /></svg>);
export const ToolsIcon = (p: P) => (<svg {...base(p)}><path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3z" /><path d="M14.5 6.5L17 4l3 3-2.5 2.5" /></svg>);
export const KeyIcon = (p: P) => (<svg {...base(p)}><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M18 5l2 2" /></svg>);
export const GemIcon = (p: P) => (<svg {...base(p)}><path d="M6 3h12l3 6-9 12L3 9z" /><path d="M3 9h18M9 3l3 18M15 3l-3 18" /></svg>);
export const CalendarIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M8.5 15l2 2 4-4" /></svg>);
export const TagIcon = (p: P) => (<svg {...base(p)}><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>);
export const HomeSearchIcon = (p: P) => (<svg {...base(p)}><path d="M3 11l8-7 8 7" /><path d="M5 9.5V20h6" /><circle cx="16" cy="16" r="3" /><path d="M18.2 18.2L21 21" /></svg>);
export const ExpandIcon = (p: P) => (<svg {...base(p)}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>);
