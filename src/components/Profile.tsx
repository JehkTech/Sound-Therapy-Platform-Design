import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { User, Star, Calendar as CalendarIcon, Settings, TrendingUp, BookOpen, Edit, Save, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

const ZODIAC_SIGNS = [
  { 
    name: 'Aries', 
    dates: 'Mar 21 - Apr 19', 
    element: 'Fire', 
    traits: 'Bold, ambitious, energetic',
    animal: 'Ram',
    keyword: 'I AM',
    planet: 'Mars',
    bodyParts: 'Head'
  },
  { 
    name: 'Taurus', 
    dates: 'Apr 20 - May 20', 
    element: 'Earth', 
    traits: 'Reliable, patient, practical',
    animal: 'Bull',
    keyword: 'I HAVE',
    planet: 'Venus',
    bodyParts: 'Neck and throat'
  },
  { 
    name: 'Gemini', 
    dates: 'May 21 - Jun 20', 
    element: 'Air', 
    traits: 'Curious, adaptable, social',
    animal: 'Twins',
    keyword: 'I THINK',
    planet: 'Mercury',
    bodyParts: 'Lungs, arms, and shoulders'
  },
  { 
    name: 'Cancer', 
    dates: 'Jun 21 - Jul 22', 
    element: 'Water', 
    traits: 'Intuitive, caring, protective',
    animal: 'Crab',
    keyword: 'I FEEL',
    planet: 'Moon',
    bodyParts: 'Chest, breasts, and stomach'
  },
  { 
    name: 'Leo', 
    dates: 'Jul 23 - Aug 22', 
    element: 'Fire', 
    traits: 'Confident, creative, generous',
    animal: 'Lion',
    keyword: 'I WILL',
    planet: 'Sun',
    bodyParts: 'Heart and upper back'
  },
  { 
    name: 'Virgo', 
    dates: 'Aug 23 - Sep 22', 
    element: 'Earth', 
    traits: 'Analytical, helpful, perfectionist',
    animal: 'Virgin',
    keyword: 'I ANALYZE',
    planet: 'Mercury',
    bodyParts: 'Abdomen and digestive system'
  },
  { 
    name: 'Libra', 
    dates: 'Sep 23 - Oct 22', 
    element: 'Air', 
    traits: 'Balanced, diplomatic, artistic',
    animal: 'Scales',
    keyword: 'I BALANCE',
    planet: 'Venus',
    bodyParts: 'Kidneys and lumbar region'
  },
  { 
    name: 'Scorpio', 
    dates: 'Oct 23 - Nov 21', 
    element: 'Water', 
    traits: 'Intense, mysterious, transformative',
    animal: 'Scorpion',
    keyword: 'I DESIRE',
    planet: 'Mars',
    bodyParts: 'Genitals'
  },
  { 
    name: 'Sagittarius', 
    dates: 'Nov 22 - Dec 21', 
    element: 'Fire', 
    traits: 'Adventurous, philosophical, optimistic',
    animal: 'Archer',
    keyword: 'I UNDERSTAND',
    planet: 'Jupiter',
    bodyParts: 'Hips and thighs'
  },
  { 
    name: 'Capricorn', 
    dates: 'Dec 22 - Jan 19', 
    element: 'Earth', 
    traits: 'Ambitious, disciplined, responsible',
    animal: 'Goat',
    keyword: 'I USE',
    planet: 'Saturn',
    bodyParts: 'Knees and bones'
  },
  { 
    name: 'Aquarius', 
    dates: 'Jan 20 - Feb 18', 
    element: 'Air', 
    traits: 'Independent, innovative, humanitarian',
    animal: 'Water Bearer',
    keyword: 'I KNOW',
    planet: 'Saturn',
    bodyParts: 'Calves, shins'
  },
  { 
    name: 'Pisces', 
    dates: 'Feb 19 - Mar 20', 
    element: 'Water', 
    traits: 'Compassionate, artistic, intuitive',
    animal: 'Fishes',
    keyword: 'I BELIEVE',
    planet: 'Jupiter',
    bodyParts: 'Feet'
  },
];

export function Profile() {
  const [currentDate] = useState(new Date());

  const [profile, setProfile] = useState({
    name: 'Luna Star',
    username: '@lunastar',
    sunSign: 'Leo',
    moonSign: 'Pisces',
    rising: 'Scorpio',
    avatar: '',
    birthDate: null,
    birthTime: '',
    birthLocation: '',
  });

  const [stats] = useState({
    sessionsCompleted: 47,
    totalMinutes: 1247,
    favoriteFrequency: '528 Hz',
    streakDays: 12,
    vortexEntries: 23,
    lastSession: '2 hours ago',
  });

  const [editingRecommendations, setEditingRecommendations] = useState(false);
  const [customRecommendations, setCustomRecommendations] = useState({
    sun: "As a Leo, you radiate confidence and creativity. Try our Confidence & Power manifestation sessions to amplify your natural leadership abilities.",
    moon: "With your Pisces moon, you're deeply intuitive and emotional. Heart chakra alignment sessions can help you balance your empathetic nature.",
    rising: "Your Scorpio rising gives you magnetic intensity. Third eye chakra work can enhance your natural psychic abilities and intuition."
  });

  const getSunSign = () => ZODIAC_SIGNS.find(sign => sign.name === profile.sunSign);
  const getMoonSign = () => ZODIAC_SIGNS.find(sign => sign.name === profile.moonSign);
  const getRisingSign = () => ZODIAC_SIGNS.find(sign => sign.name === profile.rising);

  const getZodiacSignByDate = (date) => {
    if (!date) return null;
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Zodiac date ranges
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
    return null;
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get days from previous month to fill the grid
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const daysFromPrevMonth = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      daysFromPrevMonth.unshift(daysInPrevMonth - i);
    }

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Days from next month to fill the grid
    const totalCells = daysFromPrevMonth.length + currentMonthDays.length;
    const daysFromNextMonth = totalCells % 7 === 0
      ? []
      : Array.from({ length: 7 - (totalCells % 7) }, (_, i) => i + 1);

    return {
      prevMonthDays: daysFromPrevMonth,
      currentMonthDays,
      nextMonthDays: daysFromNextMonth,
      currentDay: currentDate.getDate(),
    };
  };

  const calendarData = generateCalendarDays();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });

  const handleDateChange = (date) => {
    const sunSign = getZodiacSignByDate(date);
    setProfile(prev => ({ 
      ...prev, 
      birthDate: date,
      sunSign: sunSign || prev.sunSign
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Profile Info Row */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-2xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl mb-2">{profile.name}</h1>
                <p className="text-muted-foreground mb-4">{profile.username}</p>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Sessions</span>
                </div>
                <div className="text-2xl font-bold">{stats.sessionsCompleted}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CalendarIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Streak</span>
                </div>
                <div className="text-2xl font-bold">{stats.streakDays}</div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">Minutes</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalMinutes}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Favorite</span>
                </div>
                <div className="text-lg font-bold">{stats.favoriteFrequency}</div>
                <div className="text-xs text-muted-foreground">Frequency</div>
              </div>
            </div>

            {/* Activity Calendar Widget */}
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">September 2025</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 bg-blue-400/30 rounded-full"></div>
                  <span>Session day</span>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {/* Days of week header */}
                <div className="text-xs text-muted-foreground font-medium p-2">Su</div>
                <div className="text-xs text-muted-foreground font-medium p-2">Mo</div>
                <div className="text-xs text-muted-foreground font-medium p-2">Tu</div>
                <div className="text-xs text-muted-foreground font-medium p-2">We</div>
                <div className="text-xs text-muted-foreground font-medium p-2">Th</div>
                <div className="text-xs text-muted-foreground font-medium p-2">Fr</div>
                <div className="text-xs text-muted-foreground font-medium p-2">Sa</div>

                {/* Calendar days */}
                <div className="p-2 text-muted-foreground">31</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">1</div>
                <div className="p-2">2</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">3</div>
                <div className="p-2">4</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">5</div>
                <div className="p-2">6</div>
                
                <div className="p-2">7</div>
                <div className="p-2">8</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">9</div>
                <div className="p-2">10</div>
                <div className="p-2">11</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">12</div>
                <div className="p-2">13</div>
                
                <div className="p-2">14</div>
                <div className="p-2 rounded bg-blue-400/20 text-blue-400 font-medium">15</div>
                <div className="p-2 rounded bg-blue-400/30 text-blue-300 font-bold border border-blue-400">16</div>
                <div className="p-2">17</div>
                <div className="p-2">18</div>
                <div className="p-2">19</div>
                <div className="p-2">20</div>
                
                <div className="p-2">21</div>
                <div className="p-2">22</div>
                <div className="p-2">23</div>
                <div className="p-2">24</div>
                <div className="p-2">25</div>
                <div className="p-2">26</div>
                <div className="p-2">27</div>
                
                <div className="p-2">28</div>
                <div className="p-2">29</div>
                <div className="p-2">30</div>
                <div className="p-2 text-muted-foreground">1</div>
                <div className="p-2 text-muted-foreground">2</div>
                <div className="p-2 text-muted-foreground">3</div>
                <div className="p-2 text-muted-foreground">4</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zodiac">Zodiac</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.sessionsCompleted}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.totalMinutes}</div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.vortexEntries}</div>
                <div className="text-sm text-muted-foreground">Vortex Entries</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="font-medium">Chakra Alignment Session</div>
                    <div className="text-sm text-muted-foreground">Heart Chakra • 15 minutes</div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="font-medium">Manifestation Session</div>
                    <div className="text-sm text-muted-foreground">Abundance & Prosperity • 15 minutes</div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 day ago</div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="font-medium">Breathing Exercise</div>
                    <div className="text-sm text-muted-foreground">4-7-8 Relaxation • 10 cycles</div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zodiac" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sun Sign */}
            <Card className="backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <CardTitle className="text-xl">Sun Sign</CardTitle>
                <p className="text-muted-foreground">Core Identity</p>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{profile.sunSign}</h3>
                <p className="text-sm text-muted-foreground mb-3">{getSunSign()?.dates}</p>
                <div className="space-y-1 text-sm">
                  <div><strong>Element:</strong> <Badge variant="outline">{getSunSign()?.element}</Badge></div>
                  <div><strong>Animal:</strong> {getSunSign()?.animal}</div>
                  <div><strong>Keyword:</strong> {getSunSign()?.keyword}</div>
                  <div><strong>Planet:</strong> {getSunSign()?.planet}</div>
                  <div><strong>Body Parts:</strong> {getSunSign()?.bodyParts}</div>
                </div>
                <p className="text-sm mt-3 italic">{getSunSign()?.traits}</p>
              </CardContent>
            </Card>

            {/* Moon Sign */}
            <Card className="backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
                <CardTitle className="text-xl">Moon Sign</CardTitle>
                <p className="text-muted-foreground">Emotional Nature</p>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">{profile.moonSign}</h3>
                <p className="text-sm text-muted-foreground mb-3">{getMoonSign()?.dates}</p>
                <div className="space-y-1 text-sm">
                  <div><strong>Element:</strong> <Badge variant="outline">{getMoonSign()?.element}</Badge></div>
                  <div><strong>Animal:</strong> {getMoonSign()?.animal}</div>
                  <div><strong>Keyword:</strong> {getMoonSign()?.keyword}</div>
                  <div><strong>Planet:</strong> {getMoonSign()?.planet}</div>
                  <div><strong>Body Parts:</strong> {getMoonSign()?.bodyParts}</div>
                </div>
                <p className="text-sm mt-3 italic">{getMoonSign()?.traits}</p>
              </CardContent>
            </Card>

            {/* Rising Sign */}
            <Card className="backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <CardTitle className="text-xl">Rising Sign</CardTitle>
                <p className="text-muted-foreground">Outer Expression</p>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-purple-400 mb-2">{profile.rising}</h3>
                <p className="text-sm text-muted-foreground mb-3">{getRisingSign()?.dates}</p>
                <div className="space-y-1 text-sm">
                  <div><strong>Element:</strong> <Badge variant="outline">{getRisingSign()?.element}</Badge></div>
                  <div><strong>Animal:</strong> {getRisingSign()?.animal}</div>
                  <div><strong>Keyword:</strong> {getRisingSign()?.keyword}</div>
                  <div><strong>Planet:</strong> {getRisingSign()?.planet}</div>
                  <div><strong>Body Parts:</strong> {getRisingSign()?.bodyParts}</div>
                </div>
                <p className="text-sm mt-3 italic">{getRisingSign()?.traits}</p>
              </CardContent>
            </Card>
          </div>

          {/* How to Find Your Signs Guide */}
          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <CardTitle>How to Find Your Sun, Moon & Rising Signs</CardTitle>
              </div>
              <p className="text-muted-foreground">Learn how to determine your complete astrological profile</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">☀️</span>
                    <h4 className="font-medium text-yellow-400">Sun Sign</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Your core identity and ego</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>What you need:</strong> Birth date only</p>
                    <p><strong>How to find:</strong> Simply enter your birth date above or use the date picker in settings. Your sun sign is determined by which zodiac sign the sun was in when you were born.</p>
                    <p><strong>Example:</strong> Born July 25th = Leo ♌</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌙</span>
                    <h4 className="font-medium text-blue-400">Moon Sign</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Your emotional nature and inner self</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>What you need:</strong> Birth date, time, and location</p>
                    <p><strong>How to find:</strong> The moon changes signs every 2-3 days. You'll need your exact birth time and location to calculate accurately. Use online calculators like astro.com or cafe astrology.</p>
                    <p><strong>Tip:</strong> Check your birth certificate for exact time</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⭐</span>
                    <h4 className="font-medium text-purple-400">Rising Sign (Ascendant)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Your outward expression and first impression</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>What you need:</strong> Birth date, exact time, and location</p>
                    <p><strong>How to find:</strong> Your rising sign changes every 2 hours. This requires the most precision - even being off by a few minutes can change your rising sign.</p>
                    <p><strong>Tip:</strong> This is the sign that was rising on the eastern horizon when you were born</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/20">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Quick Calculator
                </h4>
                <p className="text-sm mb-3">For accurate Moon and Rising signs, we recommend:</p>
                <div className="space-y-1 text-sm">
                  <p>• <strong>astro.com</strong> - Free detailed birth chart</p>
                  <p>• <strong>cafeastrology.com</strong> - Simple calculator with explanations</p>
                  <p>• <strong>astro-seek.com</strong> - Advanced options and charts</p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">*Once you know your signs, update them in the Settings tab to get personalized recommendations.</p>
              </div>
            </CardContent>
          </Card>

          {/* Complete Zodiac Reference Table */}
          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-center">Complete Zodiac Reference</CardTitle>
              <p className="text-center text-muted-foreground">All zodiac signs with their attributes</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-3 font-medium">Sign</th>
                      <th className="text-left p-3 font-medium">Animal</th>
                      <th className="text-left p-3 font-medium">Keyword</th>
                      <th className="text-left p-3 font-medium">Element</th>
                      <th className="text-left p-3 font-medium">Planet</th>
                      <th className="text-left p-3 font-medium">Body Parts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ZODIAC_SIGNS.map((sign, index) => (
                      <tr key={sign.name} className={`border-b border-white/10 ${
                        [profile.sunSign, profile.moonSign, profile.rising].includes(sign.name) 
                          ? 'bg-white/5' 
                          : ''
                      }`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <strong style={{ 
                              color: [profile.sunSign, profile.moonSign, profile.rising].includes(sign.name) 
                                ? sign.element === 'Fire' ? '#FF8C00' 
                                : sign.element === 'Earth' ? '#48BB78'
                                : sign.element === 'Air' ? '#4299E1'
                                : '#9F7AEA'
                                : 'inherit'
                            }}>
                              {sign.name}
                            </strong>
                            {[profile.sunSign, profile.moonSign, profile.rising].includes(sign.name) && (
                              <Badge variant="outline" className="text-xs">Your Sign</Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{sign.dates}</div>
                        </td>
                        <td className="p-3">{sign.animal}</td>
                        <td className="p-3 font-medium">{sign.keyword}</td>
                        <td className="p-3">
                          <Badge 
                            variant="outline" 
                            style={{ 
                              borderColor: sign.element === 'Fire' ? '#FF8C00' 
                                : sign.element === 'Earth' ? '#48BB78'
                                : sign.element === 'Air' ? '#4299E1'
                                : '#9F7AEA',
                              color: sign.element === 'Fire' ? '#FF8C00' 
                                : sign.element === 'Earth' ? '#48BB78'
                                : sign.element === 'Air' ? '#4299E1'
                                : '#9F7AEA'
                            }}
                          >
                            {sign.element}
                          </Badge>
                        </td>
                        <td className="p-3">{sign.planet}</td>
                        <td className="p-3 text-xs">{sign.bodyParts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personalized Recommendations</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setEditingRecommendations(!editingRecommendations)}
                  className="flex items-center gap-2"
                >
                  {editingRecommendations ? (
                    <><Save className="w-4 h-4" /> Save</>
                  ) : (
                    <><Edit className="w-4 h-4" /> Edit</>
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground">Customize your astrological guidance and recommendations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/20">
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    <span>☀️ Sun in {profile.sunSign}</span>
                    {editingRecommendations && (
                      <Select 
                        value={profile.sunSign}
                        onValueChange={(value) => setProfile(prev => ({ ...prev, sunSign: value }))}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ZODIAC_SIGNS.map(sign => (
                            <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </h4>
                  {editingRecommendations ? (
                    <textarea 
                      className="w-full p-2 text-sm bg-background/50 border border-white/20 rounded-md resize-none"
                      rows={3}
                      value={customRecommendations.sun}
                      onChange={(e) => setCustomRecommendations(prev => ({ ...prev, sun: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm">{customRecommendations.sun}</p>
                  )}
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/20">
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    <span>🌙 Moon in {profile.moonSign}</span>
                    {editingRecommendations && (
                      <Select 
                        value={profile.moonSign}
                        onValueChange={(value) => setProfile(prev => ({ ...prev, moonSign: value }))}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ZODIAC_SIGNS.map(sign => (
                            <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </h4>
                  {editingRecommendations ? (
                    <textarea 
                      className="w-full p-2 text-sm bg-background/50 border border-white/20 rounded-md resize-none"
                      rows={3}
                      value={customRecommendations.moon}
                      onChange={(e) => setCustomRecommendations(prev => ({ ...prev, moon: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm">{customRecommendations.moon}</p>
                  )}
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-400/10 to-pink-400/10 border border-purple-400/20">
                  <h4 className="font-medium mb-2 flex items-center justify-between">
                    <span>⭐ Rising in {profile.rising}</span>
                    {editingRecommendations && (
                      <Select 
                        value={profile.rising}
                        onValueChange={(value) => setProfile(prev => ({ ...prev, rising: value }))}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ZODIAC_SIGNS.map(sign => (
                            <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </h4>
                  {editingRecommendations ? (
                    <textarea 
                      className="w-full p-2 text-sm bg-background/50 border border-white/20 rounded-md resize-none"
                      rows={3}
                      value={customRecommendations.rising}
                      onChange={(e) => setCustomRecommendations(prev => ({ ...prev, rising: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm">{customRecommendations.rising}</p>
                  )}
                </div>
              </div>
              
              {editingRecommendations && (
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-teal-400/10 to-blue-400/10 border border-teal-400/20">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Quick Sign Update
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Birth Date (for Sun Sign)</label>
                      <Input 
                        type="date"
                        value={profile.birthDate ? profile.birthDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Birth Time</label>
                      <Input 
                        type="time"
                        placeholder="14:30"
                        value={profile.birthTime} 
                        onChange={(e) => setProfile(prev => ({ ...prev, birthTime: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Birth Location</label>
                      <Input 
                        placeholder="City, Country"
                        value={profile.birthLocation} 
                        onChange={(e) => setProfile(prev => ({ ...prev, birthLocation: e.target.value }))}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">*For accurate Moon and Rising signs, use the recommended calculators above with your exact birth time and location.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Weekly Goal Progress</span>
                    <span>4/7 days</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Monthly Minutes Goal</span>
                    <span>347/500 minutes</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{ width: '69%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Frequency Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>528 Hz (Love/Healing)</span>
                  <Badge>23 sessions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>639 Hz (Relationships)</span>
                  <Badge>18 sessions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>741 Hz (Expression)</span>
                  <Badge>12 sessions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>396 Hz (Fear Release)</span>
                  <Badge>8 sessions</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Name</label>
                  <Input 
                    value={profile.name} 
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Username</label>
                  <Input 
                    value={profile.username} 
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Sun Sign</label>
                  <Select 
                    value={profile.sunSign}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, sunSign: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ZODIAC_SIGNS.map(sign => (
                        <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label>Moon Sign</label>
                  <Select 
                    value={profile.moonSign}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, moonSign: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ZODIAC_SIGNS.map(sign => (
                        <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label>Rising Sign</label>
                  <Select 
                    value={profile.rising}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, rising: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ZODIAC_SIGNS.map(sign => (
                        <SelectItem key={sign.name} value={sign.name}>{sign.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label>Birth Date</label>
                  <Input 
                    type="date"
                    value={profile.birthDate ? profile.birthDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Birth Time</label>
                  <Input 
                    value={profile.birthTime} 
                    onChange={(e) => setProfile(prev => ({ ...prev, birthTime: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Birth Location</label>
                  <Input 
                    value={profile.birthLocation} 
                    onChange={(e) => setProfile(prev => ({ ...prev, birthLocation: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
