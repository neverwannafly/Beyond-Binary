export interface Theme {
  id: string;
  name: string;
  description: string;
  className: string;
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and minimal light theme',
    className: '',
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Elegant dark theme',
    className: 'dark',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Classic green-on-black terminal aesthetic',
    className: 'theme-terminal',
  },
  {
    id: 'vscode-dark',
    name: 'VS Code Dark',
    description: 'Popular VS Code dark theme',
    className: 'theme-vscode-dark',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep midnight blue theme',
    className: 'theme-midnight',
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    description: 'Solarized light color scheme',
    className: 'theme-solarized-light',
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    description: 'Solarized dark color scheme',
    className: 'theme-solarized-dark',
  },
  {
    id: 'abyss',
    name: 'Abyss',
    description: 'Dark theme with purple accents',
    className: 'theme-abyss',
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    description: 'GitHub dark theme',
    className: 'theme-github-dark',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    description: 'Popular Dracula theme',
    className: 'theme-dracula',
  },
  {
    id: 'monokai',
    name: 'Monokai',
    description: 'Classic Monokai color scheme',
    className: 'theme-monokai',
  },
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getDefaultTheme = (): Theme => {
  return themes[1]; // Dark theme as default
};
