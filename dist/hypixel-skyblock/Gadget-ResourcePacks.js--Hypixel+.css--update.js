/*
 * THIS IS NOT A SCRIPT TO BE LOADED ON THE WIKI
 *
 * Instead, this is a script that can be pasted into the browser's console while on a wiki page.
 * This script can be used to generate updated CSS for the parent css page
 */
/* jshint esversion: 9 */

(() => {
	const BASE = 'https://hsbwrp.fewfre.com/Hypixel+_0_19_0/assets/minecraft/mcpatcher/cit';
	
	// needed so parser knows whether an object is a file or folder
	class Folder { constructor(obj){ this._contents = obj; this.isFolder = true; } }
	
	const resourcepack = new Folder({
		'/skyblock': new Folder({
			///////////////////////////
			// Weapons
			///////////////////////////
			'/weapons': new Folder({
				'/swords': new Folder({
					"wyld_sword": { wiki: "Wyld Sword" },
					"leech_sword": { wiki: "Leech Sword" },
					"silver_laced_karambit": { wiki: "Silver-Laced Karambit" },
					"silvertwist_karambit": { wiki: "Silver-Twist Karambit" },
					"tactician_murder_weapon": { wiki: "Tactician's Murder Weapon" },
					"self_recursive_pickaxe": { wiki: "Self-Recursive Pickaxe" },
					"sword_of_the_multiverse": { wiki: "Sword of the Multiverse" },
				}),
			}),
			
			///////////////////////////
			// Armor
			///////////////////////////
			'/armor': new Folder({
				// Solo pieces
				"masks/bonzo_mask": { wiki: "Bonzo Mask" },
				"masks/enderman_mask": { wiki: "Enderman Mask" },
				"masks/happy_mask": { wiki: "Happy Mask" },
				"masks/kalhuiki_mask": { wiki: "Kalhuiki Mask" },
				"masks/pig_mask": { wiki: "Pig Mask" },
				"masks/spirit_mask": { wiki: "Spirit Mask" },
				"masks/vampire_mask": { wiki: "Vampire Mask" },
				"masks/vampire_witch_mask": { wiki: "Vampire Witch Mask" },
				"masks/witch_mask": { wiki: "Witch Mask" },
				"masks/detransfigured_mask": { wiki: "Used Detransfigured Face" },
				"masks/not_deadgehog_mask": { wiki: "Not-Dead-Gehog Mask" },
				"/rift/gunther_sneakers": { wiki: "Gunther's Sneakers" },
				"/rift/exceedingly_comfy_sneakers": { wiki: "Exceedingly Comfy Sneakers" },
				"/rift/orange_chestplate": { wiki: "Orange Chestplate" },
				"/rift/etalptsehc_nori": { wiki: ["etalptsehC norI", "EtalptsehC norI"] },
				"/rift/chicken_leggs": { wiki: "Chicken Leggs" },
				"/rift/lively_sepulture_chestplate": { wiki: "Lively Sepulture Chestplate" },
				"/rift/leggings_of_the_coven_red": { wiki: "Leggings of the Coven" }, // Red is default
				"/rift/snake_in_a_boot": { wiki: "Snake-in-a-Boot" },
				"/rift/femurgrowth_leggings": { wiki: "Femurgrowth Leggings" },
				"/rift/anti_bite_scarf/anti_bite_scarf": { wiki: "Anti-Bite Scarf" },
				// Mythic version - wiki only shows default (red)
				"/rift/anti_bite_scarf/anti_bite_scarf_2_red": { selectors:[`.invslot-item-image[data-minetip-title="&dAnti-Bite Scarf"] img`] },
				
				// Sets
				"cropie/cropie_boots": { wiki: "Cropie Boots" },
				"cropie/cropie_chestplate": { wiki: "Cropie Chestplate" },
				"cropie/cropie_leggings": { wiki: "Cropie Leggings" },
				"fermento/fermento_boots": { wiki: "Fermento Boots" },
				"fermento/fermento_chestplate": { wiki: "Fermento Chestplate" },
				"fermento/fermento_leggings": { wiki: "Fermento Leggings" },
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
				"rift/wyld/wyld_chestplate": { wiki: "Wyld Chain Top" },
				"rift/wyld/wyld_leggings": { wiki: "Wyld Leggings" },
				"rift/wyld/wyld_boots": { wiki: "Wyld Boots" },
			}),
			
			///////////////////////////
			// Accessories
			///////////////////////////
			'/accessories': new Folder({
				'/talisman': new Folder({
					soulflow_pile: { wiki: "Soulflow Pile" },
					wolf_paw: { wiki: "Wolf Paw" },
					"cropie_talisman": { wiki: "Cropie Talisman" },
					"agarimoo_talisman": { wiki: "Agarimoo Talisman" },
					"big_brain_talisman": { wiki: "Big Brain Talisman" },
					"blood_donor_talisman": { wiki: "Blood Donor Talisman" },
					"future_calories": { wiki: "Future Calories Talisman" },
					"lush_talisman": { wiki: "Lush Talisman" },
				}),
				
				'/ring': new Folder({
					ring_of_space: { wiki: "Ring of Space" },
					soulflow_battery: { wiki: "Soulflow Battery" },
					"squash_ring": { wiki: "Squash Ring" },
					"agarimoo_ring": { wiki: "Agarimoo Ring" },
					"blood_donor_ring": { wiki: "Blood Donor Ring" },
					"bluetooth_ring": { wiki: "Bluetooth Ring" },
					"lush_ring": { wiki: "Lush Ring" },
					"ring_of_broken_love": { wiki: "Ring of Broken Love" },
					"dante_ring": { wiki: "Dante Ring" },
				}),
				
				'/artifact': new Folder({
					draconic_artifact: { wiki: "Draconic Artifact" },
					great_spook_artifact: { wiki: "Great Spook Artifact" },
					soulflow_supercell: { wiki: "Soulflow Supercell" },
					"fermento_artifact": { wiki: "Fermento Artifact" },
					"agarimoo_artifact": { wiki: "Agarimoo Artifact" },
					"artifact_of_space": { wiki: "Artifact of Space" },
					"bingo_artifact": { wiki: "Bingo Artifact" },
					"blood_donor_artifact": { wiki: "Blood Donor Artifact" },
					"candy_artifact": { wiki: "Candy Artifact" },
					"crooked_artifact": { wiki: "Crooked Artifact" },
					"hegemony_artifact": { wiki: "Hegemony Artifact" },
					"kuudra_follower_artifact": { wiki: "Kuudra Follower Artifact" },
					"lush_artifact": { wiki: "Lush Artifact" },
					"punchcard_artifact": { wiki: "Punchcard Artifact" },
					"spider_artifact": { wiki: "Spider Artifact" },
					"spiked_atrocity": { wiki: "Spiked Atrocity" },
				}),
				
				'/relic': new Folder({
					seal_of_the_family: { wiki: "Seal of the Family" },
					"bingo_relic": { wiki: "Bingo Relic" },
					"candy_relic": { wiki: "Candy Relic" },
					"kuudra_follower_relic": { wiki: "Kuudra Follower Relic" },
					"vampire_dentist_relic": { wiki: "Vampire Dentist Relic" },
				}),
				
				handy_blood_chalice: { wiki: "Handy Blood Chalice" },
				jake_plushie: { wiki: "Jake's Plushie" },
				"pigs_foot": { wiki: "Pig's Foot" },
				"broken_piggy_bank": { wiki: "Broken Piggy Bank" },
				"cracked_piggy_bank": { wiki: "Cracked Piggy Bank" },
				"garlic_flavored_gummy_bear": { wiki: "Perma-Jelled Garlic-Flavored Re-Heated Gummy Polar Bear" },
				"harmonious_surgery_toolkit": { wiki: "Harmonious Surgery Toolkit" },
				"heirloom/bingo_heirloom": { wiki: "Bingo Heirloom" },
				"hocus_pocus_cipher": { wiki: "Hocus-Pocus Cipher" },
				"piggy_bank": { wiki: "Piggy Bank" },
				"pocket_espresso_machine": { wiki: "Pocket Espresso Machine" },
				"rift_prism": { wiki: "Rift Prism" },
				"test_bucket_please_ignore": { wiki: "Test Bucket Please Ignore" },
				"tiny_dancer": { wiki: "Tiny Dancer" },
				"warding_trinket": { wiki: "Warding Trinket" },
				"miniaturized_tubulator": { wiki: "Miniaturized Tubulator" },
				
				"tiered/crux_talisman/crux_talisman_1": { wiki: "Crux Talisman" },
				"tiered/crux_talisman/crux_talisman_2": { wiki: "Crux Ring" },
				"tiered/crux_talisman/crux_talisman_3": { wiki: "Crux Artifact" },
				"tiered/crux_talisman/crux_talisman_4": { wiki: "Crux Relic" },
				"tiered/crux_talisman/crux_talisman_5": { wiki: "Crux Heirloom" },
				"tiered/crux_talisman/crux_talisman_6": { wiki: "Crux Chronomicon" },
				
				"tiered/pandoras_box/pandoras_box": { wiki: "Pandora's Box" },
				// NOTE: wiki currently only ever shows common slot
				// "tiered/pandoras_box/pandoras_box_uncommon": { wiki: "Pandora's Box (Uncommon)" },
				// "tiered/pandoras_box/pandoras_box_rare": { wiki: "Pandora's Box (Rare)" },
				// "tiered/pandoras_box/pandoras_box_epic": { wiki: "Pandora's Box (Epic)" },
				// "tiered/pandoras_box/pandoras_box_legendary": { wiki: "Pandora's Box (Legendary)" },
				// "tiered/pandoras_box/pandoras_box_mythic": { wiki: "Pandora's Box (Mythic)" },
			}),
			
			///////////////////////////
			// Equipment
			///////////////////////////
			'/equipment': new Folder({
				"lotus_belt": { wiki: "Lotus Belt" },
				"lotus_bracelet": { wiki: "Lotus Bracelet" },
				"lotus_cloak": { wiki: "Lotus Cloak" },
				"lotus_necklace": { wiki: "Lotus Necklace" },
				
				"rift_necklace_inside": { wiki: "Rift Necklace (Inside)" },
				"rift_necklace_outside": { wiki: "Rift Necklace (Outside)" },
				"enigma_cloak": { wiki: "Enigma Cloak" },
				"disinfestor_gloves": { wiki: "Disinfestor Gloves" },
				"silkrider_safety_belt": { wiki: "Silkrider Safety Belt" },
				"leech_belt": { wiki: "Leech Belt" },
				"vermin_belt": { wiki: "Vermin Belt" },
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
				"/arrows/arrow_bundle_magma": { wiki: "Magma Arrow Bundle" },
				"/combat/jingle_bells": { wiki: "Jingle Bells" },
				"/combat/holy_ice": { wiki: "Holy Ice" },
				"/combat/steak_stake": { wiki: "Steak Stake" },
				"/combat/voodoo_doll_wilted": { wiki: "Jinxed Voodoo Doll" },
				"/combat/weirder_tuba": { wiki: "Weirder Tuba" },
				
				"foraging/promising_axe": { wiki: "Promising Axe" },
				"foraging/rookie_axe": { wiki: "Rookie Axe" },
				"mining/bob_omb": { wiki: "Bob-omb" },
				"mining/promising_pickaxe": { wiki: "Promising Pickaxe" },
				"mining/promising_spade": { wiki: "Promising Shovel" },
				"mining/rookie_pickaxe": { wiki: "Rookie Pickaxe" },
				"mining/rookie_spade": { wiki: "Rookie Shovel" },
				
				"/abiphones/aatrox_badphone": { wiki: "Maddox Badphone" },
				
				'/drills': new Folder({
					'/drill_parts': new Folder({
						"drill_engine": { wiki: "Drill Engine" },
						"mithril_drill_engine": { wiki: "Mithril-Plated Drill Engine" },
						"titanium_drill_engine": { wiki: "Titanium-Plated Drill Engine" },
						"ruby_polished_drill_engine": { wiki: "Ruby-Polisged Drill Engine" },
						"sapphire_polished_drill_engine": { wiki: "Sapphire-Polished Drill Engine" },
						"amber_polished_drill_engine": { wiki: "Amber-Polished Drill Engine" },
						"fuel_tank": { wiki: "Fuel Tank" },
						"mithril_fuel_tank": { wiki: "Mithril-Infused Fuel Tank" },
						"titanium_fuel_tank": { wiki: "Titanium-Infused Fuel Tank" },
						"gemstone_fuel_tank": { wiki: "Gemstone Fuel Tank" },
						"perfectly_cut_fuel_tank": { wiki: "Perfectly-Cut Fuel Tank" },
					}),
				}),
				
				'/farming': new Folder({
					"advanced_gardening_axe": { wiki: "Advanced Gardening Axe" },
					"advanced_gardening_hoe": { wiki: "Advanced Gardening Hoe" },
					"basic_gardening_axe": { wiki: "Basic Gardening Axe" },
					"basic_gardening_hoe": { wiki: "Basic Gardening Hoe" },
					"builders_ruler": { wiki: "Builder's Ruler" },
					"garden_scythe": { wiki: "Garden Scythe" },
					"hoe_of_greatest_tilling": { wiki: "Hoe of Greatest Tilling" },
					"melon_dicer_2": { wiki: "Melon Dicer 2.0" },
					"melon_dicer_3": { wiki: "Melon Dicer 3.0" },
					"promising_hoe": { wiki: "Promising Hoe" },
					"pumpkin_dicer_2": { wiki: "Pumpkin Dicer 2.0" },
					"pumpkin_dicer_3": { wiki: "Pumpkin Dicer 3.0" },
					"rookie_hoe": { wiki: "Rookie Hoe" },
					"sam_scythe": { wiki: "Sam's Scythe" },
				})
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
				"crimson_isle/mob_loot/corrupted_fragment": { wiki: "Corrupted Fragment" },
				"dwarven_mines/biofuel": { wiki: "Biofuel" },
				"dwarven_mines/concentrated_stone": { wiki: "Concentrated Stone" },
				"dwarven_mines/control_switch": { wiki: "Control Switch" },
				"dwarven_mines/electron_transmitter": { wiki: "Electron Transmitter" },
				"dwarven_mines/ftx_3070": { wiki: "FTX 3070" },
				"dwarven_mines/robotron_reflector": { wiki: "Robotron Reflector" },
				"dwarven_mines/royal_pigeon": { wiki: "Royal Pigeon" },
				"dwarven_mines/superlite_motor": { wiki: "Superlite Motor" },
				"dwarven_mines/synthetic_heart": { wiki: "Synthetic Heart" },
				"end/hyper_catalyst_upgrade": { wiki: "Hyper Catalyst Upgrade" },
				"end/sleeping_eye": { wiki: "Sleeping Eye" },
				"end/summoning_eye": { wiki: "Summoning Eye" },
				"events/spooky/bat_firework": { wiki: "Bat Firework" },
				"events/spooky/horseman_candle": { wiki: "Horseman Candle" },
				"events/jerry/jerry_box_blue": { wiki: "Blue Jerry Box" },
				"events/jerry/jerry_box_golden": { wiki: "Golden Jerry Box" },
				"events/jerry/jerry_box_green": { wiki: "Green Jerry Box" },
				"events/jerry/jerry_box_mega": { wiki: "Mega Jerry Box" },
				"events/jerry/jerry_box_purple": { wiki: "Purple Jerry Box" },
				"modifiers/polarvoid_book": { wiki: "Polarvoid Book" },
				"modifiers/enchanted_book_bundle": { wiki: "Enchanted Book Bundle" },
				"modifiers/kuudra_washing_machine": { wiki: "Kuudra Washing Machine" },
				"modifiers/sil_ex": { wiki: "Silex" },
				
				'/backpacks': new Folder({
					"jumbo_backpack_upgrade": { wiki: "Jumbo Backpack Upgrade" },
					"trick_or_treat_bag": { wiki: "Trick or Treat Bag" },
				
					"small_backpack": { wiki: "Small Backpack" },
					"small_backpack_red": { wiki: "Small Backpack (Red)" },
					"small_backpack_orange": { wiki: "Small Backpack (Orange)" },
					"small_backpack_yellow": { wiki: "Small Backpack (Yellow)" },
					"small_backpack_lime": { wiki: "Small Backpack (Lime)" },
					"small_backpack_green": { wiki: "Small Backpack (Green)" },
					"small_backpack_aqua": { wiki: "Small Backpack (Light Blue)" },
					"small_backpack_cyan": { wiki: "Small Backpack (Cyan)" },
					"small_backpack_blue": { wiki: "Small Backpack (Blue)" },
					"small_backpack_purple": { wiki: "Small Backpack (Purple)" },
					"small_backpack_magenta": { wiki: "Small Backpack (Magenta)" },
					"small_backpack_pink": { wiki: "Small Backpack (Pink)" },
					"small_backpack_brown": { wiki: "Small Backpack (Brown)" },
					"small_backpack_black": { wiki: "Small Backpack (Black)" },
					"small_backpack_gray": { wiki: "Small Backpack (Gray)" },
					"small_backpack_silver": { wiki: "Small Backpack (Light Gray)" },
					"small_backpack_white": { wiki: "Small Backpack (White)" },
					"medium_backpack": { wiki: "Medium Backpack" },
					"medium_backpack_red": { wiki: "Medium Backpack (Red)" },
					"medium_backpack_orange": { wiki: "Medium Backpack (Orange)" },
					"medium_backpack_yellow": { wiki: "Medium Backpack (Yellow)" },
					"medium_backpack_lime": { wiki: "Medium Backpack (Lime)" },
					"medium_backpack_green": { wiki: "Medium Backpack (Green)" },
					"medium_backpack_aqua": { wiki: "Medium Backpack (Light Blue)" },
					"medium_backpack_cyan": { wiki: "Medium Backpack (Cyan)" },
					"medium_backpack_blue": { wiki: "Medium Backpack (Blue)" },
					"medium_backpack_purple": { wiki: "Medium Backpack (Purple)" },
					"medium_backpack_magenta": { wiki: "Medium Backpack (Magenta)" },
					"medium_backpack_pink": { wiki: "Medium Backpack (Pink)" },
					"medium_backpack_brown": { wiki: "Medium Backpack (Brown)" },
					"medium_backpack_black": { wiki: "Medium Backpack (Black)" },
					"medium_backpack_gray": { wiki: "Medium Backpack (Gray)" },
					"medium_backpack_silver": { wiki: "Medium Backpack (Light Gray)" },
					"medium_backpack_white": { wiki: "Medium Backpack (White)" },
					"large_backpack": { wiki: "Large Backpack" },
					"large_backpack_red": { wiki: "Large Backpack (Red)" },
					"large_backpack_orange": { wiki: "Large Backpack (Orange)" },
					"large_backpack_yellow": { wiki: "Large Backpack (Yellow)" },
					"large_backpack_lime": { wiki: "Large Backpack (Lime)" },
					"large_backpack_green": { wiki: "Large Backpack (Green)" },
					"large_backpack_aqua": { wiki: "Large Backpack (Light Blue)" },
					"large_backpack_cyan": { wiki: "Large Backpack (Cyan)" },
					"large_backpack_blue": { wiki: "Large Backpack (Blue)" },
					"large_backpack_purple": { wiki: "Large Backpack (Purple)" },
					"large_backpack_magenta": { wiki: "Large Backpack (Magenta)" },
					"large_backpack_pink": { wiki: "Large Backpack (Pink)" },
					"large_backpack_brown": { wiki: "Large Backpack (Brown)" },
					"large_backpack_black": { wiki: "Large Backpack (Black)" },
					"large_backpack_gray": { wiki: "Large Backpack (Gray)" },
					"large_backpack_silver": { wiki: "Large Backpack (Light Gray)" },
					"large_backpack_white": { wiki: "Large Backpack (White)" },
					"greater_backpack": { wiki: "Greater Backpack" },
					"greater_backpack_red": { wiki: "Greater Backpack (Red)" },
					"greater_backpack_orange": { wiki: "Greater Backpack (Orange)" },
					"greater_backpack_yellow": { wiki: "Greater Backpack (Yellow)" },
					"greater_backpack_lime": { wiki: "Greater Backpack (Lime)" },
					"greater_backpack_green": { wiki: "Greater Backpack (Green)" },
					"greater_backpack_aqua": { wiki: "Greater Backpack (Light Blue)" },
					"greater_backpack_cyan": { wiki: "Greater Backpack (Cyan)" },
					"greater_backpack_blue": { wiki: "Greater Backpack (Blue)" },
					"greater_backpack_purple": { wiki: "Greater Backpack (Purple)" },
					"greater_backpack_magenta": { wiki: "Greater Backpack (Magenta)" },
					"greater_backpack_pink": { wiki: "Greater Backpack (Pink)" },
					"greater_backpack_brown": { wiki: "Greater Backpack (Brown)" },
					"greater_backpack_black": { wiki: "Greater Backpack (Black)" },
					"greater_backpack_gray": { wiki: "Greater Backpack (Gray)" },
					"greater_backpack_silver": { wiki: "Greater Backpack (Light Gray)" },
					"greater_backpack_white": { wiki: "Greater Backpack (White)" },
					"jumbo_backpack": { wiki: "Jumbo Backpack" },
					"jumbo_backpack_red": { wiki: "Jumbo Backpack (Red)" },
					"jumbo_backpack_orange": { wiki: "Jumbo Backpack (Orange)" },
					"jumbo_backpack_yellow": { wiki: "Jumbo Backpack (Yellow)" },
					"jumbo_backpack_lime": { wiki: "Jumbo Backpack (Lime)" },
					"jumbo_backpack_green": { wiki: "Jumbo Backpack (Green)" },
					"jumbo_backpack_aqua": { wiki: "Jumbo Backpack (Light Blue)" },
					"jumbo_backpack_cyan": { wiki: "Jumbo Backpack (Cyan)" },
					"jumbo_backpack_blue": { wiki: "Jumbo Backpack (Blue)" },
					"jumbo_backpack_purple": { wiki: "Jumbo Backpack (Purple)" },
					"jumbo_backpack_magenta": { wiki: "Jumbo Backpack (Magenta)" },
					"jumbo_backpack_pink": { wiki: "Jumbo Backpack (Pink)" },
					"jumbo_backpack_brown": { wiki: "Jumbo Backpack (Brown)" },
					"jumbo_backpack_black": { wiki: "Jumbo Backpack (Black)" },
					"jumbo_backpack_gray": { wiki: "Jumbo Backpack (Gray)" },
					"jumbo_backpack_silver": { wiki: "Jumbo Backpack (Light Gray)" },
					"jumbo_backpack_white": { wiki: "Jumbo Backpack (White)" },
					
					'/skins': new Folder({
						"enderpack": { wiki: "Enderpack Skin" },
						"green_egg": { wiki: "Green Egged Skin" },
						"purple_egg": { wiki: "Purple Egged Skin" },
						"blue_egg": { wiki: "Blue Egged Skin" },
						"babyseal_backpack": { wiki: "Baby Seal Backpack Skin" },
						"penguin_backpack": { wiki: "Penguin Backpack Skin" },
						"reindeer_backpack": { wiki: "Reindeer Backpack Skin" },
					}),
				}),
				
				'/dungeons': new Folder({
					"crypt_skull_key": { wiki: "Crypt Skull Key" },
					"dungeon_golden_key": { wiki: "Golden Key" },
					"dungeon_normal_key": { wiki: "Key" },
					"haunt_ability": { wiki: "Haunt Ability" },
					"infinite_superboom_tnt": { wiki: "Infinityboom TNT" },
					"key_a": { wiki: "Key A" },
					"key_b": { wiki: "Key B" },
					"key_c": { wiki: "Key C" },
					"key_d": { wiki: "Key D" },
					"key_f": { wiki: "Key F" },
					"key_s": { wiki: "Key S" },
					"key_x": { wiki: "Key X" },
					"secret_dungeon_redstone_key": { wiki: "Redstone Key" },
					"superboom_tnt": { wiki: "Superboom TNT" },
					"training_weights": { wiki: "Training Weights" },
					"dungeon_lore_journal": { wiki: "Dungeon Lore Journal" },
				}),
				
				'/farming': new Folder({
					// "box_of_seeds": { wiki: "Box of Seeds" }, // not yet added
					"compost": { wiki: "Compost" },
					"condensed_fermento": { wiki: "Condensed Fermento" },
					"cropie": { wiki: "Cropie" },
					"enchanted_compost": { wiki: "Compost Bundle" },
					"fermento": { wiki: "Fermento" },
					"squash": { wiki: "Squash" },
					"box_of_seeds": { wiki: "Box of Seeds" },
					"mutant_nether_stalk": { wiki: "Mutant Nether Wart" },
					"polished_pumpkin": { wiki: "Polished Pumpkin" },
					"tightly_tied_hay_bale": { wiki: "Tightly-Tied Hay Bale" },
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
					"agaricus_chum_cap": { wiki: "Agaricus Chumcap" },
					"agarimoo_tongue": { wiki: "Agarimoo Tongue" },
					"empty_chumcap_bucket": { wiki: "Empty Chumcap Bucket" },
					"full_chumcap_bucket": { wiki: "Full Chumcap Bucket" },
					"empty_chum_bucket": { wiki: "Empty Chum Bucket" },
					"full_chum_bucket": { wiki: "Full Chum Bucket" },
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
					"copper": { wiki: ["Copper", "Copper (currency)"] },
					"ditto_blob": { wiki: "Ditto Blob" },
					"ditto_skin": { wiki: "Ditto Skin" },
					"ditto_skull": { wiki: "Ditto Skull" },
					"heat_core": { wiki: "Heat Core" },
					"hologram": { wiki: "Hologram" },
					"magical_water_bucket": { wiki: "Plumber's Bucket" },
					"minion_items/everburning_flame": { wiki: "Everburning Flame" },
					"mysterious_crop": { wiki: "Mysterious Crop" },
					"parkour_controller": { wiki: "Parkour Start/End" },
					"parkour_point": { wiki: "Parkour Checkpoint" },
					"parkour_times": { wiki: "Parkour Times" },
					"social_display": { wiki: "Social Display" },
					"unknown_item": { wiki: "Unknown Item" },
					"booster_cookie_box": { wiki: "Box of Booster Cookies" },
					"flower_maelstrom": { wiki: "Flower Maelstrom" },
					"heat_core": { wiki: "Magma Bucket Upgrade" },
					"kuudra_relic": { wiki: "Kuudra Relic" },
					"minion_items/auto_smelter": { wiki: "Auto Smelter" },
					"minion_items/solar_panel": { wiki: "Solar Panel" },
					"minion_storage_expander": { wiki: "Greater Storage Upgrade" },
					"minion_storage_expander": { wiki: "Minion Storage X-Pender" },
					"poorly_wrapped_rock": { wiki: "Poorly Wrapped Rock" },
					"shiny_orb": { wiki: "Shiny Orb" },
					"shiny_shard": { wiki: "Shiny Shard" },
					"toy": { wiki: "Toy" },
					"very_official_yellow_rock": { wiki: "Very Official Yellow Rock of Love!" },
					"warts_stew": { wiki: "Mushroom & Warts Stew" },
					"wheel_of_fate": { wiki: "Wheel of Fate" },
					"yellow_rock": { wiki: "Yellow Rock" },
					"poison_sample": { wiki: "Poison Sample" },
				
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
				
				'/pet_items': new Folder({
					"fake_neuroscience_degree": { wiki: "Fake Neuroscience Degree" },
					"four_eyed_fish": { wiki: "Four-Eyed Fish" },
					"minos_relic": { wiki: "Minos Relic" },
					"pet_item_spooky_cupcake": { wiki: "Spooky Cupcake" },
					"reaper_gem": { wiki: "Reaper Gem" },
					"ultimate_carrot_candy_upgrade": { wiki: "Ultimate Carrot Candy Upgrade" },
					"yellow_bandana": { wiki: "Yellow Bandana" },
					"green_bandana": { wiki: "Green Bandana" },
					"base_griffin_upgrade_stone": { wiki: "Base Griffin Upgrade Stone" },
					"dwarf_turtle_shelmet": { wiki: "Dwarf Turtle Shelmet" },
					"griffin_upgrade_stone_epic": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_legendary": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_rare": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_uncommon": { wiki: "Griffin Upgrade Stone" },
					"guardian_lucky_block": { wiki: "Guardian Lucky Block" },
				}),
				
				'/potions': new Folder({
					"mixins/zombie_brain_mixin": { wiki: "Zombie Brain Mixin" },
					"mixins/spider_egg_mixin": { wiki: "Spider Egg Mixin" },
					"mixins/wolf_fur_mixin": { wiki: "Wolf Fur Mixin" },
					"mixins/end_portal_fumes_mixin": { wiki: "End Portal Fumes" },
					"mixins/gabagoey_mixin": { wiki: "Gabagoey Mixin" },
					"mixins/deepterror_mixin": { wiki: "Deepterror Mixin" },
				}),
				
				'/rift': new Folder({
					"bacte_fragment": { wiki: "Bacte Fragment" },
					"mirrored_stick": { wiki: ["kcitS", "KcitS"] },
					"mirrored_slime_ball": { wiki: ["llabemilS", "LlabemilS"] },
					"mirrored_string": { wiki: ["gnirtS", "GnirtS"] },
					"tiny_hammer": { wiki: ["remmaH yniT", "RemmaH yniT"] },
					"mirrored_bow": { wiki: ["woB", "WoB"] },
					"mirrored_leash": { wiki: ["daeL", "DaeL"] },
					"mirrored_fishing_rod": { wiki: ["doR gnihsiF", "DoR gnihsiF"] },
					"mirrored_wood": { wiki: ["sknalP dooW kaO", "SknalP dooW kaO"] },
					"rift_jump_elixir": { wiki: "Jump Elixir" },
					"rift_strength_elixir": { wiki: "Strength Elixir" },
					"rift_stability_elixir": { wiki: "Stability Elixir" },
					"rift_speed_elixir": { wiki: "Speed Elixir" },
					"shame_crux": { wiki: "Shy Crux" },
					"shadow_crux": { wiki: "Shadow Crux" },
					"volt_crux": { wiki: "Volt Crux" },
					"scribe_crux": { wiki: "Scribe Crux" },
					"frosty_crux": { wiki: "Frosty Crux" },
					"splatter_crux": { wiki: "Splatter Crux" },
					"lil_pad": { wiki: "Lil' Pad" },
					"deadgehog_spine": { wiki: "Deadgehog Spine" },
					"dark_pebble": { wiki: "Dark Pebble" },
					"family_doubloon": { wiki: "Doubloon of the Family" },
					"empty_odonata_bottle": { wiki: "Empty Odonata Bottle" },
					"bottled_odonata": { wiki: "Bottled Odonata" },
					"wizard_breadcrumbs": { wiki: "Wizard's Breadcrumbs" },
					"glyph_conclamatus": { wiki: "Conclamatus Glyph" },
					"glyph_firmitas": { wiki: "Firmitas Glyph" },
					"glyph_fortis": { wiki: "Fortis Glyph" },
					"glyph_pernimius": { wiki: "Pernimius Glyph" },
					"glyph_potentia": { wiki: "Potentia Glyph" },
					"glyph_validus": { wiki: "Validus Glyph" },
					"glyph_robur": { wiki: "Robur Glyph" },
					"glyph_vis": { wiki: "Vis Glyph" },
					"cruxmotion": { wiki: "Cruxmotion" },
					"aspect_of_the_leech_1": { wiki: "Aspect of the Leech" },
					"nearly_whole_carrot": { wiki: "Nearly-Whole Carrot" },
					"half_eaten_carrot": { wiki: "Half-Eaten Carrot" },
					"nearly_coherent_rod": { wiki: "Nearly Coherent doR gnihsiF" },
					"leech_supreme_fragment": { wiki: "Leech Supreme Fragment" },
					"key_to_kat_soul": { wiki: "Key to Infested House Soul" },
					"hot_dog": { wiki: "Hot Dog" },
					"agaricus_cap": { wiki: "Agaricus Cap" },
					"wilted_berberis": { wiki: "Wilted Berberis" },
					"wilted_berberis_bunch": { wiki: "Wilted Berberis Bunch" },
					"lush_berberis": { wiki: "Lush Berberis" },
					"enchanted_lush_berberis": { wiki: "Enchanted Lush Berberis" },
					"berberis_blowgun": { wiki: "Berberis Blowgun" },
					"vampiric_melon": { wiki: "Vampiric Melon" },
					"living_metal": { wiki: "Living Metal" },
					"nullified_metal": { wiki: "Nullified Metal" },
					"frozen_water": { wiki: "Frozen Water" },
					"frozen_water_pungi": { wiki: "Frozen Water Pungi" },
					"barry_pen": { wiki: "Barry's Montgray Pen" },
					"dead_cat_detector": { wiki: "Dead Cat Detector" },
					"dead_cat_detector": { wiki: "Cat Detector" },
					"gunthesizer_lichen": { wiki: "Gunthesizer Lichen" },
					"living_metal_anvil": { wiki: "Living Metal Anchor" },
					"wand_of_warding": { wiki: "Warding Diamathame" },
					"lm_egg_cap": { wiki: "Living Metal Capspawn" },
					"lm_egg_chest": { wiki: "Living Metal Chestspawn" },
					"lm_egg_legs": { wiki: "Living Metal Pantspawn" },
					"lm_egg_boots": { wiki: "Living Metal Bootspawn" },
					"bedwars_wool": { wiki: "Tree-like Wool" },
					"metal_heart": { wiki: "Living Metal Heart" },
					"exportable_carrots": { wiki: "Exportable Carrots" },
					"metaphoric_egg": { wiki: "Metaphoric Egg" },
					"dead_cat_food": { wiki: "Dead Cat Food" },
					"tasty_cat_food": { wiki: "Tasty Cat Food" },
					"larva_silk": { wiki: "Larva Silk" },
					"reed_boat": { wiki: "Rift Boat" },
					"caducous_stem": { wiki: "Caducous Stem" },
					"caducous_stem_bunch": { wiki: "Caducous Stem Bunch" },
					"caducous_extract": { wiki: "Caducous Extract" },
					"caducous_legume": { wiki: "Caducous Legume" },
					"caducous_feeder": { wiki: "Caducous Feeder" },
					"agaricus_soup": { wiki: "Agaricus Soup" },
					"agaricus_cap_bunch": { wiki: "Agaricus Cap Bunch" },
					"berberis_fuel_injector": { wiki: "Berberis Fuel Injector" },
					"silkwire_stick": { wiki: "Silkwire Stick" },
					"larva_hook": { wiki: "Larva Hook" },
					"proto_chicken": { wiki: "Proto-Chicken" },
					"very_scientific_paper": { wiki: "Very Scientific Paper" },
					"anti_morph_potion": { wiki: "Anti-Morph Potion" },
					"muted_bark": { wiki: "Muted Bark" },
					"emmett_pointer": { wiki: "Emmett Pointer" },
					"pre_digestion_fish": { wiki: "Pre-Digestion Fish" },
					"detective_scanner": { wiki: "Detective Scanner" },
					"turbomax_vacuum": { wiki: "Turbomax Vacuum Cleaner" },
					"horsezooka": { wiki: "Horsezooka" },
					"hemovibe": { wiki: "Hemovibe" },
					"hemoglass": { wiki: "Hemoglass" },
					"hemobomb": { wiki: "Hemobomb" },
					
					"rift_trophy_wyldly_supreme": { wiki: "Supreme Timecharm" },
					"rift_trophy_mirrored": { wiki: ["mrahcemiT esrevrorriM", "MrahcemiT esrevrorriM"] },
					"rift_trophy_chicken_n_egg": { wiki: "Chicken N Egg Timecharm" },
					"rift_trophy_citizen": { wiki: "SkyBlock Citizen Timecharm" },
					"rift_trophy_lazy_living": { wiki: "Living Timecharm" },
					"rift_trophy_slime": { wiki: "Globulate Timecharm" },
					"rift_trophy_vampiric": { wiki: "Vampiric Timecharm" },
					"rift_trophy_mountain": { wiki: "Mountain Timecharm" },
				}),
				
				'/reforge_stones': new Folder({
					"bubba_blister": { wiki: "Bubba Blister" },
					"chocolate_chip": { wiki: "Fang-tastic Chocolate Chip" },
					"full_jaw_fanging_kit": { wiki: "Full-Jaw Fanging Kit" },
					"giant_tooth": { wiki: "Giant Tooth" },
					"presumed_gallon_of_red_paint": { wiki: "Presumed Gallon of Red Paint" },
					"large_walnut": { wiki: "Large Walnut" },
					"overgrown_grass": { wiki: "Overgrown Grass" },
					"skymart_brochure": { wiki: "SkyMart Brochure" },
					"flowering_bouquet": { wiki: "Flowering Bouquet" },
					"burrowing_spores": { wiki: "Burrowing Spores" },
					"terry_snowglobe": { wiki: "Terry's Snowglobe" },
					"frozen_bauble": { wiki: "Frozen Bauble" },
					"salmon_opal": { wiki: "Salmon Opal" },
					"pure_mithril": { wiki: "Pure Mithril" },
					"shiny_prism": { wiki: "Shiny Prism" },
					"mandraa": { wiki: "Mandraa" },
					"dark_orb": { wiki: "Dark Orb" },
					"hot_stuff": { wiki: "Hot Stuff" },
					"amber_material": { wiki: "Amber Material" },
					"blessed_fruit": { wiki: "Blessed Fruit" },
					"pitchin_koi": { wiki: "Pitchin' Koi" },
					"acacia_birdhouse": { wiki: "Acacia Birdhouse" },
					"rock_gemstone": { wiki: "Rock Gemstone" },
					"onyx": { wiki: "Onyx" },
					"eccentric_painting_bundle": { wiki: "Eccentric Painting Bundle" },
					"moil_log": { wiki: "Moil Log" },
					"toil_log": { wiki: "Toil Log" },
					"refined_amber": { wiki: "Refined Amber" },
					"jerry_stone": { wiki: "Jerry Stone" },
					"bulky_stone": { wiki: "Bulky Stone" },
					"rock_candy": { wiki: "Rock Candy" },
					"hazmat_enderman": { wiki: "Hazmat Enderman" },
					"red_scarf": { wiki: "Red Scarf" },
					"entropy_suppressor": { wiki: "Entropy Suppressor" },
					"hardened_wood": { wiki: "Hardened Wood" },
					"molten_cube": { wiki: "Molten Cube" },
					"spirit_decoy": { wiki: "Spirit Stone" },
					"aote_stone": { wiki: "Warped Stone" },
					"searing_stone": { wiki: "Searing Stone" },
					"displaced_leech": { wiki: "Displaced Leech" },
				}),
				
				// NOTE: Wiki only ever displays tier 1 runes, so `_2`/`_3` images not used here
				'/runes': new Folder({
					bite_rune: { imgName: "Bite Rune" },
					blood_rune: { imgName: "Blood Rune" },
					clouds_rune: { imgName: "Clouds Rune" },
					couture_rune: { imgName: "Couture Rune" },
					// darkness_within_rune: { imgName: "Darkness Within Rune" }, // not yet in pack
					rune: { imgName: "Empty Rune" },
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
					slimy_rune: { imgName: "Slimy Rune" },
					smokey_rune: { imgName: "Smokey Rune" },
					snake_rune: { imgName: "Snake Rune" },
					snow_rune: { imgName: "Snow Rune" },
					soultwist_rune: { imgName: ["Soultwist Rune", "Soultwist Rune I"] },
					soultwist_rune_2: { imgName: "Soultwist Rune II" },
					soultwist_rune_3: { imgName: "Soultwist Rune III" },
					sparkling_rune: { imgName: "Sparkling Rune" },
					spellbound_rune: { imgName: ["Spellbound Rune", "Spellbound Rune I"] },
					spellbound_rune_2: { imgName: "Spellbound Rune II" },
					spellbound_rune_3: { imgName: "Spellbound Rune III" },
					spirit_rune: { imgName: "Spirit Rune" },
					tidal_rune: { imgName: "Tidal Rune" },
					unique_rune: { imgName: "Unique Rune" },
					wake_rune: { imgName: "Wake Rune" },
					// wet_rune: { imgName: "Wet Rune" }, // not yet in pack
					white_spiral_rune: { imgName: "White Spiral Rune" },
					zap_rune: { imgName: "Zap Rune" },
				}),
				
				'/sacks': new Folder({
					"small_agronomy_sack": { wiki: "Small Agronomy Sack" },
					"small_combat_sack": { wiki: "Small Combat Sack" },
					"small_dragon_sack": { wiki: "Small Dragon Sack" },
					"small_fishing_sack": { wiki: "Small Fishing Sack" },
					"small_foraging_sack": { wiki: "Small Foraging Sack" },
					"small_gemstone_sack": { wiki: "Small Gemstone Sack" },
					"small_husbandry_sack": { wiki: "Small Husbandry Sack" },
					"small_lava_fishing_sack": { wiki: "Small Lava Fishing Sack" },
					"small_mining_sack": { wiki: "Small Mining Sack" },
					"small_nether_sack": { wiki: "Small Nether Sack" },
					"small_runes_sack": { wiki: "Small Runes Sack" },
					"small_slayer_sack": { wiki: "Small Slayer Sack" },
					"medium_agronomy_sack": { wiki: "Medium Agronomy Sack" },
					"medium_combat_sack": { wiki: "Medium Combat Sack" },
					"medium_dragon_sack": { wiki: "Medium Dragon Sack" },
					"medium_fishing_sack": { wiki: "Medium Fishing Sack" },
					"medium_foraging_sack": { wiki: "Medium Foraging Sack" },
					"medium_gemstone_sack": { wiki: "Medium Gemstone Sack" },
					"medium_husbandry_sack": { wiki: "Medium Husbandry Sack" },
					"medium_lava_fishing_sack": { wiki: "Medium Lava Fishing Sack" },
					"medium_mining_sack": { wiki: "Medium Mining Sack" },
					"medium_nether_sack": { wiki: "Medium Nether Sack" },
					"medium_runes_sack": { wiki: "Medium Runes Sack" },
					"medium_slayer_sack": { wiki: "Medium Slayer Sack" },
					"large_agronomy_sack": { wiki: "Large Agronomy Sack" },
					"large_combat_sack": { wiki: "Large Combat Sack" },
					"large_dragon_sack": { wiki: "Large Dragon Sack" },
					"large_fishing_sack": { wiki: "Large Fishing Sack" },
					"large_foraging_sack": { wiki: "Large Foraging Sack" },
					"large_gemstone_sack": { wiki: "Large Gemstone Sack" },
					"large_husbandry_sack": { wiki: "Large Husbandry Sack" },
					"large_lava_fishing_sack": { wiki: "Large Lava Fishing Sack" },
					"large_mining_sack": { wiki: "Large Mining Sack" },
					"large_nether_sack": { wiki: "Large Nether Sack" },
					"large_runes_sack": { wiki: "Large Runes Sack" },
					"large_slayer_sack": { wiki: "Large Slayer Sack" },
					"large_enchanted_agronomy_sack": { wiki: "Large Enchanted Agronomy Sack" },
					"large_enchanted_combat_sack": { wiki: "Large Enchanted Combat Sack" },
					"large_enchanted_fishing_sack": { wiki: "Large Enchanted Fishing Sack" },
					"large_enchanted_foraging_sack": { wiki: "Large Enchanted Foraging Sack" },
					"extra_large_gemstone_sack": { wiki: "Extra Large Gemstone Sack" },
					"large_enchanted_husbandry_sack": { wiki: "Large Enchanted Husbandry Sack" },
					"large_enchanted_mining_sack": { wiki: "Large Enchanted Mining Sack" },
					"crystal_hollows_sack": { wiki: "Crystal Hollows Sack" },
					"dwarven_mines_sack": { wiki: "Dwarven Mines Sack" },
					"flower_sack": { wiki: "Flower Sack" },
					"large_candy_sack": { wiki: "Spooky Sack" },
					"large_dungeon_sack": { wiki: "Dungeon Sack" },
					"large_winter_sack": { wiki: "Winter Sack" },
					"rune_sack": { wiki: "Rune Sack" },
					"bronze_trophy_fishing_sack": { wiki: "Bronze Trophy Fishing Sack" },
					"silver_trophy_fishing_sack": { wiki: "Silver Trophy Fishing Sack" },
					"pocket_sack_in_a_sack": { wiki: "Pocket Sack-in-a-Sack" },
				}),
				
				'/slayer': new Folder({
					"voidgloom_seraph/judgement_core": { wiki: "Judgement Core" },
					
					'/inferno_demonlord': new Folder({
						"kelvin_inverter": { wiki: "Kelvin Inverter" },
						"subzero_inverter": { wiki: "Subzero Inverter" },
						"capsaicin_eyedrops": { wiki: "Capsaicin Eyedrops" },
						
						'/fuel_blocks': new Folder({
							"inferno_fuel_block": { wiki: "Inferno Fuel Block" },
							"inferno_fuel_crude_gabagool": { wiki: "Inferno Minion Fuel (Fuel / Crude Gabagool)" },
							"inferno_fuel_glowstone_dust": { wiki: "Inferno Minion Fuel (Fuel / Glowstone Dust)" },
							"inferno_fuel_nether_stalk": { wiki: "Inferno Minion Fuel (Fuel / Nether Wart)" },
							"inferno_fuel_magma_cream": { wiki: "Inferno Minion Fuel (Fuel / Magma Cream)" },
							"inferno_fuel_blaze_rod": { wiki: "Inferno Minion Fuel (Fuel / Blaze Rod)" },
							"inferno_heavy_crude_gabagool": { wiki: "Inferno Minion Fuel (Heavy / Crude Gabagool)" },
							"inferno_heavy_glowstone_dust": { wiki: "Inferno Minion Fuel (Heavy / Glowstone Dust)" },
							"inferno_heavy_nether_stalk": { wiki: "Inferno Minion Fuel (Heavy / Nether Wart)" },
							"inferno_heavy_magma_cream": { wiki: "Inferno Minion Fuel (Heavy / Magma Cream)" },
							"inferno_heavy_blaze_rod": { wiki: "Inferno Minion Fuel (Heavy / Blaze Rod)" },
							"inferno_hypergolic_crude_gabagool": { wiki: "Inferno Minion Fuel (Hypergolic / Crude Gabagool)" },
							"inferno_hypergolic_glowstone_dust": { wiki: "Inferno Minion Fuel (Hypergolic / Glowstone Dust)" },
							"inferno_hypergolic_nether_stalk": { wiki: "Inferno Minion Fuel (Hypergolic / Nether Wart)" },
							"inferno_hypergolic_magma_cream": { wiki: "Inferno Minion Fuel (Hypergolic / Magma Cream)" },
							"inferno_hypergolic_blaze_rod": { wiki: "Inferno Minion Fuel (Hypergolic / Blaze Rod)" },
						}),
					}),
					
					'/riftstalker_bloodfiend': new Folder({
						"bloodbadge": { wiki: "Bloodbadge" },
						"coven_seal": { wiki: "Coven Seal" },
						"healing_melon": { wiki: "Healing Melon" },
						"juicy_healing_melon": { wiki: "Juicy Healing Melon" },
						"luscious_healing_melon": { wiki: "Luscious Healing Melon" },
						"mcgrubber_burger": { wiki: "McGrubber's Burger" },
						"unfanged_vampire_part": { wiki: "Unfanged Vampire Part" },
					}),
				}),
				
				'/special': new Folder({
					"game_annihilator": { wiki: "Game Annihilator" },
					"quality_map": { wiki: "Quality Map" },
					"shiny_relic": { wiki: "Shiny Relic" },
					"creative_mind": { wiki: "Creative Mind" },
					
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
					
					'/kuudra_cavity': new Folder({
						"kuudra_cavity": { wiki: "Exquisite Kuudra Teeth Plaque" },
						"kuudra_cavity_epic": { wiki: "Unpleasant Kuudra Teeth Plaque" },
						"kuudra_cavity_rare": { wiki: "Gnarly Kuudra Teeth Plaque" },
						"kuudra_cavity_uncommon": { wiki: "Repulsive Kuudra Teeth Plaque" },
						"kuudra_cavity_common": { wiki: "Decaying Kuudra Teeth Plaque" },
						"kuudra_cavity_special": { wiki: "Kuudra Teeth Plaque" },
					}),
					
					'/the_fish': new Folder({
						"zoop_the_fish": { wiki: "Zoop the Fish" },
					}),
				}),
			}),
		}),
		'/ui': new Folder({
			'jacob_contest/bronze_medal': { wiki: "Bronze Medal", imgName: "Bronze Medal" },
			'jacob_contest/silver_medal': { wiki: "Silver Medal", imgName: "Silver Medal" },
			'jacob_contest/gold_medal': { wiki: "Gold Medal", imgName: "Gold Medal" },
			'icons/bits': { wiki: ["Bits", "Bit (currency)"] },
			'icons/pelts': { wiki: ["Pelts", "Pelt"] },
			'icons/north_star': { wiki: ["North Star", "North Stars"] },
			'icons/motes': { wiki: "Motes" },
		}),
	});
	
	// recursive function
	function flattenResourcePackObj(prefix, folder) {
		// Add all files to flat list
		return Object.entries(folder._contents).flatMap(([folderItemName,folderItem]) => 
			// If folder rescursively continue / else it's a file
			folderItem.isFolder
				 ? flattenResourcePackObj(`${prefix}${folderItemName}`, folderItem)
				 : makeFinalizedDataObj(prefix, folderItemName, folderItem)
		);
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