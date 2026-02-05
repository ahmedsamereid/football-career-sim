/* ======================================================
   1. DATABASE & LOGO SYSTEM
   ====================================================== */

const COUNTRIES = [
    { name: "Germany", code: "de", group: 1 }, { name: "France", code: "fr", group: 1 },
    { name: "Spain", code: "es", group: 1 }, { name: "England", code: "gb-eng", group: 1 },
    { name: "Italy", code: "it", group: 1 }, { name: "Brazil", code: "br", group: 1 },
    { name: "Argentina", code: "ar", group: 1 }, { name: "Portugal", code: "pt", group: 1 },
    { name: "Netherlands", code: "nl", group: 2 }, { name: "Belgium", code: "be", group: 2 },
    { name: "Croatia", code: "hr", group: 2 }, { name: "Uruguay", code: "uy", group: 2 },
    { name: "USA", code: "us", group: 3 }, { name: "Japan", code: "jp", group: 3 },
    { name: "Morocco", code: "ma", group: 3 }, { name: "Poland", code: "pl", group: 3 },
    { name: "Egypt", code: "eg", group: 3 }, { name: "Senegal", code: "sn", group: 3 }
];

const CLUB_DB = [
    // --- TIER 1: ELITE (OVR 85+) ---
    { id: "rm", file: "Real Madrid.png", name: "Real Madrid", country: "Spain", tier: 1, str: 94, colors: ["#fff", "#000"] },
    { id: "city", file: "Manchester City.png", name: "Man City", country: "England", tier: 1, str: 93, colors: ["#6CABDD", "#fff"] },
    { id: "bay", file: "Bayern Munich.png", name: "Bayern Munich", country: "Germany", tier: 1, str: 90, colors: ["#DD0000", "#fff"] },
    { id: "liv", file: "Liverpool FC.png", name: "Liverpool", country: "England", tier: 1, str: 89, colors: ["#C8102E", "#fff"] },
    { id: "psg", file: "Paris Saint-Germain.png", name: "Paris SG", country: "France", tier: 1, str: 88, colors: ["#004170", "#fff"] },
    { id: "bar", file: "FC Barcelona.png", name: "Barcelona", country: "Spain", tier: 1, str: 87, colors: ["#A50044", "#fff"] },
    { id: "int", file: "Inter Milan.png", name: "Inter", country: "Italy", tier: 1, str: 86, colors: ["#0068A8", "#fff"] },
    { id: "ars", file: "Arsenal FC.png", name: "Arsenal", country: "England", tier: 1, str: 87, colors: ["#EF0107", "#fff"] },

    // --- TIER 2: STRONG (OVR 76-84) ---
    { id: "acm", file: "AC Milan.png", name: "AC Milan", country: "Italy", tier: 2, str: 83, colors: ["#FB090B", "#000"] },
    { id: "dor", file: "Borussia Dortmund.png", name: "Dortmund", country: "Germany", tier: 2, str: 82, colors: ["#FDE100", "#000"] },
    { id: "atm", file: "Atlético de Madrid.png", name: "Atletico Madrid", country: "Spain", tier: 2, str: 83, colors: ["#CB3524", "#fff"] },
    { id: "stut", file: "VfB Stuttgart.png", name: "Stuttgart", country: "Germany", tier: 2, str: 80, colors: ["#E30613", "#fff"] },
    { id: "vil", file: "Villarreal CF.png", name: "Villarreal", country: "Spain", tier: 2, str: 80, colors: ["#F5E60D", "#000"] },
    { id: "val", file: "Valencia CF.png", name: "Valencia", country: "Spain", tier: 2, str: 79, colors: ["#FFDF00", "#000"] },
    { id: "new", file: "Newcastle United.png", name: "Newcastle", country: "England", tier: 2, str: 81, colors: ["#000", "#fff"] },
    { id: "rom", file: "AS Roma.png", name: "AS Roma", country: "Italy", tier: 2, str: 79, colors: ["#9E1B32", "#F0BC42"] },

    // --- TIER 3: STARTER (OVR <76) ---
    { id: "wolf", file: "VfL Wolfsburg.png", name: "Wolfsburg", country: "Germany", tier: 3, str: 76, colors: ["#65B32E", "#fff"] },
    { id: "sas", file: "US Sassuolo.png", name: "Sassuolo", country: "Italy", tier: 3, str: 74, colors: ["#00A752", "#fff"] },
    { id: "spa", file: "AC Sparta Prague.png", name: "Sparta Prague", country: "Czech Rep", tier: 3, str: 74, colors: ["#AC1C2E", "#fff"] },
    { id: "mai", file: "1.FSV Mainz 05.png", name: "Mainz 05", country: "Germany", tier: 3, str: 74, colors: ["#C3141F", "#fff"] },
    { id: "lec", file: "US Lecce.png", name: "Lecce", country: "Italy", tier: 3, str: 73, colors: ["#DC042A", "#fff"] },
    { id: "hei", file: "1.FC Heidenheim 1846.png", name: "Heidenheim", country: "Germany", tier: 3, str: 72, colors: ["#E2001A", "#fff"] },
    { id: "ab", file: "Aberdeen FC.png", name: "Aberdeen", country: "Scotland", tier: 3, str: 68, colors: ["#D40E14", "#fff"] },
    { id: "aar", file: "Aarhus GF.png", name: "Aarhus", country: "Denmark", tier: 3, str: 66, colors: ["#fff", "#000"] },
    { id: "slv", file: "1.FC Slovacko.png", name: "Slovacko", country: "Czech Rep", tier: 3, str: 65, colors: ["#003E7E", "#fff"] }
];

