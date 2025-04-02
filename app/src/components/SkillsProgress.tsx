import React from 'react';
import { SingleProgressBar } from './SingleProgressBar';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  darkColor?: string;
}

interface ProgressBarProps {
  skills: Skill[];
  title?: string;
  darkMode?: boolean;
  animate?: boolean;
}

export function ProgressBar({ 
  skills, 
  title = "", 
  darkMode = false,
  animate = true
}: ProgressBarProps) {
  return (
    <div>
        <h2 style={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
            {title}
        </h2>
        <div style={{ alignItems: "center" }}>
            {skills.map((skill) => (
                <div style={{paddingBottom: "10px"}}>
                    <SingleProgressBar 
                    percentage={skill.percentage} 
                    label={skill.name} 
                    height={7}
                    animate={true}
                    showPercentage={false}
                    width="400px"
                    color={skill.color}
                    darkColor={skill.darkColor || skill.color}
                    darkMode={darkMode}
                    key={skill.name}
                    />
                </div>
            ))}
        </div>
    </div>
  );
}