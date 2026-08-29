import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

export default function SectionSummary({ children, title = "In brief" }: Props) {
  return (
    <aside className="essay-summary">
      <p className="essay-summary-label">{title}</p>
      <div className="essay-summary-content">{children}</div>
    </aside>
  );
}
