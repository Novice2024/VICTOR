import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import { FileText, Edit, Layout, Settings } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <QuickActions />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard
          icon={FileText}
          label="Total Resumes"
          value="3"
          subtitle="All time"
          color="bg-blue-100 text-blue-600"
        />
        <StatsCard
          icon={Edit}
          label="In Progress"
          value="1"
          subtitle="Last edited today"
          color="bg-yellow-100 text-yellow-600"
        />
        <StatsCard
          icon={Layout}
          label="Templates"
          value="5"
          subtitle="Available"
          color="bg-green-100 text-green-600"
        />
        <StatsCard
          icon={Settings}
          label="Profile"
          value="80%"
          subtitle="Complete"
          color="bg-purple-100 text-purple-600"
        />
      </div>
    </div>
  );
}
