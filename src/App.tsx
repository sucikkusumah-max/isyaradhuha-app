/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabType, UserProgress, CharacterConfig } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ImlaModule } from './components/ImlaModule';
import { ImlaCanvas } from './components/ImlaCanvas';
import { TajwidModule } from './components/TajwidModule';
import { ArabicBasicModule } from './components/ArabicBasicModule';
import { EnglishModule } from './components/EnglishModule';
import { ScienceModule } from './components/ScienceModule';
import { MathGrade2Module } from './components/MathGrade2Module';
import { IndonesianGrade2Module } from './components/IndonesianGrade2Module';
import { QuizGame } from './components/QuizGame';
import { SnakesAndLaddersGame } from './components/SnakesAndLaddersGame';
import { StudentReportModal } from './components/StudentReportModal';
import { DictionaryModal } from './components/DictionaryModal';
import { AvatarCreatorModal } from './components/AvatarCreatorModal';
import { CompanionWidget } from './components/CompanionWidget';

const DEFAULT_CHARACTER: CharacterConfig = {
  name: 'Fatimah',
  hijabColor: '#ffffff',
  hijabStyle: 'bergo_sekolah',
  eyeExpression: 'star_eyes',
  mouthExpression: 'sweet_smile',
  blushStyle: 'sparkles',
  faceMark: 'none',
  skinTone: 'warm_peach',
  handPose: 'peace',
  outfit: 'mi_hijau',
  accessory: 'star_pin',
  companionTitle: 'Santriwati Teladan'
};

const DEFAULT_PROGRESS: UserProgress = {
  stars: 8,
  completedImlaLessons: [],
  completedTajwidLessons: [],
  vocabMastered: [],
  quizScores: [],
  studentName: 'Aisyah Putri',
  madrasahName: 'SD / MI Islam Terpadu',
  character: DEFAULT_CHARACTER
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [targetCanvasLetter, setTargetCanvasLetter] = useState<string>('ب');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false);

  // Load progress from localStorage with character fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('bintang_belajar_sd_progress_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.character) {
          parsed.character = DEFAULT_CHARACTER;
        } else {
          parsed.character = { ...DEFAULT_CHARACTER, ...parsed.character };
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bintang_belajar_sd_progress_v2', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const handleEarnStar = (count: number) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + count
    }));
  };

  const handleRecordScore = (score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + score,
      quizScores: [
        ...prev.quizScores,
        {
          topic: 'Kuis Terpadu SD/MI',
          score,
          total,
          date: new Date().toLocaleDateString('id-ID')
        }
      ]
    }));
  };

  const handleUpdateStudentDetails = (name: string, madrasah: string) => {
    setProgress(prev => ({
      ...prev,
      studentName: name,
      madrasahName: madrasah
    }));
  };

  const handleUpdateCharacter = (newCharacter: CharacterConfig) => {
    setProgress(prev => ({
      ...prev,
      character: newCharacter
    }));
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  const handleNavigateToCanvas = (letter?: string) => {
    if (letter) {
      setTargetCanvasLetter(letter);
    }
    setActiveTab('kanvas');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenAvatarCreator={() => setIsAvatarCreatorOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 space-y-4 sm:space-y-6">
        {/* Companion Interactive Cheerful Widget (Female Character without neck) */}
        <CompanionWidget
          config={progress.character || DEFAULT_CHARACTER}
          currentTab={activeTab}
          onOpenCreator={() => setIsAvatarCreatorOpen(true)}
        />

        {activeTab === 'beranda' && (
          <HomeHero
            setActiveTab={setActiveTab}
            progress={progress}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'bahasa-arab' && (
          <ArabicBasicModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'imla' && (
          <ImlaModule
            onEarnStar={handleEarnStar}
            onNavigateToCanvas={handleNavigateToCanvas}
          />
        )}

        {activeTab === 'tajwid' && (
          <TajwidModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'bahasa-inggris' && (
          <EnglishModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'ipa' && (
          <ScienceModule onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'matematika' && (
          <MathGrade2Module onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'bahasa-indonesia' && (
          <IndonesianGrade2Module onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'kanvas' && (
          <ImlaCanvas
            initialLetter={targetCanvasLetter}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'ular-tangga' && (
          <SnakesAndLaddersGame
            characterConfig={progress.character}
            onEarnStar={handleEarnStar}
          />
        )}

        {activeTab === 'kuis' && (
          <QuizGame
            onEarnStar={handleEarnStar}
            onRecordScore={handleRecordScore}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200/60 bg-white/80 py-6 mb-16 sm:mb-0 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-arabic text-lg font-bold text-emerald-800">ب</span>
            <span className="font-bold text-slate-700">Bintang Belajar SD & MI</span>
            <span>·</span>
            <span>Teman Belajar Santriwati: {progress.character?.name || 'Fatimah'}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsAvatarCreatorOpen(true)}
              className="text-pink-700 hover:underline font-bold"
            >
              Kustom Karakter 🧕
            </button>
            <span>·</span>
            <button
              onClick={() => setIsDictionaryOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Buku Saku
            </button>
            <span>·</span>
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Rapor Siswa
            </button>
          </div>
        </div>
      </footer>

      {/* Character Studio Modal */}
      <AvatarCreatorModal
        isOpen={isAvatarCreatorOpen}
        onClose={() => setIsAvatarCreatorOpen(false)}
        currentConfig={progress.character || DEFAULT_CHARACTER}
        onSaveConfig={handleUpdateCharacter}
        onEarnStar={handleEarnStar}
      />

      {/* Student Progress Report Modal */}
      <StudentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        progress={progress}
        onUpdateName={handleUpdateStudentDetails}
        onResetProgress={handleResetProgress}
      />

      {/* Quick Dictionary and Glossary Modal */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />
    </div>
  );
}
