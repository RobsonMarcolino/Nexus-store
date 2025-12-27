import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
    const [glitchedText, setGlitchedText] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            // Random chance to glitch
            if (Math.random() > 0.95) {
                const chars = text.split('');
                const glitchChars = '!@#$%^&*<>?[]{}=+';

                // Glitch 1-2 characters
                const idx1 = Math.floor(Math.random() * chars.length);
                const idx2 = Math.floor(Math.random() * chars.length);
                chars[idx1] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                chars[idx2] = glitchChars[Math.floor(Math.random() * glitchChars.length)];

                setGlitchedText(chars.join(''));

                // Reset quickly
                setTimeout(() => setGlitchedText(text), 100 + Math.random() * 200);
            }
        }, 100); // Check every 100ms

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{glitchedText}</span>
            {glitchedText !== text && (
                <>
                    <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-70 animate-pulse">{text}</span>
                    <span className="absolute top-0 left-0 -ml-0.5 text-blue-500 opacity-70">{text}</span>
                </>
            )}
        </div>
    );
};

export default GlitchText;
