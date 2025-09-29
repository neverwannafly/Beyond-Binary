import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TerminalProvider } from '@/contexts/TerminalContext';
import { SmoothScroll } from '@/components/animations/SmoothScroll';
import { TerminalInterface } from '@/components/terminal/TerminalInterface';
import { HomePage } from '@/pages/HomePage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { BlogPage } from '@/pages/BlogPage';
import { WritingPage } from '@/pages/WritingPage';
import { AdventuresPage } from '@/pages/AdventuresPage';
import { GoalsPage } from '@/pages/GoalsPage';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { ContactPage } from '@/pages/ContactPage';
import { BlogPostPage } from '@/pages/BlogPostPage';

function App() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <Router>
          <SmoothScroll>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/writing/:slug" element={<BlogPostPage />} />
              <Route path="/adventures" element={<AdventuresPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Legacy routes for compatibility */}
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
            <TerminalInterface />
          </SmoothScroll>
        </Router>
      </TerminalProvider>
    </ThemeProvider>
  );
}

export default App;