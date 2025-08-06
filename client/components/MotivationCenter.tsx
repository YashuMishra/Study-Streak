import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Star,
  Sparkles,
  Trophy,
  Target,
  Calendar,
  Quote,
  BookOpen,
  Coffee,
  Sunrise,
  Moon,
  TrendingUp,
  Award,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Reflection {
  id: string;
  date: Date;
  morningReflection?: string;
  eveningReflection?: string;
  achievements: string[];
  improvements: string[];
  gratitude: string[];
  tomorrowGoals: string[];
  mood: 'excellent' | 'good' | 'okay' | 'struggling';
  energyLevel: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'streak' | 'time' | 'notes' | 'consistency' | 'milestone';
}

const motivationalQuotes = [
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
    category: "consistency"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: "growth"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "persistence"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "confidence"
  },
  {
    text: "The future belongs to those who prepare for it today.",
    author: "Malcolm X",
    category: "preparation"
  }
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Week Warrior',
    description: 'Complete 7 consecutive days of study',
    icon: '🏆',
    unlockedAt: new Date(2024, 0, 7),
    category: 'streak'
  },
  {
    id: '2',
    title: 'Note Master',
    description: 'Create 10 comprehensive notes',
    icon: '📚',
    unlockedAt: new Date(2024, 0, 10),
    category: 'notes'
  },
  {
    id: '3',
    title: 'Time Champion',
    description: 'Study for 25+ hours in a week',
    icon: '⏰',
    unlockedAt: new Date(2024, 0, 14),
    category: 'time'
  },
  {
    id: '4',
    title: 'Consistency King',
    description: 'Maintain 80%+ completion for a month',
    icon: '👑',
    unlockedAt: new Date(2024, 0, 15),
    category: 'consistency'
  }
];

const todayGoals = [
  { id: '1', text: 'Complete Ethics case study analysis', completed: true },
  { id: '2', text: 'Review yesterday\'s notes', completed: true },
  { id: '3', text: 'Practice answer writing for 1 hour', completed: false },
  { id: '4', text: 'Read current affairs - 30 minutes', completed: false }
];

export default function MotivationCenter() {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState<Partial<Reflection>>({
    achievements: [],
    improvements: [],
    gratitude: [],
    tomorrowGoals: [],
    mood: 'good',
    energyLevel: 8
  });

  const completedGoals = todayGoals.filter(goal => goal.completed).length;
  const completionPercentage = (completedGoals / todayGoals.length) * 100;

  useEffect(() => {
    // Rotate quotes every 30 seconds
    const interval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'okay': return 'text-yellow-600 bg-yellow-100';
      case 'struggling': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning!", icon: Sunrise };
    if (hour < 17) return { text: "Good Afternoon!", icon: Target };
    return { text: "Good Evening!", icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="space-y-6">
      {/* Daily Motivation Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-focus/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <GreetingIcon className="w-8 h-8 text-warning" />
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{greeting.text}</h2>
                <p className="text-slate-600">Ready to achieve your goals today?</p>
              </div>
            </div>
            <Badge className="bg-success text-white">
              <Flame className="w-4 h-4 mr-1" />
              7-day streak!
            </Badge>
          </div>

          {/* Daily Quote */}
          <div className="bg-white/80 rounded-lg p-4 border border-white/40">
            <div className="flex items-start space-x-3">
              <Quote className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-800 font-medium italic mb-2">
                  "{currentQuote.text}"
                </p>
                <p className="text-sm text-slate-600">— {currentQuote.author}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-success" />
              Today's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">
                Progress: {completedGoals}/{todayGoals.length} completed
              </span>
              <Badge variant={completionPercentage >= 75 ? "default" : "secondary"}>
                {Math.round(completionPercentage)}%
              </Badge>
            </div>
            
            <Progress value={completionPercentage} className="mb-4" />
            
            <div className="space-y-2">
              {todayGoals.map((goal) => (
                <div key={goal.id} className={cn(
                  "flex items-center p-3 rounded-lg border transition-all",
                  goal.completed ? "bg-success/5 border-success/20" : "bg-slate-50 border-slate-200"
                )}>
                  <div className={cn(
                    "w-4 h-4 rounded-full mr-3 flex-shrink-0",
                    goal.completed ? "bg-success" : "border-2 border-slate-300"
                  )} />
                  <span className={cn(
                    "text-sm",
                    goal.completed ? "text-success line-through" : "text-slate-700"
                  )}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements & Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-warning" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div key={achievement.id} className="bg-gradient-to-br from-warning/10 to-success/10 p-4 rounded-lg border border-warning/20 text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {achievement.description}
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Reflection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-focus" />
              Daily Reflection
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReflection(!showReflection)}
            >
              {showReflection ? 'Hide' : 'Show'} Reflection
            </Button>
          </CardTitle>
        </CardHeader>
        {showReflection && (
          <CardContent className="space-y-6">
            {/* Mood Check */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">
                How are you feeling today?
              </label>
              <div className="flex space-x-2">
                {['excellent', 'good', 'okay', 'struggling'].map((mood) => (
                  <Button
                    key={mood}
                    variant={reflection.mood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReflection({...reflection, mood: mood as any})}
                    className={cn(
                      reflection.mood === mood && getMoodColor(mood)
                    )}
                  >
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Energy Level: {reflection.energyLevel}/10
              </label>
              <Progress value={(reflection.energyLevel || 0) * 10} className="mb-2" />
              <input
                type="range"
                min="1"
                max="10"
                value={reflection.energyLevel || 5}
                onChange={(e) => setReflection({...reflection, energyLevel: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What went well */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  What did I do well today? 🌟
                </label>
                <Textarea
                  placeholder="Reflect on your achievements and positive moments..."
                  className="min-h-[100px]"
                  value={reflection.morningReflection || ''}
                  onChange={(e) => setReflection({...reflection, morningReflection: e.target.value})}
                />
              </div>

              {/* What to improve */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  What can I improve tomorrow? 🎯
                </label>
                <Textarea
                  placeholder="Think about areas for growth and improvement..."
                  className="min-h-[100px]"
                  value={reflection.eveningReflection || ''}
                  onChange={(e) => setReflection({...reflection, eveningReflection: e.target.value})}
                />
              </div>
            </div>

            {/* Gratitude */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Three things I'm grateful for today 🙏
              </label>
              <Textarea
                placeholder="1. &#10;2. &#10;3. "
                className="min-h-[80px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowReflection(false)}>
                Save for Later
              </Button>
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Save Reflection
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Weekly Motivation Summary */}
      <Card className="bg-gradient-to-r from-success/5 to-primary/5 border-success/20">
        <CardContent className="p-6">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              You're doing amazing! 🎉
            </h3>
            <p className="text-slate-600 mb-4">
              This week you've maintained a 7-day streak, studied for 24+ hours, and created 8 new notes.
              Keep up the fantastic work!
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Badge variant="outline" className="bg-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% vs last week
              </Badge>
              <Badge variant="outline" className="bg-white">
                <Trophy className="w-3 h-3 mr-1" />
                Top 10% performer
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
