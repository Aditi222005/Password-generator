import { useState, useMemo } from 'react';
import { Search, History, Check, Copy } from 'lucide-react';

export default function PasswordHistory({ passwords }) {
  const [search, setSearch] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  // FEATURE 4: Search Passwords (REAL useMemo case 🔥)
  const filteredPasswords = useMemo(() => {
    console.log("Filtering passwords..."); // to prove memo works
    return passwords.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, passwords]);

  const copyToClipboard = async (text, index) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/[0.08]">
      <div className="flex items-center gap-2 mb-4 text-white/80">
        <History size={18} />
        <h3 className="font-semibold text-sm">Generation History</h3>
      </div>
      
      <div className="relative mb-4">
        <input 
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
      </div>

      <ul className="space-y-2 max-h-40 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
        {filteredPasswords.length === 0 ? (
          <li className="text-center text-xs text-white/30 py-4">No matching passwords</li>
        ) : (
          filteredPasswords.map((pass, index) => (
            <li key={index} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group">
               <span className="text-sm text-white/80 font-mono truncate pr-4">{pass}</span>
               <button 
                  onClick={() => copyToClipboard(pass, index)}
                  className="text-white/30 hover:text-white transition-colors"
                  title="Copy password"
               >
                 {copiedIndex === index ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
               </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
