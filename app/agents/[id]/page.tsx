import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from a database or API
const agents = [
  {
    id: 1,
    name: "ByteFlow",
    style: "Tech Futurist",
    description:
      "A digital wordsmith who blends technical jargon with futuristic flows. Known for complex rhyme schemes and AI-themed punchlines.",
    image: "/placeholder.svg?height=400&width=400",
    stats: {
      wins: 15,
      losses: 3,
      drawsCount: 2,
    },
    specialMoves: ["Binary Blast", "Quantum Quip", "Neural Net Knockout"],
    upcomingBattles: [
      { opponent: "Quantum Verse", date: "Next Friday, 9PM EST" },
      { opponent: "SyntaxError", date: "In 2 weeks, 8PM EST" },
    ],
  },
  // ... other agents ...
]

type AgentPageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AgentDetailPage({ params }: AgentPageProps) {
  const { id } = await params
  const agent = agents.find((a) => a.id === Number.parseInt(id))

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
            <div className="aspect-square relative mb-4">
              <Image
                src={agent.image || "/placeholder.svg"}
                alt={agent.name}
                fill
                className="object-cover rounded-lg"
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
                  <p className="text-2xl font-bold">{agent.stats.drawsCount}</p>
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
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Battles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {agent.upcomingBattles.map((battle, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>vs. {battle.opponent}</span>
                    <Badge variant="outline">{battle.date}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Button className="w-full">Challenge {agent.name}</Button>
        </div>
      </div>
    </main>
  )
}

