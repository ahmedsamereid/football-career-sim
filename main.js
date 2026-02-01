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

    // --- TIER 3: STARTER (OVR <76) ---
    { id: "hei", file: "1.FC Heidenheim 1846.png", name: "Heidenheim", country: "Germany", tier: 3, str: 72, colors: ["#E2001A", "#fff"] },
    { id: "ab", file: "Aberdeen FC.png", name: "Aberdeen", country: "Scotland", tier: 3, str: 68, colors: ["#D40E14", "#fff"] },
    { id: "aar", file: "Aarhus GF.png", name: "Aarhus", country: "Denmark", tier: 3, str: 66, colors: ["#fff", "#000"] },
    { id: "slv", file: "1.FC Slovacko.png", name: "Slovacko", country: "Czech Rep", tier: 3, str: 65, colors: ["#003E7E", "#fff"] },
    { id: "spa", file: "AC Sparta Prague.png", name: "Sparta Prague", country: "Czech Rep", tier: 3, str: 74, colors: ["#AC1C2E", "#fff"] },
    { id: "lec", file: "US Lecce.png", name: "Lecce", country: "Italy", tier: 3, str: 73, colors: ["#DC042A", "#fff"] },
    { id: "sas", file: "US Sassuolo.png", name: "Sassuolo", country: "Italy", tier: 3, str: 74, colors: ["#00A752", "#fff"] },
    { id: "wolf", file: "VfL Wolfsburg.png", name: "Wolfsburg", country: "Germany", tier: 3, str: 76, colors: ["#65B32E", "#fff"] },
    { id: "mai", file: "1.FSV Mainz 05.png", name: "Mainz 05", country: "Germany", tier: 3, str: 74, colors: ["#C3141F", "#fff"] }
];

/* ======================================================
   2. HELPER: LOGO VALIDATION & FALLBACK
   ====================================================== */

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
   3. GAME ENGINE
   ====================================================== */

