import { motion } from 'framer-motion';
import { ProjectShowcase } from './ProjectShowcase';
import { FadeInView } from '@/components/animations/FadeInView';

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Section Header */}
          <FadeInView className="text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              My Work
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A collection of projects I've built, from web applications to mobile apps. 
              Each project represents a journey of learning, problem-solving, and creative expression.
            </motion.p>
          </FadeInView>

          {/* Projects Showcase */}
          <ProjectShowcase />

          {/* Call to Action */}
          <FadeInView className="text-center">
            <div className="bg-secondary/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Interested in collaborating?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always excited to work on new projects and challenges. 
                Let's build something amazing together!
              </p>
              <motion.a
                href="#contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
