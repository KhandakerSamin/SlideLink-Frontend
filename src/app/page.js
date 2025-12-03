import Contact from "@/components/HomePage/Contact";
import Dashboard from "@/components/HomePage/dashboard";
import Features from "@/components/HomePage/Feature";
import Footer from "@/components/HomePage/Footer";
import Hero from "@/components/HomePage/Hero";
import Navbar from "@/components/HomePage/Navbar";
import RecentCollections from "@/components/HomePage/recent-collection";


export default function HomePage() {
  return (
    <div className="min-h-screen w-full relative">
      <Navbar />
      <Hero />
      <Dashboard />
      <Features />
      <RecentCollections />
      <Contact />
      <Footer />
    </div>
  )
}
