import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  Plus,
  Search,
  Trophy,
  Crown,
  Medal,
  Flame,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  Star,
  MessageCircle,
  Settings,
  UserPlus,
  LogOut,
  Filter,
  Award,
  Zap,
  BookOpen,
  Globe,
  Lock,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  category: string;
  isPrivate: boolean;
  isJoined: boolean;
  adminId: string;
  createdAt: Date;
  weeklyGoal: number;
  currentWeekProgress: number;
  ranking?: number;
}

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  studyTime: number; // minutes this week
  streak: number;
  isAdmin: boolean;
  joinedAt: Date;
  badges: string[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  studyTime: number;
  streak: number;
  rank: number;
  change: number; // position change from last week
  badges: string[];
}

const mockGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'UPSC 2025 Warriors',
    description: 'Dedicated group for UPSC 2025 aspirants. Daily targets, group discussions, and peer motivation.',
    memberCount: 157,
    maxMembers: 200,
    category: 'UPSC',
    isPrivate: false,
    isJoined: true,
    adminId: 'admin1',
    createdAt: new Date(2024, 0, 1),
    weeklyGoal: 30, // hours
    currentWeekProgress: 87,
    ranking: 2
  },
  {
    id: '2',
    name: 'Ethics Study Circle',
    description: 'Focus on Ethics and Integrity for UPSC Mains. Case studies, discussions, and answer writing practice.',
    memberCount: 89,
    maxMembers: 100,
    category: 'Ethics',
    isPrivate: false,
    isJoined: true,
    adminId: 'admin2',
    createdAt: new Date(2024, 0, 15),
    weeklyGoal: 20,
    currentWeekProgress: 95,
    ranking: 1
  },
  {
    id: '3',
    name: 'JEE Advanced 2025',
    description: 'Preparing for JEE Advanced with focused study sessions and problem-solving.',
    memberCount: 243,
    maxMembers: 300,
    category: 'JEE',
    isPrivate: false,
    isJoined: false,
    adminId: 'admin3',
    createdAt: new Date(2024, 1, 1),
    weeklyGoal: 35,
    currentWeekProgress: 78
  },
  {
    id: '4',
    name: 'Medical Entrance Prep',
    description: 'NEET preparation group with daily practice tests and concept discussions.',
    memberCount: 312,
    maxMembers: 500,
    category: 'NEET',
    isPrivate: false,
    isJoined: false,
    adminId: 'admin4',
    createdAt: new Date(2024, 1, 10),
    weeklyGoal: 40,
    currentWeekProgress: 82
  },
  {
    id: '5',
    name: 'Elite Study Pod',
    description: 'Exclusive group for top performers. Invitation only.',
    memberCount: 25,
    maxMembers: 30,
    category: 'Elite',
    isPrivate: true,
    isJoined: false,
    adminId: 'admin5',
    createdAt: new Date(2024, 2, 1),
    weeklyGoal: 50,
    currentWeekProgress: 92
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'PS',
    studyTime: 2840, // 47.3 hours
    streak: 23,
    rank: 1,
    change: 2,
    badges: ['🏆', '🔥', '📚']
  },
  {
    id: '2',
    name: 'Yash Raj',
    avatar: 'YR',
    studyTime: 2760, // 46 hours
    streak: 18,
    rank: 2,
    change: -1,
    badges: ['🎯', '⚡', '🌟']
  },
  {
    id: '3',
    name: 'Arjun Patel',
    avatar: 'AP',
    studyTime: 2580, // 43 hours
    streak: 15,
    rank: 3,
    change: 1,
    badges: ['📖', '💪', '🎨']
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    avatar: 'SG',
    studyTime: 2420, // 40.3 hours
    streak: 12,
    rank: 4,
    change: -2,
    badges: ['📝', '🎯', '✨']
  },
  {
    id: '5',
    name: 'Rahul Singh',
    avatar: 'RS',
    studyTime: 2380, // 39.7 hours
    streak: 9,
    rank: 5,
    change: 0,
    badges: ['⭐', '🚀', '🎪']
  }
];

const mockGroupMembers: GroupMember[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'PS',
    rank: 1,
    studyTime: 2840,
    streak: 23,
    isAdmin: false,
    joinedAt: new Date(2024, 0, 5),
    badges: ['🏆', '🔥', '📚']
  },
  {
    id: '2',
    name: 'Yash Raj',
    avatar: 'YR',
    rank: 2,
    studyTime: 2760,
    streak: 18,
    isAdmin: true,
    joinedAt: new Date(2024, 0, 1),
    badges: ['🎯', '⚡', '🌟']
  },
  {
    id: '3',
    name: 'Arjun Patel',
    avatar: 'AP',
    rank: 3,
    studyTime: 2580,
    streak: 15,
    isAdmin: false,
    joinedAt: new Date(2024, 0, 8),
    badges: ['📖', '💪', '🎨']
  }
];

