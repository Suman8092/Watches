"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { MOCK_JOURNAL_ARTICLES } from "@/lib/woocommerce/mock-data";

export function JournalPreview() {
  return (
    <section className="py-28 md:py-36 bg-[#0B0B0B] text-[#F4F1EA] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
                THE WATCH JOURNAL
              </span>
              <div className="w-8 h-[1px] bg-[#C5A880]" />
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#F4F1EA]">
              ESSAYS &amp; HOROLOGY
            </h2>
            <p className="text-xs md:text-sm text-[#8E877C] font-sans-ui max-w-lg leading-relaxed">
              Curated perspectives on mechanical watchmaking, proportional geometry, and the preservation of timeless artifacts.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/journal"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#C6C0B5] hover:text-[#C5A880] transition-colors pb-1 border-b border-white/20 group"
            >
              <span>View All Journal Volumes</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Editorial Articles (Magazine Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {MOCK_JOURNAL_ARTICLES.map((article) => (
            <article key={article.id} className="group flex flex-col justify-between">
              <div>
                {/* Cover Image */}
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

                {/* Metadata */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#8E877C] mb-3">
                  <span className="text-[#C5A880]">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-[#8E877C] font-sans-ui font-light leading-relaxed mt-3 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Author & Read Link */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#C6C0B5]">
                  By {article.author.name}
                </span>

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
    </section>
  );
}
