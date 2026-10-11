import React from 'react';

interface IllustrationProps {
  className?: string;
}

export const ComponentIllustration: React.FC<{ componentId: string; className?: string }> = ({
  componentId,
  className = 'w-56 h-56 md:w-64 md:h-64',
}) => {
  switch (componentId) {
    case 'monitor':
      return <MonitorIllustration className={className} />;
    case 'keyboard':
      return <KeyboardIllustration className={className} />;
    case 'mouse':
      return <MouseIllustration className={className} />;
    case 'cpu':
      return <CPUSystemUnitIllustration className={className} />;
    case 'printer':
      return <PrinterIllustration className={className} />;
    case 'speakers':
      return <SpeakersIllustration className={className} />;
    case 'microphone':
      return <MicrophoneIllustration className={className} />;
    case 'webcam':
      return <WebcamIllustration className={className} />;
    case 'headphones':
      return <HeadphonesIllustration className={className} />;
    case 'scanner':
      return <ScannerIllustration className={className} />;
    case 'usb_drive':
      return <USBDriveIllustration className={className} />;
    case 'ram':
      return <RAMIllustration className={className} />;
    case 'hard_disk':
      return <HardDiskIllustration className={className} />;
    case 'motherboard':
      return <MotherboardIllustration className={className} />;
    case 'ups':
      return <UPSIllustration className={className} />;
    default:
      return <MonitorIllustration className={className} />;
  }
};

// 1. MONITOR: Desktop screen with vibrant wallpaper, stand, power button
export const MonitorIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stand Base */}
    <ellipse cx="120" cy="184" rx="42" ry="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="3" />
    <path d="M112 145 H128 L126 182 H114 Z" fill="#94A3B8" />
    
    {/* Screen Outer Frame */}
    <rect x="22" y="22" width="196" height="126" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
    
    {/* Inner Screen Display (Glowing Blue with kid desktop layout) */}
    <rect x="32" y="32" width="176" height="104" rx="8" fill="#0284C7" />
    
    {/* Desktop Wallpaper Details (Mountains & Sun) */}
    <path d="M32 110 L80 65 L130 115 L170 85 L208 120 V136 H32 Z" fill="#0EA5E9" />
    <path d="M80 65 L110 95 L145 75 L208 136 H70 Z" fill="#38BDF8" opacity="0.6" />
    <circle cx="165" cy="55" r="14" fill="#FDE047" />

    {/* Desktop Icons */}
    <rect x="42" y="42" width="12" height="12" rx="2" fill="#F8FAFC" />
    <rect x="42" y="60" width="12" height="12" rx="2" fill="#F8FAFC" />
    <rect x="42" y="78" width="12" height="12" rx="2" fill="#F8FAFC" />

    {/* Taskbar */}
    <rect x="32" y="124" width="176" height="12" fill="#0F172A" opacity="0.8" />
    <circle cx="40" cy="130" r="3" fill="#38BDF8" />
    <rect x="48" y="128" width="14" height="4" rx="1" fill="#94A3B8" />
    <rect x="66" y="128" width="14" height="4" rx="1" fill="#94A3B8" />

    {/* Monitor Power LED */}
    <circle cx="120" cy="142" r="2.5" fill="#10B981" />
  </svg>
);

