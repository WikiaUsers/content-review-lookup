/*
 * THIS IS NOT A SCRIPT TO BE LOADED ON THE WIKI
 *
 * Instead, this is a script that can be pasted into the browser's console while on a wiki page.
 * This script can be used to generate updated CSS for the parent css page
 */
/* jshint esversion: 9 */

(() => {
	const BASE = 'https://hsbwrp.fewfre.com/Hypixel+_0_18_0/assets/minecraft/mcpatcher/cit';
	
	// needed so parser knows whether an object is a file or folder
	class Folder { constructor(obj){ this._contents = obj; this.isFolder = true; } }
	
	const resourcepack = new Folder({
		'/skyblock': new Folder({
			///////////////////////////
			// Weapons
			///////////////////////////
			'/weapons': new Folder({
				
			}),
			
			///////////////////////////
			// Armor
			///////////////////////////
			'/armor': new Folder({
				"cropie/cropie_boots": { wiki: "Cropie Boots" },
				"cropie/cropie_chestplate": { wiki: "Cropie Chestplate" },
				"cropie/cropie_leggings": { wiki: "Cropie Leggings" },
				"fermento/fermento_boots": { wiki: "Fermento Boots" },
				"fermento/fermento_chestplate": { wiki: "Fermento Chestplate" },
				"fermento/fermento_leggings": { wiki: "Fermento Leggings" },
				"masks/bonzo_mask": { wiki: "Bonzo Mask" },
				"masks/enderman_mask": { wiki: "Enderman Mask" },
				"masks/happy_mask": { wiki: "Happy Mask" },
				"masks/kalhuiki_mask": { wiki: "Kalhuiki Mask" },
				"masks/pig_mask": { wiki: "Pig Mask" },
				"masks/spirit_mask": { wiki: "Spirit Mask" },
				"masks/vampire_mask": { wiki: "Vampire Mask" },
				"masks/vampire_witch_mask": { wiki: "Vampire Witch Mask" },
				"masks/witch_mask": { wiki: "Witch Mask" },
				"melon/melon_boots": { wiki: "Melon Boots" },
				"melon/melon_chestplate": { wiki: "Melon Chestplate" },
				"melon/melon_leggings": { wiki: "Melon Leggings" },
				"rabbit/rabbit_boots": { wiki: "Rabbit Boots" },
				"rabbit/rabbit_chestplate": { wiki: "Rabbit Chestplate" },
				"rabbit/rabbit_helmet": { wiki: "Rabbit Helmet" },
				"rabbit/rabbit_leggings": { wiki: "Rabbit Leggings" },
				"squash/squash_boots": { wiki: "Squash Boots" },
				"squash/squash_chestplate": { wiki: "Squash Chestplate" },
				"squash/squash_leggings": { wiki: "Squash Leggings" },
				"tuxedo/seymour/cashmere_jacket": { wiki: "Cashmere Jacket" },
				"tuxedo/seymour/oxford_shoes": { wiki: "Oxford Shoes" },
				"tuxedo/seymour/satin_trousers": { wiki: "Satin Trousers" },
				"tuxedo/seymour/velvet_top_hat": { wiki: "Velvet Top Hat" },
			}),
			
			///////////////////////////
			// Accessories
			///////////////////////////
			'/accessories': new Folder({
				handy_blood_chalice: { wiki: "Handy Blood Chalice" },
				jake_plushie: { wiki: "Jake's Plushie" },
				
				'/talisman': new Folder({
					soulflow_pile: { wiki: "Soulflow Pile" },
					wolf_paw: { wiki: "Wolf Paw" },
				}),
				
				'/ring': new Folder({
					ring_of_space: { wiki: "Ring of Space" },
					soulflow_battery: { wiki: "Soulflow Battery" },
				}),
				
				'/artifact': new Folder({
					draconic_artifact: { wiki: "Draconic Artifact" },
					great_spook_artifact: { wiki: "Great Spook Artifact" },
					soulflow_supercell: { wiki: "Soulflow Supercell" },
				}),
				
				'/relic': new Folder({
					seal_of_the_family: { wiki: "Seal of the Family" },
				}),
			}),
			
			///////////////////////////
			// Equipment
			///////////////////////////
			'/equipment': new Folder({
				"lotus_belt": { wiki: "Lotus Belt" },
				"lotus_bracelet": { wiki: "Lotus Bracelet" },
				"lotus_cloak": { wiki: "Lotus Cloak" },
				"lotus_necklace": { wiki: "Lotus Necklace" },
			}),
			
			///////////////////////////
			// Fishing Rods
			///////////////////////////
			'/fishing_rods': new Folder({
				farmer_rod: { wiki: "Farmer's Rod" },
				grappling_hook: { wiki: "Grappling Hook" },
				hellfire_rod: { wiki: "Hellfire Rod" },
				ice_rod: { wiki: "Ice Rod" },
				inferno_rod: { wiki: "Inferno Rod" },
				legend_rod: { wiki: "Rod of Legends" },
				magma_rod: { wiki: "Magma Rod" },
				// null_rod: { wiki: "" }, // Not used on wiki
				phantom_rod: { wiki: "Phantom Rod" },
				prismarine_rod: { wiki: "Prismarine Rod" },
				rod_of_the_sea: { wiki: "Rod of the Sea" },
				shiny_rod: { wiki: "Shiny Rod" },
				soul_whip: { wiki: "Soul Whip" },
				speedster_rod: { wiki: "Speedster Rod" },
				sponge_rod: { wiki: "Sponge Rod" },
				starter_lava_rod: { wiki: "Starter Lava Rod" },
				the_shredder: { wiki: "Shredder" },
				winter_rod: { wiki: "Winter Rod" },
				yeti_rod: { wiki: "Yeti Rod" },
				zombie_commander_whip: { wiki: "Zombie Commander Whip" },
				auger_rod: { wiki: "Auger Rod" },
				challenge_rod: { wiki: "Challenging Rod" },
				champ_rod: { wiki: "Rod of Champions" },
				chum_rod: { wiki: "Chum Rod" },
				dirt_rod: { wiki: "Dirt Rod" },
			}),
			
			///////////////////////////
			// Tools
			///////////////////////////
			'/tools': new Folder({
				"combat/jingle_bells": { wiki: "Jingle Bells" },
				"farming/advanced_gardening_axe": { wiki: "Advanced Gardening Axe" },
				"farming/advanced_gardening_hoe": { wiki: "Advanced Gardening Hoe" },
				"farming/basic_gardening_axe": { wiki: "Basic Gardening Axe" },
				"farming/basic_gardening_hoe": { wiki: "Basic Gardening Hoe" },
				"farming/builders_ruler": { wiki: "Builder's Ruler" },
				"farming/garden_scythe": { wiki: "Garden Scythe" },
				"farming/hoe_of_greatest_tilling": { wiki: "Hoe of Greatest Tilling" },
				"farming/melon_dicer_2": { wiki: "Melon Dicer 2.0" },
				"farming/melon_dicer_3": { wiki: "Melon Dicer 3.0" },
				"farming/promising_hoe": { wiki: "Promising Hoe" },
				"farming/pumpkin_dicer_2": { wiki: "Pumpkin Dicer 2.0" },
				"farming/pumpkin_dicer_3": { wiki: "Pumpkin Dicer 3.0" },
				"farming/rookie_hoe": { wiki: "Rookie Hoe" },
				"farming/sam_scythe": { wiki: "Sam's Scythe" },
				"foraging/promising_axe": { wiki: "Promising Axe" },
				"foraging/rookie_axe": { wiki: "Rookie Axe" },
				"mining/bob_omb": { wiki: "Bob-omb" },
				"mining/promising_pickaxe": { wiki: "Promising Pickaxe" },
				"mining/promising_spade": { wiki: "Promising Shovel" },
				"mining/rookie_pickaxe": { wiki: "Rookie Pickaxe" },
				"mining/rookie_spade": { wiki: "Rookie Shovel" },
			}),
			
			///////////////////////////
			// Glitched Items
			///////////////////////////
			'/glitch': new Folder({
				
			}),
			
			///////////////////////////
			// Other Items
			///////////////////////////
			'/items': new Folder({
				"crimson_isle/enchanted_mycelium_cube": { wiki: "Enchanted Mycelium Cube" },
				"crimson_isle/enchanted_red_sand_cube": { wiki: "Enchanted Red Sand Cube" },
				"crimson_isle/enchanted_sulphur_cube": { wiki: "Enchanted Sulphur Cube" },
				"crimson_isle/mob_loot/compact_ooze": { wiki: "Compact Ooze" },
				"crimson_isle/mob_loot/flames": { wiki: "Flames" },
				"crimson_isle/mob_loot/kuudra_teeth": { wiki: "Kuudra Teeth" },
				"crimson_isle/whipped_magma_cream": { wiki: "Whipped Magma Cream" },
				"dungeons/crypt_skull_key": { wiki: "Crypt Skull Key" },
				"dungeons/dungeon_golden_key": { wiki: "Golden Key" },
				"dungeons/dungeon_normal_key": { wiki: "Key" },
				"dungeons/haunt_ability": { wiki: "Haunt Ability" },
				"dungeons/infinite_superboom_tnt": { wiki: "Infinityboom TNT" },
				"dungeons/key_a": { wiki: "Key A" },
				"dungeons/key_b": { wiki: "Key B" },
				"dungeons/key_c": { wiki: "Key C" },
				"dungeons/key_d": { wiki: "Key D" },
				"dungeons/key_f": { wiki: "Key F" },
				"dungeons/key_s": { wiki: "Key S" },
				"dungeons/key_x": { wiki: "Key X" },
				"dungeons/secret_dungeon_redstone_key": { wiki: "Redstone Key" },
				"dungeons/superboom_tnt": { wiki: "Superboom TNT" },
				"dwarven_mines/biofuel": { wiki: "Biofuel" },
				"end/hyper_catalyst_upgrade": { wiki: "Hyper Catalyst Upgrade" },
				"end/sleeping_eye": { wiki: "Sleeping Eye" },
				"end/summoning_eye": { wiki: "Summoning Eye" },
				"events/spooky/bat_firework": { wiki: "Bat Firework" },
				"events/spooky/horseman_candle": { wiki: "Horseman Candle" },
				"pet_items/minos_relic": { wiki: "Minos Relic" },
				"pet_items/pet_item_spooky_cupcake": { wiki: "Spooky Cupcake" },
				"pet_items/reaper_gem": { wiki: "Reaper Gem" },
				"pet_items/ultimate_carrot_candy_upgrade": { wiki: "Ultimate Carrot Candy Upgrade" },
				"reforge_stones/giant_tooth": { wiki: "Giant Tooth" },
				
				'/farming': new Folder({
					// "box_of_seeds": { wiki: "Box of Seeds" }, // not yet added
					"compost": { wiki: "Compost" },
					"condensed_fermento": { wiki: "Condensed Fermento" },
					"cropie": { wiki: "Cropie" },
					"enchanted_compost": { wiki: "Compost Bundle" },
					"fermento": { wiki: "Fermento" },
					"squash": { wiki: "Squash" },
				}),
				
				'/fishing': new Folder({
					"blessed_bait": { wiki: "Blessed Bait" },
					"carrot_bait": { wiki: "Carrot Bait" },
					"corrupted_bait": { wiki: "Corrupted Bait" },
					"dark_bait": { wiki: "Dark Bait" },
					"fish_bait": { wiki: "Fish Bait" },
					"glowy_chum_bait": { wiki: "Glowy Chum Bait" },
					"hot_bait": { wiki: "Hot Bait" },
					"ice_bait": { wiki: "Ice Bait" },
					"light_bait": { wiki: "Light Bait" },
					"minnow_bait": { wiki: "Minnow Bait" },
					"shark_bait": { wiki: "Shark Bait" },
					"spiked_bait": { wiki: "Spiked Bait" },
					"spooky_bait": { wiki: "Spooky Bait" },
					"whale_bait": { wiki: "Whale Bait" },
				}),
				
				'/gemstones': new Folder({
					"amber_crystal": { wiki: "Amber Crystal" },
					"amethyst_crystal": { wiki: "Amethyst Crystal" },
					"jade_crystal": { wiki: "Jade Crystal" },
					"jasper_crystal": { wiki: "Jasper Crystal" },
					"opal_crystal": { wiki: "Opal Crystal" },
					"ruby_crystal": { wiki: "Ruby Crystal" },
					"sapphire_crystal": { wiki: "Sapphire Crystal" },
					"topaz_crystal": { wiki: "Topaz Crystal" },
				}),
				
				'/misc': new Folder({
					"bingo_display": { wiki: "Bingo Display" },
					"collection_display": { wiki: "Collection Display" },
					"colossal_exp_bottle_upgrade": { wiki: "Colossal Experience Bottle Upgrade" },
					"copper": { wiki: "Copper" },
					"ditto_blob": { wiki: "Ditto Blob" },
					"ditto_skin": { wiki: "Ditto Skin" },
					"ditto_skull": { wiki: "Ditto Skull" },
					"heat_core": { wiki: "Heat Core" },
					"hologram": { wiki: "Hologram" },
					"minion_items/everburning_flame": { wiki: "Everburning Flame" },
					"mysterious_crop": { wiki: "Mysterious Crop" },
					"parkour_controller": { wiki: "Parkour Start/End" },
					"parkour_point": { wiki: "Parkour Checkpoint" },
					"parkour_times": { wiki: "Parkour Times" },
					"social_display": { wiki: "Social Display" },
					"unknown_item": { wiki: "Unknown Item" },
				
					'/enrichments': new Folder({
						"talisman_enrichment_attack_speed": { wiki: "Attack Speed Enrichment" },
						"talisman_enrichment_critical_chance": { wiki: "Critical Chance Enrichment" },
						"talisman_enrichment_critical_damage": { wiki: "Critical Damage Enrichment" },
						"talisman_enrichment_defense": { wiki: "Defense Enrichment" },
						"talisman_enrichment_ferocity": { wiki: "Ferocity Enrichment" },
						"talisman_enrichment_health": { wiki: "Health Enrichment" },
						"talisman_enrichment_intelligence": { wiki: "Intelligence Enrichment" },
						"talisman_enrichment_magic_find": { wiki: "Magic Find Enrichment" },
						"talisman_enrichment_sea_creature_chance": { wiki: "Sea Creature Chance Enrichment" },
						"talisman_enrichment_strength": { wiki: "Strength Enrichment" },
						"talisman_enrichment_walk_speed": { wiki: "Speed Enrichment" },
					}),
				
					'/floating_crystals': new Folder({
						"desert_island_crystal": { wiki: "Desert Island Crystal" },
						"farm_crystal": { wiki: "Farm Crystal" },
						"fishing_crystal": { wiki: "Fishing Crystal" },
						"forest_island_crystal": { wiki: "Bat Crystal" },
						"mithril_crystal": { wiki: "Mithril Crystal" },
						"nether_wart_island_crystal": { wiki: "Nether Wart Island Crystal" },
						"resource_regenerator_crystal": { wiki: "Resource Regenerator Crystal" },
						"wheat_island_crystal": { wiki: "Wheat Island Crystal" },
						"winter_island_crystal": { wiki: "Winter Island Crystal" },
						"woodcutting_crystal": { wiki: "Woodcutting Crystal" },
					}),
				
					'/repelling_candle': new Folder({
						"repelling_candle_red": { wiki: ["Repelling Candle", "Red Repelling Candle"] },
						"repelling_candle_aqua": { wiki: "Aqua Repelling Candle" },
						"repelling_candle_black": { wiki: "Black Repelling Candle" },
						"repelling_candle_blue": { wiki: "Blue Repelling Candle" },
						"repelling_candle_brown": { wiki: "Brown Repelling Candle" },
						"repelling_candle_cyan": { wiki: "Cyan Repelling Candle" },
						"repelling_candle_gray": { wiki: "Gray Repelling Candle" },
						"repelling_candle_green": { wiki: "Green Repelling Candle" },
						"repelling_candle_lilac": { wiki: "Lilac Repelling Candle" },
						"repelling_candle_orange": { wiki: "Orange Repelling Candle" },
						"repelling_candle_pink": { wiki: "Pink Repelling Candle" },
						"repelling_candle_purple": { wiki: "Purple Repelling Candle" },
						"repelling_candle_white": { wiki: "White Repelling Candle" },
						"repelling_candle_yellow": { wiki: "Yellow Repelling Candle" },
					}),
				}),
				
				// NOTE: Wiki only ever displays tier 1 runes, so `_2`/`_3` images not used here
				'/runes': new Folder({
					bite_rune: { imgName: "Bite Rune" },
					blood_rune: { imgName: "Blood Rune" },
					clouds_rune: { imgName: "Clouds Rune" },
					couture_rune: { imgName: "Couture Rune" },
					// darkness_within_rune: { imgName: "Darkness Within Rune" }, // not yet in pack
					empty_rune: { imgName: "Empty Rune" },
					enchant_rune: { imgName: "Enchant Rune" },
					end_rune: { imgName: "End Rune" },
					endersnake_rune: { imgName: "Endersnake Rune" },
					fiery_burst_rune: { imgName: "Fiery Burst Rune" },
					fire_spiral_rune: { imgName: "Fire Spiral Rune" },
					gem_rune: { imgName: "Gem Rune" },
					golden_rune: { imgName: "Golden Rune" },
					grand_searing_rune: { imgName: ["Grand Searing Rune", "Grand Searing Rune III"] }, // this one rune for some reason is listed as III
					hearts_rune: { imgName: "Hearts Rune" },
					hot_rune: { imgName: "Hot Rune" },
					ice_rune: { imgName: "Ice Rune" },
					jerry_rune: { imgName: "Jerry Rune" },
					lava_rune: { imgName: "Lava Rune" },
					lavatears_rune: { imgName: "Lavatears Rune" },
					lightning_rune: { imgName: "Lightning Rune" },
					magical_rune: { imgName: "Magical Rune" },
					music_rune: { imgName: "Music Rune" },
					pestilence_rune: { imgName: "Pestilence Rune" },
					rainbow_rune: { imgName: "Rainbow Rune" },
					redstone_rune: { imgName: "Redstone Rune" },
					// slimy_rune: { imgName: "Slimy Rune" }, // not yet in pack
					smokey_rune: { imgName: "Smokey Rune" },
					snake_rune: { imgName: "Snake Rune" },
					snow_rune: { imgName: "Snow Rune" },
					sparkling_rune: { imgName: "Sparkling Rune" },
					spirit_rune: { imgName: "Spirit Rune" },
					tidal_rune: { imgName: "Tidal Rune" },
					wake_rune: { imgName: "Wake Rune" },
					// wet_rune: { imgName: "Wet Rune" }, // not yet in pack
					white_spiral_rune: { imgName: "White Spiral Rune" },
					zap_rune: { imgName: "Zap Rune" },
				}),
				
				'/slayer': new Folder({
					"inferno_demonlord/kelvin_inverter": { wiki: "Kelvin Inverter" },
					"inferno_demonlord/subzero_inverter": { wiki: "Subzero Inverter" },
					"voidgloom_seraph/judgement_core": { wiki: "Judgement Core" },
				}),
				
				'/special': new Folder({
					"game_annihilator": { wiki: "Game Annihilator" },
					"quality_map": { wiki: "Quality Map" },
					"shiny_relic": { wiki: "Shiny Relic" },
					
					'/epoch_cake': new Folder({
						"epoch_cake_aqua": { wiki: "Barry Century Cake" },
						"epoch_cake_black": { wiki: "Century Cake of the Next Dungeon Floor" },
						"epoch_cake_blue": { wiki: "Sea Emperor Century Cake" },
						"epoch_cake_brown": { wiki: "Chocolate Century Cake" },
						"epoch_cake_cyan": { wiki: "Century Cake of Hype" },
						"epoch_cake_gray": { wiki: "Gray Century Cake" },
						"epoch_cake_green": { wiki: "Pet Rock Century Cake" },
						"epoch_cake_lime": { wiki: "Lime Century Cake" },
						"epoch_cake_magenta": { wiki: "Magenta Century Cake" },
						"epoch_cake_orange": { wiki: "Latest Update Century Cake" },
						"epoch_cake_pink": { wiki: "Crab-Colored Century Cake" },
						"epoch_cake_purple": { wiki: "Streamer's Century Cake" },
						"epoch_cake_red": { wiki: "aPunch Century Cake" },
						"epoch_cake_silver": { wiki: "Silver Century Cake" },
						"epoch_cake_white": { wiki: "Cloudy Century Cake" },
						"epoch_cake_yellow": { wiki: "Potato-Style Century Cake" },
					}),
				}),
			}),
		})
	});
	
	// recursive function
	function flattenResourcePackObj(prefix, folder) {
		// Add all files to flat list
		return Object.entries(folder._contents).map(([folderItemName,folderItem]) => 
			// If folder rescursively continue / else it's a file
			folderItem.isFolder
				 ? flattenResourcePackObj(`${prefix}${folderItemName}`, folderItem)
				 : makeFinalizedDataObj(prefix, folderItemName, folderItem)
		).flat();
	}
	
	function makeFinalizedDataObj(packPrefix, packFilename, { wiki, imgName, selectors=[] }) {
		let allSelectors = [ ...selectors ];
		if(wiki) {
			wiki = Array.isArray(wiki) ? wiki : [wiki];
			allSelectors.push(...wiki.map(w=>[`img[alt="${w}"]`, `img[alt="${w}.png"]`]));
		}
		if(imgName) {
			imgName = Array.isArray(imgName) ? imgName : [imgName];
			allSelectors.push(...imgName.map(n=>[`img[data-image-name="${n}.png"]`]));
		}
		
		return { selectors:allSelectors, packUrl:`${packPrefix}/${packFilename}.png` }
	}
	
	const flattenedData = flattenResourcePackObj(BASE, resourcepack);
	
	function packDataToCssRule({ selectors, packUrl }) {
		return `${selectors.join(', ')} { content: url('${packUrl}') }`;
	}
	
	const cssEntries = flattenedData.map(packDataToCssRule);
	
	/////////////////////////////////
	// Display results
	/////////////////////////////////
	function openModal(content) {
		return new Promise((resolve)=>{
			mw.hook('dev.modal').add((module) => {
				const id = 'hsw-rp-hypixel-plus-' + Date.now();
				const modal = new module.Modal({ id, content, size: 'full' });
				modal.create();
				modal.show();
				resolve(id);
			});
		});
	}


	console.log('Completed CSS generation! View the results in the modal on screen!');
	
	cssEntries.unshift('/* Script for updating this page is on MediaWiki:Gadget-ResourcePacks.js/Hypixel+.css/update.js */')
	
	openModal(
		[
			"<div style='color:white; background:darkgrey; padding:8px 8px; margin:0 8px;'>",
			`<textarea style="background:black; color:white; width:100vw; height:50vh;">${cssEntries.join('\n')}</textarea>`,
			`<button id="hsw-rp-hypixel-plus-test-urls">Test if all urls exist on server</button>`,
			'</div>'
		].join('')
	).then((id)=>{
		const btn = document.querySelector(`#${id} #hsw-rp-hypixel-plus-test-urls`);
		btn.addEventListener('click', function(){
			btn.disabled = 'disabled';
			btn.innerHTML = `Checking...`;
			Promise.all(flattenedData.map(({ packUrl }) => fetch(packUrl, { method: "HEAD" }).then(res=>res.ok) )).then(resAll => {
				btn.innerHTML = `Found: ${resAll.filter(r=>r).length} / ${resAll.length}`;
			}).catch(resAll => {
				btn.innerHTML = `Some error occured`;
			});
		});
	});

	return 'Generating CSS...';
})();