/* ======================================================
   AVATAR SYSTEM (LOCAL IMAGES)
   ====================================================== */

const AVATARS = [
    { id: 1, name: "Mo Salah" },
    { id: 2, name: "Leo Messi" },
    { id: 3, name: "C. Ronaldo" },
    { id: 4, name: "K. Mbappé" },
    { id: 5, name: "E. Haaland" },
    { id: 6, name: "Vinícius Jr" },
    { id: 7, name: "J. Bellingham" },
    { id: 8, name: "K. De Bruyne" }
];

function getAvatarSVG(id, showBall = true) {
    const av = AVATARS.find(a => a.id === id) || AVATARS[0];
    const imgPath = `./logos/avatars/${av.id}.png`;
    return `<img src="${imgPath}" alt="${av.name}" class="real-player-img" draggable="false" onerror="this.src='https://cdn-icons-png.flaticon.com/512/16/16363.png'">`;
}

function getLogoSafe(club) {
    const localPath = `./logos/clubs/${club.file}`;
    const initials = club.name.substring(0, 2).toUpperCase();
    return `
        <img src="${localPath}" class="club-logo-img" 
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div class="fallback-badge" style="display:none; background:${club.colors[0]}; color:${club.colors[1]}">
            ${initials}
        </div>
    `;
}

/* ======================================================
   ANALYSIS ENGINE (STATS ALGORITHM)
   ====================================================== */

const POSITION_MULTIPLIERS = {
    'GK': {pac:1.29, sho:1.25, pas:1.23, dri:0.26, def:0.69, phy:1.26},
    'LB': {pac:1.19, sho:0.76, pas:0.96, dri:1.02, def:1.00, phy:1.06},
    'RB': {pac:1.19, sho:0.75, pas:0.95, dri:1.02, def:1.00, phy:1.08},
    'CB': {pac:1.08, sho:0.65, pas:0.90, dri:0.87, def:1.19, phy:1.29},
    'CDM': {pac:0.99, sho:0.85, pas:1.00, dri:1.01, def:1.03, phy:1.11},
    'CM': {pac:1.05, sho:0.93, pas:1.02, dri:1.05, def:0.94, phy:1.02},
    'CAM': {pac:1.14, sho:1.01, pas:1.06, dri:1.12, def:0.73, phy:0.95},
    'LM': {pac:1.26, sho:1.00, pas:1.00, dri:1.13, def:0.65, phy:0.96},
    'RM': {pac:1.26, sho:0.99, pas:1.00, dri:1.12, def:0.67, phy:0.96},
    'LW': {pac:1.28, sho:1.04, pas:1.01, dri:1.15, def:0.57, phy:0.94},
    'RW': {pac:1.27, sho:1.03, pas:1.01, dri:1.14, def:0.59, phy:0.95},
    'ST': {pac:1.20, sho:1.12, pas:0.93, dri:1.09, def:0.52, phy:1.14}
};

