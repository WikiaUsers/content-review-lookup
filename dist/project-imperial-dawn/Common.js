(function() {
    // --- 1. SAFE LOADER (Fandom Optimized) ---
    let loadAttempts = 0;
    const checkExist = setInterval(function() {
        const root = document.getElementById('imperial-terminal-root');
        if (root) {
            clearInterval(checkExist);
            initImperialHolomap(root);
        }
        // Safety feature: Stop checking after 10 seconds so it doesn't lag other wiki pages
        if (++loadAttempts > 100) clearInterval(checkExist); 
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
                        date: "MAY 4TH, 2026",
                        title: "MAY THE FOURTH BE WITH YOU",
                        content: "This global holiday started as a clever pun by fans on the iconic Jedi phrase, May the Force be with you. The joke actually dates all the way back to 1979, when a UK newspaper used May the Fourth Be with You to congratulate Margaret Thatcher (old UK PM) on taking office, and it eventually evolved into the massive worldwide celebration of the saga we know today.",
                        image: "https://project-imperial-dawn.fandom.com/special:filepath/4th.png",
                        tag: "OFFICIAL"
                    }
                ]
            },
            "Credits": { 
                type: "credits_view", 
                title: "AUTHORIZED PERSONNEL // SYSTEM LOGISTICS",
                data: [
                    { name: "NICOZZ06", role: "WIKI MANAGER", desc: "Project Imperial Dawn Wiki Architecture & Central Database Management.", sub: "LOGISTICS" }
                ]
            },
            "Patreon": {
                type: "pd_document", 
                title: "PATREON & SUBSCRIPTIONS",
                subtitle: "SUPPORT THE PROJECT // PRIORITY ACCESS",
                sections: [
                    { 
                        header: "OVERVIEW", 
                        content: "<strong>Hello!</strong> Thank you for exploring how you can support Project: Imperial Dawn.<br><br>We invite you to join us as a donor to help ensure the continued success of our mission.<br><br><strong>Where are the subscriptions located?</strong><br>• <strong>Tier I</strong> can be purchased in the main game store.<br>• <strong>Tier II+</strong> should be purchased on our official Patreon.<br><br><a href=\"https://www.patreon.com/6093610/join\" target=\"_blank\" style=\"display:inline-block; margin-top:10px; padding:12px 24px; background:rgba(0,229,255,0.1); border:1px solid var(--imp-blue); color:var(--imp-blue); text-decoration:none; font-weight:900; letter-spacing:2px; text-transform:uppercase; box-shadow:0 0 15px rgba(0,229,255,0.2);\">ACCESS PATREON PORTAL</a>" 
                    },
                    { 
                        header: "TIER I - $4.99/MONTH", 
                        content: "• Priority placement in wave review queue<br>• Earlier review window (different wave request channel access)<br>• Subscriber applicant role" 
                    },
                    { 
                        header: "TIER II - $15.99/MONTH", 
                        content: "• All Tier I benefits<br>• Placement on purge trooper waitlist<br>• Access to closed game testing<br>• Pre-development sneak peaks" 
                    },
                    { 
                        header: "TIER III - $25.99/MONTH", 
                        content: "• All Tier II benefits<br>• Access to senate building (when applicable)<br>• Participating in senate hearing and observations (non voting)<br>• Lore influence visibility (feedback considered)" 
                    },
                    { 
                        header: "TIER IV - $49.99/MONTH", 
                        content: "• All Tier III benefits<br>• Guaranteed placement on inquisitor waitlist<br>• Command visibility for force sensitive arcs" 
                    },
                    {
                        header: "TIER V - $69.99/MONTH",
                        content: "• All Tier IV Benefits (Inquisition Waitlist Excluded, Purge Trooper Waitlist Only)<br>• Guaranteed Placement on the CX Clone Assassins Waitlist<br>• Intelligence Visibility in Security Story Arcs<br>• Elite Insider Access to upcoming high-level systems and expansions"
                    }
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
                        title: "OPERATION NIGHTFALL", 
                        loc: "CORUSCANT, JEDI TEMPLE", 
                        date: "19 BBY", 
                        status: "CHAPTER 1", 
                        theme: "empire",
                        desc: "The Republic has fallen. The fires of the Jedi Temple still burn against the Coruscant sky. But from the ruins of the old world, a relentless new order is rising and it is time the galaxy bears witness to its dawn... Imperial Dawn.",
                        image: "https://project-imperial-dawn.fandom.com/special:filepath/templeonfire.png" 
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
                    { title: "GALACTIC EMPEROR", sub: "LORDNUEHL", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/EmperorTest1.webp", stats: { "HOME": "NABOO", "SPECIES": "HUMAN" }, bio: "Sheev Palpatine restored the galaxy to order." },
                    { title: "LORD VADER", sub: "Hatterbyte", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/Lordvader.png", stats: { "HOME": "TATOOINE", "SPECIES": "HUMAN (CYBORG)" }, bio: "The Chosen One and the iron fist of the Empire, tasked with hunting down the last of the Jedi." },
                    { title: "GRAND VIZIER", sub: "risingkalevos", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/GrandVizier.webp", stats: { "HOME": "CHAMPALA", "SPECIES": "CHAGRIAN" }, bio: "The chief administrator of the Galactic Empire and one of the few who knew the Emperor’s darkest secrets." },
                    { title: "LORD COMMANDANT", sub: "skyrider05", status: "IMPERIAL THRONE", image: "https://project-imperial-dawn.fandom.com/special:filepath/Sover.png", stats: { "HOME": "YINCHORR", "SPECIES": "HUMAN" }, bio: "The silent sentinel charged with the personal safety of the Emperor." },
                    { title: "GRAND MOFF", sub: "UmbraVokrium", status: "IMPERIAL GOVERNMENT", image: "https://project-imperial-dawn.fandom.com/special:filepath/Tarkin.png", stats: { "HOME": "ERIADU", "SPECIES": "HUMAN" }, bio: "Architect of the Tarkin Doctrine, he rules through the fear of force rather than force itself." },
                    { title: "GRAND INQUISITOR", sub: "IcarusApeiros", status: "IMPERIAL INQUISITION", image: "https://project-imperial-dawn.fandom.com/special:filepath/GrandInquisitor.png", stats: { "HOME": "UTAPAU", "SPECIES": "PA'AN" }, bio: "A former Jedi Temple Guard turned dark side hunter." }
                ]
            },
            "Lore Characters": { 
                type: "cards_filter", 
                categories: ["EMPIRE", "REBEL", "OTHERS"],
                data: [
                    { category: "EMPIRE", header: "IMPERIAL SECURITY BUREAU", items: [ { title: "DIRECTOR/COLONEL", sub: "Wullf Yularen", status: "IMPERIAL SECURITY BUREAU", stats: { "HOME": "ANAXES", "SPECIES": "HUMAN" }, bio: "The person behind the imperial intelligence." } ] },
                    { category: "EMPIRE", header: "IMPERIAL ARMY", items: [ { title: "GRAND GENERAL", sub: "Cassio Tagge", status: "IMPERIAL ARMY", stats: { "HOME": "TEPANI SECTOR", "SPECIES": "HUMAN" }, bio: "A pragmatic military strategist that leads the Imperial Army branch." }, { title: "COLONEL", sub: "Vanis Tigo // NICOZZ06", status: "IMPERIAL ARMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "A rigid Imperial officer that leads the 14th Security Division." }, { title: "COLONEL", sub: "Iree Falk", status: "IMPERIAL ARMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "An Imperial officer that leads the 224th Imperial Armored Division." } ] },
                    { category: "EMPIRE", header: "IMPERIAL NAVY", items: [ { title: "GRAND ADMIRAL", sub: "Conan Motti", status: "IMPERIAL NAVY", stats: { "HOME": "SESWENNA SECTOR", "SPECIES": "HUMAN" }, bio: "Chief of the Imperial Navy." }, { title: "ADMIRAL", sub: "Jok Donassius", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "Decorated naval strategist in charge of a sector." }, { title: "VICE ADMIRAL", sub: "Gilad Pallaeon", status: "IMPERIAL NAVY", stats: { "HOME": "CORELLIA", "SPECIES": "HUMAN" }, bio: "A veteran that is the right hand of the Fleet Admiral." }, { title: "COMMODORE", sub: "Mitth'raw'nuruodo", status: "IMPERIAL NAVY", stats: { "HOME": "CSILLA", "SPECIES": "CHISS" }, bio: "A brilliant military polymath who studies the art of his adversaries, in charge of a fleet." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer that leads the first fleet." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer in charge of an ISD." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "IMPERIAL NAVY", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "An Imperial officer in charge of an ISD." } ] },
                    { category: "EMPIRE", header: "STORMTROOPER CORPS", items: [ { title: "CORPS-GENERAL", sub: "Trech Molock", status: "STORMTROOPER CORPS", stats: { "HOME": "CORELLIA", "SPECIES": "HUMAN" }, bio: "The person in charge of the stormtrooper corps/TK program." }, { title: "COLONEL", sub: "Cody", status: "STORMTROOPER CORPS", stats: { "HOME": "KAMINO", "SPECIES": "HUMAN (CLONE)" }, bio: "The person in charge of the First Legion, Vader's personal." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Scout troopers." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Shock troopers." }, { title: "COLONEL", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the Death troopers." }, { title: "CAPTAIN", sub: "UNKNOWN", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "The person in charge of the EVO Troopers." }, { title: "LEAD INSTRUCTOR", sub: "IC-1262", status: "STORMTROOPER CORPS", stats: { "HOME": "KAMINO", "SPECIES": "HUMAN (CLONE)" }, bio: "The person in charge of the STC trainings." }, { title: "INSTRUCTOR", sub: "IC-6214", status: "STORMTROOPER CORPS", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN (CLONE)" }, bio: "Program instructor for the STC trainings." } ] },
                    { category: "EMPIRE", header: "IMPERIAL ACADEMY", items: [ { title: "COMMANDANT", sub: "Cumberlayne Aresko", status: "IMPERIAL ACADEMY", stats: { "HOME": "UNKNOWN", "SPECIES": "HUMAN" }, bio: "The person in charge of the cadet and army academy." } ] },
                    { category: "REBEL", header: "ALLIANCE HIGH COMMAND", items: [ { title: "SENATOR", sub: "Mon Mothma", status: "REBEL LEADER", stats: { "HOME": "CHANDRILA", "SPECIES": "HUMAN" }, bio: "A political leader working in secret to unite the rebel cells." }, { title: "SENATOR", sub: "Bail Organa", status: "REBEL LEADER", stats: { "HOME": "ALDERAAN", "SPECIES": "HUMAN" }, bio: "Viceroy of Alderaan and a key architect of the Rebellion." } ] },
                    { category: "REBEL", header: "STARFIGHTER CORPS", items: [ { title: "COMMANDER", sub: "Garven Dreis", status: "RED LEADER", stats: { "HOME": "VIRUJJSI", "SPECIES": "HUMAN" }, bio: "Veteran pilot leading Red Squadron." } ] },
                    { category: "OTHERS", header: "XIZOR TRANSPORT SYSTEMS", items: [ { title: "PRINCE XIZOR", sub: "FOUNDER", status: "XT SYSTEMS", stats: { "HOME": "FALLEEN", "SPECIES": "FALLEEN" }, bio: "Prince Xizor is the founder and owner of Xizor Transport Systems, a major interstellar shipping conglomerate headquartered on Coruscant. The corporation serves as a legitimate public enterprise, allowing Xizor to operate openly within elite political and economic circles while maintaining significant influence across galactic trade networks." } ] },
                    { category: "OTHERS", header: "UNAFFILIATED / UNKNOWN", items: [ { title: "BOUNTY HUNTER", sub: "Cad Bane", status: "WANTED", stats: { "HOME": "DURO", "SPECIES": "DUROS" }, bio: "A ruthless mercenary known for taking on high-profile jobs." }, { title: "SMUGGLER", sub: "Unknown ID", status: "NEUTRAL", stats: { "HOME": "UNKNOWN", "SPECIES": "UNKNOWN" }, bio: "Operating in the Outer Rim sectors." } ] }
                ]
            },
            "Custom Characters": { 
                type: "cards", 
                data: [
                    { title: "Enter Full Name", sub: "Janitor", status: "APPROVED", stats: { "SPECIES": "Human", "HOMEWORLD": "Coruscant", "ROBLOX PROFILE LINK": "https://www.roblox.com/users/" }, bio: "Service history..." }
                ]
            }
        },
        "KNOWN GALAXY": {
            "Group Onboarding": {
                type: "onboarding",
                steps: [
                    {
                        id: "initiation",
                        title: "INITIATION PROTOCOL",
                        desc: "Welcome to the official onboarding terminal. You are about to enter a highly structured, immersive roleplay environment set during the dawn of the Galactic Empire.<br><br>This terminal contains classified structural data. Familiarize yourself with the chain of command, operational branches, and engagement rules before deployment.",
                        widgets: [
                            { label: "ENVIRONMENT", text: "High-stakes, lore-accurate military simulation." },
                            { label: "LEADERSHIP", text: "Governed under the absolute authority of Emperor LordNuehl." }
                        ]
                    },
                    {
                        id: "empire",
                        title: "THE GALACTIC EMPIRE",
                        desc: "The supreme governing body of the galaxy. Below is the complete structural organization of Imperial forces and administration.",
                        interactive: "nested_accordion",
                        groups: [
                            {
                                title: "IMPERIAL ARMY",
                                desc: "The primary ground enforcement and planetary occupation force.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "14th Security Division", text: "The primary law enforcement and urban warfare division of the Empire. Tasked with planetary security, riot suppression, Senate protection, and operational support for the ISB." },
                                    { name: "224th Armored Division", text: "A heavy mechanized and infantry vanguard unit. Specializes in frontline combat, siege operations, combat engineering, and advanced planetary reconnaissance." }
                                ]
                            },
                            {
                                title: "STORMTROOPER CORPS",
                                desc: "Elite shock troops fanatically loyal to the New Order.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "501st Legion", text: "Vader's Fist. The elite spearhead infantry legion of the Empire, deployed for the most critical and dangerous frontline combat missions." },
                                    { name: "Death Troopers", text: "Classified, highly trained elite operatives serving as the personal death squads and bodyguards for high-ranking Imperial Intelligence officers." },
                                    { name: "Shock Troopers", text: "Heavy mechanized infantry and elite riot control forces, deployed to pacify planetary uprisings and secure high-value Imperial assets." },
                                    { name: "Scout Troopers", text: "Expert marksmen and light-armored pathfinders utilized for rapid planetary reconnaissance, sabotage, and forward observation." },
                                    { name: "EVO Troopers", text: "Specialized infantry trained to operate in the galaxy's most hostile environments, handling extreme biohazards, toxins, and lethal weather conditions." },
                                    { name: "41st Elite Legion", text: "Specialized infantry unit renowned for its unparalleled expertise in prolonged camouflage operations, jungle warfare, and hostile terrain survival." },
                                    { name: "212th Legion", text: "A heavily armed siege and assault division, renowned for breaking entrenched enemy positions and executing large-scale planetary invasions." },
                                    { name: "327th Legion", text: "Rugged, highly disciplined infantry forces specializing in securing and holding arid, desert, and sandy planetary environments across the Outer Rim." }
                                ]
                            },
                            {
                                title: "IMPERIAL NAVY",
                                desc: "The aerospace and fleet operations branch.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "Naval Crew Corps", text: "The backbone of the Imperial fleet, responsible for operating, maintaining, and commanding the Empire's vast armada of starships. Includes the 1st Fleet." },
                                    { name: "Starfighter Corps", text: "The aerospace combat branch of the Navy, commanding the Empire's immense force of TIE fighters and elite pilot squadrons (121st Wing, 182nd Wing, Titan Squadron)." },
                                    { name: "Naval Marine Commandos", text: "Elite specialized forces serving aboard naval vessels, tasked with ship-to-ship boarding actions and critical zero-gravity security operations." }
                                ]
                            },
                            {
                                title: "IMPERIAL SECURITY BUREAU (ISB)",
                                desc: "Intelligence and internal state security.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "Intelligence & Enforcement", text: "The primary intelligence and secret police organization of the Empire, dedicated to rooting out sedition, espionage, and ensuring total ideological loyalty." }
                                ]
                            },
                            {
                                title: "COMPNOR",
                                desc: "Commission for the Preservation of the New Order.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "Coalition of Progress", text: "The propaganda and cultural branch, shaping galactic public opinion and promoting the ideals of the New Order." },
                                    { name: "Coalition of Customs", text: "Responsible for the regulation of planetary borders, major trade checkpoints, and the strict management of local elections." },
                                    { name: "Coalition of Improvement", text: "The compliance and indoctrination branch, enforcing Imperial standards and ensuring sectors strictly adhere to Imperial law." },
                                    { name: "Coalition of Security", text: "The armed, paramilitary wing of COMPNOR, acting as a political police force entirely separate from the standard military branches." }
                                ]
                            },
                            {
                                title: "GOVERNMENT & ACADEMY",
                                desc: "Administration and training.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "Moffs Council", text: "The supreme political assembly governing the Empire's sectors. These elite administrators oversee planetary governors, manage critical supply chains, and dictate regional law." },
                                    { name: "Training & Doctrine", text: "The central military training institution of the Empire. It molds raw recruits into disciplined cadets, preparing them for service in the Army, Navy, or Stormtrooper Corps." }
                                ]
                            },
                            {
                                title: "THE THRONE",
                                desc: "Direct agents of the Emperor.",
                                color: "var(--imp-blue)",
                                items: [
                                    { name: "Imperial Guard", text: "The absolute pinnacle of Imperial security, sworn to the protection of the Emperor and the enforcement of his direct, unquestionable will. (Includes Royal Guard, Sovereign Protectors, and Shadow Guard)." }
                                ]
                            }
                        ]
                    },
                    {
                        id: "opposition",
                        title: "KNOWN THREATS",
                        desc: "The Empire faces constant opposition from criminal elements and remnants of fallen governments.",
                        interactive: "nested_accordion",
                        groups: [
                            {
                                title: "THE SYNDICATE",
                                desc: "Underworld alliance ruled by the renegade Sith Lord Maul.",
                                color: "var(--imp-purple)",
                                items: [
                                    { name: "Crimson Dawn", text: "A notoriously ruthless criminal organization that serves as the central pillar of Maul's underworld empire." },
                                    { name: "Black Sun", text: "A massive, galaxy-spanning syndicate with vast resources and formidable paramilitary forces." },
                                    { name: "Crymorah Syndicate", text: "A powerful crime family known for its deep connections within the galactic underworld and lucrative smuggling operations." },
                                    { name: "Hutt Clan", text: "The ancient, deeply entrenched criminal empire ruled by the Hutt Grand Council, controlling vast swaths of the Outer Rim." },
                                    { name: "Pyke Syndicate", text: "The premier distributors of illicit spice, holding a near-monopoly on the galaxy's most valuable narcotic trade." }
                                ]
                            },
                            {
                                title: "REMAINING CIS",
                                desc: "Fragmented holdouts from the Clone Wars.",
                                color: "var(--cis-blue)",
                                items: [
                                    { name: "Droid Remnants", text: "Leftover B1, B2, and specialized battle droids operating autonomously under lingering separatist directives." },
                                    { name: "Isolated Fleet Elements", text: "A handful of surviving CIS fleet assets still following outdated combat protocols." }
                                ]
                            }
                        ]
                    },
                    {
                        id: "permadeath",
                        title: "PERMANENT DEATH (PD)",
                        desc: "WARNING: Read carefully. Actions in this sector carry absolute finality.",
                        widgets: [
                            { label: "PHILOSOPHY & STAKES", text: "Permanent Death (PD) events are designed to be cinematic, high-stakes, and final. If you fall in a PD-designated event server, your character is permanently deleted." },
                            { label: "EVENT HOSTING", text: "PD events are hosted exclusively by the Lore Team. They can be Fully Scripted, Player-Action Based, or Hybrid. Unauthorized PD events are null and void." },
                            { label: "APPEALS", text: "All deaths are final, barring verified Server Disconnections, Development Errors (glitches), or Fail RP from another player." }
                        ]
                    },
                    {
                        id: "support",
                        title: "PATREON & CLEARANCE",
                        desc: "Support the ongoing development of Project: Imperial Dawn and gain priority clearance.",
                        widgets: [
                            { label: "TIER I ($4.99)", text: "Priority placement in wave review queue, earlier review windows, and Subscriber role." },
                            { label: "TIER II ($15.99)", text: "Placement on purge trooper waitlist, closed testing access, and sneak peeks." },
                            { label: "TIER V ($69.99)", text: "Guaranteed Placement on CX Clone Assassins Waitlist, Intelligence Visibility, and elite insider access." }
                        ],
                        html: "<br><a href='https://www.patreon.com/6093610/join' target='_blank' class='onb-patreon-btn'>ACCESS PATREON PORTAL</a>"
                    }
                ]
            },
            "Locations": { 
                type: "holomap", 
                data: [
                    { name: "CORUSCA SECTOR", startAngle: 0, endAngle: 32, desc: "Core Worlds // Capital System", sub: [ { title: "CORUSCANT", image: "https://project-imperial-dawn.fandom.com/special:filepath/Coruscant.png", status: "IMPERIAL OCCUPIED", stats: {"TERRAIN":"ECUMENOPOLIS", "SECTOR":"Corusca"}, bio: "The ecumenopolis capital of the Galactic Empire. The seat of Emperor Palpatine's power and the central hub of galactic governance." } ] },
                    { name: "MANDALA SECTOR", startAngle: 32, endAngle: 65, desc: "Outer Rim // Lothal System", sub: [ { title: "LOTHAL", image: "https://project-imperial-dawn.fandom.com/special:filepath/Lothal.png", status: "IMPERIAL OCCUPIED", stats: {"TERRAIN":"PLAINS/SPIRES", "SECTOR":"Mandala"}, bio: "A peaceful Outer Rim world heavily industrialized by the Empire. Now serving as the new Cadet Academy." } ] },
                    { name: "ATRAVIS SECTOR", startAngle: 65, endAngle: 98, desc: "Outer Rim // Mustafar System", sub: [ { title: "MUSTAFAR & NUR", image: "https://project-imperial-dawn.fandom.com/special:filepath/Mustafar.png", status: "IMPERIAL OCCUPIED", stats: {"TERRAIN":"VOLCANIC / OCEANIC", "SECTOR":"Atravis"}, bio: "A volatile, fire-scorched world and its water-rich moon. Home to Lord Vader's sanctum and the Fortress Inquisitorius." } ] },
                    { name: "OJOSTER SECTOR", startAngle: 98, endAngle: 130, desc: "Outer Rim // Wayland System", sub: [ { title: "TANTISS", image: "https://project-imperial-dawn.fandom.com/special:filepath/Wayland.png", status: "IMPERIAL OCCUPIED", stats: {"TERRAIN":"MOUNTAIN FACILITY", "SECTOR":"Ojoster"}, bio: "A highly classified Imperial mountain facility located on Wayland. It houses the Empire's most guarded secrets." } ] },
                    { name: "CHOMMELL SECTOR", startAngle: 130, endAngle: 163, desc: "Mid Rim // Naboo System", sub: [ { title: "NABOO", image: "https://project-imperial-dawn.fandom.com/special:filepath/Naboo.png", status: "CONTESTED", stats: {"TERRAIN":"LUSH PLANET", "SECTOR":"Chommell"}, bio: "A beautiful, pastoral world and the homeworld of Emperor Sheev Palpatine. Now engulfed in conflict." } ] },
                    { name: "ABRION SECTOR", startAngle: 163, endAngle: 196, desc: "Outer Rim // Kamino System", sub: [ { title: "KAMINO", image: "https://project-imperial-dawn.fandom.com/special:filepath/Kamino.png", status: "CONTESTED", stats: {"TERRAIN":"OCEANIC", "SECTOR":"Abrion"}, bio: "An aquatic planet known for its cloning facilities. Currently a highly contested battleground." } ] },
                    { name: "MYTARANOR SECTOR", startAngle: 196, endAngle: 229, desc: "Mid Rim // Wookiee Homeworlds", sub: [ { title: "KASHYYYK", image: "https://project-imperial-dawn.fandom.com/special:filepath/Kashyyyk.png", status: "CONTESTED", stats: {"TERRAIN":"JUNGLE/WROSHYR FORESTS", "SECTOR":"Mytaranor"}, bio: "A lush, forest-covered world and home to the Wookiees. Currently caught in a fierce planetary struggle." } ] },
                    { name: "DOLDUR SECTOR", startAngle: 229, endAngle: 261, desc: "Expansion Region // Ghost Nebula", sub: [ { title: "UMBARA", image: "https://project-imperial-dawn.fandom.com/special:filepath/Umbara.png", status: "CONTESTED", stats: {"TERRAIN":"SHADOW WORLD", "SECTOR":"Doldur"}, bio: "A dark world shrouded in perpetual gloom, home to advanced technology and fierce resistance." } ] },
                    { name: "GAULUS SECTOR", startAngle: 261, endAngle: 294, desc: "Outer Rim // Ryloth System", sub: [ { title: "RYLOTH", image: "https://project-imperial-dawn.fandom.com/special:filepath/Ryloth.png", status: "CONTESTED", stats: {"TERRAIN":"DESERT/CANYONS", "SECTOR":"Gaulus"}, bio: "The harsh, rocky homeworld of the Twi'leks, known for its fierce freedom fighters and contested territories." } ] },
                    { name: "THANIUM SECTOR", startAngle: 294, endAngle: 327, desc: "Outer Rim // Felucia System", sub: [ { title: "FELUCIA", image: "https://project-imperial-dawn.fandom.com/special:filepath/Felucia.png", status: "CONTESTED", stats: {"TERRAIN":"FUNGAL JUNGLE", "SECTOR":"Thanium"}, bio: "A vibrant, wildly overgrown world teeming with giant fungal life and dangerous predators." } ] },
                    { name: "BRIGHT JEWEL SECTOR", startAngle: 327, endAngle: 360, desc: "Mid Rim // Ord Mantell System", sub: [ { title: "ORD MANTELL", image: "https://project-imperial-dawn.fandom.com/special:filepath/Syndacate.png", status: "SYNDICATE OCCUPIED", stats: {"TERRAIN":"SCRAP/MOUNTAINS", "SECTOR":"Bright Jewel"}, bio: "A haven for bounty hunters, smugglers, and criminal organizations. Currently under Syndicate control." } ] }
                ]
            }
        }
    };

    const QUICK_LINKS = [
        { label: "DISCORD", url: "https://discord.gg/imperialdawn" },
        { label: "ROBLOX GROUP", url: "https://www.roblox.com/communities/130610862/Project-Imperial-Dawn#!/about" },
        { label: "GAME LAUNCH", url: "YOUR_GAME_LINK" }
    ];

    // --- 3. FACTION CONFIGURATION (EASY TO EDIT) ---
    const FACTION_CONFIG = [
        { keyword: "CONTESTED", theme: "war-theme", poly: "war-held", pin: "war" },
        { keyword: "REBEL", theme: "hostile-rebel", poly: "rebel-held", pin: "rebel" },
        { keyword: "SYNDICATE", theme: "syndicate-theme", poly: "syndicate-held", pin: "syndicate" },
        { keyword: "IMPERIAL", theme: "empire-theme", poly: "empire-held", pin: "empire" },
        { keyword: "EMPIRE", theme: "empire-theme", poly: "empire-held", pin: "empire" },
        { keyword: "CIS", theme: "cis-theme", poly: "cis-held", pin: "cis" }
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
                --imp-purple: #b026ff; 
                --cis-blue: #4488ff;
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

            /* --- TERMINAL ONBOARDING (NEW) --- */
            .onb-terminal { display: flex; width: 100%; min-height: 600px; background: rgba(0,5,10,0.8); border: 1px solid var(--imp-border); box-shadow: inset 0 0 50px rgba(0,229,255,0.05); }
            .onb-nav { width: 300px; border-right: 1px solid var(--imp-border); display: flex; flex-direction: column; background: rgba(0,0,0,0.5); flex-shrink: 0; }
            .onb-nav-item { padding: 20px 25px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; color: #888; font-weight: 800; letter-spacing: 2px; transition: 0.3s; display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
            .onb-nav-item:hover { background: rgba(0,229,255,0.05); color: #fff; padding-left: 30px; }
            .onb-nav-item.active { background: linear-gradient(90deg, rgba(0,229,255,0.15), transparent); color: var(--imp-blue); border-left: 4px solid var(--imp-blue); }
            .onb-content-area { flex: 1; padding: 50px; position: relative; overflow-y: auto; background: radial-gradient(circle at center, rgba(0,40,60,0.4), transparent); }
            .onb-header { font-size: 32px; color: #fff; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 15px; text-shadow: 0 0 15px rgba(0,229,255,0.4); }
            .onb-desc { font-size: 15px; color: #cceeff; line-height: 1.8; margin-bottom: 40px; }

            .onb-widget-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .onb-widget { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-left: 3px solid var(--imp-blue); }
            .onb-widget-label { font-size: 11px; color: var(--imp-blue); font-weight: 900; letter-spacing: 2px; margin-bottom: 10px; }
            .onb-widget-text { font-size: 14px; color: #aaa; line-height: 1.6; }

            /* NESTED ACCORDIONS */
            .onb-nested-grid { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
            .onb-group-card { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; }
            .onb-group-header { font-size: 18px; font-weight: 900; color: #fff; letter-spacing: 2px; margin-bottom: 5px; }
            .onb-group-desc { font-size: 12px; color: #888; margin-bottom: 15px; line-height: 1.5; }
            .onb-group-items { display: flex; flex-direction: column; gap: 8px; }

            .onb-acc-item { border: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.6); }
            .onb-acc-header { padding: 12px 15px; cursor: pointer; color: #cceeff; font-size: 13px; font-weight: bold; display: flex; justify-content: space-between; transition: 0.3s; }
            .onb-acc-header:hover { background: rgba(0,229,255,0.1); color: #fff; }
            .onb-acc-header.open { background: rgba(0,229,255,0.15); color: #fff; border-bottom: 1px solid rgba(0,229,255,0.2); }
            .onb-acc-content { display: none; padding: 15px; font-size: 13px; color: #a0d0e0; line-height: 1.6; border-left: 2px solid var(--imp-blue); background: rgba(0,0,0,0.3); }

            .onb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .onb-grid-card { border: 1px solid rgba(0,229,255,0.2); background: linear-gradient(135deg, rgba(0,20,35,0.6), rgba(0,5,10,0.9)); padding: 25px; transition: 0.3s; position: relative; overflow: hidden; }
            .onb-grid-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,229,255,0.15); border-color: var(--imp-blue); }
            .onb-grid-icon { font-size: 24px; color: var(--imp-blue); margin-bottom: 15px; opacity: 0.8; }
            .onb-grid-title { font-size: 16px; font-weight: 900; color: #fff; letter-spacing: 1.5px; margin-bottom: 10px; text-transform: uppercase; }
            .onb-grid-text { font-size: 13px; color: #a0d0e0; line-height: 1.6; }

            .onb-patreon-btn { display: inline-block; padding: 15px 30px; background: rgba(0,229,255,0.15); border: 1px solid var(--imp-blue); color: var(--imp-blue); font-weight: 900; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; transition: 0.3s; clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%); }
            .onb-patreon-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 25px var(--imp-blue); }

            /* --- CREDITS VIEW (NEW) --- */
            .credits-container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
            .credit-card { display: flex; align-items: center; border: 1px solid rgba(0,229,255,0.2); border-left: 4px solid var(--imp-blue); background: linear-gradient(90deg, rgba(0,229,255,0.05), rgba(0,10,20,0.8)); padding: 30px; backdrop-filter: blur(10px); transition: 0.3s; position: relative; overflow: hidden; }
            .credit-card::before { content:''; position:absolute; right:0; top:0; height:100%; width:150px; background: repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,229,255,0.03) 2px, rgba(0,229,255,0.03) 4px); pointer-events:none; }
            .credit-card:hover { border-color: var(--imp-blue); box-shadow: 0 0 30px rgba(0,229,255,0.15); transform: translateX(10px); background: linear-gradient(90deg, rgba(0,229,255,0.1), rgba(0,10,20,0.9)); }
            .c-icon { width: 60px; height: 60px; border-radius: 4px; background: rgba(0,0,0,0.5); border: 1px solid var(--imp-blue); display: flex; align-items: center; justify-content: center; color: var(--imp-blue); font-size: 24px; font-weight: 900; flex-shrink: 0; margin-right: 30px; box-shadow: inset 0 0 15px rgba(0,229,255,0.2); font-family: monospace; }
            .c-info { flex: 1; z-index: 2; }
            .c-name { font-size: 24px; font-weight: 900; color: #fff; letter-spacing: 3px; margin-bottom: 4px; }
            .c-role { font-size: 11px; color: var(--imp-blue); font-weight: bold; letter-spacing: 4px; margin-bottom: 10px; display: inline-block; padding: 4px 8px; background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.2); }
            .c-desc { font-size: 14px; color: #b0d0e0; line-height: 1.6; }

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

            /* --- DOSSIER & POPUPS --- */
            .dossier-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,5,10,0.85); backdrop-filter: blur(15px); z-index: 2000; display: flex; justify-content: center; align-items: center; animation: fade-in 0.3s ease-out; padding: 20px; box-sizing: border-box; }
            
            .dossier-box { width: 850px; max-width: 90vw; height: auto; max-height: 85vh; background: var(--glass-bg); border: 1px solid var(--imp-blue); display: flex; box-shadow: 0 20px 80px rgba(0,0,0,0.9), 0 0 50px rgba(0,229,255,0.2); position: relative; animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            @keyframes scale-up { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            
            .dossier-close { position: absolute; top: 20px; right: 25px; color: #fff; font-size: 24px; cursor: pointer; opacity: 0.6; transition: 0.3s; z-index: 50; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); }
            .dossier-close:hover { opacity: 1; color: var(--imp-dark); background: var(--imp-blue); box-shadow: 0 0 15px var(--imp-blue); }
            
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
            
            .dossier-box.no-img { width: 650px; }
            .dossier-box.no-img .dossier-img { display: none; }
            .dossier-box.no-img .dossier-data { width: 100%; border-left: none; }

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

            /* --- PREMIUM HOLOMAP (CONCENTRIC RINGS REWORK) --- */
            .holomap-wrapper * { box-sizing: border-box !important; } 
            
            .holomap-wrapper { position: relative; width: 100%; height: 100%; min-height: 800px; flex: 1; overflow: hidden; background: radial-gradient(circle at center, #00101c 0%, #000000 100%); display: flex; align-items: center; justify-content: center; perspective: 1200px; z-index: 1; border-top: 1px solid var(--imp-border); box-shadow: inset 0 0 150px rgba(0,229,255,0.05); }
            
            .nebula-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 30% 40%, rgba(120, 40, 180, 0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(40, 120, 200, 0.1) 0%, transparent 40%), radial-gradient(circle at 40% 70%, rgba(200, 50, 80, 0.1) 0%, transparent 40%); mix-blend-mode: screen; pointer-events: none; z-index: 0; }
            
            .map-legend { position: absolute; top: 20px; left: 20px; background: rgba(0,10,20,0.85); border: 1px solid rgba(0,229,255,0.4); padding: 15px 20px; border-radius: 6px; z-index: 600; backdrop-filter: blur(12px); color: #fff; font-size: 11px; font-weight: bold; letter-spacing: 2px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); pointer-events: auto; }
            .legend-header { cursor: pointer; user-select: none; font-size: 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px; margin-bottom: 8px; color: var(--imp-blue); }
            .legend-content { display: block; overflow: hidden; }
            .legend-content div { margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
            .legend-content div:last-child { margin-bottom: 0; }

            .map-top-bar { position: absolute; top: 20px; right: 20px; z-index: 600; display: flex; flex-direction: column; gap: 15px; align-items: flex-end; transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            
            .holomap-wrapper.sidebar-open .map-top-bar { right: 360px; }
            
            .faction-filters { display: flex; gap: 8px; background: rgba(0,10,20,0.8); padding: 8px; border: 1px solid rgba(0,229,255,0.4); border-radius: 6px; backdrop-filter: blur(12px); box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
            .f-btn { padding: 6px 12px; font-size: 10px; font-weight: 900; color: #888; border: 1px solid #555; cursor: pointer; transition: 0.3s; letter-spacing: 1px; margin: 0 !important; }
            .f-btn:hover, .f-btn.active { background: rgba(255,255,255,0.1); color: #fff; border-color: #fff; }
            .f-btn[data-faction="empire"].active { background: rgba(0,229,255,0.2); color: var(--imp-blue); border-color: var(--imp-blue); box-shadow: 0 0 10px var(--imp-blue); }
            .f-btn[data-faction="rebel"].active { background: rgba(255,51,51,0.2); color: var(--imp-red); border-color: var(--imp-red); box-shadow: 0 0 10px var(--imp-red); }
            .f-btn[data-faction="syndicate"].active { background: rgba(176,38,255,0.2); color: var(--imp-purple); border-color: var(--imp-purple); box-shadow: 0 0 10px var(--imp-purple); }
            .f-btn[data-faction="war"].active { background: rgba(255,204,0,0.2); color: var(--imp-gold); border-color: var(--imp-gold); box-shadow: 0 0 10px var(--imp-gold); }
            .f-btn[data-faction="cis-held"].active { background: rgba(68,136,255,0.2); color: var(--cis-blue); border-color: var(--cis-blue); box-shadow: 0 0 10px var(--cis-blue); }

            .map-search-box { position: relative; width: 250px; }
            #map-search { width: 100%; background: rgba(0,10,20,0.8); border: 1px solid rgba(0,229,255,0.4); padding: 10px 15px; color: #fff; font-family: monospace; font-size: 12px; outline: none; border-radius: 6px; backdrop-filter: blur(12px); transition: 0.3s; margin: 0 !important; }
            #map-search:focus { border-color: var(--imp-blue); box-shadow: 0 0 15px rgba(0,229,255,0.3); }
            .search-results { position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: rgba(0,10,20,0.95); border: 1px solid var(--imp-blue); max-height: 200px; overflow-y: auto; display: none; z-index: 610; }
            .search-results.active { display: block; }
            .sr-item { padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer; font-size: 11px; color: #cceeff; display: flex; justify-content: space-between; align-items: center; }
            .sr-item:hover { background: rgba(0,229,255,0.2); color: #fff; }
            .sr-planet { font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
            .sr-sector { font-size: 9px; color: #888; text-transform: uppercase; }
            
            .dimmed { opacity: 0.05 !important; pointer-events: none !important; filter: grayscale(100%); }

            .holo-projector-beam { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 800px; height: 50%; background: linear-gradient(to top, rgba(0,229,255,0.08) 0%, transparent 100%); clip-path: polygon(30% 100%, 70% 100%, 100% 0, 0 0); pointer-events: none; z-index: 0; }
            
            .holo-stage { 
                position: absolute; 
                top: 50%; left: 50%; 
                margin-top: -400px; margin-left: -400px; 
                width: 800px; height: 800px; 
                transform-style: preserve-3d; 
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); 
                z-index: 2; 
                will-change: transform; 
                transform-origin: center center; 
            }
            
            .radar-sweep { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 70%, rgba(0, 229, 255, 0.2) 100%); animation: radar-spin 6s linear infinite; pointer-events: none; z-index: 1.5; mix-blend-mode: screen; border: 1px solid rgba(0,229,255,0.1); }
            @keyframes radar-spin { 100% { transform: rotate(360deg); } }

            .holo-base { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(0,229,255,0.3); background: radial-gradient(circle at center, rgba(30, 40, 60, 0.6) 0%, rgba(10, 15, 25, 0.8) 40%, rgba(0, 0, 0, 0.9) 70%); box-shadow: inset 0 0 80px rgba(0,229,255,0.2), 0 0 40px rgba(0,229,255,0.2); z-index: 1; transform-style: preserve-3d; }
            
            .holo-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 250px; height: 250px; border-radius: 50%; background: radial-gradient(circle, #ffffff 0%, rgba(0,229,255,0.8) 15%, rgba(0,229,255,0.2) 50%, transparent 100%); z-index: 2; pointer-events: none; }
            
            .holo-svg-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
            .layer-bottom { transform: translateZ(3px); filter: blur(4px); opacity: 0.5; }
            .layer-top { transform: translateZ(8px); pointer-events: visiblePainted; z-index: 10; }

            .sector-poly { 
                fill: rgba(255, 255, 255, 0.02); 
                stroke: rgba(255, 255, 255, 0.2); 
                stroke-width: 0.5px; 
                stroke-linejoin: round; 
                transition: all 0.3s ease-out; 
                vector-effect: non-scaling-stroke; 
            }
            
            .sector-poly.grid-filler { fill: rgba(255,255,255,0.01); stroke: rgba(255,255,255,0.15); stroke-width: 1px; pointer-events: none; }
            
            .sector-poly.unknown-sector { fill: rgba(255,255,255,0.03); stroke: rgba(255,255,255,0.3); stroke-width: 0.5px; }
            .sector-poly.unknown-sector.hovered { fill: rgba(255,255,255,0.15); stroke: rgba(255,255,255,0.8); stroke-width: 1.5px; }

            .sector-poly.empire-held { fill: rgba(0, 229, 255, 0.15); stroke: rgba(0, 229, 255, 1); stroke-width: 2.5px; cursor: pointer; pointer-events: all; filter: drop-shadow(0 0 5px rgba(0, 229, 255, 0.5)); }
            .sector-poly.empire-held.hovered { fill: rgba(0, 229, 255, 0.4); stroke: #fff; stroke-width: 3.5px; filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.8)); }

            .sector-poly.syndicate-held { fill: rgba(176, 38, 255, 0.15); stroke: rgba(176, 38, 255, 1); stroke-width: 2.5px; cursor: pointer; pointer-events: all; filter: drop-shadow(0 0 5px rgba(176, 38, 255, 0.5)); }
            .sector-poly.syndicate-held.hovered { fill: rgba(176, 38, 255, 0.4); stroke: #fff; stroke-width: 3.5px; filter: drop-shadow(0 0 10px rgba(176, 38, 255, 0.8)); }

            .sector-poly.rebel-held { fill: rgba(255, 50, 50, 0.15); stroke: rgba(255, 50, 50, 1); stroke-width: 2.5px; cursor: pointer; pointer-events: all; filter: drop-shadow(0 0 5px rgba(255, 50, 50, 0.5)); }
            .sector-poly.rebel-held.hovered { fill: rgba(255, 50, 50, 0.4); stroke: #fff; stroke-width: 3.5px; filter: drop-shadow(0 0 10px rgba(255, 50, 50, 0.8)); }

            .sector-poly.war-held { fill: rgba(255, 204, 0, 0.15); stroke: rgba(255, 204, 0, 1); stroke-width: 2.5px; cursor: pointer; pointer-events: all; filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.5)); }
            .sector-poly.war-held.hovered { fill: rgba(255, 204, 0, 0.4); stroke: #fff; stroke-width: 3.5px; filter: drop-shadow(0 0 10px rgba(255, 204, 0, 0.8)); }

            .sector-poly.cis-held { fill: rgba(68, 136, 255, 0.15); stroke: rgba(68, 136, 255, 1); stroke-width: 2.5px; cursor: pointer; pointer-events: all; filter: drop-shadow(0 0 5px rgba(68, 136, 255, 0.5)); }
            .sector-poly.cis-held.hovered { fill: rgba(68, 136, 255, 0.4); stroke: #fff; stroke-width: 3.5px; filter: drop-shadow(0 0 10px rgba(68, 136, 255, 0.8)); }

            .holo-pin { position: absolute; width: 0; height: 0; z-index: 30; pointer-events: none; transform-style: preserve-3d; }
            .holo-pin:hover { z-index: 100; }
            
            .pin-wrapper { position: absolute; bottom: 0; left: -100px; width: 200px; transform-style: preserve-3d; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; transform-origin: bottom center; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); pointer-events: none; will-change: transform; z-index: 1; }
            
            .pin-label { 
                background: rgba(5, 10, 15, 0.95) !important; 
                border: 1px solid rgba(255, 255, 255, 0.15) !important; 
                color: #ffffff !important; 
                font-size: 13px !important; 
                font-weight: 800 !important; 
                font-family: 'Segoe UI', Arial, sans-serif !important;
                letter-spacing: 1.5px !important; 
                padding: 6px 14px !important; 
                margin-bottom: 12px !important; 
                box-shadow: 0px 8px 20px rgba(0,0,0,0.8) !important; 
                white-space: nowrap !important; 
                text-transform: uppercase !important; 
                border-radius: 4px !important; 
                line-height: 1 !important;
                -webkit-font-smoothing: antialiased !important;
                text-rendering: optimizeLegibility !important;
                pointer-events: auto !important;
                text-shadow: none !important; 
            }
            .pin-stem { width: 2px !important; height: 40px !important; background: linear-gradient(to top, rgba(0,229,255,0.9), transparent) !important; }
            
            .holo-pin.rebel .pin-label { border-bottom: 3px solid var(--imp-red) !important; }
            .holo-pin.rebel .pin-stem { background: linear-gradient(to top, rgba(255,51,51,0.9), transparent) !important; }

            .holo-pin.empire .pin-label { border-bottom: 3px solid var(--imp-blue) !important; }
            .holo-pin.empire .pin-stem { background: linear-gradient(to top, rgba(0,229,255,0.9), transparent) !important; }

            .holo-pin.syndicate .pin-label { border-bottom: 3px solid var(--imp-purple) !important; }
            .holo-pin.syndicate .pin-stem { background: linear-gradient(to top, rgba(176, 38, 255, 0.9), transparent) !important; }

            .holo-pin.war .pin-label { border-bottom: 3px solid var(--imp-gold) !important; }
            .holo-pin.war .pin-stem { background: linear-gradient(to top, rgba(255,204,0,0.9), transparent) !important; }

            .holo-pin.cis .pin-label { border-bottom: 3px solid var(--cis-blue) !important; }
            .holo-pin.cis .pin-stem { background: linear-gradient(to top, rgba(68,136,255,0.9), transparent) !important; }

            .holo-pin.neutral .pin-label { border-bottom: 3px solid #fff !important; }
            .holo-pin.neutral .pin-stem { background: linear-gradient(to top, rgba(255,255,255,0.7), transparent) !important; }

            .star-field { position: absolute; top: -500px; left: -500px; width: 2000px; height: 2000px; pointer-events: none; transform-style: preserve-3d; z-index: 0; }
            .h-star { position: absolute; background: #fff; width: 2px; height: 2px; opacity: 0.6; border-radius: 50%; box-shadow: 0 0 4px #fff; }

            .planet-sphere { width: 16px; height: 16px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-blue) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-blue); margin-bottom: 6px; animation: planet-pulse 4s infinite alternate; }
            .holo-pin.rebel .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-red) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-red); }
            .holo-pin.syndicate .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-purple) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-purple); }
            .holo-pin.war .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, var(--imp-gold) 40%, #000 90%); box-shadow: 0 0 20px var(--imp-gold); }
            .holo-pin.cis .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, var(--cis-blue) 40%, #000 90%); box-shadow: 0 0 20px var(--cis-blue); }
            .holo-pin.neutral .planet-sphere { background: radial-gradient(circle at 30% 30%, #ffffff, #aaaaaa 40%, #000 90%); box-shadow: 0 0 20px #fff; }
            @keyframes planet-pulse { 0% { box-shadow: 0 0 8px currentColor; } 100% { box-shadow: 0 0 25px currentColor; } }

            .map-controls-panel { position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); display: flex; gap: 20px; z-index: 600; background: rgba(0,10,20,0.8); padding: 12px 25px; border: 1px solid rgba(0,229,255,0.4); border-radius: 6px; box-shadow: 0 15px 40px rgba(0,0,0,0.9), inset 0 0 25px rgba(0,229,255,0.15); backdrop-filter: blur(12px); }
            .mc-group { display: flex; gap: 12px; align-items: center; }
            .mc-divider { width: 1px; height: 35px; background: rgba(0,229,255,0.3); }
            .z-btn { width: 55px; height: 40px; background: rgba(0,0,0,0.7); border: 1px solid rgba(0,229,255,0.6); color: var(--imp-blue); display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: 900; font-size: 18px; transition: all 0.2s; clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%); text-shadow: 0 0 8px var(--imp-blue); }
            .z-btn:hover { background: var(--imp-blue); color: #000; box-shadow: 0 0 25px var(--imp-blue); transform: scale(1.08); text-shadow: none; }
            .z-btn:active { transform: scale(0.95); }

            .holo-sidebar { position: absolute; right: -340px; top: 0; width: 340px; height: 100%; background: rgba(2, 6, 12, 0.9); backdrop-filter: blur(20px); border-left: 2px solid var(--imp-border); transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1); z-index: 500; display: flex; flex-direction: column; box-shadow: -15px 0 50px rgba(0,0,0,0.9); }
            .holo-sidebar.active { right: 0; }
            .hs-header { padding: 30px 25px; border-bottom: 1px solid var(--imp-border); background: linear-gradient(90deg, rgba(0, 229, 255, 0.2), transparent); }
            .hs-title { font-size: 22px; font-weight: 900; color: #fff; margin: 0 !important; padding-right: 30px; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 0 15px rgba(0,229,255,0.8); }
            .hs-close { position: absolute; top: 20px; right: 20px; color: var(--imp-blue); cursor: pointer; font-size: 28px; transition: 0.3s; opacity: 0.7; z-index: 10; }
            .hs-close:hover { opacity: 1; transform: rotate(90deg) scale(1.2); text-shadow: 0 0 15px var(--imp-blue); }
            .hs-body { flex: 1; overflow-y: auto; padding: 25px; }
            .hs-body::-webkit-scrollbar { width: 4px; }
            .hs-body::-webkit-scrollbar-thumb { background: var(--imp-blue); }
            
            .hs-card { display: flex; gap: 15px; margin-bottom: 18px; background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent); padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-left: 5px solid #888; cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
            .hs-card:hover { border-color: #fff; background: rgba(255,255,255,0.1); box-shadow: 0 0 15px rgba(255,255,255,0.2); transform: translateX(5px); }
            .hs-card img { width: 55px; height: 55px; object-fit: cover; border: 1px solid #888; border-radius: 4px; box-shadow: 0 0 8px rgba(255,255,255,0.2); }
            
            .hs-card.empire-theme { background: linear-gradient(90deg, rgba(0, 229, 255, 0.1), rgba(255,255,255,0.02)); border: 1px solid rgba(0, 229, 255, 0.3); border-left: 5px solid var(--imp-blue); }
            .hs-card.empire-theme .hs-meta { color: var(--imp-blue); }
            .hs-card.empire-theme:hover { border-color: var(--imp-blue); background: rgba(0, 229, 255, 0.2); box-shadow: 0 0 20px rgba(0, 229, 255, 0.3); transform: translateX(5px); }
            .hs-card.empire-theme img { border: 1px solid var(--imp-blue); box-shadow: 0 0 12px rgba(0,229,255,0.4); }

            .hs-card.hostile-rebel { background: linear-gradient(90deg, rgba(255, 51, 51, 0.15), rgba(30, 0, 0, 0.6)); border: 1px solid rgba(255, 51, 51, 0.5); border-left: 5px solid var(--imp-red); }
            .hs-card.hostile-rebel .hs-name { color: #ffcccc; }
            .hs-card.hostile-rebel .hs-meta { color: var(--imp-red); opacity: 1; }
            .hs-card.hostile-rebel:hover { border-color: var(--imp-red); background: rgba(255, 51, 51, 0.25); box-shadow: 0 0 20px rgba(255, 51, 51, 0.4); transform: translateX(5px); }
            .hs-card.hostile-rebel img { border: 1px solid var(--imp-red); box-shadow: 0 0 12px rgba(255, 51, 51, 0.5); }

            .hs-card.war-theme { background: linear-gradient(90deg, rgba(255, 204, 0, 0.15), rgba(30, 25, 0, 0.6)); border: 1px solid rgba(255, 204, 0, 0.5); border-left: 5px solid var(--imp-gold); }
            .hs-card.war-theme .hs-name { color: #ffe680; }
            .hs-card.war-theme .hs-meta { color: var(--imp-gold); opacity: 1; }
            .hs-card.war-theme:hover { border-color: var(--imp-gold); background: rgba(255, 204, 0, 0.25); box-shadow: 0 0 20px rgba(255, 204, 0, 0.4); transform: translateX(5px); }
            .hs-card.war-theme img { border: 1px solid var(--imp-gold); box-shadow: 0 0 12px rgba(255, 204, 0, 0.5); }

            .hs-card.syndicate-theme { background: linear-gradient(90deg, rgba(176, 38, 255, 0.15), rgba(20, 0, 30, 0.6)); border: 1px solid rgba(176, 38, 255, 0.5); border-left: 5px solid var(--imp-purple); }
            .hs-card.syndicate-theme .hs-name { color: #eebbff; }
            .hs-card.syndicate-theme .hs-meta { color: var(--imp-purple); opacity: 1; }
            .hs-card.syndicate-theme:hover { border-color: var(--imp-purple); background: rgba(176, 38, 255, 0.25); box-shadow: 0 0 20px rgba(176, 38, 255, 0.4); transform: translateX(5px); }
            .hs-card.syndicate-theme img { border: 1px solid var(--imp-purple); box-shadow: 0 0 12px rgba(176, 38, 255, 0.5); }

            .hs-card.cis-theme { background: linear-gradient(90deg, rgba(68, 136, 255, 0.15), rgba(0, 20, 40, 0.6)); border: 1px solid rgba(68, 136, 255, 0.5); border-left: 5px solid var(--cis-blue); }
            .hs-card.cis-theme .hs-name { color: #aaddff; }
            .hs-card.cis-theme .hs-meta { color: var(--cis-blue); opacity: 1; }
            .hs-card.cis-theme:hover { border-color: var(--cis-blue); background: rgba(68, 136, 255, 0.25); box-shadow: 0 0 20px rgba(68, 136, 255, 0.4); transform: translateX(5px); }
            .hs-card.cis-theme img { border: 1px solid var(--cis-blue); box-shadow: 0 0 12px rgba(68, 136, 255, 0.5); }

            .hs-info { display: flex; flex-direction: column; justify-content: center; gap: 6px; }
            .hs-name { color: #fff; font-size: 15px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; }
            .hs-meta { font-size: 11px; text-transform: uppercase; font-weight: bold; opacity: 0.8; letter-spacing: 1.5px; }

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

        const linkFrag = document.createDocumentFragment();
        QUICK_LINKS.forEach(link => {
            const a = document.createElement('a');
            a.className = 'ql-btn'; a.innerText = link.label; a.href = link.url;
            linkFrag.appendChild(a);
        });
        linksEl.appendChild(linkFrag);

        function render() {
            navEl.innerHTML = '<div class="nav-header">DIRECTORY</div>';
            const navFrag = document.createDocumentFragment();
            Object.keys(DB).forEach(key => {
                const btn = document.createElement('div');
                btn.className = `nav-btn ${key === curCat ? 'active' : ''}`;
                btn.innerText = key;
                btn.onclick = () => { curCat = key; curSub = Object.keys(DB[key])[0]; render(); };
                navFrag.appendChild(btn);
            });
            navEl.appendChild(navFrag);

            tabsEl.innerHTML = '';
            const tabFrag = document.createDocumentFragment();
            Object.keys(DB[curCat]).forEach(key => {
                const btn = document.createElement('div');
                btn.className = `tab-btn ${key.toUpperCase() === curSub.toUpperCase() ? 'active' : ''}`;
                btn.innerText = key;
                btn.onclick = () => { curSub = key; renderContent(); updateTabs(); };
                tabFrag.appendChild(btn);
            });
            tabsEl.appendChild(tabFrag);
            
            renderContent();
        }

        function updateTabs() {
            Array.from(tabsEl.children).forEach(btn => {
                const isActive = btn.innerText.toUpperCase() === curSub.toUpperCase();
                if(isActive) btn.classList.add('active'); else btn.classList.remove('active');
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
                
                const match = FACTION_CONFIG.find(f => data.status.toUpperCase().includes(f.keyword));
                if (match) boxClass += " " + match.theme;
                
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
                const dbCode = `{ title: "${data.name}", sub: "${data.rank}", status: "PENDING", stats: { "SPECIES": "${data.species}", "HOMEWORLD": "${data.home}", "ROBLOX PROFILE LINK": "${data.roblox}" }, bio: "${data.bio.replace(/"/g, '\\"')}" }`;
                statusMsg.innerText = ">> ENCRYPTION COMPLETE. READY FOR TRANSMISSION.";
                codeBox.innerText = dbCode;
                resultArea.classList.add('active');
                btn.innerText = "ENCRYPT & GENERATE";
            }, 800);
        }

        const ViewRenderers = {
            "onboarding": (data) => {
                const container = document.createElement('div');
                container.className = 'onb-terminal';
                
                const nav = document.createElement('div');
                nav.className = 'onb-nav';
                
                const contentArea = document.createElement('div');
                contentArea.className = 'onb-content-area';

                const renderContent = (index) => {
                    const step = data.steps[index];
                    let html = `<div class="onb-header">${step.title}</div>`;
                    if(step.desc) html += `<div class="onb-desc">${step.desc}</div>`;
                    
                    if(step.widgets) {
                        html += `<div class="onb-widget-grid">`;
                        step.widgets.forEach(w => {
                            html += `<div class="onb-widget"><div class="onb-widget-label">// ${w.label}</div><div class="onb-widget-text">${w.text}</div></div>`;
                        });
                        html += `</div>`;
                    }

                    if(step.interactive === "nested_accordion") {
                        html += `<div class="onb-nested-grid">`;
                        step.groups.forEach(group => {
                            const groupColor = group.color || "var(--imp-blue)";
                            html += `
                            <div class="onb-group-card" style="border-left-color: ${groupColor};">
                                <div class="onb-group-header">${group.title}</div>
                                <div class="onb-group-desc">${group.desc}</div>
                                <div class="onb-group-items">`;
                            group.items.forEach(item => {
                                html += `
                                <div class="onb-acc-item">
                                    <div class="onb-acc-header" onclick="this.classList.toggle('open'); const c = this.nextElementSibling; c.style.display = c.style.display === 'block' ? 'none' : 'block';">
                                        <span>> ${item.name}</span>
                                    </div>
                                    <div class="onb-acc-content">${item.text}</div>
                                </div>`;
                            });
                            html += `</div></div>`;
                        });
                        html += `</div>`;
                    }

                    if(step.interactive === "accordion") {
                        html += `<div>`;
                        step.items.forEach((item) => {
                            const col = item.color || "var(--imp-blue)";
                            html += `
                            <div class="onb-acc-item" style="border-left-color: ${col}; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.05); border-left: 4px solid ${col};">
                                <div class="onb-acc-header" style="padding: 15px;" onclick="const c = this.nextElementSibling; const open = c.style.display === 'block'; document.querySelectorAll('.onb-acc-content').forEach(el=>el.style.display='none'); c.style.display = open ? 'none' : 'block';">
                                    <span style="color: ${col}">${item.name}</span>
                                    <span style="font-size:10px; color:#888;">[ EXPAND ]</span>
                                </div>
                                <div class="onb-acc-content" style="border-left: none;">${item.text}</div>
                            </div>`;
                        });
                        html += `</div>`;
                    }

                    if(step.interactive === "grid") {
                        html += `<div class="onb-grid">`;
                        step.items.forEach(item => {
                            html += `
                            <div class="onb-grid-card">
                                <div class="onb-grid-icon">${item.icon || '⯐'}</div>
                                <div class="onb-grid-title">${item.name}</div>
                                <div class="onb-grid-text">${item.text}</div>
                            </div>`;
                        });
                        html += `</div>`;
                    }

                    if(step.html) {
                        html += step.html;
                    }

                    contentArea.innerHTML = html;
                    
                    contentArea.style.animation = "none";
                    void contentArea.offsetWidth;
                    contentArea.style.animation = "fade-in 0.4s ease-out";
                };

                data.steps.forEach((step, index) => {
                    const navItem = document.createElement('div');
                    navItem.className = `onb-nav-item ${index === 0 ? 'active' : ''}`;
                    navItem.innerHTML = `<span>0${index + 1} // ${step.id.toUpperCase()}</span><span>►</span>`;
                    navItem.onclick = () => {
                        document.querySelectorAll('.onb-nav-item').forEach(el => el.classList.remove('active'));
                        navItem.classList.add('active');
                        renderContent(index);
                    };
                    nav.appendChild(navItem);
                });

                container.appendChild(nav);
                container.appendChild(contentArea);
                
                screenEl.innerHTML = '';
                screenEl.style.padding = '0';
                screenEl.appendChild(container);
                
                renderContent(0);
            },

            "credits_view": (data) => {
                const container = document.createElement('div');
                container.className = 'credits-container';
                let html = `<h2 class="brief-section-title" style="border-bottom-color: var(--imp-blue); color: #fff; margin-bottom: 30px; font-size: 16px;">${data.title}</h2>`;
                data.data.forEach(c => {
                    html += `
                    <div class="credit-card">
                        <div class="c-icon">${c.name.charAt(0)}</div>
                        <div class="c-info">
                            <div class="c-role">${c.sub} // ${c.role}</div>
                            <div class="c-name">${c.name}</div>
                            <div class="c-desc">${c.desc}</div>
                        </div>
                    </div>`;
                });
                container.innerHTML = html;
                screenEl.appendChild(container);
            },

            "welcome": (data) => {
                let html = '';
                if(data.image) html += `<div class="welcome-hero"><img src="${data.image}"><div class="welcome-overlay">${data.title}</div></div>`;
                html += `<div class="briefing-meta-bar"><span>// ENCRYPTION: NONE</span><span>// DATE: UNKNOWN</span><span>// SOURCE: HOLONET NEWS</span></div>`;
                screenEl.innerHTML = html;
                
                const div = document.createElement('div'); div.className = 'text-block'; screenEl.appendChild(div);
                let i = 0; const txt = data.content;
                const type = () => { if(i < txt.length){ div.innerHTML += txt.charAt(i); i++; setTimeout(type, 10); } else { div.innerHTML += "<br><br>>> TRANSMISSION END."; } };
                type();
            },
            
            "news_feed": (data) => {
                const frag = document.createDocumentFragment();
                const container = document.createElement('div'); container.className = "news-container";
                container.innerHTML = `<div class="news-header-box"><h2 class="news-maintitle">${data.title}</h2></div>`;
                
                data.data.forEach(item => {
                    const card = document.createElement('div'); card.className = "news-card";
                    card.innerHTML = `
                        <div class="news-img-box"><img src="${item.image}"></div>
                        <div class="news-content">
                            <div class="news-meta">
                                <span>// ${item.date}</span>
                                <span class="news-tag">${item.tag}</span>
                            </div>
                            <div class="news-title">${item.title}</div>
                            <div class="news-text">${item.content}</div>
                        </div>
                    `;
                    container.appendChild(card);
                });
                frag.appendChild(container);
                screenEl.appendChild(frag);
            },
            
            "record_list": (data) => {
                const frag = document.createDocumentFragment();
                const wrapper = document.createElement('div'); wrapper.className = 'record-wrapper';
                data.data.forEach(item => {
                    const imgHtml = item.image ? `<div class="record-img-box"><img src="${item.image}"></div>` : '';
                    const themeClass = item.theme ? `theme-${item.theme}` : 'theme-normal';
                    const card = document.createElement('div'); card.className = `record-card ${themeClass}`;
                    card.innerHTML = `
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
                    `;
                    wrapper.appendChild(card);
                });
                frag.appendChild(wrapper);
                screenEl.appendChild(frag);
            },
            
            "pd_document": (data) => {
                const container = document.createElement('div'); container.className = 'pd-layout';
                let html = `<div class="pd-content"><h1 class="pd-title">${data.title}</h1><div class="pd-subtitle">${data.subtitle}</div>`;
                data.sections.forEach(sec => { html += `<div class="pd-section"><div class="pd-sec-header">${sec.header}</div><div class="pd-text">${sec.content}</div></div>`; });
                html += `</div>`;
                container.innerHTML = html;
                screenEl.appendChild(container);
            },
            
            "armory_split": (data) => {
                const frag = document.createDocumentFragment();
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
                    frag.appendChild(wrapper);
                });
                screenEl.appendChild(frag);
            },
            
            "cards_filter": (data) => {
                const filterContainer = document.createElement('div'); filterContainer.className = 'filter-bar';
                data.categories.forEach(cat => {
                    const btn = document.createElement('div'); btn.className = 'filter-btn'; btn.innerText = cat;
                    btn.onclick = () => renderFiltered(cat, btn);
                    filterContainer.appendChild(btn);
                });
                screenEl.appendChild(filterContainer);
                
                const contentContainer = document.createElement('div'); contentContainer.id = 'filter-content'; 
                screenEl.appendChild(contentContainer);
                
                function renderFiltered(category, activeBtn) {
                    const buttons = filterContainer.querySelectorAll('.filter-btn');
                    buttons.forEach(b => b.classList.remove('active'));
                    if (activeBtn) activeBtn.classList.add('active'); else buttons[0].classList.add('active');
                    
                    contentContainer.innerHTML = ''; 
                    const frag = document.createDocumentFragment();
                    const filteredGroups = data.data.filter(group => group.category === category);
                    
                    filteredGroups.forEach(group => {
                        if (group.header) { const header = document.createElement('h3'); header.className = 'brief-section-title'; header.style.marginTop = '20px'; header.innerText = group.header; frag.appendChild(header); }
                        const grid = document.createElement('div'); grid.className = 'card-grid';
                        
                        group.items.forEach(item => {
                            const card = document.createElement('div'); 
                            let themeClass = 'empire-theme';
                            if (group.category === 'REBEL') themeClass = 'rebel-theme';
                            if (group.category === 'OTHERS') themeClass = 'neutral-theme';
                            card.className = `data-card text-only ${themeClass}`;
                            
                            let statsHtml = '';
                            if(item.stats) { 
                                statsHtml = '<div class="card-stats">'; 
                                Object.keys(item.stats).forEach(key => { 
                                    if (key !== "ROBLOX PROFILE LINK") {
                                        statsHtml += `<div class="c-stat">${key}: ${item.stats[key]}</div>`; 
                                    }
                                }); 
                                statsHtml += '</div>'; 
                            }
                            card.innerHTML = `<div class="card-content"><div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub}</div></div><div style="font-size:13px; color:#b0d0e0; margin-bottom:15px; line-height:1.6;">${item.bio}</div>${statsHtml}</div>`;
                            card.onclick = () => openDossier(item);
                            grid.appendChild(card);
                        });
                        frag.appendChild(grid);
                    });
                    contentContainer.appendChild(frag);
                }
                renderFiltered(data.categories[0], filterContainer.children[0]);
            },
            
            "tactical": (data) => {
                const grid = document.createElement('div'); grid.className = 'tac-grid';
                const frag = document.createDocumentFragment();
                data.data.forEach(item => {
                    const card = document.createElement('div'); 
                    let alignClass = "";
                    if(item.align === "rebel") alignClass = "align-rebel";
                    if(item.align === "gold") alignClass = "align-gold";
                    card.className = `tac-card ${alignClass}`;
                    card.innerHTML = `<div class="tac-info"><div class="tac-title">${item.title}</div><div class="tac-loc">${item.loc}</div><div class="tac-desc">${item.desc}</div></div><div class="tac-status">${item.status}</div>`;
                    frag.appendChild(card);
                });
                grid.appendChild(frag);
                screenEl.appendChild(grid);
            },
            
            "list": (data) => {
                const wrapper = document.createElement('div'); wrapper.className = 'timeline-box';
                const frag = document.createDocumentFragment();
                data.data.forEach((item, index) => {
                    const el = document.createElement('div'); el.className = 't-item'; el.style.animationDelay = `${index * 0.1}s`;
                    el.innerHTML = `<div class="t-node"></div><div class="t-card"><div class="t-date">${item.left}</div><div class="t-title">${item.right}</div>${item.tag ? `<div class="t-tag">${item.tag}</div>` : ''}</div>`;
                    frag.appendChild(el);
                });
                wrapper.appendChild(frag);
                screenEl.appendChild(wrapper);
            },
            
            "cards": (data) => {
                const grid = document.createElement('div'); grid.className = 'card-grid';
                const frag = document.createDocumentFragment();
                data.data.forEach(item => {
                    const hasImage = item.image && item.image !== "";
                    let cardClass = 'data-card';
                    if (!hasImage) cardClass += ' text-only neutral-theme';
                    
                    const card = document.createElement('div'); card.className = cardClass;
                    const img = hasImage ? `<div class="card-img-box"><img src="${item.image}"><div class="status-badge">${item.status}</div></div>` : '';
                    let statsHtml = '';
                    if(item.stats) { 
                        statsHtml = '<div class="card-stats">'; 
                        Object.keys(item.stats).forEach(key => { 
                            if (key !== "ROBLOX PROFILE LINK") {
                                statsHtml += `<div class="c-stat">${key}: ${item.stats[key]}</div>`; 
                            }
                        }); 
                        statsHtml += '</div>'; 
                    }
                    card.innerHTML = `${img}<div class="card-content"><div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub}</div></div>${statsHtml}</div>`;
                    card.onclick = () => openDossier(item);
                    frag.appendChild(card);
                });
                grid.appendChild(frag);
                screenEl.appendChild(grid);
            },
            
            "form": (data) => {
                screenEl.innerHTML = `<h2 style="color:#fff; border-bottom:1px solid var(--imp-blue); padding-bottom:15px; text-shadow: 0 0 10px rgba(0,229,255,0.4); letter-spacing: 2px;">${data.title}</h2><p style="color:#cceeff; font-size:14px; margin-bottom:25px; line-height: 1.6;">${data.desc}</p><div class="imp-form"><div class="form-group"><label class="form-label">CHARACTER NAME</label><input type="text" class="imp-input" id="c-name" placeholder="Enter Full Name"></div><div class="form-group"><label class="form-label">EMPLOYMENT</label><input type="text" class="imp-input" id="c-rank" placeholder="e.g. Janitor"></div><div class="form-group"><label class="form-label">SPECIES</label><input type="text" class="imp-input" id="c-species" placeholder="e.g. Human"></div><div class="form-group"><label class="form-label">HOMEWORLD</label><input type="text" class="imp-input" id="c-home" placeholder="e.g. Coruscant"></div><div class="form-group"><label class="form-label">ROBLOX PROFILE LINK</label><input type="text" class="imp-input" id="c-roblox" placeholder="https://www.roblox.com/users/..."></div><div class="form-group form-full"><label class="form-label">BIOGRAPHY</label><textarea class="imp-textarea" id="c-bio" placeholder="Service history..."></textarea></div><button class="submit-btn" id="gen-btn">ENCRYPT & GENERATE</button><div class="code-result-area" id="c-result-area"><div class="status-msg" id="c-status"></div><div class="code-box" id="c-code-box"></div><div style="font-size:11px; color:#aaa; text-align:center; letter-spacing:1px; font-weight:bold;">>> COPY THE CODE ABOVE AND SUBMIT VIA DISCORD TICKET</div></div></div>`;
                document.getElementById('gen-btn').onclick = () => {
                    const d = { name: document.getElementById('c-name').value, rank: document.getElementById('c-rank').value, species: document.getElementById('c-species').value, home: document.getElementById('c-home').value, roblox: document.getElementById('c-roblox').value, bio: document.getElementById('c-bio').value };
                    if(!d.name || !d.rank) { alert("NAME AND EMPLOYMENT REQUIRED FOR PROTOCOL"); return; }
                    generateCode(d);
                };
            },
            
            "holomap": (data) => {
                screenEl.style.height = '800px'; 
                screenEl.style.padding = '0';
                screenEl.style.overflow = 'hidden';
                
                screenEl.innerHTML = `
                    <div class="holomap-wrapper" id="holomap-wrapper">
                        <div class="nebula-bg"></div>
                        
                        <div class="map-legend" id="map-legend">
                            <div class="legend-header" id="legend-toggle">
                                <span>DIRECTORY LEGEND</span>
                                <span id="legend-chevron">▼</span>
                            </div>
                            <div class="legend-content" id="legend-content">
                                <div><span style="color:var(--imp-blue);">■</span> EMPIRE</div>
                                <div><span style="color:var(--imp-red);">■</span> REBELLION</div>
                                <div><span style="color:var(--imp-purple);">■</span> SYNDICATE</div>
                                <div><span style="color:var(--imp-gold);">■</span> WAR IN PROGRESS</div>
                                <div><span style="color:var(--cis-blue);">■</span> CIS REMNANT</div>
                                <div><span style="color:#888;">■</span> UNKNOWN</div>
                            </div>
                        </div>

                        <div class="map-top-bar">
                            <div class="map-search-box">
                                <input type="text" id="map-search" placeholder="TARGET PLANET...">
                                <div class="search-results" id="search-results"></div>
                            </div>
                            <div class="faction-filters" id="faction-filters">
                                <div class="f-btn active" data-faction="all">ALL</div>
                                <div class="f-btn" data-faction="empire-held">EMPIRE</div>
                                <div class="f-btn" data-faction="rebel-held">REBEL</div>
                                <div class="f-btn" data-faction="syndicate-held">SYNDICATE</div>
                                <div class="f-btn" data-faction="cis-held">CIS</div>
                                <div class="f-btn" data-faction="war-held">WAR</div>
                            </div>
                        </div>

                        <div class="holo-projector-beam"></div>
                        <div class="holo-stage" id="holo-stage">
                            <div class="radar-sweep"></div>
                            
                            <div class="holo-base"></div>
                            <div class="holo-core"></div>
                            <div class="star-field"></div>
                            <svg class="holo-svg-layer layer-bottom" id="svg-bot" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"></svg>
                            <svg class="holo-svg-layer layer-top" id="holo-svg-layer" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet"></svg>
                        </div>
                        <div class="map-controls-panel">
                            <div class="mc-group">
                                <div class="z-btn" id="btn-rot-l">◄</div>
                                <div class="z-btn" id="btn-rot-r">►</div>
                                <div class="z-btn" id="btn-reset" style="font-size:14px;">↺</div>
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
                const svgLayerTop = document.getElementById('holo-svg-layer');
                const sidebar = document.getElementById('holo-sidebar');
                const hsBody = document.getElementById('hs-body');
                const starField = document.querySelector('.star-field');
                const mapWrapper = document.getElementById('holomap-wrapper');
                
                let currentRotX = 35; 
                let currentRotZ = 0.15;
                let currentScale = 0.75;
                
                const starFrag = document.createDocumentFragment();
                for(let i=0; i<200; i++){
                    const s = document.createElement('div');
                    s.className = 'h-star';
                    const x = Math.random() * 2000, y = Math.random() * 2000, z = Math.random() * 500 - 250;
                    s.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                    starFrag.appendChild(s);
                }
                starField.appendChild(starFrag);

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

                function generateCompoundArc(rIn, rOut, rExt, s, mid, e, type) {
                    const pt = (r, a) => polarToCartesian(0, 0, r, a);
                    const arc = (r, aStart, aEnd, reverse) => {
                        const pEnd = pt(r, aEnd);
                        const sweep = reverse ? 0 : 1;
                        return `A ${r} ${r} 0 0 ${sweep} ${pEnd.x} ${pEnd.y}`;
                    };

                    if (type === 'outer') {
                        const p1 = pt(rOut, s);
                        const p3 = pt(rExt, mid);
                        const p5 = pt(rIn, e);
                        return [
                            `M ${p1.x} ${p1.y}`,
                            arc(rOut, s, mid, false),
                            `L ${p3.x} ${p3.y}`,
                            arc(rExt, mid, e, false),
                            `L ${p5.x} ${p5.y}`,
                            arc(rIn, e, s, true),
                            `Z`
                        ].join(" ");
                    } else if (type === 'inner') {
                        const p1 = pt(rOut, s);
                        const p3 = pt(rExt, e);
                        const p5 = pt(rIn, mid);
                        return [
                            `M ${p1.x} ${p1.y}`,
                            arc(rOut, s, e, false),
                            `L ${p3.x} ${p3.y}`,
                            arc(rExt, e, mid, true),
                            `L ${p5.x} ${p5.y}`,
                            arc(rIn, mid, s, true),
                            `Z`
                        ].join(" ");
                    }
                }

                const RINGS = [
                    { inner: 8, outer: 18, name: "Core" },
                    { inner: 18, outer: 28, name: "Expansion" },
                    { inner: 28, outer: 38, name: "Mid" },
                    { inner: 38, outer: 48, name: "Outer" }
                ];

                const SLICE_ANGLE = 15;
                const bgBotFrag = document.createDocumentFragment();
                const bgTopFrag = document.createDocumentFragment();

                for (let i = 0; i < RINGS.length; i++) {
                    let offset = (i % 2 === 0) ? 0 : (SLICE_ANGLE / 2);
                    for (let a = 0; a < 360; a += SLICE_ANGLE) {
                        let start = a + offset;
                        let end = start + SLICE_ANGLE;
                        const pathString = describeArc(0, 0, RINGS[i].inner, RINGS[i].outer, start, end);
                        
                        const bgBot = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        const bgTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        
                        let cssClass = "sector-poly grid-filler";
                        bgBot.setAttribute("class", cssClass);
                        bgBot.setAttribute("d", pathString);
                        bgTop.setAttribute("class", cssClass);
                        bgTop.setAttribute("d", pathString);
                        
                        bgBotFrag.appendChild(bgBot);
                        bgTopFrag.appendChild(bgTop);
                    }
                }
                svgLayerBot.appendChild(bgBotFrag);
                svgLayerTop.appendChild(bgTopFrag);

                const polyBotFrag = document.createDocumentFragment();
                const polyTopFrag = document.createDocumentFragment();
                const pinsFrag = document.createDocumentFragment();
                
                let allPlanets = [];

                data.data.forEach(sector => {
                    if (sector.startAngle !== undefined) {
                        
                        let targetRing = 3; 
                        const descUpper = sector.desc.toUpperCase();
                        if (descUpper.includes("CORE")) targetRing = 0;
                        else if (descUpper.includes("EXPANSION") || descUpper.includes("COLONIES")) targetRing = 1;
                        else if (descUpper.includes("MID")) targetRing = 2;
                        else if (descUpper.includes("OUTER") || descUpper.includes("UNCHARTED")) targetRing = 3;

                        let match = FACTION_CONFIG.find(f => sector.sub.some(p => p.status.toUpperCase().includes(f.keyword)));
                        
                        let cssClass = "sector-poly";
                        let pinClass = "holo-pin";
                        
                        if (match) {
                            cssClass += " " + match.poly;
                            pinClass += " " + match.pin;
                        } else {
                            cssClass += " unknown-sector";
                            pinClass += " neutral";
                        }

                        let span = sector.endAngle - sector.startAngle;
                        let rIn = RINGS[targetRing].inner;
                        let rOut = RINGS[targetRing].outer;
                        let s = sector.startAngle;
                        let e = sector.endAngle;

                        let pathString = "";
                        let pinRad = (rIn + rOut) / 2; 
                        let pinAngle = (s + e) / 2;

                        if (span >= 30 && targetRing < 3) {
                            let mid = s + (span * 0.4);
                            let rExt = RINGS[targetRing + 1].outer;
                            pathString = generateCompoundArc(rIn, rOut, rExt, s, mid, e, 'outer');
                            pinAngle = (s + mid) / 2;
                        } 
                        else if (span >= 20 && targetRing > 0) {
                            let mid = s + (span * 0.6);
                            let rExt = RINGS[targetRing - 1].inner;
                            pathString = generateCompoundArc(rIn, rOut, rExt, s, mid, e, 'inner');
                            pinAngle = (mid + e) / 2;
                        } 
                        else {
                            pathString = describeArc(0, 0, rIn, rOut, s, e);
                        }

                        if(sector.sub) {
                            sector.sub.forEach(planet => {
                                let planetData = Object.assign({}, planet);
                                planetData.sectorName = sector.name;
                                planetData.sectorData = sector;
                                planetData.pinAngle = pinAngle;
                                allPlanets.push(planetData);
                            });
                        }

                        const pathBot = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        const pathTop = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        
                        pathBot.setAttribute("d", pathString);
                        pathTop.setAttribute("d", pathString);
                        pathBot.setAttribute("class", cssClass);
                        pathTop.setAttribute("class", cssClass);
                        
                        if(match) {
                            pathBot.setAttribute("data-faction", match.poly);
                            pathTop.setAttribute("data-faction", match.poly);
                        }

                        pathTop.onmouseenter = () => { pathBot.classList.add('hovered'); pathTop.classList.add('hovered'); };
                        pathTop.onmouseleave = () => { pathBot.classList.remove('hovered'); pathTop.classList.remove('hovered'); };
                        pathTop.onclick = (e) => { e.stopPropagation(); openSector(sector); };
                        
                        polyBotFrag.appendChild(pathBot);
                        polyTopFrag.appendChild(pathTop);

                        const pinPos = polarToCartesian(0, 0, pinRad, pinAngle);
                        const pin = document.createElement('div');
                        pin.className = pinClass;
                        if(match) pin.setAttribute("data-faction", match.poly);
                        pin.style.left = (pinPos.x + 50) + "%";
                        pin.style.top = (pinPos.y + 50) + "%";
                        pin.innerHTML = `
                            <div class="pin-wrapper">
                                <div class="pin-label">${sector.name}</div>
                                <div class="pin-stem"></div>
                                <div class="planet-sphere"></div>
                            </div>
                        `;
                        pinsFrag.appendChild(pin);
                    }
                });
                
                svgLayerBot.appendChild(polyBotFrag);
                svgLayerTop.appendChild(polyTopFrag);
                stage.appendChild(pinsFrag);
                
                const pinElements = document.querySelectorAll('.pin-wrapper');
                const filterBtns = document.querySelectorAll('.f-btn');
                const filterPolys = document.querySelectorAll('.sector-poly');
                const filterPins = document.querySelectorAll('.holo-pin');
                const searchInput = document.getElementById('map-search');
                const searchResults = document.getElementById('search-results');

                document.getElementById('legend-toggle').onclick = () => {
                    const content = document.getElementById('legend-content');
                    const chevron = document.getElementById('legend-chevron');
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        chevron.innerText = '▼';
                    } else {
                        content.style.display = 'none';
                        chevron.innerText = '▲';
                    }
                };

                function updateTransform() {
                    stage.style.transform = `scale(${currentScale}) rotateX(${currentRotX}deg) rotateZ(${currentRotZ}deg)`;
                    const inverseScale = 1 / currentScale; 
                    pinElements.forEach(lbl => {
                        lbl.style.transform = `translateZ(25px) rotateZ(${-currentRotZ}deg) rotateX(${-currentRotX}deg) scale(${inverseScale})`;
                    });
                }
                updateTransform();

                document.getElementById('btn-rot-l').onclick = () => { currentRotZ -= 20; updateTransform(); };
                document.getElementById('btn-rot-r').onclick = () => { currentRotZ += 20; updateTransform(); };
                document.getElementById('btn-zoom-in').onclick = () => { currentScale = Math.min(currentScale + 0.15, 2.5); updateTransform(); };
                document.getElementById('btn-zoom-out').onclick = () => { currentScale = Math.max(currentScale - 0.15, 0.4); updateTransform(); };
                document.getElementById('btn-reset').onclick = () => { currentRotX = 35; currentRotZ = 0.15; currentScale = 0.75; updateTransform(); };

                filterBtns.forEach(btn => {
                    btn.onclick = () => {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const factionTarget = btn.getAttribute('data-faction');
                        
                        filterPolys.forEach(p => {
                            if (p.classList.contains('grid-filler')) return;
                            if (factionTarget === 'all' || p.getAttribute('data-faction') === factionTarget) {
                                p.classList.remove('dimmed');
                            } else {
                                p.classList.add('dimmed');
                            }
                        });
                        
                        filterPins.forEach(p => {
                            if (factionTarget === 'all' || p.getAttribute('data-faction') === factionTarget) {
                                p.classList.remove('dimmed');
                            } else {
                                p.classList.add('dimmed');
                            }
                        });
                    };
                });

                searchInput.oninput = (e) => {
                    const val = e.target.value.toLowerCase();
                    searchResults.innerHTML = '';
                    
                    if (!val) {
                        searchResults.classList.remove('active');
                        return;
                    }
                    
                    const matches = allPlanets.filter(p => p.title.toLowerCase().includes(val) || p.sectorName.toLowerCase().includes(val));
                    
                    if (matches.length > 0) {
                        searchResults.classList.add('active');
                        matches.forEach(match => {
                            const div = document.createElement('div');
                            div.className = 'sr-item';
                            div.innerHTML = `<span class="sr-planet">${match.title}</span><span class="sr-sector">${match.sectorName}</span>`;
                            div.onclick = () => {
                                searchResults.classList.remove('active');
                                searchInput.value = '';
                                
                                filterBtns[0].click();
                                
                                openSector(match.sectorData);
                                setTimeout(() => openDossier(match), 450); 
                            };
                            searchResults.appendChild(div);
                        });
                    } else {
                        searchResults.classList.remove('active');
                    }
                };

                mapWrapper.addEventListener('click', (e) => {
                    if(!e.target.closest('.map-search-box') && searchResults) {
                        searchResults.classList.remove('active');
                    }
                });

                function openSector(data) {
                    sidebar.classList.add('active');
                    mapWrapper.classList.add('sidebar-open');
                    document.getElementById('hs-title').innerText = data.name;
                    hsBody.innerHTML = '';
                    if(data.sub.length === 0) {
                        hsBody.innerHTML = '<div style="color:#666; font-size:11px;">NO DATA</div>';
                    } else {
                        const frag = document.createDocumentFragment();
                        data.sub.forEach(planet => {
                            const s = planet.status.toUpperCase();
                            const match = FACTION_CONFIG.find(f => s.includes(f.keyword));
                            const themeClass = match ? match.theme : 'neutral-theme';
                            
                            const div = document.createElement('div');
                            div.className = `hs-card ${themeClass}`;
                            div.innerHTML = `<img src="${planet.image}"><div class="hs-info"><div class="hs-name">${planet.title}</div><div class="hs-meta">${planet.stats.TERRAIN || 'Unknown'}</div></div>`;
                            div.onclick = () => openDossier(planet);
                            frag.appendChild(div);
                        });
                        hsBody.appendChild(frag);
                    }
                }
                
                document.getElementById('hs-close').onclick = () => {
                    sidebar.classList.remove('active');
                    mapWrapper.classList.remove('sidebar-open');
                };
            }
        };

        function renderContent() {
            if (window.holomapAnimFrame) {
                cancelAnimationFrame(window.holomapAnimFrame);
            }
            
            screenEl.innerHTML = '';
            screenEl.style.height = 'auto'; 
            screenEl.style.overflow = 'visible'; 
            if (curSub !== "Group Onboarding") {
                screenEl.style.padding = '40px'; 
            }
            
            const data = DB[curCat][curSub];

            if (ViewRenderers[data.type]) {
                ViewRenderers[data.type](data);
            } else {
                console.error("No renderer found for type:", data.type);
            }
        }

        render();
    }
})();