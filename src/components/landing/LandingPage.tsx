import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Gallery } from './Gallery';
import { SocialProof } from './SocialProof';
import { Transformation } from './Transformation';
import { Scheduling } from './Scheduling';
import { LocationMap } from './LocationMap';
import { Footer } from './Footer';

interface LandingPageProps {
  onDashboardClick: () => void;
}

export function LandingPage({ onDashboardClick }: LandingPageProps) {
  return (
    <>
      <Navbar onDashboardClick={onDashboardClick} />
      <Hero />
      <Services />
      <Gallery />
      <SocialProof />
      <Transformation />
      <Scheduling />
      <LocationMap />
      <Footer />
    </>
  );
}
