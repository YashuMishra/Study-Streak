import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Clock,
  Coffee,
  Target,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerSession {
  id: string;
  subject: string;
  duration: number;
  type: 'focus' | 'short-break' | 'long-break';
  completedAt: Date;
}

interface PomodoroStats {
  todayFocusTime: number;
  todaySessions: number;
  weeklyFocusTime: number;
  totalSessions: number;
}

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [currentSubject, setCurrentSubject] = useState('Ethics');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [customFocusTime, setCustomFocusTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const subjects = [
    'Ethics', 'Polity', 'Economics', 'Geography', 'History', 
    'Science & Technology', 'Environment', 'Current Affairs', 'Essay Writing'
  ];

  const sessionSettings = {
    focus: { duration: customFocusTime * 60, label: 'Focus Time', color: 'bg-focus', icon: Target },
    'short-break': { duration: customBreakTime * 60, label: 'Short Break', color: 'bg-success', icon: Coffee },
    'long-break': { duration: 15 * 60, label: 'Long Break', color: 'bg-warning', icon: Coffee }
  };

  const stats: PomodoroStats = {
    todayFocusTime: 165, // minutes
    todaySessions: 7,
    weeklyFocusTime: 1250, // minutes
    totalSessions: 45
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (isSoundEnabled) {
      // Play notification sound (you could add actual audio here)
      console.log('Session complete!');
    }
    
    if (currentSession === 'focus') {
      setCompletedSessions(prev => prev + 1);
      // Auto-start break
      const nextSession = completedSessions % 4 === 3 ? 'long-break' : 'short-break';
      setCurrentSession(nextSession);
      setTimeLeft(sessionSettings[nextSession].duration);
    } else {
      // Break finished, back to focus
      setCurrentSession('focus');
      setTimeLeft(sessionSettings.focus.duration);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionSettings[currentSession].duration);
  };

  const switchSession = (session: 'focus' | 'short-break' | 'long-break') => {
    setCurrentSession(session);
    setTimeLeft(sessionSettings[session].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = sessionSettings[currentSession].duration;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const currentSettings = sessionSettings[currentSession];
  const IconComponent = currentSettings.icon;

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <Card className={cn(
        "transition-all duration-300",
        isRunning ? "ring-2 ring-primary ring-offset-2" : ""
      )}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IconComponent className="w-5 h-5 text-primary" />
              <span>{currentSettings.label}</span>
              {currentSession === 'focus' && (
                <Badge variant="outline">{currentSubject}</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              >
                {isSoundEnabled ? 
                  <Volume2 className="w-4 h-4" /> : 
                  <VolumeX className="w-4 h-4" />
                }
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-slate-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                className={cn(
                  "transition-all duration-1000 ease-in-out",
                  currentSession === 'focus' ? "text-focus" :
                  currentSession === 'short-break' ? "text-success" : "text-warning"
                )}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-mono font-bold text-slate-900">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {Math.round(getProgress())}% complete
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-3">
            <Button
              size="lg"
              onClick={toggleTimer}
              className={cn(
                "w-24",
                isRunning ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
              )}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={resetTimer}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Session Selector */}
          <div className="flex justify-center space-x-2">
            {(['focus', 'short-break', 'long-break'] as const).map((session) => {
              const SessionIcon = sessionSettings[session].icon;
              return (
                <Button
                  key={session}
                  variant={currentSession === session ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchSession(session)}
                  className="flex items-center space-x-1"
                >
                  <SessionIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {sessionSettings[session].label}
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Subject Selector for Focus Sessions */}
          {currentSession === 'focus' && (
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sm font-medium text-slate-600">Subject:</span>
              <Select value={currentSubject} onValueChange={setCurrentSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today</p>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.floor(stats.todayFocusTime / 60)}h {stats.todayFocusTime % 60}m
                </p>
              </div>
              <Clock className="w-8 h-8 text-focus" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Sessions</p>
                <p className="text-2xl font-bold text-slate-900">{stats.todaySessions}</p>
              </div>
              <Target className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">This Week</p>
                <p className="text-2xl font-bold text-slate-900">
                  {Math.floor(stats.weeklyFocusTime / 60)}h
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-slate-900">{completedSessions}</p>
                <p className="text-xs text-slate-500">today</p>
              </div>
              <Coffee className="w-8 h-8 text-streak" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: 'Ethics', duration: 25, time: '2 hours ago', type: 'focus' },
              { subject: 'Break', duration: 5, time: '2.5 hours ago', type: 'break' },
              { subject: 'Polity', duration: 25, time: '3 hours ago', type: 'focus' },
              { subject: 'Economics', duration: 25, time: '4 hours ago', type: 'focus' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    session.type === 'focus' ? "bg-focus" : "bg-success"
                  )} />
                  <span className="font-medium">{session.subject}</span>
                  <Badge variant="outline" className="text-xs">
                    {session.duration}m
                  </Badge>
                </div>
                <span className="text-sm text-slate-600">{session.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
