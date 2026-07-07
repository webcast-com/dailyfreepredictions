import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface Hero3DSliderProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=500&fit=crop",
    title: "Accurate Predictions",
    description: "Expert analysis backed by data-driven insights",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop",
    title: "Real-time Updates",
    description: "Live match data and instant prediction updates",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=500&fit=crop",
    title: "Win with Strategy",
    description: "Maximize your returns with proven betting strategies",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b3?w=1200&h=500&fit=crop",
    title: "Global Coverage",
    description: "Predictions from competitions around the world",
  },
];

export const Hero3DSlider = ({ slides = defaultSlides }: Hero3DSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-64 md:h-80 mb-12 rounded-xl overflow-hidden group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const offset = (index - currentSlide + slides.length) % slides.length;
          const isActive = offset === 0;
          const isPrev = offset === slides.length - 1;
          const isNext = offset === 1;

          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                transform: `
                  perspective(1000px)
                  rotateY(${offset === 0 ? 0 : offset <= slides.length / 2 ? offset * -15 : (offset - slides.length) * 15}deg)
                  translateZ(${offset === 0 ? 0 : offset <= slides.length / 2 ? -offset * 100 : -(slides.length - offset) * 100}px)
                  ${offset === 0 ? "scale(1)" : "scale(0.85)"}
                `,
                opacity: offset === 0 ? 1 : offset <= slides.length / 2 ? 0.3 : 0.3,
                zIndex: slides.length - offset,
              }}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              {/* Content */}
              {isActive && (
                <div className="absolute inset-0 flex items-end p-6 md:p-12 animate-in fade-in duration-500">
                  <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-lg md:text-xl text-slate-200">
                      {slide.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setAutoPlay(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoPlay(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
