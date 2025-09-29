import { type Adventure } from '@/types/adventure';

export const adventures: Adventure[] = [
  {
    id: 'boulder-canyon-spring-2024',
    title: 'Boulder Canyon: First 5.11c Send',
    activity: 'rock-climbing',
    date: '2024-03-15',
    location: 'Boulder Canyon, Colorado',
    description: 'Finally sent my first 5.11c route after months of training. The route "Rewritten" had been my project for ages, and today everything clicked perfectly.',
    media: [],
    difficulty: 4,
    duration: '8 hours',
    companions: ['Alex', 'Sarah', 'Mike'],
    weather: 'Perfect spring day, 65°F',
    highlights: [
      'Sent "Rewritten" (5.11c) clean',
      'Perfect beta sequence finally dialed in',
      'Celebrated with the crew at Chautauqua',
      'Gained confidence for harder projects',
    ],
  },
  {
    id: 'arkansas-river-class-iv',
    title: 'Arkansas River: Numbers Section',
    activity: 'kayaking',
    date: '2024-02-28',
    location: 'Arkansas River, Colorado',
    description: 'Tackled the Numbers section of the Arkansas River for the first time. Class IV whitewater that demanded everything I had learned about reading water and precise paddle placement.',
    media: [],
    difficulty: 5,
    duration: '6 hours',
    companions: ['River guide Tom', 'Fellow paddlers'],
    weather: 'Cold but sunny, 42°F',
    highlights: [
      'Successfully ran all major rapids',
      'No swims in freezing February water',
      'Improved boat control significantly',
      'Ready for bigger water this spring',
    ],
  },
  {
    id: '14er-quandary-peak',
    title: 'Quandary Peak Winter Ascent',
    activity: 'hiking',
    date: '2024-01-20',
    location: 'Quandary Peak, Colorado',
    description: 'Winter ascent of my first 14er of the year. Microspikes and determination were the keys to success on this beautiful but challenging winter day.',
    media: [],
    difficulty: 4,
    duration: '7 hours',
    companions: ['Solo'],
    weather: 'Clear skies, 15°F at summit',
    highlights: [
      'Summit reached at 14,265 feet',
      'Perfect visibility of the Continental Divide',
      'Great training for bigger winter objectives',
      'Met some awesome fellow mountaineers',
    ],
  },
  {
    id: 'eldorado-canyon-multipitch',
    title: 'Eldorado Canyon: Bastille Crack',
    activity: 'rock-climbing',
    date: '2023-12-10',
    location: 'Eldorado Canyon State Park, Colorado',
    description: 'Classic multipitch trad climb in Eldo. Three pitches of beautiful crack climbing with incredible exposure and views of the Front Range.',
    media: [],
    difficulty: 3,
    duration: '5 hours',
    companions: ['Climbing partner James'],
    weather: 'Cool and calm, 50°F',
    highlights: [
      'Clean ascent of classic Bastille Crack (5.7)',
      'First multipitch trad lead',
      'Incredible views from the summit',
      'Built confidence for bigger wall climbs',
    ],
  },
  {
    id: 'clear-creek-kayak-session',
    title: 'Clear Creek: Technical Practice',
    activity: 'kayaking',
    date: '2023-11-25',
    location: 'Clear Creek, Colorado',
    description: 'Technical creek kayaking session focusing on precision and boat control. Perfect for honing skills on smaller, more technical water.',
    media: [],
    difficulty: 3,
    duration: '4 hours',
    companions: ['Local kayak club'],
    weather: 'Overcast, 45°F',
    highlights: [
      'Dialed in several technical moves',
      'Improved edge control and precision',
      'Great session with the local club',
      'Ready for spring high water',
    ],
  },
  {
    id: 'mount-sanitas-trail-run',
    title: 'Mount Sanitas Dawn Trail Run',
    activity: 'hiking',
    date: '2023-11-15',
    location: 'Mount Sanitas, Boulder, Colorado',
    description: 'Early morning trail run up Mount Sanitas to catch the sunrise. A local favorite that never gets old, especially when you have it mostly to yourself.',
    media: [],
    difficulty: 2,
    duration: '1.5 hours',
    companions: ['Solo'],
    weather: 'Clear and crisp, 35°F',
    highlights: [
      'Caught amazing sunrise over Boulder',
      'New personal record up the trail',
      'Perfect morning meditation in motion',
      'Great training for longer objectives',
    ],
  },
];

export const getRecentAdventures = (limit: number = 6) => 
  adventures
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

export const getAdventuresByActivity = (activity: Adventure['activity']) =>
  adventures.filter(adventure => adventure.activity === activity);

export const getAdventuresByYear = (year: number) =>
  adventures.filter(adventure => new Date(adventure.date).getFullYear() === year);
