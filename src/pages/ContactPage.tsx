import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Twitter,
  Send,
  MapPin,
  Clock
} from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission
    console.log('Form submitted:', formData);
    alert('Thanks for your message! I\'ll get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageLayout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <FadeInView className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Get In Touch 💬
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                I'm always interested in new opportunities, collaborations, or just having a chat about tech, climbing, or anything in between.
              </motion.p>
            </FadeInView>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <FadeInView direction="left">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageCircle className="mr-2" size={20} />
                        Let's Connect
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-muted-foreground" size={16} />
                        <span className="text-sm">Based in Colorado, USA</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="text-muted-foreground" size={16} />
                        <span className="text-sm">Usually responds within 24 hours</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="text-muted-foreground" size={16} />
                        <a href="mailto:hello@example.com" className="text-sm text-primary hover:underline">
                          hello@example.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInView>

                {/* Social Links */}
                <FadeInView direction="left" delay={0.2}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Find Me Online</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a 
                        href="https://github.com/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Github size={20} />
                        <div>
                          <div className="font-medium">GitHub</div>
                          <div className="text-sm text-muted-foreground">Check out my code</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/in/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Linkedin size={20} />
                        <div>
                          <div className="font-medium">LinkedIn</div>
                          <div className="text-sm text-muted-foreground">Professional network</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://twitter.com/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Twitter size={20} />
                        <div>
                          <div className="font-medium">Twitter</div>
                          <div className="text-sm text-muted-foreground">Thoughts and updates</div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </FadeInView>

                {/* Quick Contact Options */}
                <FadeInView direction="left" delay={0.4}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-4">
                        Prefer a different way to reach out?
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="mailto:hello@example.com">
                            <Mail size={16} className="mr-2" />
                            Send Email
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <Clock size={16} className="mr-2" />
                            Schedule a Call
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInView>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <FadeInView direction="right">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Me a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's this about?"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me more about your project, question, or just say hello!"
                            rows={6}
                            required
                          />
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button type="submit" className="w-full" size="lg">
                            <Send size={16} className="mr-2" />
                            Send Message
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </FadeInView>
              </div>
            </div>

            {/* FAQ Section */}
            <FadeInView>
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">🚀 What kind of projects do you work on?</h4>
                      <p className="text-sm text-muted-foreground">
                        I love working on web applications, APIs, and full-stack projects. 
                        Especially interested in React, Node.js, and TypeScript projects.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">⏰ What's your availability like?</h4>
                      <p className="text-sm text-muted-foreground">
                        I'm currently open to freelance projects and interesting collaborations. 
                        Response time is usually within 24 hours.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">🎯 Do you mentor or do code reviews?</h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! I enjoy helping other developers grow. 
                        Feel free to reach out about mentoring or code review sessions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">🏔️ Can we talk about outdoor adventures?</h4>
                      <p className="text-sm text-muted-foreground">
                        Always! I love connecting with fellow climbers, kayakers, and outdoor enthusiasts. 
                        Let's share stories and maybe plan an adventure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
