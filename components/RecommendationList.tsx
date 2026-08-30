import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type StartProps = {
  children: ReactNode;
  name: string;
};

type PathProps = StartProps & {
  condition: string;
};

export default function RecommendationList({ children }: Props) {
  return (
    <ol className="essay-recommendation-list">{children}</ol>
  );
}

export function RecommendationStart({ children, name }: StartProps) {
  return (
    <li className="essay-recommendation-start">
      <p className="essay-recommendation-kicker">Start here</p>
      <p className="essay-recommendation-name">{name}</p>
      <div className="essay-recommendation-description">{children}</div>
    </li>
  );
}

export function RecommendationPath({ children, condition, name }: PathProps) {
  return (
    <li className="essay-recommendation-path">
      <p className="essay-recommendation-condition">{condition}</p>
      <p className="essay-recommendation-name">{name}</p>
      <div className="essay-recommendation-description">{children}</div>
    </li>
  );
}
