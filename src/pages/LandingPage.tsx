import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import ProblemSection from '../components/ProblemSection';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import ProductPreview from '../components/ProductPreview';
import Platforms from '../components/Platforms';
import Benefits from '../components/Benefits';
import ProjectInfo from '../components/ProjectInfo';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 selection:text-white font-sans">
      <Navbar />
      
      <main>
        <Hero />
        <Metrics />
        <ProblemSection />
        <Features />
        <Workflow />
        <ProductPreview />
        <Platforms />
        <Benefits />
        <ProjectInfo />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
