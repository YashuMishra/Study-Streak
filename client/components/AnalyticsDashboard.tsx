import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  BookOpen,
  Calendar,
  Award,
  Flame,
  BarChart3,
  Download,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for analytics
const weeklyStudyTime = [
  { day: 'Mon', hours: 2.5, sessions: 3 },
  { day: 'Tue', hours: 3.2, sessions: 4 },
  { day: 'Wed', hours: 2.8, sessions: 3 },
  { day: 'Thu', hours: 4.1, sessions: 5 },
  { day: 'Fri', hours: 3.5, sessions: 4 },
  { day: 'Sat', hours: 5.2, sessions: 6 },
  { day: 'Sun', hours: 4.8, sessions: 5 }
];

const monthlyProgress = [
  { week: 'Week 1', completion: 78, target: 85 },
  { week: 'Week 2', completion: 82, target: 85 },
  { week: 'Week 3', completion: 88, target: 85 },
  { week: 'Week 4', completion: 85, target: 85 }
];

const subjectDistribution = [
  { subject: 'Ethics', hours: 15.5, percentage: 25, color: '#8B5CF6' },
  { subject: 'Polity', hours: 12.3, percentage: 20, color: '#06B6D4' },
  { subject: 'Economics', hours: 10.8, percentage: 17, color: '#10B981' },
  { subject: 'Geography', hours: 9.2, percentage: 15, color: '#F59E0B' },
  { subject: 'History', hours: 8.1, percentage: 13, color: '#EF4444' },
  { subject: 'Current Affairs', hours: 6.2, percentage: 10, color: '#6366F1' }
];

const streakData = [
  { date: '2024-01-01', streak: 0 },
  { date: '2024-01-02', streak: 1 },
  { date: '2024-01-03', streak: 2 },
  { date: '2024-01-04', streak: 3 },
  { date: '2024-01-05', streak: 4 },
  { date: '2024-01-06', streak: 5 },
  { date: '2024-01-07', streak: 6 },
  { date: '2024-01-08', streak: 7 },
  { date: '2024-01-09', streak: 8 },
  { date: '2024-01-10', streak: 0 },
  { date: '2024-01-11', streak: 1 },
  { date: '2024-01-12', streak: 2 },
  { date: '2024-01-13', streak: 3 },
  { date: '2024-01-14', streak: 4 },
  { date: '2024-01-15', streak: 5 }
];

const performanceMetrics = {
  totalStudyTime: 62.4, // hours this month
  sessionsCompleted: 45,
  averageSessionLength: 83, // minutes
  streakRecord: 12,
  currentStreak: 7,
  targetCompletionRate: 85,
  notesCreated: 23,
  subjectsStudied: 6
};

interface AnalyticsDashboardProps {
  timeRange?: string;
}

export default function AnalyticsDashboard({ timeRange = "7d" }: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedMetric, setSelectedMetric] = useState('completion');

  const StatCard = ({ 
    title, 
    value, 
    unit, 
    icon: Icon, 
    trend, 
    trendValue, 
    color = "text-slate-600" 
  }: {
    title: string;
    value: string | number;
    unit?: string;
    icon: any;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">
              {value}
              {unit && <span className="text-lg text-slate-600 ml-1">{unit}</span>}
            </p>
            {trend && trendValue && (
              <div className={cn(
                "flex items-center mt-1 text-xs",
                trend === 'up' ? "text-success" : "text-destructive"
              )}>
                {trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {trendValue}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", `bg-${color.split('-')[1]}-100`)}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-1">Track your study progress and performance</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Study Time"
          value={performanceMetrics.totalStudyTime}
          unit="hrs"
          icon={Clock}
          trend="up"
          trendValue="+12% from last month"
          color="text-focus"
        />
        <StatCard
          title="Target Completion"
          value={`${performanceMetrics.targetCompletionRate}%`}
          icon={Target}
          trend="up"
          trendValue="+5% this week"
          color="text-success"
        />
        <StatCard
          title="Current Streak"
          value={performanceMetrics.currentStreak}
          unit="days"
          icon={Flame}
          trend="up"
          trendValue="Personal best: 12 days"
          color="text-warning"
        />
        <StatCard
          title="Sessions Completed"
          value={performanceMetrics.sessionsCompleted}
          icon={Award}
          trend="up"
          trendValue="+8 this week"
          color="text-primary"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Study Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Weekly Study Time</span>
                  <Badge variant="outline">Hours per day</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyStudyTime}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                      dataKey="day"
                      axisLine={true}
                      tickLine={true}
                      tick={true}
                      orientation="bottom"
                    />
                    <YAxis
                      axisLine={true}
                      tickLine={true}
                      tick={true}
                      orientation="left"
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value} ${name === 'hours' ? 'hours' : 'sessions'}`, 
                        name === 'hours' ? 'Study Time' : 'Sessions'
                      ]}
                    />
                    <Bar dataKey="hours" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Monthly Progress</span>
                  <Badge variant="outline">Completion rate</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                      dataKey="week"
                      axisLine={true}
                      tickLine={true}
                      tick={true}
                      orientation="bottom"
                    />
                    <YAxis
                      domain={[0, 100]}
                      axisLine={true}
                      tickLine={true}
                      tick={true}
                      orientation="left"
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#64748B" 
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Study Time by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="hours"
                    >
                      {subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} hrs`, 'Study Time']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Details */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectDistribution.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="font-medium">{subject.subject}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{subject.hours}h</div>
                        <div className="text-sm text-slate-500">{subject.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="w-5 h-5 mr-2 text-warning" />
                Streak Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-1">
                    {performanceMetrics.currentStreak}
                  </div>
                  <div className="text-sm text-slate-600">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-1">
                    {performanceMetrics.streakRecord}
                  </div>
                  <div className="text-sm text-slate-600">Personal Best</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    85%
                  </div>
                  <div className="text-sm text-slate-600">Consistency Rate</div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={streakData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).getDate().toString()}
                    axisLine={true}
                    tickLine={true}
                    tick={true}
                    orientation="bottom"
                  />
                  <YAxis
                    axisLine={true}
                    tickLine={true}
                    tick={true}
                    orientation="left"
                  />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`${value} days`, 'Streak']}
                  />
                  <Area
                    type="monotone"
                    dataKey="streak"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Average Session Length</span>
                    <span className="font-semibold">{performanceMetrics.averageSessionLength} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Notes Created</span>
                    <span className="font-semibold">{performanceMetrics.notesCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Subjects Studied</span>
                    <span className="font-semibold">{performanceMetrics.subjectsStudied}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Sessions Completed</span>
                    <span className="font-semibold">{performanceMetrics.sessionsCompleted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Daily Study Target</span>
                      <span className="text-sm text-slate-600">3.5/4 hours</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '87.5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Weekly Streak Goal</span>
                      <span className="text-sm text-slate-600">7/7 days</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Notes Target</span>
                      <span className="text-sm text-slate-600">23/30 notes</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '76.7%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
