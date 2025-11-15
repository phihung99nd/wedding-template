import { Navigation } from "@/components/Navigation"
import { HomeSection } from "@/components/sections/HomeSection"
import { CoupleSection } from "@/components/sections/CoupleSection"
import { DividerSection } from "@/components/sections/DividerSection"
import { LoveStorySection } from "@/components/sections/LoveStorySection"
import { AlbumSection } from "@/components/sections/AlbumSection"
import { TimelineSection } from "@/components/sections/TimelineSection"
import { GuestbookSection } from "@/components/sections/GuestbookSection"
import { QRSection } from "@/components/sections/QRSection"
import { HeartDropOverlay } from "@/components/HeartDropOverlay"
import { LoadingOverlay } from "@/components/LoadingOverlay"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen">
      <LoadingOverlay />
      <Navigation />
      <main>
        <HomeSection />
        <CoupleSection />
        <DividerSection />
        <LoveStorySection />
        <AlbumSection />
        <TimelineSection />
        <GuestbookSection />
        <QRSection />
      </main>
      <HeartDropOverlay />
    </div>
  )
}

export default App
