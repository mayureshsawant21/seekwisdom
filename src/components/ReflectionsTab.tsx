import React, { useState, useEffect } from "react";
import { DailyReflection } from "../types";
import { DAILY_REFLECTIONS } from "../precompiledData";
import { Sparkles, MessageSquare, Save, Trash2, Check, BookOpen } from "lucide-react";

interface ReflectionsTabProps {
  onPlayChime: () => void;
}

interface SavedJournalEntry {
  date: string;
  theme: string;
  quote: string;
  source: string;
  entry: string;
}

const EMOTION_PILLS = [
  { emoji: "🌊", label: "Anxious", query: "anxious" },
  { emoji: "⌛", label: "Impatient", query: "impatient" },
  { emoji: "⚡", label: "Overwhelmed", query: "overwhelmed" },
  { emoji: "🍂", label: "Grieving & Sad", query: "grieving" },
  { emoji: "☀️", label: "Grateful", query: "grateful" },
  { emoji: "❓", label: "Confused", query: "confused" },
  { emoji: "🛡️", label: "Fearful", query: "fearful" },
  { emoji: "🔥", label: "Angry", query: "angry" }
];

export default function ReflectionsTab({ onPlayChime }: ReflectionsTabProps) {
  const [reflection, setReflection] = useState<DailyReflection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const [journalText, setJournalText] = useState<string>("");
  const [savedEntries, setSavedEntries] = useState<SavedJournalEntry[]>([]);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Load initial daily reflection and saved journal entries
  useEffect(() => {
    fetchReflection("");
    const stored = localStorage.getItem("spiritual_journal");
    if (stored) {
      try {
        setSavedEntries(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const fetchReflection = async (emotion: string) => {
    setLoading(true);
    setSelectedEmotion(emotion);
    setJournalText("");
    
    let resultReflection: DailyReflection | null = null;
    try {
      const response = await fetch("/api/daily-reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emotion }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.reflection) {
          resultReflection = data.reflection;
        }
      }
    } catch (e) {
      console.warn("API unavailable, falling back to local daily reflections:", e);
    }

    if (!resultReflection) {
      // Map chosen emotion to best fitting theme
      let targetThemes: string[] = [];
      const lower = emotion.toLowerCase();
      
      if (lower === "impatient") {
        targetThemes = ["Patience", "Equanimity"];
      } else if (lower === "anxious" || lower === "overwhelmed" || lower === "fearful") {
        targetThemes = ["Peace", "Mindfulness", "Equanimity"];
      } else if (lower === "angry") {
        targetThemes = ["Humility", "Patience"];
      } else if (lower === "grateful") {
        targetThemes = ["Love & Charity", "Peace"];
      } else if (lower === "grieving" || lower === "confused") {
        targetThemes = ["Mindfulness", "Equanimity", "Peace"];
      }

      let matches = DAILY_REFLECTIONS.filter((r) => targetThemes.includes(r.theme));
      if (matches.length === 0) {
        matches = [...DAILY_REFLECTIONS];
      }
      
      // Select a random matching reflection
      const randomSel = matches[Math.floor(Math.random() * matches.length)];
      resultReflection = randomSel ? { ...randomSel } : null;
    }

    if (resultReflection) {
      setReflection(resultReflection);
    }
    setLoading(false);
  };

  const handleSaveJournal = () => {
    if (!reflection || !journalText.trim()) return;

    onPlayChime(); // Play the warm chime on save
    const newEntry: SavedJournalEntry = {
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      theme: reflection.theme,
      quote: reflection.quote,
      source: reflection.source,
      entry: journalText
    };

    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    localStorage.setItem("spiritual_journal", JSON.stringify(updated));
    setJournalText("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteEntry = (index: number) => {
    const updated = savedEntries.filter((_, idx) => idx !== index);
    setSavedEntries(updated);
    localStorage.setItem("spiritual_journal", JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 animate-fade-in" id="reflections-tab">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-slate-dark tracking-tight mb-3">
          Daily Reflections
        </h2>
        <p className="text-slate-muted max-w-lg mx-auto font-sans text-sm md:text-base">
          Receive scripture tailored specifically to your state of mind. Pause, read, and put down your thoughts.
        </p>
      </div>

      {/* Mood Selector Section */}
      <div className="mb-10 bg-white border border-border-clean rounded-2xl p-6 shadow-sm">
        <h3 className="font-sans font-medium text-sm text-slate-muted uppercase tracking-wider mb-4 text-center">
          What is your soul navigating today?
        </h3>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          <button
            onClick={() => fetchReflection("")}
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 border ${
              selectedEmotion === ""
                ? "bg-brand text-white border-brand shadow-sm"
                : "bg-white hover:bg-stone-50 text-slate-muted border-border-clean"
            }`}
            id="emotion-pill-random"
          >
            ☀️ Standard Reflection
          </button>
          {EMOTION_PILLS.map((pill) => (
            <button
              key={pill.query}
              onClick={() => fetchReflection(pill.query)}
              className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 border ${
                selectedEmotion === pill.query
                  ? "bg-brand text-white border-brand shadow-sm"
                  : "bg-white hover:bg-stone-50 text-slate-muted border-border-clean"
              }`}
              id={`emotion-pill-${pill.query}`}
            >
              <span className="mr-1.5">{pill.emoji}</span>
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reflection Box */}
      <div className="relative min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20" id="reflection-loading">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-muted font-sans italic text-sm">Aligning timeless insights...</p>
          </div>
        ) : reflection ? (
          <div className="grid md:grid-cols-5 gap-8" id="reflection-content">
            {/* Reflection Card */}
            <div className="md:col-span-3 bg-white border border-border-clean rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-between transition-all hover:shadow-md duration-300">
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-stone-50 pb-3">
                  <span className="px-3 py-1 bg-stone-55 border border-border-clean text-slate-dark rounded-full text-xs font-mono tracking-wider font-semibold uppercase">
                    {reflection.theme}
                  </span>
                  <div className="flex items-center text-xs text-slate-light font-mono">
                    <BookOpen className="w-3.5 h-3.5 mr-1 text-brand" />
                    {reflection.source}
                  </div>
                </div>

                <blockquote className="relative pl-6 border-l-2 border-brand my-6">
                  <p className="font-serif italic text-lg md:text-xl text-slate-dark leading-relaxed">
                    &ldquo;{reflection.quote}&rdquo;
                  </p>
                  <cite className="block mt-3 text-xs font-mono text-slate-muted font-medium not-italic">
                    — {reflection.citation}
                  </cite>
                </blockquote>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-sans font-semibold text-xs text-slate-light uppercase tracking-wider mb-1.5">
                      Wisdom & Meaning
                    </h4>
                    <p className="font-sans text-slate-muted text-sm md:text-base leading-relaxed">
                      {reflection.meaning}
                    </p>
                  </div>

                  <div className="bg-stone-50/60 rounded-xl p-4 border border-border-clean mt-6">
                    <h4 className="font-serif italic text-sm text-slate-dark font-medium mb-1">
                      Journaling Contemplation
                    </h4>
                    <p className="font-sans text-slate-muted text-sm leading-relaxed">
                      {reflection.reflectionQuestion}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Journal Section */}
            <div className="md:col-span-2 bg-white border border-border-clean rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4.5 h-4.5 text-brand" />
                  <h3 className="font-sans font-semibold text-slate-dark text-base">
                    Contemplate & Capture
                  </h3>
                </div>
                <p className="text-slate-muted text-xs font-sans mb-4 leading-relaxed">
                  Write down how this teaching relates to your professional or personal thoughts today. Your journal entries remain entirely private, saved locally on your device.
                </p>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Record your thoughts here..."
                  className="w-full h-44 p-3 bg-stone-50/40 border border-border-clean rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand text-slate-dark resize-none placeholder:text-slate-light"
                  id="journal-textarea"
                />
              </div>

              <div className="mt-4">
                <button
                  onClick={handleSaveJournal}
                  disabled={!journalText.trim()}
                  className={`w-full py-2.5 px-4 rounded-xl text-sm font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    journalText.trim()
                      ? "bg-brand text-white hover:bg-slate-dark cursor-pointer shadow-sm"
                      : "bg-stone-100 text-slate-light cursor-not-allowed border border-border-clean"
                  }`}
                  id="save-journal-btn"
                >
                  <Save className="w-4 h-4" />
                  Save to Local Journal
                </button>
                {saveSuccess && (
                  <div className="text-emerald-700 text-xs font-sans font-medium text-center mt-2 flex items-center justify-center gap-1 animate-fade-in">
                    <Check className="w-3.5 h-3.5 animate-pulse" />
                    Saved with chime!
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Saved Journal Entries */}
      {savedEntries.length > 0 && (
        <div className="mt-16" id="journal-history">
          <h3 className="font-serif text-2xl text-slate-dark mb-6 border-b border-border-clean pb-3">
            My Reflective Journal
          </h3>
          <div className="space-y-4">
            {savedEntries.map((entry, idx) => (
              <div
                key={idx}
                className="bg-white border border-border-clean rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-4 animate-fade-in"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 border border-border-clean text-slate-muted rounded text-[10px] font-mono font-semibold uppercase">
                      {entry.theme}
                    </span>
                    <span className="text-[10px] font-mono text-slate-light">
                      {entry.source}
                    </span>
                    <span className="text-[10px] text-slate-light font-sans ml-auto md:ml-0">
                      {entry.date}
                    </span>
                  </div>
                  <p className="font-serif italic text-slate-muted text-xs leading-relaxed border-l border-brand pl-3 mb-2.5">
                    &ldquo;{entry.quote}&rdquo;
                  </p>
                  <p className="font-sans text-slate-dark text-sm whitespace-pre-wrap leading-relaxed">
                    {entry.entry}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEntry(idx)}
                  className="text-slate-light hover:text-red-600 p-1.5 rounded-lg hover:bg-stone-50 transition-all self-end md:self-start cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
