import { useEffect, useState, useRef } from "react";
import { Shield, Clock, BookOpen, Award } from "lucide-react";
export const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const features = [{
    name: "Quality Assured",
    description: "All exam papers are verified by expert instructors",
    icon: Shield
  }, {
    name: "Instant Access",
    description: "Download exam papers immediately after purchase",
    icon: Clock
  }, {
    name: "Comprehensive Content",
    description: "Wide range of subjects and topics covered",
    icon: BookOpen
  }, {
    name: "Expert Instructors",
    description: "Content created by experienced professionals",
    icon: Award
  }];
  return <div className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose TESTA?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to excel in your exams
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <div key={feature.name} className={`relative transform transition-all duration-1000 delay-${index * 200} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <div className="absolute h-12 w-12 rounded-md bg-blue-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
};