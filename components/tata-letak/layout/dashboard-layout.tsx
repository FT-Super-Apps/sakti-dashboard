"use client"

import { useState, useEffect } from "react"
import { Header } from "@/penyedia/common"
import Sidebar from "@/tata-letak/layout/sidebar"
import Content from "@/tata-letak/layout/content"

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    const handleNavigationChange = (event: CustomEvent) => {
      setActiveSection(event.detail)
    }

    window.addEventListener("navigationChange", handleNavigationChange as EventListener)
    return () => {
      window.removeEventListener("navigationChange", handleNavigationChange as EventListener)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 pt-14">
          <Content activeSection={activeSection} setActiveSection={setActiveSection} />
        </main>
      </div>
    </div>
  )
}