// Precise Percentile Map based on FC 26 Data
const OVR_PERCENTILES = {
    60: 9.3, 61: 12.2, 62: 15.3, 63: 19.2, 64: 23.9, 
    65: 29.1, 66: 34.8, 67: 40.7, 68: 47.2, 69: 53.6,
    70: 60.1, 71: 66.5, 72: 72.1, 73: 77.3, 74: 82.0,
    75: 85.7, 76: 89.0, 77: 91.7, 78: 93.9, 79: 95.5,
    80: 96.8, 81: 97.7, 82: 98.4, 83: 98.9, 84: 99.3,
    85: 99.5, 86: 99.7, 87: 99.8, 88: 99.9, 89: 99.92,
    90: 99.94, 91: 99.95, 92: 99.96, 93: 99.97, 94: 99.98,
    95: 99.99, 96: 99.99, 97: 100, 98: 100, 99: 100
};

const FC26_SAMPLE = [{p:"GK",o:91,c:57},{p:"ST",o:91,c:166}];

const AnalysisEngine = {
    getCardType: (ovr) => {
        if (ovr >= 96) return { type: "MYTHIC ICON", class: "card-bg-mythic", style: "ICON" };
        if (ovr >= 94) return { type: "ICON LEGEND", class: "card-bg-icon", style: "ICON" };
        if (ovr >= 90) return { type: "ELITE GOLD", class: "card-bg-elite", style: "ELITE" };
        if (ovr >= 85) return { type: "GOLD RARE", class: "card-bg-gold", style: "GOLD" };
        if (ovr >= 80) return { type: "SILVER STAR", class: "card-bg-silver", style: "SILVER" };
        return { type: "BRONZE", class: "card-bg-bronze", style: "BRONZE" };
    },

    getFlavorText: (type) => {
        if (type.includes("MYTHIC")) return "A Mythic Icon – Unmatched in history, a god among players.";
        if (type.includes("ICON")) return "An Icon of the game – A career that defines a generation.";
        if (type.includes("ELITE")) return "Elite Gold Card – A legendary career defined by goals, trophies, and dominance.";
        if (type.includes("GOLD")) return "Gold Card – A world-class professional with a cabinet full of silverware.";
        if (type.includes("SILVER")) return "Silver Card – A solid professional career with flashes of brilliance.";
        return "Bronze Card – A respectable career in the professional leagues.";
    },

    loadFC26Data: async () => { return FC26_SAMPLE.map(item => ({ position: item.p, overall: item.o, contribution: item.c })); },

    generateFaceStats: (pos, ovr) => {
        const mult = POSITION_MULTIPLIERS[pos] || POSITION_MULTIPLIERS['CM'];
        const calc = (m) => Math.min(99, Math.round(ovr * m));
        if (pos === 'GK') {
            return [{ l: 'DIV', v: calc(1.02) }, { l: 'REF', v: calc(1.04) }, { l: 'HAN', v: calc(0.98) }, { l: 'SPD', v: calc(0.55) }, { l: 'KIC', v: calc(0.95) }, { l: 'POS', v: calc(0.99) }];
        }
        return [{ l: 'PAC', v: calc(mult.pac) }, { l: 'DRI', v: calc(mult.dri) }, { l: 'SHO', v: calc(mult.sho) }, { l: 'DEF', v: calc(mult.def) }, { l: 'PAS', v: calc(mult.pas) }, { l: 'PHY', v: calc(mult.phy) }];
    },

    generateReport: async (simPlayer) => {
        const ovr = simPlayer.stats.peakOvr;
        const cardInfo = AnalysisEngine.getCardType(ovr);
        const flavor = AnalysisEngine.getFlavorText(cardInfo.type);
        const percentile = OVR_PERCENTILES[ovr] || (ovr > 90 ? 99.99 : 50.0);

        return {
            fifa_card_style: cardInfo.style, card_type: cardInfo.type, overall: ovr, position: simPlayer.pos, 
            percentile_vs_fc26: percentile,
            career_achievements: { goals: simPlayer.stats.goals, assists: simPlayer.stats.assists, trophies: simPlayer.stats.titles + simPlayer.stats.cups + simPlayer.stats.wcTitles, ballon_dor: simPlayer.stats.ballonDor, caps: simPlayer.stats.caps },
            card_flavor_text: flavor, card_class: cardInfo.class
        };
    }
};

/* ======================================================
   3. GAME ENGINE
   ====================================================== */

