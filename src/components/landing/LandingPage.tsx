import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useReducedMotion } from 'motion/react';
import { MarketingNav } from './MarketingNav';
import { TactileClayHero } from './TactileClayHero';
import { LivingCanvasVisual } from './LivingCanvasVisual';
import { FeatureGrid } from './FeatureGrid';
import { LiveInteractiveSandbox } from './LiveInteractiveSandbox';
import { StepsSection } from './StepsSection';
import { VideoSection } from './VideoSection';
import { SubjectsShowcase } from './SubjectsShowcase';
import { StatsStrip } from './StatsStrip';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';

interface LandingPageProps {
  onEnter: () => void;
  onNavigateLegal?: (tab: 'privacy' | 'terms') => void;
}

export function LandingPage({ onEnter, onNavigateLegal }: LandingPageProps) {
  const reduce = useReducedMotion();

  // Apple/Studio Freight standard: buttery smooth inertial momentum scrolling
  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.3,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduce]);
  return (
    <div className="min-h-screen bg-app text-ink selection:bg-accent/20 selection:text-accent font-sans">
      <MarketingNav onEnter={onEnter} />
      <main>
        <TactileClayHero onEnter={onEnter} />
        <LivingCanvasVisual />
        <FeatureGrid />
        <LiveInteractiveSandbox onEnter={onEnter} />
        <StepsSection onEnter={onEnter} />
        <VideoSection />
        <SubjectsShowcase onEnter={onEnter} />
        <StatsStrip />
        <FaqSection />
      </main>
      <LandingFooter onEnter={onEnter} onNavigateLegal={onNavigateLegal} />
    </div>
  );
}
