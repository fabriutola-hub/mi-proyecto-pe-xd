import { motion } from "framer-motion";

export const Card = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5 }}
      className={`glass-panel p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};