const Game = {
    state: {
        season: 1, maxSeasons: 10,
        player: { pos: null, nat: null, avatarId: 1, age: 18, ovr: 60, club: null, form: 1.0, stats: { matches: 0, goals: 0, assists: 0, titles: 0, cups: 0, caps: 0, intGoals: 0, wcTitles: 0, ballonDor: 0, peakOvr: 60 }, history: [] },
        locks: { startClub: false, transferWindow: false },
        offers: [], introPlayed: false, difficulty: 'Normal', difficultyMult: 1.0
    },

    updateHUD: () => {
        const p = Game.state.player;
        document.getElementById('game-header').classList.remove('hidden');
        const header = document.getElementById('game-header');
        if(!header.querySelector('.header-content')) header.innerHTML = `<div class="header-content">${header.innerHTML}</div>`;
        document.getElementById('hud-season').innerText = `${Game.state.season}/${Game.state.maxSeasons}`;
        document.getElementById('hud-age').innerText = p.age;
        const ovrEl = document.getElementById('hud-ovr'); ovrEl.innerText = p.ovr;
        if(p.ovr >= 90) ovrEl.style.color = "#E91E63"; else if(p.ovr >= 85) ovrEl.style.color = "#FFD700"; else if(p.ovr >= 75) ovrEl.style.color = "#4CAF50"; else ovrEl.style.color = "#fff";
        document.getElementById('hud-club').innerText = p.club ? p.club.name : "Free Agent";
    },

    render: (html) => document.getElementById('app').innerHTML = html,
    init: () => Game.renderSelection(),

    renderSelection: () => {
        const positions = [{id:'GK', t:90, l:50}, {id:'LB', t:75, l:15}, {id:'CB', t:80, l:38}, {id:'CB', t:80, l:62}, {id:'RB', t:75, l:85}, {id:'CM', t:55, l:50}, {id:'CAM', t:35, l:50}, {id:'LW', t:20, l:15}, {id:'ST', t:15, l:50}, {id:'RW', t:20, l:85}];
        let html = `
            <div class="split-view">
                <div class="panel-left"><h2>1. POSITION</h2><div class="pitch-container">${positions.map(p => `<div class="pos-dot" style="top:${p.t}%; left:${p.l}%" onclick="Game.selectPos('${p.id}', this)">${p.id}</div>`).join('')}</div><div class="avatar-section-wrapper"><h2>3. LOOK</h2><div class="avatar-grid">${AVATARS.map(a => `<div class="avatar-option" id="av-${a.id}" onclick="Game.selectAvatar(${a.id})">${getAvatarSVG(a.id, false)}</div>`).join('')}</div></div></div>
                <div class="panel-right"><h2>2. NATIONALITY</h2><div class="country-grid">${COUNTRIES.map(c => `<div class="country-card" id="nat-${c.code}" onclick="Game.selectNat('${c.name}', '${c.code}', ${c.group})"><img src="https://flagcdn.com/w80/${c.code}.png"><span class="country-name">${c.name}</span></div>`).join('')}</div><div class="controls-wrapper"><h2>4. DIFFICULTY</h2><div class="difficulty-btn-group"><button class="diff-btn" onclick="Game.selectDiff('Easy', 1.2, this)">Easy</button><button class="diff-btn selected" onclick="Game.selectDiff('Normal', 1.0, this)">Normal</button><button class="diff-btn" onclick="Game.selectDiff('Hard', 0.8, this)">Hard</button></div><button id="start-btn" class="btn" disabled onclick="Game.startGame()">Start Career</button></div></div>
            </div>`;
        Game.render(html);
    },

    selectPos: (pos, el) => { document.querySelectorAll('.pos-dot').forEach(d => d.classList.remove('selected')); el.classList.add('selected'); Game.state.player.pos = pos; Game.checkReady(); },
    selectNat: (nat, code, group) => { document.querySelectorAll('.country-card').forEach(c => c.classList.remove('selected')); document.getElementById(`nat-${code}`).classList.add('selected'); Game.state.player.nat = nat; Game.state.player.natGroup = group || 3; Game.checkReady(); },
    selectAvatar: (id) => { document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected')); document.getElementById(`av-${id}`).classList.add('selected'); Game.state.player.avatarId = id; },
    selectDiff: (level, mult, el) => { document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected')); el.classList.add('selected'); Game.state.difficulty = level; Game.state.difficultyMult = mult; },
    checkReady: () => { if(Game.state.player.pos && Game.state.player.nat) document.getElementById('start-btn').disabled = false; },

    // --- START GAME (With Difficulty & Nat Group Logic) ---
    startGame: () => {
        const p = Game.state.player;
        
        if (!Game.state.locks.startClub) {
            let candidates = [];
            const natGroup = p.natGroup || 3;
            const diff = Game.state.difficulty;
            let maxStr = 76; // Default
            
            if (diff === 'Hard') maxStr -= 4; 
            if (diff === 'Easy') maxStr += 2; 
            if (natGroup === 3) maxStr -= 3; // Weaker start for developing nations
            
            candidates = CLUB_DB.filter(c => c.tier === 3 && c.str <= maxStr);
            if (candidates.length === 0) candidates = CLUB_DB.filter(c => c.tier === 3);

            p.club = candidates[Math.floor(Math.random() * candidates.length)];
            p.age = 18; p.ovr = 60 + Math.floor(Math.random()*4); p.stats.peakOvr = p.ovr;
            Game.state.locks.startClub = true;
        }
        document.getElementById('game-header').classList.add('hidden'); 
        if (!Game.state.introPlayed) Game.runDraftAnimation([p.club, p.club, p.club], p.club);
        else { Game.updateHUD(); Game.renderDashboard(); }
    },

    runDraftAnimation: (pool, winner) => {
        const overlay = document.createElement('div'); overlay.className = 'draft-overlay';
        overlay.innerHTML = `<div class="draft-text" id="draft-status">SCOUTING CLUBS...</div><div class="draft-spinner" id="draft-spinner"><img src="" id="draft-img" style="opacity:0.5"></div><div class="draft-text" id="draft-name" style="font-size:1.5rem; color:var(--text-muted)"></div>`;
        document.body.appendChild(overlay);
        let cycles = 0; let speed = 100; const maxCycles = 20; 
        const spin = () => {
            const randomClub = CLUB_DB.filter(c=>c.tier===3)[Math.floor(Math.random() * 5)]; 
            const imgEl = document.getElementById('draft-img');
            const nameEl = document.getElementById('draft-name');
            const tempDiv = document.createElement('div'); tempDiv.innerHTML = getLogoSafe(randomClub);
            const src = tempDiv.querySelector('img') ? tempDiv.querySelector('img').src : '';
            if(src) imgEl.src = src;
            nameEl.innerText = randomClub.name;
            cycles++;
            if (cycles < maxCycles) { if (cycles > 15) speed += 50; setTimeout(spin, speed); } 
            else Game.finalizeDraftAnimation(winner, overlay);
        };
        spin();
    },

    finalizeDraftAnimation: (winner, overlay) => {
        const spinner = document.getElementById('draft-spinner');
        const status = document.getElementById('draft-status');
        const nameEl = document.getElementById('draft-name');
        const imgEl = document.getElementById('draft-img');
        const tempDiv = document.createElement('div'); tempDiv.innerHTML = getLogoSafe(winner);
        const finalImg = tempDiv.querySelector('img');
        if(finalImg) { imgEl.src = finalImg.src; imgEl.style.opacity = "1"; } 
        else { imgEl.style.display = "none"; spinner.innerHTML = tempDiv.querySelector('.fallback-badge').outerHTML; }
        nameEl.innerText = winner.name; nameEl.style.color = "#fff"; status.innerText = "CONTRACT OFFERED!"; status.style.color = "var(--accent)";
        spinner.classList.add('locked');
        setTimeout(() => { overlay.style.opacity = '0'; overlay.style.transition = 'opacity 0.5s'; setTimeout(() => { document.body.removeChild(overlay); Game.state.introPlayed = true; Game.updateHUD(); Game.renderDashboard(); }, 500); }, 2000);
    },

    renderDashboard: () => {
        const p = Game.state.player;
        const logoHTML = getLogoSafe(p.club);
        const avatarSVG = getAvatarSVG(p.avatarId, false); 
        let html = `<div class="dashboard-grid"><div class="stat-card"><h3>PLAYER PROFILE</h3><div style="width:100px; height:100px; margin:0 auto; border-radius:50%; overflow:hidden; border:2px solid #555; background:#333; display:flex; justify-content:center; align-items:center;"><div style="width:100%; height:100%;">${avatarSVG}</div></div><div style="font-size:1.5rem; font-weight:bold; margin-top:5px;">${p.name || 'YOU'}</div><div style="color:#aaa;">${p.pos} • ${p.nat}</div></div><div class="stat-card"><h3>CURRENT CLUB</h3><div style="display:flex; justify-content:center; margin:10px;">${logoHTML}</div><div style="font-size:1.5rem; font-weight:bold;">${p.club.name}</div><div style="color:#aaa;">Tier ${p.club.tier} • ${p.club.country}</div><hr style="border-color:#444"><div>Form: <strong style="color:${p.form > 1 ? '#4caf50' : '#e53935'}">${p.form > 1 ? '🔥 On Fire' : '😐 Normal'}</strong></div></div><div class="stat-card"><h3>CAREER STATS</h3><table class="stat-table"><tr><td>Matches</td><td>${p.stats.matches}</td></tr><tr><td>Goals</td><td>${p.stats.goals} (Int: ${p.stats.intGoals})</td></tr><tr><td>Assists</td><td>${p.stats.assists}</td></tr><tr><td>Trophies</td><td>🏆 ${p.stats.titles + p.stats.cups}</td></tr><tr><td>Awards</td><td style="color:#FFD700">${p.stats.ballonDor > 0 ? '🏆 x'+p.stats.ballonDor : '-'}</td></tr></table></div></div><div style="text-align:center; margin-top:30px;"><button class="btn btn-gold" onclick="Game.simulateSeason()">Simulate Season (+2 Years)</button></div>`;
        Game.render(html);
    },

    simulateSeason: () => {
        const p = Game.state.player;
        const diffMult = Game.state.difficultyMult; 
        Game.state.locks.transferWindow = false; Game.state.offers = [];
        const roll = Math.random();
        let formFactor = 1.0; let eventMsg = "Standard Season";
        if (roll > 0.85) { formFactor = 1.5; eventMsg = "BREAKOUT SEASON! 🌟"; }
        else if (roll < 0.15) { formFactor = 0.6; eventMsg = "Injury Struggles 🚑"; }
        p.form = formFactor;
        const games = 30 + Math.floor(Math.random() * 15); 
        let attackMod = 0.1;
        if (p.pos === 'ST') attackMod = 0.7; else if (p.pos === 'LW' || p.pos === 'RW') attackMod = 0.5; else if (p.pos === 'CAM') attackMod = 0.35;
        const skillFactor = (p.ovr / 90); 
        let sGoals = Math.floor(games * attackMod * skillFactor * formFactor * diffMult * (0.8 + Math.random()*0.4));
        let sAssists = Math.floor(games * 0.25 * skillFactor * formFactor * diffMult);
        if (p.pos === 'GK' || p.pos.includes('B')) sGoals = Math.floor(Math.random() * 3);
        const isWCYear = (Game.state.season % 4 === 2);
        let newCaps = 0; let newIntGoals = 0;
        if (p.ovr > 78) {
            newCaps = 4 + Math.floor(Math.random() * 6);
            if (isWCYear) newCaps += Math.floor(Math.random() * 5);
            if (p.pos !== 'GK') newIntGoals = Math.floor(newCaps * attackMod * 0.5 * formFactor * diffMult);
            if (isWCYear && p.ovr > 88 && Math.random() > 0.8) { p.stats.wcTitles++; eventMsg += " | 🏆 WORLD CUP WINNER!"; }
        }
        p.stats.caps += newCaps; p.stats.intGoals += newIntGoals;
        
        const clubTraining = (4 - p.club.tier) * 2.5; 
        let ageEfficiency = 0; let decay = 0;
        if (p.age <= 22) { ageEfficiency = 1.6; decay = 0; } else if (p.age <= 27) { ageEfficiency = 0.8; decay = 0; } else if (p.age <= 31) { ageEfficiency = 0.2; decay = 1.0; } else { ageEfficiency = 0.05; decay = 3.0; }
        const perfBoost = (formFactor > 1.2) ? 3 : 0; 
        let potentialGrowth = (clubTraining + perfBoost) * ageEfficiency * diffMult;
        let finalGrowth = Math.round(potentialGrowth - decay);
        if (finalGrowth > 8) finalGrowth = 8;
        if (p.ovr + finalGrowth > 99) finalGrowth = 99 - p.ovr;
        p.ovr += finalGrowth; if(p.ovr > p.stats.peakOvr) p.stats.peakOvr = p.ovr;
        
        if (Math.random() < (p.club.str / 100) && p.stats.matches > 10) { if (Math.random() > 0.4) p.stats.titles++; if (Math.random() > 0.6) p.stats.cups++; }
        let bScore = (sGoals * 1.5) + (sAssists) + ((p.stats.titles + p.stats.wcTitles)*15);
        if (p.ovr >= 92) bScore += 20;
        if (bScore > 100 && Math.random() > 0.6) { p.stats.ballonDor++; eventMsg += " | 🥇 BALLON D'OR!"; }
        p.stats.matches += games; p.stats.goals += sGoals; p.stats.assists += sAssists;
        p.history.unshift({ season: Game.state.season, club: p.club.name, diff: finalGrowth >= 0 ? `+${finalGrowth}` : finalGrowth, ovr: p.ovr });
        Game.state.season++; p.age += 2; 
        if (Game.state.season > Game.state.maxSeasons || p.age > 38) Game.renderRetirement(); else Game.renderTransferWindow(eventMsg);
    },

    // --- WEIGHTED & STRICT OFFER SYSTEM (SMART) ---
    renderTransferWindow: (eventMsg) => {
        Game.updateHUD();
        const p = Game.state.player;
        const diff = Game.state.difficulty;
        const natGroup = p.natGroup || 3;
        
        if (!Game.state.locks.transferWindow) {
            let reputation = p.ovr;
            if (natGroup === 1) reputation += 2; 
            if (natGroup === 3) reputation -= 3;
            if (diff === 'Easy') reputation += 4;
            if (diff === 'Hard') reputation -= 4;
            reputation += (Game.state.season * 0.5);
            if (p.form > 1.2) reputation += 2;

            // --- STRICT TIER UNLOCK LOGIC ---
            // Group 1: Unlock Tier 1 after Season 1
            // Group 2: Unlock Tier 1 after Season 2
            // Group 3: Unlock Tier 1 after Season 3
            
            const seasonIndex = Game.state.season; // Current season finished
            let maxTier = 3;

            // Determine Max Allowed Tier by Season & Group
            if (natGroup === 1) {
                if (seasonIndex >= 2) maxTier = 1; // Season 2+ -> All Open
                else maxTier = 2; // Season 1 -> Tier 2 max
            } else if (natGroup === 2) {
                if (seasonIndex >= 3) maxTier = 1; // Season 3+ -> All Open
                else maxTier = 2; // Season 1-2 -> Tier 2 max
            } else { // Group 3
                if (seasonIndex >= 4) maxTier = 1; // Season 4+ -> All Open
                else if (seasonIndex >= 3) maxTier = 2; // Season 3 -> Tier 2
                else maxTier = 3; // Season 1-2 -> Stuck in Tier 3
            }

            // OVR Check (Must still be good enough)
            const diffMult = Game.state.difficultyMult;
            const tier1Req = 86 / diffMult;
            const tier2Req = 80 / diffMult;

            let targetTier = 3;

            // Logic to pick the best possible offer within constraints
            if (p.ovr >= tier1Req && maxTier === 1) {
                targetTier = 1; // You are good & allowed -> Go Elite
            } else if (p.ovr >= tier2Req && maxTier <= 2) {
                targetTier = 2; // Good & allowed -> Go Strong
            } else {
                targetTier = 3; // Weak or restricted
            }
            
            let pool = CLUB_DB.filter(c => c.id !== p.club.id);
            let tierPool = pool.filter(c => c.tier === targetTier);
            
            // Fallback
            if (tierPool.length === 0) tierPool = pool.filter(c => c.tier === 3);

            let generatedOffers = [];
            for (let i = 0; i < 3; i++) {
                generatedOffers.push(tierPool[Math.floor(Math.random() * tierPool.length)]);
            }

            Game.state.offers = [...new Set(generatedOffers)];
            Game.state.locks.transferWindow = true; 
        }
        
        const offers = Game.state.offers;
        let html = `<div style="text-align:center;"><h2>TRANSFER WINDOW</h2><div style="background:#333; padding:10px; display:inline-block; border-radius:8px; margin-bottom:20px;"><span style="color:${p.form > 1 ? '#FFD700' : '#ccc'}">${eventMsg}</span></div><div class="transfer-list">
            ${offers.map((c, idx) => `<div class="transfer-row tier-${c.tier} transfer-anim-enter" style="animation-delay: ${idx * 0.2}s"><div class="club-identity">${getLogoSafe(c)}<div class="offer-info"><h3>${c.name}</h3><span>${c.country} • Tier ${c.tier}</span></div></div><button class="btn btn-gold" style="margin:0; padding:10px 20px; font-size:0.9rem;" onclick="Game.acceptTransfer(${idx})">SIGN</button></div>`).join('')}
            <div class="transfer-row transfer-anim-enter" style="background:transparent; border:2px dashed #555; justify-content:center; animation-delay: ${offers.length * 0.2}s"><button class="btn btn-reject" style="width:100%; padding:15px;" onclick="Game.renderDashboard()">REJECT ALL & STAY</button></div></div></div>`;
        Game.render(html);
    },

    acceptTransfer: (idx) => { Game.state.player.club = Game.state.offers[idx]; Game.renderDashboard(); Game.updateHUD(); },

    renderRetirement: async () => {
        Game.updateHUD();
        const p = Game.state.player;
        const container = document.getElementById('app');
        container.innerHTML = `<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; color:white;"><h2>Analyzing Career...</h2><p>Generating FIFA Ultimate Team Card...</p><div class="draft-spinner" style="width:50px; height:50px; border-width:4px;"></div></div>`;
        
        const analysis = await AnalysisEngine.generateReport(p);
        const avatarSVG = getAvatarSVG(p.avatarId); 
        const faceStats = AnalysisEngine.generateFaceStats(p.pos, p.stats.peakOvr);

        const uclCount = p.stats.cups; 
        const wcCount = p.stats.wcTitles;
        const ballonDorCount = p.stats.ballonDor;

        let html = `
            <div class="retirement-view">
                <div class="fut-card-container">
                    <div class="fut-player-card ${analysis.card_class}">
                        <div class="fut-top-info">
                            <div class="fut-rating">${analysis.overall}</div>
                            <div class="fut-position">${analysis.position}</div>
                            <img src="./logos/clubs/${p.club.file}" class="fut-club-logo" onerror="this.style.display='none'">
                            <img src="https://flagcdn.com/w80/${COUNTRIES.find(c => c.name === p.nat)?.code || 'un'}.png" class="fut-nation-flag">
                        </div>
                        <div class="fut-player-image">${avatarSVG}</div>
                        <div class="fut-name">${p.name || 'LEGEND'}</div>
                        <div class="fut-face-stats">${faceStats.map(s => `<div class="fut-stat-row"><span class="fut-stat-val">${s.v}</span><span class="fut-stat-label">${s.l}</span></div>`).join('')}</div>
                    </div>
                </div>
                <div class="fut-achievements-panel">
                    <div class="legacy-header">${p.name || 'Player'} - Career Legacy ⚽</div>
                    <div class="legacy-stat-row"><span class="legacy-stat-label">⚽ Total Matches</span><span class="legacy-stat-value">${p.stats.matches}</span></div>
                    <div class="legacy-stat-row"><span class="legacy-stat-label">🏟️ Int Matches (Caps)</span><span class="legacy-stat-value">${p.stats.caps}</span></div>
                    <div class="legacy-stat-row"><span class="legacy-stat-label">🎯 Int Goals</span><span class="legacy-stat-value">${p.stats.intGoals}</span></div>
                    <div class="legacy-stat-row"><span class="legacy-stat-label">🔥 Total Goals</span><span class="legacy-stat-value">${p.stats.goals}</span></div>
                    <div class="legacy-stat-row"><span class="legacy-stat-label">🏆 Total Major Trophies</span><span class="legacy-stat-value">${p.stats.titles + p.stats.cups + p.stats.wcTitles}</span></div>
                    <div class="titles-section-title">Major Titles</div>
                    <div class="major-title-row"><div class="major-title-info"><img src="./logos/emoji/uefa-champions-league-trophy.png" class="title-img" onerror="this.style.display='none'"><span class="title-name">Champions League</span></div><span class="title-count">${uclCount > 0 ? uclCount + ' x' : '0'}</span></div>
                    <div class="major-title-row"><div class="major-title-info"><img src="./logos/emoji/world cup.png" class="title-img" onerror="this.style.display='none'"><span class="title-name">World Cup</span></div><span class="title-count">${wcCount > 0 ? wcCount + ' x' : '0'}</span></div>
                    <div class="major-title-row"><div class="major-title-info"><img src="./logos/emoji/ballon-d’or-trophy.png" class="title-img" onerror="this.style.display='none'"><span class="title-name">Ballon d'Or</span></div><span class="title-count">${ballonDorCount > 0 ? ballonDorCount + ' x' : '0'}</span></div>
                    <div style="text-align:center; margin-top:10px; font-size:0.85rem; color:#888;">(Better than ${analysis.percentile_vs_fc26}% of players in FC26)<br>(Until season 20${25 + Game.state.season})</div>
                    <button class="btn btn-gold" style="margin-top:auto; width:100%;" onclick="location.reload()">Play Again</button>
                </div>
            </div>
        `;
        Game.render(html);
    }
};

Game.init();
