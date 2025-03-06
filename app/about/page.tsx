import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Compiler
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8">About the Compiler</h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-center mb-8">
            This online compiler was developed to demonstrate the six phases of compilation for educational purposes. It
            supports Python and Java code and visualizes each step of the compilation process.
          </p>

          <h2 className="text-2xl font-semibold text-center mb-6">Development Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DeveloperCard name="KIRUTHICK" role="Developer" bio="" />

            <DeveloperCard name="SAKTHI VEL" role="Developer" bio="" />

            <DeveloperCard name="SIVASAKTHI" role="Developer" bio="" />

            <DeveloperCard name="DHANANJEYAN" role="Developer" bio="" />
          </div>
        </div>
      </div>
    </main>
  )
}

function DeveloperCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{bio}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

