//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');


// Namespaces in header
$(function NamespacesInHeader() {
	if(wgCanonicalNamespace != '' && wgCanonicalNamespace != 'Talk') {
		$('#WikiaPageHeader h1').html(wgFormattedNamespaces[wgNamespaceNumber] + ':' + wgTitle);
	}
});

/* Community Choice Awards */
if (wgPageName === 'User_blog:TheBlueRogue/Call_of_Duty:_Advanced_Warfare_Community_Choice_Awards') {
	challengers = {};
 	//Assault Rifle Images
	challengers['Bal-27'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/11/Bal27.png';
	challengers['AK12'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/d8/AK12.png';
	challengers['ARX-160'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1f/ARX-160.png';
	challengers['HBRa3'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/74/HBRa3.png';
	challengers['IMR'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b1/IMR.png';
	challengers['MK14'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/74/HBRa3.png';
 	//Campaign Images
	challengers['Induction'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/35/InductionLevel.jpg';
	challengers['Atlas'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/02/AtlasLevel.jpg';
	challengers['Traffic'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f8/TrafficLevel.jpg';
	challengers['Fission'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/17/FissionLevel.jpg';
	challengers['Aftermath'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/67/AftermathLevel.jpg';
	challengers['Manhunt'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bc/ManhuntLevel.jpg';
	challengers['Utopia'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/7e/UtopiaLevel.jpg';
	challengers['Sentinel'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/74/SentinelLevel.jpg'
	challengers['Crash'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1f/CrashLevel.jpg';
	challengers['Bio Lab'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/4b/BioLabLevel.jpg';
	challengers['Collapse'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bd/CollapseLevel.jpg';
	challengers['Armada'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/40/ArmadaLevel.jpg';
	challengers['Throttle'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/a/ac/ThrottleLevel.jpg';
	challengers['Captured'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/73/CapturedLevel.jpg';
	challengers['Terminus'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/3c/TerminusLevel.jpg';
 	//Character Images
	challengers['Jack Mitchell'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/96/JackMitchell.png';
	challengers['Ilona'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/5/56/Ilona.jpg';
	challengers['Gideon'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/92/Gideon.png';
	challengers['Jonathan Irons'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/89/JonathonIrons.png';
	challengers['"Kingpin" McDonnell'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/2e/Kingpin.png';
	challengers['Joseph "Hades" Chkheidze'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/64/Hades.png';
 	//Exo Ability Images
	challengers['Exo Shield'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/a/a6/ExoShield.png';
	challengers['Exo Overclock'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/fb/Overclock.png';
	challengers['Exo Mute Device'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ef/MuteDevice.png';
	challengers['Exo Stim'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/28/Stim.png';
	challengers['Exo Cloak'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/27/Cloak.png';
	challengers['Exo Hover'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f7/Hover.png';
	challengers['Exo Ping'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/12/Ping.png';
	challengers['Exo Trophy System'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/cd/Trophy.png';
 	//Game Images
	challengers['Call of Duty'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/98/CoD1.jpg';
	challengers['Call of Duty 2'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/84/CoD2.jpg';
	challengers['Call of Duty 3'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ee/CoD3.jpg';
	challengers['Call of Duty 4: Modern Warfare'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/79/CoD4.png';
	challengers['Call of Duty: World at War'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1a/CoD5.png';
	challengers['Call of Duty: Modern Warfare 2'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/21/CoD6.png';
	challengers['Call of Duty: Black Ops'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/e6/CoD7.png';
	challengers['Call of Duty: Modern Warfare 3'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ef/CoD8.png';
	challengers['Call of Duty: Black Ops II'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/27/CoD9.png';
	challengers['Call of Duty: Ghosts'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/90/CoD10.jpg';
	challengers['Call of Duty: Advanced Warfare'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/0f/Cod11.jpg';
	//Heavy Weapon Images
	challengers['EM1'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/83/EM1.png';
	challengers['Pytaek'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/fe/Pytaek.png';
	challengers['XMG'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/8b/XMG.png';
	challengers['EPM3'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/84/EPM3.png';
	challengers['Ameli'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b3/Ameli.png';
	//Multiplayer Map Images
	challengers['Ascend'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f1/AscendMap.jpg';
	challengers['Biolab'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6a/BiolabMap.jpg';
	challengers['Comeback'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6c/ComebackMap.jpg';
	challengers['Defender'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/63/DefenderMap.jpg';
	challengers['Detroit'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f0/DetroitMap.jpg';
	challengers['Greenband'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/5/53/GreenbandMap.jpg';
	challengers['Horizon'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/ba/HorizonMap.jpg';
	challengers['Instinct'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/d1/InstinctMap.png';
	challengers['Recovery'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/de/RecoveryMap.jpg';
	challengers['Retreat'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/41/RetreatMap.jpg';
	challengers['Riot'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/0d/RiotMap.jpg';
	challengers['Solar'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/c3/SolarMap.jpg';
	challengers['Terrace'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6b/TerraceMap.jpg';
	challengers['Atlas Gorge'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/7f/AtlasGorgeMap.jpg';
	//Perk 1 Images
	challengers['Lightweight'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/3f/Lightweight.png';
	challengers['Low Profile'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/69/LowProfile.png';
	challengers['Danger Close'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/ce/DangerClose.png';
	challengers['Overcharged'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/c3/Overcharged.png';
	challengers['Flak Jacket'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/30/FalkJacket.png';
	//Perk 2 Images
	challengers['Peripherals'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b2/Peripherals.png';
	challengers['Blind Eye'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/c2/BlindEye.png';
	challengers['Cold-Blooded'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/da/ColdBlooded.png';
	challengers['Fast Hands'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/a/a7/FastHands.png';
	challengers['Gung-Ho'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b1/Gungho.png';
	//Perk 3 Images
	challengers['Toughness'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/12/Toughness.png';
	challengers['Scavenger'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/18/Scavenger.png';
	challengers['Blast Supressor'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f0/BlastSurpressor.png';
	challengers['Hard Wired'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/02/HardWired.png';
	challengers['Hardline'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/7b/Hardline.png';
	//Pistol Images
	challengers['Atlas 45'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1e/Atlas45.png';
	challengers['RW1'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/a/ac/RW1.png';
	challengers['MP443 Grach'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/24/MP-443Grach.png';
	challengers['PDW'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bc/PDW.png';
	//Scorestreak Images
	challengers['Aerial Recon Drone'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/8d/AerialReconDrone.png';
	challengers['UAV'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/35/UAV.png';
	challengers['Aerial Assault Drone'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/da/AerialAssaultDrone.png';
	challengers['Orbital Care Package'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/64/OrbitalCarePackage.png';
	challengers['Remote Turret'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6a/RemoteTurret.png';
	challengers['XS1 Vulcan'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/5/52/XS1Vulcan.png';
	challengers['System Hack'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/39/SystemHack.png';
	challengers['Bombing Run'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/ce/BombingRun.png';
	challengers['Missile Strike'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/c8/MissileStrike.png';
	challengers['Warbird'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/39/Warbird.png';
	challengers['XS1 Goliath'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/95/XS1-Goliath.png';
	challengers['Paladin'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b2/Paladin.png';
	//Shotgun Images
	challengers['Tac-19'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ec/Tac-19.png';
	challengers['S-12'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/49/S-12.png';
	challengers['Bulldog'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/07/Bulldog.png';
	//Sniper Rifle Images
	challengers['Lynx'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/b8/Lynx.png';
	challengers['MORS'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/12/MORS.png';
	challengers['NA-45'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/df/NA-45.png';
	challengers['Atlas 20mm'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/95/Atlas20mm.png';
	//Submachine Gun Images
	challengers['KF5'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/64/KF5.png';
	challengers['MP11'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/81/MP11.png';
	challengers['ASM1'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/3b/ASM1.png';
	challengers['SN6'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/cf/SN6.png';
	challengers['SAC3'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/61/SAC3.png';
	challengers['AMR9'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/7f/AMR9.png';  
	//Assault Rifle Links
	challengers['Bal-27-link'] = 'http://callofduty.wikia.com/wiki/Bal-27';
 	challengers['AK12-link'] = 'http://callofduty.wikia.com/wiki/AK-12';
 	challengers['ARX-160-link'] = 'http://callofduty.wikia.com/wiki/ARX-160';
 	challengers['HBRa3-link'] = 'http://callofduty.wikia.com/wiki/HBRa3';
 	challengers['IMR-link'] = 'http://callofduty.wikia.com/wiki/IMR';
 	challengers['MK14-link'] = 'http://callofduty.wikia.com/wiki/MK14';
	//Campaign Links
	challengers['Induction-link'] = 'http://callofduty.wikia.com/wiki/Induction';
	challengers['Atlas-link'] = 'http://callofduty.wikia.com/wiki/Atlas_(mission)';
	challengers['Traffic-link'] = 'http://callofduty.wikia.com/wiki/Traffic';
 	challengers['Fission-link'] = 'http://callofduty.wikia.com/wiki/Fission';
 	challengers['Aftermath-link'] = 'http://callofduty.wikia.com/wiki/Aftermath_(Advanced_Warfare)';
 	challengers['Manhunt-link'] = 'http://callofduty.wikia.com/wiki/Manhunt';
 	challengers['Utopia-link'] = 'http://callofduty.wikia.com/wiki/Utopia';
 	challengers['Sentinel-link'] = 'http://callofduty.wikia.com/wiki/Sentinel_(mission)';
 	challengers['Crash-link'] = 'http://callofduty.wikia.com/wiki/Crash_(mission)';
 	challengers['Bio Lab-link'] = 'http://callofduty.wikia.com/wiki/Bio_Lab';
 	challengers['Collapse-link'] = 'http://callofduty.wikia.com/wiki/Collapse';
 	challengers['Armada-link'] = 'http://callofduty.wikia.com/wiki/Armada';
 	challengers['Throttle-link'] = 'http://callofduty.wikia.com/wiki/Throttle';
 	challengers['Captured-link'] = 'http://callofduty.wikia.com/wiki/Captured';
	challengers['Terminus-link'] = 'http://callofduty.wikia.com/wiki/Terminus';
	//Character Links
	challengers['Jack Mitchell-link'] = 'http://callofduty.wikia.com/wiki/Jack_Mitchell';
 	challengers['Ilona-link'] = 'http://callofduty.wikia.com/wiki/Ilona';
 	challengers['Gideon-link'] = 'http://callofduty.wikia.com/wiki/Gideon';
 	challengers['Jonathan Irons-link'] = 'http://callofduty.wikia.com/wiki/Jonathan_Irons';
 	challengers['"Kingpin" McDonnell-link'] = 'http://callofduty.wikia.com/wiki/%22Kingpin%22_McDonnell';
 	challengers['Joseph "Hades" Chkheidze-link'] = 'http://callofduty.wikia.com/wiki/Joseph_%22Hades%22_Chkheidze';
	//Exo Abilities Links
	challengers['Exo Shield-link'] = 'http://callofduty.wikia.com/wiki/Exo_Shield';
 	challengers['Exo Overclock-link'] = 'http://callofduty.wikia.com/wiki/Exo_Overclock';
 	challengers['Exo Mute Device-link'] = 'http://callofduty.wikia.com/wiki/Exo_Mute_Device';
 	challengers['Exo Stim-link'] = 'http://callofduty.wikia.com/wiki/Exo_Stimt';
 	challengers['Exo Cloak-link'] = 'http://callofduty.wikia.com/wiki/Exo_Cloak';
 	challengers['Exo Hover-link'] = 'http://callofduty.wikia.com/wiki/Exo_Hover';
	challengers['Exo Ping-link'] = 'http://callofduty.wikia.com/wiki/Exo_Ping';
 	challengers['Exo Trophy System-link'] = 'http://callofduty.wikia.com/wiki/Exo_Trophy_System';
	//Game Links
	challengers['Call of Duty-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty';
 	challengers['Call of Duty 2-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty_2';
 	challengers['Call of Duty 3-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty_3';
 	challengers['Call of Duty 4: Modern Warfare-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty_4:_Modern_Warfare';
 	challengers['Call of Duty: World at War-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_World_at_War';
 	challengers['Call of Duty: Modern Warfare 2-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_Modern_Warfare_2';
 	challengers['Call of Duty: Black Ops-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_Black_Ops';
 	challengers['Call of Duty: Modern Warfare 3-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_Modern_Warfare_3';
 	challengers['Call of Duty: Black Ops II-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty_9';
 	challengers['Call of Duty: Ghosts-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_Ghosts';
 	challengers['Call of Duty: Advanced Warfare-link'] = 'http://callofduty.wikia.com/wiki/Call_of_Duty:_Advanced_Warfare';
	//Heavy Weapon Links
 	challengers['EM1-link'] = 'http://callofduty.wikia.com/wiki/EM1';
 	challengers['Pytaek-link'] = 'http://callofduty.wikia.com/wiki/Pytaek';
 	challengers['XMG-link'] = 'http://callofduty.wikia.com/wiki/XMG';
 	challengers['EPM3-link'] = 'http://callofduty.wikia.com/wiki/EPM3';
 	challengers['Ameli-link'] = 'http://callofduty.wikia.com/wiki/Ameli';
 	//Multiplayer Map Links
 	challengers['Ascend-link'] = 'http://callofduty.wikia.com/wiki/Ascend';
 	challengers['Biolab-link'] = 'http://callofduty.wikia.com/wiki/Bio_Lab_(Map)';
 	challengers['Comeback-link'] = 'http://callofduty.wikia.com/wiki/Comeback';
 	challengers['Defender-link'] = 'http://callofduty.wikia.com/wiki/Defender_(Advanced_Warfare)';
 	challengers['Detroit-link'] = 'http://callofduty.wikia.com/wiki/Detroit';
 	challengers['Greenband-link'] = 'http://callofduty.wikia.com/wiki/Greenband';
 	challengers['Horizon-link'] = 'http://callofduty.wikia.com/wiki/Horizon';
 	challengers['Instinct-link'] = 'http://callofduty.wikia.com/wiki/Instinct';
 	challengers['Recovery-link'] = 'http://callofduty.wikia.com/wiki/Recovery';
 	challengers['Retreat-link'] = 'http://callofduty.wikia.com/wiki/Retreat';
 	challengers['Riot-link'] = 'http://callofduty.wikia.com/wiki/Riot';
 	challengers['Solar-link'] = 'http://callofduty.wikia.com/wiki/Solar';
 	challengers['Terrace-link'] = 'http://callofduty.wikia.com/wiki/Terrace';
 	challengers['Atlas Gorge-link'] = 'http://callofduty.wikia.com/wiki/Atlas_Gorge';
 	//Tier 1 Perk Links
 	challengers['Lightweight-link'] = 'http://callofduty.wikia.com/wiki/Lightweight';
 	challengers['Low Profile-link'] = 'http://callofduty.wikia.com/wiki/Low_Profile';
 	challengers['Danger Close-link'] = 'http://callofduty.wikia.com/wiki/Danger_Close_(perk)';
 	challengers['Overcharged-link'] = 'http://callofduty.wikia.com/wiki/Overcharged';
 	challengers['Flak Jacket-link'] = 'http://callofduty.wikia.com/wiki/Flak_Jacket';
 	//Tier 2 Perk Links
 	challengers['Peripherals-link'] = 'http://callofduty.wikia.com/wiki/Peripherals';
 	challengers['Blind Eye-link'] = 'http://callofduty.wikia.com/wiki/Blind_Eye';
 	challengers['Cold-Blooded-link'] = 'http://callofduty.wikia.com/wiki/Cold-Blooded';
 	challengers['Fast Hands-link'] = 'http://callofduty.wikia.com/wiki/Fast_Hands';
 	challengers['Gung-ho-link'] = 'http://callofduty.wikia.com/wiki/Gung-Ho';
 	//Tier 3 Perk Links
 	challengers['Toughness-link'] = 'http://callofduty.wikia.com/wiki/Toughness';
 	challengers['Scavenger-link'] = 'http://callofduty.wikia.com/wiki/Scavenger_(perk)';
 	challengers['Blast Supressor-link'] = 'http://callofduty.wikia.com/wiki/Blast_Suppressor';
 	challengers['Hard Wired-link'] = 'http://callofduty.wikia.com/wiki/Hard_Wired';
 	challengers['Hardline-link'] = 'http://callofduty.wikia.com/wiki/Hardline';
 	//Pistol Links
 	challengers['Atlas 45-link'] = 'http://callofduty.wikia.com/wiki/Atlas_45';
 	challengers['RW1-link'] = 'http://callofduty.wikia.com/wiki/RW1';
 	challengers['MP443 Grach-link'] = 'http://callofduty.wikia.com/wiki/MP-443_Grach';
 	challengers['PDW-link'] = 'http://callofduty.wikia.com/wiki/PDW';
 	//Scorestreak Links
 	challengers['Aerial Recon Drone-link'] = 'http://callofduty.wikia.com/wiki/Aerial_Recon_Drone';
 	challengers['UAV-link'] = 'http://callofduty.wikia.com/wiki/UAV_Recon';
 	challengers['Aerial Assault Drone-link'] = 'http://callofduty.wikia.com/wiki/Aerial_Assault_Drone';
 	challengers['Orbital Care Package-link'] = 'http://callofduty.wikia.com/wiki/Orbital_Care_Package';
 	challengers['Remote Turret-link'] = 'http://callofduty.wikia.com/wiki/Remote_Sentry';
 	challengers['XS1 Vulcan-link'] = 'http://callofduty.wikia.com/wiki/XS1_Vulcan';
 	challengers['System Hack-link'] = 'http://callofduty.wikia.com/wiki/System_Hack';
 	challengers['Bombing Run-link'] = 'http://callofduty.wikia.com/wiki/Bombing_Run';
 	challengers['Missile Strike-link'] = 'http://callofduty.wikia.com/wiki/Missile_Strike';
 	challengers['Warbird-link'] = 'http://callofduty.wikia.com/wiki/Warbird';
 	challengers['XS1 Goliath-link'] = 'http://callofduty.wikia.com/wiki/XS1_Goliath';
challengers['Paladin-link'] = 'http://callofduty.wikia.com/wiki/Paladin';
 	//Shotgun Links
 	challengers['Tac-19-link'] = 'http://destiny.wikia.com/wiki/Shotgun';
 	challengers['S-12-link'] = 'http://destiny.wikia.com/wiki/Hand_Cannon';
 	challengers['Bulldog-link'] = 'http://destiny.wikia.com/wiki/Shotgun';
 	//Sniper Rifle Links
 	challengers['Lynx-link'] = 'http://destiny.wikia.com/wiki/Shotgun';
 	challengers['MORS-link'] = 'http://destiny.wikia.com/wiki/Hand_Cannon';
 	challengers['NA-45-link'] = 'http://destiny.wikia.com/wiki/Shotgun';
 	challengers['Atlas 20mm-link'] = 'http://destiny.wikia.com/wiki/Shotgun';
 	//Submachine Gun Links
	challengers['KF5-link'] = 'http://callofduty.wikia.com/wiki/KF5';
	challengers['MP11-link'] = 'http://callofduty.wikia.com/wiki/MP11';
 	challengers['ASM1-link'] = 'http://callofduty.wikia.com/wiki/ASM1';
 	challengers['SN6-link'] = 'http://callofduty.wikia.com/wiki/SN6';
 	challengers['SAC3-link'] = 'http://callofduty.wikia.com/wiki/SAC3';
 	challengers['AMR9-link'] = 'http://callofduty.wikia.com/wiki/AMR9';
 
	challengerPoll = {
		init: function() {
			$('.ajax-poll').each(function() {
				var pollID = $(this).attr('id').split('-')[2];
				$('.pollAnswerName label', this).each(function(index) {
					var challenger = $(this).text();
					var radioID = $('input', this).attr('id');
					var radioValue = $('input', this).attr('value');
					var challenger1 = challenger.trim();
					challengerPoll.beautify(this, challenger1, pollID, radioID, radioValue);
				});
			});
 
			$('.ajax-poll').on('click', '.challenger img', function() {
				var currentPoll = $(this).parents().find('.ajax-poll').get(0);
				$(this).closest('.ajax-poll').children().find('.challenger').attr('class','challenger');
				$(this).parent().addClass('active');
 
				var pollID = $(this).attr('data-poll');
				var pollRadio = $(this).attr('data-radio');
				var pollValue = $(this).attr('data-value');
				var params = {};
				params['action'] = 'ajax';
				params['rs'] = 'axAjaxPollSubmit';
				params['title'] = wgPageName;
				params['wpPollId'] = pollID;
				params['wpVote'] = 'Vote!';
				params[pollRadio] = pollValue;
				$.post('index.php', params, function(data) {
					var total = data.total;
					$('.pollAnswerVotes', currentPoll).each(function() {
						var votedSpan = $('span', this);
						var votedBar = $('div', this);
						var currentValue = $('span', this).attr('id').split('-')[1];
						
						if (typeof data.votes[currentValue] != 'undefined') {
							$(votedSpan).text(data.votes[currentValue].value);
							$(votedSpan).attr('title',data.votes[currentValue].percent + '%');
							$(votedBar).css('width',data.votes[currentValue].percent + '%');
						}
						else {
							$(votedSpan).text('0');
							$(votedSpan).attr('title','0%');
							$(votedBar).css('width','0%');						
						}
					});		
				}, "json");
			});
 
		},	
		beautify: function(element, challenger, poll, radio, value) {
			var challengerLink = challenger + '-link';
			$(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 100px; height: 100px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
		}
	};
 
	$(document).ready(function() {
		$('.ajax-poll .total').parent().attr('class','description');
		$('.ajax-poll .pollAnswerVotes span').each(function () {
			var titleReplace = $(this).attr('title');
			if (titleReplace == 0) {
				$(this).attr('title','0%');				
			}
			else if (titleReplace) {
				var titleReplace = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
				$(this).attr('title',titleReplace);
			}
			else {
				$(this).attr('title','0%');		
			}
		});
		challengerPoll.init();
	});
}