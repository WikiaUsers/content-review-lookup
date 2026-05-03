// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:ExclusiveSkinsDailyLogger.js

{
	"use strict";
	
	const srcContainer = document.getElementById('ExclusiveSkinsDailyLogger');
	if (srcContainer && !document.getElementById('ExclusiveSkinsDailyLogger_Container')) {
		console.log("[Exclusive Skins Daily Logger] [LOG]: Running script...");
		const placeholderImage = "https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/47/Placeholder.png/revision/latest?cb=20220315033423&format=original";
		const _ = undefined;
		const gameVersion = "V17.0";
		const weaponsCount = 21;
		function checkPlural(input, config = {}) {
			if (input === 1) {
				return config.singular;
			} else {
				return config.plural ?? config.singular;
			}
		}
		
		const materialFiles = {
			antenna:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/20/Craft_Antenna.png/revision/latest?cb=20250828210204&format=original",
			bone:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/e/e1/Craft_Bone.png/revision/latest?cb=20250828210227&format=original",
			brain:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/47/Craft_Brain.png/revision/latest?cb=20250828210245&format=original",
			gem:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/a/a7/Craft_Gem.png/revision/latest?cb=20250828210130&format=original",
			glass:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/1/1b/Craft_Glass.png/revision/latest?cb=20250828210151&format=original",
			ice:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/f/f1/Craft_Ice.png/revision/latest?cb=20250828210117&format=original",
			rubber:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/a/ae/Craft_Rubber.png/revision/latest?cb=20250828210215&format=original",
			spike:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/dd/Craft_Spike.png/revision/latest?cb=20250828210237&format=original",
			tentacle:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/48/Craft_Tentacle.png/revision/latest?cb=20250828210257&format=original",
			tie:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/d0/Craft_Tie.png/revision/latest?cb=20250828210141&format=original",
			skin:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/2a/Crafting_Skin.png/revision/latest?cb=20250828205325&format=original",
			claw:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/df/Craft_Claw.png/revision/latest?cb=20250828205919&format=original",
			fabric:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/75/Craft_Fabric.png/revision/latest?cb=20250828205945&format=original",
			fur:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/5/53/Craft_Fur.png/revision/latest?cb=20250828205955&format=original",
			hair:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/7c/Craft_Hair.png/revision/latest?cb=20250828210006&format=original",
			horn:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/24/Craft_Horn.png/revision/latest?cb=20250828210105&format=original",
			metal:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/dd/Craft_Metal.png/revision/latest?cb=20250828205823&format=original",
			plastic:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/e/e5/Craft_Plastic.png/revision/latest?cb=20250828205838&format=original",
			redlight:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/22/Craft_RedLight.png/revision/latest?cb=20250828205932&format=original",
			slime:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/b/bb/Craft_Slime.png/revision/latest?cb=20250828210018&format=original",
			wood:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/a/a7/Craft_Wood.png/revision/latest?cb=20250828205906&format=original",
			pumpkin:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/9/94/Craft_Pumpkin.png/revision/latest?cb=20260110210030&format=original",
			ribbon:"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/2c/Craft_Ribbon.png/revision/latest?cb=20260110210045&format=original",
		};
		function formatMatName(id) {
			const obj = {
				antenna:"Antenna",
				bone:"Bone",
				brain:"Brain",
				gem:"Gem",
				glass:"Glass",
				ice:"Ice",
				rubber:"Rubber",
				spike:"Spike",
				tentacle:"Tentacle",
				tie:"Tie",
				skin:"Skin",
				claw:"Claw",
				fabric:"Fabric",
				fur:"Fur",
				hair:"Hair",
				horn:"Horn",
				metal:"Metal",
				plastic:"Plastic",
				redlight:"Red Light",
				slime:"Slime",
				wood:"Wood",
				pumpkin:"Pumpkin",
				ribbon:"Ribbon",
			};
			return obj[id] ?? id;
		}
		class WeaponSkin {
			constructor(mainDetails = {}, otherDetails = {}) {
				this.id = mainDetails.id;
				this.name = mainDetails.name ?? mainDetails.id;
				this.rarity = mainDetails.rarity ?? 'unknown';
				this.otherDetails = otherDetails;
			}
			formatCraftingReqs(factor = 1, format = {}) {
				format.inclX ??= true;
				format.inclIcon ??= true;
				format.inclMatName ??= true;
				format.iconPlacement ??= 'after';
				if (format.inclX) {
					format.xPlacement ??= 'after';
				}
				format.outputSeparator ??= ', ';
				
				const src = this;
				const output = [];
				const reqs = getCraftingReqs(src.id);
				for (let mat in reqs) {
					let str = (reqs[mat] * factor).toLocaleString();
					if (format.inclX) {
						if (format.xPlacement === 'before') {
							str = 'x' + str;
						} else {
							str = str + 'x';
						}
					}
					if (format.inclMatName) {
						str += ' ' + formatMatName(mat);
					}
					if (format.inclIcon) {
						const imageStr = `<span class='infoicon'><img src='${materialFiles[mat]}'></img></span>`;
						if (format.iconPlacement === 'before') {
							str = ` ${imageStr} ${str}`;
						} else {
							str = ` ${str} ${imageStr}`;
						}
					}
					output.push(str);
				}
				return output.join(format.outputSeparator);
			}
		}
		const skins = [];
		function getCraftingReqs(id) {
			const obj = {
				'rose':{tie:1, skin:6, claw:1, horn:1},
				'decay':{brain:1, bone:1, skin:8, fur:4},
				'souldebt':{glass:2, antenna:1, skin:12, plastic:4},
				'classicfire':{gem:4, skin:18, wood:6, fabric:4},
				'plum':{ice:1, skin:6, slime:2, claw:1},
				'magma':{rubber:5, spike:2, skin:16, plastic:3},
				'badlands':{tentacle:1, skin:6, claw:1, horn:1},
				'heartsofred':{gem:1, skin:6, metal:1, redlight:1},
				'unclej':{antenna:1, skin:6, hair:2, plastic:1},
				'slime':{brain:2, ice:2, skin:9, slime:4},
				'duckweed':{tentacle:3, skin:11, wood:4, slime:3},
				'purpleberry':{spike:2, skin:9, hair:3, horn:2},
				'heartsoforange':{rubber:1, skin:5, horn:1, metal:1},
				'fall':{tie:2, skin:7, fur:3, redlight:2},
				'sharpshell':{spike:2, glass:1, skin:8, horn:3},
				'snowleapord':{ice:5, bone:3, skin:16, fur:6},
				'waves':{gem:5, skin:18, plastic:8, slime:4},
				'jade':{rubber:3, skin:13, fabric:5},
				'cherrywood':{glass:2, gem:1, skin:10, wood:5},
				'warmvalentine':{brain:2, antenna:1, skin:7, hair:4},
				'sharpradiant':{spike:2, tentacle:1, skin:7, claw:4},
				'graffiti':{antenna:4, skin:17, plastic:6, redlight:4},
				'reinforcedmetal':{skin:5, metal:2, plastic:1, slime:1},
				'corrupted':{brain:3, skin:10, metal:5, horn:2},
				'chekhovs':{tie:2, skin:8, fabric:4, plastic:3},
				'witchcraft':{bone:3, gem:1, skin:11, wood:4},
				'heartsofgreen':{tentacle:1, skin:4, claw:1, redlight:1},
				'camo':{glass:1, skin:5, fur:2, fabric:2},
				'inverted':{rubber:1, skin:4, redlight:2, hair:2},
				'redox':{antenna:1, skin:5, metal:3, horn:2},
				'equinox':{tentacle:2, ice:1, skin:9, fur:3},
			};
			return obj[id] ?? {};
		}
		function getExampleImage(id) {
			const obj = {
				'rose':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/5/53/Gun_Skins_-_P90_-_Rose.png/revision/latest?cb=20260318205450&format=original",
				'decay':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/28/Gun_Skins_-_P90_-_Decay.png/revision/latest?cb=20260318205405&format=original",
				'souldebt':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/0/08/Gun_Skins_-_P90_-_Soul_Debt.png/revision/latest?cb=20260318205453&format=original",
				'classicfire':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/70/Gun_Skins_-_P90_-_Classic_Fire.png/revision/latest?cb=20260318205357&format=original",
				'plum':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/1/19/Gun_Skins_-_P90_-_Plum.png/revision/latest?cb=20260318235134&format=original",
				'magma':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/a/a3/Gun_Skins_-_P90_-_Magma.png/revision/latest?cb=20260318235132&format=original",
				'badlands':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/6/6c/Weapon_Skins_-_P90_-_Badlands_2026-03-23.png/revision/latest?cb=20260323212936&format=original",
				'heartsofred':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/5/57/Gun_Skins_-_P90_-_Hearts_of_Red.png/revision/latest?cb=20260320101440&format=original",
				'unclej':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/78/Gun_Skins_-_P90_-_Uncle_Jaquavius.png/revision/latest?cb=20260321101816&format=original",
				'slime':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/f/f5/Weapon_Skins_-_P90_-_Slime.png/revision/latest?cb=20260322101417&format=original",
				'duckweed':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/2d/Weapon_Skins_-_P90_-_Duckweed.png/revision/latest?cb=20260323101030&format=original",
				'purpleberry':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/78/Weapon_Skins_-_P90_-_Purple_Berry.png/revision/latest?cb=20260324100933&format=original",
				'heartsoforange':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/c/c4/Weapon_Skins_-_P90_-_Hearts_of_Orange.png/revision/latest?cb=20260325101043&format=original",
				'fall':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/f/f5/Weapon_Skins_-_P90_-_Fall.png/revision/latest?cb=20260326101114&format=original",
				'sharpshell':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/b/b2/Weapon_Skins_-_P90_-_Sharp_Shell.png/revision/latest?cb=20260327215519&format=original",
				'snowleapord':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/1/1f/Weapon_Skins_-_P90_-_Snow_Leapord.png/revision/latest?cb=20260328104033&format=original",
				'waves':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/8/8d/Weapon_Skins_-_P90_-_Waves.png/revision/latest?cb=20260329110443&format=original",
				'jade':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/b/b8/Weapon_Skins_-_P90_-_Jade.png/revision/latest?cb=20260330113119&format=original",
				'cherrywood':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/f/f4/Weapon_Skins_-_P90_-_Cherry_Wood.png/revision/latest?cb=20260331124106&format=original",
				'warmvalentine':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/f/ff/Weapon_Skins_-_P90_-_Warm_Valentine.png/revision/latest?cb=20260401154808&format=original",
				'sharpradiant':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/4d/Weapon_Skins_-_P90_-_Sharp_Radiant.png/revision/latest?cb=20260402171004&format=original",
				'graffiti':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/4/45/Weapon_Skins_-_P90_-_Graffiti.png/revision/latest?cb=20260403215646&format=original",
				'reinforcedmetal':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/3/36/Weapon_Skins_-_P90_-_Reinforced_Metal.png/revision/latest?cb=20260404100943&format=original",
				'corrupted':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/2/29/Weapon_Skins_-_P90_-_Corrupted.png/revision/latest?cb=20260405101038&format=original",
				'chekhovs':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/d3/Weapon_Skins_-_P90_-_Chekhov%27s.png/revision/latest?cb=20260406112711&format=original",
				'witchcraft':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/9/9c/Weapon_Skins_-_P90_-_Witchcraft.png/revision/latest?cb=20260407102932&format=original",
				'heartsofgreen':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/7/7b/Weapon_Skins_-_P90_-_Hearts_of_Green.png/revision/latest?cb=20260408100846&format=original",
				'camo':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/5/5c/Weapon_Skins_-_P90_-_Camo.png/revision/latest?cb=20260409101014&format=original",
				'inverted':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/d/d4/Weapon_Skins_-_P90_-_Inverted.png/revision/latest?cb=20260410100827&format=original",
				'redox':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/b/ba/Gun_Skins_-_P90_-_Redox.png/revision/latest?cb=20260321063307&format=original",
				'equinox':"https://static.wikia.nocookie.net/roblox-survive-and-kill-the-killers-in-area-51/images/c/cc/Weapon_Skins_-_P90_-_Equinox.png/revision/latest?cb=20260412100738&format=original",
			};
			const elem = `<div class='exampleImageContainer hoverimg'><img class='image' src='${obj[id] ?? placeholderImage}'></img><div class='caption'>In-game appearance</div></div>`;
			return elem;
		}
		function formatRarityName(id) {
			const obj = {
				'entry':'Entry',
				'expert':'Expert',
				'exotic':'Exotic',
				'secret':'Secret',
			};
			return obj[id] ?? id;
		}
		function getRarityClass(id) {
			const obj = {
				'entry':'Entry',
				'expert':'Expert',
				'exotic':'Exotic',
				'secret':'Secret',
			};
			if (obj[id]) {
				return 'SkinRarity_' + obj[id];
			} else {
				return '';
			}
		}
		{
			skins.push(new WeaponSkin({
				id:'rose',
				name:'Rose',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'decay',
				name:'Decay',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'souldebt',
				name:'Soul Debt',
				rarity:'exotic',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'classicfire',
				name:'Classic Fire',
				rarity:'secret',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'plum',
				name:'Plum',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'magma',
				name:'Magma',
				rarity:'secret',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'badlands',
				name:'Badlands',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'heartsofred',
				name:'Hearts of Red',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'unclej',
				name:'Uncle Jaquavius',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'slime',
				name:'Slime',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'duckweed',
				name:'Duckweed',
				rarity:'exotic',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'purpleberry',
				name:'Purple Berry',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'heartsoforange',
				name:'Hearts of Orange',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'fall',
				name:'Fall',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'sharpshell',
				name:'Sharp Shell',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'snowleapord',
				name:'Snow Leapord',
				rarity:'secret',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'waves',
				name:'Waves',
				rarity:'secret',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'jade',
				name:'Jade',
				rarity:'exotic',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'cherrywood',
				name:'Cherry Wood',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'warmvalentine',
				name:'Warm Valentine',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'sharpradiant',
				name:'Sharp Radiant',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'graffiti',
				name:'Graffiti',
				rarity:'secret',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'reinforcedmetal',
				name:'Reinforced Metal',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'corrupted',
				name:'Corrupted',
				rarity:'exotic',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'chekhovs',
				name:'Chekhov\'s',
				rarity:'expert',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'witchcraft',
				name:'witchcraft',
				rarity:'exotic',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'heartsofgreen',
				name:'Hearts of Green',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'camo',
				name:'Camo',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'inverted',
				name:'Inverted',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'redox',
				name:'Redox',
				rarity:'entry',
			}, {craftable:true}));
			skins.push(new WeaponSkin({
				id:'equinox',
				name:'Equinox',
				rarity:'expert',
			}, {craftable:true}));
			/*
			skins.push(new WeaponSkin({
				id:'',
				name:'',
				rarity:'',
			}, {}));
			*/
		}
		
		const mainContainer = srcContainer.appendChild(document.createElement('div'));
		mainContainer.setAttribute('id', 'ExclusiveSkinsDailyLogger_Container');
		mainContainer.classList.add('ExclusiveSkinsDailyLogger');
		const stylesheet = new CSSStyleSheet();
		document.adoptedStyleSheets.push(stylesheet);
		stylesheet.replaceSync(`
		.ExclusiveSkinsDailyLogger {
			border:2px solid var(--saktkia51-border-color);
			color:var(--saktkia51-text-color);
			background:var(--saktkia51-background-color);
			padding:0.5em;
			width:100%;
			max-width:50em;
			overflow:auto;
			margin:auto;
			
			.hoverimg {
				& img {
					transition:0.5s;
				}
				& img:hover {
					opacity:50%;
				}
			}
			
			& .title {
				font-size:150%;
				font-weight:bold;
				text-align:center;
				
				& .subtitle {
					font-weight:initial;
				}
			}
			
			& .body {
				overflow:auto;
				& .exampleImageContainer {
					float:left;
					margin-right:1em;
					max-width:150px;
					& img {
						width:150px;
						border:4px solid var(--saktkia51-border-color);
						cursor:pointer;
					}
					& .caption {
						max-height:10em;
						overflow:auto;
						scrollbar-gutter:stable both-edges;
						text-align:center;
					}
				}
				& .placeholderNote {
					font-size:75%;
					font-style:italic;
				}
			}
			
			& .closingNotes {
				font-size:75%;
				font-style:italic;
				text-align:center;
			}
			
			& .infoicon img {
				width:20px;
			}
		}
		`);
		const title = mainContainer.appendChild(document.createElement('div'));
		title.classList.add('title');
		const body = mainContainer.appendChild(document.createElement('div'));
		body.classList.add('body');
		const closingNotes = mainContainer.appendChild(document.createElement('div'));
		closingNotes.classList.add('closingNotes');
		
		const pickedSkin = {};
		function updateInternalData(specificIndex) {
			function getDelta(extraDays = 0) {
				const origDate = new Date("2026-03-14T00:00");
				const currentDate = new Date(new Date().getTime() + (8.64e4 * 1e3 * extraDays));
				const offsets = [origDate.getTimezoneOffset(), currentDate.getTimezoneOffset()];
				const delta = (offsets[0] - offsets[1]) * 60 * 1e3;
				let delta2 = currentDate.getTime() - origDate.getTime();
				if (offsets[0] !== offsets[1]) {
					delta2 += delta;
				}
				return delta2;
			}
			function getArrIndex() {
				return Math.floor(getDelta() / (86400 * 1e3)) % skins.length;
			}
			const indexPicked = specificIndex ?? getArrIndex();
			pickedSkin.dailyNumber = indexPicked + 1;
			pickedSkin.whichSkin = skins[indexPicked];
		}
		function updateTitle() {
			const s = pickedSkin.whichSkin;
			let str = `Today's exclusive daily skin:<br/>`
			+ `<span class='subtitle'>${s.name} (<span class='${getRarityClass(s.rarity)}'>${formatRarityName(s.rarity)}</span>)`
			+ ` (#${pickedSkin.dailyNumber.toLocaleString()}/${skins.length.toLocaleString()})</span>`;
			title.innerHTML = str;
		}
		function updateBody() {
			const s = pickedSkin.whichSkin;
			let str = '';
			str += getExampleImage(s.id);
			if (s.otherDetails.craftable) {
				str += `Crafting Requirements (single craft): ${s.formatCraftingReqs()}`;
				str += `<br/>Crafting Requirements (all weapons): ${s.formatCraftingReqs(weaponsCount)}`;
			}
			body.innerHTML = str;
			body.querySelector('.exampleImageContainer img').addEventListener('click', function() {
				window.open(this.src);
			});
		}
		function updateClosingNotes() {
			const count = skins.length;
			let dateFormat = mw.user.options.get('date');
			switch (dateFormat) {
				case 'dmy':
				dateFormat = 'd/M/yyyy HH:mm:ss';
				break;
				case 'mdy':
				dateFormat = 'M/d/yyyy HH:mm:ss';
				break;
				case 'ymd':
				dateFormat = 'yyyy/M/d HH:mm:ss';
				break;
				default:
				dateFormat = 'yyyy-MM-dd HH:mm:ss';
				break;
			}
			let str = "(Based on your local time zone, accounting for all " + count.toLocaleString()
			+ ` exclusive daily ${checkPlural(count, {singular:'skin', plural:'skins'})}.`
			+ ` Auto updates every 15 seconds, and the last update was at ${formatDate(new Date(), dateFormat)}.`;
			closingNotes.innerHTML = str;
		}
		function updateAll() {
			updateInternalData();
			updateTitle();
			updateBody();
			updateClosingNotes();
		};
		updateAll();
		setInterval(updateAll, 15e3);
		
	} else {
		console.log("[Exclusive Skins Daily Logger] [LOG]: Script activation conditions not met. Exiting...");
	}
}