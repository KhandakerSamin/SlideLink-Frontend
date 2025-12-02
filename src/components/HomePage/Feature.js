import { Zap, Shield, Eye, Clock } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Create slide collections in under 30 seconds with our intuitive interface",
    },
    {
      icon: Shield,
      title: "No Registration",
      description: "Simple password-based access means no complex registration process",
    },
    {
      icon: Eye,
      title: "Live Updates",
      description: "See submissions as they come in with real-time updates and notifications",
    },
    {
      icon: Clock,
      title: "Auto Cleanup",
      description: "Collections automatically delete after 24 hours to keep things organized",
    },
  ]

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">SlideLink</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built for academic environments with simplicity at its core
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index} 
                className="glass-effect rounded-2xl p-8 border border-indigo-500/10 card-hover hover:border-indigo-500/30 text-center flex flex-col items-center justify-center min-h-[260px]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
    </section>
  )
}
