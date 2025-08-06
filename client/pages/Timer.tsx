import Layout from "@/components/Layout";
import PomodoroTimer from "@/components/PomodoroTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Target, TrendingUp, Award } from "lucide-react";

export default function TimerPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center">
              <Timer className="w-8 h-8 mr-3 text-focus" />
              Study Timer
            </h1>
            <p className="text-slate-600 mt-1">Focus with the Pomodoro technique</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Set Goals
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Stats
            </Button>
          </div>
        </div>

        <PomodoroTimer />

        {/* Tips and Motivation */}
        <Card className="bg-gradient-to-r from-focus/5 to-primary/5 border-focus/20">
          <CardHeader>
            <CardTitle className="flex items-center text-focus">
              <Award className="w-5 h-5 mr-2" />
              Pomodoro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">🎯 Focus Session (25 min)</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Eliminate all distractions</li>
                  <li>• Focus on one task only</li>
                  <li>• No social media or phone</li>
                  <li>• Take notes if ideas pop up</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">☕ Break Time (5 min)</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>• Step away from your desk</li>
                  <li>• Stretch or walk around</li>
                  <li>• Hydrate and rest your eyes</li>
                  <li>• Avoid screens during breaks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
