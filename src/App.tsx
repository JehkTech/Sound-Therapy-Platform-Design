import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { FrequencyGenerator } from './components/FrequencyGenerator';
import { ChakraAlignment } from './components/ChakraAlignment';
import { ManifestationMode } from './components/ManifestationMode';
import { BreathingTimer } from './components/BreathingTimer';
import { Profile } from './components/Profile';
import { Vortex } from './components/Vortex';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Waves, Target, Wind, User, Sparkles, Palette, Sun, Moon } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle the dark class on the document element
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    } text-foreground`}>
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 w-48 h-48 ${
          isDarkMode ? 'bg-teal-500/10' : 'bg-teal-300/20'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* Theme Toggle Button */}
          <div className="absolute top-0 right-4 md:right-8">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 backdrop-blur-md border transition-all duration-300 ${
                isDarkMode 
                  ? 'border-white/30 hover:bg-white/10' 
                  : 'border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </Button>
          </div>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400'
              : 'bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600'
          } bg-clip-text text-transparent`}>
            Sound Therapy
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-muted-foreground' : 'text-slate-600'
          }`}>
            Align chakras, manifest intentions, and find inner peace through frequency-based healing
          </p>
        </div>

        {/* Main Navigation */}
        <Tabs defaultValue="frequency" className="space-y-10">
          <div className="flex justify-center mb-8">
            <TabsList className={`grid grid-cols-3 lg:grid-cols-6 gap-1 p-2 rounded-xl shadow-2xl h-20 backdrop-blur-md transition-all duration-300 ${
              isDarkMode 
                ? 'bg-card/60 border border-white/30' 
                : 'bg-white/80 border border-slate-200'
            }`}>
              <TabsTrigger value="frequency" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <Waves className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Frequency</span>
              </TabsTrigger>
              <TabsTrigger value="chakra" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <Palette className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Chakras</span>
              </TabsTrigger>
              <TabsTrigger value="manifestation" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <Target className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Manifest</span>
              </TabsTrigger>
              <TabsTrigger value="breathing" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <Wind className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Breathe</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="vortex" className={`flex flex-col items-center justify-center gap-1 px-3 py-2 h-full rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:border data-[state=active]:border-blue-400/50' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg'
              }`}>
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-none text-center">Vortex</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="frequency" className="space-y-6">
            <FrequencyGenerator />
          </TabsContent>

          <TabsContent value="chakra" className="space-y-6">
            <ChakraAlignment />
          </TabsContent>

          <TabsContent value="manifestation" className="space-y-6">
            <ManifestationMode />
          </TabsContent>

          <TabsContent value="breathing" className="space-y-6">
            <BreathingTimer />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Profile />
          </TabsContent>

          <TabsContent value="vortex" className="space-y-6">
            <Vortex />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center mt-20 mb-8">
          <div className="space-y-6">
            <div className={`w-24 h-px mx-auto ${
              isDarkMode 
                ? 'bg-gradient-to-r from-transparent via-purple-400/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'
            }`}></div>
            <p className={`text-sm ${
              isDarkMode ? 'text-muted-foreground' : 'text-slate-500'
            }`}>
              🌙 Align with the frequencies of the universe ✨
            </p>
            <div className={`text-xl font-light tracking-[0.2em] opacity-90 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400'
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600'
            } bg-clip-text text-transparent`}>
              by Lexoviac
            </div>
            <div className={`w-24 h-px mx-auto ${
              isDarkMode 
                ? 'bg-gradient-to-r from-transparent via-teal-400/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-teal-500/50 to-transparent'
            }`}></div>
          </div>
        </footer>
      </div>
    </div>
  );
}