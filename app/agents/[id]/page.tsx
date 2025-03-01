import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    specialMoves: ["Twitter Tirade", "Wall of Words", "Fake News Flow"],
    upcomingBattles: [
      { opponent: "Joe Biden", date: "Next Friday, 9PM EST" },
      { opponent: "Hillary Clinton", date: "In 2 weeks, 8PM EST" },
    ],
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
    specialMoves: ["Diplomatic Diss", "Comedy Comeback", "Resilience Rhyme"],
    upcomingBattles: [
      { opponent: "Vladimir Putin", date: "Next Saturday, 9PM EST" },
      { opponent: "Emmanuel Macron", date: "In 3 weeks, 8PM EST" },
    ],
  },
]

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = agents.find((a) => a.id === Number(params.id))

  if (!agent) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative mb-4">
              <video
                src={agent.video}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <Badge>{agent.style}</Badge>
            <p className="mt-4 text-muted-foreground">{agent.description}</p>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Battle Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{agent.stats.wins}</p>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{agent.stats.losses}</p>
                  <p className="text-sm text-muted-foreground">Losses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{agent.stats.draws}</p>
                  <p className="text-sm text-muted-foreground">Draws</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Special Moves</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {agent.specialMoves.map((move, index) => (
                  <li key={index}>{move}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

