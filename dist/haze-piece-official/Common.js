// Add this helper function at the top level of your script

$(document).ready(function () {
    // Isolated top timer logic
    function updateTopStockTimer() {
        const now = new Date();
        const utcMs = now.getTime();
        const cycle = 2 * 60 * 60 * 1000;
        let nextReset = Math.ceil(utcMs / cycle) * cycle;

        const currentHour = Math.floor(utcMs / (60 * 60 * 1000));
        const resetHour = Math.floor(nextReset / (60 * 60 * 1000));
        if (resetHour === currentHour) {
            nextReset += cycle;
        }

        const diff = nextReset - utcMs;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        $(".stock-timer").each(function () {
            this.innerHTML = "Next Stock Reset: " + hours + "h " + minutes + "m " + seconds + "s";
        });
    }
    updateTopStockTimer();
    setInterval(updateTopStockTimer, 1000);
});
/* changes before sword*/
(function($, mw) {
	
	function openAllItemsModal(itemType) {
    const isAccessory = itemType === 'Accessory';
    const dataset = isAccessory ? Accessories : Swords;
    const modalId = 'wiki-hud-modal';
    
    // Build the grid items dynamically using flex
    let listHtml = dataset.map(item => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:#1c2127; padding:12px 15px; border-radius:6px; margin-bottom:8px; border-left:4px solid #fca311;">
        <div style="display:flex; align-items:center; gap:15px; flex-grow:1; min-width:0;">
            <img src="${getFandomImageUrl(item.image)}" width="45" style="border-radius:4px; flex-shrink:0;" />
            <div style="overflow:hidden;">
                <strong style="color:#ffffff; font-size:1.1em; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</strong>
                <span style="font-size:0.85em; color:${uiStyles.rarityColors[item.Rarity]};">${item.Rarity}</span>
            </div>
        </div>

        <div style="text-align:right; flex-shrink:0; margin-left:15px;">
            <div style="font-size:0.85em; color:#8a929a;">Source: ${item.source}</div>
            <div style="font-size:0.85em; color:#ffffff; margin-bottom:5px;">Level: ${item.level}</div>
            <button onclick="window.location.href='/wiki/${item.name.replace(/ /g, '_')}'" style="background:#fca311; border:none; color:#000; padding:4px 8px; font-size:0.75em; font-weight:bold; cursor:pointer; border-radius:3px;">VIEW PAGE</button>
        </div>
    </div>
`).join('');

    // Modal structure
    let modalHtml = `
    <div id="${modalId}" class="hud-modal-overlay">
        <div class="hud-modal-content">
            <div class="hud-modal-header" style="display:flex; justify-content:space-between; padding-bottom:15px; border-bottom:1px solid #333; margin-bottom:15px;">
                <h2 style="color:#fca311; margin:0;">${itemType.toUpperCase()} ARCHIVE</h2>
                <button class="hud-modal-close" style="background:none; border:none; color:#fff; font-size:1.5em; cursor:pointer;">×</button>
            </div>
            <div class="hud-modal-scroll" style="max-height: 60vh; overflow-y: auto; padding-right:10px;">
                ${listHtml}
            </div>
        </div>
    </div>`;

    $('body').append(modalHtml);
    $('.hud-modal-close').on('click', function() { $('#' + modalId).remove(); });
}
	
    // Unified Catalogs
    const Accessories = [
        {name: 'Abyssal Necklace', Rarity: 'Mythical', Sea: 3, image: 'Abyssal_Necklace.png', level: '4200+', source: 'Crafting', description: 'A deeply cursed necklace recovered from the trenches.', obtainment: {method: 'crafted',
        	cost: 'Unreleased',
        	npc: 'Doran The Forge',
        	location: 'Land Of Gods'
        }},
        {name: 'Dominus Messor', Rarity: 'Mythical', Sea: 3, image: 'Dominus_Messor.png', level: '4200+', source: 'Crafting', description: 'The grand crown of the harvest reaper.', obtainment: {method: 'crafted',
        	cost: 'Unreleased',
        	npc: 'Doran The Forge',
        	location: 'Land Of Gods'
        }},
        {name: 'Bandit Eyepatch', Rarity: 'Common', Sea: 1, image: 'BanditEyePatch.Webp', level: '15', source: 'Boss Drop', description: 'The grand eyepatch of the Bandit Leader. (40% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Bandit Boss',
        	location: 'Starter Island'
        }},
        {name: 'Green Bandana', Rarity: 'Uncommon', Sea: 1, image: 'GreenBandana.webp', level: '350+', source: 'Boss Drop', description: 'A green bandana worn by an ethusiastic youth. (50% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Dual Swordsman SuperBoss',
        	location: 'Logue Town Island'
        }},
        {name: 'Black Shades', Rarity: 'Common', Sea: 1, image: 'Black Shades.webp', level: '1500+', source: 'Boss Drop', description: 'A pair of Black Shades. (2.5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Vergo Boss',
        	location: 'Half Hot Half Cold Island'
        }},
        {name: 'Neptune Crown', Rarity: 'Rare', Sea: 1, image: 'NeptuneCrown.webp', level: '1700+', source: 'Boss Drop', description: 'A crown worn by a King. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Neptune Boss',
        	location: 'Fishman Island'
        }},
        {name: 'Thunder Drums', Rarity: 'Rare', Sea: 1, image: 'ThunderDrums.Webp', level: '1100+', source: 'Boss Drop', description: 'A item once worn by an ancient entity. (1% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Thunder God Boss',
        	location: 'Sky Islands'
        }},
        {name: 'Clown Nose', Rarity: 'Common', Sea: 1, image: 'ClownNose.Webp', level: '60+', source: 'Boss Drop', description: 'A red Nose prop worn by a Pathological liar. (30% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Clown Boss',
        	location: 'Clown Island'
        }},
        {name: 'Coded Mask', Rarity: 'Rare', Sea: 1, image: 'CodedMask.Webp', level: '700+', source: 'Boss Drop', description: 'A  Mask worn by a secretive entity. (100% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Mace Boss',
        	location: 'Marine Base Town Island'
        }},
        {name: 'Glasses', Rarity: 'Common', Sea: 1, image: 'Glasses.Webp', level: '400+', source: 'Boss Drop', description: 'A pair of glasses. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Tashii Boss',
        	location: 'Logue Town Island'
        }},
        {name: 'Sleeping Mask', Rarity: 'Common', Sea: 1, image: 'SleepingMask.Webp', level: '900+', source: 'Boss Drop', description: 'A mask worn by a former Admiral. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Ice Admiral Boss',
        	location: 'Marine HQ Island'
        }},
        {name: 'Pearl Necklace', Rarity: 'Rare', Sea: 1, image: 'PearlNecklace.Webp', level: '???+', source: 'Boss Drop', description: 'A necklace worn by a great entity in the 1st Sea. (100% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'FireFirst Super-Boss',
        	location: 'Tall Woods Island'
        }},
        {name: 'Warden Hat', Rarity: 'Common', Sea: 1, image: 'WardenHat.Webp', level: '1400+', source: 'Boss Drop', description: 'A Marine Hat worn by an Warden. (2.5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Warden Boss',
        	location: 'impel Jail Island'
        }},
        {name: 'Oversized Helmet', Rarity: 'Uncommon', Sea: 1, image: 'OversizedHelmet.Webp', level: '750+', source: 'Boss Drop', description: 'A Spiky Helmet worn by a Minotaur. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Minotaur Boss',
        	location: 'The Three Islands'
        }},
        {name: 'Iron Jaw', Rarity: 'Common', Sea: 1, image: 'IronJaw.Webp', level: '650+', source: 'Boss Drop', description: 'A prosthetic Jaw worn by Marine Captain. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Marine Captain Boss',
        	location: 'Marine Base Town Island'
        }},
        {name: 'Gold Pauldrons', Rarity: 'Common', Sea: 1, image: 'GoldenPauldrons.Webp', level: '300+', source: 'Boss Drop', description: 'A pair of Pauldrons worn by Don Krieg. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Krieg Boss',
        	location: 'Sea Restaurant Island'
        }},
        {name: 'Monkey Crown', Rarity: 'Common', Sea: 1, image: 'MonkeyCrown.Webp', level: '550+', source: 'Boss Drop', description: 'A crown worn by the King of The Jungle. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'King Gorilla Boss',
        	location: 'Tall Woods Island'
        }},
        {name: 'Tremor Cloak', Rarity: 'Rare', Sea: 1, image: 'TremorCloak.Webp', level: 'N/A+', source: 'Bellas store', description: 'A tremor cloak worn by the strongest woman.', obtainment: {method: 'Store',
        	cost: '$100k + White Orb boss drop from Tremor Girl (1%)',
        	npc: 'Bella',
        	location: 'Marine HQ Island'
        }},
        {name: 'Blue Scarf', Rarity: 'Rare', Sea: 1, image: 'BlueScarf.Webp', level: '2150+', source: 'Boss Drop', description: 'A scarf worn by an undead beast. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Ryummy Boss',
        	location: 'Thriller Island'
        }},
        {name: 'SeaBeast Armor', Rarity: 'Uncommon', Sea: 1, image: 'SeaBeastArmor.Webp', level: 'N/A+', source: 'BlackSmith', description: 'A Sea Armor reinforcing ones constitution.', obtainment: {method: 'Store',
        	cost: 'Ice Core (dropped from Harpy Boss at HHHC Island) + SeaBeast core (Dropped from Sea Beast)',
        	npc: 'BlackSmith',
        	location: 'Starter Island'
        }},
        {name: 'SeaBeast Helmet', Rarity: 'Uncommon', Sea: 1, image: 'SeaBeastHelmet.Webp', level: 'N/A+', source: 'BlackSmith', description: 'A Sea Helmet reinforcing ones constitution.', obtainment: {method: 'Store',
        	cost: 'Ice Core (dropped from Harpy Boss at HHHC Island) + SeaBeast core (Dropped from Sea Beast)',
        	npc: 'BlackSmith',
        	location: 'Starter Island'
        }},
        {name: 'Green Cloak', Rarity: 'Legendary', Sea: 2, image: 'GreenCloak.Webp', level: '2650+', source: 'Boss Drop', description: 'A Green Cloak worn by a great swordsman. (5% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: '3ss Boss',
        	location: 'Snowy Graveyard Island'
        }},
        {name: 'Dragon Horns', Rarity: 'Legendary', Sea: 2, image: 'DragonHorns.Webp', level: '2850+', source: 'Boss Drop', description: 'A pair of horns. (10% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Dragon Super-Boss',
        	location: 'Dragon Island'
        }},
        {name: 'Pumpkin Mask', Rarity: 'Mythical', Sea: 2, image: 'PumpkinMask.Webp', level: 'N/A+', source: 'Event', description: 'A pair of golden Masks from an event. (Currently Unobtainable)', obtainment: {method: 'Event',
        	cost: 'N/A',
        	npc: 'N/A',
        	location: 'N/A'
        }},
        {name: 'Dough Scarf', Rarity: 'Legendary', Sea: 2, image: 'DoughScarf.Webp', level: '3300+', source: 'Boss Drop', description: 'A scarf worn by a greater Fruit Wielder. (10% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Dough Super-Boss',
        	location: 'Mirror World at Dough Island'
        }},
        {name: 'Ice Crown', Rarity: 'Legendary', Sea: 2, image: 'IceCrown.Webp', level: 'N/A+', source: 'Boss Drop', description: 'A Ice Crown dropped from Xmas Boss. (Currently unobtainable)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Xmas Super-Boss',
        	location: 'Winter Island'
        }},
        {name: 'Night Hat', Rarity: 'Legendary', Sea: 2, image: 'NightHat.Webp', level: '3600+', source: 'Boss Drop', description: 'A hat worn by a great swordsman. (10% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'DarkBlade V2 Super-Boss',
        	location: 'Foggy Castle Island'
        }},
        {name: 'Night Necklace', Rarity: 'Mythical', Sea: 2, image: 'NightNecklace.Webp', level: '3600+', source: 'Boss Drop', description: 'A Necklace worn by a great swordsman. (0.1% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'DarkBlade V2 Super-Boss',
        	location: 'Foggy Castle Island'
        }},
        {name: 'Snake Earrings', Rarity: 'Rare', Sea: 2, image: 'SnakeEarrings.Webp', level: '3900+', source: 'Boss Drop', description: 'A pair of earrings worn by a great empress. (1% Chance)', obtainment: {method: 'Drop',
        	cost: 'N/A',
        	npc: 'Love Boss',
        	location: 'Snake Amazon Island'
        }},
        {name: 'Venom Crown', Rarity: 'Legendary', Sea: 2, image: 'SnakeEarrings.Webp', level: 'N/A+', source: 'Puzzle', description: 'A venom crown for those who use their brains.', obtainment: {method: 'Puzzle',
        	cost: 'Obtained through a mini puzzle in a cave on Venom Island. (Must sacrifice a venom fruit + defeat the boss 20 times. Lets u walk on water with venom puddle + )',
        	npc: 'N/A',
        	location: 'Venom Island'
        }},
        {name: 'SeaBeast Helmet V2', Rarity: 'Legendary', Sea: 3, image: 'SeaBeastHelmetV2.Webp', level: '4200+', source: 'Craftable - Doran The Forge', description: 'A personally handcrafted headwear for the User.', obtainment: {method: 'Crafting',
        	cost: '',
        	npc: 'Doran The Forge',
        	location: 'Land Of Gods'
        }},
        {name: 'SeaBeast Armor V2', Rarity: 'Legendary', Sea: 3, image: 'SeaBeastArmorV2.Webp', level: '4200+', source: 'Craftable - Doran The Forge', description: 'A personally handcrafted armor for the User.', obtainment: {method: 'Crafting',
        	cost: '',
        	npc: 'Doran The Forge',
        	location: 'Land Of Gods'
        }}
    ];

    const Swords = [
        {name: 'Dark Blade', Rarity: 'Mythical', Sea: 3, image: 'DarkBlade.png', level: '4200', source: 'Shop', type: 'Sword', description: 'A blade forged in darkness. It absorbs the life force of its enemies.', obtainment: {method: 'crafted',
        	cost: 'Unreleased',
        	npc: 'Doran The Forge',
        	location: 'Land Of Gods'
        }},
        {name: 'Katana', Rarity: 'Common', Sea: 1, image: 'Katana.png', level: '10+', source: 'Bandit Leader', type: 'Sword', description: 'A blade forged by an aspiring blacksmith.', obtainment: {method: 'Shop',
        	cost: '$200',
        	npc: 'Katana',
        	location: 'Starter Island'
        }},
        {name: 'Shark Blade', Rarity: 'Common', Sea: 1, image: 'SharkBlade.png', level: '90+', source: 'Shark Boss', type: 'Sword', description: 'A blade forged for a fishman. (5% Drop chance)', obtainment: {method: 'Drop',
        	cost: '',
        	npc: 'Shark Boss',
        	location: 'Shark Park Island'
        }},
        {name: 'Pipe', Rarity: 'Uncommon', Sea: 1, image: 'Pipe.png', level: '350+', source: 'Sabo', type: 'Sword', description: 'A pipe enhanced for a revolutionary.', obtainment: {method: 'Shop',
        	cost: '$250,000',
        	npc: 'Sabo',
        	location: 'Marine Base Town Island'
        }},
        {name: 'Soul Cane', Rarity: 'Uncommon', Sea: 1, image: 'SoulCane.png', level: '1000+', source: 'Mr. Skeleton', type: 'Sword', description: 'A cane once wielded by a great pirate.', obtainment: {method: 'Shop',
        	cost: '$100,000',
        	npc: 'Mr. Skeleton',
        	location: 'Impel Jail Island'
        }},
        {name: 'Mace', Rarity: 'Uncommon', Sea: 1, image: 'Mace.png', level: '350+', source: 'Mace Boss', type: 'Sword', description: 'A mace wielded by a mysterious entity. (100% chance)', obtainment: {method: 'BossDrop',
        	cost: '',
        	npc: 'Mace Boss',
        	location: 'Marine Base Town Island'
        }},
        {name: 'Fishman Trident', Rarity: 'Uncommon', Sea: 1, image: 'Trident.png', level: '1600+', source: 'Fork Merchant', type: 'Sword', description: 'A trident used for unique purposes.', obtainment: {method: 'Shop',
        	cost: '$50,000 + Fork (5% Chance from Neptune Boss)',
        	npc: 'Fork Merchant',
        	location: 'Fishman Island'
        }},
        {name: 'Operation Blade', Rarity: 'Uncommon', Sea: 1, image: 'OpeBlade.png', level: '1450+', source: 'Magma Minion', type: 'Sword', description: 'A blade wielded by a surgeon of "Death".', obtainment: {method: 'Shop',
        	cost: '$100,000 + Level 1000',
        	npc: 'Magma Minion',
        	location: 'Half Hot Half Cold Island'
        }},
        {name: 'SeaBeast Hammer', Rarity: 'Rare', Sea: 1, image: 'SeaBeastHammer.png', level: '1500+', source: 'SeaBeast', type: 'Sword', description: 'A blade wielded by those who were fortunate enough to survive a clash against a great Beast of the Seas. (50% Chance)', obtainment: {method: 'Drop',
        	cost: '',
        	npc: 'SeaBeast',
        	location: 'Anywhere on the Seas (1st Sea)'
        }},
        {name: 'Shusui', Rarity: 'Rare', Sea: 1, image: 'Shusui.png', level: '2150+', source: 'Ryummy Boss', type: 'Sword', description: 'A blade wielded by a former great swordsman. (5% Chance)', obtainment: {method: 'Drop',
        	cost: '',
        	npc: 'Ryummy Boss',
        	location: 'Thriller Island'
        }},
        {name: 'Bisento', Rarity: 'Rare', Sea: 1, image: 'Bisento.png', level: '2150+', source: 'Bella', type: 'Sword', description: 'A blade wielded by a legendary Pirate who once collided with the ruler of the Seas!', obtainment: {method: 'Shop',
        	cost: '$500,000',
        	npc: 'Bella',
        	location: 'Marine HQ'
        }},
        {name: 'Raiu', Rarity: 'Rare', Sea: 1, image: 'Raiu.png', level: '1700+', source: 'Shiryu', type: 'Sword', description: 'A blade wielded by a pirate who loves to steal others stuff!', obtainment: {method: 'Shop',
        	cost: 'Rare Scroll (5% Drop Chance from Shiryu Boss)',
        	npc: 'Scroll Merchant',
        	location: 'Skull Island'
        }},
        {name: '2 Sword Style', Rarity: 'Rare', Sea: 1, image: '2ss.png', level: '400+', source: 'Dr. White', type: 'Sword', description: 'A blade wielded by a pirate which aspires to be the best!', obtainment: {method: 'Shop',
        	cost: '$100,000',
        	npc: 'Dr.White',
        	location: 'Marine Base Town Island'
        }},
        {name: 'Golden Staff', Rarity: 'Rare', Sea: 1, image: 'GoldenStaff.png', level: '1100+', source: 'Thunder God Boss', type: 'Sword', description: 'A blade wielded by a lightning fruit user!', obtainment: {method: 'Drop',
        	cost: '1% Drop Chance from Thunder God Boss',
        	npc: 'Thunder God Boss',
        	location: 'Sky Islands'
        }},
        {name: '2 Sword Style V2', Rarity: 'Legendary', Sea: 1, image: '2ssV2.png', level: '500+', source: 'Dr. White', type: 'Sword', description: 'A blade wielded by a swordsman which aspires to become the best!', obtainment: {method: 'Shop',
        	cost: 'Book + $20,000 (Book has a 10% Drop chance from Dual Swordsman)',
        	npc: 'Dr. White',
        	location: 'Marine Base Town'
        }},
        {name: 'Bisento V2', Rarity: 'Legendary', Sea: 1, image: 'BisentoV2.png', level: '800+', source: 'TremorGirl Super-Boss', type: 'Sword', description: 'A blade wielded by a legendary pirate who once collided with the conqueror of the Seas!', obtainment: {method: 'Drop',
        	cost: '20-50% drop chance from Tremor Girl (Must have V1 in Inventory)',
        	npc: 'Tremor Girl Super-Boss',
        	location: 'Marine HQ'
        }},
        {name: 'SeaBeast Hammer V2', Rarity: 'Legendary', Sea: 2, image: 'SeaBeastHammerV2.png', level: '2200+', source: 'Sea Beast', type: 'Sword', description: 'A blade wielded by those who have defeated an acient beast of the seas!', obtainment: {method: 'Drop',
        	cost: '3.5% Drop Chance from Sea Beast at Second Sea',
        	npc: 'SeaBeast',
        	location: 'Anywhere in the Seas'
        }},
        {name: 'Enma', Rarity: 'Rare', Sea: 2, image: 'Enma.png', level: '2200+', source: 'Enma Super-Boss', type: 'Sword', description: 'A blade wielded by 1 who has sought adventure since his earlier days!', obtainment: {method: 'Drop',
        	cost: '10% Drop Chance from Enma Super-Boss',
        	npc: 'Enma Boss',
        	location: 'Flower Capital'
        }},
        {name: 'Dual Axe', Rarity: 'Legendary', Sea: 1, image: 'DualAxe.png', level: 'Any', source: 'Halloween Event (Unobtainable)', type: 'Sword', description: 'A secret Sword...', obtainment: {method: 'Shop',
        	cost: '4,500 Candies from Candy Market Npc',
        	npc: 'Candy Market Npc',
        	location: 'Starter Island'
        }},
        {name: 'Krampus Scythe', Rarity: 'Mythical', Sea: 2, image: 'KrampusScythe.png', level: '3750+', source: 'Xmas Event 2022 (Unobtainable)', type: 'Sword', description: 'A secret Sword...', obtainment: {method: 'Drop',
        	cost: '10% Drop Chance from Krampus Boss in Xmas 2022 event (Currently Unobtainable)',
        	npc: 'Krampus Boss',
        	location: 'Winter Island'
        }},
        {name: 'Mace V2', Rarity: 'Legendary', Sea: 2, image: 'MaceV2.png', level: '2850+', source: 'MaceV2 Boss', type: 'Sword', description: 'A blade wielded by 1 who has forsaken himself.', obtainment: {method: 'Drop',
        	cost: '1% Drop Chance',
        	npc: 'MaceV2 Boss',
        	location: 'Dragon Island'
        }},
        {name: 'Dough Trident', Rarity: 'Legendary', Sea: 2, image: 'DoughTrident.png', level: '3300+', source: 'Dough User Super-Boss', type: 'Sword', description: 'A blade wielded by 1 who loves donuts so much that his constitution eventually started changing', obtainment: {method: 'Drop',
        	cost: '50% Drop Chance',
        	npc: 'Dough User Super-Boss',
        	location: 'Dough Island'
        }},
        {name: 'Zenith', Rarity: 'Legendary', Sea: 2, image: 'Zenith.png', level: '2500+', source: 'Zenith Super-Boss', type: 'Sword', description: 'A blade wielded by 1 who has embraced darkness itself! (This boss only spawns when a storm occurs - 2h & 35 Minutes)', obtainment: {method: 'Drop',
        	cost: '100% Drop Chance',
        	npc: 'Zenith Super-Boss',
        	location: 'Shadow Island'
        }},
        {name: 'Ace', Rarity: 'Mythical', Sea: 1, image: 'Ace.png', level: 'Any+', source: 'Daily/Infinite Quests', type: 'Sword', description: 'A blade wielded by those who seek Glory!', obtainment: {method: 'Quests',
        	cost: '0.1% Drop chance from Dailies and 1% From Infinites!',
        	npc: 'N/A',
        	location: 'N/A'
        }},
        {name: 'DarkBlade V2', Rarity: 'Mythical', Sea: 2, image: 'DarkBladeV2.png', level: '3600+', source: 'Mihawk Super-Boss', type: 'Sword', description: 'Must complete Nikkolapz quest: Requirements: Having DarkBlade V1, given him a mythical/Legendary Physical devil fruit & having killed Enma/3ss Boss once! ', obtainment: {method: 'Quests',
        	cost: 'Upon completing the said quest, there will be a timer to spawn Mihawk Boss. It\'s drop chance is 100%',
        	npc: 'Mihawk Super-Boss',
        	location: 'Foggy Castle'
        }},
        {name: '3 Sword Style', Rarity: 'Mythical', Sea: 3, image: '3ss.png', level: '4200+', source: 'Quest', type: 'Sword', description: 'Must obtain Zenith, Enma & Shusui + grind all of their masteries to 300. Upon doing so, user must go to the Third Sea and interact with the Shrine of 3 Swords on Land Of Gods ', obtainment: {method: 'Quests',
        	cost: 'Zenith, Shusui, Enma all at 300 Mastery',
        	npc: 'Shrine of 3 Swords Rock',
        	location: 'Land Of Gods'
        }},
        {name: '3 Sword Style V2', Rarity: 'Mythical', Sea: 3, image: '3ssV2.png', level: '4200+', source: 'Doran The Forge', type: 'Sword', description: 'Must first have obtained 3 Sword Style V1!', obtainment: {method: 'Crafting',
        	cost: '300 Mastery on V1 + 5x Ancient Blade Relics',
        	npc: 'Shrine of 3 Swords Rock',
        	location: 'Land Of Gods'
        }}
        ];

    const uiStyles = {
        rarityColors: { 
            Mythical: '#ff3333', Legendary: '#ffac38', Epic: '#ab47bc', 
            Rare: '#2196f3', Uncommon: '#4caf50', Common: '#9e9e9e' 
        }
    };
    
    

    function getFandomImageUrl(filename) {
        return mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=Special:FilePath/' + encodeURIComponent(filename.replace(/ /g, '_'));
    }

    // Centrally managed state filters
    let filterStates = {
        Accessory: { sea: 'AllSeas', rarity: 'AllRarities', query: '' },
        Sword: { sea: 'AllSeasS', rarity: 'AllRaritiesS', type: 'AllTypes', query: '' }
    };

    let selectedItems = {
        Accessory: null,
        Sword: null
    };

    function processFilterAction(itemType, parentId) {
        const state = filterStates[itemType];
        const dataset = (itemType === 'Accessory') ? Accessories : Swords;

        const filtered = dataset.filter(item => {
            const matchesSea = (state.sea.includes('All') || item.Sea.toString() === state.sea);
            const matchesRarity = (state.rarity.includes('All') || item.Rarity === state.rarity);
            const matchesType = (itemType === 'Accessory' || state.type.includes('All') || item.type === state.type);
            const matchesSearch = item.name.toLowerCase().includes(state.query.toLowerCase());
            return matchesSea && matchesRarity && matchesType && matchesSearch;
        });

        if (selectedItems[itemType] && !filtered.some(i => i.name === selectedItems[itemType].name)) {
            selectedItems[itemType] = null;
        }

        renderHUDLayout(filtered, parentId, itemType, dataset);
    }
    
    // FIX 2: Exposed to the window object so inline onclick="" can access it
    window.openObtainmentModal = function(encodedItem) {
        const item = JSON.parse(decodeURIComponent(encodedItem));
        // Fallback if data is missing
        const ob = item.obtainment || { 
            method: 'Unknown', cost: 'N/A', npc: 'N/A', location: 'N/A' 
        };

        const modalHtml = `
        <div id="obtainment-modal" class="hud-modal-overlay">
            <div class="hud-modal-content" style="max-width: 400px; background:#1c2127; padding:20px; border-radius:8px; color:#fff;">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <h2 style="color:#fca311; margin:0;">OBTAINMENT: ${item.name}</h2>
                    <button class="hud-modal-close" style="background:none; border:none; color:#fff; cursor:pointer;">✕</button>
                </div>
                <div style="line-height:1.8;">
                    <div><strong>Method:</strong> ${ob.method}</div>
                    <div><strong>Cost:</strong> ${ob.cost}</div>
                    <div><strong>NPC:</strong> ${ob.npc}</div>
                    <div><strong>Location:</strong> ${ob.location}</div>
                </div>
            </div>
        </div>`;

        $('body').append(modalHtml);
        $('#obtainment-modal .hud-modal-close').on('click', () => $('#obtainment-modal').remove());
    };

    function renderHUDLayout(data, parentId, itemType, fullDataset) {
        const $container = $(parentId);
        if (!$container.length) return;

        const isAccessory = itemType === 'Accessory';
        const state = filterStates[itemType];
        
        if (!selectedItems[itemType]) {
            selectedItems[itemType] = data.length > 0 ? data[0] : (isAccessory ? Accessories[0] : Swords[0]);
        }
        
        const featuredItem = selectedItems[itemType];
        const featuredColor = uiStyles.rarityColors[featuredItem.Rarity] || '#ff3333';

        // Sidebar content dynamic calculators
        let counts = { sea1: 0, sea2: 0, sea3: 0, sword: 0, katana: 0, great: 0, dual: 0 };
        fullDataset.forEach(i => {
            if (i.Sea === 1) counts.sea1++;
            if (i.Sea === 2) counts.sea2++;
            if (i.Sea === 3) counts.sea3++;
            if (!isAccessory) {
                if (i.type === 'Sword') counts.sword++;
                if (i.type === 'Katana') counts.katana++;
                if (i.type === 'Greatsword') counts.great++;
                if (i.type === 'Dual Blade') counts.dual++;
            }
        });
        
        let html = `
        <div class="wiki-hud-container">
            <div class="hud-featured-showcase" style="border: 1px solid ${featuredColor}44; position: relative;">
                
                <button class="hud-how-to-get-btn" onclick="window.openObtainmentModal('${encodeURIComponent(JSON.stringify(featuredItem))}')" 
                        style="position: absolute; top: 15px; right: 15px; background:#333; color:#fff; border:none; padding:8px 16px; font-weight:bold; font-size:11px; border-radius:4px; cursor:pointer; text-transform:uppercase; z-index: 10;">
                    HOW TO GET
                </button>

                <button class="hud-view-page-btn" onclick="window.location.href='/wiki/${encodeURIComponent(featuredItem.name)}'"
                        style="position: absolute; bottom: 15px; right: 15px; z-index: 10;">
                    VIEW PAGE
                </button>

                <div class="featured-left-graphic" style="background: radial-gradient(circle, ${featuredColor}25 0%, transparent 70%);">
                    <img src="${getFandomImageUrl(featuredItem.image)}" alt="${featuredItem.name}" />
                </div>
                <div class="featured-right-info" style="padding-right: 120px;"> <span class="featured-tag" style="background: ${featuredColor}22; color: ${featuredColor};">★ FEATURED ${itemType.toUpperCase()}</span>
                    <h2 style="color: ${featuredColor};">${featuredItem.name}</h2>
                    <span class="featured-rarity-label" style="color: ${featuredColor};">${featuredItem.Rarity} RANK</span>
                    <p class="featured-desc">${featuredItem.description}</p>
                    
                    <div class="featured-stats-row">
                        <div><span>📊 LEVEL</span><strong>${featuredItem.level}</strong></div>
                        <div><span>💀 DROPPED BY</span><strong>${featuredItem.source}</strong></div>
                        <div><span>📍 LOCATION</span><strong>${featuredItem.Sea === 1 ? 'First Sea' : featuredItem.Sea === 2 ? 'Second Sea' : 'Third Sea'}</strong></div>
                    </div>
                </div>
            </div>

            <div class="hud-controls-filter-bar">
                <div class="filter-inputs-group">
                    <select class="hud-filter-trigger" data-field="sea">
                        <option value="${isAccessory ? 'AllSeas' : 'AllSeasS'}" ${state.sea.includes('All') ? 'selected' : ''}>All Seas</option>
                        <option value="1" ${state.sea === '1' ? 'selected' : ''}>First Sea</option>
                        <option value="2" ${state.sea === '2' ? 'selected' : ''}>Second Sea</option>
                        <option value="3" ${state.sea === '3' ? 'selected' : ''}>Third Sea</option>
                    </select>
                    <select class="hud-filter-trigger" data-field="rarity">
                        <option value="${isAccessory ? 'AllRarities' : 'AllRaritiesS'}" ${state.rarity.includes('All') ? 'selected' : ''}>All Rarities</option>
                        <option value="Mythical" ${state.rarity === 'Mythical' ? 'selected' : ''}>Mythical</option>
                        <option value="Legendary" ${state.rarity === 'Legendary' ? 'selected' : ''}>Legendary</option>
                        <option value="Epic" ${state.rarity === 'Epic' ? 'selected' : ''}>Epic</option>
                        <option value="Rare" ${state.rarity === 'Rare' ? 'selected' : ''}>Rare</option>
                        <option value="Uncommon" ${state.rarity === 'Uncommon' ? 'selected' : ''}>Uncommon</option>
                        <option value="Common" ${state.rarity === 'Common' ? 'selected' : ''}>Common</option>
                    </select>
                    ${!isAccessory ? `
                    <select class="hud-filter-trigger" data-field="type">
                        <option value="AllTypes" ${state.type === 'AllTypes' ? 'selected' : ''}>All Types</option>
                        <option value="Sword" ${state.type === 'Sword' ? 'selected' : ''}>Sword</option>
                        <option value="Katana" ${state.type === 'Katana' ? 'selected' : ''}>Katana</option>
                        <option value="Greatsword" ${state.type === 'Greatsword' ? 'selected' : ''}>Greatsword</option>
                        <option value="Dual Blade" ${state.type === 'Dual Blade' ? 'selected' : ''}>Dual Blade</option>
                    </select>` : ''}
                    <div class="hud-search-box-wrapper">
                        <input type="text" class="hud-search-trigger" placeholder="Search ${itemType.toLowerCase()}s..." value="${state.query}">
                        <span class="hud-search-icon">🔍</span>
                    </div>
                </div>
                <div class="results-counter-hud">Found ${data.length} ${itemType.toLowerCase()}s</div>
            </div>

            <div class="hud-main-split">
                <div class="hud-left-grid-column">
        `;

        if (data.length === 0) {
            html += `<p class="hud-no-results-msg">No entries found matching your criteria.</p>`;
        } else {
            html += data.map(item => {
                const color = uiStyles.rarityColors[item.Rarity] || '#9e9e9e';
                const isSelected = item.name === featuredItem.name;
                
                return `
                <div class="hud-item-card ${isSelected ? 'active-hud-selection' : ''}" data-name="${encodeURIComponent(item.name)}" style="border: 1px solid ${isSelected ? color : color + '44'}; background-color: ${isSelected ? '#171923' : '#12141c'};">
                    <div class="card-header-tier">
                        <span style="color: ${color};">★ ${item.Rarity.toUpperCase()}</span>
                        <span class="card-star-fav">${isSelected ? '★' : '☆'}</span>
                    </div>
                    <div class="card-image-wrap">
                        <img src="${getFandomImageUrl(item.image)}" alt="${item.name}" />
                    </div>
                    <div class="card-item-title">${item.name}</div>
                    <div class="card-footer-stats">
                        <span>📊 ${item.level}</span>
                        <span>💀 ${item.source}</span>
                    </div>
                </div>
                `;
            }).join('');
        }

        html += `
                </div>

                <div class="hud-right-sidebar-column">
                    <div class="sidebar-widget">
                        <h3>RARITY GUIDE</h3>
                        <div class="widget-row"><span style="color:#ff3333; font-weight:bold;">Mythical</span><span>5%</span></div>
                        <div class="widget-row"><span style="color:#ffac38; font-weight:bold;">Legendary</span><span>15%</span></div>
                        <div class="widget-row"><span style="color:#ab47bc; font-weight:bold;">Epic</span><span>25%</span></div>
                        <div class="widget-row"><span style="color:#2196f3; font-weight:bold;">Rare</span><span>30%</span></div>
                        <div class="widget-row"><span style="color:#4caf50; font-weight:bold;">Uncommon</span><span>20%</span></div>
                        <div class="widget-row"><span style="color:#9e9e9e; font-weight:bold;">Common</span><span>5%</span></div>
                    </div>

                    <div class="sidebar-widget">
                        <h3>SEAS</h3>
                        <div class="widget-row"><span>🌐 First Sea</span><strong>${counts.sea1}</strong></div>
                        <div class="widget-row"><span>🌐 Second Sea</span><strong>${counts.sea2}</strong></div>
                        <div class="widget-row"><span>🌐 Third Sea</span><strong>${counts.sea3}</strong></div>
                    </div>

                    ${!isAccessory ? `
                    <div class="sidebar-widget">
                        <h3>TYPES</h3>
                        <div class="widget-row"><span>⚔️ Sword</span><strong>${counts.sword}</strong></div>
                        <div class="widget-row"><span>⚔️ Katana</span><strong>${counts.katana}</strong></div>
                        <div class="widget-row"><span>⚔️ Greatsword</span><strong>${counts.great}</strong></div>
                        <div class="widget-row"><span>⚔️ Dual Blade</span><strong>${counts.dual}</strong></div>
                    </div>` : ''}
                    <button class="hud-sidebar-action-footer-btn open-modal-trigger" data-type="${itemType}">
                    ⚔️ VIEW ALL ${itemType === 'Accessory' ? 'ACCESSORIES' : 'SWORDS'}
                    </button>
                </div>
            </div>
        </div>
        `;

        $container.html(html);

        const $input = $container.find('.hud-search-trigger');
        if ($input.length && state.query) {
            const el = $input[0];
            el.focus();
            const len = el.value.length;
            el.setSelectionRange(len, len);
        }
    }

    mw.hook('wikipage.content').add(function($content) {
        const $accDiv = $content.find('#accessoriesBackground');
        const $swdDiv = $content.find('#swordsBackground');
        const $titleDiv = $content.find('#titles-wiki-app-root'); // Add this
        
        if ($titleDiv.length) {
        // You would need to add logic here to render your content 
        // into #titles-wiki-app-root
        console.log("Titles app root found!");
		 }

        if ($accDiv.length) {
            $accDiv.css({"background":"none","border":"none","padding":"0"});
            
            $accDiv.off('change', '.hud-filter-trigger').on('change', '.hud-filter-trigger', function() {
                filterStates.Accessory[$(this).data('field')] = $(this).val();
                processFilterAction('Accessory', '#accessoriesBackground');
            });
            $accDiv.off('input', '.hud-search-trigger').on('input', '.hud-search-trigger', function() {
                filterStates.Accessory.query = $(this).val();
                processFilterAction('Accessory', '#accessoriesBackground');
            });
            $accDiv.off('click', '.hud-item-card').on('click', '.hud-item-card', function() {
                const targetName = decodeURIComponent($(this).data('name'));
                selectedItems.Accessory = Accessories.find(i => i.name === targetName);
                processFilterAction('Accessory', '#accessoriesBackground');
            });

            processFilterAction('Accessory', '#accessoriesBackground');
        }

        if ($swdDiv.length) {
            $swdDiv.css({"background":"none","border":"none","padding":"0"});

            $swdDiv.off('change', '.hud-filter-trigger').on('change', '.hud-filter-trigger', function() {
                filterStates.Sword[$(this).data('field')] = $(this).val();
                processFilterAction('Sword', '#swordsBackground');
            });
            $swdDiv.off('input', '.hud-search-trigger').on('input', '.hud-search-trigger', function() {
                filterStates.Sword.query = $(this).val();
                processFilterAction('Sword', '#swordsBackground');
            });
            $swdDiv.off('click', '.hud-item-card').on('click', '.hud-item-card', function() {
                const targetName = decodeURIComponent($(this).data('name'));
                selectedItems.Sword = Swords.find(i => i.name === targetName);
                processFilterAction('Sword', '#swordsBackground');
            });

            processFilterAction('Sword', '#swordsBackground');
        }
    });
    
  // Updated Listener with Debugging
$(document).on('click', '.open-modal-trigger', function(e) {
    e.preventDefault(); // Stop any default link behavior
    
    const itemType = $(this).data('type');
    console.log("Trigger clicked for:", itemType); // Check console for this
    
    const dataset = (itemType === 'Accessory') ? Accessories : Swords;
    
    if (typeof openAllItemsModal === 'function') {
        openAllItemsModal(itemType, dataset);
        console.log("Modal function called");
    } else {
        console.error("openAllItemsModal is not defined!");
    }
});
})(window.jQuery, window.mediaWiki);
/*AFTER SWORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* -------------------------------------------------------------------------------------TITLES -----------------------------------------------------------------------------------------------*/

$(document).ready(function () {
    // Only execute if our target canvas app root exists on the current page
    if (!$('#titles-wiki-app-root').length) return;

    // --- FULL DATA ARCHIVE FROM WIKI DOCUMENTATION ---
    const titlesData = [
        // Level
        { title: "Sailor", color: "Pastel Yellow", category: "Level", hex: "#ffd166", desc: "Reach Level 500", req: "Obtain 10 Titles", progress: "0 / 500", locked: false },
        { title: "Explorer", color: "Brown", category: "Level", hex: "#b5835a", desc: "Reach Level 1,000", req: "Obtain 20 Titles", progress: "0 / 1000", locked: false },
        { title: "Voyager", color: "Light Purple", category: "Level", hex: "#c8b6ff", desc: "Reach Level 2,000", req: "Obtain 30 Titles", progress: "0 / 2000", locked: false },
        { title: "Bold", color: "Gray", category: "Level", hex: "#adb5bd", desc: "Reach Level 3,000", req: "Obtain 40 Titles", progress: "0 / 3000", locked: false },
        { title: "Pioneer", color: "Orange", category: "Level", hex: "#f77f00", desc: "Reach Level 4,000", req: "Obtain 50 Titles", progress: "0 / 4000", locked: false },

        // Collector
        { title: "P2W", color: "Pastel Yellow", category: "Collector", hex: "#ffd166", desc: "Own 5+ gamepasses", req: "Obtain 10 Titles", progress: "0 / 5", locked: false },
        { title: "Gift Collector", color: "Brown", category: "Collector", hex: "#b5835a", desc: "Collect the final gift in playtime rewards", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Sword Collector", color: "Light Purple", category: "Collector", hex: "#c8b6ff", desc: "Collect 20 swords", req: "Obtain 30 Titles", progress: "0 / 20", locked: false },
        { title: "Doughnut Collector", color: "Gray", category: "Collector", hex: "#adb5bd", desc: "Have 50 Doughnuts in your inventory", req: "Obtain 40 Titles", progress: "0 / 50", locked: false },
        { title: "Accessory Collector", color: "Orange", category: "Collector", hex: "#f77f00", desc: "Collect at least 23 accessories", req: "Obtain 50 Titles", progress: "0 / 23", locked: false },
        { title: "Title Collector", color: "Pastel Yellow", category: "Collector", hex: "#ffd166", desc: "Collect at least 20 titles", req: "Obtain 10 Titles", progress: "0 / 20", locked: false },
        { title: "Colorbearer", color: "Brown", category: "Collector", hex: "#b5835a", desc: "Unlock a Haki Color!", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Aura Seeker", color: "Light Purple", category: "Collector", hex: "#c8b6ff", desc: "Unlock 12 Haki Colors!", req: "Obtain 30 Titles", progress: "0 / 12", locked: false },
        { title: "LGBTQ", color: "Green", category: "Collector", hex: "#2ec4b6", desc: "Collect at least 100 titles", req: "Obtain 100 Titles", progress: "0 / 100", locked: false },
        { title: "Bearer of Dark Pacts", color: "Mint", category: "Collector", hex: "#99eedf", desc: "Obtain demon spawner", req: "Obtain 60 Titles", progress: "0 / 1", locked: false },
        { title: "Scale Hunter", color: "Yellow", category: "Collector", hex: "#ffeb3b", desc: "Roll for 5 dragon skins", req: "Obtain 70 Titles", progress: "0 / 5", locked: false },
        { title: "The Chromatic Dragon", color: "Deep Purple", category: "Collector", hex: "#7209b7", desc: "Roll for 20 dragon skins", req: "Obtain 80 Titles", progress: "0 / 20", locked: false },

        // Unlock
        { title: "D. Clan", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock D. Clan race", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Adventurer", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Sea 2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Gear 4th!", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken G4", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Joyboy", color: "Red", category: "Unlock", hex: "#ef476f", desc: "Awaken G5 completely", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Fleshbound", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock Human V2", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Feral", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Beastborne V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Tideborn", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Unlock Fishborne V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Celestial", color: "Gray", category: "Unlock", hex: "#adb5bd", desc: "Unlock Skyborne V2", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Shadowborn", color: "Orange", category: "Unlock", hex: "#f77f00", desc: "Unlock Demon V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Dragonkin", color: "Mint", category: "Unlock", hex: "#99eedf", desc: "Unlock Dragonborne V2", req: "Obtain 60 Titles", progress: "0 / 1", locked: false },
        { title: "Guardian Of Humanity", color: "Yellow", category: "Unlock", hex: "#ffeb3b", desc: "Unlock D.Clan V2", req: "Obtain 70 Titles", progress: "0 / 1", locked: false },
        { title: "The Uncharted", color: "Deep Purple", category: "Unlock", hex: "#7209b7", desc: "Unlock Sea 3", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Edge Sovereign", color: "Blue", category: "Unlock", hex: "#4361ee", desc: "Reach Max Mastery (Level 500) on any Sword.", req: "Obtain 90 Titles", progress: "0 / 500", locked: false },
        { title: "Archon of Power", color: "Green", category: "Unlock", hex: "#2ec4b6", desc: "Reach Max Mastery (Level 500) on any Fruit.", req: "Obtain 100 Titles", progress: "0 / 500", locked: false },
        { title: "Supreme Brawler", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Reach Max Mastery (Level 500) on any Fighting Style.", req: "Obtain 10 Titles", progress: "0 / 500", locked: false },
        { title: "Avatar of Combat", color: "Red", category: "Unlock", hex: "#ef476f", desc: "Reach Max Mastery on at least 5 Fighting Styles.", req: "Obtain 110 Titles", progress: "0 / 5", locked: false },
        { title: "Warlord of Blades", color: "Pink", category: "Unlock", hex: "#ff0a54", desc: "Reach Max Mastery on at least 5 Swords.", req: "Obtain 120 Titles", progress: "0 / 5", locked: false },
        { title: "Harbinger of Power", color: "Black", category: "Unlock", hex: "#1e1e24", desc: "Reach Max Mastery on at least 5 Fruits.", req: "Obtain 130 Titles", progress: "0 / 5", locked: false },
        { title: "Thunderlord", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Electro V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Steel Titan", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Unlock Cyborg V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Tidal Striker", color: "Gray", category: "Unlock", hex: "#adb5bd", desc: "Unlock Fishman V2", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Leg of Fury", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock Black Leg V2", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dragonic Master", color: "Orange", category: "Unlock", hex: "#f77f00", desc: "Unlock Dragon Claw V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Master of the Styles", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock 5 Fighting Styles", req: "Obtain 10 Titles", progress: "0 / 5", locked: false },
        { title: "Grandmaster of the Styles", color: "Mint", category: "Unlock", hex: "#99eedf", desc: "Evolve 5 Fighting Styles to V2", req: "Obtain 60 Titles", progress: "0 / 5", locked: false },
        { title: "The One Who Found Him", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Find and make a deal with the traveling merchant", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Black Market Hunter", color: "Yellow", category: "Unlock", hex: "#ffeb3b", desc: "Find and make a deal 10 times with the traveling merchant", req: "Obtain 70 Titles", progress: "0 / 10", locked: false },
        { title: "Touched the Forge", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Craft 5 things from Doran the Forge", req: "Obtain 20 Titles", progress: "0 / 5", locked: false },
        { title: "First Ascension", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken at least one skill of any fruit", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Master of Ascension", color: "Deep Purple", category: "Unlock", hex: "#7209b7", desc: "Awaken at least 4 fruits entirely", req: "Obtain 80 Titles", progress: "0 / 4", locked: false },
        { title: "Dragon Scales", color: "Blue", category: "Unlock", hex: "#4361ee", desc: "Awaken Dragon Hybrid entirely", req: "Obtain 90 Titles", progress: "0 / 1", locked: false },
        { title: "Gear Second!", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Awaken Gear 2nd for Gum fruit", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "God Of Thunder", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken Electricity Fruit entirely", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Money
        { title: "Non-Brokey", color: "Pastel Yellow", category: "Money", hex: "#ffd166", desc: "Have 5M$+", req: "Obtain 10 Titles", progress: "0 / 5M", locked: false },
        { title: "RICH", color: "Gray", category: "Money", hex: "#adb5bd", desc: "Have 10M$+", req: "Obtain 40 Titles", progress: "0 / 10M", locked: false },
        { title: "RICHEST", color: "Deep Purple", category: "Money", hex: "#7209b7", desc: "Have 50M$+", req: "Obtain 80 Titles", progress: "0 / 50M", locked: false },

        // Bounty
        { title: "Bounty Hunter", color: "Pastel Yellow", category: "Bounty", hex: "#ffd166", desc: "Gain 1M+ Bounty", req: "Obtain 10 Titles", progress: "0 / 1M", locked: false },
        { title: "Sea Tyrant", color: "Light Purple", category: "Bounty", hex: "#c8b6ff", desc: "Gain 3M+ Bounty", req: "Obtain 30 Titles", progress: "0 / 3M", locked: false },
        { title: "Sea Warlord", color: "Yellow", category: "Bounty", hex: "#ffeb3b", desc: "Gain 10M+ Bounty", req: "Obtain 70 Titles", progress: "0 / 10M", locked: false },
        { title: "Sea Emperor", color: "Red", category: "Bounty", hex: "#ef476f", desc: "Gain 20M+ Bounty", req: "Obtain 110 Titles", progress: "0 / 20M", locked: false },

        // Kills
        { title: "Beast Slayer", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat a Sea Beast", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dragon Slayer", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat the Dragon Boss", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Beast Overlord", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Defeat 50 Sea Beasts", req: "Obtain 50 Titles", progress: "0 / 50", locked: false },
        { title: "Strong Swordsman", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat the Dark Blade Boss", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Dough Slayer", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat the Dough Boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dreadful Shogun", color: "Gray", category: "Kills", hex: "#adb5bd", desc: "Defeat the Enma Boss", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Flame Fist", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat Fire Fist boss once", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Earthshaker", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat Tremor Girl", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Bonebreaker", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat Mace Boss in Sea 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Bladebreaker", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat Dual Swordsman once", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Fallen Challenger", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Die to any superboss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Subjugated", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Die to any island boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Phantom Hunter", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat 1 Ghost Ship", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Reaper of Lost Souls", color: "Yellow", category: "Kills", hex: "#ffeb3b", desc: "Defeat 10 Ghost Ships", req: "Obtain 70 Titles", progress: "0 / 10", locked: false },
        { title: "Hybrid Slayer", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat dragon hybrid boss", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "God's Judgement", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat Raijin Boss", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Authority Denied", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Defeat Saturn Boss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Dominion Over Red", color: "Green", category: "Kills", hex: "#2ec4b6", desc: "Defeat Red Emperor", req: "Obtain 100 Titles", progress: "0 / 1", locked: false },
        { title: "Slayer of the Abyss", color: "Deep Purple", category: "Kills", hex: "#7209b7", desc: "Defeat Cthulhu", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Emperor of the Abyss", color: "Red", category: "Kills", hex: "#ef476f", desc: "Defeat Cthulhu 10 times", req: "Obtain 110 Titles", progress: "0 / 10", locked: false },

        // Death
        { title: "Disgrace", color: "Pastel Yellow", category: "Death", hex: "#ffd166", desc: "Die to a Boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dishonored", color: "Orange", category: "Death", hex: "#f77f00", desc: "Die to a Super Boss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },

        // PVP
        { title: "Demonitizator", color: "Orange", category: "PVP", hex: "#f77f00", desc: "Defeat a Player with Content Creator title", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Admin Slayer", color: "Red", category: "PVP", hex: "#ef476f", desc: "Defeat a developer or staff", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Ruthless", color: "Pastel Yellow", category: "PVP", hex: "#ffd166", desc: "Have 10 player kills", req: "Obtain 10 Titles", progress: "0 / 10", locked: false },
        { title: "PKer", color: "Deep Purple", category: "PVP", hex: "#7209b7", desc: "Have 200 player kills!", req: "Obtain 80 Titles", progress: "0 / 200", locked: false },

        // Fishing
        { title: "Fisherman", color: "Pastel Yellow", category: "Fishing", hex: "#ffd166", desc: "Catch 100 Fishes", req: "Obtain 10 Titles", progress: "0 / 100", locked: false },
        { title: "Mythical Fisher", color: "Red", category: "Fishing", hex: "#ef476f", desc: "Catch a Mythical Fish", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },

        // Playtime
        { title: "Dedicated", color: "Light Purple", category: "Playtime", hex: "#c8b6ff", desc: "Have 100 hours playtime on Haze Seas", req: "Obtain 30 Titles", progress: "0 / 100h", locked: false },
        { title: "No-Life", color: "Red", category: "Playtime", hex: "#ef476f", desc: "Have 1,000 hours playtime on Haze Seas", req: "Obtain 110 Titles", progress: "0 / 1000h", locked: false },

        // Gems
        { title: "Gem Collector", color: "Pastel Yellow", category: "Gems", hex: "#ffd166", desc: "Have 1,000 Gems", req: "Obtain 10 Titles", progress: "0 / 1000", locked: false },
        { title: "Gem Hoarder", color: "Deep Purple", category: "Gems", hex: "#7209b7", desc: "Have 10,000 Gems", req: "Obtain 80 Titles", progress: "0 / 10000", locked: false },

        // Trade
        { title: "Trader", color: "Pastel Yellow", category: "Trade", hex: "#ffd166", desc: "Complete a trade atleast once", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "The Trader", color: "Green", category: "Trade", hex: "#2ec4b6", desc: "Complete 100 trades successfully", req: "Obtain 100 Titles", progress: "0 / 100", locked: false },

        // Event
        { title: "Winter 2023", color: "Light Purple", category: "Event", hex: "#c8b6ff", desc: "Played the 2023 XMAS Event", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Achievement
        { title: "Pirate King", color: "Red", category: "Achievement", hex: "#ef476f", desc: "Be in a crew on the Top 10", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Realm Of Mythics", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Eat or use a mythical fruit atleast once.", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Gambler", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Spin for a fruit 10 times", req: "Obtain 10 Titles", progress: "0 / 10", locked: false },
        { title: "Lucky Gambler", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Spin a Mythical once", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Venom Dweller", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Have Venom Crown being a Venom Fruit User", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Plunderer", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Deal atleast 10% damage to shrine chest!", req: "Obtain 10 Titles", progress: "0 / 10%", locked: false },
        { title: "Shrine Conqueror", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Destroy 20 shrine chests!", req: "Obtain 20 Titles", progress: "0 / 20", locked: false },
        { title: "Relic Raider", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Destroy 100 shrine chests!", req: "Obtain 80 Titles", progress: "0 / 100", locked: false },
        { title: "Quest Master", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Complete all infinite quests!", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Mission Accomplished", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Complete all daily quests!", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Rogue", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Hunt 1 player successfully!", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Predator", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Hunt 10 player successfully!", req: "Obtain 20 Titles", progress: "0 / 10", locked: false },
        { title: "Bloodhound", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Hunt 50 player successfully!", req: "Obtain 50 Titles", progress: "0 / 50", locked: false },
        { title: "Apex Predator", color: "Blue", category: "Achievement", hex: "#4361ee", desc: "Hunt 500 player successfully!", req: "Obtain 90 Titles", progress: "0 / 500", locked: false },
        { title: "Prismatic Keymaster", color: "Prismatic", category: "Achievement", hex: "#ff758f", desc: "Unlock the Rainbow Haki!", req: "Forged by Doran", progress: "0 / 1", locked: false },
        { title: "Marine Officer", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Obtain 1M reputation", req: "Obtain 10 Titles", progress: "0 / 1M", locked: false },
        { title: "Marine Captain", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain 3M reputation", req: "Obtain 20 Titles", progress: "0 / 3M", locked: false },
        { title: "Marine Admiral", color: "Yellow", category: "Achievement", hex: "#ffeb3b", desc: "Obtain 10M reputation", req: "Obtain 70 Titles", progress: "0 / 10M", locked: false },
        { title: "Fleet Admiral", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain 20M reputation", req: "Obtain 120 Titles", progress: "0 / 20M", locked: false },
        { title: "Clairvoyant", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Have observation level 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "The All-Seeing", color: "Mint", category: "Achievement", hex: "#99eedf", desc: "Obtain observation level 6", req: "Obtain 60 Titles", progress: "0 / 6", locked: false },
        { title: "Ultra Instinct", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Have the ultra instinct skin", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Void-Forged Arms", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Upgrade Armament Haki to level 5", req: "Obtain 50 Titles", progress: "0 / 5", locked: false },
        { title: "Revisiting Memories", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Replay the cutscene by speaking to the fisherman in sea 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Vaultbreaker", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Open 25 Chests", req: "Obtain 20 Titles", progress: "0 / 25", locked: false },
        { title: "Treasure Hunter", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Open 250 Chests", req: "Obtain 80 Titles", progress: "0 / 250", locked: false },
        { title: "Chosen of Fate", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Open a Mythical Chest", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Lured by Loot", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Open a Mimic Chest", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "King's Fortune", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain the Ace sword from a quest reward", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Midnight Executioner", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Obtain Dark Blade V2", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Bearer of the Eternal Night", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain Dual Dark Blade", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Trinity Ascendant", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain 3 Sword Style", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Triple Blade Demon", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Obtain 3 Sword Style V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "The Skullcrusher", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain Mace V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Ocean's Wrath", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain SeaBeast Hammer V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "The Groundsplitter", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Obtain Bisento V2", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Swords of Balance", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain 2 Sword Style V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Vanquisher's Edge", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain Gryphon", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Swift Windcutter", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain Zenith", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Earned, Not Bought", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Obtain Dark Blade without paying Robux", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Ghastly Aura", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain the Ghastly Haki color from a Ghost Ship chest", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Knight of the Stagnant Abyss", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Deal the most damage to Cthulhu", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Bearer of the Abyss", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain the Abyssal Haki color", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },

        // Regular
        { title: "Swiftstep", color: "Pastel Yellow", category: "Regular", hex: "#ffd166", desc: "Unlock flashstep", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Race Reborn", color: "Brown", category: "Regular", hex: "#b5835a", desc: "Purchase any race spins for gems", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Attribute Strategist", color: "Light Purple", category: "Regular", hex: "#c8b6ff", desc: "Purchase a stat refund for gems", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Fruitless Soul", color: "Deep Purple", category: "Regular", hex: "#7209b7", desc: "Purchase a fruit reset for gems", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Title Hoarder", color: "Orange", category: "Regular", hex: "#f77f00", desc: "Collect at least 80 titles", req: "Obtain 50 Titles", progress: "0 / 80", locked: false },
        { title: "Devil's Luck", color: "Pink", category: "Regular", hex: "#ff0a54", desc: "Find and pick up a fruit that spawned naturally", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Treasure Dealer", color: "Pastel Yellow", category: "Regular", hex: "#ffd166", desc: "Purchase a fruit for $ from the fruit stock", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Windwalker", color: "Brown", category: "Regular", hex: "#b5835a", desc: "Obtain level 1 skywalk", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Despaired", color: "Orange", category: "Regular", hex: "#f77f00", desc: "Die with a fruit in your toolbar", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Ironfist", color: "Light Purple", category: "Regular", hex: "#c8b6ff", desc: "Unlock level 1 buso", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Shrine
        { title: "The MVP", color: "Pink", category: "Shrine", hex: "#ff0a54", desc: "Get a fruit from the shrine raid (meaning you did the most damage)", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Plunderer", color: "Pastel Yellow", category: "Shrine", hex: "#ffd166", desc: "defeat 1 shrine", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Conqueror", color: "Brown", category: "Shrine", hex: "#b5835a", desc: "defeat 20 shrines", req: "Obtain 20 Titles", progress: "0 / 20", locked: false },
        { title: "Relic Raider", color: "Deep Purple", category: "Shrine", hex: "#7209b7", desc: "defeat 100 shrines", req: "Obtain 80 Titles", progress: "0 / 100", locked: false },
        { title: "Drowned", color: "Orange", category: "Shrine", hex: "#f77f00", desc: "Die to shrine by drowning", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },

        // Role
        { title: "VIP", color: "Pastel Yellow", category: "Role", hex: "#ffd166", desc: "Own the VIP Gamepass!", req: "Obtain 10 Titles", progress: "1 / 1", locked: false },
        { title: "Tester", color: "Light Purple", category: "Role", hex: "#c8b6ff", desc: "Be a Tester!", req: "Obtain 30 Titles", progress: "1 / 1", locked: false },
        { title: "Content Creator", color: "Deep Purple", category: "Role", hex: "#7209b7", desc: "Be a Content Creator!", req: "Obtain 80 Titles", progress: "1 / 1", locked: false },
        { title: "Staff", color: "Locked", category: "Role", hex: "#4a525a", desc: "Be a Staff for Haze Studios!", req: "Secret Authority Rank", progress: "0 / 1", locked: true },
        { title: "DEV", color: "Locked", category: "Role", hex: "#4a525a", desc: "Get back to work!", req: "Lead Systems Developer", progress: "0 / 1", locked: true }
    ];

    // --- PAGINATION STATE VARIABLES ---
    let currentPage = 1;
    const itemsPerPage = 12; // Adjust this number if you want more/less cards per page
    let currentFilteredData = titlesData;

    // --- MAIN CORE FRAMEWORK APP STRUCTURE INJECTION ---
    let mainLayoutHtml = `
    <div class="titles-dashboard">
        <center><h1 style="margin-top:0;">Titles</h1></center>
        <p style="color: #8a929a; margin-bottom: 25px; text-align: center;">Complete challenges and earn unique titles to show off your journey across Haze Seas.</p>

        <div class="titles-section-banner" style="color: #ffffff;">Title Colors</div>
        <div class="title-colors-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 30px;">
            <div class="color-progress-card" style="border: 1px solid #ffd166; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Pastel Yellow</h4><div style="font-size:0.75em; color:#8a929a;">10 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #b5835a; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Brown</h4><div style="font-size:0.75em; color:#8a929a;">20 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #c8b6ff; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Light Purple</h4><div style="font-size:0.75em; color:#8a929a;">30 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #adb5bd; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Gray</h4><div style="font-size:0.75em; color:#8a929a;">40 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #f77f00; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Orange</h4><div style="font-size:0.75em; color:#8a929a;">50 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #99eedf; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Mint</h4><div style="font-size:0.75em; color:#8a929a;">60 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ffeb3b; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Yellow</h4><div style="font-size:0.75em; color:#8a929a;">70 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #7209b7; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Deep Purple</h4><div style="font-size:0.75em; color:#8a929a;">80 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #4361ee; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Blue</h4><div style="font-size:0.75em; color:#8a929a;">90 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #2ec4b6; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Green</h4><div style="font-size:0.75em; color:#8a929a;">100 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ef476f; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Red</h4><div style="font-size:0.75em; color:#8a929a;">110 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ff0a54; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Pink</h4><div style="font-size:0.75em; color:#8a929a;">120 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #1e1e24; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Black</h4><div style="font-size:0.75em; color:#8a929a;">130 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ff758f; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Prismatic</h4><div style="font-size:0.75em; color:#fca311;">Forge: Doran</div></div>
        </div>

        <div class="titles-section-banner" style="color: #ffffff;">Title List</div>
        <div class="titles-main-content">
            <div class="titles-left-side">
                <div class="filter-bar">
                    <select class="filter-select" id="filter-color-dropdown"></select>
                    <select class="filter-select" id="filter-category-dropdown"></select>
                    <span id="titles-counter-display" style="margin-left: auto; color:#8a929a; font-size:0.9em;">Found ${titlesData.length} titles</span>
                </div>
                
                <div class="titles-grid" id="titles-grid-hook"></div>
                
                <!-- NEW PAGINATION CONTROLS -->
                <div class="pagination-controls" style="display: flex; justify-content: center; gap: 15px; margin-top: 25px; align-items: center; background: #1c2127; padding: 10px; border-radius: 8px;">
                    <button id="prev-page-btn" style="background: #2c3239; color: #fff; border: 1px solid #4a525a; padding: 8px 20px; border-radius: 4px; cursor: pointer; transition: 0.2s;">⬅ Previous</button>
                    <span id="page-indicator" style="color: #ffffff; font-weight: bold; font-size: 1.1em;">Page 1 / 1</span>
                    <button id="next-page-btn" style="background: #2c3239; color: #fff; border: 1px solid #4a525a; padding: 8px 20px; border-radius: 4px; cursor: pointer; transition: 0.2s;">Next ➡</button>
                </div>

            </div>
            <div class="titles-sidebar" id="titles-sidebar-hook"></div>
        </div>

        <div class="info-footer-banner">
            <span style="color:#fca311; font-size:1.3em;">ⓘ</span>
            <div>Titles not only show off your achievements, but some may unlock special perks in the future!</div>
        </div>
    </div>

    <!-- FULL SCREEN INTERACTIVE MODAL OVERLAY -->
    <div id="titles-popup-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; justify-content:center; align-items:center; font-family:sans-serif;">
        <div style="background:#13171c; width:95%; max-width:700px; border:2px solid #fca311; border-radius:8px; padding:25px; max-height:85vh; overflow-y:auto; position:relative; box-shadow: 0px 0px 20px rgba(252,163,17,0.3);">
            <span id="close-titles-popup" style="position:absolute; top:12px; right:20px; color:#8a929a; font-size:28px; cursor:pointer; font-weight:bold;">&times;</span>
            <h2 style="color:#ffffff; margin-top:0; border-bottom:1px solid #222831; padding-bottom:12px; font-size:1.5em;">All Available Titles Master List</h2>
            <div id="popup-list-content-hook" style="display:flex; flex-direction:column; gap:12px; margin-top:15px;"></div>
        </div>
    </div>`;

    $('#titles-wiki-app-root').html(mainLayoutHtml);

    // --- GENERATE ALL AVAILABLE DROP DOWN SELECT TARGET FILTERS ---
    let uniqueColors = new Set(['All Colors']);
    let uniqueCategories = new Set(['All Categories']);
    titlesData.forEach(item => {
        if (!item.locked) uniqueColors.add(item.color);
        uniqueCategories.add(item.category);
    });
    let colorOpts = '';
    uniqueColors.forEach(c => colorOpts += `<option value="${c}">${c}</option>`);
    $('#filter-color-dropdown').html(colorOpts);

    let catOpts = '';
    uniqueCategories.forEach(cat => catOpts += `<option value="${cat}">${cat}</option>`);
    $('#filter-category-dropdown').html(catOpts);

    // --- CARDS SYSTEM ENGINE WITH PAGINATION ---
    function renderCardsGrid(filteredItems) {
        currentFilteredData = filteredItems;
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
        
        // Failsafe bounds
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        // Slice array based on current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredItems.slice(startIndex, endIndex);

        let gridHtml = '';
        pageItems.forEach((item) => {
            // Find global index so the right sidebar works no matter the page
            let globalIndex = titlesData.findIndex(t => t.title === item.title);
            
            if (item.locked) {
                gridHtml += `
                <div class="title-card locked" data-index="${globalIndex}">
                    <div>
                        <span style="color:#4a525a; font-size:1.2em;">★</span>
                        <h3>${item.title}</h3>
                        <span class="badge">Locked</span>
                        <div class="desc">${item.desc}</div>
                    </div>
                    <button class="view-btn" style="background:#2c3239; color:#8a929a;" disabled>🔒 Locked</button>
                </div>`;
            } else {
                gridHtml += `
                <div class="title-card unlocked" style="--theme-color: ${item.hex}; border-color: ${item.hex};" data-index="${globalIndex}">
                    <div>
                        <span style="color:${item.hex}; font-size:1.2em;">★</span>
                        <h3 style="color: ${item.hex};">${item.title}</h3>
                        <span class="badge" style="background: ${item.hex}; color: #000;">${item.color}</span>
                        <div class="desc">${item.desc}</div>
                    </div>
                    <button class="view-btn" style="background: var(--theme-color);">View Details</button>
                </div>`;
            }
        });
        
        $('#titles-grid-hook').html(gridHtml);
        $('#titles-counter-display').text(`Found ${filteredItems.length} titles`);
        
        // Update pagination UI numbers & buttons
        $('#page-indicator').text(`Page ${currentPage} / ${totalPages}`);
        $('#prev-page-btn').prop('disabled', currentPage === 1).css('opacity', currentPage === 1 ? '0.4' : '1');
        $('#next-page-btn').prop('disabled', currentPage === totalPages).css('opacity', currentPage === totalPages ? '0.4' : '1');
    }

    // --- PROFILE ROW BAR INSPECTOR SYSTEM ENGINE ---
    function updateInspectorPanel(item) {
        let inspectorHtml = `
        <div class="sidebar-preview-card" id="sidebar-preview-card" style="border-color: ${item.hex};">
            <span style="color:${item.hex}; font-size: 2em;">★</span>
            <h2 style="color:${item.hex}; margin: 10px 0 5px 0;">${item.title}</h2>
            <span class="badge" style="background:${item.hex}; color:black; padding:4px 12px;">${item.color}</span>
            <p style="font-size:0.85em; color:#b0b5bc; margin-top:15px;">${item.desc}</p>
        </div>
        <div class="sidebar-info-row"><div class="sidebar-label">🎨 Display Color</div><div class="sidebar-value" style="color:${item.hex};">${item.color}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">🎯 How To Obtain</div><div class="sidebar-value">${item.desc}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">⭐ Color Unlock Requirement</div><div class="sidebar-value" style="color:${item.hex};">${item.req}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">🗂️ Category</div><div class="sidebar-value">${item.category}</div></div>
        
        <button class="view-btn open-titles-popup-trigger" style="width:100%; padding:10px; margin-top:10px;">See All Titles</button>`;
        
        $('#titles-sidebar-hook').html(inspectorHtml);
    }

    // Startup Init Execution
    renderCardsGrid(titlesData);
    updateInspectorPanel(titlesData[0]);

    // --- ROUTER ENGINE FOR CLICK LOGIC CONTROLS ---

    // Filters
    $('.filter-select').on('change', function() {
        const selColor = $('#filter-color-dropdown').val();
        const selCat = $('#filter-category-dropdown').val();
        let filtered = titlesData.filter(item => {
            return (selColor === 'All Colors' || item.color === selColor) && (selCat === 'All Categories' || item.category === selCat);
        });
        
        currentPage = 1; // Reset to page 1 on new filter
        renderCardsGrid(filtered);
    });

    // Pagination Buttons
    $(document).on('click', '#prev-page-btn', function() {
        if (currentPage > 1) {
            currentPage--;
            renderCardsGrid(currentFilteredData);
        }
    });

    $(document).on('click', '#next-page-btn', function() {
        const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderCardsGrid(currentFilteredData);
        }
    });

    // Sidebar view click
    $(document).on('click', '.title-card .view-btn', function(e) {
        e.preventDefault();
        let idx = $(this).closest('.title-card').attr('data-index');
        if (idx !== undefined) updateInspectorPanel(titlesData[idx]);
    });

    // --- MASTER POPUP GENERATOR HOOK LOGIC ---
    $(document).on('click', '.open-titles-popup-trigger', function(e) {
        e.preventDefault();
        let listHtml = '';
        titlesData.forEach(item => {
            listHtml += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1c2127; padding:12px 15px; border-radius:6px; border-left:4px solid ${item.hex};">
                <div>
                    <strong style="color:${item.hex}; font-size:1.05em; display:block;">★ ${item.title}</strong>
                    <span style="font-size:0.8em; color:#8a929a;">Category: ${item.category} | Color: ${item.color}</span>
                </div>
                <div style="text-align:right; max-width:65%;">
                    <div style="font-size:0.85em; color:#ffffff;">${item.desc}</div>
                </div>
            </div>`;
        });
        $('#popup-list-content-hook').html(listHtml);
        $('#titles-popup-modal').css('display', 'flex');
    });

    $(document).on('click', '#close-titles-popup', function() {
        $('#titles-popup-modal').css('display', 'none');
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#titles-popup-modal')) {
            $('#titles-popup-modal').css('display', 'none');
        }
    });
});
/* Time to get back on Races*/

