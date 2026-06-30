import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Volume2, VolumeX, Eye, Info } from "lucide-react";

interface MeditationTabProps {
  onPlayChime: () => void;
}

type BreathPhase = "inhale" | "holdFull" | "exhale" | "holdEmpty";

interface BreathPattern {
  name: string;
  label: string;
  inhale: number;
  holdFull: number;
  exhale: number;
  holdEmpty: number;
  description: string;
}

const BREATH_PATTERNS: BreathPattern[] = [
  {
    name: "box",
    label: "Box Breathing (4-4-4-4)",
    inhale: 4,
    holdFull: 4,
    exhale: 4,
    holdEmpty: 4,
    description: "Ideal for clearing stress, resetting the nervous system, and achieving professional focus."
  },
  {
    name: "calming",
    label: "Calm Mind (4-2-4-2)",
    inhale: 4,
    holdFull: 2,
    exhale: 4,
    holdEmpty: 2,
    description: "A gentle, calming rhythm to soothe anxiety and restore standard focus."
  },
  {
    name: "deep",
    label: "Deep Rest (4-7-8)",
    inhale: 4,
    holdFull: 7,
    exhale: 8,
    holdEmpty: 0,
    description: "A traditional yogic technique (Pranayama) to trigger deep physiological rest and sleep."
  }
];

