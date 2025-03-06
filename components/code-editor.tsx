"use client"

import { useEffect, useRef } from "react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  language: "python" | "java"
}

export function CodeEditor({ code, setCode, language }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="relative border rounded-md overflow-hidden">
      <div className="absolute top-0 right-0 bg-muted px-2 py-1 text-xs rounded-bl-md">
        {language === "python" ? "Python" : "Java"}
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full min-h-[400px] p-4 font-mono text-sm bg-muted/20 focus:outline-none resize-none"
        spellCheck="false"
      />
    </div>
  )
}

