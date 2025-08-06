import Layout from "@/components/Layout";
import StreakCalendar from "@/components/StreakCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, BookOpen, Clock, Plus } from "lucide-react";

interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export default function CalendarPage() {
  const upcomingRevisions: RevisionItem[] = [
    {
      id: "1",
      title: "Ethics Case Studies",
      subject: "Ethics",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      priority: "high",
      completed: false
    },
    {
      id: "2",
      title: "Constitutional Law Notes",
      subject: "Polity",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: "medium",
      completed: false
    },
    {
      id: "3",
      title: "Economics PYQs",
      subject: "Economics",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      priority: "high",
      completed: false
    },
    {
      id: "4",
      title: "Geography Maps",
      subject: "Geography",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      priority: "low",
      completed: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning-foreground border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Study Calendar</h1>
            <p className="text-slate-600 mt-1">Track your streak and plan revisions</p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Revision
          </Button>
        </div>

        <StreakCalendar currentStreak={7} longestStreak={12} />

        {/* Upcoming Revisions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-focus" />
              Upcoming Revisions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingRevisions.map((item) => {
                const daysUntilDue = Math.ceil((item.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isOverdue = daysUntilDue < 0;
                const isDueToday = daysUntilDue === 0;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                      item.completed ? 'bg-success/5 border-success/20' : 'bg-white border-slate-200'
                    } ${
                      isOverdue ? 'border-destructive/40 bg-destructive/5' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        item.completed ? 'bg-success' :
                        isOverdue ? 'bg-destructive' :
                        isDueToday ? 'bg-warning' : 'bg-slate-300'
                      }`} />

                      <div>
                        <h4 className={`font-medium ${
                          item.completed ? 'text-success line-through' : 'text-slate-900'
                        }`}>
                          {item.title}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-slate-600 flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {item.subject}
                          </span>
                          <span className="text-sm text-slate-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` :
                             isDueToday ? 'Due today' :
                             daysUntilDue === 1 ? 'Tomorrow' :
                             `In ${daysUntilDue} days`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(item.priority)}
                      >
                        {item.priority}
                      </Badge>
                      {!item.completed && (
                        <Button size="sm" variant="outline">
                          Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
