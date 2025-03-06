import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Code2, Info } from "lucide-react"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6" />
          <span className="font-bold">Compiler App</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/about">
            <Button variant="ghost" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              About
            </Button>
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

