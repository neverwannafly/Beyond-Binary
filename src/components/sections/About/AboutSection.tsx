import { motion } from 'framer-motion';
import { FadeInView } from '@/components/animations/FadeInView';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="space-y-20">
          {/* Section Header */}
          <FadeInView className="text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Get to Know Me
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm more than just a developer. I'm an adventurer, a learner, 
              and someone who believes in the power of both code and human connection.
            </motion.p>
          </FadeInView>


          {/* Stats Display */}
          <div>
            <FadeInView className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">By the Numbers</h3>
              <p className="text-muted-foreground">
                Some fun facts about my journey so far
              </p>
            </FadeInView>
          </div>

          {/* Interests */}
          <div>
            <FadeInView className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">What Drives Me</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My diverse interests shape how I approach problems and find creative solutions
              </p>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
};
