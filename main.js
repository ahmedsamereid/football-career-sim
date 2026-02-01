/* ======================================================
   1. DATABASE & LOGO SYSTEM
   ====================================================== */

const COUNTRIES = [
    { name: "Germany", code: "de" }, { name: "France", code: "fr" },
    { name: "Spain", code: "es" }, { name: "England", code: "gb-eng" },
    { name: "Italy", code: "it" }, { name: "Brazil", code: "br" },
    { name: "Argentina", code: "ar" }, { name: "Portugal", code: "pt" },
    { name: "Netherlands", code: "nl" }, { name: "Belgium", code: "be" },
    { name: "USA", code: "us" }, { name: "Japan", code: "jp" },
    { name: "Croatia", code: "hr" }, { name: "Morocco", code: "ma" },
    { name: "Uruguay", code: "uy" }, { name: "Poland", code: "pl" }
];

// CLUB DB: Includes File Names from your upload + Elite Clubs
// colors: [Background, Text] for fallback generation
/* ======================================================
   1. DATABASE (Matched with your CMD file list)
   ====================================================== */

const CLUB_DB = [
    // --- TIER 1: ELITE (OVR 85+) ---
    { id: "rm", file: "Real Madrid.png", name: "Real Madrid", country: "Spain", tier: 1, str: 92, colors: ["#fff", "#000"] },
    { id: "city", file: "Manchester City.png", name: "Man City", country: "England", tier: 1, str: 91, colors: ["#6CABDD", "#fff"] },
    { id: "bay", file: "Bayern Munich.png", name: "Bayern Munich", country: "Germany", tier: 1, str: 89, colors: ["#DD0000", "#fff"] },
    { id: "liv", file: "Liverpool FC.png", name: "Liverpool", country: "England", tier: 1, str: 87, colors: ["#C8102E", "#fff"] },
    { id: "psg", file: "Paris Saint-Germain.png", name: "Paris SG", country: "France", tier: 1, str: 86, colors: ["#004170", "#fff"] },
    { id: "bar", file: "FC Barcelona.png", name: "Barcelona", country: "Spain", tier: 1, str: 86, colors: ["#A50044", "#fff"] },
    { id: "int", file: "Inter Milan.png", name: "Inter", country: "Italy", tier: 1, str: 85, colors: ["#0068A8", "#fff"] },
    { id: "ars", file: "Arsenal FC.png", name: "Arsenal", country: "England", tier: 1, str: 86, colors: ["#EF0107", "#fff"] },

    // --- TIER 2: STRONG (OVR 76-84) ---
    { id: "acm", file: "AC Milan.png", name: "AC Milan", country: "Italy", tier: 2, str: 82, colors: ["#FB090B", "#000"] },
    { id: "dor", file: "Borussia Dortmund.png", name: "Dortmund", country: "Germany", tier: 2, str: 81, colors: ["#FDE100", "#000"] },
    { id: "atm", file: "Atlético de Madrid.png", name: "Atletico Madrid", country: "Spain", tier: 2, str: 82, colors: ["#CB3524", "#fff"] },
    { id: "stut", file: "VfB Stuttgart.png", name: "Stuttgart", country: "Germany", tier: 2, str: 79, colors: ["#E30613", "#fff"] },
    { id: "vil", file: "Villarreal CF.png", name: "Villarreal", country: "Spain", tier: 2, str: 80, colors: ["#F5E60D", "#000"] },
    { id: "val", file: "Valencia CF.png", name: "Valencia", country: "Spain", tier: 2, str: 77, colors: ["#FFDF00", "#000"] },

    // --- TIER 3: STARTER (OVR <76) ---
    { id: "hei", file: "1.FC Heidenheim 1846.png", name: "Heidenheim", country: "Germany", tier: 3, str: 72, colors: ["#E2001A", "#fff"] },
    { id: "ab", file: "Aberdeen FC.png", name: "Aberdeen", country: "Scotland", tier: 3, str: 68, colors: ["#D40E14", "#fff"] },
    { id: "aar", file: "Aarhus GF.png", name: "Aarhus", country: "Denmark", tier: 3, str: 66, colors: ["#fff", "#000"] },
    { id: "slv", file: "1.FC Slovacko.png", name: "Slovacko", country: "Czech Rep", tier: 3, str: 65, colors: ["#003E7E", "#fff"] },
    { id: "spa", file: "AC Sparta Prague.png", name: "Sparta Prague", country: "Czech Rep", tier: 3, str: 74, colors: ["#AC1C2E", "#fff"] },
    { id: "lec", file: "US Lecce.png", name: "Lecce", country: "Italy", tier: 3, str: 73, colors: ["#DC042A", "#fff"] },
    { id: "sas", file: "US Sassuolo.png", name: "Sassuolo", country: "Italy", tier: 3, str: 74, colors: ["#00A752", "#fff"] },
    { id: "wolf", file: "VfL Wolfsburg.png", name: "Wolfsburg", country: "Germany", tier: 3, str: 75, colors: ["#65B32E", "#fff"] },
    { id: "mai", file: "1.FSV Mainz 05.png", name: "Mainz 05", country: "Germany", tier: 3, str: 73, colors: ["#C3141F", "#fff"] }
];

