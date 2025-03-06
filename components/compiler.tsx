"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeEditor } from "@/components/code-editor"
import { CompilerPhases } from "@/components/compiler-phases"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play } from "lucide-react"
import { compileCode } from "@/lib/compiler-utils"
import type { CompilationResult } from "@/lib/types"

const PYTHON_SAMPLE = `def greet(name):
    print(f"Hello, {name}!")

greet("World")`

const JAVA_SAMPLE = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`

// Mock executeCode function
const executeCode = (code: string, language: string): string => {
  if (language === "python") {
    try {
      // Basic Python execution (using eval for demonstration purposes only - VERY UNSAFE for production)
      // In a real application, use a secure sandboxed environment
      // eslint-disable-next-line no-eval
      const result = eval(code)
      return result ? result.toString() : "No output"
    } catch (error: any) {
      return `Error: ${error.message}`
    }
  } else if (language === "java") {
    return "Java execution is not supported in this example."
  } else {
    return "Language not supported."
  }
}

export function Compiler() {
  const [language, setLanguage] = useState<"python" | "java">("python")
  const [code, setCode] = useState(PYTHON_SAMPLE)
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null)
  const [isCompiling, setIsCompiling] = useState(false)
  // Add a new state for code output
  const [codeOutput, setCodeOutput] = useState<string>("")
  // Add a new state for compilation status
  const [compilationStatus, setCompilationStatus] = useState<string | null>(null)

  const handleLanguageChange = (value: string) => {
    const newLanguage = value as "python" | "java"
    setLanguage(newLanguage)
    setCode(newLanguage === "python" ? PYTHON_SAMPLE : JAVA_SAMPLE)
    setCompilationResult(null)
    setCodeOutput("")
  }

  // Modify the handleCompile function to include error checking and status message
  const handleCompile = () => {
    setIsCompiling(true)
    setCompilationStatus(null)

    // Simulate compilation delay
    setTimeout(() => {
      try {
        // Check for syntax errors in the code
        let hasError = false

        if (language === "python") {
          // Simple Python syntax error checks
          hasError =
            (code.includes("print(") && !code.includes(")")) ||
            (code.includes("def ") && !code.includes(":")) ||
            (code.includes("if ") && !code.includes(":"))
        } else if (language === "java") {
          // Simple Java syntax error checks
          hasError =
            (code.includes("{") && !code.includes("}")) ||
            (code.includes("System.out.println(") && !code.includes(");")) ||
            !code.includes("public class")
        }

        if (hasError) {
          throw new Error("Syntax error detected")
        }

        const result = compileCode(code, language)
        setCompilationResult(result)

        // Execute the code and get the output
        const output = executeCode(code, language)
        setCodeOutput(output)

        // Set successful compilation status
        setCompilationStatus("Compilation successful")
      } catch (error) {
        // Set failed compilation status
        setCompilationStatus("Compilation failed")
        setCompilationResult(null)
        setCodeOutput("")
      } finally {
        setIsCompiling(false)
      }
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Code Editor</CardTitle>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardDescription>Write your {language === "python" ? "Python" : "Java"} code here</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeEditor code={code} setCode={setCode} language={language} />
          {/* Add this after the CodeEditor component in the CardContent */}
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Code Output:</h3>
            
          </div>

          {/* Add compilation status message */}
          {compilationStatus && (
            <div
              className={`mt-2 text-sm font-medium ${compilationStatus.includes("successful") ? "text-green-500" : "text-red-500"}`}
            >
              {compilationStatus}
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCompile} disabled={isCompiling} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {isCompiling ? "Compiling..." : "Compile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Compilation Phases</CardTitle>
          <CardDescription>View the output of each phase of the compilation process</CardDescription>
        </CardHeader>
        <CardContent>
          {compilationResult ? (
            <CompilerPhases result={compilationResult} />
          ) : (
            <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Compile your code to see the phases</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

