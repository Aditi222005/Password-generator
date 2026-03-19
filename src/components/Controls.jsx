import { Hash, AtSign, CaseSensitive } from 'lucide-react';

function ToggleSwitch({ id, label, checked, onChange, icon: Icon }) {
  return (
    <label
      htmlFor={id}
      className={`
        group flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 p-2 sm:p-3 rounded-xl cursor-pointer
        transition-all duration-300 border
        ${checked
          ? 'bg-white/[0.06] border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.08)]'
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]'
        }
      `}
    >
      {/* Icon & Label Wrapper */}
      <div className="flex items-center gap-2 flex-1 w-full justify-center sm:justify-start">
        <div
          className={`
            p-1.5 rounded-lg transition-all duration-300 shrink-0
            ${checked
              ? 'bg-violet-500/20 text-violet-400'
              : 'bg-white/[0.04] text-white/30 group-hover:text-white/50'
            }
          `}
        >
          <Icon size={14} />
        </div>

        {/* Label */}
        <span
          className={`
            text-[13px] sm:text-sm font-medium transition-colors duration-300 truncate
            ${checked ? 'text-white/90' : 'text-white/50'}
          `}
        >
          {label}
        </span>
      </div>

      {/* Toggle */}
      <div className="relative shrink-0 mt-1 sm:mt-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`
            w-9 h-5 rounded-full transition-all duration-300
            ${checked
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500'
              : 'bg-white/[0.1]'
            }
          `}
        >
          <div
            className={`
              absolute top-0.5 w-4 h-4 rounded-full shadow-md
              transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
              ${checked
                ? 'left-[18px] bg-white'
                : 'left-0.5 bg-white/60'
              }
            `}
          />
        </div>
      </div>
    </label>
  );
}

function RangeSlider({ value, min, max, onChange }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/50">Password Length</span>
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {value}
          </span>
          <span className="text-xs text-white/30 self-end mb-1">chars</span>
        </div>
      </div>

      {/* Custom range slider */}
      <div className="relative h-8 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 rounded-full bg-white/[0.06]" />

        {/* Track fill */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />

        {/* Glow on thumb position */}
        <div
          className="absolute w-8 h-8 rounded-full blur-md bg-violet-500/30 transition-all duration-150 -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        />

        {/* Native range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer h-8 z-10"
        />

        {/* Custom thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-white shadow-lg shadow-violet-500/30 border-2 border-violet-400 transition-all duration-150 -translate-x-1/2 pointer-events-none"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-white/20">{min}</span>
        <span className="text-[10px] text-white/20">{max}</span>
      </div>
    </div>
  );
}

export default function Controls({
  length,
  onLengthChange,
  numberAllowed,
  onNumberChange,
  charAllowed,
  onCharChange,
  uppercaseAllowed,
  onUppercaseChange,
}) {
  return (
    <div className="space-y-4">
      <RangeSlider
        value={length}
        min={4}
        max={64}
        onChange={onLengthChange}
      />

      {/* Options grid fixed to consistent 3 columns on larger screens to strictly align elements */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
        <ToggleSwitch
          id="uppercase"
          label="Uppercase"
          checked={uppercaseAllowed}
          onChange={onUppercaseChange}
          icon={CaseSensitive}
        />
        <ToggleSwitch
          id="numbers"
          label="Numbers"
          checked={numberAllowed}
          onChange={onNumberChange}
          icon={Hash}
        />
        <ToggleSwitch
          id="symbols"
          label="Symbols"
          checked={charAllowed}
          onChange={onCharChange}
          icon={AtSign}
        />
      </div>
    </div>
  );
}
