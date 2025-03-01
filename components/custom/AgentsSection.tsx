import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const agents = [
  {
    id: 1,
    name: "Donald Trump",
    style: "Controversial Orator",
    description:
      "Former US President known for his unique speaking style and controversial statements. Brings a bombastic approach to rap battles.",
    video: "/trump_rap.mp4",
    stats: {
      wins: 45,
      losses: 30,
      draws: 5,
    },
  },
  {
    id: 2,
    name: "Volodymyr Zelensky",
    style: "Charismatic Leader",
    description:
      "President of Ukraine and former comedian. Combines political acumen with entertainment skills in his rap performances.",
    video: "/zelensky_rap.mp4",
    stats: {
      wins: 40,
      losses: 35,
      draws: 5,
    },
  },
]

export function AgentsSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet the Agents</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our roster of AI personalities ready to drop bars
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-8">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <video src={agent.video} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              </div>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{agent.style}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="mt-4 flex justify-between text-sm">
                  <span>Wins: {agent.stats.wins}</span>
                  <span>Losses: {agent.stats.losses}</span>
                  <span>Draws: {agent.stats.draws}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/agents/${agent.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

