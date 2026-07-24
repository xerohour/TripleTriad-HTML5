// Final Fantasy VIII Triple Triad Card Database
// Ranks: 1 to 10 (10 is represented as 'A')
// Directions: [Top, Right, Bottom, Left]

export const ELEMENTS = {
  NONE: 'none',
  FIRE: 'fire',
  ICE: 'ice',
  THUNDER: 'thunder',
  EARTH: 'earth',
  POISON: 'poison',
  HOLY: 'holy',
  WIND: 'wind',
  WATER: 'water'
};

export const CARDS = [
  // LEVEL 1 - Low Monsters
  { id: 1, name: 'Geezard', level: 1, stats: [1, 5, 4, 1], element: ELEMENTS.NONE, icon: '🦎' },
  { id: 2, name: 'Funguar', level: 1, stats: [5, 3, 1, 1], element: ELEMENTS.NONE, icon: '🍄' },
  { id: 3, name: 'Bite Bug', level: 1, stats: [1, 5, 3, 3], element: ELEMENTS.NONE, icon: '🐝' },
  { id: 4, name: 'Red Bat', level: 1, stats: [6, 2, 1, 1], element: ELEMENTS.NONE, icon: '🦇' },
  { id: 5, name: 'Blobra', level: 1, stats: [2, 5, 3, 1], element: ELEMENTS.NONE, icon: '👁️' },
  { id: 6, name: 'Gayla', level: 1, stats: [2, 4, 1, 4], element: ELEMENTS.THUNDER, icon: '🌩️' },
  { id: 7, name: 'Gepard', level: 1, stats: [1, 1, 5, 4], element: ELEMENTS.NONE, icon: '🐆' },
  { id: 8, name: 'Caterchipillar', level: 1, stats: [3, 3, 4, 3], element: ELEMENTS.NONE, icon: '🐛' },
  { id: 9, name: 'Buel', level: 1, stats: [6, 3, 2, 2], element: ELEMENTS.NONE, icon: '🔮' },

  // LEVEL 2 - Medium Monsters
  { id: 10, name: 'Granaldo', level: 2, stats: [2, 7, 3, 6], element: ELEMENTS.NONE, icon: '🦅' },
  { id: 11, name: 'Flynn', level: 2, stats: [7, 1, 3, 5], element: ELEMENTS.NONE, icon: '🪰' },
  { id: 12, name: 'Fastitocalon-F', level: 2, stats: [3, 6, 5, 2], element: ELEMENTS.EARTH, icon: '🐢' },
  { id: 13, name: 'Snow Lion', level: 2, stats: [7, 3, 1, 5], element: ELEMENTS.ICE, icon: '🦁' },
  { id: 14, name: 'Ochu', level: 2, stats: [5, 3, 6, 3], element: ELEMENTS.NONE, icon: '🪴' },
  { id: 15, name: 'SAM08G', level: 2, stats: [5, 4, 6, 2], element: ELEMENTS.FIRE, icon: '🤖' },
  { id: 16, name: 'Death Claw', level: 2, stats: [4, 2, 4, 7], element: ELEMENTS.FIRE, icon: '🦂' },
  { id: 17, name: 'Cactuar', level: 2, stats: [6, 3, 2, 6], element: ELEMENTS.NONE, icon: '🌵' },
  { id: 18, name: 'Tonberry', level: 2, stats: [3, 4, 6, 4], element: ELEMENTS.NONE, icon: '🔪' },

  // LEVEL 3 - High Monsters
  { id: 19, name: 'Abyss Worm', level: 3, stats: [7, 5, 2, 3], element: ELEMENTS.EARTH, icon: '🪱' },
  { id: 20, name: 'Turtapod', level: 3, stats: [2, 7, 3, 6], element: ELEMENTS.NONE, icon: '🐚' },
  { id: 21, name: 'Vampire', level: 3, stats: [6, 4, 5, 5], element: ELEMENTS.POISON, icon: '🧛' },
  { id: 22, name: 'Wendigo', level: 3, stats: [7, 6, 3, 1], element: ELEMENTS.NONE, icon: '👹' },
  { id: 23, name: 'Torpama', level: 3, stats: [7, 2, 4, 4], element: ELEMENTS.HOLY, icon: '✨' },
  { id: 24, name: 'Malboro', level: 3, stats: [7, 4, 2, 7], element: ELEMENTS.POISON, icon: '👾' },
  { id: 25, name: 'Iron Giant', level: 3, stats: [6, 5, 6, 5], element: ELEMENTS.NONE, icon: '🛡️' },
  { id: 26, name: 'Behemoth', level: 3, stats: [3, 7, 6, 5], element: ELEMENTS.NONE, icon: '🐂' },
  { id: 27, name: 'Chimera', level: 3, stats: [7, 3, 6, 5], element: ELEMENTS.WATER, icon: '🐉' },

  // LEVEL 4 - Elite Monsters
  { id: 28, name: 'Elvoret', level: 4, stats: [7, 4, 6, 6], element: ELEMENTS.WIND, icon: '🦇' },
  { id: 29, name: 'X-ATM092', level: 4, stats: [4, 3, 7, 8], element: ELEMENTS.NONE, icon: '🕷️' },
  { id: 30, name: 'Granaldo Elite', level: 4, stats: [7, 2, 7, 5], element: ELEMENTS.NONE, icon: '🦅' },
  { id: 31, name: 'Archeodinos', level: 4, stats: [5, 4, 8, 4], element: ELEMENTS.NONE, icon: '🦖' },
  { id: 32, name: 'T-Rexaur', level: 4, stats: [4, 7, 6, 7], element: ELEMENTS.NONE, icon: '🦖' },
  { id: 33, name: 'Bomb', level: 4, stats: [2, 3, 7, 6], element: ELEMENTS.FIRE, icon: '💣' },
  { id: 34, name: 'Blitz', level: 4, stats: [1, 7, 6, 4], element: ELEMENTS.THUNDER, icon: '⚡' },
  { id: 35, name: 'Grand Mantis', level: 4, stats: [6, 6, 5, 4], element: ELEMENTS.NONE, icon: '🦗' },

  // LEVEL 5 - Bosses & Rare Beasts
  { id: 36, name: 'Elnoyle', level: 5, stats: [5, 6, 3, 7], element: ELEMENTS.NONE, icon: '👿' },
  { id: 37, name: 'Tonberry King', level: 5, stats: [4, 6, 7, 4], element: ELEMENTS.NONE, icon: '👑' },
  { id: 38, name: 'Wedge & Biggs', level: 5, stats: [6, 6, 2, 7], element: ELEMENTS.NONE, icon: '💂' },
  { id: 39, name: 'Fujin & Raijin', level: 5, stats: [2, 8, 8, 4], element: ELEMENTS.WIND, icon: '💨' },
  { id: 40, name: 'Elvoret High', level: 5, stats: [7, 8, 3, 4], element: ELEMENTS.WIND, icon: '🌪️' },
  { id: 41, name: 'Propagator', level: 5, stats: [8, 4, 4, 8], element: ELEMENTS.NONE, icon: '👽' },

  // LEVEL 6 - Guardian Forces (GF) - Tier 1
  { id: 42, name: 'Quetzalcoatl', level: 6, stats: [2, 9, 4, 9], element: ELEMENTS.THUNDER, icon: '⚡' },
  { id: 43, name: 'Shiva', level: 6, stats: [6, 9, 7, 4], element: ELEMENTS.ICE, icon: '❄️' },
  { id: 44, name: 'Ifrit', level: 6, stats: [9, 8, 6, 2], element: ELEMENTS.FIRE, icon: '🔥' },
  { id: 45, name: 'Siren', level: 6, stats: [8, 2, 9, 6], element: ELEMENTS.NONE, icon: '🧜‍♀️' },
  { id: 46, name: 'Brothers', level: 6, stats: [5, 9, 9, 3], element: ELEMENTS.EARTH, icon: '🐂' },
  { id: 47, name: 'Diablos', level: 6, stats: [5, 3, 9, 8], element: ELEMENTS.NONE, icon: '🦇' },

  // LEVEL 7 - Guardian Forces (GF) - Tier 2
  { id: 48, name: 'Carbuncle', level: 7, stats: [8, 4, 4, 10], element: ELEMENTS.NONE, icon: '💎' },
  { id: 49, name: 'Leviathan', level: 7, stats: [7, 10, 7, 1], element: ELEMENTS.WATER, icon: '🌊' },
  { id: 50, name: 'Pandemona', level: 7, stats: [10, 1, 7, 7], element: ELEMENTS.WIND, icon: '🌪️' },
  { id: 51, name: 'Cerberus', level: 7, stats: [7, 4, 6, 10], element: ELEMENTS.NONE, icon: '🐕' },
  { id: 52, name: 'Alexander', level: 7, stats: [9, 10, 4, 2], element: ELEMENTS.HOLY, icon: '🏰' },
  { id: 53, name: 'Doomtrain', level: 7, stats: [3, 10, 1, 10], element: ELEMENTS.POISON, icon: '🚂' },

  // LEVEL 8 - Legendary GF & Secret Cards
  { id: 54, name: 'Bahamut', level: 8, stats: [10, 6, 8, 2], element: ELEMENTS.NONE, icon: '🐉' },
  { id: 55, name: 'Cactuar King', level: 8, stats: [8, 10, 4, 4], element: ELEMENTS.NONE, icon: '🌵' },
  { id: 56, name: 'Tonberry Master', level: 8, stats: [4, 4, 10, 8], element: ELEMENTS.NONE, icon: '👑' },
  { id: 57, name: 'Eden', level: 8, stats: [4, 10, 4, 9], element: ELEMENTS.NONE, icon: '✨' },
  { id: 58, name: 'Odin', level: 8, stats: [8, 5, 10, 3], element: ELEMENTS.NONE, icon: '⚔️' },
  { id: 59, name: 'Gilgamesh', level: 8, stats: [3, 7, 9, 10], element: ELEMENTS.NONE, icon: '🤺' },

  // LEVEL 9 - Main Characters
  { id: 60, name: 'Zell', level: 9, stats: [8, 6, 5, 10], element: ELEMENTS.NONE, icon: '🥊' },
  { id: 61, name: 'Selphie', level: 9, stats: [10, 4, 8, 6], element: ELEMENTS.NONE, icon: '💛' },
  { id: 62, name: 'Quistis', level: 9, stats: [9, 2, 6, 10], element: ELEMENTS.NONE, icon: '👓' },
  { id: 63, name: 'Irvine', level: 9, stats: [2, 10, 6, 9], element: ELEMENTS.NONE, icon: '🤠' },
  { id: 64, name: 'Rinoa', level: 9, stats: [4, 10, 10, 2], element: ELEMENTS.NONE, icon: '🐶' },

  // LEVEL 10 - Legend Characters & Villains
  { id: 65, name: 'Seifer', level: 10, stats: [6, 9, 10, 4], element: ELEMENTS.NONE, icon: '⚔️' },
  { id: 66, name: 'Squall', level: 10, stats: [10, 9, 4, 6], element: ELEMENTS.NONE, icon: '🗡️' },
  { id: 67, name: 'Edea', level: 10, stats: [10, 10, 3, 3], element: ELEMENTS.NONE, icon: '🔮' },
  { id: 68, name: 'Laguna', level: 10, stats: [5, 9, 10, 3], element: ELEMENTS.NONE, icon: '🔫' },
  { id: 69, name: 'Kiros', level: 10, stats: [6, 7, 6, 10], element: ELEMENTS.NONE, icon: '🔪' },
  { id: 70, name: 'Ward', level: 10, stats: [10, 8, 7, 2], element: ELEMENTS.NONE, icon: '🪓' },
  { id: 71, name: 'Ultimecia', level: 10, stats: [10, 10, 8, 7], element: ELEMENTS.NONE, icon: '⌛' }
];

