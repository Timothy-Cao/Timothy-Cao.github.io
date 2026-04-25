import ComingSoonPage from "@/components/ui/coming-soon-page";
import { comingSoonProjects } from "@/data/playground";

export default function ShelfPage() {
  return <ComingSoonPage project={comingSoonProjects.shelf} />;
}
