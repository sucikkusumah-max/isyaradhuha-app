import React, { useState } from 'react';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, X, Check, Volume2, Heart, Palette, Shirt, Smile, HandMetal, Sparkle } from 'lucide-react';

interface AvatarCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: CharacterConfig;
  onSaveConfig: (config: CharacterConfig) => void;
  onEarnStar: (stars: number) => void;
}

export const AvatarCreatorModal: React.FC<AvatarCreatorModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSaveConfig,
  onEarnStar
}) => {
  const [character, setCharacter] = useState<CharacterConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'face' | 'hands' | 'hijab' | 'outfit' | 'accessory'>('face');
  const [isTalking, setIsTalking] = useState(false);

  if (!isOpen) return null;

  const HIJAB_COLOR_PRESETS = [
    { label: 'Putih Bersih MI', hex: '#ffffff', border: '#cbd5e1' },
    { label: 'Hijau Madrasah', hex: '#047857', border: '#065f46' },
    { label: 'Biru Navy SD', hex: '#1e3a8a', border: '#1e40af' },
    { label: 'Merah Marun', hex: '#991b1b', border: '#7f1d1d' },
    { label: 'Pink Pastel', hex: '#f472b6', border: '#db2777' },
    { label: 'Ungu Anggun', hex: '#8b5cf6', border: '#7c3aed' },
    { label: 'Coklat Pramuka', hex: '#78350f', border: '#92400e' }
  ];

  const NAME_SUGGESTIONS = ['Aisyah', 'Fatimah', 'Maryam', 'Zahra', 'Khadijah', 'Salma', 'Nafisah'];

  const handleTestVoice = () => {
    setIsTalking(true);
    soundAudio.playSuccessChime();
    soundAudio.speakArabic(`السَّلَامُ عَلَيْكُمْ، أَنَا ${character.name}`);
    setTimeout(() => {
      soundAudio.speakEnglish(`Hello! My name is ${character.name}. Let's learn together!`);
    }, 1200);
    setTimeout(() => setIsTalking(false), 3000);
  };

  const handleSave = () => {
    onSaveConfig(character);
    soundAudio.playFanfare();
    onEarnStar(3);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl border border-slate-100 max-h-[94vh] sm:max-h-[92vh] overflow-y-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Studio Karakter Sahabat Belajar (Santriwati)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Pilih karakter muka ceria, gaya tangan imut, tanpa leher & tanpa kaki
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Left: Avatar Live Preview Display */}
          <div className="md:col-span-5 bg-gradient-to-b from-amber-50/70 via-rose-50/50 to-emerald-50/60 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-200/60 flex flex-col items-center text-center space-y-3 sm:space-y-4 shadow-inner">
            <div className="relative">
              <div className="sm:hidden">
                <CharacterAvatar
                  config={character}
                  size="xl"
                  isSpeaking={isTalking}
                />
              </div>
              <div className="hidden sm:block">
                <CharacterAvatar
                  config={character}
                  size="2xl"
                  isSpeaking={isTalking}
                />
              </div>
              <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                Santriwati
              </span>
            </div>

            {/* Character Name Banner */}
            <div>
              <div className="font-black text-lg sm:text-xl text-slate-900">{character.name}</div>
              <div className="text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-3 py-0.5 rounded-full inline-block mt-0.5">
                {character.companionTitle}
              </div>
            </div>

            {/* Voice Cheer Test Button */}
            <button
              onClick={handleTestVoice}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 shadow-xs rounded-xl text-xs font-bold flex items-center gap-2 active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Sapa & Uji Suara Teman Belajar</span>
            </button>

            <div className="text-[11px] text-slate-500 leading-snug bg-white/70 p-2.5 rounded-xl border border-slate-200/60 w-full text-center">
              💡 Desain modis santriwati: <strong>punya tangan</strong>, <strong>tanpa kaki</strong>, & <strong>tanpa leher</strong>!
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="md:col-span-7 space-y-5">
            {/* Character Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Nama Sahabat Belajarmu:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={character.name}
                  onChange={e => setCharacter({ ...character, name: e.target.value })}
                  placeholder="Ketik nama sahabat..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-emerald-600 font-bold text-slate-800"
                />
              </div>

              {/* Quick name chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {NAME_SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setCharacter({ ...character, name: s })}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                      character.name === s
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Tabs */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('face')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'face' ? 'bg-pink-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Karakter Muka 😊</span>
              </button>

              <button
                onClick={() => setActiveTab('hands')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'hands' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <HandMetal className="w-3.5 h-3.5" />
                <span>Pose Tangan ✌️</span>
              </button>

              <button
                onClick={() => setActiveTab('hijab')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'hijab' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Kerudung 🧕</span>
              </button>

              <button
                onClick={() => setActiveTab('outfit')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'outfit' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Baju Gamis</span>
              </button>

              <button
                onClick={() => setActiveTab('accessory')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'accessory' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Aksesoris</span>
              </button>
            </div>

            {/* TAB CONTENT 1: KARAKTER MUKA (Wajah Kaya Pilihan) */}
            {activeTab === 'face' && (
              <div className="space-y-4">
                {/* 1.0 Skin Tone Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    1. Warna Kulit Wajah Santriwati:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'warm_peach', label: 'Kuning Langsat', color: '#ffedd5', border: '#f97316', desc: 'Hangat & alami' },
                      { id: 'fair_pink', label: 'Putih Bersih', color: '#fee2e2', border: '#f43f5e', desc: 'Cerah merona' },
                      { id: 'honey_tan', label: 'Sawo Matang', color: '#fed7aa', border: '#ea580c', desc: 'Manis khas nusantara' }
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setCharacter({ ...character, skinTone: st.id as any })}
                        className={`p-2.5 text-left rounded-xl border transition-all flex items-center gap-2.5 ${
                          (character.skinTone || 'warm_peach') === st.id
                            ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border shadow-2xs shrink-0"
                          style={{ backgroundColor: st.color, borderColor: st.border }}
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-900">{st.label}</div>
                          <div className="text-[10px] text-slate-500">{st.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1.1 Eyes Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    2. Pilihan Bentuk & Karakter Mata:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'star_eyes', label: 'Mata Bintang ✨', icon: '🤩', desc: 'Berbinar takjub belajar' },
                      { id: 'sparkle', label: 'Mata Berbinar 🌟', icon: '✨', desc: 'Penuh semangat cerdas' },
                      { id: 'smile', label: 'Mata Senyum (^ ^)', icon: '😊', desc: 'Tenang dan ramah' },
                      { id: 'happy', label: 'Kedip Ceria ;)', icon: '😉', desc: 'Lincah dan pemberani' },
                      { id: 'gentle_round', label: 'Mata Bulat Kawaii', icon: '🥺', desc: 'Lugu dan menggemaskan' }
                    ].map(eye => (
                      <button
                        key={eye.id}
                        onClick={() => setCharacter({ ...character, eyeExpression: eye.id as any })}
                        className={`p-2.5 text-left rounded-xl border transition-all ${
                          character.eyeExpression === eye.id
                            ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{eye.icon}</span>
                          <span className="font-bold text-xs text-slate-900">{eye.label}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{eye.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1.2 Mouth Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    3. Pilihan Ekspresi Mulut & Senyuman:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'sweet_smile', label: 'Senyum Manis', icon: '😊' },
                      { id: 'laugh_happy', label: 'Senyum Lebar :D', icon: '😄' },
                      { id: 'cat_mouth', label: 'Mulut Kucing :3', icon: '🐱' },
                      { id: 'shy_smile', label: 'Senyum Tersipu', icon: '🌸' }
                    ].map(mouth => (
                      <button
                        key={mouth.id}
                        onClick={() => setCharacter({ ...character, mouthExpression: mouth.id as any })}
                        className={`p-2.5 text-center rounded-xl border transition-all ${
                          (character.mouthExpression || 'sweet_smile') === mouth.id
                            ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400/20 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-lg block mb-0.5">{mouth.icon}</span>
                        <span className="text-xs text-slate-900">{mouth.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1.3 Blush Style */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    4. Rona Pipi (*Blush-on* Imut):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'hearts', label: 'Pipi Hati Pink 💕', icon: '💕' },
                      { id: 'sparkles', label: 'Kilau Bintang ✨', icon: '✨' },
                      { id: 'rosy', label: 'Rona Merah Muda', icon: '🌸' },
                      { id: 'none', label: 'Polos Natural', icon: '⚪' }
                    ].map(blush => (
                      <button
                        key={blush.id}
                        onClick={() => setCharacter({ ...character, blushStyle: blush.id as any })}
                        className={`p-2 text-center rounded-xl border transition-all ${
                          (character.blushStyle || 'rosy') === blush.id
                            ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400/20 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs text-slate-900">{blush.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1.4 Face Mark */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    5. Tanda Manis di Wajah:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'none', label: 'Polos Bersih' },
                      { id: 'freckles', label: 'Bintik Freckles' },
                      { id: 'beauty_mark', label: 'Tahi Lalat Manis' },
                      { id: 'forehead_star', label: 'Bintang Dahi' }
                    ].map(mark => (
                      <button
                        key={mark.id}
                        onClick={() => setCharacter({ ...character, faceMark: mark.id as any })}
                        className={`p-2 text-center rounded-xl border transition-all ${
                          (character.faceMark || 'none') === mark.id
                            ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400/20 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs text-slate-900">{mark.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: POSE TANGAN (Pertahankan Tangan) */}
            {activeTab === 'hands' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Pilih Pose Tangan Karakter (Pertahankan Tangan Ceria):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'peace',
                      label: 'Pose Dua Jari / Peace ✌️',
                      desc: 'Simbol semangat belajar juara & ceria!',
                      icon: '✌️'
                    },
                    {
                      id: 'waving',
                      label: 'Melambai Tangan Sapa 👋',
                      desc: 'Menyapa ramah dengan senyuman hangat.',
                      icon: '👋'
                    },
                    {
                      id: 'holding_book',
                      label: 'Memegang Buku Belajar 📖',
                      desc: 'Santriwati teladan rajin membaca ilmu.',
                      icon: '📖'
                    },
                    {
                      id: 'polite_fold',
                      label: 'Tangan Terlipat Santun 🙏',
                      desc: 'Kedua tangan bersahaja khas anak sholihah.',
                      icon: '🙏'
                    }
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => setCharacter({ ...character, handPose: h.id as any })}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        (character.handPose || 'polite_fold') === h.id
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{h.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{h.label}</div>
                          <div className="text-[11px] text-slate-500">{h.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: HIJAB (Model & Warna - Tanpa Leher) */}
            {activeTab === 'hijab' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Model Kerudung / Hijab (Tanpa Leher):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'bergo_sekolah', label: 'Bergo Sekolah MI', desc: 'Rapi & menutup leher langsung' },
                      { id: 'kerudung_rabbani', label: 'Kerudung Rabbani', desc: 'Sporty dengan pita & pet' },
                      { id: 'pashmina_santri', label: 'Pashmina Santri', desc: 'Lilitan lembut berkarakter' },
                      { id: 'hijab_syari', label: 'Hijab Syar’i Menjulur', desc: 'Anggun & syar’i menutup dada' }
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setCharacter({ ...character, hijabStyle: st.id as any })}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          character.hijabStyle === st.id
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{st.label}</div>
                        <div className="text-[10px] text-slate-500">{st.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Pilih Warna Kerudung:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {HIJAB_COLOR_PRESETS.map(col => {
                      const isSelected = character.hijabColor.toLowerCase() === col.hex.toLowerCase();
                      return (
                        <button
                          key={col.hex}
                          onClick={() => setCharacter({ ...character, hijabColor: col.hex })}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all ${
                            isSelected
                              ? 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/50'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border shadow-2xs shrink-0"
                            style={{ backgroundColor: col.hex, borderColor: col.border }}
                          />
                          <span className="text-xs font-bold text-slate-800">{col.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: OUTFIT (Baju Gamis - Tanpa Kaki) */}
            {activeTab === 'outfit' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Pilih Baju Seragam Siswi (Badan Ramping & Tanpa Kaki):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'mi_hijau', label: 'Gamis Madrasah Ibtidaiyah', desc: 'Warna hijau lumut khas Kemenag MI' },
                    { id: 'sd_merah', label: 'Seragam Merah Putih SD', desc: 'Atasan putih bersih dengan dasi merah' },
                    { id: 'pramuka', label: 'Baju Pramuka Siaga Putri', desc: 'Coklat muda dengan hasduk merah putih' },
                    { id: 'batik', label: 'Batik Madrasah Nusantara', desc: 'Corak batik islami nusantara' },
                    { id: 'jas_lab', label: 'Jas Lab Eksperimen Sains', desc: 'Jas praktikum laboratorium IPA cilik' }
                  ].map(out => (
                    <button
                      key={out.id}
                      onClick={() => setCharacter({ ...character, outfit: out.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        character.outfit === out.id
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{out.label}</div>
                      <div className="text-[11px] text-slate-500">{out.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: ACCESSORIES */}
            {activeTab === 'accessory' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Aksesoris Cantik Santriwati:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'none', label: 'Tanpa Aksesoris', icon: '✨' },
                    { id: 'glasses', label: 'Kacamata Belajar', icon: '👓' },
                    { id: 'bow', label: 'Pita Kerudung Manis', icon: '🎀' },
                    { id: 'star_pin', label: 'Bros Bintang Emas', icon: '⭐' },
                    { id: 'pencil', label: 'Pensil Kayu Saku', icon: '✏️' }
                  ].map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => setCharacter({ ...character, accessory: acc.id as any })}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        character.accessory === acc.id
                          ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 font-bold'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl">{acc.icon}</span>
                      <span className="text-xs text-slate-900">{acc.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Simpan karaktermu untuk dapatkan <strong className="text-amber-600">+3 Bintang</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-transform active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>Pasang Karakter Sahabat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