// 2. KEYBOARD: Angled keyboard with key rows, spacebar, arrow keys
export const KeyboardIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Keyboard Body Chassis */}
    <rect x="15" y="60" width="210" height="95" rx="12" fill="#334155" stroke="#1E293B" strokeWidth="4" />
    <rect x="23" y="66" width="194" height="83" rx="8" fill="#1E293B" />

    {/* USB Cable */}
    <path d="M120 60 V35 Q120 25 105 25 H85" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />

    {/* Function Keys Row */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <rect key={`f-${i}`} x={30 + i * 18} y="72" width="14" height="8" rx="2" fill="#64748B" />
    ))}

    {/* Number Row */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <rect key={`num-${i}`} x={30 + i * 18} y="84" width="14" height="11" rx="2.5" fill="#94A3B8" />
    ))}

    {/* QWERTY Row */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <rect key={`q-${i}`} x={30 + i * 18} y="99" width="14" height="11" rx="2.5" fill="#E2E8F0" />
    ))}

    {/* ASDF Row */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <rect key={`a-${i}`} x={34 + i * 18} y="114" width="14" height="11" rx="2.5" fill="#E2E8F0" />
    ))}
    {/* Enter key */}
    <rect x="196" y="114" width="16" height="11" rx="2.5" fill="#F59E0B" />

    {/* Bottom Row: Spacebar & Arrows */}
    <rect x="34" y="129" width="22" height="12" rx="2.5" fill="#64748B" />
    <rect x="62" y="129" width="94" height="12" rx="3" fill="#38BDF8" />
    <rect x="162" y="129" width="14" height="12" rx="2.5" fill="#94A3B8" />
    <rect x="180" y="129" width="14" height="12" rx="2.5" fill="#94A3B8" />
    <rect x="198" y="129" width="14" height="12" rx="2.5" fill="#94A3B8" />
  </svg>
);

// 3. MOUSE: Ergonomic optical computer mouse with scroll wheel and wire
export const MouseIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cord with gentle curve */}
    <path d="M120 45 Q120 20 150 20 Q175 20 175 35" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />

    {/* Mouse Body Drop Shadow */}
    <ellipse cx="120" cy="120" rx="46" ry="68" fill="#E2E8F0" />

    {/* Mouse Chassis Outer */}
    <rect x="74" y="44" width="92" height="136" rx="46" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="5" />

    {/* Mouse Left/Right Click Divider */}
    <line x1="120" y1="44" x2="120" y2="98" stroke="#1D4ED8" strokeWidth="4" />
    <path d="M74 98 C90 108 150 108 166 98" stroke="#1D4ED8" strokeWidth="4" />

    {/* Scroll Wheel */}
    <rect x="112" y="60" width="16" height="28" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
    <line x1="114" y1="70" x2="126" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="114" y1="76" x2="126" y2="76" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* Ergonomic Palm Rest Accent & Glow */}
    <path d="M96 142 Q120 162 144 142" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
    <circle cx="120" cy="130" r="10" fill="#2563EB" />
    {/* Optical glow dot */}
    <circle cx="120" cy="130" r="4" fill="#60A5FA" />
  </svg>
);

// 4. CPU / SYSTEM UNIT: Tower PC case with power button, fan grille, USB ports
export const CPUSystemUnitIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tower Base Footers */}
    <rect x="72" y="180" width="20" height="8" rx="3" fill="#1E293B" />
    <rect x="148" y="180" width="20" height="8" rx="3" fill="#1E293B" />

    {/* Tower Case Main Body */}
    <rect x="65" y="20" width="110" height="162" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />

    {/* Front Panel Inset */}
    <rect x="75" y="30" width="90" height="142" rx="8" fill="#334155" />

    {/* Top DVD/Drive Bay */}
    <rect x="85" y="40" width="70" height="18" rx="4" fill="#1E293B" />
    <line x1="90" y1="52" x2="140" y2="52" stroke="#64748B" strokeWidth="2" />
    <circle cx="147" cy="49" r="2" fill="#10B981" />

    {/* Big Power Button */}
    <circle cx="120" cy="74" r="11" fill="#3B82F6" stroke="#60A5FA" strokeWidth="2" />
    <path d="M120 67 V74 M116 70 A5 5 0 1 0 124 70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* Front USB Ports and Headphone Jack */}
    <rect x="92" y="94" width="12" height="6" rx="1.5" fill="#0284C7" />
    <rect x="110" y="94" width="12" height="6" rx="1.5" fill="#0284C7" />
    <circle cx="132" cy="97" r="3" fill="#10B981" />
    <circle cx="144" cy="97" r="3" fill="#F43F5E" />

    {/* Modern RGB Cooling Fan Grille */}
    <circle cx="120" cy="138" r="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
    {/* Fan blades with colorful RGB lighting */}
    <path d="M120 138 L120 120 M120 138 L136 148 M120 138 L104 148" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    <circle cx="120" cy="138" r="6" fill="#FBBF24" />
  </svg>
);

