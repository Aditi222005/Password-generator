import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  

  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_[]{}+"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.setSelectionRange(0,2)
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed])

  return (
    <>
      <div className="app-container w-full max-w-md mx-auto shadow-xl rounded-xl px-6 py-8 my-8 text-orange-500 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
        <h1 className="title text-white text-center text-3xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">Password Generator</h1>
        <div className="password-section flex shadow-2xl rounded-xl overflow-hidden mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600">
          <input 
            
            type="text" 
            value={password}
            className="password-display outline-none w-full py-4 px-6 text-xl font-mono bg-transparent text-white placeholder-gray-400"
            placeholder="Click generate or adjust options to get a password..."
            readOnly 
            ref = {passwordRef}
          />
          <button 
            
            className="copy-btn outline-none bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-4 rounded-r-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="options-container space-y-4">
          <div className="option-group flex items-center justify-between p-4 bg-gray-700/50 rounded-xl border border-gray-600">
            <label className="option-label text-white text-lg font-medium">Length: {length}</label>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length}
              className="slider w-48 h-2 bg-gray-600 rounded-lg cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all shadow-md"
              onChange={(e) => setLength(e.target.value)} 
            />
          </div>
          <div className="checkbox-group flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:bg-gray-700/70 transition-all">
            <input 
              type="checkbox" 
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-6 h-6 accent-orange-500 cursor-pointer shadow-md hover:scale-110 transition-all"
            />
            <label htmlFor="numberInput" className="option-label text-white text-lg font-medium cursor-pointer flex-1">Include Numbers</label>
          </div>
          <div className="checkbox-group flex items-center space-x-4 p-4 bg-gray-700/50 rounded-xl border border-gray-600 hover:bg-gray-700/70 transition-all">
            <input 
              type="checkbox" 
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-6 h-6 accent-orange-500 cursor-pointer shadow-md hover:scale-110 transition-all"
            />
            <label htmlFor="charInput" className="option-label text-white text-lg font-medium cursor-pointer flex-1">Include Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
