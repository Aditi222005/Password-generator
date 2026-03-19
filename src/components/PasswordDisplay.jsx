import { useState, useRef, useEffect } from 'react';
import { Copy, Check, Eye, EyeOff, RefreshCw } from 'lucide-react';

export default function PasswordDisplay({ password, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedPassword, setDisplayedPassword] = useState('');
  const inputRef = useRef(null);

  // Typing animation effect when password changes
  useEffect(() => {
    if (!password) return;
    setIsAnimating(true);
    setDisplayedPassword('');

    let currentIndex = 0;
    const chars = password.split('');
    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayedPassword(password.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [password]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      if (inputRef.current) {
        inputRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const maskedPassword = displayedPassword.replace(/./g, '•');

  return (
    <div className="relative group">
      {/* Glow effect behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />

      <div className="relative flex items-center gap-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-2 transition-all duration-300">
        {/* Password text */}
        <div className="flex-1 relative min-w-0 px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={showPassword ? displayedPassword : maskedPassword}
            readOnly
            className="w-full bg-transparent text-white text-lg font-mono tracking-wider outline-none selection:bg-violet-500/30 cursor-default truncate"
            style={{
              caretColor: 'transparent',
            }}
          />
          {isAnimating && (
            <span className="inline-block w-0.5 h-5 bg-violet-400 animate-pulse absolute right-4 top-1/2 -translate-y-1/2" />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Show/Hide */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-200 active:scale-90"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            className="p-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.08] transition-all duration-200 active:scale-90"
            title="Generate new password"
          >
            <RefreshCw
              size={18}
              className={isAnimating ? 'animate-spin' : ''}
            />
          </button>

          {/* Copy */}
          <div className="relative">
            <button
              onClick={copyToClipboard}
              className={`
                p-2.5 rounded-xl transition-all duration-300 active:scale-90
                ${copied
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105'
                }
              `}
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>

            {/* Copied tooltip */}
            {copied && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-lg whitespace-nowrap animate-[fadeInDown_0.2s_ease-out]">
                Copied!
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-emerald-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
