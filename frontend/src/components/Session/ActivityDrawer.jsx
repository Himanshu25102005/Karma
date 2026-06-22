'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconActivity, IconX } from '@tabler/icons-react'
import LiveCoding from './LiveCoding'
import SessionHistory from './SessionHistory'
import QuickInsight from './QuickInsight'

const ActivityDrawer = ({ isOpen, onOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="sm:hidden w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-neutral-800 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
      >
        <div className="flex items-center gap-2">
          <IconActivity className="h-5 w-5 text-neutral-400" />
          <span className="text-base font-semibold text-white">View Activity</span>
        </div>
        <span className="text-xs text-neutral-500 font-mono">Live · History · Projects</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="sm:hidden fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] flex flex-col rounded-t-2xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Activity drawer"
            >
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <IconActivity className="h-5 w-5 text-neutral-400" />
                  <span className="text-xl font-semibold tracking-tight text-white">Activity</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close activity drawer"
                  className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white transition-colors"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-3 pb-24 custom-scrollbar">
                <LiveCoding compact />
                <SessionHistory compact />
                <QuickInsight compact />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ActivityDrawer
