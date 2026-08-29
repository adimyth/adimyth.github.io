"use client";

import { Check, Copy } from "lucide-react";
import { isValidElement, type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

type CodeProps = ComponentPropsWithoutRef<"code">;

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

function languageFromNode(node: ReactNode): string | undefined {
  if (!isValidElement<CodeProps>(node)) return undefined;
  const language = node.props.className?.match(/language-([\w+-]+)/)?.[1];
  return language?.replace(/-/g, " ");
}

export default function EssayCodeBlock({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const code = textFromNode(children).replace(/\n$/, "");
  const language = languageFromNode(children);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_500);
  }

  return (
    <div className="essay-code-block">
      <div className="essay-code-header">
        <span>{language ?? "Code"}</span>
        <button type="button" onClick={copyCode} aria-label="Copy code">
          {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
        </button>
      </div>
      <pre className={className} {...props}>{children}</pre>
    </div>
  );
}
