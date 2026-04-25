import ComingSoonPage from "@/components/ui/coming-soon-page";
import { comingSoonProjects } from "@/data/playground";

export default function BeatsPage() {
  return <ComingSoonPage project={comingSoonProjects.beats} />;
}
