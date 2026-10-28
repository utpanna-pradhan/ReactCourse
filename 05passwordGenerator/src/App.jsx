
import { useState, useCallback, useEffect } from "react";

export default function App() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}";

    if (!chars) return;

    // Cryptographically secure random selection
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }

    setPassword(result);
    setHistory((prev) => [result, ...prev].slice(0, 5));
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyPassword = async (value = password) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const strength =
    length >= 20 && uppercase && lowercase && numbers && symbols
      ? { label: "Very strong", width: "100%", color: "bg-emerald-400" }
      : length >= 16 && (numbers || symbols) && uppercase && lowercase
      ? { label: "Strong", width: "75%", color: "bg-green-400" }
      : length >= 10
      ? { label: "Medium", width: "50%", color: "bg-yellow-400" }
      : { label: "Weak", width: "25%", color: "bg-red-400" };

  const options = [
    { label: "Uppercase letters", value: uppercase, setter: setUppercase },
    { label: "Lowercase letters", value: lowercase, setter: setLowercase },
    { label: "Numbers", value: numbers, setter: setNumbers },
    { label: "Symbols", value: symbols, setter: setSymbols },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-8">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl">
            🔐
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Password Generator
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create strong, random passwords in seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
          <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your password
          </label>

          <div className="flex items-center gap-3">
            <input
              value={password}
              readOnly
              aria-label="Generated password"
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-violet-300 outline-none sm:text-base"
            />

            <button
              onClick={() => copyPassword()}
              className="shrink-0 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-violet-300"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-300">Password strength</span>
            <span className="text-sm font-semibold text-violet-300">
              {strength.label}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className={`h-full rounded-full transition-all ${strength.color}`}
              style={{ width: strength.width }}
            />
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="length" className="font-semibold">
              Password length
            </label>
            <span className="rounded-lg bg-violet-500/15 px-3 py-1 font-mono text-violet-300">
              {length}
            </span>
          </div>

          <input
            id="length"
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-violet-500"
          />

          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>6 characters</span>
            <span>64 characters</span>
          </div>
        </div>

        <div className="mt-7">
          <h2 className="mb-4 font-semibold">Include characters</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <label
                key={option.label}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-3 transition hover:border-violet-500"
              >
                <input
                  type="checkbox"
                  checked={option.value}
                  onChange={(e) => option.setter(e.target.checked)}
                  className="h-4 w-4 accent-violet-500"
                />
                <span className="text-sm text-slate-200">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={generatePassword}
          disabled={!uppercase && !lowercase && !numbers && !symbols}
          className="mt-7 w-full rounded-xl bg-violet-600 py-3.5 font-bold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ↻ Generate New Password
        </button>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Recent passwords</h2>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear history
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-slate-500">
              Your recent passwords will appear here.
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-3"
                >
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-300">
                    {item}
                  </span>
                  <button
                    onClick={() => copyPassword(item)}
                    className="shrink-0 text-xs font-semibold text-violet-300 hover:text-violet-200"
                    aria-label={`Copy password ${index + 1}`}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 text-center text-xs text-slate-500">
            Password history is temporary and clears when you refresh.
          </p>
        </div>
      </section>
    </main>
  );
}
