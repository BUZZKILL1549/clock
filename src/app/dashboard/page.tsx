"use client"

import { useState, useEffect } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Timer } from "@/components/timer"
import { Alarm } from "@/components/alarm"
import { Stopwatch } from "@/components/stopwatch"
import { WorldClock } from "@/components/worldclock"
import { Play, Pause, RotateCw } from "lucide-react"
import { Select } from "@/components/ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Input } from "@/components/ui/input"

const breadcrumbMap: Record<string, string> = {
  "#timer": "Timer",
  "#stopwatch": "Stopwatch",
  "#alarm": "Alarm",
  "#wclock": "World Clock"
};

export default function Page() {
  const [currentHash, setCurrentHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const currentPage = breadcrumbMap[currentHash] ?? "Dashboard";

  const renderContent = () => {
    switch (currentPage) {
      case "Timer":
        return <Timer />;
      case "Stopwatch":
        return <Stopwatch />;
      case "Alarm":
        return <Alarm />;
      case "World Clock":
        return <WorldClock />;
      default:
        return <div>Welcome to dashboard</div>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Clock</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
