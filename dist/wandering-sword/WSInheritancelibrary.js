    $(document).ready(function() {
    var $library = $('.inheritance-library');
    if ($library.length === 0) return;

    let totalSpent = 0;
    const selectedItems = new Set();
    let itemsState      = {};
    let blueprintsState = {};
    let attributeState  = {};
    let lifeSkillState  = { forging: 1, tailoring: 1, alchemy: 1, cooking: 1 };
    let legacyState = null;   // Currently selected legacy
    let outfitState = {};

    const BLUE = "https://static.wikia.nocookie.net/wandering-sword/images/d/d7/BlueGenericEmblem.png/revision/latest?cb=20260601020912";

    // ==================== DATA ====================

    const martialData = {
        fist: [
        {name: "Drifting Cloud Tai Chi Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/23/Drifting_Cloud_Tai_Chi_Fist.png/revision/latest?cb=20250731033747", cost: 6000},
        {name: "Soaring Dragon", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5b/SoaringDragon.png/revision/latest?cb=20250810225231", cost: 6000},
        {name: "Tai Chi", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c6/TaiChi.png/revision/latest?cb=20250810225204", cost: 6000},
        {name: "Sun-Blazing Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fe/Sun-BlazingPalm.png/revision/latest?cb=20250810225256", cost: 6000},
        {name: "Proud Dragon Repents", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c3/ProudDragonRepents.png/revision/latest?cb=20250810225244", cost: 6000},
        {name: "Thousand-Hand Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4e/Thousand-HandPalmStrike.png/revision/latest?cb=20250810225217", cost: 6000},
        {name: "Prajna Vajrapani Palms", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/29/PrajnaVajrapaniPalms.png/revision/latest?cb=20250810225107", cost: 4000},
        {name: "Eight Trigrams of Roving Tiger", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/15/EightTrigramsofRovingTiger.png/revision/latest?cb=20250810225050", cost: 4000},
        {name: "Birthless Severance", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ce/Birthless_Severance.png/revision/latest?cb=20250810200137", cost: 4000},
        {name: "Pure Yang Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6d/PureYangFingerStrike.png/revision/latest?cb=20250810225136", cost: 4000},
        {name: "Jade Sculptor's Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/28/Jade_Sculptor_Strike.png/revision/latest?cb=20250812194438", cost: 4000},
        {name: "Lightning Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e7/Litghtning_Strike.png/revision/latest?cb=20250810204507", cost: 4000},
        {name: "Divine Blood Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c0/DivineBloodClaw.png/revision/latest?cb=20250810225150", cost: 4000},
        {name: "Crimson Cloud Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/18/CrimsonCloudPalm.png/revision/latest?cb=20250810214120", cost: 4000},
        {name: "Moonlit Lake", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7e/Moonlit_Lake.png/revision/latest?cb=20250725031252", cost: 4000},
        {name: "Dragonish Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1a/DragonishPalmStrike.png/revision/latest?cb=20250810225121", cost: 4000},
        {name: "Tangled Grappling", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/37/TangledGrappling.png/revision/latest?cb=20250810224723", cost: 2000},
        {name: "Great Vajrapani Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f9/GreatVajrapaniFist.png/revision/latest?cb=20250810224639", cost: 2000},
        {name: "Condor's Seckill Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/47/Condor%27sSeckillClaw.png/revision/latest?cb=20250810224600", cost: 2000},
        {name: "Dragon Claws", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c5/DragonClaws.png/revision/latest?cb=20250810224704", cost: 2000},
        {name: "Slanted Buzhou", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/99/Slanted_Buzhou.png/revision/latest?cb=20250810204420", cost: 2000},
        {name: "Solar-Lunar Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5c/Solar-LunarPalm.png/revision/latest?cb=20250810224918", cost: 2000},
        {name: "Misty Waves", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/14/Misty_Waves.png/revision/latest?cb=20250810204441", cost: 2000},
        {name: "Seventeen-Form Grappling Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a2/Seventeen-Form_Grappling_Technique.png/revision/latest?cb=20250812194515", cost: 2000},
        {name: "Frosty Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f6/FrostyPalmStrike.png/revision/latest?cb=20250810224618", cost: 2000},
        {name: "Chakra Sealing Strikes", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Chakra_Sealing_Strikes.png/revision/latest?cb=20250728013958", cost: 2000},
        {name: "Animitta Finger Strikes", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/2b/Animitta_Finger_Strikes.png/revision/latest?cb=20250815031415", cost: 2000},
        {name: "Jade Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Jade_Palm_Strike.png/revision/latest?cb=20250810204430", cost: 2000},
        {name: "Weakening Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4c/WeakeningPalmStrike.png/revision/latest?cb=20250810224902", cost: 2000},
        {name: "Soft Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a9/SoftPalmStrike.png/revision/latest?cb=20250810224546", cost: 2000},
        {name: "Iron Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/IronPalmStrike.png/revision/latest?cb=20250810224811", cost: 2000},
        {name: "Thunderous Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/75/ThunderousPalmStrike.png/revision/latest?cb=20250810224833", cost: 2000},
        {name: "Flickering Clouds", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f9/Flickering_Clouds.png/revision/latest?cb=20250810204457", cost: 2000},
        {name: "Spring's Ninefold", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Spring%27s_Ninefold.png/revision/latest?cb=20250810195713", cost: 2000},
        {name: "Lotus Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/87/LotusPalm.png/revision/latest?cb=20250810224517", cost: 200},
        {name: "Tablet-Throwing Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ed/Tablet-ThrowingPalm.png/revision/latest?cb=20250810224412", cost: 200},
        {name: "Wudang Long Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4d/WudangLongFist.png/revision/latest?cb=20250810224331", cost: 200},
        {name: "Vedas Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/63/VedasPalmStrike.png/revision/latest?cb=20250810224315", cost: 200},
        {name: "Huanyin Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e0/HuanyinPalmStrike.png/revision/latest?cb=20250810224449", cost: 200},
        {name: "Tri-From Meridian Block", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3b/Tri-Form_Meridian_Block.png/revision/latest?cb=20250810204358", cost: 200},
        {name: "Xuanhuo Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3b/XuanhuoPalmStrike.png/revision/latest?cb=20250810224504", cost: 200},
        {name: "Thunderwake Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7f/Thunderwake_Finger_Strike.png/revision/latest?cb=20250810195935", cost: 200},
        {name: "Plague Blister Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c4/Plague_Blister_Strike.png/revision/latest?cb=20250810204347", cost: 200},
        {name: "Mountain Crush", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5f/MountainCrush.png/revision/latest?cb=20250810224425", cost: 200},
        {name: "Airsplitting Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/37/AirsplittingPalm.png/revision/latest?cb=20250810224348", cost: 200},
        {name: "Condor Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b3/CondorClaw.png/revision/latest?cb=20250810224532", cost: 200},
        {name: "Gathering Storm", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Gathering_Storm.png/revision/latest?cb=20250810204336", cost: 200},
        {name: "Fate-Reversing Fan Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0a/Fate-Reversing_Fan_Technique.png/revision/latest?cb=20250810204325", cost: 50},
        {name: "Taizu Long Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/13/TaizuLongFist.png/revision/latest?cb=20250810224234", cost: 50},
        {name: "Mountain-Shaking Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/67/Mountain-ShakingPalmStrike.png/revision/latest?cb=20250810224202", cost: 50},
        {name: "Arhat Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/55/ArhatFist.png/revision/latest?cb=20250810224134", cost: 50},
        {name: "Blood Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/03/BloodFingerStrike.png/revision/latest?cb=20250810224249", cost: 50},
        {name: "Tongbeiquan", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9e/Tongbeiquan.png/revision/latest?cb=20250810224218", cost: 50},
        {name: "Jianghu Palm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4c/JianghuPalmTechnique.png/revision/latest?cb=20250810224148", cost: 50},
        ],
        hidden: [
        {name: "Vengeance of Scorching Star", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ae/Vengeance_of_Scorching_Star.png/revision/latest?cb=20250725163758", cost: 6000},
        {name: "Crimson Blade Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5c/Crimson_Blade_Mastery.png/revision/latest?cb=20250919014919", cost: 6000},
        {name: "Myriads of Phenomena", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/57/MyriadsofPhenomena.png/revision/latest?cb=20250810231011", cost: 6000},
        {name: "Unrivaled Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/10/UnrivaledFingerStrike.png/revision/latest?cb=20250810231024", cost: 6000},
        {name: "Heart-Piercing Dust", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bd/Heart-PiercingDust.png/revision/latest?cb=20250810230926", cost: 4000},
        {name: "Heart Mansion's Inferno", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a7/Heart_Mansion%27s_Inferno.png/revision/latest?cb=20250725163825", cost: 4000},
        {name: "Magnanimous Rectitude Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ce/Magnanimous_Rectitude_Mastery.png/revision/latest?cb=20250919014905", cost: 4000},
        {name: "Crows' Cawing", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3c/Crows%27Cawing.png/revision/latest?cb=20250810230956", cost: 4000},
        {name: "Rain of Flowers", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5b/RainofFlowers.png/revision/latest?cb=20250810230944", cost: 4000},
        {name: "Blazing Venom Needle", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Blazing_Venom_Needle.png/revision/latest?cb=20250725163849", cost: 2000},
        {name: "Soul-Piercing Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/84/Soul-PiercingNails.png/revision/latest?cb=20250810230831", cost: 2000},
        {name: "Ensnaring Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c4/EnsnaringNails.png/revision/latest?cb=20250810230858", cost: 2000},
        {name: "Kindled Spirit Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/99/Kindled_Spirit_Mastery.png/revision/latest?cb=20250919014810", cost: 2000},
        {name: "Wuluo Smoke", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9a/WuluoSmoke.png/revision/latest?cb=20250810230845", cost: 2000},
        {name: "Thunderclap Flameball", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/af/ThunderclapFlameball.png/revision/latest?cb=20250810230913", cost: 2000},
        {name: "Radiant Grace Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d3/Radiance_Grace_Mastery.png/revision/latest?cb=20250919014848", cost: 2000},
        {name: "Swift Switch", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/76/SwiftSwitch.png/revision/latest?cb=20250810230816", cost: 2000},
        {name: "Double Hit", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c9/DoubleHit.png/revision/latest?cb=20250810230723", cost: 200},
        {name: "Necrotoxin", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/68/Necrotoxin.png/revision/latest?cb=20250810230706", cost: 200},
        {name: "Bloodthirsty Bat", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3b/BloodthirstyBat.png/revision/latest?cb=20250810230653", cost: 200},
        {name: "Poisonous Dragon Tongue", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/28/PoisonousDragonTongue.png/revision/latest?cb=20250810230640", cost: 200},
        {name: "Raining Needles", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a5/RainingNeedles.png/revision/latest?cb=20250810230737", cost: 200},
        {name: "Scorpion Stinger", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b4/Scorpion_Stinger.png/revision/latest?cb=20250728132711", cost: 200},
        {name: "Wuxian Needles", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/WuxianNeedles.png/revision/latest?cb=20250810230540", cost: 50},
        {name: "Bones Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/26/BoneNails.png/revision/latest?cb=20250810230606", cost: 50},
        {name: "Bloody Eagle Beak", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/76/BloodyEagleBeak.png/revision/latest?cb=20250810230552", cost: 50},
        {name: "Jianghu Hidden Weapon", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/JianghuHiddenWeapon.png/revision/latest?cb=20250811022831", cost: 50},
        {name: "Shadowy Arrows", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9d/ShadowyArrows.png/revision/latest?cb=20250810230624", cost: 50},
        ],
        sword: [
        {name: "Drifting Cloud Tai Chi Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cc/Drifting_Cloud_Tai_Chi_Swordplay.png/revision/latest?cb=20250731033733", cost: 6000},
        {name: "Celestial Fairy Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/CelestialFairySwordplay.png/revision/latest?cb=20250811020127", cost: 6000},
        {name: "Tai Chi Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d7/TaiChiSwordplay.png/revision/latest?cb=20250811020112", cost: 6000},
        {name: "Zhenwu's Sword Intent", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/04/Zhenwu%27sSwordIntent.png/revision/latest?cb=20250811020031", cost: 4000},
        {name: "Bodhidharma Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cb/Bodhidharma_Swordplay.png/revision/latest?cb=20250825150539", cost: 4000},
        {name: "Frosty Cloud Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/99/FrostyCloudSword.png/revision/latest?cb=20250811020045", cost: 4000},
        {name: "Nine Manifestations", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/21/Nine_Manifestations.png/revision/latest?cb=20250803055326", cost: 4000},
        {name: "Immortal Ape's Gales Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0b/Immortal_Ape%27s_Gales_Swordplay.png/revision/latest?cb=20250810202240", cost: 4000},
        {name: "Celestial Yang Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/2b/Celestial_Yang_Swordplay.png/revision/latest?cb=20250920235725", cost: 4000},
        {name: "Coral Snake Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/2a/CoralSnakeSword.png/revision/latest?cb=20250811023023", cost: 4000},
        {name: "Ape's Gale Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ed/Ape%27sGaleSwordplay.png/revision/latest?cb=20250811020059", cost: 4000},
        {name: "Moonlit Lake", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7e/Moonlit_Lake.png/revision/latest?cb=20250725031252", cost: 4000},
        {name: "Poison Dragon Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b3/PoisonDragonSword.png/revision/latest?cb=20250811020008", cost: 2000},
        {name: "Drifting Cloud Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/57/DriftingCloudSwordplay.png/revision/latest?cb=20250811015801", cost: 2000},
        {name: "Qingfeng Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c2/QingfengSwordplay.png/revision/latest?cb=20250811015745", cost: 2000},
        {name: "Dragon Roar Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/36/DragonRoarSwordplay.png/revision/latest?cb=20250811015935", cost: 2000},
        {name: "Wilting Blossom Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/48/Wilting_Blossom_Sword.png/revision/latest?cb=20250812195011", cost: 2000},
        {name: "Demon Conquering Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d8/Demon_Conquering_Swordplay.png/revision/latest?cb=20250825144854", cost: 2000},
        {name: "Baidi Whirling Swordplay - Swan", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/BaidiWhirlingSwordplay-Swan.png/revision/latest?cb=20250811015656", cost: 2000},
        {name: "Thunderbolt Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/79/ThunderboltSwordplay.png/revision/latest?cb=20250811015919", cost: 2000},
        {name: "Thirteen Spectral Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cd/Thirteen_Spectral_Swordplay.png/revision/latest?cb=20250803055253", cost: 2000},
        {name: "Immortals' Unforgiving Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6d/Immortals%27UnforgivingSword.png/revision/latest?cb=20250811015710", cost: 2000},
        {name: "Taihua Twelve Swordplays", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c5/TaihuaTwelveSwordplays.png/revision/latest?cb=20250811015724", cost: 2000},
        {name: "Hawkstrider Sword Stance", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b3/HawkstriderSwordStance.png/revision/latest?cb=20250811015951", cost: 2000},
        {name: "Icebolt Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bb/IceboltSwordplay.png/revision/latest?cb=20250811015508", cost: 200},
        {name: "Swaying Pines", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/46/SwayingPines.png/revision/latest?cb=20250811015621", cost: 200},
        {name: "Teal Water Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/TealWaterSwordplay.png/revision/latest?cb=20250811015452", cost: 200},
        {name: "Yin-Yang Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a3/Yin-YangSwordplay.png/revision/latest?cb=20250811015537", cost: 200},
        {name: "Tiger-Taming Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Tiger-Taming_Swordplay.png/revision/latest?cb=20250821204342", cost: 200},
        {name: "Misty Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/04/MistySwordplay.png/revision/latest?cb=20250811015550", cost: 200},
        {name: "Whirlwind Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/86/Whirlwind_Swordplay.png/revision/latest?cb=20250812195029", cost: 200},
        {name: "Whispering Viper", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/54/Whispering_Viper.png/revision/latest?cb=20250810202225", cost: 200},
        {name: "Sky Feather Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/82/SkyFeatherSwordplay.png/revision/latest?cb=20250811015604", cost: 200},
        {name: "Mountain Ridge Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/70/MountainRidgeSwordplay.png/revision/latest?cb=20250811015522", cost: 200},
        {name: "Invigorating Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ac/Invigorating_Swordplay.png/revision/latest?cb=20250810202201", cost: 50},
        {name: "Snakeform Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/Snakeform_Swordplay.png/revision/latest?cb=20250810202213", cost: 50},
        {name: "Wudang Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6c/WudangSwordplay.png/revision/latest?cb=20250811015337", cost: 50},
        {name: "Shaolin Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/79/Shaolin_Swordplay.png/revision/latest?cb=20250821204152", cost: 50},
        {name: "Five Immortals' Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f7/FiveImmortals%27Swordplay.png/revision/latest?cb=20250811015438", cost: 50},
        {name: "Mingjian Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ae/MingjianSwordplay.png/revision/latest?cb=20250811015423", cost: 50},
        {name: "Jianghu Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3c/JianghuSwordplay.png/revision/latest?cb=20250811015409", cost: 50},
        {name: "Graypine Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/2d/GraypineSwordplay.png/revision/latest?cb=20250811015352", cost: 50},
        {name: "Arching Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1a/ArchingSwordplay.png/revision/latest?cb=20250811015321", cost: 10},
        ],
        saber: [
        {name: "Bloodstained Devil's Saber", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/06/BloodstainedDevil%27sSaber.png/revision/latest?cb=20250811013759", cost: 6000},
        {name: "Saha Hell", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/55/SahaHell.png/revision/latest?cb=20250811013746", cost: 6000},
        {name: "Encompassing Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/39/EncompassingSaberplay.png/revision/latest?cb=20250811013732", cost: 6000},
        {name: "Ape's Gales Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d2/Ape%27s_Gales_Saberplay.png/revision/latest?cb=20250810202508", cost: 4000},
        {name: "Four Forms of Zen Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/03/Four_Forms_of_Zen_Saberplay.png/revision/latest?cb=20250815030408", cost: 4000},
        {name: "Xuanxu Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e3/XuanxuSaberplay.png/revision/latest?cb=20250811013634", cost: 4000},
        {name: "Grand Quintfade Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c7/Grand_Quintfade_Saberplay.png/revision/latest?cb=20250810205307", cost: 4000},
        {name: "Firebrand Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4a/FirebrandSaberplay.png/revision/latest?cb=20250811013622", cost: 4000},
        {name: "Full Moon Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e6/FullMoonSaberplay.png/revision/latest?cb=20250811013649", cost: 4000},
        {name: "Flame and Saber's Trial", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a9/FlameandSaber%27sTrial.png/revision/latest?cb=20250811013703", cost: 4000},
        {name: "Heart-Devouring Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bf/Heart-DevouringSaberplay.png/revision/latest?cb=20250811013718", cost: 4000},
        {name: "Guiyuan Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/05/GuiyuanSaberplay.png/revision/latest?cb=20250811013511", cost: 2000},
        {name: "Tempest Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/93/TempestSaberplay.png/revision/latest?cb=20250811013424", cost: 2000},
        {name: "Wildfire Rage", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/55/WildfireRage.png/revision/latest?cb=20250811013539", cost: 2000},
        {name: "Leniency Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6b/LeniencySaberplay.png/revision/latest?cb=20250811013455", cost: 2000},
        {name: "Thunderclap Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/ThunderclapSlash.png/revision/latest?cb=20250811013349", cost: 2000},
        {name: "Birthless Pinnacle", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e6/Birthless_Pinnacle.png/revision/latest?cb=20250810202455", cost: 2000},
        {name: "Divine Dragon Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0e/DivineDragonSlash.png/revision/latest?cb=20250811013554", cost: 2000},
        {name: "Self-Sacrificing Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Self-SacrificingSaberplay.png/revision/latest?cb=20250811013527", cost: 2000},
        {name: "Winter's Chill", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ce/Winter%27s_Chill_%28Saber%29.png/revision/latest?cb=20250810205204", cost: 2000},
        {name: "Bodhi Sabreplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/75/Bodhi_Sabreplay.png/revision/latest?cb=20250815030505", cost: 2000},
        {name: "Mirror Sabreplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/de/Mirror_Sabreplay.png/revision/latest?cb=20250815030554", cost: 2000},
        {name: "Baidi Whirling Swordplay - Agile", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/16/BaidiWhirlingSwordplay-Agile.png/revision/latest?cb=20250811013405", cost: 2000},
        {name: "Starlight Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f8/StarlightSaberplay.png/revision/latest?cb=20250811013440", cost: 2000},
        {name: "Severing Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/SeveringSaberplay.png/revision/latest?cb=20250811013042", cost: 200},
        {name: "Hoarfrost Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cb/Hoarfrost_Saberplay.png/revision/latest?cb=20250810202442", cost: 200},
        {name: "Demon Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/52/DemonSaberplay.png/revision/latest?cb=20250811013028", cost: 200},
        {name: "Bagua Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f4/BaguaSaberplay.png/revision/latest?cb=20250811012948", cost: 200},
        {name: "Shura Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/96/ShuraSaberplay.png/revision/latest?cb=20250811013005", cost: 200},
        {name: "Xuanhuo Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/63/XuanhuoSaberplay.png/revision/latest?cb=20250811012904", cost: 200},
        {name: "Minor Quintfade Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Minor_Quintfade_Saberplay.png/revision/latest?cb=20250810205053", cost: 200},
        {name: "Goldsaber Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c0/GoldsaberSlash.png/revision/latest?cb=20250811012821", cost: 200},
        {name: "Five-Tiger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8b/Five-TigerStrike.png/revision/latest?cb=20250811012835", cost: 200},
        {name: "Yellow Dragon Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9a/YellowDragonSaberplay.png/revision/latest?cb=20250811012934", cost: 200},
        {name: "Jianghu Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/db/JianghuSaberplay.png/revision/latest?cb=20250811012734", cost: 50},
        {name: "Shaolin Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/60/ShaolinSaberplay.png/revision/latest?cb=20250811012750", cost: 50},
        {name: "Goldenring Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d5/GoldenringSaberplay.png/revision/latest?cb=20250811012626", cost: 50},
        {name: "Wudang Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d3/WudangSaberplay.png/revision/latest?cb=20250811012659", cost: 50},
        {name: "Timberfall Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b0/Timberfall_Saberplay.png/revision/latest?cb=20250810202430", cost: 50},
        {name: "Undivinable Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1c/UndivinableSaberplay.png/revision/latest?cb=20250811012804", cost: 50},
        {name: "Twin Dragons' Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9e/TwinDragons%27Slash.png/revision/latest?cb=20250811012719", cost: 50},
        {name: "Darkwind Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ea/DarkwindSaberplay.png/revision/latest?cb=20250811012541", cost: 10},
        ],
        polearm: [
        {name: "Repelling Staff Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ad/RepellingStaffTechnique.png/revision/latest?cb=20250810232545", cost: 6000},
        {name: "Vairocana's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/75/Vairocana%27sStaff.png/revision/latest?cb=20250810232520", cost: 6000},
        {name: "Madness Staff Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8e/MadnessStaffTechnique.png/revision/latest?cb=20250810232534", cost: 6000},
        {name: "Acala's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/05/Acala%27sStaff.png/revision/latest?cb=20250810232507", cost: 4000},
        {name: "Salvation Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/SalvationStaff.png/revision/latest?cb=20250810232435", cost: 4000},
        {name: "Sleeping Arhat Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cd/SleepingArhatStaff.png/revision/latest?cb=20250810232453", cost: 4000},
        {name: "Ye Family Spear", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/98/Ye_Family_Spear.png/revision/latest?cb=20250810202959", cost: 4000},
        {name: "Unity Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/75/UnityPolearmTechnique.png/revision/latest?cb=20250811023224", cost: 4000},
        {name: "Pearflower Spear", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4d/PearflowerSpear.png/revision/latest?cb=20250928233330", cost: 4000},
        {name: "Tanlang Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1c/Tanlang_Spearplay.png/revision/latest?cb=20250815030716", cost: 4000},
        {name: "Heavenhold Seaspan Stance", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/13/Heavenhold_Seaspan_Stance.png/revision/latest?cb=20250815030801", cost: 4000},
        {name: "Vedas Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5f/VedasPolearmTechnique.png/revision/latest?cb=20250810232409", cost: 2000},
        {name: "Mountain-Crushing Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1e/Mountain-Crushing_Hammer.png/revision/latest?cb=20250810202840", cost: 2000},
        {name: "Skypiercer Thrust", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d7/Skypiercer_Thrust.png/revision/latest?cb=20250810202905", cost: 2000},
        {name: "Siege Piercer Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a3/Siege_Piercer_Spearplay.png/revision/latest?cb=20250810202919", cost: 2000},
        {name: "Drunken Immortal's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a6/DrunkenImmortal%27sStaff.png/revision/latest?cb=20250810232337", cost: 2000},
        {name: "Juggernaut Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bf/Juggernaut_Hammer.png/revision/latest?cb=20250810202856", cost: 2000},
        {name: "Phoenix's Talon", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7d/Phoenix%27sTalon.png/revision/latest?cb=20250810232422", cost: 2000},
        {name: "Fire Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/06/FirePolearmTechnique.png/revision/latest?cb=20250810232356", cost: 2000},
        {name: "Mishan Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/cc/MishanPolearmTechnique.png/revision/latest?cb=20250810232236", cost: 200},
        {name: "Lotus Staff Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d8/LotusStaffTechnique.png/revision/latest?cb=20250810232325", cost: 200},
        {name: "Shaolin Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a5/ShaolinPolearmTechnique.png/revision/latest?cb=20250810232253", cost: 200},
        {name: "Coiling Dragon", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b9/CoilingDragon.png/revision/latest?cb=20250810232222", cost: 200},
        {name: "Wuyue Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/WuyueSpearplay.png/revision/latest?cb=20250810232305", cost: 200},
        {name: "Hegemonic Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1f/Hegemonic_Spearplay.png/revision/latest?cb=20250810202803", cost: 200},
        {name: "Thunder Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c1/Thunder_Spearplay.png/revision/latest?cb=20250810202830", cost: 200},
        {name: "Earthshaker Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Earthshaker_Hammer.png/revision/latest?cb=20250810202750", cost: 200},
        {name: "Jianghu Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/01/JianghuPolearmTechnique.png/revision/latest?cb=20250810232142", cost: 50},
        {name: "Beggars' Sect Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/96/Beggars%27SectPolearmTechnique.png/revision/latest?cb=20250810232127", cost: 50},
        {name: "Crouching Dragon Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8a/CrouchingDragonPolearmTechnique.png/revision/latest?cb=20250810232156", cost: 50},
        {name: "Demon Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/63/DemonPolearmTechnique.png/revision/latest?cb=20250810232209", cost: 50},
        {name: "Nanshan Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9c/Nanshan_Spearplay.png/revision/latest?cb=20250810232732", cost: 10},
        ],
        lightness: [
        {name: "Water Traversing Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/28/Water_Traversing_Steps.png/revision/latest?cb=20250815030918", cost: 6000},
        {name: "Sky Feather Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/20/SkyFeatherSteps.png/revision/latest?cb=20250810223826", cost: 4000},
        {name: "Cloud-Capped Leap", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/51/Cloud-CappedLeap.png/revision/latest?cb=20250810223812", cost: 4000},
        {name: "Chenghuang Windrider", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/03/Chenghuang_Windrider.png/revision/latest?cb=20250812193517", cost: 4000},
        {name: "Storm Gallop", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3b/Storm_Gallop.png/revision/latest?cb=20250810200937", cost: 4000},
        {name: "Ghostly Shadow", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c0/GhostlyShadow.png/revision/latest?cb=20250810223839", cost: 4000},
        {name: "Swan Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b4/SwanSteps.png/revision/latest?cb=20250810223739", cost: 2000},
        {name: "Monkey Dance", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d8/Monkey_Dance.png/revision/latest?cb=20250810200944", cost: 2000},
        {name: "Condor Leap", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/63/CondorLeap.png/revision/latest?cb=20250810223753", cost: 2000},
        {name: "Xuanyan Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5b/XuanyanLightnessSkill.png/revision/latest?cb=20250810223712", cost: 200},
        {name: "Foxform Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fe/Foxform_Steps.png/revision/latest?cb=20250807210529", cost: 200},
        {name: "Breeze Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/70/BreezeSteps.png/revision/latest?cb=20250810223640", cost: 200},
        {name: "Lightweight Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d5/LightweightTechnique.png/revision/latest?cb=20250810223655", cost: 200},
        {name: "Condor Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a6/CondorLightnessSkill.png/revision/latest?cb=20250810223726", cost: 200},
        {name: "Wudang Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/21/WudangLightnessSkill.png/revision/latest?cb=20250810223559", cost: 50},
        {name: "Basic Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b1/BasicLightnessSkill.png/revision/latest?cb=20250810223544", cost: 10},
        ],
        cultivation: [
        {name: "Evergreen Vitality Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b5/Evergreen_Vitality_Mastery.png/revision/latest?cb=20250810205607", cost: 6000},
        {name: "Stringless Silence", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e0/Stringless_Silence.png/revision/latest?cb=20250810205744", cost: 6000},
        {name: "Nine-Region Art", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/13/Nine-Region_Art.png/revision/latest?cb=20250804054620", cost: 6000},
        {name: "Cloudform Tai Chi", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fc/Cloudform_Tai_Chi.png/revision/latest?cb=20250731031431", cost: 6000},
        {name: "Five Balances Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b2/Five_Balances_Sutra_%28Ultimate%29.png/revision/latest?cb=20250813061730", cost: 6000},
        {name: "Supreme Blaze", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/51/Supreme_Blaze.png/revision/latest?cb=20250801055940", cost: 6000},
        {name: "Muscle-Changing Scripture", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ab/Muscle-Changing_Scripture_Symbol.png/revision/latest?cb=20250811022711", cost: 6000},
        {name: "Elusive Liuyao Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e0/Elusive_Liuyao_Swordplay.png/revision/latest?cb=20250809044924", cost: 6000},
        {name: "Astral Shrine Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/67/Astral_Shrine_Method.png/revision/latest?cb=20250810201814", cost: 4000},
        {name: "The Infinite Four Symbols", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/SalvationStaff.png/revision/latest?cb=20250810232435", cost: 4000},
        {name: "Zen Demon-Subduing Spell", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b0/Zen_Demon-Subduing_Spell_Symbol.png/revision/latest?cb=20250811022558", cost: 4000},
        {name: "Yoga Arcanum", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c7/Yoga_Arcanum.png/revision/latest?cb=20250729005637", cost: 4000},
        {name: "Innate Qi Mastery", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/InnateQiMastery.png/revision/latest?cb=20250811022542", cost: 4000},
        {name: "Blazing Divination", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a9/Blazing_Divination.png/revision/latest?cb=20250721044742", cost: 4000},
        {name: "Herbal Saint's Compendium", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/86/Herbal_Saint%27s_Compendium.png/revision/latest?cb=20250812193941", cost: 4000},
        {name: "Drifting Cloud Tai Chi", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9f/Drifting_Cloud_Tai_Chi.png/revision/latest?cb=20250810201839", cost: 4000},
        {name: "Sleeping Arhat Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1e/Sleeping_Arhat_Method.png/revision/latest?cb=20250811022628", cost: 4000},
        {name: "The Six Knacks", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/a1/The_Six_Knacks_Symbol.png/revision/latest?cb=20250811022643", cost: 4000},
        {name: "Heavenly Silkworm Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7e/Heavenly_Silkworm_Method_Symbol.png/revision/latest?cb=20250811022611", cost: 4000},
        {name: "Formless Melody", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/60/Formless_Melody.png/revision/latest?cb=20250812193445", cost: 4000},
        {name: "Star Absorption Force", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/1d/StarAbsorptionForce.png/revision/latest?cb=20250811023116", cost: 4000},
        {name: "Dragon Grappling", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/57/Dragon_Grappling_Symbol.png/revision/latest?cb=20250811022214", cost: 2000},
        {name: "Pili Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/45/Pili_Cultivation_Method.png/revision/latest?cb=20250812194005", cost: 2000},
        {name: "Qi Dissipation Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/QiDissipationTechnique.png/revision/latest?cb=20250811115826", cost: 2000},
        {name: "Deluge of Blood", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/04/Deluge_of_Blood_Symbol.png/revision/latest?cb=20250811022159", cost: 2000},
        {name: "Hunyuan Holy Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e9/Hunyuan_Holy_Swordplay.png/revision/latest?cb=20250811022244", cost: 2000},
        {name: "Illusion Gu Mental Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4f/Illusion_Gu_Mental_Sutra.png/revision/latest?cb=20250811022326", cost: 2000},
        {name: "Golden Bell Cocoon", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/95/Golden_Bell_Cocoon_Symbol.png/revision/latest?cb=20250811022411", cost: 2000},
        {name: "Jade Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6e/Jade_Method.png/revision/latest?cb=20250812194026", cost: 2000},
        {name: "Soul Reaper Gu", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/66/Soul_Reaper_Gu.png/revision/latest?cb=20250809223417", cost: 2000},
        {name: "Elusive Aura", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8e/Elusive_Aura.png/revision/latest?cb=20250806003649", cost: 2000},
        {name: "Light Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e0/Light_Cultivation_Method.png/revision/latest?cb=20250811022357", cost: 2000},
        {name: "Wintry Blow", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/61/Wintry_Blow_Symbol.png/revision/latest?cb=20250811022343", cost: 2000},
        {name: "Tai Chi Marvel Force", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5f/Tai_Chi_Marvel_Force_Symbol.png/revision/latest?cb=20250811022259", cost: 2000},
        {name: "Qingmu Dance", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/91/Qingmu_Dance.png/revision/latest?cb=20250811022228", cost: 2000},
        {name: "The Yoga Sutras", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/The_Yoga_Sutras_Symbol.png/revision/latest?cb=20250811022143", cost: 2000},
        {name: "Ye Family Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/dd/Ye_Family_Cultivation_Method.png/revision/latest?cb=20250810201917", cost: 2000},
        {name: "Four Gates and Twelve Origins", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b8/Four_Gates_and_Twelve_Origins.png/revision/latest?cb=20250812194015", cost: 2000},
        {name: "Five Balance Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/31/Five_Balances_Sutra.png/revision/latest?cb=20250811022312", cost: 2000},
        {name: "Primordial Scripture", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/PrimordialScripture.png/revision/latest?cb=20250811021725", cost: 200},
        {name: "Whale Breath", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/51/Whale_Breath_Symbol.png/revision/latest?cb=20250811021815", cost: 200},
        {name: "Breathing Exercises", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/de/Breathing_Exercises_Symbol.png/revision/latest?cb=20250811021903", cost: 200},
        {name: "Demon Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d9/DemonCultivationMethod.png/revision/latest?cb=20250811021740", cost: 200},
        {name: "Bibo Mental Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/a/ae/Bibo_Mental_Sutra_Symbol.png/revision/latest?cb=20250811021844", cost: 200},
        {name: "Tianlong Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b6/Tianlong_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021755", cost: 200},
        {name: "Five Immortals' Sorcery", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/98/Five_Immortals%27_Sorcery.png/revision/latest?cb=20250811021918", cost: 200},
        {name: "Healthcare Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/9f/Healthcare_Method_Symbol.png/revision/latest?cb=20250811021945", cost: 200},
        {name: "Guiyuan Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/f0/Guiyuan_Cultivation_Method.png/revision/latest?cb=20250811021829", cost: 200},
        {name: "Eclipse-Crescent Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/47/Eclipse-Crescent_Cultivation_Method.png/revision/latest?cb=20250810201943", cost: 200},
        {name: "Jianghu Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/99/Jianghu_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021519", cost: 50},
        {name: "Liushan Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4a/LiushanCultivationMethod.png/revision/latest?cb=20250811021710", cost: 50},
        {name: "Condor Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/65/Condor_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021502", cost: 50},
        {name: "Beggars' Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ce/Beggars%27_Cultivation_Method.png/revision/latest?cb=20250811021653", cost: 50},
        {name: "Xuanhuo Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/81/Xuanhuo_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021535", cost: 50},
        {name: "Mingjian Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/2e/Mingjian_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021636", cost: 50},
        {name: "Great Mountain Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/39/Great_Mountain_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021552", cost: 50},
        {name: "Wudang Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/32/Wudang_Cultivation_Method.png/revision/latest?cb=20250811021612", cost: 50},
        {name: "Qingyun Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Qingyun_Cultivation_Method.png/revision/latest?cb=20250810201955", cost: 50},
        {name: "Basic Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/d/d6/Basic_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021426", cost: 10},
        {name: "Undying Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/30/Undying_Cultivation_Method_Symbol.png/revision/latest?cb=20250811021443", cost: 10},
        ]
    };

    const manualsData = {
        fist: [
        {name: "Soaring Dragon", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/Fist_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Tai Chi", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/Fist_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Thousand-Hand Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/Fist_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Eight Trigrams of Roving Tiger", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Dragonish Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Pure Yang Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Prajna Vajrapani Palms", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Divine Blood Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Birthless Severance", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Crimson Cloud Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/f/fb/Fist_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Great Vajrapani Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Seventeen-Form Grappling Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Jade Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Soft Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Condor's Seckill Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Weakening Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Dragon Claws", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Tangled Grappling", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Animitta Finger Strikes", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Chakra Sealing Strikes", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Thunderous Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Frosty Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Fist_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Condor Claw", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Thunderwake Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Plague Blister Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Mountain Crush", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Huanyin Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Tri-From Meridian Block", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Wudang Long Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Lotus Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Vedas Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Xuanhuo Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Tablet-Throwing Palm", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/09/Fist_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Mountain-Shaking Palm Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8d/Fist_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Taizu Long Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8d/Fist_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Arhat Fist", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8d/Fist_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Tongbeiquan", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8d/Fist_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        ],
        hidden: [
        {name: "Vengeance of Scorching Star", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Unrivaled Finger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Heart-Piercing Dust", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/Hidden_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Heart Mansion's Inferno", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/Hidden_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Crows' Cawing", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/Hidden_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Rain of Flowers", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/Hidden_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Soul-Piercing Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Wuluo Smoke", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Ensnaring Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Thunderclap Flameball", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Blazing Venom Needle", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Swift Switch", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/b7/Hidden_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Bloodthirsty Bat", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Double Hit", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Necrotoxin", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Raining Needles", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Scorpion Stinger", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Poisonous Dragon Tongue", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/22/Hidden_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Wuxian Needles", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Bloody Eagle Beak", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Shadowy Arrows", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Bones Nails", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/11/Hidden_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        ],
        sword: [
        {name: "Tai Chi Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Sword_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014426", cost: 12000},
        {name: "Zhenwu's Sword Intent", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Sword_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Celestial Yang Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Sword_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Nine Manifestations", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Sword_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Ape's Gale Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Sword_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Bodhidharma Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/69/Sword_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Thirteen Spectral Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Dragon Roar Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Poison Dragon Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Drifting Cloud Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Immortals' Unforgiving Sword", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Qingfeng Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Demon Conquering Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Thunderbolt Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Hawkstrider Sword Stance", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Taihua Twelve Swordplays", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c8/Sword_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014812", cost: 4000},
        {name: "Teal Water Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Tiger-Taming Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Icebolt Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Sky Feather Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Vibrant Cloud Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Swaying Pines", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Misty Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Whirlwind Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Mountain Ridge Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Whispering Viper", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Sword_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Graypine Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Snakeform Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Invigorating Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Five Immortals' Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Mingjian Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Shaolin Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/89/Sword_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        ],
        saber: [
        {name: "Saha Hell", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3e/Saber_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Encompassing Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/3e/Saber_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Four Forms of Zen Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Xuanxu Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Grand Quintfade Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Heart-Devouring Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Firebrand Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Flame and Saber's Trial", img: "https://static.wikia.nocookie.net/wandering-sword/images/b/bc/Saber_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Wildfire Rage", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Leniency Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Tempest Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Thunderclap Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Birthless Pinnacle", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Guiyuan Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Divine Dragon Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Bodhi Sabreplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Mirror Sabreplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/ca/Saber_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Demon Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Shura Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Hoarfrost Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Bagua Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Xuanhuo Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Minor Quintfade Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Goldsaber Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Five-Tiger Strike", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Yellow Dragon Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Saber_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Goldenring Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/Saber_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Timberfall Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/Saber_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Wudang Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/Saber_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Twin Dragons' Slash", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/Saber_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Shaolin Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/6a/Saber_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Darkwind Saberplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0e/Saber_Arts_Manual.png/revision/latest?cb=20250822013841", cost: 50},
        ],
        polearm: [
        {name: "Madness Staff Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/51/Polearm_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014425", cost: 12000},
        {name: "Vairocana's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/51/Polearm_Arts_Manual_%28Red%29.png/revision/latest?cb=20250822014425", cost: 12000},
        {name: "Unity Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Acala's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Ye Family Spear", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Tanlang Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Heavenhold Seaspan Stance", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Sleeping Arhat Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/92/Polearm_Arts_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Skypiercer Thrust", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Juggernaut Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Mountain-Crushing Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Vedas Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Drunken Immortal's Staff", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Phoenix's Talon", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Fire Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Siege Piercer Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/0/0f/Polearm_Arts_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Coiling Dragon", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Lotus Staff Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Shaolin Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Wuyue Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Thunder Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Hegemonic Spearplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Earthshaker Hammer", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/8f/Polearm_Arts_Manual_%28Blue%29.png/revision/latest?cb=20250822014425", cost: 500},
        {name: "Beggars' Sect Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/60/Polearm_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Demon Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/60/Polearm_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Crouching Dragon Polearm Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/6/60/Polearm_Arts_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        ],
        lightness: [
        {name: "Water Traversing Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c5/Lightness_Manual_%28Red%29.png/revision/latest?cb=20250822014812", cost: 12000},
        {name: "Chenghuang Windrider", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/96/Lightness_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Ghostly Shadow", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/96/Lightness_Manual_%28Orange%29.png/revision/latest?cb=20250822014425", cost: 8000},
        {name: "Swan Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/81/Lightness_Manual_%28Yellow%29.png/revision/latest?cb=20250822014425", cost: 4000},
        {name: "Lightweight Technique", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7b/Lightness_Manual_%28Blue%29.png/revision/latest?cb=20250822014812", cost: 500},
        {name: "Condor Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7b/Lightness_Manual_%28Blue%29.png/revision/latest?cb=20250822014812", cost: 500},
        {name: "Breeze Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7b/Lightness_Manual_%28Blue%29.png/revision/latest?cb=20250822014812", cost: 500},
        {name: "Xuanyan Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7b/Lightness_Manual_%28Blue%29.png/revision/latest?cb=20250822014812", cost: 500},
        {name: "Foxform Steps", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/7b/Lightness_Manual_%28Blue%29.png/revision/latest?cb=20250822014812", cost: 500},
        {name: "Wudang Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/18/Lightness_Manual_%28Green%29.png/revision/latest?cb=20250822014425", cost: 100},
        {name: "Basic Lightness Skill", img: "https://static.wikia.nocookie.net/wandering-sword/images/3/38/Blue_Lightness_Manual.png/revision/latest?cb=20250822013655", cost: 50},
        ],
        cultivation: [
        {name: "Elusive Liuyao Swordplay", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Cultivation_Manual_%28Red%29.png/revision/latest?cb=20250822014811", cost: 12000},
        {name: "Stringless Silence", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Cultivation_Manual_%28Red%29.png/revision/latest?cb=20250822014811", cost: 12000},
        {name: "Nine-Region Art", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Cultivation_Manual_%28Red%29.png/revision/latest?cb=20250822014811", cost: 12000},
        {name: "Supreme Blaze", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/5e/Cultivation_Manual_%28Red%29.png/revision/latest?cb=20250822014811", cost: 12000},
        {name: "Yoga Arcanum", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Heavenly Silkworm Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Sleeping Arhat Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "The Six Knacks", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Blazing Divination", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Zen Demon-Subduing Spell", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Formless Melody", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/ee/Cultivation_Manual_%28Orange%29.png/revision/latest?cb=20250822014426", cost: 8000},
        {name: "Soul Reaper Gu", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Ye Family Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Golden Bell Cocoon", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Jade Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Light Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Deluge of Blood", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Elusive Aura", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Illusion Gu Mental Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Dragon Grappling", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Tai Chi Marvel Force", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "The Yoga Sutras", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Pili Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Wintry Blow", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Five Balance Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Four Gates and Twelve Origins", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/49/Cultivation_Manual_%28Yellow%29.png/revision/latest?cb=20250822014426", cost: 4000},
        {name: "Five Immortals' Sorcery", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Breathing Exercises", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Bibo Mental Sutra", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Tianlong Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Demon Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Eclipse-Crescent Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Healthcare Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/8/85/Cultivation_Manual_%28Blue%29.png/revision/latest?cb=20250822014426", cost: 500},
        {name: "Mingjian Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Jianghu Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Qingyun Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Condor Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Xuanhuo Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Great Mountain Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/43/Cultivation_Manual_%28Green%29.png/revision/latest?cb=20250822014426", cost: 100},
        {name: "Basic Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e8/Blue_Cultivation_Manual.png/revision/latest?cb=20250822013748", cost: 50},
        {name: "Undying Cultivation Method", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e8/Blue_Cultivation_Manual.png/revision/latest?cb=20250822013748", cost: 50},
        ]
    };

    // === Items Tab Data ===
const itemsData = [
    { id: "sword",   name: "Initial Sword",          icon: "https://static.wikia.nocookie.net/wandering-sword/images/f/fc/SwordEmblem.png/revision/latest?cb=20260601015917",    levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "saber",   name: "Initial Saber",           icon: "https://static.wikia.nocookie.net/wandering-sword/images/4/41/SaberEmblem.png/revision/latest?cb=20260601015957",    levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "polearm", name: "Initial Polearm",         icon: "https://static.wikia.nocookie.net/wandering-sword/images/f/fd/PolearmEmblem.png/revision/latest?cb=20260601020009",  levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "fist",    name: "Initial Fist Weapon",     icon: "https://static.wikia.nocookie.net/wandering-sword/images/3/32/FistEmblem.png/revision/latest?cb=20260601020034",     levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "hidden",  name: "Initial Hidden Weapon",   icon: "https://static.wikia.nocookie.net/wandering-sword/images/9/9d/HiddenEmblem.png/revision/latest?cb=20260601020016",   levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "headwear",name: "Initial Headwear",        icon: "https://static.wikia.nocookie.net/wandering-sword/images/4/47/HeadwearEmblem.png/revision/latest?cb=20260601020026", levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "garment", name: "Initial Garment",         icon: "https://static.wikia.nocookie.net/wandering-sword/images/1/1c/GarmentEmblem.png/revision/latest?cb=20260601020114",  levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "shoes",   name: "Initial Shoes",           icon: "https://static.wikia.nocookie.net/wandering-sword/images/a/a5/ShoesEmblem.png/revision/latest?cb=20260601015945",    levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] },
    { id: "accessory",name: "Initial Accessory",      icon: "https://static.wikia.nocookie.net/wandering-sword/images/5/5b/AccessoryEmblem.png/revision/latest?cb=20260601020104",levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III", "Class II", "Class I"], costs: [0, 100, 200, 300, 500, 600, 1000, 1500, 2200, 3500, 3500] }
];

// === Blueprints Tab Data ===
const blueprintsData = [
    { 
        id: "weapon", 
        name: "Advanced Blueprint (Weapon)", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "headwear", 
        name: "Advanced Blueprint (Headwear)", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "garment", 
        name: "Advanced Blueprint (Garment)", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "shoes", 
        name: "Advanced Blueprint (Shoes)", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "accessory", 
        name: "Advanced Blueprint (Accessory)", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "spagirism", 
        name: "Spagirism", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    },
    { 
        id: "recipe", 
        name: "Recipe", 
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/8/80/BlueprintEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        levels: ["", "Class X", "Class IX", "Class VIII", "Class VII", "Class VI", "Class V", "Class IV", "Class III"],
        costs: [0, 200, 400, 800, 1200, 2000, 3000, 5000, 5000]
    }
];

// === Attribute Points Tab Data ===
const attributeData = [
    {
        id: "martial",
        name: "Initial Martial Points",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/5/53/MartialPointEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        values: [0, 500, 2000, 5000, 10000, 20000, 50000, 100000],
        costs: [0, 150, 450, 900, 1500, 3000, 9000, 15000]
    },
    {
        id: "meridian",
        name: "Initial Meridian Points",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/7/78/MeridianEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        values: [0, 100, 500, 1000, 3000, 5000, 8000, 13000],
        costs: [0, 300, 1200, 1500, 6000, 6000, 9000, 15000]
    },
    {
        id: "coins",
        name: "Initial Coins",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/6/65/CoinsEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        values: [0, 1000, 5000, 10000, 50000, 100000, 250000, 500000],
        costs: [0, 100, 400, 500, 4000, 4500, 12000, 17500]
    }
];

// === Life Skill Mastery Tab Data ===
const lifeSkillData = [
    {
        id: "forging",
        name: "Forging",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/b/b0/ForgingEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        maxLevel: 10
    },
    {
        id: "tailoring",
        name: "Tailoring",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/e/eb/TailoringEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        maxLevel: 10
    },
    {
        id: "alchemy",
        name: "Alchemy",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/1/14/AlchemyEmblem-Photoroom.png/revision/latest?cb=20260601152234",
        maxLevel: 10
    },
    {
        id: "cooking",
        name: "Cooking",
        icon: "https://static.wikia.nocookie.net/wandering-sword/images/4/4e/CookingEmblem-Photoroom.png/revision/latest?cb=20260601152233",
        maxLevel: 10
    }
];

const lifeSkillCosts = [0, 50, 100, 200, 400, 800, 1500, 2500, 4000, 6000, 6000];

// === Legacy Tab Data ===
const legacyData = [
    { 
        id: "snowlock", 
        name: "Snowlock", 
        cost: 50000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/0/01/Snowlock%27s_Legacy.png/revision/latest?cb=20260603000432"
    },
    { 
        id: "mara", 
        name: "Mara", 
        cost: 50000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/9/9b/Mara%27s_Legacy.png/revision/latest?cb=20260603000516"
    },
    { 
        id: "bodhidharma", 
        name: "Bodhidharma", 
        cost: 40000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/0/01/Bodhidharma%27s_Legacy.png/revision/latest?cb=20260603000533"
    },
    { 
        id: "tianjian", 
        name: "Tianjian Sect", 
        cost: 40000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/b/b9/Tianjian_Sect%27s_Legacy.png/revision/latest?cb=20260603000414"
    },
    { 
        id: "tianshan", 
        name: "Tianshan", 
        cost: 40000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/3/30/Tianshan_Sect%27s_Legacy.png/revision/latest?cb=20260603000443"
    },
    { 
        id: "qingyun", 
        name: "Qingyun", 
        cost: 60000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/3/3a/Master_Qingyun%27s_Legacy.png/revision/latest?cb=20260603000507"
    },
    { 
        id: "jadedragon", 
        name: "Jade Dragon", 
        cost: 60000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/e/e7/Jade_Dragon%27s_Legacy.png/revision/latest?cb=20260603000525"
    },
    { 
        id: "tianji", 
        name: "Tianji Palace", 
        cost: 50000,
        tooltip: "https://static.wikia.nocookie.net/wandering-sword/images/3/36/Tianji_Palace%27s_Legacy.png/revision/latest?cb=20260603000456"
    }
];

const outfitData = [
    { id: "wudang",    cost: 300, dim: "https://static.wikia.nocookie.net/wandering-sword/images/5/57/OutfitWudangInheritence.png/revision/latest?cb=20260601225945",      lit: "https://static.wikia.nocookie.net/wandering-sword/images/0/05/OutfitWudangInheritence%28Illuminated%29.png/revision/latest?cb=20260601225946" },
    { id: "prodigy",   cost: 300, dim: "https://static.wikia.nocookie.net/wandering-sword/images/a/a1/OutfitProdigyInheritence.png/revision/latest?cb=20260601235043",     lit: "https://static.wikia.nocookie.net/wandering-sword/images/c/c6/OutfitProdigyInheritence%28Illuminated%29.png/revision/latest?cb=20260601235113" },
    { id: "sima",      cost: 10,  dim: "https://static.wikia.nocookie.net/wandering-sword/images/c/ce/OutfitSimaInheritence.png/revision/latest?cb=20260601235704",         lit: "https://static.wikia.nocookie.net/wandering-sword/images/f/f4/OutfitSimaInheritence%28Illuminated%29.png/revision/latest?cb=20260601235715" },
    { id: "shangguan", cost: 10,  dim: "https://static.wikia.nocookie.net/wandering-sword/images/b/be/OutfitShangguanInheritence.png/revision/latest?cb=20260601225946",    lit: "https://static.wikia.nocookie.net/wandering-sword/images/9/95/OutfitShangguanInheritence%28Illuminated%29.png/revision/latest?cb=20260601225946" },
    { id: "luxianer",  cost: 300, dim: "https://static.wikia.nocookie.net/wandering-sword/images/f/f6/OutfitLuxianerInheritence.png/revision/latest?cb=20260602000156",     lit: "https://static.wikia.nocookie.net/wandering-sword/images/7/7d/OutfitLuxianerInheritence%28Illuminated%29.png/revision/latest?cb=20260602000154" }
];

    // ==================== HELPERS ====================

    function updatePoints() {
        $('#points-total').text(totalSpent);
    }

    function buildCostHtml(itemIcon, gainText, cost) {
        return `
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                <span style="color:#ccc;display:flex;align-items:center;gap:5px;">
                    <img src="${mw.html.escape(itemIcon)}" style="width:22px;height:22px;vertical-align:middle;"> ${mw.html.escape(gainText)}
                </span>
                <span style="color:#ff6666;display:flex;align-items:center;gap:5px;">
                    <img src="${mw.html.escape(BLUE)}" style="width:22px;height:22px;vertical-align:middle;"> - ${Number(cost)}
                </span>
            </div>`;
    }

    function buildRow(iconSrc, labelHtml, costHtml, minusDisabled, plusDisabled) {
        return $(`
            <div class="item-row">
                <div class="item-info">
                    <img src="${mw.html.escape(iconSrc)}" style="width:36px;height:36px;">
                    <span>${labelHtml}</span>
                </div>
                <div class="item-cost">${costHtml}</div>
                <div class="item-controls">
                    <button class="btn-minus" ${minusDisabled ? 'disabled' : ''}>-</button>
                    <button class="btn-plus"  ${plusDisabled  ? 'disabled' : ''}>+</button>
                </div>
            </div>
        `);
    }

    // ==================== TAB LOADERS ====================

const quirkData = [
    { id: "q1", img: "https://static.wikia.nocookie.net/wandering-sword/images/2/24/Samsara.png/revision/latest?cb=20260602014303",                tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/5/53/Samsara_-_Tooltip.png/revision/latest?cb=20260602030718" },
    { id: "q2", img: "https://static.wikia.nocookie.net/wandering-sword/images/1/18/Effortless_Mastery.png/revision/latest?cb=20260602014303",    tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/0/0a/Effortless_Mastery_-_Tooltip.png/revision/latest?cb=20260602163636" },
    { id: "q3", img: "https://static.wikia.nocookie.net/wandering-sword/images/9/93/Relentless_Vigor.png/revision/latest?cb=20260602014303",       tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/d/d8/Relentless_Vigor_-_Tooltip.png/revision/latest?cb=20260602031035" },
    { id: "q4", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/eb/Fortune%27s_Bounty.png/revision/latest?cb=20260602014303",     tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/c/c9/Fortune%27s_Bounty_-_Tooltip.png/revision/latest?cb=20260602163635" },
    { id: "q5", img: "https://static.wikia.nocookie.net/wandering-sword/images/7/73/Blessed_Craftmanship.png/revision/latest?cb=20260602014303",   tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/d/dd/Blessed_Craftmanship_-_Tooltip.png/revision/latest?cb=20260602163636" },
    { id: "q6", img: "https://static.wikia.nocookie.net/wandering-sword/images/4/4d/Fated_Spoils.png/revision/latest?cb=20260602014303",           tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/1/1a/Fated_Spoils_-_Tooltip.png/revision/latest?cb=20260602163634" },
    { id: "q7", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c0/Doubled_Diligence.png/revision/latest?cb=20260602014303",      tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/1/13/Doubled_Diligence_-_Tooltip.png/revision/latest?cb=20260602031026" },
    { id: "q8", img: "https://static.wikia.nocookie.net/wandering-sword/images/c/c7/Boundless_Abundance.png/revision/latest?cb=20260602014303",    tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/d/d8/Boundless_Abundance_-_Tooltip.png/revision/latest?cb=20260602030718" }
];

const redQuirkData = [
    { id: "rq1", img: "https://static.wikia.nocookie.net/wandering-sword/images/5/53/Overcomer.png/revision/latest?cb=20260602014303",     tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/f/f0/Overcomer_-_Tooltip.png/revision/latest?cb=20260602032815" },
    { id: "rq2", img: "https://static.wikia.nocookie.net/wandering-sword/images/e/e1/Apex_Challenger.png/revision/latest?cb=20260602014304", tooltipImg: "https://static.wikia.nocookie.net/wandering-sword/images/7/70/Apex_Challenger_-_Tooltip.png/revision/latest?cb=20260602031017" }
];

let redQuirkCount = 0;

function loadDifficultyTab() {
    var $grid = $('#inherit-grid');
    $grid.empty();
    $grid.html(`
        <div class="difficulty-wrapper">
            <!-- LEFT PANEL -->
            <div class="difficulty-left">
                <div class="difficulty-bar">Difficulty</div>
                <img src="https://static.wikia.nocookie.net/wandering-sword/images/4/4d/Extreme_Difficulty.png/revision/latest?cb=20260602001359" class="difficulty-img">
            </div>
            <!-- RIGHT PANEL -->
            <div class="difficulty-right">
                <div class="difficulty-bar">Quirks</div>
                <div class="quirks-container">
                    <div class="quirks-grid">
                        ${quirkData.map(q => `
                            <div class="quirk-circle">
                                <img src="${mw.html.escape(q.img)}" class="quirk-icon">
                                <div class="quirk-tooltip"><img src="${mw.html.escape(q.tooltipImg)}" class="quirk-tooltip-img"></div>
                            </div>
                        `).join('')}
                    </div>
                    <p class="quirks-note">Each additional difficulty Quirk increases the difficulty score by 0.2 in the Settlement.</p>
                    <hr class="quirks-divider">
                    <div class="red-quirks-row">
                        <div class="quirk-circle red-quirk" id="rq1-circle">
                            <img src="${mw.html.escape(redQuirkData[0].img)}" class="quirk-icon">
                            <span class="rq-count" id="rq1-count">0</span>
                            <div class="quirk-tooltip"><img src="${mw.html.escape(redQuirkData[0].tooltipImg)}" class="quirk-tooltip-img"></div>
                        </div>
                        <div class="quirk-circle red-quirk">
                            <img src="${mw.html.escape(redQuirkData[1].img)}" class="quirk-icon">
                            <div class="quirk-tooltip"><img src="${mw.html.escape(redQuirkData[1].tooltipImg)}" class="quirk-tooltip-img"></div>
                        </div>
                    </div>
                    <p class="quirks-note">Quirks in red will not increase the score in the Settlement.</p>
                </div>
            </div>
        </div>
    `);
    // Clickable red quirk counter (0-30, resets)
    $('#rq1-circle').on('click', function() {
        redQuirkCount = (redQuirkCount >= 30) ? 0 : redQuirkCount + 1;
        $('#rq1-count').text(redQuirkCount);
    });
}

    function loadItemsTab() {
        var $grid = $('#inherit-grid');
        $grid.empty();

        itemsData.forEach(function(item) {
            if (itemsState[item.id] === undefined) itemsState[item.id] = 0;
            var lvl = itemsState[item.id];
            var displayClass = item.levels[lvl] || 'None';
            var costHtml = lvl >= 1 ? buildCostHtml(item.icon, '+ 1', item.costs[lvl]) : '';

            var $row = buildRow(
                item.icon,
                `${mw.html.escape(item.name)} : <strong>${mw.html.escape(displayClass)}</strong>`,
                costHtml,
                lvl === 0,
                lvl >= 10
            );

            $row.find('.btn-plus').on('click', function() {
                if (lvl >= 10) return;
                totalSpent += item.costs[lvl + 1];
                itemsState[item.id]++;
                updatePoints(); loadItemsTab();
            });
            $row.find('.btn-minus').on('click', function() {
                if (lvl <= 0) return;
                totalSpent -= item.costs[lvl];
                itemsState[item.id]--;
                updatePoints(); loadItemsTab();
            });
            $grid.append($row);
        });
    }

function loadBlueprintsTab() {
    var $grid = $('#inherit-grid');
    $grid.empty();

    blueprintsData.forEach(function(item) {
        if (blueprintsState[item.id] === undefined) blueprintsState[item.id] = 0;
        
        var lvl = blueprintsState[item.id];
        var displayClass = item.levels[lvl] || "";
        
        var labelHtml = displayClass 
            ? `${mw.html.escape(item.name)} : <strong>${mw.html.escape(displayClass)}</strong>` 
            : item.name;

        var costHtml = (lvl >= 1) 
            ? buildCostHtml(item.icon, '+ 1', item.costs[lvl]) 
            : '';

        var $row = buildRow(
            item.icon, 
            labelHtml, 
            costHtml, 
            lvl === 0, 
            lvl >= (item.levels.length - 1)
        );

        $row.find('.btn-plus').on('click', function() {
            if (lvl >= (item.levels.length - 1)) return;
            totalSpent += item.costs[lvl + 1];
            blueprintsState[item.id]++;
            updatePoints();
            loadBlueprintsTab();
        });

        $row.find('.btn-minus').on('click', function() {
            if (lvl <= 0) return;
            totalSpent -= item.costs[lvl];
            blueprintsState[item.id]--;
            updatePoints();
            loadBlueprintsTab();
        });

        $grid.append($row);
    });
}

function loadAttributeTab() {
    var $grid = $('#inherit-grid');
    $grid.empty();

    attributeData.forEach(function(item) {
        if (attributeState[item.id] === undefined) attributeState[item.id] = 0;
        
        var lvl = attributeState[item.id];
        var displayValue = item.values[lvl] || 0;
        
        var costHtml = (lvl >= 1) 
            ? buildCostHtml(item.icon, `+ ${item.values[lvl]}`, item.costs[lvl]) 
            : '';

        var $row = buildRow(
            item.icon,
            `${mw.html.escape(item.name)} : <strong>${displayValue.toLocaleString()}</strong>`,
            costHtml,
            lvl === 0,
            lvl >= (item.values.length - 1)
        );

        $row.find('.btn-plus').on('click', function() {
            if (lvl >= (item.values.length - 1)) return;
            totalSpent += item.costs[lvl + 1];
            attributeState[item.id]++;
            updatePoints();
            loadAttributeTab();
        });

        $row.find('.btn-minus').on('click', function() {
            if (lvl <= 0) return;
            totalSpent -= item.costs[lvl];
            attributeState[item.id]--;
            updatePoints();
            loadAttributeTab();
        });

        $grid.append($row);
    });
}

    function loadLifeSkillTab() {
        var $grid = $('#inherit-grid');
        $grid.empty();

        lifeSkillData.forEach(function(item) {
            if (lifeSkillState[item.id] === undefined) lifeSkillState[item.id] = 1;
            var lvl = lifeSkillState[item.id];
            var costHtml = buildCostHtml(item.icon, '+ 1', lifeSkillCosts[lvl]);

            var $row = buildRow(
                item.icon,
                `${mw.html.escape(item.name)} : <strong>Level ${Number(lvl)}</strong>`,
                costHtml,
                lvl <= 1,
                lvl >= 10
            );

            $row.find('.btn-plus').on('click', function() {
                if (lvl >= 10) return;
                totalSpent += lifeSkillCosts[lvl + 1];
                lifeSkillState[item.id]++;
                updatePoints(); loadLifeSkillTab();
            });
            $row.find('.btn-minus').on('click', function() {
                if (lvl <= 1) return;
                totalSpent -= lifeSkillCosts[lvl];
                lifeSkillState[item.id]--;
                updatePoints(); loadLifeSkillTab();
            });
            $grid.append($row);
        });

        updatePoints();
    }

    function loadItems(items) {
        var $grid = $('#inherit-grid');
        $grid.empty();
        items.forEach(function(item) {
            var isSelected = selectedItems.has(item.name);
            var $card = $('<div class="item-card"></div>');
            if (isSelected) $card.addClass('selected');
            $card.html('<img src="' + mw.html.escape(item.img) + '" alt="' + mw.html.escape(item.name) + '"><p>' + mw.html.escape(item.name) + '</p>');
            $card.on('click', function() {
                if (selectedItems.has(item.name)) {
                    selectedItems.delete(item.name);
                    totalSpent -= item.cost;
                    $card.removeClass('selected');
                } else {
                    selectedItems.add(item.name);
                    totalSpent += item.cost;
                    $card.addClass('selected');
                }
                updatePoints();
            });
            $grid.append($card);
        });
    }

function loadLegacyTab() {
    var $grid = $('#inherit-grid');
    $grid.empty();
    $grid.addClass('legacy-grid');

    legacyData.forEach(function(item) {
        var isSelected = legacyState === item.id;
        
        var $card = $(`
            <div class="legacy-card ${isSelected ? 'selected' : ''}" data-id="${mw.html.escape(item.id)}">
                <div class="legacy-circle">
                    <span class="legacy-name">${mw.html.escape(item.name)}</span>
                </div>
                <div class="legacy-cost">- ${item.cost.toLocaleString()}</div>
                <div class="legacy-tooltip"><img src="${mw.html.escape(item.tooltip)}"></div>
            </div>
        `);

        $card.on('click', function() {
            if (legacyState === item.id) {
                legacyState = null;
                totalSpent -= item.cost;
            } else {
                if (legacyState) {
                    const prev = legacyData.find(i => i.id === legacyState);
                    if (prev) totalSpent -= prev.cost;
                }
                legacyState = item.id;
                totalSpent += item.cost;
            }
            updatePoints();
            loadLegacyTab();
        });

        $card.on('mouseenter', function() {
            var $tooltip = $(this).find('.legacy-tooltip');
            var rect = this.getBoundingClientRect();
            var tooltipWidth = 384;
            var index = $(this).index();

            var left = rect.right + 10;
            var top = rect.top + 150;

            if (index === 3 || index === 7) {
                left = rect.left - (tooltipWidth / 2) - 10;
            }

            if (index >= 4) {
                top = rect.top - 320;
            }

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - 10;
            }

            $tooltip.css({
                position: 'fixed',
                top:      top + 'px',
                left:     left + 'px',
                zIndex:   9999
            }).fadeIn(100);
        });

        $card.on('mouseleave', function() {
            $(this).find('.legacy-tooltip').fadeOut(50);
        });

        $grid.append($card);
    });

    $grid.append(`
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 10px; color: #aaa; font-size: 0.95em;">
            Obtain Legacy Items to unlock their corresponding Legacies
        </div>
    `);
}

function loadOutfitTab() {
    var $grid = $('#inherit-grid');
    $grid.empty();
    $grid.addClass('outfit-grid');

    var $row1 = $('<div class="outfit-row"></div>');
    var $row2 = $('<div class="outfit-row"></div>');

    outfitData.forEach(function(item, index) {
        if (outfitState[item.id] === undefined) outfitState[item.id] = false;
        var isSelected = outfitState[item.id];

        var $img = $(`<img class="outfit-img" src="${mw.html.escape(isSelected ? item.lit : item.dim)}" data-id="${mw.html.escape(item.id)}">`);

        $img.on('click', function() {
            if (outfitState[item.id]) {
                outfitState[item.id] = false;
                totalSpent -= item.cost;
                $(this).attr('src', item.dim);
            } else {
                outfitState[item.id] = true;
                totalSpent += item.cost;
                $(this).attr('src', item.lit);
            }
            updatePoints();
        });

        if (index < 3) $row1.append($img);
        else           $row2.append($img);
    });

    $grid.append($row1).append($row2);
}

function loadMartialCategory(category, isManual = false) {
    const dataSource = isManual ? manualsData : martialData;
    if (dataSource[category]) {
        loadItems(dataSource[category]);
    } else {
        $('#inherit-grid').empty();
    }
}

    // ==================== SIDEBAR HANDLER ====================

        $('.sidebar-btn').on('mouseenter', function() {
            $('.sidebar-btn').removeClass('active');
            $(this).addClass('active');
            var tab = $(this).data('tab');
            $('#inherit-grid').removeClass('legacy-grid outfit-grid');
            $('.outfit-row').remove();
            $('#subtabs-martial').hide();
            $('#subtabs-manuals').hide();

        if      (tab === 'martial')    { $('#subtabs-martial').show(); loadMartialCategory($('#subtabs-martial .sub-tab.active').data('sub') || 'fist', false); }
        else if (tab === 'manuals')    { $('#subtabs-manuals').show(); loadMartialCategory($('#subtabs-manuals .sub-tab.active').data('sub') || 'fist', true); }
        else if (tab === 'items')      { loadItemsTab(); }
        else if (tab === 'blueprints') { loadBlueprintsTab(); }
        else if (tab === 'attributes') { loadAttributeTab(); }
        else if (tab === 'lifeskill')  { loadLifeSkillTab(); }
        else if (tab === 'legacy')     { loadLegacyTab(); }
        else if (tab === 'outfit') { loadOutfitTab(); }
        else if (tab === 'difficulty') { loadDifficultyTab(); }
        else {
            $('#inherit-grid').html('<p style="grid-column:1/-1;text-align:center;padding:80px;color:#777;">' + $(this).html() + ' content coming soon...</p>');
        }
    });

    $(document).on('mouseenter', '#subtabs-martial .sub-tab', function() {
        $('#subtabs-martial .sub-tab').removeClass('active');
        $(this).addClass('active');
        loadMartialCategory($(this).data('sub'), false);
    });

    $(document).on('mouseenter', '#subtabs-manuals .sub-tab', function() {
        $('#subtabs-manuals .sub-tab').removeClass('active');
        $(this).addClass('active');
        loadMartialCategory($(this).data('sub'), true);
    });

    // ==================== RESET ====================

$('.btn-reset').on('click', function() {
    totalSpent      = 0;
    selectedItems.clear();
    itemsState      = {};
    blueprintsState = {};
    attributeState  = {};
    lifeSkillState  = { forging: 1, tailoring: 1, alchemy: 1, cooking: 1 };
    outfitState     = {};
    legacyState     = null;
    redQuirkCount   = 0;
    updatePoints();

    var activeTab = $('.sidebar-btn.active').data('tab');
    if      (activeTab === 'martial')    { loadMartialCategory($('#subtabs-martial .sub-tab.active').data('sub') || 'fist', false); }
    else if (activeTab === 'manuals')    { loadMartialCategory($('#subtabs-manuals .sub-tab.active').data('sub') || 'fist', true); }
    else if (activeTab === 'items')      { loadItemsTab(); }
    else if (activeTab === 'blueprints') { loadBlueprintsTab(); }
    else if (activeTab === 'attributes') { loadAttributeTab(); }
    else if (activeTab === 'lifeskill')  { loadLifeSkillTab(); }
    else if (activeTab === 'legacy')     { loadLegacyTab(); }
    else if (activeTab === 'outfit')     { loadOutfitTab(); }
    else if (activeTab === 'difficulty') { loadDifficultyTab(); }
});

// ==================== INITIAL LOAD ====================

    loadMartialCategory('fist', false);
    totalSpent = 0;   // Reset to 0 after life skill pre-charges settle
    updatePoints();
});