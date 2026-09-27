"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "@/store/useUserStore";

const STORAGE_KEY_PREFIX = "karma_onboarding_completed_";

export const isOnboardingCompleted = (userId) => {
  if (typeof window === "undefined") return true;
  try {
    if (userId) {
      return localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`) === "true";
    }
    return false;
  } catch (err) {
    console.warn("Could not read localStorage for onboarding status:", err);
    return false;
  }
};

export const markOnboardingCompleted = (userId) => {
  if (typeof window === "undefined") return;
  try {
    if (userId) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, "true");
    } else {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}guest`, "true");
    }
  } catch (err) {
    console.warn("Could not save onboarding status to localStorage:", err);
  }
};

const STEPS = [
  {
    targetSelector: '[data-tour="project-selector"]',
    title: "Choose where you're working",
    description:
      "Projects keep your sessions, tasks, and progress connected. Choose a project to get started.",
    primaryLabel: "Next →",
    secondaryLabel: "Skip",
  },
  {
    targetSelector: '[data-tour="add-task"]',
    title: "Define today's work",
    description:
      "Add something you want to accomplish during your sprint. Your sessions can then be tied to meaningful work.",
    primaryLabel: "Next →",
    secondaryLabel: "← Back",
  },
  {
    targetSelector: '[data-tour="start-session-btn"]',
    title: "Start the work",
    description:
      "Focus on the task. कARMA tracks your time, sessions, and consistency while you work.",
    primaryLabel: "Got it",
    secondaryLabel: "← Back",
  },
];

function findVisibleElement(selector) {
  if (typeof document === "undefined") return null;
  const elements = document.querySelectorAll(selector);
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && el.offsetParent !== null) {
      return el;
    }
  }
  return elements[0] || null;
}