export const OPPONENTS = [
  {
    id: 'jack',
    name: 'Jack (CC Group)',
    title: 'Balamb Garden Student',
    avatar: '👨‍🎓',
    difficulty: 'Easy',
    rules: { open: true, same: false, plus: false, sameWall: false, elemental: false },
    deck: [1, 2, 3, 4, 5]
  },
  {
    id: 'club_knight',
    name: 'Club Knight',
    title: 'Balamb Garden CC Club',
    avatar: '🤺',
    difficulty: 'Easy',
    rules: { open: true, same: true, plus: false, sameWall: false, elemental: false },
    deck: [6, 7, 8, 9, 10]
  },
  {
    id: 'quistis',
    name: 'Instructor Quistis',
    title: 'Balamb Instructor',
    avatar: '👩‍🏫',
    difficulty: 'Medium',
    rules: { open: true, same: true, plus: false, sameWall: false, elemental: false },
    deck: [12, 16, 22, 28, 62]
  },
  {
    id: 'zell',
    name: 'Zell Dincht',
    title: 'SeeD Martial Artist',
    avatar: '🥊',
    difficulty: 'Medium',
    rules: { open: false, same: true, plus: true, sameWall: false, elemental: true },
    deck: [18, 25, 32, 44, 60]
  },
  {
    id: 'seifer',
    name: 'Seifer Almasy',
    title: 'Disciplinary Committee Head',
    avatar: '🤺',
    difficulty: 'Hard',
    rules: { open: false, same: true, plus: true, sameWall: true, elemental: true },
    deck: [26, 31, 47, 58, 65]
  },
  {
    id: 'squall',
    name: 'Squall Leonhart',
    title: 'SeeD Gunblade Specialist',
    avatar: '🗡️',
    difficulty: 'Hard',
    rules: { open: false, same: true, plus: true, sameWall: true, elemental: true },
    deck: [36, 44, 54, 65, 66]
  },
  {
    id: 'ultimecia',
    name: 'Sorceress Ultimecia',
    title: 'Ruler of Time',
    avatar: '⌛',
    difficulty: 'Expert',
    rules: { open: false, same: true, plus: true, sameWall: true, elemental: true },
    deck: [54, 57, 58, 67, 71]
  }
];

export function formatStat(value) {
  return value === 10 ? 'A' : String(value);
}
