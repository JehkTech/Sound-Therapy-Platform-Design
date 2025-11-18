import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, Sparkles, Heart, DollarSign, Brain, Zap, Smile, Palette, Globe } from 'lucide-react';

const BELIEF_CATEGORIES = [
  { id: 'spiritual', name: 'Spiritual', color: '#9F7AEA', icon: Sparkles, description: 'Divine connection & purpose' },
  { id: 'financial', name: 'Financial', color: '#FFD700', icon: DollarSign, description: 'Abundance & prosperity' },
  { id: 'social', name: 'Social', color: '#48BB78', icon: Heart, description: 'Relationships & love' },
  { id: 'mental', name: 'Mental', color: '#4299E1', icon: Brain, description: 'Mindset & learning' },
  { id: 'physical', name: 'Physical', color: '#FF8C00', icon: Zap, description: 'Health & vitality' },
  { id: 'emotional', name: 'Emotional', color: '#FF69B4', icon: Smile, description: 'Self-worth & healing' },
  { id: 'creative', name: 'Creative', color: '#20B2AA', icon: Palette, description: 'Art & expression' },
  { id: 'universal', name: 'Universal', color: '#E6E6FA', icon: Globe, description: 'Cosmic laws & destiny' },
];

const FREQUENCY_OPTIONS = [
  { value: 174, label: '174 Hz - Pain Relief' },
  { value: 285, label: '285 Hz - Tissue Healing' },
  { value: 396, label: '396 Hz - Fear Release' },
  { value: 417, label: '417 Hz - Change' },
  { value: 528, label: '528 Hz - Love/Healing' },
  { value: 639, label: '639 Hz - Relationships' },
  { value: 741, label: '741 Hz - Expression' },
  { value: 852, label: '852 Hz - Intuition' },
  { value: 963, label: '963 Hz - Divine Connection' },
];

const EXAMPLE_BELIEFS = {
  spiritual: [
    'I am divinely guided at every step',
    'My intuition is my greatest compass',
    'I trust the universe\'s perfect timing',
  ],
  financial: [
    'Money flows to me as natural energy exchange',
    'I attract prosperity effortlessly',
    'Abundance is my birthright',
  ],
  social: [
    'I attract meaningful, uplifting connections',
    'Love surrounds me in all forms',
    'I am worthy of deep, authentic relationships',
  ],
  mental: [
    'My mind is clear, focused, and creative',
    'I learn and grow with ease',
    'Wisdom flows through me naturally',
  ],
  physical: [
    'My body is vibrant, strong, and radiant',
    'I honor my body as a sacred temple',
    'Perfect health is my natural state',
  ],
  emotional: [
    'I allow emotions to flow and heal me',
    'I am worthy of love and respect',
    'My emotional balance creates inner peace',
  ],
  creative: [
    'My creativity is limitless and inspired',
    'I express my authentic self freely',
    'Art flows through me effortlessly',
  ],
  universal: [
    'I align with the laws of abundance',
    'The universe conspires to help me',
    'I am one with cosmic consciousness',
  ],
};

