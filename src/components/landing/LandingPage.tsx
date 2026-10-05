import { MarketingNav } from './MarketingNav';
import { Hero } from './Hero';
import { VideoSection } from './VideoSection';
import { FeatureGrid } from './FeatureGrid';
import { StepsSection } from './StepsSection';
import { SubjectsShowcase } from './SubjectsShowcase';
import { StatsStrip } from './StatsStrip';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-app text-ink selection:bg-accent/20 selection:text-accent font-sans">
      <MarketingNav onEnter={onEnter} />
      <main>
        <Hero onEnter={onEnter} />
        <VideoSection />
        <FeatureGrid />
        <StepsSection onEnter={onEnter} />
        <SubjectsShowcase onEnter={onEnter} />
        <StatsStrip />
        <FaqSection />
      </main>
      <LandingFooter onEnter={onEnter} />
    </div>
  );
}
