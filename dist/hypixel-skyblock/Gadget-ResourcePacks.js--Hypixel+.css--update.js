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
	
	const s_alt = str => `img[alt="${str}"]`;
	const s_minetipTitle = str => `.invslot-item-image[data-minetip-title="${str}"] img`;
	
	const resourcepack = new Folder({
		'/skyblock': new Folder({
			///////////////////////////
			// Weapons
			///////////////////////////
			'/weapons': new Folder({
				'/bows': new Folder({
					"artisanal_shortbow": { wiki: "Artisanal Shortbow" },
					"bone_boomerang": { wiki: "Bonemerang" },
					"crypt_bow": { wiki: "Soulstealer Bow" },
					"death_bow": { wiki: "Death Bow" },
					"decent_bow": { wiki: "Decent Bow" },
					"dragon_shortbow": { wiki: "Dragon Shortbow" },
					"end_stone_bow": { wiki: "End Stone Bow" },
					"ender_bow": { wiki: "Ender Bow" },
					"explosive_bow": { wiki: "Explosive Bow" },
					"healing_bow": { wiki: "Healing Bow" },
					"hurricane_bow": { wiki: "Hurricane Bow" },
					"item_spirit_bow": { wiki: "Spirit Bow" },
					"juju_shortbow": { wiki: "Juju Shortbow" },
					"last_breath": { wiki: [ "Last Breath", "⚚ Last Breath" ] },
					"machine_gun_bow": { wiki: "Machine Gun Bow" },
					"magma_bow": { wiki: "Magma Bow" },
					"mosquito_bow": { wiki: "Mosquito Bow" },
					"prismarine_bow": { wiki: "Prismarine Bow" },
					"runaans_bow": { wiki: "Runaan's Bow" },
					"savana_bow": { wiki: "Savanna Bow" },
					"scorpion_bow": { wiki: "Scorpion Bow" },
					"slime_bow": { wiki: "Slime Bow" },
					"sniper_bow": { wiki: "Sniper Bow" },
					"souls_rebound": { wiki: "Souls Rebound" },
					"spider_queens_stinger": { wiki: [ "Spider Queen's Stinger", "⚚ Spider Queen's Stinger" ] },
					"stinger_bow": { wiki: "Stinger Bow" },
					"stun_bow": { wiki: "Stun Bow" },
					"sulphur_bow": { wiki: "Sulphur Bow" },
					"terminator": { wiki: "Terminator" },
					"undead_bow": { wiki: ["Undead Bow", "Super Undead Bow"] },
					"venoms_touch": { wiki: [ "Venom's Touch", "⚚ Venom's Touch" ] },
					"wither_bow": { wiki: "Wither Bow" },
					
					/* Alt item states/variants that don't matter on the wiki:
						skyblock/weapons/bows/bone_boomerang_thrown.png
						skyblock/weapons/bows/null_bow.png
					*/
				}),
				
				'/other': new Folder({
					
				}),
				
				'/staffs_wands': new Folder({
					/* not used on the wiki
						skyblock/weapons/staffs_wands/tribal_spear_thrown.png
						skyblock/weapons/staffs_wands/great_spook_staff_1st.png
					*/
				}),
				
				'/swords': new Folder({
					"arack": { wiki: "Arack" },
					"aspect_of_the_draconic": { wiki: "Aspect of the Draconic" },
					"aspect_of_the_dragon": { wiki: "Aspect of the Dragons" },
					"aspect_of_the_end": { wiki: "Aspect of the End" },
					"aspect_of_the_jerry": { wiki:[ "Aspect of the Jerry", "Thick Aspect of the Jerry" ] },
					"aspect_of_the_void": { wiki: "Aspect of the Void" },
					"astraea": { wiki: "Astraea" },
					"atomsplit_katana": { wiki: "Atomsplit Katana" },
					"axe_of_the_shredded": { wiki: "Axe of the Shredded" },
					"bingolibur": { wiki: "Bingolibur" },
					"blade_of_the_volcano": { wiki: "Blade of the Volcano" },
					"burstfire_dagger_auric": { wiki: "Kindlebane Dagger" },
					"burstmaw_dagger_crystal": { wiki: "Mawdredge Dagger" },
					"chicken_axe": { wiki: "Chicken Axe" },
					"cleaver": { wiki: "Cleaver" },
					"conjuring_sword": { wiki: "Conjuring" },
					"cow_axe": { wiki: "Cow Axe" },
					"crypt_dreadlord_sword": { wiki: "Dreadlord Sword" },
					"crypt_witherlord_sword": { wiki: "Crypt Witherlord Sword" },
					"daedalus_axe": { wiki: "Daedalus Axe" },
					"dark_claymore": { wiki: "Dark Claymore" },
					"earth_shard": { wiki: "Earth Shard" },
					"edible_mace": { wiki: "Edible Mace" },
					"ember_rod": { wiki: "Ember Rod" },
					"emerald_blade": { wiki: "Emerald Blade" },
					"end_stone_sword": { wiki: "End Stone Sword" },
					"end_sword": { wiki: "End Sword" },
					"enrager": { wiki: "Enrager" },
					"fancy_sword": { wiki: "Fancy Sword" },
					"fel_sword": { wiki: "Fel Sword" },
					"firedust_dagger_ashen": { wiki: "Firedust Dagger" },
					"flaming_sword": { wiki: "Flaming Sword" },
					"florid_zombie_sword": { wiki: "Florid Zombie Sword" },
					"flower_of_truth": { wiki: "Flower of Truth" },
					"frozen_scythe": { wiki: "Frozen Scythe" },
					"ghoul_buster": { wiki: "Ghoul Buster" },
					"glacial_scythe": { wiki: "Glacial Scythe" },
					"golem_sword": { wiki: "Golem Sword" },
					"great_spook_sword": { wiki: "Great Spook Sword" },
					"heartfire_dagger_ashen": { wiki: "Pyrochaos Dagger" },
					"heartmaw_dagger_spirit": { wiki: "Deathripper Dagger" },
					"hunter_knife": { wiki: ["Hunter Knife", "Giant Cleaver"] }, // Giant Cleaver is same asset but larger
					"hyper_cleaver": { wiki: "Hyper Cleaver" },
					"hyperion": { wiki: "Hyperion" },
					"leaping_sword": { wiki: "Leaping Sword" },
					"leech_sword": { wiki: "Leech Sword" },
					"livid_dagger": { wiki: "Livid Dagger" },
					"mawdust_dagger_spirit": { wiki: "Twilight Dagger" },
					"mercenary_axe": { wiki: "Mercenary Axe" },
					"midas_sword": { wiki: "Midas' Sword" },
					"mushroom_cow_axe": { wiki: "Mushroom Cow Axe" },
					"necromancer_sword": { wiki: "Necromancer Sword" },
					"necron_blade": { wiki:[ "Necron's Blade (Unrefined)", "Necron's Blade" ] },
					"nova_sword": { wiki: "Sword of the Universe" },
					"ornate_zombie_sword": { wiki: "Ornate Zombie Sword" },
					"pig_axe": { wiki: "Pig Axe" },
					"pigman_sword": { wiki: "Pigman Sword" },
					"pooch_sword": { wiki: "Pooch Sword" },
					"prismarine_blade": { wiki: "Prismarine Blade" },
					"rabbit_axe": { wiki: "Rabbit Axe" },
					"ragnarock_axe": { wiki: "Ragnarock Axe" },
					"raider_axe": { wiki: "Raider Axe" },
					"reaper_scythe": { wiki: "Reaper Scythe" },
					"reaper_sword": { wiki: "Reaper Falchion" },
					"recluse_fang": { wiki: "Recluse Fang" },
					"revenant_sword": { wiki: "Revenant Falchion" },
					"rogue_sword": { wiki: "Rogue Sword" },
					"scorpion_foil": { wiki:[ "Scorpion Foil", "Thick Scorpion Foil" ] },
					"scylla": { wiki: "Scylla" },
					"self_recursive_pickaxe": { wiki: "Self-Recursive Pickaxe" },
					"shadow_fury": { wiki: "Shadow Fury" },
					"shaman_sword": { wiki: "Shaman Sword" },
					"sheep_axe": { wiki: "Sheep Axe" },
					"silent_death": { wiki: "Silent Death" },
					"silk_edge_sword": { wiki: "Silk-Edge Sword" },
					"silver_fang": { wiki: "Silver Fang" },
					"silver_laced_karambit": { wiki: "Silver-Laced Karambit" },
					"silvertwist_karambit": { wiki: "Silver-Twist Karambit" },
					"sinseeker_scythe": { wiki: "Sinseeker Scythe" },
					"spider_sword": { wiki: "Spider Sword" },
					"spirit_sword": { wiki: "Spirit Sword" },
					"squire_sword": { wiki: "Squire Sword" },
					"star_sword": { wiki:[ "Sword of the Stars", "Sword of the Stars 3000", "Sword of the Stars 9000" ] },
					"stone_blade": { wiki: "Adaptive Blade" },
					"super_cleaver": { wiki: "Super Cleaver" },
					"sword_of_bad_health": { wiki: "Sword of Bad Health" },
					"sword_of_revelations": { wiki:[ "Sword of Revelations", "Thick Sword of Revelations" ] },
					"sword_of_the_multiverse": { wiki: "Sword of the Multiverse" },
					"tactician_murder_weapon": { wiki: "Tactician's Murder Weapon" },
					"tactician_sword": { wiki:[ "Tactician's Sword", "Thick Tactician's Sword" ] },
					"undead_sword": { wiki: "Undead Sword" },
					"valkyrie": { wiki: "Valkyrie" },
					"void_sword": { wiki: "Void Sword" },
					"voidedge_katana": { wiki: "Voidedge Katana" },
					"voidwalker_katana": { wiki: "Voidwalker Katana" },
					"vorpal_katana": { wiki: "Vorpal Katana" },
					"wither_cloak": { wiki: "Wither Cloak Sword" },
					"wyld_sword": { wiki: "Wyld Sword" },
					"yeti_sword": { wiki: "Yeti Sword" },
					"zombie_knight_sword": { wiki: "Zombie Knight Sword" },
					"zombie_soldier_cutlass": { wiki: "Zombie Soldier Cutlass" },
					"zombie_sword": { wiki: "Zombie Sword" },
					
					/* Alt item states/variants that don't matter on the wiki
						skyblock/weapons/swords/atomsplit_katana_power.png
						skyblock/weapons/swords/burstfire_dagger_ashen.png
						skyblock/weapons/swords/burstmaw_dagger_spirit.png
						skyblock/weapons/swords/firedust_dagger_auric.png
						skyblock/weapons/swords/heartfire_dagger_auric.png
						skyblock/weapons/swords/heartmaw_dagger_crystal.png
						skyblock/weapons/swords/mawdust_dagger_crystal.png
						skyblock/weapons/swords/voidedge_katana_power.png
						skyblock/weapons/swords/vorpal_katana_power.png
						skyblock/weapons/swords/great_spook_sword_1st.png
					*/
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
				"/rift/anti_bite_scarf/anti_bite_scarf_2_red": { selectors:[s_minetipTitle`&dAnti-Bite Scarf`] },
				
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
				
				// Mob Armor
				'/mobs': new Folder({
					"watcher/watcher_chestplate": { wiki: "Watcher Chestplate" },
					"watcher/watcher_leggings": { wiki: "Watcher Leggings" },
					"watcher/watcher_boots": { wiki: "Watcher Boots" },
					
					"emperor/emperor_robes": { wiki: "Emperor Robes" },
					"emperor/emperor_leggings": { wiki: "Emperor Leggings" },
					"emperor/emperor_shoes": { wiki: "Emperor Shoes" },
					
					"sea_walker/sea_walker_chestplate": { wiki: "Sea Walker Chestplate" },
					"sea_walker/sea_walker_leggings": { wiki: "Sea Walker Leggings" },
					"sea_walker/sea_walker_boots": { wiki: "Sea Walker Boots" },
					
					"hydra1/hydra1_chestplate": { wiki: "Water Hydra Chestplate" },
					"hydra1/hydra1_leggings": { wiki: "Water Hydra Leggings" },
					"hydra1/hydra1_boots": { wiki: "Water Hydra Boots" },
				}),
			}),
			
			///////////////////////////
			// Accessories
			///////////////////////////
			'/accessories': new Folder({
				'/talisman': new Folder({
					"agarimoo_talisman": { wiki: "Agarimoo Talisman" },
					"bat_person_talisman": { wiki: "Bat Person Talisman" },
					"bat_talisman": { wiki: "Bat Talisman" },
					"big_brain_talisman": { wiki: "Big Brain Talisman" },
					"bingo_combat_talisman": { wiki: "Bingo Combat Talisman" },
					"bingo_talisman": { wiki: "Bingo Talisman" },
					"bits_talisman": { wiki: "Bits Talisman" },
					"blaze_talisman": { wiki: "Blaze Talisman" },
					"blood_donor_talisman": { wiki: "Blood Donor Talisman" },
					"blood_god_crest": { wiki: "Blood God Crest" },
					"blue_gift_talisman": { wiki: "Blue Gift Talisman" },
					"burststopper_talisman": { wiki: "Burststopper Talisman" },
					"campfire_talisman_1": { wiki: ["Campfire Initiate Badge", "Campfire Adept Badge"] },
					"campfire_talisman_2": { wiki: ["Campfire Cultist Badge", "Campfire Scion Badge"] },
					"campfire_talisman_3": { wiki: "Campfire God Badge" },
					"candy_talisman": { wiki: "Candy Talisman" },
					"chumming_talisman": { wiki: "Chumming Talisman" },
					"coin_talisman": { wiki: "Talisman of Coins" },
					"cropie_talisman": { wiki: "Cropie Talisman" },
					"dante_talisman": { wiki: "Dante Talisman" },
					"draconic_talisman": { wiki: "Draconic Talisman" },
					"farming_talisman": { wiki: "Farming Talisman" },
					"feather_talisman": { wiki: "Feather Talisman" },
					"fire_talisman": { wiki: "Fire Talisman" },
					"fish_affinity_talisman": { wiki: "Fish Affinity Talisman" },
					"frozen_chicken": { wiki: "Frozen Chicken" },
					"future_calories": { wiki: "Future Calories Talisman" },
					"glacial_talisman": { wiki: "Glacial Talisman" },
					"gold_gift_talisman": { wiki: "Gold Gift Talisman" },
					"gravity_talisman": { wiki: "Gravity Talisman" },
					"great_spook_talisman": { wiki: "Great Spook Talisman" },
					"green_gift_talisman": { wiki: "Green Gift Talisman" },
					"healing_talisman": { wiki: "Healing Talisman" },
					"hunter_talisman": { wiki: "Hunter Talisman" },
					"intimidation_talisman": { wiki: "Intimidation Talisman" },
					"jerry_talisman_blue": { wiki: "Blue Jerry Talisman" },
					"jerry_talisman_golden": { wiki: "Golden Jerry Artifact" },
					"jerry_talisman_green": { wiki: "Green Jerry Talisman" },
					"jerry_talisman_purple": { wiki: "Purple Jerry Talisman" },
					"jungle_amulet": { wiki: "Jungle Amulet" },
					"king_talisman": { wiki: "King Talisman" },
					"lava_talisman": { wiki: "Lava Talisman" },
					"lush_talisman": { wiki: "Lush Talisman" },
					"magnetic_talisman": { wiki: "Magnetic Talisman" },
					"mine_talisman": { wiki: "Mine Affinity Talisman" },
					"mineral_talisman": { wiki: "Mineral Talisman" },
					"night_vision_charm": { wiki: "Night Vision Charm" },
					"odgers_bronze_tooth": { wiki: "Odger\'s Bronze Tooth" },
					"odgers_diamond_tooth": { wiki: "Odger\'s Diamond Tooth" },
					"odgers_gold_tooth": { wiki: "Odger\'s Gold Tooth" },
					"odgers_silver_tooth": { wiki: "Odger\'s Silver Tooth" },
					"potato_talisman": { wiki: "Potato Talisman" },
					"potion_affinity_talisman": { wiki: "Potion Affinity Talisman" },
					"power_talisman": { wiki: "Talisman of Power" },
					"purple_gift_talisman": { wiki: "Purple Gift Talisman" },
					"red_claw_talisman": { wiki: "Red Claw Talisman" },
					"scavenger_talisman": { wiki: "Scavenger Talisman" },
					"sea_creature_talisman": { wiki: "Sea Creature Talisman" },
					"skeleton_talisman": { wiki: "Skeleton Talisman" },
					"soulflow_pile": { wiki: "Soulflow Pile" },
					"speed_talisman": { wiki: "Speed Talisman" },
					"spider_talisman": { wiki: "Spider Talisman" },
					"talisman_of_space": { wiki: "Talisman of Space" },
					"tarantula_talisman": { wiki: "Tarantula Talisman" },
					"titanium_talisman": { wiki: "Titanium Talisman" },
					"treasure_talisman": { wiki: "Treasure Talisman" },
					"vaccine_talisman": { wiki: "Vaccine Talisman" },
					"village_talisman": { wiki: "Village Affinity Talisman" },
					"white_gift_talisman": { wiki: "White Gift Talisman" },
					"wolf_paw": { wiki: "Wolf Paw" },
					"wolf_talisman": { wiki: "Wolf Talisman" },
					"wood_talisman": { wiki: "Wood Affinity Talisman" },
					"zombie_talisman": { wiki: "Zombie Talisman" },
				}),
				
				'/ring': new Folder({
					"agarimoo_ring": { wiki: "Agarimoo Ring" },
					"bait_ring": { wiki: "Bait Ring" },
					"bat_person_ring": { wiki: "Bat Person Ring" },
					"bat_ring": { wiki: "Bat Ring" },
					"bingo_ring": { wiki: "Bingo Ring" },
					"blood_donor_ring": { wiki: "Blood Donor Ring" },
					"bluetooth_ring": { wiki: "Bluetooth Ring" },
					"candy_ring": { wiki: "Candy Ring" },
					"catacombs_expert_ring": { wiki: "Catacombs Expert Ring" },
					"dante_ring": { wiki: "Dante Ring" },
					"devour_ring": { wiki: "Devour Ring" },
					"draconic_ring": { wiki: "Draconic Ring" },
					"emerald_ring": { wiki: "Emerald Ring" },
					"feather_ring": { wiki: "Feather Ring" },
					"glacial_ring": { wiki: "Glacial Ring" },
					"great_spook_ring": { wiki: "Great Spook Ring" },
					"haste_ring": { wiki: "Haste Ring" },
					"healing_ring": { wiki: "Healing Ring" },
					"hunter_ring": { wiki: "Hunter Ring" },
					"intimidation_ring": { wiki: "Intimidation Ring" },
					"lush_ring": { wiki: "Lush Ring" },
					"power_ring": { wiki: "Ring of Power" },
					"pulse_ring": { wiki: "Pulse Ring" },
					"red_claw_ring": { wiki: "Red Claw Ring" },
					"ring_of_broken_love": { wiki: "Ring of Broken Love" },
					"ring_of_space": { wiki: "Ring of Space" },
					"ring_potion_affinity": { wiki: "Potion Affinity Ring" },
					"sea_creature_ring": { wiki: "Sea Creature Ring" },
					"shady_ring": { wiki: "Shady Ring" },
					"soulflow_battery": { wiki: "Soulflow Battery" },
					"speed_ring": { wiki: "Speed Ring" },
					"spider_ring": { wiki: "Spider Ring" },
					"squash_ring": { wiki: "Squash Ring" },
					"titanium_ring": { wiki: "Titanium Ring" },
					"treasure_ring": { wiki: "Treasure Ring" },
					"vaccine_ring": { wiki: "Vaccine Ring" },
					"wolf_ring": { wiki: "Wolf Ring" },
					"zombie_ring": { wiki: "Zombie Ring" },
				}),
				
				'/artifact': new Folder({
					"agarimoo_artifact": { wiki: "Agarimoo Artifact" },
					"artifact_of_space": { wiki: "Artifact of Space" },
					"bingo_artifact": { wiki: "Bingo Artifact" },
					"blood_donor_artifact": { wiki: "Blood Donor Artifact" },
					"burststopper_artifact": { wiki: "Burststopper Artifact" },
					"candy_artifact": { wiki: "Candy Artifact" },
					"crooked_artifact": { wiki: "Crooked Artifact" },
					"draconic_artifact": { wiki: "Draconic Artifact" },
					"experience_artifact": { wiki: "Experience Artifact" },
					"fermento_artifact": { wiki: "Fermento Artifact" },
					"great_spook_artifact": { wiki: "Great Spook Artifact" },
					"hegemony_artifact": { wiki: "Hegemony Artifact" },
					"kuudra_follower_artifact": { wiki: "Kuudra Follower Artifact" },
					"lush_artifact": { wiki: "Lush Artifact" },
					"punchcard_artifact": { wiki: "Punchcard Artifact" },
					"soulflow_supercell": { wiki: "Soulflow Supercell" },
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
				
				/* _1st isn't used on the wiki
					skyblock/accessories/ring/great_spook_ring_1st.png
					skyblock/accessories/talisman/great_spook_talisman_1st.png
				*/
				
				'/abicase': new Folder({
					"abicase_blue_red": { wiki: "Blue™ but Red Abicase" },
					"abicase_blue_blue": { wiki: "Actually Blue™ Abicase" },
					"abicase_blue_green": { wiki: "Blue™ but Green Abicase" },
					"abicase_blue_yellow": { wiki: "Blue™ but Yellow Abicase" },
					"abicase_blue_aqua": { wiki: "Lighter Blue™ Abicase" },
					"abicase_rezar": { wiki: "Rezar® Abicase" },
					"abicase_sumsung_1": { wiki: "Sumsung© G3 Abicase" },
					"abicase_sumsung_2": { wiki: "Sumsung© GG Abicase" },
				}),
				
				"heirloom/bingo_heirloom": { wiki: "Bingo Heirloom" },
				
				"broken_piggy_bank": { wiki: "Broken Piggy Bank" },
				"cracked_piggy_bank": { wiki: "Cracked Piggy Bank" },
				"day_crystal": { wiki: "Day Crystal" },
				"eternal_crystal": { wiki: "Eternal Crystal" },
				"eternal_hoof": { wiki: "Eternal Hoof" },
				"garlic_flavored_gummy_bear": { wiki: "Perma-Jelled Garlic-Flavored Re-Heated Gummy Polar Bear" },
				"handy_blood_chalice": { wiki: "Handy Blood Chalice" },
				"harmonious_surgery_toolkit": { wiki: "Harmonious Surgery Toolkit" },
				"hocus_pocus_cipher": { wiki: "Hocus-Pocus Cipher" },
				"jacobus_register": { wiki: "Jacobus Register" },
				"jake_plushie": { wiki: "Jake's Plushie" },
				"lucky_hoof": { wiki: "Lucky Hoof" },
				"melody_hair": { wiki: "Melody\'s Hair" },
				"miniaturized_tubulator": { wiki: "Miniaturized Tubulator" },
				"netherrack_looking_sunshade": { wiki: "Netherrack-Looking Sunshade" },
				"new_year_cake_bag": { wiki: "New Year Cake Bag" },
				"night_crystal": { wiki: "Night Crystal" },
				"piggy_bank": { wiki: "Piggy Bank" },
				"pigs_foot": { wiki: "Pig's Foot" },
				"pocket_espresso_machine": { wiki: "Pocket Espresso Machine" },
				"rift_prism": { wiki: "Rift Prism" },
				"shens_regalia": { wiki: "Shen\'s Regalia" },
				"test_bucket_please_ignore": { wiki: "Test Bucket Please Ignore" },
				"tiny_dancer": { wiki: "Tiny Dancer" },
				"trapper_crest": { wiki: "Trapper Crest" },
				"trapper_crest_uncommon": { selectors: [s_minetipTitle`&aTrapper Crest`] },
				"warding_trinket": { wiki: "Warding Trinket" },
				
				'/tiered': new Folder({
					// Beast Master Crest
					'/beastmaster_crest': new Folder({
						"beastmaster_crest_common": { wiki: ["Beastmaster Crest", "Beastmaster Crest (Common)"] },
						"beastmaster_crest_uncommon": { selectors: [s_minetipTitle`&aBeastmaster Crest`, s_alt`Beastmaster Crest (Uncommon)`] },
						"beastmaster_crest_rare": { selectors: [s_minetipTitle`&9Beastmaster Crest`, s_alt`Beastmaster Crest (Rare)`] },
						"beastmaster_crest_epic": { selectors: [s_minetipTitle`&5Beastmaster Crest`, s_alt`Beastmaster Crest (Epic)`] },
						"beastmaster_crest_legendary": { selectors: [s_minetipTitle`&6Beastmaster Crest`, s_alt`Beastmaster Crest (Legendary)`] },
					}),
					
					// Book of Progression
					"book_of_progression/book_of_progression": { wiki: "Book of Progression" },
					// NOTE: wiki currently only ever shows common slot
					// "book_of_progression/book_of_progression_uncommon": { wiki: "Book of Progression (Uncommon)" },
					// "book_of_progression/book_of_progression_rare": { wiki: "Book of Progression (Rare)" },
					// "book_of_progression/book_of_progression_epic": { wiki: "Book of Progression (Epic)" },
					// "book_of_progression/book_of_progression_legendary": { wiki: "Book of Progression (Legendary)" },
					// "book_of_progression/book_of_progression_mythic": { wiki: "Book of Progression (Mythic)" },
					
					// Crux Talisman
					"crux_talisman/crux_talisman_1": { wiki: "Crux Talisman" },
					"crux_talisman/crux_talisman_2": { wiki: "Crux Ring" },
					"crux_talisman/crux_talisman_3": { wiki: "Crux Artifact" },
					"crux_talisman/crux_talisman_4": { wiki: "Crux Relic" },
					"crux_talisman/crux_talisman_5": { wiki: "Crux Heirloom" },
					"crux_talisman/crux_talisman_6": { wiki: "Crux Chronomicon" },
				
					// Master Skull
					'/master_skull': new Folder({
						"master_skull_tier_1": { wiki: "Master Skull - Tier 1" },
						"master_skull_tier_2": { wiki: "Master Skull - Tier 2" },
						"master_skull_tier_3": { wiki: "Master Skull - Tier 3" },
						"master_skull_tier_4": { wiki: "Master Skull - Tier 4" },
						"master_skull_tier_5": { wiki: "Master Skull - Tier 5" },
						"master_skull_tier_6": { wiki: "Master Skull - Tier 6" },
						"master_skull_tier_7": { wiki: "Master Skull - Tier 7" },
					}),
				
					// Pandora's Box
					"pandoras_box/pandoras_box": { wiki: "Pandora's Box" },
					// NOTE: wiki currently only ever shows common slot
					// "pandoras_box/pandoras_box_uncommon": { wiki: "Pandora's Box (Uncommon)" },
					// "pandoras_box/pandoras_box_rare": { wiki: "Pandora's Box (Rare)" },
					// "pandoras_box/pandoras_box_epic": { wiki: "Pandora's Box (Epic)" },
					// "pandoras_box/pandoras_box_legendary": { wiki: "Pandora's Box (Legendary)" },
					// "pandoras_box/pandoras_box_mythic": { wiki: "Pandora's Box (Mythic)" },
					
					// Personal Compactor
					'/personal_compactor': new Folder({
						"personal_compactor_4000": { wiki: "Personal Compactor 4000" },
						"personal_compactor_5000": { wiki: "Personal Compactor 5000" },
						"personal_compactor_6000": { wiki: "Personal Compactor 6000" },
						"personal_compactor_7000": { wiki: "Personal Compactor 7000" },
					}),
					
					// Personal Deletor
					'/personal_deletor': new Folder({
						"personal_deletor_4000": { wiki: "Personal Deletor 4000" },
						"personal_deletor_5000": { wiki: "Personal Deletor 5000" },
						"personal_deletor_6000": { wiki: "Personal Deletor 6000" },
						"personal_deletor_7000": { wiki: "Personal Deletor 7000" },
					}),
					
					// Shark Tooth Necklace
					'/shark_tooth_necklace': new Folder({
						"dull_shark_tooth_necklace": { wiki: "Dull Shark Tooth Necklace" },
						"honed_shark_tooth_necklace": { wiki: "Honed Shark Tooth Necklace" },
						"raggedy_shark_tooth_necklace": { wiki: "Raggedy Shark Tooth Necklace" },
						"razor_sharp_shark_tooth_necklace": { wiki: "Razor-sharp Shark Tooth Necklace" },
						"sharp_shark_tooth_necklace": { wiki: "Sharp Shark Tooth Necklace" },
					}),
					
					// Ring of Love
					"wedding_ring/wedding_ring_common": { wiki: ["Shiny Yellow Rock", "Yellow Rock of Love"] },
					"wedding_ring/wedding_ring_uncommon": { wiki: ["Mediocre Ring of Love", "Rubbish Ring of Love"] },
					"wedding_ring/wedding_ring_rare": { wiki: ["Classy Ring of Love", "Modest Ring of Love", "Refined Ring of Love"] },
					"wedding_ring/wedding_ring_epic": { wiki: ["Exquisite Ring of Love", "Invaluable Ring of Love"] },
					"wedding_ring/wedding_ring_legendary": { wiki: ["Legendary Ring of Love", "Ring of Love"] },
				}),
			}),
			
			///////////////////////////
			// Equipment
			///////////////////////////
			'/equipment': new Folder({
				"ancient_cloak": { wiki: "Ancient Cloak" },
				"annihilation_cloak": { wiki: "Annihilation Cloak" },
				"arachne_belt": { wiki: "Arachne's Belt" },
				"arachne_cloak": { wiki: "Arachne's Cloak" },
				"arachne_gloves": { wiki: "Arachne's Gloves" },
				"arachne_necklace": { wiki: "Arachne's Necklace" },
				"blaze_belt": { wiki: "Blaze Belt" },
				"delirium_necklace": { wiki: "Delirium Necklace" },
				"demonlord_gauntlet": { wiki: "Demonslayer Gauntlet" },
				"destruction_cloak": { wiki: "Destruction Cloak" },
				"disinfestor_gloves": { wiki: "Disinfestor Gloves" },
				"dojo_black_belt": { wiki: "Black Belt" },
				"dojo_blue_belt": { wiki: "Blue Belt" },
				"dojo_brown_belt": { wiki: "Brown Belt" },
				"dojo_green_belt": { wiki: "Green Belt" },
				"dojo_white_belt": { wiki: "White Belt" },
				"dojo_yellow_belt": { wiki: "Yellow Belt" },
				"dragonfade_cloak": { wiki: "Dragonfade Cloak" },
				"dragonfuse_glove": { wiki: "Dragonfuse Glove" },
				"ender_belt": { wiki: "Ender Belt" },
				"ender_cloak": { wiki: "Ender Cloak" },
				"ender_gauntlet": { wiki: "Ender Gauntlet" },
				"ender_necklace": { wiki: "Ender Necklace" },
				"enigma_cloak": { wiki: "Enigma Cloak" },
				"finwave_belt": { wiki: "Finwave Belt" },
				"finwave_cloak": { wiki: "Finwave Cloak" },
				"finwave_gloves": { wiki: "Finwave Gloves" },
				"flaming_fist": { wiki: "Flaming Fist" },
				"gauntlet_of_contagion": { wiki: "Gauntlet of Contagion" },
				"ghast_cloak": { wiki: "Ghast Cloak" },
				"gillsplash_belt": { wiki: "Gillsplash Belt" },
				"gillsplash_cloak": { wiki: "Gillsplash Cloak" },
				"gillsplash_gloves": { wiki: "Gillsplash Gloves" },
				"glowstone_gauntlet": { wiki: "Glowstone Gauntlet" },
				"great_spook_belt": { wiki: "Great Spook Belt" },
				"great_spook_cloak": { wiki: "Great Spook Cloak" },
				"great_spook_gloves": { wiki: "Great Spook Gloves" },
				"great_spook_necklace": { wiki: "Great Spook Necklace" },
				"ichthyic_belt": { wiki: "Ichthyic Belt" },
				"ichthyic_cloak": { wiki: "Ichthyic Cloak" },
				"ichthyic_gloves": { wiki: "Ichthyic Gloves" },
				"implosion_belt": { wiki: "Implosion Belt" },
				"lava_shell_necklace": { wiki: "Lava Shell Necklace" },
				"leech_belt": { wiki: "Leech Belt" },
				"lotus_belt": { wiki: "Lotus Belt" },
				"lotus_bracelet": { wiki: "Lotus Bracelet" },
				"lotus_cloak": { wiki: "Lotus Cloak" },
				"lotus_necklace": { wiki: "Lotus Necklace" },
				"luminous_bracelet": { wiki: "Luminous Bracelet" },
				"magma_lord_gauntlet": { wiki: "Magma Lord Gauntlet" },
				"magma_necklace": { wiki: "Magma Necklace" },
				"molten_belt": { wiki: "Molten Belt" },
				"molten_bracelet": { wiki: "Molten Bracelet" },
				"molten_cloak": { wiki: "Molten Cloak" },
				"molten_necklace": { wiki: "Molten Necklace" },
				"pelt_belt": { wiki: "Pelt Belt" },
				"rift_necklace_inside": { selectors:[ `.invslot-item[data-minetip-title="&dRift Necklace"][data-minetip-text*="&d&lMYTHIC NECKLACE"] img` ] },
				"rift_necklace_outside": { wiki: "Rift Necklace" },
				"scourge_cloak": { wiki: "Scourge Cloak" },
				"scoville_belt": { wiki: "Scoville Belt" },
				"silkrider_safety_belt": { wiki: "Silkrider Safety Belt" },
				"snow_belt": { wiki: "Snow Belt" },
				"snow_cloak": { wiki: "Snow Cloak" },
				"snow_gloves": { wiki: "Snow Gloves" },
				"snow_necklace": { wiki: "Snow Necklace" },
				"synthesizer_v1": { wiki: "Synthesizer v1" },
				"synthesizer_v2": { wiki: "Synthesizer v2" },
				"synthesizer_v3": { wiki: "Synthesizer v3" },
				"thunderbolt_necklace": { wiki: "Thunderbolt Necklace" },
				"vanquished_blaze_belt": { wiki: "Vanquished Blaze Belt" },
				"vanquished_ghast_cloak": { wiki: "Vanquished Ghast Cloak" },
				"vanquished_glowstone_gauntlet": { wiki: "Vanquished Glowstone Gauntlet" },
				"vanquished_magma_necklace": { wiki: "Vanquished Magma Necklace" },
				"vermin_belt": { wiki: "Vermin Belt" },
				
				/* _1st isn't used on the wiki:
					skyblock/equipment/great_spook_belt_1st.png
					skyblock/equipment/great_spook_cloak_1st.png
					skyblock/equipment/great_spook_gloves_1st.png
					skyblock/equipment/great_spook_necklace_1st.png
				*/
			}),
			
			///////////////////////////
			// Fishing Rods
			///////////////////////////
			'/fishing_rods': new Folder({
				"auger_rod": { wiki: "Auger Rod" },
				"challenge_rod": { wiki: "Challenging Rod" },
				"champ_rod": { wiki: "Rod of Champions" },
				"chum_rod": { wiki: "Chum Rod" },
				"dirt_rod": { wiki: "Dirt Rod" },
				"farmer_rod": { wiki: "Farmer's Rod" },
				"grappling_hook": { wiki: "Grappling Hook" },
				"hellfire_rod": { wiki: "Hellfire Rod" },
				"ice_rod": { wiki: "Ice Rod" },
				"inferno_rod": { wiki: "Inferno Rod" },
				"legend_rod": { wiki: "Rod of Legends" },
				"magma_rod": { wiki: "Magma Rod" },
				"phantom_rod": { wiki: "Phantom Rod" },
				"prismarine_rod": { wiki: "Prismarine Rod" },
				"rod_of_the_sea": { wiki: "Rod of the Sea" },
				"shiny_rod": { wiki: "Shiny Rod" },
				"soul_whip": { wiki: "Soul Whip" },
				"speedster_rod": { wiki: "Speedster Rod" },
				"sponge_rod": { wiki: "Sponge Rod" },
				"starter_lava_rod": { wiki: "Starter Lava Rod" },
				"the_shredder": { wiki: "Shredder" },
				"winter_rod": { wiki: "Winter Rod" },
				"yeti_rod": { wiki: "Yeti Rod" },
				"zombie_commander_whip": { wiki: "Zombie Commander Whip" },
				
				/* Unused
					skyblock/fishing_rods/null_rod.png
				*/
			}),
			
			///////////////////////////
			// Tools
			///////////////////////////
			'/tools': new Folder({
				'/abiphones': new Folder({
					"aatrox_batphone": { wiki: "Maddox Batphone" },
					"aatrox_badphone": { wiki: "Maddox Badphone" },
					
					"abiphone_xiii_pro": { wiki: "Abiphone XIII Pro" },
					"abiphone_xiii_pro_giga": { wiki: "Abiphone XIII Pro Giga" },
					"abiphone_xii_mega": { wiki: "Abiphone XII Mega" },
					"abiphone_xii_mega_color": { wiki: "Abiphone XII Mega Color" },
					"abiphone_xiv_enormous": { wiki: "Abiphone XIV Enormous" },
					"abiphone_xiv_enormous_black": { wiki: "Abiphone XIV Enormous Black" },
					"abiphone_xiv_enormous_purple": { wiki: "Abiphone XIV Enormous Purple" },
					"abiphone_xi_ultra": { wiki: "Abiphone XI Ultra" },
					"abiphone_xi_ultra_style": { wiki: "Abiphone XI Ultra Style" },
					"abiphone_x_plus": { wiki: "Abiphone X Plus" },
					"abiphone_x_plus_special_edition": { wiki: "Abiphone X Plus Special Edition" },
				}),
				
				'/arrows': new Folder({
					"armorshred_arrow": { wiki: "Armorshred Arrow" },
					"flint_arrow": { wiki: "Flint Arrow" },
					"arrow_swapper": { wiki: "Arrow Swapper" },
					"bouncy_arrow": { wiki: "Bouncy Arrow" },
					"emerald_tipped_arrow": { wiki: "Emerald-tipped Arrow" },
					"explosive_arrow": { wiki: "Explosive Arrow" },
					"glue_arrow": { wiki: "Glue Arrow" },
					"gold_tipped_arrow": { wiki: "Gold-tipped Arrow" },
					"icy_arrow": { wiki: "Icy Arrow" },
					"magma_arrow": { wiki: "Magma Arrow" },
					"nansorb_arrow": { wiki: "Nansorb Arrow" },
					"redstone_tipped_arrow": { wiki: "Redstone-tipped Arrow" },
					"arrow_bundle_magma": { wiki: "Magma Arrow Bundle" },
					
					/*  These are the versions used in the swapper UI, which we don't seem to show anywhere
						skyblock/tools/arrows/arrow_swapper_armorshred.png
						skyblock/tools/arrows/arrow_swapper_bouncy.png
						skyblock/tools/arrows/arrow_swapper_emerald_tipped.png
						skyblock/tools/arrows/arrow_swapper_explosive.png
						skyblock/tools/arrows/arrow_swapper_flint.png
						skyblock/tools/arrows/arrow_swapper_glue.png
						skyblock/tools/arrows/arrow_swapper_gold_tipped.png
						skyblock/tools/arrows/arrow_swapper_icy.png
						skyblock/tools/arrows/arrow_swapper_magma.png
						skyblock/tools/arrows/arrow_swapper_nansorb.png
						skyblock/tools/arrows/arrow_swapper_none.png
						skyblock/tools/arrows/arrow_swapper_redstone_tipped.png
						skyblock/tools/arrows/arrow_swapper_reinforced_iron.png
					*/
				}),
				
				'/biome_stick': new Folder({
					"birch_forest_biome_stick": { wiki: "Birch Forest Biome Stick" },
					"deep_ocean_biome_stick": { wiki: "Deep Ocean Biome Stick" },
					"desert_biome_stick": { wiki: "Desert Biome Stick" },
					"end_biome_stick": { wiki: "End Biome Stick" },
					"forest_biome_stick": { wiki: "Forest Biome Stick" },
					"jungle_biome_stick": { wiki: "Jungle Biome Stick" },
					"mesa_biome_stick": { wiki: "Mesa Biome Stick" },
					"mushroom_biome_stick": { wiki: "Mushroom Biome Stick" },
					"nether_biome_stick": { wiki: "Nether Biome Stick" },
					"roofed_forest_biome_stick": { wiki: "Roofed Forest Biome Stick" },
					"savana_biome_stick": { wiki: "Savanna Biome Stick" },
					"taiga_biome_stick": { wiki: "Taiga Biome Stick" },
				}),
				
				'/combat': new Folder({
					"alert_flare": { wiki: "Alert Flare" },
					"ancestral_spade": { wiki: "Ancestral Spade" },
					"blazetekk_ham_radio": { wiki: "Blazetekk™ Ham Radio" },
					"charminizer": { wiki: "Charminizer" },
					"holy_ice": { wiki: "Holy Ice" },
					"jingle_bells": { wiki: "Jingle Bells" },
					"moody_grappleshot": { wiki: "Moody Grappleshot" },
					"snow_blaster": { wiki: "Frosty the Snow Blaster" },
					"snow_cannon": { wiki: "Frosty the Snow Cannon" },
					"snow_howitzer": { wiki: "Frosty the Howitzer" },
					"sos_flare": { wiki: "SOS Flare" },
					"steak_stake": { wiki: "Steak Stake" },
					"tactical_insertion": { wiki: "Tactical Insertion" },
					"voodoo_doll_wilted": { wiki: "Jinxed Voodoo Doll" },
					"voodoo_doll": { wiki: "Voodoo Doll" },
					"wand_of_atonement": { wiki: "Wand of Atonement" },
					"wand_of_healing": { wiki: "Wand of Healing" },
					"wand_of_mending": { wiki: "Wand of Mending" },
					"wand_of_restoration": { wiki: "Wand of Restoration" },
					"wand_of_strength": { wiki: "Wand of Strength" },
					"warning_flare": { wiki: "Warning Flare" },
					"weird_tuba": { wiki: "Weird Tuba" },
					"weirder_tuba": { wiki: "Weirder Tuba" },
				}),
					
				'/drills': new Folder({
					"divan_drill": { wiki: "Divan's Drill" },
					"gemstone_drill_1": { wiki: "Ruby Drill TX-15" },
					"gemstone_drill_2": { wiki: "Gemstone Drill LT-522" },
					"gemstone_drill_3": { wiki: "Topaz Drill KGR-12" },
					"gemstone_drill_4": { wiki: "Jasper Drill X" },
					"mithril_drill_1": { wiki: "Mithril Drill SX-R226" },
					"mithril_drill_2": { wiki: "Mithril Drill SX-R326" },
					"titanium_drill_1": { wiki: "Titanium Drill DR-X355" },
					"titanium_drill_2": { wiki: "Titanium Drill DR-X455" },
					"titanium_drill_3": { wiki: "Titanium Drill DR-X555" },
					"titanium_drill_4": { wiki: "Titanium Drill DR-X655" },
					
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
					
					/* Drill variants - only default one matters for the wiki
						skyblock/tools/drills/divan_drill_full.png
						skyblock/tools/drills/divan_drill_high.png
						skyblock/tools/drills/divan_drill_low.png
						skyblock/tools/drills/divan_drill_med.png
						skyblock/tools/drills/gemstone_drill_1_full.png
						skyblock/tools/drills/gemstone_drill_1_high.png
						skyblock/tools/drills/gemstone_drill_1_low.png
						skyblock/tools/drills/gemstone_drill_1_med.png
						skyblock/tools/drills/gemstone_drill_2_full.png
						skyblock/tools/drills/gemstone_drill_2_high.png
						skyblock/tools/drills/gemstone_drill_2_low.png
						skyblock/tools/drills/gemstone_drill_2_med.png
						skyblock/tools/drills/gemstone_drill_3_full.png
						skyblock/tools/drills/gemstone_drill_3_high.png
						skyblock/tools/drills/gemstone_drill_3_low.png
						skyblock/tools/drills/gemstone_drill_3_med.png
						skyblock/tools/drills/gemstone_drill_4_full.png
						skyblock/tools/drills/gemstone_drill_4_high.png
						skyblock/tools/drills/gemstone_drill_4_low.png
						skyblock/tools/drills/gemstone_drill_4_med.png
						skyblock/tools/drills/mithril_drill_1_full.png
						skyblock/tools/drills/mithril_drill_1_high.png
						skyblock/tools/drills/mithril_drill_1_low.png
						skyblock/tools/drills/mithril_drill_1_med.png
						skyblock/tools/drills/mithril_drill_2_full.png
						skyblock/tools/drills/mithril_drill_2_high.png
						skyblock/tools/drills/mithril_drill_2_low.png
						skyblock/tools/drills/mithril_drill_2_med.png
						skyblock/tools/drills/titanium_drill_1_full.png
						skyblock/tools/drills/titanium_drill_1_high.png
						skyblock/tools/drills/titanium_drill_1_low.png
						skyblock/tools/drills/titanium_drill_1_med.png
						skyblock/tools/drills/titanium_drill_2_full.png
						skyblock/tools/drills/titanium_drill_2_high.png
						skyblock/tools/drills/titanium_drill_2_low.png
						skyblock/tools/drills/titanium_drill_2_med.png
						skyblock/tools/drills/titanium_drill_3_full.png
						skyblock/tools/drills/titanium_drill_3_high.png
						skyblock/tools/drills/titanium_drill_3_low.png
						skyblock/tools/drills/titanium_drill_3_med.png
						skyblock/tools/drills/titanium_drill_4_full.png
						skyblock/tools/drills/titanium_drill_4_high.png
						skyblock/tools/drills/titanium_drill_4_low.png
						skyblock/tools/drills/titanium_drill_4_med.png
					*/
				}),
					
				'/farming': new Folder({
					"advanced_gardening_axe": { wiki: "Advanced Gardening Axe" },
					"advanced_gardening_hoe": { wiki: "Advanced Gardening Hoe" },
					"basic_gardening_axe": { wiki: "Basic Gardening Axe" },
					"basic_gardening_hoe": { wiki: "Basic Gardening Hoe" },
					"block_zapper": { wiki: "Block Zapper" },
					"builders_ruler": { wiki: "Builder's Ruler" },
					"builders_wand": { wiki: "Builder's Wand" },
					"cactus_knife": { wiki: "Cactus Knife" },
					"coco_chopper": { wiki: "Coco Chopper" },
					"efficient_axe": { wiki: "Efficient Axe" },
					"fungi_cutter_red": { wiki: "Fungi Cutter" },
					"garden_scythe": { wiki: "Garden Scythe" },
					"hoe_of_great_tilling": { wiki: "Hoe of Great Tilling" },
					"hoe_of_greater_tilling": { wiki: "Hoe of Greater Tilling" },
					"hoe_of_greatest_tilling": { wiki: "Hoe of Greatest Tilling" },
					"infinidirt_wand": { wiki: "InfiniDirt™ Wand" },
					"melon_dicer_2": { wiki: "Melon Dicer 2.0" },
					"melon_dicer_3": { wiki: "Melon Dicer 3.0" },
					"melon_dicer": { wiki: "Melon Dicer" },
					"promising_hoe": { wiki: "Promising Hoe" },
					"pumpkin_dicer_2": { wiki: "Pumpkin Dicer 2.0" },
					"pumpkin_dicer_3": { wiki: "Pumpkin Dicer 3.0" },
					"pumpkin_dicer": { wiki: "Pumpkin Dicer" },
					"rookie_hoe": { wiki: "Rookie Hoe" },
					"sam_scythe": { wiki: "Sam's Scythe" },
					"spore_harvester": { wiki: "Spore Harvester" },
					"talbots_theodolite": { wiki: "Talbot's Theodolite" },
					"theoretical_hoe_cane_1": { wiki: "Turing Sugar Cane Hoe" },
					"theoretical_hoe_cane_2": { selectors:[ s_minetipTitle`&aTuring Sugar Cane Hoe`, s_alt`Turing Sugar Cane Hoe (Uncommon).png` ] },
					"theoretical_hoe_cane_3": { selectors:[ s_minetipTitle`&9Turing Sugar Cane Hoe`, s_alt`Turing Sugar Cane Hoe (Rare).png` ] },
					"theoretical_hoe_carrot_1": { wiki: "Gauss Carrot Hoe" },
					"theoretical_hoe_carrot_2": { selectors:[ s_minetipTitle`&aGauss Carrot Hoe`, s_alt`Gauss Carrot Hoe (Uncommon).png` ] },
					"theoretical_hoe_carrot_3": { selectors:[ s_minetipTitle`&9Gauss Carrot Hoe`, s_alt`Gauss Carrot Hoe (Rare).png` ] },
					"theoretical_hoe_potato_1": { wiki: "Pythagorean Potato Hoe" },
					"theoretical_hoe_potato_2": { selectors:[ s_minetipTitle`&aPythagorean Potato Hoe`, s_alt`Pythagorean Potato Hoe (Uncommon).png` ] },
					"theoretical_hoe_potato_3": { selectors:[ s_minetipTitle`&9Pythagorean Potato Hoe`, s_alt`Pythagorean Potato Hoe (Rare).png` ] },
					"theoretical_hoe_warts_1": { wiki: "Newton Nether Warts Hoe" },
					"theoretical_hoe_warts_2": { selectors:[ s_minetipTitle`&aNewton Nether Warts Hoe`, s_alt`Newton Nether Warts Hoe (Uncommon).png` ] },
					"theoretical_hoe_warts_3": { selectors:[ s_minetipTitle`&9Newton Nether Warts Hoe`, s_alt`Newton Nether Warts Hoe (Rare).png` ] },
					"theoretical_hoe_wheat_1": { wiki: "Euclid's Wheat Hoe" },
					"theoretical_hoe_wheat_2": { selectors:[ s_minetipTitle`&aEuclid's Wheat Hoe`, s_alt`Euclid's Wheat Hoe (Uncommon).png` ] },
					"theoretical_hoe_wheat_3": { selectors:[ s_minetipTitle`&9Euclid's Wheat Hoe`, s_alt`Euclid's Wheat Hoe (Rare).png` ] },
					"theoretical_hoe": { wiki: "Mathematical Hoe Blueprint" },
					"thornleaf_scythe": { wiki: "Thornleaf Scythe" },
				}),
				
				'/foraging': new Folder({
					"jungle_axe": { wiki: "Jungle Axe" },
					"mobys_shears": { wiki: "Moby's Shears" },
					"promising_axe": { wiki: "Promising Axe" },
					"rookie_axe": { wiki: "Rookie Axe" },
					"sculptors_axe": { wiki: "Sculptor's Axe" },
					"sweet_axe": { wiki: "Sweet Axe" },
					"treecapitator_axe": { wiki: "Treecapitator" },
					"tuning_fork": { wiki: "Tuning Fork" },
					"weather_stick": { wiki: "Weather Stick" },
				}),
				
				'/mining': new Folder({
					"bandaged_mithril_pickaxe": { wiki: "Bandaged Mithril Pickaxe" },
					"bingonimbus_2000": { wiki: "Bingonimbus 2000" },
					"bob_omb": { wiki: "Bob-omb" },
					"dwarven_metal_detector": { wiki: "Metal Detector" },
					"flint_shovel": { wiki: "Flint Shovel" },
					"fractured_mithril_pickaxe": { wiki: "Fractured Mithril Pickaxe" },
					"jungle_pickaxe": { wiki: "Jungle Pickaxe" },
					"mithril_pickaxe": { wiki: "Mithril Pickaxe" },
					"pickonimbus": { wiki: "Pickonimbus 2000" },
					"promising_pickaxe": { wiki: "Promising Pickaxe" },
					"promising_spade": { wiki: "Promising Shovel" },
					"refined_mithril_pickaxe": { wiki: "Refined Mithril Pickaxe" },
					"refined_titanium_pickaxe": { wiki: "Refined Titanium Pickaxe" },
					"rookie_pickaxe": { wiki: "Rookie Pickaxe" },
					"rookie_spade": { wiki: "Rookie Shovel" },
					"snow_shovel": { wiki: "Snow Shovel" },
					"stonk_pickaxe": { wiki: "Stonk" },
					"titanium_pickaxe": { wiki: "Titanium Pickaxe" },
					"zombie_pickaxe": { wiki: "Zombie Pickaxe" },
					"zoom_pickaxe": { wiki: "Zoom" },
					
					"/gemstone_gauntlet": new Folder({
						"gemstone_gauntlet_empty": { imgName: "Gemstone Gauntlet", wiki: "Gemstone Gauntlet" },
						"gemstone_gauntlet": { imgName: "Gemstone Gauntlet (Maxed)" },
						"gemstone_gauntlet_a": { imgName: "Gemstone Gauntlet (a)" },
						"gemstone_gauntlet_ao": { imgName: "Gemstone Gauntlet (ab)" },
						"gemstone_gauntlet_as": { imgName: "Gemstone Gauntlet (as)" },
						"gemstone_gauntlet_aso": { imgName: "Gemstone Gauntlet (asb)" },
						"gemstone_gauntlet_ast": { imgName: "Gemstone Gauntlet (ast)" },
						"gemstone_gauntlet_asto": { imgName: "Gemstone Gauntlet (astb)" },
						"gemstone_gauntlet_at": { imgName: "Gemstone Gauntlet (at)" },
						"gemstone_gauntlet_ato": { imgName: "Gemstone Gauntlet (atb)" },
						"gemstone_gauntlet_j": { imgName: "Gemstone Gauntlet (j)" },
						"gemstone_gauntlet_ja": { imgName: "Gemstone Gauntlet (ja)" },
						"gemstone_gauntlet_jao": { imgName: "Gemstone Gauntlet (jab)" },
						"gemstone_gauntlet_jas": { imgName: "Gemstone Gauntlet (jas)" },
						"gemstone_gauntlet_jaso": { imgName: "Gemstone Gauntlet (jasb)" },
						"gemstone_gauntlet_jast": { imgName: "Gemstone Gauntlet (jast)" },
						"gemstone_gauntlet_jat": { imgName: "Gemstone Gauntlet (jat)" },
						"gemstone_gauntlet_jato": { imgName: "Gemstone Gauntlet (jatb)" },
						"gemstone_gauntlet_jo": { imgName: "Gemstone Gauntlet (jb)" },
						"gemstone_gauntlet_js": { imgName: "Gemstone Gauntlet (js)" },
						"gemstone_gauntlet_jso": { imgName: "Gemstone Gauntlet (jsb)" },
						"gemstone_gauntlet_jst": { imgName: "Gemstone Gauntlet (jst)" },
						"gemstone_gauntlet_jsto": { imgName: "Gemstone Gauntlet (jstb)" },
						"gemstone_gauntlet_jt": { imgName: "Gemstone Gauntlet (jt)" },
						"gemstone_gauntlet_jto": { imgName: "Gemstone Gauntlet (jtb)" },
						"gemstone_gauntlet_o": { imgName: "Gemstone Gauntlet (b)" },
						"gemstone_gauntlet_s": { imgName: "Gemstone Gauntlet (s)" },
						"gemstone_gauntlet_so": { imgName: "Gemstone Gauntlet (sb)" },
						"gemstone_gauntlet_st": { imgName: "Gemstone Gauntlet (st)" },
						"gemstone_gauntlet_sto": { imgName: "Gemstone Gauntlet (stb)" },
						"gemstone_gauntlet_t": { imgName: "Gemstone Gauntlet (t)" },
						"gemstone_gauntlet_to": { imgName: "Gemstone Gauntlet (tb)" },
					}),
				}),
				
				/* Alt item states/variants that don't matter on the wiki
					skyblock/tools/combat/blazetekk_ham_radio_fm.png
					skyblock/tools/combat/blazetekk_ham_radio_am.png
					skyblock/tools/combat/blazetekk_ham_radio_bt.png
					skyblock/tools/combat/blazetekk_ham_radio_gps.png
					skyblock/tools/combat/blazetekk_ham_radio_inf.png
					skyblock/tools/combat/blazetekk_ham_radio_seti.png
					skyblock/tools/combat/blazetekk_ham_radio_xm.png
					skyblock/tools/farming/fungi_cutter_brown.png
				*/
			}),
			
			///////////////////////////
			// Glitched Items
			///////////////////////////
			'/glitch': new Folder({
				"frosty_snow_ball": { wiki: "Frosty Snowball" },
				
				/* Unused on wiki and/or TODO
					skyblock/glitch/alpha_slab.png
					skyblock/glitch/null_acacia_log.png
					skyblock/glitch/null_anvil.png
					skyblock/glitch/null_brown_mushroom_block.png
					skyblock/glitch/null_cobblestone_wall.png
					skyblock/glitch/null_dandelion.png
					skyblock/glitch/null_dark_oak_log.png
					skyblock/glitch/null_dirt.png
					skyblock/glitch/null_double_plant.png
					skyblock/glitch/null_hay_bale.png
					skyblock/glitch/null_leaves.png
					skyblock/glitch/null_leaves2.png
					skyblock/glitch/null_map.png
					skyblock/glitch/null_oak_log.png
					skyblock/glitch/null_obsidian.png
					skyblock/glitch/null_planks.png
					skyblock/glitch/null_poppy.png
					skyblock/glitch/null_prismarine.png
					skyblock/glitch/null_quartz_block.png
					skyblock/glitch/null_red_mushroom_block.png
					skyblock/glitch/null_red_sandstone.png
					skyblock/glitch/null_sand.png
					skyblock/glitch/null_sandstone.png
					skyblock/glitch/null_sapling.png
					skyblock/glitch/null_snow_layer.png
					skyblock/glitch/null_sponge.png
					skyblock/glitch/null_stone.png
					skyblock/glitch/null_stone_bricks.png
					skyblock/glitch/null_stone_slab.png
					skyblock/glitch/null_stone_slab2.png
					skyblock/glitch/null_tall_grass.png
					skyblock/glitch/null_wooden_slab.png
					skyblock/glitch/null_lava.png
					skyblock/glitch/null_water.png
					skyblock/glitch/still_lava.png
					skyblock/glitch/still_water.png
					skyblock/glitch/carrots.png
					skyblock/glitch/cocoa_plant.png
					skyblock/glitch/potatoes.png
				*/
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
				
				'/backpacks': new Folder({
					"jumbo_backpack_upgrade": { wiki: "Jumbo Backpack Upgrade" },
					"trick_or_treat_bag": { wiki: "Trick or Treat Bag" },
				
					"small_backpack": { wiki: "Small Backpack" },
					"small_backpack_red": { imgName: "Small Backpack (Red)" },
					"small_backpack_orange": { imgName: "Small Backpack (Orange)" },
					"small_backpack_yellow": { imgName: "Small Backpack (Yellow)" },
					"small_backpack_lime": { imgName: "Small Backpack (Lime)" },
					"small_backpack_green": { imgName: "Small Backpack (Green)" },
					"small_backpack_aqua": { imgName: "Small Backpack (Light Blue)" },
					"small_backpack_cyan": { imgName: "Small Backpack (Cyan)" },
					"small_backpack_blue": { imgName: "Small Backpack (Blue)" },
					"small_backpack_purple": { imgName: "Small Backpack (Purple)" },
					"small_backpack_magenta": { imgName: "Small Backpack (Magenta)" },
					"small_backpack_pink": { imgName: "Small Backpack (Pink)" },
					"small_backpack_brown": { imgName: "Small Backpack (Brown)" },
					"small_backpack_black": { imgName: "Small Backpack (Black)" },
					"small_backpack_gray": { imgName: "Small Backpack (Gray)" },
					"small_backpack_silver": { imgName: "Small Backpack (Light Gray)" },
					"small_backpack_white": { imgName: "Small Backpack (White)" },
					
					"medium_backpack": { wiki: "Medium Backpack" },
					"medium_backpack_red": { imgName: "Medium Backpack (Red)" },
					"medium_backpack_orange": { imgName: "Medium Backpack (Orange)" },
					"medium_backpack_yellow": { imgName: "Medium Backpack (Yellow)" },
					"medium_backpack_lime": { imgName: "Medium Backpack (Lime)" },
					"medium_backpack_green": { imgName: "Medium Backpack (Green)" },
					"medium_backpack_aqua": { imgName: "Medium Backpack (Light Blue)" },
					"medium_backpack_cyan": { imgName: "Medium Backpack (Cyan)" },
					"medium_backpack_blue": { imgName: "Medium Backpack (Blue)" },
					"medium_backpack_purple": { imgName: "Medium Backpack (Purple)" },
					"medium_backpack_magenta": { imgName: "Medium Backpack (Magenta)" },
					"medium_backpack_pink": { imgName: "Medium Backpack (Pink)" },
					"medium_backpack_brown": { imgName: "Medium Backpack (Brown)" },
					"medium_backpack_black": { imgName: "Medium Backpack (Black)" },
					"medium_backpack_gray": { imgName: "Medium Backpack (Gray)" },
					"medium_backpack_silver": { imgName: "Medium Backpack (Light Gray)" },
					"medium_backpack_white": { imgName: "Medium Backpack (White)" },
					
					"large_backpack": { wiki: "Large Backpack" },
					"large_backpack_red": { imgName: "Large Backpack (Red)" },
					"large_backpack_orange": { imgName: "Large Backpack (Orange)" },
					"large_backpack_yellow": { imgName: "Large Backpack (Yellow)" },
					"large_backpack_lime": { imgName: "Large Backpack (Lime)" },
					"large_backpack_green": { imgName: "Large Backpack (Green)" },
					"large_backpack_aqua": { imgName: "Large Backpack (Light Blue)" },
					"large_backpack_cyan": { imgName: "Large Backpack (Cyan)" },
					"large_backpack_blue": { imgName: "Large Backpack (Blue)" },
					"large_backpack_purple": { imgName: "Large Backpack (Purple)" },
					"large_backpack_magenta": { imgName: "Large Backpack (Magenta)" },
					"large_backpack_pink": { imgName: "Large Backpack (Pink)" },
					"large_backpack_brown": { imgName: "Large Backpack (Brown)" },
					"large_backpack_black": { imgName: "Large Backpack (Black)" },
					"large_backpack_gray": { imgName: "Large Backpack (Gray)" },
					"large_backpack_silver": { imgName: "Large Backpack (Light Gray)" },
					"large_backpack_white": { imgName: "Large Backpack (White)" },
					
					"greater_backpack": { wiki: "Greater Backpack" },
					"greater_backpack_red": { imgName: "Greater Backpack (Red)" },
					"greater_backpack_orange": { imgName: "Greater Backpack (Orange)" },
					"greater_backpack_yellow": { imgName: "Greater Backpack (Yellow)" },
					"greater_backpack_lime": { imgName: "Greater Backpack (Lime)" },
					"greater_backpack_green": { imgName: "Greater Backpack (Green)" },
					"greater_backpack_aqua": { imgName: "Greater Backpack (Light Blue)" },
					"greater_backpack_cyan": { imgName: "Greater Backpack (Cyan)" },
					"greater_backpack_blue": { imgName: "Greater Backpack (Blue)" },
					"greater_backpack_purple": { imgName: "Greater Backpack (Purple)" },
					"greater_backpack_magenta": { imgName: "Greater Backpack (Magenta)" },
					"greater_backpack_pink": { imgName: "Greater Backpack (Pink)" },
					"greater_backpack_brown": { imgName: "Greater Backpack (Brown)" },
					"greater_backpack_black": { imgName: "Greater Backpack (Black)" },
					"greater_backpack_gray": { imgName: "Greater Backpack (Gray)" },
					"greater_backpack_silver": { imgName: "Greater Backpack (Light Gray)" },
					"greater_backpack_white": { imgName: "Greater Backpack (White)" },
					
					"jumbo_backpack": { wiki: "Jumbo Backpack" },
					"jumbo_backpack_red": { imgName: "Jumbo Backpack (Red)" },
					"jumbo_backpack_orange": { imgName: "Jumbo Backpack (Orange)" },
					"jumbo_backpack_yellow": { imgName: "Jumbo Backpack (Yellow)" },
					"jumbo_backpack_lime": { imgName: "Jumbo Backpack (Lime)" },
					"jumbo_backpack_green": { imgName: "Jumbo Backpack (Green)" },
					"jumbo_backpack_aqua": { imgName: "Jumbo Backpack (Light Blue)" },
					"jumbo_backpack_cyan": { imgName: "Jumbo Backpack (Cyan)" },
					"jumbo_backpack_blue": { imgName: "Jumbo Backpack (Blue)" },
					"jumbo_backpack_purple": { imgName: "Jumbo Backpack (Purple)" },
					"jumbo_backpack_magenta": { imgName: "Jumbo Backpack (Magenta)" },
					"jumbo_backpack_pink": { imgName: "Jumbo Backpack (Pink)" },
					"jumbo_backpack_brown": { imgName: "Jumbo Backpack (Brown)" },
					"jumbo_backpack_black": { imgName: "Jumbo Backpack (Black)" },
					"jumbo_backpack_gray": { imgName: "Jumbo Backpack (Gray)" },
					"jumbo_backpack_silver": { imgName: "Jumbo Backpack (Light Gray)" },
					"jumbo_backpack_white": { imgName: "Jumbo Backpack (White)" },
					
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
				
				'/crimson_isle': new Folder({
					"dean_letter_of_recommendation": { wiki: "Letter of Recommendation" },
					"fire_soul": { wiki: "Fire Soul" },
					"heavy_pearl": { wiki: "Heavy Pearl" },
					"kuudra_burning_tier_key": { wiki: "Burning Kuudra Key" },
					"kuudra_fiery_tier_key": { wiki: "Fiery Kuudra Key" },
					"kuudra_hot_tier_key": { wiki: "Hot Kuudra Key" },
					"kuudra_infernal_tier_key": { wiki: "Infernal Kuudra Key" },
					"kuudra_tier_key": { wiki: "Kuudra Key" },
					"marsh_spore_soup": { wiki: "Marsh Spore Soup" },
					"match_sticks": { wiki: "Match-Sticks" },
					"mushroom_spore": { wiki: "Mushroom Spore" },
					"red_thornleaf": { wiki: "Red Thornleaf" },
					"scorched_power_crystal": { wiki: "Scorched Power Crystal" },
					"sulphur_ore": { wiki: ["Enchanted Sulphur", "Sulphur"] },
					"suspicious_stew": { wiki: "Suspicious Stew" },
					
					'/mob_loot': new Folder({
						"bezos": { wiki: "Bezos" },
						"blaze_ashes": { wiki: "Blaze Ashes" },
						"burning_eye": { wiki: "Burning Eye" },
						"cup_of_blood": { wiki: "Cup of Blood" },
						"digested_mushrooms": { wiki: "Digested Mushrooms" },
						"flaming_heart": { wiki: "Flaming Heart" },
						"gazing_pearl": { wiki: "Gazing Pearl" },
						"hallowed_skull": { wiki: "Hallowed Skull" },
						"horn_of_taurus": { wiki: "Horn of Taurus" },
						"kada_lead": { wiki: "Kada Lead" },
						"lava_shell": { wiki: "Lava Shell" },
						"leather_cloth": { wiki: "Leather Cloth" },
						"lumino_fiber": { wiki: "Lumino Fiber" },
						"lump_of_magma": { wiki: "Lump of Magma" },
						"magmag": { wiki: "Magmag" },
						"millenia_old_blaze_ashes": { wiki: "Millenia-Old Blaze Ashes" },
						"moogma_pelt": { wiki: "Moogma Pelt" },
						"mutated_blaze_ashes": { wiki: "Mutated Blaze Ashes" },
						"orb_of_energy": { wiki: "Orb of Energy" },
						"pyroclastic_scale": { wiki: "Pyroclastic Scale" },
						"spectre_dust": { wiki: "Spectre Dust" },
						"spell_powder": { wiki: "Spell Powder" },
						"tentacle_meat": { wiki: "Tentacle Meat" },
						"thunder_shards": { wiki: "Thunder Shards" },
						"wither_soul": { wiki: "Wither Soul" },
					}),
					
					'/trophy_fishing': new Folder({
						"blobfish_bronze": { wiki: ["Blobfish", "Blobfish (Bronze)"] },
						"blobfish_diamond": { wiki: "Blobfish (Diamond)" },
						"blobfish_gold": { wiki: "Blobfish (Gold)" },
						"blobfish_silver": { wiki: "Blobfish (Silver)" },
						"flyfish_bronze": { wiki: ["Flyfish", "Flyfish (Bronze)"] },
						"flyfish_diamond": { wiki: "Flyfish (Diamond)" },
						"flyfish_gold": { wiki: "Flyfish (Gold)" },
						"flyfish_silver": { wiki: "Flyfish (Silver)" },
						"golden_fish_bronze": { wiki: ["Golden Fish", "Golden Fish (Bronze)"] },
						"golden_fish_diamond": { wiki: "Golden Fish (Diamond)" },
						"golden_fish_gold": { wiki: "Golden Fish (Gold)" },
						"golden_fish_silver": { wiki: "Golden Fish (Silver)" },
						"gusher_bronze": { wiki: ["Gusher", "Gusher (Bronze)"] },
						"gusher_diamond": { wiki: "Gusher (Diamond)" },
						"gusher_gold": { wiki: "Gusher (Gold)" },
						"gusher_silver": { wiki: "Gusher (Silver)" },
						"karate_fish_bronze": { wiki: ["Karate Fish", "Karate Fish (Bronze)"] },
						"karate_fish_diamond": { wiki: "Karate Fish (Diamond)" },
						"karate_fish_gold": { wiki: "Karate Fish (Gold)" },
						"karate_fish_silver": { wiki: "Karate Fish (Silver)" },
						"lava_horse_bronze": { wiki: ["Lavahorse", "Lavahorse (Bronze)"] },
						"lava_horse_diamond": { wiki: "Lavahorse (Diamond)" },
						"lava_horse_gold": { wiki: "Lavahorse (Gold)" },
						"lava_horse_silver": { wiki: "Lavahorse (Silver)" },
						"magma_fish_diamond": { wiki: "Diamond Magmafish" },
						"magma_fish_gold": { wiki: "Gold Magmafish" },
						"magma_fish_silver": { wiki: "Silver Magmafish" },
						"magma_fish": { wiki: "Magmafish" },
						"mana_ray_bronze": { wiki: ["Mana Ray", "Mana Ray (Bronze)"] },
						"mana_ray_diamond": { wiki: "Mana Ray (Diamond)" },
						"mana_ray_gold": { wiki: "Mana Ray (Gold)" },
						"mana_ray_silver": { wiki: "Mana Ray (Silver)" },
						"moldfin_bronze": { wiki: ["Moldfin", "Moldfin (Bronze)"] },
						"moldfin_diamond": { wiki: "Moldfin (Diamond)" },
						"moldfin_gold": { wiki: "Moldfin (Gold)" },
						"moldfin_silver": { wiki: "Moldfin (Silver)" },
						"obfuscated_fish_1_bronze": { wiki: ["Obfuscated 1", "Obfuscated 1 (Bronze)"], imgName: "Obfuscated 1 (Bronze)" },
						"obfuscated_fish_1_diamond": { wiki: "Obfuscated 1 (Diamond)", imgName: "Obfuscated 1 (Diamond)" },
						"obfuscated_fish_1_gold": { wiki: "Obfuscated 1 (Gold)", imgName: "Obfuscated 1 (Gold)" },
						"obfuscated_fish_1_silver": { wiki: "Obfuscated 1 (Silver)", imgName: "Obfuscated 1 (Silver)" },
						"obfuscated_fish_2_bronze": { wiki: ["Obfuscated 2", "Obfuscated 2 (Bronze)"], imgName: "Obfuscated 2 (Bronze)" },
						"obfuscated_fish_2_diamond": { wiki: "§kObfuscated 2 (Diamond)", imgName: "Obfuscated 2 (Diamond)" },
						"obfuscated_fish_2_gold": { wiki: "Obfuscated 2 (Gold)", imgName: "Obfuscated 2 (Gold)" },
						"obfuscated_fish_2_silver": { wiki: "Obfuscated 2 (Silver)", imgName: "Obfuscated 2 (Silver)" },
						"obfuscated_fish_3_bronze": { wiki: ["Obfuscated 3", "Obfuscated 3 (Bronze)"], imgName: "Obfuscated 3 (Bronze)" },
						"obfuscated_fish_3_diamond": { wiki: "§kObfuscated 3 (Diamond)", imgName: "Obfuscated 3 (Diamond)" },
						"obfuscated_fish_3_gold": { wiki: "Obfuscated 3 (Gold)", imgName: "Obfuscated 3 (Gold)" },
						"obfuscated_fish_3_silver": { wiki: "Obfuscated 3 (Silver)", imgName: "Obfuscated 3 (Silver)" },
						"skeleton_fish_bronze": { wiki: ["Skeleton Fish", "Skeleton Fish (Bronze)"] },
						"skeleton_fish_diamond": { wiki: "Skeleton Fish (Diamond)" },
						"skeleton_fish_gold": { wiki: "Skeleton Fish (Gold)" },
						"skeleton_fish_silver": { wiki: "Skeleton Fish (Silver)" },
						"slugfish_bronze": { wiki: ["Slugfish", "Slugfish (Bronze)"] },
						"slugfish_diamond": { wiki: "Slugfish (Diamond)" },
						"slugfish_gold": { wiki: "Slugfish (Gold)" },
						"slugfish_silver": { wiki: "Slugfish (Silver)" },
						"soul_fish_bronze": { wiki: ["Soul Fish", "Soul Fish (Bronze)"] },
						"soul_fish_diamond": { wiki: "Soul Fish (Diamond)" },
						"soul_fish_gold": { wiki: "Soul Fish (Gold)" },
						"soul_fish_silver": { wiki: "Soul Fish (Silver)" },
						"steaming_hot_flounder_bronze": { wiki: ["Steaming-Hot Flounder", "Steaming-Hot Flounder (Bronze)"] },
						"steaming_hot_flounder_diamond": { wiki: "Steaming-Hot Flounder (Diamond)" },
						"steaming_hot_flounder_gold": { wiki: "Steaming-Hot Flounder (Gold)" },
						"steaming_hot_flounder_silver": { wiki: "Steaming-Hot Flounder (Silver)" },
						"sulphur_skitter_bronze": { wiki: ["Sulphur Skitter", "Sulphur Skitter (Bronze)"] },
						"sulphur_skitter_diamond": { wiki: "Sulphur Skitter (Diamond)" },
						"sulphur_skitter_gold": { wiki: "Sulphur Skitter (Gold)" },
						"sulphur_skitter_silver": { wiki: "Sulphur Skitter (Silver)" },
						"vanille_bronze": { wiki: ["Vanille", "Vanille (Bronze)"] },
						"vanille_diamond": { wiki: "Vanille (Diamond)" },
						"vanille_gold": { wiki: "Vanille (Gold)" },
						"vanille_silver": { wiki: "Vanille (Silver)" },
						"volcanic_stonefish_bronze": { wiki: ["Volcanic Stonefish", "Volcanic Stonefish (Bronze)"] },
						"volcanic_stonefish_diamond": { wiki: "Volcanic Stonefish (Diamond)" },
						"volcanic_stonefish_gold": { wiki: "Volcanic Stonefish (Gold)" },
						"volcanic_stonefish_silver": { wiki: "Volcanic Stonefish (Silver)" },
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
				
				'/dyes': new Folder({
					"dye_aquamarine": { wiki: "Aquamarine Dye" },
					"dye_bingo_blue": { wiki: "Bingo Blue Dye" },
					"dye_bone": { wiki: "Bone Dye" },
					"dye_brick_red": { wiki: "Brick Red Dye" },
					"dye_byzantium": { wiki: "Byzantium Dye" },
					"dye_carmine": { wiki: "Carmine Dye" },
					"dye_dark_purple": { wiki: "Dark Purple Dye" },
					"dye_emerald": { wiki: "Emerald Dye" },
					"dye_flame": { wiki: "Flame Dye" },
					"dye_mango": { wiki: "Mango Dye" },
					"dye_necron": { wiki: "Necron Dye" },
					"dye_pure_black": { wiki: "Pure Black Dye" },
					"dye_pure_white": { wiki: "Pure White Dye" },
					"dye_wild_strawberry": { wiki: "Wild Strawberry Dye" },
					"dye_celadon": { wiki: "Celadon Dye" },
					"dye_celeste": { wiki: "Celeste Dye" },
					"dye_cyclamen": { wiki: "Cyclamen Dye" },
					"dye_iceberg": { wiki: "Iceberg Dye" },
					"dye_livid": { wiki: "Livid Dye" },
					"dye_midnight": { wiki: "Midnight Dye" },
					"dye_nadeshiko": { wiki: "Nadeshiko Dye" },
					"dye_nyanza": { wiki: "Nyanza Dye" },
					"dye_pure_blue": { wiki: "Pure Blue Dye" },
					"dye_pure_yellow": { wiki: "Pure Yellow Dye" },
					"tentacle_dye": { wiki: "Tentacle Dye" },
				}),
				
				'/events': new Folder({
					"spooky/bat_firework": { wiki: "Bat Firework" },
					"spooky/horseman_candle": { wiki: "Horseman Candle" },
					"jerry/jerry_box_blue": { wiki: "Blue Jerry Box" },
					"jerry/jerry_box_golden": { wiki: "Golden Jerry Box" },
					"jerry/jerry_box_green": { wiki: "Green Jerry Box" },
					"jerry/jerry_box_mega": { wiki: "Mega Jerry Box" },
					"jerry/jerry_box_purple": { wiki: "Purple Jerry Box" },
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
					"gemstone_mixture": { wiki: "Gemstone Mixture" },
					"gemstone_powder": { wiki: "Gemstone Powder", selectors:[`img[data-image-key="Gemstone Powder.png"]`] },
					// Build rules for all normal gemstone types
					...(()=>{
						// only real difference is the `$=` on first image selector due to issues with tooltips adding icons in front of name in alt text
						const getGemstoneSelector = (w) => [s_alt(w), s_alt(`${w}.png`)];
						
						const obj = Object.fromEntries(['Amber', 'Amethyst', 'Jade', 'Jasper', 'Opal', 'Ruby', 'Sapphire', 'Topaz']
						.flatMap(type=>
							['Rough', 'Flawed', 'Fine', 'Flawless', 'Perfect'].map(grade => [
								`${grade.toLowerCase()}_${type.toLowerCase()}_gem`,
								{ selectors: getGemstoneSelector(`${grade} ${type} Gemstone`) },
							])
						));
						obj['flawless_ruby_gem'].wiki = "Gemstone"; // we want unspecified gemstone to use ruby asset
						return obj;
					})(),
					// Crystals get treated like normal items
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
					
					"travel_scroll" : { wiki: [
						"Travel Scroll",
						"Travel Scroll to Arachne's Sanctuary",
						"Travel Scroll to the Crystal Hollows",
						"Travel Scroll to the Crystal Nucleus",
						"Travel Scroll to Spider's Den",
						"Travel Scroll to the Crimson Isle",
						"Travel Scroll to the End",
						"Travel Scroll to Dragon's Nest",
						"Travel Scroll to the Barn",
						"Travel Scroll to Mushroom Island",
						"Travel Scroll to The Park",
						"Travel Scroll to the Dwarven Forge",
						"Travel Scroll to Hub Castle",
						"Travel Scroll to Hub Crypts",
						"Travel Scroll to Dark Auction",
						"Travel Scroll to the Gold Mine",
						"Travel Scroll to Deep Caverns",
						"Travel Scroll to Dwarven Mines",
						"Travel Scroll to Museum",
						"Dusty Travel Scroll to the Kuudra Skull",
						"Travel Scroll to Howling Cave",
						"Travel Scroll to Jungle Island",
						"Travel Scroll to the Smoldering Tomb",
						"Travel Scroll to Spider's Den Top of Nest",
						"Travel Scroll to the Void Sepulture",
						"Travel Scroll to the Trapper's Den",
						"Travel Scroll to the Wasteland",
						"Travel Scroll to The Wasteland", // duplicate but with "The" vs "the"
						"Travel Scroll to Dragontail",
						"Travel Scroll to Scarleton",
						"Travel Scroll to Blazing Fortress",
						"Travel Scroll to Magma Fields",
					] },
				
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
				
				'/modifiers': new Folder({
					"amber_power_scroll": { wiki: "Amber Power Scroll" },
					"amethyst_power_scroll": { wiki: "Amethyst Power Scroll" },
					"jasper_power_scroll": { wiki: "Jasper Power Scroll" },
					"opal_power_scroll": { wiki: "Opal Power Scroll" },
					"ruby_power_scroll": { wiki: "Ruby Power Scroll" },
					"sapphire_power_scroll": { wiki: "Sapphire Power Scroll" },
					"jade_power_scroll": { wiki: "Jade Power Scroll" },
					"topaz_power_scroll": { wiki: "Topaz Power Scroll" },

					"polarvoid_book": { wiki: "Polarvoid Book" },
					"enchanted_book_bundle": { wiki: "Enchanted Book Bundle" },
					"kuudra_washing_machine": { wiki: "Kuudra Washing Machine" },
					"sil_ex": { wiki: "Silex" },
				}),
				
				'/pet_items': new Folder({
					"all_skills_super_boost": { wiki: "All Skills Exp Super-Boost" },
					"base_griffin_upgrade_stone": { wiki: "Base Griffin Upgrade Stone" },
					"bigger_teeth": { wiki: "Bigger Teeth" },
					"dwarf_turtle_shelmet": { wiki: "Dwarf Turtle Shelmet" },
					"fake_neuroscience_degree": { wiki: "Fake Neuroscience Degree" },
					"four_eyed_fish": { wiki: "Four-Eyed Fish" },
					"gold_claws": { wiki: "Gold Claws" },
					"great_carrot_candy": { wiki: "Great Carrot Candy" },
					"green_bandana": { wiki: "Green Bandana" },
					"griffin_upgrade_stone_epic": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_legendary": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_rare": { wiki: "Griffin Upgrade Stone" },
					"griffin_upgrade_stone_uncommon": { wiki: "Griffin Upgrade Stone" },
					"guardian_lucky_block": { wiki: "Guardian Lucky Block" },
					"kat_flower": { wiki: "Kat Flower" },
					"minos_relic": { wiki: "Minos Relic" },
					"pet_item_all_skills_boost": { selectors: [`img[alt^='All Skills Exp Boost']`, s_alt`All Skills Exp Super-Boost.png`] },
					"pet_item_big_teeth": { selectors: [`img[alt^='Big Teeth']`, s_alt`Big Teeth.png`] },
					"pet_item_combat_skill_boost_common": { wiki: ["Combat Exp Boost", "Combat Exp Boost (Common)"] },
					"pet_item_combat_skill_boost_epic": { selectors: [s_minetipTitle`&5Combat Exp Boost`, s_alt`Combat Exp Boost (Epic)`] },
					"pet_item_combat_skill_boost_legendary": { selectors: [s_minetipTitle`&6Combat Exp Boost`, s_alt`Combat Exp Boost (Legendary)`] },
					"pet_item_combat_skill_boost_rare": { selectors: [s_minetipTitle`&9Combat Exp Boost`, s_alt`Combat Exp Boost (Rare)`] },
					"pet_item_combat_skill_boost_uncommon": { selectors: [s_minetipTitle`&aCombat Exp Boost`, s_alt`Combat Exp Boost (Uncommon)`] },
					"pet_item_exp_share_drop": { wiki: "Exp Share Core" },
					"pet_item_exp_share": { wiki: "Exp Share" },
					"pet_item_farming_skill_boost_common": { wiki: ["Farming Exp Boost", "Farming Exp Boost (Common)"] },
					"pet_item_farming_skill_boost_epic": { selectors: [s_minetipTitle`&5Farming Exp Boost`, s_alt`Farming Exp Boost (Epic)`] },
					"pet_item_farming_skill_boost_legendary": { selectors: [s_minetipTitle`&6Farming Exp Boost`, s_alt`Farming Exp Boost (Legendary)`] },
					"pet_item_farming_skill_boost_rare": { selectors: [s_minetipTitle`&9Farming Exp Boost`, s_alt`Farming Exp Boost (Rare)`] },
					"pet_item_farming_skill_boost_uncommon": { selectors: [s_minetipTitle`&aFarming Exp Boost`, s_alt`Farming Exp Boost (Uncommon)`] },
					"pet_item_fishing_skill_boost_common": { wiki: ["Fishing Exp Boost", "Fishing Exp Boost (Common)"] },
					"pet_item_fishing_skill_boost_epic": { selectors: [s_minetipTitle`&5Fishing Exp Boost`, s_alt`Fishing Exp Boost (Epic)`] },
					"pet_item_fishing_skill_boost_legendary": { selectors: [s_minetipTitle`&6Fishing Exp Boost`, s_alt`Fishing Exp Boost (Legendary)`] },
					"pet_item_fishing_skill_boost_rare": { selectors: [s_minetipTitle`&9Fishing Exp Boost`, s_alt`Fishing Exp Boost (Rare)`] },
					"pet_item_fishing_skill_boost_uncommon": { selectors: [s_minetipTitle`&aFishing Exp Boost`, s_alt`Fishing Exp Boost (Uncommon)`] },
					"pet_item_flying_pig": { wiki: "Flying Pig" },
					"pet_item_foraging_skill_boost_common": { wiki: ["Foraging Exp Boost", "Foraging Exp Boost (Common)"] },
					"pet_item_foraging_skill_boost_epic": { selectors: [s_minetipTitle`&5Foraging Exp Boost`, s_alt`Foraging Exp Boost (Epic)`] },
					"pet_item_foraging_skill_boost_legendary": { selectors: [s_minetipTitle`&6Foraging Exp Boost`, s_alt`Foraging Exp Boost (Legendary)`] },
					"pet_item_foraging_skill_boost_rare": { selectors: [s_minetipTitle`&9Foraging Exp Boost`, s_alt`Foraging Exp Boost (Rare)`] },
					"pet_item_foraging_skill_boost_uncommon": { selectors: [s_minetipTitle`&aForaging Exp Boost`, s_alt`Foraging Exp Boost (Uncommon)`] },
					"pet_item_hardened_scales": { selectors: [`img[alt^='Hardened Scales']`, s_alt`Hardened Scales.png`] },
					"pet_item_iron_claws": { selectors: [`img[alt^='Iron Claws']`, s_alt`Iron Claws.png`] },
					"pet_item_lucky_clover_drop": { wiki: "Lucky Clover Core" },
					"pet_item_lucky_clover": { wiki: "Lucky Clover" },
					"pet_item_mining_skill_boost_common": { wiki: ["Mining Exp Boost", "Mining Exp Boost (Common)"] },
					"pet_item_mining_skill_boost_epic": { selectors: [s_minetipTitle`&5Mining Exp Boost`, s_alt`Mining Exp Boost (Epic)`] },
					"pet_item_mining_skill_boost_legendary": { selectors: [s_minetipTitle`&6Mining Exp Boost`, s_alt`Mining Exp Boost (Legendary)`] },
					"pet_item_mining_skill_boost_rare": { selectors: [s_minetipTitle`&9Mining Exp Boost`, s_alt`Mining Exp Boost (Rare)`] },
					"pet_item_mining_skill_boost_uncommon": { selectors: [s_minetipTitle`&aMining Exp Boost`, s_alt`Mining Exp Boost (Uncommon)`] },
					"pet_item_quick_claw": { wiki: "Quick Claw" },
					"pet_item_sharpened_claws": { selectors: [`img[alt^='Sharpened Claws']`, s_alt`Sharpened Claws.png`] },
					"pet_item_spooky_cupcake": { wiki: "Spooky Cupcake" },
					"pet_item_textbook": { wiki: "Textbook" },
					"pet_item_tier_boost_drop": { wiki: "Tier Boost Core" },
					"pet_item_tier_boost": { wiki: "Tier Boost" },
					"pet_item_toy_jerry": { wiki: "Jerry 3D Glasses" },
					"pet_item_vampire_fang": { wiki: "Vampire Fang" },
					"radioactive_vial": { wiki: "Radioactive Vial" },
					"reaper_gem": { wiki: "Reaper Gem" },
					"reinforced_scales": { wiki: "Reinforced Scales" },
					"serrated_claws": { wiki: "Serrated Claws" },
					"simple_carrot_candy": { wiki: "Simple Carrot Candy" },
					"superb_carrot_candy": { wiki: "Superb Carrot Candy" },
					"ultimate_carrot_candy_upgrade": { wiki: "Ultimate Carrot Candy Upgrade" },
					"ultimate_carrot_candy": { wiki: "Ultimate Carrot Candy" },
					"yellow_bandana": { wiki: "Yellow Bandana" },
				}),
				
				'/potions': new Folder({
					"alchemy_xp_boost_potion": { wiki: "Alchemy XP Boost I Potion" },
					"combat_xp_boost_potion": { wiki: "Combat XP Boost I Potion" },
					"enchanting_xp_boost_potion": { wiki: "Enchanting XP Boost I Potion" },
					"farming_xp_boost_potion": { wiki: "Farming XP Boost I Potion" },
					"fishing_xp_boost_potion": { wiki: "Fishing XP Boost I Potion" },
					"foraging_xp_boost_potion": { wiki: "Foraging XP Boost I Potion" },
					"god_potion": { wiki: "God Potion" },
					"magic_find_potion": { wiki: "Magic Find I Potion" },
					"mining_xp_boost_potion": { wiki: "Mining XP Boost I Potion" },
					"spirit_potion": { wiki: "Spirit I Potion" },
					
					// No need for these to check for `.png` variant
					"absorption_potion": { selectors: [s_alt`Absorption I Potion`] },
					"adrenaline_potion": { selectors: [s_alt`Adrenaline I Potion`] },
					"agility_potion": { selectors: [s_alt`Agility I Potion`] },
					"archery_potion": { selectors: [s_alt`Archery I Potion`] },
					"blindness_potion": { selectors: [s_alt`Blindness I Potion`] },
					"burning_potion": { selectors: [s_alt`Burning I Potion`] },
					"critical_potion": { selectors: [s_alt`Critical I Potion`] },
					"dodge_potion": { selectors: [s_alt`Dodge I Potion`] },
					"dungeon_potion": { selectors: [s_alt`Dungeon I Potion`] },
					"experience_potion": { selectors: [s_alt`Experience I Potion`] },
					"haste_potion": { selectors: [s_alt`Haste I Potion`] },
					"knockback_potion": { selectors: [s_alt`Knockback I Potion`] },
					"mana_potion": { selectors: [s_alt`Mana I Potion`] },
					"mushed_glowy_tonic_potion": { selectors: [s_alt`Mushed Glowy Tonic`] },
					"obsidian_skin_potion": { selectors: [s_alt`Obsidian Skin I Potion`] },
					"pet_luck_potion": { selectors: [s_alt`Pet Luck I Potion`] },
					"rabbit_potion": { selectors: [s_alt`Rabbit I Potion`] },
					"resistance_potion": { selectors: [s_alt`Resistance I Potion`] },
					"spelunker_potion": { selectors: [s_alt`Spelunker I Potion`] },
					"stamina_potion": { selectors: [s_alt`Stamina I Potion`] },
					"stun_potion": { selectors: [s_alt`Stun I Potion`] },
					"true_defense_potion": { selectors: [s_alt`True Defense I Potion`] },
					"venomous_potion": { selectors: [s_alt`Venomous I Potion`] },
					"wounded_potion": { selectors: [s_alt`Wounded I Potion`] },

					'/brews': new Folder({
						"bitter_ice_tea": { wiki: "Bitter Iced Tea" },
						"black_coffee": { wiki: "Black Coffee" },
						"cheap_coffee": { wiki: "Cheap Coffee" },
						"decent_coffee": { wiki: "Decent Coffee" },
						"dr_paper": { wiki: "Dctr. Paper" },
						"hot_chocolate": { wiki: "Hot Chocolate" },
						"knockoff_cola": { wiki: [ "KnockOff Cola", "KnockOff™ Cola" ] },
						"pulpous_orange_juice": { wiki: "Pulpous Orange Juice" },
						"red_thornleaf_tea": { wiki: "Red Thornleaf Tea" },
						"scornclaw_brew": { wiki: "Scornclaw Brew" },
						"slayer_energy_drink": { wiki: [ "Slayer Energy Drink", "Slayer© Energy Drink" ] },
						"tepid_green_tea": { wiki: "Tepid Green Tea" },
						"tutti_frutti_poison": { wiki: "Tutti-Frutti Flavored Poison" },
						"viking_tear": { wiki: "Viking\'s Tear" },
					}),
					
					'/mixins': new Folder({
						"deepterror_mixin": { wiki: "Deepterror Mixin" },
						"end_portal_fumes_mixin": { wiki: "End Portal Fumes" },
						"gabagoey_mixin": { wiki: "Gabagoey Mixin" },
						"spider_egg_mixin": { wiki: "Spider Egg Mixin" },
						"wolf_fur_mixin": { wiki: "Wolf Fur Mixin" },
						"zombie_brain_mixin": { wiki: "Zombie Brain Mixin" },
					}),
					
					/* Splash potions - wiki doesn't ever bother to show these
						skyblock/items/potions/absorption_splash_potion.png
						skyblock/items/potions/adrenaline_splash_potion.png
						skyblock/items/potions/agility_splash_potion.png
						skyblock/items/potions/alchemy_xp_boost_splash_potion.png
						skyblock/items/potions/archery_splash_potion.png
						skyblock/items/potions/blindness_splash_potion.png
						skyblock/items/potions/burning_splash_potion.png
						skyblock/items/potions/combat_xp_boost_splash_potion.png
						skyblock/items/potions/critical_splash_potion.png
						skyblock/items/potions/dodge_splash_potion.png
						skyblock/items/potions/dungeon_splash_potion.png
						skyblock/items/potions/enchanting_xp_boost_splash_potion.png
						skyblock/items/potions/experience_splash_potion.png
						skyblock/items/potions/farming_xp_boost_splash_potion.png
						skyblock/items/potions/fishing_xp_boost_splash_potion.png
						skyblock/items/potions/foraging_xp_boost_splash_potion.png
						skyblock/items/potions/haste_splash_potion.png
						skyblock/items/potions/knockback_splash_potion.png
						skyblock/items/potions/magic_find_splash_potion.png
						skyblock/items/potions/mana_splash_potion.png
						skyblock/items/potions/mining_xp_boost_splash_potion.png
						skyblock/items/potions/mushed_glowy_tonic_splash_potion.png
						skyblock/items/potions/obsidian_skin_splash_potion.png
						skyblock/items/potions/pet_luck_splash_potion.png
						skyblock/items/potions/rabbit_splash_potion.png
						skyblock/items/potions/resistance_splash_potion.png
						skyblock/items/potions/spelunker_splash_potion.png
						skyblock/items/potions/spirit_splash_potion.png
						skyblock/items/potions/stamina_splash_potion.png
						skyblock/items/potions/stun_splash_potion.png
						skyblock/items/potions/true_defense_splash_potion.png
						skyblock/items/potions/venomous_splash_potion.png
						skyblock/items/potions/wounded_splash_potion.png
					*/
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
					"protochicken": { wiki: "Proto-Chicken" },
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
					"acacia_birdhouse": { wiki: "Acacia Birdhouse" },
					"amber_material": { wiki: "Amber Material" },
					"aote_stone": { wiki: "Warped Stone" },
					"beating_heart": { wiki: "Beating Heart" },
					"blaze_wax": { wiki: "Blaze Wax" },
					"blessed_fruit": { wiki: "Blessed Fruit" },
					"bubba_blister": { wiki: "Bubba Blister" },
					"bulky_stone": { wiki: "Bulky Stone" },
					"burrowing_spores": { wiki: "Burrowing Spores" },
					"candy_corn": { wiki: "Candy Corn" },
					"chocolate_chip": { wiki: "Fang-tastic Chocolate Chip" },
					"dark_orb": { wiki: "Dark Orb" },
					"deep_sea_orb": { wiki: "Deep Sea Orb" },
					"diamond_atom": { wiki: "Diamond Atom" },
					"diamonite": { wiki: "Diamonite" },
					"dirt_bottle": { wiki: "Dirt Bottle" },
					"displaced_leech": { wiki: "Displaced Leech" },
					"dragon_claw": { wiki: "Dragon Claw" },
					"dragon_horn": { wiki: "Dragon Horn" },
					"dragon_scale": { wiki: "Dragon Scale" },
					"eccentric_painting_bundle": { wiki: "Eccentric Painting Bundle" },
					"eccentric_painting": { wiki: "Eccentric Painting" },
					"end_stone_geode": { wiki: "End Stone Geode" },
					"end_stone_shulker": { wiki: "End Stone Shulker" },
					"ender_monocle": { wiki: "Ender Monocle" },
					"entropy_suppressor": { wiki: "Entropy Suppressor" },
					"flowering_bouquet": { wiki: "Flowering Bouquet" },
					"frozen_bauble": { wiki: "Frozen Bauble" },
					"full_jaw_fanging_kit": { wiki: "Full-Jaw Fanging Kit" },
					"furball": { wiki: "Furball" },
					"giant_tooth": { wiki: "Giant Tooth" },
					"golden_ball": { wiki: "Golden Ball" },
					"hardened_wood": { wiki: "Hardened Wood" },
					"hazmat_enderman": { wiki: "Hazmat Enderman" },
					"horns_of_torment": { wiki: "Horns of Torment" },
					"hot_stuff": { wiki: "Hot Stuff" },
					"jaderald": { wiki: "Jaderald" },
					"jerry_stone": { wiki: "Jerry Stone" },
					"kuudra_mandible": { wiki: "Kuudra Mandible" },
					"lapis_crystal": { wiki: "Lapis Crystal" },
					"large_walnut": { wiki: "Large Walnut" },
					"luxurious_spool": { wiki: "Luxurious Spool" },
					"magma_urchin": { wiki: "Magma Urchin" },
					"mandraa": { wiki: "Mandraa" },
					"meteor_shard": { wiki: "Meteor Shard" },
					"midas_jewel": { wiki: "Midas Jewel" },
					"moil_log": { wiki: "Moil Log" },
					"molten_cube": { wiki: "Molten Cube" },
					"necromancer_brooch": { wiki: "Necromancer\'s Brooch" },
					"obsidian_tablet": { wiki: "Obsidian Tablet" },
					"onyx": { wiki: "Onyx" },
					"optical_lens": { wiki: "Optical Lens" },
					"overgrown_grass": { wiki: "Overgrown Grass" },
					"petrified_starfall": { wiki: "Petrified Starfall" },
					"pitchin_koi": { wiki: "Pitchin' Koi" },
					"precious_pearl": { wiki: "Precious Pearl" },
					"precursor_gear": { wiki: "Precursor Gear" },
					"premium_flesh": { wiki: "Premium Flesh" },
					"presumed_gallon_of_red_paint": { wiki: "Presumed Gallon of Red Paint" },
					"pure_mithril": { wiki: "Pure Mithril" },
					"rare_diamond": { wiki: "Rare Diamond" },
					"red_nose": { wiki: "Red Nose" },
					"red_scarf": { wiki: "Red Scarf" },
					"refined_amber": { wiki: "Refined Amber" },
					"reforge_anvil": { wiki: "Reforge Anvil" },
					"rock_candy": { wiki: "Rock Candy" },
					"rock_gemstone": { wiki: "Rock Gemstone" },
					"rusty_anchor": { wiki: "Rusty Anchor" },
					"sadan_brooch": { wiki: "Sadan\'s Brooch" },
					"salmon_opal": { wiki: "Salmon Opal" },
					"salt_cube": { wiki: "Salt Cube" },
					"scorched_books": { wiki: "Scorched Books" },
					"searing_stone": { wiki: "Searing Stone" },
					"shiny_prism": { wiki: "Shiny Prism" },
					"skymart_brochure": { wiki: "SkyMart Brochure" },
					"spirit_decoy": { wiki: "Spirit Stone" },
					"suspicious_vial": { wiki: "Suspicious Vial" },
					"terry_snowglobe": { wiki: "Terry's Snowglobe" },
					"toil_log": { wiki: "Toil Log" },
					"vitamin_death": { wiki: "Vitamin Death" },
					"wither_blood": { wiki: "Wither Blood" },
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
					'/inferno_demonlord': new Folder({
						"amalgamated_crimsonite": { wiki: "Amalgamated Crimsonite" },
						"blaze_rod_distillate": { wiki: "Blaze Rod Distillate" },
						"capsaicin_eyedrops": { wiki: "Capsaicin Eyedrops" },
						"chili_pepper": { wiki: "Chili Pepper" },
						"crude_gabagool_distillate": { wiki: "Gabagool Distillate" },
						"crude_gabagool": { wiki: "Crude Gabagool" },
						"derelict_ashe": { wiki: "Derelict Ashe" },
						"fuel_gabagool": { wiki: "Fuel Gabagool" },
						"glowstone_dust_distillate": { wiki: "Glowstone Distillate" },
						"heavy_gabagool": { wiki: "Heavy Gabagool" },
						"hypergolic_gabagool": { wiki: "Hypergolic Gabagool" },
						"hypergolic_ionized_ceramics": { wiki: "Hypergolic Ionized Ceramics" },
						"inferno_apex": { wiki: "Inferno Apex" },
						"inferno_vertex": { wiki: "Inferno Vertex" },
						"kelvin_inverter": { wiki: "Kelvin Inverter" },
						"magma_cream_distillate": { wiki: "Magma Cream Distillate" },
						"molten_powder": { wiki: "Molten Powder" },
						"nether_stalk_distillate": { wiki: "Nether Wart Distillate" },
						"reaper_pepper": { wiki: "Reaper Pepper" },
						"reheated_gummy_polar_bear": { wiki: "Re-heated Gummy Polar Bear" },
						"stuffed_chili_pepper": { wiki: "Stuffed Chili Pepper" },
						"subzero_inverter": { wiki: "Subzero Inverter" },
						"sulphuric_coal": { wiki: "Sulphuric Coal" },
						"wilson_engineering_plans": { wiki: "Wilson's Engineering Plans" },
						
						'/fuel_blocks': new Folder({
							"inferno_fuel_block": { wiki: "Inferno Fuel Block" },
							
							// Rare
							"inferno_fuel_crude_gabagool": { selectors:[`.invslot-item[data-minetip-title="&9Inferno Minion Fuel"][data-minetip-text*="Specialty: &bCrude Gabagool"] img`] },
							"inferno_fuel_glowstone_dust": { selectors:[`.invslot-item[data-minetip-title="&9Inferno Minion Fuel"][data-minetip-text*="Specialty: &bGlowstone Dust"] img`] },
							"inferno_fuel_nether_stalk": { selectors:[`.invslot-item[data-minetip-title="&9Inferno Minion Fuel"][data-minetip-text*="Specialty: &bNether Wart"] img`] },
							"inferno_fuel_magma_cream": { selectors:[`.invslot-item[data-minetip-title="&9Inferno Minion Fuel"][data-minetip-text*="Specialty: &bMagma Cream"] img`] },
							"inferno_fuel_blaze_rod": { selectors:[`.invslot-item[data-minetip-title="&9Inferno Minion Fuel"][data-minetip-text*="Specialty: &bBlaze Rod"] img`] },
							
							// Epic
							"inferno_heavy_crude_gabagool": { selectors:[`.invslot-item[data-minetip-title="&5Inferno Minion Fuel"][data-minetip-text*="Specialty: &bCrude Gabagool"] img`] },
							"inferno_heavy_glowstone_dust": { selectors:[`.invslot-item[data-minetip-title="&5Inferno Minion Fuel"][data-minetip-text*="Specialty: &bGlowstone Dust"] img`] },
							"inferno_heavy_nether_stalk": { selectors:[`.invslot-item[data-minetip-title="&5Inferno Minion Fuel"][data-minetip-text*="Specialty: &bNether Wart"] img`] },
							"inferno_heavy_magma_cream": { selectors:[`.invslot-item[data-minetip-title="&5Inferno Minion Fuel"][data-minetip-text*="Specialty: &bMagma Cream"] img`] },
							"inferno_heavy_blaze_rod": { selectors:[`.invslot-item[data-minetip-title="&5Inferno Minion Fuel"][data-minetip-text*="Specialty: &bBlaze Rod"] img`] },
							
							// Legendary
							"inferno_hypergolic_crude_gabagool": { selectors:[`.invslot-item[data-minetip-title="&6Inferno Minion Fuel"][data-minetip-text*="Specialty: &bCrude Gabagool"] img`], wiki:'Inferno Minion Fuel'/*Default image for infobox*/ },
							"inferno_hypergolic_glowstone_dust": { selectors:[`.invslot-item[data-minetip-title="&6Inferno Minion Fuel"][data-minetip-text*="Specialty: &bGlowstone Dust"] img`] },
							"inferno_hypergolic_nether_stalk": { selectors:[`.invslot-item[data-minetip-title="&6Inferno Minion Fuel"][data-minetip-text*="Specialty: &bNether Wart"] img`] },
							"inferno_hypergolic_magma_cream": { selectors:[`.invslot-item[data-minetip-title="&6Inferno Minion Fuel"][data-minetip-text*="Specialty: &bMagma Cream"] img`] },
							"inferno_hypergolic_blaze_rod": { selectors:[`.invslot-item[data-minetip-title="&6Inferno Minion Fuel"][data-minetip-text*="Specialty: &bBlaze Rod"] img`] },
						}),
					}),
					
					'/revenant_horror': new Folder({
						"foul_flesh": { wiki: "Foul Flesh" },
						"golden_powder": { wiki: "Golden Powder" },
						"revenant_catalyst": { wiki: "Revenant Catalyst" },
						"revenant_flesh": { wiki: "Revenant Flesh" },
						"revenant_viscera": { wiki: "Revenant Viscera" },
						"scythe_blade": { wiki: "Scythe Blade" },
						"shard_of_the_shredded": { wiki: "Shard of the Shredded" },
						"undead_catalyst": { wiki: "Undead Catalyst" },
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
					
					'/sven_packmaster': new Folder({
						"golden_tooth": { wiki: "Golden Tooth" },
						"grizzly_bait": { wiki: "Grizzly Bait" },
						"hamster_wheel": { wiki: "Hamster Wheel" },
						"overflux_capacitor": { wiki: "Overflux Capacitor" },
						"polished_pebble": { wiki: "Polished Pebble" },
						"silky_lichen": { wiki: "Silky Lichen" },
						"true_essence": { wiki: "True Essence" },
						"weak_wolf_catalyst": { wiki: "Weak Wolf Catalyst" },
						"wolf_tooth": { wiki: "Wolf Tooth" },
					}),
					
					'/tarantula_broodfather': new Folder({
						"arachne_crystal": { wiki: "Arachne Crystal" },
						"arachne_fang": { wiki: "Arachne\'s Fang" },
						"dark_queens_soul_drop": { wiki: "Dark Queen\'s Soul Drop" },
						"digested_mosquito": { wiki: "Digested Mosquito" },
						"fly_swatter": { wiki: "Fly Swatter" },
						"flycatcher_upgrade": { wiki: "Flycatcher" },
						"soul_string": { wiki: "Soul String" },
						"spider_catalyst": { wiki: "Spider Catalyst" },
						"tarantula_silk": { wiki: "Tarantula Silk" },
						"tarantula_web": { wiki: "Tarantula Web" },
						"toxic_arrow_poison": { wiki: "Toxic Arrow Poison" },
					}),
					
					'/voidgloom_seraph': new Folder({
						"absolute_ender_pearl": { wiki: "Absolute Ender Pearl" },
						"braided_griffin_feather": { wiki: "Braided Griffin Feather" },
						"etherwarp_conduit": { wiki: "Etherwarp Conduit" },
						"etherwarp_merger": { wiki: "Etherwarp Merger" },
						"gloomlock_grimoire": { wiki: "Gloomlock Grimoire" },
						"judgement_core": { wiki: "Judgement Core" },
						"null_atom": { wiki: "Null Atom" },
						"null_blade": { wiki: "Null Blade" },
						"null_edge": { wiki: "Null Edge" },
						"null_ovoid": { wiki: "Null Ovoid" },
						"null_sphere": { wiki: "Null Sphere" },
						"raw_soulflow": { wiki: "Raw Soulflow" },
						"sinful_dice": { wiki: "Sinful Dice" },
						"soul_esoward": { wiki: "Soul Esoward" },
						"soulflow": { wiki: "Soulflow" },
						"tessellated_ender_pearl": { wiki: "Tessellated Ender Pearl" },
						"transmission_tuner": { wiki: "Transmission Tuner" },
						"twilight_arrow_poison": { wiki: "Twilight Arrow Poison" },
					}),
				}),
				
				'/special': new Folder({
					"alpha_pick": { wiki: "Pioneer Pickaxe" },
					"bingo_card": { wiki: ["Bingo Card", "Bingo Card (Item)"], selectors:[s_alt`Bingo Card (Bingo #[N])`, s_alt`Bingo Card (Bingo #[number])`] },
					"creative_mind": { wiki: "Creative Mind" },
					"dead_bush_of_love": { wiki: "Dead Bush of Love" },
					"editor_pencil": { wiki: "Editor's Pencil" },
					"extreme_bingo_card": { wiki: "Extreme Bingo Card" },
					"game_annihilator": { wiki: "Game Annihilator" },
					"kloonboat": { wiki: "Kloonboat" },
					"new_year_cake": { wiki: ["New Year Cake", "New Year Cake (Year [year])"] },
					"quality_map": { wiki: "Quality Map" },
					"shiny_relic": { wiki: "Shiny Relic" },
					"spooky_pie": { wiki: ["Spooky Pie", "Spooky Pie (Year [year])"] },
					"the_cake": { wiki: "The Cake" },
					"wiki_journal": { wiki: "Wiki Journal" },
					"wizard_wand": { wiki: "Wizard Wand" },
					
					'/cake_soul': new Folder({
						"cake_soul_pink": { wiki: ["Cake Soul (Pink)", "Cake Soul"] },
						"cake_soul_aqua": { wiki: "Cake Soul (Aqua)" },
						"cake_soul_black": { wiki: "Cake Soul (Black)" },
						"cake_soul_blue": { wiki: "Cake Soul (Blue)" },
						"cake_soul_brown": { wiki: "Cake Soul (Brown)" },
						"cake_soul_cyan": { wiki: "Cake Soul (Cyan)" },
						"cake_soul_gray": { wiki: "Cake Soul (Gray)" },
						"cake_soul_green": { wiki: "Cake Soul (Green)" },
						"cake_soul_lime": { wiki: "Cake Soul (Lime)" },
						"cake_soul_magenta": { wiki: "Cake Soul (Magenta)" },
						"cake_soul_orange": { wiki: "Cake Soul (Orange)" },
						"cake_soul_purple": { wiki: "Cake Soul (Purple)" },
						"cake_soul_red": { wiki: "Cake Soul (Red)" },
						"cake_soul_silver": { wiki: "Cake Soul (Silver)" },
						"cake_soul_white": { wiki: "Cake Soul (White)" },
						"cake_soul_yellow": { wiki: "Cake Soul (Yellow)" },
					}),
					
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
						"bat_the_fish": { wiki: "Bat the Fish" },
						"candy_the_fish": { wiki: "Candy the Fish" },
						"chill_the_fish": { wiki: "Chill the Fish" },
						"clown_the_fish": { wiki: "Clown the Fish" },
						"cluck_the_fish": { wiki: "Cluck the Fish" },
						"diamond_the_fish": { wiki: "Diamond the Fish" },
						"dust_the_fish": { wiki: "Dust the Fish" },
						"egg_the_fish": { wiki: "Egg the Fish" },
						"experiment_the_fish": { wiki: "Experiment the Fish" },
						"gabagool_the_fish": { wiki: "Gabagool the Fish" },
						"giant_the_fish": { wiki: "Giant the Fish" },
						"gift_the_fish": { wiki: "Gift the Fish" },
						"goldor_the_fish": { wiki: "Goldor the Fish" },
						"herring_the_fish": { wiki: "Herring the Fish" },
						"maxor_the_fish": { wiki: "Maxor the Fish" },
						"nope_the_fish": { wiki: "Nope the Fish" },
						"oops_the_fish": { wiki: "Oops the Fish" },
						"priceless_the_fish": { wiki: "Priceless the Fish" },
						"rock_the_fish": { wiki: "Rock the Fish" },
						"shrimp_the_fish": { wiki: "Shrimp the Fish" },
						"snowflake_the_fish": { wiki: "Flake the Fish" },
						"spook_the_fish": { wiki: "Spook the Fish" },
						"stew_the_fish": { wiki: "Stew the Fish" },
						"storm_the_fish": { wiki: "Storm the Fish" },
						"worm_the_fish": { wiki: "Worm the Fish" },
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
			
			'/coins': new Folder({
				'coin_iron': { wiki: "Coins", imgKey: "Coins" }, // special case, imgKey is intended
				'coin_gold': { wiki: "Coin drop (gold)", imgName: "Coins (Gold)" },
				'coin_diamond': { wiki: "Coin drop (diamond)", imgName: "Coins (Diamond)" },
				'coin_emerald': { wiki: "Coin drop (emerald)", imgName: "Coins (Emerald)" },
				'coin_redstone': { wiki: "Coin drop (redstone)", imgName: "Coins (Redstone)" },
				'coin_lapis': { wiki: "Coin drop (lapis)", imgName: "Coins (Lapis)" },
			}),
			
			'/essence': new Folder({
				"wither_essence": { wiki: "Wither Essence" },
				"spider_essence": { wiki: "Spider Essence" },
				"undead_essence": { wiki: "Undead Essence" },
				"dragon_essence": { wiki: "Dragon Essence" },
				"gold_essence": { wiki: "Gold Essence" },
				"diamond_essence": { wiki: "Diamond Essence" },
				"ice_essence": { wiki: "Ice Essence" },
				"crimson_essence": { wiki: "Crimson Essence" },
			}),
			
			'/glass': new Folder({
				'menu_glass_white': { selectors:[ '.invslot span[data-iid="Blank:0"]' ] },
				'menu_glass_orange': { selectors:[ '.invslot span[data-iid="Blank:1"]' ] },
				'menu_glass_magenta': { selectors:[ '.invslot span[data-iid="Blank:2"]' ] },
				'menu_glass_light_blue': { selectors:[ '.invslot span[data-iid="Blank:3"]' ] },
				'menu_glass_yellow': { selectors:[ '.invslot span[data-iid="Blank:4"]' ] },
				'menu_glass_lime': { selectors:[ '.invslot span[data-iid="Blank:5"]' ] },
				'menu_glass_pink': { selectors:[ '.invslot span[data-iid="Blank:6"]' ] },
				'menu_glass_gray': { selectors:[ '.invslot span[data-iid="Blank:7"]' ] },
				'menu_glass_light_gray': { selectors:[ '.invslot span[data-iid="Blank:8"]' ] },
				'menu_glass_cyan': { selectors:[ '.invslot span[data-iid="Blank:9"]' ] },
				'menu_glass_purple': { selectors:[ '.invslot span[data-iid="Blank:10"]' ] },
				'menu_glass_blue': { selectors:[ '.invslot span[data-iid="Blank:11"]' ] },
				'menu_glass_brown': { selectors:[ '.invslot span[data-iid="Blank:12"]' ] },
				'menu_glass_green': { selectors:[ '.invslot span[data-iid="Blank:13"]' ] },
				'menu_glass_red': { selectors:[ '.invslot span[data-iid="Blank:14"]' ] },
				'menu_glass_black': { selectors:[ '.invslot span[data-iid="Blank:15"]' ] },
				// ui/glass/locked_page.png
			}),
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
	
	function makeFinalizedDataObj(packPrefix, packFilename, { wiki, imgName, imgKey, selectors=[] }) {
		let allSelectors = [ ...selectors ];
		if(wiki) {
			wiki = Array.isArray(wiki) ? wiki : [wiki];
			allSelectors.push(...wiki.map(w=>[`img[alt="${w}"]`, `img[alt="${w}.png"]`]));
		}
		if(imgName) {
			imgName = Array.isArray(imgName) ? imgName : [imgName];
			allSelectors.push(...imgName.map(n=>[`img[data-image-name="${n}.png"]`]));
		}
		if(imgKey) {
			imgKey = Array.isArray(imgKey) ? imgKey : [imgKey];
			allSelectors.push(...imgKey.map(n=>[`img[data-image-key="${n}.png"]`]));
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