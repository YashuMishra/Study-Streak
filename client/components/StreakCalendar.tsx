import { useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DayData {
  date: Date;
  completionRate: number;
  tasksCompleted: number;
  totalTasks: number;
  studyTime: number; // in minutes
  isToday: boolean;
  isFuture: boolean;
}

interface StreakCalendarProps {
  currentStreak?: number;
  longestStreak?: number;
}

export default function StreakCalendar({ currentStreak = 7, longestStreak = 12 }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate calendar data for the current month
  const generateCalendarData = (date: Date): DayData[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    const days: DayData[] = [];
    
    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = new Date(year, month, -(firstDayOfWeek - i - 1));
      days.push({
        date: prevDate,
        completionRate: 0,
        tasksCompleted: 0,
        totalTasks: 0,
        studyTime: 0,
        isToday: false,
        isFuture: true,
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayDate = new Date(year, month, day);
      const isToday = dayDate.toDateString() === today.toDateString();
      const isFuture = dayDate > today;
      
      // Generate mock data for past days
      let completionRate = 0;
      let tasksCompleted = 0;
      let totalTasks = 5;
      let studyTime = 0;
      
      if (!isFuture) {
        // Mock data generation for demonstration
        const daysSinceStart = Math.abs(dayDate.getTime() - new Date(2024, 0, 1).getTime()) / (1000 * 60 * 60 * 24);
        const randomSeed = Math.sin(daysSinceStart) * 10000;
        const completion = Math.abs(randomSeed % 100);
        
        if (completion > 20) { // 80% chance of having some activity
          completionRate = Math.min(100, completion + 20);
          tasksCompleted = Math.round((completionRate / 100) * totalTasks);
          studyTime = Math.round(60 + (completion * 3)); // 60-360 minutes
        }
      }
      
      days.push({
        date: dayDate,
        completionRate,
        tasksCompleted,
        totalTasks,
        studyTime,
        isToday,
        isFuture,
      });
    }
    
    return days;
  };

  const calendarData = generateCalendarData(currentDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayColorClass = (day: DayData) => {
    if (day.isFuture) return "bg-slate-50 text-slate-400";
    if (day.completionRate === 0) return "bg-slate-100 text-slate-500";
    if (day.completionRate < 50) return "bg-destructive/20 text-destructive-foreground";
    if (day.completionRate < 80) return "bg-warning/30 text-warning-foreground";
    return "bg-success/20 text-success-foreground border-success/30";
  };

  const getStreakBadge = () => {
    if (currentStreak >= 30) return { text: "🏆 Legendary", color: "bg-gradient-to-r from-yellow-400 to-orange-500" };
    if (currentStreak >= 14) return { text: "🔥 On Fire", color: "bg-gradient-to-r from-red-500 to-pink-500" };
    if (currentStreak >= 7) return { text: "⚡ Strong", color: "bg-gradient-to-r from-blue-500 to-purple-500" };
    if (currentStreak >= 3) return { text: "🌱 Growing", color: "bg-gradient-to-r from-green-400 to-blue-500" };
    return { text: "🚀 Start", color: "bg-gradient-to-r from-slate-400 to-slate-500" };
  };

  const streakBadge = getStreakBadge();

  return (
    <div className="space-y-6">
      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Current Streak</p>
                <p className="text-3xl font-bold text-slate-900 flex items-center">
                  <Flame className="w-8 h-8 mr-2 text-streak" />
                  {currentStreak}
                </p>
              </div>
              <Badge className={cn("text-white", streakBadge.color)}>
                {streakBadge.text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Longest Streak</p>
                <p className="text-3xl font-bold text-slate-900 flex items-center">
                  <Target className="w-8 h-8 mr-2 text-focus" />
                  {longestStreak}
                </p>
              </div>
              <p className="text-xs text-slate-500">Personal best!</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">This Month</p>
                <p className="text-3xl font-bold text-slate-900 flex items-center">
                  <Clock className="w-8 h-8 mr-2 text-warning" />
                  85%
                </p>
              </div>
              <p className="text-xs text-slate-500">Completion rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Study Calendar</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-slate-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarData.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square p-1 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer",
                  getDayColorClass(day),
                  day.isToday && "ring-2 ring-primary ring-offset-2"
                )}
                title={`${day.date.toDateString()}\n${day.tasksCompleted}/${day.totalTasks} tasks\n${Math.round(day.studyTime / 60)}h ${day.studyTime % 60}m studied`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-sm font-medium">
                    {day.date.getDate()}
                  </div>
                  {!day.isFuture && day.completionRate > 0 && (
                    <div className="text-xs mt-1">
                      {day.completionRate >= 80 ? "✓" : day.completionRate >= 50 ? "○" : "·"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success/20 border border-success/30 rounded"></div>
              <span>Complete (80%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning/30 rounded"></div>
              <span>Partial (50-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-destructive/20 rounded"></div>
              <span>Incomplete (&lt;50%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-100 rounded"></div>
              <span>No activity</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