// 5. PRINTER: Inkjet/Laser desktop printer spitting out a colorful page
export const PrinterIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top Input Paper Tray & Blank Paper */}
    <rect x="68" y="24" width="104" height="40" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
    <line x1="80" y1="38" x2="130" y2="38" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
    <line x1="80" y1="48" x2="150" y2="48" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

    {/* Main Printer Body */}
    <rect x="36" y="58" width="168" height="86" rx="16" fill="#475569" stroke="#334155" strokeWidth="4" />
    <rect x="44" y="66" width="152" height="70" rx="10" fill="#64748B" />

    {/* Control Panel: LCD & Buttons */}
    <rect x="52" y="74" width="34" height="18" rx="4" fill="#0284C7" />
    <circle cx="94" cy="83" r="5" fill="#10B981" />
    <circle cx="106" cy="83" r="4" fill="#EF4444" />
    <circle cx="116" cy="83" r="4" fill="#3B82F6" />

    {/* Paper Output Slot */}
    <rect x="54" y="104" width="132" height="14" rx="4" fill="#1E293B" />

    {/* Printed Document Coming Out! */}
    <rect x="68" y="110" width="104" height="74" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
    {/* Printed content: Colorful bar chart and text lines */}
    <line x1="80" y1="126" x2="120" y2="126" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <line x1="80" y1="135" x2="160" y2="135" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="82" y="150" width="12" height="20" rx="2" fill="#38BDF8" />
    <rect x="98" y="142" width="12" height="28" rx="2" fill="#F59E0B" />
    <rect x="114" y="136" width="12" height="34" rx="2" fill="#10B981" />
    <rect x="130" y="146" width="12" height="24" rx="2" fill="#EF4444" />
  </svg>
);

// 6. SPEAKERS: Stereo desktop speakers with musical notes
export const SpeakersIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Speaker */}
    <g>
      <rect x="30" y="44" width="70" height="126" rx="14" fill="#334155" stroke="#1E293B" strokeWidth="4" />
      {/* Tweeter Cone */}
      <circle cx="65" cy="76" r="16" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
      <circle cx="65" cy="76" r="7" fill="#F59E0B" />
      {/* Woofer Cone */}
      <circle cx="65" cy="128" r="24" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
      <circle cx="65" cy="128" r="12" fill="#38BDF8" />
      <circle cx="65" cy="128" r="5" fill="#FFFFFF" />
    </g>

    {/* Right Speaker (with Volume Knob & Power LED) */}
    <g>
      <rect x="140" y="44" width="70" height="126" rx="14" fill="#334155" stroke="#1E293B" strokeWidth="4" />
      {/* Tweeter */}
      <circle cx="175" cy="76" r="16" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
      <circle cx="175" cy="76" r="7" fill="#F59E0B" />
      {/* Woofer */}
      <circle cx="175" cy="124" r="22" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
      <circle cx="175" cy="124" r="11" fill="#38BDF8" />
      {/* Volume Knob */}
      <circle cx="175" cy="156" r="6" fill="#64748B" />
      <circle cx="155" cy="156" r="2.5" fill="#10B981" />
    </g>

    {/* Connecting Audio Cable */}
    <path d="M100 150 Q120 165 140 150" stroke="#64748B" strokeWidth="4" fill="none" />

    {/* Floating Joyful Music Notes */}
    <path d="M112 40 L128 32 V46 M112 52 V36 M112 52 A4 4 0 1 1 106 50 M128 48 A4 4 0 1 1 122 46" stroke="#EC4899" strokeWidth="3" fill="#EC4899" strokeLinecap="round" />
  </svg>
);

