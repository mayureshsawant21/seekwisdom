import React, { useState, useEffect } from "react";
import { DilemmaResult, QuickTheme } from "../types";
import { QUICK_THEMES } from "../precompiledData";
import { Search, Compass, BookOpen, Clock, Heart, ChevronRight, HelpCircle, ArrowRight } from "lucide-react";

interface SearchTabProps {
  onPlayChime: () => void;
}

const LOADING_STEPS = [
  "Consulting the Bhagavad Gita...",
  "Reflecting on the Dhammapada (Buddhism)...",
  "Upholding the teachings of the Holy Bible...",
  "Searching Surahs in the Noble Quran...",
  "Synthesizing comparative spiritual ethics...",
  "Weaving common theological threads..."
];

export default function SearchTab({ onPlayChime }: SearchTabProps) {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState<number>(0);
  const [result, setResult] = useState<DilemmaResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"synthesis" | "compare">("synthesis");

  // Cycle loading steps to make wait times feel short, elegant and immersive
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1500);
    } else {
      setLoadingStepIdx(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  // Load search history from local storage
  useEffect(() => {
    const stored = localStorage.getItem("spiritual_search_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setQuery(searchQuery);
    
    try {
      const response = await fetch("/api/spiritual-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        onPlayChime(); // Play peaceful Tibetan singing bowl on load completion!
        
        // Save to search history
        const filteredHistory = history.filter((q) => q.toLowerCase() !== searchQuery.toLowerCase());
        const updatedHistory = [searchQuery, ...filteredHistory].slice(0, 5); // Keep last 5
        setHistory(updatedHistory);
        localStorage.setItem("spiritual_search_history", JSON.stringify(updatedHistory));
      }
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickThemeClick = (theme: QuickTheme) => {
    handleSearch(theme.label);
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
    localStorage.removeItem("spiritual_search_history");
  };

  // tradition styling mapping
  const getTraditionStyle = (tradition: string) => {
    const normalized = tradition.toLowerCase();
    if (normalized.includes("gita") || normalized.includes("hindu")) {
      return {
        bg: "bg-amber-50/50 hover:bg-amber-50/90",
        border: "border-amber-200/80",
        accent: "text-amber-800",
        badge: "bg-amber-100/80 text-amber-900 border-amber-200",
        line: "border-amber-500",
        iconColor: "text-amber-600"
      };
    } else if (normalized.includes("quran") || normalized.includes("islam")) {
      return {
        bg: "bg-emerald-50/50 hover:bg-emerald-50/90",
        border: "border-emerald-200/80",
        accent: "text-emerald-800",
        badge: "bg-emerald-100/80 text-emerald-900 border-emerald-200",
        line: "border-emerald-500",
        iconColor: "text-emerald-600"
      };
    } else if (normalized.includes("bible") || normalized.includes("christ")) {
      return {
        bg: "bg-indigo-50/50 hover:bg-indigo-50/90",
        border: "border-indigo-200/80",
        accent: "text-indigo-800",
        badge: "bg-indigo-100/80 text-indigo-900 border-indigo-200",
        line: "border-indigo-500",
        iconColor: "text-indigo-600"
      };
    } else {
      // Buddhism / Saffron
      return {
        bg: "bg-yellow-50/40 hover:bg-yellow-50/80",
        border: "border-yellow-200/80",
        accent: "text-yellow-800",
        badge: "bg-yellow-100/80 text-yellow-900 border-yellow-200",
        line: "border-yellow-500",
        iconColor: "text-yellow-600"
      };
    }
  };

  return (
    <div className="w-full px-8" id="search-tab-container">
      {/* 1. INITIAL LANDING SEARCH VIEW (Google-like) */}
      {!result && !loading ? (
        <div className="max-w-2xl mx-auto py-16 md:py-24 text-center animate-fade-in" id="landing-search">
          {/* Main Decorative Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-border-clean mb-6 shadow-sm">
              <Compass className="w-5 h-5 text-brand stroke-1.5" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-slate-dark tracking-tight mb-4 font-normal">
              Seek wisdom across the ages.
            </h1>
            <p className="text-slate-muted max-w-lg mx-auto font-sans text-sm md:text-base leading-relaxed">
              Resolve life and ethical dilemmas by receiving comparative, nuanced insights from the Bhagavad Gita, Holy Bible, Noble Quran, and Buddhism.
            </p>
          </div>

          {/* Core Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="relative mb-8"
            id="search-form-initial"
          >
            <div className="relative flex items-center bg-white border border-border-clean focus-within:ring-2 focus-within:ring-brand/10 focus-within:border-brand rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="pl-6 text-slate-muted">
                <Search className="w-5 h-5 stroke-2" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about a life or ethical dilemma (e.g. burnout, failure, integrity...)"
                className="w-full py-5 pl-4 pr-16 text-slate-dark placeholder:text-slate-light bg-transparent text-base md:text-lg focus:outline-none rounded-2xl"
                id="search-input-initial"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className={`absolute right-4 p-2.5 rounded-xl transition-all duration-300 ${
                  query.trim()
                    ? "bg-brand text-white hover:bg-slate-dark cursor-pointer shadow-sm"
                    : "bg-stone-100 text-slate-light cursor-not-allowed"
                }`}
                id="search-btn-initial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Quick Themes */}
          <div className="mb-8" id="quick-themes">
            <div className="flex flex-wrap justify-center items-center gap-2.5">
              <span className="text-[10px] uppercase tracking-widest text-slate-light font-bold mr-2">Trending:</span>
              {QUICK_THEMES.map((theme) => (
                <button
                  key={theme.query}
                  onClick={() => handleQuickThemeClick(theme)}
                  className="px-4 py-1.5 bg-white hover:bg-stone-50 border border-border-clean rounded-full text-xs font-sans font-medium text-slate-muted hover:text-slate-dark transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  id={`quick-theme-${theme.query}`}
                >
                  <span>{theme.emoji}</span>
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {history.length > 0 && (
            <div className="border-t border-border-clean pt-6 mt-8 max-w-lg mx-auto text-left" id="search-history-box">
              <div className="flex items-center justify-between mb-3 text-xs font-sans text-slate-light uppercase font-bold tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recent Enquiries</span>
                </div>
                <button
                  onClick={clearHistory}
                  className="hover:text-slate-dark transition-colors text-[10px] cursor-pointer lowercase"
                >
                  Clear history
                </button>
              </div>
              <div className="space-y-1.5">
                {history.map((h, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(h)}
                    className="w-full text-left py-2 px-3 hover:bg-white border border-transparent hover:border-border-clean rounded-xl text-xs md:text-sm text-slate-muted hover:text-slate-dark transition-all font-sans flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate pr-4">{h}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-slate-dark transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* 2. LOADING STATE */}
      {loading && (
        <div className="max-w-xl mx-auto py-24 text-center animate-fade-in" id="search-loading">
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {/* Visual ambient ripple for calibration */}
            <div className="absolute inset-0 border border-brand/20 rounded-full animate-ping" />
            <div className="w-12 h-12 bg-white border border-border-clean rounded-full flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6 text-brand animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>
          <h2 className="font-serif italic text-xl md:text-2xl text-slate-dark mb-2">
            Synthesizing comparative wisdom...
          </h2>
          <p className="text-slate-muted font-sans text-xs md:text-sm font-medium animate-pulse">
            {LOADING_STEPS[loadingStepIdx]}
          </p>
        </div>
      )}

      {/* 3. DYNAMIC SEARCH RESULTS VIEW */}
      {result && !loading ? (
        <div className="max-w-6xl mx-auto py-6 animate-fade-in" id="search-results">
          
          {/* Minimized Header Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border-clean pb-5 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white border border-border-clean rounded-full flex items-center justify-center cursor-pointer shrink-0" onClick={() => { setResult(null); setQuery(""); }}>
                <Compass className="w-4.5 h-4.5 text-brand" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-dark line-clamp-1">
                  &ldquo;{result.query}&rdquo;
                </h2>
                <p className="text-slate-light font-sans text-[10px] uppercase tracking-wider font-bold">
                  Spiritual Comparison Result
                </p>
              </div>
            </div>

            {/* Minimized Search Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="w-full md:max-w-md relative"
              id="search-form-minimized"
            >
              <div className="relative flex items-center bg-white border border-border-clean focus-within:ring-2 focus-within:ring-brand/10 focus-within:border-brand rounded-xl shadow-xs">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask another question..."
                  className="w-full py-3 pl-4 pr-12 text-xs md:text-sm text-slate-dark placeholder:text-slate-light bg-transparent focus:outline-none rounded-xl"
                  id="search-input-minimized"
                />
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="absolute right-1.5 p-1.5 bg-brand hover:bg-slate-dark text-white rounded-lg transition-all cursor-pointer"
                  id="search-btn-minimized"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Universal Synthesis Card */}
          <div className="bg-white border border-border-clean rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-brand fill-stone-100" />
              <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-muted">
                Universal Spiritual Synthesis
              </h3>
            </div>

            <div className="border-l-2 border-brand pl-6 my-6">
              <p className="font-serif italic text-lg md:text-2xl text-slate-dark leading-relaxed font-normal">
                &ldquo;{result.synthesis.essence}&rdquo;
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-stone-100">
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-dark mb-2">
                  The Common Thread
                </h4>
                <p className="font-sans text-slate-muted text-sm md:text-base leading-relaxed">
                  {result.synthesis.commonalities}
                </p>
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-dark mb-2">
                  Nuances & Distinct Perspectives
                </h4>
                <p className="font-sans text-slate-muted text-sm md:text-base leading-relaxed">
                  {result.synthesis.distinctPerspectives}
                </p>
              </div>
            </div>
          </div>

          {/* Scripture Comparative Grid */}
          <h3 className="font-serif text-2xl text-slate-dark mb-6 border-b border-border-clean pb-3">
            The Teachings of the Holy Texts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="scripture-grid">
            {result.insights.map((insight) => {
              const style = getTraditionStyle(insight.tradition);
              return (
                <div
                  key={insight.id}
                  className={`bg-white border border-border-clean rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-brand/30`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-50">
                      <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-mono tracking-wider font-bold uppercase ${style.badge}`}>
                        {insight.tradition}
                      </span>
                      <span className="text-[9px] font-mono text-slate-light tracking-wider">
                        {insight.bookTitle}
                      </span>
                    </div>

                    <blockquote className={`relative border-l-2 pl-3.5 my-4 ${style.line}`}>
                      <p className="font-serif italic text-slate-dark text-sm leading-relaxed">
                        &ldquo;{insight.quote}&rdquo;
                      </p>
                      <cite className="block mt-1.5 text-[10px] font-mono text-slate-muted font-semibold not-italic">
                        — {insight.citation}
                      </cite>
                    </blockquote>

                    <div className="space-y-4 mt-4 pt-3 border-t border-stone-50">
                      <div>
                        <h5 className="font-sans font-bold text-[10px] text-slate-light uppercase tracking-widest mb-1.5">
                          Philosophical Frame
                        </h5>
                        <p className="font-sans text-slate-muted text-xs leading-relaxed">
                          {insight.philosophy}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-sans font-bold text-[10px] text-slate-light uppercase tracking-widest mb-1.5">
                          Actionable Guidance
                        </h5>
                        <p className="font-sans text-slate-muted text-xs leading-relaxed">
                          {insight.guidance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggested Unified Action Card */}
          <div className="bg-brand text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg shadow-brand/10 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-white/70">
                <HelpCircle className="w-4 h-4" />
                <span className="font-sans text-xs uppercase tracking-widest font-bold">
                  Suggested Action Step
                </span>
              </div>
              <h4 className="font-serif text-lg md:text-xl text-white leading-relaxed">
                {result.suggestedAction}
              </h4>
            </div>
            <button
              onClick={() => { setResult(null); setQuery(""); }}
              className="px-6 py-2.5 bg-white text-brand hover:bg-stone-50 rounded-xl font-sans font-semibold text-xs md:text-sm transition-all shrink-0 cursor-pointer shadow-sm"
            >
              Perform Search Again
            </button>
          </div>

          {/* Option to include more texts later */}
          <div className="text-center py-4 text-slate-light font-sans text-xs border-t border-border-clean">
            * Note: This search compares teachings from the Bhagavad Gita, Quran, Bible, and Buddhism. In future updates, options to toggle additional scriptures (such as the Tao Te Ching, Guru Granth Sahib, or Upanishads) will be supported.
          </div>

        </div>
      ) : null}
    </div>
  );
}
