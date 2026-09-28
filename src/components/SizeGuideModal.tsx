import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const sizeChart = [
    {
      size: 'XS',
      us: '0 - 2',
      it: '38',
      bustCm: '80 - 84',
      waistCm: '62 - 66',
      hipCm: '88 - 92',
      bustIn: '31.5 - 33',
      waistIn: '24.5 - 26',
      hipIn: '34.5 - 36',
    },
    {
      size: 'S',
      us: '4 - 6',
      it: '40',
      bustCm: '85 - 89',
      waistCm: '67 - 71',
      hipCm: '93 - 97',
      bustIn: '33.5 - 35',
      waistIn: '26.5 - 28',
      hipIn: '36.5 - 38',
    },
    {
      size: 'M',
      us: '8 - 10',
      it: '42',
      bustCm: '90 - 94',
      waistCm: '72 - 76',
      hipCm: '98 - 102',
      bustIn: '35.5 - 37',
      waistIn: '28.5 - 30',
      hipIn: '38.5 - 40',
    },
    {
      size: 'L',
      us: '12',
      it: '44',
      bustCm: '95 - 100',
      waistCm: '77 - 82',
      hipCm: '103 - 108',
      bustIn: '37.5 - 39.5',
      waistIn: '30.5 - 32.5',
      hipIn: '40.5 - 42.5',
    },
    {
      size: 'XL',
      us: '14',
      it: '46',
      bustCm: '101 - 106',
      waistCm: '83 - 88',
      hipCm: '109 - 114',
      bustIn: '40 - 42',
      waistIn: '33 - 35',
      hipIn: '43 - 45',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#191817]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F5] border border-[#EAE5D9] max-w-2xl w-full rounded-xs shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#706B62] hover:text-[#191817] hover:bg-[#EAE5D9] rounded-full transition-colors"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EAE5D9]">
          <div>
            <h3 className="text-2xl font-serif text-[#191817]">Size & Proportion Guide</h3>
            <p className="text-xs text-[#706B62] mt-0.5">memosi Atelier Standard Sizing</p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center bg-[#F4F1EA] p-1 rounded-xs border border-[#EAE5D9]">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                unit === 'cm' ? 'bg-[#191817] text-[#FAF9F5]' : 'text-[#706B62] hover:text-[#191817]'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors ${
                unit === 'in' ? 'bg-[#191817] text-[#FAF9F5]' : 'text-[#706B62] hover:text-[#191817]'
              }`}
            >
              IN
            </button>
          </div>
        </div>

        {/* Table with Tabular Numerals */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans tabular-nums">
            <thead>
              <tr className="border-b border-[#EAE5D9] text-[#8A8175] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">US</th>
                <th className="py-2.5 px-3">IT</th>
                <th className="py-2.5 px-3">Bust ({unit})</th>
                <th className="py-2.5 px-3">Waist ({unit})</th>
                <th className="py-2.5 px-3">Hips ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE5D9]/60">
              {sizeChart.map((row) => (
                <tr key={row.size} className="hover:bg-[#F4F1EA]/50">
                  <td className="py-3 px-3 font-semibold text-[#191817]">{row.size}</td>
                  <td className="py-3 px-3 text-[#5A554D]">{row.us}</td>
                  <td className="py-3 px-3 text-[#5A554D]">{row.it}</td>
                  <td className="py-3 px-3 text-[#191817]">
                    {unit === 'cm' ? row.bustCm : row.bustIn}
                  </td>
                  <td className="py-3 px-3 text-[#191817]">
                    {unit === 'cm' ? row.waistCm : row.waistIn}
                  </td>
                  <td className="py-3 px-3 text-[#191817]">
                    {unit === 'cm' ? row.hipCm : row.hipIn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Guide Notes */}
        <div className="mt-6 pt-5 border-t border-[#EAE5D9] space-y-2 text-xs text-[#706B62] bg-[#F4F1EA] p-4 rounded-xs">
          <p className="font-semibold text-[#191817] uppercase tracking-wider text-[11px]">How to Measure:</p>
          <p>• <strong>Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          <p>• <strong>Waist:</strong> Measure around your natural waistline, typically the narrowest point.</p>
          <p>• <strong>Hips:</strong> Measure around the widest part of your hips with feet together.</p>
          <p className="pt-1 italic">Tailored coats and overshirts feature an intended relaxed drape; if between sizes, we recommend selecting your typical size.</p>
        </div>

      </div>
    </div>
  );
};
