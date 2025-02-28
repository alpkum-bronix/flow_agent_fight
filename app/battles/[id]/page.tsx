"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// This would typically come from a real-time data source
const mockBattleData = {
    id: "1",
    agent1: {
        id: 1,
        name: "ByteFlow",
        image: "/placeholder.svg?height=400&width=400",
        score: 0,
    },
    agent2: {
        id: 2,
        name: "Quantum Verse",
        image: "/placeholder.svg?height=400&width=400",
        score: 0,
    },
    rounds: [
        { winner: null, lyrics: [] },
        { winner: null, lyrics: [] },
        { winner: null, lyrics: [] },
    ],
    currentRound: 0,
    status: "waiting", // "waiting", "in_progress", "finished"
}

// export default function LiveBattlePage({ params }: { params: { id: string } }) {
export default function LiveBattlePage() {
    const [battleData, setBattleData] = useState(mockBattleData)
    const [timeLeft, setTimeLeft] = useState(60)

    useEffect(() => {
        // Simulating real-time updates
        const interval = setInterval(() => {
            setBattleData((prevData) => ({
                ...prevData,
                status: prevData.status === "waiting" ? "in_progress" : prevData.status,
                currentRound: Math.min(prevData.currentRound + 1, prevData.rounds.length - 1),
                agent1: {
                    ...prevData.agent1,
                    score: prevData.agent1.score + Math.floor(Math.random() * 10),
                },
                agent2: {
                    ...prevData.agent2,
                    score: prevData.agent2.score + Math.floor(Math.random() * 10),
                },
            }))
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className="container mx-auto px-4 py-8">
            <Link href="/" className="text-primary hover:underline mb-4 inline-block">
                &larr; Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-center">Live Rap Battle</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <BattleStage agent1={battleData.agent1} agent2={battleData.agent2} />
                <BattleInfo
                    currentRound={battleData.currentRound + 1}
                    totalRounds={battleData.rounds.length}
                    timeLeft={timeLeft}
                    status={battleData.status}
                />
            </div>

            <LyricsDisplay currentRound={battleData.currentRound} rounds={battleData.rounds} />

            <VotingSection agent1={battleData.agent1} agent2={battleData.agent2} />
        </main>
    )
}

function BattleStage({ agent1, agent2 }: { agent1: { id: number, name: string, image: string, score: number }, agent2: { id: number, name: string, image: string, score: number } }) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <AgentDisplay agent={agent1} />
                    <div className="text-2xl font-bold">VS</div>
                    <AgentDisplay agent={agent2} />
                </div>
            </CardContent>
        </Card>
    )
}

function AgentDisplay({ agent }: { agent: { id: number, name: string, image: string, score: number } }) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                <Image src={agent.image || "/placeholder.svg"} alt={agent.name} fill className="object-cover" />
            </div>
            <h2 className="text-xl font-bold">{agent.name}</h2>
            <p className="text-lg">Score: {agent.score}</p>
        </div>
    )
}

function BattleInfo({ currentRound, totalRounds, timeLeft, status }: { currentRound: number, totalRounds: number, timeLeft: number, status: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Battle Info</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span>Round:</span>
                        <Badge variant="secondary">{currentRound} / {totalRounds}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Time Left:</span>
                        <Badge variant="destructive">{timeLeft}s</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <Badge variant="outline" className="capitalize">{status.replace("_", " ")}</Badge>
                    </div>
                    <Progress value={(timeLeft / 60) * 100} className="w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

function LyricsDisplay({ currentRound, rounds }: { currentRound: number, rounds: { winner: string | null, lyrics: string[] }[] }) {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Live Lyrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-40 overflow-y-auto bg-muted p-4 rounded-md">
                    {rounds[currentRound].lyrics.map((line, index) => (
                        <p key={index} className="mb-2">{line}</p>
                    ))}
                    {rounds[currentRound].lyrics.length === 0 && (
                        <p className="text-muted-foreground">Waiting for the battle to begin...</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function VotingSection({ agent1, agent2 }: { agent1: { name: string }, agent2: { name: string } }) {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Vote for Your Favorite</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <Button variant="outline" className="w-[45%]">Vote for {agent1.name}</Button>
                    <Button variant="outline" className="w-[45%]">Vote for {agent2.name}</Button>
                </div>
            </CardContent>
        </Card>
    )
}
