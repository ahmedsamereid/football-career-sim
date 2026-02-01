/* data.js - Database and Mapping Logic */

// 1. ISO Country Codes for FlagCDN
const COUNTRY_CODES = {
    "Germany": "de", "Italy": "it", "Scotland": "gb-sct", 
    "Czech Republic": "cz", "Denmark": "dk", "England": "gb-eng",
    "Spain": "es", "France": "fr", "Portugal": "pt",
    "Netherlands": "nl", "Belgium": "be", "International": "un"
};

// 2. Club Mapping (Based on your "New Text Document.txt")
// This maps filenames to Country/League Tier (1=Top, 2=Mid, 3=Low)
const CLUB_DATABASE = [
    { file: "1.FC Heidenheim 1846.png", name: "Heidenheim", country: "Germany", tier: 2 },
    { file: "1.FC Köln.png", name: "FC Köln", country: "Germany", tier: 2 },
    { file: "1.FC Slovacko.png", name: "Slovacko", country: "Czech Republic", tier: 3 },
    { file: "1.FC Union Berlin.png", name: "Union Berlin", country: "Germany", tier: 2 },
    { file: "1.FSV Mainz 05.png", name: "Mainz 05", country: "Germany", tier: 2 },
    { file: "Aarhus GF.png", name: "Aarhus", country: "Denmark", tier: 3 },
    { file: "Aberdeen FC.png", name: "Aberdeen", country: "Scotland", tier: 3 },
    { file: "AC Milan.png", name: "AC Milan", country: "Italy", tier: 1 },
    { file: "AC Sparta Prague.png", name: "Sparta Prague", country: "Czech Republic", tier: 3 },
    { file: "ACF Fiorentina.png", name: "Fiorentina", country: "Italy", tier: 1 },
    { file: "Valencia CF.png", name: "Valencia", country: "Spain", tier: 1 },
    { file: "VfB Stuttgart.png", name: "Stuttgart", country: "Germany", tier: 1 },
    { file: "Villarreal CF.png", name: "Villarreal", country: "Spain", tier: 1 }
];

// 3. Helper to get Flag URL
function getFlagUrl(countryName) {
    const code = COUNTRY_CODES[countryName] || "un";
    return `https://flagcdn.com/w80/${code}.png`;
}

// 4. Helper to get random clubs by tier
function getClubsByTier(tier) {
    return CLUB_DATABASE.filter(c => c.tier === tier);
}

// 5. Positions
const POSITIONS = ["GK", "CB", "LB", "RB", "CM", "CAM", "LW", "RW", "ST"];