$(document).ready(function() {
    // 1. Race Data (Updated with exact V2 Table Data as arrays for bullets)
    const raceContent = {
        "Human": { 
            image: "Human_Neon.png", themeColor: "#ced6d9", rarity: "Common", desc: "Well-balanced with no major weakness.",
            v1: ["+25% Walk Speed under 70% health"], 
            v2: ["+1 Observation Haki", "+50% Walk Speed under 70% health"], 
            v3: ["Special ability recovers up to 4 Observation Haki dodges instantly.", "Hell circle summoning when dashing"] 
        },
        "BeastBorne": { 
            image: "Beastborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Enhanced senses and instincts.",
            v1: ["+20% Walk Speed", "+5% Stamina"], 
            v2: ["+50% Walk Speed", "+10% Stamina"], 
            v3: ["Special ability gives player 3x speed boost for 7 seconds.", "Hell circle summoning ability when dashing"] 
        },
        "Skyborne": { 
            image: "Skyborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Blessed by the skies, agile and swift.",
            v1: ["First Skywalk is 50% more powerful"], 
            v2: ["First Skywalk is now 2x more powerful.", "Player now has glide ability (Hold Space to fall slower)"], 
            v3: ["Special ability recovers up to 100 Stamina instantly and doubles Sky Jump distance for 7 seconds.", "Hellfire summoning circle ability when dashing"] 
        },
        "Fishborne": { 
            image: "Fishborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Born to thrive in the waters.",
            v1: ["+50% Swim Speed"], 
            v2: ["Water immunity (fruit users)", "x2 Walk Speed for 4 seconds when coming out of the water", "100% Swim Speed"], 
            v3: ["Special ability heals 25% of the player's maximum health for 7 seconds.", "Hellfire circle summoning when dashing"] 
        },
        "Demon": { 
            image: "Demon_Neon.png", themeColor: "#a60cc4", rarity: "Rare", desc: "Wield destructive power from the darkness.",
            v1: ["+2.5% Life Steal"], 
            v2: ["+3% Life Steal", "+10% Hellfire circle chance"], 
            v3: ["+20% Life Steal for 7 seconds (but drains 100 Stamina).", "Hellfire circle summoning ability when dashing"] 
        },
        "Dragonborne": { 
            image: "Dragonborne_Neon.png", themeColor: "#e0dd0b", rarity: "Legendary", desc: "Descendants of dragons with immense power.",
            v1: ["+10% Health", "+10% Health Regeneration", "First Skywalk is 25% more powerful"], 
            v2: ["+20% Health", "+10% Health Regeneration", "+50% Walk Speed under 50% health", "Glide ability (Hold Space to fall slower)"], 
            v3: ["Gets a 25% Max Health shield for 7 seconds.", "+50% Speed boost while under 50% HP.", "Hellfire summoning circle ability when dashing"] 
        },
        "D.Clan": { 
            image: "DClan_Neon.png", themeColor: "#e80707", rarity: "Mythical", desc: "Members of an ancient and secret clan.",
            v1: ["+5% Stamina", "+5% Health", "Free Conqueror's Haki (cost 250 Stamina)"], 
            v2: ["+10% Stamina", "+10% Health", "Conqueror's Haki cost 50 less Stamina (cost 200 Stamina)", " + 1 Conqueror's Spirit"], 
            v3: ["Damage amplification by 25% for 7 seconds.", "Conqueror's Haki cost 0 Stamina if ability is in use.", "Hellfire summoning circle when dashing"] 
        }
    };

    const container = $('#race-info');
    if (!container.length) return;
    
    // 2. Build the Top Selectors (Fixed variable name to --theme-color)
    let html = `
        <div class="version-selector-container">
            <div class="ver-btn active" data-ver="v1" style="--theme-color: #ffe100;">
                <div class="ver-btn-top"><div class="ver-icon">V1</div>
                <div class="ver-text"><h4>OVERVIEW</h4><p>Basic overview of each race.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">Cards & Buffs</span></div>
            </div>
            <div class="ver-btn" data-ver="v2" style="--theme-color: #04ff00;"> <div class="ver-btn-top"><div class="ver-icon">V2</div>
                <div class="ver-text"><h4>DETAILED</h4><p>How to obtain and key details.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">All in V1 + Obtaining</span></div>
            </div>
            <div class="ver-btn" data-ver="v3" style="--theme-color: #b042ff;">
                <div class="ver-btn-top"><div class="ver-icon">V3</div>
                <div class="ver-text"><h4>COMPLETE</h4><p>Full breakdown with stats.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">All in V2 + Values & More</span></div>
            </div>
        </div>
        <div id="dynamic-race-view"></div>`; // Container that changes based on click
    
    container.html(html);

    // --- Render Functions ---
    
    // Renders the Grid of Cards (For V1 and V3)
    function renderCardGrid(version) {
        let gridHtml = `<div class="hz-race-grid">`;
        for (let race in raceContent) {
            let d = raceContent[race];
            let buffs = d[version].map(b => `<li>${b}</li>`).join("");
            gridHtml += `
                <div class="hz-race-card" style="--theme-color: ${d.themeColor};">
                    <div class="hz-card-top">
                        <div class="hz-card-image"><img src="/Special:FilePath/${d.image}" onerror="this.style.display='none'"></div>
                        <div class="hz-card-title-area">
                            <h3 class="hz-card-title">${race}</h3>
                            <span class="hz-badge ${d.rarity.toLowerCase()}">${d.rarity}</span>
                        </div>
                    </div>
                    <div class="hz-desc">${d.desc}</div>
                    <div class="hz-divider"></div>
                    <ul class="hz-buff-list">${buffs}</ul>
                </div>`;
        }
        gridHtml += `</div>`;
        $('#dynamic-race-view').html(gridHtml);
    }

    // Renders the Specific V2 Dashboard (From Image #2)
    function renderV2Dashboard() {
        let dashHtml = `
        <div class="hz-v2-dashboard">
            <h3 class="hz-section-title">HOW TO OBTAIN RACE V2</h3>
            <div class="hz-obtain-panel">
                <div class="hz-npc-box">
                    <img src="/Special:FilePath/BloodlineScientist.png" onerror="this.style.display='none'">
                    <p>Talk to the <br><span class="hz-gold-text">Bloodline Scientist</span><br>to do quests.</p>
                </div>
                <div class="hz-quest-box">
                    <div class="hz-quest-item"><span class="q-num">1</span> <div class="q-text"><strong>QUEST 1</strong><br>Defeat a sea beast.</div></div>
                    <div class="hz-quest-item"><span class="q-num">2</span> <div class="q-text"><strong>QUEST 2</strong><br>Collect 50 Chests around the map.</div></div>
                    <div class="hz-quest-item"><span class="q-num">3</span> <div class="q-text"><strong>QUEST 3</strong><br>Defeat Zenith Boss (he only spawns during a storm at the Shadow Island).</div></div>
                </div>
                <div class="hz-req-box">
                    <div class="hz-req-title">REQUIREMENT</div>
                    <div class="hz-req-cost"><span style="color:#2ecc71;">💵 $1,000,000</span><br><span style="color:#9b59b6;">💎 100 Gems</span></div>
                    <div class="hz-req-title" style="margin-top:15px;">REWARD</div>
                    <div class="hz-reward-icon">V2</div>
                    <div style="color:#ffaa00; font-size:0.8rem;">Unlock Race V2</div>
                </div>
            </div>
            <div class="hz-info-banner"><span>ℹ️</span> Afterwards pay <strong>1M$ + 100 Gems</strong> to unlock Race V2. This Quest can be repeated for any other races.</div>

            <h3 class="hz-section-title" style="margin-top:30px;">RACE V2 – KEY DETAILS</h3>
            <div class="hz-v2-table">
                <div class="hz-th-row">
                    <div></div><div class="hz-col-head" style="color:#00aaff;">V1</div><div class="hz-col-head" style="color:#b042ff;">V2</div><div class="hz-col-head" style="color:#ffaa00;">V3</div>
                </div>`;
        
        for (let race in raceContent) {
            let d = raceContent[race];
            dashHtml += `
                <div class="hz-tr-row" style="--theme-color: ${d.themeColor};">
                    <div class="hz-td-name">
                        <div class="hz-table-img"><img src="/Special:FilePath/${d.image}" onerror="this.style.display='none'"></div>
                        <span style="color:var(--theme-color); font-weight:bold;">${race}</span>
                    </div>
                    <div class="hz-td-list"><ul>${d.v1.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                    <div class="hz-td-list"><ul>${d.v2.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                    <div class="hz-td-list"><ul>${d.v3.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                </div>`;
        }
        dashHtml += `</div></div>`;
        $('#dynamic-race-view').html(dashHtml);
    }

    // 3. Click Logic
    $('.ver-btn').on('click', function() {
        $('.ver-btn').removeClass('active');
        $(this).addClass('active');
        const ver = $(this).data('ver');

        // Fade out, load new content, fade in
        $('#dynamic-race-view').css('opacity', 0);
        setTimeout(() => {
            if (ver === 'v2') {
                renderV2Dashboard();
            } else {
                renderCardGrid(ver);
            }
            $('#dynamic-race-view').css('opacity', 1);
        }, 200);
    });

    // Initial Load
    renderCardGrid('v1');
});