export default function MeditationTab({ onPlayChime }: MeditationTabProps) {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>(BREATH_PATTERNS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [secondsLeft, setSecondsLeft] = useState<number>(BREATH_PATTERNS[0].inhale);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop breathing loop when deactivated
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase("inhale");
      setSecondsLeft(selectedPattern.inhale);
      setCyclesCompleted(0);
      return;
    }

    // Trigger initial chime when starting
    if (soundEnabled) {
      onPlayChime();
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Time to transition to next phase!
          let nextPhase: BreathPhase = "inhale";
          let duration = selectedPattern.inhale;

          if (phase === "inhale") {
            if (selectedPattern.holdFull > 0) {
              nextPhase = "holdFull";
              duration = selectedPattern.holdFull;
            } else {
              nextPhase = "exhale";
              duration = selectedPattern.exhale;
            }
          } else if (phase === "holdFull") {
            nextPhase = "exhale";
            duration = selectedPattern.exhale;
          } else if (phase === "exhale") {
            if (selectedPattern.holdEmpty > 0) {
              nextPhase = "holdEmpty";
              duration = selectedPattern.holdEmpty;
            } else {
              nextPhase = "inhale";
              duration = selectedPattern.inhale;
              setCyclesCompleted((c) => c + 1);
            }
          } else if (phase === "holdEmpty") {
            nextPhase = "inhale";
            duration = selectedPattern.inhale;
            setCyclesCompleted((c) => c + 1);
          }

          setPhase(nextPhase);
          if (soundEnabled) {
            onPlayChime(); // Play Tibetan bowl chime on phase transition
          }
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, selectedPattern, soundEnabled]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handlePatternChange = (pattern: BreathPattern) => {
    if (isActive) setIsActive(false);
    setSelectedPattern(pattern);
    setPhase("inhale");
    setSecondsLeft(pattern.inhale);
    setCyclesCompleted(0);
  };

  // Compute ring dimensions based on breathing state
  const getCircleScale = () => {
    if (!isActive) return "scale-50";
    
    switch (phase) {
      case "inhale":
        // Gradually expanding: interpolate based on time elapsed
        const totalIn = selectedPattern.inhale;
        const progressIn = (totalIn - secondsLeft) / totalIn;
        const scaleIn = 0.5 + progressIn * 0.7; // From 0.5 to 1.2
        return `scale-[${scaleIn.toFixed(2)}]`;
      case "holdFull":
        return "scale-120";
      case "exhale":
        // Gradually contracting: interpolate based on time elapsed
        const totalOut = selectedPattern.exhale;
        const progressOut = (totalOut - secondsLeft) / totalOut;
        const scaleOut = 1.2 - progressOut * 0.7; // From 1.2 to 0.5
        return `scale-[${scaleOut.toFixed(2)}]`;
      case "holdEmpty":
        return "scale-50";
      default:
        return "scale-50";
    }
  };

  const getPhaseConfig = () => {
    switch (phase) {
      case "inhale":
        return {
          text: "Breathe In",
          description: "Expand your lungs gently, matching the circle.",
          color: "border-stone-400 bg-stone-100",
          textColor: "text-slate-dark"
        };
      case "holdFull":
        return {
          text: "Hold Breath",
          description: "Rest in the fullness of your chest, calm and quiet.",
          color: "border-stone-550 bg-stone-200/50",
          textColor: "text-slate-dark font-medium"
        };
      case "exhale":
        return {
          text: "Breathe Out",
          description: "Release all tension, let the breath dissolve.",
          color: "border-stone-300 bg-stone-50/20",
          textColor: "text-slate-muted"
        };
      case "holdEmpty":
        return {
          text: "Hold Empty",
          description: "Be still in the empty space before the next breath.",
          color: "border-stone-200 bg-stone-100/10",
          textColor: "text-slate-light"
        };
    }
  };

  const phaseDetails = getPhaseConfig();

  // For visual transition syncing, compute custom width percentages or sizes
  const getInlineScaleStyle = () => {
    if (!isActive) return { transform: "scale(0.55)" };
    
    let scaleVal = 0.55;
    if (phase === "inhale") {
      const elapsed = selectedPattern.inhale - secondsLeft;
      const progress = elapsed / selectedPattern.inhale;
      scaleVal = 0.55 + progress * 0.65; // smoothly rise to 1.2
    } else if (phase === "holdFull") {
      scaleVal = 1.2;
    } else if (phase === "exhale") {
      const elapsed = selectedPattern.exhale - secondsLeft;
      const progress = elapsed / selectedPattern.exhale;
      scaleVal = 1.2 - progress * 0.65; // smoothly sink to 0.55
    } else if (phase === "holdEmpty") {
      scaleVal = 0.55;
    }
    
    return {
      transform: `scale(${scaleVal})`,
      transition: "transform 1000ms linear"
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 animate-fade-in" id="meditation-tab">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-slate-dark tracking-tight mb-3">
          Meditation Space
        </h2>
        <p className="text-slate-muted max-w-lg mx-auto font-sans text-sm md:text-base">
          Anchor your awareness, balance your breath, and quiet the intellect.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-center mt-6">
        {/* Breathing Visualizer Stage (Left/Center) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center bg-white border border-border-clean rounded-2xl p-8 shadow-sm min-h-[460px] relative overflow-hidden">
          
          {/* Subtle background waves */}
          <div className="absolute inset-0 bg-radial-at-c from-stone-50/20 via-transparent to-transparent pointer-events-none" />

          {/* Audio toggle in visualizer */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-50 transition-all text-brand cursor-pointer"
            title={soundEnabled ? "Mute Bell" : "Enable Bell"}
            id="sound-toggle-btn"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* The Breathing Ring */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Pulsing outer glow */}
            <div 
              className="absolute w-64 h-64 rounded-full border border-brand/20 bg-brand/5 transition-all duration-1000"
              style={{
                transform: `scale(${isActive ? (phase === "inhale" || phase === "holdFull" ? 1.4 : 0.8) : 0.7})`,
                opacity: isActive ? 0.3 : 0.1
              }}
            />

            {/* Core expanding/contracting ring */}
            <div
              className={`w-44 h-44 rounded-full border border-brand flex flex-col items-center justify-center transition-all duration-1000 bg-white shadow-inner`}
              style={getInlineScaleStyle()}
              id="breathing-circle"
            >
              {/* Inner ambient shadow circle */}
              <div className="w-36 h-36 rounded-full bg-stone-50/80 flex flex-col items-center justify-center shadow-inner">
                <span className="font-mono text-3xl font-light text-slate-dark">
                  {secondsLeft}s
                </span>
                {isActive && (
                  <span className="text-[10px] font-mono tracking-widest text-slate-light uppercase mt-1">
                    {phase === "holdFull" || phase === "holdEmpty" ? "Hold" : phase}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Guided Text Prompt */}
          <div className="text-center mt-6 z-10">
            <h3 className={`font-serif text-2xl ${phaseDetails.textColor} transition-all duration-300 mb-1`}>
              {isActive ? phaseDetails.text : "Prepared to Begin"}
            </h3>
            <p className="text-slate-muted text-xs md:text-sm font-sans max-w-sm px-4 h-10 leading-relaxed">
              {isActive ? phaseDetails.description : "Select a breathing pattern on the right and click Seek Center."}
            </p>
          </div>

          {/* Controller button */}
          <button
            onClick={handleStartStop}
            className={`mt-6 px-8 py-3 rounded-xl text-sm font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md ${
              isActive
                ? "bg-white hover:bg-stone-50 text-slate-dark border border-border-clean"
                : "bg-brand hover:bg-slate-dark text-white"
            }`}
            id="start-meditation-btn"
          >
            {isActive ? (
              <>
                <Square className="w-4 h-4 fill-slate-dark text-slate-dark" />
                End Session
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white text-white" />
                Seek Center
              </>
            )}
          </button>

          {/* Cycle count indicator */}
          {cyclesCompleted > 0 && (
            <div className="absolute bottom-4 text-[10px] font-mono uppercase tracking-widest text-slate-light animate-fade-in">
              Cycles Completed: {cyclesCompleted}
            </div>
          )}
        </div>

        {/* Pattern Selector / Explanation (Right) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-border-clean rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-muted">
              <Eye className="w-4 h-4 text-brand" />
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-slate-dark">
                Select Breathing Technique
              </h4>
            </div>

            <div className="space-y-3">
              {BREATH_PATTERNS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handlePatternChange(p)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    selectedPattern.name === p.name
                      ? "bg-stone-50 border-brand shadow-sm"
                      : "bg-transparent border-stone-50 hover:border-border-clean hover:bg-stone-50/30"
                  }`}
                  id={`pattern-btn-${p.name}`}
                >
                  <div className="font-serif text-base text-slate-dark font-normal mb-1">
                    {p.label}
                  </div>
                  <p className="text-slate-muted text-xs font-sans leading-relaxed">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border-clean rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-sans font-semibold text-slate-dark text-sm">
                  Benefits of Guided Breathing
                </h4>
                <p className="text-slate-muted text-xs font-sans leading-relaxed">
                  Box Breathing is utilized by medical professionals, yogis, and tactical specialists to shut down fight-or-flight triggers immediately. 
                </p>
                <p className="text-slate-muted text-xs font-sans leading-relaxed">
                  By matching the expansion of your lungs to the visual guide and breathing through the nose, you increase vagal nerve tone, slow your heart rate, and clear mental clutter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
