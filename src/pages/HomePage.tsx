import { PageLayout } from '@/components/layout/PageLayout';
import { HeroSection } from '@/components/sections/Hero/HeroSection';
import { VisualAboutSection } from '@/components/sections/About/VisualAboutSection';
import StackedLiveFeeds from '@/components/sections/LiveFeeds/StackedLiveFeeds';
import { VisualStatsSection } from '@/components/sections/Stats/VisualStatsSection';

export const HomePage = () => {
  return (
    <PageLayout>
      <HeroSection />
      <VisualAboutSection />
      <StackedLiveFeeds />
      <VisualStatsSection />
    </PageLayout>
  );
};