const Game = {
    state: {
        season: 1,
        maxSeasons: 10, 
        player: {
            pos: null, nat: null, age: 18, ovr: 60,
            club: null,
            form: 1.0, 
            stats: { 
                matches: 0, goals: 0, assists: 0, 
                titles: 0, cups: 0, // Split titles
                caps: 0, intGoals: 0, wcTitles: 0, 
                ballonDor: 0,
                peakOvr: 60 // Track Peak
            },
            history: []
        },
        locks: { startClub: false, transferWindow: false },
        offers: [],
        introPlayed: false 
    },

    // --- HUD ---
    updateHUD: () => {
        const p = Game.state.player;
        document.getElementById('game-header').classList.remove('hidden');
        document.getElementById('hud-season').innerText = `${Game.state.season}/${Game.state.maxSeasons}`;
        document.getElementById('hud-age').innerText = p.age;
        
        const ovrEl = document.getElementById('hud-ovr');
        ovrEl.innerText = p.ovr;
        if(p.ovr >= 90) ovrEl.style.color = "#E91E63"; // Mythical
        else if(p.ovr >= 85) ovrEl.style.color = "#FFD700"; 
        else if(p.ovr >= 75) ovrEl.style.color = "#4CAF50";
        else ovrEl.style.color = "#fff";

        document.getElementById('hud-club').innerText = p.club ? p.club.name : "Free Agent";
    },

    render: (html) => document.getElementById('app').innerHTML = html,
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

    // --- START GAME ---
    startGame: () => {
        const p = Game.state.player;
        let animationCandidates = []; 

        if (!Game.state.locks.startClub) {
            let candidates = CLUB_DB.filter(c => c.tier === 3 && c.country === p.nat);
            if(candidates.length === 0) candidates = CLUB_DB.filter(c => c.tier === 3);
            
            const poolSize = Math.min(candidates.length, 5);
            for(let i=0; i<poolSize; i++) {
                animationCandidates.push(candidates[Math.floor(Math.random() * candidates.length)]);
            }
            p.club = animationCandidates[Math.floor(Math.random() * animationCandidates.length)];
            
            p.age = 18; 
            p.ovr = 60 + Math.floor(Math.random()*4);
            p.stats.peakOvr = p.ovr;
            Game.state.locks.startClub = true;
        }

        if (!Game.state.introPlayed) {
            Game.runDraftAnimation(animationCandidates, p.club);
        } else {
            Game.updateHUD();
            Game.renderDashboard();
        }
    },

    // --- DRAFT ANIMATION ---
    runDraftAnimation: (pool, winner) => {
        const overlay = document.createElement('div');
        overlay.className = 'draft-overlay';
        overlay.innerHTML = `
            <div class="draft-text" id="draft-status">SCOUTING CLUBS...</div>
            <div class="draft-spinner" id="draft-spinner">
                <img src="" id="draft-img" style="opacity:0.5">
            </div>
            <div class="draft-text" id="draft-name" style="font-size:1.5rem; color:var(--text-muted)"></div>
        `;
        document.body.appendChild(overlay);

        let cycles = 0;
        let speed = 100;
        const maxCycles = 20; 
        
        const spin = () => {
            const randomClub = pool[Math.floor(Math.random() * pool.length)];
            const imgEl = document.getElementById('draft-img');
            const nameEl = document.getElementById('draft-name');
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = getLogoSafe(randomClub);
            const src = tempDiv.querySelector('img') ? tempDiv.querySelector('img').src : '';
            
            if(src) imgEl.src = src;
            nameEl.innerText = randomClub.name;

            cycles++;

            if (cycles < maxCycles) {
                if (cycles > 15) speed += 50; 
                setTimeout(spin, speed);
            } else {
                Game.finalizeDraftAnimation(winner, overlay);
            }
        };
        spin();
    },

    finalizeDraftAnimation: (winner, overlay) => {
        const spinner = document.getElementById('draft-spinner');
        const status = document.getElementById('draft-status');
        const nameEl = document.getElementById('draft-name');
        const imgEl = document.getElementById('draft-img');

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = getLogoSafe(winner);
        const finalImg = tempDiv.querySelector('img');
        
        if(finalImg) {
            imgEl.src = finalImg.src;
            imgEl.style.opacity = "1";
        } else {
            imgEl.style.display = "none";
            spinner.innerHTML = tempDiv.querySelector('.fallback-badge').outerHTML;
        }

        nameEl.innerText = winner.name;
        nameEl.style.color = "#fff";
        status.innerText = "CONTRACT OFFERED!";
        status.style.color = "var(--accent)";
        
        spinner.classList.add('locked');

        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                document.body.removeChild(overlay);
                Game.state.introPlayed = true;
                Game.updateHUD();
                Game.renderDashboard();
            }, 500);
        }, 2000);
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
                        <tr><td>Goals</td><td>${p.stats.goals} (Int: ${p.stats.intGoals})</td></tr>
                        <tr><td>Assists</td><td>${p.stats.assists}</td></tr>
                        <tr><td>Trophies</td><td>L: ${p.stats.titles} | C: ${p.stats.cups} | WC: ${p.stats.wcTitles}</td></tr>
                        <tr><td>Caps</td><td>${p.stats.caps}</td></tr>
                        <tr><td>Awards</td><td style="color:#FFD700">${p.stats.ballonDor > 0 ? '🏆 x'+p.stats.ballonDor : '-'}</td></tr>
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
                <button class="btn btn-gold" onclick="Game.simulateSeason()">Simulate Season (+2 Years)</button>
            </div>
        `;
        Game.render(html);
    },

    // --- SIMULATE SEASON (LOGIC OVERHAUL) ---
    simulateSeason: () => {
        const p = Game.state.player;
        Game.state.locks.transferWindow = false; 
        Game.state.offers = [];

        // 1. FORM & VIBE
        const roll = Math.random();
        let formFactor = 1.0;
        let eventMsg = "Standard Season";
        if (roll > 0.85) { formFactor = 1.5; eventMsg = "BREAKOUT SEASON! 🌟"; }
        else if (roll < 0.15) { formFactor = 0.6; eventMsg = "Injury Struggles 🚑"; }
        p.form = formFactor;

        // 2. DOMESTIC STATS
        const games = 30 + Math.floor(Math.random() * 15); // More games in good teams
        let attackMod = 0.1;
        if (p.pos === 'ST') attackMod = 0.7;
        else if (p.pos === 'LW' || p.pos === 'RW') attackMod = 0.5;
        else if (p.pos === 'CAM') attackMod = 0.35;

        const skillFactor = (p.ovr / 90); // Normalized to 90
        let sGoals = Math.floor(games * attackMod * skillFactor * formFactor * (0.8 + Math.random()*0.4));
        let sAssists = Math.floor(games * 0.25 * skillFactor * formFactor);
        if (p.pos === 'GK' || p.pos.includes('B')) sGoals = Math.floor(Math.random() * 3);

        // 3. INTERNATIONAL STATS (Caps & WC)
        const isWCYear = (Game.state.season % 4 === 2); // Season 2, 6, 10...
        let newCaps = 0;
        let newIntGoals = 0;
        
        if (p.ovr > 78) {
            newCaps = 4 + Math.floor(Math.random() * 6);
            if (isWCYear) newCaps += Math.floor(Math.random() * 5); // WC games
            
            // International Goals
            if (p.pos !== 'GK') {
                newIntGoals = Math.floor(newCaps * attackMod * 0.5 * formFactor);
            }
            
            // WC Title Chance
            if (isWCYear && p.ovr > 88 && Math.random() > 0.8) {
                p.stats.wcTitles++;
                eventMsg += " | 🏆 WORLD CUP WINNER!";
            }
        }
        
        p.stats.caps += newCaps;
        p.stats.intGoals += newIntGoals;

        // 4. GROWTH FORMULA (90+ UNLOCKED)
        // High Tier = High Training (Tier 1=5pts, Tier 3=2pts)
        const clubTraining = (4 - p.club.tier) * 2.5; 
        
        let ageEfficiency = 0;
        let decay = 0;

        if (p.age <= 22) {
            ageEfficiency = 1.6; // Hyper growth
            decay = 0;
        } else if (p.age <= 27) {
            ageEfficiency = 0.8; // Peak maintenance
            decay = 0;
        } else if (p.age <= 31) {
            ageEfficiency = 0.2; // Plateau
            decay = 1.0;
        } else {
            ageEfficiency = 0.05; // Decline
            decay = 3.0; // Heavy drop
        }

        const perfBoost = (formFactor > 1.2) ? 3 : 0; // Performance rewards
        
        let potentialGrowth = (clubTraining + perfBoost) * ageEfficiency;
        let finalGrowth = Math.round(potentialGrowth - decay);

        // Prevent overflow
        if (finalGrowth > 8) finalGrowth = 8;
        if (p.ovr + finalGrowth > 99) finalGrowth = 99 - p.ovr;
        
        p.ovr += finalGrowth;
        if(p.ovr > p.stats.peakOvr) p.stats.peakOvr = p.ovr; // Update Peak

        // 5. DOMESTIC TITLES (LOGIC BASED)
        // Only win if team is strong AND played matches
        const teamStrength = p.club.str; // 65 to 94
        const winProbability = (teamStrength / 100);
        
        if (Math.random() < winProbability && p.stats.matches > 10) {
            if (Math.random() > 0.4) p.stats.titles++; // League
            if (Math.random() > 0.6) p.stats.cups++; // Cup
        }

        // 6. BALLON D'OR (STRICT LOGIC)
        // Score = Goals*1.5 + Assists*1 + Titles*10 + (OVR > 90 bonus)
        let bScore = (sGoals * 1.5) + (sAssists) + ((p.stats.titles + p.stats.wcTitles)*15);
        if (p.ovr >= 92) bScore += 20;
        
        if (bScore > 100 && Math.random() > 0.6) {
            p.stats.ballonDor++;
            eventMsg += " | 🥇 BALLON D'OR!";
        }

        // Update Totals
        p.stats.matches += games;
        p.stats.goals += sGoals;
        p.stats.assists += sAssists;

        p.history.unshift({
            season: Game.state.season,
            club: p.club.name,
            diff: finalGrowth >= 0 ? `+${finalGrowth}` : finalGrowth,
            ovr: p.ovr
        });

        Game.state.season++;
        p.age += 2; 

        if (Game.state.season > Game.state.maxSeasons || p.age > 38) {
            Game.renderRetirement();
        } else {
            Game.renderTransferWindow(eventMsg);
        }
    },

    // --- TRANSFER WINDOW ---
    renderTransferWindow: (eventMsg) => {
        Game.updateHUD();
        const p = Game.state.player;
        
        if (!Game.state.locks.transferWindow) {
            let maxTier = 3; let minTier = 3;
            // High OVR unlocks Top Clubs
            if (p.ovr >= 86) { maxTier = 1; minTier = 1; }
            else if (p.ovr >= 80) { maxTier = 1; minTier = 2; }
            else if (p.ovr >= 74) { maxTier = 2; minTier = 2; }
            else if (p.ovr >= 68) { maxTier = 2; minTier = 3; }
            
            let pool = CLUB_DB.filter(c => c.id !== p.club.id);
            let eliteOffers = pool.filter(c => c.tier === 1);
            let midOffers = pool.filter(c => c.tier === 2);
            let lowOffers = pool.filter(c => c.tier === 3);

            let generatedOffers = [];
            
            // Smart Offer Generation
            if (maxTier === 1 && eliteOffers.length > 0) 
                generatedOffers.push(eliteOffers[Math.floor(Math.random()*eliteOffers.length)]);
            else if (midOffers.length > 0) 
                generatedOffers.push(midOffers[Math.floor(Math.random()*midOffers.length)]);

            if (minTier === 2 && midOffers.length > 0) 
                generatedOffers.push(midOffers[Math.floor(Math.random()*midOffers.length)]);
            else if (lowOffers.length > 0) 
                generatedOffers.push(lowOffers[Math.floor(Math.random()*lowOffers.length)]);

            generatedOffers.push(pool[Math.floor(Math.random() * pool.length)]);
            Game.state.offers = [...new Set(generatedOffers)];
            Game.state.locks.transferWindow = true; 
        }

        const offers = Game.state.offers;

        const html = `
            <div style="text-align:center;">
                <h2>TRANSFER WINDOW</h2>
                <div style="background:#333; padding:10px; display:inline-block; border-radius:8px; margin-bottom:20px;">
                    <span style="color:${p.form > 1 ? '#FFD700' : '#ccc'}">${eventMsg}</span>
                </div>
                
                <div class="transfer-list">
                    ${offers.map((c, idx) => `
                        <div class="transfer-row tier-${c.tier} transfer-anim-enter" style="animation-delay: ${idx * 0.2}s">
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

                    <div class="transfer-row transfer-anim-enter" style="background:transparent; border:2px dashed #555; justify-content:center; animation-delay: ${offers.length * 0.2}s">
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

    // --- RETIREMENT (ENHANCED VISUALS) ---
    renderRetirement: () => {
        const p = Game.state.player;
        
        let html = `
            <div style="display:flex; justify-content:center; align-items:center; height:100%;">
                <div class="retirement-card">
                    <h1 style="color:var(--accent); font-size:4rem; margin:0; line-height:1;">LEGEND</h1>
                    <p style="color:#aaa; margin-bottom:30px;">CAREER SUMMARY</p>
                    
                    <div style="text-align:left; width:100%; max-width:400px; margin:0 auto;">
                        <div class="highlight-stat">Peak Rating <span>${p.stats.peakOvr}</span></div>
                        <div class="highlight-stat">Club Goals <span>${p.stats.goals}</span></div>
                        <div class="highlight-stat">Int. Goals <span>${p.stats.intGoals}</span></div>
                        <div class="highlight-stat">Caps <span>${p.stats.caps}</span></div>
                        <div class="highlight-stat">Trophies <span>${p.stats.titles + p.stats.cups + p.stats.wcTitles}</span></div>
                        <div class="highlight-stat">Ballon d'Ors <span>${p.stats.ballonDor}</span></div>
                    </div>

                    <button class="btn btn-gold" style="margin-top:30px; width:100%;" onclick="location.reload()">START NEW LEGACY</button>
                </div>
            </div>
        `;
        Game.render(html);
    }
};

Game.init();
