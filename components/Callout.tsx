import type { ReactNode } from "react";

type CalloutKind = "note" | "takeaway" | "caveat" | "decision";

type Props = {
  children: ReactNode;
  kind?: CalloutKind;
  title?: string;
};

const labels: Record<CalloutKind, string> = {
  note: "Note",
  takeaway: "Key takeaway",
  caveat: "Caveat",
  decision: "Decision",
};

export default function Callout({ children, kind = "note", title }: Props) {
  return (
    <aside className={`essay-callout essay-callout-${kind}`}>
      <p className="essay-callout-label">{title ?? labels[kind]}</p>
      <div className="essay-callout-content">{children}</div>
    </aside>
  );
}