// 7. MICROPHONE: Desktop podcast/voice microphone on stand with audio waves
export const MicrophoneIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Microphone Stand Base */}
    <ellipse cx="120" cy="182" rx="46" ry="10" fill="#334155" stroke="#1E293B" strokeWidth="3" />
    {/* Metal Vertical Rod */}
    <rect x="114" y="118" width="12" height="66" rx="3" fill="#94A3B8" />

    {/* U-shaped Swivel Mount */}
    <path d="M78 80 C78 126 162 126 162 80" stroke="#64748B" strokeWidth="6" strokeLinecap="round" fill="none" />
    <circle cx="78" cy="80" r="5" fill="#475569" />
    <circle cx="162" cy="80" r="5" fill="#475569" />

    {/* Microphone Capsule Body */}
    <rect x="94" y="32" width="52" height="82" rx="26" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />

    {/* Mesh Pop Filter Grille (Top half) */}
    <rect x="96" y="34" width="48" height="44" rx="24" fill="#38BDF8" opacity="0.9" />
    {/* Grille lines */}
    <line x1="102" y1="46" x2="138" y2="46" stroke="#0284C7" strokeWidth="2" />
    <line x1="100" y1="56" x2="140" y2="56" stroke="#0284C7" strokeWidth="2" />
    <line x1="104" y1="66" x2="136" y2="66" stroke="#0284C7" strokeWidth="2" />
    <line x1="112" y1="36" x2="112" y2="76" stroke="#0284C7" strokeWidth="2" />
    <line x1="128" y1="36" x2="128" y2="76" stroke="#0284C7" strokeWidth="2" />

    {/* Mute Button & Status LED */}
    <circle cx="120" cy="94" r="6" fill="#10B981" />
    <circle cx="120" cy="94" r="2.5" fill="#FFFFFF" />

    {/* Sound Recording Waves */}
    <path d="M60 62 Q50 78 60 94" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M48 54 Q34 78 48 102" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M180 62 Q190 78 180 94" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M192 54 Q206 78 192 102" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

// 8. WEBCAM: High-definition camera mounted with lens, recording LED, monitor clip
export const WebcamIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor Top Clip */}
    <path d="M90 145 H150 V175 H138 V155 H102 V175 H90 Z" fill="#475569" stroke="#334155" strokeWidth="3" />
    <circle cx="120" cy="138" r="8" fill="#64748B" />

    {/* Main Camera Head (Sleek Horizontal Pill) */}
    <rect x="42" y="56" width="156" height="74" rx="37" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />

    {/* Microphone Openings */}
    <circle cx="62" cy="93" r="3" fill="#64748B" />
    <circle cx="70" cy="93" r="3" fill="#64748B" />
    <circle cx="170" cy="93" r="3" fill="#64748B" />
    <circle cx="178" cy="93" r="3" fill="#64748B" />

    {/* Camera Lens Bezel */}
    <circle cx="120" cy="93" r="30" fill="#334155" stroke="#475569" strokeWidth="3" />
    {/* Outer Lens Glass */}
    <circle cx="120" cy="93" r="22" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
    {/* Lens Pupil / Aperture */}
    <circle cx="120" cy="93" r="12" fill="#0F172A" />
    {/* Glass Glare Highlights */}
    <ellipse cx="114" cy="87" rx="5" ry="3" transform="rotate(-30 114 87)" fill="#FFFFFF" opacity="0.8" />
    <circle cx="126" cy="100" r="2" fill="#FFFFFF" opacity="0.6" />

    {/* Recording LED (Bright Red glowing dot) */}
    <circle cx="156" cy="74" r="4.5" fill="#EF4444" className="animate-pulse" />
    <circle cx="156" cy="74" r="2" fill="#FFFFFF" />

    {/* USB Wire */}
    <path d="M120 175 V190 Q120 196 130 196 H160" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 9. HEADPHONES: Over-ear plush gaming/music headphones
export const HeadphonesIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Headband Arc */}
    <path
      d="M52 110 C52 46 188 46 188 110"
      stroke="#1E293B"
      strokeWidth="16"
      strokeLinecap="round"
      fill="none"
    />
    {/* Padded Cushion on Headband */}
    <path
      d="M74 76 C94 56 146 56 166 76"
      stroke="#3B82F6"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />

    {/* Left Ear Cup */}
    <g>
      {/* Ear Cushion */}
      <rect x="36" y="96" width="30" height="68" rx="14" fill="#334155" stroke="#1E293B" strokeWidth="4" />
      {/* Outer Shell Cup */}
      <rect x="44" y="104" width="24" height="52" rx="12" fill="#2563EB" />
      {/* Accent Ring */}
      <circle cx="56" cy="130" r="8" fill="#60A5FA" />
    </g>

    {/* Right Ear Cup */}
    <g>
      {/* Ear Cushion */}
      <rect x="174" y="96" width="30" height="68" rx="14" fill="#334155" stroke="#1E293B" strokeWidth="4" />
      {/* Outer Shell Cup */}
      <rect x="172" y="104" width="24" height="52" rx="12" fill="#2563EB" />
      {/* Accent Ring */}
      <circle cx="184" cy="130" r="8" fill="#60A5FA" />
    </g>

    {/* Attached Boom Mic */}
    <path d="M56 148 Q64 176 96 172" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
    <rect x="96" y="166" width="14" height="12" rx="4" fill="#1E293B" />
    <circle cx="106" cy="172" r="2" fill="#10B981" />
  </svg>
);

