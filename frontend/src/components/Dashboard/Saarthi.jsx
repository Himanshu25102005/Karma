"use client";
import {
  IconClock,
  IconTrophy,
  IconAlertTriangle,
  IconBulb,
  IconSparkles,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { AnimatePresence, motion } from "framer-motion";
import useRefreshStore from "@/store/useRefreshStore";

const INSIGHT_CARDS = [
  {
    id: "bestFocusWindow",
    icon: IconClock,
    iconClass: "text-[#8f73ff]",
    label: "Best Focus Window",
    gradient:
      "bg-gradient-to-b from-[#7a5eec]/10 via-transparent to-transparent",
    footerGradient:
      "bg-gradient-to-b from-[#7a5eec]/10 via-transparent to-transparent",
    footerBorder: "border-[#8b7bcc]",
    footerTextClass: "text-[#816cd3] font-mono",
    getMetric: (data) => data?.bestFocusWindow?.timeRange?.trim(),
    getSubMetric: () => "Peak concentration period",
    getInsight: (data) => data?.bestFocusWindow?.insight,
    getFooter: (data) => `${data?.bestFocusWindow?.confidence}% confidence `,
    metricClass: "text-[14.5px]",
  },
  {
    id: "mostProductiveProject",
    icon: IconTrophy,
    iconClass: "text-[#5CE65C]",
    label: "Most Viable Project",
    gradient:
      "bg-gradient-to-b from-[#5CE65C]/10 via-transparent to-transparent",
    footerGradient:
      "bg-gradient-to-b from-[#5CE65C]/10 via-transparent to-transparent",
    footerBorder: "border-[#5CE65C]",
    footerTextClass: "text-[#5CE65C] font-mono",
    getMetric: (data) => data?.mostProductiveProject?.project,
    getSubMetric: (data) => data?.mostProductiveProject?.metric,
    getInsight: (data) => data?.mostProductiveProject?.insight,
    getFooter: () => "Leading",
    metricClass: "text-[15px]",
  },
  {
    id: "focusLeak",
    icon: IconAlertTriangle,
    iconClass: "text-[#d61512]",
    label: "Focus Leak",
    gradient:
      "bg-gradient-to-b from-[#d61512]/10 via-transparent to-transparent",
    footerGradient:
      "bg-gradient-to-b from-[#d61512]/10 via-transparent to-transparent",
    footerBorder: "border-[#d61512]",
    footerTextClass: "text-[#d61512] font-mono",
    getMetric: (data) => data?.focusLeak?.title,
    getSubMetric: () => "Try Distraction-Free Blocks",
    getInsight: (data) => data?.focusLeak?.insight,
    getFooter: () => "Needs Attention",
    metricClass: "text-[15px]",
  },
  {
    id: "recommendation",
    icon: IconBulb,
    iconClass: "text-[#305CDE]",
    label: "Recommendation",
    gradient:
      "bg-gradient-to-b from-[#305CDE]/10 via-transparent to-transparent",
    footerGradient:
      "bg-linear-to-b from-[#305CDE]/10 via-transparent to-transparent",
    footerBorder: "border-[#305CDE]",
    footerTextClass: "text-[#305CDE] font-mono",
    getMetric: (data) => data?.recommendation?.title,
    getSubMetric: () => "कSaarthi",

    getInsight: (data) => data?.recommendation?.insight,
    getFooter: () => "Saarthi\u2019s Suggestion",
    metricClass: "text-[15px]",
  },
];

const cardBaseClass =
  "min-h-[11rem] px-3 sm:px-3.5 py-2 sm:py-2.5 flex flex-col justify-between rounded-xl min-w-0";
const desktopCardClass = `${cardBaseClass} w-1/4 min-w-0 h-full shrink-0 border-r-2 border-neutral-800 last:border-r-0`;

const InsightCard = ({ card, data, className, index = 0 }) => {
  const Icon = card.icon;
  const subMetric = card.getSubMetric(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`${className} ${card.gradient}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 flex-col items-start">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center">
          <Icon height={28} width={28} className={card.iconClass} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-medium truncate">
            {card.label}
          </span>
        </div>
      </div>

      {/* Main Metric */}
      <div className="mt-3 sm:mt-4 flex flex-col gap-0.5 min-w-0">
        <span
          className={`${card.metricClass} font-bold text-[#ffffff] leading-tight font-mono break-words`}
        >
          {card.getMetric(data)}
        </span>
        {subMetric && (
          <span className="text-xs text-neutral-500 truncate">{subMetric}</span>
        )}
      </div>

      {/* Insight */}
      <div className="mt-2 sm:mt-3 min-w-0 flex-1">
        <p className="text-xs sm:text-[13px] text-neutral-300 italic leading-relaxed break-words">{card.getInsight(data)}</p>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between mt-2 border w-fit p-0.5 px-1.5 rounded-md shrink-0 ${card.footerGradient} ${card.footerBorder}`}
      >
        <span className={`text-[11px] sm:text-xs ${card.footerTextClass}`}>
          {card.getFooter(data)}
        </span>
      </div>
    </motion.div>
  );
};

const Saarthi = () => {
  const refreshToggle = useRefreshStore((state) => state.refreshToggle);

  const [data, setData] = useState({});

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchIntell = async () => {
      try {
        const intell = await api.getIntell();
        console.log(intell.data.data);
        setData(intell.data.data.insights);
      } catch (e) {
        console.log("intelligence can not be fetched: ", e);
      }
    };

    fetchIntell();
  }, [refreshToggle]);

  useEffect(() => {
    console.log("API DATA: ", data);
  }, [data]);

  const goPrev = () =>
    setActiveIndex(
      (i) => (i - 1 + INSIGHT_CARDS.length) % INSIGHT_CARDS.length,
    );
  const goNext = () => setActiveIndex((i) => (i + 1) % INSIGHT_CARDS.length);

  return (
    <>
      <div className="h-full w-full min-w-0 flex flex-col">
        <div className="shrink-0 min-h-10 relative w-full flex gap-2 items-center flex-row">
          <div className="text-transparent bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F59E0B] bg-clip-text">
            <IconSparkles
              height={20}
              width={20}
              className="text-[#A855F7]"
              stroke={1.5}
            />
          </div>
          <span className="text-lg sm:text-xl font-semibold tracking-wide text-neutral-200 font-mono">
            कSaarthi AI:
          </span>
        </div>

        {/* Mobile: single card carousel with navigation - UNCHANGED */}
        <div className="sm:hidden w-full flex-1 min-h-0 flex flex-col border border-neutral-800 rounded-xl p-2 bg-neutral-900/10">
          <div className="flex-1 min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <InsightCard
                key={INSIGHT_CARDS[activeIndex].id}
                card={INSIGHT_CARDS[activeIndex]}
                data={data}
                className={`${cardBaseClass} w-full h-full border border-neutral-800/50`}
                index={0}
              />
            </AnimatePresence>
          </div>
          <div className="shrink-0 flex items-center justify-between gap-2 pt-2 mt-1 border-t border-neutral-800/60">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous insight"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors text-xs font-mono"
            >
              <IconChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-xs text-neutral-500 font-mono tabular-nums">
              {activeIndex + 1} / {INSIGHT_CARDS.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next insight"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors text-xs font-mono"
            >
              Next
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tablet & Standard Desktop: 2x2 grid */}
        <div className="hidden sm:grid min-[1700px]:hidden w-full flex-1 min-h-0 grid-cols-2 gap-2 sm:gap-2.5 border border-neutral-800 rounded-xl p-2 sm:p-2.5 bg-neutral-900/10">
          {INSIGHT_CARDS.map((card, index) => (
            <InsightCard
              key={card.id}
              card={card}
              data={data}
              className={`${cardBaseClass} w-full h-full min-h-[10.5rem] border border-neutral-800/40`}
              index={index}
            />
          ))}
        </div>

        {/* Ultra-wide desktop: 4 cards in a single row */}
        {/* <div className="hidden min-[1700px]:flex w-full flex-1 min-h-0 flex-row flex-nowrap items-stretch border border-neutral-800 rounded-xl p-2 sm:p-2.5 bg-neutral-900/10 overflow-visible">
          {INSIGHT_CARDS.map((card, index) => (
            <InsightCard
              key={card.id}
              card={card}
              data={data}
              className={desktopCardClass}
              index={index}
            />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Saarthi;