/* ======================================================
   2. HELPER: LOGO VALIDATION & FALLBACK
   ====================================================== */

function getLogoSafe(club) {
    const localPath = `./logos/clubs/${club.file}`;
    // Fallback creates a colored badge with initials
    const initials = club.name.substring(0, 2).toUpperCase();
    const fallbackHTML = `
        <div class="fallback-badge" style="background:${club.colors[0]}; color:${club.colors[1]}">
            ${initials}
        </div>`;
    
    // We try to load the image. If it fails, the onerror triggers replacement with the badge.
    return `
        <img src="${localPath}" class="club-logo-img" 
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div class="fallback-badge" style="display:none; background:${club.colors[0]}; color:${club.colors[1]}">
            ${initials}
        </div>
    `;
}

/* ======================================================
   3. GAME ENGINE
   ====================================================== */

const Game = {
    state: {
        season: 1,
        maxSeasons: 10,
        player: {
            pos: null, nat: null, age: 18, ovr: 60,
            club: null,
            form: 1.0, // New "Vibe" factor
            stats: { matches: 0, goals: 0, assists: 0, titles: 0, caps: 0, intGoals: 0, ballonDor: 0 },
            history: []
        },
        offers: []
    },

    // --- HUD ---
    updateHUD: () => {
        const p = Game.state.player;
        document.getElementById('game-header').classList.remove('hidden');
        document.getElementById('hud-season').innerText = `${Game.state.season}/${Game.state.maxSeasons}`;
        document.getElementById('hud-age').innerText = p.age;
        
        // Color code OVR
        const ovrEl = document.getElementById('hud-ovr');
        ovrEl.innerText = p.ovr;
        if(p.ovr >= 85) ovrEl.style.color = "#FFD700"; // Elite Gold
        else if(p.ovr >= 75) ovrEl.style.color = "#4CAF50"; // Pro Green
        else ovrEl.style.color = "#fff";

        document.getElementById('hud-club').innerText = p.club ? p.club.name : "Free Agent";
    },

    render: (html) => document.getElementById('app').innerHTML = html,

    // --- INIT ---
    init: () => Game.renderSelection(),

    // --- SELECTION SCREEN ---
    renderSelection: () => {
        const positions = [
            {id:'GK', t:90, l:50}, {id:'LB', t:75, l:15}, {id:'CB', t:80, l:38}, 
            {id:'CB', t:80, l:62}, {id:'RB', t:75, l:85}, {id:'CM', t:55, l:50}, 
            {id:'CAM', t:35, l:50}, {id:'LW', t:25, l:20}, {id:'RW', t:25, l:80}, 
            {id:'ST', t:15, l:50}
        ];

        let html = `
            <div class="split-view">
                <div class="panel-left">
                    <h2>1. POSITION</h2>
                    <div class="pitch-container">
                        ${positions.map(p => `
                            <div class="pos-dot" style="top:${p.t}%; left:${p.l}%" 
                                 onclick="Game.selectPos('${p.id}', this)">${p.id}</div>
                        `).join('')}
                    </div>
                </div>
                <div class="panel-right">
                    <h2>2. NATIONALITY</h2>
                    <div class="country-grid">
                        ${COUNTRIES.map(c => `
                            <div class="country-card" id="nat-${c.code}" onclick="Game.selectNat('${c.name}', '${c.code}')">
                                <img src="https://flagcdn.com/w80/${c.code}.png">
                                <span class="country-name">${c.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button id="start-btn" class="btn" disabled onclick="Game.startGame()">Start Career</button>
                </div>
            </div>
        `;
        Game.render(html);
    },

    selectPos: (pos, el) => {
        document.querySelectorAll('.pos-dot').forEach(d => d.classList.remove('selected'));
        el.classList.add('selected');
        Game.state.player.pos = pos;
        Game.checkReady();
    },

    selectNat: (nat, code) => {
        document.querySelectorAll('.country-card').forEach(c => c.classList.remove('selected'));
        document.getElementById(`nat-${code}`).classList.add('selected');
        Game.state.player.nat = nat;
        Game.checkReady();
    },

    checkReady: () => {
        if(Game.state.player.pos && Game.state.player.nat) document.getElementById('start-btn').disabled = false;
    },

    // --- START GAME (Rule: Tier 3 Starter) ---
    startGame: () => {
        const p = Game.state.player;
        let starters = CLUB_DB.filter(c => c.tier === 3 && c.country === p.nat);
        if(starters.length === 0) starters = CLUB_DB.filter(c => c.tier === 3); // Fallback
        
        p.club = starters[Math.floor(Math.random() * starters.length)];
        p.age = 18;
        p.ovr = 60 + Math.floor(Math.random()*4); // 60-63 Start
        
        Game.updateHUD();
        Game.renderDashboard();
    },

    // --- DASHBOARD ---
    renderDashboard: () => {
        const p = Game.state.player;
        const logoHTML = getLogoSafe(p.club);

        let html = `
            <div class="dashboard-grid">
                <div class="stat-card">
                    <h3>CURRENT CLUB</h3>
                    <div style="display:flex; justify-content:center; margin:10px;">${logoHTML}</div>
                    <div style="font-size:1.5rem; font-weight:bold;">${p.club.name}</div>
                    <div style="color:#aaa;">Tier ${p.club.tier} • ${p.club.country}</div>
                    <hr style="border-color:#444">
                    <div>Form: <strong style="color:${p.form > 1 ? '#4caf50' : '#e53935'}">${p.form > 1 ? '🔥 On Fire' : '😐 Normal'}</strong></div>
                </div>

                <div class="stat-card">
                    <h3>STATS TRACKER</h3>
                    <table class="stat-table">
                        <tr><td>Matches</td><td>${p.stats.matches}</td></tr>
                        <tr><td>Goals</td><td>${p.stats.goals}</td></tr>
                        <tr><td>Assists</td><td>${p.stats.assists}</td></tr>
                        <tr><td>Titles</td><td>${p.stats.titles}</td></tr>
                        <tr><td>Caps</td><td>${p.stats.caps}</td></tr>
                    </table>
                </div>

                <div class="stat-card">
                    <h3>CAREER HISTORY</h3>
                    <div style="max-height:150px; overflow-y:auto; font-size:0.8rem; text-align:left;">
                        ${p.history.map(h => `
                            <div style="border-bottom:1px solid #444; padding:5px;">
                                <strong>S${h.season}:</strong> ${h.club} (${h.diff})
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div style="text-align:center; margin-top:30px;">
                <button class="btn btn-gold" onclick="Game.simulateSeason()">Simulate Season (2 Years)</button>
            </div>
        `;
        Game.render(html);
    },

    // --- CORE SIMULATION (THE FIX) ---
    simulateSeason: () => {
        const p = Game.state.player;
        const clubStr = p.club.str;

        // 1. DETERMINE "SEASON VIBE" (Randomness)
        // 10% Breakout (1.3x), 20% Bad (0.8x), 70% Normal (1.0x)
        const roll = Math.random();
        let formFactor = 1.0;
        let eventMsg = "Standard Season";
        
        if (roll > 0.9) { formFactor = 1.4; eventMsg = "BREAKOUT SEASON! 🌟"; }
        else if (roll < 0.2) { formFactor = 0.7; eventMsg = "Injury Struggles 🚑"; }
        
        p.form = formFactor;

        // 2. STATS GENERATION (Weighted by OVR & Form)
        const games = 30 + Math.floor(Math.random() * 10);
        
        // Base scoring ability based on Pos & OVR
        let attackMod = 0.1;
        if (p.pos === 'ST') attackMod = 0.6;
        else if (p.pos === 'LW' || p.pos === 'RW') attackMod = 0.4;
        else if (p.pos === 'CAM') attackMod = 0.3;

        const goalBase = games * attackMod; // e.g., 30 * 0.6 = 18 goals base
        // Apply Form & OVR scaling
        const skillFactor = (p.ovr / 100); 
        
        let sGoals = Math.floor(goalBase * skillFactor * formFactor * (0.8 + Math.random()*0.4));
        let sAssists = Math.floor(games * 0.2 * skillFactor * formFactor);
        
        // Defenders/GK stats
        if (p.pos === 'GK' || p.pos.includes('B')) {
            sGoals = Math.floor(Math.random() * 3); // Random header goals
        }

        // 3. MANDATORY GROWTH FORMULA (The Fix)
        // BaseGrowth = (ClubStrength + PlayingTime + LeagueReputation)
        // Simplify inputs for simulation:
        // ClubStrength factor: Tier 1=3pts, Tier 2=2pts, Tier 3=1.5pts
        const strFactor = (4 - p.club.tier); 
        // Playing Time: Always "Starter" in this sim for fun = 2pts
        const timeFactor = 2;
        // League Rep: Tier 1=2pts, Tier 3=1pt
        const repFactor = (4 - p.club.tier) * 0.8;

        let baseGrowth = (strFactor + timeFactor + repFactor); // Range: ~4.5 to ~7

        // Age Modifier
        let ageMod = 1.0;
        if (p.age <= 22) ageMod = 1.4;
        else if (p.age <= 26) ageMod = 1.2;
        else if (p.age <= 30) ageMod = 1.0;
        else if (p.age <= 33) ageMod = 0.7;
        else ageMod = -1.0; // Decline

        // Performance Variance (Form)
        // If breakout season, huge boost.
        let finalGrowth = Math.round(baseGrowth * ageMod * formFactor);
        
        // Cap sanity check (No +15 growth, cap at +7 unless breakout)
        if (finalGrowth > 6 && formFactor < 1.3) finalGrowth = 5;
        if (p.age > 34) finalGrowth = Math.abs(finalGrowth) * -1; // Ensure decline

        // Apply
        const oldOvr = p.ovr;
        p.ovr += finalGrowth;
        if (p.ovr > 99) p.ovr = 99; // Hard max

        // 4. TROPHIES
        if (p.club.str >= 85 && Math.random() > 0.6) p.stats.titles++;
        if (p.ovr > 90 && sGoals > 30) p.stats.ballonDor++;

        // Update Totals
        p.stats.matches += games;
        p.stats.goals += sGoals;
        p.stats.assists += sAssists;
        
        // Caps (National Team)
        if (p.ovr > 80) p.stats.caps += (5 + Math.floor(Math.random()*5));

        // Save History
        p.history.unshift({
            season: Game.state.season,
            club: p.club.name,
            diff: finalGrowth >= 0 ? `+${finalGrowth}` : finalGrowth
        });

        Game.state.season++;
        p.age += 2;

        if (Game.state.season > Game.state.maxSeasons) {
            Game.renderRetirement();
        } else {
            Game.renderTransferWindow(eventMsg);
        }
    },

    // --- 4. TRANSFER UNLOCK SYSTEM (Rule 4) ---
    renderTransferWindow: (eventMsg) => {
        Game.updateHUD();
        const p = Game.state.player;
        
        // UNLOCK LOGIC
        // Default: Tier based on OVR
        let maxTier = 3;
        let minTier = 3;

        // "Breakout Season" unlocks 1 Tier higher than normal
        const bonusTier = (p.form > 1.2) ? 1 : 0;

        if (p.ovr >= 85) { maxTier = 1; minTier = 1; }
        else if (p.ovr >= 78) { maxTier = 1 + bonusTier; minTier = 2; } // Chance at Tier 1 if breakout
        else if (p.ovr >= 70) { maxTier = 2; minTier = 3; }

        // Filter valid clubs
        // Logic: 1 from MaxTier, 1 from MinTier, 1 Random
        let pool = CLUB_DB.filter(c => c.id !== p.club.id);
        
        let eliteOffers = pool.filter(c => c.tier === 1);
        let midOffers = pool.filter(c => c.tier === 2);
        let lowOffers = pool.filter(c => c.tier === 3);

        let offers = [];

        // Slot 1: Ambition (Highest possible)
        if (maxTier === 1 && eliteOffers.length > 0) offers.push(eliteOffers[Math.floor(Math.random()*eliteOffers.length)]);
        else if (midOffers.length > 0) offers.push(midOffers[Math.floor(Math.random()*midOffers.length)]);

        // Slot 2: Realistic
        if (minTier === 2 && midOffers.length > 0) offers.push(midOffers[Math.floor(Math.random()*midOffers.length)]);
        else if (lowOffers.length > 0) offers.push(lowOffers[Math.floor(Math.random()*lowOffers.length)]);

        // Slot 3: Random / Wildcard
        offers.push(pool[Math.floor(Math.random() * pool.length)]);

        // Dedupe
        offers = [...new Set(offers)];
        Game.state.offers = offers;

        const html = `
            <div style="text-align:center;">
                <h2>TRANSFER WINDOW</h2>
                <div style="background:#333; padding:10px; display:inline-block; border-radius:8px; margin-bottom:20px;">
                    <span style="color:${p.form > 1 ? '#FFD700' : '#ccc'}">${eventMsg}</span>
                </div>
                
                <div class="transfer-list">
                    ${offers.map((c, idx) => `
                        <div class="transfer-row tier-${c.tier}">
                            <div class="club-identity">
                                ${getLogoSafe(c)}
                                <div class="offer-info">
                                    <h3>${c.name}</h3>
                                    <span>${c.country} • Tier ${c.tier}</span>
                                </div>
                            </div>
                            <button class="btn btn-gold" style="margin:0; padding:10px 20px; font-size:0.9rem;"
                                    onclick="Game.acceptTransfer(${idx})">SIGN</button>
                        </div>
                    `).join('')}

                    <div class="transfer-row" style="background:transparent; border:2px dashed #555; justify-content:center;">
                         <button class="btn" style="background:transparent; border:1px solid #777; margin:0;"
                                 onclick="Game.renderDashboard()">REJECT & STAY</button>
                    </div>
                </div>
            </div>
        `;
        Game.render(html);
    },

    acceptTransfer: (idx) => {
        Game.state.player.club = Game.state.offers[idx];
        Game.renderDashboard();
        Game.updateHUD();
    },

    // --- END ---
    renderRetirement: () => {
        const p = Game.state.player;
        let html = `
            <div style="text-align:center; max-width:600px; margin:0 auto;">
                <h1 style="color:var(--accent); font-size:4rem;">RETIRED</h1>
                <p>Age: ${p.age} • Final OVR: ${p.ovr}</p>
                
                <div class="stat-card">
                    <h3>LEGACY</h3>
                    <div>Matches: ${p.stats.matches}</div>
                    <div>Goals: ${p.stats.goals}</div>
                    <div>Titles: ${p.stats.titles}</div>
                    <div>Ballon d'Or: ${p.stats.ballonDor}</div>
                </div>
                <button class="btn" onclick="location.reload()">NEW CAREER</button>
            </div>
        `;
        Game.render(html);
    }
};

Game.init();
