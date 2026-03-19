import { useState, useCallback, useEffect, useMemo } from "react";
import PasswordDisplay from "./components/PasswordDisplay";
import Controls from "./components/Controls";
import StrengthMeter from "./components/StrengthMeter";
import AnimatedBackground from "./components/AnimatedBackground";
import PasswordHistory from "./components/PasswordHistory";

export default function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  
  // Trigger state to force re-generation on button click
  const [trigger, setTrigger] = useState(0);
  const [history, setHistory] = useState([]);

  // FEATURE 5 & PHASE 4: Password Generator Optimization & Web Crypto API
  const password = useMemo(() => {
    console.log("Generating secure password using Web Crypto API...");
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}";
    
    if (str.length === 0) return "";

    let pass = "";
    // Crytpographically secure array of random values
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        // Map the random 32-bit integer to an index in our allowed characters string
        pass += str[randomValues[i] % str.length];
    }
    return pass;
  }, [length, numberAllowed, charAllowed, uppercaseAllowed, trigger]);

  const generatePassword = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

  // Update history when generated password changes
  useEffect(() => {
    if (password) {
      setHistory(prev => {
        if (prev[0] === password) return prev;
        return [password, ...prev].slice(0, 10);
      });
    }
  }, [password]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <AnimatedBackground />

      {/* Main Card */}
      <div className="card-entrance w-full max-w-lg">
        <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Password Generator
            </h1>
            <p className="text-white/40 text-sm">
              Generate secure and customizable passwords
            </p>
          </div>

          {/* Password Display */}
          <PasswordDisplay
            password={password}
            onRegenerate={generatePassword}
          />

          {/* Strength Meter */}
          <StrengthMeter password={password} />

          {/* Controls */}
          <Controls
            length={length}
            onLengthChange={setLength}
            numberAllowed={numberAllowed}
            onNumberChange={() => setNumberAllowed((prev) => !prev)}
            charAllowed={charAllowed}
            onCharChange={() => setCharAllowed((prev) => !prev)}
            uppercaseAllowed={uppercaseAllowed}
            onUppercaseChange={() => setUppercaseAllowed((prev) => !prev)}
          />

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="generate-btn relative w-full py-3 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-violet-600 to-fuchsia-500 
            hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
          >
            Generate Password
          </button>

          {/* Password History with Search (Feature 4) */}
          <PasswordHistory passwords={history} />
        </div>
      </div>
    </div>
  );
}