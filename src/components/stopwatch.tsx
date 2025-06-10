"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function Stopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedMs
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          setElapsedMs(Date.now() - startTimeRef.current)
        }
      }, 10)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setElapsedMs(0)
    setLaps([])
    startTimeRef.current = null
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [elapsedMs, ...prev])
    }
  }

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)

    const pad = (n: number, size: number = 2) => String(n).padStart(size, "0")

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-4xl font-mono">{formatTime(elapsedMs)}</div>
      <div className="flex gap-2">
        <Button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={handleLap} variant="secondary" disabled={!isRunning}>
          Lap
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <div className="mt-4 w-full max-w-xs text-sm font-mono">
          <h3 className="mb-2 text-center font-bold">Laps</h3>
          <ul className="space-y-1 max-h-64 overflow-auto">
            {laps.map((lapTime, index) => {
              const lapNumber = laps.length - index
              const nextLapTime = laps[index + 1] ?? 0
              const lapDiff = lapTime - nextLapTime
              return (
                <li key={index} className="flex justify-between">
                  <span>Lap {lapNumber}</span>
                  <span className="text-right">
                    <div>{formatTime(lapTime)}</div>
                    <div className="text-muted-foreground text-xs">+{formatTime(lapDiff)}</div>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
