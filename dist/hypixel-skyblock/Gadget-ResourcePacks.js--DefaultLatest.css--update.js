/*
 * THIS IS NOT A SCRIPT TO BE LOADED ON THE WIKI
 *
 * Instead, this is a script that can be pasted into the browser's console while on a wiki page.
 * This script can be used to generate updated CSS for the parent css page
 * The top will show any errors, followed by a textarea with all the CSS, followed by
 * all of the assets in the spritesheet in pairs, with the left asset of a pairing being
 * from this wiki, and the one of the right from the MC wiki.
 *
 * Small note: rarely one of the API urls will fail and you'll see a yellow warning in the
 * dev console; simply ignore it and re-run the script
 */

(() => {
	const files = {
		'Collection - Farming (agronomy)': [
			{ name: 'Cactus' }, //
			{ name: 'Cactus Green', mcName: 'Green Dye' },
			{ name: 'Carrot' },
			{ name: 'Cocoa Beans' },
			{ name: 'Melon', mcName: 'Melon Slice' },
			{ name: 'Melon (block)', mcName: 'Melon', enchName: 'Enchanted Melon Block' },
			{ name: 'Brown Mushroom', mcName: 'Brown Mushroom (texture)' },
			{ name: 'Red Mushroom', mcName: 'Red Mushroom (texture)' },
			{ name: 'Nether Wart', mcName: 'Nether Wart (item)' },
			{ name: 'Potato' },
			{ name: 'Pumpkin', mcName: 'Carved Pumpkin' },
			{ name: 'Sugar Cane', mcName: 'Sugar Cane (item)' },
			{ name: 'Seeds', mcName: 'Wheat Seeds' },
			{ name: 'Wheat', enchName: 'Enchanted Wheat' }
		],
		'Misc - Farming (agronomy)': [
			{ name: 'Golden Carrot' }, //
			{ name: 'Cookie' },
			{ name: 'Glistering Melon', mcName: 'Glistering Melon Slice' },
			{ name: 'Baked Potato' },
			{ name: 'Pumpkin Pie' },
			{ name: 'Sugar' },
			{ name: 'Pumpkin Seeds' },
			{ name: 'Melon Seeds' },
			{ name: 'Hay Bale' },
			{ name: 'Bread' }
		],
		'Collection - Farming (husbandry)': [
			{ name: 'Raw Rabbit' }, //
			{ name: "Rabbit's Foot", enchName: 'Enchanted Rabbit Foot' },
			{ name: 'Rabbit Hide' },
			{ name: 'Mutton', mcName: 'Raw Mutton' },
			{ name: 'Raw Porkchop', enchName: 'Enchanted Pork' },
			{ name: 'Raw Beef' },
			{ name: 'Leather' },
			{ name: 'Raw Chicken' },
			{ name: 'Feather' },
			{ name: 'Egg' }
		],
		'Misc - Farming (husbandry)': [
			{ name: 'Cooked Rabbit' }, //
			{ name: 'Rabbit Stew' },
			{ name: 'Cooked Mutton' },
			{ name: 'Cooked Porkchop', enchName: 'Enchanted Grilled Pork' },
			{ name: 'Steak' },
			{ name: 'Cooked Chicken' }
		],
		'Collection - Mining': [
			{ name: 'Coal' }, //
			{ name: 'Cobblestone' },
			{ name: 'Diamond' },
			{ name: 'Emerald' },
			{ name: 'End Stone' },
			{ name: 'Glowstone Dust' },
			{ name: 'Gold Ingot', enchName: 'Enchanted Gold' },
			{ name: 'Gravel' },
			{ name: 'Flint' },
			{ name: 'Ice' },
			{ name: 'Iron Ingot', enchName: 'Enchanted Iron' },
			{ name: 'Lapis Lazuli' },
			{ name: 'Nether Quartz', enchName: 'Enchanted Quartz' },
			{ name: 'Netherrack' },
			{ name: 'Obsidian' },
			{ name: 'Redstone' },
			{ name: 'Sand' },
			{ name: 'Mycelium' },
			{ name: 'Red Sand' }
		],
		'Misc - Mining': [
			{ name: 'Charcoal', enchName: 'Enchanted Charcoal' }, //
			{ name: 'Stone' },
			{ name: 'Gold Nugget' },
			{ name: 'Packed Ice' },
			{ name: 'Snowball' },
			{ name: 'Snow Block' },
			{ name: 'Coal Ore' },
			{ name: 'Iron Ore' },
			{ name: 'Gold Ore' },
			{ name: 'Lapis Lazuli Ore' },
			{ name: 'Diamond Ore' },
			{ name: 'Redstone Ore' },
			{ name: 'Emerald Ore' },
			{ name: 'Nether Quartz Ore' },
			{ name: 'Glowstone' },
			{ name: 'Block of Coal', enchName: 'Enchanted Block of Coal' },
			{ name: 'Block of Iron', enchName: 'Enchanted Iron Block' },
			{ name: 'Block of Gold', enchName: 'Enchanted Gold Block' },
			{ name: 'Lapis Lazuli Block', enchName: 'Enchanted Lapis Block' },
			{ name: 'Block of Diamond', enchName: 'Enchanted Diamond Block' },
			{ name: 'Block of Redstone', enchName: 'Enchanted Redstone Block' },
			{ name: 'Block of Emerald', enchName: 'Enchanted Emerald Block' },
			{ name: 'Block of Quartz', enchName: 'Enchanted Quartz Block' },
			{ name: 'Granite' },
			{ name: 'Polished Granite' },
			{ name: 'Diorite' },
			{ name: 'Polished Diorite' },
			{ name: 'Andesite' },
			{ name: 'Polished Andesite' }
		],
		'Collection - Combat': [
			{ name: 'Blaze Rod' }, //
			{ name: 'Blaze Powder' },
			{ name: 'Bone' },
			{ name: 'Ender Pearl' },
			{ name: 'Ghast Tear' },
			{ name: 'Gunpowder' },
			{ name: 'Magma Cream' },
			{ name: 'Rotten Flesh' },
			{ name: 'Slimeball' },
			{ name: 'Spider Eye' },
			{ name: 'String' }
		],
		'Misc - Combat': [
			{ name: 'Eye of Ender' }, //
			{ name: 'Poisonous Potato' },
			{ name: 'Slime Block' },
			{ name: 'Fermented Spider Eye' },
			{ name: 'Cobweb', mcName: 'Cobweb (texture)' },
			{ name: 'Firework Rocket' },
			{ name: 'Firework Star' }
		],
		'Collection - Foraging': [
			{ name: 'Oak Wood', mcName: 'Oak Log' },
			{ name: 'Spruce Wood', mcName: 'Spruce Log' },
			{ name: 'Birch Wood', mcName: 'Birch Log' },
			{ name: 'Jungle Wood', mcName: 'Jungle Log' },
			{ name: 'Acacia Wood', mcName: 'Acacia Log' },
			{ name: 'Dark Oak Wood', mcName: 'Dark Oak Log' }
		],
		'Collection - Fishing': [
			{ name: 'Clay', mcName: 'Clay Ball' }, //
			{ name: 'Clownfish', mcName: 'Tropical Fish' },
			{ name: 'Ink Sac' },
			{ name: 'Lily Pad', mcName: 'Lily Pad (item)' },
			{ name: 'Prismarine Crystals' },
			{ name: 'Prismarine Shard' },
			{ name: 'Pufferfish' },
			{ name: 'Raw Fish', mcName: 'Raw Cod' },
			{ name: 'Raw Salmon', mcName: 'Raw Salmon' },
			{ name: 'Sponge' }
		],
		'Misc - Fishing': [
			{ name: 'Clay (block)', mcName: 'Clay' }, //
			{ name: 'Cooked Fish', mcName: 'Cooked Cod' },
			{ name: 'Cooked Salmon', mcName: 'Cooked Salmon' },
			{ name: 'Wet Sponge' },
			{ name: 'Prismarine' },
			{ name: 'Dark Prismarine' },
			{ name: 'Sea Lantern' }
		],
		'Tools & Weapons': [
			{ name: 'Wooden Sword' }, //
			{ name: 'Wooden Shovel' },
			{ name: 'Wooden Pickaxe' },
			{ name: 'Wooden Axe' },
			{ name: 'Wooden Hoe' },
			{ name: 'Stone Sword' },
			{ name: 'Stone Shovel' },
			{ name: 'Stone Pickaxe' },
			{ name: 'Stone Axe' },
			{ name: 'Stone Hoe' },
			{ name: 'Golden Sword' },
			{ name: 'Golden Shovel' },
			{ name: 'Golden Pickaxe' },
			{ name: 'Golden Axe' },
			{ name: 'Golden Hoe' },
			{ name: 'Iron Sword' },
			{ name: 'Iron Shovel' },
			{ name: 'Iron Pickaxe' },
			{ name: 'Iron Axe' },
			{ name: 'Iron Hoe' },
			{ name: 'Diamond Sword' },
			{ name: 'Diamond Shovel' },
			{ name: 'Diamond Pickaxe' },
			{ name: 'Diamond Axe' },
			{ name: 'Diamond Hoe' },
			{ name: 'Bow' },
			{ name: 'Arrow', mcName: 'Arrow (item)' }
		],
		Armor: [
			{ name: 'Leather Cap', mcName: 'Leather Cap (item)' },
			{ name: 'Leather Tunic', mcName: 'Leather Tunic (item)' },
			{ name: 'Leather Pants', mcName: 'Leather Pants (item)' },
			{ name: 'Leather Boots', mcName: 'Leather Boots (item)' },
			{ name: 'Chainmail Helmet', mcName: 'Chainmail Helmet (item)' },
			{ name: 'Chainmail Chestplate', mcName: 'Chainmail Chestplate (item)' },
			{ name: 'Chainmail Leggings', mcName: 'Chainmail Leggings (item)' },
			{ name: 'Chainmail Boots', mcName: 'Chainmail Boots (item)' },
			{ name: 'Golden Helmet', mcName: 'Golden Helmet (item)' },
			{ name: 'Golden Chestplate', mcName: 'Golden Chestplate (item)' },
			{ name: 'Golden Leggings', mcName: 'Golden Leggings (item)' },
			{ name: 'Golden Boots', mcName: 'Golden Boots (item)' },
			{ name: 'Iron Helmet', mcName: 'Iron Helmet (item)' },
			{ name: 'Iron Chestplate', mcName: 'Iron Chestplate (item)' },
			{ name: 'Iron Leggings', mcName: 'Iron Leggings (item)' },
			{ name: 'Iron Boots', mcName: 'Iron Boots (item)' },
			{ name: 'Diamond Helmet', mcName: 'Diamond Helmet (item)' },
			{ name: 'Diamond Chestplate', mcName: 'Diamond Chestplate (item)' },
			{ name: 'Diamond Leggings', mcName: 'Diamond Leggings (item)' },
			{ name: 'Diamond Boots', mcName: 'Diamond Boots (item)' }
		],
		'Wood items': [
			{ name: 'Oak Wood Planks', mcName: 'Oak Planks' },
			{ name: 'Spruce Wood Planks', mcName: 'Spruce Planks' },
			{ name: 'Birch Wood Planks', mcName: 'Birch Planks' },
			{ name: 'Jungle Wood Planks', mcName: 'Jungle Planks' },
			{ name: 'Acacia Wood Planks', mcName: 'Acacia Planks' },
			{ name: 'Dark Oak Wood Planks', mcName: 'Dark Oak Planks' },

			{ name: 'Oak Wood Stairs', mcName: 'Oak Stairs' },
			{ name: 'Spruce Wood Stairs', mcName: 'Spruce Stairs' },
			{ name: 'Birch Wood Stairs', mcName: 'Birch Stairs' },
			{ name: 'Jungle Wood Stairs', mcName: 'Jungle Stairs' },
			{ name: 'Acacia Wood Stairs', mcName: 'Acacia Stairs' },
			{ name: 'Dark Oak Wood Stairs', mcName: 'Dark Oak Stairs' },

			{ name: 'Oak Wood Slab', mcName: 'Oak Slab' },
			{ name: 'Spruce Wood Slab', mcName: 'Spruce Slab' },
			{ name: 'Birch Wood Slab', mcName: 'Birch Slab' },
			{ name: 'Jungle Wood Slab', mcName: 'Jungle Slab' },
			{ name: 'Acacia Wood Slab', mcName: 'Acacia Slab' },
			{ name: 'Dark Oak Wood Slab', mcName: 'Dark Oak Slab' },

			{ name: 'Oak Fence Gate' },
			{ name: 'Spruce Fence Gate' },
			{ name: 'Birch Fence Gate' },
			{ name: 'Jungle Fence Gate' },
			{ name: 'Dark Oak Fence Gate' },
			{ name: 'Acacia Fence Gate' },

			{ name: 'Oak Fence', mcName: 'Oak Fence (item)' },
			{ name: 'Spruce Fence', mcName: 'Spruce Fence (item)' },
			{ name: 'Birch Fence', mcName: 'Birch Fence (item)' },
			{ name: 'Jungle Fence', mcName: 'Jungle Fence (item)' },
			{ name: 'Dark Oak Fence', mcName: 'Dark Oak Fence (item)' },
			{ name: 'Acacia Fence', mcName: 'Acacia Fence (item)' },

			{ name: 'Oak Door', mcName: 'Oak Door (item)' },
			{ name: 'Spruce Door', mcName: 'Spruce Door (item)' },
			{ name: 'Birch Door', mcName: 'Birch Door (item)' },
			{ name: 'Jungle Door', mcName: 'Jungle Door (item)' },
			{ name: 'Acacia Door', mcName: 'Acacia Door (item)' },
			{ name: 'Dark Oak Door', mcName: 'Dark Oak Door (item)' },

			{ name: 'Boat', mcName: 'Oak Boat (item)' },

			{ name: 'Wooden Trapdoor', mcName: 'Oak Trapdoor' },
			{ name: 'Chest', mcName: 'Chest (E)' },
			{ name: 'Trapped Chest', mcName: 'Chest (E)' },
			{ name: 'Painting' },
			{ name: 'Crafting Table' },
			{ name: 'Stick' },
			{ name: 'Sign', mcName: 'Oak Sign (texture)' },
			{ name: 'Bowl' },
			{ name: 'Item Frame', mcName: 'Item Frame (item)' },
			{ name: 'Ladder', mcName: 'Ladder (texture)' },
			{ name: 'Armor Stand', mcName: 'Armor Stand (item)' }
		],
		'Saplings & Leaves': [
			{ name: 'Oak Sapling', mcName: 'Oak Sapling (texture)' }, //
			{ name: 'Spruce Sapling', mcName: 'Spruce Sapling (texture)' },
			{ name: 'Birch Sapling', mcName: 'Birch Sapling (texture)' },
			{ name: 'Jungle Sapling', mcName: 'Jungle Sapling (texture)' },
			{ name: 'Dark Oak Sapling', mcName: 'Dark Oak Sapling (texture)' },
			{ name: 'Acacia Sapling', mcName: 'Acacia Sapling (texture)' },
			{ name: 'Oak Leaves' },
			{ name: 'Spruce Leaves' },
			{ name: 'Birch Leaves' },
			{ name: 'Jungle Leaves' },
			{ name: 'Dark Oak Leaves' },
			{ name: 'Acacia Leaves' }
		],
		'Iron items': [
			{ name: 'Iron Door', mcName: 'Iron Door (item)' }, //
			{ name: 'Iron Bars', mcName: 'Iron Bars (texture)' },
			{ name: 'Iron Trapdoor' },
			{ name: 'Hopper', mcName: 'Hopper (item)' },
			{ name: 'Anvil', enchName: 'Enchanted Anvil' },
			{ name: 'Flint and Steel' },
			{ name: 'Shears' },
			{ name: 'Cauldron (item)' }
		],
		Dyes: [
			{ name: 'Bone Meal' }, //
			{ name: 'Rose Red', mcName: 'Red Dye' },
			{ name: 'Dandelion Yellow', mcName: 'Yellow Dye' },
			{ name: 'Orange Dye' },
			{ name: 'Light Blue Dye' },
			{ name: 'Magenta Dye' },
			{ name: 'Pink Dye' },
			{ name: 'Light Gray Dye' },
			{ name: 'Lime Dye' },
			{ name: 'Cyan Dye' },
			{ name: 'Purple Dye' },
			{ name: 'Gray Dye' }
		],
		'Music Discs': [
			{ name: 'Music Disc 13' },
			{ name: 'Music Disc Cat' }, //
			{ name: 'Music Disc Blocks' },
			{ name: 'Music Disc Chirp' },
			{ name: 'Music Disc Far' },
			{ name: 'Music Disc Mall' },
			{ name: 'Music Disc Mellohi' },
			{ name: 'Music Disc Stal' },
			{ name: 'Music Disc Strad' },
			{ name: 'Music Disc Ward' },
			{ name: 'Music Disc 11' },
			{ name: 'Music Disc Wait' }
		],
		'Minecarts & Rail': [
			{ name: 'Rail', mcName: 'Rail (texture)' },
			{ name: 'Powered Rail', mcName: 'Powered Rail (texture)' },
			{ name: 'Detector Rail', mcName: 'Detector Rail (texture)' },
			{ name: 'Activator Rail', mcName: 'Activator Rail (texture)' },
			{ name: 'Minecart', mcName: 'Minecart (item)' },
			{ name: 'Minecart with Chest', mcName: 'Minecart with Chest (item)' },
			{ name: 'Minecart with Furnace', mcName: 'Minecart with Furnace (item)' },
			{ name: 'Minecart with TNT', mcName: 'Minecart with TNT (item)' },
			{ name: 'Minecart with Hopper', mcName: 'Minecart with Hopper (item)' },
			{ name: 'Minecart with Command Block', mcName: 'Minecart with Command Block (item)' }
		],
		'Redstone stuff': [
			{ name: 'Redstone Torch', mcName: 'On Redstone Torch (texture)' }, //
			{ name: 'Redstone Repeater', mcName: 'Redstone Repeater (item)' },
			{ name: 'Redstone Comparator', mcName: 'Redstone Comparator (item)' },
			{ name: 'Redstone Lamp' },
			{ name: 'Dispenser' },
			{ name: 'Dropper' },
			{ name: 'Lever', mcName: 'Lever (texture)' },
			{ name: 'Tripwire Hook', mcName: 'Tripwire Hook (texture)' },
			{ name: 'Wooden Pressure Plate', mcName: 'Oak Pressure Plate' },
			{ name: 'Stone Pressure Plate' },
			{ name: 'Wooden Button', mcName: 'Oak Button (item)' },
			{ name: 'Stone Button', mcName: 'Stone Button (item)' },
			{ name: 'Piston', png: true },
			{ name: 'Sticky Piston', png: true },
			{ name: 'Light Weighted Pressure Plate' },
			{ name: 'Heavy Weighted Pressure Plate' }
		],
		Brewing: [
			{ name: 'Brewing Stand', mcName: 'Brewing Stand (item)' },
			{ name: 'Glass Bottle' },
			{ name: 'Water Bottle' },

			{ name: 'Regeneration Potion', mcName: 'Potion of Regeneration' },
			{ name: 'Speed Potion', mcName: 'Potion of Swiftness' },
			{ name: 'Fire Resistance Potion', mcName: 'Potion of Fire Resistance' },
			{ name: 'Healing Potion', mcName: 'Potion of Healing' },
			{ name: 'Night Vision Potion', mcName: 'Potion of Night Vision' },
			{ name: 'Strength Potion', mcName: 'Potion of Strength' },
			{ name: 'Jump Boost Potion', mcName: 'Potion of Leaping' },
			{ name: 'Water Breathing Potion', mcName: 'Potion of Water Breathing' },
			{ name: 'Invisibility Potion', mcName: 'Potion of Invisibility' },
			{ name: 'Poison Potion', mcName: 'Potion of Poison' },
			{ name: 'Weakness Potion', mcName: 'Potion of Weakness' },
			{ name: 'Slowness Potion', mcName: 'Potion of Slowness' },
			{ name: 'Damage Potion', mcName: 'Potion of Harming' },
			{ name: 'Absorption Potion', mcName: 'Potion of Fire Resistance' }, // Despite the name being the same, SkyBlock does NOT use the texture for the Minecraft absorption potion
			{ name: 'Blindness Potion', mcName: 'Potion of Blindness' },
			{ name: 'True Resistance Potion', mcName: 'Potion of Resistance' }
		],
		'Misc - Plants & Food': [
			{ name: 'Apple' }, //
			{ name: 'Golden Apple' },
			{ name: 'Mushroom Stew' },
			{ name: 'Cake', mcName: 'Cake (item)' },
			{ name: 'Dead Bush', mcName: 'Dead Bush (texture)' },
			{ name: "Jack o'Lantern" },
			{ name: 'Brown Mushroom Block' },
			{ name: 'Red Mushroom Block' },
			{ name: 'Vines', mcName: 'Vines (inventory)' },
			{ name: 'Fern', mcName: 'Fern (item)' },
			{ name: 'Long Grass', mcName: 'Grass (item)' },
			{ name: 'Double Tallgrass', mcName: 'Tall Grass (item)' }
		],
		Flowers: [
			{ name: 'Dandelion', mcName: 'Dandelion (texture)' },
			{ name: 'Poppy', mcName: 'Poppy (texture)' },
			{ name: 'Blue Orchid', mcName: 'Blue Orchid (texture)' },
			{ name: 'Azure Bluet', mcName: 'Azure Bluet (texture)' },
			{ name: 'Oxeye Daisy', mcName: 'Oxeye Daisy (texture)' },
			{ name: 'Allium', mcName: 'Allium (texture)' },
			{ name: 'Lilac', mcName: 'Lilac (top texture)' },
			{ name: 'Rose Bush', mcName: 'Rose Bush (top texture)' },
			{ name: 'White Tulip', mcName: 'White Tulip (texture)' },
			{ name: 'Pink Tulip', mcName: 'Pink Tulip (texture)' },
			{ name: 'Red Tulip', mcName: 'Red Tulip (texture)' },
			{ name: 'Orange Tulip', mcName: 'Orange Tulip (texture)' },
			{ name: 'Sunflower', mcName: 'Sunflower (front texture)', enchName: 'Enchanted Sunflower' }
		],
		'Misc - Nether & End': [
			{ name: 'Soul Sand' }, //
			{ name: 'Nether Brick' },
			{ name: 'Nether Bricks' },
			{ name: 'Nether Brick Fence', mcName: 'Nether Brick Fence (item)' },
			{ name: 'Nether Brick Stairs' },
			{ name: 'Fire Charge' },
			{ name: 'End Portal Frame' },
			{ name: 'Dragon Egg' },
			{ name: 'Ender Chest', mcName: 'Ender Chest (E)' },
			{ name: 'Beacon' },
			{ name: 'Nether Star' },
			{ name: 'Quartz Stairs' },
			{ name: 'Chiseled Quartz Block' },
			{ name: 'Daylight Sensor', mcName:'Daylight Detector' }
		],
		Glass: [
			{ name: 'Glass' },
			{ name: 'White Stained Glass' },
			{ name: 'Orange Stained Glass' },
			{ name: 'Magenta Stained Glass' },
			{ name: 'Light Blue Stained Glass' },
			{ name: 'Yellow Stained Glass' },
			{ name: 'Lime Stained Glass' },
			{ name: 'Pink Stained Glass' },
			{ name: 'Gray Stained Glass' },
			{ name: 'Light Gray Stained Glass' },
			{ name: 'Cyan Stained Glass' },
			{ name: 'Purple Stained Glass' },
			{ name: 'Blue Stained Glass' },
			{ name: 'Brown Stained Glass' },
			{ name: 'Green Stained Glass' },
			{ name: 'Red Stained Glass' },
			{ name: 'Black Stained Glass' },
			{ name: 'Glass Pane', mcName: 'Glass (texture)' },
			{ name: 'White Stained Glass Pane', mcName: 'White Stained Glass (texture)', imageId: 'Blank:0' },
			{ name: 'Orange Stained Glass Pane', mcName: 'Orange Stained Glass (texture)', imageId: 'Blank:1' },
			{ name: 'Magenta Stained Glass Pane', mcName: 'Magenta Stained Glass (texture)', imageId: 'Blank:2' },
			{ name: 'Light Blue Stained Glass Pane', mcName: 'Light Blue Stained Glass (texture)', imageId: 'Blank:3' },
			{ name: 'Yellow Stained Glass Pane', mcName: 'Yellow Stained Glass (texture)', imageId: 'Blank:4' },
			{ name: 'Lime Stained Glass Pane', mcName: 'Lime Stained Glass (texture)', imageId: 'Blank:5' },
			{ name: 'Pink Stained Glass Pane', mcName: 'Pink Stained Glass (texture)', imageId: 'Blank:6' },
			{ name: 'Gray Stained Glass Pane', mcName: 'Gray Stained Glass (texture)', imageId: 'Blank:7' },
			{ name: 'Light Gray Stained Glass Pane', mcName: 'Light Gray Stained Glass (texture)', imageId: 'Blank:8' },
			{ name: 'Cyan Stained Glass Pane', mcName: 'Cyan Stained Glass (texture)', imageId: 'Blank:9' },
			{ name: 'Purple Stained Glass Pane', mcName: 'Purple Stained Glass (texture)', imageId: 'Blank:10' },
			{ name: 'Blue Stained Glass Pane', mcName: 'Blue Stained Glass (texture)', imageId: 'Blank:11' },
			{ name: 'Brown Stained Glass Pane', mcName: 'Brown Stained Glass (texture)', imageId: 'Blank:12' },
			{ name: 'Green Stained Glass Pane', mcName: 'Green Stained Glass (texture)', imageId: 'Blank:13' },
			{ name: 'Red Stained Glass Pane', mcName: 'Red Stained Glass (texture)', imageId: 'Blank:14' },
			{ name: 'Black Stained Glass Pane', mcName: 'Black Stained Glass (texture)', imageId: 'Blank:15' }
		],
		'Wool and Carpets': [
			{ name: 'White Wool' }, //
			{ name: 'Orange Wool' },
			{ name: 'Magenta Wool' },
			{ name: 'Light Blue Wool' },
			{ name: 'Yellow Wool' },
			{ name: 'Lime Wool' },
			{ name: 'Pink Wool' },
			{ name: 'Gray Wool' },
			{ name: 'Light Gray Wool' },
			{ name: 'Cyan Wool' },
			{ name: 'Purple Wool' },
			{ name: 'Blue Wool' },
			{ name: 'Brown Wool' },
			{ name: 'Green Wool' },
			{ name: 'Red Wool' },
			{ name: 'Black Wool' },
			{ name: 'White Carpet' },
			{ name: 'Orange Carpet' },
			{ name: 'Magenta Carpet' },
			{ name: 'Light Blue Carpet' },
			{ name: 'Yellow Carpet' },
			{ name: 'Lime Carpet' },
			{ name: 'Pink Carpet' },
			{ name: 'Gray Carpet' },
			{ name: 'Light Gray Carpet' },
			{ name: 'Cyan Carpet' },
			{ name: 'Purple Carpet' },
			{ name: 'Blue Carpet' },
			{ name: 'Brown Carpet' },
			{ name: 'Green Carpet' },
			{ name: 'Red Carpet' },
			{ name: 'Black Carpet' }
		],
		'Hardened Clay': [
			{ name: 'Hardened Clay', mcName: 'Terracotta' },
			{ name: 'White Stained Clay', mcName: 'White Terracotta' },
			{ name: 'Orange Stained Clay', mcName: 'Orange Terracotta' },
			{ name: 'Magenta Stained Clay', mcName: 'Magenta Terracotta' },
			{ name: 'Light Blue Stained Clay', mcName: 'Light Blue Terracotta' },
			{ name: 'Yellow Stained Clay', mcName: 'Yellow Terracotta' },
			{ name: 'Lime Stained Clay', mcName: 'Lime Terracotta' },
			{ name: 'Pink Stained Clay', mcName: 'Pink Terracotta' },
			{ name: 'Gray Stained Clay', mcName: 'Gray Terracotta' },
			{ name: 'Light Gray Stained Clay', mcName: 'Light Gray Terracotta' },
			{ name: 'Cyan Stained Clay', mcName: 'Cyan Terracotta' },
			{ name: 'Purple Stained Clay', mcName: 'Purple Terracotta' },
			{ name: 'Blue Stained Clay', mcName: 'Blue Terracotta' },
			{ name: 'Brown Stained Clay', mcName: 'Brown Terracotta' },
			{ name: 'Green Stained Clay', mcName: 'Green Terracotta' },
			{ name: 'Red Stained Clay', mcName: 'Red Terracotta' },
			{ name: 'Black Stained Clay', mcName: 'Black Terracotta' }
		],
		'Spawn Eggs': [
			{ name: 'Villager Spawn Egg' },
			{ name: 'Endermite Spawn Egg' },
			{ name: 'Enchanted Ghast Spawn Egg', ench: true, mcName: 'Ghast Spawn Egg' },
			{ name: 'Enchanted Spider Spawn Egg', ench: true, mcName: 'Spider Spawn Egg' },
			{ name: 'Enchanted Enderman Spawn Egg', ench: true, mcName: 'Enderman Spawn Egg' }
		],
		Misc: [
			{ name: 'Torch', mcName: 'Torch (texture)' },
			{ name: 'Bucket' },
			{ name: 'Water Bucket' },
			{ name: 'Lava Bucket' },
			{ name: 'Milk Bucket' },
			{ name: 'Paper' },
			{ name: 'Map', mcName: 'Map (item)' },
			{ name: 'Empty Map' },
			{ name: 'Book', enchName: false },
			{ name: 'Written Book' },
			{ name: 'Book and Quill' },
			{ name: 'Enchanted Book', ench: true, png: true },
			{ name: 'Bookshelf' },
			{ name: 'Lead' },
			{ name: 'Saddle' },
			{ name: 'Name Tag' },
			{ name: 'Fishing Rod' },
			{ name: 'Carrot on a Stick' },
			{ name: 'Compass' },
			{ name: 'Clock' },
			{ name: 'Bed', mcName: 'Red Bed (N)' },
			{ name: 'Iron Horse Armor', mcName: 'Iron Horse Armor (item)' },
			{ name: 'Gold Horse Armor', mcName: 'Golden Horse Armor (item)' },
			{ name: 'Diamond Horse Armor', mcName: 'Diamond Horse Armor (item)' },
			{ name: "Bottle o' Enchanting", ench: true, png: true },
			{ name: 'Grass Block' },
			{ name: 'Dirt' },
			{ name: 'Stone Slab' },
			{ name: 'Furnace' },
			{ name: 'Cobblestone Stairs' },
			{ name: 'Cobblestone Wall' },
			{ name: 'Stone Bricks' },
			{ name: 'Stone Brick Stairs' },
			{ name: 'Moss Stone', mcName: 'Mossy Cobblestone' },
			{ name: 'Bedrock' },
			{ name: 'Sandstone' },
			{ name: 'Noteblock', mcName: 'Note Block', enchName: 'Enchanted Noteblock' },
			{ name: 'Brick' },
			{ name: 'Bricks' },
			{ name: 'Brick Slab' },
			{ name: 'Brick Stairs' },
			{ name: 'Flower Pot', mcName: 'Flower Pot (item)' },
			{ name: 'Sandstone Stairs' },
			{ name: 'Red Sandstone' },
			{ name: 'Red Sandstone Stairs' },
			{ name: 'Red Sandstone Slab' },
			{ name: 'Barrier', mcName: 'Barrier (item)' },
			{ name: 'Spawner' },
			{ name: 'TNT' },
			{ name: 'Jukebox' },
			{ name: 'Command Block' },
			{ name: 'Enchantment Table', mcName: 'Enchanting Table (item)' },
			{ name: 'Enchantment Table (placed)', mcName: 'Enchanting Table', png: true },
			{ name: 'Water Block', mcName: 'Water' },
			{ name: 'Lava', sbExt: 'gif' }
		]
	};

	const mappedFiles = Object.keys(files)
		.map((key) =>
			files[key].map((file) => {
				file.group = key;
				file.mcName ??= file.name;
				file.enchName ??= `Enchanted ${file.name}`;

				return file;
			})
		)
		.flat();

	const fileNames = mappedFiles.map((file) => `File:${file.mcName}.png`);
	const fileNamesGif = mappedFiles.map((file) => `File:${file.mcName}.gif`);
	const skyblockFileNames = mappedFiles.map((file) => `File:${file.name}.${file.sbExt ?? 'png'}`);
	const skyblockEnchantedFileNames = mappedFiles.map((file) => `File:${file.enchName}.${file.sbEnchExt ?? file.sbExt ?? 'png'}`);
	// CSS Styles
	const enchantedFilter = 'filter:url(#mcglint)'; // filter:drop-shadow(0 0 6px #aa03aa)
	// Test script styles
	const previewPairStyle = 'display:inline-block; background:#1F000044; padding:3px 5px 0; border-radius:10px;';
	const urlPairListStyle = 'display:flex; flex-wrap:wrap; gap:10px;';

	function openModal(content) {
		mw.hook('dev.modal').add((module) => {
			const id = 'rcm-rp-default-latest-' + Date.now();
			const modal = new module.Modal({ id, content, size: 'full' });

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
			titles: files.join('|')
		})}`;

		return $.ajax({ type: 'GET', dataType: 'jsonp', data: {}, url });
	}

	function fetchAllFiles(pFiles, wiki) {
		const chunks = new Array(Math.ceil(pFiles.length / chunkSize)).fill([]).map((_, i) => pFiles.slice(i * chunkSize, (i + 1) * chunkSize));

		return Promise.all(chunks.map((chunk) => fetchUrls(chunk, wiki))).then((res) => res.reduce((arr, r) => [...arr, ...Object.values(r?.query?.pages ?? {})], []));
	}

	Promise.all([fetchAllFiles(fileNames, 'minecraft'), fetchAllFiles(fileNamesGif, 'minecraft'), fetchAllFiles(skyblockFileNames, 'hypixel-skyblock'), fetchAllFiles(skyblockEnchantedFileNames, 'hypixel-skyblock')]).then(([pages, pagesGif, sbPages, sbEnchPages]) => {
		const urlsMap = Object.fromEntries(pages.map((page) => [page.title, page.imageinfo?.[0]?.url]));
		const gifUrlsMap = Object.fromEntries(pagesGif.map((page) => [page.title, page.imageinfo?.[0]?.url]));
		const sbUrlsMap = Object.fromEntries(sbPages.map((page) => [page.title, page.imageinfo?.[0]?.url]));
		const sbEnchantedUrlsMap = Object.fromEntries(sbEnchPages.map((page) => [page.title, page.imageinfo?.[0]?.url]));
		const cssEntries = ['/* Script for updating this page is on DefaultLatest.css/update.js */'],
			missing = [],
			sbMissing = [],
			previewUrls = [],
			enchantedNames = [];
		let pvwLastGroup;

		mappedFiles.forEach((file) => {
			const key = `File:${file.mcName}.png`,
				keyGif = `File:${file.mcName}.gif`;
			const mcUrl = gifUrlsMap[keyGif] && !(file.png && urlsMap[key]) ? gifUrlsMap[keyGif] : urlsMap[key];

			if (mcUrl) {
				/*
				 * Detect if this item has an enchanted form on SB wiki
				 * if so, have it use un-enchanted asset above, and add it to
				 * `enchantedNames` array to have an enchantment filter applied
				 */
				let extraEnchRule = '';
				const sbEnchName = file.ench ? false : file.enchName,
					sbEnchKey = `File:${sbEnchName}.${file.sbEnchExt ?? file.sbExt ?? 'png'}`;
					
				if (sbEnchName && sbEnchantedUrlsMap[sbEnchKey]) {
					enchantedNames.push(`${sbEnchName}.${file.sbEnchExt ?? file.sbExt ?? 'png'}`);
					extraEnchRule = `, img[data-image-name="${sbEnchName}.${file.sbEnchExt ?? file.sbExt ?? 'png'}"]`;
				}

				if (file.ench) enchantedNames.push(`${file.enchName.replace(/^Enchanted /, '')}.${file.sbEnchExt ?? file.sbExt ?? 'png'}`);

				cssEntries.push(`img[data-image-name="${file.name}.${file.sbExt ?? 'png'}"]${extraEnchRule} { content: url('${mcUrl}') }`);

				if (file.imageId) cssEntries.push(`.invslot span[data-iid="${file.imageId}"] { background-image: url('${mcUrl}') }`); //img[alt="${file.name}"], img[alt="${file.name}.png"],
			} else missing.push(key);

			const sbKey = `File:${file.name}.${file.sbExt ?? 'png'}`;

			if (!sbUrlsMap[sbKey]) sbMissing.push(sbKey);

			if (file.group !== pvwLastGroup) {
				pvwLastGroup = file.group;
				previewUrls.push({ label: file.group, urlPairs: [] });
			}
			previewUrls.at(-1).urlPairs.push([sbUrlsMap[sbKey], mcUrl]);
		});

		cssEntries.push(`${enchantedNames.map((name) => `img[data-image-name="${name}"]`).join(', ')} { ${enchantedFilter} }`);

		console.log('Completed CSS generation! View the results in the modal on screen!');

		openModal(
			[
				"<div style='color:white; background:darkgrey; padding:8px 8px; margin:0 8px;'>",
				missing.length > 0 ? 'Following item links not found on MC wiki:' : '',
				missing.length > 0 ? `<pre style="background:darkred; margin-bottom:10px;">${missing.join('\n')}</pre>` : '',
				sbMissing.length > 0 ? "Following css rules don't have a corresponding file by used name on SB wiki:" : '',
				sbMissing.length > 0 ? `<pre style="background:darkred; margin-bottom:10px;">${sbMissing.join('\n')}</pre>` : '',
				'<h2>Copy CSS down below</h2>',
				`<textarea style="background:black; color:white; width:100vw; height:50vh;">${cssEntries.join('\n')}</textarea>`,
				`<h2>Previews: (${previewUrls.length} categories, ${mappedFiles.length} images)</h2>`,
				'<div>',
				previewUrls.map(({ label, urlPairs }) => `<div><h4>${label}</h4><div style="${urlPairListStyle}">${urlPairs.map((urls) => `<span style="${previewPairStyle}">${urls.map((url) => `<img src="${url}" height="40" />`).join('')}</span>`).join('')}</div></div>`).join(''),
				'</div>',
				'</div>'
			].join('')
		);
	});

	return 'Generating CSS...';
})();