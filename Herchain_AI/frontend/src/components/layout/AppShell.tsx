import { Outlet } from 'react-router-dom'
import { MobileNav } from './MobileNav'
import { DesktopHeader } from './DesktopHeader'

export function AppShell() {
  return (
    <div className="min-h-screen bg-background">
      <DesktopHeader />
      <main>
        <Outlet />
      </main>
      <MobileNav />
    </div>
  )
}
