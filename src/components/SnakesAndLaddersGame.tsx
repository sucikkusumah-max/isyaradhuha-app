import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundAudio } from '../utils/audio';
import { CharacterConfig } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users,
  User,
  Calculator,
  ChevronRight,
  Play,
  Volume2,
  Info,
  CheckCircle2,
  Dice5
} from 'lucide-react';

interface SnakesAndLaddersGameProps {
  characterConfig?: CharacterConfig;
  onEarnStar: (count: number) => void;
}

interface Ladder {
  start: number;
  end: number;
  title: string;
  moral: string;
}

interface Snake {
  start: number;
  end: number;
  title: string;
  moral: string;
}

// Tangga (Naik ke atas - Perbuatan Terpuji)
const LADDERS: Ladder[] = [
  { start: 4, end: 14, title: 'Rajin Shalat & Mengaji', moral: 'Shalat tepat waktu membawa berkah dan kemudahan!' },
  { start: 9, end: 31, title: 'Berbakti Kepada Orang Tua', moral: 'Ridho Allah ada pada ridho kedua orang tua.' },
  { start: 20, end: 38, title: 'Gemar Membaca Buku', moral: 'Buku adalah jendela ilmu pengetahuan dunia.' },
  { start: 28, end: 84, title: 'Prestasi Juara Madrasah & SD', moral: 'Kerja keras dan doa mengantarkanmu ke puncak prestasi!' },
  { start: 40, end: 59, title: 'Suka Membantu Sahabat', moral: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi sesama.' },
  { start: 51, end: 67, title: 'Menjaga Kebersihan', moral: 'Kebersihan adalah sebagian dari iman.' },
  { start: 63, end: 81, title: 'Jujur & Amanah', moral: 'Kejujuran menuntun pada ketenangan dan kemuliaan.' },
  { start: 71, end: 91, title: 'Disiplin Waktu Belajar', moral: 'Waktu bagaikan pedang, manfaatkan untuk kebaikan.' },
  { start: 80, end: 99, title: 'Istiqomah Beribadah', moral: 'Alhamdulillah hampir sampai di garis akhir dengan ridho ilahi!' }
];

// Ular (Turun ke bawah - Perbuatan yang Perlu Dihindari)
const SNAKES: Snake[] = [
  { start: 17, end: 7, title: 'Malas Mengerjakan PR', moral: 'Jangan menunda tugas sekolah, kerjakan dengan teliti ya!' },
  { start: 54, end: 34, title: 'Main Game Berlebihan', moral: 'Ingat waktu belajar dan istirahat yang cukup.' },
  { start: 62, end: 19, title: 'Lupa Berdoa Sebelum Belajar', moral: 'Awali setiap hal baik dengan Basmalah & doa.' },
  { start: 64, end: 60, title: 'Terlambat Bangun Subuh', moral: 'Tidurlah lebih awal agar tubuh segar di pagi hari.' },
  { start: 87, end: 36, title: 'Suka Mengeluh & Bertengkar', moral: 'Saling menyayangi sesama saudara dan teman sekolah.' },
  { start: 93, end: 73, title: 'Tidak Menyimak Guru', moral: 'Dengarkan penjelasan bapak/ibu guru dengan saksama.' },
  { start: 95, end: 75, title: 'Terburu-buru Saat Ujian', moral: 'Periksa kembali lembar jawabanmu sebelum dikumpulkan.' },
  { start: 98, end: 79, title: 'Bohong & Menyontek', moral: 'Kejujuran jauh lebih berharga daripada nilai contekan!' }
];

export const SnakesAndLaddersGame: React.FC<SnakesAndLaddersGameProps> = ({
  characterConfig,
  onEarnStar
}) => {
  // Game mode
  const [numPlayers, setNumPlayers] = useState<1 | 2>(1);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  // Positions (1 to 100)
  const [pos1, setPos1] = useState<number>(1);
  const [pos2, setPos2] = useState<number>(1);

  // Steps input by user ("Hanya diisi angka berapa majunya - Tanpa Dadu")
  const [stepInput, setStepInput] = useState<string>('3');

  // Animation & status
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [gameMessage, setGameMessage] = useState<{
    text: string;
    subtext?: string;
    type: 'normal' | 'ladder' | 'snake' | 'win';
  }>({
    text: 'Selamat datang di Ular Tangga Edukatif!',
    subtext: 'Ketik atau pilih berapa langkah maju di bawah tanpa perlu dadu.',
    type: 'normal'
  });

  // Math challenge mode toggle
  const [isMathChallengeMode, setIsMathChallengeMode] = useState<boolean>(false);
  const [mathQuestion, setMathQuestion] = useState<{
    numA: number;
    numB: number;
    op: '+' | '-';
    answer: number;
  }>({ numA: 2, numB: 3, op: '+', answer: 5 });

  // History log
  const [historyLogs, setHistoryLogs] = useState<string[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);

  // Auto-generate next simple math question for class 2
  const generateNewMathQuestion = () => {
    const isAdd = Math.random() > 0.3;
    if (isAdd) {
      const a = Math.floor(Math.random() * 6) + 1; // 1-6
      const b = Math.floor(Math.random() * 5) + 1; // 1-5
      setMathQuestion({ numA: a, numB: b, op: '+', answer: a + b });
      setStepInput(String(a + b));
    } else {
      const a = Math.floor(Math.random() * 6) + 5; // 5-10
      const b = Math.floor(Math.random() * 4) + 1; // 1-4
      setMathQuestion({ numA: a, numB: b, op: '-', answer: a - b });
      setStepInput(String(a - b));
    }
  };

  // Check ladder or snake for a given tile
  const getLadder = (tile: number) => LADDERS.find(l => l.start === tile);
  const getSnake = (tile: number) => SNAKES.find(s => s.start === tile);

  // Make move procedure
  const handleExecuteMove = async (customSteps?: number) => {
    if (isMoving || isWon) return;

    const rawSteps = customSteps !== undefined ? customSteps : parseInt(stepInput, 10);
    const steps = isNaN(rawSteps) || rawSteps < 1 ? 1 : rawSteps;

    setIsMoving(true);
    soundAudio.playTing();

    const currentPos = currentPlayer === 1 ? pos1 : pos2;
    const playerName = currentPlayer === 1 ? (characterConfig?.name || 'Pemain 1') : 'Pemain 2 (Sahabat)';

    setGameMessage({
      text: `${playerName} sedang melangkah maju sejauh ${steps} kotak...`,
      subtext: `Dari kotak ${currentPos} ke kotak ${Math.min(100, currentPos + steps)}`,
      type: 'normal'
    });

    let current = currentPos;
    let target = currentPos + steps;

    // Bounce back if overshoot 100
    if (target > 100) {
      const excess = target - 100;
      target = 100 - excess;
    }

    // Step-by-step movement animation
    const stepCount = Math.abs(target - current);
    const direction = target > current ? 1 : -1;

    for (let i = 0; i < stepCount; i++) {
      await new Promise(r => setTimeout(r, 160));
      current += direction;
      if (currentPlayer === 1) {
        setPos1(current);
      } else {
        setPos2(current);
      }
      soundAudio.playTing();
    }

    // Landed! Now check for ladder or snake
    await new Promise(r => setTimeout(r, 250));

    const ladder = getLadder(current);
    const snake = getSnake(current);

    if (ladder) {
      soundAudio.playFanfare();
      setGameMessage({
        text: `🪜 HORE NAIK TANGGA! Dari Kotak ${ladder.start} ke Kotak ${ladder.end}!`,
        subtext: `"${ladder.title}" — ${ladder.moral}`,
        type: 'ladder'
      });

      // Animate ladder climb
      await new Promise(r => setTimeout(r, 400));
      if (currentPlayer === 1) {
        setPos1(ladder.end);
      } else {
        setPos2(ladder.end);
      }
      current = ladder.end;

      setHistoryLogs(prev => [
        `[P${currentPlayer}] Kotak ${currentPos} + ${steps} ➔ Kotak ${ladder.start} 🪜 NAIK TANGGA ke ${ladder.end}! (${ladder.title})`,
        ...prev.slice(0, 15)
      ]);
    } else if (snake) {
      soundAudio.playErrorBuzz();
      setGameMessage({
        text: `🐍 ADUH TERPELESET ULAR! Dari Kotak ${snake.start} turun ke Kotak ${snake.end}!`,
        subtext: `"${snake.title}" — ${snake.moral}`,
        type: 'snake'
      });

      // Animate snake slide
      await new Promise(r => setTimeout(r, 400));
      if (currentPlayer === 1) {
        setPos1(snake.end);
      } else {
        setPos2(snake.end);
      }
      current = snake.end;

      setHistoryLogs(prev => [
        `[P${currentPlayer}] Kotak ${currentPos} + ${steps} ➔ Kotak ${snake.start} 🐍 TURUN ULAR ke ${snake.end}! (${snake.title})`,
        ...prev.slice(0, 15)
      ]);
    } else {
      setGameMessage({
        text: `${playerName} berhasil mendarat di Kotak ${current}!`,
        subtext: `Perhitungan langkah: ${currentPos} + ${steps} = ${current}`,
        type: 'normal'
      });

      setHistoryLogs(prev => [
        `[P${currentPlayer}] Kotak ${currentPos} + ${steps} ➔ Mendarat di Kotak ${current}`,
        ...prev.slice(0, 15)
      ]);
    }

    // Check Win
    if (current === 100) {
      setIsWon(true);
      setWinner(currentPlayer);
      soundAudio.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onEarnStar(15);
      setGameMessage({
        text: `🏆 ALHAMDULILLAH! ${playerName} JUARA!`,
        subtext: 'Selamat telah berhasil mencapai Kotak 100! Mendapatkan +15 Bintang Prestasi!',
        type: 'win'
      });
      setIsMoving(false);
      return;
    }

    // Switch turn if 2 players
    if (numPlayers === 2) {
      setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
    }

    if (isMathChallengeMode) {
      generateNewMathQuestion();
    }

    setIsMoving(false);
  };

  const handleResetGame = () => {
    soundAudio.playTing();
    setPos1(1);
    setPos2(1);
    setCurrentPlayer(1);
    setIsWon(false);
    setWinner(null);
    setHistoryLogs([]);
    setStepInput('3');
    setGameMessage({
      text: 'Permainan telah diulang dari Kotak 1.',
      subtext: 'Ketik berapa langkah maju yang diinginkan untuk memulai kembali.',
      type: 'normal'
    });
  };

  // Generate 100 tiles board rows from 10 down to 1
  // Row 10: 100 down to 91
  // Row 9: 81 up to 90
  // ...
  // Row 1: 1 up to 10
  const boardRows: number[][] = [];
  for (let r = 9; r >= 0; r--) {
    const rowNumbers: number[] = [];
    const startNum = r * 10 + 1;
    if (r % 2 === 1) {
      // odd r: from (r*10 + 10) down to (r*10 + 1)
      for (let c = 10; c >= 1; c--) {
        rowNumbers.push(r * 10 + c);
      }
    } else {
      // even r: from (r*10 + 1) up to (r*10 + 10)
      for (let c = 1; c <= 10; c++) {
        rowNumbers.push(r * 10 + c);
      }
    }
    boardRows.push(rowNumbers);
  }

  // Preset steps shortcuts
  const QUICK_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs flex items-center gap-1">
                <Dice5 className="w-3.5 h-3.5 text-amber-300" />
                Permainan Edukatif Tanpa Dadu
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-emerald-950">
                SD & MI
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">
              Ular Tangga Berhitung Ceria
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Mainkan ular tangga 100 kotak <strong className="text-amber-300">tanpa dadu</strong>! Cukup isi angka berapa langkah maju yang kamu inginkan, amati perhitungan penjumlahannya, panjat tangga kebajikan, dan hindari rintangan ular!
            </p>
          </div>

          {/* Quick Action Top Bar */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button
              onClick={handleResetGame}
              className="flex-1 sm:flex-none px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulang Game</span>
            </button>
          </div>
        </div>

        {/* Players & Status Bar inside Header */}
        <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400 text-emerald-950 flex items-center justify-center font-black">
              1
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-emerald-200 uppercase font-bold truncate">Pemain 1 ({characterConfig?.name || 'Santri'})</div>
              <div className="font-black text-white text-sm">Kotak {pos1}</div>
            </div>
          </div>

          {numPlayers === 2 && (
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                2
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-amber-200 uppercase font-bold truncate">Pemain 2 (Sahabat)</div>
                <div className="font-black text-white text-sm">Kotak {pos2}</div>
              </div>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-400 text-indigo-950 flex items-center justify-center font-black">
              🎯
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-indigo-200 uppercase font-bold">Giliran Aktif</div>
              <div className="font-black text-white text-sm">
                Pemain {currentPlayer} {currentPlayer === 1 ? `(${characterConfig?.name || 'Santri'})` : '(Sahabat)'}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 flex items-center gap-2.5 col-span-2 sm:col-span-1">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-black">
              ⭐
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-amber-200 uppercase font-bold">Hadiah Juara</div>
              <div className="font-black text-white text-sm">+15 Bintang Rapor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Control Panel (Tanpa Dadu - Input Angka Maju) & Right Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* CONTROL PANEL: Tanpa Dadu - Input Angka Maju */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Main Action Box */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Kendali Langkah
                </span>
                <h3 className="font-black text-base sm:text-lg text-slate-900 mt-1">
                  Isi Angka Berapa Majunya
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400">Mode:</span>
                <span className="block text-xs font-extrabold text-emerald-700">Tanpa Dadu</span>
              </div>
            </div>

            {/* Mode Switch: 1 Pemain vs 2 Pemain */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  setNumPlayers(1);
                  setCurrentPlayer(1);
                  soundAudio.playTing();
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  numPlayers === 1
                    ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>1 Pemain (Solo)</span>
              </button>
              <button
                onClick={() => {
                  setNumPlayers(2);
                  soundAudio.playTing();
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  numPlayers === 2
                    ? 'bg-white text-emerald-800 shadow-2xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>2 Pemain (Tanding)</span>
              </button>
            </div>

            {/* Optional Math Challenge Toggle */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-xs font-black text-amber-950">Mode Hitung Dulu Maju</div>
                  <div className="text-[10px] text-amber-800">Soal penjumlahan/pengurangan kelas 2</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMathChallengeMode}
                  onChange={e => {
                    setIsMathChallengeMode(e.target.checked);
                    if (e.target.checked) generateNewMathQuestion();
                    soundAudio.playTing();
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Math challenge prompt if enabled */}
            {isMathChallengeMode && (
              <div className="p-3 bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <span>Tantangan Berhitung:</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">Kelas 2</span>
                </div>
                <div className="text-center py-1">
                  <span className="text-2xl font-black text-slate-800">
                    {mathQuestion.numA} {mathQuestion.op} {mathQuestion.numB} = ?
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 text-center">
                  Hasil hitunganmu akan menentukan berapa langkah pion maju!
                </p>
              </div>
            )}

            {/* STEP INPUT FIELD - Centered and Big */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 flex items-center justify-between">
                <span>Masukkan Angka Langkah:</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Posisi sekarang: <strong>Kotak {currentPlayer === 1 ? pos1 : pos2}</strong>
                </span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const current = parseInt(stepInput, 10) || 1;
                    if (current > 1) {
                      setStepInput(String(current - 1));
                      soundAudio.playTing();
                    }
                  }}
                  disabled={isMoving || isWon}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  -
                </button>

                <div className="relative flex-1">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={stepInput}
                    onChange={e => setStepInput(e.target.value)}
                    disabled={isMoving || isWon}
                    placeholder="Contoh: 4"
                    className="w-full text-center text-2xl font-black text-emerald-950 bg-emerald-50/50 border-2 border-emerald-300 focus:border-emerald-600 focus:bg-white rounded-xl py-2 px-3 outline-hidden transition-all shadow-inner"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700 pointer-events-none">
                    Langkah
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = parseInt(stepInput, 10) || 0;
                    if (current < 100) {
                      setStepInput(String(current + 1));
                      soundAudio.playTing();
                    }
                  }}
                  disabled={isMoving || isWon}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-lg flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Quick Preset Buttons (1, 2, 3, 4, 5, 6, 7, 8, 9, 10) */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tombol Cepat Isi Angka:
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {QUICK_STEPS.map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setStepInput(String(num));
                        soundAudio.playTing();
                      }}
                      disabled={isMoving || isWon}
                      className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                        stepInput === String(num)
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Arithmetic Prediction / Target Preview */}
            {(() => {
              const currentPos = currentPlayer === 1 ? pos1 : pos2;
              const steps = parseInt(stepInput, 10) || 0;
              const expectedTarget = Math.min(100, currentPos + steps);
              const previewLadder = getLadder(expectedTarget);
              const previewSnake = getSnake(expectedTarget);

              return (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-600 font-semibold">
                    <span>Perhitungan Maju:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentPos} + {steps} = <strong className="text-emerald-700">{expectedTarget}</strong>
                    </span>
                  </div>

                  {previewLadder && (
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <span>🪜 Di kotak {expectedTarget} ada TANGGA naik ke {previewLadder.end}!</span>
                    </div>
                  )}

                  {previewSnake && (
                    <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                      <span>🐍 Di kotak {expectedTarget} ada ULAR meluncur ke {previewSnake.end}!</span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Big Action Button "Maju Sekarang" */}
            <button
              onClick={() => handleExecuteMove()}
              disabled={isMoving || isWon || !stepInput}
              className={`w-full py-3.5 px-4 rounded-xl sm:rounded-2xl font-black text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isMoving || isWon
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 hover:shadow-lg'
              }`}
            >
              {isMoving ? (
                <>
                  <span className="animate-spin inline-block">⏳</span>
                  <span>Sedang Melangkah...</span>
                </>
              ) : isWon ? (
                <>
                  <Trophy className="w-5 h-5 text-amber-300" />
                  <span>Permainan Selesai!</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Maju {stepInput || '0'} Langkah Sekarang!</span>
                </>
              )}
            </button>
          </div>

          {/* Game Event Status Message Box */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              gameMessage.type === 'ladder'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : gameMessage.type === 'snake'
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : gameMessage.type === 'win'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="font-black text-sm flex items-center gap-2">
              {gameMessage.type === 'ladder' && <span>🪜</span>}
              {gameMessage.type === 'snake' && <span>🐍</span>}
              {gameMessage.type === 'win' && <span>🏆</span>}
              {gameMessage.type === 'normal' && <span>💡</span>}
              <span>{gameMessage.text}</span>
            </div>
            {gameMessage.subtext && (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {gameMessage.subtext}
              </p>
            )}
          </div>

          {/* Ladders & Snakes Guide Legend */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
            <h4 className="font-black text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>Daftar Tangga & Ular Pembelajaran</span>
            </h4>

            <div className="space-y-2">
              <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-extrabold text-emerald-900 block text-[11px]">
                  🪜 Tangga Kebajikan (Naik Pesat):
                </span>
                <p className="text-[10px] text-emerald-700 leading-relaxed">
                  Kotak 4➔14 (Shalat), 9➔31 (Orang Tua), 20➔38 (Buku), 28➔84 (Juara Kelas), 40➔59 (Menolong), 51➔67 (Kebersihan), 63➔81 (Jujur), 71➔91 (Disiplin), 80➔99 (Istiqomah).
                </p>
              </div>

              <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1">
                <span className="font-extrabold text-rose-900 block text-[11px]">
                  🐍 Ular Nasehat (Turun ke Bawah):
                </span>
                <p className="text-[10px] text-rose-700 leading-relaxed">
                  Kotak 17➔7 (Malas PR), 54➔34 (Game Berlebih), 62➔19 (Lupa Doa), 64➔60 (Terlambat Subuh), 87➔36 (Mengeluh), 93➔73 (Tidak Menyimak), 95➔75 (Kurang Teliti), 98➔79 (Bohong).
                </p>
              </div>
            </div>
          </div>

          {/* Move History Log */}
          {historyLogs.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-800">Catatan Langkah:</span>
                <span className="text-[10px] text-slate-400">{historyLogs.length} langkah</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 font-mono text-[11px]">
                {historyLogs.map((log, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOARD VIEW: 100 Squares Snakes & Ladders Grid */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-3">
          {/* Board Card Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 border border-slate-200 shadow-sm relative">
            {/* Top Board Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-700">Papan 100 Kotak SD & MI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 flex items-center justify-center text-[9px] text-white font-bold">1</span>
                  <span className="text-[11px] font-bold text-slate-600">{characterConfig?.name || 'P1'} ({pos1})</span>
                </div>
                {numPlayers === 2 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-amber-500 flex items-center justify-center text-[9px] text-white font-bold">2</span>
                    <span className="text-[11px] font-bold text-slate-600">P2 ({pos2})</span>
                  </div>
                )}
              </div>
            </div>

            {/* 10x10 Grid */}
            <div className="grid grid-cols-10 gap-1 sm:gap-1.5 select-none bg-emerald-950/5 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
              {boardRows.map((row, rIdx) =>
                row.map(tileNum => {
                  const ladder = getLadder(tileNum);
                  const isLadderEnd = LADDERS.some(l => l.end === tileNum);
                  const snake = getSnake(tileNum);
                  const isSnakeEnd = SNAKES.some(s => s.end === tileNum);

                  const isP1Here = pos1 === tileNum;
                  const isP2Here = numPlayers === 2 && pos2 === tileNum;

                  // Tile Pastel color themes
                  const isFinish = tileNum === 100;
                  const isStart = tileNum === 1;

                  let bgColor = 'bg-white';
                  if (isFinish) {
                    bgColor = 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-amber-950 font-black border-amber-400 shadow-xs';
                  } else if (isStart) {
                    bgColor = 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-300';
                  } else if (ladder) {
                    bgColor = 'bg-emerald-50 border-emerald-300';
                  } else if (snake) {
                    bgColor = 'bg-rose-50 border-rose-300';
                  } else if (tileNum % 2 === 0) {
                    bgColor = 'bg-amber-50/40 border-slate-200/70';
                  } else {
                    bgColor = 'bg-sky-50/40 border-slate-200/70';
                  }

                  return (
                    <div
                      key={tileNum}
                      className={`relative aspect-square rounded-md sm:rounded-xl border flex flex-col items-center justify-between p-0.5 sm:p-1 transition-all ${bgColor} ${
                        isP1Here || isP2Here ? 'ring-2 ring-emerald-600 ring-offset-1 z-10 scale-102 shadow-md' : ''
                      }`}
                    >
                      {/* Top Tile Row: Number */}
                      <div className="w-full flex items-center justify-between leading-none">
                        <span
                          className={`text-[9px] sm:text-xs font-black ${
                            isFinish
                              ? 'text-amber-950'
                              : ladder
                              ? 'text-emerald-800'
                              : snake
                              ? 'text-rose-800'
                              : 'text-slate-600'
                          }`}
                        >
                          {tileNum}
                        </span>

                        {isFinish && (
                          <span className="text-[10px] sm:text-xs">🏆</span>
                        )}
                        {isStart && (
                          <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700">Mulai</span>
                        )}
                      </div>

                      {/* Middle icon / ladder / snake marker */}
                      <div className="my-auto flex flex-col items-center justify-center text-center">
                        {ladder && (
                          <div className="flex flex-col items-center animate-bounce-slow">
                            <span className="text-xs sm:text-base leading-none">🪜</span>
                            <span className="text-[7px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-100/90 px-0.5 rounded-sm">
                              ↗{ladder.end}
                            </span>
                          </div>
                        )}
                        {snake && (
                          <div className="flex flex-col items-center">
                            <span className="text-xs sm:text-base leading-none">🐍</span>
                            <span className="text-[7px] sm:text-[9px] font-bold text-rose-700 bg-rose-100/90 px-0.5 rounded-sm">
                              ↘{snake.end}
                            </span>
                          </div>
                        )}
                        {isLadderEnd && !ladder && (
                          <span className="text-[7px] sm:text-[9px] font-extrabold text-emerald-600">
                            ⭐ Puncak
                          </span>
                        )}
                        {isSnakeEnd && !snake && (
                          <span className="text-[7px] sm:text-[9px] font-bold text-slate-400">
                            Ekor Ular
                          </span>
                        )}
                      </div>

                      {/* Pawns on this tile */}
                      <div className="w-full flex items-center justify-center gap-0.5 min-h-[14px] sm:min-h-[18px]">
                        {isP1Here && (
                          <div
                            title={`Pemain 1: ${characterConfig?.name || 'Santri'}`}
                            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[8px] sm:text-xs font-black shadow-md animate-pulse border-2 border-white shrink-0"
                          >
                            {characterConfig ? '🧕' : '1'}
                          </div>
                        )}
                        {isP2Here && (
                          <div
                            title="Pemain 2: Sahabat"
                            className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] sm:text-xs font-black shadow-md animate-pulse border-2 border-white shrink-0"
                          >
                            2
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Board Explanation */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-xs bg-emerald-100 border border-emerald-300" />
                  <span>🪜 Tangga Naik</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-xs bg-rose-100 border border-rose-300" />
                  <span>🐍 Ular Turun</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-xs bg-amber-300 border border-amber-500" />
                  <span>🏆 Garis Akhir 100</span>
                </span>
              </div>
              <span className="font-semibold text-emerald-800">
                Pion maju sesuai angka yang kamu isi!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* VICTORY MODAL POPUP */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl border border-amber-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 text-emerald-950 flex items-center justify-center text-3xl sm:text-4xl shadow-lg animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Alhamdulillah! Juara Permainan!
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {winner === 1 ? (characterConfig?.name || 'Pemain 1') : 'Pemain 2'} Menang!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hebat sekali! Kamu berhasil menyelesaikan perjalanan 100 kotak Ular Tangga Berhitung Ceria!
              </p>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center gap-3">
              <span className="text-2xl">⭐</span>
              <div className="text-left">
                <div className="font-black text-amber-950 text-sm">+15 Bintang Prestasi</div>
                <div className="text-[11px] text-amber-800">Telah otomatis ditambahkan ke Rapor Siswa!</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleResetGame}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Sekali Lagi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
