import React from 'react';
import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { ThreeStepExplanation } from '@/components/landing/three-step-explanation';
import { SampleSubmissionsCarousel } from '@/components/landing/sample-carousel';
import { StickyMobileCTA } from '@/components/landing/sticky-mobile-cta';

export default function LandingPage() {
  return (
    <div className="space-y-12 pb-16">
      <Hero />
      <SocialProof />
      <ThreeStepExplanation />
      <SampleSubmissionsCarousel />
      <StickyMobileCTA />
    </div>
  );
}
