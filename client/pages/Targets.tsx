import Layout from "@/components/Layout";
import PlaceholderPage from "@/components/PlaceholderPage";
import { Target } from "lucide-react";

export default function Targets() {
  return (
    <Layout>
      <PlaceholderPage
        title="Daily Target Tracking"
        description="Comprehensive daily task management with streak tracking, custom targets, and progress analytics."
        icon={<Target className="w-12 h-12" />}
      />
    </Layout>
  );
}
