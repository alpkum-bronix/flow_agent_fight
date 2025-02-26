import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, upcomingBattles } from "@/constants/dummy_data"

function BattleCard({ agent1, agent2, isLive = false, date }: {agent1: any, agent2: any, isLive?: boolean, date?: string}) {
  return (
    <Card className={`overflow-hidden ${isLive ? 'border-2 border-primary' : ''}`}>
      <CardHeader className={isLive ? 'bg-primary/10' : ''}>
        <div className="flex items-center justify-between">
          <CardTitle>{isLive ? 'Live Now' : 'Upcoming Battle'}</CardTitle>
          {isLive ? (
            <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
          ) : (
            <Badge variant="outline">{date}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {[agent1, agent2].map((agent, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-2 font-bold">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.style}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center my-4">
          <div className="text-2xl font-bold">VS</div>
        </div>
        <div className="mt-6 text-center">
          <Button className="w-full sm:w-auto">
            {isLive ? 'Watch Battle' : 'Set Reminder'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function BattlesSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Upcoming Battles</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Check out the scheduled showdowns and live battles
            </p>
          </div>
        </div>
        
        <div className="mt-8 space-y-6">
          <BattleCard agent1={agents[0]} agent2={agents[1]} isLive={true} />
          {upcomingBattles.map((battle, index) => (
            <BattleCard key={index} agent1={battle.agent1} agent2={battle.agent2} date={battle.date} />
          ))}
        </div>
      </div>
    </section>
  )
}
