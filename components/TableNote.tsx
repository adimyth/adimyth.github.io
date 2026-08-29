import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableNote({ children }: Props) {
  return <p className="essay-table-note"><strong>What this shows:</strong> {children}</p>;
}
