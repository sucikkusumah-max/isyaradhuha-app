import React, { useState } from 'react';
import { CharacterConfig, TabType } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundAudio } from '../utils/audio';
import { Volume2, Sparkles, Wand2 } from 'lucide-react';

interface CompanionWidgetProps {
  config: CharacterConfig;
  currentTab: TabType;
  onOpenCreator: () => void;
}

export const CompanionWidget: React.FC<CompanionWidgetProps> = ({
  config,
  currentTab,
  onOpenCreator
}) => {
  const [isTalking, setIsTalking] = useState(false);

  // Encouraging contextual greetings for female learning buddy
  const getContextMessage = () => {
    switch (currentTab) {
      case 'imla':
        return {
          title: 'Tips Imla’ Santriwati:',
          arabic: 'اكْتُبِي بِخَطٍّ جَمِيلٍ',
          text: `“Perhatikan huruf yang tidak bisa digandeng ke kiri ya! Goreskan pena dari kanan ke kiri dengan tenang.”`,
          voiceText: 'Ayo perhatikan huruf yang tidak bisa menyambung ya ukhti! Tulis dengan rapi dan indah.'
        };
      case 'tajwid':
        return {
          title: 'Adab Tartil Al-Qur’an:',
          arabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
          text: `“Tahan dengung 2 harakat pada huruf Ghunnah dan Ikhfa’, serta pantulkan huruf Qalqalah dengan pas ya!”`,
          voiceText: 'Tahan dengung 2 harakat pada bacaan Ghunnah ya ukhti, dan bacalah Al-Qur’an dengan tartil.'
        };
      case 'bahasa-arab':
        return {
          title: 'Kalam Arab Ceria:',
          arabic: 'تَعَلَّمِي الْعَرَبِيَّةَ بِفَرَحٍ',
          text: `“Ayo kita lafalkan kosakata ini bersama. Ucapkan dengan lantang agar lidah kita terbiasa dan fasih!”`,
          voiceText: 'Ayo kita hafalkan kosakata bahasa Arab ini bersama-sama ya!'
        };
      case 'bahasa-inggris':
        return {
          title: 'English Fun Time:',
          arabic: 'Good job, dear friend!',
          text: `“Don’t worry about making mistakes! Let’s practice English pronunciation together every day.”`,
          voiceText: 'You are doing great! Let us practice English together!'
        };
      case 'ipa':
        return {
          title: 'Laboratorium Sains Cilik:',
          arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ',
          text: `“Maa syaa Allah! Perhatikan bagaimana ulat berubah menjadi kupu-kupu yang indah. Sungguh kuasa Allah!”`,
          voiceText: 'Perhatikan tahapan sains dan metamorfosisnya ya! Alam ciptaan Allah begitu menakjubkan.'
        };
      case 'matematika':
        return {
          title: 'Matematika Ceria Kelas 2:',
          arabic: 'الْعَدَدُ وَالْحِسَابُ',
          text: `“Ayo hitung dari nilai satuan dulu ya! Ingat, perkalian adalah penjumlahan berulang yang menyenangkan!”`,
          voiceText: 'Ayo semangat berhitung matematika! Hitung dengan teliti dari angka satuan dulu ya sahabatku.'
        };
      case 'bahasa-indonesia':
        return {
          title: 'Bahasa Indonesia Santun Kelas 2:',
          arabic: 'الْقِرَاءَةُ نُورُ الْعَقْلِ',
          text: `“Selalu ingat 4 kata ajaib: Tolong, Terima Kasih, Maaf, dan Permisi. Serta gunakan huruf kapital di awal kalimat ya!”`,
          voiceText: 'Membaca adalah jendela dunia. Ayo biasakan bertutur santun dan gunakan tanda baca dengan tepat!'
        };
      case 'kuis':
        return {
          title: 'Semangat Kuis Evaluasi:',
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          text: `“Bismillah, baca setiap pertanyaan dengan teliti ya. Aku yakin kamu pasti bisa meraih nilai A Mumtaz!”`,
          voiceText: 'Bismillah! Baca soalnya dengan teliti ya ukhti. Kamu pasti bisa!'
        };
      case 'kanvas':
        return {
          title: 'Latihan Khat & Kaligrafi:',
          arabic: 'الْخَطُّ الْحَسَنُ زِينَةٌ',
          text: `“Ikuti garis panduan buku halus-kasar ya. Puncak huruf dan ekornya perhatikan batas garisnya!”`,
          voiceText: 'Ikuti garis panduan buku halus kasar ya, tulis dari kanan ke kiri!'
        };
      default:
        return {
          title: 'Sahabat Belajar Setiamu:',
          arabic: 'أَهْلًا وَسَهْلًا بِكِ',
          text: `“Assalamu’alaikum! Aku ${config.name}, siap menemanimu belajar setiap hari. Mau belajar materi apa sekarang?”`,
          voiceText: `Assalamu'alaikum! Aku ${config.name}, siap menemanimu belajar dengan semangat!`
        };
    }
  };

  const message = getContextMessage();

  const handleSpeak = () => {
    setIsTalking(true);
    soundAudio.playTing();
    if (currentTab === 'bahasa-inggris') {
      soundAudio.speakEnglish(message.voiceText);
    } else {
      soundAudio.speakArabic(message.arabic);
      setTimeout(() => {
        soundAudio.speakArabic(message.voiceText);
      }, 1000);
    }
    setTimeout(() => setIsTalking(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 via-rose-50/40 to-emerald-50/50 border border-amber-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xs flex flex-row items-center gap-3 sm:gap-5 transition-all">
      {/* Character Display */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-14 h-16 sm:w-20 sm:h-24 flex items-center justify-center">
          <div className="sm:hidden">
            <CharacterAvatar
              config={config}
              size="sm"
              isSpeaking={isTalking}
              showBadge={false}
            />
          </div>
          <div className="hidden sm:block">
            <CharacterAvatar
              config={config}
              size="md"
              isSpeaking={isTalking}
              showBadge={false}
            />
          </div>
        </div>
        <button
          onClick={onOpenCreator}
          title="Ubah busana & tampilan karakter"
          className="mt-0.5 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-white/90 hover:bg-white border border-emerald-300 px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-all"
        >
          <Wand2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
          <span>Ganti Baju</span>
        </button>
      </div>

      {/* Speech Bubble / Encouragement */}
      <div className="flex-1 min-w-0 text-left space-y-1">
        <div className="flex items-center flex-wrap gap-1 sm:gap-2">
          <span className="font-extrabold text-xs text-slate-900 truncate">
            {config.name} ({config.companionTitle})
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-1.5 sm:px-2 py-0.5 rounded-md truncate">
            {message.title}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 italic font-medium leading-relaxed line-clamp-3 sm:line-clamp-none">
          {message.text}
        </p>

        <div className="pt-0.5 flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className="font-arabic font-bold text-xs sm:text-sm text-emerald-900 bg-white/70 px-2 py-0.5 rounded-lg border border-amber-200/50 truncate max-w-[200px] sm:max-w-none">
            {message.arabic}
          </span>
          <button
            onClick={handleSpeak}
            className="p-1 px-2 text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
            title="Dengarkan suara motivasi"
          >
            <Volume2 className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>Suara</span>
          </button>
        </div>
      </div>

      {/* Quick Customize Action button on large screen */}
      <div className="shrink-0 hidden lg:block">
        <button
          onClick={onOpenCreator}
          className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Kustom Karakter</span>
        </button>
      </div>
    </div>
  );
};