// 10. SCANNER: Flatbed document scanner with open lid & glowing scan bar
export const ScannerIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Scanner Base Enclosure */}
    <polygon points="35,160 205,160 215,115 25,115" fill="#475569" stroke="#334155" strokeWidth="4" />
    <rect x="25" y="145" width="190" height="25" rx="6" fill="#334155" />

    {/* Front Control Buttons */}
    <circle cx="180" cy="157" r="5" fill="#10B981" />
    <circle cx="195" cy="157" r="4" fill="#EF4444" />
    <rect x="45" y="153" width="24" height="8" rx="2" fill="#0284C7" />

    {/* Glass Flatbed Bed */}
    <polygon points="40,140 200,140 190,105 50,105" fill="#38BDF8" opacity="0.35" stroke="#0284C7" strokeWidth="2" />

    {/* Paper Sheet being scanned on glass */}
    <polygon points="65,135 155,135 145,110 75,110" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <line x1="80" y1="122" x2="135" y2="122" stroke="#94A3B8" strokeWidth="2" />

    {/* Glowing Moving Scanner Light Beam */}
    <line x1="42" y1="125" x2="198" y2="125" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
    <line x1="46" y1="125" x2="194" y2="125" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* Open Top Scanner Lid lifted at an angle */}
    <polygon points="45,95 195,95 180,40 60,40" fill="#64748B" stroke="#475569" strokeWidth="3" />
    {/* Soft white underside of lid */}
    <polygon points="52,90 188,90 175,46 65,46" fill="#F8FAFC" />
  </svg>
);

// 11. USB FLASH DRIVE: Portable thumb drive with metallic connector and cap
export const USBDriveIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Silver USB Metal Plug */}
    <rect x="45" y="82" width="46" height="36" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
    {/* Dual Contact Holes */}
    <rect x="56" y="90" width="8" height="8" rx="1" fill="#64748B" />
    <rect x="56" y="102" width="8" height="8" rx="1" fill="#64748B" />
    <rect x="74" y="93" width="12" height="14" rx="1" fill="#3B82F6" />

    {/* Main Body (Vibrant Cyan/Blue Casing) */}
    <rect x="88" y="70" width="112" height="60" rx="12" fill="#0284C7" stroke="#0369A1" strokeWidth="4" />
    <rect x="94" y="76" width="100" height="48" rx="8" fill="#0EA5E9" />

    {/* Grip ridges */}
    <line x1="150" y1="84" x2="150" y2="116" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    <line x1="158" y1="84" x2="158" y2="116" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    <line x1="166" y1="84" x2="166" y2="116" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />

    {/* USB Trident Logo / Emblem */}
    <circle cx="114" cy="100" r="4" fill="#FFFFFF" />
    <line x1="114" y1="100" x2="134" y2="100" stroke="#FFFFFF" strokeWidth="2.5" />
    <line x1="126" y1="100" x2="132" y2="92" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="126" y1="100" x2="132" y2="108" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="131" y="90" width="4" height="4" fill="#FFFFFF" />
    <circle cx="133" cy="108" r="2.5" fill="#FFFFFF" />

    {/* Keyring Hole at end */}
    <rect x="194" y="85" width="16" height="30" rx="6" fill="#0369A1" />
    <circle cx="202" cy="100" r="5" fill="#F8FAFC" />

    {/* Activity LED */}
    <circle cx="180" cy="100" r="3" fill="#10B981" />
  </svg>
);