export function Vortex() {
  const [beliefs, setBeliefs] = useState([
    {
      id: 1,
      title: 'I attract prosperity effortlessly',
      description: 'Money and opportunities flow to me with ease and grace',
      category: 'financial',
      frequency: 528,
      tags: ['manifestation', 'abundance'],
      visits: 12,
    },
    {
      id: 2,
      title: 'I am divinely guided',
      description: 'The universe shows me the perfect path at the perfect time',
      category: 'spiritual',
      frequency: 963,
      tags: ['guidance', 'trust'],
      visits: 8,
    },
    {
      id: 3,
      title: 'My creativity flows boundlessly',
      description: 'I am a channel for infinite creative expression',
      category: 'creative',
      frequency: 639,
      tags: ['creativity', 'expression'],
      visits: 15,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddingBelief, setIsAddingBelief] = useState(false);
  const [editingBelief, setEditingBelief] = useState<any>(null);
  const [newBelief, setNewBelief] = useState({
    title: '',
    description: '',
    category: 'spiritual',
    frequency: 528,
    tags: '',
  });

  const filteredBeliefs = selectedCategory 
    ? beliefs.filter(belief => belief.category === selectedCategory)
    : beliefs;

  const getCategoryColor = (categoryId: string) => {
    return BELIEF_CATEGORIES.find(cat => cat.id === categoryId)?.color || '#9F7AEA';
  };

  const getCategoryIcon = (categoryId: string) => {
    return BELIEF_CATEGORIES.find(cat => cat.id === categoryId)?.icon || Sparkles;
  };

  const addBelief = () => {
    if (!newBelief.title.trim()) return;
    
    const belief = {
      id: Date.now(),
      title: newBelief.title,
      description: newBelief.description,
      category: newBelief.category,
      frequency: newBelief.frequency,
      tags: newBelief.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      visits: 0,
    };
    
    setBeliefs(prev => [...prev, belief]);
    setNewBelief({ title: '', description: '', category: 'spiritual', frequency: 528, tags: '' });
    setIsAddingBelief(false);
  };

  const deleteBelief = (id: number) => {
    setBeliefs(prev => prev.filter(belief => belief.id !== id));
  };

  const addExampleBelief = (category: string, beliefText: string) => {
    const belief = {
      id: Date.now(),
      title: beliefText,
      description: `A powerful affirmation for ${category} alignment`,
      category,
      frequency: 528,
      tags: [category, 'affirmation'],
      visits: 0,
    };
    
    setBeliefs(prev => [...prev, belief]);
  };

  const increaseVisits = (id: number) => {
    setBeliefs(prev => prev.map(belief => 
      belief.id === id ? { ...belief, visits: belief.visits + 1 } : belief
    ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            My Vortex: Create Your Own Rules
          </CardTitle>
          <p className="text-muted-foreground">Your personal belief matrix for manifestation and alignment</p>
        </CardHeader>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2"
        >
          All Categories
        </Button>
        {BELIEF_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
              style={{
                background: selectedCategory === category.id 
                  ? `${category.color}40` 
                  : undefined,
                borderColor: `${category.color}60`,
              }}
            >
              <IconComponent className="w-4 h-4" style={{ color: category.color }} />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Add Belief Button */}
      <div className="flex justify-center">
        <Dialog open={isAddingBelief} onOpenChange={setIsAddingBelief}>
          <DialogTrigger asChild>
            <Button size="lg" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Belief
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Belief</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-semibold">Belief Title</label>
                <Input
                  placeholder="I am... / I attract... / I deserve..."
                  value={newBelief.title}
                  onChange={(e) => setNewBelief(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold">Description (Optional)</label>
                <Textarea
                  placeholder="Expand on your belief..."
                  value={newBelief.description}
                  onChange={(e) => setNewBelief(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-semibold">Category</label>
                  <Select value={newBelief.category} onValueChange={(value) => setNewBelief(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="!bg-white !border-gray-300 text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!bg-white !border-gray-300 !text-black">
                      {BELIEF_CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id} className="!bg-white !text-black">{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold">Linked Frequency</label>
                  <Select value={newBelief.frequency.toString()} onValueChange={(value) => setNewBelief(prev => ({ ...prev, frequency: Number(value) }))}>
                    <SelectTrigger className="!bg-white !border-gray-300 text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!bg-white !border-gray-300 !text-black">
                      {FREQUENCY_OPTIONS.map(freq => (
                        <SelectItem key={freq.value} value={freq.value.toString()} className="!bg-white !text-black">{freq.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold">Tags (comma separated)</label>
                <Input
                  placeholder="manifestation, healing, confidence"
                  value={newBelief.tags}
                  onChange={(e) => setNewBelief(prev => ({ ...prev, tags: e.target.value }))}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingBelief(false)}>
                  Cancel
                </Button>
                <Button onClick={addBelief}>
                  Create Belief
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Belief Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeliefs.map((belief) => {
          const categoryColor = getCategoryColor(belief.category);
          const CategoryIcon = getCategoryIcon(belief.category);
          
          return (
            <Card
              key={belief.id}
              className="backdrop-blur-sm border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`,
                borderColor: `${categoryColor}40`,
                boxShadow: `0 0 ${belief.visits > 5 ? '20px' : '10px'} ${categoryColor}20`,
              }}
              onClick={() => increaseVisits(belief.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${categoryColor}40` }}
                  >
                    <CategoryIcon className="w-5 h-5" style={{ color: categoryColor }} />
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBelief(belief.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight" style={{ color: categoryColor }}>
                  {belief.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {belief.description && (
                  <p className="text-sm text-muted-foreground">{belief.description}</p>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" style={{ borderColor: categoryColor }}>
                    {belief.frequency} Hz
                  </Badge>
                  <span className="text-muted-foreground">{belief.visits} visits</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {belief.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Glow effect for frequently visited beliefs */}
                {belief.visits > 5 && (
                  <div 
                    className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${categoryColor}, transparent 70%)`,
                      animation: 'beliefGlow 2s infinite alternate',
                    }}
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Example Beliefs Section */}
      {selectedCategory && (
        <Card className="backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Example {BELIEF_CATEGORIES.find(c => c.id === selectedCategory)?.name} Beliefs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EXAMPLE_BELIEFS[selectedCategory as keyof typeof EXAMPLE_BELIEFS]?.map((belief, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                  onClick={() => addExampleBelief(selectedCategory, belief)}
                >
                  <p className="text-sm italic">"{belief}"</p>
                  <Button variant="ghost" size="sm" className="mt-2 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to My Vortex
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <style>{`
        @keyframes beliefGlow {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
