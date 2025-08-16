// components/MdxEditor.tsx
"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { marked } from "marked"   // install: npm install marked

interface MdxEditorProps {
    initialValue?: string
    onSave?: (value: string) => void
}

export function MdxEditor({ initialValue = "", onSave }: MdxEditorProps) {
    const [value, setValue] = useState(initialValue)
    const [mode, setMode] = useState<"edit" | "preview">("edit")

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Button
                    variant={mode === "edit" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode("edit")}
                >
                    Edit
                </Button>
                <Button
                    variant={mode === "preview" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMode("preview")}
                >
                    Preview
                </Button>
            </div>

            {mode === "edit" ? (
                <Textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="min-h-[150px]"
                />
            ) : (
                <div
                    className="prose dark:prose-invert border rounded-md p-3"
                    dangerouslySetInnerHTML={{ __html: marked(value) }}
                />
            )}

            <div className="flex justify-end">
                <Button onClick={() => onSave?.(value)}>Save</Button>
            </div>
        </div>
    )
}