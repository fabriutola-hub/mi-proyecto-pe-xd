import { motion } from 'framer-motion';

const NeoButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}) => {

  const variants = {
    primary: "bg-black text-white dark:bg-neo-mint dark:text-black border-2 border-black dark:border-neo-mint hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-neo-mint",
    secondary: "bg-white text-black border-2 border-black hover:bg-neo-bg",
    accent: "bg-neo-blue text-white border-2 border-black hover:bg-neo-blue/80",
    outline: "bg-transparent text-black border-2 border-black dark:text-white dark:border-neo-mint hover:bg-black hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95, x: 2, y: 2, boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
      className={`
        font-display font-bold uppercase tracking-wider
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#A8E6CF]
        transition-all duration-100 ease-out
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default NeoButton;
