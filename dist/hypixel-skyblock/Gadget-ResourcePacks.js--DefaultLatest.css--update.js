////////////////////////////
// THIS IS NOT A SCRIPT TO BE LOADED ON THE WIKI
// Instead, this is a script that can be pasted into the browser's console log.
// This script can be used to generate updated CSS for the parent css page
// The top will show any errors, followed by a textarea with all the CSS, followed by
// All of the assets in the spritesheet in pairs, with the left asset of a pairing being
// from this wiki, and the one of the right from the MC wiki.
// ---
// Small note: sometimes one of the api urls will fail and you'll see a yellow warning in the
// dev console; just ignore it and re-run the script (isn't a super common issue)
////////////////////////////
(function(){
	// Skipped:
	// -Banners: not used in SB
	// -Cauldron: we don't seem to have an image for vanilla one, and instead have custom SB one using the name
	// -Flowers (other than dandelions and poppies): Not used for anything, not worth the trouble
	const files = [
		{ label:"Collection - Farming (agronomy)", files:[
			{ name:"Cactus" },
			{ name:"Cactus Green", mcname:"Green Dye" },
			{ name:"Carrot" },
			{ name:"Cocoa Beans" },
			{ name:"Melon", mcname:'Melon Slice' },
			{ name:"Melon (block)", mcname:"Melon" },
			// { name:"Brown Mushroom", mcname:"Brown Mushroom (inventory)" },
			// { name:"Red Mushroom", mcname:"Red Mushroom (inventory)" },
			{ name:"Nether Wart", mcname:"Nether Wart (item)" },
			{ name:"Potato" },
			{ name:"Pumpkin", mcname:"Carved Pumpkin" },
			{ name:"Sugar Cane", mcname:"Sugar Cane (item)" },
			{ name:"Seeds", mcname:"Wheat Seeds" },
			{ name:"Wheat" },
		] },
		{ label:"Misc - Farming (agronomy)", files:[
			{ name:"Golden Carrot" },
			{ name:"Cookie" },
			{ name:"Glistering Melon", mcname:"Glistering Melon Slice" },
			{ name:"Baked Potato" },
			{ name:"Pumpkin Pie" },
			{ name:"Sugar" },
			{ name:"Pumpkin Seeds" },
			{ name:"Melon Seeds" },
			{ name:"Hay Bale" },
			{ name:"Bread" },
		] },
		{ label:"Collection - Farming (husbandry)", files:[
			{ name:"Raw Rabbit" },
			{ name:"Rabbit's Foot", enchName:"Enchanted Rabbit Foot" },
			{ name:"Rabbit Hide" },
			{ name:"Mutton", mcname:"Raw Mutton" },
			{ name:"Raw Porkchop", enchName:"Enchanted Pork" },
			{ name:"Raw Beef" },
			{ name:"Leather" },
			{ name:"Raw Chicken" },
			{ name:"Feather" },
			{ name:"Egg" },
		] },
		{ label:"Misc - Farming (husbandry)", files:[
			{ name:"Cooked Rabbit" },
			{ name:"Rabbit Stew" },
			{ name:"Cooked Mutton" },
			{ name:"Cooked Porkchop", enchName:"Enchanted Grilled Pork" },
			{ name:"Steak" },
			{ name:"Cooked Chicken" },
		] },
		{ label:"Collection - Mining", files:[
			{ name:"Coal" },
			{ name:"Cobblestone" },
			{ name:"Diamond" },
			{ name:"Emerald" },
			{ name:"End Stone" },
			{ name:"Glowstone Dust" },
			{ name:"Gold Ingot", enchName:"Enchanted Gold" },
			{ name:"Gravel" },
			{ name:"Flint" },
			{ name:"Ice" },
			{ name:"Iron Ingot", enchName:"Enchanted Iron" },
			{ name:"Lapis Lazuli" },
			{ name:"Nether Quartz", enchName:"Enchanted Quartz" },
			{ name:"Netherrack" },
			{ name:"Obsidian" },
			{ name:"Redstone" },
			{ name:"Sand" },
			{ name:"Mycelium" },
			{ name:"Red Sand" },
		] },
		{ label:"Misc - Mining", files:[
			{ name:"Stone" },
			{ name:"Gold Nugget" },
			{ name:"Packed Ice" },
			
			{ name:"Snowball" },
			{ name:"Snow Block" },
			
			{ name:"Coal Ore" },
			{ name:"Iron Ore" },
			{ name:"Gold Ore" },
			{ name:"Lapis Lazuli Ore" },
			{ name:"Diamond Ore" },
			{ name:"Redstone Ore" },
			// { name:"Glowing Redstone Ore" },
			{ name:"Emerald Ore" },
			{ name:"Nether Quartz Ore" },
			{ name:"Glowstone" },
			
			{ name:"Block of Coal", enchName:"Enchanted Coal Block" },
			{ name:"Block of Iron", enchName:"Enchanted Iron Block" },
			{ name:"Block of Gold", enchName:"Enchanted Gold Block" },
			{ name:"Lapis Lazuli Block", enchName:"Enchanted Lapis Block" },
			{ name:"Block of Diamond", enchName:"Enchanted Diamond Block" },
			{ name:"Block of Redstone", enchName:"Enchanted Redstone Block" },
			{ name:"Block of Emerald", enchName:"Enchanted Emerald Block" },
			{ name:"Block of Quartz", enchName:"Enchanted Quartz Block" },
		] },
		{ label:"Collection - Combat", files:[
			{ name:"Blaze Rod" },
			{ name:"Blaze Powder" },
			{ name:"Bone" },
			{ name:"Ender Pearl" },
			{ name:"Ghast Tear" },
			{ name:"Gunpowder" },
			{ name:"Magma Cream" },
			{ name:"Rotten Flesh" },
			{ name:"Slimeball" },
			{ name:"Spider Eye" },
			{ name:"String" },
			
		] },
		{ label:"Misc - Combat", files:[
			{ name:"Eye of Ender" },
			{ name:"Poisonous Potato" },
			{ name:"Slime Block" },
			{ name:"Fermented Spider Eye" },
			// { name:"Cobweb", mcname:"Cobweb (inventory)" }, // no redirect
			{ name:"Firework Rocket" },
			{ name:"Firework Star" },
		] },
		{ label:"Collection - Foraging", files:[
			{ name:"Oak Wood", mcname:"Oak Log" },
			{ name:"Spruce Wood", mcname:"Spruce Log" },
			{ name:"Birch Wood", mcname:"Birch Log" },
			{ name:"Jungle Wood", mcname:"Jungle Log" },
			{ name:"Acacia Wood", mcname:"Acacia Log" },
			{ name:"Dark Oak Wood", mcname:"Dark Oak Log" },
		] },
		{ label:"Collection - Fishing", files:[
			{ name:"Clay", mcname:"Clay Ball" },
			{ name:"Clownfish", mcname:"Tropical Fish" },
			{ name:"Ink Sac" },
			{ name:"Lily Pad", mcname:"Lily Pad (item)" },
			{ name:"Prismarine Crystals" },
			{ name:"Prismarine Shard" },
			{ name:"Pufferfish" },
			{ name:"Raw Fish", mcname:"Raw Cod" },
			{ name:"Raw Salmon", mcname:"Raw Salmon" },
			{ name:"Sponge" },
		] },
		{ label:"Misc - Fishing", files:[
			{ name:"Clay (block)", mcname:"Clay" },
			{ name:"Cooked Fish", mcname:"Cooked Cod" },
			{ name:"Cooked Salmon", mcname:"Cooked Salmon" },
			{ name:"Wet Sponge" },
			{ name:"Prismarine" },
			{ name:"Dark Prismarine" },
			{ name:"Sea Lantern" },
		] },
		
		
		
		{ label:"Tools & Weapons", files:[
			{ name:"Wooden Sword" },
			{ name:"Wooden Shovel" },
			{ name:"Wooden Pickaxe" },
			{ name:"Wooden Axe" },
			{ name:"Wooden Hoe" },
			{ name:"Stone Sword" },
			{ name:"Stone Shovel" },
			{ name:"Stone Pickaxe" },
			{ name:"Stone Axe" },
			{ name:"Stone Hoe" },
			{ name:"Golden Sword" },
			{ name:"Golden Shovel" },
			{ name:"Golden Pickaxe" },
			{ name:"Golden Axe" },
			{ name:"Golden Hoe" },
			{ name:"Iron Sword" },
			{ name:"Iron Shovel" },
			{ name:"Iron Pickaxe" },
			{ name:"Iron Axe" },
			{ name:"Iron Hoe" },
			{ name:"Diamond Sword" },
			{ name:"Diamond Shovel" },
			{ name:"Diamond Pickaxe" },
			{ name:"Diamond Axe" },
			{ name:"Diamond Hoe" },
			
			{ name:"Bow" },
			{ name:"Arrow", mcname:'Arrow (item)' },
		] },
		{ label:"Armor", files:[
			{ name:"Leather Cap", mcname:"Leather Cap (item)" },
			{ name:"Leather Tunic", mcname:"Leather Tunic (item)" },
			{ name:"Leather Pants", mcname:"Leather Pants (item)" },
			{ name:"Leather Boots", mcname:"Leather Boots (item)" },
			{ name:"Chainmail Helmet", mcname:"Chainmail Helmet (item)" },
			{ name:"Chainmail Chestplate", mcname:"Chainmail Chestplate (item)" },
			{ name:"Chainmail Leggings", mcname:"Chainmail Leggings (item)" },
			{ name:"Chainmail Boots", mcname:"Chainmail Boots (item)" },
			{ name:"Golden Helmet", mcname:"Golden Helmet (item)" },
			{ name:"Golden Chestplate", mcname:"Golden Chestplate (item)" },
			{ name:"Golden Leggings", mcname:"Golden Leggings (item)" },
			{ name:"Golden Boots", mcname:"Golden Boots (item)" },
			{ name:"Iron Helmet", mcname:"Iron Helmet (item)" },
			{ name:"Iron Chestplate", mcname:"Iron Chestplate (item)" },
			{ name:"Iron Leggings", mcname:"Iron Leggings (item)" },
			{ name:"Iron Boots", mcname:"Iron Boots (item)" },
			{ name:"Diamond Helmet", mcname:"Diamond Helmet (item)" },
			{ name:"Diamond Chestplate", mcname:"Diamond Chestplate (item)" },
			{ name:"Diamond Leggings", mcname:"Diamond Leggings (item)" },
			{ name:"Diamond Boots", mcname:"Diamond Boots (item)" },
		] },
		{ label:"Wood items", files:[
			{ name:"Oak Wood Planks", mcname:"Oak Planks" },
			{ name:"Spruce Wood Planks", mcname:"Spruce Planks" },
			{ name:"Birch Wood Planks", mcname:"Birch Planks" },
			{ name:"Jungle Wood Planks", mcname:"Jungle Planks" },
			{ name:"Acacia Wood Planks", mcname:"Acacia Planks" },
			{ name:"Dark Oak Wood Planks", mcname:"Dark Oak Planks" },
			
			{ name:"Oak Wood Stairs", mcname:"Oak Stairs" },
			{ name:"Spruce Wood Stairs", mcname:"Spruce Stairs" },
			{ name:"Birch Wood Stairs", mcname:"Birch Stairs" },
			{ name:"Jungle Wood Stairs", mcname:"Jungle Stairs" },
			{ name:"Acacia Wood Stairs", mcname:"Acacia Stairs" },
			{ name:"Dark Oak Wood Stairs", mcname:"Dark Oak Stairs" },
			
			{ name:"Oak Wood Slab", mcname:"Oak Slab" },
			{ name:"Spruce Wood Slab", mcname:"Spruce Slab" },
			{ name:"Birch Wood Slab", mcname:"Birch Slab" },
			{ name:"Jungle Wood Slab", mcname:"Jungle Slab" },
			{ name:"Acacia Wood Slab", mcname:"Acacia Slab" },
			{ name:"Dark Oak Wood Slab", mcname:"Dark Oak Slab" },
			
			{ name:"Oak Fence Gate" },
			{ name:"Spruce Fence Gate" },
			{ name:"Birch Fence Gate" },
			{ name:"Jungle Fence Gate" },
			{ name:"Dark Oak Fence Gate" },
			{ name:"Acacia Fence Gate" },
			
			{ name:"Oak Fence" },
			{ name:"Spruce Fence" },
			{ name:"Birch Fence" },
			{ name:"Jungle Fence" },
			{ name:"Dark Oak Fence" },
			{ name:"Acacia Fence" },
			
			{ name:"Oak Door", mcname:"Oak Door (item)" },
			{ name:"Spruce Door", mcname:"Spruce Door (item)" },
			{ name:"Birch Door", mcname:"Birch Door (item)" },
			{ name:"Jungle Door", mcname:"Jungle Door (item)" },
			{ name:"Acacia Door", mcname:"Acacia Door (item)" },
			{ name:"Dark Oak Door", mcname:"Dark Oak Door (item)" },
			
			{ name:"Boat", mcname:"Oak Boat (item)" },
			// { name:"Spruce Boat" },
			// { name:"Birch Boat" },
			// { name:"Jungle Boat" },
			// { name:"Acacia Boat" },
			// { name:"Dark Oak Boat" },
			
			{ name:"Wooden Trapdoor", mcname:"Oak Trapdoor" },
			{ name:"Chest", mcname:"Chest (E)" },
			{ name:"Trapped Chest", mcname:"Chest (E)" },
			{ name:"Painting" },
			{ name:"Crafting Table" },
			{ name:"Stick" },
			// { name:"Sign" },
			{ name:"Bowl" },
			{ name:"Item Frame", mcname:"Item Frame (item)" },
			// { name:"Ladder", mcname:"Ladder (inventory)" }, // no redirect
			{ name:"Armor Stand", mcname:"Armor Stand (item)" },
		] },
		{ label:"Saplings & Leaves", files:[
			// // commented out since none of the textures have a redirect
			// { name:"Oak Sapling", mcname:"Oak Sapling (texture)" },
			// { name:"Spruce Sapling", mcname:"Spruce Sapling (texture)" },
			// { name:"Birch Sapling", mcname:"Birch Sapling (texture)" },
			// { name:"Jungle Sapling", mcname:"Jungle Sapling (texture)" },
			// { name:"Dark Oak Sapling", mcname:"Dark Oak Sapling (texture)" },
			// { name:"Acacia Sapling", mcname:"Acacia Sapling (texture)" },
			
			{ name:"Oak Leaves", },
			{ name:"Spruce Leaves" },
			{ name:"Birch Leaves" },
			{ name:"Jungle Leaves" },
			{ name:"Dark Oak Leaves" },
			{ name:"Acacia Leaves" },
		] },
		{ label:"Iron items", files:[
			{ name:"Iron Door", mcname:"Iron Door (item)" },
			// { name:"Iron Bars", mcname:"Iron Bars (texture)" }, // no redirect
			{ name:"Iron Trapdoor" },
			{ name:"Hopper" },
			{ name:"Anvil" },
			{ name:"Flint and Steel" },
			{ name:"Shears" },
		] },
		{ label:"Dyes", files:[
			{ name:"Bone Meal" },
			{ name:"Rose Red", mcname:"Red Dye" },
			{ name:"Dandelion Yellow", mcname:"Yellow Dye" },
			{ name:"Orange Dye" },
			{ name:"Light Blue Dye" },
			{ name:"Magenta Dye" },
			{ name:"Pink Dye" },
			{ name:"Light Gray Dye" },
			{ name:"Lime Dye" },
			{ name:"Cyan Dye" },
			{ name:"Purple Dye" },
			{ name:"Gray Dye" },
		] },
		{ label:"Music Discs", files:[
			{ name:"Music Disc 13" },
			{ name:"Music Disc Cat" },
			{ name:"Music Disc Blocks" },
			{ name:"Music Disc Chirp" },
			{ name:"Music Disc Far" },
			{ name:"Music Disc Mall" },
			{ name:"Music Disc Mellohi" },
			{ name:"Music Disc Stal" },
			{ name:"Music Disc Strad" },
			{ name:"Music Disc Ward" },
			{ name:"Music Disc 11" },
			{ name:"Music Disc Wait" },
		] },
		{ label:"Minecarts & Rail", files:[
			// { name:"Rail", mcname:"Rail (texture)" }, // no redirect, and asset isn't really used anyways
			// { name:"Powered Rail", mcname:"Powered Rail (texture)" }, // no redirect, and asset isn't really used anyways
			// { name:"Detector Rail", mcname:"Detector Rail (texture)" }, // no redirect, and asset isn't really used anyways
			// { name:"Activator Rail", mcname:"Activator Rail (texture)" }, // no redirect, and asset isn't really used anyways
			{ name:"Minecart", mcname:"Minecart (item)" },
			{ name:"Minecart with Chest", mcname:"Minecart with Chest (item)" },
			{ name:"Minecart with Furnace", mcname:"Minecart with Furnace (item)" },
			{ name:"Minecart with TNT", mcname:"Minecart with TNT (item)" },
			{ name:"Minecart with Hopper", mcname:"Minecart with Hopper (item)" },
			{ name:"Minecart with Command Block", mcname:"Minecart with Command Block (item)" },
		] },
		{ label:"Redstone stuff", files:[
			// { name:"Redstone Wire" }, // unused
			// { name:"Unlit Redstone Torch" }, // unused
			{ name:"Redstone Torch", mcname:"On Redstone Torch (texture)" },
			{ name:"Redstone Repeater", mcname:"Redstone Repeater (item)" },
			{ name:"Redstone Comparator", mcname:"Redstone Comparator (item)" },
			{ name:"Redstone Lamp" },
			{ name:"Lit Redstone Lamp" },
			{ name:"Dispenser" },
			{ name:"Dropper" },
			// { name:"Lever", mcname:"Lever (texture)" }, // no redirect
			// { name:"Tripwire Hook", mcname:"Tripwire Hook (item)" }, // no redirect
			{ name:"Wooden Pressure Plate", mcname:"Oak Pressure Plate" },
			{ name:"Stone Pressure Plate" },
			// { name:"Wooden Button", mcname:"Oak Button (item)" }, // no redirect, and asset so small not really that important
			// { name:"Stone Button", mcname:"Stone Button (item)" }, // no redirect, and asset so small not really that important
			// { name:"Piston" }, // no redirect to non-animated version
			// { name:"Sticky Piston" }, // no redirect to non-animated version
			{ name:"Light Weighted Pressure Plate" },
			{ name:"Heavy Weighted Pressure Plate" },
		] },
		{ label:"Brewing", files:[
			{ name:"Brewing Stand", mcname:"Brewing Stand (item)" },
			{ name:"Glass Bottle" },
			{ name:"Water Bottle" },
			
			{ name:"Regeneration Potion", mcname:"Potion of Regeneration" },
			{ name:"Speed Potion", mcname:"Potion of Swiftness" },
			{ name:"Fire Resistance Potion", mcname:"Potion of Fire Resistance" },
			{ name:"Healing Potion", mcname:"Potion of Healing" },
			{ name:"Night Vision Potion", mcname:"Potion of Night Vision" },
			{ name:"Strength Potion", mcname:"Potion of Strength" },
			{ name:"Jump Boost Potion", mcname:"Potion of Leaping" },
			{ name:"Water Breathing Potion", mcname:"Potion of Water Breathing" },
			{ name:"Invisibility Potion", mcname:"Potion of Invisibility" },
			// { name:"Slow Falling Potion", mcname:"Potion of Slow Falling" },
			// { name:"Luck Potion", mcname:"Potion of Luck" },
			{ name:"Poison Potion", mcname:"Potion of Poison" },
			{ name:"Weakness Potion", mcname:"Potion of Weakness" },
			{ name:"Slowness Potion", mcname:"Potion of Slowness" },
			{ name:"Damage Potion", mcname:"Potion of Harming" },
			// { name:"Decay Potion", mcname:"Potion of Decay" },
			{ name:"Absorption Potion", mcname:"Potion of Fire Resistance" }, // NOTE: Despite the name being the same, SB does NOT use the texture for MC absoption potion
			{ name:"Blindness Potion", mcname:"Potion of Blindness BE2" },
			// { name:"Haste Potion", mcname:"Potion of Haste" },
			// { name:"Health Potion", mcname:"Potion of Health Boost" },
			// { name:"Hunger Potion", mcname:"Potion of Hunger" },
			// { name:"Levitation Potion", mcname:"Potion of Levitation" },
			// { name:"Mining Fatigue Potion", mcname:"Potion of Mining Fatigue" },
			// { name:"Nausea Potion", mcname:"Potion of Nausea" },
			{ name:"True Resistance Potion", mcname:"Potion of Resistance BE2" },
			// { name:"Saturation Potion", mcname:"Potion of Saturation" },
		] },
		// // commented out since can't find correct texture on MC wiki
		// { label:"Mob Heads", files:[
		// 	{ name:"Skeleton Skull", mcname:"Skeleton Skull (8)" },
		// 	{ name:"Wither Skeleton Skull", mcname:"Wither Skeleton Skull (8)" },
		// 	{ name:"Zombie Head", mcname:"Zombie Head (8)" },
		// 	{ name:"Player Head", mcname:"Player Head (8)" },
		// 	{ name:"Creeper Head", mcname:"Creeper Head (8)" },
		// ] },
		{ label:"Misc - Plants & Food", files:[
			{ name:"Apple" },
			{ name:"Golden Apple" },
			{ name:"Mushroom Stew" },
			{ name:"Cake", mcname:"Cake (item)" },
			{ name:"Dandelion" },
			{ name:"Poppy" },
			// { name:"Dead Bush", mcname:"Dead Bush (texture)" }, // no redirect
			{ name:"Jack o'Lantern" },
			{ name:"Brown Mushroom Block" },
			{ name:"Red Mushroom Block" },
			// { name:"Vines", mcname:"Vines (texture)" }, // redirect works, but has wrong color
		] },
		{ label:"Misc - Nether & End", files:[
			{ name:"Soul Sand" },
			{ name:"Nether Brick" },
			{ name:"Nether Bricks" },
			{ name:"Nether Brick Fence" },
			{ name:"Nether Brick Stairs" },
			{ name:"Fire Charge" },
			{ name:"End Portal Frame" },
			{ name:"Dragon Egg" },
			{ name:"Ender Chest" },
			{ name:"Beacon" },
			{ name:"Nether Star" },
			{ name:"Quartz Stairs" },
			{ name:"Daylight Detector" },
		] },
		
		{ label:"MISC", files:[
			{ name:"Torch", mcname:"Torch (texture)" },
			{ name:"Bucket" },
			{ name:"Water Bucket" },
			{ name:"Lava Bucket" },
			{ name:"Milk Bucket" },
			
			{ name:"Paper" },
			{ name:"Map", mcname:"Map (item)" },
			{ name:"Empty Map" },
			{ name:"Book", enchName:false }, // There's already a MC item called "Enchanted Book", so don't apply auto enchantment logic
			{ name:"Written Book" },
			{ name:"Enchanted Book" },
			{ name:"Book and Quill" },
			{ name:"Bookshelf" },
			
			{ name:"Lead" },
			{ name:"Saddle" },
			{ name:"Name Tag" },
			
			{ name:"Fishing Rod" },
			{ name:"Carrot on a Stick" },
			
			{ name:"Compass" },
			{ name:"Clock" },
			{ name:"Bed", mcname:"Red Bed (N)" },
			
			{ name:"Iron Horse Armor", mcname:"Iron Horse Armor (item)" },
			{ name:"Golden Horse Armor", mcname:"Golden Horse Armor (item)" },
			{ name:"Diamond Horse Armor", mcname:"Diamond Horse Armor (item)" },
			
			{ name:"Bottle o' Enchanting" },
			{ name:"Spawn Egg" },
			// { name:"Monster Egg (various)" },
			
			
			
			{ name:"Grass Block" },
			{ name:"Dirt" },
			// { name:"Farmland" },
			
			{ name:"Glass" },
			// Glass & Panes (tinted vs stained?) : [TODO]
			
			{ name:"Stone Slab" },
			{ name:"Furnace" },
			// { name:"Lit Furnace" },
			{ name:"Cobblestone Stairs" },
			{ name:"Cobblestone Wall" },
			{ name:"Stone Bricks" },
			{ name:"Stone Brick Stairs" },
			{ name:"Moss Stone", mcname:"Mossy Cobblestone" },
			
			{ name:"Bedrock" },
			{ name:"Sandstone" },
			{ name:"Note Block" },
			
			{ name:"Brick" },
			{ name:"Bricks" },
			{ name:"Brick Slab" },
			{ name:"Brick Stairs" },
			{ name:"Flower Pot", mcname:"Flower Pot (item)" },
			
			{ name:"Hardened Clay", mcname:"Terracotta" },
			// { name:"Stained Hardened Clay (various)", mcname:"Terracotta" },
			
			{ name:"Sandstone Stairs" },
			{ name:"Red Sandstone" },
			{ name:"Red Sandstone Stairs" },
			{ name:"Red Sandstone Slab" },
			
			{ name:"Barrier" },
			{ name:"Spawner" },
			{ name:"TNT" },
			{ name:"Jukebox" },
			{ name:"Command Block" },
			{ name:"Enchantment Table", mcname:"Enchanting Table" },
			
			// Carpet: [TODO]
			// Wool : [TODO]
		] },
	].map(fileGroup=>{
		return fileGroup.files.map(f=>{
			f.group = fileGroup.label;
			f.mcname ??= f.name;
			return f;
		});
	}).flat();
	
	const fileNames = files.map(f=>`File:${f.mcname}.png`);
	const fileNamesGif = files.map(f=>`File:${f.mcname}.gif`);
	const skyblockFileNames = files.map(f=>`File:${f.name}.png`);
	const skyblockEnchantedFileNames = files.map(f=>`File:${f.enchName ?? `Enchanted ${f.name}`}.png`);
	// CSS Styles
	const enchantedFilter = "filter:drop-shadow(0 0 6px #aa03aa)";// url(#mcglint);
	// Test script styles
	const previewPairStyle = "display:inline-block; background:#1F000044; padding:3px 5px 0; border-radius:10px;";
	const urlPairListStyle = "display:flex; flex-wrap:wrap; gap:10px;";
	
	function openModal(content) {
		mw.hook('dev.modal').add(function(module) {
			const id = 'rcm-rp-default-latest-'+Date.now();
			const modal = new module.Modal({ id, content, size:'full' });
			modal.create();
			modal.show();
		});
	}
	
	const chunkSize = 50;
	function fetchUrls(files, wiki) {
		const url = `https://${wiki}.fandom.com/api.php?${new URLSearchParams({
			action: 'query',
			format: 'json',
			prop: 'imageinfo',
			iiprop: 'url',
			titles: files.join('|'),
		})}`
		return $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url })
	}
	
	function fetchAllFiles(pFiles, wiki) {
		const chunks = new Array(Math.ceil(pFiles.length / chunkSize)).fill([]).map((_,i)=>pFiles.slice(i*chunkSize, (i+1)*chunkSize));
		return Promise.all(chunks.map(c=>fetchUrls(c,wiki))).then((res)=>{
			return res.reduce((arr, r)=>[...arr, ...Object.values(r?.query?.pages ?? {})], []);
		});
	}
	
	Promise.all([
		fetchAllFiles(fileNames, 'minecraft'),
		fetchAllFiles(fileNamesGif, 'minecraft'),
		fetchAllFiles(skyblockFileNames, 'hypixel-skyblock'),
		fetchAllFiles(skyblockEnchantedFileNames, 'hypixel-skyblock')
	]).then(([ pages, pagesGif, sbPages, sbEnchPages ])=>{
		const urlsMap = Object.fromEntries(pages.map(p=>[p.title, p.imageinfo?.[0]?.url]));
		const gifUrlsMap = Object.fromEntries(pagesGif.map(p=>[p.title, p.imageinfo?.[0]?.url]));
		const sbUrlsMap = Object.fromEntries(sbPages.map(p=>[p.title, p.imageinfo?.[0]?.url]));
		const sbEnchantedUrlsMap = Object.fromEntries(sbEnchPages.map(p=>[p.title, p.imageinfo?.[0]?.url]));
		const cssEntries = ["/* Script for updating this page is on DefaultLatest.css/update.js */"], missing = [], sbMissing = [], previewUrls = [], enchantedNames = [];
		let pvwLastGroup;
		files.forEach((file)=>{
			const key = `File:${file.mcname}.png`, keyGif = `File:${file.mcname}.gif`;
			const mcUrl = gifUrlsMap[keyGif] ?? urlsMap[key];
			if(mcUrl) {
				// Detect if this item has an enchanted form on SB wiki
				// if so, have it us un-enchanted asset above, and add it to 
				// `enchantedNames` array to have an enchantment filter applied
				let extraEnchRule = '';
				const sbEnchName = file.enchName ?? `Enchanted ${file.name}`,
				      sbEnchKey = `File:${sbEnchName}.png`;
				if(sbEnchName && sbEnchantedUrlsMap[sbEnchKey]) {
					enchantedNames.push(`${sbEnchName}.png`);
					extraEnchRule = `, img[data-image-name="${sbEnchName}.png"]`;
				}
				
				cssEntries.push(`img[data-image-name="${file.name}.png"]${extraEnchRule} { content: url('${mcUrl}') }`);//img[alt="${file.name}"], img[alt="${file.name}.png"], 
			} else {
				missing.push(key);
			}
			const sbkey = `File:${file.name}.png`;
			if(!sbUrlsMap[sbkey]) {
				sbMissing.push(sbkey);
			}
			
			if(file.group != pvwLastGroup) {
				pvwLastGroup = file.group;
				previewUrls.push({ label:file.group, urlPairs:[] });
			}
			previewUrls[previewUrls.length-1].urlPairs.push([sbUrlsMap[sbkey], mcUrl]);
		});
		
		cssEntries.push(`${enchantedNames.map(n=>`img[data-image-name="${n}"]`).join(', ')} { ${enchantedFilter} }`);
		
		console.log(pages, gifUrlsMap, sbPages, sbEnchantedUrlsMap);
		
		openModal(
			[
				"<div style='color:white; background:darkgrey; padding:8px 8px; margin:0 8px;'>",
					!!missing.length && "Following item links not found on MC wiki:",
					!!missing.length && `<pre style="background:darkred; margin-bottom:10px;">${missing.join("\n")}</pre>`,
					!!sbMissing.length && "Following css rules don't have a corresponding file by used name on SB wiki:",
					!!sbMissing.length && `<pre style="background:darkred; margin-bottom:10px;">${sbMissing.join("\n")}</pre>`,
					"<h2>Copy CSS down below</h2>",
					`<textarea style="background:black; color:white; width:100vw; height:50vh;">${cssEntries.join('\n')}</textarea>`,
					`<h2>Previews: (${previewUrls.length}/${files.length})</h2>`,
					`<div>`,
					previewUrls.map(({ label, urlPairs })=>`<div><h4>${label}</h4><div style="${urlPairListStyle}">${urlPairs.map(urls=>`<span style="${previewPairStyle}">${urls.map(u=>`<img src="${u}" height="40" />`).join('')}</span>`).join('')}</div></div>`).join(''),
					'</div>',
				"</div>"
			].filter(o=>!!o).join("")
		);
	});
})();