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
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why Choose SlideLink?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built specifically for academic environments with simplicity and efficiency in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors duration-200">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
