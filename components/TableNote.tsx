import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Overrides the leading label. Defaults to "What this shows". */
  label?: string;
};

export default function TableNote({ children, label = "What this shows" }: Props) {
  return <p className="essay-table-note"><strong>{label}:</strong> {children}</p>;
}
