import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Play, Pause, SkipForward } from 'lucide-react';

const CHAKRAS = [
  {
    name: 'Root Chakra',
    sanskrit: 'Muladhara',
    frequency: 396,
    color: '#C53030',
    description: 'Grounding, stability, survival',
    affirmation: 'I am safe, grounded, and secure',
  },
  {
    name: 'Sacral Chakra',
    sanskrit: 'Svadhisthana',
    frequency: 417,
    color: '#FF8C00',
    description: 'Creativity, sexuality, emotions',
    affirmation: 'I embrace my creative power',
  },
  {
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    frequency: 528,
    color: '#FFD700',
    description: 'Personal power, confidence',
    affirmation: 'I am confident and powerful',
  },
  {
    name: 'Heart Chakra',
    sanskrit: 'Anahata',
    frequency: 639,
    color: '#48BB78',
    description: 'Love, compassion, connection',
    affirmation: 'I give and receive love freely',
  },
  {
    name: 'Throat Chakra',
    sanskrit: 'Vishuddha',
    frequency: 741,
    color: '#4299E1',
    description: 'Communication, truth, expression',
    affirmation: 'I speak my truth with clarity',
  },
  {
    name: 'Third Eye',
    sanskrit: 'Ajna',
    frequency: 852,
    color: '#553C9A',
    description: 'Intuition, wisdom, insight',
    affirmation: 'I trust my inner wisdom',
  },
  {
    name: 'Crown Chakra',
    sanskrit: 'Sahasrara',
    frequency: 963,
    color: '#9F7AEA',
    description: 'Spiritual connection, enlightenment',
    affirmation: 'I am connected to divine wisdom',
  },
];

export function ChakraAlignment() {
  const [currentChakra, setCurrentChakra] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionLength] = useState(5 * 60); // 5 minutes per chakra
  
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  const chakra = CHAKRAS[currentChakra];

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

  // Timer and progress effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          setProgress(((sessionLength - newTime) / sessionLength) * 100);
          
          if (newTime <= 0) {
            if (currentChakra < CHAKRAS.length - 1) {
              setCurrentChakra(prev => prev + 1);
              return sessionLength;
            } else {
              stopSession();
              return 0;
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, currentChakra, sessionLength]);

  const startChakraSound = async () => {
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Stop any existing oscillator
    if (oscillator) {
      oscillator.stop();
    }

    // Create new oscillator and gain node
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(chakra.frequency, audioContext.currentTime);
    
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start();
    
    setOscillator(osc);
    setGainNode(gain);
  };

  const startSession = () => {
    setIsPlaying(true);
    setTimeRemaining(sessionLength);
    setProgress(0);
    startChakraSound();
  };

  const stopSession = () => {
    setIsPlaying(false);
    setTimeRemaining(0);
    setProgress(0);
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
  };

  const nextChakra = () => {
    if (currentChakra < CHAKRAS.length - 1) {
      setCurrentChakra(prev => prev + 1);
      if (isPlaying) {
        setTimeRemaining(sessionLength);
        setProgress(0);
        startChakraSound();
      }
    }
  };

  const selectChakra = (index: number) => {
    setCurrentChakra(index);
    if (isPlaying) {
      setTimeRemaining(sessionLength);
      setProgress(0);
      startChakraSound();
    }
  };

  // Update frequency when chakra changes
  useEffect(() => {
    if (isPlaying && oscillator && audioContext) {
      startChakraSound();
    }
  }, [currentChakra]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Chakra Display */}
      <Card 
        className="backdrop-blur-sm border-white/20 transition-all duration-1000"
        style={{ 
          background: `linear-gradient(135deg, ${chakra.color}15, ${chakra.color}05)`,
          borderColor: `${chakra.color}40`
        }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl" style={{ color: chakra.color }}>
            {chakra.name}
          </CardTitle>
          <p className="text-xl text-muted-foreground">{chakra.sanskrit}</p>
          <p className="text-lg">{chakra.frequency} Hz</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Chakra Visualization */}
          <div className="flex justify-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000"
              style={{ 
                background: `radial-gradient(circle, ${chakra.color}, ${chakra.color}80)`,
                boxShadow: `0 0 ${isPlaying ? '40px' : '20px'} ${chakra.color}60`,
                transform: `scale(${isPlaying ? 1.1 : 1})`,
              }}
            >
              <div 
                className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white"
                style={{ 
                  animation: isPlaying ? 'pulse 2s infinite' : 'none'
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>

          {/* Description and Affirmation */}
          <div className="text-center space-y-4">
            <p className="text-lg">{chakra.description}</p>
            <div className="p-4 rounded-lg bg-white/10">
              <p className="italic text-lg" style={{ color: chakra.color }}>
                "{chakra.affirmation}"
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{formatTime(timeRemaining)}</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2"
                style={{ 
                  background: `${chakra.color}20`
                }}
              />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={isPlaying ? stopSession : startSession}
              size="lg"
              className="flex items-center gap-2"
              style={{ 
                background: chakra.color,
                color: 'white'
              }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop' : 'Start'} Alignment
            </Button>
            
            {currentChakra < CHAKRAS.length - 1 && (
              <Button
                onClick={nextChakra}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                Next Chakra
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chakra Selector */}
      <Card className="backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-center">Select Chakra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {CHAKRAS.map((c, index) => (
              <button
                key={index}
                onClick={() => selectChakra(index)}
                className={`p-3 rounded-lg text-center transition-all duration-300 ${
                  index === currentChakra 
                    ? 'scale-110 shadow-lg' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ 
                  background: `linear-gradient(135deg, ${c.color}, ${c.color}80)`,
                  color: 'white',
                  border: index === currentChakra ? `2px solid ${c.color}` : 'none'
                }}
              >
                <div className="text-sm font-medium">{c.name.split(' ')[0]}</div>
                <div className="text-xs">{c.frequency}Hz</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}