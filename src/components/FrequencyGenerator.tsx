import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Play, Pause, Volume2 } from 'lucide-react';

// Solfeggio frequencies for healing
const SOLFEGGIO_FREQUENCIES = {
  '174 Hz': 174, // Pain Relief
  '285 Hz': 285, // Tissue Healing
  '396 Hz': 396, // Fear & Guilt Release
  '417 Hz': 417, // Change & Transformation
  '528 Hz': 528, // Love & Miracles
  '639 Hz': 639, // Relationships & Connection
  '741 Hz': 741, // Intuition & Expression
  '852 Hz': 852, // Spiritual Awakening
  '963 Hz': 963, // Divine Connection
};

export function FrequencyGenerator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(528);
  const [volume, setVolume] = useState([0.3]);
  const [mode, setMode] = useState<'single' | 'binaural'>('single');
  const [beatFrequency, setBeatFrequency] = useState([10]);
  const [sessionLength, setSessionLength] = useState([15]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator1, setOscillator1] = useState<OscillatorNode | null>(null);
  const [oscillator2, setOscillator2] = useState<OscillatorNode | null>(null);
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

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopAudio();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const createOscillator = useCallback((freq: number, ctx: AudioContext, gain: GainNode) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(gain);
    return osc;
  }, []);

  const startAudio = useCallback(async () => {
    if (!audioContext) return;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Create gain node for volume control
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(volume[0], audioContext.currentTime);
    gain.connect(audioContext.destination);
    setGainNode(gain);

    if (mode === 'single') {
      // Single frequency mode
      const osc = createOscillator(frequency, audioContext, gain);
      osc.start();
      setOscillator1(osc);
    } else {
      // Binaural beats mode
      const leftOsc = createOscillator(frequency, audioContext, gain);
      const rightOsc = createOscillator(frequency + beatFrequency[0], audioContext, gain);
      
      // Create stereo panner for left/right separation
      const leftPanner = audioContext.createStereoPanner();
      const rightPanner = audioContext.createStereoPanner();
      
      leftPanner.pan.setValueAtTime(-1, audioContext.currentTime);
      rightPanner.pan.setValueAtTime(1, audioContext.currentTime);
      
      leftOsc.disconnect();
      rightOsc.disconnect();
      
      leftOsc.connect(leftPanner);
      rightOsc.connect(rightPanner);
      
      leftPanner.connect(gain);
      rightPanner.connect(gain);
      
      leftOsc.start();
      rightOsc.start();
      
      setOscillator1(leftOsc);
      setOscillator2(rightOsc);
    }

    setTimeRemaining(sessionLength[0] * 60);
    setIsPlaying(true);
  }, [audioContext, frequency, volume, mode, beatFrequency, sessionLength, createOscillator]);

  const stopAudio = useCallback(() => {
    if (oscillator1) {
      oscillator1.stop();
      setOscillator1(null);
    }
    if (oscillator2) {
      oscillator2.stop();
      setOscillator2(null);
    }
    setIsPlaying(false);
    setTimeRemaining(0);
  }, [oscillator1, oscillator2]);

  // Update volume in real-time
  useEffect(() => {
    if (gainNode) {
      gainNode.gain.setValueAtTime(volume[0], audioContext!.currentTime);
    }
  }, [volume, gainNode, audioContext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Frequency Generator
        </CardTitle>
        <p className="text-muted-foreground">Generate healing tones and binaural beats</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="space-y-2">
          <label>Mode</label>
          <Select value={mode} onValueChange={(value: 'single' | 'binaural') => setMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Tone</SelectItem>
              <SelectItem value="binaural">Binaural Beats</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Frequency Selection */}
        <div className="space-y-2">
          <label>Frequency</label>
          <Select value={frequency.toString()} onValueChange={(value) => setFrequency(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SOLFEGGIO_FREQUENCIES).map(([name, freq]) => (
                <SelectItem key={freq} value={freq.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Binaural Beat Frequency */}
        {mode === 'binaural' && (
          <div className="space-y-2">
            <label>Beat Frequency: {beatFrequency[0]} Hz</label>
            <Slider
              value={beatFrequency}
              onValueChange={setBeatFrequency}
              max={40}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {/* Volume Control */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Volume: {Math.round(volume[0] * 100)}%
          </label>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* Session Length */}
        <div className="space-y-2">
          <label>Session Length: {sessionLength[0]} minutes</label>
          <Slider
            value={sessionLength}
            onValueChange={setSessionLength}
            max={60}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Timer Display */}
        {timeRemaining > 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
            <div className="text-3xl font-mono">{formatTime(timeRemaining)}</div>
            <div className="text-sm text-muted-foreground">Time Remaining</div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={isPlaying ? stopAudio : startAudio}
            size="lg"
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Stop' : 'Start'} Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}