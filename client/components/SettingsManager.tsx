import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Palette,
  Download,
  Upload,
  Shield,
  Clock,
  Target,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Monitor,
  Trash2,
  Save,
  RefreshCw,
  Lock,
  Mail,
  Phone,
  Calendar,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSettings {
  // Account
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;

  // Study Preferences
  dailyStudyGoal: number; // minutes
  pomodoroFocusTime: number; // minutes
  pomodoroShortBreak: number; // minutes
  pomodoroLongBreak: number; // minutes
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  
  // Notifications
  pushNotifications: boolean;
  emailNotifications: boolean;
  studyReminders: boolean;
  achievementAlerts: boolean;
  weeklyReports: boolean;
  soundEnabled: boolean;
  
  // Appearance
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  compactMode: boolean;
  
  // Privacy
  publicProfile: boolean;
  shareProgress: boolean;
  dataAnalytics: boolean;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<UserSettings>({
    // Account
    firstName: "Yash",
    lastName: "Raj",
    email: "yash.raj@example.com",
    phone: "+91 9876543210",
    timezone: "Asia/Kolkata",
    language: "English",

    // Study Preferences
    dailyStudyGoal: 240, // 4 hours
    pomodoroFocusTime: 25,
    pomodoroShortBreak: 5,
    pomodoroLongBreak: 15,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    studyReminders: true,
    achievementAlerts: true,
    weeklyReports: true,
    soundEnabled: true,
    
    // Appearance
    theme: 'system',
    primaryColor: '#8B5CF6',
    compactMode: false,
    
    // Privacy
    publicProfile: true,
    shareProgress: true,
    dataAnalytics: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success toast
  };

  const resetSettings = () => {
    // Reset to defaults
    setHasChanges(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'studystreak-settings.json';
    link.click();
  };

  const ThemeIcon = settings.theme === 'light' ? Sun : settings.theme === 'dark' ? Moon : Monitor;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <User className="w-8 h-8 mr-3 text-primary" />
            Settings
          </h1>
          <p className="text-slate-600 mt-1">Customize your Study Streak experience</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {hasChanges && (
            <Badge variant="outline" className="text-warning border-warning">
              Unsaved changes
            </Badge>
          )}
          <Button onClick={saveSettings} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.firstName}
                    onChange={(e) => updateSetting('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.lastName}
                    onChange={(e) => updateSetting('lastName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => updateSetting('phone', e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Active Sessions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Preferences */}
        <TabsContent value="study" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Study Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dailyGoal">Daily Study Goal (minutes)</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="dailyGoal"
                    type="number"
                    min="30"
                    max="720"
                    value={settings.dailyStudyGoal}
                    onChange={(e) => updateSetting('dailyStudyGoal', parseInt(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-slate-600">
                    {Math.floor(settings.dailyStudyGoal / 60)}h {settings.dailyStudyGoal % 60}m per day
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Pomodoro Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="focusTime">Focus Time (minutes)</Label>
                  <Input
                    id="focusTime"
                    type="number"
                    min="10"
                    max="90"
                    value={settings.pomodoroFocusTime}
                    onChange={(e) => updateSetting('pomodoroFocusTime', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortBreak">Short Break (minutes)</Label>
                  <Input
                    id="shortBreak"
                    type="number"
                    min="1"
                    max="15"
                    value={settings.pomodoroShortBreak}
                    onChange={(e) => updateSetting('pomodoroShortBreak', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longBreak">Long Break (minutes)</Label>
                  <Input
                    id="longBreak"
                    type="number"
                    min="10"
                    max="60"
                    value={settings.pomodoroLongBreak}
                    onChange={(e) => updateSetting('pomodoroLongBreak', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBreaks">Auto-start breaks</Label>
                    <p className="text-sm text-slate-600">Automatically start break timers</p>
                  </div>
                  <Switch
                    id="autoBreaks"
                    checked={settings.autoStartBreaks}
                    onCheckedChange={(checked) => updateSetting('autoStartBreaks', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPomodoros">Auto-start pomodoros</Label>
                    <p className="text-sm text-slate-600">Automatically start focus sessions after breaks</p>
                  </div>
                  <Switch
                    id="autoPomodoros"
                    checked={settings.autoStartPomodoros}
                    onCheckedChange={(checked) => updateSetting('autoStartPomodoros', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-slate-600">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-slate-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Study Reminders</Label>
                    <p className="text-sm text-slate-600">Get reminded about your daily study goals</p>
                  </div>
                  <Switch
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => updateSetting('studyReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Achievement Alerts</Label>
                    <p className="text-sm text-slate-600">Get notified when you unlock achievements</p>
                  </div>
                  <Switch
                    checked={settings.achievementAlerts}
                    onCheckedChange={(checked) => updateSetting('achievementAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-slate-600">Receive weekly progress summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-slate-600">Play sounds for timers and notifications</p>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Theme & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  {[
                    { value: 'light', icon: Sun, label: 'Light' },
                    { value: 'dark', icon: Moon, label: 'Dark' },
                    { value: 'system', icon: Monitor, label: 'System' }
                  ].map(({ value, icon: Icon, label }) => (
                    <Button
                      key={value}
                      variant={settings.theme === value ? "default" : "outline"}
                      onClick={() => updateSetting('theme', value)}
                      className="flex-1"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex space-x-2">
                  {[
                    '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#6366F1'
                  ].map(color => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        settings.primaryColor === color ? "border-slate-900 scale-110" : "border-slate-300"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => updateSetting('primaryColor', color)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-slate-600">Use smaller spacing and elements</p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-slate-600">Allow others to see your profile</p>
                  </div>
                  <Switch
                    checked={settings.publicProfile}
                    onCheckedChange={(checked) => updateSetting('publicProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Share Progress</Label>
                    <p className="text-sm text-slate-600">Share your study progress with groups</p>
                  </div>
                  <Switch
                    checked={settings.shareProgress}
                    onCheckedChange={(checked) => updateSetting('shareProgress', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-sm text-slate-600">Help improve the app with usage data</p>
                  </div>
                  <Switch
                    checked={settings.dataAnalytics}
                    onCheckedChange={(checked) => updateSetting('dataAnalytics', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Data Management</h4>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={exportData} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                </div>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
