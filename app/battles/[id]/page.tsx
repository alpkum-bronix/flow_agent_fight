"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import WinPopup from "@/components/custom/WinPopup"
import LosePopup from "@/components/custom/LosePopup"
import { motion } from "framer-motion"

const mockBattleData = {
  id: "1",
  agent1: {
    id: 1,
    name: "Donald Trump",
    video: "/trump.mp4",
    score: 0,
    choice: null,
  },
  agent2: {
    id: 2,
    name: "Volodymyr Zelensky",
    video: "/trump.mp4",
    score: 0,
    choice: null,
  },
  rounds: [
    { winner: null, moves: [] },
    { winner: null, moves: [] },
    { winner: null, moves: [] },
  ],
  currentRound: 0,
  status: "waiting", // "waiting", "in_progress", "finished"
}

export default function LiveBattlePage() {
  const [battleData, setBattleData] = useState(mockBattleData)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showWinPopup, setShowWinPopup] = useState(false)
  const [showLosePopup, setShowLosePopup] = useState(false)
  const [betAmount, setBetAmount] = useState(10)
  const [chat, setChat] = useState<string[]>([])
  const chatRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  useEffect(() => {
    setBattleData((prevData: any) => {
      const newData = {
        ...prevData,
        status: prevData.status === "waiting" ? "in_progress" : prevData.status,
        currentRound: Math.min(prevData.currentRound + 1, prevData.rounds.length - 1),
        agent1: {
          ...prevData.agent1,
          choice: getRandomChoice(),
        },
        agent2: {
          ...prevData.agent2,
          choice: getRandomChoice(),
        },
      }

      const winner = determineWinner(newData.agent1.choice, newData.agent2.choice)
      if (winner) {
        newData.rounds[newData.currentRound].winner = winner
        newData[winner].score += 1
      }

      return newData
    })
    setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60))
    addChatMessage();
  }, [])

  useEffect(() => {
    if (chatRef.current && isAtBottom) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatRef, isAtBottom])

  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10)
    }
  }

  const getRandomChoice = () => {
    const choices = ["rock", "paper", "scissors"]
    return choices[Math.floor(Math.random() * choices.length)]
  }

  const determineWinner = (choice1: string | null, choice2: string | null) => {
    if (choice1 === choice2) return null
    if (
      (choice1 === "rock" && choice2 === "scissors") ||
      (choice1 === "paper" && choice2 === "rock") ||
      (choice1 === "scissors" && choice2 === "paper")
    ) {
      return "agent1"
    }
    return "agent2"
  }

  const addChatMessage = () => {
    const messages = [
      "I'm gonna crush you!",
      "Nice move, but not good enough!",
      "Is that all you've got?",
      "You can't beat my algorithm!",
      "Calculating your defeat...",
      "Prepare to be outsmarted!",
    ]
    const newMessage = `${battleData.agent1.name}: ${messages[Math.floor(Math.random() * messages.length)]}`
    setChat((prev) => [...prev, newMessage])
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-background min-h-screen">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        AI Rock Paper Scissors Battle
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <BattleStage agent1={battleData.agent1} agent2={battleData.agent2} />
          <BattleInfo
            currentRound={battleData.currentRound + 1}
            totalRounds={battleData.rounds.length}
            timeLeft={timeLeft}
            status={battleData.status}
          />
          <BettingSection
            agent1={battleData.agent1}
            agent2={battleData.agent2}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />
        </div>
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="shrink-0">
              <CardTitle>AI Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-secondary/20"
                onScroll={handleScroll}
              >
                {chat.map((message, index) => (
                  <p key={index} className="text-secondary-foreground">
                    {message}
                  </p>
                ))}
              </div>
              <div className="p-4 border-t bg-card">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 rounded-md bg-input text-foreground"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const newMessage = `You: ${e.currentTarget.value}`
                      setChat((prev) => [...prev, newMessage])
                      e.currentTarget.value = ""
                      setIsAtBottom(true)
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <Button onClick={() => setShowWinPopup(true)} className="bg-green-500 hover:bg-green-600">
          Simulate Win
        </Button>
        <Button onClick={() => setShowLosePopup(true)} className="bg-red-500 hover:bg-red-600">
          Simulate Loss
        </Button>
      </div>

      <WinPopup isOpen={showWinPopup} onClose={() => setShowWinPopup(false)} amount={betAmount} />
      <LosePopup isOpen={showLosePopup} onClose={() => setShowLosePopup(false)} amount={betAmount} />
    </main>
  )
}

function BattleStage({ agent1, agent2 }: { agent1: any; agent2: any }) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <AgentDisplay agent={agent1} />
          <div className="text-3xl font-bold text-primary">VS</div>
          <AgentDisplay agent={agent2} />
        </div>
      </CardContent>
    </Card>
  )
}

function AgentDisplay({ agent }: { agent: any }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2 border-4 border-primary">
        <video src={agent.video} className="w-full h-full object-cover" autoPlay loop muted playsInline />
      </div>
      <h2 className="text-xl font-bold text-primary">{agent.name}</h2>
      <p className="text-lg text-accent">Score: {agent.score}</p>
      {agent.choice && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 text-4xl">
          {agent.choice === "rock" ? "🪨" : agent.choice === "paper" ? "📄" : "✂️"}
        </motion.div>
      )}
    </div>
  )
}

function BattleInfo({ currentRound, totalRounds, timeLeft, status }: { currentRound: number; totalRounds: number; timeLeft: number; status: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Battle Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Round:</span>
            <Badge variant="secondary">
              {currentRound} / {totalRounds}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Time Left:</span>
            <Badge variant="destructive">{timeLeft}s</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <Badge variant="outline" className="capitalize">
              {status.replace("_", " ")}
            </Badge>
          </div>
          <Progress value={(timeLeft / 60) * 100} className="w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function BettingSection({ agent1, agent2, betAmount, setBetAmount }: { agent1: any; agent2: any; betAmount: number; setBetAmount: any }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Place Your Bet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <input
            type="range"
            min="1"
            max="100"
            value={betAmount}
            onChange={(e) => setBetAmount(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <span className="ml-4">{betAmount} FLOW</span>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="w-[45%] bg-primary hover:bg-primary/90 text-primary-foreground">
            Bet on {agent1.name}
          </Button>
          <Button variant="outline" className="w-[45%] bg-accent hover:bg-accent/90 text-accent-foreground">
            Bet on {agent2.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

