import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, Heart, DollarSign, Brain, Zap, Sparkles, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

const MANIFESTATION_PROGRAMS = [
  {
    id: 'abundance',
    name: 'Abundance & Prosperity',
    icon: DollarSign,
    color: '#FFD700',
    frequency: 528,
    description: 'Align with the frequency of love and abundance',
    affirmations: [
      'I am a magnet for abundance in all forms',
      'Money flows to me easily and effortlessly',
      'I deserve prosperity and success',
      'Opportunities for wealth present themselves to me'
    ],
    duration: 15,
  },
  {
    id: 'love',
    name: 'Love & Relationships',
    icon: Heart,
    color: '#48BB78',
    frequency: 639,
    description: 'Open your heart to love and meaningful connections',
    affirmations: [
      'I am worthy of deep, unconditional love',
      'I attract loving, supportive relationships',
      'My heart is open to giving and receiving love',
      'I radiate love and attract love in return'
    ],
    duration: 12,
  },
  {
    id: 'focus',
    name: 'Focus & Clarity',
    icon: Brain,
    color: '#4299E1',
    frequency: 741,
    description: 'Enhance mental clarity and concentration',
    affirmations: [
      'My mind is clear, focused, and sharp',
      'I easily concentrate on my goals',
      'I think clearly and make wise decisions',
      'My mental energy is powerful and directed'
    ],
    duration: 10,
  },
  {
    id: 'healing',
    name: 'Healing & Wellness',
    icon: Sparkles,
    color: '#9F7AEA',
    frequency: 528,
    description: 'Activate your body\'s natural healing abilities',
    affirmations: [
      'My body naturally heals and regenerates',
      'I am healthy, vibrant, and full of energy',
      'Every cell in my body radiates perfect health',
      'I choose thoughts that support my wellness'
    ],
    duration: 20,
  },
  {
    id: 'confidence',
    name: 'Confidence & Power',
    icon: Zap,
    color: '#FF8C00',
    frequency: 528,
    description: 'Unlock your inner strength and self-confidence',
    affirmations: [
      'I am confident, capable, and strong',
      'I trust in my abilities and talents',
      'I step into my power with grace and ease',
      'I believe in myself completely'
    ],
    duration: 15,
  },
  {
    id: 'peace',
    name: 'Inner Peace',
    icon: Moon,
    color: '#E2E8F0',
    frequency: 396,
    description: 'Release stress and find deep inner calm',
    affirmations: [
      'I am at peace with myself and the world',
      'Calm and serenity flow through me',
      'I release all worry and embrace tranquility',
      'My mind is peaceful and my heart is light'
    ],
    duration: 18,
  },
];

