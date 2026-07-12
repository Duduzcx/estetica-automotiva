import { lazy, Suspense } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
const Gallery = lazy(() => import('./Gallery').then(m => ({ default: m.Gallery })));
const SocialProof = lazy(() => import('./SocialProof').then(m => ({ default: m.SocialProof })));
const Transformation = lazy(() => import('./Transformation').then(m => ({ default: m.Transformation })));
const Scheduling = lazy(() => import('./Scheduling').then(m => ({ default: m.Scheduling })));
const LocationMap = lazy(() => import('./LocationMap').then(m => ({ default: m.LocationMap })));
const Footer = lazy(() => import('./Footer').then(m => ({ default: m.Footer })));

interface LandingPageProps {
  onDashboardClick: () => void;
}

export function LandingPage({ onDashboardClick }: LandingPageProps) {
  return (
    <>
      <Navbar onDashboardClick={onDashboardClick} />
      <Hero />
      <Services />
      <Suspense fallback={null}>
        <Gallery />
        <SocialProof />
        <Transformation />
        <Scheduling />
        <LocationMap />
        <Footer />
      </Suspense>
    </>
  );
}
