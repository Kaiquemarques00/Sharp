import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Plans from '../components/Plans';
import Testimonial from '../components/Testimonial';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Stats />
      <Features />
      <Plans />
      <Testimonial />
      <LeadForm />
      <Footer />
    </div>
  );
}
