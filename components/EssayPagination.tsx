import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number) {
  return page === 1 ? "/essays" : `/essays/p/${page}`;
}

export default function EssayPagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#d9d4cc]">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a4542] hover:text-[#111111] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Newer
        </Link>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              page === currentPage
                ? "bg-[#111111] text-[#f4f1ea]"
                : "text-[#4a4542] hover:text-[#111111]"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a4542] hover:text-[#111111] transition-colors"
        >
          Older
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
