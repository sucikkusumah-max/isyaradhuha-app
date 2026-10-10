import React from 'react';
import { CharacterConfig } from '../types';

interface CharacterAvatarProps {
  config: CharacterConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isSpeaking?: boolean;
  className?: string;
  showBadge?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  config,
  size = 'lg',
  isSpeaking = false,
  className = '',
  showBadge = false
}) => {
  // Generate unique prefix for SVG IDs to prevent cross-SVG conflicts in DOM
  const rawId = React.useId();
  const uid = 'ch_' + rawId.replace(/[^a-zA-Z0-9]/g, '');

  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44',
    '2xl': 'w-56 h-56'
  };

  const hijabColor = config.hijabColor || '#ffffff';
  const hijabStyle = config.hijabStyle || 'bergo_sekolah';
  const mouthStyle = config.mouthExpression || 'sweet_smile';
  const blushStyle = config.blushStyle || 'rosy';
  const handPose = config.handPose || 'peace';
  const faceMark = config.faceMark || 'none';
  const eyeStyle = config.eyeExpression || 'star_eyes';
  const skinTone = config.skinTone || 'warm_peach';

  // Preset outfit palettes for cute petite schoolgirl
  const getOutfitColors = () => {
    switch (config.outfit) {
      case 'mi_hijau':
        return {
          primary: '#059669', // Emerald green
          secondary: '#ffffff',
          trim: '#047857',
          collar: '#ffffff',
          accent: '#fbbf24',
          label: 'MI Hijau'
        };
      case 'sd_merah':
        return {
          primary: '#ffffff', // White shirt
          secondary: '#dc2626', // Red SD
          trim: '#b91c1c',
          collar: '#dc2626',
          accent: '#dc2626',
          label: 'SD Merah'
        };
      case 'pramuka':
        return {
          primary: '#b45309', // Pramuka brown
          secondary: '#78350f',
          trim: '#92400e',
          collar: '#dc2626',
          accent: '#f59e0b',
          label: 'Pramuka'
        };
      case 'batik':
        return {
          primary: '#047857', // Batik emerald
          secondary: '#f59e0b',
          trim: '#065f46',
          collar: '#ffffff',
          accent: '#f59e0b',
          label: 'Batik'
        };
      case 'jas_lab':
        return {
          primary: '#f8fafc', // Lab coat white
          secondary: '#0284c7',
          trim: '#38bdf8',
          collar: '#0284c7',
          accent: '#0ea5e9',
          label: 'Jas Lab'
        };
      default:
        return {
          primary: '#059669',
          secondary: '#ffffff',
          trim: '#047857',
          collar: '#ffffff',
          accent: '#fbbf24',
          label: 'MI Hijau'
        };
    }
  };

  const outfit = getOutfitColors();

  // Skin tone color schemes - vibrant, warm & ALWAYS distinct from white
  const getSkinPalette = () => {
    switch (skinTone) {
      case 'fair_pink':
        return {
          base: '#fee2e2',
          gradientStart: '#fff1f2',
          gradientEnd: '#fecdd3',
          outline: '#f43f5e',
          outlineOpacity: 0.35,
          nose: '#fb7185'
        };
      case 'honey_tan':
        return {
          base: '#fed7aa',
          gradientStart: '#fed7aa',
          gradientEnd: '#fba85f',
          outline: '#ea580c',
          outlineOpacity: 0.4,
          nose: '#ea580c'
        };
      case 'warm_peach':
      default:
        return {
          base: '#ffedd5',
          gradientStart: '#fff7ed',
          gradientEnd: '#fed7aa',
          outline: '#f97316',
          outlineOpacity: 0.35,
          nose: '#fb923c'
        };
    }
  };

  const skin = getSkinPalette();

  // Subtle border color for white or light hijabs
  const hijabBorderColor =
    hijabColor.toLowerCase() === '#ffffff' || hijabColor.toLowerCase() === '#fff'
      ? '#94a3b8'
      : '#475569';

  return (
    <div className={`relative inline-block select-none ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-md transition-all duration-300 ${
          isSpeaking ? 'scale-105 animate-bounce' : 'hover:scale-103'
        }`}
      >
        <defs>
          {/* Unique per-instance gradients with solid fallbacks */}
          <linearGradient id={`${uid}-skinGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin.gradientStart} />
            <stop offset="100%" stopColor={skin.gradientEnd} />
          </linearGradient>

          <radialGradient id={`${uid}-blush`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-eyeIris`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#090d16" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <radialGradient id={`${uid}-pedestal`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-hijabShade`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hijabColor} />
            <stop offset="100%" stopColor={hijabColor} stopOpacity="0.88" />
          </linearGradient>
        </defs>

        {/* 1. FLOATING PEDESTAL SHADOW (TANPA KAKI / NO FEET) */}
        <ellipse cx="100" cy="195" rx="34" ry="4" fill={`url(#${uid}-pedestal)`} />

        {/* 2. PETITE SLENDER DRESS (TANPA KAKI - SMOOTH HEM) */}
        <g id="petite-dress">
          <path
            d="M 76 116 C 74 116 68 140 66 182 C 66 188 78 192 100 192 C 122 192 134 188 134 182 C 132 140 126 116 124 116 Z"
            fill={outfit.primary}
            stroke={outfit.trim}
            strokeWidth="2"
          />

          {/* Outfit-specific details */}
          {config.outfit === 'mi_hijau' && (
            <g id="mi-details">
              <path d="M 94 118 L 100 135 L 106 118 Z" fill="#ffffff" />
              <circle cx="100" cy="144" r="2" fill="#fbbf24" />
              <circle cx="100" cy="156" r="2" fill="#fbbf24" />
              <circle cx="100" cy="168" r="2" fill="#fbbf24" />
            </g>
          )}

          {config.outfit === 'sd_merah' && (
            <g id="sd-details">
              <path d="M 96 118 L 104 118 L 102 148 L 100 153 L 98 148 Z" fill="#dc2626" />
              <path d="M 68 178 Q 100 186 132 178 L 134 188 Q 100 194 66 188 Z" fill="#dc2626" />
            </g>
          )}

          {config.outfit === 'pramuka' && (
            <g id="pramuka-details">
              <path d="M 88 118 L 100 138 L 112 118 Z" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
              <circle cx="100" cy="138" r="3" fill="#b45309" />
            </g>
          )}

          {config.outfit === 'batik' && (
            <g id="batik-details" opacity="0.8">
              <circle cx="88" cy="148" r="2.5" fill="#fbbf24" />
              <circle cx="112" cy="148" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="165" r="2.5" fill="#fbbf24" />
            </g>
          )}

          {config.outfit === 'jas_lab' && (
            <g id="lab-details">
              <rect x="114" y="142" width="12" height="15" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="118" y="137" width="2" height="6" rx="0.5" fill="#0284c7" />
            </g>
          )}
        </g>

        {/* 3. HIJAB BACK HOOD (Outer frame behind head) */}
        <g id="hijab-hood-back">
          <ellipse
            cx="100"
            cy="68"
            rx="46"
            ry="45"
            fill={hijabColor}
            stroke={hijabBorderColor}
            strokeWidth="2"
            strokeOpacity="0.35"
          />
        </g>

        {/* 4. HIJAB CHEST DRAPE (TANPA LEHER - COVERS NECK DIRECTLY FROM CHIN TO CHEST) */}
        <g id="hijab-chest-drape">
          {hijabStyle === 'hijab_syari' ? (
            /* Syar'i: Wide graceful drape */
            <path
              d="M 68 90 Q 58 108 58 128 Q 78 138 100 139 Q 122 138 142 128 Q 142 108 132 90 Q 100 96 68 90 Z"
              fill={hijabColor}
              stroke={hijabBorderColor}
              strokeWidth="2"
              strokeOpacity="0.4"
            />
          ) : hijabStyle === 'kerudung_rabbani' ? (
            /* Rabbani: Sporty drape with ribbon */
            <g>
              <path
                d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
                fill={hijabColor}
                stroke={hijabBorderColor}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <circle cx="130" cy="115" r="3.5" fill="#f43f5e" />
              <circle cx="130" cy="115" r="1.5" fill="#ffffff" />
            </g>
          ) : hijabStyle === 'pashmina_santri' ? (
            /* Pashmina: Soft cross drape */
            <g>
              <path
                d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
                fill={hijabColor}
                stroke={hijabBorderColor}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <path d="M 90 95 Q 100 110 116 124" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
            </g>
          ) : (
            /* Bergo Sekolah: Clean direct bergo */
            <path
              d="M 72 90 Q 64 106 64 124 Q 82 131 100 132 Q 118 131 136 124 Q 136 106 128 90 Q 100 96 72 90 Z"
              fill={hijabColor}
              stroke={hijabBorderColor}
              strokeWidth="2"
              strokeOpacity="0.4"
            />
          )}
        </g>

        {/* 5. CUTE FACE BASE (WARM, DISTINCT, WITH CLEAR OUTLINE - ALWAYS VISIBLE!) */}
        <g id="face-base">
          {/* Inner Hijab Ciput (Under-cap band) */}
          <path
            d="M 68 62 C 72 44 128 44 132 62 C 122 55 78 55 68 62 Z"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1"
          />

          {/* Face Oval - Filled with warm solid color AND gradient fallback */}
          <ellipse
            cx="100"
            cy="72"
            rx="32"
            ry="29"
            fill={skin.base}
            style={{ fill: `url(#${uid}-skinGrad)` }}
            stroke={skin.outline}
            strokeWidth="1.5"
            strokeOpacity={skin.outlineOpacity}
          />

          {/* Hijab Face Framing / Pet (Frames cheeks & chin, closing the hijab around the face) */}
          <path
            d="M 68 62 C 67 76 72 92 84 94 C 94 95 106 95 116 94 C 128 92 133 76 132 62 C 128 50 72 50 68 62 Z"
            fill="none"
            stroke={hijabBorderColor}
            strokeWidth="2"
            strokeOpacity="0.4"
          />

          {/* Forehead Pet Rim of Hijab */}
          <path
            d="M 70 56 Q 100 46 130 56"
            stroke={hijabColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 70 56 Q 100 46 130 56"
            stroke={hijabBorderColor}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 6. FACIAL FEATURES (MUKA SANGAT MUNCUL, JELAS, EKSPRESIF & IMUT) */}
        <g id="facial-features">
          {/* A. BLUSH ON CHEEKS (Pipi Merona) */}
          {blushStyle === 'hearts' && (
            <g id="blush-hearts">
              {/* Left pink heart blush */}
              <path d="M 76 79 Q 73 75 70 78 Q 68 81 76 85 Q 84 81 82 78 Q 79 75 76 79 Z" fill="#fb7185" />
              {/* Right pink heart blush */}
              <path d="M 124 79 Q 121 75 118 78 Q 116 81 124 85 Q 132 81 130 78 Q 127 75 124 79 Z" fill="#fb7185" />
            </g>
          )}

          {blushStyle === 'sparkles' && (
            <g id="blush-sparkles">
              <circle cx="77" cy="79" r="6" fill="#fb7185" opacity="0.65" />
              <circle cx="123" cy="79" r="6" fill="#fb7185" opacity="0.65" />
              {/* 4-point twinkle stars */}
              <path d="M 77 75 L 77 83 M 73 79 L 81 79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 123 75 L 123 83 M 119 79 L 127 79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {blushStyle === 'rosy' && (
            <g id="blush-rosy">
              <circle cx="77" cy="79" r="6.5" fill="#fb7185" opacity="0.65" />
              <circle cx="123" cy="79" r="6.5" fill="#fb7185" opacity="0.65" />
              <circle cx="75.5" cy="77.5" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="121.5" cy="77.5" r="1.5" fill="#ffffff" opacity="0.9" />
            </g>
          )}

          {blushStyle === 'none' && (
            <g id="blush-subtle">
              <circle cx="77" cy="80" r="4.5" fill="#fb923c" opacity="0.25" />
              <circle cx="123" cy="80" r="4.5" fill="#fb923c" opacity="0.25" />
            </g>
          )}

          {/* B. FACE MARKS */}
          {faceMark === 'freckles' && (
            <g id="face-freckles" opacity="0.75">
              <circle cx="74" cy="78" r="0.9" fill="#d97706" />
              <circle cx="77" cy="80" r="0.9" fill="#d97706" />
              <circle cx="80" cy="78" r="0.9" fill="#d97706" />
              <circle cx="120" cy="78" r="0.9" fill="#d97706" />
              <circle cx="123" cy="80" r="0.9" fill="#d97706" />
              <circle cx="126" cy="78" r="0.9" fill="#d97706" />
            </g>
          )}

          {faceMark === 'beauty_mark' && (
            <circle cx="108" cy="83" r="1.2" fill="#334155" />
          )}

          {faceMark === 'forehead_star' && (
            <g id="forehead-star" transform="translate(100, 55)">
              <polygon points="0,-3.5 1.2,-1 3.5,-1 1.8,0.8 2.5,3.2 0,1.8 -2.5,3.2 -1.8,0.8 -3.5,-1 -1.2,-1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            </g>
          )}

          {/* C. EYEBROWS (Alis Lembut & Berkarakter) */}
          <path
            d="M 74 59 Q 82 55 90 58"
            stroke="#334155"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 110 58 Q 118 55 126 59"
            stroke="#334155"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* D. EYES (MATA ANIME BESAR, BOLD, CRISTAL CLEAR & CANTIK) */}
          {eyeStyle === 'smile' ? (
            /* Cheerful Happy Crescent Eyes (^ ^) */
            <g id="eyes-smile">
              <path
                d="M 74 70 Q 83 61 92 70"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 108 70 Q 117 61 126 70"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute Eyelashes */}
              <path d="M 92 68 L 95 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              <path d="M 108 68 L 105 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'happy' ? (
            /* Winking Cheerful Eye ;) */
            <g id="eyes-happy">
              {/* Left Eye: Open & Sparkling */}
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="81.2" cy="66.5" rx="3.2" ry="3.6" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="1.8" fill="#38bdf8" />
              <circle cx="81.5" cy="73" r="1.1" fill="#ffffff" />
              {/* Top Lash */}
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />

              {/* Right Eye: Cute Wink Crescent */}
              <path
                d="M 109 70 Q 117 61 125 70"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 109 68 L 106 65" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'star_eyes' ? (
            /* Starry Shining Anime Eyes (🤩 🌟) */
            <g id="eyes-starry">
              {/* Left Eye */}
              <ellipse cx="83" cy="69" rx="7.5" ry="9" fill="#0f172a" />
              {/* Golden Star Pupil */}
              <polygon points="83,63 84.8,67 89,69 84.8,71 83,75 81.2,71 77,69 81.2,67" fill="#fbbf24" />
              {/* Glossy White Reflection */}
              <circle cx="80.5" cy="65.5" r="2.2" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="1" fill="#ffffff" />
              {/* Eyelashes */}
              <path d="M 75 66 Q 83 61 91 66" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="117" cy="69" rx="7.5" ry="9" fill="#0f172a" />
              {/* Golden Star Pupil */}
              <polygon points="117,63 118.8,67 123,69 118.8,71 117,75 115.2,71 111,69 115.2,67" fill="#fbbf24" />
              {/* Glossy White Reflection */}
              <circle cx="114.5" cy="65.5" r="2.2" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="1" fill="#ffffff" />
              {/* Eyelashes */}
              <path d="M 109 66 Q 117 61 125 66" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 109 65 L 106 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : eyeStyle === 'gentle_round' ? (
            /* Kawaii Round Eyes (🥺) */
            <g id="eyes-round">
              {/* Left Eye */}
              <circle cx="83" cy="69" r="8" fill="#0f172a" />
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <ellipse cx="81.5" cy="66.5" rx="3.5" ry="3.5" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="2.2" fill="#38bdf8" />
              <circle cx="81" cy="73.5" r="1.3" fill="#ffffff" />

              {/* Right Eye */}
              <circle cx="117" cy="69" r="8" fill="#0f172a" />
              <path d="M 109 66 Q 117 62 125 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <ellipse cx="115.5" cy="66.5" rx="3.5" ry="3.5" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="2.2" fill="#38bdf8" />
              <circle cx="115" cy="73.5" r="1.3" fill="#ffffff" />
            </g>
          ) : (
            /* Classic Anime Sparkle Eyes (✨) */
            <g id="eyes-sparkle">
              {/* Left Eye */}
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="83" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="81.2" cy="66.5" rx="3.2" ry="3.8" fill="#ffffff" />
              <circle cx="85.5" cy="72" r="2" fill="#38bdf8" />
              <circle cx="80.5" cy="73.5" r="1.2" fill="#ffffff" />
              <path d="M 75 66 Q 83 62 91 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 91 65 L 94 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="117" cy="69" rx="7.2" ry="8.8" fill={`url(#${uid}-eyeIris)`} />
              <ellipse cx="117" cy="69" rx="7.2" ry="8.8" stroke="#0f172a" strokeWidth="1.5" />
              <ellipse cx="115.2" cy="66.5" rx="3.2" ry="3.8" fill="#ffffff" />
              <circle cx="119.5" cy="72" r="2" fill="#38bdf8" />
              <circle cx="114.5" cy="73.5" r="1.2" fill="#ffffff" />
              <path d="M 109 66 Q 117 62 125 66" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M 109 65 L 106 62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* E. CUTE BUTTON NOSE */}
          <circle cx="100" cy="76" r="1.5" fill={skin.nose} opacity="0.8" />

          {/* F. MOUTH & EMOTIONS (Mulut & Senyuman Sangat Ceria & Jelas) */}
          {isSpeaking ? (
            /* Open cute joyful talking mouth */
            <g id="mouth-speaking">
              <ellipse cx="100" cy="84" rx="5.5" ry="5" fill="#e11d48" stroke="#be123c" strokeWidth="1.2" />
              <path d="M 96 84 Q 100 87 104 84" fill="#fda4af" />
            </g>
          ) : mouthStyle === 'cat_mouth' ? (
            /* Cute cat mouth :3 */
            <path
              d="M 93 81.5 Q 96.5 85 100 82.5 Q 103.5 85 107 81.5"
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mouthStyle === 'laugh_happy' ? (
            /* Joyful laughing open smile :D */
            <g id="mouth-laugh">
              <path
                d="M 93 80.5 Q 100 91 107 80.5 Z"
                fill="#e11d48"
                stroke="#be123c"
                strokeWidth="1.5"
              />
              {/* White teeth line */}
              <path d="M 94.5 82 Q 100 84 105.5 82" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              {/* Pink tongue */}
              <circle cx="100" cy="88" r="3.2" fill="#fda4af" />
            </g>
          ) : mouthStyle === 'shy_smile' ? (
            /* Modest gentle shy smile */
            <g id="mouth-shy">
              <path
                d="M 95 83 Q 100 87 105 83"
                stroke="#e11d48"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            /* Sweet open curve smile */
            <g id="mouth-sweet">
              <path
                d="M 93 81.5 Q 100 88 107 81.5"
                stroke="#e11d48"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 95 82.5 Q 100 87 105 82.5"
                fill="#fda4af"
                opacity="0.6"
              />
            </g>
          )}
        </g>

        {/* 7. ARMS & HANDS (PERTAHANKAN TANGAN - EXPRESSIVE POSES) */}
        <g id="expressive-hands">
          {handPose === 'peace' ? (
            /* Left hand peace sign ✌️, right hand polite */
            <g id="hand-peace">
              <path d="M 76 118 Q 58 130 52 145" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="50" cy="142" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              <path d="M 48 139 L 45 129" stroke={skin.base} strokeWidth="3" strokeLinecap="round" />
              <path d="M 52 139 L 55 129" stroke={skin.base} strokeWidth="3" strokeLinecap="round" />

              <path d="M 124 118 Q 135 135 128 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="127" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
            </g>
          ) : handPose === 'waving' ? (
            /* Right hand waving hello 👋, left hand resting */
            <g id="hand-waving">
              <path d="M 76 118 Q 65 135 72 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="73" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />

              <path d="M 124 118 Q 142 125 148 140" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="150" cy="138" r="5.5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              {/* Wave motion breeze lines */}
              <path d="M 158 134 Q 161 138 158 142" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          ) : handPose === 'holding_book' ? (
            /* Both hands holding mini book 📖 */
            <g id="hand-book">
              <path d="M 76 118 Q 70 142 88 155" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 124 118 Q 130 142 112 155" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />

              <rect x="88" y="146" width="24" height="18" rx="2" fill="#047857" stroke="#fbbf24" strokeWidth="1" />
              <rect x="91" y="148" width="8" height="14" fill="#ffffff" opacity="0.95" />
              <rect x="101" y="148" width="8" height="14" fill="#ffffff" opacity="0.95" />
              <path d="M 100 146 L 100 164" stroke="#fbbf24" strokeWidth="1" />

              <circle cx="88" cy="155" r="4" fill={skin.base} />
              <circle cx="112" cy="155" r="4" fill={skin.base} />
            </g>
          ) : (
            /* Polite Folded Hands (Santun 🙏) */
            <g id="hand-polite">
              <path d="M 76 118 Q 63 135 60 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <path d="M 124 118 Q 137 135 140 162" stroke={outfit.primary} strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="65" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
              <circle cx="135" cy="164" r="5" fill={skin.base} stroke={skin.outline} strokeWidth="1" strokeOpacity={0.3} />
            </g>
          )}
        </g>

        {/* 8. ACCESSORIES */}
        <g id="cute-accessories">
          {config.accessory === 'glasses' && (
            <g id="cute-glasses">
              <circle cx="83" cy="69" r="10.5" fill="none" stroke="#e11d48" strokeWidth="2.4" />
              <circle cx="117" cy="69" r="10.5" fill="none" stroke="#e11d48" strokeWidth="2.4" />
              <path d="M 93.5 69 Q 100 67 106.5 69" stroke="#e11d48" strokeWidth="2.4" fill="none" />
              {/* Glass Lens Glare */}
              <path d="M 78 65 L 81 63" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 112 65 L 115 63" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          )}

          {config.accessory === 'bow' && (
            <g id="cute-bow" transform="translate(128, 54)">
              <circle cx="0" cy="0" r="3.2" fill="#f43f5e" />
              <path d="M 0 0 L -7 -5 L -7 5 Z" fill="#fb7185" stroke="#f43f5e" strokeWidth="0.8" />
              <path d="M 0 0 L 7 -5 L 7 5 Z" fill="#fb7185" stroke="#f43f5e" strokeWidth="0.8" />
            </g>
          )}

          {config.accessory === 'star_pin' && (
            <g id="cute-star-pin" transform="translate(76, 114)">
              <polygon
                points="0,-6 1.8,-1.8 6,-1.8 2.5,1.5 3.8,6 0,3 -3.8,6 -2.5,1.5 -6,-1.8 -1.8,-1.8"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="1"
              />
            </g>
          )}

          {config.accessory === 'pencil' && (
            <g id="cute-pencil" transform="translate(138, 132) rotate(-12)">
              <rect x="0" y="0" width="4" height="18" rx="0.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.7" />
              <polygon points="0,0 2,-4 4,0" fill="#fde68a" />
              <polygon points="0.8,-1.5 2,-4 3.2,-1.5" fill="#0f172a" />
            </g>
          )}
        </g>
      </svg>

      {/* Optional Name Badge */}
      {showBadge && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-800 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap border border-emerald-600">
          {config.name || 'Santriwati'}
        </div>
      )}
    </div>
  );
};
