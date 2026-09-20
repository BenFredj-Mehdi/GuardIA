import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  as: Component = motion.div,
  ...props
}) {
  return (
    <Component
      className={`glass-panel ${hover ? 'glass-panel-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
