import Contact from "@/components/HomePage/Contact";
import Features from "@/components/HomePage/Feature";
import Footer from "@/components/HomePage/Footer";
import Hero from "@/components/HomePage/Hero";
import Navbar from "@/components/HomePage/Navbar";
import RecentCollections from "@/components/HomePage/Recent-Collection";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <RecentCollections />
      <Contact />
      <Footer />
    </div>
  )
}
