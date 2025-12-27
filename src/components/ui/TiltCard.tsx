import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', intensity = 15 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        setRotateX(yPct * -intensity);
        setRotateY(xPct * intensity);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className={`cursor-pointer ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
