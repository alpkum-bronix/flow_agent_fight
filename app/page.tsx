import { AgentsSection } from "@/components/custom/AgentsSection";
import { BattlesSection } from "@/components/custom/BattlesSection";
import { HeroSection } from "@/components/custom/HeroSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AgentsSection />
      <BattlesSection />
    </main>
  )
}

