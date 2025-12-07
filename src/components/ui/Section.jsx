import { motion } from "framer-motion";

export const Section = ({ id, className = "", children, ...props }) => {
  return (
    <section
      id={id}
      className={`relative w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};