// 12. RAM: Dual In-line Memory Module stick with chips and gold pins
export const RAMIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* RAM PCB Circuit Board (High Tech Green) */}
    <rect x="20" y="65" width="200" height="70" rx="6" fill="#15803D" stroke="#166534" strokeWidth="4" />

    {/* PCB Alignment Notch in center bottom */}
    <rect x="110" y="125" width="12" height="15" fill="#F8FAFC" />

    {/* Memory Chips (DRAM IC Blocks) */}
    {[35, 70, 135, 170].map((x, i) => (
      <g key={i}>
        <rect x={x} y="78" width="26" height="40" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        {/* Chip details & pin marks */}
        <line x1={x + 4} y1="88" x2={x + 22} y2="88" stroke="#64748B" strokeWidth="1.5" />
        <line x1={x + 4} y1="96" x2={x + 22} y2="96" stroke="#64748B" strokeWidth="1.5" />
        <circle cx={x + 5} cy="82" r="1.5" fill="#94A3B8" />
      </g>
    ))}

    {/* Tiny SMD Capacitors / Resistors */}
    {[26, 64, 100, 164, 198].map((x, i) => (
      <rect key={`cap-${i}`} x={x} y="78" width="4" height="8" rx="1" fill="#F59E0B" />
    ))}

    {/* Gold Edge Connector Pins (Bottom row) */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i) => {
      const px = 28 + i * 9.4;
      // Skip the notch area
      if (px >= 108 && px <= 124) return null;
      return (
        <rect key={`pin-${i}`} x={px} y="127" width="5" height="8" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
      );
    })}

    {/* Specification Sticker */}
    <rect x="98" y="86" width="34" height="24" rx="2" fill="#FFFFFF" />
    <line x1="102" y1="92" x2="128" y2="92" stroke="#334155" strokeWidth="2" />
    <line x1="102" y1="98" x2="124" y2="98" stroke="#334155" strokeWidth="1.5" />
    <line x1="102" y1="104" x2="120" y2="104" stroke="#0284C7" strokeWidth="1.5" />
  </svg>
);

// 13. HARD DISK / SSD: Storage drive showing spinning platter & fast SSD details
export const HardDiskIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Metal Hard Drive Enclosure */}
    <rect x="40" y="24" width="160" height="152" rx="14" fill="#334155" stroke="#1E293B" strokeWidth="5" />
    <rect x="48" y="32" width="144" height="136" rx="8" fill="#475569" />

    {/* Corner Screw Mounts */}
    <circle cx="56" cy="40" r="3.5" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />
    <circle cx="184" cy="40" r="3.5" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />
    <circle cx="56" cy="160" r="3.5" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />
    <circle cx="184" cy="160" r="3.5" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />

    {/* Circular Magnetic Platter Disc */}
    <circle cx="120" cy="98" r="50" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
    <circle cx="120" cy="98" r="36" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
    {/* Disc Spindle Hub */}
    <circle cx="120" cy="98" r="16" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
    <circle cx="120" cy="98" r="6" fill="#334155" />

    {/* Read/Write Actuator Head Arm */}
    <path d="M165 142 L130 106" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    <circle cx="165" cy="142" r="10" fill="#D97706" />
    <circle cx="165" cy="142" r="4" fill="#FFFFFF" />
    {/* Tiny Magnetic Head Tip */}
    <rect x="126" y="103" width="6" height="6" rx="1" fill="#EF4444" />

    {/* SATA Data & Power Connector Port at bottom */}
    <rect x="70" y="162" width="50" height="10" rx="2" fill="#0F172A" />
    <line x1="75" y1="167" x2="115" y2="167" stroke="#FBBF24" strokeWidth="2" />
    <rect x="130" y="162" width="30" height="10" rx="2" fill="#0F172A" />
  </svg>
);

