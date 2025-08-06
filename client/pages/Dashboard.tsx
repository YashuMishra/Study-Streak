import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  Target,
  Clock,
  BookOpen,
  TrendingUp,
  Calendar,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Plus,
  ChevronRight,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  required: boolean;
}

interface StudySession {
  subject: string;
  duration: number;
  completed: boolean;
}

export default function Dashboard() {
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    { id: "1", title: "Watch lecture", completed: true, required: true },
    { id: "2", title: "Write answers", completed: true, required: true },
    { id: "3", title: "Revise notes", completed: false, required: true },
    { id: "4", title: "Study actively", completed: true, required: true },
    { id: "5", title: "Study with focus", completed: false, required: true },
    { id: "6", title: "Practice Math PYQs", completed: false, required: false },
    { id: "7", title: "Read current affairs", completed: true, required: false },
  ]);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("Ethics");
  const [studyTime, setStudyTime] = useState({ hours: 2, minutes: 45 });

  const toggleTask = (id: string) => {
    setDailyTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedRequired = dailyTasks.filter(task => task.required && task.completed).length;
  const totalRequired = dailyTasks.filter(task => task.required).length;
  const completionPercentage = Math.round((completedRequired / totalRequired) * 100);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-focus rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Good morning, Yash! 🌟</h1>
            <p className="text-primary-foreground/80">{todayDate}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-sm text-primary-foreground/80">Current Streak</div>
            <div className="text-3xl font-bold flex items-center justify-end">
              <Flame className="w-8 h-8 mr-2 text-warning" />
              7 days
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Progress</p>
                <p className="text-2xl font-bold text-slate-900">{completionPercentage}%</p>
              </div>
              <div className="bg-success/10 p-3 rounded-lg">
                <Target className="w-6 h-6 text-success" />
              </div>
            </div>
            <Progress value={completionPercentage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Time</p>
                <p className="text-2xl font-bold text-slate-900">{studyTime.hours}h {studyTime.minutes}m</p>
              </div>
              <div className="bg-focus/10 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-focus" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">+45 min from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Notes Created</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <div className="bg-warning/10 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">3 new today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Weekly Rank</p>
                <p className="text-2xl font-bold text-slate-900">#3</p>
              </div>
              <div className="bg-streak/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-streak" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">2 spots up</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Targets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Today's Targets
              </span>
              <Badge variant={completionPercentage >= 70 ? "default" : "secondary"}>
                {completedRequired}/{totalRequired} completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center p-3 rounded-lg border transition-all duration-200",
                  task.completed ? "bg-success/5 border-success/20" : "bg-slate-50 border-slate-200",
                  "hover:shadow-sm cursor-pointer"
                )}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                )}
                <span className={cn(
                  "flex-1 text-sm font-medium",
                  task.completed ? "text-success line-through" : "text-slate-900"
                )}>
                  {task.title}
                </span>
                {task.required && (
                  <Badge variant="outline" className="text-xs">Required</Badge>
                )}
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Target
            </Button>
          </CardContent>
        </Card>

        {/* Study Timer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-focus" />
              Study Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gradient-to-br from-focus/10 to-primary/10 rounded-xl p-6">
              <div className="text-3xl font-mono font-bold text-slate-900 mb-2">
                25:00
              </div>
              <p className="text-sm text-slate-600">Focus Session • {currentSession}</p>
            </div>

            <div className="flex space-x-2">
              <Button 
                className="flex-1" 
                variant={isTimerRunning ? "destructive" : "default"}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-slate-900 text-sm">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Take Notes
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Revision
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Motivation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-warning/10 to-streak/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-warning/20 p-3 rounded-lg">
                <Flame className="w-6 h-6 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">
                  "Success is the sum of small efforts repeated day in and day out."
                </h3>
                <p className="text-sm text-slate-600">
                  You're doing great! Keep up the consistency and you'll achieve your goals. 🎯
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/10 to-focus/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-success/20 p-3 rounded-lg">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">
                  Achievement Unlocked! 🏆
                </h3>
                <p className="text-sm text-slate-600">
                  "First Week Warrior" - You've completed 7 consecutive days of study!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
