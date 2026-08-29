import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

type LinkPreviewProps = {
  href: string;
  title: string;
  description: string;
};

export default function LinkPreview({
  href,
  title,
  description,
}: LinkPreviewProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-preview"
    >
      <span className="link-preview-content">
        <span className="link-preview-source">
          <GitHubIcon className="w-4 h-4" />
          GitHub
          <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
        </span>
        <span className="link-preview-title">{title}</span>
        <span className="link-preview-description">{description}</span>
      </span>
    </a>
  );
}
