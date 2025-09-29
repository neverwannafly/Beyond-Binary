import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TerminalIntro } from './TerminalIntro';
import { FadeInView } from '@/components/animations/FadeInView';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

export const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Introduction */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={staggerItem} className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold tracking-tight"
                variants={staggerItem}
              >
                Hey, I'm{' '}
                <span className="text-primary">Shubham</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground max-w-lg"
                variants={staggerItem}
              >
                A passionate software engineer who loves building digital experiences, 
                conquering mountains, and exploring virtual worlds.
              </motion.p>
            </motion.div>

            <motion.div 
              variants={staggerItem}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" onClick={scrollToAbout}>
                Explore My World
              </Button>
              <Button variant="outline" size="lg">
                View Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={staggerItem}
              className="flex space-x-4"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:hello@example.com"
                className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Terminal */}
          <FadeInView direction="right" delay={0.5}>
            <div className="flex justify-center">
              <TerminalIntro />
            </div>
          </FadeInView>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 9, duration: 0.6 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
