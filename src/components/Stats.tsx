import React, { useState, useEffect, useRef } from 'react';
import { stats } from '../data/stats';

const CountUp: React.FC<{
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}> = ({ end, duration, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <div ref={countRef}>{prefix}{count.toLocaleString()}{suffix}</div>;
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-stats-pattern bg-cover bg-fixed">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <h3 className="text-gold font-display text-4xl md:text-5xl font-bold mb-2">
                <CountUp 
                  end={stat.value} 
                  duration={2000} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              </h3>
              <p className="text-silver text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;