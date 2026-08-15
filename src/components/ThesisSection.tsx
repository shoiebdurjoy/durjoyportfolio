'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const pipelineStages = [
  {
    step: '01',
    title: 'Raw Bangla Video & Audio Input',
    tag: 'Data Acquisition',
    desc: 'Collection and curation of authentic conversational Bangla video clips and speech recordings.',
    tech: ['Kaggle Datasets', 'Bangla Speech Repositories', 'Custom Audio Captures'],
  },
  {
    step: '02',
    title: 'Preprocessing & Temporal Alignment',
    tag: 'Signal Processing',
    desc: 'Segmenting multi-speaker clips, normalizing sampling rates, audio noise filtering, and frame extraction.',
    tech: ['FFmpeg', 'Audio Trimming', 'Visual Face Bounding Alignment'],
  },
  {
    step: '03',
    title: 'Multimodal Feature Extraction',
    tag: 'Acoustic + Visual',
    desc: 'Extracting Mel-Frequency Cepstral Coefficients (MFCC), chromagrams, and facial action units simultaneously.',
    tech: ['Librosa', 'OpenCV', 'Mel-Spectrograms'],
  },
  {
    step: '04',
    title: 'Deep Learning Model Training',
    tag: 'PyTorch / CUDA',
    desc: 'Training multimodal neural networks combining spatial visual encoders with recurrent temporal acoustic transformers.',
    tech: ['PyTorch', 'CUDA Acceleration', 'Cross-Attention Fusion'],
  },
  {
    step: '05',
    title: 'Multimodal Emotion Classification',
    tag: 'Prediction Engine',
    desc: 'Real-time inference categorizing Bangla emotional state (Happy, Sad, Angry, Surprised, Neutral) with high confidence.',
    tech: ['Softmax Classifier', 'Confusion Matrix Evaluation', 'F1 Metrics'],
  },
];

export default function ThesisSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="thesis"
      ref={containerRef}
      className="relative py-24 md:py-36 border-t border-[rgba(237,234,227,0.06)] bg-[#07090C] overflow-hidden"
    >
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#22D3AE]/[0.03] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[3px] uppercase text-[#22D3AE] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE]" />
            Bachelor Thesis // Machine Learning Research
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black uppercase tracking-[-0.02em] leading-[1] text-[#EDEAE3]">
                Bangla Multimodal Emotion Recognition
              </h2>
              <p className="font-mono text-[12px] text-[#22D3AE] mt-2">
                BRAC University · Deep Learning & Signal Processing
              </p>
            </div>
            <p className="font-sans text-[14px] text-[#EDEAE3]/50 max-w-sm">
              An end-to-end multimodal deep learning pipeline classifying emotions from Bangla speech audio and video streams.
            </p>
          </div>
        </motion.div>

        {/* Interactive Storytelling Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stage Selector */}
          <div className="lg:col-span-5 space-y-3">
            {pipelineStages.map((stage, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? 'border-[#22D3AE] bg-[#0D1117] shadow-[0_0_20px_rgba(34,211,174,0.12)]'
                      : 'border-[rgba(237,234,227,0.08)] bg-[#0D1117]/60 hover:border-[rgba(237,234,227,0.2)]'
                  }`}
                >
                  <span
                    className={`font-mono text-sm font-bold mt-0.5 ${
                      isActive ? 'text-[#22D3AE]' : 'text-[#EDEAE3]/40'
                    }`}
                  >
                    {stage.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-sans text-[14px] font-semibold ${
                          isActive ? 'text-[#EDEAE3]' : 'text-[#EDEAE3]/70'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE] animate-pulse" />
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-[#22D3AE]/70 mt-0.5">
                      {stage.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Stage Detail Spotlight */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-xl border border-[#22D3AE]/30 bg-[#0D1117] relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-[rgba(237,234,227,0.08)] pb-5 mb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#22D3AE]">
                    Pipeline Stage {pipelineStages[activeStep].step} of 05
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-[#EDEAE3] mt-1">
                    {pipelineStages[activeStep].title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded bg-[#22D3AE]/10 border border-[#22D3AE]/30 font-mono text-[11px] text-[#22D3AE]">
                  {pipelineStages[activeStep].tag}
                </span>
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[15px] leading-[1.8] text-[#EDEAE3]/80">
                  {pipelineStages[activeStep].desc}
                </p>

                {/* Pipeline visual flow node */}
                <div className="p-4 rounded-lg bg-[#131920] border border-[rgba(237,234,227,0.06)] font-mono text-[11px] text-[#EDEAE3]/70 space-y-2">
                  <div className="text-[#22D3AE] font-semibold uppercase text-[10px] tracking-[1.5px]">
                    // Tools & Frameworks Applied
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {pipelineStages[activeStep].tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[#0D1117] border border-[#22D3AE]/20 text-[#EDEAE3] text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))}
                    disabled={activeStep === 0}
                    className="font-mono text-[11px] text-[#EDEAE3]/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : prev))
                    }
                    disabled={activeStep === pipelineStages.length - 1}
                    className="font-mono text-[11px] text-[#22D3AE] hover:underline disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
