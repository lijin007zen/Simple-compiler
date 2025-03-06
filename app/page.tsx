import { Compiler } from "@/components/compiler"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Online Compiler</h1>
        <p className="text-center mb-8 text-muted-foreground">
          Compile Python and Java code and see the output of each compiler phase
        </p>
        <Compiler />
      </div>
    </main>
  )
}

