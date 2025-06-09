"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Alarm() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [alarmTime, setAlarmTime] = useState<string>("")
  const [alarmActive, setAlarmActive] = useState(false)
  const alarmSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!alarmActive || !alarmTime) return

    const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number)
    const now = new Date()
    if (
      now.getHours() === alarmHours &&
      now.getMinutes() === alarmMinutes &&
      now.getSeconds() === 0
    ) {
      alarmSoundRef.current?.play()
      alert("⏰ Wake up! Your alarm is ringing.")
      setAlarmActive(false)
    }
  }, [currentTime, alarmTime, alarmActive])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: false })

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-6xl font-mono text-lime-400 drop-shadow-lg animate-pulse">
        {formatTime(currentTime)}
      </h1>

      <div className="flex items-center gap-2">
        <Input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
        <Button onClick={() => setAlarmActive(!alarmActive)}>
          {alarmActive ? "Cancel" : "Set Alarm"}
        </Button>
      </div>

      {alarmActive && alarmTime && (
        <div className="text-green-500 font-mono mt-2">
          Alarm set for {alarmTime}
        </div>
      )}

      <audio ref={alarmSoundRef} src="/alarm.mp3" preload="auto" />
    </div>
  )
}
