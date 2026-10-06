import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MOCK_JOURNAL_ARTICLES } from "@/lib/woocommerce/mock-data";

export const metadata = {
  title: "The Watch Journal — NOIRÉ Horological Perspectives",
  description: "Essays on mechanical watchmaking, proportional geometry, and horological history.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-white/10 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            VOLUME IV · THE HOROLOGICAL JOURNAL
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl text-[#F4F1EA] font-light">
            PERSPECTIVES &amp; ESSAYS
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-sans-ui font-light leading-relaxed">
            Written by our master watchmakers, design curators, and historians exploring the eternal dialog between mechanics, human time, and contemporary aesthetics.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_JOURNAL_ARTICLES.map((article) => (
            <article key={article.id} className="group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/11] w-full bg-[#181818] overflow-hidden border border-white/10 mb-6">
                  <Link href={`/journal/${article.slug}`} className="block w-full h-full">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#8E877C] mb-3">
                  <span className="text-[#C5A880]">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="font-serif-display text-2xl text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors leading-snug">
                  <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="text-xs text-[#8E877C] font-sans-ui font-light leading-relaxed mt-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#C6C0B5]">By {article.author.name}</span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="text-[11px] uppercase tracking-widest text-[#C5A880] group-hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