export function ManifestationMode() {
  const [selectedProgram, setSelectedProgram] = useState(MANIFESTATION_PROGRAMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSlideShowPlaying, setIsSlideShowPlaying] = useState(false);

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

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

  // Timer and affirmation cycling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let affirmationInterval: NodeJS.Timeout;

    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          const totalDuration = selectedProgram.duration * 60;
          setProgress(((totalDuration - newTime) / totalDuration) * 100);

          if (newTime <= 0) {
            stopSession();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      // Cycle through affirmations every 30 seconds
      affirmationInterval = setInterval(() => {
        setCurrentAffirmation(prev =>
          (prev + 1) % selectedProgram.affirmations.length
        );
      }, 30000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(affirmationInterval);
    };
  }, [isPlaying, timeRemaining, selectedProgram]);

  // Slideshow auto-cycling
  useEffect(() => {
    let slideShowInterval: NodeJS.Timeout;

    if (isSlideShowPlaying) {
      slideShowInterval = setInterval(() => {
        setCurrentAffirmation(prev =>
          (prev + 1) % selectedProgram.affirmations.length
        );
      }, 4000);
    }

    return () => {
      clearInterval(slideShowInterval);
    };
  }, [isSlideShowPlaying, selectedProgram]);

  const startManifestationSound = async () => {
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Stop any existing oscillator
    if (oscillator) {
      oscillator.stop();
    }

    // Create manifestation frequency (often includes subtle binaural beat)
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const leftPanner = audioContext.createStereoPanner();
    const rightPanner = audioContext.createStereoPanner();
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(selectedProgram.frequency, audioContext.currentTime);
    osc2.frequency.setValueAtTime(selectedProgram.frequency + 8, audioContext.currentTime); // 8Hz alpha waves
    
    leftPanner.pan.setValueAtTime(-0.5, audioContext.currentTime);
    rightPanner.pan.setValueAtTime(0.5, audioContext.currentTime);
    
    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
    
    osc1.connect(leftPanner);
    osc2.connect(rightPanner);
    leftPanner.connect(gain);
    rightPanner.connect(gain);
    gain.connect(audioContext.destination);
    
    osc1.start();
    osc2.start();
    
    setOscillator(osc1);
    setGainNode(gain);
  };

  const startSession = () => {
    setIsPlaying(true);
    setTimeRemaining(selectedProgram.duration * 60);
    setProgress(0);
    setCurrentAffirmation(0);
    startManifestationSound();
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

  const selectProgram = (program: typeof MANIFESTATION_PROGRAMS[0]) => {
    setSelectedProgram(program);
    setCurrentAffirmation(0);
    if (isPlaying) {
      stopSession();
    }
    if (isSlideShowPlaying) {
      setIsSlideShowPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const IconComponent = selectedProgram.icon;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Program Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MANIFESTATION_PROGRAMS.map((program) => {
          const ProgramIcon = program.icon;
          return (
            <Card
              key={program.id}
              className={`cursor-pointer transition-all duration-300 backdrop-blur-sm border-white/20 hover:scale-105 ${
                selectedProgram.id === program.id 
                  ? 'ring-2 ring-white/40 shadow-xl' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => selectProgram(program)}
              style={{
                background: selectedProgram.id === program.id 
                  ? `linear-gradient(135deg, ${program.color}20, ${program.color}10)`
                  : 'rgba(44, 83, 100, 0.3)'
              }}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${program.color}40` }}
                >
                  <ProgramIcon className="w-6 h-6" style={{ color: program.color }} />
                </div>
                <h3 className="font-medium mb-1">{program.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{program.frequency} Hz</p>
                <Badge variant="outline" className="text-xs">
                  {program.duration} min
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Session Interface */}
      <Card 
        className="backdrop-blur-sm border-white/20"
        style={{
          background: `linear-gradient(135deg, ${selectedProgram.color}15, ${selectedProgram.color}05)`
        }}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ 
                background: `radial-gradient(circle, ${selectedProgram.color}, ${selectedProgram.color}80)`,
                boxShadow: `0 0 ${isPlaying ? '30px' : '15px'} ${selectedProgram.color}40`,
                animation: isPlaying ? 'manifestationPulse 3s infinite' : 'none'
              }}
            >
              <IconComponent className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl" style={{ color: selectedProgram.color }}>
            {selectedProgram.name}
          </CardTitle>
          <p className="text-muted-foreground">{selectedProgram.description}</p>
          <Badge variant="outline" className="mx-auto">
            {selectedProgram.frequency} Hz • {selectedProgram.duration} minutes
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Affirmation */}
          <div className="text-center">
            <div 
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm"
              style={{ borderLeft: `4px solid ${selectedProgram.color}` }}
            >
              <p className="text-lg italic" style={{ color: selectedProgram.color }}>
                "{selectedProgram.affirmations[currentAffirmation]}"
              </p>
              <div className="mt-3 flex justify-center space-x-1">
                {selectedProgram.affirmations.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAffirmation 
                        ? 'opacity-100 scale-125' 
                        : 'opacity-40'
                    }`}
                    style={{ background: selectedProgram.color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress and Timer */}
          {isPlaying && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-mono mb-2">{formatTime(timeRemaining)}</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${selectedProgram.color}, ${selectedProgram.color}80)`
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Control Button */}
          <div className="flex justify-center">
            <Button
              onClick={isPlaying ? stopSession : startSession}
              size="lg"
              className="flex items-center gap-2 px-8"
              style={{ 
                background: selectedProgram.color,
                color: 'white'
              }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Stop' : 'Start'} Manifestation
            </Button>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes manifestationPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          33% { 
            transform: scale(1.05); 
            opacity: 0.9; 
          }
          66% { 
            transform: scale(0.95); 
            opacity: 0.8; 
          }
        }
      `}</style>
    </div>
  );
}
