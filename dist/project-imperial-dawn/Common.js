(function() {
    // --- 1. SAFE LOADER ---
    const checkExist = setInterval(function() {
        const root = document.getElementById('imperial-terminal-root');
        if (root) {
            clearInterval(checkExist);
            initImperialHolomap(root);
        }
    }, 100);

    // --- 2. THE DATABASE ---
    const DB = {
        "HOME": {
            "Briefing": { 
                type: "welcome", 
                title: "WELCOME, TRAVELER", 
                image: "https://project-imperial-dawn.fandom.com/special:filepath/Galaxy2.webp",
                content: "> TERMINAL CONNECTION ESTABLISHED\n\nWelcome to the Project: Imperial Dawn HoloNet. This repository serves as the central database for the Galaxy.\n\nAll travelers are required to familiarise themselves with the Galactic Laws and local governance protocols. Access the directories to review military assets, historical records, and high-priority personnel dossiers.\n\nGOOD LUCK, TRAVELER." 
            },
            "News": {
                type: "news_feed",
                title: "HOLONET NEWS NETWORK",
                data: [
                    {
                        date: "WEEK 01",
                        title: "THE NEWS SECTION",
                        content: "For the first time in galactic history, the silence of the stars is being replaced by a unified voice. Today marks the official activation of the HoloNet News. Whether you are navigating the high-rises of Coruscant or farming the moisture of Tatooine, the truth is now at your fingertips.",
                        image: "https://placehold.co/600x300/00101c/00ccff?text=HOLONET+BROADCAST",
                        tag: "OFFICIAL"
                    }
                ]
            },
            "Credits": { 
                type: "tactical", 
                data: [
                    { title: "NICOZZ06", loc: "LOGISTICS", status: "WIKI MANAGER", desc: "Project Imperial Dawn Wiki Manager." }
                ]
            }
        },
        "LORE": {
            "Timeline": { type: "list", data: [
                { left: "19 BBY", right: "Creation of The Galactic Empire", tag: "DECLARATION" }
            ]},
            "Battles": { 
                type: "record_list", 
                data: [
                    { 
                        title: "UNKNOWN CONFLICT", 
                        loc: "UNKNOWN SECTOR", 
                        date: "TBD", 
                        status: "AWAITING DATA", 
                        theme: "neutral",
                        desc: "No battle records have been logged in the holocron at this time. Future conflicts will be documented here once they occur.", 
                        image: "https://placehold.co/400x200/00101c/00ccff?text=NO+DATA" 
                    }
                ] 
            },
            "Events": { 
                type: "record_list", 
                data: [
                    { 
                        title: "UNKNOWN EVENT", 
                        loc: "UNKNOWN SECTOR", 
                        date: "TBD", 
                        status: "AWAITING DATA", 
                        theme: "neutral",
                        desc: "No major galactic events have been logged. The timeline remains undisturbed. Awaiting future updates.", 
                        image: "https://placehold.co/400x200/00101c/00ccff?text=NO+DATA" 
                    }
                ] 
            },
            "Permadeath": {
                type: "pd_document", 
                title: "LARP & PERMADEATH FRAMEWORK",
                subtitle: "OFFICIAL DIRECTIVE // MANDATORY READING",
                sections: [
                    { 
                        header: "1. PHILOSOPHY & STAKES", 
                        content: "Permanent Death (PD) events in this sector are designed to be cinematic, high-stakes, and final. Unlike standard skirmishes, these events carry real weight. <br><br><strong>WARNING:</strong> All players present within a PD-designated event server are considered 'Active Participants' and are vulnerable to character deletion." 
                    },
                    { 
                        header: "2. EVENT HOSTING PROTOCOLS", 
                        content: "To ensure fairness and quality, PD events are hosted <strong>exclusively</strong> by the Lore Team. Unauthorized PD events are null and void.<br><br>Event Structures:<br>• <strong>Fully Scripted:</strong> A narrative experience with a predetermined outcome.<br>• <strong>Player-Action Based:</strong> The outcome is determined entirely by combat and strategy.<br>• <strong>Hybrid:</strong> Key plot points are fixed, but survival is up to you." 
                    },
                    { 
                        header: "3. DEATH VALIDITY & APPEALS", 
                        content: "Under standard protocols, all deaths are final. However, the Lore Team reserves the right to void a death under specific technical circumstances:<br><br>• <strong>Server Disconnection:</strong> Verified crash or disconnect during combat.<br>• <strong>Development Error:</strong> Death caused by a glitch or script failure.<br>• <strong>Fail RP:</strong> Death caused by another player breaking rules (Lore Team discretion)." 
                    }
                ]
            }
        },
        "CHARACTERS": {
            "Character Registration": {
                type: "form",
                title: "CHARACTER REGISTRATION",
                desc: "Welcome to the official submission portal for the <strong>Custom Characters</strong> wiki page! <br><br><strong>REGISTRATION GUIDE:</strong><br>1. Fill out the information accurately.<br>2. COPY the generated code.<br>3. Open a Discord ticket about the character registration.<br><br><strong>Staff will review and add your character once approved!</strong>"
            },
            "Main Characters": { 
                type: "cards", 
                data: [
                    { title: "GALACTIC EMPEROR", sub: "Galactic Ruler", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/EmperorTest1.webp", stats: { "HOME": "NABOO", "SPECIES": "HUMAN" }, bio: "Sheev Palpatine restored the galaxy to order." },
                    { title: "LORD VADER", sub: "Supereme Commander", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/Lordvader.png", stats: { "HOME": "TATOOINE", "SPECIES": "HUMAN (CYBORG)" }, bio: "The Chosen One and the iron fist of the Empire, tasked with hunting down the last of the Jedi." },
                    { title: "GRAND VIZIER", sub: "Mas Amedda", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/GrandVizier.webp", stats: { "HOME": "CHAMPALA", "SPECIES": "CHAGRIAN" }, bio: "The chief administrator of the Galactic Empire and one of the few who knew the Emperor’s darkest secrets." },
                    { title: "LORD COMMANDANT", sub: "Head of the Imperial Royal Guards", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/Sover.png", stats: { "HOME": "YINCHORR", "SPECIES": "HUMAN" }, bio: "The silent sentinel charged with the personal safety of the Emperor." },
                    { title: "GRAND MOFF", sub: "Wilhuff Tarkin", status: "IMPERIAL GOVERNMENT", image: "https://project-imperial-dawn.fandom.com/special:filepath/Tarkin.png", stats: { "HOME": "ERIADU", "SPECIES": "HUMAN" }, bio: "Architect of the Tarkin Doctrine, he rules through the fear of force rather than force itself." },
                    { title: "GRAND INQUISITOR", sub: "Head of the inquisition", status: "IMPERIAL INQUISITION", image: "https://project-imperial-dawn.fandom.com/special:filepath/GrandInquisitor.png", stats: { "HOME": "UTAPAU", "SPECIES": "PA'AN" }, bio: "A former Jedi Temple Guard turned dark side hunter." }
                ]
            },
            "Lore Characters": { 
                type: "cards_filter", 
                categories: ["EMPIRE", "REBEL", "OTHERS"],
                data: [
                    { category: "EMPIRE", header: "IMPERIAL SECURITY BUREAU", items: [ { title: "DIRECTOR/COLONEL", sub: "Wullf Yularen", status: "IMPERIAL SECURITY BUREAU", stats: { "HOME": "ANAXES", "SPECIES": "HUMAN" }, bio: "The person behind the imperial intelligence." } ] },
                    { category: "EMPIRE", header: "IMPERIAL ARMY", items: [ { title: "GRAND GENERAL", sub: "Cassio Tagge", status: "IMPERIAL ARMY", stats: { "HOME": "TEPANI SECTOR", "SPECIES": "HUMAN" }, bio: "A pragmatic military strategist that leads the Imperial Army branch." }, { title: "COLONEL", sub: "Vanis Tigo", status: "IMPERIAL ARMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "A rigid Imperial officer that leads the 14th Security Division." }, { title: "COLONEL", sub: "Iree Falk", status: "IMPERIAL ARMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "An Imperial officer that leads the 224th Imperial Armored Division." } ] },
                    { category: "EMPIRE", header: "IMPERIAL NAVY", items: [ { title: "GRAND ADMIRAL", sub: "Conan Motti", status: "IMPERIAL NAVY", stats: { "HOME": "SESWENNA SECTOR", "SPECIES": "HUMAN" }, bio: "Chief of the Imperial Navy." }, { title: "ADMIRAL", sub: "Jok Donassius", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "Decorated naval strategist in charge of a sector." }, { title: "VICE ADMIRAL", sub: "Gilad Pallaeon", status: "IMPERIAL NAVY", stats: { "HOME": "CORELLIA", "SPECIES": "HUMAN" }, bio: "A veteran that is the right hand of the Fleet Admiral." }, { title: "COMMODORE", sub: "Mitth'raw'nuruodo", status: "IMPERIAL NAVY", stats: { "HOME": "CSILLA", "SPECIES": "CHISS" }, bio: "A brilliant military polymath who studies the art of his adversaries, in charge of a fleet." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer that leads the first fleet." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer in charge of an ISD." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer in charge of an ISD." } ] },
                    { category: "EMPIRE", header: "STORMTROOPER CORPS", items: [ { title: "CORPS-GENERAL", sub: "Trech Molock", status: "STORMTROOPER CORPS", stats: { "HOME": "CORELLIA", "SPECIES": "HUMAN" }, bio: "The person in charge of the stormtrooper corps/TK program." }, { title: "COLONEL", sub: "Cody", status: "STORMTROOPER CORPS", stats: { "HOME": "KAMINO", "SPECIES": "HUMAN (CLONE)" }, bio: "The person in charge of the First Legion, Vader's personal." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Scout troopers." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Shock troopers." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Death troopers." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the EVO Troopers." }, { title: "LEAD INSTRUCTOR", sub: "IC-1262", status: "STORMTROOPER CORPS", stats: { "HOME": "KAMINO", "SPECIES": "HUMAN (CLONE)" }, bio: "The person in charge of the STC trainings." }, { title: "INSTRUCTOR", sub: "IC-6214", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN (CLONE)" }, bio: "Program instructor for the STC trainings." } ] },
                    { category: "EMPIRE", header: "IMPERIAL ACADEMY", items: [ { title: "COMMANDANT", sub: "Cumberlayne Aresko", status: "IMPERIAL ACADEMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "The person in charge of the cadet and army academy." } ] },
                    { category: "REBEL", header: "ALLIANCE HIGH COMMAND", items: [ { title: "SENATOR", sub: "Mon Mothma", status: "REBEL LEADER", stats: { "HOME": "CHANDRILA", "SPECIES": "HUMAN" }, bio: "A political leader working in secret to unite the rebel cells." }, { title: "SENATOR", sub: "Bail Organa", status: "REBEL LEADER", stats: { "HOME": "ALDERAAN", "SPECIES": "HUMAN" }, bio: "Viceroy of Alderaan and a key architect of the Rebellion." } ] },
                    { category: "REBEL", header: "STARFIGHTER CORPS", items: [ { title: "COMMANDER", sub: "Garven Dreis", status: "RED LEADER", stats: { "HOME": "VIRUJJSI", "SPECIES": "HUMAN" }, bio: "Veteran pilot leading Red Squadron." } ] },
                    { category: "OTHERS", header: "UNAFFILIATED / UNKNOWN", items: [ { title: "BOUNTY HUNTER", sub: "Cad Bane", status: "WANTED", stats: { "HOME": "DURO", "SPECIES": "DUROS" }, bio: "A ruthless mercenary known for taking on high-profile jobs." }, { title: "SMUGGLER", sub: "Unknown ID", status: "NEUTRAL", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "Operating in the Outer Rim sectors." } ] }
                ]
            },
            "Custom Characters": { 
                type: "cards", 
                data: [
                    { title: "YOUR NAME", sub: "Citizen", status: "PENDING", stats: { "ID": "UNKNOWN", "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "Register at ISB." }
                ]
            }
        },
        "KNOWN GALAXY": {
            "Factions": { 
                type: "factions", 
                data: [
                    { title: "GALACTIC EMPIRE", sub: "Ruling Government", status: "EMPIRE", alignment: "empire", image: "https://static.wikia.nocookie.net/project-imperial-dawn/images/d/d9/TGEFinished.png/revision/latest/scale-to-width-down/185?cb=20260215172437", stats: { "Capital": "Coruscant", "Head": "Emperor Palpatine", "Influence": "Universal" }, bio: "The supreme authority in the galaxy, bringing order and security to the systems through military strength and law.", divisions: ["Imperial Navy", "Imperial Army", "Stormtrooper Corps", "Imperial Intelligence", "Inquisitorius", "COMPNOR"] },
                    { title: "REBEL ALLIANCE", sub: "Terrorist Organization", status: "REBELLION", alignment: "rebel", image: "https://static.wikia.nocookie.net/project-imperial-dawn/images/3/37/Rebels.webp/revision/latest?cb=20260215164349", stats: { "Base": "Hidden", "Threat": "High", "Influence": "Outer Rim" }, bio: "An illegal insurgency operating in the Outer Rim, seeking to destabilize Galactic peace through sabotage and guerilla warfare.", divisions: ["HIDDEN"] }
                ]
            },
            "Armory": {
                type: "armory_split",
                sections: [
                    { header: "IMPERIAL WEAPONS", theme: "empire", items: [ { title: "E-11 BLASTER", sub: "Rifle", status: "STANDARD", image: "https://placehold.co/300x300/000/00ccff?text=E-11", stats: { "RANGE": "Medium", "DAMAGE": "High", "USE": "Stormtroopers" }, bio: "The standard issue blaster rifle for the Imperial Stormtrooper Corps. Rugged and reliable." }, { title: "T-21 REPEATER", sub: "Heavy Blaster", status: "SUPPORT", image: "https://placehold.co/300x300/000/00ccff?text=T-21", stats: { "RANGE": "Long", "DAMAGE": "Heavy", "USE": "Shock Troopers" }, bio: "A high-capacity repeating blaster used for suppression fire." } ] },
                    { header: "IMPERIAL VEHICLES", theme: "empire", items: [ { title: "AT-ST", sub: "Walker", status: "VEHICLE", image: "https://placehold.co/300x300/000/00ccff?text=AT-ST", stats: { "SPEED": "90 km/h", "CREW": "2", "ARMOR": "Medium" }, bio: "All Terrain Scout Transport. A bipedal walker used for reconnaissance and anti-infantry." }, { title: "TIE FIGHTER", sub: "Starfighter", status: "VEHICLE", image: "https://placehold.co/300x300/000/00ccff?text=TIE+Fighter", stats: { "SPEED": "1200 km/h", "CREW": "1", "SHIELDS": "None" }, bio: "The primary space superiority fighter of the Imperial Navy." } ] },
                    { header: "REBEL WEAPONS", theme: "rebel", items: [ { title: "DL-44", sub: "Heavy Pistol", status: "ILLEGAL", image: "https://placehold.co/300x300/300/aa0000?text=DL-44", stats: { "RANGE": "Short", "DAMAGE": "Very High", "USE": "Smugglers" }, bio: "A powerful, modifiable blaster pistol favored by Rebel officers and smugglers." }, { title: "A280 RIFLE", sub: "Rifle", status: "RESTRICTED", image: "https://placehold.co/300x300/300/aa0000?text=A280", stats: { "RANGE": "Long", "DAMAGE": "Medium", "USE": "Rebel Commandos" }, bio: "A durable blaster rifle with excellent range, commonly used by Alliance ground forces." } ] },
                    { header: "REBEL VEHICLES", theme: "rebel", items: [ { title: "X-WING", sub: "Starfighter", status: "VEHICLE", image: "https://placehold.co/300x300/300/aa0000?text=X-Wing", stats: { "SPEED": "1050 km/h", "CREW": "1+Droid", "SHIELDS": "Equipped" }, bio: "The T-65B X-wing starfighter is the backbone of the Rebel Alliance Starfighter Corps." } ] },
                    { header: "OTHERS", theme: "neutral", items: [ { title: "THERMAL DETONATOR", sub: "Explosive", status: "CONTRABAND", image: "https://placehold.co/300x300/555/999?text=Detonator", stats: { "BLAST": "6m", "TYPE": "Baradium", "USE": "Demolition" }, bio: "A highly unstable baradium-core explosive device. Possession is a Class A felony." } ] }
                ]
            },
            "Locations": { 
                type: "holomap", 
                data: [
                    { name: "UNKNOWN REGIONS", startAngle: 240, endAngle: 300, desc: "Uncharted Space // Galactic West", sub: [ { title: "UNKNOWN SIGNAL", image: "https://placehold.co/300x150/000/555?text=No+Data", status: "UNEXPLORED", stats: {"TERRAIN":"UNKNOWN", "SECTOR":"Unknown"}, bio: "No navigational data available. Long-range sensors detect anomalies. This sector has not yet been charted." } ] },
                    { name: "BRAK SECTOR", startAngle: 300, endAngle: 330, desc: "Outer Rim // Brakespan", sub: [ { title: "EADU", image: "https://project-imperial-dawn.fandom.com/special:filepath/Eadu.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"STORMY MOUNTAINS", "SECTOR":"Brak"}, bio: "A storm-lashed world characterized by jagged peaks. Site of the Tarkin Initiative's Kyber research facility." } ] },
                    { name: "CIRCUMTORE SECTOR", startAngle: 330, endAngle: 360, desc: "Expansion Region // Strategic Mining", sub: [ { title: "MIMBAN", image: "https://project-imperial-dawn.fandom.com/special:filepath/Mimban.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"SWAMP/MUD FLATS", "SECTOR":"Circumtore"}, bio: "A dark, mineral-rich world perpetually shrouded in fog. Critical mining infrastructure for the Imperial war machine." } ] },
                    { name: "MANDALA SECTOR", startAngle: 0, endAngle: 45, desc: "Outer Rim // Lothal System", sub: [ { title: "LOTHAL", image: "https://project-imperial-dawn.fandom.com/special:filepath/Lothal.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"PLAINS/SPIRES", "SECTOR":"Mandala"}, bio: "A peaceful Outer Rim world heavily industrialized by the Empire. Key manufacturing hub for TIE Defenders." } ] },
                    { name: "MYTARANOR SECTOR", startAngle: 45, endAngle: 90, desc: "Mid Rim // Wookiee Homeworlds", sub: [ { title: "KASHYYYK", image: "https://project-imperial-dawn.fandom.com/special:filepath/Kashyyyk.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"JUNGLE/WROSHYR FORESTS", "SECTOR":"Mytaranor"}, bio: "A lush, forest-covered world and home to the Wookiees. Currently under heavy Imperial blockade and resource extraction." } ] },
                    { name: "ARKANIS SECTOR", startAngle: 90, endAngle: 150, desc: "Outer Rim // Tatoo System", sub: [ { title: "TATOOINE", image: "https://project-imperial-dawn.fandom.com/special:filepath/Tatooine.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"ARID DESERT", "SECTOR":"Arkanis"}, bio: "A harsh, sun-scorched world orbiting a binary star system. A haven for smugglers and the Hutt Cartel." } ] },
                    { name: "ANOAT SECTOR", startAngle: 150, endAngle: 200, desc: "Outer Rim // Ison Corridor", sub: [ { title: "HOTH", image: "https://project-imperial-dawn.fandom.com/special:filepath/Hoth.png", status: "HELD BY THE REBEL ALLIANCE", stats: {"TERRAIN":"FROZEN TUNDRA", "SECTOR":"Anoat"}, bio: "A remote, ice-covered world. Scans indicate negligible life forms, making it an ideal hideout for terrorist cells." } ] },
                    { name: "ATRAVIS SECTOR", startAngle: 200, endAngle: 240, desc: "Outer Rim // Mustafar System", sub: [ { title: "MUSTAFAR", image: "https://project-imperial-dawn.fandom.com/special:filepath/Mustafar.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"VOLCANIC HELLSCAPE", "SECTOR":"Atravis"}, bio: "A volatile, fire-scorched world rich in minerals and dark side energy. Personal sanctum of Lord Vader." }, { title: "NUR", image: "https://project-imperial-dawn.fandom.com/special:filepath/Nur.png", status: "HELD BY THE GALACTIC EMPIRE", stats: {"TERRAIN":"OCEANIC MOON", "SECTOR":"Atravis"}, bio: "A water-rich moon housing the Fortress Inquisitorius. A secure black-site for the detention of Force-sensitives." } ] }
                ]
            }
        }
    };

    const QUICK_LINKS = [
        { label: "DISCORD", url: "https://discord.gg/imperialdawn" },
        { label: "ROBLOX GROUP", url: "https://www.roblox.com/communities/130610862/Project-Imperial-Dawn#!/about" },
        { label: "GAME LAUNCH", url: "YOUR_GAME_LINK" }
    ];

    // --- 4. MAIN INITIALIZATION ---
    function initImperialHolomap(root) {
        const style = document.createElement('style');
        style.textContent = `
            /* --- VARIABLES & BASE --- */
            :root { 
                --imp-blue: #00e5ff; 
                --imp-blue-dark: rgba(0, 229, 255, 0.1);
                --imp-red: #ff3333; 
                --imp-gold: #ffcc00; 
                --imp-dark: #050a0f; 
                --imp-glass: rgba(0, 229, 255, 0.05); 
                --imp-border: rgba(0, 229, 255, 0.3); 
                --imp-text: #cceeff; 
                --imp-err: #ff3333; 
                --imp-suc: #00ffa6; 
                --glass-bg: rgba(2, 6, 12, 0.7);
                --glass-blur: blur(12px);
            }
            
            /* Custom Scrollbars */
            #imp-ui ::-webkit-scrollbar { width: 6px; height: 6px; }
            #imp-ui ::-webkit-scrollbar-track { background: rgba(0,0,0,0.5); border-left: 1px solid rgba(0,229,255,0.1); }
            #imp-ui ::-webkit-scrollbar-thumb { background: var(--imp-border); border-radius: 3px; }
            #imp-ui ::-webkit-scrollbar-thumb:hover { background: var(--imp-blue); box-shadow: 0 0 10px var(--imp-blue); }

            #imp-ui { 
                font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                background: var(--imp-dark); 
                color: var(--imp-text); 
                max-width: 1400px; 
                min-height: 800px; 
                margin: 40px auto; 
                border: 1px solid var(--imp-border); 
                box-shadow: 0 0 80px rgba(0,0,0,0.9), 0 0 30px var(--imp-blue-dark); 
                position: relative; 
                display: flex; 
                flex-direction: column; 
                user-select: none; 
                overflow: hidden; 
                height: auto; 
            }

            .imp-bg { 
                position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                background-image: linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px); 
                background-size: 50px 50px; 
                z-index: 0; pointer-events: none; 
            }
            
            .pulse-line { 
                position: absolute; top: 0; left: 0; width: 100%; height: 200px; 
                background: linear-gradient(180deg, transparent, rgba(0, 229, 255, 0.05), transparent); 
                animation: scan 10s linear infinite; pointer-events: none; z-index: 1; 
            }
            @keyframes scan { 0% {top:-200px;} 100% {top:100%;} }
            
            .imp-header { 
                height: 180px; flex-shrink: 0; 
                border-bottom: 1px solid var(--imp-border); 
                display: flex; justify-content: center; align-items: center; flex-direction: column; 
                background: radial-gradient(circle at center top, rgba(0,40,60,0.6), rgba(0,10,15,0.95)); 
                position: relative; z-index: 5; padding-top: 20px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .main-title { 
                font-size: 46px; letter-spacing: 16px; color: #fff; text-transform: uppercase; 
                font-weight: 200; text-shadow: 0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4); 
                margin: 0; padding-bottom: 15px; 
            }
            .header-deco-box { display: flex; align-items: center; gap: 0; position: relative; }
            .deco-line { width: 150px; height: 1px; background: linear-gradient(90deg, transparent, var(--imp-blue)); opacity: 0.8; }
            .deco-line.rev { background: linear-gradient(90deg, var(--imp-blue), transparent); }
            .sub-title-box { 
                border: 1px solid var(--imp-border); padding: 8px 50px; 
                background: rgba(0, 229, 255, 0.08); font-size: 12px; letter-spacing: 10px; 
                color: var(--imp-blue); box-shadow: 0 0 20px rgba(0, 229, 255, 0.15); 
                text-transform: uppercase; position: relative; font-weight: 600;
                backdrop-filter: var(--glass-blur);
            }
            .sub-title-box::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: rgba(255,255,255,0.4); }
            .header-separator { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--imp-blue), transparent); margin-top: auto; opacity: 0.3; }

            .imp-footer { 
                flex-shrink: 0; border-top: 1px solid var(--imp-border); 
                background: rgba(0,0,0,0.8); backdrop-filter: var(--glass-blur);
                display: flex; flex-direction: column; align-items: center; justify-content: center; 
                padding: 15px 40px; font-size: 11px; font-family: 'Courier New', monospace; 
                color: rgba(0, 229, 255, 0.5); z-index: 50; position: relative; gap: 8px; 
            }
            .footer-top { width: 100%; display: flex; justify-content: space-between; align-items: center; }
            .footer-disclaimer { font-size: 9px; opacity: 0.5; text-align: center; width: 100%; }

            .imp-body { flex: 1; display: flex; position: relative; z-index: 5; align-items: stretch; min-height: 600px; }
            
            /* --- SIDEBAR --- */
            .imp-sidebar { 
                width: 280px; background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border-right: 1px solid var(--imp-border); display: flex; flex-direction: column; 
                position: relative; z-index: 10; 
            }
            .nav-header { 
                font-size: 11px; color: var(--imp-blue); padding: 25px 20px; 
                background: linear-gradient(90deg, rgba(0,229,255,0.1), transparent); 
                border-bottom: 1px solid var(--imp-border); letter-spacing: 4px; font-weight: 700; 
            }
            .nav-btn { 
                padding: 20px 25px; cursor: pointer; border-left: 4px solid transparent; 
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); font-size: 13px; font-weight: 600; 
                letter-spacing: 2px; color: #a0d0e0; border-bottom: 1px solid rgba(255,255,255,0.02); 
            }
            .nav-btn:hover { background: rgba(0, 229, 255, 0.05); color: #fff; padding-left: 30px; }
            .nav-btn.active { 
                background: linear-gradient(90deg, rgba(0,229,255,0.15), transparent); 
                color: #fff; border-left: 4px solid var(--imp-blue); 
                box-shadow: inset 20px 0 30px -15px rgba(0,229,255,0.3); text-shadow: 0 0 8px var(--imp-blue); 
            }
            
            .quick-links { margin-top: auto; border-top: 1px solid var(--imp-border); padding: 25px; }
            .ql-btn { 
                display: block; text-align: center; padding: 14px; margin-bottom: 12px; 
                border: 1px solid var(--imp-border); font-size: 12px; font-weight: 700; color: var(--imp-blue); 
                text-decoration: none; transition: 0.3s; background: rgba(0,0,0,0.6); letter-spacing: 2px; 
                clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
            }
            .ql-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 20px var(--imp-blue); }

            /* --- CONTENT AREA & TABS --- */
            .imp-content { flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.4); position: relative; }
            .imp-tabs { 
                height: 65px; flex-shrink: 0; display: flex; align-items: center; padding-left: 40px; gap: 12px; 
                border-bottom: 1px solid var(--imp-border); background: var(--glass-bg); backdrop-filter: var(--glass-blur); z-index: 20; 
            }
            .tab-btn { 
                padding: 8px 20px; border: 1px solid var(--imp-border); cursor: pointer; font-size: 11px; white-space: nowrap;
                text-transform: uppercase; color: var(--imp-text); background: rgba(0,0,0,0.6); 
                transition: all 0.3s ease; letter-spacing: 1px; font-weight: 600;
                clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
            }
            .tab-btn:hover { border-color: var(--imp-blue); color: #fff; background: rgba(0,229,255,0.1); }
            .tab-btn.active { 
                background: var(--imp-blue); color: #000; font-weight: 800; 
                box-shadow: 0 0 20px var(--imp-blue); border-color: var(--imp-blue); 
            }

            .imp-screen { flex: 1; padding: 50px; position: relative; padding-bottom: 80px; overflow-y: auto; display: flex; flex-direction: column; }

            /* --- NEWS FEED --- */
            .news-container { display: flex; flex-direction: column; gap: 40px; }
            .news-header-box { border-bottom: 2px solid var(--imp-blue); padding-bottom: 15px; margin-bottom: 10px; }
            .news-maintitle { font-size: 32px; color: #fff; font-weight: 800; letter-spacing: 6px; text-transform: uppercase; margin: 0; text-shadow: 0 0 15px rgba(0,229,255,0.6); }
            .news-card { 
                display: flex; background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid var(--imp-border); position: relative; overflow: hidden; transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); 
                clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
            }
            .news-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 229, 255, 0.2); border-color: var(--imp-blue); }
            .news-img-box { width: 35%; min-height: 220px; background: #000; position: relative; border-right: 1px solid var(--imp-border); overflow: hidden; }
            .news-img-box img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; filter: contrast(1.2) sepia(30%) hue-rotate(180deg); transition: 0.5s; }
            .news-card:hover .news-img-box img { opacity: 1; transform: scale(1.05); }
            .news-content { width: 65%; padding: 30px; display: flex; flex-direction: column; justify-content: center; }
            .news-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--imp-blue); letter-spacing: 2px; margin-bottom: 20px; border-bottom: 1px solid rgba(0, 229, 255, 0.2); padding-bottom: 10px; font-weight: bold; }
            .news-tag { background: rgba(0, 229, 255, 0.15); padding: 4px 10px; border: 1px solid var(--imp-blue); color: #fff; }
            .news-title { font-size: 26px; color: #fff; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 2px; }
            .news-text { font-size: 14px; color: #d0e8f2; line-height: 1.8; }

            /* --- RECORD LIST (Battles & Events) --- */
            .record-wrapper { display: flex; flex-direction: column; gap: 25px; }
            .record-card { 
                display: flex; background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid var(--imp-border); border-left: 4px solid var(--imp-blue); 
                transition: 0.3s; overflow: hidden; 
            }
            .record-card:hover { border-color: var(--imp-blue); box-shadow: 0 10px 30px rgba(0, 229, 255, 0.15); transform: translateX(8px); background: rgba(0, 20, 35, 0.85); }
            
            /* Themes */
            .record-card.theme-rebel { border-color: rgba(255,51,51,0.3); border-left-color: var(--imp-red); }
            .record-card.theme-rebel:hover { border-color: var(--imp-red); box-shadow: 0 10px 30px rgba(255,51,51,0.15); }
            .record-card.theme-rebel .record-meta { color: var(--imp-red); }
            .record-card.theme-rebel .record-status { color: var(--imp-red); border-color: var(--imp-red); background: rgba(255,51,51,0.1); }
            .record-card.theme-rebel .record-img-box { border-right-color: rgba(255,51,51,0.3); }

            .record-card.theme-neutral { border-color: rgba(255,255,255,0.2); border-left-color: #fff; }
            .record-card.theme-neutral:hover { border-color: #fff; box-shadow: 0 10px 30px rgba(255,255,255,0.1); }
            .record-card.theme-neutral .record-meta { color: #fff; }
            .record-card.theme-neutral .record-status { color: #000; border-color: #fff; background: rgba(255,255,255,0.9); }
            .record-card.theme-neutral .record-img-box { border-right-color: rgba(255,255,255,0.2); }

            .record-img-box { width: 280px; background: #000; border-right: 1px solid var(--imp-border); flex-shrink: 0; overflow: hidden; }
            .record-img-box img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; transition: 0.5s; }
            .record-card:hover .record-img-box img { opacity: 1; transform: scale(1.05); }
            .record-content { padding: 30px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .record-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
            .record-title { font-size: 22px; color: #fff; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
            .record-meta { font-size: 11px; color: var(--imp-blue); font-family: monospace; letter-spacing: 2px; display: flex; gap: 20px; margin-top: 8px; font-weight: bold; }
            .record-status { font-size: 11px; padding: 6px 14px; background: rgba(0,229,255,0.1); border: 1px solid var(--imp-blue); color: var(--imp-blue); font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
            .record-desc { font-size: 14px; color: #b0d0e0; line-height: 1.7; }

            /* --- TACTICAL CARDS --- */
            .tac-grid { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 20px; }
            .tac-card { 
                display: flex; justify-content: space-between; align-items: center; 
                border: 1px solid var(--imp-border); padding: 30px; 
                background: linear-gradient(90deg, rgba(0,20,35,0.7), rgba(0,5,10,0.8)); backdrop-filter: var(--glass-blur);
                transition: 0.3s; position: relative; overflow: hidden; 
            }
            .tac-card::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 5px; background: var(--imp-blue); transition: 0.3s; }
            .tac-card:hover { transform: translateX(8px); background: linear-gradient(90deg, rgba(0,229,255,0.15), rgba(0,5,10,0.8)); box-shadow: 0 0 30px rgba(0,229,255,0.15); }
            
            .tac-card.align-rebel { border-color: var(--imp-red); }
            .tac-card.align-rebel::before { background: var(--imp-red); }
            .tac-card.align-rebel:hover { background: linear-gradient(90deg, rgba(255,51,51,0.15), rgba(0,5,10,0.8)); box-shadow: 0 0 30px rgba(255,51,51,0.15); }
            .tac-card.align-rebel .tac-status { color: var(--imp-red); border-color: var(--imp-red); }
            
            .tac-info { flex: 1; padding-left: 15px; }
            .tac-title { font-size: 20px; color: #fff; font-weight: 800; letter-spacing: 2px; margin-bottom: 8px; text-transform: uppercase; }
            .tac-loc { font-size: 11px; color: #888; margin-bottom: 12px; font-family: monospace; letter-spacing: 3px; font-weight: bold; }
            .tac-desc { font-size: 14px; opacity: 0.9; line-height: 1.6; max-width: 85%; color: #cceeff; }
            .tac-status { border: 1px solid var(--imp-blue); color: var(--imp-blue); padding: 10px 25px; font-size: 11px; font-weight: bold; letter-spacing: 2px; min-width: 140px; text-align: center; background: rgba(0,0,0,0.5); text-transform: uppercase; }

            /* --- PERMADEATH DOC --- */
            .pd-layout { background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid var(--imp-blue); position: relative; padding: 0; box-shadow: 0 15px 50px rgba(0,0,0,0.6); }
            .pd-content { padding: 50px; }
            .pd-title { font-size: 42px; color: #fff; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; margin: 0; line-height: 1.1; text-shadow: 0 0 20px rgba(0,229,255,0.5); }
            .pd-subtitle { font-size: 14px; color: var(--imp-blue); letter-spacing: 5px; margin-top: 10px; margin-bottom: 40px; text-transform: uppercase; font-weight: bold; }
            .pd-section { margin-bottom: 40px; border-left: 2px solid rgba(0, 229, 255, 0.3); padding-left: 25px; position: relative; }
            .pd-section::before { content: ''; position: absolute; left: -4px; top: 0; width: 6px; height: 18px; background: var(--imp-blue); }
            .pd-sec-header { color: #fff; font-size: 20px; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 2px; }
            .pd-text { color: #b0e0ff; font-size: 15px; line-height: 1.8; opacity: 0.95; }
            .pd-text strong { color: #fff; font-weight: 700; text-shadow: 0 0 5px rgba(255,255,255,0.3); }

            /* --- ARMORY GRID --- */
            .armory-section { margin-bottom: 60px; }
            .armory-header { font-size: 16px; font-weight: 800; letter-spacing: 5px; color: #fff; border-bottom: 2px solid var(--imp-blue); padding-bottom: 10px; margin-bottom: 25px; text-transform: uppercase; text-shadow: 0 0 15px rgba(0,229,255,0.5); }
            .rebel-theme .armory-header { border-color: var(--imp-red); text-shadow: 0 0 15px rgba(255,51,51,0.5); }
            .neutral-theme .armory-header { border-color: #ffffff; text-shadow: 0 0 15px rgba(255,255,255,0.5); }
            .ac-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 30px; }
            .ac-card { 
                display: flex; flex-direction: column; background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid rgba(0, 229, 255, 0.3); position: relative; overflow: hidden; transition: 0.3s; 
                clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
            }
            .ac-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0, 229, 255, 0.2); border-color: var(--imp-blue); }
            .rebel-theme .ac-card { border-color: rgba(255, 51, 51, 0.3); }
            .rebel-theme .ac-card:hover { border-color: var(--imp-red); box-shadow: 0 15px 30px rgba(255, 51, 51, 0.2); }
            .neutral-theme .ac-card { border-color: rgba(255, 255, 255, 0.2); }
            .neutral-theme .ac-card:hover { border-color: #ffffff; box-shadow: 0 15px 30px rgba(255, 255, 255, 0.15); }
            
            .ac-top { padding: 15px 20px; background: linear-gradient(90deg, rgba(0,229,255,0.15), transparent); border-bottom: 1px solid rgba(0,229,255,0.2); display: flex; justify-content: space-between; align-items: center; }
            .rebel-theme .ac-top { background: linear-gradient(90deg, rgba(255,51,51,0.15), transparent); border-bottom-color: rgba(255,51,51,0.2); }
            .neutral-theme .ac-top { background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent); border-bottom-color: rgba(255,255,255,0.2); }
            
            .ac-title { font-size: 15px; font-weight: 900; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; }
            .ac-class { font-size: 10px; color: var(--imp-blue); text-transform: uppercase; letter-spacing: 2px; font-weight: bold; }
            .rebel-theme .ac-class { color: var(--imp-red); }
            .neutral-theme .ac-class { color: #ffffff; }
            
            .ac-img-box { width: 100%; height: 160px; background: #000; position: relative; border-bottom: 1px solid rgba(255,255,255,0.05); overflow: hidden; }
            .ac-img-box img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: 0.5s; }
            .ac-card:hover .ac-img-box img { opacity: 1; filter: contrast(1.1); transform: scale(1.05); }
            
            .ac-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
            .ac-bio { font-size: 13px; color: #b0d0e0; line-height: 1.6; margin-bottom: 20px; }
            .ac-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto; }
            .ac-stat { background: rgba(255,255,255,0.05); padding: 8px 10px; font-size: 11px; color: #fff; font-family: monospace; border-left: 2px solid var(--imp-blue); }
            .rebel-theme .ac-stat { border-left-color: var(--imp-red); }
            .neutral-theme .ac-stat { border-left-color: #ffffff; }
            .ac-stat span { color: #888; display: block; font-size: 9px; text-transform: uppercase; margin-bottom: 4px; font-weight: bold; letter-spacing: 1px; }

            /* --- CHARACTER CARDS --- */
            .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px; }
            .data-card { 
                border: 1px solid var(--imp-border); background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                transition: 0.3s; position: relative; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; 
            }
            .data-card:hover { transform: translateY(-8px); border-color: var(--imp-blue); box-shadow: 0 15px 35px rgba(0,229,255,0.2); }
            .card-img-box { width: 100%; aspect-ratio: 1 / 1; height: auto; background: #000; position: relative; overflow: hidden; border-bottom: 1px solid var(--imp-border); flex-shrink: 0; }
            .card-img-box img { width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0.6; filter: grayscale(80%) sepia(20%) hue-rotate(180deg); transition: 0.5s; }
            .data-card:hover .card-img-box img { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }
            .card-img-box::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,229,255,0.1) 50%); background-size: 100% 4px; pointer-events: none; }
            .status-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 800; background: rgba(0,0,0,0.85); border: 1px solid var(--imp-blue); padding: 5px 10px; color: var(--imp-blue); z-index: 10; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(4px); box-shadow: 0 0 10px rgba(0,0,0,0.5); }
            .card-content { flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
            .card-title { font-weight: 900; color: #fff; font-size: 18px; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .card-sub { font-size: 11px; color: var(--imp-blue); text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; font-weight: 600; letter-spacing: 1px; }
            .card-stats { display: flex; flex-wrap: wrap; gap: 6px; overflow: hidden; }
            .c-stat { font-size: 10px; background: rgba(255,255,255,0.05); padding: 4px 8px; color: #cceeff; border: 1px solid rgba(255,255,255,0.1); white-space: nowrap; font-family: monospace; transition: 0.2s; }
            .data-card:hover .c-stat { border-color: rgba(0,229,255,0.4); color: #fff; background: rgba(0,229,255,0.1); }

            /* --- TIMELINE --- */
            .timeline-box { position: relative; padding: 20px 0; border-left: 2px solid rgba(0, 229, 255, 0.3); margin-left: 30px; }
            .t-item { position: relative; padding-left: 40px; margin-bottom: 40px; opacity: 0; animation: slide-in 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
            .t-node { position: absolute; left: -7px; top: 0; width: 12px; height: 12px; background: #000; border: 2px solid var(--imp-blue); border-radius: 50%; box-shadow: 0 0 15px var(--imp-blue); transition: 0.3s; }
            .t-item:hover .t-node { background: var(--imp-blue); box-shadow: 0 0 25px var(--imp-blue); transform: scale(1.4); }
            .t-card { background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid rgba(0,229,255,0.2); padding: 25px; position: relative; transition: 0.3s; }
            .t-card:hover { border-color: var(--imp-blue); background: linear-gradient(90deg, rgba(0,229,255,0.15), rgba(0,10,20,0.8)); transform: translateX(10px); box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
            .t-date { font-size: 28px; font-weight: 900; color: var(--imp-blue); margin-bottom: 8px; letter-spacing: 3px; text-shadow: 0 0 15px rgba(0,229,255,0.4); }
            .t-title { font-size: 18px; color: #fff; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px; }
            .t-tag { display: inline-block; font-size: 10px; padding: 4px 10px; border: 1px solid var(--imp-blue); color: var(--imp-blue); letter-spacing: 2px; background: rgba(0,229,255,0.1); font-weight: bold; }

            /* --- FACTIONS --- */
            .fac-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 30px; margin-top: 20px; }
            .faction-card { 
                display: flex; background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid var(--imp-border); transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; overflow: hidden; cursor: pointer; min-height: 200px; 
            }
            .faction-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0,0,0,0.7); }
            .faction-card.empire { border-left: 5px solid var(--imp-blue); }
            .faction-card.rebel { border-left: 5px solid var(--imp-red); }
            
            .fac-logo-box { width: 160px; background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%); border-right: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; }
            .fac-logo-box img { width: 85%; height: 85%; object-fit: contain; opacity: 0.7; filter: saturate(0) brightness(1.2); transition: 0.4s; }
            .faction-card:hover .fac-logo-box img { opacity: 1; filter: none; transform: scale(1.1); }
            
            .fac-info-area { flex: 1; padding: 30px; display: flex; flex-direction: column; justify-content: center; }
            .fac-name { font-size: 24px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 2px; }
            .fac-role { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px; font-weight: bold; }
            .faction-card.empire .fac-role { color: var(--imp-blue); }
            .faction-card.rebel .fac-role { color: var(--imp-red); }
            
            .fac-stats-row { display: flex; gap: 20px; font-size: 12px; color: #cceeff; margin-bottom: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; font-family: monospace; }
            .fac-stat span { color: #fff; font-weight: bold; letter-spacing: 1px; }
            .fac-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
            .f-tag { font-size: 10px; padding: 4px 10px; border: 1px solid rgba(255,255,255,0.2); color: #aaa; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
            .faction-card.empire .f-tag { background: rgba(0,229,255,0.1); border-color: rgba(0,229,255,0.3); color: var(--imp-blue); }
            .faction-card.rebel .f-tag { background: rgba(255,51,51,0.1); border-color: rgba(255,51,51,0.3); color: var(--imp-red); }

            /* --- DOSSIER & POPUPS --- */
            .dossier-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,5,10,0.85); backdrop-filter: blur(15px); z-index: 2000; display: flex; justify-content: center; align-items: center; animation: fade-in 0.3s ease-out; padding: 20px; box-sizing: border-box; }
            
            .dossier-box { width: 850px; max-width: 90vw; height: auto; max-height: 85vh; background: var(--glass-bg); border: 1px solid var(--imp-blue); display: flex; box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 50px rgba(0,229,255,0.2); position: relative; animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            @keyframes scale-up { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

            .dossier-box.armory-popup { width: 750px; flex-direction: column; border-top: 4px solid var(--imp-blue); }
            .dossier-box.armory-popup.rebel-theme { border-top-color: var(--imp-red); box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 50px rgba(255,51,51,0.2); border-color: var(--imp-red); }
            .dossier-box.armory-popup.neutral-theme { border-top-color: #ffffff; box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 50px rgba(255,255,255,0.1); border-color: #ffffff; }
            
            .armory-popup .ap-header { display: flex; justify-content: space-between; align-items: center; padding: 25px 35px; border-bottom: 1px solid rgba(255,255,255,0.1); background: linear-gradient(90deg, rgba(0,229,255,0.1), transparent); }
            .armory-popup.rebel-theme .ap-header { background: linear-gradient(90deg, rgba(255,51,51,0.1), transparent); }
            .armory-popup.neutral-theme .ap-header { background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent); }
            
            .ap-title { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
            .ap-subtitle { font-size: 11px; color: var(--imp-blue); letter-spacing: 3px; text-transform: uppercase; margin: 0; margin-top: 4px; font-weight: bold; }
            .rebel-theme .ap-subtitle { color: var(--imp-red); }
            .neutral-theme .ap-subtitle { color: #ffffff; }
            
            .ap-body { display: flex; flex: 1; overflow: hidden; }
            .ap-img-container { width: 300px; position: relative; background: #000; border-right: 1px solid rgba(255,255,255,0.1); }
            .ap-img-container img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
            .ap-content { flex: 1; padding: 35px; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }
            .ap-desc { font-size: 14px; color: #d0e8f2; line-height: 1.7; margin-bottom: 35px; border-left: 3px solid var(--imp-blue); padding-left: 20px; }
            .rebel-theme .ap-desc { border-left-color: var(--imp-red); }
            .neutral-theme .ap-desc { border-left-color: #ffffff; }
            .ap-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .ap-stat { background: rgba(255,255,255,0.05); padding: 12px; font-family: monospace; font-size: 12px; color: #fff; border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; justify-content: center; }
            .ap-stat label { color: #888; display: block; font-size: 10px; margin-bottom: 6px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
            
            .dossier-close { position: absolute; top: 20px; right: 25px; color: #fff; font-size: 24px; cursor: pointer; opacity: 0.6; transition: 0.3s; z-index: 50; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); }
            .dossier-close:hover { opacity: 1; color: var(--imp-dark); background: var(--imp-blue); box-shadow: 0 0 15px var(--imp-blue); }
            .rebel-theme .dossier-close:hover { background: var(--imp-red); color: #fff; box-shadow: 0 0 15px var(--imp-red); }
            .neutral-theme .dossier-close:hover { background: #ffffff; color: #000; box-shadow: 0 0 15px #ffffff; }
            
            .dossier-img { width: 320px; border-right: 1px solid var(--imp-border); position: relative; overflow: hidden; background: #000; }
            .dossier-img img { width: 100%; height: 100%; object-fit: contain; filter: none; }
            .dossier-data { flex: 1; padding: 40px; overflow-y: auto; }
            .dossier-data::-webkit-scrollbar { width: 4px; }
            .dossier-data::-webkit-scrollbar-thumb { background: var(--imp-blue); }
            
            .dossier-header { border-bottom: 1px solid var(--imp-blue); margin-bottom: 25px; padding-bottom: 15px; }
            .dossier-name { font-size: 28px; color: #fff; font-weight: 900; text-transform: uppercase; margin: 0; letter-spacing: 2px; }
            .dossier-rank { font-size: 13px; color: var(--imp-blue); letter-spacing: 4px; margin-top: 8px; font-weight: bold; }
            
            .dossier-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 25px; background: rgba(0,229,255,0.08); padding: 20px; font-size: 13px; border: 1px solid rgba(0,229,255,0.2); }
            .stat-row { color: #888; font-family: monospace; }
            .stat-row span:last-child { color: #fff; font-weight: bold; margin-left: 8px; font-family: system-ui, sans-serif; }
            
            .dossier-bio { line-height: 1.8; color: #cceeff; font-size: 14px; }
            
            .dossier-divisions-title { color: var(--imp-blue); font-size: 12px; font-weight: bold; letter-spacing: 3px; margin-top: 25px; margin-bottom: 12px; border-bottom: 1px dashed rgba(0,229,255,0.4); padding-bottom: 8px; }
            .dossier-divisions-list { display: flex; flex-wrap: wrap; gap: 10px; }
            .division-tag { font-size: 11px; background: rgba(0,229,255,0.15); border: 1px solid var(--imp-blue); padding: 6px 12px; color: #fff; letter-spacing: 1px; cursor: pointer; transition: 0.3s; font-weight: bold; }
            .division-tag:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 15px var(--imp-blue); }
            
            .dossier-box.hostile { border-color: var(--imp-red); box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 50px rgba(255,51,51,0.2); }
            .dossier-box.hostile .dossier-close:hover { background: var(--imp-red); color: #fff; box-shadow: 0 0 15px var(--imp-red); }
            .dossier-box.hostile .dossier-header { border-bottom-color: var(--imp-red); }
            .dossier-box.hostile .dossier-rank { color: var(--imp-red); }
            .dossier-box.hostile .dossier-stats-grid { background: rgba(255,51,51,0.08); border-color: rgba(255,51,51,0.2); }
            .dossier-box.hostile .stat-row span:last-child { color: #fff; }
            
            .dossier-box.no-img { width: 650px; }
            .dossier-box.no-img .dossier-img { display: none; }
            .dossier-box.no-img .dossier-data { width: 100%; border-left: none; }

            /* --- BRIEFING BOX --- */
            .briefing-box { width: 950px; max-width: 90vw; height: auto; max-height: 85vh; min-height: 400px; background: var(--glass-bg); border: 1px solid var(--imp-blue); display: flex; flex-direction: column; box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 60px rgba(0,229,255,0.2); position: relative; animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .briefing-box.rebel { border-color: var(--imp-red); box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 60px rgba(255,51,51,0.2); }
            
            .brief-header { padding: 35px 40px; border-bottom: 2px solid var(--imp-blue); background: linear-gradient(90deg, rgba(0,229,255,0.15), transparent); }
            .briefing-box.rebel .brief-header { border-bottom-color: var(--imp-red); background: linear-gradient(90deg, rgba(255,51,51,0.15), transparent); }
            
            .brief-title { font-size: 40px; font-weight: 900; color: #fff; letter-spacing: 6px; text-transform: uppercase; margin: 0; text-shadow: 0 0 15px rgba(255,255,255,0.3); }
            .brief-subtitle { font-size: 13px; color: var(--imp-blue); letter-spacing: 4px; font-weight: bold; margin-top: 8px; }
            .briefing-box.rebel .brief-subtitle { color: var(--imp-red); }
            
            .brief-main { display: flex; flex: 1; overflow: hidden; }
            .brief-left { width: 35%; min-width: 200px; max-width: 340px; border-right: 1px solid rgba(255,255,255,0.1); padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.4); }
            .brief-logo { width: 100%; max-width: 220px; aspect-ratio: 1/1; object-fit: contain; filter: drop-shadow(0 0 20px rgba(0,229,255,0.4)); }
            .briefing-box.rebel .brief-logo { filter: drop-shadow(0 0 20px rgba(255,51,51,0.4)); }
            
            .brief-right { flex: 1; padding: 30px 40px; position: relative; overflow-y: auto; }
            .brief-right::-webkit-scrollbar { width: 4px; }
            .brief-right::-webkit-scrollbar-thumb { background: var(--imp-blue); }
            .briefing-box.rebel .brief-right::-webkit-scrollbar-thumb { background: var(--imp-red); }
            
            .brief-section-title { font-size: 12px; color: var(--imp-blue); font-weight: 800; letter-spacing: 3px; border-bottom: 1px solid rgba(0,229,255,0.3); padding-bottom: 8px; margin-bottom: 20px; text-transform: uppercase; }
            .briefing-box.rebel .brief-section-title { color: var(--imp-red); border-bottom-color: rgba(255,51,51,0.3); }
            
            .brief-bio { font-size: 15px; line-height: 1.8; color: #d0e8f2; margin-bottom: 35px; }
            .brief-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 35px; }
            .b-stat { background: rgba(255,255,255,0.05); padding: 18px; border-left: 4px solid var(--imp-blue); }
            .briefing-box.rebel .b-stat { border-left-color: var(--imp-red); }
            .b-stat-lab { font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 6px; font-weight: bold; letter-spacing: 1px; }
            .b-stat-val { font-size: 15px; color: #fff; font-weight: 800; }
            
            .division-btn { display: inline-block; padding: 10px 18px; margin: 0 10px 10px 0; border: 1px solid var(--imp-blue); font-size: 12px; font-weight: bold; color: #fff; cursor: pointer; transition: 0.3s; background: rgba(0,229,255,0.1); letter-spacing: 1px; }
            .division-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 15px var(--imp-blue); }
            .briefing-box.rebel .division-btn { border-color: var(--imp-red); background: rgba(255,51,51,0.1); }
            .briefing-box.rebel .division-btn:hover { background: var(--imp-red); color: #fff; box-shadow: 0 0 15px var(--imp-red); }

            /* --- WELCOME HERO --- */
            .welcome-hero { width: 100%; height: 350px; overflow: hidden; border: 1px solid var(--imp-border); margin-bottom: 35px; position: relative; box-shadow: 0 15px 40px rgba(0,0,0,0.5); }
            .welcome-hero img { width: 100%; height: 100%; object-fit: cover; filter: none; transition: 1s ease-out; }
            .welcome-hero:hover img { transform: scale(1.03); }
            .welcome-overlay { position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px; background: linear-gradient(0deg, rgba(0,0,0,0.9), transparent); color: #fff; font-size: 38px; font-weight: 300; letter-spacing: 6px; text-shadow: 0 0 20px var(--imp-blue); }
            
            .briefing-meta-bar { display: flex; justify-content: space-between; border-bottom: 1px solid var(--imp-blue); padding-bottom: 12px; margin-bottom: 25px; font-size: 11px; color: var(--imp-blue); letter-spacing: 3px; font-weight: bold; }
            
            .text-block { 
                line-height: 1.8; white-space: pre-wrap; font-size: 15px; 
                border-left: 3px solid var(--imp-blue); padding: 25px; 
                background: rgba(0, 229, 255, 0.08); margin-top: 25px; color: #cceeff; 
                font-family: 'Courier New', monospace; min-height: 160px; position: relative; 
                box-shadow: inset 0 0 20px rgba(0,229,255,0.05); backdrop-filter: var(--glass-blur);
            }
            .text-block::after { content: '_'; animation: blink 1s infinite; font-weight: bold; color: var(--imp-blue); font-size: 16px; }
            @keyframes blink { 0%, 100% {opacity: 1;} 50% {opacity: 0;} }

            /* --- FORM --- */
            .imp-form { 
                background: var(--glass-bg); backdrop-filter: var(--glass-blur);
                border: 1px solid var(--imp-border); padding: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 25px; position: relative; margin-bottom: 35px; 
                box-shadow: 0 15px 40px rgba(0,0,0,0.5);
            }
            .form-full { grid-column: span 2; }
            .form-group { display: flex; flex-direction: column; gap: 8px; }
            .form-label { font-size: 12px; color: var(--imp-blue); font-weight: 800; letter-spacing: 2px; }
            .imp-input, .imp-textarea { 
                background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2); padding: 15px; color: #fff; 
                font-family: monospace; font-size: 14px; transition: 0.3s; width: 100%; box-sizing: border-box; 
            }
            .imp-input:focus, .imp-textarea:focus { border-color: var(--imp-blue); outline: none; box-shadow: 0 0 15px rgba(0,229,255,0.3); background: rgba(0,229,255,0.05); }
            .imp-textarea { height: 120px; resize: vertical; }
            
            .submit-btn { 
                grid-column: span 2; padding: 18px; background: rgba(0,229,255,0.15); border: 1px solid var(--imp-blue); 
                color: var(--imp-blue); font-weight: 900; text-transform: uppercase; letter-spacing: 3px; cursor: pointer; transition: 0.3s; margin-top: 15px; text-align: center; font-size: 14px; 
                clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
            }
            .submit-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 25px var(--imp-blue); }
            
            .code-result-area { grid-column: span 2; margin-top: 25px; border-top: 1px dashed var(--imp-border); padding-top: 25px; display: none; }
            .code-result-area.active { display: block; animation: fade-in 0.6s ease-out; }
            .code-box { background: #000; border: 1px solid var(--imp-border); padding: 20px; font-family: monospace; font-size: 12px; color: #0f0; white-space: pre-wrap; word-break: break-all; height: 120px; overflow-y: auto; margin-bottom: 15px; user-select: all; box-shadow: inset 0 0 10px rgba(0,255,0,0.2); }
            .status-msg { font-size: 12px; text-align: center; margin-bottom: 12px; font-weight: bold; color: var(--imp-suc); letter-spacing: 1px; }

            /* --- PREMIUM HOLOMAP v6.1 --- */
            .holomap-wrapper { position: relative; width: 100%; flex: 1; min-height: 800px; overflow: hidden; background: radial-gradient(circle at center, #00101c 0%, #000000 100%); display: flex; align-items: center; justify-content: center; perspective: 1200px; z-index: 1; border-top: 1px solid var(--imp-border); box-shadow: inset 0 0 150px rgba(0,229,255,0.05); }
            .holo-projector-beam { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 800px; height: 50%; background: linear-gradient(to top, rgba(0,229,255,0.08) 0%, transparent 100%); clip-path: polygon(30% 100%, 70% 100%, 100% 0, 0 0); pointer-events: none; z-index: 0; }
            .holo-stage { position: relative; width: 800px; height: 800px; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); z-index: 2; }
            
            /* Organic Sectors & Galaxy Core */
            .holo-base { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(0,229,255,0.3); background: conic-gradient(from 0deg at 50% 50%, rgba(0,229,255,0) 0%, rgba(0,229,255,0.05) 15%, rgba(0,229,255,0) 30%, rgba(0,229,255,0) 45%, rgba(0,229,255,0.05) 60%, rgba(0,229,255,0) 75%), radial-gradient(circle at center, rgba(0,20,40,0.8) 0%, rgba(0,5,15,0.95) 60%, rgba(0,0,0,1) 100%); box-shadow: inset 0 0 80px rgba(0,229,255,0.2), 0 0 40px rgba(0,229,255,0.2); z-index: 1; transform-style: preserve-3d; }
            .holo-grid-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(0, 229, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.15) 1px, transparent 1px); background-size: 40px 40px; border-radius: 50%; pointer-events: none; mask-image: radial-gradient(circle, black 0%, transparent 70%); -webkit-mask-image: radial-gradient(circle, black 0%, transparent 70%); }
            
            /* Realistic Core */
            .holo-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, #ffffff 0%, rgba(0,229,255,0.8) 15%, rgba(0,229,255,0.2) 50%, transparent 100%); z-index: 2; pointer-events: none; }
            
            .holo-ring-1 { position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; border-radius: 50%; border: 1px dashed rgba(0,229,255,0.4); animation: spin 60s linear infinite; pointer-events: none; }
            .holo-ring-2 { position: absolute; top: -10%; left: -10%; width: 120%; height: 120%; border-radius: 50%; border: 2px solid rgba(0,229,255,0.05); border-top-color: var(--imp-blue); border-bottom-color: var(--imp-blue); animation: spin 40s linear infinite reverse; pointer-events: none; }
            
            /* New Orbital Rings */
            .holo-orbit { position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; border-radius: 50%; border: 1px solid rgba(0, 229, 255, 0.15); transform-style: preserve-3d; animation: orbit-spin 120s linear infinite; pointer-events: none; z-index: 10;}
            .holo-orbit::before { content: ''; position: absolute; top: 0; left: 50%; width: 6px; height: 6px; background: var(--imp-blue); border-radius: 50%; box-shadow: 0 0 15px var(--imp-blue), 0 0 30px #fff; transform: translate(-50%, -50%); }
            @keyframes orbit-spin { 100% { transform: rotateZ(360deg); } }
            @keyframes spin { 100% { transform: rotate(360deg); } }

            .holo-scanner { position: absolute; top: 50%; left: 50%; width: 50%; height: 2px; background: linear-gradient(90deg, transparent, rgba(0,229,255,0.8), #fff); transform-origin: left center; animation: scanner 8s infinite linear; pointer-events: none; box-shadow: 0 0 15px var(--imp-blue); z-index: 5; }
            @keyframes scanner { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }

            /* Volumetric Holographic Depth */
            .holo-svg-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
            .layer-bottom { transform: translateZ(3px); filter: blur(6px); opacity: 0.4; }
            .layer-mid { transform: translateZ(8px); filter: blur(3px); opacity: 0.6; }
            .layer-top { transform: translateZ(12px); pointer-events: visiblePainted; z-index: 10; filter: drop-shadow(0 0 5px rgba(0,229,255,0.5)); }

            .sector-poly { fill: rgba(0, 229, 255, 0.05); stroke: rgba(0, 229, 255, 0.4); stroke-width: 1px; stroke-linejoin: round; transition: all 0.3s ease-out; cursor: pointer; pointer-events: all; vector-effect: non-scaling-stroke; }
            /* FIXED: Removed drop-shadow to fix the visual artifact on hover */
            .sector-poly.hovered { fill: rgba(0, 229, 255, 0.35); stroke: rgba(0, 229, 255, 1); stroke-width: 2px; }
            
            .sector-poly.rebel-held { fill: rgba(255, 51, 51, 0.05); stroke: rgba(255, 51, 51, 0.4); }
            /* FIXED: Removed drop-shadow to fix the visual artifact on hover */
            .sector-poly.rebel-held.hovered { fill: rgba(255, 51, 51, 0.35); stroke: rgba(255, 51, 51, 1); stroke-width: 2px; }

            .sector-poly.neutral-sector { fill: rgba(255, 255, 255, 0.05); stroke: rgba(255, 255, 255, 0.4); }
            /* FIXED: Removed drop-shadow to fix the visual artifact on hover */
            .sector-poly.neutral-sector.hovered { fill: rgba(255, 255, 255, 0.25); stroke: rgba(255, 255, 255, 1); stroke-width: 2px; }

            /* --- STARFIGHTERS COMBAT REWORK CSS --- */
            .dynamic-ship { position: absolute; left: 0; top: 0; width: 24px; height: 24px; margin-left: -12px; margin-top: -12px; transform-style: preserve-3d; z-index: 25; pointer-events: none; will-change: transform; }
            .dynamic-ship .ship-icon { width: 100%; height: 100%; object-fit: contain; filter: brightness(0) invert(1); transform: rotateZ(0deg); }
            .dynamic-ship.rebel-ship .ship-icon { animation: engine-throb-reb 0.15s infinite alternate; }
            .dynamic-ship.empire-ship .ship-icon { animation: engine-throb-imp 0.15s infinite alternate; }
            
            @keyframes engine-throb-imp { from { filter: brightness(0) invert(1) drop-shadow(0 0 3px var(--imp-blue)); } to { filter: brightness(0) invert(1) drop-shadow(0 0 10px var(--imp-blue)); } }
            @keyframes engine-throb-reb { from { filter: brightness(0) invert(1) drop-shadow(0 0 3px var(--imp-red)); } to { filter: brightness(0) invert(1) drop-shadow(0 0 10px var(--imp-red)); } }
            
            .laser-blast { position: absolute; left: 0; top: 0; width: 16px; height: 3px; border-radius: 3px; z-index: 24; pointer-events: none; margin-left:-8px; margin-top:-1.5px; transform-style: preserve-3d; will-change: transform; }
            .laser-blast.imp { background: #00ffa6; box-shadow: 0 0 10px #00ffa6, 0 0 3px #fff; }
            .laser-blast.reb { background: #ff3333; box-shadow: 0 0 10px #ff3333, 0 0 3px #fff; }
            
            .fx-explosion { width: 35px; height: 35px; background: radial-gradient(circle, #fff 10%, #ff8800 40%, transparent 80%); border-radius: 50%; animation: popFx 0.4s ease-out forwards; pointer-events: none; mix-blend-mode: screen; margin-left:-17.5px; margin-top:-17.5px; }
            @keyframes popFx { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }

            /* Clean Sci-Fi HUD Pins */
            .holo-pin { position: absolute; width: 0; height: 0; z-index: 30; pointer-events: none; transform-style: preserve-3d; }
            .pin-wrapper { position: absolute; bottom: 0; left: -100px; width: 200px; transform-style: preserve-3d; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; transform-origin: bottom center; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none; }
            
            .pin-label { background: rgba(0, 15, 30, 0.85); border: 1px solid rgba(0, 229, 255, 0.8); color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 2px; padding: 6px 16px; margin-bottom: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.9), 0 0 12px rgba(0,229,255,0.5); white-space: nowrap; text-transform: uppercase; border-radius: 4px; backdrop-filter: blur(6px); text-shadow: 0 0 6px rgba(255,255,255,0.6); }
            .pin-stem { width: 2px; height: 40px; background: linear-gradient(to top, rgba(0,229,255,0.9), transparent); }
            
            .holo-pin.rebel .pin-label { border-color: rgba(255, 51, 51, 0.8); color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.9), 0 0 12px rgba(255,51,51,0.5); }
            .holo-pin.rebel .pin-stem { background: linear-gradient(to top, rgba(255,51,51,0.9), transparent); }

            .holo-pin.neutral .pin-label { border-color: rgba(255, 255, 255, 0.6); color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.9), 0 0 12px rgba(255,255,255,0.4); }
            .holo-pin.neutral .pin-stem { background: linear-gradient(to top, rgba(255,255,255,0.7), transparent); }

            @keyframes text-flicker { 0%, 100% { opacity: 1; text-shadow: none; } 50% { opacity: 0.6; text-shadow: 0 0 10px rgba(255,51,51,0.8); } 52% { opacity: 1; } 54% { opacity: 0.4; } 56% { opacity: 1; } }
            .holo-pin.rebel .pin-label { animation: text-flicker 4s infinite; }

            .star-field { position: absolute; top: -500px; left: -500px; width: 2000px; height: 2000px; pointer-events: none; transform-style: preserve-3d; z-index: 0; }
            .h-star { position: absolute; background: #fff; width: 2px; height: 2px; opacity: 0.6; border-radius: 50%; box-shadow: 0 0 4px #fff; }

            .map-controls-panel { position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; z-index: 600; background: rgba(0,10,20,0.8); padding: 12px 25px; border: 1px solid rgba(0,229,255,0.4); border-radius: 6px; box-shadow: 0 15px 40px rgba(0,0,0,0.9), inset 0 0 25px rgba(0,229,255,0.15); backdrop-filter: blur(12px); }
            .mc-group { display: flex; gap: 12px; align-items: center; }
            .mc-divider { width: 1px; height: 35px; background: rgba(0,229,255,0.3); }
            .z-btn { width: 55px; height: 40px; background: rgba(0,0,0,0.7); border: 1px solid rgba(0,229,255,0.6); color: var(--imp-blue); display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: 900; font-size: 18px; transition: all 0.2s; clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%); text-shadow: 0 0 8px var(--imp-blue); }
            .z-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 25px var(--imp-blue); transform: scale(1.08); text-shadow: none; }
            .z-btn:active { transform: scale(0.95); }

            .holo-sidebar { position: absolute; right: -340px; top: 0; width: 340px; height: 100%; background: rgba(2, 6, 12, 0.9); backdrop-filter: blur(20px); border-left: 2px solid var(--imp-border); transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1); z-index: 500; display: flex; flex-direction: column; box-shadow: -15px 0 50px rgba(0,0,0,0.9); }
            .holo-sidebar.active { right: 0; }
            .hs-header { padding: 30px 25px; border-bottom: 1px solid var(--imp-border); background: linear-gradient(90deg, rgba(0, 229, 255, 0.2), transparent); }
            .hs-title { font-size: 22px; font-weight: 900; color: #fff; margin: 0; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 15px rgba(0,229,255,0.8); }
            .hs-close { position: absolute; top: 20px; right: 20px; color: var(--imp-blue); cursor: pointer; font-size: 28px; transition: 0.3s; opacity: 0.7; }
            .hs-close:hover { opacity: 1; transform: rotate(90deg) scale(1.2); text-shadow: 0 0 15px var(--imp-blue); }
            .hs-body { flex: 1; overflow-y: auto; padding: 25px; }
            .hs-body::-webkit-scrollbar { width: 4px; }
            .hs-body::-webkit-scrollbar-thumb { background: var(--imp-blue); }
            
            .hs-card { display: flex; gap: 15px; margin-bottom: 18px; background: linear-gradient(90deg, rgba(0, 229, 255, 0.1), rgba(255,255,255,0.02)); padding: 15px; border: 1px solid rgba(0, 229, 255, 0.3); border-left: 5px solid var(--imp-blue); cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
            .hs-card.hostile-rebel { background: linear-gradient(90deg, rgba(255, 51, 51, 0.15), rgba(30, 0, 0, 0.6)); border: 1px solid rgba(255, 51, 51, 0.5); border-left: 5px solid var(--imp-red); }
            .hs-card.hostile-rebel .hs-name { color: #ffcccc; }
            .hs-card.hostile-rebel .hs-meta { color: var(--imp-red); opacity: 1; }
            .hs-card.hostile-rebel:hover { border-color: var(--imp-red); background: rgba(255, 51, 51, 0.25); box-shadow: 0 0 20px rgba(255, 51, 51, 0.4); transform: translateX(5px); }
            .hs-card:hover:not(.hostile-rebel) { border-color: var(--imp-blue); background: rgba(0, 229, 255, 0.2); box-shadow: 0 0 20px rgba(0, 229, 255, 0.3); transform: translateX(5px); }
            
            .hs-card img { width: 55px; height: 55px; object-fit: cover; border: 1px solid var(--imp-blue); border-radius: 4px; box-shadow: 0 0 12px rgba(0,229,255,0.4); }
            .hs-card.hostile-rebel img { border-color: var(--imp-red); box-shadow: 0 0 12px rgba(255, 51, 51, 0.5); }
            
            .hs-info { display: flex; flex-direction: column; justify-content: center; gap: 6px; }
            .hs-name { color: #fff; font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; }
            .hs-meta { color: var(--imp-blue); font-size: 11px; text-transform: uppercase; font-weight: bold; opacity: 0.8; letter-spacing: 1.5px; }

            .data-card.text-only { aspect-ratio: auto; min-height: 130px; border-left: 5px solid var(--imp-blue); }
            .data-card.text-only .card-content { justify-content: flex-start; gap: 12px; }
            .data-card.text-only .card-title { font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; margin-bottom: 6px; }
            .data-card.text-only .card-sub { color: #aaa; font-size: 10px; }
            .data-card.empire-theme { background: linear-gradient(135deg, rgba(0,20,35,0.8), rgba(0,5,10,0.9)); border: 1px solid var(--imp-blue); border-left: 6px solid var(--imp-blue); }
            .data-card.empire-theme:hover { box-shadow: 0 10px 30px rgba(0,229,255,0.25); }
            .data-card.empire-theme .card-sub { color: var(--imp-blue); }
            .data-card.rebel-theme { background: linear-gradient(135deg, rgba(35,10,10,0.8), rgba(10,5,5,0.9)); border: 1px solid var(--imp-red); border-left: 6px solid var(--imp-red); }
            .data-card.rebel-theme:hover { box-shadow: 0 10px 30px rgba(255,51,51,0.25); }
            .data-card.rebel-theme .card-sub { color: var(--imp-red); }
            .data-card.neutral-theme { background: linear-gradient(135deg, rgba(25,25,25,0.8), rgba(10,10,10,0.9)); border: 1px solid #fff; border-left: 6px solid #fff; }
            .data-card.neutral-theme:hover { box-shadow: 0 10px 30px rgba(255,255,255,0.2); }
            .data-card.neutral-theme .card-sub { color: #fff; }
            
            .filter-bar { display: flex; gap: 15px; margin-bottom: 25px; border-bottom: 1px solid var(--imp-border); padding-bottom: 20px; }
            .filter-btn { padding: 10px 20px; border: 1px solid var(--imp-blue); color: var(--imp-blue); cursor: pointer; font-size: 12px; font-weight: 800; letter-spacing: 2px; transition: 0.3s; background: rgba(0,229,255,0.08); clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); }
            .filter-btn:hover, .filter-btn.active { background: var(--imp-blue); color: #000; box-shadow: 0 0 20px var(--imp-blue); }
            
            @keyframes slide-in { 0% {opacity:0; transform:translateX(30px);} 100% {opacity:1; transform:translateX(0);} }
            @keyframes fade-in { 0% {opacity:0} 100% {opacity:1} }

            /* --- NEW MAP UPGRADES --- */
            .holo-interference { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.04) 3px, rgba(0,229,255,0.04) 4px); pointer-events: none; z-index: 999; mix-blend-mode: screen; animation: holo-flicker 10s infinite; }
            @keyframes holo-flicker { 0%, 95%, 100% { opacity: 1; } 96% { opacity: 0.8; transform: skewX(1deg); } 97% { opacity: 0.3; transform: skewX(-2deg); } 98% { opacity: 1; transform: skewX(0); } }

            .holo-coord-ring { position: absolute; top: 50%; left: 50%; width: 850px; height: 850px; transform: translate(-50%, -50%); border: 1px dashed rgba(0,229,255,0.25); border-radius: 50%; pointer-events: none; z-index: 0; box-shadow: 0 0 40px rgba(0,229,255,0.08); }
            .coord-marker { position: absolute; font-size: 11px; color: rgba(0,229,255,0.7); font-family: monospace; font-weight: bold; letter-spacing: 2px; text-shadow: 0 0 10px var(--imp-blue); pointer-events: none; }

            .hyperlane { fill: none; stroke: rgba(0,229,255,0.4); stroke-width: 2px; stroke-dasharray: 8 8; animation: hyperlane-flow 20s linear infinite; pointer-events: none; filter: drop-shadow(0 0 8px var(--imp-blue)); }
            .hyperlane.rebel-lane { stroke: rgba(255,51,51,0.4); filter: drop-shadow(0 0 8px var(--imp-red)); animation: hyperlane-flow 15s linear infinite reverse; }
            @keyframes hyperlane-flow { 100% { stroke-dashoffset: 1000; } }

            .planet-sphere { width: 16px; height: 16px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-blue) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-blue); margin-bottom: 6px; animation: planet-pulse 4s infinite alternate; }
            .holo-pin.rebel .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-red) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-red); }
            .holo-pin.neutral .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, #aaaaaa 40%, #000 90%); box-shadow: 0 0 20px #fff; }
            @keyframes planet-pulse { 0% { box-shadow: 0 0 8px currentColor; } 100% { box-shadow: 0 0 25px currentColor; } }

            /* Fixed Hyperspace Stretch animations */
            .jump-wrapper { width: 100%; height: 100%; transform-origin: center; animation: hyperspace-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            .jumping-out .jump-wrapper { animation: hyperspace-out 0.5s cubic-bezier(0.5, 0, 1, 0.5) forwards; }
            @keyframes hyperspace-in { 0% { transform: scaleX(15) translateX(200px); opacity: 0; filter: blur(5px); } 50% { opacity: 1; filter: blur(2px); } 100% { transform: scaleX(1) translateX(0); opacity: 1; filter: none; } }
            @keyframes hyperspace-out { 0% { transform: scaleX(1) translateX(0); opacity: 1; filter: none; } 100% { transform: scaleX(20) translateX(-200px); opacity: 0; filter: blur(5px); } }
        `;
        document.head.appendChild(style);

        root.innerHTML = `
            <div id="imp-ui">
                <div class="imp-bg"></div>
                <div class="pulse-line"></div>
                <div class="imp-header">
                    <h1 class="main-title">Project: Imperial Dawn</h1>
                    <div class="header-deco-box">
                        <div class="deco-line"></div>
                        <div class="sub-title-box">HoloNet Wiki</div>
                        <div class="deco-line rev"></div>
                    </div>
                    <div class="header-separator"></div>
                </div>
                <div class="imp-body">
                    <div class="imp-sidebar">
                        <div id="imp-nav"></div>
                        <div class="quick-links" id="imp-links">
                            <div class="nav-header" style="margin-bottom:10px; padding-left:0; background:none; border:none;">SECURE LINKS</div>
                        </div>
                    </div>
                    <div class="imp-content">
                        <div class="imp-tabs" id="imp-tabs"></div>
                        <div class="imp-screen" id="imp-screen"></div>
                    </div>
                </div>
                <div class="imp-footer">
                    <div class="footer-top">
                        <div>TERMINAL_ID: UNKNOWN</div>
                        <div style="letter-spacing:5px;">/// GALAXY ARCHIVES ///</div>
                        <div>PROJECT: IMPERIAL DAWN</div>
                    </div>
                    <div class="footer-disclaimer">
                        DISCLAIMER: Project: Imperial Dawn is a fan-made Roblox game project. It is not affiliated with, endorsed by, or sponsored by Lucasfilm Ltd., Disney, or the Star Wars franchise. All Star Wars intellectual property belongs to their respective owners.
                    </div>
                </div>
            </div>
        `;

        const navEl = document.getElementById('imp-nav');
        const tabsEl = document.getElementById('imp-tabs');
        const screenEl = document.getElementById('imp-screen');
        const linksEl = document.getElementById('imp-links');
        const uiEl = document.getElementById('imp-ui');

        let curCat = "HOME"; 
        let curSub = "Briefing";

        QUICK_LINKS.forEach(link => {
            const a = document.createElement('a');
            a.className = 'ql-btn'; a.innerText = link.label; a.href = link.url;
            linksEl.appendChild(a);
        });

        function render() {
            navEl.innerHTML = '<div class="nav-header">DIRECTORY</div>';
            Object.keys(DB).forEach(key => {
                const btn = document.createElement('div');
                btn.className = `nav-btn ${key === curCat ? 'active' : ''}`;
                btn.innerText = key;
                btn.onclick = () => { curCat = key; curSub = Object.keys(DB[key])[0]; render(); };
                navEl.appendChild(btn);
            });

            tabsEl.innerHTML = '';
            Object.keys(DB[curCat]).forEach(key => {
                const btn = document.createElement('div');
                btn.className = `tab-btn ${key.toUpperCase() === curSub.toUpperCase() ? 'active' : ''}`;
                btn.innerText = key;
                btn.onclick = () => { curSub = key; renderContent(); updateTabs(); };
                tabsEl.appendChild(btn);
            });
            renderContent();
        }

        function updateTabs() {
            Array.from(tabsEl.children).forEach(btn => {
                const isActive = btn.innerText.toUpperCase() === curSub.toUpperCase();
                if(isActive) btn.classList.add('active'); else btn.classList.remove('active');
            });
        }

        function openFactionBriefing(data) {
            const old = document.querySelector('.dossier-overlay');
            if(old) old.remove();
            const overlay = document.createElement('div');
            overlay.className = 'dossier-overlay';
            let statsHTML = '';
            for (const [key, value] of Object.entries(data.stats)) {
                statsHTML += `<div class="b-stat"><div class="b-stat-lab">${key}</div><div class="b-stat-val">${value}</div></div>`;
            }
            let divisionsHTML = '';
            if(data.divisions) {
                data.divisions.forEach(div => { divisionsHTML += `<div class="division-btn" data-link="${div}">${div}</div>`; });
            }
            overlay.innerHTML = `
                <div class="briefing-box ${data.alignment}">
                    <div class="dossier-close">×</div>
                    <div class="brief-header">
                        <h2 class="brief-title">${data.title}</h2>
                        <div class="brief-subtitle">SECURE BRIEFING // ID: ${data.status}</div>
                    </div>
                    <div class="brief-main">
                        <div class="brief-left"><img src="${data.image}" class="brief-logo"></div>
                        <div class="brief-right">
                            <div class="brief-section-title">EXECUTIVE SUMMARY</div>
                            <div class="brief-bio">${data.bio}</div>
                            <div class="brief-section-title">CORE METRICS</div>
                            <div class="brief-stats">${statsHTML}</div>
                            <div class="brief-section-title">BRANCHES</div>
                            <div class="brief-div-list">${divisionsHTML}</div>
                        </div>
                    </div>
                </div>
            `;
            uiEl.appendChild(overlay);
            overlay.querySelector('.dossier-close').onclick = () => overlay.remove();
            overlay.querySelectorAll('.division-btn').forEach(btn => {
                btn.onclick = () => {
                    const wikiPath = '/wiki/' + btn.getAttribute('data-link').replace(/ /g, '_');
                    window.open(wikiPath, '_blank');
                };
            });
        }

        function openDossier(data) {
            const old = document.querySelector('.dossier-overlay');
            if(old) old.remove();
            const overlay = document.createElement('div');
            overlay.className = 'dossier-overlay';
            const isArmory = ["IMPERIAL", "ILLEGAL", "RESTRICTED", "STANDARD", "SUPPORT", "VEHICLE", "CONTRABAND"].includes(data.status);
            
            if (isArmory) {
                let statsHTML = '';
                if(data.stats) { for (const [key, value] of Object.entries(data.stats)) { statsHTML += `<div class="ap-stat"><label>${key}</label>${value}</div>`; } }
                let themeClass = "";
                if (data.status === "ILLEGAL" || data.status === "RESTRICTED" || data.bio.includes("Rebel")) themeClass = "rebel-theme";
                else if (data.status === "CONTRABAND" || data.status === "NEUTRAL") themeClass = "neutral-theme";

                overlay.innerHTML = `
                    <div class="dossier-box armory-popup ${themeClass}">
                        <div class="dossier-close">×</div>
                        <div class="ap-header">
                            <div><h2 class="ap-title">${data.title}</h2><div class="ap-subtitle">${data.sub}</div></div>
                        </div>
                        <div class="ap-body">
                            <div class="ap-img-container"><img src="${data.image}"></div>
                            <div class="ap-content">
                                <div class="ap-desc">${data.bio}</div>
                                <div class="ap-stats-grid">${statsHTML}</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                let statsHTML = '';
                if(data.stats) { for (const [key, value] of Object.entries(data.stats)) { statsHTML += `<div class="stat-row"><span>${key}:</span> <span>${value}</span></div>`; } }
                const hasImg = data.image && data.image !== "";
                let boxClass = "dossier-box";
                if(data.status && data.status.includes("REBEL")) boxClass += " hostile"; 
                if(!hasImg) boxClass += " no-img";
                const imgHtml = hasImg ? `<div class="dossier-img"><img src="${data.image}"></div>` : '';

                overlay.innerHTML = `
                    <div class="${boxClass}">
                        <div class="dossier-close">×</div>
                        ${imgHtml}
                        <div class="dossier-data">
                            <div class="dossier-header">
                                <h2 class="dossier-name">${data.title}</h2>
                                <div class="dossier-rank">${data.sub || data.status}</div>
                            </div>
                            <div class="dossier-stats-grid">${statsHTML}</div>
                            <div class="dossier-bio">${data.bio || "No biographical data available."}</div>
                        </div>
                    </div>
                `;
            }
            uiEl.appendChild(overlay);
            overlay.querySelector('.dossier-close').onclick = () => overlay.remove();
        }

        function generateCode(data) {
            const btn = document.getElementById('gen-btn');
            const resultArea = document.getElementById('c-result-area');
            const statusMsg = document.getElementById('c-status');
            const codeBox = document.getElementById('c-code-box');
            btn.innerText = "ENCRYPTING...";
            setTimeout(() => {
                const dbCode = `{ title: "${data.name}", sub: "${data.rank}", status: "PENDING", stats: { "ID": "${data.roblox}", "HOMEWORLD": "${data.home}", "SPECIES": "${data.species}" }, bio: "${data.bio.replace(/"/g, '\\"')}" }`;
                statusMsg.innerText = ">> ENCRYPTION COMPLETE. READY FOR TRANSMISSION.";
                codeBox.innerText = dbCode;
                resultArea.classList.add('active');
                btn.innerText = "ENCRYPT & GENERATE";
            }, 800);
        }

        function renderContent() {
            // Memory Cleanup & Prevent Leaks when swapping tabs
            if (window.holomapAnimFrame) {
                cancelAnimationFrame(window.holomapAnimFrame);
            }
            if (window.activeShips) window.activeShips.forEach(s => { if(s.el) s.el.remove(); });
            if (window.activeLasers) window.activeLasers.forEach(l => { if(l.el) l.el.remove(); });
            window.activeShips = [];
            window.activeLasers = [];

            screenEl.innerHTML = '';
            screenEl.style.height = 'auto'; 
            screenEl.style.overflow = 'visible'; 
            screenEl.style.padding = '40px'; 
            const data = DB[curCat][curSub];

            if (data.type === "welcome") {
                if(data.image) screenEl.innerHTML += `<div class="welcome-hero"><img src="${data.image}"><div class="welcome-overlay">${data.title}</div></div>`;
                screenEl.innerHTML += `<div class="briefing-meta-bar"><span>// ENCRYPTION: NONE</span><span>// DATE: UNKNOWN</span><span>// SOURCE: HOLONET NEWS</span></div>`;
                const div = document.createElement('div'); div.className = 'text-block'; screenEl.appendChild(div);
                let i = 0; const txt = data.content;
                const type = () => { if(i < txt.length){ div.innerHTML += txt.charAt(i); i++; setTimeout(type, 10); } else { div.innerHTML += "<br><br>>> TRANSMISSION END."; } };
                type();
            }
            else if (data.type === "news_feed") {
                let html = `<div class="news-container"><div class="news-header-box"><h2 class="news-maintitle">${data.title}</h2></div>`;
                data.data.forEach(item => {
                    html += `
                        <div class="news-card">
                            <div class="news-img-box"><img src="${item.image}"></div>
                            <div class="news-content">
                                <div class="news-meta">
                                    <span>// ${item.date}</span>
                                    <span class="news-tag">${item.tag}</span>
                                </div>
                                <div class="news-title">${item.title}</div>
                                <div class="news-text">${item.content}</div>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
                screenEl.innerHTML = html;
            }
            else if (data.type === "record_list") {
                let html = `<div class="record-wrapper">`;
                data.data.forEach(item => {
                    const imgHtml = item.image ? `<div class="record-img-box"><img src="${item.image}"></div>` : '';
                    const themeClass = item.theme ? `theme-${item.theme}` : 'theme-normal';
                    html += `
                        <div class="record-card ${themeClass}">
                            ${imgHtml}
                            <div class="record-content">
                                <div class="record-top">
                                    <div>
                                        <div class="record-title">${item.title}</div>
                                        <div class="record-meta"><span>LOC: ${item.loc}</span><span>DATE: ${item.date}</span></div>
                                    </div>
                                    <div class="record-status">${item.status}</div>
                                </div>
                                <div class="record-desc">${item.desc}</div>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
                screenEl.innerHTML = html;
            }
            else if (data.type === "pd_document") {
                const container = document.createElement('div'); container.className = 'pd-layout';
                let html = `<div class="pd-content"><h1 class="pd-title">${data.title}</h1><div class="pd-subtitle">${data.subtitle}</div>`;
                data.sections.forEach(sec => { html += `<div class="pd-section"><div class="pd-sec-header">${sec.header}</div><div class="pd-text">${sec.content}</div></div>`; });
                html += `</div>`;
                container.innerHTML = html;
                screenEl.appendChild(container);
            }
            else if (data.type === "armory_split") {
                data.sections.forEach(section => {
                    let themeClass = '';
                    if (section.theme === 'rebel') themeClass = 'rebel-theme';
                    if (section.theme === 'neutral') themeClass = 'neutral-theme';
                    const wrapper = document.createElement('div'); wrapper.className = `armory-section ${themeClass}`;
                    wrapper.innerHTML = `<div class="armory-header">// ${section.header}</div>`;
                    const grid = document.createElement('div'); grid.className = 'ac-grid';
                    section.items.forEach(item => {
                        const card = document.createElement('div'); card.className = 'ac-card';
                        let statsHTML = '';
                        if (item.stats) { for (const [k, v] of Object.entries(item.stats)) { statsHTML += `<div class="ac-stat"><span>${k}</span>${v}</div>`; } }
                        card.innerHTML = `<div class="ac-top"><div class="ac-title">${item.title}</div><div class="ac-class">${item.sub}</div></div><div class="ac-img-box"><img src="${item.image}"></div><div class="ac-body"><div class="ac-bio">${item.bio}</div><div class="ac-stats">${statsHTML}</div></div>`;
                        card.onclick = () => openDossier(item);
                        grid.appendChild(card);
                    });
                    wrapper.appendChild(grid);
                    screenEl.appendChild(wrapper);
                });
            }
            else if (data.type === "cards_filter") {
                const filterContainer = document.createElement('div'); filterContainer.className = 'filter-bar';
                data.categories.forEach(cat => {
                    const btn = document.createElement('div'); btn.className = 'filter-btn'; btn.innerText = cat;
                    btn.onclick = () => renderFiltered(cat, btn);
                    filterContainer.appendChild(btn);
                });
                screenEl.appendChild(filterContainer);
                const contentContainer = document.createElement('div'); contentContainer.id = 'filter-content'; screenEl.appendChild(contentContainer);
                function renderFiltered(category, activeBtn) {
                    const buttons = filterContainer.querySelectorAll('.filter-btn');
                    buttons.forEach(b => b.classList.remove('active'));
                    if (activeBtn) activeBtn.classList.add('active'); else buttons[0].classList.add('active');
                    contentContainer.innerHTML = ''; 
                    const filteredGroups = data.data.filter(group => group.category === category);
                    filteredGroups.forEach(group => {
                        if (group.header) { const header = document.createElement('h3'); header.className = 'brief-section-title'; header.style.marginTop = '20px'; header.innerText = group.header; contentContainer.appendChild(header); }
                        const grid = document.createElement('div'); grid.className = 'card-grid';
                        group.items.forEach(item => {
                            const card = document.createElement('div'); 
                            let themeClass = 'empire-theme';
                            if (group.category === 'REBEL') themeClass = 'rebel-theme';
                            if (group.category === 'OTHERS') themeClass = 'neutral-theme';
                            card.className = `data-card text-only ${themeClass}`;
                            let statsHtml = '';
                            if(item.stats) { statsHtml = '<div class="card-stats">'; Object.keys(item.stats).forEach(key => { statsHtml += `<div class="c-stat">${key}: ${item.stats[key]}</div>`; }); statsHtml += '</div>'; }
                            card.innerHTML = `<div class="card-content"><div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub}</div></div><div style="font-size:13px; color:#b0d0e0; margin-bottom:15px; line-height:1.6;">${item.bio}</div>${statsHtml}</div>`;
                            card.onclick = () => openDossier(item);
                            grid.appendChild(card);
                        });
                        contentContainer.appendChild(grid);
                    });
                }
                renderFiltered(data.categories[0], filterContainer.children[0]);
            }
            else if (data.type === "tactical") {
                const grid = document.createElement('div'); grid.className = 'tac-grid';
                data.data.forEach(item => {
                    const card = document.createElement('div'); 
                    let alignClass = "";
                    if(item.align === "rebel") alignClass = "align-rebel";
                    if(item.align === "gold") alignClass = "align-gold";
                    card.className = `tac-card ${alignClass}`;
                    card.innerHTML = `<div class="tac-info"><div class="tac-title">${item.title}</div><div class="tac-loc">${item.loc}</div><div class="tac-desc">${item.desc}</div></div><div class="tac-status">${item.status}</div>`;
                    grid.appendChild(card);
                });
                screenEl.appendChild(grid);
            }
            else if (data.type === "list") {
                const wrapper = document.createElement('div'); wrapper.className = 'timeline-box';
                data.data.forEach((item, index) => {
                    const el = document.createElement('div'); el.className = 't-item'; el.style.animationDelay = `${index * 0.1}s`;
                    el.innerHTML = `<div class="t-node"></div><div class="t-card"><div class="t-date">${item.left}</div><div class="t-title">${item.right}</div>${item.tag ? `<div class="t-tag">${item.tag}</div>` : ''}</div>`;
                    wrapper.appendChild(el);
                });
                screenEl.appendChild(wrapper);
            }
            else if (data.type === "factions") {
                const grid = document.createElement('div'); grid.className = 'fac-grid'; 
                data.data.forEach(item => {
                    const card = document.createElement('div'); card.className = `faction-card ${item.alignment || 'neutral'}`;
                    let divs = '';
                    if(item.divisions) { divs = '<div class="fac-tags">'; item.divisions.forEach(d => divs += `<div class="f-tag">${d}</div>`); divs += '</div>'; }
                    card.innerHTML = `<div class="fac-logo-box"><img src="${item.image}"></div><div class="fac-info-area"><div class="fac-name">${item.title}</div><div class="fac-role">${item.sub}</div><div class="fac-stats-row"><div class="fac-stat"><span>LOC:</span> ${item.stats.Capital || item.stats.Base}</div></div><div style="font-size:13px; color:#cceeff; line-height:1.6; margin-bottom:20px;">${item.bio}</div>${divs}</div>`;
                    card.onclick = () => openFactionBriefing(item);
                    grid.appendChild(card);
                });
                screenEl.appendChild(grid);
            }
            else if (data.type === "cards") {
                const grid = document.createElement('div'); grid.className = 'card-grid';
                data.data.forEach(item => {
                    const hasImage = item.image && item.image !== "";
                    let cardClass = 'data-card';
                    if (!hasImage) cardClass += ' text-only neutral-theme';
                    const card = document.createElement('div'); card.className = cardClass;
                    const img = hasImage ? `<div class="card-img-box"><img src="${item.image}"><div class="status-badge">${item.status}</div></div>` : '';
                    let statsHtml = '';
                    if(item.stats) { statsHtml = '<div class="card-stats">'; Object.keys(item.stats).forEach(key => { statsHtml += `<div class="c-stat">${key}: ${item.stats[key]}</div>`; }); statsHtml += '</div>'; }
                    card.innerHTML = `${img}<div class="card-content"><div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub}</div></div>${!hasImage && item.bio ? `<div style="font-size:13px; color:#cceeff; margin-bottom:15px; line-height:1.6;">${item.bio}</div>` : ''}${statsHtml}</div>`;
                    card.onclick = () => openDossier(item);
                    grid.appendChild(card);
                });
                screenEl.appendChild(grid);
            }
            else if (data.type === "form") {
                screenEl.innerHTML = `<h2 style="color:#fff; border-bottom:1px solid var(--imp-blue); padding-bottom:15px; text-shadow: 0 0 10px rgba(0,229,255,0.4); letter-spacing: 2px;">${data.title}</h2><p style="color:#cceeff; font-size:14px; margin-bottom:25px; line-height: 1.6;">${data.desc}</p><div class="imp-form"><div class="form-group"><label class="form-label">CHARACTER NAME</label><input type="text" class="imp-input" id="c-name" placeholder="Enter Full Name"></div><div class="form-group"><label class="form-label">EMPLOYMENT</label><input type="text" class="imp-input" id="c-rank" placeholder="e.g. Janitor"></div><div class="form-group"><label class="form-label">SPECIES</label><input type="text" class="imp-input" id="c-species" placeholder="e.g. Human"></div><div class="form-group"><label class="form-label">HOMEWORLD</label><input type="text" class="imp-input" id="c-home" placeholder="e.g. Coruscant"></div><div class="form-group"><label class="form-label">ROBLOX PROFILE LINK</label><input type="text" class="imp-input" id="c-roblox" placeholder="https://www.roblox.com/users/..."></div><div class="form-group form-full"><label class="form-label">BIOGRAPHY</label><textarea class="imp-textarea" id="c-bio" placeholder="Service history..."></textarea></div><button class="submit-btn" id="gen-btn">ENCRYPT & GENERATE</button><div class="code-result-area" id="c-result-area"><div class="status-msg" id="c-status"></div><div class="code-box" id="c-code-box"></div><div style="font-size:11px; color:#aaa; text-align:center; letter-spacing:1px; font-weight:bold;">>> COPY THE CODE ABOVE AND SUBMIT VIA DISCORD TICKET</div></div></div>`;
                document.getElementById('gen-btn').onclick = () => {
                    const d = { name: document.getElementById('c-name').value, rank: document.getElementById('c-rank').value, species: document.getElementById('c-species').value, home: document.getElementById('c-home').value, roblox: document.getElementById('c-roblox').value, bio: document.getElementById('c-bio').value };
                    if(!d.name || !d.rank) { alert("NAME AND EMPLOYMENT REQUIRED FOR PROTOCOL"); return; }
                    generateCode(d);
                };
            }
            else if (data.type === "holomap") {
                screenEl.style.height = 'auto'; 
                screenEl.style.padding = '0';
                
                screenEl.innerHTML = `
                    <div class="holomap-wrapper" id="holomap-wrapper">
                        <div class="holo-interference"></div>
                        <div class="holo-projector-beam"></div>
                        <div class="holo-stage" id="holo-stage">
                            <div class="holo-coord-ring" id="coord-ring"></div>
                            <div class="holo-orbit"></div>
                            <div class="holo-orbit" style="width: 50%; height: 50%; top: 25%; left: 25%; animation-direction: reverse; animation-duration: 80s;"></div>
                            
                            <div class="holo-ring-1"></div>
                            <div class="holo-ring-2"></div>
                            <div class="holo-base">
                                <div class="holo-grid-overlay"></div>
                            </div>
                            <div class="holo-core"></div>
                            <div class="holo-scanner"></div>
                            <div class="star-field"></div>
                            <svg class="holo-svg-layer layer-bottom" id="svg-bot" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"></svg>
                            <svg class="holo-svg-layer layer-mid" id="svg-mid" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"></svg>
                            <svg class="holo-svg-layer layer-top" id="holo-svg-layer" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"></svg>
                        </div>
                        <div class="map-controls-panel">
                            <div class="mc-group">
                                <div class="z-btn" id="btn-rot-l">◄</div>
                                <div class="z-btn" id="btn-rot-r">►</div>
                            </div>
                            <div class="mc-divider"></div>
                            <div class="mc-group">
                                <div class="z-btn" id="btn-zoom-in">+</div>
                                <div class="z-btn" id="btn-zoom-out">-</div>
                            </div>
                        </div>
                        <div class="holo-sidebar" id="holo-sidebar">
                            <div class="hs-close" id="hs-close">×</div>
                            <div class="hs-header">
                                <h3 class="hs-title" id="hs-title">SECTOR DATA</h3>
                            </div>
                            <div class="hs-body" id="hs-body"></div>
                        </div>
                    </div>
                `;

                const stage = document.getElementById('holo-stage');
                const svgLayerBot = document.getElementById('svg-bot');
                const svgLayerMid = document.getElementById('svg-mid');
                const svgLayerTop = document.getElementById('holo-svg-layer');
                const sidebar = document.getElementById('holo-sidebar');
                const hsBody = document.getElementById('hs-body');
                const starField = document.querySelector('.star-field');
                
                let currentRotX = 50; 
                let currentRotZ = 0;
                let currentScale = 1.0;

                // --- ADVANCED TACTICAL AI FIX: STRICT STARFIGHTER DOGFIGHTING ---
                const impLogo = "https://project-imperial-dawn.fandom.com/special:filepath/TIE.png"; 
                const rebLogo = "https://project-imperial-dawn.fandom.com/special:filepath/X-Wing3.png";
                
                const STAGE_SIZE = 800;
                const CENTER = STAGE_SIZE / 2;
                const BOUNDARY_RADIUS = 350; 
                
                // Fixed image offset for standard Fandom up-facing ship sprites
                const IMAGE_OFFSET = Math.PI;
                
                class Starfighter {
                    constructor(faction, x, y) {
                        this.faction = faction;
                        this.pos = { x, y, z: 20 + Math.random() * 40 }; 
                        this.isAlive = true;
                        this.state = 'combat'; 
                        this.lifeTime = 0;
                        this.idleTime = 0; // Tracks how long the ship has been without a target
                        this.maxLife = 20000 + Math.random() * 20000; 

                        this.maxSpeed = faction === 'imp' ? 1.0 : 0.8;
                        this.turnRate = faction === 'imp' ? 0.04 : 0.03;
                        this.hp = faction === 'imp' ? 40 : 60;
                        this.weapons = { 
                            damage: faction === 'imp' ? 15 : 15, 
                            fireRate: faction === 'imp' ? 300 : 550, 
                            lastFired: 0, 
                            range: 280 
                        };

                        this.target = null;
                        this.angle = Math.atan2(CENTER - y, CENTER - x);

                        this.el = document.createElement('div');
                        this.el.className = `dynamic-ship ${faction === 'imp' ? 'empire-ship' : 'rebel-ship'}`;

                        const imgUrl = faction === 'reb' ? rebLogo : impLogo;
                        this.el.innerHTML = `<div class="jump-wrapper"><img src="${imgUrl}" class="ship-icon"></div>`;
                        this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px) rotateZ(${this.angle + IMAGE_OFFSET}rad)`;
                        stage.appendChild(this.el);
                    }

                    takeDamage(amt) {
                        if(!this.isAlive || this.state !== 'combat') return;
                        this.hp -= amt;
                        this.el.style.filter = 'brightness(2) drop-shadow(0 0 10px white)';
                        setTimeout(() => { if(this.el) this.el.style.filter = 'none'; }, 50);
                        if(this.hp <= 0) this.destroy(true);
                    }

                    destroy(exploded = true) {
                        this.isAlive = false;
                        if (exploded) {
                            const fxWrapper = document.createElement('div');
                            fxWrapper.style.position = 'absolute';
                            fxWrapper.style.left = '0';
                            fxWrapper.style.top = '0';
                            fxWrapper.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px)`;
                            
                            const fx = document.createElement('div');
                            fx.className = 'fx-explosion';
                            fxWrapper.appendChild(fx);
                            
                            stage.appendChild(fxWrapper);
                            setTimeout(() => fxWrapper.remove(), 800);
                        }
                        this.el.remove();
                    }

                    update(dt, currentTime) {
                        if (!this.isAlive) return;
                        const dtScale = Math.min(dt / 16, 2); 

                        // If exiting, fly straight out rapidly
                        if (this.state === 'exiting') {
                            this.pos.x += Math.cos(this.angle) * this.maxSpeed * 4 * dtScale;
                            this.pos.y += Math.sin(this.angle) * this.maxSpeed * 4 * dtScale;
                            this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px) rotateZ(${this.angle + IMAGE_OFFSET}rad)`;
                            return;
                        }

                        // Target Acquisition
                        if (this.target && (!this.target.isAlive || this.target.state !== 'combat')) {
                            this.target = null;
                        }

                        if (!this.target) {
                            let closestDist = Infinity;
                            window.activeShips.forEach(enemy => {
                                if (enemy.faction !== this.faction && enemy.isAlive && enemy.state === 'combat') {
                                    const dist = Math.hypot(enemy.pos.x - this.pos.x, enemy.pos.y - this.pos.y);
                                    if (dist < 450) {
                                        closestDist = dist;
                                        this.target = enemy;
                                    }
                                }
                            });
                        }

                        // Track Idle Time vs Combat Time
                        if (!this.target) {
                            this.idleTime += dt;
                        } else {
                            this.idleTime = 0;
                        }
                        this.lifeTime += dt;

                        // RETREAT MECHANIC: Jump away if map is empty for 8 SECONDS OR fuel/time runs out
                        if (this.state === 'combat' && (this.lifeTime > this.maxLife || this.idleTime > 10000)) {
                            this.state = 'exiting';
                            // Snap nose to face outwards towards the edge of the galaxy
                            this.angle = Math.atan2(this.pos.y - CENTER, this.pos.x - CENTER);
                            this.el.classList.add('jumping-out');
                            // Let the visual hyperspace stretch play before deleting
                            setTimeout(() => this.destroy(false), 500); 
                            return;
                        }

                        let desiredAngle = this.angle;

                        if (this.target) {
                            let dx = this.target.pos.x - this.pos.x;
                            let dy = this.target.pos.y - this.pos.y;
                            desiredAngle = Math.atan2(dy, dx);
                            let targetDist = Math.hypot(dx, dy);

                            let aimDiff = Math.abs(this.angle - desiredAngle);
                            while(aimDiff > Math.PI) aimDiff -= Math.PI * 2;
                            aimDiff = Math.abs(aimDiff);

                            if (targetDist < this.weapons.range && aimDiff < 0.3) {
                                if (currentTime - this.weapons.lastFired > this.weapons.fireRate) {
                                    this.weapons.lastFired = currentTime;
                                    window.activeLasers.push(new Laser(this.faction, this.pos.x, this.pos.y, this.pos.z, this.angle, this.weapons.damage));
                                }
                            }
                        } else {
                            // If no targets, smoothly orbit the center
                            let cx = CENTER - this.pos.x;
                            let cy = CENTER - this.pos.y;
                            if (Math.hypot(cx, cy) > 100) desiredAngle = Math.atan2(cy, cx);
                        }

                        // Separation Algorithm
                        let sepX = 0, sepY = 0;
                        window.activeShips.forEach(other => {
                            if (other !== this && other.isAlive) {
                                let dx = this.pos.x - other.pos.x;
                                let dy = this.pos.y - other.pos.y;
                                let d = Math.hypot(dx, dy);
                                if (d > 0 && d < 40) { 
                                    sepX += (dx / d) * 2;
                                    sepY += (dy / d) * 2;
                                }
                            }
                        });

                        if (sepX !== 0 || sepY !== 0) {
                            desiredAngle = Math.atan2(Math.sin(desiredAngle) + sepY, Math.cos(desiredAngle) + sepX);
                        }

                        let distFromCenter = Math.hypot(this.pos.x - CENTER, this.pos.y - CENTER);
                        if (distFromCenter > BOUNDARY_RADIUS) {
                            desiredAngle = Math.atan2(CENTER - this.pos.y, CENTER - this.pos.x);
                        }

                        let angleDiff = desiredAngle - this.angle;
                        while (angleDiff <= -Math.PI) angleDiff += Math.PI * 2;
                        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                        this.angle += angleDiff * this.turnRate * dtScale;

                        this.pos.x += Math.cos(this.angle) * this.maxSpeed * dtScale;
                        this.pos.y += Math.sin(this.angle) * this.maxSpeed * dtScale;

                        if (isNaN(this.pos.x) || this.pos.x < -200 || this.pos.x > STAGE_SIZE + 200) this.pos.x = CENTER;
                        if (isNaN(this.pos.y) || this.pos.y < -200 || this.pos.y > STAGE_SIZE + 200) this.pos.y = CENTER;

                        this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px) rotateZ(${this.angle + IMAGE_OFFSET}rad)`;
                    }
                }
                
                class Laser {
                    constructor(faction, x, y, z, angle, damage) {
                        this.faction = faction;
                        this.pos = { x: x + Math.cos(angle)*15, y: y + Math.sin(angle)*15, z: z };
                        this.angle = angle;
                        this.damage = damage;
                        this.speed = faction === 'imp' ? 14 : 12; 
                        this.active = true;
                        this.life = 60; 

                        this.el = document.createElement('div');
                        this.el.className = `laser-blast ${faction}`;
                        this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px) rotateZ(${this.angle}rad)`;
                        stage.appendChild(this.el);
                    }

                    update(dt) {
                        const dtScale = Math.min(dt / 16, 2);
                        this.pos.x += Math.cos(this.angle) * this.speed * dtScale;
                        this.pos.y += Math.sin(this.angle) * this.speed * dtScale;
                        this.life -= dtScale;

                        this.el.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, ${this.pos.z}px) rotateZ(${this.angle}rad)`;

                        for (let ship of window.activeShips) {
                            if (ship.isAlive && ship.faction !== this.faction && ship.state === 'combat') {
                                const dist = Math.hypot(ship.pos.x - this.pos.x, ship.pos.y - this.pos.y);
                                if (dist < 20) { 
                                    ship.takeDamage(this.damage);
                                    this.active = false;
                                    break;
                                }
                            }
                        }

                        let distFromCenter = Math.hypot(this.pos.x - CENTER, this.pos.y - CENTER);
                        if (this.life <= 0 || distFromCenter > BOUNDARY_RADIUS + 50) {
                            this.active = false;
                        }

                        if (!this.active) this.el.remove();
                    }
                }

                function spawnShip(faction) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = BOUNDARY_RADIUS + Math.random() * 40; 
                    const x = CENTER + Math.cos(angle) * dist;
                    const y = CENTER + Math.sin(angle) * dist;
                    
                    window.activeShips.push(new Starfighter(faction, x, y));
                }

                let lastTime = performance.now();
                function mapLoop(currentTime) {
                    let dt = currentTime - lastTime; 
                    if (dt > 100) dt = 16; 
                    lastTime = currentTime;

                    const imps = window.activeShips.filter(s => s.faction === 'imp' && s.isAlive && s.state !== 'exiting').length;
                    const rebs = window.activeShips.filter(s => s.faction === 'reb' && s.isAlive && s.state !== 'exiting').length;
                    
                    // Lowered the max ships to 3 and 2, and drastically slowed down the spawn rate
                    if (imps < 5 && Math.random() < 0.004) spawnShip('imp');
                    if (rebs < 3 && Math.random() < 0.0045) spawnShip('reb');

                    window.activeShips.forEach(ship => ship.update(dt, currentTime));
                    window.activeShips = window.activeShips.filter(ship => ship.isAlive);

                    window.activeLasers.forEach(laser => laser.update(dt));
                    window.activeLasers = window.activeLasers.filter(laser => laser.active);

                    window.holomapAnimFrame = requestAnimationFrame(mapLoop);
                }
                
                window.holomapAnimFrame = requestAnimationFrame(mapLoop);

                // --- MAP STARS & PIN RENDERING ---
                for(let i=0; i<400; i++){
                    const s = document.createElement('div');
                    s.className = 'h-star';
                    const x = Math.random() * 2000, y = Math.random() * 2000, z = Math.random() * 500 - 250;
                    s.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                    starField.appendChild(s);
                }
                
                // Add Coordinate Edge Ring
                const coordRing = document.getElementById('coord-ring');
                for (let i=0; i<12; i++) {
                    const marker = document.createElement('div');
                    marker.className = 'coord-marker';
                    const a = (i * 30) * Math.PI / 180;
                    const r = 415; 
                    marker.style.left = (CENTER + Math.cos(a)*r) + 'px';
                    marker.style.top = (CENTER + Math.sin(a)*r) + 'px';
                    marker.style.transform = `translate(-50%, -50%) rotate(${i * 30 + 90}deg)`;
                    marker.innerText = `SEC-${(i+1).toString().padStart(2, '0')}`;
                    coordRing.appendChild(marker);
                }

                // Add Animated Hyperspace Trade Routes
                const hyperlane1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                hyperlane1.setAttribute("d", "M 100 400 Q 400 350 700 400");
                hyperlane1.setAttribute("class", "hyperlane");
                svgLayerMid.appendChild(hyperlane1);

                const hyperlane2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                hyperlane2.setAttribute("d", "M 400 100 Q 450 400 400 700");
                hyperlane2.setAttribute("class", "hyperlane rebel-lane");
                svgLayerMid.appendChild(hyperlane2);

                function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
                    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                    return {
                        x: centerX + (radius * Math.cos(angleInRadians)),
                        y: centerY + (radius * Math.sin(angleInRadians))
                    };
                }

                function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle){
                    var startOuter = polarToCartesian(x, y, outerRadius, endAngle);
                    var endOuter = polarToCartesian(x, y, outerRadius, startAngle);
                    var startInner = polarToCartesian(x, y, innerRadius, endAngle);
                    var endInner = polarToCartesian(x, y, innerRadius, startAngle);
                    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

                    var d = [
                        "M", startOuter.x, startOuter.y,
                        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
                        "L", endInner.x, endInner.y,
                        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
                        "L", startOuter.x, startOuter.y, "Z"
                    ].join(" ");
                    return d;
                }

                data.data.forEach(sector => {
                    if (sector.startAngle !== undefined) {
                        const pathString = describeArc(0, 0, 15, 48, sector.startAngle, sector.endAngle);
                        
                        const pathBot = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        const pathMid = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        const pathTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        
                        [pathBot, pathMid, pathTop].forEach(path => path.setAttribute("d", pathString));
                        
                        let cssClass = "sector-poly";
                        let pinClass = "holo-pin";
                        
                        const isRebel = sector.sub.some(p => p.status.includes("REBEL"));
                        const isNeutral = sector.sub.some(p => p.status.includes("UNEXPLORED") || p.status.includes("NEUTRAL"));

                        if (isRebel) {
                            cssClass += " rebel-held";
                            pinClass += " rebel";
                        } else if (isNeutral) {
                            cssClass += " neutral-sector";
                            pinClass += " neutral";
                        }

                        [pathBot, pathMid, pathTop].forEach(path => path.setAttribute("class", cssClass));

                        pathTop.onmouseenter = () => { pathBot.classList.add('hovered'); pathMid.classList.add('hovered'); pathTop.classList.add('hovered'); };
                        pathTop.onmouseleave = () => { pathBot.classList.remove('hovered'); pathMid.classList.remove('hovered'); pathTop.classList.remove('hovered'); };
                        pathTop.onclick = (e) => { e.stopPropagation(); openSector(sector); };
                        
                        svgLayerBot.appendChild(pathBot);
                        svgLayerMid.appendChild(pathMid);
                        svgLayerTop.appendChild(pathTop);

                        const midAngle = (sector.startAngle + sector.endAngle) / 2;
                        const pinRad = 40;
                        const pinPos = polarToCartesian(0, 0, pinRad, midAngle);
                        const pinLeft = (pinPos.x + 50) + "%";
                        const pinTop = (pinPos.y + 50) + "%";

                        const pin = document.createElement('div');
                        pin.className = pinClass;
                        pin.style.left = pinLeft;
                        pin.style.top = pinTop;
                        pin.innerHTML = `
                            <div class="pin-wrapper">
                                <div class="pin-label">${sector.name}</div>
                                <div class="pin-stem"></div>
                                <div class="planet-sphere"></div>
                            </div>
                        `;
                        stage.appendChild(pin);
                    }
                });

                function updateTransform() {
                    stage.style.transform = `scale(${currentScale}) rotateX(${currentRotX}deg) rotateZ(${currentRotZ}deg)`;
                    
                    document.querySelectorAll('.pin-wrapper').forEach(lbl => {
                        lbl.style.transform = `translateZ(25px) rotateZ(${-currentRotZ}deg) rotateX(${-currentRotX}deg)`;
                    });
                }
                
                updateTransform();

                document.getElementById('btn-rot-l').onclick = () => { currentRotZ -= 20; updateTransform(); };
                document.getElementById('btn-rot-r').onclick = () => { currentRotZ += 20; updateTransform(); };
                document.getElementById('btn-zoom-in').onclick = () => { currentScale = Math.min(currentScale + 0.15, 2.5); updateTransform(); };
                document.getElementById('btn-zoom-out').onclick = () => { currentScale = Math.max(currentScale - 0.15, 0.4); updateTransform(); };

                function openSector(data) {
                    sidebar.classList.add('active');
                    document.getElementById('hs-title').innerText = data.name;
                    hsBody.innerHTML = '';
                    if(data.sub.length === 0) {
                        hsBody.innerHTML = '<div style="color:#666; font-size:11px;">NO DATA</div>';
                    } else {
                        data.sub.forEach(planet => {
                            const div = document.createElement('div');
                            const isRebelHeld = planet.status.includes("REBEL");
                            div.className = `hs-card ${isRebelHeld ? 'hostile-rebel' : ''}`;
                            div.innerHTML = `<img src="${planet.image}"><div class="hs-info"><div class="hs-name">${planet.title}</div><div class="hs-meta">${planet.stats.TERRAIN || 'Unknown'}</div></div>`;
                            div.onclick = () => openDossier(planet);
                            hsBody.appendChild(div);
                        });
                    }
                }
                document.getElementById('hs-close').onclick = () => sidebar.classList.remove('active');
            }
        }
        render();
    }
})();