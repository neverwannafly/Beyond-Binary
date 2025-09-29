import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { pageVariants } from '@/lib/animations';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
      <Header />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className={`pt-16 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
};
