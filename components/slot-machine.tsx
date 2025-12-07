"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SlotMachine() {
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3])
  const [isSpinning, setIsSpinning] = useState([false, false, false])

  const spinSlots = async () => {
    if (isSpinning.some(Boolean)) return

    // Generate final random numbers
    const newNumbers = [
      Math.floor(Math.random() * 3) + 1,
      Math.floor(Math.random() * 3) + 1,
      Math.floor(Math.random() * 3) + 1,
    ]

    // Start spinning all slots
    setIsSpinning([true, true, true])

    // Stop each slot at different times for staggered effect
    setTimeout(() => {
      setIsSpinning(prev => [false, prev[1], prev[2]])
      setNumbers(prev => [newNumbers[0], prev[1], prev[2]])
    }, 2000)

    setTimeout(() => {
      setIsSpinning(prev => [prev[0], false, prev[2]])
      setNumbers(prev => [prev[0], newNumbers[1], prev[2]])
    }, 2500)

    setTimeout(() => {
      setIsSpinning([false, false, false])
      setNumbers(newNumbers)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
          Lucky Smoothie
        </h1>
        <p className="text-muted-foreground text-lg">{"วันนีจะได้ดื่มอะไรดีน้า!"}</p>
      </div>

      <Card className="p-8 bg-card shadow-2xl border-2 border-primary shadow-primary/20">
        <div className="flex gap-4 mb-8">
          {numbers.map((num, index) => (
            <div
              key={index}
              className="relative w-24 h-32 bg-secondary rounded-lg border-4 border-primary overflow-hidden shadow-lg shadow-primary/30"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-6xl font-bold text-primary ${isSpinning[index] ? "animate-spin-slot" : ""}`}>
                  {isSpinning[index] ? (
                    <div className="flex flex-col gap-4">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>1</span>
                    </div>
                  ) : (
                    num
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={spinSlots}
          disabled={isSpinning.some(Boolean)}
          size="lg"
          className="w-full text-xl font-bold h-14 bg-white hover:bg-white/90 text-black shadow-lg shadow-primary/50 transition-all duration-300"
        >
          {isSpinning.some(Boolean) ? "Spinning..." : "SPIN"}
        </Button>
      </Card>

      
    </div>
  )
}