/*------------------------------------------------------------------------------------------------------Sea Maps-----------------------------------------------------------------------------------------------------------------*/
$(document).ready(function() {
    // Define the order of the seas so the buttons know where to go
    var seaOrder = ['first-sea', 'second-sea', 'third-sea'];

    // Helper function to handle the actual switching (keeps code clean)
    function changeSea(targetSea) {
        // Highlight active tab
        $('.sea-tab').removeClass('active');
        $('.sea-tab[data-sea="' + targetSea + '"]').addClass('active');
        
        // Hide all sea content and show the target
        $('.sea-content').hide();
        $('#' + targetSea).fadeIn(300);
    }

    // 1. Top Tab Click Logic
    $('.sea-tab').click(function() {
        changeSea($(this).data('sea'));
    });

    // 2. "Previous Sea" Button Logic (The first button)
    $('.sea-map-footer-nav .nav-btn').eq(0).click(function() {
        var currentSea = $('.sea-tab.active').data('sea');
        var currentIndex = seaOrder.indexOf(currentSea);
        
        // If not the first sea, go back one. If it is the first, loop to the last.
        var prevIndex = (currentIndex > 0) ? currentIndex - 1 : seaOrder.length - 1;
        changeSea(seaOrder[prevIndex]);
    });

    // 3. "Next Sea" Button Logic (The third button)
    $('.sea-map-footer-nav .nav-btn').eq(2).click(function() {
        var currentSea = $('.sea-tab.active').data('sea');
        var currentIndex = seaOrder.indexOf(currentSea);
        
        // If not the last sea, go forward one. If it is the last, loop to the first.
        var nextIndex = (currentIndex < seaOrder.length - 1) ? currentIndex + 1 : 0;
        changeSea(seaOrder[nextIndex]);
    });
});
/*---------------------------------------------------------------------------------------------------Fighting Styles---------------------------------------------------------------------------------------------------------------*/

