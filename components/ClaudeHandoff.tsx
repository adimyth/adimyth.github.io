"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Send, X } from "lucide-react";

const MAX_SELECTION_LENGTH = 12_000;
type SelectionRect = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export default function ClaudeHandoff() {
  const rangeRef = useRef<Range | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRects, setSelectionRects] = useState<SelectionRect[]>([]);
  const [instruction, setInstruction] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    function captureSelection() {
      const selection = window.getSelection();
      const article = document.getElementById("essay-content");
      if (!selection || selection.isCollapsed || !article?.contains(selection.anchorNode)) return;

      const text = selection.toString().replace(/\s+/g, " ").trim();
      if (text) {
        const range = selection.getRangeAt(0).cloneRange();
        rangeRef.current = range;
        setSelectionRects(Array.from(range.getClientRects(), ({ height, left, top, width }) => ({ height, left, top, width })));
        setSelectedText(text.slice(0, MAX_SELECTION_LENGTH));
        setStatus("idle");
        setError("");
      }
    }

    document.addEventListener("mouseup", captureSelection);
    document.addEventListener("keyup", captureSelection);
    document.addEventListener("touchend", captureSelection);
    return () => {
      document.removeEventListener("mouseup", captureSelection);
      document.removeEventListener("keyup", captureSelection);
      document.removeEventListener("touchend", captureSelection);
    };
  }, []);

  useEffect(() => {
    function repositionHighlight() {
      const range = rangeRef.current;
      if (!range) return;
      setSelectionRects(Array.from(range.getClientRects(), ({ height, left, top, width }) => ({ height, left, top, width })));
    }

    window.addEventListener("resize", repositionHighlight);
    window.addEventListener("scroll", repositionHighlight, true);
    return () => {
      window.removeEventListener("resize", repositionHighlight);
      window.removeEventListener("scroll", repositionHighlight, true);
    };
  }, []);

  function clearSelectedText() {
    rangeRef.current = null;
    setSelectionRects([]);
    setSelectedText("");
    setInstruction("");
    setStatus("idle");
  }

  async function sendToClaude() {
    if (!selectedText || !instruction.trim()) return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:3947/handoff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedText,
          instruction: instruction.trim(),
        }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "The local receiver did not accept the message.");
      setStatus("sent");
      setInstruction("");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Could not reach the local receiver.");
    }
  }

  if (!selectedText) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
        {selectionRects.map((rect, index) => <span key={`${rect.left}-${rect.top}-${index}`} className="fixed rounded-sm bg-[#e8cb77]/65" style={rect} />)}
      </div>
      <aside className="fixed bottom-5 right-5 z-50 w-[min(25rem,calc(100vw-2.5rem))] rounded-2xl border border-line-strong bg-surface p-4 shadow-[0_16px_48px_rgb(54_48_42/18%)]" aria-label="Send selected text">
        <div className="flex items-start justify-between gap-4">
          <div className="text-sm font-bold text-ink">Selected text</div>
          <button type="button" onClick={clearSelectedText} className="rounded p-1 text-faint hover:bg-muted hover:text-ink" aria-label="Close"><X className="size-4" /></button>
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-quiet">“{selectedText}”</p>
        <label className="mt-3 block text-xs font-semibold text-quiet" htmlFor="selection-instruction">Your instruction</label>
        <textarea id="selection-instruction" value={instruction} onChange={(event) => setInstruction(event.target.value)} maxLength={4_000} placeholder="Tell it exactly what to do or not do." rows={3} className="mt-1 w-full resize-none rounded-xl border border-line-strong bg-paper px-3 py-2 text-sm leading-5 text-ink outline-none placeholder:text-faint focus:border-line-hover" />
        {status === "error" && <p className="mt-2 text-xs leading-5 text-[#a13c32]">{error} Run the setup command in the README and refresh this page.</p>}
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={sendToClaude} disabled={!instruction.trim() || status === "sending" || status === "sent"} className="inline-flex items-center gap-2 rounded-full bg-inverse px-4 py-2 text-sm font-bold text-inverse-fg transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60">
            {status === "sent" ? <><Check className="size-4" /> Sent</> : <><Send className="size-4" /> {status === "sending" ? "Sending" : "Send"}</>}
          </button>
        </div>
      </aside>
    </>
  );
}
