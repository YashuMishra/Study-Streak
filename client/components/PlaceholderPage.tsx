import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-gradient-to-br from-primary/10 to-focus/10 p-6 rounded-2xl mb-6">
        <div className="text-primary">{icon}</div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-600 mb-8 max-w-md">{description}</p>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 max-w-md">
        <div className="flex items-center space-x-2 text-focus mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          This feature is being built! Continue chatting to have me implement this page with all the functionality you need.
        </p>
        <Button className="w-full" variant="outline">
          Ask me to build this page
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