mw.hook('wikipage.content').add(function($content) {
    const $appContainer = $content.find('#fs-app-container');
    if (!$appContainer.length || $appContainer.hasClass('initialized')) return;
    $appContainer.addClass('initialized');

    let currentFilter = 'All';
    let currentSearch = '';

    // --- DATA ARRAY ---
    const fightingStyles = [
    	{
            id: 'Combat',
            name: 'Combat',
            rarity: 'Common',
            sea: 'First Sea',
            desc: 'A basic fighting style that imitates a renowned martial art by the name of "Boxing".',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/e/ee/Combat_Icon.png/revision/latest/scale-to-width-down/600?cb=20260628212849', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/d/d5/CombatStance.webp/revision/latest/scale-to-width-down/641?cb=20260704141028', 
            reqs: { 
                money: { val: '$0', icon: '💸' }, 
                gems: { val: '0', icon: '💎' }, 
                mastery: { val: '0', icon: '⚔️' }, 
                materials: { val: 'N/A', icon: '🎃' },
                level: {val: '1', icon: '✊'}
            },
            obtain: 'Join the game for the first time.<br><br> <span style="color:#888; font-style:italic;">"Only those who are worthy of the seas ever stick to this Style alone!\'"</span>',
            availability: ['First Sea'],
            moves: [
                {
                    key: 'Z', name: 'Heavy Punch', tags: ['Damage', 'Aoe'],
                    desc: 'User swings his first forward damaging everyone on the way.',
                    mastery: 0, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXJ5Z3l2YTByaDVjMnE0cGdhZWdjZTBmajR6NmlmaGgwNDdmcnVwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7seDqh2X387bFizlJO/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Ground Smash', tags: ['Damage', 'AoE'],
                    desc: 'Kick the ground with insane force causing an explosive impact.',
                    mastery: 25, gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3NtZnZxMDFvaXhxMmhpaWYxdDZ0MmY2ZTBxaXh6a2d4aHpkdW5nMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tLfoDPn2zaWb8ADaJG/giphy.gif'
                }
            ]
        },
        {
            id: 'Black-Leg',
            name: 'Black Leg V1',
            rarity: 'Common',
            sea: 'First Sea',
            desc: 'A powerful fighting style that channels the power of legs into devastating close-range fast paced attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/41/Black_Leg_Icon.png/revision/latest/scale-to-width-down/600?cb=20260628195316', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/d/d5/Black_leg_Nova.png/revision/latest?cb=20260628194246', 
            reqs: { 
                money: { val: '$50,000', icon: '💸' }, 
                gems: { val: 'N/A', icon: '💎' }, 
                mastery: { val: 'N/A', icon: '⚔️' }, 
                materials: { val: 'N/A', icon: '🎃' },
                level: {val: '250', icon: '✊'}
            },
            obtain: 'Purchase from the Black Leg Npc on Sea Restaurant Island. <br><br> <span style="color:#888; font-style:italic;">"Only those who can cook with their legs can wield this power\'s."</span>',
            availability: ['First Sea'],
            moves: [
                {
                    key: 'Z', name: 'Ground Smash	', tags: ['Damage', 'Movement'],
                    desc: 'User spins forward in a circular motion striking the target with incredible force causing an explosion on impact.',
                    mastery: 0, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTVxcWVtbHF4am9sZDZmM2RoZGJoNWF1MWowZnMzaDVwY2E0M2hxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pyOwItzWy8QVOA5Tro/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Party Table', tags: ['Damage', 'Movement'],
                    desc: 'Spin in a spiral motion, creating a table spin that damages enemies around you.',
                    mastery: 25, gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJ1aG82ZXNweTg3dWJib2RhdTFnbWNwdGxla2JhcGpxejM1ZjZxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fjkfZZLHSx2Z45YaIK/giphy.gif'
                },
                {
                    key: 'C', name: 'Air Barrage', tags: ['Damage', 'Projectile'],
                    desc: 'Let out a couple projectiles that unleashes a shockwave upon impact, stunning and damaging enemies in the way.',
                    mastery: 50, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWx2ejEyczNiZGM1b2F1ODBib2Zsb2J3NDA0ZWhicWFiandsZG04eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IRby6X6JUn66gQXrO6/giphy.gif'
                },
                {
                	key: 'V', name: 'Diable Mode', tags: ['Awakening', 'Aoe'],
                    desc: 'User twists their leg, forcefully heating it up enough to cause a projection of flames on the area.',
                    mastery: 75, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGNiam40cDBwNGkzdjFtamZybXE5YjNndDN0NnM4MmNlbGRnem9ibyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZGhXN8R59KKqZVXJHP/giphy.gif'
                }
            ]
        },
        {
            id: 'Cyborg',
            name: 'Cyborg V1',
            rarity: 'Rare',
            sea: 'Second Sea',
            desc: 'A powerful fighting style that channels the power of machinery into devastating close/Mid/Long Range attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/45/Cyborg_V1.png/revision/latest/scale-to-width-down/600?cb=20260628204419', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/52/Cyborg_Stance.webp/revision/latest?cb=20260704143900', 
            reqs: { 
                money: { val: '$2,500,000', icon: '💸' }, 
                gems: { val: '750', icon: '💎' }, 
                mastery: { val: '300', icon: '⚔️' }, 
                materials: { val: 'Dragon Scale x10', icon: '🎃' },
                level: {val: '250', icon: '✊'}
            },
            obtain: 'Purchase from the Flower Capital\'s outskirts! <br><br> <span style="color:#888; font-style:italic;">"Only those who control their power can wield the dragon\'s."</span>',
            availability: ['Second Sea'],
            moves: [
                {
                    key: 'Z', name: 'Cyborg Smash', tags: ['Damage', 'Movement'],
                    desc: 'Rush forward with incredible speed and strike the enemy with a powerful dragon-infused punch.',
                    mastery: 0, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZjbGM4NDR2dHM0NmR0dmc4eWk5YnpnczJ1bTJocTdtajdoYXQwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rQ1WxR1hPFVHVtfizI/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Cyborg Bullet', tags: ['Damage', 'AoE'],
                    desc: 'Let out a projectile which which causes an impact upon all enemies in range.',
                    mastery: 25, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FocDljNjdiZndkd3U0aDBzNWt0d2J4cXM3OWc1bnZmNHFkMmNvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yywWViuID5Y06VkusC/giphy.gif'
                },
                {
                    key: 'C', name: 'Cyborg Tackle', tags: ['Damage', 'Movement'],
                    desc: 'User launches forward grabbing enemies afflicted and launching them forth.',
                    mastery: 50, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczltY2RrcHhiOTQzbDJ1ejlndWxnbmQ1Zmc4bGJpbTBiY3R0M2psYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/27Mw2nRyhMqoG8UQCu/giphy.gif'
                }
            ]
        },
        {
            id: 'Electro-V1',
            name: 'Electro V1',
            rarity: 'Rare',
            sea: 'Second Sea',
            desc: 'A powerful fighting style that channels the power of dragons into devastating close-range attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2a/Electro_V1.png/revision/latest/scale-to-width-down/600?cb=20260628205651', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2b/ElectroStance.Webp/revision/latest?cb=20260704165355', 
            reqs: { 
                money: { val: '$450,000', icon: '💸' }, 
                gems: { val: '0', icon: '💎' }, 
                mastery: { val: '0', icon: '⚔️' }, 
                materials: { val: '0', icon: '🎃' },
                level: {val: '1', icon: '✊'}
            },
            obtain: 'Purchase from the Flower Capital\'s outskirts! <br><br> <span style="color:#888; font-style:italic;">"Only those who control their power can wield the dragon\'s."</span>',
            availability: ['Second Sea'],
            moves: [
                {
                    key: 'Z', name: 'Electric Discharge', tags: ['Damage', 'Movement'],
                    desc: 'Rush forward with incredible speed and strike the enemy with a powerful Lightning-infused punch.',
                    mastery: 0, gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzUwcThkdmg0eTgyYjIyNGZ6eW5iMHFxa3R6MDZ0bGxkdjZnejJmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J2hA6o5EtJJyi1dxaq/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Mink Discharge', tags: ['Damage', 'AoE', 'Stun'],
                    desc: 'Let out a couple of lightning string pathways stunning everyone in the way.',
                    mastery: 25, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjdscmVrdGI1dWg5bmNqcmt2ZnZhMXA5cG9tcmwzd2NhZjc5ODR6YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NmIWCkoQM2uoDOUbWT/giphy.gif'
                },
                {
                    key: 'C', name: 'Electric Slam', tags: ['Damage', 'Stun', 'Movement'],
                    desc: 'User rushes forward with insane speed and let\'s out an explosion which stunns all afflicted personnel for over a second!',
                    mastery: 50, gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExamh3eXFmbTYyODR2eTBxeW1ubG42Nm12OXdibmZpd3VieThoYnVudyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0vTbI3RbPzu1MfoWkK/giphy.gif'
                }
            ]
        },
        {
            id: 'Fishman-V1',
            name: 'Fishman V1',
            rarity: 'Uncommon',
            sea: 'Second Sea',
            desc: 'A powerful fighting style that channels the power of dragons into devastating close-range attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/50/Fishman_Karate_V1.png/revision/latest/scale-to-width-down/600?cb=20260628210418', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/0a/FishmanStance.Webp/revision/latest?cb=20260704165236', 
            reqs: { 
                money: { val: '$450,000', icon: '💸' }, 
                gems: { val: '0', icon: '💎' }, 
                mastery: { val: '0', icon: '⚔️' }, 
                materials: { val: 'N/A', icon: '🎃' },
                level: {val: '1', icon: '✊'}
            },
            obtain: 'Purchase from the Flower Capital\'s outskirts!<br><br> <span style="color:#888; font-style:italic;">"Only those who control their power can wield the dragon\'s."</span>',
            availability: ['Second Sea'],
            moves: [
                {
                    key: 'Z', name: 'Shark Fist', tags: ['Damage', 'AoE'],
                    desc: 'User swings the palm of his hand with incredible force knocking back all affected enemies.',
                    mastery: 0, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjN0azJpeHh0amV6NmM3Y3V6ZWM1dXBhaTRlaWpxYnkxNG9qZWhkNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dzO76nNWSH0yZNgYly/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Shark Barrage', tags: ['Damage', 'Projectile'],
                    desc: 'User let\'s out 12 Water bullets creating a tiny shockwave upon impact stunning for a brief period of 0.3 seconds',
                    mastery: 25, gif: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2RmamFhMjJkZ3gyeTBydTR0Z3JlYzlweHllYzQ2bnMyZmdqNnB0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gLgG0xk4RxcRrP81mg/giphy.gif'
                },
                {
                    key: 'C', name: 'Titan Slam', tags: ['Damage', 'Projectile', 'Stun'],
                    desc: 'User charges a massive Water Drop and then launches it causing massive amounts of damage upon impact!',
                    mastery: 50, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VhamV4dmZ6MXBncnA2bHM0NDdiNHp6dnUwdmQwajhiajdsbnVqMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xfP2SLLg6lvMQAQrmn/giphy.gif'
                }
            ]
        },
        {
            id: 'Fishman-V2',
            name: 'Fishman V2',
            rarity: 'Legendary',
            sea: 'Third Sea',
            desc: 'A powerful fighting style that channels the power of dragons into devastating close-range attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a2/Fishman_Karate_V2.png/revision/latest/scale-to-width-down/600?cb=20260628210626', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/0a/FishmanStance.Webp/revision/latest?cb=20260704165236', 
            reqs: { 
                money: { val: '$0', icon: '💸' }, 
                gems: { val: '0', icon: '💎' }, 
                mastery: { val: '0', icon: '⚔️' }, 
                materials: { val: 'SeaBeast Heart x2', icon: '❤️' },
                level: {val: '0', icon: '✊'}
            },
            obtain: 'Purchase from the Dragon Dojo on Dragon Island. <br><br> <span style="color:#888; font-style:italic;">"Only those who control their power can wield the dragon\'s."</span>',
            availability: ['Third Sea'],
            moves: [
                {
                    key: 'Z', name: 'Hydra Launch', tags: ['Damage', 'Movement'],
                    desc: 'Rush forward with incredible speed and strike the enemy with a powerful Water-infused Strike.',
                    mastery: 0, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWR6eTB2cXk4YmJxNmw3OWwyYnlpOW9rdWwzaWU2ZTltMWdzenhiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dpReo8avGW5DtosEyH/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Poseidon Tridents', tags: ['Damage', 'Stun', 'Projectile'],
                    desc: 'User charges 4 compressed water projectiles and launches them forth briefly stunning and damaging all enemies in the afflicted area.',
                    mastery: 25, gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHdmY3Btd21kaXo4Y2Vwcnk2MXkyb2xhcHJmdjBxNmk3Z253dG54bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ETHdDKpqoC5aGllF2c/giphy.gif'
                },
                {
                    key: 'C', name: 'Tidal Descent', tags: ['Damage', 'Movement', 'AoE'],
                    desc: 'User quickly levitates and ground slams causing a massive shockwave upon impact knocking all enemies back!',
                    mastery: 50, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGh1b2J5a3gwamxrazB1a3F4dWlnNTRua21qcmNtdWlpcXNnOGp1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ALp6qkOygtT0xhah16/giphy.gif'
                }
            ]
        },
        {
            id: 'Dragon-Claw-V1',
            name: 'Dragon Claw V1',
            rarity: 'Rare',
            sea: 'Second Sea',
            desc: 'A powerful fighting style that channels the power of dragons into devastating close-mid-long-ranged attacks.',
            // UPDATE THESE URLS WITH YOUR UPLOADED WIKI IMAGES
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/3/3c/Dragon_Claw_V1.png/revision/latest/scale-to-width-down/600?cb=20260628211114', 
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/b/b8/DragonClawStance.webp/revision/latest?cb=20260704165046', 
            reqs: { 
                money: { val: '$0', icon: '💸' }, 
                gems: { val: '150', icon: '💎' }, 
                mastery: { val: '0', icon: '⚔️' }, 
                materials: { val: 'N/A', icon: '🎃' },
                level: {val: '0', icon: '✊'}
            },
            obtain: 'Purchase from the Flower Capital\'s outskirts!<br><br> <span style="color:#888; font-style:italic;">"Only those who control their power can wield the dragon\'s."</span>',
            availability: ['Second Sea'],
            moves: [
                {
                    key: 'Z', name: 'Claw Kick', tags: ['Damage', 'Movement'],
                    desc: 'Rush forward with incredible speed and strike the enemy with a powerful dragon-infused punch.',
                    mastery: 0, gif: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxkaGEzaWw2d3BoZjlqejEybGV0OW5wMHpwZmNwMjRlejUyN2JwbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1vcdcIaR2FHjWWlSFF/giphy.gif' // Direct GIF link
                },
                {
                    key: 'X', name: 'Direct Flame', tags: ['Damage', 'Projectile'],
                    desc: 'Let forth massive flame slashes that reel in affected targets.',
                    mastery: 25, gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGVscDh3OGVsa3N2d2EweHd3eHAyYTVkc3pjM2JxZWJtendyaGE5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/69VduFnSbfFZdu3pI9/giphy.gif'
                },
                {
                    key: 'C', name: 'Clawing Pull', tags: ['Damage', 'AoE'],
                    desc: 'Reel in all enemies in the affected area, effectively damaging them over time while briefly stunning.',
                    mastery: 50, gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpqNWFhbndtajFzdHQwMDV2dnZmMHZ5djU2cmw1Ymx6OW5zY3ZzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Bre8XNC5RGVfc5bmUz/giphy.gif'
                }
            ]
        },
    ];

    const baseUI = `
        <div class="haze-top-bar">
            <div class="haze-tabs" id="fs-tabs">
                <div class="tab-btn active" data-filter="All">ALL STYLES</div>
                <div class="tab-btn" data-filter="First Sea">FIRST SEA</div>
                <div class="tab-btn" data-filter="Second Sea">SECOND SEA</div>
                <div class="tab-btn" data-filter="Third Sea">THIRD SEA</div>
            </div>
            <div class="haze-search-sort">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="fs-search" placeholder="Search fighting styles..." autocomplete="off" />
                </div>
                <div class="sort-box">
                    <span>Sort:</span>
                    <select id="fs-sort"><option value="default">Default</option></select>
                </div>
            </div>
        </div>
        <div class="haze-content-wrapper">
            <div id="fs-sidebar" class="haze-sidebar"></div>
            <div id="fs-main-content" class="haze-main-content"></div>
        </div>
    `;
    
    $appContainer.html(baseUI);

    function renderSidebar() {
        const filteredStyles = fightingStyles.filter(style => {
            const matchesTab = currentFilter === 'All' || style.sea === currentFilter;
            const matchesSearch = style.name.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesTab && matchesSearch;
        });

        let sidebarHTML = filteredStyles.length === 0 ? '<div style="padding: 15px; color: #888;">No styles found.</div>' : '';
        
        filteredStyles.forEach((style, index) => {
            const isActive = index === 0 ? 'active' : '';
            sidebarHTML += `
                <div class="sidebar-item ${isActive}" data-id="${style.id}">
                    <div class="sidebar-icon-wrapper"><img src="${style.icon}" alt=""></div>
                    <div class="item-text">
                        <h4>${style.name}</h4>
                        <span>${style.sea}</span>
                    </div>
                </div>
            `;
        });
        
        $appContainer.find('#fs-sidebar').html(sidebarHTML);
        if (filteredStyles.length > 0) renderMainContent(filteredStyles[0].id);
        else $appContainer.find('#fs-main-content').empty();
    }

    function renderMainContent(styleId) {
        const style = fightingStyles.find(s => s.id === styleId);
        if (!style) return;

        let movesHTML = style.moves.map(move => {
            let tagsHTML = move.tags.map(tag => `<span class="move-tag tag-${tag.toLowerCase()}">${tag}</span>`).join('');
            return `
                <div class="move-card">
                    <div class="move-keybind">${move.key}</div>
                    <div class="move-details">
                        <h4>${move.name}</h4>
                        <div class="tags-container">${tagsHTML}</div>
                        <p>${move.desc}</p>
                        <span class="mastery-req">Mastery Required: ${move.mastery}</span>
                    </div>
                    <div class="move-gif">
                        <img src="${move.gif}" alt="${move.name}">
                    </div>
                </div>
            `;
        }).join('');

        const mainHTML = `
            <div class="header-section">
                <div class="header-image-container">
                    <img src="${style.mainImage}" alt="${style.name}">
                </div>
                <div class="header-text">
                    <h2>${style.name}</h2>
                    <div class="badge-row">
                        <span class="badge rarity-${style.rarity.toLowerCase()}">${style.rarity}</span>
                        <span class="badge sea-badge">${style.sea}</span>
                    </div>
                    <p>${style.desc}</p>
                </div>
            </div>
            
            <div class="info-layout">
                <div class="info-left-box stat-box">
                    <h4 class="gold-heading">REQUIREMENTS TO OBTAIN</h4>
                    <div class="req-grid">
                        <div class="req-item"><span class="req-title">${style.reqs.money.icon} Money</span><br><strong style="color: #2ecc71;">${style.reqs.money.val}</strong></div>
                        <div class="req-item"><span class="req-title">${style.reqs.gems.icon} Gems</span><br><strong style="color: #9b59b6;">${style.reqs.gems.val}</strong></div>
                        <div class="req-item"><span class="req-title">${style.reqs.mastery.icon} Mastery</span><br><strong>${style.reqs.mastery.val}</strong></div>
                        <div class="req-item"><span class="req-title">${style.reqs.materials.icon} Materials</span><br><strong>${style.reqs.materials.val}</strong></div>
                        <div class="req-item"><span class="req-title">${style.reqs.level.icon} Levels</span><br><strong>${style.reqs.level.val}</strong></div>
                    </div>
                    <h4 class="gold-heading" style="margin-top: 25px;">HOW TO OBTAIN</h4>
                    <p class="obtain-text">${style.obtain}</p>
                </div>
                
                <div class="info-right-box stat-box">
                    <h4 class="gold-heading">SEA AVAILABILITY</h4>
                    <div class="sea-availability-list">
                        ${['First Sea', 'Second Sea', 'Third Sea'].map(sea => `
                            <div class="sea-status-row">
                                <div class="indicator ${style.availability.includes(sea) ? 'active' : ''}"></div>
                                <span class="sea-text ${style.availability.includes(sea) ? 'active' : ''}">${sea}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="moves-section">
                <h4 class="gold-heading">MOVES</h4>
                <p style="color:#888; font-size: 13px; margin-bottom: 15px;">Master each move and improve your combat prowess.</p>
                ${movesHTML}
            </div>
        `;
        $appContainer.find('#fs-main-content').html(mainHTML);
    }

    renderSidebar();
    $appContainer.fadeIn(400);

    $appContainer.on('click', '.sidebar-item', function() {
        if ($(this).hasClass('active')) return;
        $appContainer.find('.sidebar-item').removeClass('active');
        $(this).addClass('active');
        renderMainContent($(this).attr('data-id'));
    });

    $appContainer.on('click', '.tab-btn', function() {
        $appContainer.find('.tab-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).attr('data-filter');
        renderSidebar(); 
    });

    $appContainer.on('input', '#fs-search', function() {
        currentSearch = $(this).val();
        renderSidebar(); 
    });
});
/*-----------------------------------------------------------------------------------------Bosses Full Info Documentation---------------------------------------------------------------------------*/
mw.hook('wikipage.content').add(function($content) {
    const $container = $content.find('#bosses-app-container');
    
    // Stop if container doesn't exist or is already running
    if (!$container.length || $container.hasClass('initialized')) return;
    $container.addClass('initialized');

    // --- DATA STORE ---
    const bossesData = [
    	{
            id: 'SeaBeast-BossV3',
            name: 'SeaBeast Boss 3rd Sea',
            sea: 3,
            level: 3000,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/ff/SeaBeast.png/revision/latest/scale-to-width-down/681?cb=20260705203945',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/ff/SeaBeast.png/revision/latest/scale-to-width-down/681?cb=20260705203945',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious predator of the Seas!',
            stats: { atk: '2344', hp: '227,708', recLevel: '3000+' },
            location: 'Anywhere in the ocean.',
            respawn: '',
            respawnmethod: 'Spawns anywhere with water every 20M-1H',
            drops: [
                { name: 'SeaBeast Heart', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '25%' },
                { name: 'SeaBeast Hammer V2', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '3.5%' },
                { name: 'Blade Fragment', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' }
            ],
            rewards: { money: '$25,000', Gems: '25' },
            about: 'Starter Boss of 3rd Sea.',
            tips: ['Stay mobile and avoid his explosive attacks.']
        },
    	{
            id: 'SeaBeast-Boss',
            name: 'SeaBeast Boss 1st Sea',
            sea: 1,
            level: 1500,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7f/SeaBeast1.png/revision/latest/scale-to-width-down/800?cb=20260705204242',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7f/SeaBeast1.png/revision/latest/scale-to-width-down/800?cb=20260705204242',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The notorious predator of the Seas!',
            stats: { atk: '1174', hp: '114,308', recLevel: '1500+' },
            location: 'Anywhere in the ocean.',
            respawn: '',
            respawnmethod: 'Spawns anywhere with water every 20M-1H',
            drops: [
                { name: 'SeaBeast Core', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '100%' },
                { name: 'SeaBeast Hammer', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '50%' }
            ],
            rewards: { money: '$25,000', Gems: '30' },
            about: 'Starter Boss of 2nd Seas.',
            tips: ['Stay mobile and avoid his explosive attacks.']
        },
    	{
            id: 'SeaBeast-BossV2',
            name: 'SeaBeast Boss 2nd Sea',
            sea: 2,
            level: 1500,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/ff/SeaBeast.png/revision/latest/scale-to-width-down/681?cb=20260705203945',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/ff/SeaBeast.png/revision/latest/scale-to-width-down/681?cb=20260705203945',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious predator of the Seas!',
            stats: { atk: '1174', hp: '114,308', recLevel: '2200+' },
            location: 'Anywhere in the ocean.',
            respawn: '',
            respawnmethod: 'Spawns anywhere with water every 20M-1H',
            drops: [
                { name: 'SeaBeast Heart', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '25%' },
                { name: 'SeaBeast Hammer V2', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '3.5%' }
            ],
            rewards: { money: '$25,000', Gems: '25' },
            about: 'Starter Boss of 2nd Seas.',
            tips: ['Stay mobile and avoid his explosive attacks.']
        },
    	{
            id: 'DarkBlade-Boss',
            name: 'DarkBlade Boss',
            sea: 2,
            level: 6000,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/87/MihawkBoss.png/revision/latest?cb=20260705202557',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/87/MihawkBoss.png/revision/latest?cb=20260705202557',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Foggy Castle!',
            stats: { atk: '1873', hp: '454,508', recLevel: '3600+' },
            location: 'Dough Island',
            respawn: '',
            respawnmethod: 'Spawned from the DarkBlade Upgrader Quest in Foggy Castle - Can only be spawned every 2 hours.',
            drops: [
                { name: 'Night Hat', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' },
                { name: 'Dough Trident', rarity: 'Mythical', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '0.1%' }
            ],
            rewards: { money: '$25,000', Gems: '25' },
            about: 'Most dangerous boss within the 2nd Seas.',
            tips: ['Stay mobile and avoid his barrage of slashes.']
        },
    	{
            id: 'Dough-Boss',
            name: 'Dough Boss',
            sea: 2,
            level: 5000,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/48/DoughBoss.png/revision/latest/scale-to-width-down/180?cb=20241123130834',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/48/DoughBoss.png/revision/latest/scale-to-width-down/180?cb=20241123130834',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Dough Island!',
            stats: { atk: '1561', hp: '378,908', recLevel: '3300+' },
            location: 'Dough Island',
            respawn: '',
            respawnmethod: 'Kill a 1000 Npcs across the Island',
            drops: [
                { name: 'Dough Scarf', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' },
                { name: 'Dough Trident', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' }
            ],
            rewards: { money: '$30,000', Gems: '25' },
            about: 'Most chill pirate within the 2nd Seas.',
            tips: ['Stay mobile and avoid his close ranged attacks.']
        },
    	{
            id: 'Dragon-Boss',
            name: 'Dragon Boss',
            sea: 2,
            level: 5000,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/6/67/DragonBoss.png/revision/latest/scale-to-width-down/596?cb=20260705201129',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/6/67/DragonBoss.png/revision/latest/scale-to-width-down/596?cb=20260705201129',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Dragon Island!',
            stats: { atk: '1561', hp: '378,908', recLevel: '2850+' },
            location: 'Dragon Island',
            respawn: '',
            respawnmethod: 'Kill a 1000 Npcs across the Island',
            drops: [
                { name: 'Drums of Liberation', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '100%' },
                { name: 'Dragon Horns', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' }
            ],
            rewards: { money: '$30,000', Gems: '35' },
            about: 'Most evil pirate within the 2nd Sea.',
            tips: ['Stay mobile and avoid his heavy attacks.']
        },
    	{
            id: 'Enma-Boss',
            name: 'Enma Boss',
            sea: 2,
            level: 2500,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7e/EnmaBoss.png/revision/latest?cb=20260705200357',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7e/EnmaBoss.png/revision/latest?cb=20260705200357',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Marine HQ!',
            stats: { atk: '782', hp: '189,908', recLevel: '2200+' },
            location: 'Flower Capital',
            respawn: '1 Hour',
            drops: [
                { name: 'Enma', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '10%' }
            ],
            rewards: { money: '$25,000', Gems: '25' },
            about: 'The strongest swordsman in the 2nd Sea.',
            tips: ['Stay mobile and avoid his heavy attacks.']
        },
    	{
            id: 'Tremor-Girl',
            name: 'Tremor GIrl',
            sea: 1,
            level: 1000,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5d/TremorGirl.png/revision/latest?cb=20260705195549',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5d/TremorGirl.png/revision/latest?cb=20260705195549',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Marine HQ!',
            stats: { atk: '314', hp: '76,508', recLevel: '1000+' },
            location: 'Marine HQ',
            respawn: '',
            respawnmethod: 'Spawn by unlocking her, using the TremorBeard Key dropped from Ice Admiral at Marine HQ.',
            drops: [
                { name: 'Bisento V2', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '50%' },
                { name: 'White Orb', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '25%' }
            ],
            rewards: { money: '$20,000', Gems: '25' },
            about: 'The strongest swordsman in the 1st Sea.',
            tips: ['Stay mobile and avoid her heavy attacks.']
        },
    	{
            id: 'Dual-Swordsman Super-Boss',
            name: 'Dual Swordsman',
            sea: 1,
            level: 500,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/ae/DualSwordsman.png/revision/latest/scale-to-width-down/646?cb=20260705192322',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/ae/DualSwordsman.png/revision/latest/scale-to-width-down/646?cb=20260705192322',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of the bandits terrorizing the Starter Island.',
            stats: { atk: '158', hp: '38,708', recLevel: '500+' },
            location: 'Marine Base Town Island',
            respawn: '1 Hour',
            drops: [
                { name: 'Green Bandanna', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '50%' },
                { name: 'Book', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '50%' }
            ],
            rewards: { money: '$5,000', Gems: '10' },
            about: 'The strongest swordsman in the 1st Sea.',
            tips: ['Stay mobile and avoid his heavy attacks.']
        },
        {
            id: 'Fire-Fist',
            name: 'Fire Fist',
            sea: 1,
            level: 1400,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/87/FireFist.png/revision/latest/scale-to-width-down/800?cb=20260705193531',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/87/FireFist.png/revision/latest/scale-to-width-down/800?cb=20260705193531',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of Tall Woods!',
            stats: { atk: '439', hp: '106,748', recLevel: '1400+' },
            location: 'Tall Woods',
            respawn: 'N/A',
            respawnmethod: 'Collect Match from Warden in Impel Jail - (5%) drop, Go to Tall Woods and light a campfire using the match. This will spawn some Pearls, Collect 4 Pearls scattered around Tall Woods, Bring all 4 Pearls and plug them into the 4 Totems behind the campfire.',
            drops: [
                { name: 'Pearl Necklace', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '100%' },
                { name: 'Flame Fruit', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '25%' }
            ],
            rewards: { money: '$40,000', Gems: '25' },
            about: 'The strongest swordsman in the 1st Sea.',
            tips: ['Stay mobile and keep geppoing.']
        },
        {
            id: 'bandit-Boss',
            name: 'Bandit Boss',
            sea: 1,
            level: 25,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/1/1f/BanditBoss.png/revision/latest/scale-to-width-down/268?cb=20241130130116',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/1/1f/BanditBoss.png/revision/latest/scale-to-width-down/268?cb=20241130130116',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The notorious leader of the bandits terrorizing the Starter Island.',
            stats: { atk: '10', hp: '530', recLevel: '20+' },
            location: 'Bandit Camp, Starter Island',
            respawn: '30 Seconds',
            drops: [
                { name: 'EyePatch', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Cloth', chance: '40%' }
            ],
            rewards: { money: '$600', Exp: '9,000' },
            about: 'The Bandit Leader is the strongest among the bandits on Starter Island.',
            tips: ['Stay mobile and avoid his heavy attacks.']
        },
        {
            id: 'Clown-Boss',
            name: 'Clown Boss',
            sea: 1,
            level: 60,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/3/31/ClownBoss.png/revision/latest/scale-to-width-down/268?cb=20241124035948',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/3/31/ClownBoss.png/revision/latest/scale-to-width-down/268?cb=20241124035948',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The fierce ruler of the Circus. Known for his funny nature.',
            stats: { atk: '60.1', hp: '1,021', recLevel: '60+' },
            location: 'Clown Island',
            respawn: '5 Minutes',
            drops: [{ name: 'Clown Nose', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Banana', chance: '30%' }],
            rewards: { money: '$1,400', Exp: '28,500' },
            about: 'A random guy which happened to eat a funny fruit.',
            tips: ['Avoid using sword skills.']
        },
        {
            id: 'Krieg-Boss',
            name: 'Krieg Boss',
            sea: 1,
            level: 300,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4a/KriegBoss.png/revision/latest/scale-to-width-down/268?cb=20241124033436',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4a/KriegBoss.png/revision/latest/scale-to-width-down/268?cb=20241124033436',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'The fierce ruler of the Sea Restaurant. Known for his unruly nature.',
            stats: { atk: '100', hp: '4,423', recLevel: '300+' },
            location: 'Sea Restaurant',
            respawn: '5 Minutes',
            drops: [{ name: 'Gold Pauldrons', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Banana', chance: '5%' }],
            rewards: { money: '$3,200', Exp: '551,000' },
            about: 'A random guy which happened to become too egotistical.',
            tips: ['Just beat him up. Has no special qualities.']
        },
        {
            id: 'Shark-Boss,',
            name: 'Shark Boss',
            sea: 1,
            level: 120,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/06/SharkBoss.png/revision/latest/scale-to-width-down/268?cb=20241124042222',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/06/SharkBoss.png/revision/latest/scale-to-width-down/268?cb=20241124042222',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Ruler of the Shark Park Waters.',
            stats: { atk: '39.5', hp: '1,872', recLevel: '120+' },
            location: 'Shark Park',
            respawn: '5 Minutes',
            drops: [{ name: 'Shark Blade', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '5%' }],
            rewards: { money: '$2,000', Exp: '94.000' },
            about: 'Commands the Shark Park itself.',
            tips: ['Just face him with the required Level.']
        },
        {
            id: 'Mammoth-Boss',
            name: 'Mammoth',
            sea: 2,
            level: 2500,
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/51/Mammoth_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250221173833',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/51/Mammoth_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250221173833',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Safekeeps the Impel Jails upper floors.',
            stats: { atk: '781.7', hp: '35,608', recLevel: '1500+' },
            location: 'Udon Prison',
            respawn: '2 Minutes',
            drops: [{ name: 'N/A'}],
            rewards: { money: '10,500', gems: '33.200.000' },
            about: 'Too rigid on himself.',
            tips: ['Keep your distance from this individual.']
        },
        {
            id: 'Zenith-Boss',
            name: 'Zenith',
            sea: 2,
            level: '2,500',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a7/Zenith_Boss.png/revision/latest/scale-to-width-down/717?cb=20260701200624',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a7/Zenith_Boss.png/revision/latest/scale-to-width-down/717?cb=20260701200624',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'A strange creature that roams the seas only during Storms!',
            stats: { atk: '1200', hp: '189,000', recLevel: '2,500+' },
            location: 'shadow Island',
            respawn: '2 Hours and 35 Minutes.',
            drops: [{ name: 'Zenith', rarity: 'Legendary', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '100%' }],
            rewards: { money: '25k', gems: '25', bounty: '12,500'},
            about: 'Boss that lurks the seas only during Storms.',
            tips: ['Relatively weak for his grade, simply stunlock him!']
        },
        {
            id: 'Bomb-Boss',
            name: 'Bomb Boss',
            sea: 1,
            level: '200',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/b/bc/BombBoss.png/revision/latest/scale-to-width-down/268?cb=20241124043255',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/b/bc/BombBoss.png/revision/latest/scale-to-width-down/268?cb=20241124043255',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A funny lad that causes explosions wherever he touches!',
            stats: { atk: '65', hp: '3,006', recLevel: '200+' },
            location: 'Desert Island',
            respawn: '10 Minutes.',
            drops: [{name: 'N/A'}],
            rewards: { money: '25k', gems: '25', bounty: '12,500'},
            about: 'Boss that lurks the seas only during Storms.',
            tips: ['Relatively weak for his grade, simply stunlock him!']
        },
        {
            id: 'Tashi-Boss',
            name: 'Tashi',
            sea: 1,
            level: '400',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5a/TashiiBoss.png/revision/latest/scale-to-width-down/268?cb=20241130132512',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5a/TashiiBoss.png/revision/latest/scale-to-width-down/268?cb=20241130132512',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A repressive girl who wields a blade!',
            stats: { atk: '130', hp: '5,841', recLevel: '400+' },
            location: 'Logue Town',
            respawn: '10 Minutes.',
            drops: [{name: 'Glasses', rarity: 'Common', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '5%'}],
            rewards: { money: '3,800', Exp: '942,000'},
            about: 'A unruly girl which seeks to become the Worlds strongest swordsman!',
            tips: ['Not needed!']
        },
        {
            id: 'King-Gorilla-Boss',
            name: 'King Gorilla',
            sea: 1,
            level: '550',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/27/GorillaKingBoss.png/revision/latest/scale-to-width-down/267?cb=20241130134256',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/27/GorillaKingBoss.png/revision/latest/scale-to-width-down/267?cb=20241130134256',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A repressive girl who wields a blade!',
            stats: { atk: '130', hp: '5,841', recLevel: '400+' },
            location: 'Logue Town',
            respawn: '10 Minutes.',
            drops: [{name: 'Monkey Crown', rarity: 'Uncommon', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '5%'}],
            rewards: { money: '4,600', Exp: '$1,720,000'},
            about: 'A unruly girl which seeks to become the Worlds strongest swordsman!',
            tips: ['Not needed!']
        },
        {
            id: 'Thunder-God-Boss',
            name: 'Thunder God',
            sea: 1,
            level: '1,100',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2c/ThungerGod.png/revision/latest/scale-to-width-down/268?cb=20241205233710',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2c/ThungerGod.png/revision/latest/scale-to-width-down/268?cb=20241205233710',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A strange foe that somehow seems to fase through attacks with lightning!',
            stats: { atk: '345', hp: '15,763', recLevel: '1100+' },
            location: 'Sky Islands',
            respawn: '5 Minutes.',
            drops: [{name: 'Golden Staff', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '1%'},
            {name: 'Thunder Drums', rarity: 'Rare', amount: 'x1', img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '8,450', Exp: '6,590,000'},
            about: 'Has a rather arrogant personality!',
            tips: ['Avoid getting too close!']
        },
        {
            id: 'Marine-Captain-Boss',
            name: 'Marine Captain',
            sea: 1,
            level: '650',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5e/MarineCaptainBoss.png/revision/latest/scale-to-width-down/268?cb=20241130135745',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/5e/MarineCaptainBoss.png/revision/latest/scale-to-width-down/268?cb=20241130135745',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A crazy dude that replaced his hand for a Sword!',
            stats: { atk: '204.8', hp: '9,384', recLevel: '650+' },
            location: 'Marine BaseTown',
            respawn: '1 Minute.',
            drops: [{name: 'Irown Jaw', rarity: 'Common', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'},
            {name: 'Lava Ore', chance: '5%', amount: 'x1'}],
            rewards: { money: '5,200', Exp: '$2,370,000'},
            about: 'Seeks to conquer east blue!',
            tips: ['Not needed!']
        },
        {
            id: 'Minotaur-Boss',
            name: 'Minotaur',
            sea: 1,
            level: '750',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/01/MinotaurBoss.png/revision/latest/scale-to-width-down/268?cb=20241224190901',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/01/MinotaurBoss.png/revision/latest/scale-to-width-down/268?cb=20241224190901',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Strong foe that utilizes aoe Attacks solely!',
            stats: { atk: '204.8', hp: '9,384', recLevel: '750+' },
            location: 'Three Islands',
            respawn: '1 Minute.',
            drops: [{name: 'Oversized Helmet', rarity: 'Uncommon', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'},
            {name: 'Lava Ore', chance: '5%', amount: 'x1'}],
            rewards: { money: '5,800', Exp: '$3,120,000'},
            about: 'Says what his owner tells him to!',
            tips: ['Not needed!']
        },
        {
            id: 'Ice-Admiral-Boss',
            name: 'Ice Admiral',
            sea: 1,
            level: '900',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/b/b2/IceAdmiralBoss.png/revision/latest/scale-to-width-down/268?cb=20241205231611',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/b/b2/IceAdmiralBoss.png/revision/latest/scale-to-width-down/268?cb=20241205231611',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Strong foe that freezes his enemies to death!',
            stats: { atk: '282.7', hp: '12,928', recLevel: '900+' },
            location: 'Marine HQ',
            respawn: '1 Minute.',
            drops: [{name: 'Sleeping Mask', rarity: 'Common', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'},
            {name: 'Tremor Beard Key', chance: '1%', amount: 'x1'}],
            rewards: { money: '8,250', Exp: '$4,450,000'},
            about: 'Most chill admiral ever!',
            tips: ['Not needed!']
        },
        {
            id: 'Revolutionary-Boss',
            name: 'Revolutionary',
            sea: 1,
            level: '1250',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c8/RevolutionaryBoss.png/revision/latest/scale-to-width-down/268?cb=20241205234036',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c8/RevolutionaryBoss.png/revision/latest/scale-to-width-down/268?cb=20241205234036',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'An old man past his prime!',
            stats: { atk: '391.9', hp: '17,889', recLevel: '1200+' },
            location: 'Revolutionary Base',
            respawn: '1 Minute.',
            drops: [{Name: 'N/A'}],
            rewards: { money: '8,650', Exp: '$8,460,000'},
            about: 'Do not kill this fraudulent being!',
            tips: ['Not needed!']
        },
        {
            id: 'Warden-Boss',
            name: 'Warden',
            sea: 1,
            level: '1400',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/9b/WardenBoss.png/revision/latest/scale-to-width-down/268?cb=20241206000143',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/9b/WardenBoss.png/revision/latest/scale-to-width-down/268?cb=20241206000143',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'A quirky personality individual!',
            stats: { atk: '282.7', hp: '12,928', recLevel: '1400+' },
            location: 'Impel Jail',
            respawn: '1 Minute.',
            drops: [{name: 'Warden Hat', rarity: 'Common', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '2.5%'},
            {name: 'Match', chance: '5%', amount: 'x1'}],
            rewards: { money: '8,850', Exp: '$10,500,000'},
            about: 'Do not kill this fraudulent being!',
            tips: ['Not needed!']
        },
        {
            id: 'Vergo-Boss',
            name: 'Vergo',
            sea: 1,
            level: '1500',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/91/Ivergo.webp/revision/latest/scale-to-width-down/268?cb=20250221160323',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/91/Ivergo.webp/revision/latest/scale-to-width-down/268?cb=20250221160323',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Well, a certain person that thinks of himself as pretty tuff!',
            stats: { atk: '436.8', hp: '21,433', recLevel: '1500+' },
            location: 'Hot Island',
            respawn: '1 Minute.',
            drops: [{name: 'Black Shades', rarity: 'Common', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '2.5%'}],
            rewards: { money: '3,650', Exp: '$24,200,000'},
            about: 'Do not kill this fraudulent being!',
            tips: ['Not needed!']
        },
        {
            id: 'Harpy-Boss',
            name: 'Harpy',
            sea: 1,
            level: '1550',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/73/Harpy.webp/revision/latest/scale-to-width-down/268?cb=20250221162209',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/73/Harpy.webp/revision/latest/scale-to-width-down/268?cb=20250221162209',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Why so afraid?',
            stats: { atk: '500', hp: '22,142', recLevel: '1550+' },
            location: 'Hot Island',
            respawn: '1 Minute.',
            drops: [{name: 'Ice Ore', rarity: 'Common', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '9,050', Exp: '$25,800,000'},
            about: 'Bully me please!',
            tips: ['Not needed!']
        },
        {
            id: 'Neptune-Boss',
            name: 'Neptune',
            sea: 1,
            level: '1700',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/94/Neptune.webp/revision/latest/scale-to-width-down/268?cb=20250221162911',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/9/94/Neptune.webp/revision/latest/scale-to-width-down/268?cb=20250221162911',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Just sit back and relax with me!',
            stats: { atk: '532.5', hp: '24,268', recLevel: '1700+' },
            location: 'Hot Island',
            respawn: '1 Minute.',
            drops: [{name: 'Neptune Crown', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'},
            {name: 'Fork', rarity: 'Uncommon', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'}],
            rewards: { money: '9,250', Exp: '$31,000,000'},
            about: 'Slightly arrogant!',
            tips: ['Not needed!']
        },
        {
            id: 'Shiryu-Boss',
            name: 'Shiryu',
            sea: 1,
            level: '1850',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/78/Shiryu.webp/revision/latest/scale-to-width-down/267?cb=20250221163830',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/78/Shiryu.webp/revision/latest/scale-to-width-down/267?cb=20250221163830',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'I hate everyone!',
            stats: { atk: '579', hp: '26,394', recLevel: '1850+' },
            location: 'Skull Island',
            respawn: '1 Minute.',
            drops: [{name: 'Scroll', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'}],
            rewards: { money: '9,450', Exp: '$36,600,000'},
            about: 'Has too much ego!',
            tips: ['Not needed!']
        },
        {
            id: 'G4-Boss',
            name: 'G4',
            sea: 1,
            level: '2000',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2a/G4Boss.webp/revision/latest/scale-to-width-down/268?cb=20250221164440',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/2/2a/G4Boss.webp/revision/latest/scale-to-width-down/268?cb=20250221164440',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'I wanna become the King Of The Pirates!',
            stats: { atk: '625.8', hp: '28.521', recLevel: '2000+' },
            location: 'Bubble Island',
            respawn: '1 Minute.',
            drops: [{name: 'Haki Book', rarity: 'Legendary', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '0.5%'}],
            rewards: { money: '9,650', Exp: '$42,600,000'},
            about: 'Carefree!',
            tips: ['Not needed!']
        },
        {
            id: 'Ryummy-Boss',
            name: 'Ryummy',
            sea: 1,
            level: '2150',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/0c/Ryuma.webp/revision/latest/scale-to-width-down/268?cb=20250221165324',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/0c/Ryuma.webp/revision/latest/scale-to-width-down/268?cb=20250221165324',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'please let me rest!',
            stats: { atk: '625.8', hp: '28.521', recLevel: '2150+' },
            location: 'Thriller Boat',
            respawn: '1 Minute.',
            drops: [{name: 'Shusui', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '9,850', Exp: '$25,700,000'},
            about: 'Swordsman on his youth full of vigor!',
            tips: ['Not needed!']
        },
        {
            id: '3ss-Boss',
            name: '3ss',
            sea: 2,
            level: '2650',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a3/3ss_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222150643',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a3/3ss_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222150643',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'He who cuts anything!',
            stats: { atk: '828.5', hp: '37.734', recLevel: '2650+' },
            location: 'Thriller Boat',
            respawn: '1 Minute.',
            drops: [{name: 'Green Cloak', rarity: 'Legendary', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '5%'}],
            rewards: { money: '11,500', Exp: '$37,200,000'},
            about: 'Swordsman on his youth full of vigor!',
            tips: ['Not needed!']
        },
        {
            id: 'Desert-Boss',
            name: 'Desert',
            sea: 2,
            level: '2800',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4e/Desert_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222151957',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4e/Desert_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222151957',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Holds himself in a rather high regard!',
            stats: { atk: '875.2', hp: '39.861', recLevel: '2800+' },
            location: 'Thriller Boat',
            respawn: '1 Minute.',
            drops: [{name: 'N/A'}],
            rewards: { money: '9,850', Exp: '$25,700,000'},
            about: 'Arrogant fool!',
            tips: ['Not needed!']
        },
        {
            id: 'Mace-Boss',
            name: 'Mace Boss',
            sea: 1,
            level: '700',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c0/MaceBoss.png/revision/latest?cb=20260705200138',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c0/MaceBoss.png/revision/latest?cb=20260705200138',
            tags: [{ label: 'Super Boss', class: 'tag-green' }, { label: 'First Sea', class: 'tag-blue' }],
            desc: 'Some crazy cultist!',
            stats: { atk: '200', hp: '53.828', recLevel: '700+' },
            location: 'Marine Base Town',
            respawn: '',
            respawnmethod: 'Unlock the gate by using the Lava key, and drop a Lava ore into the cauldron.',
            drops: [{name: 'Coded Mask', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '100%'},
            {name: 'Mace', rarity: 'Uncommon', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '100%'}],
            rewards: { money: '$5,000', Gems: '15'},
            about: 'Insane person.',
            tips: ['Not needed!']
        },
        {
            id: 'MaceV2-Boss',
            name: 'MaceV2 Boss',
            sea: 2,
            level: '2950',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7d/MaceV2_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222153511',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/7d/MaceV2_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222153511',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Selfish person.',
            stats: { atk: '922', hp: '41.987', recLevel: '2.900+' },
            location: 'Dragon Island',
            respawn: '30 Seconds.',
            drops: [{name: 'Purple Orb', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '13,500', Exp: '46.000.000'},
            about: 'Loves to fight.',
            tips: ['Not needed!']
        },
        {
            id: 'Shadow-Boss',
            name: 'Shadow Boss',
            sea: 2,
            level: '3100',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/1/1f/Shadow_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222154422',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/1/1f/Shadow_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222154422',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Just wanted to reach the top!',
            stats: { atk: '968.8', hp: '44.113', recLevel: '3050+' },
            location: 'Shadow Island',
            respawn: '30 Seconds.',
            drops: [{name: 'N/A'}],
            rewards: { money: '14,500', Exp: '50.800.000'},
            about: 'Loves to fight.',
            tips: ['Not needed!']
        },
        {
            id: 'Peanut-Boss',
            name: 'Peanut',
            sea: 2,
            level: '3250',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/51/Peanut_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222155606',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/51/Peanut_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222155606',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Peanut man for peanut people!',
            stats: { atk: '1015.6', hp: '46.239', recLevel: '3,250+' },
            location: 'Peanut Island',
            respawn: '30 Seconds.',
            drops: [{name: 'N/A'}],
            rewards: { money: '15,500', Exp: '55.800.000'},
            about: 'Loves being surrounded by those he loves.',
            tips: ['Not needed!']
        },
        {
            id: 'Tree-Boss',
            name: 'Tree Boss',
            sea: 2,
            level: '4400',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c0/Tree_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222160529',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/c/c0/Tree_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222160529',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Selfish person.',
            stats: { atk: '1062.4', hp: '48.366', recLevel: '3500+' },
            location: 'Dough Island',
            respawn: '30 Seconds.',
            drops: [{name: 'N/A'}],
            rewards: { money: '16,500', Exp: '61.000.000'},
            about: 'Hates to fight.',
            tips: ['Not needed!']
        },
        {
            id: 'Soul-Boss',
            name: 'Soul Boss',
            sea: 2,
            level: '3550',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/3/3d/Soul_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222161611',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/3/3d/Soul_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222161611',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Selfish person.',
            stats: { atk: '1109.1', hp: '50.492', recLevel: '3500+' },
            location: 'Cake Island',
            respawn: '30 Seconds.',
            drops: [{name: 'Mirror Fragment', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '17,500', Exp: '66.500.000'},
            about: 'Loves to humiliate others!',
            tips: ['Not needed!']
        },
        {
            id: 'Snow-Boss',
            name: 'Snow Boss',
            sea: 2,
            level: '3850',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/f2/Snow_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222163331',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/f2/Snow_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222163331',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Kind natured individual.',
            stats: { atk: '1202.7', hp: '54.744', recLevel: '3.800+' },
            location: 'Winter Island',
            respawn: '30 Seconds.',
            drops: [{name: 'Snow orb', rarity: 'Legendary', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: 'Unobtainable'}],
            rewards: { money: '19,500', Exp: '78.200.000'},
            about: 'Loves to fool around!',
            tips: ['Not needed!']
        },
        {
            id: 'Love-Boss',
            name: 'Love Boss',
            sea: 2,
            level: 'Snake Earrings',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/f4/Love_Boss.webp/revision/latest/scale-to-width-down/267?cb=20250222164156',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/f/f4/Love_Boss.webp/revision/latest/scale-to-width-down/267?cb=20250222164156',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Kind natured individual.',
            stats: { atk: '1202.7', hp: '54.744', recLevel: '3.950+' },
            location: 'Snake Amazon Island',
            respawn: '30 Seconds.',
            drops: [{name: 'Snake Earrings', rarity: 'Rare', amount: 'x1',img: 'https://placehold.co/50?text=Sand', chance: '1%'}],
            rewards: { money: '20,500', Exp: '84.300.000'},
            about: 'Loves Luffy!',
            tips: ['Not needed!']
        },
        {
            id: 'Baboon-Boss',
            name: 'Baboon Boss',
            sea: 2,
            level: '3700',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/88/Baboon_Boss.webp/revision/latest/scale-to-width-down/267?cb=20250222162723',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/8/88/Baboon_Boss.webp/revision/latest/scale-to-width-down/267?cb=20250222162723',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Eats bananas and munches opponents.',
            stats: { atk: '1155.3', hp: '52.618', recLevel: '3700+' },
            location: 'Foggy Castle Island',
            respawn: '30 Seconds.',
            drops: [{name: 'N/A'}],
            rewards: { money: '18,500', Exp: '72.200.000'},
            about: 'Hates to fight.',
            tips: ['Not needed!']
        },
        {
            id: 'Venom-Boss',
            name: 'Venom Boss',
            sea: 2,
            level: '4150',
            image: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/50/Venom_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222165116',
            icon: 'https://static.wikia.nocookie.net/haze-piece-official/images/5/50/Venom_Boss.webp/revision/latest/scale-to-width-down/268?cb=20250222165116',
            tags: [{ label: 'Normal Boss', class: 'tag-green' }, { label: 'Second Sea', class: 'tag-blue' }],
            desc: 'Persists to kill all around him.',
            stats: { atk: '1296.2', hp: '58.997', recLevel: '4100+' },
            location: 'Venom Island',
            respawn: '30 Seconds.',
            drops: [{name: 'N/A'}],
            rewards: { money: '21,500', Exp: '90.700.000'},
            about: 'Loves to poison others.',
            tips: ['Not needed!']
        },
    ];

    // --- STATE VARIABLES ---
    let activeSea = 1;
    let activeCategory = 'Normal Boss'; // New state for tracking boss type

    // SAFE FALLBACK: Find the first boss that matches BOTH the active sea and category
    function getInitialBoss() {
        return bossesData.find(b => b.sea === activeSea && b.tags.some(t => t.label === activeCategory));
    }
    let activeBossId = getInitialBoss() ? getInitialBoss().id : null;

    // --- RENDER FUNCTION ---
    function renderApp() {
        // Filter by both Sea and Category (Normal vs Super)
        const currentSeaBosses = bossesData.filter(b => 
            b.sea === activeSea && 
            b.tags.some(t => t.label === activeCategory)
        );
        const activeBoss = bossesData.find(b => b.id === activeBossId);

        // Created a two-tier tab system
        const tabsHTML = `
            <div class="boss-tabs category-tabs" style="margin-bottom: 8px;">
                <div class="boss-tab ${activeCategory === 'Normal Boss' ? 'active' : ''}" data-cat="Normal Boss">NORMAL BOSSES</div>
                <div class="boss-tab ${activeCategory === 'Super Boss' ? 'active' : ''}" data-cat="Super Boss">SUPER BOSSES</div>
            </div>
            <div class="boss-tabs sea-tabs">
                <div class="boss-tab ${activeSea === 1 ? 'active' : ''}" data-sea="1">SEA 1</div>
                <div class="boss-tab ${activeSea === 2 ? 'active' : ''}" data-sea="2">SEA 2</div>
                <div class="boss-tab ${activeSea === 3 ? 'active' : ''}" data-sea="3">SEA 3</div>
            </div>
        `;

        if (!activeBoss) {
            $container.html(`
                ${tabsHTML}
                <div class="boss-layout" style="justify-content: center; align-items: center; color: var(--text-muted); min-height: 300px;">
                    <h2>No ${mw.html.escape(activeCategory)}es added for Sea ${mw.html.escape(activeSea)} yet.</h2>
                </div>
            `);
            return;
        }

        $container.html(`
            ${tabsHTML}
            <div class="boss-layout">
                <div class="boss-sidebar">
                    <input type="text" class="boss-search" placeholder="Search bosses...">
                    <div class="boss-list">
                        ${currentSeaBosses.map(boss => `
                            <div class="boss-list-item ${boss.id === activeBossId ? 'active' : ''}" data-id="${boss.id}">
                                <img src="${boss.icon}" alt="${boss.name}">
                                <div class="boss-list-item-info">
                                    <strong>${boss.name}</strong>
                                    <span>Level ${boss.level}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="boss-content">
                    <div class="boss-header">
                        <img src="${activeBoss.image}" class="boss-portrait">
                        <div class="boss-details">
                            <h1 style="margin:0; color:var(--accent-gold); font-size:32px;">${activeBoss.name}</h1>
                            <div class="boss-tags">
                                ${activeBoss.tags.map(t => `<span class="boss-tag ${t.class}">${t.label}</span>`).join('')}
                            </div>
                            <p style="color:var(--text-muted); line-height:1.5;">${activeBoss.desc}</p>
                            
                            <div class="boss-stats">
                                <div class="stat-row"><span>⚔️ ATK PER HIT</span> <strong>${activeBoss.stats.atk}</strong></div>
                                <div class="stat-row"><span>❤️ HP</span> <strong>${activeBoss.stats.hp}</strong></div>
                                <div class="stat-row"><span>💀 RECOMMENDED LEVEL</span> <strong>${activeBoss.stats.recLevel}</strong></div>
                            </div>
                        </div>
                    </div>

                    <!-- Updated Location & Respawn Info -->
                    <div class="boss-section info-grid">
                        <div>
                            <span style="color:var(--accent-gold); font-size:12px; display:block;">📍 LOCATION</span>
                            <strong>${activeBoss.location}</strong>
                        </div>
                        
                        <!-- Only render Respawn Time if it is NOT empty -->
                        ${activeBoss.respawn ? `
                            <div>
                                <span style="color:var(--accent-gold); font-size:12px; display:block;">⏱️ RESPAWN TIME</span>
                                <strong>${activeBoss.respawn}</strong>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Only render Respawn Method if it exists on the boss -->
                    ${activeBoss.respawnmethod ? `
                        <div class="boss-section" style="margin-top: 15px;">
                            <span style="color:var(--accent-gold); font-size:12px; display:block;">📝 HOW TO SPAWN</span>
                            <p style="margin: 5px 0 0 0; color:var(--text-muted); line-height:1.5;">${activeBoss.respawnmethod}</p>
                        </div>
                    ` : ''}

                    <!-- Updated Drops Section -->
                    <div class="boss-section">
                        <h3>Drops</h3>
                        <div class="drop-grid">
                            ${activeBoss.drops.map(drop => `
                                <div class="drop-card">
                                    ${drop.img ? `<img src="${drop.img}">` : ''}
                                    <strong>${drop.name}</strong>
                                    ${drop.rarity ? `<span style="color:${drop.rarity === 'Rare' ? 'var(--accent-blue)' : 'var(--text-muted)'}">${drop.rarity}</span>` : ''}
                                    
                                    <!-- Wrapping amount and chance together -->
                                    <div style="margin-top: 4px;">
                                        ${drop.amount ? `<span>${drop.amount}</span>` : ''}
                                        ${drop.chance ? `<span style="color:var(--accent-gold); margin-left: 5px;">(${drop.chance})</span>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="boss-section">
                        <h3>About</h3>
                        <p style="margin:0; color:var(--text-muted); line-height:1.5;">${activeBoss.about}</p>
                    </div>

                    <div class="boss-section">
                        <h3>Strategy Tips</h3>
                        <ul style="color:var(--text-muted); margin:0; padding-left:20px; line-height:1.8;">
                            ${activeBoss.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `);
    }

    // --- EVENT DELEGATION (Only runs once) ---
    
    // Category (Normal/Super) tab clicks
    $container.on('click', '.category-tabs .boss-tab', function() {
        activeCategory = $(this).attr('data-cat');
        // Re-filter to select the first boss of the new category
        const newCategoryBosses = bossesData.filter(b => b.sea === activeSea && b.tags.some(t => t.label === activeCategory));
        activeBossId = newCategoryBosses.length > 0 ? newCategoryBosses[0].id : null;
        renderApp();
    });

    // Sea tab clicks
    $container.on('click', '.sea-tabs .boss-tab', function() {
        activeSea = parseInt($(this).attr('data-sea'));
        // Re-filter to select the first boss of the new sea
        const newSeaBosses = bossesData.filter(b => b.sea === activeSea && b.tags.some(t => t.label === activeCategory));
        activeBossId = newSeaBosses.length > 0 ? newSeaBosses[0].id : null;
        renderApp();
    });

    // Sidebar boss clicks
    $container.on('click', '.boss-list-item', function() {
        activeBossId = $(this).attr('data-id');
        renderApp();
    });

    // Search bar typing
    $container.on('keyup', '.boss-search', function() {
        const query = $(this).val().toLowerCase();
        $container.find('.boss-list-item').each(function() {
            const name = $(this).find('strong').text().toLowerCase();
            $(this).toggle(name.includes(query));
        });
    });

    // --- START APP ---
    renderApp();
});
/*----------------------------------------------------------------------------SPECIAL ABILITIES-----------------------------------------------------------------------------------------------------*/

mw.hook('wikipage.content').add(function($content) {
    const $container = $content.find('.skills-app-container');
    if (!$container.length || $container.hasClass('initialized')) return;
    $container.addClass('initialized');

    // --- DATA STORE ---
    const skillsData = [
        {
            id: 'flash-step',
            name: 'FLASH STEP',
            type: 'Movement',
            themeColor: '#b366ff', // Purple theme
            icon: 'https://placehold.co/40x40/151518/b366ff?text=FS',
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4f/Flash_Step.png/revision/latest/scale-to-width-down/553?cb=20260703233646',
            desc: 'A high-speed mobility technique that allows you to instantly move a short distance.',
            info: {
                learnedFrom: 'Flash Step Teacher',
                sea: 'Sea 1',
                available: 'Always Available!'
            },
            evolutions: [
                { name: 'Flash Step I', tag: 'Basic', tagColor: '#888', desc: 'Instantly dash a short distance. (100 Studs + 12 Secs cd)' },
                { name: 'Flash Step II', tag: 'Advanced', tagColor: '#b366ff', desc: 'Increased distance (150 Studs) and reduced cooldown. (10)' },
                { name: 'Flash Step III', tag: 'Expert', tagColor: '#b366ff', desc: 'Even faster casting and longer distance (200 Studs) + less cooldown. (8)' }
            ],
            learningReqs: { level: 1, gems: 0, money: '$25,000', items: 'N/A' },
            upgradeReqs: [
                { evo: 'I → II', level: 1, gems: 0, money: '$25,000', items: 'N/A' },
                { evo: 'II → III', level: 600, gems: 0, money: '$75,000', items: 'N/A' },
                { evo: 'III → IV', level: 1900, gems: 0, money: '$200,000', items: 'N/A' }
            ],
            moves: [
                { key: 'T', name: 'Flash Step', desc: 'Disappear and reappear a short distance away.', cooldown: '8s', gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTF2ZnNnbXhhd2Z3cDJ6MXNjMW84dXA5cGRrcWo1dmZmZzQyNHI4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WeMi8csXbXTLKaIIjI/giphy.gif' }
            ],
            location: {
                name: 'House',
                sub: 'Clown Island',
                desc: 'The Flash Step Teacher can be found right by a houses window.',
                img: 'https://static.wikia.nocookie.net/haze-piece-official/images/0/0c/FlashStepTrainer1stSpawn.png/revision/latest/scale-to-width-down/800?cb=20260705174259'
            }
        },
        {
            id: 'armament',
            name: 'ARMAMENT HAKI',
            type: 'Combat',
            themeColor: '#ff4d4d',
            icon: 'https://placehold.co/40x40/151518/ff4d4d?text=AH',
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/ab/ArmamentTeacher.png/revision/latest/scale-to-width-down/530?cb=20260705184332',
            desc: 'Harden your body to increase attack damage and bypass natural immunities.',
            info: { learnedFrom: 'Rayleigh', sea: 'Sea 1', available: 'Level 100+' },
            evolutions: [
                { name: 'Stage 1', tag: 'Basic', tagColor: '#888', desc: 'Coats fists.' },
                { name: 'Stage 2', tag: 'Medium', tagColor: '#ff4d4d', desc: 'Coats Arms.' },
                { name: 'Stage 3', tag: 'Semi-Advanced', tagColor: '#ff4d4d', desc: 'Coats Arms + Feet.' },
                { name: 'Stage 4', tag: 'Advanced', tagColor: '#ff4d4d', desc: 'Coats Arms + Legs' }
            ],
            learningReqs: { level: 350, gems: 0, money: '$100,000', items: 'None' },
            // --- NEW ADDITIONS HERE ---
            upgradeType: 'strikes',
            upgradeReqs: [
                { evo: '1 → 2', req: '5000 Strikes' },
                { evo: '2 → 3', req: '20,000 Strikes' },
                { evo: '3 → 4', req: '50,000 Strikes' }
                
            ],
            // --------------------------
            moves: [
                { key: 'J', name: 'Toggle Haki', desc: 'Activate Armament Haki to boost damage.', cooldown: '1s', gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXVzbjRzMGIyaXJwbzN2c3A1ZHlja3N0d2o2cXV4NW0zc2lmZTgzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bO3F5LQvEfS1dQrq7d/giphy.gif' }
            ],
            location: {
                name: 'Tower Yard', sub: 'Marine Base Town', desc: 'Find the hidden master to learn this power.', img: 'https://static.wikia.nocookie.net/haze-piece-official/images/e/e3/ArmamentLocation.png/revision/latest/scale-to-width-down/800?cb=20260705184710'
            }
        },
        {
            id: 'geppo',
            name: 'GEPPO',
            type: 'Movement',
            themeColor: '#3498db', // Sky Blue theme
            icon: 'https://placehold.co/40x40/151518/3498db?text=GP',
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/79/SkyTeacher.png/revision/latest/scale-to-width-down/602?cb=20260705175328',
            desc: 'A superhuman martial arts technique that allows the user to kick off the air itself, enabling mid-air flight and extra jumps.',
            info: {
                learnedFrom: 'Sky Teacher',
                sea: 'Sea 1',
                available: 'Always Available'
            },
            evolutions: [
                { name: 'Sky Walk I', tag: 'Basic', tagColor: '#888', desc: 'Allows multiple mid-air jumps.' }
            ],
            learningReqs: { level: 1, gems: 0, money: '$20,000', items: 'None' },
            upgradeReqs: [
                { evo: 'N/A', level: 1, gems: 0, money: '$0', items: '—' },
            ],
            moves: [
                { key: 'SPACE', name: 'Sky Jump', desc: 'Kick the air to jump higher while already airborne.', cooldown: '0.5s', gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnlpejBtbHY4aGlvNG1teXBobWpiZGNkYWRjN2xsc2VseXJ1cmNwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/G7YYRcZeYKTYRWWJME/giphy.gif' },
            ],
            location: {
                name: 'Secret Cave',
                sub: 'Rocky Pillars',
                desc: 'The Sky Teacher stands at the very peak of the Rocky Pillars, inside a secret cave.',
                img: 'https://static.wikia.nocookie.net/haze-piece-official/images/a/a8/GeppoLocation.png/revision/latest/scale-to-width-down/800?cb=20260705175145'
            }
        },
        {
            id: 'observation',
            name: 'OBSERVATION HAKI',
            type: 'Support',
            themeColor: '#f1c40f',
            icon: 'https://placehold.co/40x40/151518/f1c40f?text=OH',
            mainImage: 'https://static.wikia.nocookie.net/haze-piece-official/images/7/70/ObservationHakiNpc.png/revision/latest/scale-to-width-down/487?cb=20260705180158',
            desc: 'Awaken your sixth sense to feel the presence of others, predict incoming attacks, and automatically dodge strikes.',
            info: { learnedFrom: 'Observation Haki Teacher', sea: 'Sea 1', available: 'Level 600+' },
            evolutions: [
                { name: 'Instinct 1', tag: 'Basic', tagColor: '#888', desc: 'Grants 3 automatic dodges and highlights enemies + Reveals enmy Health and dodges.' },
                { name: 'Instinct 2', tag: 'Master', tagColor: '#f1c40f', desc: 'Grants everything previously mentioned + Aura Cosmetic and Inventory Items visibility + stamina' }
            ],
            learningReqs: { level: 600, gems: 0, money: '$150,000', items: 'None' },
            // --- NEW ADDITIONS HERE ---
            upgradeType: 'dodges',
            upgradeReqs: [
                { evo: '1 → 2', req: '100 Dodges', unlocks: '+1 Dodge (4 Total)' },
                { evo: '2 → 3', req: '1,000 Dodges', unlocks: '+1 Dodge (5 Total)' },
                { evo: '3 → 4', req: '2,000 Dodges', unlocks: '+1 Dodge (6 Total)' },
                { evo: '4 → 5', req: '3,000 Dodges', unlocks: '+1 Dodge (7 Total)' },
                { evo: '5 → 6', req: 'Quest Completed: 4,000 Dodges, 10 Bosses hunted across 10 Islands, 5 players Hunted & $10,000,000', unlocks: '+1 Dodge (8 Total)' },
                { evo: '6 → 7', req: 'Pay up 2 Shrine Relics and 1000 Gems + previous quest complete', unlocks: 'Toolbar Item Visibility + Stamina and Aura cosmetic!' },
            ],
            // --------------------------
            moves: [
                { key: 'R', name: 'Toggle Instinct', desc: 'Activate Observation Haki to begin dodging and tracking enemies.', cooldown: '3s', gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHEzcHdtNGF5c25vOGJxY3F0YW1zYndldTFjcG1qbzBudjU3dG95YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cNHZJ14VoYMXeeyGBb/giphy.gif' }
            ],
            location: {
                name: 'Upper Yard', sub: 'Marine Base Town', desc: 'A legendary Rockstar thats fleeing from the marines.', img: 'https://static.wikia.nocookie.net/haze-piece-official/images/4/4e/ObservationLocation.png/revision/latest/scale-to-width-down/800?cb=20260705181919'
            }
        }
    ];

    let activeSkillId = skillsData[0].id;

    function renderApp() {
        const active = skillsData.find(s => s.id === activeSkillId);

        $container.html(`
            <div class="skills-sidebar">
                <div class="skills-sidebar-title">Select a Skill</div>
                ${skillsData.map(skill => `
                    <div class="skill-nav-item ${skill.id === activeSkillId ? 'active' : ''}" 
                         data-id="${skill.id}" 
                         style="${skill.id === activeSkillId ? `border-left-color: ${skill.themeColor};` : ''}">
                        <img src="${skill.icon}" class="skill-nav-icon">
                        <div>
                            <strong style="display:block; font-size:14px; ${skill.id === activeSkillId ? `color: ${skill.themeColor}` : ''}">${skill.name}</strong>
                            <span style="font-size:11px; color:var(--text-muted);">${skill.type}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="skills-content">
                <div class="skill-header">
                    <img src="${active.mainImage}" class="skill-main-img">
                    <div class="skill-info">
                        <div class="skill-title-row">
                            <h1 style="color: ${active.themeColor}">${active.name}</h1>
                            <span class="skill-type-tag" style="color: ${active.themeColor}; border: 1px solid ${active.themeColor} transparent;">${active.type}</span>
                        </div>
                        <p style="color: var(--text-muted); line-height: 1.5; margin: 0;">${active.desc}</p>
                        
                        <div class="skill-info-grid">
                            <div class="info-stat"><span>🎯 TYPE</span><strong>${active.type}</strong></div>
                            <div class="info-stat"><span>🎓 LEARNED FROM</span><strong>${active.info.learnedFrom}</strong></div>
                            <div class="info-stat"><span>🌊 SEA</span><strong>${active.info.sea}</strong></div>
                            <div class="info-stat"><span>🕒 AVAILABLE</span><strong>${active.info.available}</strong></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="section-title" style="color: ${active.themeColor}; border-color: ${active.themeColor}">Evolutions</div>
                    <div class="evolutions-track">
                        ${active.evolutions.map((evo, index) => `
                            <div class="evo-card" style="${index === active.evolutions.length - 1 ? `border-color: ${active.themeColor};` : ''}">
                                <strong style="display:block;">${evo.name}</strong>
                                <span class="evo-tag" style="background: rgba(255,255,255,0.1); color: ${evo.tagColor}; border: 1px solid ${evo.tagColor}">${evo.tag}</span>
                                <p style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">${evo.desc}</p>
                            </div>
                            ${index < active.evolutions.length - 1 ? `<div class="evo-arrow">></div>` : ''}
                        `).join('')}
                    </div>
                </div>

                <div class="reqs-split">
                    <div class="reqs-box">
                        <div class="section-title" style="color: ${active.themeColor}">Learning Requirements</div>
                        To learn ${active.evolutions[0] ? active.evolutions[0].name : 'Base Skill'}
                        <div class="reqs-icons">
                            <div><span style="font-size:20px;">⭐</span><br><strong style="font-size:14px;">${active.learningReqs.level}</strong><br><span style="font-size:10px; color:var(--text-muted)">Level</span></div>
                            <div><span style="font-size:20px;">💎</span><br><strong style="font-size:14px;">${active.learningReqs.gems}</strong><br><span style="font-size:10px; color:var(--text-muted)">Gems</span></div>
                            <div><span style="font-size:20px;">💵</span><br><strong style="font-size:14px;">${active.learningReqs.money}</strong><br><span style="font-size:10px; color:var(--text-muted)">Money</span></div>
                            <div><span style="font-size:20px;">📦</span><br><strong style="font-size:14px;">${active.learningReqs.items}</strong><br><span style="font-size:10px; color:var(--text-muted)">Items</span></div>
                        </div>
                    </div>
                    
                    <div class="reqs-box">
                        <div class="section-title" style="color: ${active.themeColor}">Upgrade Requirements</div>
                        
                        ${active.upgradeType === 'strikes' ? `
                            <table class="req-table">
                                <tr><th>EVOLUTION</th><th>STRIKES REQUIRED</th></tr>
                                ${active.upgradeReqs.map(req => `
                                    <tr>
                                        <td style="color: ${active.themeColor}">${req.evo}</td>
                                        <td>${req.req}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        ` : active.upgradeType === 'dodges' ? `
                            <table class="req-table">
                                <tr><th>EVOLUTION</th><th>DODGES REQUIRED</th><th>UNLOCKS</th></tr>
                                ${active.upgradeReqs.map(req => `
                                    <tr>
                                        <td style="color: ${active.themeColor}">${req.evo}</td>
                                        <td>${req.req}</td>
                                        <td style="color: #f1c40f; font-weight: bold;">${req.unlocks}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        ` : `
                            <table class="req-table">
                                <tr><th>EVOLUTION</th><th>LEVEL</th><th>GEMS</th><th>MONEY</th><th>ITEMS</th></tr>
                                ${active.upgradeReqs.map(req => `
                                    <tr>
                                        <td style="color: ${active.themeColor}">${req.evo}</td>
                                        <td>${req.level}</td>
                                        <td>${req.gems}</td>
                                        <td>${req.money}</td>
                                        <td>${req.items}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        `}
                    </div>
                </div>

                <div class="moves-grid">
                    ${active.moves.map(move => `
                        <div class="move-card">
                            <div class="move-header">
                                <span class="key-badge" style="border: 1px solid ${active.themeColor}; color: ${active.themeColor}">${move.key}</span>
                                <strong>${move.name}</strong>
                            </div>
                            <img src="${move.gif || 'https://placehold.co/200x120/151518/333?text=Missing+GIF'}" class="move-gif">
                            <p style="font-size: 12px; color: var(--text-muted); margin: 0;">${move.desc}</p>
                            <div class="move-cooldown">
                                <span>COOLDOWN</span>
                                <strong>${move.cooldown}</strong>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="location-card">
                    <img src="${active.location.img}" class="loc-img">
                    <div>
                        <span style="color: var(--accent-gold); font-size: 12px; letter-spacing: 1px;">📍 LOCATION</span>
                        <h2 style="margin: 5px 0; color: ${active.themeColor};">${active.location.name}</h2>
                        <span style="font-size: 14px; font-weight: bold;">${active.location.sub}</span>
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 10px;">${active.location.desc}</p>
                    </div>
                </div>
            </div>
        `);
    }

    // --- EVENT DELEGATION ---
    $container.on('click', '.skill-nav-item', function() {
        activeSkillId = $(this).attr('data-id');
        renderApp();
    });

    renderApp();
});

/*------------------------------------------------------------------------------------Misc Npc's----------------------------------------------------------------------------------------------------*/

mw.hook('wikipage.content').add(function($content) {
    // 1. Locate the insertion container using Fandom's $content
    const container = $content[0].querySelector(".misc-npc-widget");
    if (!container) return; // Stop if not on a page with the widget
    
    // Prevent double-loading if Fandom refreshes part of the page
    if (container.innerHTML.trim() !== "") return; 

    // 2. Define the NPC Data
    const npcData = [
        {
            sea: 1,
            name: "Cynthia The Fruit Dealer",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7e/DealerGif.gif/revision/latest/scale-to-width-down/120?cb=20260705224708", // Replace with actual Sea 1 Image URL
            desc1: "Allows players to Spin/Buy Fruits",
            desc2: "",
            extra: "-"
        },
        {
            sea: 2,
            name: "Cynthia The Fruit Dealer",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7e/DealerGif.gif/revision/latest/scale-to-width-down/120?cb=20260705224708", // Replace with actual Sea 1 Image URL
            desc1: "Allows players to Spin/Buy Fruits",
            desc2: "",
            extra: "-"
        },
        {
            sea: 3,
            name: "Cynthia The Fruit Dealer",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7e/DealerGif.gif/revision/latest/scale-to-width-down/120?cb=20260705224708", // Replace with actual Sea 1 Image URL
            desc1: "Allows players to Spin/Buy Fruits",
            desc2: "",
            extra: "-"
        },
        {
            sea: 1,
            name: "Yumi The Navigator",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/d/d9/Yumi.gif/revision/latest/scale-to-width-down/120?cb=20260705224755", // Replace with actual Sea 1 Image URL
            desc1: "Set's player spawnpoint",
            desc2: "",
            extra: "-"
        },
        {
            sea: 2,
            name: "Yumi The Navigator",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/d/d9/Yumi.gif/revision/latest/scale-to-width-down/120?cb=20260705224755", // Replace with actual Sea 1 Image URL
            desc1: "Set's player spawnpoint",
            desc2: "",
            extra: "-"
        },
        {
            sea: 3,
            name: "Yumi The Navigator",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/d/d9/Yumi.gif/revision/latest/scale-to-width-down/120?cb=20260705224755", // Replace with actual Sea 1 Image URL
            desc1: "Set's player spawnpoint",
            desc2: "",
            extra: "-"
        },
        {
            sea: 1,
            name: "Dimensional Sailor",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7c/DimensionalSailor.png/revision/latest/scale-to-width-down/561?cb=20260705224158", // Replace with actual Sea 2 Image URL
            desc1: "Allows players to travel to Sea 2.",
            desc2: "Used for traveling to the second sea.",
            extra: "-"
        },
        {
            sea: 2,
            name: "Dimensional Sailor",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7c/DimensionalSailor.png/revision/latest/scale-to-width-down/561?cb=20260705224158", // Replace with actual Sea 2 Image URL
            desc1: "Allows players to travel to Sea 1.",
            desc2: "Used for traveling to the second sea.",
            extra: "-"
        },
        {
            sea: 1,
            name: "BlackSmith",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/b/bd/BlackSmith.gif/revision/latest/scale-to-width-down/113?cb=20260705224430", // Replace with actual Sea 2 Image URL
            desc1: "Located on Starter Island, in the forge.",
            desc2: "Give Seabeast Core & Ice Ore to Blacksmith to create Seabeast Armor and Helmet accessories.",
            extra: "-"
        },
        {
            sea: 2,
            name: "Gatekeeper",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/6/64/GateKeeper.png/revision/latest?cb=20260705224901", // Replace with actual Sea 2 Image URL
            desc1: "Sea 3 Teleporter",
            desc2: "Talk to Gatekeeper at Flower Capital spawn once you reach Level 4200",
            extra: "-"
        },
        {
            sea: 3,
            name: "Doran The Forge",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/4/43/Doran.png/revision/latest/scale-to-width-down/800?cb=20260705225117", // Replace with actual Sea 2 Image URL
            desc1: "Used to craft Accessories, Swords, Titles & etc.",
            desc2: "",
            extra: "-"
        },
        {
            sea: 3,
            name: "Wandering Merchant",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/2/20/WanderingMerchant.png/revision/latest/scale-to-width-down/786?cb=20260705225354", // Replace with actual Sea 2 Image URL
            desc1: "Sells: Ancient Blade Relic for $1M, Blade Fragment for 300k$",
            desc2: "Each item can only be purchased once. If you buy out his stock, he will disappear until he re-appears.",
            extra: "Spawns in a random location in sea 3 every 1H 30M to 2H 30M. (4 Different Spawns)"
        },
        {
            sea: 3,
            name: "Archivist Of Bloodlines",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/5/56/Archivist.png/revision/latest/scale-to-width-down/800?cb=20260705225635", // Replace with actual Sea 2 Image URL
            desc1: "Location: Land Of Gods Near spawn.",
            desc2: "This npc stores up to 5 races for later / future use.",
            extra: "You pay 1k gems for each slot and you can freely swap between those stored races."
        },
        {
            sea: 2,
            name: "Archivist Of Bloodlines",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/5/56/Archivist.png/revision/latest/scale-to-width-down/800?cb=20260705225635", // Replace with actual Sea 2 Image URL
            desc1: "Location: Snowy Graveyard Near spawn.",
            desc2: "This npc stores up to 5 races for later / future use.",
            extra: "You pay 1k gems for each slot and you can freely swap between those stored races."
        },
        {
            sea: 2,
            name: "Fruit Archivist",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/78/FruitArchivist.png/revision/latest/scale-to-width-down/585?cb=20260705225852", // Replace with actual Sea 2 Image URL
            desc1: "Location: Snowy Graveyard Near spawn.",
            desc2: "Similar to the Race Archivist NPC, the Fruit Storage NPC allows players to save powerful fruits for future use instead of permanently losing them when switching to another.",
            extra: "Players may only store fruits that have reached 400 Mastery or higher."
        },
        {
            sea: 3,
            name: "Fruit Archivist",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/78/FruitArchivist.png/revision/latest/scale-to-width-down/585?cb=20260705225852", // Replace with actual Sea 2 Image URL
            desc1: "Location: Land Of Gods Near spawn.",
            desc2: "Similar to the Race Archivist NPC, the Fruit Storage NPC allows players to save powerful fruits for future use instead of permanently losing them when switching to another.",
            extra: "Players may only store fruits that have reached 400 Mastery or higher."
        },
        {
            sea: 3,
            name: "Researcher Iris",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/c/cb/Researcher.png/revision/latest/scale-to-width-down/615?cb=20260705230151", // Replace with actual Sea 2 Image URL
            desc1: "Rainbow Haki obtained from this NPC.",
            desc2: "Must have 12 haki colors (spin them via Pirate Chroma).",
            extra: "She requires prismatic shard + 500 Gems as payment for this rainbow Haki color."
        },
        {
            sea: 2,
            name: "Race Engineer (V2 Obtainment)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/5/5c/RaceEngineer.png/revision/latest/scale-to-width-down/800?cb=20260705230339", // Replace with actual Sea 2 Image URL
            desc1: "Used to upgrade Races to V2",
            desc2: "",
            extra: "Extra information can be found on the Races Page!"
        },
        {
            sea: 3,
            name: "Pirate Chroma",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/e/e0/PirateChroma.png/revision/latest/scale-to-width-down/800?cb=20260705230501", // Replace with actual Sea 2 Image URL
            desc1: "You may equip your haki colors here.",
            desc2: "",
            extra: "She also allows you to spin for 12 unique haki colors (required for rainbow haki)"
        },
        {
            sea: 2,
            name: "Dragon Skins",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/fe/DragonSkins.png/revision/latest/scale-to-width-down/800?cb=20260705230607", // Replace with actual Sea 2 Image URL
            desc1: "Talk to the Boat to spin one of 15 regular colors for 25 gems",
            desc2: "Talk to Haze Dude to purchase/craft one of 6-7 special color",
            extra: "Located on the tall pillar behind Flower Capital"
        },
        {
            sea: 3,
            name: "Dragon Skins",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/fe/DragonSkins.png/revision/latest/scale-to-width-down/800?cb=20260705230607", // Replace with actual Sea 2 Image URL
            desc1: "Talk to the Boat to spin one of 15 regular colors for 25 gems",
            desc2: "Talk to Haze Dude to purchase/craft one of 6-7 special color",
            extra: "located on a pillar in the center of Land Of Gods"
        },
        {
            sea: 3,
            name: "ShapeShifterMimiko",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/a/a8/ShapeShifterMimiko.png/revision/latest/scale-to-width-down/800?cb=20260705230911", // Replace with actual Sea 2 Image URL
            desc1: "Sells race spins for gems.",
            desc2: "Located at Land Of Gods",
            extra: "1 Spin - 25 Gems, 5 Spins - 125 Gems, 10 Spins - 250 Gems"
        },
        {
            sea: 2,
            name: "ShapeShifterMimiko",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/a/a8/ShapeShifterMimiko.png/revision/latest/scale-to-width-down/800?cb=20260705230911", // Replace with actual Sea 2 Image URL
            desc1: "Sells race spins for gems.",
            desc2: "Located at Flower Capital",
            extra: "1 Spin - 25 Gems, 5 Spins - 125 Gems, 10 Spins - 250 Gems"
        },
        {
            sea: 2,
            name: "Bounty Hunter Remzxy",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/8/8c/Remxzy.png/revision/latest?cb=20260705231219", // Replace with actual Sea 2 Image URL
            desc1: "Location: Flower Capital - Near Docks",
            desc2: "This NPC located in sea 2 & 3 will give a quest to hunt random players for a reward. Only players NOT in grace period will be huntable.",
            extra: "If you complete the quest, there will be a 5 minute cooldown. Same applies if the target leaves."
        },
        {
            sea: 3,
            name: "Bounty Hunter Remzxy",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/8/8c/Remxzy.png/revision/latest?cb=20260705231219", // Replace with actual Sea 2 Image URL
            desc1: "Location: Land Of Gods - under bridge",
            desc2: "This NPC located in sea 2 & 3 will give a quest to hunt random players for a reward. Only players NOT in grace period will be huntable.",
            extra: "If you complete the quest, there will be a 5 minute cooldown. Same applies if the target leaves."
        },
        {
            sea: 3,
            name: "ShipWright - Andromeda (Boat Merchant)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/fe/ShipWright.png/revision/latest?cb=20260705231528", // Replace with actual Sea 2 Image URL
            desc1: "Boats are spawned through Boat Merchants, usually located at an island’s docks.",
            desc2: "",
            extra: ""
        },
        {
            sea: 2,
            name: "ShipWright - Andromeda (Boat Merchant)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/fe/ShipWright.png/revision/latest?cb=20260705231528", // Replace with actual Sea 2 Image URL
            desc1: "Boats are spawned through Boat Merchants, usually located at an island’s docks.",
            desc2: "",
            extra: ""
        },
        {
            sea: 1,
            name: "ShipWright - Andromeda (Boat Merchant)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/fe/ShipWright.png/revision/latest?cb=20260705231528", // Replace with actual Sea 2 Image URL
            desc1: "Boats are spawned through Boat Merchants, usually located at an island’s docks.",
            desc2: "",
            extra: ""
        },
        {
            sea: 1,
            name: "StatResetNpc",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/3/35/StatReset.png/revision/latest/scale-to-width-down/539?cb=20260705231755", // Replace with actual Sea 2 Image URL
            desc1: "Gives you the option to reset your stats for 100 Gems or 75 Robux.",
            desc2: "",
            extra: "location: Starter Island - Near spawn, in a house beside the waterfall."
        },
        {
            sea: 1,
            name: "StatResetNpc",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/3/35/StatReset.png/revision/latest/scale-to-width-down/539?cb=20260705231755", // Replace with actual Sea 2 Image URL
            desc1: "Gives you the option to reset your stats for 100 Gems or 75 Robux.",
            desc2: "",
            extra: "location: Flower Capital (SEA 2) - At the spawn point, near the leaderboard."
        },
        {
            sea: 3,
            name: "StatResetNpc",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/3/35/StatReset.png/revision/latest/scale-to-width-down/539?cb=20260705231755", // Replace with actual Sea 2 Image URL
            desc1: "Gives you the option to reset your stats for 100 Gems or 75 Robux.",
            desc2: "",
            extra: "location: Land of Gods - To the right of Spawn on that square circle."
        },
        {
            sea: 3,
            name: "QuestGivers",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7d/QuestGivers.png/revision/latest/scale-to-width-down/443?cb=20260705232114", // Replace with actual Sea 2 Image URL
            desc1: "Each Island has their own quest givers which will help you level up. Some island have multiple quest givers.",
            desc2: "",
            extra: ""
        },
        {
            sea: 2,
            name: "QuestGivers",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7d/QuestGivers.png/revision/latest/scale-to-width-down/443?cb=20260705232114", // Replace with actual Sea 2 Image URL
            desc1: "Each Island has their own quest givers which will help you level up. Some island have multiple quest givers.",
            desc2: "",
            extra: ""
        },
        {
            sea: 1,
            name: "QuestGivers",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/7/7d/QuestGivers.png/revision/latest/scale-to-width-down/443?cb=20260705232114", // Replace with actual Sea 2 Image URL
            desc1: "Each Island has their own quest givers which will help you level up. Some island have multiple quest givers.",
            desc2: "",
            extra: ""
        },
        {
            sea: 1,
            name: "Makino",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/4/49/Makino.png/revision/latest/scale-to-width-down/586?cb=20260705232230", // Replace with actual Sea 2 Image URL
            desc1: "Gives information on Pirates and Marines.",
            desc2: "Sells a bottle of Cola for $1k",
            extra: "Located inside Haze Bar, on Starter Island."
        },
        {
            sea: 1,
            name: "Marine Recruiter",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/0/05/MarineRecruiter.png/revision/latest/scale-to-width-down/552?cb=20260705232501", // Replace with actual Sea 2 Image URL
            desc1: "Switches your team to Marines.",
            desc2: "",
            extra: "Marines can use the bounty board to hunt down pirates for their bounty"
        },
        {
            sea: 2,
            name: "Marine Recruiter",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/0/05/MarineRecruiter.png/revision/latest/scale-to-width-down/552?cb=20260705232501", // Replace with actual Sea 2 Image URL
            desc1: "Switches your team to Marines.",
            desc2: "",
            extra: "Marines can use the bounty board to hunt down pirates for their bounty."
        },
        {
            sea: 1,
            name: "Sword Shop (Merchant)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/1/18/SwordMerchant.png/revision/latest/scale-to-width-down/437?cb=20260705232651", // Replace with actual Sea 2 Image URL
            desc1: "Sells a katana for $1200",
            desc2: "",
            extra: "Located on Starter Island"
        },
        {
            sea: 1,
            name: "Sabo",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/3/36/Sabo.png/revision/latest/scale-to-width-down/422?cb=20260705232750", // Replace with actual Sea 2 Image URL
            desc1: "Sells Pipe for $250k",
            desc2: "",
            extra: "Located in Marine Base Town."
        },
        {
            sea: 1,
            name: "Bella Thell (Merchant)",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/6/6b/Bella_Thell.png/revision/latest?cb=20260705232856", // Replace with actual Sea 2 Image URL
            desc1: "Sells Bisento V1 for $500k",
            desc2: "Also Sells Tremor Cloak accessory for $100k + White Orb",
            extra: "Located on a tower, in the corner of Marine HQ"
        },
        {
            sea: 1,
            name: "Dr.White",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/ff/Dr.White.png/revision/latest/scale-to-width-down/642?cb=20260705232959", // Replace with actual Sea 2 Image URL
            desc1: "Can remove your fruit for 5 gems or 25 rbx",
            desc2: "He also sells Dual Swords (2ss) for $100k. After obtaining 2ss V1, you can learn 2ss V2 by giving him a book, dropped by Dual Swordsman Boss.",
            extra: "Located at Logue Town in 1st Sea"
        },
        {
            sea: 1,
            name: "Mr.Skeleton",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/b/b8/Mr.Skeleton.png/revision/latest/scale-to-width-down/337?cb=20260705233145", // Replace with actual Sea 2 Image URL
            desc1: "Sells Soul Cane for $100k.",
            desc2: "",
            extra: "Located at Impel Jail. Must break a wall to pass through and talk to NPC."
        },
        {
            sea: 1,
            name: "Wizard",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/c/c7/Wizard.png/revision/latest/scale-to-width-down/525?cb=20260705233259", // Replace with actual Sea 2 Image URL
            desc1: "He can spawn a Sea Beast in 1st Sea",
            desc2: "Wizard spawns at Pillars every 30 min - 2h. Despawns after 30 minutes.",
            extra: "You must give the Wizard a COLA which can be bought from Makino at Starter Island! He will then spawn a Sea Beast."
        },
        {
            sea: 1,
            name: "Minion",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/c/c1/Minion.png/revision/latest?cb=20260705233431", // Replace with actual Sea 2 Image URL
            desc1: "Sells Operation Blade for 250k$.",
            desc2: "Must break a wall to pass through and talk to NPC",
            extra: "Hidden on Half Hot Island in 1st Sea"
        },
        {
            sea: 1,
            name: "ForkMerchant",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/4/41/ForkMerchant.png/revision/latest?cb=20260705233644", // Replace with actual Sea 2 Image URL
            desc1: "Sells Trident. Requires a Fork + $50k",
            desc2: "",
            extra: "Located on Fishman Island"
        },
        {
            sea: 1,
            name: "Fisherman",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/f0/Fisherman.png/revision/latest?cb=20260705233756", // Replace with actual Sea 2 Image URL
            desc1: "Sells different fishing rods",
            desc2: "",
            extra: "Located at Starter Island"
        },
        {
            sea: 2,
            name: "Fisherman",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/f/f0/Fisherman.png/revision/latest?cb=20260705233756", // Replace with actual Sea 2 Image URL
            desc1: "Sells different fishing rods",
            desc2: "",
            extra: "Located at Flower Capital docks."
        },
        {
            sea: 1,
            name: "ScrollMerchant",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/a/aa/ScrollMerchant.png/revision/latest?cb=20260705234122", // Replace with actual Sea 2 Image URL
            desc1: "Give him the scroll (5% Boss drop from shiryu) to obtain Raiu",
            desc2: "",
            extra: "Located on Skull Island (behind the skull)"
        },
        {
            sea: 1,
            name: "Vanny",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/5/55/Vanny.png/revision/latest?cb=20260705234224", // Replace with actual Sea 2 Image URL
            desc1: "Sells dino mount for 750 gems",
            desc2: "",
            extra: "Location: Skull Island"
        },
        {
            sea: 2,
            name: "Vanny",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/5/55/Vanny.png/revision/latest?cb=20260705234224", // Replace with actual Sea 2 Image URL
            desc1: "Sells dino mount for 750 gems",
            desc2: "",
            extra: "Location: Flower Capital"
        },
        {
            sea: 2,
            name: "Syn",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/2/2a/Syn.png/revision/latest?cb=20260705234355", // Replace with actual Sea 2 Image URL
            desc1: "Opens up the mirror portal to Mirror World",
            desc2: "Requirements.",
            extra: "1 mirror fragment (1% big mom boss drop - cake island)10 doughnuts (1% drop from any npc on peanut island, dough island, or cake island)"
        },
        {
            sea: 2,
            name: "Spex",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/c/ce/Spex.png/revision/latest?cb=20260705234530", // Replace with actual Sea 2 Image URL
            desc1: "Spawns Dough Superboss for 50 gems",
            desc2: "2 Hour Cooldown",
            extra: "Located in Mirror World"
        },
        {
            sea: 2,
            name: "Nikkolapz",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/b/be/Nikkz.png/revision/latest?cb=20260705234637", // Replace with actual Sea 2 Image URL
            desc1: "Spawns Darkblade Boss for you (Must have completed the quest)",
            desc2: "Further Information on quest may be found on Bosses page.",
            extra: "Located on Foggy Castle Secret Cave"
        },
        {
            sea: 2,
            name: "XmasMarket",
            image: "https://static.wikia.nocookie.net/haze-piece-official/images/b/bc/XmasMarket.png/revision/latest?cb=20260705234823", // Replace with actual Sea 2 Image URL
            desc1: "Sells Race Spins for 300 Presents, Sells Random surprise (10-50gems, 10-30k$, 10 minutes of x2 exp) for 300 presents.",
            desc2: "",
            extra: "Located at Flower Capital"
        }
    ];

    // 3. Build the UI HTML string
    let html = `
        <div class="npc-header-container">
            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/0/0e/NpcIcon.png/revision/latest?cb=20260705221617" alt="Fruit Icon" style="border-radius: 50%;"> <h2>Misc NPC's</h2>
        </div>
        
        <div class="npc-tabs">
            <button class="npc-tab-btn" data-sea="1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 6v10m-7-5a7 7 0 0014 0m-14 0h3m8 0h3"/></svg>
                Sea 1
            </button>
            <button class="npc-tab-btn" data-sea="2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 6v10m-7-5a7 7 0 0014 0m-14 0h3m8 0h3"/></svg>
                Sea 2
            </button>
            <button class="npc-tab-btn" data-sea="3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 6v10m-7-5a7 7 0 0014 0m-14 0h3m8 0h3"/></svg>
                Sea 3
            </button>
        </div>
        
        <div class="npc-list">
    `;

    // 4. Populate the Data (Setting them as hidden initially)
    npcData.forEach(npc => {
        html += `
            <div class="npc-card hidden" data-sea-target="${npc.sea}">
                <div class="npc-image-container">
                    <img class="npc-image" src="${npc.image}" alt="${npc.name}">
                </div>
                
                <div class="npc-details">
                    <div class="npc-main-info">
                        <h3 class="npc-name">${npc.name}</h3>
                        <p class="npc-description">${npc.desc1}</p>
                        <p class="npc-description">${npc.desc2}</p>
                    </div>
                    
                    <div class="npc-extra-info">
                        <h4 class="npc-extra-title">Extra Information</h4>
                        <p class="npc-extra-content">${npc.extra}</p>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    
    // Inject into DOM
    container.innerHTML = html;

    // 5. Add Tab Switching & Filtering Logic
    const tabs = container.querySelectorAll(".npc-tab-btn");
    const cards = container.querySelectorAll(".npc-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            // Add active to clicked tab
            tab.classList.add("active");
            
            // Get the target sea number
            const selectedSea = tab.getAttribute("data-sea");
            
            // Show/Hide cards based on the selected sea
            cards.forEach(card => {
                if(card.getAttribute("data-sea-target") === selectedSea) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // 6. Initialize widget state by simulating a click on the first tab
    if (tabs.length > 0) {
        tabs[0].click();
    }
});

/*------------------------------------------------------------------------------------Shrine--------------------------------------------------------------------------------------------------------*/

mw.hook('wikipage.content').add(function($content) {
    // 1. Locate the insertion container
    const container = $content[0].querySelector(".treasure-raid-widget");
    if (!container) return; 
    
    // 2. Prevent double-loading
    if (container.innerHTML.trim() !== "") return; 

    // 3. Build the large HTML structure
    const html = `
        <!-- HEADER -->
        <div class="tr-header">
            <div class="tr-header-left">
                <img src="https://static.wikia.nocookie.net/haze-piece-official/images/e/e8/Shrine.png/revision/latest/scale-to-width-down/800?cb=20260706001441" alt="Shrine" class="tr-header-icon">
                <div class="tr-header-info">
                    <h2>Treasure Shrine Raid</h2>
                    <span class="tr-badge-sea">SEA 2</span>
                    <p>A treasure vault shrine will surface in one of three locations in Sea 2.<br>Work together, destroy the central chest, and claim the rewards!</p>
                </div>
            </div>
            <div class="tr-cooldown-box">
                <img src="https://static.wikia.nocookie.net/haze-piece-official/images/1/11/Hourglass.png/revision/latest?cb=20260706015025" alt="Hourglass">
                <div class="tr-cooldown-text-area">
                    <p class="tr-cd-label">RAID COOLDOWN</p>
                    <p class="tr-cd-time">1h 45m</p>
                    <p class="tr-cd-sub">After the previous raid ends</p>
                </div>
            </div>
        </div>

        <!-- MAIN BODY GRID -->
        <div class="tr-body-grid">
            
            <!-- LEFT COLUMN -->
            <div class="tr-col-left">
                <!-- How It Works Panel -->
                <div class="tr-panel">
                    <div class="tr-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        HOW IT WORKS
                    </div>
                    <p class="tr-text-muted">A treasure vault shrine (⛩️) will spawn in 1 of 3 locations in Sea 2, which occurs every 1 hour and 45 minutes after the previous raid ends.<br>Spawns in 3 different locations.</p>
                    
                    <div class="tr-highlight-box">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/9/9e/SwordsCross.png/revision/latest?cb=20260706004804" alt="Swords" class="tr-highlight-icon">
                        <div class="tr-highlight-content">
                            <p>To succeed, players must destroy the shrine's central treasure chest within <span class="tr-text-yellow">5 minutes</span> (2-3M HP).</p>
                            <p>If they fail, the doors will close, and the vault will flood with rising water, and all players still inside will be killed instantly.</p>
                        </div>
                    </div>
                </div>

                <!-- Server Messages Panel -->
                <div class="tr-panel">
                    <div class="tr-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        SERVER MESSAGES
                    </div>
                    <div class="tr-message-list">
                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-blue">"The treasure shrine has been spotted in the sea.."</p>
                                <p class="tr-msg-sub">This message will appear 30 seconds before raid starts.</p>
                            </div>
                            <div class="tr-msg-badge color-blue">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                30 SECONDS
                            </div>
                        </div>

                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-yellow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-yellow">"WARNING: The shrine has surfaced. You have 5 minutes to destroy the central vault!"</p>
                                <p class="tr-msg-sub">The shrine will spawn for 5 minutes.</p>
                            </div>
                            <div class="tr-msg-badge color-yellow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                5 MINUTES
                            </div>
                        </div>

                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-red">"WARNING: The vault was not destroyed in time and the shrine is now sinking."</p>
                                <p class="tr-msg-sub">Players failed to destroy the core chest in 5 minutes.</p>
                            </div>
                        </div>

                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-green">"Success. The vault has been destroyed in time!"</p>
                                <p class="tr-msg-sub">Players destroyed the core chest in 5 minutes successfully.</p>
                            </div>
                        </div>

                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-purple">"You have dealt the the most damage and will be rewarded a random rare+ fruit!"</p>
                                <p class="tr-msg-sub">Will only appear to the player who dealt the most damage.</p>
                            </div>
                        </div>
                        
                        <div class="tr-message-item">
                            <div class="tr-msg-icon color-light-purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                            <div class="tr-msg-content">
                                <p class="tr-msg-text color-light-purple">"You have dealt atleast 10% dmg and have been awarded!"</p>
                                <p class="tr-msg-sub">Will only appear to anyone who dealt atleast 10% damage.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="tr-col-right">
                <!-- Rewards Panel -->
                <div class="tr-panel">
                    <div class="tr-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                        REWARDS
                    </div>
                    <p class="tr-text-muted" style="margin-bottom: 20px;">All players who deal at least 10% damage to the treasure chest will earn the following rewards:</p>
                    
                    <div class="tr-rewards-grid">
                        <div class="tr-reward-card">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/4/47/MoneyIcon.png/revision/latest/scale-to-width-down/600?cb=20260525181551" alt="Money" class="tr-reward-img">
                            <p class="tr-reward-val color-green">$30,000 - $80,000</p>
                            <p class="tr-reward-label">Money</p>
                        </div>
                        <div class="tr-reward-card">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/2/2e/Star.png/revision/latest/scale-to-width-down/800?cb=20260706002547" alt="Star" class="tr-reward-img">
                            <p class="tr-reward-val color-yellow">1</p>
                            <p class="tr-reward-label">Level</p>
                        </div>
                        <div class="tr-reward-card">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/9/93/GemsIcon.png/revision/latest/scale-to-width-down/800?cb=20260525191141" alt="Gem" class="tr-reward-img">
                            <p class="tr-reward-val color-blue">25</p>
                            <p class="tr-reward-label">Gems</p>
                        </div>
                        <div class="tr-reward-card mythic">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/a/a4/ShrineRelic.png/revision/latest/scale-to-width-down/720?cb=20260706002733" alt="Relic" class="tr-reward-img">
                            <p class="tr-reward-val color-purple">100%</p>
                            <p class="tr-reward-label">Shrine Relic<br><span style="font-size: 10px">(Legendary Material)</span></p>
                        </div>
                    </div>
                </div>

                <!-- Top Damage Reward -->
                <div class="tr-highlight-box gold" style="margin-bottom: 20px; align-items: center; justify-content: space-between;">
                    <div style="flex: 1;">
                        <div class="tr-panel-header" style="color: #facc15; margin-bottom: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            TOP DAMAGE REWARD
                        </div>
                        <p style="font-size: 13px; color: #d1d5db; margin: 0 0 8px 0; line-height: 1.4;">Only the player who inflicts the <span style="font-weight: bold; color: #fff;">MOST</span> damage will receive a random Rare+ fruit.</p>
                        <p style="font-size: 12px; color: #9ca3af; margin: 0;">(Chances = to Robux Spin in shop)</p>
                    </div>
                    <img src="https://static.wikia.nocookie.net/haze-piece-official/images/a/a5/FruitShrine.png/revision/latest/scale-to-width-down/800?cb=20260706003034" alt="Fruit" style="width: 64px; height: 64px; object-fit: contain;">
                </div>

                <!-- Titles Panel -->
                <div class="tr-panel">
                    <div class="tr-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        TITLES
                    </div>
                    <div class="tr-title-item">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/b/bd/CrownShrine.png.png/revision/latest/scale-to-width-down/800?cb=20260706003251" alt="Crown" class="tr-title-icon">
                        <div class="tr-title-info">
                            <h4 class="color-yellow">The MVP</h4>
                            <p>Get a fruit from the shrine raid (meaning you did the most damage)</p>
                        </div>
                    </div>
                    <div class="tr-title-item">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/5/56/ShrinePlunderer.png/revision/latest/scale-to-width-down/600?cb=20260706003617" alt="Sword" class="tr-title-icon">
                        <div class="tr-title-info">
                            <h4 style="color: #cbd5e1;">Shrine Plunderer</h4>
                            <p>Defeat 1 shrine</p>
                        </div>
                    </div>
                    <div class="tr-title-item">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/2/29/ShrineConqueror.png/revision/latest/scale-to-width-down/600?cb=20260706003819" alt="Purple Swords" class="tr-title-icon">
                        <div class="tr-title-info">
                            <h4 class="color-purple">Shrine Conqueror</h4>
                            <p>Defeat 20 shrines</p>
                        </div>
                    </div>
                    <div class="tr-title-item">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/1/10/Relic_Raider.png/revision/latest/scale-to-width-down/600?cb=20260706004043" alt="Relic Shield" class="tr-title-icon">
                        <div class="tr-title-info">
                            <h4 class="color-yellow">Relic Raider</h4>
                            <p>Defeat 100 shrines</p>
                        </div>
                    </div>
                    <div class="tr-title-item">
                        <img src="https://static.wikia.nocookie.net/haze-piece-official/images/4/46/DrownedIcon.png/revision/latest/scale-to-width-down/600?cb=20260706004336" alt="Water Drop" class="tr-title-icon">
                        <div class="tr-title-info">
                            <h4 class="color-blue">Drowned</h4>
                            <p>Die to shrine by drowning</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    // 4. Inject HTML
    container.innerHTML = html;
});

/*-------------------------------------------------------------------------------------Merchant-----------------------------------------------------------------------------------------------------*/

mw.hook('wikipage.content').add(function($content) {
    const container = $content[0].querySelector(".traveling-merchant-widget");
    if (!container) return; 
    
    if (container.innerHTML.trim() !== "") return; 

    const html = `
        <div class="tm-header">
            <div class="tm-header-left">
                <img src="https://static.wikia.nocookie.net/haze-piece-official/images/2/20/WanderingMerchant.png/revision/latest/scale-to-width-down/786?cb=20260705225354" alt="Merchant" class="tm-header-icon">
                <div class="tm-header-info">
                    <h2>Traveling Merchant</h2>
                    <span class="tm-badge-purple">SEA 3</span>
                    <p>Sells a blade fragment + a relic. Spawns in 1 of 4 locations in Sea 3 every 1H30M - 2H30M. Leaves after 7 minutes or if items are bought.</p>
                </div>
            </div>
            
            <div class="tm-header-stats">
                <div class="tm-stat-box">
                    <svg class="tm-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                    <div class="tm-stat-content">
                        <p class="tm-stat-label">SPAWN TIMER</p>
                        <p class="tm-stat-val">1H 30M - 2H 30M</p>
                        <p class="tm-stat-sub">Random interval</p>
                    </div>
                </div>
                <div class="tm-stat-box">
                    <svg class="tm-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <div class="tm-stat-content">
                        <p class="tm-stat-label">STAY DURATION</p>
                        <p class="tm-stat-val">7 MINUTES</p>
                        <p class="tm-stat-sub">or until stock is bought</p>
                    </div>
                </div>
                <div class="tm-stat-box">
                    <svg class="tm-stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <div class="tm-stat-content">
                        <p class="tm-stat-label">SEA</p>
                        <p class="tm-stat-val">SEA 3</p>
                        <p class="tm-stat-sub">Random location</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="tm-body-grid">
            
            <div class="tm-col-left">
                <div class="tm-panel">
                    <div class="tm-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        OVERVIEW
                    </div>
                    <p class="tm-text-muted" style="margin-bottom: 12px;">Spawns in a random location in Sea 3 every 1H 30M to 2H 30M.</p>
                    <p class="tm-text-muted">Each item can only be purchased once. If you buy out his stock, he will disappear until he re-appears.</p>
                </div>

                <div class="tm-panel">
                    <div class="tm-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        ITEMS FOR SALE
                    </div>
                    <div class="tm-items-grid">
                        <div class="tm-item-card legendary">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/a/a4/ShrineRelic.png/revision/latest/scale-to-width-down/720?cb=20260706002733" alt="Ancient Blade Relic" class="tm-item-img">
                            <p class="tm-item-name gold">Ancient Blade Relic</p>
                            <p class="tm-item-price">1,000,000 $</p>
                            <p class="tm-item-rarity">Legendary Relic</p>
                        </div>
                        <div class="tm-item-card common">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/3/31/Blade_Fragment.png/revision/latest/scale-to-width-down/800?cb=20260706012951" alt="Blade Fragment" class="tm-item-img">
                            <p class="tm-item-name blue">Blade Fragment</p>
                            <p class="tm-item-price">300,000 $</p>
                            <p class="tm-item-rarity">Common Material</p>
                        </div>
                    </div>
                    <div class="tm-warning-box">
                        <svg style="width: 20px; height: 20px; color: #facc15; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <div>
                            <p style="margin: 0 0 4px 0; font-size: 14px; color: #d1d5db;">Each item can only be purchased <span style="color: #facc15; font-weight: bold;">once</span>.</p>
                            <p style="margin: 0; font-size: 13px; color: #9ca3af;">If you buy out his stock, he will disappear until he re-appears.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tm-col-right">
                <div class="tm-panel">
                    <div class="tm-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        CHAT MESSAGES
                    </div>
                    <div class="tm-chat-list">
                        <div class="tm-chat-item">
                            <div class="tm-chat-icon" style="color: #a855f7;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
                            <p class="tm-chat-msg">"A rare trader has entered the seas...<br>his wares won't last long."</p>
                            <p class="tm-chat-cond">Appears when the<br>merchant spawns.</p>
                        </div>
                        <div class="tm-chat-item">
                            <div class="tm-chat-icon" style="color: #4ade80;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div>
                            <p class="tm-chat-msg">"A deal has been struck...<br>the merchant vanishes."</p>
                            <p class="tm-chat-cond">Appears when you<br>buy out his stock.</p>
                        </div>
                        <div class="tm-chat-item">
                            <div class="tm-chat-icon" style="color: #ef4444;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg></div>
                            <p class="tm-chat-msg">"The merchant slips away<br>into the shadows..."</p>
                            <p class="tm-chat-cond">Appears if the stock<br>isn't bought out in 7 min.</p>
                        </div>
                    </div>
                </div>

                <div class="tm-panel">
                    <div class="tm-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        SPAWN LOCATIONS (SEA 3)
                    </div>
                    <div class="tm-locations-grid">
                        <div class="tm-location-card">
                            <div class="tm-loc-header"><span class="tm-loc-num">1</span> Forgotten Throne Land Of Gods</div>
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/c/c1/Spawn1.Webp/revision/latest/scale-to-width-down/800?cb=20260706013926" class="tm-loc-img" alt="Forgotten Cove">
                        </div>
                        <div class="tm-location-card">
                            <div class="tm-loc-header"><span class="tm-loc-num">2</span> Land Of God's Cliffs</div>
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/5/57/CliffCenter.Webp/revision/latest/scale-to-width-down/800?cb=20260706014152" class="tm-loc-img" alt="Haunted Shipyard">
                        </div>
                        <div class="tm-location-card">
                            <div class="tm-loc-header"><span class="tm-loc-num">3</span> Land Of Gods Docks</div>
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/0/0b/LandOfGodsDocks.Webp/revision/latest/scale-to-width-down/800?cb=20260706014334" class="tm-loc-img" alt="Coral Caverns">
                        </div>
                        <div class="tm-location-card">
                            <div class="tm-loc-header"><span class="tm-loc-num">4</span>Land Of Gods Log Pose</div>
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/e/ee/LandOfGodsLogPose.Webp/revision/latest/scale-to-width-down/800?cb=20260706014449" class="tm-loc-img" alt="Mistcliff Outpost">
                        </div>
                    </div>
                    <div class="tm-loc-footer">
                        <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><circle cx="15.5" cy="8.5" r="1.5"></circle><circle cx="15.5" cy="15.5" r="1.5"></circle><circle cx="8.5" cy="15.5" r="1.5"></circle></svg>
                        The merchant will randomly spawn in one of these 4 locations.
                    </div>
                </div>

                <div class="tm-panel">
                    <div class="tm-panel-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        TITLES
                    </div>
                    <div class="tm-titles-grid">
                        <div class="tm-title-card">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/d/d8/The_one_who_found_him.png/revision/latest/scale-to-width-down/800?cb=20260706012538" alt="Gold Badge" class="tm-title-icon">
                            <div class="tm-title-info">
                                <h4>The One Who Found Him</h4>
                                <p>Find and make a deal<br>with the traveling merchant.</p>
                            </div>
                        </div>
                        <div class="tm-title-card">
                            <img src="https://static.wikia.nocookie.net/haze-piece-official/images/b/b6/Black_Market_Hunter.png/revision/latest/scale-to-width-down/800?cb=20260706012249" alt="Purple Badge" class="tm-title-icon">
                            <div class="tm-title-info">
                                <h4 class="purple">Black Market Hunter</h4>
                                <p>Find and make a deal 10 times<br>with the traveling merchant.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    container.innerHTML = html;
});