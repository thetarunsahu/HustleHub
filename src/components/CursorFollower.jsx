import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        const handleMouseEnter = () => setCursorVariant('text');
        const handleMouseLeave = () => setCursorVariant('default');

        const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup event listeners to avoid memory leaks if DOM changes significantly
        // Note: In a real complex app, we might use a MutationObserver or a context for better perf.
        return () => {
            window.removeEventListener("mousemove", mouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []); // Re-run if route changes? Ideally we'd want this to be robust to dynamic content.

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(139, 92, 246, 0.3)", // Purple tint
            border: "1px solid rgba(139, 92, 246, 0.5)",
            mixBlendMode: "difference"
        },
        text: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            height: 80,
            width: 80,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            mixBlendMode: "difference"
        }
    };

    // Only show on desktop/if pointer is fine
    const [isPointer, setIsPointer] = useState(false);
    useEffect(() => {
        setIsPointer(window.matchMedia("(pointer: fine)").matches);
    }, []);

    if (!isPointer) return null;

    return (
        <motion.div
            className="cursor-follower"
            variants={variants}
            animate={cursorVariant}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default CursorFollower;
