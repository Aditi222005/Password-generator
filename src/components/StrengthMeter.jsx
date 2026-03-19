import { useMemo } from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function StrengthMeter({ password }) {
  const strength = useMemo(() => {
    console.log("Calculating strength..."); // to prove memo works
    if (!password) return { level: 0, label: 'None', color: 'gray' };

    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: 'red' };
    if (score === 2 || score === 3) return { level: 3, label: 'Medium', color: 'orange' };
    return { level: 5, label: 'Strong', color: 'emerald' };
  }, [password]);

  const rules = useMemo(() => {
    return {
      hasNumber: /[0-9]/.test(password),
      noRepeat: !/(.)\1/.test(password) && password.length > 0,
      hasLength: password.length > 8,
    };
  }, [password]);

  const colorMap = {
    gray: { bar: 'bg-white/10', text: 'text-white/30', icon: 'text-white/30' },
    red: { bar: 'bg-red-500', text: 'text-red-400', icon: 'text-red-400' },
    orange: { bar: 'bg-orange-500', text: 'text-orange-400', icon: 'text-orange-400' },
    yellow: { bar: 'bg-yellow-500', text: 'text-yellow-400', icon: 'text-yellow-400' },
    emerald: { bar: 'bg-emerald-500', text: 'text-emerald-400', icon: 'text-emerald-400' },
    cyan: { bar: 'bg-cyan-400', text: 'text-cyan-400', icon: 'text-cyan-400' },
  };

  const colors = colorMap[strength.color];

  const StrengthIcon = strength.level >= 4 ? ShieldCheck : strength.level >= 2 ? Shield : ShieldAlert;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StrengthIcon size={14} className={`${colors.icon} transition-colors duration-300`} />
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Strength</span>
        </div>
        <span className={`text-xs font-semibold ${colors.text} transition-colors duration-300`}>
          {strength.label}
        </span>
      </div>

      {/* Strength bars */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full bg-white/[0.06] overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                i <= strength.level ? colors.bar : 'bg-transparent'
              }`}
              style={{
                width: i <= strength.level ? '100%' : '0%',
                transitionDelay: `${i * 60}ms`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Rule validation check */}
      <div className="pt-3 border-t border-white/[0.08] mt-3">
        <ul className="text-xs space-y-2 text-white/50">
          <li className="flex items-center gap-2">
            <span className={rules.hasLength ? "text-emerald-400" : "text-white/20"}>
              {rules.hasLength ? "✅" : "❌"}
            </span>
            Length &gt; 8
          </li>
          <li className="flex items-center gap-2">
            <span className={rules.hasNumber ? "text-emerald-400" : "text-white/20"}>
              {rules.hasNumber ? "✅" : "❌"}
            </span>
            Contains number
          </li>
          <li className="flex items-center gap-2">
            <span className={rules.noRepeat ? "text-emerald-400" : "text-white/20"}>
              {rules.noRepeat ? "✅" : "❌"}
            </span>
            No repeated consecutive characters
          </li>
        </ul>
      </div>
    </div>
  );
}