export default function KarmaOnboarding({ userId: propUserId = null }) {
  const storeUserId = useUserStore((state) => state.userId);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const userId = propUserId || storeUserId;

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState(null);
  const [dialogPos, setDialogPos] = useState({ top: 100, left: 16, width: 350 });
  const dialogRef = useRef(null);

  // Clean up legacy global key so it doesn't block accounts
  useEffect(() => {
    try {
      localStorage.removeItem("karma_onboarding_completed");
    } catch (_) {}
  }, []);

  // Ensure current user is fetched if not present
  useEffect(() => {
    if (!userId && setCurrentUser) {
      setCurrentUser();
    }
  }, [userId, setCurrentUser]);

  // Check onboarding status specifically for this user
  useEffect(() => {
    // If userId is not loaded yet, wait for it
    if (!userId) {
      const fallbackTimer = setTimeout(() => {
        if (!userId && !isOnboardingCompleted(null)) {
          setIsOpen(true);
        }
      }, 1500);
      return () => clearTimeout(fallbackTimer);
    }

    // When userId is loaded, check if this specific user has completed onboarding
    const completed = isOnboardingCompleted(userId);
    if (completed) {
      setIsOpen(false);
      return;
    }

    // New account: trigger walkthrough
    const timer = setTimeout(() => {
      if (!isOnboardingCompleted(userId)) {
        setCurrentStep(0);
        setIsOpen(true);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [userId]);

  // Support restarting for testing via window method or custom event
  useEffect(() => {
    const handleRestart = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };

    window.addEventListener("karma:restart-onboarding", handleRestart);
    if (typeof window !== "undefined") {
      window.restartKarmaOnboarding = () => {
        try {
          if (userId) {
            localStorage.removeItem(`${STORAGE_KEY_PREFIX}${userId}`);
          }
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}guest`);
          localStorage.removeItem("karma_onboarding_completed");
        } catch (_) {}
        handleRestart();
      };
    }

    return () => {
      window.removeEventListener("karma:restart-onboarding", handleRestart);
      if (typeof window !== "undefined") {
        delete window.restartKarmaOnboarding;
      }
    };
  }, [userId]);

  // Complete / Skip handler
  const handleComplete = useCallback(() => {
    markOnboardingCompleted(userId);
    setIsOpen(false);
  }, [userId]);

  // Handle Finish on Step 3 - purely complete the walkthrough without starting the timer
  const handleFinish = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  }, [currentStep, handleFinish]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Update spotlight and dialog positioning
  const updatePositions = useCallback(() => {
    if (!isOpen) return;

    const stepData = STEPS[currentStep];
    if (!stepData) return;

    const targetEl = findVisibleElement(stepData.targetSelector);
    if (!targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const style = window.getComputedStyle(targetEl);
    const computedRadius = parseFloat(style.borderRadius) || 16;
    const padding = 6;

    const currentSpotlight = {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      radius: Math.min(computedRadius + padding / 2, 24),
    };
    setSpotlightRect(currentSpotlight);

    // Compute dialog position
    const isMobile = window.innerWidth < 640;
    const dialogWidth = isMobile
      ? window.innerWidth - 32
      : Math.min(360, window.innerWidth - 32);
    const dialogHeight = dialogRef.current ? dialogRef.current.offsetHeight : 210;

    let left = 16;
    let top = 100;

    if (isMobile) {
      // Mobile positioning: avoid target overlap
      left = 16;
      if (rect.bottom < window.innerHeight * 0.52) {
        // Target is in top half; place dialog comfortably below
        top = Math.max(rect.bottom + 16, window.innerHeight - dialogHeight - 20);
      } else {
        // Target is in bottom half; place dialog above
        top = Math.max(76, rect.top - dialogHeight - 16);
      }
    } else {
      // Desktop / Tablet positioning
      if (currentStep === 1) {
        // Step 2: Add Task is in the left sidebar on desktop
        const spaceRight = window.innerWidth - rect.right;
        if (spaceRight >= dialogWidth + 24) {
          left = rect.right + 20;
          top = Math.max(
            76,
            Math.min(
              window.innerHeight - dialogHeight - 20,
              rect.top + rect.height / 2 - dialogHeight / 2
            )
          );
        } else {
          left = Math.max(
            16,
            Math.min(
              window.innerWidth - dialogWidth - 16,
              rect.left + rect.width / 2 - dialogWidth / 2
            )
          );
          top =
            rect.top - dialogHeight - 16 > 76
              ? rect.top - dialogHeight - 16
              : rect.bottom + 16;
        }
      } else {
        // Steps 1 & 3: Centered column targets
        left = Math.max(
          16,
          Math.min(
            window.innerWidth - dialogWidth - 16,
            rect.left + rect.width / 2 - dialogWidth / 2
          )
        );

        if (rect.bottom + dialogHeight + 20 <= window.innerHeight) {
          top = rect.bottom + 16;
        } else {
          top = Math.max(76, rect.top - dialogHeight - 16);
        }
      }
    }

    // Clamp inside viewport
    const clampedLeft = Math.max(
      16,
      Math.min(window.innerWidth - dialogWidth - 16, left)
    );
    const clampedTop = Math.max(
      76,
      Math.min(window.innerHeight - dialogHeight - 16, top)
    );

    setDialogPos({
      top: clampedTop,
      left: clampedLeft,
      width: dialogWidth,
    });
  }, [isOpen, currentStep]);

  // Keep target tracked through resize, scroll, and transitions
  useEffect(() => {
    if (!isOpen) return;

    updatePositions();

    let frameId;
    let count = 0;
    const trackLoop = () => {
      updatePositions();
      count++;
      if (count < 24) {
        frameId = requestAnimationFrame(trackLoop);
      }
    };
    frameId = requestAnimationFrame(trackLoop);

    window.addEventListener("resize", updatePositions, { passive: true });
    window.addEventListener("scroll", updatePositions, { passive: true });
    const interval = setInterval(updatePositions, 300);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
      clearInterval(interval);
    };
  }, [isOpen, currentStep, updatePositions]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleComplete();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleComplete, handleNext, handlePrev]);

  if (!isOpen) return null;

  const currentStepData = STEPS[currentStep];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[90] select-none"
      aria-live="polite"
    >
      {/* Background interaction block layer (prevents accidental clicks on dimmed background) */}
      <div
        className="fixed inset-0 pointer-events-auto"
        onClick={(e) => {
          // Block accidental background clicks during onboarding
          e.stopPropagation();
        }}
      />

      {/* Animated Spotlight with 9999px dimming shadow and subtle gold accent */}
      {spotlightRect && (
        <motion.div
          initial={false}
          animate={{
            x: spotlightRect.x,
            y: spotlightRect.y,
            width: spotlightRect.width,
            height: spotlightRect.height,
            borderRadius: spotlightRect.radius,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            boxShadow:
              "0 0 0 9999px rgba(0, 0, 0, 0.78), 0 0 16px 2px rgba(217, 169, 40, 0.25), inset 0 0 10px rgba(217, 169, 40, 0.08)",
            border: "1.5px solid rgba(217, 169, 40, 0.6)",
            pointerEvents: "none",
            zIndex: 92,
          }}
        />
      )}

      {/* Contextual Dialog */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`tour-title-${currentStep}`}
          aria-describedby={`tour-desc-${currentStep}`}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "fixed",
            top: dialogPos.top,
            left: dialogPos.left,
            width: dialogPos.width,
            zIndex: 100,
          }}
          className="pointer-events-auto rounded-2xl border border-white/10 bg-[#111111]/95 backdrop-blur-md p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] flex flex-col gap-4"
        >
          {/* Header with Step indicator and subtle Skip button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-[#D9A928]/30 bg-[#D9A928]/10 text-[10px] font-semibold text-[#D9A928] tracking-wider uppercase">
                Step {currentStep + 1} of 3
              </span>
              <div className="flex items-center gap-1 ml-1">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentStep
                        ? "w-4 bg-[#D9A928]"
                        : idx < currentStep
                        ? "w-2 bg-white/40"
                        : "w-2 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-target py-1 px-1.5 focus:outline-none focus:ring-1 focus:ring-white/20 rounded"
              aria-label="Skip onboarding"
            >
              Skip
            </button>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-1.5">
            <h3
              id={`tour-title-${currentStep}`}
              className="text-lg font-semibold tracking-tight text-white leading-snug"
            >
              {currentStepData.title}
            </h3>
            <p
              id={`tour-desc-${currentStep}`}
              className="text-sm font-light leading-relaxed text-neutral-300/80"
            >
              {currentStepData.description}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-0.5">
            {currentStep === 0 ? (
              <button
                type="button"
                onClick={handleComplete}
                className="text-xs font-medium text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all cursor-target focus:outline-none focus:ring-1 focus:ring-white/20"
              >
                Skip
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrev}
                className="text-xs font-medium text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all cursor-target focus:outline-none focus:ring-1 focus:ring-white/20 flex items-center gap-1"
              >
                ← Back
              </button>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="text-xs font-semibold text-black bg-[#D9A928] hover:bg-[#e8b937] px-4 py-1.5 rounded-lg transition-all shadow-[0_2px_10px_rgba(217,169,40,0.25)] flex items-center gap-1 cursor-target focus:outline-none focus:ring-2 focus:ring-[#D9A928]/40"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="text-xs font-semibold text-black bg-[#D9A928] hover:bg-[#e8b937] px-4 py-1.5 rounded-lg transition-all shadow-[0_2px_12px_rgba(217,169,40,0.3)] flex items-center gap-1.5 cursor-target focus:outline-none focus:ring-2 focus:ring-[#D9A928]/40"
              >
                Got it
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
