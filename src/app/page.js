import Contact from "@/components/HomePage/Contact";
import Dashboard from "@/components/HomePage/dashboard";
import Features from "@/components/HomePage/Feature";
import Footer from "@/components/HomePage/Footer";
import Hero from "@/components/HomePage/Hero";
import Navbar from "@/components/HomePage/Navbar";
import RecentCollections from "@/components/HomePage/recent-collection";


export default function HomePage() {
  return (
    <div className="min-h-screen w-full dark-sphere-bg relative">
      {/* Dark Sphere Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Dashboard />
        <Features />
        <RecentCollections />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
