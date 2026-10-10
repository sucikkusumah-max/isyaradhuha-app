import React from 'react';
import { TabType, UserProgress } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { Edit3, Compass, BookOpen, PenTool, Award, Star, ArrowRight, Sparkles, Globe, Atom, Heart, Calculator, BookMarked } from 'lucide-react';
import { soundAudio } from '../utils/audio';

interface HomeHeroProps {
  setActiveTab: (tab: TabType) => void;
  progress: UserProgress;
  onOpenReport: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ setActiveTab, progress, onOpenReport }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-950 text-white p-5 sm:p-10 shadow-lg border border-emerald-800">
        {/* Geometric & Calligraphic Watermark */}
        <div className="absolute -right-6 -bottom-10 opacity-10 pointer-events-none select-none font-arabic text-[140px] sm:text-[180px] leading-none">
          العِلْم
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-emerald-800/80 border border-emerald-700 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Portal Belajar Terpadu Siswa SD / MI</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-snug">
              Selamat Datang di <span className="text-amber-300">Bintang Belajar</span> SD & MI
            </h1>

            <p className="text-emerald-100 text-xs sm:text-base leading-relaxed">
              Ditemani sahabat belajarmu <strong>{progress.character?.name || 'Fatimah'}</strong>, mari belajar <strong>Bahasa Arab & Imla’</strong>, tartilkan <strong>Tajwid</strong>, asah <strong>Matematika Kelas 2</strong>, cakap <strong>Bahasa Indonesia Kelas 2</strong>, praktikkan <strong>Bahasa Inggris</strong>, dan temukan sains <strong>IPA</strong>!
            </p>

            {/* Subject shortcuts (Mobile-friendly 2-col or responsive flex) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-1 sm:pt-2">
              <button
                onClick={() => {
                  setActiveTab('matematika');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-xl flex items-center justify-center sm:justify-start gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">MTK Kelas 2</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bahasa-indonesia');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center sm:justify-start gap-1.5 border border-indigo-600 shadow-md active:scale-95"
              >
                <BookMarked className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300 shrink-0" />
                <span className="truncate">B. Indo Kelas 2</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('imla');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center sm:justify-start gap-1.5 border border-emerald-600 active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                <span className="truncate">Kaidah Imla’</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('tajwid');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center sm:justify-start gap-1.5 border border-emerald-600 active:scale-95"
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                <span className="truncate">Ilmu Tajwid</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bahasa-inggris');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center sm:justify-start gap-1.5 border border-blue-600 active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 shrink-0" />
                <span className="truncate">B. Inggris</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('ipa');
                  soundAudio.playTing();
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center sm:justify-start gap-1.5 border border-teal-600 active:scale-95"
              >
                <Atom className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300 shrink-0" />
                <span className="truncate">IPA Dasar</span>
              </button>
            </div>
          </div>

          {/* Female Character Spotlight Card */}
          {progress.character && (
            <div className="shrink-0 w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-row sm:flex-col items-center justify-center text-center gap-3 sm:gap-2 shadow-xl hover:scale-105 transition-transform">
              <div className="w-16 h-18 sm:w-auto sm:h-auto shrink-0 flex items-center justify-center">
                <CharacterAvatar config={progress.character} size="md" className="sm:hidden" />
                <CharacterAvatar config={progress.character} size="xl" className="hidden sm:block" />
              </div>
              <div className="text-left sm:text-center space-y-1">
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>{progress.character.name}</span>
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                </div>
                <span className="text-[10px] text-amber-300 font-bold bg-black/20 px-2.5 py-0.5 rounded-full inline-block">
                  {progress.character.companionTitle}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5 Core Pillars Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Modul Pelajaran SD & MI
          </h2>
          <span className="text-xs text-slate-500 font-semibold">Kurikulum Tematik & Standar Madrasah</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Pillar: Matematika Kelas 2 */}
          <div
            onClick={() => setActiveTab('matematika')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-amber-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Hitung Ceria SD/MI
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  Matematika Kelas 2
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nilai tempat hingga 1.000, penjumlahan & pengurangan bersusun, konsep perkalian bergambar, bangun geometri, dan jam analog.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Matematika</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar: Bahasa Indonesia Kelas 2 */}
          <div
            onClick={() => setActiveTab('bahasa-indonesia')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                  Cakap & Santun
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">
                  Bahasa Indonesia Kls 2
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Membaca cerita bergambar 5W1H, kaidah huruf kapital & tanda baca, 4 kata ajaib adab santun, lawan kata, dan merangkai kalimat padu.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
              <span>Buka B. Indonesia</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 1: Kaidah Imla' */}
          <div
            onClick={() => setActiveTab('imla')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Edit3 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Ejaan Arab MI
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Kaidah Imla’ & Khat
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menyambung huruf, 6 huruf pemutus (أ د ذ ر ز و), Ta Marbuthah vs Maftuhah, Tanwin vs Nun, serta dikte masmu’.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Materi Imla’</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 2: Ilmu Tajwid */}
          <div
            onClick={() => setActiveTab('tajwid')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  Tartil Al-Qur’an
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  Hukum Tajwid & Lab Ayat
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nun Sukun, Mim Sukun, Alif Lam, Qalqalah, Mad dengan penanda warna interaktif juz ’amma (color-coded).
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Hukum Tajwid</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 3: Bahasa Inggris Dasar */}
          <div
            onClick={() => setActiveTab('bahasa-inggris')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  English for Kids
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                  Bahasa Inggris Dasar
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kosakata sekolah, hewan, aktivitas, buah, kartu audio pengucapan asli, spelling bee, dan susun kalimat.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Bahasa Inggris</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 4: IPA Dasar SD/MI */}
          <div
            onClick={() => setActiveTab('ipa')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Atom className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                  Sains & Alam Sekitar
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                  IPA Dasar SD / MI
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Daur hidup metamorfosis, rantai makanan ekosistem sawah, perubahan wujud benda, siklus air, dan tata surya.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-cyan-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Laboratorium IPA</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 5: Bahasa Arab Mufradat */}
          <div
            onClick={() => setActiveTab('bahasa-arab')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-amber-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Mufradat Tematik
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  Bahasa Arab Dasar
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Di kelas, anggota tubuh, angka 1-20 Arab, warna-warna, keluarga tercinta, serta percakapan sapaan ta'aruf.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Kosakata Arab</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pillar 6: Kanvas Tulis Khat */}
          <div
            onClick={() => setActiveTab('kanvas')}
            className="group cursor-pointer bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Praktik Menulis
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Kanvas Tulis Hijaiyah
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Simulasi buku bergaris tiga / halus-kasar dengan pola panduan tracing untuk melatih keluwesan jari santri.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Buka Kanvas Tulis</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Banner */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Uji Evaluasi Terpadu (Arab · Inggris · Imla · Tajwid · MTK · Indo · IPA)</h4>
            <p className="text-xs text-slate-600">
              Kerjakan kuis seru interaktif untuk mengumpulkan bintang dan meningkatkan rapor nilai prestasi belajarmu!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('kuis')}
          className="w-full sm:w-auto justify-center px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs transition-colors flex items-center gap-2 active:scale-95"
        >
          <span>Mulai Kuis Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
