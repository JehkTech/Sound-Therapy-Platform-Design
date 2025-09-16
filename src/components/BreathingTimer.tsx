import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Play, Pause, Wind } from 'lucide-react';

const BREATHING_PATTERNS = {
  '4-4-4-4': { name: 'Box Breathing', inhale: 4, hold1: 4, exhale: 4, hold2: 4, description: 'Equal timing for balance' },
  '4-7-8': { name: '4-7-8 Relaxation', inhale: 4, hold1: 7, exhale: 8, hold2: 0, description: 'Deep relaxation technique' },
  '6-2-6-2': { name: 'Calm Focus', inhale: 6, hold1: 2, exhale: 6, hold2: 2, description: 'Gentle and calming' },
  '4-4-6-2': { name: 'Stress Relief', inhale: 4, hold1: 4, exhale: 6, hold2: 2, description: 'Extended exhale for calm' },
  '5-5-5-5': { name: 'Extended Box', inhale: 5, hold1: 5, exhale: 5, hold2: 5, description: 'Longer box breathing' },
};

export function BreathingTimer() {
  const [selectedPattern, setSelectedPattern] = useState('4-4-4-4');
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [targetCycles, setTargetCycles] = useState([10]);
  const [frequency, setFrequency] = useState([528]);
  
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const pattern = BREATHING_PATTERNS[selectedPattern as keyof typeof BREATHING_PATTERNS];

  // Initialize audio context
  useEffect(() => {
    const initAudio = async () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    };
    initAudio();
  }, []);

  // Breathing timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setPhaseTime(prev => {
          const currentPhaseDuration = pattern[currentPhase];
          
          if (prev >= currentPhaseDuration) {
            // Move to next phase
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold1');
            } else if (currentPhase === 'hold1') {
              setCurrentPhase('exhale');
            } else if (currentPhase === 'exhale') {
              setCurrentPhase('hold2');
            } else if (currentPhase === 'hold2') {
              setCurrentPhase('inhale');
              setCycles(prevCycles => {
                const newCycles = prevCycles + 1;
                if (newCycles >= targetCycles[0]) {
                  setIsActive(false);
                  stopBreathingSound();
                }
                return newCycles;
              });
            }
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase, pattern, targetCycles]);

  const startBreathingSound = async () => {
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Stop any existing oscillator
    if (oscillator) {
      oscillator.stop();
    }

    // Create gentle breathing tone
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency[0], audioContext.currentTime);
    
    // Very gentle volume that fluctuates with breathing
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start();
    
    setOscillator(osc);
    setGainNode(gain);
  };

  const stopBreathingSound = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
  };

  // Modulate sound based on breathing phase
  useEffect(() => {
    if (gainNode && audioContext && isActive) {
      let targetVolume = 0.05;
      
      if (currentPhase === 'inhale') {
        targetVolume = 0.08; // Slightly louder on inhale
      } else if (currentPhase === 'exhale') {
        targetVolume = 0.03; // Quieter on exhale
      } else {
        targetVolume = 0.05; // Hold phases
      }
      
      gainNode.gain.linearRampToValueAtTime(targetVolume, audioContext.currentTime + 0.5);
    }
  }, [currentPhase, gainNode, audioContext, isActive]);

  const startBreathing = () => {
    setIsActive(true);
    setCycles(0);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    startBreathingSound();
  };

  const stopBreathing = () => {
    setIsActive(false);
    setCycles(0);
    setCurrentPhase('inhale');
    setPhaseTime(0);
    stopBreathingSound();
  };

  const getPhaseProgress = () => {
    const totalDuration = pattern[currentPhase];
    return Math.min((phaseTime / totalDuration) * 100, 100);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
    }
  };

  const getBreathingCircleScale = () => {
    const progress = getPhaseProgress() / 100;
    if (currentPhase === 'inhale') {
      return 1 + (progress * 0.5); // Grow during inhale
    } else if (currentPhase === 'exhale') {
      return 1.5 - (progress * 0.5); // Shrink during exhale
    }
    return currentPhase === 'hold1' ? 1.5 : 1; // Hold at max or min
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Pattern Selection */}
      <Card className="backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center">Breathing Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(BREATHING_PATTERNS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => setSelectedPattern(key)}
                className={`p-3 rounded-lg text-left transition-all duration-300 ${
                  selectedPattern === key
                    ? 'bg-blue-500/30 border-blue-400 border-2'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                }`}
              >
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">{key}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Breathing Interface */}
      <Card className="backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Guided Breathing
          </CardTitle>
          <p className="text-muted-foreground">{pattern.name} • {pattern.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Breathing Visualization */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer ring */}
              <div 
                className="w-64 h-64 rounded-full border-4 border-blue-400/30 flex items-center justify-center transition-all duration-500"
                style={{
                  background: `radial-gradient(circle, rgba(66, 153, 225, 0.1), transparent 70%)`,
                }}
              >
                {/* Inner breathing circle */}
                <div 
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white transition-transform duration-1000 ease-in-out shadow-2xl"
                  style={{
                    transform: `scale(${getBreathingCircleScale()})`,
                    boxShadow: `0 0 ${isActive ? '40px' : '20px'} rgba(66, 153, 225, 0.6)`,
                  }}
                >
                  <div className="text-center">
                    <Wind className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{getPhaseInstruction()}</div>
                  </div>
                </div>
              </div>
              
              {/* Progress ring */}
              {isActive && (
                <svg className="absolute top-0 left-0 w-64 h-64 -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="124"
                    fill="none"
                    stroke="rgba(66, 153, 225, 0.8)"
                    strokeWidth="4"
                    strokeDasharray={`${(getPhaseProgress() / 100) * 779.38} 779.38`}
                    className="transition-all duration-100"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Phase Info */}
          {isActive && (
            <div className="text-center space-y-2">
              <div className="text-3xl font-mono">
                {Math.ceil(pattern[currentPhase] - phaseTime)}s
              </div>
              <div className="text-lg">{getPhaseInstruction()}</div>
              <div className="text-sm text-muted-foreground">
                Cycle {cycles} of {targetCycles[0]}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label>Number of Cycles: {targetCycles[0]}</label>
              <Slider
                value={targetCycles}
                onValueChange={setTargetCycles}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label>Background Frequency: {frequency[0]} Hz</label>
              <Slider
                value={frequency}
                onValueChange={setFrequency}
                max={1000}
                min={100}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Control Button */}
          <div className="flex justify-center">
            <Button
              onClick={isActive ? stopBreathing : startBreathing}
              size="lg"
              className="flex items-center gap-2 px-8"
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isActive ? 'Stop' : 'Start'} Breathing Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}