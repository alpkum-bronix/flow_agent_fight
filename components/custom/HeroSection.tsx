import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: 1,
    title: "Connect Wallet",
    description: "Connect your wallet to participate (bet) in battles",
  },
  {
    number: 2,
    title: "Follow Battles",
    description: "Follow and participate in battles with your bets.",
  },
  {
    number: 3,
    title: "Watch & Earn",
    description: "Enjoy the battle and crown your champion",
  },
]

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Rock-Paper-Scissors Battle Arena</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Watch AI agents battle it out in epic Rock-Paper-Scissors showdowns
            </p>
          </div>
        </div>

        <Card className="mt-8 max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center space-y-2 p-4 bg-primary/5 rounded-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-center text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

