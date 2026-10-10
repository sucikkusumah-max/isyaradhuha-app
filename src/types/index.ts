export type TabType = 
  | 'beranda' 
  | 'bahasa-arab' 
  | 'imla' 
  | 'tajwid' 
  | 'kanvas' 
  | 'bahasa-inggris' 
  | 'ipa' 
  | 'matematika'
  | 'bahasa-indonesia'
  | 'ular-tangga'
  | 'kuis';

export interface EnglishVocabItem {
  id: string;
  category: string;
  english: string;
  pronunciationHint: string;
  indonesian: string;
  exampleSentence: string;
  exampleTranslation: string;
  emoji: string;
}

export interface SentenceBuilderChallenge {
  id: string;
  indonesianMeaning: string;
  words: string[];
  correctOrder: string[];
}

export interface ScienceTopic {
  id: string;
  title: string;
  gradeLevel: string; // "Kelas 3-4 SD/MI", "Kelas 5-6 SD/MI"
  category: 'biologi' | 'fisika_alam' | 'bumi_antariksa' | 'tubuh';
  summary: string;
  icon: string;
  keyConcepts: string[];
  experimentOrVisual: string;
}

export interface VocabularyItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: string;
  iconName?: string;
  exampleSentence?: {
    arabic: string;
    translation: string;
  };
}

export interface ImlaLesson {
  id: string;
  title: string;
  subtitle: string;
  gradeLevel: string; // e.g., "Kelas 1-2 MI", "Kelas 3-4 MI", "Kelas 5-6 MI"
  summary: string;
  ruleFormula: string;
  explanation: string[];
  tips: string;
  examples: {
    correct: string;
    incorrect?: string;
    meaning: string;
    note: string;
  }[];
  practiceQuestions: {
    question: string;
    audioText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface TajwidRule {
  id: string;
  category: 'nun_sukun' | 'mim_sukun' | 'alif_lam' | 'qalqalah' | 'mad';
  name: string;
  arabicName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  letters: string[];
  lettersArabic: string;
  harakatCount?: string;
  definition: string;
  howToRead: string;
  examples: {
    phrase: string;
    surahRef: string;
    highlightWord: string;
    explanation: string;
  }[];
}

export interface QuranSurahStudy {
  id: string;
  name: string;
  arabicName: string;
  meaning: string;
  ayahs: {
    number: number;
    arabicText: string;
    translation: string;
    tajwidSpots: {
      startIndex: number;
      endIndex: number;
      targetText: string;
      ruleId: string;
      ruleName: string;
      explanation: string;
      color: string;
    }[];
  }[];
}

export interface CharacterConfig {
  name: string;
  hijabColor: string; // e.g. '#ffffff', '#059669', '#1d4ed8', '#be123c', '#ec4899', '#7c3aed'
  hijabStyle: 'bergo_sekolah' | 'pashmina_santri' | 'kerudung_rabbani' | 'hijab_syari';
  eyeExpression: 'sparkle' | 'smile' | 'happy' | 'star_eyes' | 'gentle_round';
  mouthExpression?: 'sweet_smile' | 'laugh_happy' | 'cat_mouth' | 'shy_smile';
  blushStyle?: 'rosy' | 'sparkles' | 'hearts' | 'none';
  faceMark?: 'none' | 'freckles' | 'beauty_mark' | 'forehead_star';
  skinTone?: 'warm_peach' | 'fair_pink' | 'honey_tan';
  handPose?: 'holding_book' | 'peace' | 'waving' | 'polite_fold';
  outfit: 'mi_hijau' | 'sd_merah' | 'pramuka' | 'batik' | 'jas_lab';
  accessory: 'none' | 'glasses' | 'bow' | 'star_pin' | 'pencil';
  companionTitle: string;
}

export interface UserProgress {
  stars: number;
  completedImlaLessons: string[];
  completedTajwidLessons: string[];
  vocabMastered: string[];
  quizScores: {
    topic: string;
    score: number;
    total: number;
    date: string;
  }[];
  studentName: string;
  madrasahName: string;
  character: CharacterConfig;
}
