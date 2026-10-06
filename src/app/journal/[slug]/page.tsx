import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { MOCK_JOURNAL_ARTICLES } from "@/lib/woocommerce/mock-data";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = MOCK_JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found — NOIRÉ" };

  return {
    title: `${article.title} — NOIRÉ Journal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = MOCK_JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8E877C] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Journal Archive</span>
        </Link>

        {/* Category & Title */}
        <div className="space-y-4 mb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            {article.category}
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#F4F1EA] font-light leading-tight">
            {article.title}
          </h1>
          <p className="font-serif-display italic text-xl md:text-2xl text-[#C6C0B5]">
            {article.subtitle}
          </p>
        </div>

        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-white/10 text-xs font-mono text-[#8E877C] uppercase tracking-wider mb-10">
          <div className="flex items-center space-x-2">
            <User className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{article.author.name} · {article.author.role}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full bg-[#181818] overflow-hidden border border-white/10 mb-12">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm md:text-base text-[#C6C0B5] font-light leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <p>
            At NOIRÉ, this philosophy guides every tolerance test, bevel cut, and hand-stitched leather band. We create timepieces not simply to count hours, but to anchor consciousness in the beauty of the present.
          </p>
        </div>

        {/* Signoff */}
        <div className="pt-12 mt-12 border-t border-white/10 flex items-center justify-between text-xs text-[#8E877C]">
          <span className="font-serif-display text-lg text-[#F4F1EA]">NOIRÉ Horlogerie S.A.</span>
          <span>Genève Atelier Records</span>
        </div>
      </div>
    </article>
  );
}
