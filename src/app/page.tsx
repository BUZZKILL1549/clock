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
import TimerPage from "@/app/(clock)/timer/page"
import AlarmPage from "@/app/(clock)/alarm/page"
import StopwatchPage from "@/app/(clock)/stopwatch/page"
import WorldClockPage from "@/app/(clock)/worldclock/page"
import RootPage from "@/app/(clock)/page"

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
        return <TimerPage />;
      case "Stopwatch":
        return <StopwatchPage />;
      case "Alarm":
        return <AlarmPage />;
      case "World Clock":
        return <WorldClockPage />;
      default:
        return <RootPage />;
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
        </header> <div className="p-4">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
