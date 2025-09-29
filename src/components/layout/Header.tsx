import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { SearchDialog } from '@/components/search/SearchDialog';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useSearch } from '@/hooks/useSearch';
import { navigationItems } from '@/types/navigation';
import { Menu, X, Search } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const location = useLocation();
  const { isSearchOpen, setIsSearchOpen, openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="text-xl font-bold cursor-pointer"
              >
                <span className="text-primary">{'<'}</span>
                <span>Portfolio</span>
                <span className="text-primary">{'/>'}</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`text-foreground/80 hover:text-foreground transition-colors relative ${
                      isActivePath(item.path) ? 'text-primary font-medium' : ''
                    }`}
                  >
                    {item.label}
                    {isActivePath(item.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Selector for Desktop */}
              <div className="hidden md:block">
                <ThemeSelector compact />
              </div>
              
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center space-x-2"
                onClick={openSearch}
              >
                <Search size={14} />
                <span className="text-sm">Search</span>
                <kbd className="ml-2 hidden lg:inline-block px-1.5 py-0.5 text-xs bg-secondary rounded border border-border">
                  Ctrl+/
                </kbd>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-30 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <motion.div
          className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: isMobileMenuOpen ? 0 : -100, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-left text-foreground/80 hover:text-foreground transition-colors py-2 ${
                  isActivePath(item.path) ? 'text-primary font-medium' : ''
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                >
                  <Search size={16} className="mr-2" />
                  Search Portfolio
                </Button>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Appearance</h4>
                  <div className="pl-2">
                    <ThemeSelector compact />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </motion.div>
      </motion.div>
    </>
  );
};
