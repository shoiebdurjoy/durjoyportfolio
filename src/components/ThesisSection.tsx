'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const pipelineStages = [
  {
    step: '01',
    title: 'Raw Bangla Video & Audio Corpus',
    tag: 'Data Acquisition',
    desc: 'Curation of authentic conversational Bangla video clips and speech recordings across diverse speaker demographics.',
    tech: ['Kaggle Datasets', 'Bangla Speech Corpus', 'Audio Segmentation'],
  },
  {
    step: '02',
    title: 'Preprocessing & Temporal Alignment',
    tag: 'Signal Normalization',
    desc: 'Extracting video frames, normalizing audio sample rates to 16kHz, noise reduction, and aligning visual facial crops with acoustic frames.',
    tech: ['FFmpeg', 'Audio Normalization', 'Face Bounding Crops'],
  },
  {
    step: '03',
    title: 'Multimodal Feature Extraction',
    tag: 'Dual Feature Space',
    desc: 'Extracting Mel-Frequency Cepstral Coefficients (MFCC), chromagrams, and visual spatial features from frame sequences simultaneously.',
    tech: ['Librosa', 'Mel-Spectrograms', 'OpenCV Spatial Embeddings'],
  },
  {
    step: '04',
    title: 'Cross-Modal Attention Fusion',
    tag: 'PyTorch / CUDA Model',
    desc: 'Training multimodal neural networks that fuse acoustic temporal embeddings with visual facial action representations via cross-attention.',
    tech: ['PyTorch', 'CUDA Acceleration', 'Cross-Attention Layer'],
  },
  {
    step: '05',
    title: 'Emotion Classification Inference',
    tag: 'Prediction Engine',
    desc: 'Softmax classification predicting Bangla emotional state (Happy, Sad, Angry, Fear, Neutral) with high precision and F1 confidence.',
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
      className="relative py-28 md:py-40 bg-[#06080B] text-[#F8FAFC] border-t border-[rgba(248,250,252,0.06)] overflow-hidden"
    >
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00F2C3]/[0.03] blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(248,250,252,0.08)] mb-16"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] uppercase text-[#00F2C3] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3]" />
              03 // Academic Research
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-tight leading-[0.95] text-[#F8FAFC]">
              Bangla Multimodal<br />
              <span className="text-[#00F2C3] italic font-normal">Emotion Recognition.</span>
            </h2>
          </div>
          <p className="font-sans text-[14px] text-[#F8FAFC]/50 max-w-xs">
            Bachelor&apos;s Thesis at BRAC University · Deep Learning, Computer Vision & Audio Signal Processing.
          </p>
        </motion.div>

        {/* Interactive Visual Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {pipelineStages.map((stage, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? 'border-[#00F2C3] bg-[#0C1017] shadow-[0_0_20px_rgba(0,242,195,0.12)]'
                      : 'border-[rgba(248,250,252,0.08)] bg-[#0C1017]/50 hover:border-[rgba(248,250,252,0.2)]'
                  }`}
                >
                  <span
                    className={`font-mono text-sm font-bold mt-0.5 ${
                      isActive ? 'text-[#00F2C3]' : 'text-[#F8FAFC]/30'
                    }`}
                  >
                    {stage.step}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`font-sans text-[14px] font-semibold ${
                          isActive ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]/70'
                        }`}
                      >
                        {stage.title}
                      </h4>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2C3] animate-pulse" />
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-[#00F2C3]/70 mt-0.5">
                      {stage.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Stage Spotlight Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-xl border border-[#00F2C3]/30 bg-[#0C1017] relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between border-b border-[rgba(248,250,252,0.08)] pb-5 mb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#00F2C3]">
                    Pipeline Stage {pipelineStages[activeStep].step} / 05
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-[#F8FAFC] mt-1">
                    {pipelineStages[activeStep].title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded bg-[#00F2C3]/10 border border-[#00F2C3]/30 font-mono text-[11px] text-[#00F2C3]">
                  {pipelineStages[activeStep].tag}
                </span>
              </div>

              <div className="space-y-6">
                <p className="font-sans text-[15px] leading-[1.8] text-[#F8FAFC]/80">
                  {pipelineStages[activeStep].desc}
                </p>

                <div className="p-4 rounded-lg bg-[#111722] border border-[rgba(248,250,252,0.06)] font-mono text-[11px] space-y-2">
                  <div className="text-[#00F2C3] font-semibold uppercase text-[10px] tracking-[1.5px]">
                    // Frameworks & Techniques
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {pipelineStages[activeStep].tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-[#06080B] border border-[#00F2C3]/20 text-[#F8FAFC] text-[11px]"
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
                    className="font-mono text-[11px] text-[#F8FAFC]/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : prev))
                    }
                    disabled={activeStep === pipelineStages.length - 1}
                    className="font-mono text-[11px] text-[#00F2C3] hover:underline disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
