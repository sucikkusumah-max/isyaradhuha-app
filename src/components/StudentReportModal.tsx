import React from 'react';
import { UserProgress } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { Star, Award, Printer, X, Sparkles } from 'lucide-react';

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateName: (name: string, madrasah: string) => void;
  onResetProgress: () => void;
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateName,
  onResetProgress
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-8 shadow-2xl border border-slate-100 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {progress.character ? (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-rose-300 flex items-center justify-center shrink-0">
                <CharacterAvatar config={progress.character} size="sm" />
              </div>
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Rapor Prestasi Siswa & Santriwati</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Sahabat Belajar: <strong className="text-emerald-700">{progress.character?.name || 'Aisyah'}</strong>
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

        {/* Identity Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              Nama Santri / Siswa:
            </label>
            <input
              type="text"
              value={progress.studentName}
              onChange={e => onUpdateName(e.target.value, progress.madrasahName)}
              placeholder="Contoh: Muhammad Fatih"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-emerald-600 font-semibold"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-500 block mb-1">
              Nama Madrasah / Sekolah:
            </label>
            <input
              type="text"
              value={progress.madrasahName}
              onChange={e => onUpdateName(progress.studentName, e.target.value)}
              placeholder="Contoh: MI Nurul Huda"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-emerald-600 font-semibold"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500 mx-auto mb-1" />
            <div className="text-xl font-black text-amber-950">{progress.stars}</div>
            <div className="text-[10px] font-bold text-amber-800">Total Bintang</div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            <span className="font-arabic text-xl font-bold text-emerald-800 block mb-1">عَرَبِيّ</span>
            <div className="text-xs font-bold text-emerald-950">Arab & Imla’</div>
            <div className="text-[10px] text-emerald-800">Aktif Dipelajari</div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <span className="text-xl block mb-1">🔢</span>
            <div className="text-xs font-bold text-amber-950">Matematika 2</div>
            <div className="text-[10px] text-amber-800">Aktif Dipelajari</div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
            <span className="text-xl block mb-1">🇮🇩</span>
            <div className="text-xs font-bold text-indigo-950">B. Indonesia 2</div>
            <div className="text-[10px] text-indigo-800">Aktif Dipelajari</div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl">
            <span className="text-xl font-black text-blue-800 block mb-1">EN</span>
            <div className="text-xs font-bold text-blue-950">English Kids</div>
            <div className="text-[10px] text-blue-800">Aktif Dipelajari</div>
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl">
            <span className="text-xl block mb-1">🔬</span>
            <div className="text-xs font-bold text-teal-950">IPA Dasar</div>
            <div className="text-[10px] text-teal-800">Aktif Dipelajari</div>
          </div>
        </div>

        {/* Lencana Prestasi (Badges) */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
            Lencana Penghargaan Santri:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="font-bold text-emerald-950">Santri Rajin</div>
                <div className="text-[10px] text-emerald-700">Mulai belajar</div>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
              progress.stars >= 5 ? 'border-amber-300 bg-amber-50/60' : 'opacity-40 border-slate-200'
            }`}>
              <Star className="w-4 h-4 text-amber-500" />
              <div>
                <div className="font-bold text-slate-900">Bintang Cilik</div>
                <div className="text-[10px] text-slate-500">Capai 5 Bintang</div>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
              progress.stars >= 15 ? 'border-amber-300 bg-amber-50/60' : 'opacity-40 border-slate-200'
            }`}>
              <Award className="w-4 h-4 text-amber-500" />
              <div>
                <div className="font-bold text-slate-900">Jagoan Imla’</div>
                <div className="text-[10px] text-slate-500">Capai 15 Bintang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onResetProgress}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
          >
            Reset Bintang Belajar
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl text-center active:scale-95 transition-all"
            >
              Simpan & Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
