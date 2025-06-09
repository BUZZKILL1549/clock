"use client"

import * as React from "react"
import {
  AlarmClock,
  Clock4,
  GitGraph,
  Send,
  Globe,
  Clock1
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Timer",
      url: "#timer",
      icon: Clock1
    },
    {
      title: "Stopwatch",
      url: "#stopwatch",
      icon: Clock4 
    },
    {
      title: "Alarm",
      url: "#alarm",
      icon: AlarmClock 
    },
    {
      title: "World Clock",
      url: "#wclock",
      icon: Globe 
    },
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "https://github.com/BUZZKILL1549",
      icon: GitGraph,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
