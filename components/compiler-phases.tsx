"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CompilationResult } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"

interface CompilerPhasesProps {
  result: CompilationResult
}

export function CompilerPhases({ result }: CompilerPhasesProps) {
  const phases = [
    { id: "lexical", name: "Lexical Analysis", data: result.lexicalAnalysis },
    { id: "syntax", name: "Syntax Analysis", data: result.syntaxAnalysis },
    { id: "semantic", name: "Semantic Analysis", data: result.semanticAnalysis },
    { id: "intermediate", name: "Intermediate Code", data: result.intermediateCode },
    { id: "optimization", name: "Optimization", data: result.optimization },
    { id: "codeGen", name: "Code Generation", data: result.codeGeneration },
  ]

  return (
    <Tabs defaultValue="lexical">
      <TabsList className="grid grid-cols-3 md:grid-cols-6">
        {phases.map((phase) => (
          <TabsTrigger key={phase.id} value={phase.id}>
            {phase.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {phases.map((phase) => (
        <TabsContent key={phase.id} value={phase.id}>
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="font-medium mb-2">{phase.name}</h3>

            {phase.id === "syntax" ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-4">
                    <ScrollArea className="h-[350px]">
                      <pre className="text-sm font-mono whitespace-pre">{phase.data}</pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <ScrollArea className="h-[350px]">
                <pre className="text-sm font-mono whitespace-pre-wrap">{phase.data}</pre>
              </ScrollArea>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