export default function GroupsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showJoinedOnly, setShowJoinedOnly] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const categories = ['All', 'UPSC', 'JEE', 'NEET', 'CAT', 'Ethics', 'Elite'];

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    const matchesJoined = !showJoinedOnly || group.isJoined;
    
    return matchesSearch && matchesCategory && matchesJoined;
  });

  const joinedGroups = mockGroups.filter(group => group.isJoined);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-slate-600">#{rank}</span>;
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-primary" />
            Study Groups
          </h1>
          <p className="text-slate-600 mt-1">Connect, compete, and grow together</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Study Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input id="groupName" placeholder="Enter group name..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupDesc">Description</Label>
                <Textarea id="groupDesc" placeholder="Describe your group..." className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setShowCreateDialog(false)}>
                  Create Group
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        {/* Discover Groups */}
        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search groups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant={showJoinedOnly ? "default" : "outline"}
                  onClick={() => setShowJoinedOnly(!showJoinedOnly)}
                  className="w-full md:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Joined Only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 flex items-center">
                        {group.name}
                        {group.isPrivate && <Lock className="w-4 h-4 ml-2 text-slate-400" />}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {group.category}
                        </Badge>
                        {group.ranking && (
                          <Badge className="text-xs bg-warning text-white">
                            #{group.ranking} Group
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-1" />
                      {group.memberCount}/{group.maxMembers}
                    </span>
                    <span className="flex items-center text-slate-600">
                      <Target className="w-4 h-4 mr-1" />
                      {group.weeklyGoal}h/week
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Week Progress</span>
                      <span className="font-semibold">{group.currentWeekProgress}%</span>
                    </div>
                    <Progress value={group.currentWeekProgress} />
                  </div>

                  <div className="flex space-x-2">
                    {group.isJoined ? (
                      <Button className="flex-1" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Group
                      </Button>
                    ) : (
                      <Button className="flex-1">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Join Group
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Groups */}
        <TabsContent value="my-groups" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {joinedGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{group.name}</span>
                    <Badge variant={group.ranking ? "default" : "secondary"}>
                      {group.ranking ? `#${group.ranking}` : 'Unranked'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{group.memberCount}</div>
                      <div className="text-xs text-slate-600">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{group.currentWeekProgress}%</div>
                      <div className="text-xs text-slate-600">Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">{group.weeklyGoal}</div>
                      <div className="text-xs text-slate-600">Goal (hrs)</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>This week's goal</span>
                      <span>{group.currentWeekProgress}% complete</span>
                    </div>
                    <Progress value={group.currentWeekProgress} />
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Group Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                UPSC 2025 Warriors - Top Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockGroupMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(member.rank)}
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{member.name}</span>
                          {member.isAdmin && (
                            <Badge variant="outline" className="text-xs">Admin</Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-600">
                          {Math.round(member.studyTime / 60)}h studied • {member.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {member.badges.map((badge, index) => (
                        <span key={index} className="text-lg">{badge}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">2nd</div>
                <div className="text-sm text-slate-600">Your Global Rank</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Flame className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">18</div>
                <div className="text-sm text-slate-600">Day Streak</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">46h</div>
                <div className="text-sm text-slate-600">This Week</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-warning" />
                  Global Leaderboard
                </span>
                <Badge variant="outline">This Week</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg transition-colors",
                      entry.rank <= 3 ? "bg-gradient-to-r from-warning/10 to-success/10 border border-warning/20" : "bg-slate-50",
                      entry.name === "Yash Raj" ? "ring-2 ring-primary ring-offset-2" : ""
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.rank)}
                        {getChangeIndicator(entry.change)}
                      </div>
                      <Avatar>
                        <AvatarFallback>{entry.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        <div className="text-sm text-slate-600">
                          {Math.round(entry.studyTime / 60)}h studied • {entry.streak} day streak
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {entry.badges.map((badge, index) => (
                          <span key={index} className="text-lg">{badge}</span>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{Math.round(entry.studyTime / 60)}h</div>
                        <div className="text-xs text-slate-600">this week</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-focus/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Weekly Sprint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Study for 35+ hours this week to earn the "Sprint Master" badge
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>28h / 35h</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-warning text-white">🏃‍♂️ Active</Badge>
                  <span className="text-sm text-slate-600">2 days left</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-emerald/10 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-success" />
                  Note Master
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Create 15 comprehensive notes this month
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>12 / 15 notes</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-success text-white">📚 Active</Badge>
                  <span className="text-sm text-slate-600">8 days left</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-warning" />
                  Consistency King
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Maintain a 30-day study streak
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Streak</span>
                    <span>18 / 30 days</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">🔥 In Progress</Badge>
                  <span className="text-sm text-slate-600">12 days to go</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-500" />
                  Study Group Leader
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Help your group achieve 90% weekly goal completion
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Group Progress</span>
                    <span>87% / 90%</span>
                  </div>
                  <Progress value={97} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">👑 Almost There!</Badge>
                  <span className="text-sm text-slate-600">3% to go</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completed Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-warning" />
                Completed Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "First Week Warrior", badge: "🏆", date: "Jan 7" },
                  { name: "Note Creator", badge: "📚", date: "Jan 10" },
                  { name: "Time Master", badge: "⏰", date: "Jan 14" },
                  { name: "Consistency Champ", badge: "🎯", date: "Jan 15" }
                ].map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-warning/10 to-success/10 rounded-lg border border-warning/20">
                    <div className="text-3xl mb-2">{achievement.badge}</div>
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-slate-600">{achievement.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
