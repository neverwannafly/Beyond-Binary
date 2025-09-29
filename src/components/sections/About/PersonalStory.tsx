import { Card, CardContent } from '@/components/ui/card';
import { personalInfo } from '@/data/personal';
import { FadeInView } from '@/components/animations/FadeInView';
import { MapPin, BookOpen, Monitor, Target } from 'lucide-react';

export const PersonalStory = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left side - Personal Info */}
      <FadeInView direction="left">
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-4">About Me</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{personalInfo.location}</span>
          </div>
          
          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-secondary/30 rounded-r">
            <p className="italic text-foreground">"{personalInfo.motto}"</p>
          </blockquote>
        </div>
      </FadeInView>

      {/* Right side - Current Activities */}
      <FadeInView direction="right" delay={0.2}>
        <div className="space-y-4">
          <h4 className="text-xl font-semibold mb-4">Currently</h4>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Reading</p>
                  <p className="text-sm text-muted-foreground">
                    {personalInfo.currentlyReading}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Monitor className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Watching</p>
                  <p className="text-sm text-muted-foreground">
                    {personalInfo.currentlyWatching}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Target className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Goal</p>
                  <p className="text-sm text-muted-foreground">
                    {personalInfo.currentGoal}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInView>
    </div>
  );
};
