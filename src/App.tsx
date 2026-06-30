import React, { useState } from "react";
import SearchTab from "./components/SearchTab";
import ReflectionsTab from "./components/ReflectionsTab";
import MeditationTab from "./components/MeditationTab";
import { playBowlChime } from "./utils/audio";
import { Compass, BookOpen, Heart, Eye, Sparkles } from "lucide-react";

type AppView = "search" | "reflections" | "meditation";

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("search");

  // Call the synthesized Tibetan singing bowl chime
  const handlePlayChime = () => {
    playBowlChime();
  };

  return (
    <div className="min-h-screen bg-sand text-charcoal font-sans flex flex-col justify-between selection:bg-stone-200">
      
      {/* 1. Header Navigation */}
      <header className="border-b border-border-clean bg-sand/80 backdrop-blur-md sticky top-0 z-50 px-8 py-5 flex items-center justify-between">
        <div 
          onClick={() => setActiveView("search")}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-serif italic text-xl tracking-tight text-slate-dark">
            Scribe & Spirit
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => setActiveView("search")}
            className={`text-sm font-medium transition-all duration-300 pb-1 cursor-pointer border-b-2 ${
              activeView === "search"
                ? "border-brand text-slate-dark"
                : "border-transparent text-slate-muted hover:text-slate-dark hover:border-slate-muted/40"
            }`}
            id="nav-tab-search"
          >
            Scriptures
          </button>
          <button
            onClick={() => setActiveView("reflections")}
            className={`text-sm font-medium transition-all duration-300 pb-1 cursor-pointer border-b-2 ${
              activeView === "reflections"
                ? "border-brand text-slate-dark"
                : "border-transparent text-slate-muted hover:text-slate-dark hover:border-slate-muted/40"
            }`}
            id="nav-tab-reflections"
          >
            Reflections
          </button>
          <button
            onClick={() => setActiveView("meditation")}
            className={`text-sm font-medium transition-all duration-300 pb-1 cursor-pointer border-b-2 ${
              activeView === "meditation"
                ? "border-brand text-slate-dark"
                : "border-transparent text-slate-muted hover:text-slate-dark hover:border-slate-muted/40"
            }`}
            id="nav-tab-meditation"
          >
            Meditation
          </button>
        </nav>
      </header>

      {/* 2. Main Content Stage */}
      <main className="flex-grow py-8 md:py-12">
        {activeView === "search" && (
          <SearchTab onPlayChime={handlePlayChime} />
        )}
        {activeView === "reflections" && (
          <ReflectionsTab onPlayChime={handlePlayChime} />
        )}
        {activeView === "meditation" && (
          <MeditationTab onPlayChime={handlePlayChime} />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-border-clean bg-white py-6 text-center text-slate-light font-sans text-xs flex flex-col sm:flex-row items-center justify-between px-8 gap-4">
        <div className="flex items-center gap-4">
          <span>Privacy Conscious</span>
          <span>Accessible Design (WCAG 2.1)</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Scribe & Spirit AI. Multi-Scriptural Intelligence.
        </div>
      </footer>

    </div>
  );
}
