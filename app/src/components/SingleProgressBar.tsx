import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SingleProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
  darkColor?: string;
  darkMode?: boolean;
  animate?: boolean;
  showPercentage?: boolean;
  height?: number;
  borderRadius?: number;
  duration?: number;
  showLabel?: boolean;
  width?: string;
}

export function SingleProgressBar({
  percentage,
  label = '',
  color = '#3B82F6',
  darkColor = '#60A5FA',
  darkMode = false,
  animate = true,
  showPercentage = true,
  height = 8,
  borderRadius = 4,
  duration = 1.5,
  showLabel = true,
  width = '100%',
}: SingleProgressBarProps) {
  const progressRef = useRef<SVGRectElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const progressColor = darkMode ? darkColor : color;
  const trackColor = darkMode ? 'rgb(40, 44, 52)' : '#E5E7EB';

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        width: `${clampedPercentage}%`,
        duration,
        ease: "power3.out",
      });

      if (showPercentage && percentageRef.current) {
        gsap.to(percentageRef.current, {
          textContent: clampedPercentage,
          duration,
          snap: { textContent: 1 },
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, [clampedPercentage, animate, duration, showPercentage]);

  return (
    <div className="w-full" style={{ width }}>
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && (
            <span style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              ref={percentageRef}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {animate ? '0' : clampedPercentage}%
            </span>
          )}
        </div>
      )}

      <div 
        className="relative overflow-hidden" 
        style={{ 
          height: `${height}px`,
          borderRadius: `${borderRadius}px`,
          backgroundColor: trackColor,
          width: '100%'
        }}
      >
        {/* Progress Track */}
        <div
          ref={progressRef as any}
          style={{
            top: 0,
            left: 0,
            height: '100%',
            width: animate ? '0%' : `${clampedPercentage}%`,
            backgroundColor: progressColor,
            borderRadius: `${borderRadius}px`,
            // Ensure both ends are rounded regardless of width
            borderTopRightRadius: clampedPercentage < 100 ? '0' : `${borderRadius}px`,
            borderBottomRightRadius: clampedPercentage < 100 ? '0' : `${borderRadius}px`,
          }}
        />
      </div>
    </div>
  );
}