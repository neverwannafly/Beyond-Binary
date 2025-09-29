import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { themes } from '@/lib/themes';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const { theme, setThemeById } = useTheme();

  if (compact) {
    return (
      <Select value={theme.id} onValueChange={setThemeById}>
        <SelectTrigger className="w-auto min-w-0 border-0 h-8 px-2 text-sm bg-transparent hover:bg-secondary/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Palette size={14} />
            <span className="hidden sm:inline">{theme.name}</span>
          </div>
        </SelectTrigger>
        <SelectContent align="end" className="min-w-[240px]">
          {themes.map((themeOption) => (
            <SelectItem key={themeOption.id} value={themeOption.id}>
              <div className="flex flex-col">
                <span className="font-medium">{themeOption.name}</span>
                <span className="text-xs text-muted-foreground">
                  {themeOption.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Theme Selector</CardTitle>
        <CardDescription>Choose your preferred theme</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={theme.id} onValueChange={setThemeById}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((themeOption) => (
              <SelectItem key={themeOption.id} value={themeOption.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{themeOption.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {themeOption.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4 p-4 rounded-lg bg-secondary">
          <h4 className="font-medium mb-2">Current Theme</h4>
          <p className="text-sm text-muted-foreground">
            <strong>{theme.name}:</strong> {theme.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
