"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp"

const presets = [
  /* values are in seconds cuz i think thatll be easier for something or the other idk */
  {
    value: "60",
    label: "1 minute"
  },
  {
    value: "120",
    label: "2 minutes"
  },
  {
    value: "300",
    label: "5 minutes"
  },
  {
    value: "600",
    label: "10 minutes"
  },
  {
    value: "900",
    label: "15 minutes"
  },
  {
    value: "1200",
    label: "20 minutes"
  },
  {
    value: "1500",
    label: "25 minutes"
  },
  {
    value: "1800",
    label: "30 minutes"
  }
]

export function Timer() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <section id="timer" className="flex flex-col items-center justify-center m-5">
      <div className="flex flex-col justify-center">
        <div className="mb-5">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? presets.find((preset) => preset.value === value)?.label
              : "Select preset..."
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search preset..." />
            <CommandList>
              <CommandEmpty>No preset found.</CommandEmpty>
              <CommandGroup>
                {presets.map((preset) => (
                  <CommandItem
                    key={preset.value}
                    value={preset.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === preset.value ? "opacity-100" : "opacity-0" )} />
                    {preset.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex-col mt-5">
        <Button>Set Timer</Button>
      </div>
    </section>
  )
}
