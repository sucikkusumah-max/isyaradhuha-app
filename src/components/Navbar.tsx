import React, { useState } from 'react';
import { TabType, UserProgress } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  BookOpen,
  Edit3,
  Award,
  Star,
  Compass,
  HelpCircle,
  User,
  Globe,
  Atom,
  Calculator,
  BookMarked,
  Home,
  Menu,
  X,
  Wand2,
  Sparkles,
  ChevronRight,
  PenTool,
  Dice5
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  progress: UserProgress;
  onOpenReport: () => void;
  onOpenDictionary: () => void;
  onOpenAvatarCreator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenReport,
  onOpenDictionary,
  onOpenAvatarCreator
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleSelectTabFromMobile = (tab: TabType) => {
    setActiveTab(tab);
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navSubjects: { id: TabType; label: string; shortLabel: string; icon: React.ReactNode; color: string; badge?: string }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      shortLabel: 'Beranda',
      icon: <Home className="w-3.5 h-3.5" />,
      color: 'emerald'
    },
    {
      id: 'matematika',
      label: 'Matematika Kls 2',
      shortLabel: 'MTK Kls 2',
      icon: <Calculator className="w-3.5 h-3.5" />,
      color: 'amber',
      badge: 'Baru'
    },
    {
      id: 'bahasa-indonesia',
      label: 'B. Indonesia Kls 2',
      shortLabel: 'B. Indo',
      icon: <BookMarked className="w-3.5 h-3.5" />,
      color: 'indigo',
      badge: 'Baru'
    },
    {
      id: 'bahasa-arab',
      label: 'Bahasa Arab',
      shortLabel: 'B. Arab',
      icon: <BookOpen className="w-3.5 h-3.5" />,
      color: 'emerald'
    },
    {
      id: 'imla',
      label: 'Kaidah Imla’',
      shortLabel: 'Imla’',
      icon: <Edit3 className="w-3.5 h-3.5" />,
      color: 'emerald'
    },
    {
      id: 'tajwid',
      label: 'Ilmu Tajwid',
      shortLabel: 'Tajwid',
      icon: <Compass className="w-3.5 h-3.5" />,
      color: 'teal'
    },
    {
      id: 'bahasa-inggris',
      label: 'English Dasar',
      shortLabel: 'English',
      icon: <Globe className="w-3.5 h-3.5" />,
      color: 'blue'
    },
    {
      id: 'ipa',
      label: 'IPA Dasar',
      shortLabel: 'IPA',
      icon: <Atom className="w-3.5 h-3.5" />,
      color: 'teal'
    },
    {
      id: 'kanvas',
      label: 'Kanvas Khat',
      shortLabel: 'Kanvas',
      icon: <PenTool className="w-3.5 h-3.5" />,
      color: 'emerald'
    },
    {
      id: 'ular-tangga',
      label: 'Ular Tangga',
      shortLabel: 'Ular Tangga',
      icon: <Dice5 className="w-3.5 h-3.5" />,
      color: 'emerald',
      badge: 'Game'
    },
    {
      id: 'kuis',
      label: 'Tantangan Kuis',
      shortLabel: 'Kuis',
      icon: <Award className="w-3.5 h-3.5" />,
      color: 'amber'
    }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-18">
            {/* Logo & Brand Identity */}
            <div
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="font-arabic text-xl sm:text-2xl font-bold">ب</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-black text-base sm:text-lg text-emerald-950 tracking-tight truncate">
                    Bintang Belajar
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                    SD & MI
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block truncate">
                  Arab · Imla’ · Tajwid · Matematika Kls 2 · B. Indonesia · English · IPA
                </p>
              </div>
            </div>

            {/* Desktop Navigation Segments (Hidden on Mobile) */}
            <nav className="hidden xl:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-xl border border-amber-200/60">
              <button
                onClick={() => setActiveTab('bahasa-arab')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'bahasa-arab'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>B. Arab</span>
              </button>

              <button
                onClick={() => setActiveTab('imla')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'imla'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Imla’</span>
              </button>

              <button
                onClick={() => setActiveTab('tajwid')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'tajwid'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tajwid</span>
              </button>

              <button
                onClick={() => setActiveTab('matematika')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'matematika'
                    ? 'bg-white text-amber-900 shadow-xs ring-1 ring-amber-500/20'
                    : 'text-slate-600 hover:text-amber-900 hover:bg-white/50'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-600" />
                <span>Matematika 2</span>
              </button>

              <button
                onClick={() => setActiveTab('bahasa-indonesia')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'bahasa-indonesia'
                    ? 'bg-white text-indigo-900 shadow-xs ring-1 ring-indigo-500/20'
                    : 'text-slate-600 hover:text-indigo-900 hover:bg-white/50'
                }`}
              >
                <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
                <span>B. Indonesia 2</span>
              </button>

              <button
                onClick={() => setActiveTab('bahasa-inggris')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'bahasa-inggris'
                    ? 'bg-white text-blue-800 shadow-xs ring-1 ring-blue-500/20'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-white/50'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>English</span>
              </button>

              <button
                onClick={() => setActiveTab('ipa')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'ipa'
                    ? 'bg-white text-teal-800 shadow-xs ring-1 ring-teal-500/20'
                    : 'text-slate-600 hover:text-teal-900 hover:bg-white/50'
                }`}
              >
                <Atom className="w-3.5 h-3.5 text-teal-600" />
                <span>IPA</span>
              </button>

              <button
                onClick={() => setActiveTab('kanvas')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'kanvas'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <span className="font-arabic font-bold text-emerald-700">خط</span>
                <span>Kanvas</span>
              </button>

              <button
                onClick={() => setActiveTab('ular-tangga')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'ular-tangga'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500/20'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                }`}
              >
                <Dice5 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ular Tangga</span>
              </button>

              <button
                onClick={() => setActiveTab('kuis')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'kuis'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600 hover:text-amber-900 hover:bg-white/50'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Kuis</span>
              </button>
            </nav>

            {/* Right Actions: Stars, Character Avatar, & Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Quick Dictionary Button (Desktop & Tablet) */}
              <button
                onClick={onOpenDictionary}
                title="Buku Saku & Glosarium Pintar"
                className="hidden md:flex p-2 text-slate-600 hover:text-emerald-700 hover:bg-amber-100/70 rounded-xl transition-colors border border-transparent hover:border-amber-200"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Character Studio Trigger */}
              <button
                onClick={onOpenAvatarCreator}
                title={`Karakter Teman Belajar: ${progress.character?.name || 'Santriwati'} (Klik untuk Ubah)`}
                className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 rounded-xl transition-all shadow-xs group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-white border border-rose-300 flex items-center justify-center shrink-0 shadow-2xs">
                  {progress.character ? (
                    <CharacterAvatar config={progress.character} size="sm" className="w-8 h-8 scale-110 translate-y-0.5" />
                  ) : (
                    <span className="text-xs">🧕</span>
                  )}
                </div>
                <span className="text-xs font-bold hidden sm:inline">{progress.character?.name || 'Fatimah'}</span>
              </button>

              {/* Stars Count Badge */}
              <div
                onClick={onOpenReport}
                title="Klik untuk melihat Rapor Prestasi Belajar"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-amber-100/90 border border-amber-300 rounded-xl cursor-pointer hover:bg-amber-200 transition-colors shadow-xs"
              >
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 text-amber-500 animate-pulse shrink-0" />
                <span className="font-black text-amber-950 text-xs sm:text-sm">{progress.stars}</span>
                <span className="text-[11px] text-amber-800 font-bold hidden sm:inline">⭐</span>
              </div>

              {/* Student Report Trigger (Desktop) */}
              <button
                onClick={onOpenReport}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 rounded-xl font-semibold text-xs transition-colors shadow-xs"
              >
                <User className="w-3.5 h-3.5" />
                <span>{progress.studentName || 'Rapor'}</span>
              </button>

              {/* Mobile Drawer Trigger (HP) */}
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                title="Buka Menu Pelajaran & Pengaturan"
                className="xl:hidden p-2 text-slate-700 hover:text-emerald-800 hover:bg-amber-100/70 rounded-xl border border-slate-200 transition-colors flex items-center justify-center"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Subject Swipe Strip (HP Optimized) */}
          <div className="xl:hidden border-t border-amber-100/80 py-2 -mx-3 px-3 overflow-x-auto scrollbar-none flex items-center gap-1.5 select-none touch-pan-x">
            {navSubjects.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTabFromMobile(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl shrink-0 transition-all active:scale-95 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.shortLabel}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] font-black uppercase px-1 py-0.2 bg-amber-100 text-amber-800 rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* STICKY BOTTOM NAVIGATION BAR FOR SMARTPHONES (HP) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/90 shadow-xl px-2 py-1 flex items-center justify-around safe-area-bottom">
        {/* 1. Beranda */}
        <button
          onClick={() => handleSelectTabFromMobile('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] ${
            activeTab === 'beranda' ? 'text-emerald-700 font-black' : 'text-slate-500 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'beranda' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Beranda</span>
        </button>

        {/* 2. Matematika Kelas 2 */}
        <button
          onClick={() => handleSelectTabFromMobile('matematika')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] relative ${
            activeTab === 'matematika' ? 'text-amber-700 font-black' : 'text-slate-500 font-medium'
          }`}
        >
          <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <Calculator className={`w-5 h-5 ${activeTab === 'matematika' ? 'stroke-[2.5] text-amber-600' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">MTK Kls 2</span>
        </button>

        {/* 3. B. Indonesia Kelas 2 */}
        <button
          onClick={() => handleSelectTabFromMobile('bahasa-indonesia')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] relative ${
            activeTab === 'bahasa-indonesia' ? 'text-indigo-700 font-black' : 'text-slate-500 font-medium'
          }`}
        >
          <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <BookMarked className={`w-5 h-5 ${activeTab === 'bahasa-indonesia' ? 'stroke-[2.5] text-indigo-600' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">B. Indo</span>
        </button>

        {/* 4. Bahasa Arab & Tajwid */}
        <button
          onClick={() => handleSelectTabFromMobile('bahasa-arab')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] ${
            activeTab === 'bahasa-arab' || activeTab === 'imla' || activeTab === 'tajwid'
              ? 'text-emerald-700 font-black'
              : 'text-slate-500 font-medium'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'bahasa-arab' || activeTab === 'imla' || activeTab === 'tajwid' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">B. Arab</span>
        </button>

        {/* 5. Menu Lainnya (Drawer) */}
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] ${
            isMobileDrawerOpen ? 'text-emerald-700 font-black' : 'text-slate-500 font-medium'
          }`}
        >
          <Menu className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5">Lainnya</span>
        </button>
      </nav>

      {/* MOBILE DRAWER / BOTTOM SHEET FOR SMARTPHONES (HP) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end xl:hidden">
          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setIsMobileDrawerOpen(false)} />

          {/* Drawer Card */}
          <div className="bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🌟
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Menu Pembelajaran SD & MI</h3>
                  <p className="text-[11px] text-slate-500">Pilih mata pelajaran & fitur untuk dipelajari</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Profile & Character Bar inside Drawer */}
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-3 rounded-2xl border border-rose-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-rose-300 flex items-center justify-center shrink-0">
                  {progress.character ? (
                    <CharacterAvatar config={progress.character} size="sm" />
                  ) : (
                    <span>🧕</span>
                  )}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">
                    {progress.character?.name || 'Fatimah'} ({progress.character?.companionTitle || 'Sahabat Pintar'})
                  </div>
                  <div className="text-[10px] text-amber-800 font-bold">
                    Perolehan: {progress.stars} Bintang ⭐
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  onOpenAvatarCreator();
                }}
                className="px-2.5 py-1 text-[11px] font-bold bg-white text-rose-700 border border-rose-300 rounded-xl shadow-2xs hover:bg-rose-50 transition-all"
              >
                Ganti Busana
              </button>
            </div>

            {/* Primary Subject Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Mata Pelajaran:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectTabFromMobile('matematika')}
                  className="p-3 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Calculator className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-amber-950">Matematika 2</div>
                    <div className="text-[10px] text-amber-700">Bilangan & Jam</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('bahasa-indonesia')}
                  className="p-3 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <BookMarked className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-indigo-950">B. Indonesia 2</div>
                    <div className="text-[10px] text-indigo-700">Membaca & Adab</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('bahasa-arab')}
                  className="p-3 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <BookOpen className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-emerald-950">Bahasa Arab</div>
                    <div className="text-[10px] text-emerald-700">Mufradat & Kartu</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('imla')}
                  className="p-3 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Edit3 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-emerald-950">Kaidah Imla’</div>
                    <div className="text-[10px] text-emerald-700">Ejaan & Huruf</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('tajwid')}
                  className="p-3 bg-teal-50/80 hover:bg-teal-100 border border-teal-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Compass className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-teal-950">Ilmu Tajwid</div>
                    <div className="text-[10px] text-teal-700">Hukum Tartil</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('bahasa-inggris')}
                  className="p-3 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-blue-950">English Dasar</div>
                    <div className="text-[10px] text-blue-700">Flashcards Suara</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('ipa')}
                  className="p-3 bg-teal-50/80 hover:bg-teal-100 border border-teal-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Atom className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-teal-950">IPA Dasar</div>
                    <div className="text-[10px] text-teal-700">Sains & Alam</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('kanvas')}
                  className="p-3 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <PenTool className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-emerald-950">Kanvas Khat</div>
                    <div className="text-[10px] text-emerald-700">Latihan Tulis MI</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('ular-tangga')}
                  className="p-3 bg-gradient-to-r from-emerald-100 to-amber-100 hover:from-emerald-200 hover:to-amber-200 border-2 border-emerald-300 rounded-xl text-left flex items-start gap-2.5 transition-all shadow-xs"
                >
                  <Dice5 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-emerald-950">Ular Tangga</span>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-600 text-white rounded-md">Game</span>
                    </div>
                    <div className="text-[10px] text-emerald-800 font-medium">Tanpa Dadu · Isi Angka</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTabFromMobile('kuis')}
                  className="p-3 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 rounded-xl text-left flex items-start gap-2.5 transition-all"
                >
                  <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-amber-950">Tantangan Kuis</div>
                    <div className="text-[10px] text-amber-700">Uji Nilai Rapor</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Tools & Utilities */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Fitur Penunjang Belajar:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenDictionary();
                  }}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Buku Saku Kamus</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenReport();
                  }}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left flex items-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Rapor Prestasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