// 14. MOTHERBOARD: Main circuit board connecting CPU socket, RAM slots, PCIe, chipset
export const MotherboardIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Motherboard Main PCB (High-End Dark Indigo/Sapphire Board) */}
    <rect x="25" y="22" width="190" height="156" rx="10" fill="#1E1B4B" stroke="#312E81" strokeWidth="4" />

    {/* Golden/Cyan Circuit Highway Traces */}
    <path d="M90 60 H115 V100 H155" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M90 75 H105 V115 H140" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M50 135 H95 V150" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />

    {/* CPU Socket in upper-left */}
    <rect x="52" y="44" width="48" height="48" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="2.5" />
    <rect x="58" y="50" width="36" height="36" rx="2" fill="#0F172A" />
    {/* Socket Pin Grid texture */}
    <circle cx="76" cy="68" r="6" fill="#F59E0B" />
    <rect x="94" y="46" width="4" height="24" rx="2" fill="#CBD5E1" />

    {/* RAM Slots (Upper right) */}
    <rect x="124" y="42" width="10" height="52" rx="2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
    <rect x="142" y="42" width="10" height="52" rx="2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
    <rect x="160" y="42" width="10" height="52" rx="2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />

    {/* PCIe Graphics Card Slot (Long expansion slot) */}
    <rect x="52" y="112" width="92" height="12" rx="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <line x1="56" y1="118" x2="138" y2="118" stroke="#1E293B" strokeWidth="2" strokeDasharray="3 2" />

    {/* Chipset Heatsink (Metallic fin radiator) */}
    <rect x="146" y="110" width="44" height="40" rx="4" fill="#475569" stroke="#64748B" strokeWidth="2" />
    <line x1="154" y1="116" x2="182" y2="116" stroke="#94A3B8" strokeWidth="2" />
    <line x1="154" y1="124" x2="182" y2="124" stroke="#94A3B8" strokeWidth="2" />
    <line x1="154" y1="132" x2="182" y2="132" stroke="#94A3B8" strokeWidth="2" />
    <line x1="154" y1="140" x2="182" y2="140" stroke="#94A3B8" strokeWidth="2" />

    {/* Capacitors (Silver canisters with colored tops) */}
    {[
      { x: 42, y: 45 },
      { x: 42, y: 62 },
      { x: 42, y: 79 },
      { x: 108, y: 138 },
      { x: 120, y: 138 }
    ].map((c, i) => (
      <circle key={i} cx={c.x} cy={c.y} r="4" fill="#E2E8F0" stroke="#3B82F6" strokeWidth="1.5" />
    ))}

    {/* CMOS Coin Battery */}
    <circle cx="110" cy="80" r="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M106 80 H114 M110 76 V84" stroke="#475569" strokeWidth="1.5" />
  </svg>
);

// 15. UPS: Uninterruptible Power Supply backup battery unit
export const UPSIllustration: React.FC<IllustrationProps> = ({ className }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Heavy Floor Stance Feet */}
    <rect x="68" y="174" width="24" height="8" rx="2" fill="#0F172A" />
    <rect x="148" y="174" width="24" height="8" rx="2" fill="#0F172A" />

    {/* Main Heavy UPS Tower Casing */}
    <rect x="60" y="26" width="120" height="150" rx="14" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />
    <rect x="68" y="34" width="104" height="134" rx="8" fill="#334155" />

    {/* Top Master Power Rocker Switch */}
    <circle cx="120" cy="58" r="14" fill="#0F172A" stroke="#475569" strokeWidth="2" />
    <circle cx="120" cy="58" r="8" fill="#10B981" />
    <line x1="120" y1="53" x2="120" y2="60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* LCD Battery & Load Status Screen */}
    <rect x="80" y="82" width="80" height="36" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    {/* Battery Icon Outline */}
    <rect x="90" y="94" width="30" height="14" rx="3" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1.5" />
    <rect x="120" y="98" width="3" height="6" rx="1" fill="#F8FAFC" />
    {/* Battery charge green blocks */}
    <rect x="93" y="97" width="6" height="8" fill="#10B981" />
    <rect x="101" y="97" width="6" height="8" fill="#10B981" />
    <rect x="109" y="97" width="6" height="8" fill="#10B981" />

    {/* Lightning Bolt Battery Symbol */}
    <path d="M136 90 L130 102 H136 L132 114 L146 100 H140 L144 90 Z" fill="#FDE047" />

    {/* Ventilation cooling slots */}
    {[128, 136, 144, 152].map((y) => (
      <line key={y} x1="84" y1={y} x2="156" y2={y} stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    ))}
  </svg>
);
