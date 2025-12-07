import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export default function PaintText({
  text,
  className,
  paintedColor = "rgb(55, 65, 81)",
  unpaintedColor = "rgba(55, 65, 81, 0.2)",
  animationDuration = 0.8,
  staggerDelay = 0.04,
  ease = [0.33, 1, 0.68, 1],
  bicolor = false,
  secondaryColor = "#e63946",
  secondaryStartWord = null
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  }), [shouldReduceMotion, staggerDelay]);

  const wordVariants = useMemo(() => ({
    hidden: {
      y: "120%",
      rotateX: 40,
      opacity: 0,
      backgroundSize: "0% 100%",
    },
    visible: {
      y: "0%",
      rotateX: 0,
      opacity: 1,
      backgroundSize: "100% 100%",
      transition: {
        y: {
          duration: shouldReduceMotion ? 0 : animationDuration,
          ease: ease,
        },
        rotateX: {
          duration: shouldReduceMotion ? 0 : animationDuration,
          ease: ease,
        },
        opacity: { duration: 0.4 },
        backgroundSize: {
          duration: animationDuration * 0.8,
          delay: 0.1,
          ease: "easeOut",
        },
      },
    },
  }), [shouldReduceMotion, animationDuration, ease]);

  const getWordColor = (index) => {
    if (!bicolor) return paintedColor;
    
    if (secondaryStartWord) {
      const startIndex = words.findIndex(word => 
        word.toLowerCase().includes(secondaryStartWord.toLowerCase())
      );
      return (startIndex !== -1 && index >= startIndex) ? secondaryColor : paintedColor;
    }
    
    const midPoint = Math.floor(words.length / 2);
    return index >= midPoint ? secondaryColor : paintedColor;
  };

  return (
    <motion.span
      className={`${className} leading-tight tracking-tight`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
      style={{ perspective: "1000px", display: "inline-block" }}
    >
      {words.map((word, index) => {
        const wordColor = getWordColor(index);
        
        return (
          <span 
            key={`${word}-${index}`} 
            style={{ 
              display: "inline-block", 
              overflow: "hidden", 
              verticalAlign: "bottom",
              marginRight: "0.25em",
              paddingBottom: "0.1em"
            }}
          >
            <motion.span
              variants={wordVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2 } 
              }}
              style={{
                display: "inline-block",
                color: unpaintedColor,
                backgroundImage: `linear-gradient(to right, ${wordColor}, ${wordColor})`,
                backgroundPosition: "0 0",
                backgroundRepeat: "no-repeat",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                willChange: "transform, background-size",
                transformOrigin: "bottom center",
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
