helix = {
	config: {
		cookieName: 'helixbuilder', // The name of the cookie used to store the user's choices.
		initOn: ['Battleborn_Wiki:Helix_Builder'], // The page(s) builder runs on.
		appendTo: $('.helix-builder'), // The jQuery element the builder attaches itself to.
		introHeader: "Helix Builder", // The header of the builder page.
		introText: "Please select a hero below to start building their Helix. Your build will be automatically saved whenever you make a change so you can revisit your builds later, even after closing the page. Simply click on either the left, center or right helix level to choose that level. The permalink link on the right hand side will let you share your build with others by copying the link.", // The intro text of the builder page.
		share: { // Texts used when sharing the page. $1 is replaced by the name of the hero that's being shared.
			permalink: "Permalink",
			facebookImage: "https://vignette.wikia.nocookie.net/battleborn/images/7/72/Mainpage_Share_Facebook.png/revision/latest?cb=20160408095450",
			twitterImage: "https://vignette.wikia.nocookie.net/battleborn/images/f/f2/Mainpage_Share_Twitter.png/revision/latest?cb=20160408095451",
			facebookShareImage: "https://vignette.wikia.nocookie.net/battleborn/images/2/23/Mainpage_Slider_Beta.png/revision/latest",
			facebookShareHeader: "Battleborn: Montana Helix Build Guide",
			facebookShareText: "Check out my custom Battleborn Helix build guide for $1!",
			twitterShareText: "Check out my custom @Battleborn Helix build guide for $1!",
			twitterShareVia: "getfandom"
		}
	},
	
	// This JSON object includes all heroes, their name, their icon and their abilities. 
	heroes: {
		'Ambra': {
			name: 'Ambra',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3e/Ambra_-_Icon.png/revision/latest?cb=20160408095318',
			choices: [
				[{
					name: 'Sunspotter',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Enemies linked to a Sunspot take increased damage from other sources. This effect stacks across Sunspots. +10% Damage.'
				}, {
					name: 'Illumination',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Solar Wind catches enemies on Fire, doing damage over time. 42 Damage Per Second for 3 Seconds.'
				}],
				[{
					name: 'Blessing Of The Sun',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Sunspots transfer their health to nearby allies, healing friendly Battleborn over time. +47 Health Per Second.'
				}, {
					name: 'Soothing Sunlight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Sunspots provide a burst of healing when picked up by allies based on the Sunspot\'s remaining health. Up to +167 Healing.'
				}, {
					name: 'Solar Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Sunspots explode with a damaging area of effect when triggered by nearby enemies.'			
				}],	
				[{
					name: 'Ceremonial Sacrifice',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cb/Staff_of_Radiance.png/revision/latest?cb=20160407215805',
					description: 'Ambra\'s Staff of Radiance can be used to transfer health to a targeted ally at the cost of her own life force. Health cost is +30% of healing done.'
				}, {
					name: 'Stellar Ritual',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cb/Staff_of_Radiance.png/revision/latest?cb=20160407215805',
					description: 'Ambra\'s Staff of Radiance can be used to fuel a Sunsport, strengthening and replentishing its health. +150 Sunspot Efficiency, +100 Health per Second.'
				}, {
					name: 'Blood Drive',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cb/Staff_of_Radiance.png/revision/latest?cb=20160407215805',
					description: 'Increases the amount of life stolen from enemies through Ambra\'s Staff of Radiance. +20% Life Steal.'			
				}],	
				[{
					name: 'Radiant Gale',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Enemies hit by Solar Wind are blown away, being repeatedly Knocked Back.'
				}, {
					name: 'Ritual of Repulsion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Replaces Solar Wind\'s directed channel with two slams to the ground of Ambra\'s Staff. Enemies all around Ambra are pushed back with each slam.'
				}, {
					name: 'Searing Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Solar Wind deals more damage, the closer Ambra is to her target. Up to +100% damage.'			
				}],		
				[{
					name: 'Cauterization',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a4/Flame_Shield.png/revision/latest?cb=20160407215804',
					description: 'Ambra gains increased speed when her Flame Shield is active. +60% Movement Speed.'
				}, {
					name: 'Flame Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a4/Flame_Shield.png/revision/latest?cb=20160407215804',
					description: 'Ambra\'s Flame Shield explodes on expiry, damaging nearby enemies. +280 Damage.'
				}],
				[{
					name: 'Agile Anomaly',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Sunspots can link to stealthed characters and have increased range. +50% Distance and Reveal Stealth.'
				}, {
					name: 'Solar Anomaly',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Increases the number of simultaneous active Sunspots. +1 Sunspot.'
				}, {
					name: 'Solar Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Decreases Solar Wind\'s cooldown time. - 20% Cooldown Time.'			
				}],	
				[{
					name: 'Flame Staff',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c5/Scorching_Strikes.png/revision/latest?cb=20160407215804',
					description: 'The extra damage that Ambra\'s Scorching Strikes does through the expenditure of Heat is gained as Health.'
				}, {
					name: 'Radiant Halberd',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c5/Scorching_Strikes.png/revision/latest?cb=20160407215804',
					description: 'When Heated, Ambra\'s Staff of Radiance transforms into a halberd that fires condensed Heat in the form of explosive mini-novas.'
				}, {
					name: 'Radiant Spear',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c5/Scorching_Strikes.png/revision/latest?cb=20160407215804',
					description: 'Transforms Ambra\'s staff into a spear, capable of releasing all of its built up Heat in a singular, devestating impact.'			
				}],	
				[{
					name: 'Bask in the Light',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Lower Sunspot\'s cooldown. -20% Cooldown Time.'
				}, {
					name: 'Fan the Flames',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Sunspot.png/revision/latest?cb=20160407215805',
					description: 'Increases the health of Ambra\'s Sunspots. +50% Sunspot Health.'
				}],
				[{
					name: 'Howling Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Increases Solar Wind\'s area of effect. +40% Area of Effect Radius.'
				}, {
					name: 'Sweltering Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7f/Solar_Wind.png/revision/latest?cb=20160407215804',
					description: 'Increases Solar Wind\'s damage. +15% Damage.'
				}],
				[{
					name: 'Impact Crater',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Extinction_Event.png/revision/latest',
					description: 'On impact, Extinction Event stuns nearby enemies. +2 Seconds Stun Duration.'
				}, {
					name: 'World\'s End',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Extinction_Event.png/revision/latest',
					description: 'Extinction Event\'s smoldering remains last longer. +3 Seconds Duration.'
				}]	
			]
		},
		'Attikus': {
			name: 'Attikus',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d7/Attikus_-_Icon.png/revision/latest?cb=20160408095319',
			choices: [
				[{
					name: 'Hedronic Siphoning',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'A portion of damage dealt by Hedronic Arc is returned to Attikus as health. +15% Life Steal.'
				}, {
					name: 'Energetic Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Pounce deals additional damage in an area of effect around Attikus at the beginning of his leap. +50% Damage.'
				}],
				[{
					name: 'Staggering Pounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Enemies damaged by Pounce are slowed. +3 Seconds Slow Duration.'
				}, {
					name: 'Invigorating Pounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Pounce gives Attikus life steal on all damage dealt for a short time. +30% Life Steal for 8 Seconds.'
				}, {
					name: 'Energetic Pounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Activating Pounce causes Attikus shields to immediately begin rapidly recharging until impact. +105 Shield Recharge Per Second.'			
				}],	
				[{
					name: 'Brawler\'s Boon',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Barefisted_Brawling.png/revision/latest?cb=20160407222818',
					description: 'A portion of damage dealt by Attikus\' melee attacks is returned to him as health. +15% Life Steal.'
				}, {
					name: 'Tenacity',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Barefisted_Brawling.png/revision/latest?cb=20160407222818',
					description: 'Repeated melee damage to the same target within 2 seconds stacks bonus damage up to 5 times. Up to +60% Damage.'
				}],
				[{
					name: 'Dampening Field',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Enemies damaged by Hedronic Arc suffer reduced damage output for a short time. -30% Enemy Damage Output for 1 Second.'
				}, {
					name: 'Quickening Arc',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Attikus moves faster while Hedronic Arc is shocking enemies. +30% Movement Speed.'
				}],
				[{
					name: 'Hedronic Regeneration',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Hedronic_Collector.png/revision/latest?cb=20160407222819',
					description: 'Attikus gains a small boost to health regeneration for each charge accumulated by Hedronic Collector. Up to +35 Health Regeneration Per Second.'
				}, {
					name: 'Charge Efficiency',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Hedronic_Collector.png/revision/latest?cb=20160407222819',
					description: 'Executing a Fully Charged skill consumes 1 charge instead of 5, but Attikus only gains 1 charge per major enemy kill instead of 5.'
				}, {
					name: 'Hedronic Haste',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Hedronic_Collector.png/revision/latest?cb=20160407222819',
					description: 'Attikus\' skill cooldowns are reduced slightly for each charge accumulated by Hedronic Collector. Up to -15% Cooldown Time.'			
				}],	
				[{
					name: 'Disruptor Field',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Increases Hedronic Arc damage against enemy shields. +50% Bonus Damage To Shields.'
				}, {
					name: 'Chain Breaker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'If Pounce kills a major enemy the skill\'s cooldown is immediately reset.'
				}],
				[{
					name: 'Unstoppable',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Barefisted_Brawling.png/revision/latest?cb=20160407222818',
					description: 'Increases Attikus\' maximum health. +360 Maximum Health.'
				}, {
					name: 'Skull Crusher',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Barefisted_Brawling.png/revision/latest?cb=20160407222818',
					description: 'Increases damage dealt by critical hits. +20% Critical Damage.'
				}, {
					name: 'Swift Strikes',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Barefisted_Brawling.png/revision/latest?cb=20160407222818',
					description: 'Increases Attikus\' attack speed. +20% Attack Speed.'			
				}],	
				[{
					name: 'Big Splash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Increases Pounce\'s area of effect. +50% Area of Effect Radius.'
				}, {
					name: 'Power Pounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/12/Pounce.png/revision/latest?cb=20160407222820',
					description: 'Increases Pounce\'s damage +15 Damage.'
				}],
				[{
					name: 'Hedronic Chain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Hedronic Arc chains to nearby enemies, dealing reduced damage to the additional targets. 50% Damage To Nearby Targets.'
				}, {
					name: 'Greased Lightning',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Increases the damage per second dealt by Hedronic Arc but reduces its duration. +100% Damage per Second, -2 Seconds Duration.'
				}, {
					name: 'Aftershock',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fe/Hedronic_Arc.png/revision/latest?cb=20160407222819',
					description: 'Increases the amount of time that enemies take damage when shocked by Hedronic Arc. +2 Seconds Duration.'			
				}],	
				[{
					name: 'Wake of Devastation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/34/Hedronic_Eruption.png/revision/latest?cb=20160407222820',
					description: 'Hedronic Eruption scorches the earth, dealing damage over time to enemies in its area of effect. +240 Damage over 2 Seconds.'
				}, {
					name: 'Payback Time',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/34/Hedronic_Eruption.png/revision/latest?cb=20160407222820',
					description: 'Each Hedronic Eruption shockwave deals more damage the lower Attikus\' current health is. Up to +60 Damage.'
				}, {
					name: 'Unstoppable Rampage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/34/Hedronic_Eruption.png/revision/latest?cb=20160407222820',
					description: 'Each enemy killed by Hedronic Eruption prolongs its duration. +2 Seconds per Kill, Up to +10 Seconds Duration.'			
				}]
			]
		},
		'Benedict': {
			name: 'Benedict',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Benedict_-_Icon.png/revision/latest?cb=20160408095319',
			choices: [
				[{
					name: 'Evasive Pattern Benedict',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'Liftoff now launches up and backwards.'
				}, {
					name: 'Rejiggered Ordinance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Hawkeye rockets deal increased damage to shields. +50% Bonus Damage to Shields.'
				}, {
					name: 'Persistent Projectiles',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Hawkeye\'s target effect lasts longer. +1 Second Homing Duration.'
				}],
				[{
					name: 'Make Some Room',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'On activation, Liftoff pushes nearby enemies away.'
				}, {
					name: 'Wind Chill',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'On activation, Liftoff slows nearby enemies. +1 Second Slow.'
				}],	
				[{
					name: 'Ready Rockets',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/UPR-SM23_Rocket_Launcher.png/revision/latest?cb=20160407185144',
					description: 'Increases Rocket Launcher\'s reload speed. +30% Reload Speed.'
				}, {
					name: 'Speedy Delivery',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/UPR-SM23_Rocket_Launcher.png/revision/latest?cb=20160407185144',
					description: 'Increases rocket propulsion speed. +25% Rocket Speed.'
				}],
				[{
					name: 'Rapid Reload',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Activating Hawkeye instantly reloads Benedict\'s Rocket Launcher.'
				}, {
					name: 'A Murder of Rockets',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Hawkeye now launches three rockets in rapid succession. +2 Rockets.'
				}],
				[{
					name: 'Glide-iator',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3f/Flyboy.png/revision/latest?cb=20160407185143',
					description: 'Grants a second air jump.'
				}, {
					name: 'Divebomb',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3f/Flyboy.png/revision/latest?cb=20160407185143',
					description: 'While gliding, press the off-hand melee button to divebomb enemies, dealing damage and pushing them back. This can be used every 8 seconds.'
				}, {
					name: 'Tailwind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3f/Flyboy.png/revision/latest?cb=20160407185143',
					description: 'Increases Benedict\'s in-air gliding speed. +25% Flight Speed.'			
				}],	
				[{
					name: 'Blastoff',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'On activation, Liftoff damages nearby enemies. +133 Damage.'
				}, {
					name: 'Heavy Bombardment',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Homing Rockets deal increased damage to enemies. +20% Damage.'
				}],
				[{
					name: 'Danger Zone',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/UPR-SM23_Rocket_Launcher.png/revision/latest?cb=20160407185144',
					description: 'Increases the Rocket Launcher\'s blast radius. +45% Area of Effect Radius.'
				}, {
					name: 'Multiloader',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/UPR-SM23_Rocket_Launcher.png/revision/latest?cb=20160407185144',
					description: 'Allows the Rocket Launcher to charge and fire multiple rockets simultaneously. Hold the attack button to charge the Rocket Launcher.'
				}, {
					name: 'Surgical Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/UPR-SM23_Rocket_Launcher.png/revision/latest?cb=20160407185144',
					description: 'Increases Rocket Launcher\'s damage while reducing its area of effect. +18% Damage, -20% Area of Effect Radius.'			
				}],	
				[{
					name: 'Frequent Flyer',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'Reduces Liftoff cooldown, allowing more frequent use. -25% Cooldown Time.'
				}, {
					name: 'First Class',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b9/Liftoff.png/revision/latest?cb=20160407185144',
					description: 'Shields begin to recharge immediately after activating Liftoff.'
				}],
				[{
					name: 'Less Talk, More Hawk',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Reduces Hawkeye\'s cooldown. -25% Cooldown Time.'
				}, {
					name: 'Eyes on You',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Increases Hawkeye\'s blast radius. +50% Area of Effect Radius.'
				}, {
					name: 'Party Starter',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Hawkeye.png/revision/latest?cb=20160407185144',
					description: 'Increases Hawkeye rocket damage. +15% Damage.'			
				}],	
				[{
					name: 'Hawkpocalypse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Boomsday.png/revision/latest?cb=20160407185142',
					description: 'Increases Boomsday\'s explosion radius. +100% Blast Radius.'
				}, {
					name: 'Phoenix Protocol',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Boomsday.png/revision/latest?cb=20160407185142',
					description: 'Boomsday scorches the earth at its detonation site, dealing damage over time to nearby enemies. +480 Damage over 8 Seconds.'
				}, {
					name: 'Rockets Launchin\' Rockets',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Boomsday.png/revision/latest?cb=20160407185142',
					description: 'While Boomsday\'s guided missile is in flight, reactivating the skill fires smaller rockets.'			
				}]
			]
		},
		'Boldur': {
			name: 'Boldur',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b3/Boldur_-_Icon.png/revision/latest?cb=20160408095319',
			choices: [
				[{
					name: 'Axe Ricochet',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'If Axe Toss hits enemies or objects in the world, it is immediately returned to Boldur\'s hand.'
				}, {
					name: 'Crash Helmet',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Activating Boldurdash generates an overshield on Boldur for a brief period. +225 Overshield for 8 seconds.'
				}],
				[{
					name: 'Aegis of Anger',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Activating Boldurdash immediately activates Rage.'
				}, {
					name: 'Pinballer',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'After striking a target with Boldurdash, Boldur bounces backwards.'
				}, {
					name: 'Gather no Moss',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Boldur continues to dash forward after hitting an enemy with Boldurdash, allowing him to hit multiple enemies. Enemies are now knocked into the air instead of pushed back.'
				}],	
				[{
					name: 'Stunning Blows',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0a/Runic_Axe.png/revision/latest?cb=20150624185029',
					description: 'When Boldur is unarmed, his primary melee attacks slow enemies. +3 Seconds Slow Duration.'
				}, {
					name: 'Deft Defender',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/2b/Ekkuni_Greatshield.png/revision/latest?cb=20150624185118',
					description: 'Boldur is more proficient with his Greatshield, capable of blocking more damage and running at full speed while guarding.'
				}],
				[{
					name: 'Hatchet Man',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Enemies hit with Axe Toss suffer bleed damage. +48 Damage over 4 seconds.'
				}, {
					name: 'Headsplitter',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Enemies hit with Axe Toss are slowed. +3 Seconds Slow Duration.'
				}],
				[{
					name: 'Angry Agility',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/27/Rage.png/revision/latest?cb=20150624185137',
					description: 'When Rage is active, Boldur\'s movement speed is increased. +30% Movement Speed.'
				}, {
					name: 'Desperate Rage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/27/Rage.png/revision/latest?cb=20150624185137',
					description: 'Increases Boldur\'s passive damage reduction while Rage is active. +15% Damage Reduction.'
				}, {
					name: 'Berserker Rage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/27/Rage.png/revision/latest?cb=20150624185137',
					description: 'Increases Boldur\'s health regeneration rate while Rage is active. +14 Health Regeneration per Second.'			
				}],	
				[{
					name: 'Axterminator',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Increases Axe Toss\'s damage. +15% Damage.'
				}, {
					name: 'Salt the Wound',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Enemies hit by Axe Toss suffer increased damage for a short time. +15% Damage.'
				}, {
					name: 'Boldurcrash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Increases Boldurdash\'s damage. +15% Damage.'
				}],
				[{
					name: 'Wildblood',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0a/Runic_Axe.png/revision/latest?cb=20150624185029',
					description: 'Increases the damage of all Boldur\'s melee attacks. +18% Damage.'
				}, {
					name: 'Dwarven Constitution',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/2b/Ekkuni_Greatshield.png/revision/latest?cb=20150624185118',
					description: 'Increases Boldur\'s health regeneration rate. +7 Health Regeneration per Second.'
				}],	
				[{
					name: 'Long-Distance Dash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Increases Boldurdash\'s dash distance.'
				}, {
					name: 'Knockout Punch',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0a/Runic_Axe.png/revision/latest?cb=20150624185029',
					description: 'As Boldur\'s health drops, his bare-fisted melee attacks deal increased damage. +18% Damage.'
				}, {
					name: 'First Class',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9b/Boldurdash.png/revision/latest?cb=20150624185101',
					description: 'Reduces Boldurdash\'s cooldown time. -20% Cooldown Time.'
				}],
				[{
					name: 'Death and Axes',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Killing an enemy with Axe Toss increases Boldur\'s max health. Major enemies apply this effect twice. This effect can stack up to 5 times. All stacks are lost on death. +144 Maximum Health per Stack.'
				}, {
					name: 'Trusty Toss',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Axe_Toss.png/revision/latest?cb=20150624185043',
					description: 'Retrieving Boldur\'s Runic Axe reduces Axe Toss\'s cooldown. -20% Cooldown Time on Axe Retrieval.'
				}],	
				[{
					name: 'Axe Mastery',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0c/Runes_of_Power.png/revision/latest?cb=20150624185152',
					description: 'While a Rune of Power is active on Boldur\'s Runic Axe, it will deal increased melee damage based upon his current health. +2% Damage for every 100 health.'
				}, {
					name: 'Runic Replenishment',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0c/Runes_of_Power.png/revision/latest?cb=20150624185152',
					description: 'Activating Runes of Power while a Rune is still active instantly replenishes Boldur\'s health. Either Rune will restore 50% health, while both will restore 100% health.'
				}, {
					name: 'Shield Mastery',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0c/Runes_of_Power.png/revision/latest?cb=20150624185152',
					description: 'While a Rune of Power is active on Boldur\'s Greatshield, he is able to guard against enemy attacks without generating any heat.'			
				}]
			]
		},
		'Caldarius': {
			name: 'Caldarius',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c0/Caldarius_-_Icon.png/revision/latest?cb=20160408095320',
			choices: [
				[{
					name: 'Energy Cascade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Activating Gravitic Burst instantly reloads Caldarius\' TMP.'
				}, {
					name: 'Blind and Bloodied',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Enemies affected by Flashbang suffer bleed damage. +60 Damage over 2 seconds.'
				}],
				[{
					name: 'Exit Strategy',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Caldarius launches into the air after striking an enemy with Gravitic Burst.'
				}, {
					name: 'Zealous Frenzy',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Activating Gravitic Burst increases Energy Blade attack speed for a short time. +20% Attack Speed for 5 seconds.'
				}],	
				[{
					name: 'Afterburner',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/J-HTX_Assault_Frame.png/revision/latest?cb=20150624050115',
					description: 'Increases maximum sprint speed. +9% Sprint Speed.'
				}, {
					name: 'Overdrive',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/J-HTX_Assault_Frame.png/revision/latest?cb=20150624050115',
					description: 'Activating any skill increases movement speed for a short time. +30% Movement Speed for 2 seconds.'
				}],
				[{
					name: 'Flash Barrage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Flashbang now fires three grenades in rapid succession that each deal 67 damage.'
				}, {
					name: 'Cluster Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Flashbang fires three grenades simultaneously in a tight spiral pattern. +75% Damage, -66% Area of Effect Radius.'
				}, {
					name: 'FlashMIRV',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Flashbang spawns 3 child grenades on impact.'
				}],
				[{
					name: 'Gravitic Ascent',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Gravitic_Manipulators.png/revision/latest?cb=20150624050328',
					description: 'Increase the height of Gravitic Manipulators\' second jump.'
				}, {
					name: 'Energy Transfusion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/TMP_and_Energy_Blade.png/revision/latest?cb=20150624050037',
					description: 'A portion of the damage dealt by Caldarius\' Energy Blade is returned as health. +15% Life Steal.'
				}, {
					name: 'Improved Thrusters',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/47/Gravitic_Manipulators.png/revision/latest?cb=20150624050328',
					description: 'Increases the lateral thrust of Gravitic Manipulators\' second jump.'			
				}],	
				[{
					name: 'Kinetic Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Increases Gravitic Burst\'s push back effect.'
				}, {
					name: 'Gravitic Anomaly',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Gravitic Burst slows enemies on impact. +3 Seconds Slow Duration.'
				}, {
					name: 'Rapid Dominance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Reduces Flashbang\'s cooldown. -20% Cooldown Time.'
				}],
				[{
					name: 'Adaptive Harmonics',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/TMP_and_Energy_Blade.png/revision/latest?cb=20150624050037',
					description: 'Increases damage of Caldarius\' Energy Blade attacks. +18% Damage.'
				}, {
					name: 'Microfusion Cell',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/TMP_and_Energy_Blade.png/revision/latest?cb=20150624050037',
					description: 'Increases TMP\'s magazine size. +8 Clip Size.'
				}],	
				[{
					name: 'Gravitic Amplifiers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Increases Gravitic Burst\'s damage. +15% Damage.'
				}, {
					name: 'Gravitic Stabilizers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/de/Gravitic_Burst.png/revision/latest?cb=20150624050154',
					description: 'Increases Gravitic Burst\'s dash distance.'
				}],
				[{
					name: 'Phasebang',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Flashbang grenades no longer collide with allies.'
				}, {
					name: 'Rangefinder',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Increases Flashbang\'s maximum range. +60% Range.'
				}, {
					name: 'Brightblaster',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/86/Flashbang.png/revision/latest?cb=20150624050218',
					description: 'Increases the radius of Flashbang\'s area of effect. +33% Area of Effect Radius.'
				}],	
				[{
					name: 'Tuned Actuation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4a/Aerial_Assault.png/revision/latest?cb=20150624050302',
					description: 'Aerial Assault now launches instantly. Reduces Aerial Assault\'s cooldown. -20% Cooldown Time.'
				}, {
					name: 'Ground Zero',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4a/Aerial_Assault.png/revision/latest?cb=20150624050302',
					description: 'When Caldarius strikes the ground with Aerial Assault, nearby enemies are pushed back.'
				}, {
					name: 'Aerial Barrage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4a/Aerial_Assault.png/revision/latest?cb=20150624050302',
					description: 'Caldarius drops a fragmentation grenade that deals damage over time on takeoff. +81 Damage over 2 seconds.'			
				}]
			]
		},
		'Deande': {
			name: 'Deande',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Deande_-_Icon.png/revision/latest?cb=20160408095321',
			choices: [
				[{
					name: 'Double Trouble',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'When activating Holotwin, Deande dashes in the direction in which she is currently moving. Increases Holotwin\'s dash distance. +50% Dash Distance.'
				}, {
					name: 'Wonder Twins',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'A portion of the damage dealt by Deande\'s Holotwin clone is returned to her as health. +25% Life Steal.'
				}, {
					name: 'Ground Zero',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Burst Dash\'s explosion erupts in an area of effect, damaging foes all around Deande.'
				}],
				[{
					name: 'All Safeties Off',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Increases Holotwin decoy damage. +50% Damage.'
				}, {
					name: 'Refined Emitters',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Increases Holotwin decoy health. +30% Maximum Health.'
				}],	
				[{
					name: 'Fan Appreciation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Tessurim_War_Fans.png/revision/latest?cb=20160407220355',
					description: 'Increases thrown War Fans\' damage. +18% Damage.'
				}, {
					name: 'Uppercut',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Tessurim_War_Fans.png/revision/latest?cb=20160407220355',
					description: 'Adds an uppercut to the end of Deande\'s primary melee combo that knocks enemies into the air.'
				}, {
					name: 'Leechsteel',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Tessurim_War_Fans.png/revision/latest?cb=20160407220355',
					description: 'A portion of damage dealt by all War Fan attacks is returned to Deande as health. +10% Life Steal.'
				}],
				[{
					name: 'Calculate Risk',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Burst Dash draws extra power from Deande\'s shield reserves, granting bonus damage. Burst Dash now breaks Deande\'s shield on activation. +50% Current Shield as Damage.'
				}, {
					name: 'Drain Dash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Half of the damage dealt by Burst Dash is returned to Deande as health. +50% Life Steal.'
				}],
				[{
					name: 'Silent Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/30/The_Element_of_Surprise.png/revision/latest?cb=20160407220355',
					description: 'For 3 seconds after uncloaking, Deande\'s attacks slow enemies for a brief time. +3 Seconds Slow Duration.'
				}, {
					name: 'Beast of Momentum',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/30/The_Element_of_Surprise.png/revision/latest?cb=20160407220355',
					description: 'Kiling an enemy increases Deande\'s movement speed for a brief time. +10% Movement Speed for 5 Seconds.'
				}, {
					name: 'Roguelike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/30/The_Element_of_Surprise.png/revision/latest?cb=20160407220355',
					description: 'For 3 seconds after uncloaking, Deande\'s melee strikes to an opponent\'s back deal additional damage. +25% Damage.'			
				}],	
				[{
					name: 'Burst Brawler',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Increases Burst Dash damage. +15% Damage.'
				}, {
					name: 'Ire\'s Echo',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Increases the damage dealt by an exploding Holotwin clone. Enemies caught in the blast are slowed. +15% Damage, +3 Second Slow Duration.'
				}, {
					name: 'Escape Plan',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Activating Holotwin increases Deande\'s movement speed for a brief time. +30% Movement Speed for 5 Seconds.'
				}],
				[{
					name: 'Fan O\' War',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Tessurim_War_Fans.png/revision/latest?cb=20160407220355',
					description: 'Increases War Fans\' melee damage. +18% Damage.'
				}, {
					name: 'The Culling',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Tessurim_War_Fans.png/revision/latest?cb=20160407220355',
					description: 'Increases Deande\'s damage against weakened opponents. +23% Damage.'
				}],	
				[{
					name: 'Deadly Reach',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Increases Burst Dash\'s damage distance. +40% Damage Distance.'
				}, {
					name: 'Energized',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'Reduces Burst Dash\'s cooldown timer. -25% Cooldown Time.'
				}],
				[{
					name: 'Improved Holographics',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Reduces Holotwin\'s cooldown timer, allowing more frequent use. -25% Cooldown Time.'
				}, {
					name: 'Deft Hands',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Burst_Dash.png/revision/latest?cb=20160407220353',
					description: 'A portion of damage dealt by Burst Dash penetrates enemy shields. +50% Shield Penetration.'
				}, {
					name: 'Lingering Light',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Holotwin.png/revision/latest?cb=20160407220354',
					description: 'Increases the lifetime of Deande\'s Holotwin decoy. +7 Seconds Maximum Lifetime.'
				}],	
				[{
					name: 'Doppelgangup',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b8/Blink_Storm.png/revision/latest?cb=20160407220353',
					description: 'Upon activation of Blink Storm, Deande spawns a Holotwin decoy.'
				}, {
					name: 'Gathering Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b8/Blink_Storm.png/revision/latest?cb=20160407220353',
					description: 'Killing a minor enemy with Blink Storm refunds 5 seconds of the skill\'s cooldown. Killing a major enemy refunds 10 seconds of the cooldown. Up to -10 Seconds Cooldown Time.'
				}]
			]
		},
		'El Dragón': {
			name: 'El Dragón',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5e/El_Dragón_-_Icon.png/revision/latest?cb=20160408095321',
			choices: [
				[{
					name: 'The Stunner',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'Enemies hit by Clothesline are slowed. +30% Slow for 3 seconds.'
				}, {
					name: 'Untouchable',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'El Dragon suffers reduced damage while Clothesline is active. +30% Damage Reduction.'
				}, {
					name: 'The Comeback',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Enemies hit by Dragon Splash deal reduced damage for a short time. -30% Damage for 8 Seconds.'
				}],
				[{
					name: 'Splash Damage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Dragon Splash leaves behind an electrical field that deals damage over time to nearby enemies. +480 Damage over 6 Seconds.'
				}, {
					name: 'Momentum',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Each target hit with Dragon Splash increases movement speed and decreases the skill\'s cooldown. +10% Movement Speed, -10% Cooldown Time per Hit.'
				}],	
				[{
					name: 'Deafening Applause',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/69/M-RBX_Cybernetic_Arms.png/revision/latest?cb=20160407192724',
					description: 'El Dragón\'s Clap attack is accompanied by a powerful shockwave dealing area of effect damage. +100% Attack Range.'
				}, {
					name: 'Power Fists',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/69/M-RBX_Cybernetic_Arms.png/revision/latest?cb=20160407192724',
					description: 'Replaces El Dragón\'s primary melee combo finisher with a powerful, single-target punch.'
				}],
				[{
					name: 'Rope-a-Dope',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'While in a Clothesline sprint, hitting a wall or cancelling the dash turns El Dragón around, allowing for a second dash.'
				}, {
					name: 'Flailing Fists',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'Deactivating Clothesline mid-sprint stops the dash and executes a ground slam, knocking enemies into the air.'
				}],
				[{
					name: 'Heavyweight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d1/Undisputed_Champ.png/revision/latest?cb=20160407192725',
					description: 'Each Undisputed Champion stack also reduces damage taken by 3%.'
				}, {
					name: 'Uncanny',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d1/Undisputed_Champ.png/revision/latest?cb=20160407192725',
					description: 'Each Undisputed Champ stack also increases skill damage by 3%.'
				}, {
					name: 'Welterweight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d1/Undisputed_Champ.png/revision/latest?cb=20160407192725',
					description: 'Each Undisputed Champion stack also boosts El Dragón\'s movement speed by 1.5%.'			
				}],	
				[{
					name: 'Hang Time',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Activating Dragon Splash prompts El Dragón\'s shields to immediately begin recharging, as well as imparting health regen. +84 Health Regeneration over 4 Seconds.'
				}, {
					name: 'Unstoppable',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Increases El Dragon\'s melee attack speed for a short time after activating Dragon Splash. +20% Attack Speed.'
				}, {
					name: 'Nechbreaker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'Increases Clothesline\'s damage +15% Damage.'
				}],
				[{
					name: 'From the Top Rope',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Reduces Dragon Splash\'s cooldown, allowing more frequent use. -20% Cooldown Time.'
				}, {
					name: 'Big Splash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/03/Dragon_Splash.png/revision/latest?cb=20160407192723',
					description: 'Increases the size of Dragon Splash\'s area of effect. +50% Area of Effect Radius.'
				}],	
				[{
					name: 'Heart of the Champion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/69/M-RBX_Cybernetic_Arms.png/revision/latest?cb=20160407192724',
					description: 'Returns all health damage dealt by El Dragón\'s Dropkick attack to his health. +100% Life Steal.'
				}, {
					name: 'Unbelievable',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/69/M-RBX_Cybernetic_Arms.png/revision/latest?cb=20160407192724',
					description: 'Replaces El Dragon\'s Dropkick with a bicycle kick that launches forward and damages enemies.'
				}, {
					name: 'Attitude Adjustment',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/69/M-RBX_Cybernetic_Arms.png/revision/latest?cb=20160407192724',
					description: 'Enemies struck by Dropkick suffer increased damage for a short time. +16% Damage Amplification for 8 Seconds.'
				}],
				[{
					name: 'Cut the Line',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'Each target hit with Clothesline reduces the skill\'s cooldown. -10% Cooldown per Hit.'
				}, {
					name: 'Lifeline',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8f/Clothesline.png/revision/latest?cb=20160407192722',
					description: 'Health Damage dealt by Clothesline is returned to El Dragón as health. +100% Life Steal.'
				}],	
				[{
					name: 'Title Fight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3a/En_Fuego.png/revision/latest?cb=20160407192724',
					description: 'Activating En Fuego creates a ring of fire, dealing 133 damage to enemies as they enter or exit.'
				}, {
					name: 'Unquenchable',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3a/En_Fuego.png/revision/latest?cb=20160407192724',
					description: 'While En Fuego is active, Clothesline leaves behind a trail of electricity that damages oes. Up to +720 Damage over 6 Seconds.'
				}, {
					name: 'Dragonfire',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3a/En_Fuego.png/revision/latest?cb=20160407192724',
					description: 'While En Fuego is active, El Dragón\'s secondary melee attack fires a massive fireball, dealing 56 damage.'
				}]
			]
		},
		'Galilea': {
			name: 'Galilea',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bd/Galilea_-_Icon.png/revision/latest?cb=20160408095321',
			choices: [
				[{
					name: 'Herald\'s Return',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'When Shield Throw hits a target, Galilea\'s Greatshield returns to her hand, and Shield Throw\'s cooldown is slightly reduced. -5 Seconds Cooldown Time.'
				}, {
					name: 'Vortex',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'When Desecrate is activated, enemies are pulled towards Galilea.'
				}, {
					name: 'Calamity',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Enemies standing within a Desecrate field are wounded, preventing healing for 5 seconds after the effect is applied. +5 Seconds Would Duration.'
				}],
				[{
					name: 'Skilled Throw',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'Shield Throw bounces to several nearby targets, dealing reduced damage with each consecutive hit.'
				}, {
					name: 'Mark of the Feeble',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'Enemies hit by Shield Throw are wounded, preventing healing for 5 seconds after the effect is applied. +5 Seconds Wound Duration.'
				}],	
				[{
					name: 'Sentinel Stance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Sentinel%E2%80%99s_Greatshield.png/revision/latest?cb=20160407200614',
					description: 'Actively blocking incoming damage causes Galilea\'s Corruption to increase.'
				}, {
					name: 'Gashing Bash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Sentinel%E2%80%99s_Greatshield.png/revision/latest?cb=20160407200614',
					description: 'Galilea\'s offhand shield bash attack causes eneies to bleed on hit. +120 Damage over 3 Seconds.'
				}, {
					name: 'It\'s Dangerous to go Alone',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cd/Wraith%E2%80%99s_Greatsword.png/revision/latest?cb=20160407200615',
					description: 'While Galilea\'s health is full, swinging her Greatsword unleashes a ranged blast of energy. +67 Damage.'
				}],
				[{
					name: 'Chaotic Infusion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Allies within Desecrate fields are healed over time. +30 healing per second.'
				}, {
					name: 'Bleak Quiet',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Desecrate fields silence enemies inside the field.'
				}, {
					name: 'Forsaken Grounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Desecrate deals damage to enemies inside its area of effect. +371 Damage over 8 seconds.'
				}],
				[{
					name: 'Last Light',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Corruption.png/revision/latest?cb=20160407200613',
					description: 'Galilea regenerates health while Corruption is active. +4 Health Regeneration per Second.'
				}, {
					name: 'Antihero',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Corruption.png/revision/latest?cb=20160407200613',
					description: 'Increases Galilea\'s attack speed as her Corruption grows. Up to +35% Attack Speed.'
				}, {
					name: 'The Pact',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Corruption.png/revision/latest?cb=20160407200613',
					description: 'Galilea\'s Corruption increases at a faster rate. +25% Faster Corruption.'			
				}],	
				[{
					name: 'Dark Age',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Increases Desecrate\'s duration. +3 Seconds Duration.'
				}, {
					name: 'Forsaking Others',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'Recovering Galilea\'s Greatshield after throwing it increases her health regeneration. +105 Health Regeneration over 5 Seconds.'
				}],
				[{
					name: 'Mirror Knight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Sentinel%E2%80%99s_Greatshield.png/revision/latest?cb=20160407200614',
					description: 'Galilea\'s Greatshield occasionally reflects projectiles. +35% Reflect Chance.'
				}, {
					name: 'Duelist',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cd/Wraith%E2%80%99s_Greatsword.png/revision/latest?cb=20160407200615',
					description: 'Galilea\'s damage with her Greatsword is increased when she is without her Greatshield. +18% Damage.'
				}],	
				[{
					name: 'Inescapable Fate',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Desecrate fields slow enemies. -30% Movement Speed.'
				}, {
					name: 'Blight Town',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Enlarges Desecrate\'s area of effect. +50% Area of Effect Radius.'
				}, {
					name: 'The Black Wind Howls',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d4/Desecrate.png/revision/latest?cb=20160407200614',
					description: 'Desecrate fields hasten Galilea. +30% Movement Speed.'
				}],
				[{
					name: 'Defender\'s Dare',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'Increases the damage of Shield Throw. +15% Damage.'
				}, {
					name: 'Tideturner',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Shield_Throw.png/revision/latest?cb=20160407200615',
					description: 'Hitting a target with Shield Throw briefly increases Galilea\'s movement speed. +30% Movement Speed.'
				}],	
				[{
					name: 'Deeper than Doubt',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/20/Abyssal_Form.png/revision/latest?cb=20160407200613',
					description: 'Increases Abyssal Form\'s area of effect. +33% Area of Effect Radius.'
				}, {
					name: 'Pitch Black',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/20/Abyssal_Form.png/revision/latest?cb=20160407200613',
					description: 'Galilea becomes fully Corrupted during Abyssal Form.'
				}]
			]
		},
		'Ghalt': {
			name: 'Ghalt',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/8d/Ghalt_-_Icon.png/revision/latest?cb=20160408095322',
			choices: [
				[{
					name: 'The Big Draw',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'Increases the effective hitbox of The Hook, making it easier to land hits on targets.'
				}, {
					name: 'Stealth Scrap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Cloaks deplayed Scraptraps making them virtually invisible at range.'
				}],
				[{
					name: 'Shock Trap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Deployed Scraptraps deal damage over time to nearby enemies. +60 Damage Per Second.'
				}, {
					name: 'A Little Somethin\' Extra',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'For each Scraptrap active on the battlefield, Scraptraps deal additional damage. +10% Damage per Active Scraptrap.'
				}, {
					name: 'The Scrappening',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Scraptraps launch an additional 3 shrapnel bombs when triggered. +3 Bombs.'
				}],	
				[{
					name: 'Slug Rounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/UPR_M8-R_Revolver_Shotgun.png/revision/latest?cb=20160407194435',
					description: 'Equips the Revolver Shotgun with single-projectile slug rounds, increasing effective range. +100% Range.'
				}, {
					name: 'Pellet Party',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/UPR_M8-R_Revolver_Shotgun.png/revision/latest?cb=20160407194435',
					description: 'Increases the amount of pellets in a Revolver Shotgun shell, broadening the spread of the blast. +30% Pellets.'
				}],
				[{
					name: 'Hookshot',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'The Hook damages enemies on impact. +133 Damage.'
				}, {
					name: 'The Hook(s)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'The Hook fires 3 hooks in a cone directly ahead. +2 Hooks.'
				}, {
					name: 'Efficient Extraction',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'Increases The Hook\'s travel speed and effective range. +35% Speed and Range.'
				}],
				[{
					name: 'Hobbling Shot',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/19/Tactical_Shells.png/revision/latest?cb=20160407194433',
					description: 'Tactical Shells slow enemies on impact for a brief time. +2 Seconds Slow Duration.'
				}, {
					name: 'Boomstickier',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/19/Tactical_Shells.png/revision/latest?cb=20160407194433',
					description: 'Increases Tactical Shells bonus damage. +15% Damage.'
				}],	
				[{
					name: 'Drain Chain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'While an enemy is hit with The Hook, their shields and health are drained. Up to +360 Damage Over 3 Seconds.'
				}, {
					name: 'Duct Tape and Bailing Wire',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Doubles Scraptrap health. +100% Health.'
				}],
				[{
					name: 'Speedloader',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/UPR_M8-R_Revolver_Shotgun.png/revision/latest?cb=20160407194435',
					description: 'Increases Revolver Shotgun reload speed. +25% Reload Speed.'
				}, {
					name: 'ScrapStack',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Increases the number of Scraptraps that can be active on the battlefield at once. +2 Traps.'
				}, {
					name: 'Both Barrels Blazing',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/UPR_M8-R_Revolver_Shotgun.png/revision/latest?cb=20160407194435',
					description: 'Firing the Revolver Shotgun now discharges both barrels simultaneously.'
				}],	
				[{
					name: 'Short Fuse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Reduces Scraptrap trigger delay. -1 Second Trigger Time.'
				}, {
					name: 'Quick and Dirty',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Reduces Scraptrap cooldown, allowing more frequent use. -25% Cooldown Time.'
				}, {
					name: 'Big Trap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/59/Scraptrap.png/revision/latest?cb=20160407194433',
					description: 'Increases the radius of Scraptrap\'s stun effects and the shrapnel charge blast radius. +40% Area of Effect.'
				}],
				[{
					name: 'Here Come the Hook',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'Reduces The Hook\'s cooldown time, allowing more frequent use. -25% Cooldown Time.'
				}, {
					name: 'Easy Target',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'Hooked enemies suffer amplified damage. +15% Damage for 5 Seconds.'
				}],	
				[{
					name: 'Gun \'n Run',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/50/Dual_Wield.png/revision/latest?cb=20160407194433',
					description: 'Every hit on a major enemy with Dual Wield shotguns grants bonus movement speed, to a maximum of 5 stacks. +5% Movement Speed Per Hit.'
				}, {
					name: 'Can\'t Touch This',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/50/Dual_Wield.png/revision/latest?cb=20160407194433',
					description: 'While Duel Wield is active, you are immune to all Crowd Control effects.'
				}, {
					name: 'Incendiary Shells',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/50/Dual_Wield.png/revision/latest?cb=20160407194433',
					description: 'Loads the Revolver Shotgun with incendiary shells during Dual Wield, dealing damage over time to struck enemies. +36 Damage over 1.5 Seconds.'
				}]
			]
		},
		'ISIC': {
			name: 'ISIC',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/57/ISIC_-_Icon.png/revision/latest?cb=20160408095322',
			choices: [
				[{
					name: 'Watchful Wards! :)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'While Rotating Wards is active, each ward reduces ISIC\'s shield charge delay. Up to -2.5s Shield Recharge Delay.'
				}, {
					name: 'Whoops-A-Daisy! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'Rotating Wards drop in place when activated, rather than following ISIC around.'
				}, {
					name: 'Crushin\' Those Shields! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cc/Plasma_Dash.png/revision/latest?cb=20160407192101',
					description: 'A portion of Plasma Dash damage penetrates enemy shields. +60% Shield Penetration.'
				}],
				[{
					name: 'You Dropped These! ;)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'Rotating Wards reflect enemy fire.'
				}, {
					name: 'This Might Sting! :O',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'When Overcharged, Rotating Wards condense into plasma charges that damange enemies on contact instead of blocking inbound damage. +134 Damage per Charge.'
				}],	
				[{
					name: 'Not Dyin\' Today!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/40/Energy_Aegis.png/revision/latest?cb=20160407192058',
					description: 'Increases maximum shield strength. +240 Maximum Shield Strength.'
				}, {
					name: 'Shield Down, Charge Up! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/40/Energy_Aegis.png/revision/latest?cb=20160407192058',
					description: 'When Energy Aegis breaks, ISIC is instantly Overcharged for 2 seconds, empowering his next skill or weapon use.'
				}, {
					name: 'Charging on the Go! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Charge_Cannon.png/revision/latest?cb=20160407192058',
					description: 'Using Charge Cannon no longer slows ISIC\'s movement speed.'
				}],
				[{
					name: 'Hold it Right There! }:O',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/89/The_Hook.png/revision/latest?cb=20160407194434',
					description: 'Enemies hit during Plasma Dash are stunned. +2 Seconds Stun Duration.'
				}, {
					name: 'Line Up, Fellas! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cc/Plasma_Dash.png/revision/latest?cb=20160407192101',
					description: 'Each enemy hit by Plasma Dash increases the damage dealt to subsequent enemies. Additional damage is reset with each use of the skill. +5% Damage Per Enemy Hit.'
				}],
				[{
					name: 'I\'m Concentrating! :|',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Overcharge.png/revision/latest?cb=20160407192100',
					description: 'Shields regenerate faster while ISIC\'s Charge Cannon is Overcharged. +105 Shield Recharge Per Second.'
				}, {
					name: 'Stopping Power ;)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Overcharge.png/revision/latest?cb=20160407192100',
					description: 'Enemies hit directly by Overcharged shots are slowed. +2 Seconds Slow Duration.'
				}, {
					name: 'In a Big Rush! O_O',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Overcharge.png/revision/latest?cb=20160407192100',
					description: 'Increases movement speed while Overcharged. +50% Movement Speed.'
				}],	
				[{
					name: 'Burlier Wards! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'Increases Rotating Ward\'s block strength. +225 Ward Strength.'
				}, {
					name: 'Let\'s Hug it Out! <3',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cc/Plasma_Dash.png/revision/latest?cb=20160407192101',
					description: 'Reduces Plasma Dash\'s cooldown time. -20% Cooldown Time.'
				}],
				[{
					name: 'Bring it On! :)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/40/Energy_Aegis.png/revision/latest?cb=20160407192058',
					description: 'Increases the amount of damage ISIC\'s Energy Aegis can block. +100% Damage Blocking.'
				}, {
					name: 'I\'m Helping! O_o',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Charge_Cannon.png/revision/latest?cb=20160407192058',
					description: 'Increases Charge Cannon\'s damage. +18% Weapon Damage.'
				}, {
					name: 'Quick Charge! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e6/Charge_Cannon.png/revision/latest?cb=20160407192058',
					description: 'Decreases the time required to charge up ISIC\'s Charge Cannon. -25% Weapon Charge Time.'
				}],	
				[{
					name: 'Hard-Workin\' Wards! :)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'Increases the maximum lifetime of Rotating Wards. +6 Seconds Duration.'
				}, {
					name: 'Waste Not, Want Not! :)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f3/Rotating_Wards.png/revision/latest?cb=20160407192101',
					description: 'When Rotating Wards expires, the skill\'s cooldown is reduced slightly for each ward still active. Up to -50% Cooldown Time.'
				}],
				[{
					name: 'Can\'t Run from Me! O.O',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cc/Plasma_Dash.png/revision/latest?cb=20160407192101',
					description: 'Increases Plasma Dash\'s speed and range. +50% Speed and Maximum Range.'
				}, {
					name: 'Dodge This! O.O',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/cc/Plasma_Dash.png/revision/latest?cb=20160407192101',
					description: 'Increases the size of the area damaged by Plasma Dash. +50% Area of Effect Radius.'
				}],	
				[{
					name: 'Shields Up! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/Omega_Strike.png/revision/latest?cb=20160407192059',
					description: 'Activating Omega Strike deploys Energy Aegis to block inbound damage from the front. Should Energy Aegis go down, it will redeploy after 6 seconds. +2000 Damage Blocking.'
				}, {
					name: 'Slow Down, Fella! :)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/Omega_Strike.png/revision/latest?cb=20160407192059',
					description: 'Enemies damaged by Omega Strike\'s rapid-fire guns are slowed. +3 Seconds Slow Duration.'
				}, {
					name: 'It\'s Raining Death! :D',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d0/Omega_Strike.png/revision/latest?cb=20160407192059',
					description: 'While Omega Strike is active, hitting an enemy directly with a Cannon Shot launches a barrage of missiles. +2 Missiles, 67 Damage per Missile.'
				}]
			]
		},
		'Kelvin': {
			name: 'Kelvin',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/57/Kelvin_-_Icon.png/revision/latest?cb=20160408095323',
			choices: [
				[{
					name: 'The Big Chill',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Ice_Form.png/revision/latest?cb=20160407185755',
					description: 'Increases Kelvin\'s health regeneration. +7 Health Regeneration per Second.'
				}, {
					name: 'Density',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Ice_Form.png/revision/latest?cb=20160407185755',
					description: 'Increases Kelvin\'s maximum health. +360 Max Health.'
				}, {
					name: 'Coldclock',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5c/Ice_Fists.png/revision/latest?cb=20160407185755',
					description: 'Every fourth melee hit applies a brief slow to nearby enemies. +1 Second Slow Duration.'			
				}],	
				[{
					name: 'Quick Bite',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Damaging an enemy with Chomp increases Kelvin\'s movement speed for a short time. +30% Movement Speed for 2 Seconds.'
				}, {
					name: 'Diffusion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Chomp deals bonus damage equal to 3% of Kelvin\'s current health.'
				}, {
					name: 'Strong Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'Increases the bonus shield strength imparted by Permafrost when Kelvin activates Sublimate. +50% Permafrost Shield Strength.'			
				}],
				[{
					name: 'Swelling Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'The longer Kelvin remains in his Sublimate form, the more his movement speed increases. Up to +60% Movement Speed.'
				}, {
					name: 'Icemaker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'Replaces Sublimate\'s stun effect with an icy trail that slows enemies. +3 Seconds Slow Duration.'
				}],
				[{
					name: 'Mastication Restoration',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'A portion of Chomp damage is returned to Kelvin as health. +23% Life Steal.'
				}, {
					name: 'Shield Snacker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: '30% of the damage dealt by Chomp is returned to Kelvin as shield strength.'
				}, {
					name: 'Slow Food',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Chomp deals increased damage against slowed enemies. +25% Damage.'
				}],
				[{
					name: 'Ice VI',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Permafrost.png/revision/latest?cb=20160407185756',
					description: 'Increases the bonus shields imparted by Permafrost. +20% Shield Strength Gained.'
				}, {
					name: 'Blue Ice',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Permafrost.png/revision/latest?cb=20160407185756',
					description: 'Kelvin takes reduced damage when Permafrost is active. +30% Damage Reduction.'
				}],
				[{
					name: 'Windchill',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'While Sublimated, damaging major enemies increases the skill\'s duration. Up to +3 Seconds Duration.'
				}, {
					name: 'Consume',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Killing an enemy with Chomp drastically decreases Sublimate\'s cooldown time. -5 Seconds Cooldown Time.'
				}],
				[{
					name: 'Groupthink',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Ice_Form.png/revision/latest?cb=20160407185755',
					description: 'Kelvin\'s health regeneration rate increases when he\'s near allied Battleborn. +7 Health Regeneration per Second.'
				}, {
					name: 'Iceheart',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Ice_Form.png/revision/latest?cb=20160407185755',
					description: 'Killing or assisting against an enemy Battleborn increases Kelvin\'s health regeneration rate. +150 Health Regeneration over 3 Seconds.'
				}, {
					name: 'Icy Force',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5c/Ice_Fists.png/revision/latest?cb=20160407185755',
					description: 'Increases the push back effect of pounding the ground.'
				}],
				[{
					name: 'Hibernation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'Kelvin regenerates health faster while Sublimated. +21 Health Regeneration per Second.'
				}, {
					name: 'Windy Season',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/23/Sublimate.png/revision/latest?cb=20160407185756',
					description: 'Decreases Sublimate\'s cooldown, allowing more frequent use. -20% Cooldown Time.'
				}],
				[{
					name: 'Overeater',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Reduces the cooldown of Chomp, allowing more frequent use. -20% Cooldown Time.'
				}, {
					name: 'Sawtooth',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/45/Chomp.png/revision/latest?cb=20160407185754',
					description: 'Increases Chomp\'s maximum health bonus damage. +15% Damage.'
				}],
				[{
					name: 'Walled In',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/76/Ice_Wall.png/revision/latest?cb=20160407185755',
					description: 'Reduces Ice Wall\'s cooldown, allowing more frequent use. -20% Cooldown Time.'
				}, {
					name: 'Great Wall',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/76/Ice_Wall.png/revision/latest?cb=20160407185755',
					description: 'Increases Ice Wall\'s total length.'
				}, {
					name: 'Absolute Zero',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/76/Ice_Wall.png/revision/latest?cb=20160407185755',
					description: 'Enemies in close range of an Ice Wall are slowed. +3 Seconds Slow Duration.'
				}],
			]
		},
		'Kleese': {
			name: 'Kleese',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3f/Kleese_-_Icon.png/revision/latest?cb=20160408095323',
			choices: [
				[{
					name: 'Shocking Twist',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Mortars will heal friendly target\'s shields. +22 Shield Heal.'
				}, {
					name: 'Shocking Pulse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Energy Rift will shock nearby enemies dealing bonus shield damage. +50% Bonus Damage to Shields.'
				}],	
				[{
					name: 'Shiftless Shells',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Energy Mortars will slow enemy targets they hit. +3 Seconds Slow Duration.'
				}, {
					name: 'Diffusion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Firing Energy Mortars will deplete Kleese\'s shield and add it to their damage. +100% Current Shield as Damage.'
				}],
				[{
					name: 'Chair Slam',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/64/Wrist_Cannon_and_Shock_Taser.png/revision/latest?cb=20160407191300',
					description: 'Using Kleese\'s Shock Taser in the air will cause Kleese\'s Battle Chair to slam into the ground, depleting his chair energy and dealing damage to all enemies around him. +160 Damage.'
				}, {
					name: 'Quantum Precision',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/64/Wrist_Cannon_and_Shock_Taser.png/revision/latest?cb=20160407191300',
					description: 'Kleese\'s Wrist Cannon now charges to fire a focused laser.'
				}, {
					name: 'Don\'t Tase Me Bro',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/64/Wrist_Cannon_and_Shock_Taser.png/revision/latest?cb=20160407191300',
					description: 'Shock Taser now arcs to additional targets. +1 Additional Target.'
				}],
				[{
					name: 'Rift Network',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Energy Rifts will now link to each other when near each other. Their output will be increased times the number of rifts in the network.'
				}, {
					name: 'Unstable Rifts',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Using Kleese\'s Energy Mortars or Wrist Cannon attacks on an Energy Rift will now feed energy into the rift causing it to become unstable. Unstable rifts explode after a short time damaging nearby enemies. +133 Damage.'
				}],
				[{
					name: 'Don\'t Call it a Heal Chair',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/32/Tactical_Battle_Chair.png/revision/latest?cb=20160407191259',
					description: 'Kleese\'s Tactical Battle Chair can heal nearby players every second. +120 Health per Second.'
				}, {
					name: 'Extended Battery Life',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/32/Tactical_Battle_Chair.png/revision/latest?cb=20160407191259',
					description: 'Increases Kleese\'s Tactical Battle Chair energy. +10 Chair Energy.'
				}, {
					name: 'Get Ready for a Suprise',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/32/Tactical_Battle_Chair.png/revision/latest?cb=20160407191259',
					description: 'Whenever Kleese dies, his Tactical Battle Chair explodes. +233 Damage.'
				}],
				[{
					name: 'Bulk Savings',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Kleese can have additional Energy Rifts alive in the world at the same time. +1 Rift.'
				}, {
					name: 'Rift Farm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Decreases Energy Rift\'s cooldown. -33% Cooldown Time.'
				}, {
					name: 'Expanded Mortar Capacity',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Kleese can now fire additional Energy Mortars. +4 Mortars.'
				}],
				[{
					name: 'Geezer Pleaser',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Killing an enemy with Energy Mortars instantly recharges Kleese\'s shield.'
				}, {
					name: 'Bouncing Balls of Death',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Kleese\'s Energy Mortars will now bounce serveral times before exploding.'
				}, {
					name: 'Tampered Mortars',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9e/Energy_Mortar.png/revision/latest?cb=20160407191258',
					description: 'Energy Mortars now all fire at the same time, blanketing an area.'
				}],
				[{
					name: 'Brains Before Brawn',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/32/Tactical_Battle_Chair.png/revision/latest?cb=20160407191259',
					description: 'Kleese\'s maximum shield strength is increased. +150 Maximum Shield Strength.'
				}, {
					name: 'Brawn Before Brains',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/64/Wrist_Cannon_and_Shock_Taser.png/revision/latest?cb=20160407191300',
					description: 'Kleese\'s Shock Taser deals increased damage. +25% Damage.'
				}],
				[{
					name: 'Healthy Rift',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Increases the max health of each Energy Rift. +500 Maximum Health.'
				}, {
					name: 'Quick Pulse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e3/Energy_Rift.png/revision/latest?cb=20160407191259',
					description: 'Increases the pulse speed of Energy Rift. -33% Pulse Time.'
				}],
				[{
					name: 'Sharing is Caring',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9d/Black_Hole.png/revision/latest?cb=20160407191258',
					description: 'Black Hole gives every friendly team member in range an overshield when it implodes. +225 Overshield.'
				}, {
					name: 'Insta-Hole',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9d/Black_Hole.png/revision/latest?cb=20160407191258',
					description: 'Black Hole\'s time to pull enemies is greatly reduced. -40% Pull Time.'
				}, {
					name: 'Square Root of Pain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9d/Black_Hole.png/revision/latest?cb=20160407191258',
					description: 'Black Hole causes all friendly Energy Rifts in range to become an Unstable Rift and explode. +133 Damage.'
				}],
			]
		},
		'Marquis': {
			name: 'Marquis',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/21/Marquis_-_Icon.png/revision/latest?cb=20160408095323',
			choices: [
				[{
					name: 'The Great(er) Hoodini',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Increases Predatory Strike damage. +15% Damage.'
				}, {
					name: 'Strigiform Swiftness',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Deployed Predatory Strike owls acquire and attack nearby targets faster. -50% Activation Delay.'
				}, {
					name: 'Waste Makes Haste',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'In addition to slowing enemies, Temporal Distortion now hastens allies. +30% Movement Speed for 4 seconds.'			
				}],	
				[{
					name: 'Phaseflyer',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Predatory Strike owls no longer collide with the world, guaranteeing a hit on target when activated.'
				}, {
					name: 'Eyes Everywhere',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Predatory Strike owls automatically reveal nearby targets.'
				}, {
					name: 'Hoodunnit',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Predatory Strike owls on the battlefield are cloaked.'			
				}],
				[{
					name: 'Occular Enhancements',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/56/Bindlebane.png/revision/latest?cb=20151113183816',
					description: 'Fits Bindlebane with a variable-zoom scope. +50% Zoom Range.'
				}, {
					name: 'Bullet Banker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/56/Bindlebane.png/revision/latest?cb=20151113183816',
					description: 'Increases Bindlebane\'s magazine size. +2 clip size.'
				}, {
					name: 'Executive Barrel Porting',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/56/Bindlebane.png/revision/latest?cb=20151113183816',
					description: 'Reduces Bindlebane recoil. -60% Recoil.'			
				}],
				[{
					name: 'Time Killer',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'All enemies inside a Temporal Distortion bubble take damage over time. +41 Damage per Second.'
				}, {
					name: 'Big Time',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'Enlarges Temporal Distortion\'s area of effect. +25% Area of Effect Radius.'
				}],
				[{
					name: 'Efficiency Expert',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/29/EinZweiDie.png/revision/latest?cb=20151113184316',
					description: 'Ein, Zwei, Die bonus damage is triggered on the second consecutive hit of a marked target, rather than the third.'
				}, {
					name: 'Executive Access',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/29/EinZweiDie.png/revision/latest?cb=20151113184316',
					description: 'Eins, Zwei, Die\'s bonus damage penetrates shields. +100% Shield Penetration.'
				}, {
					name: 'Ein, Zwei, Cry',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/29/EinZweiDie.png/revision/latest?cb=20151113184316',
					description: 'Increases Ein, Zwei, Die\'s bonus damage. +25% Bonus Damage.'			
				}],
				[{
					name: 'Long-Haul Hoodini',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Increases Predatory Strike casting range. +30% Cast Distance.'
				}, {
					name: 'Parliamentary, My Dear!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Increases the maximum number of Predatory Strike owls that can be on the battlefield at once. +2 Active Owls.'
				}, {
					name: 'Distant Time',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'Increases Temporal Distortion casting range. +30% Cast Distance.'			
				}],
				[{
					name: 'Autoloader',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/56/Bindlebane.png/revision/latest?cb=20151113183816',
					description: 'Increases Bindlebane\'s reload and attack speed. +25% Reload and Attack Speed.'
				}, {
					name: 'Bang for the Buck',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/56/Bindlebane.png/revision/latest?cb=20151113183816',
					description: 'Increases Bindlebane\'s base damage. +18% Damage.'
				}],
				[{
					name: 'Windfall',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Upon detonation, Predatory Strike owls leave behind areas of effect that deal damage over time. +720 Damage over 6 Seconds.'
				}, {
					name: 'Hoot of the Vigilant',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/33/PredatoryStrike.png/revision/latest?cb=20151113184259',
					description: 'Predatory Strike owls behave like sentries, and can fire on nearby enemies twice before detonation.'
				}],
				[{
					name: 'Time to Spare',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'Increases the duration of Temporal Distortion\'s warp bubble. +2 Seconds Duration.'
				}, {
					name: 'Cease and Desist',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/TemporalDistortion.png/revision/latest?cb=20151113184336',
					description: 'Intensifies the slowing effect of Temporal Distortion, further reducing enemy movement speed. +30% Slow.'
				}],
				[{
					name: 'Bindleblast(s)',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a3/Bindleblast.png/revision/latest?cb=20151113184354',
					description: 'After charging, Bindleblast fires two shots with slightly reduced damage. +1 Shot, -33% Damage per Shot.'
				}, {
					name: 'wallhax.exe',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a3/Bindleblast.png/revision/latest?cb=20151113184354',
					description: 'Bindleblast\'s shots can now pierce world terrain to strike targets. Enemy Battleborn are revealed in the scope.'
				}],
			]
		},
		'Mellka': {
			name: 'Mellka',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fc/Mellka_-_Icon.png/revision/latest?cb=20160408095324',
			choices: [
				[{
					name: 'Hobbling Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Enemies hit by Claw Lunge are slowed for a brief time. +3 Seconds Slow Duration.'
				}, {
					name: 'Hobbling Spike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Enemies hit by Spike are slowed for a brief time. +3 Seconds Slow Duration.'
				}],	
				[{
					name: 'Parting Gift',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Spike leaves behind an area of effect that covers nearby enemies with venom and deals damage over time. +20 Damage per Second over 5 Seconds.'
				}, {
					name: 'Spike Vault',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Activating Spike now propels Mellka forward.'
				}, {
					name: 'Lift Off!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Increases Mellka\'s Spike height.'
				}],
				[{
					name: 'Air Stall',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a0/Eldrid_operatives_garb_icon.png/revision/latest?cb=20160302224939',
					description: 'Mellka\'s quick melee deals increased damage and propels her backwards. Can be used once every 3 seconds. +50% Damage.'
				}, {
					name: 'Frag Canister',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/85/Venom_icon.png/revision/latest?cb=20160302225147',
					description: 'Reloading Custom Machine Pistol fires a Venom Canister that fragments into smaller projectiles shortly after launch.'
				}],
				[{
					name: 'Blade Ejection',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Claw Lunge launches a blade at the end of the lunge, dealing additional damage. +50 Damage.'
				}, {
					name: 'Action Reload',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Using Claw Lunge refills Mellka\'s Custom Machine Pistol.'
				}, {
					name: 'Tactical Withdrawal',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'If Mellka hits a target with Claw Lunge, she will bounce backwards.'
				}],
				[{
					name: 'Adrenaline Rush',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fb/Custom_machine_pistol_icon.png/revision/latest?cb=20160302224246',
					description: 'Meleeing enemies afflicted with venom increases Mellka\'s health regeneration rate for a short time. +7 Health Regeneration Rate for 4 Seconds.'
				}, {
					name: 'Venom Contagion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fb/Custom_machine_pistol_icon.png/revision/latest?cb=20160302224246',
					description: 'Enemies killed while affected by venom will explode dealing damage and spreading venom to nearby targets.'
				}, {
					name: 'Eldrid Rhythm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fb/Custom_machine_pistol_icon.png/revision/latest?cb=20160302224246',
					description: 'Killing an enemy afflicted with venom grants a stack of increased health (to a maximum of 10 stacks). Health stacks are reset upon death. +30 Maximum Health per Stack.'
				}],
				[{
					name: 'Spike Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Increases Spike\'s area of effect radius. This also increases Parting Gift\'s area of effect radius. +50% Area of Effect Radius.'
				}, {
					name: 'Desperate Lunge',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Decreases Claw Lunge\'s cooldown on enemy kill. Up to -50% Cooldown Time.'
				}],
				[{
					name: 'Power Spike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'Mellka switches to a more deadly form of venom that increases her Spike\'s damage. This also increases Parting Gift\'s daamge. +15% Damage.'
				}, {
					name: 'Second Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/eb/Spike_icon.png/revision/latest?cb=20160302224606',
					description: 'The cooldown for Spike is lowered based on Mellka\'s remaining health. Up to -40% Cooldown Time.'
				}],
				[{
					name: 'Refined Canisters',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/85/Venom_icon.png/revision/latest?cb=20160302225147',
					description: 'Increases Machine Pistol\'s magazine size. Mellka\'s bullets also apply venom to targets. +10 Clip Size.'
				}, {
					name: 'Potent Toxins',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/fb/Custom_machine_pistol_icon.png/revision/latest?cb=20160302224246',
					description: 'Increases the duration of venom. +4 Seconds Duration.'
				}, {
					name: 'Thrill of the Hunt',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a0/Eldrid_operatives_garb_icon.png/revision/latest?cb=20160302224939',
					description: 'When a new target is afflicted with venom, Mellka\'s movement speed is increased for a short time. +30% Movement Speed for 5 Seconds.'
				}],
				[{
					name: 'Feral Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Activating Claw Lunge increases Mellka\'s melee attack speed for a short time. +20% Melee Attack Speed for 8 Seconds.'
				}, {
					name: 'Finishing Blow',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Claw_lunge_icon.png/revision/latest?cb=20160302224450',
					description: 'Claw Lunge deals increased damage. +15% Damage.'
				}],
				[{
					name: 'Blade Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c8/Blade_launcher_icon.png/revision/latest?cb=20160302224741',
					description: 'Blade Launcher\'s blades bounce off of the environment and home in on envenomated enemies instead of exploding on impact.'
				}, {
					name: 'Pool Shot',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c8/Blade_launcher_icon.png/revision/latest?cb=20160302224741',
					description: 'Each shot from Blade Launcher explodes on contact and leaves a Parting Gift damage pool if it hits the ground.'
				}, {
					name: 'All In',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c8/Blade_launcher_icon.png/revision/latest?cb=20160302224741',
					description: 'Blade Launcher fires a single, powerful shot, dealing heavy damage to one target. +500 Damage.'
				}],
			]
		},
		'Miko': {
			name: 'Miko',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Miko_-_Icon.png/revision/latest?cb=20160408095324',
			choices: [
				[{
					name: 'First Responder',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'While Biosynthesis is active, healing an ally with the Healing Beam increases Miko\'s movement speed. +30% Movement Speed.'
				}, {
					name: 'Breathe Deep',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Intensifies the slowing effect of Cloud of Spores. +100% Slow.'
				}],	
				[{
					name: 'Regenerative Aura',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'Biosynthesis\' healing-over-time effects are extended to nearby allies.'
				}, {
					name: 'Spike Vault',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'While Biosynthesis is active, healing an ally with Miko\'s heal beam also heals Miko.'
				}],
				[{
					name: 'Evolutionary Emergence',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/79/A._Mikollopria.png/revision/latest?cb=20150624210353',
					description: 'Reduces cooldown time across all skills. -15% Cooldown Time.'
				}, {
					name: 'Plentiful Healing',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/79/A._Mikollopria.png/revision/latest?cb=20150624210353',
					description: 'Increases healing granted to allies by Miko\'s Healing Beam. +13 Health per Second.'
				}, {
					name: 'Swift Draw',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/ff/Combat_Botany.png/revision/latest?cb=20150624210442',
					description: 'Increases the reload speed of Miko\'s Kunai. +50% Reload Speed.'
				}],
				[{
					name: 'Trail of Spores',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Cloud of Spores drops spores along the way to a target, covering a larger area.'
				}, {
					name: 'Sticky Spores',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Cloud of Spores sticks on impact, bursting when enemies enter its blast radius or after 60 seconds.'
				}, {
					name: 'Sporeshock',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'If Cloud of Spores hits an enemy directly, that enemy is stunned rather than slowing all enemies in the blast radius. +2 Seconds Stun Duration.'
				}],
				[{
					name: 'Toxic Transfusion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Molecualr_Mycology.png/revision/latest?cb=20150624210517',
					description: 'A portion of damage dealt to enemy health by Molecular Mycology is returned to Miko as health. +15% Life Steal.'
				}, {
					name: 'Pervasive Poison',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Molecualr_Mycology.png/revision/latest?cb=20150624210517',
					description: 'Any damage dealt by Miko applies Molecular Mycology\'s poison effects.'
				}, {
					name: 'Pandemic',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/75/Molecualr_Mycology.png/revision/latest?cb=20150624210517',
					description: 'Molecular Mycology\'s poison effects spread to nearby enemies.'
				}],
				[{
					name: 'Probiotics',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'Increases Biosynthesis\'s self-healing effects. +15% Healing.'
				}, {
					name: 'Healer\'s Oath',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'Increases the effectiveness of Miko\'s Healing Beam while Biosynthesis is active. +25% Health per Second.'
				}, {
					name: 'Spore Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Increases Cloud of Spores\' impact damage. +15% Damage.'
				}],
				[{
					name: 'Fight or Flight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/79/A._Mikollopria.png/revision/latest?cb=20150624210353',
					description: 'Briefly increases movement speed when taking damage. +30% Movement Speed.'
				}, {
					name: 'Blade Slinger',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/ff/Combat_Botany.png/revision/latest?cb=20150624210442',
					description: 'Increases the firing rate of Miko\'s Kunai. +20% Attack Speed.'
				}],
				[{
					name: 'Biosynergy',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'Using Miko\'s heal beam on allies reduces Biosynthesis\' cooldown, allowing more frequent usage. -30% Cooldown Time.'
				}, {
					name: 'Residency',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Biosynthesis.png/revision/latest?cb=20150624210416',
					description: 'Increases the duration of Biosynthesis\' effects. +5 Seconds Duration.'
				}],
				[{
					name: 'Spore Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Enlarges Cloud of Spores\' area of effect. +50% Area of Effect Radius.'
				}, {
					name: 'Resilient Strain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Cloud_of_Spores.png/revision/latest?cb=20150624210430',
					description: 'Cloud of Spores lingers longer after bursting. +6 Seconds Duration.'
				}],
				[{
					name: 'Bark Skin',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Fungus_Among_Us.png/revision/latest?cb=20150624210454',
					description: 'Increases the maximum health of Fungus Among Us mushrooms. +214 Maximum Mushroom Health.'
				}, {
					name: 'We are Many',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Fungus_Among_Us.png/revision/latest?cb=20150624210454',
					description: 'Reduces the cooldown of Fungs Among Us at the cost of reduced mushroom health. -50% Cooldown Time, -214 Mushroom Health.'
				}, {
					name: 'Viscious Strain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ed/Fungus_Among_Us.png/revision/latest?cb=20150624210454',
					description: 'Fungus Among Us deals damage over time to enemies in range. +167 Damage per Second.'
				}],
			]
		},
		'Montana': {
			name: 'Montana',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Montana_-_Icon.png/revision/latest?cb=20160408095325',
			choices: [
				[{
					name: 'Go the Distance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Increases Lumberjack Dash\'s dash distance. + 50% Dash Distance.'
				}, {
					name: 'Weather Man',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Increases Montana\'s Minigun accuracy while Hailstorm is active. +30% Accuracy.'
				}],	
				[{
					name: 'The Ol\' One-Two',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Montana knocks nearby enemies into the air at the end of Lumberjack Dash.'
				}, {
					name: 'Lumberjack Blast',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Creates a shockwave at the end of Lumberjack Dash, knocking back enemies. +50% Damage Distance.'
				}, {
					name: 'Push It Push It Push It',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Increases the knockback effect of Lumberjack Dash, +40% knock back.'
				}],
				[{
					name: 'Pumped Up',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e8/Hearty_Constitution.png/revision/latest?cb=20160407212101',
					description: 'Increases Montana\'s maximum health. +360 Health.'
				}, {
					name: 'Gatling Grease',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/50/Montana\'s_Minigun.png/revision/latest?cb=20160407212102',
					description: 'Removes Minigun spin-up time. -100% Spin-up Time.'
				}],
				[{
					name: 'The Cooler',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Minigun heat decreases with each shot fired while Hailstorm is active.'
				}, {
					name: 'Firestorm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Your bullets now burn enemies, dealing bonus damage over time. Increases Minigun heat accumulation per shot fired when Hailstorm is active. +48 Damage over 2 seconds.'
				}],
				[{
					name: 'Cold-Blooded',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Heatwave.png/revision/latest?cb=20160407212101',
					description: 'Montana\'s health regeneration rate increases the lower his Minigun heat is. Up to +7 Health Regeneration per second.'
				}, {
					name: 'Focused Fire',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Heatwave.png/revision/latest?cb=20160407212101',
					description: 'The hotter Montana\'s Minigun is, the more his accuracy increases. Up to +25% Accuracy.'
				}, {
					name: 'Hot-Blooded',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Heatwave.png/revision/latest?cb=20160407212101',
					description: 'Montana\'s health regeneration rate increases the higher his Minigun heat is. Up to +9 Health Regeneration per second.'
				}],
				[{
					name: 'Swole Shield',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e8/Hearty_Constitution.png/revision/latest?cb=20160407212101',
					description: 'Increases Montana\'s maximum shield strength. +240 Shield.'
				}, {
					name: 'Icicles',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Hailstorm bullets penetrate multiple targets.'
				}, {
					name: 'Feeling the Burn',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/50/Montana\'s_Minigun.png/revision/latest?cb=20160407212102',
					description: 'Montana\'s Minigun no longer overheats. Every shot fired beyond maximum heat capacity damages Montana.'
				}],
				[{
					name: 'Ice Breaker',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Lumberjack Dash deals extra damage to enemies while Hailstorm is active. +25% Damage.'
				}, {
					name: 'Barrel Cooling',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Reduces the Minigun\'s rate of heat accumulation. -20% Heat Accumulation Rate.'
				}, {
					name: 'Ice Age',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Increases Hailstorm\'s skill duration. +2 Seconds Duration.'
				}],
				[{
					name: 'Too Big To Fail',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Reduces the cooldown of Lumberjack Dash, allowing more frequent usage. -25% Cooldown.'
				}, {
					name: 'Krackadowww!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4b/Lumberjack_Dash.png/revision/latest?cb=20160407212102',
					description: 'Increases Lumberjack Dash\'s impact damage. +15% Damage.'
				}],
				[{
					name: 'Bullet Buff',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Intensifies Hailstorm\'s slowing effect, further reducing enemy movement speed. If Firestorm augment is active, its damage over time effects are lengthened. +100% Slow or +2 Seconds Duration.'
				}, {
					name: 'Icy Resolve',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Increases Hailstorm\'s damage reduction. +25% Damage Reduction.'
				}, {
					name: 'Perfect Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Hailstorm.png/revision/latest?cb=20160407212100',
					description: 'Increases weapon damage while Hailstorm is active. +14% Damage.'
				}],
				[{
					name: 'Big Payback',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/95/Mansformation.png/revision/latest?cb=20160407212102',
					description: 'Absorbs damage taken while Mansformation damage reduction is active. When Mansformation ends, an area of effect attack is unleashed after 3 seconds, returning absorbed damage to nearby enemies.'
				}, {
					name: 'Instant Payback',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/95/Mansformation.png/revision/latest?cb=20160407212102',
					description: 'When Mansformation damage reduction is active, incoming enemy fire is reflected back at the attacker.'
				}],
			]
		},
		'Orendi': {
			name: 'Orendi',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/27/Orendi_-_Icon.png/revision/latest?cb=20160408095325',
			choices: [
				[{
					name: 'Fire Walk with Me',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Nullify\'s propulsive burst produces a trail of fire on the ground. +40 Damage over 5 seconds.'
				}, {
					name: 'Burned and Busted',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Shadowfire Pillar reveals all cloaked enemies in the area.'
				}],	
				[{
					name: 'Dismissed!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Adds a push effect to Nullify.'
				}, {
					name: 'I Hate Your Pretty Eyes',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Enemies hit by Nullify are blinded for a short time. +1 Second Blind Duration.'
				}],
				[{
					name: 'Let\'s Bounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Nullify propulsive effect launches Orendi in the direction she\'s moving.'
				}, {
					name: 'Mind Bullets',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/f/f4/Chaos_Bolts.png/revision/latest?cb=20150624193019',
					description: 'Chaos Bolts\' secondary burst attack homes in on enemies in close range.'
				}, {
					name: 'Oh That Reminds Me',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Activating Nullify prompts Orendi\'s shields to immediately begin recharging.'
				}],
				[{
					name: 'Preamble of Pain',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Shadowfire Pillar deals damage over time to nearby enemies before detonation. +180 Damage over 1.5 seconds.'
				}, {
					name: 'Instant Gratification',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Shadowfire Pillar instantly detonates, but deals reduced damage. -50% Damage.'
				}, {
					name: 'Power Pillar',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'For 5 seconds after using Shadowfire Pillar, Orendi may cast a second Shadowfire Pillar dealing half as much damage.'
				}],
				[{
					name: 'Prognostication',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Gnosis.png/revision/latest?cb=20150624193057',
					description: 'Increases Gnosis\' cooldown reduction effect. -4 Seconds Cooldown Time.'
				}, {
					name: 'Renaissance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Gnosis.png/revision/latest?cb=20150624193057',
					description: 'Gnosis reduces the cooldown of Paradigm Shift. -5 Seconds Cooldown Time.'
				}, {
					name: 'Prognosticombo',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/94/Gnosis.png/revision/latest?cb=20150624193057',
					description: 'Activating Shadowfire Pillar reduces Nullify\'s cooldown. This effect does not apply to the second activation provided by the Encore augment. -5 Seconds Cooldown Time.'
				}],
				[{
					name: 'Nihilism',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Increases Nullify\'s base damage. +15% Damage.'
				}, {
					name: 'Shadowfury',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Increases Shadowfire Pillar\'s base damage. +15% Damage.'
				}],
				[{
					name: 'Force of Will',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/Chaos_Magic.png/revision/latest?cb=20150624193043',
					description: 'Increases the damage of all skills. +15% Damage.'
				}, {
					name: 'Essence Theft',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/Chaos_Magic.png/revision/latest?cb=20150624193043',
					description: 'All skills heal Orendi for a portion of the damage dealt. +15% Lifesteal.'
				}],
				[{
					name: 'Rapid Deterioration',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Decreases Nullify\'s cooldown time. -20% Cooldown Time.'
				}, {
					name: 'I Hate Your Pretty Shields!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/13/Nullify.png/revision/latest?cb=20150624193108',
					description: 'Nullify\'s damage penetrates enemy shields. +60% Shield Penetration.'
				}],
				[{
					name: 'Shadowfire Storm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Decreases Shadowfire Pillar\'s cooldown time. -20% Cooldown Time.'
				}, {
					name: 'Chaotic Reach',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'Increases Shadowfire Pillar\'s maximum cast distance. +25% Cast Distance.'
				}, {
					name: 'Still Hating Your Shields',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/8/88/Shadowfire_Pillar.png/revision/latest?cb=20150624193137',
					description: 'A portion of damage dealt by Shadowfire Pillar penetrates enemy shields. +60% Shield Penetration.'
				}],
				[{
					name: 'Thought Rejection',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d5/Paradigm_Shift.png/revision/latest?cb=20150624193124',
					description: 'Enemies hit by Paradigm Shift are pushed back and blinded.'
				}, {
					name: 'Pillarstorm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d5/Paradigm_Shift.png/revision/latest?cb=20150624193124',
					description: 'Activating Paradigm Shift places a Shadowfire Pillar under each nearby enemy Battleborn in range.'
				}, {
					name: 'Reign of Chaos',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d5/Paradigm_Shift.png/revision/latest?cb=20150624193124',
					description: 'Activating Paradigm Shift instantly resets Shadowfire Pillar\'s cooldown.'
				}],
			]
		},
		'Oscar Mike': {
			name: 'Oscar Mike',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/Oscar_Mike_-_Icon.png/revision/latest?cb=20160408095339',
			choices: [
				[{
					name: 'Impact Trigger',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Frag Grenades detonate on impact.'
				}, {
					name: 'Sneak Attack',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Deactivating Stealth Generator by using a skill or attacking an enemy provides a momentary damage boost to the skill or attack used. +16% Bonus Damage.'
				}],	
				[{
					name: 'Fragcendiary Grenade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Upon detonation, Frag Grenages blanket an area in napalm, dealing damage over time to nearby enemies. +720 Damage over 6 Seconds.'
				}, {
					name: 'Nades On Nades',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'On first impact, Frag Grenades spawn 5 child grenades, each of which deals 20% damage on detonation. Up to +50% Bonus Damage.'
				}],
				[{
					name: 'Red Dot Sight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Fits Oscar Mike\'s Assault Rifle with a red dot sight that enables full-speed movement while aiming down sights.'
				}, {
					name: 'Scope',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Fits Oscar Mike\'s Assault Rifle with a long-range scope that increases Oscar Mike\'s maximum effective range.'
				}],
				[{
					name: 'Back in a Jiff',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Activating Stealth Generator prompts Oscar Mike\'s shields to immediately begin charging.'
				}, {
					name: 'Tactical Espionage Action',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases movement speed while Stealth Generator is active. +30% Movement Speed.'
				}],
				[{
					name: 'Hollow Point Round',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Bonus damage caused by Tactical Rounds penetrates enemy shields. +60% Shield Penetration.'
				}, {
					name: 'Debilitatiing Rounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Critical hits with Tactical Rounds deal increased damage. +50% Critical Damage.'
				}, {
					name: 'Doubletap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Doubles the number of Tactical Rounds in each magazine. +15 Tactical Rounds.'
				}],
				[{
					name: 'Far-flung Frags',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Boosts launch velocity of Frag Grenades, increasing their range. +75% Projectile Velocity.'
				}, {
					name: 'Stealthy Shields',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases shield recharge rate while Stealth Generator is active. +105 Shield Recharge per Second.'
				}],
				[{
					name: 'Agility Training',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c5/UPR-RDC_Combat_Armor_Oscar_Mike.png/revision/latest?cb=20160503155712',
					description: 'Increases movement speed. +8% Base Movement Speed.'
				}, {
					name: 'High-Velocity Ammo',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Increases Assault Rifle Damage. +18% Damage.'
				}, {
					name: 'Disruption Rounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'A portion of Assault Rifle\'s damage penetrates enemy shields. +25% Shield Penetration.'
				}],
				[{
					name: 'Fragpocalypse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Increases Frag Grenade\'s damage. +15% Damage.'
				}, {
					name: 'Concentrated Frags',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Greatly increases the damage caused by Frag Grenades at the cost of reducing area of effect. +30% Damage, -25% Area of Effect Radius.'
				}, {
					name: 'Embiggened Boom',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Increases the effective explosive range of Frag Grenades. +50% Area of Effect Radius.'
				}],
				[{
					name: 'Stealth Savings',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Deactivating Stealth Generator early refunds a portion of the cooldown cost. The less time you spend cloaked, the shorter the cooldown will be. Up to -40% Cooldown Time.'
				}, {
					name: 'Ghost Mode',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Activating Airstrike while Stealth Generator is active no longer breaks stealth.'
				}, {
					name: 'Operation Sneaky Ghost',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases Stealth Generator\'s maximum active duration. +6 Seeconds Stealth Duration.'
				}],
				[{
					name: 'Holy Crap, Space Lasers!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Replaces Airstrike\'s missile barrage with a focused laser attack that concentrates all of Airstrike\'s damage into a smaller area and penetrates through structures.'
				}, {
					name: 'Danger Close',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Oscar Mike calls in a focused Airstrike on his location, narrowing the area of effect and causing Airstrike to follow Oscar Mike as he moves.'
				}, {
					name: 'Holy Crap, Concussive Strike!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Enemies damaged by Airstrike are slowed for a short time. +3 Seconds Slow Duration.'
				}],
			]
		},
		'Oscar Mike': {
			name: 'Oscar Mike',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/Oscar_Mike_-_Icon.png/revision/latest?cb=20160408095339',
			choices: [
				[{
					name: 'Impact Trigger',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Frag Grenades detonate on impact.'
				}, {
					name: 'Sneak Attack',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Deactivating Stealth Generator by using a skill or attacking an enemy provides a momentary damage boost to the skill or attack used. +16% Bonus Damage.'
				}],	
				[{
					name: 'Fragcendiary Grenade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Upon detonation, Frag Grenages blanket an area in napalm, dealing damage over time to nearby enemies. +720 Damage over 6 Seconds.'
				}, {
					name: 'Nades On Nades',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'On first impact, Frag Grenades spawn 5 child grenades, each of which deals 20% damage on detonation.i Up to +50% Bonus Damage.'
				}],
				[{
					name: 'Red Dot Sight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Fits Oscar Mike\'s Assault Rifle with a red dot sight that enables full-speed movement while aiming down sights.'
				}, {
					name: 'Scope',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Fits Oscar Mike\'s Assault Rifle with a long-range scope that increases Oscar Mike\'s maximum effective range.'
				}],
				[{
					name: 'Back in a Jiff',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Activating Stealth Generator prompts Oscar Mike\'s shields to immediately begin charging.'
				}, {
					name: 'Tactical Espionage Action',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases movement speed while Stealth Generator is active. +30% Movement Speed.'
				}],
				[{
					name: 'Hollow Point Round',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Bonus damage caused by Tactical Rounds penetrates enemy shields. +60% Shield Penetration.'
				}, {
					name: 'Debilitatiing Rounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Critical hits with Tactical Rounds deal increased damage. +50% Critical Damage.'
				}, {
					name: 'Doubletap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/4f/Tactical_Rounds.png/revision/latest?cb=20160407213320',
					description: 'Doubles the number of Tactical Rounds in each magazine. +15 Tactical Rounds.'
				}],
				[{
					name: 'Far-flung Frags',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Boosts launch velocity of Frag Grenades, increasing their range. +75% Projectile Velocity.'
				}, {
					name: 'Stealthy Shields',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases shield recharge rate while Stealth Generator is active. +105 Shield Recharge per Second.'
				}],
				[{
					name: 'Agility Training',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c5/UPR-RDC_Combat_Armor_Oscar_Mike.png/revision/latest?cb=20160503155712',
					description: 'Increases movement speed. +8% Base Movement Speed.'
				}, {
					name: 'High-Velocity Ammo',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'Increases Assault Rifle Damage. +18% Damage.'
				}, {
					name: 'Disruption Rounds',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/42/UPR-AR7_Assault_Rifle.png/revision/latest?cb=20160407213320',
					description: 'A portion of Assault Rifle\'s damage penetrates enemy shields. +25% Shield Penetration.'
				}],
				[{
					name: 'Fragpocalypse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Increases Frag Grenade\'s damage. +15% Damage.'
				}, {
					name: 'Concentrated Frags',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Greatly increases the damage caused by Frag Grenades at the cost of reducing area of effect. +30% Damage, -25% Area of Effect Radius.'
				}, {
					name: 'Embiggened Boom',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/6b/Frag_Grenade.png/revision/latest?cb=20160407213319',
					description: 'Increases the effective explosive range of Frag Grenades. +50% Area of Effect Radius.'
				}],
				[{
					name: 'Stealth Savings',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Deactivating Stealth Generator early refunds a portion of the cooldown cost. The less time you spend cloaked, the shorter the cooldown will be. Up to -40% Cooldown Time.'
				}, {
					name: 'Ghost Mode',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Activating Airstrike while Stealth Generator is active no longer breaks stealth.'
				}, {
					name: 'Operation Sneaky Ghost',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3b/Stealth_Generator.png/revision/latest?cb=20160407213319',
					description: 'Increases Stealth Generator\'s maximum active duration. +6 Seeconds Stealth Duration.'
				}],
				[{
					name: 'Holy Crap, Space Lasers!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Replaces Airstrike\'s missile barrage with a focused laser attack that concentrates all of Airstrike\'s damage into a smaller area and penetrates through structures.'
				}, {
					name: 'Danger Close',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Oscar Mike calls in a focused Airstrike on his location, narrowing the area of effect and causing Airstrike to follow Oscar Mike as he moves.'
				}, {
					name: 'Holy Crap, Concussive Strike!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/10/Airstrike.png/revision/latest?cb=20160407213318',
					description: 'Enemies damaged by Airstrike are slowed for a short time. +3 Seconds Slow Duration.'
				}],
			]
		},
		'Phoebe': {
			name: 'Phoebe',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/bc/Phoebe_-_Icon.png/revision/latest?cb=20160408095340',
			choices: [
				[{
					name: 'Agressive Advance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Exiting Phasegate grants increased movement speed for a short time. +30% Movement Speed for 3 Seconds.'
				}, {
					name: 'Preparation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'Enemies hit by Blade Rush will be marked and silenced by the last strike of Phoebe\'s primary melee combo. +3 Seconds Silence Duration.'
				}],	
				[{
					name: 'Shield Resonators',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Phoebe\'s shields immediately being recharging after using Phasegate.'
				}, {
					name: 'Phase Distortion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Phasegate creates a field at Phoebe\'s target destination that slows nearby enemies. +6 Seconds Slow Duration.'
				}],
				[{
					name: 'Shield Stablizers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9c/Technocracy.png/revision/latest?cb=20160313163020',
					description: 'Increases maximum shield strength and shield recharge rate. +240 Shield Strength, +105 Shield Recharge per Second.'
				}, {
					name: 'Crosscut',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c1/TrueStrike.png/revision/latest?cb=20160313164653',
					description: 'After completing her primary melee combo, Phoebe temporarily deals increased damage with True Strike. +150% Damage.'
				}, {
					name: 'Sharpened Blades',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/FiveVirtues.png/revision/latest?cb=20160313163045',
					description: 'Phoebe\'s melee attacks deal increased damage. +18% Damage.'
				}],
				[{
					name: 'Unintended Innovation',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'Blade Rush blades travel slower but explode on contact, damaging nearby enemies.'
				}, {
					name: 'Raddoppio',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'When Blade Rush strikes an enemy, the skill\'s cooldown is reduced. Increased effect on major enemies. Up to -2 Seconds Cooldown Time.'
				}],
				[{
					name: 'Passata Sotto',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c1/TrueStrike.png/revision/latest?cb=20160313164653',
					description: 'Landing a hit with True Strike increases Phoebe\'s defense for a short time. +30% Damage Reduction for 3 Seconds.'
				}, {
					name: 'Blade Sweep',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c1/TrueStrike.png/revision/latest?cb=20160313164653',
					description: 'True Strike chains a second attack after the dodge that hits all targets in close range.'
				}, {
					name: 'Reprise',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c1/TrueStrike.png/revision/latest?cb=20160313164653',
					description: 'Phoebe attacks a second time after landing a hit with True Strike dealing increased damage. +40% Damage.'
				}],
				[{
					name: 'Phasegate V2',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Reduces Phasegate\'s cooldown time. -20% Cooldown Time.'
				}, {
					name: 'Contingency Plan',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'When Phoebe\'s shield is broken, Phasegate\'s cooldown in instantly reset.'
				}, {
					name: 'Disruptor Blades',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'A portion of damage dealt by Blade Rush penetrates enemy shields. +60% Shield Penetration.'
				}],
				[{
					name: 'Core Overload',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9c/Technocracy.png/revision/latest?cb=20160313163020',
					description: 'Increases damage of all skills. +15% Skill Damage.'
				}, {
					name: 'Flurry',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/FiveVirtues.png/revision/latest?cb=20160313163045',
					description: 'Increases Phoebe\'s primary melee attack speed. +20% Attack Speed.'
				}],
				[{
					name: 'Scientific Method',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Substantially increases Phasegate\'s casting range.'
				}, {
					name: 'Phase Stability',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/3d/Phasegate.png/revision/latest?cb=20160313164553',
					description: 'Increases the damage and effect of all buffs imparted by Phasegate. +15% Damage.'
				}],
				[{
					name: 'The Conduit',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'Adds a portion of Phoebe\'s current shield strength to Blade Rush as bonus damage. +12% Current Shield as Damage.'
				}, {
					name: 'Close-Quarters Training',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'Increases Blade Rush\'s damage when enemies are in close range. Up to +100% Damage.'
				}, {
					name: 'Refined Technique',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/BladeRush.png/revision/latest?cb=20160313164610',
					description: 'The farther Blade Rush travels before striking an enemy, the more damage it deals. Up to +100% Damage.'
				}],
				[{
					name: 'Calamitous Cascade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d8/BladeCascade.png/revision/latest?cb=20160313164631',
					description: 'Enemies struck by Blade Cascade suffer increased damage from all sources for a short time. +16% Damage Amplification.'
				}, {
					name: 'Danger Close',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d8/BladeCascade.png/revision/latest?cb=20160313164631',
					description: 'Blade Cascade\'s area of effect travels with Phoebe, -50% Damage.'
				}, {
					name: 'Holy Crap, Concussive Strike!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d8/BladeCascade.png/revision/latest?cb=20160313164631',
					description: 'Increases Blade Cascade\'s area of effect. Moving through the area grants a temporary boost in movement speed. +50% Area of Effect Radius, +30% Movement Speed.'
				}],
			]
		},
		'Rath': {
			name: 'Rath',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/40/Rath_-_Icon.png/revision/latest?cb=20160408095341',
			choices: [
				[{
					name: 'Slowing Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'Crossblade slows enemies on impact. +3 seconds Slow Duration.'
				}, {
					name: 'Concussive Smash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Catalytic Smash no longer produces a shockwave that knocks targets into the air, but stuns enemies on impact if they have recently been hit by Crossblade.'
				}, {
					name: 'Waveform Smash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Catalytic Smash\'s shockwave is shortened, but spreads out to the left and right.'
				}],	
				[{
					name: 'Shield Syphon',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'When Crossblade damages an enemy\'s shield, Rath\'s shield recharges the amount of damage dealt. +100% Shield Restored on Hit.'
				}, {
					name: 'Eviscerating Blade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'A portion of damage dealt by Crossblade bypasses enemy shields. +60% Shield Penetration.'
				}, {
					name: 'Parabolic Blade',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'When a Crossblade is destroyed, a new Crossblade will spawn, moving towards Rath and dealing half damage to enemies.'
				}],
				[{
					name: 'Terror from Above',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Bladekeepers_vestment_icon.png/revision/latest?cb=20160302211711',
					description: 'Allows Rath to double-jump.'
				}, {
					name: 'Spin to Win',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d7/Axiom_and_Order_icon.png/revision/latest?cb=20160302211413',
					description: 'Rath\'s primary melee combo\'s finishing spin fires twice at the end of the combo.'
				}],
				[{
					name: 'Crimson Fastness',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'When Rath attacks with Catalytic Smash, he will leap forward before he smashes.'
				}, {
					name: 'Catalytic Flash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Catalytic Smash silences enemies on impact. +3 seconds Silence Duration.'
				}],
				[{
					name: 'Skillful Syphoning',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0d/Genetic_syphon_icon.png/revision/latest?cb=20160302211833',
					description: 'Genetic Syphon steals additional health when a skill deals damage to an enemy. +20% Life Steal.'
				}, {
					name: 'Swordman\'s Salve',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0d/Genetic_syphon_icon.png/revision/latest?cb=20160302211833',
					description: 'Greatly increases Genetic Syphon life-stealing properties for his melee attacks, but removes the effect from his skills.'
				}, {
					name: 'Not a Vampire',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0d/Genetic_syphon_icon.png/revision/latest?cb=20160302211833',
					description: 'Genetic Syphon steals additional health when attacking enemies with melee strikes. +11% Life Steal.'
				}],
				[{
					name: 'Brutal Blades',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'Increases Crossblade\'s base damage. +15% Damage.'
				}, {
					name: 'Catastrophic Smash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Doubles the shockwave length of Catalytic Smash.'
				}],
				[{
					name: 'Evasive Maneuvers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/68/Bladekeepers_vestment_icon.png/revision/latest?cb=20160302211711',
					description: 'When Rath\'s shield is broken, movement speed is increased for a short time. +30% Movement Speed for 6 seconds.'
				}, {
					name: 'Spin to Slow',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d7/Axiom_and_Order_icon.png/revision/latest?cb=20160302211413',
					description: 'Rath\'s primary melee combo finishing spin slows enemies. +1 Seconds Slow Duration.'
				}, {
					name: 'To the Point',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/d7/Axiom_and_Order_icon.png/revision/latest?cb=20160302211413',
					description: 'Increases base damage of all melee strikes. +18% Damage.'
				}],
				[{
					name: 'Energetic Projection',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'Doubles the effective range of Crossblade.'
				}, {
					name: 'Quick Cross',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1d/Crossblade_icon.png/revision/latest?cb=20160302211511',
					description: 'Reduces Crossblade\'s cooldown. -20% Cooldown Time.'
				}],
				[{
					name: 'Softened Target',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Enemies hit by Catalytic Smash will take more damage from Crossblade for a short time. +25% Damage for 4 seconds.'
				}, {
					name: 'Zealous Smash',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/c2/Catalytic_smash_icon.png/revision/latest?cb=20160302211555',
					description: 'Killing an enemy with Catalytic Smash reduces Dreadwind\'s cooldown. -3 seconds per kill.'
				}],
				[{
					name: 'Dreadheart',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/53/Dreadwind_icon.png/revision/latest?cb=20160302211630',
					description: 'Grants a movement speed boost to Rath while Dreadwind is active. +30% Movement Speed.'
				}, {
					name: 'Unstoppable Assault',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/53/Dreadwind_icon.png/revision/latest?cb=20160302211630',
					description: 'Dreadwind generates an overshield upon activation. +225 Overshield for 4 Seconds.'
				}, {
					name: 'Desperate Assault',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/53/Dreadwind_icon.png/revision/latest?cb=20160302211630',
					description: 'Damage dealt by Dreadwind is increased while Rath\'s shield is broken. +45% Damage.'
				}],
			]
		},
		'Reyna': {
			name: 'Reyna',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0d/Reyna_-_Icon.png/revision/latest?cb=20160408095341',
			choices: [
				[{
					name: 'Electrostatic Induction',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'When a Shield Booster is applied it instantly restores a portion of the wearer\'s shield. +120 Shield Heal.'
				}, {
					name: 'Waste Reduction',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Increases the speed and range of Priority Target\'s homing blast. If Priority Target fails to mark a target, half the cooldown is refunded. +67% Attack Speed and Range.'
				}],	
				[{
					name: 'Priority Plasma',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Plasma Pulse\'s shots home in on enemies marked with Priority Target.'
				}, {
					name: 'Lockdown',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Reyna\'s Laser Pistol and Plasma Pulse briefly slow enemies marked with Priority Target. +3 Seconds Slow Duration.'
				}],
				[{
					name: 'Plasma Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Plasma_pulse_icon.png/revision/latest?cb=20160302230737',
					description: 'Plasma Pulse\'s fire explodes on impact, dealing damage to nearby enemies.'
				}, {
					name: 'Slazer Thermokinetics',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b8/Laser_pistol_icon.png/revision/latest?cb=20160302230508',
					description: 'Increases the damage dealt by Laser Pistol based on the heat level of Plasma Pulse.'
				}, {
					name: 'Optical Amplifier',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/b/b8/Laser_pistol_icon.png/revision/latest?cb=20160302230508',
					description: 'Increases Laser Pistol\'s damage. +18% Damage.'
				}],
				[{
					name: 'Vital Protocol',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'When a Shield Booster overshield is applied, it instantly restores a portion of the wearer\'s health. +250 Health.'
				}, {
					name: 'The Best Defense',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'Each Shield Booster overshield increases all damage dealt by the wearer until it expires or greaks. +16% Damage Amplification.'
				}, {
					name: 'Vengeance Protocol',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'When a Shield Booster overshield is applied, it explodes, damaging nearby enemies. +200 Damage.'
				}],
				[{
					name: 'Improvised Tactics',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/46/Failsafe_icon.png/revision/latest?cb=20160302231217',
					description: 'While Failsafe is active, all of Reyna\'s active skill cooldowns are reduced. -15% Cooldown Time for All Skills.'
				}, {
					name: 'Thermal Equilibrium',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/4/46/Failsafe_icon.png/revision/latest?cb=20160302231217',
					description: 'Prevents Reyna\'s Plasma Pulse from overheating while Failsafe is active.'
				}],
				[{
					name: 'Villigance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'Increases the amount of damage absorbed by a Shield Booster overshield before it breaks. +112 Overshield.'
				}, {
					name: 'Therapeutic Booster',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'Shield Booster removes all debuffs from the wearer when applied.'
				}, {
					name: 'First Strike',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Increases initial impact damage of Priority Target. +15% Damage.'
				}],
				[{
					name: 'Shield Sapper',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Plasma_pulse_icon.png/revision/latest?cb=20160302230737',
					description: 'When Plasma Pulse damages an enemy\'s shield, a portion of that damage is restored to Reyna\'s shield. Does not function while Reyna\'s shield is down. +20% Shield Steal.'
				}, {
					name: 'Pulse Pounder',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Plasma_pulse_icon.png/revision/latest?cb=20160302230737',
					description: 'Increases Plasma Pulse\'s base damage. +18% Damage.'
				}],
				[{
					name: 'Most Wanted',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Increases the duration of Priority Target\'s debuff effects. +4 Seconds Duration.'
				}, {
					name: 'Calling the Shots',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'If an enemy marked by Priority Target is killed, the skill\'s cooldown is immediately reset.'
				}, {
					name: 'Dogpiler',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/c/ca/Priority_target_icon.png/revision/latest?cb=20160302231033',
					description: 'Increases extra damage suffered by enemies marked by Priority Target. +16% Damage Amplification.'
				}],
				[{
					name: 'Long Watch',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'Increases Shield Booster\'s overshield duration. +6 Seconds Duration.'
				}, {
					name: 'Kinetic Deflection',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/e0/Shield_booster_icon.png/revision/latest?cb=20160302230911',
					description: 'A portion of the damage absorbed by a Shield Booster overshield is reflected back at the attacker. +15% Damage Reflection.'
				}],
				[{
					name: 'Blunderdome',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/08/Photonic_ward_icon.png/revision/latest?cb=20160302231436',
					description: 'Disables the shields of all enemies within Photonic Ward\'s area of effect.'
				}, {
					name: 'Huddle Up',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/08/Photonic_ward_icon.png/revision/latest?cb=20160302231436',
					description: 'Activating Photonic Ward grants a Shield Booster overshield to all nearby allies. +225 Overshield for 8 seconds.'
				}, {
					name: 'Mobility Module',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/08/Photonic_ward_icon.png/revision/latest?cb=20160302231436',
					description: 'Increases the duration of Photonic Ward and causes the shield to follow Reyna as she moves. +4 Seconds Duration.'
				}],
			]
		},
		'Shayne and Aurox': {
			name: 'Shayne and Aurox',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9c/Shayne_and_Aurox_-_Icon.png/revision/latest?cb=20160408095341',
			choices: [
				[{
					name: 'Aura of Annoyance',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'While Shayne is cloaked by Stealth Strike, she projects an area of effect that damages nearby enemies. +201 Damage over 5 seconds.'
				}, {
					name: 'Welcome Committee',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'Shayne gains an overshield after successfully hitting an enemy with Fetch. +225 Overshield for 8 seconds.'
				}],	
				[{
					name: 'Wait for the Drop',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Enemies damaged by Aurox at the end of Stealth Strike are slowed for a brief time. +3 Seconds Slow Duration.'
				}, {
					name: 'Surprise Party',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Shayne and Aurox\'s first attack after the conclusion of Stealth Strike deals additional damage. +25% Damage.'
				}],
				[{
					name: 'Boomerang Bounce',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a6/Shayne%E2%80%99s_Boomerang.png/revision/latest?cb=20160408000833',
					description: 'Shayne\'s Boomerang bounces to a nearby enemy on a successful hit.'
				}, {
					name: 'The Power of Two',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'Shayne and Aurox\'s melee attacks deal additional damage while their shield is active. +18% Damage.'
				}, {
					name: 'Hulk Out with your Djinn Out',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'Increases the rate of shield recharge. +105 Shield Recharge per Second.'
				}],
				[{
					name: 'What\'s Yours is Mine',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Fetch steals some of the target\'s shield on impact. +100% Shield Steal.'
				}, {
					name: 'We\'ll Take Everything',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'When Fetch is activated, Aurox phases through enemies, damaging and pulling every enemy he encounters along the way.'
				}, {
					name: 'Holding it Down',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Instead of pulling targets, Fetch now stuns enemies on impact. +2 Seconds Stun Duration.'
				}],
				[{
					name: 'The Immortal Aegis',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'At the conclusion of any skill, Shayne and Aurox\'s shield immediately begins to recharge.'
				}, {
					name: 'Don\'t Stop Running',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/e/ea/Fleet_Footed.png/revision/latest?cb=20160408000833',
					description: 'Increases Fleet-footed\'s active duration. +1.5 Seconds Duration.'
				}],
				[{
					name: 'Sneaky n\' Resilient',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Shayne takes reduced damage while cloaked by Stealth Strike. +20% Damage Reduction.'
				}, {
					name: 'Shield Smasher',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Fetch damage penetrates enemy shields. +60% Shield Penetration.'
				}],
				[{
					name: 'Alone Time',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'Shayne\'s health regenerates while her shield is broken. +21 Health Regeneration per Second.'
				}, {
					name: 'Boom Goes the Boomerang',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a6/Shayne%E2%80%99s_Boomerang.png/revision/latest?cb=20160408000833',
					description: 'Increases the damage of Shayne\'s Boomerang. +18% Damage.'
				}, {
					name: 'Bigger, Badder, Djinn',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/18/Aurox.png/revision/latest?cb=20160408000832',
					description: 'Increases maximum shield strength. +240 Maximum Shield Strength.'
				}],
				[{
					name: 'Sustained Stealth',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Increases Stealth Strike duration. +6 Seconds Duration.'
				}, {
					name: 'Long Arm of the Lawless',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Increase the radius of the explosion of Stealth Strike. +50% Area of Effect Radius.'
				}, {
					name: 'Djinn to the Face',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/0e/Stealth_Strike.png/revision/latest?cb=20160408000834',
					description: 'Increases damage dealt by Stealth Strike\'s final impact. +15% Damage.'
				}],
				[{
					name: 'Quite Fetching',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Reduces Fetch\'s cooldown time. -20% Cooldown Time.'
				}, {
					name: 'Got \'Em',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Increases Aurox\'s speed during Fetch. +35% Aurox Speed.'
				}, {
					name: 'Sick \'em Aurox',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Fetch.png/revision/latest?cb=20160408000832',
					description: 'Increases Fetch damage. +15% Damage.'
				}],
				[{
					name: 'Aurox Hungers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/60/Tag_Team.png/revision/latest?cb=20160408000834',
					description: 'While Tag Team is active, Aurox steals shield energy from nearby enemies, returning it to Shayne. +30% Shield Steal.'
				}, {
					name: 'Aurox Beckons',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/60/Tag_Team.png/revision/latest?cb=20160408000834',
					description: 'When Tag Team is activated, Aurox draws in nearby enemies, slowing them at close range. +3 Seconds Slow Duration.'
				}],
			]
		},
		'Thorn': {
			name: 'Thorn',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Thorn_-_Icon.png/revision/latest?cb=20160408095342',
			choices: [
				[{
					name: 'Swampfoot',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'Enemies damaged by Blight are slowed for a short time.'
				}, {
					name: 'Piercing Volley',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Volley\'s arrows can go through multiple targets.'
				}],	
				[{
					name: 'Cursed Earth',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'When Thorn is touching Blight\'s field, all of her arrows become cursed.'
				}, {
					name: 'Blightbrawler',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'When Thorn is touching Blight\'s field, her melee attacks curse enemies.'
				}, {
					name: 'Fell Wind',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'Thorn receives a short speed boost when touching Blight\'s field. +30% Movement Speed.'
				}],
				[{
					name: 'Draw Strength',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Kreshek.png/revision/latest?cb=20160407190606',
					description: 'Arrows penetrate multiple targets.'
				}, {
					name: 'Burst Propulsion',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Edrid_Vitality.png/revision/latest?cb=20160407190605',
					description: 'In addition to dealing damage, Thorn\'s melee attack now propels her backwards. Can be used once every 2 seconds.'
				}],
				[{
					name: 'Kreshek\'s Judgement',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Volley\'s arrows curse targets on hit.'
				}, {
					name: 'Focused Volley',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Volley is concentrated to three arrows, dealing greater damage per arrow. +66% Damage per Arrow, -2 Arrows.'
				}, {
					name: 'Nockout',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Volley shoots two additional arrows in a wider arc. +2 Arrows.'
				}],
				[{
					name: 'Hextension',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/95/Nature\'s_Curse.png/revision/latest?cb=20160407190606',
					description: 'Increases curse bonus damage and duration on afflicted enemies. +10% Damage, +4 Seconds Duration.'
				}, {
					name: 'Fiendish Curse',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/95/Nature\'s_Curse.png/revision/latest?cb=20160407190606',
					description: 'Bonus Damage to cursed targets penetrates shields. +100% Shield Penetration.'
				}, {
					name: 'Hexsanguination',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/95/Nature\'s_Curse.png/revision/latest?cb=20160407190606',
					description: 'Curse status deals additional bleed damage to afflicted enemies. +12 Damage per Second.'
				}],
				[{
					name: 'Brutal Blight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'Increases Blight\'s area of effect of damage. +15% Damage.'
				}, {
					name: 'Swift Volley',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Volley\'s cooldown time is reduced. -20% Cooldown Time.'
				}],
				[{
					name: 'Eagle-eye',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Kreshek.png/revision/latest?cb=20160407190606',
					description: 'Increases the accuracy of Thorn\'s standard arrow attack. +50% Accuracy.'
				}, {
					name: 'Phasing Arrows',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/52/Kreshek.png/revision/latest?cb=20160407190606',
					description: 'A portion of arrow damage penetrates enemy shields. +25% Shield Penetration.'
				}, {
					name: 'Vaulting Hunter',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/7b/Edrid_Vitality.png/revision/latest?cb=20160407190605',
					description: 'Increases the height of Thorn\'s jump.'
				}],
				[{
					name: 'Enduring Blight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'Increases Blight\'s effective duration. +6 Seconds Duration.'
				}, {
					name: 'Distant Blight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ac/Blight.png/revision/latest?cb=20160407190605',
					description: 'Blight can be summoned at greater distances. +100% Cast Distance.'
				}],
				[{
					name: 'Archer\'s Boon',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'A portion of Volley\'s damage dealt to enemies is returned to Thorn as health. +30% Life Steal.'
				}, {
					name: 'Kreshek\'s Rage',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/5d/Volley.png/revision/latest?cb=20160407190607',
					description: 'Increases Volley\'s arrow damage. +15% Damage.'
				}],
				[{
					name: 'Wild Judgement',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/da/Wrath_of_the_Wild.png/revision/latest?cb=20160407190607',
					description: 'Wrath of the Wild\'s energy bomb bounces through the world up to five times, dealing less damage but detonating with every bounce.'
				}, {
					name: 'Trap Training',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/da/Wrath_of_the_Wild.png/revision/latest?cb=20160407190607',
					description: 'Modifies Wrath of the Wild to stick upon impact, detonating when enemies are in close range, or after 10 seconds.'
				}, {
					name: 'Earth Render',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/d/da/Wrath_of_the_Wild.png/revision/latest?cb=20160407190607',
					description: 'Wrath of the Wild leaves a Blight field behind after detonation.'
				}],
			]
		},
		'Toby': {
			name: 'Toby',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/1a/Toby_-_Icon.png/revision/latest?cb=20160408095342',
			choices: [
				[{
					name: 'Contingency Plan',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Shooting Toby\'s Arc Mine with a Railgun blast will detonate the mine, dealing extra damage to nearby targets. +133 Damage.'
				}, {
					name: 'Me \'n My Magnets',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Railgun projectiles deal bonus damage when passing through a Force Field. +25% Damage.'
				}],	
				[{
					name: 'Starting Line',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Allies who pass through Toby\'s Force Field are hastened for a brief time. +30% Movement Speed.'
				}, {
					name: 'Best Offense',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Allies standing behind Toby\'s Force Field are granted bonus health regeneration and attack speed. +14 Health Regeneration per Second, +15% Attack Speed.'
				}],
				[{
					name: 'Targeting Overlay',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/55/Upr_h8-ms_custom_railgun_icon.png/revision/latest?cb=20160302213846',
					description: 'While zooming Toby\'s Railgun, all enemies (including cloaked enemies) are revealed in the scope.'
				}, {
					name: 'Still Alive! Sorry!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/09/Me_n_my_mech_icon.png/revision/latest?cb=20160302214520',
					description: 'Increase Toby\'s maximum shield strength. +240 Maximum Shield Strength.'
				}],
				[{
					name: 'Sorry I Broke Your Legs',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Enemies damaged by Arc Mines are slowed. +3 Seconds Slow Duration.'
				}, {
					name: 'Arc Vortex',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Arc Mines now suck enemies toward them.'
				}, {
					name: 'Sorry I Broke Your Wrists',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Enemies directly hit by Arc Mines are stunned. +2 Seconds Stun Duration.'
				}],
				[{
					name: 'Boosted Boosters',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/Boosters_icon.png/revision/latest?cb=20160302214345',
					description: 'Toby\'s Boosters gain one additional charge. +1 Charge.'
				}, {
					name: 'Upward Boost',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/Boosters_icon.png/revision/latest?cb=20160302214345',
					description: 'Toby\'s Boosters can now propel him upward.'
				}, {
					name: 'Panic Mode',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/78/Boosters_icon.png/revision/latest?cb=20160302214345',
					description: 'Toby gains increased damage resistance while his Boosters are out of charges. +30% Damage Reduction.'
				}],
				[{
					name: 'Beam Splitter',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Toby\'s Railgun projectiles split into three blasts when fired through a Force Field.'
				}, {
					name: 'Overcompensating',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Increases the size of Toby\'s Railgun shot when fired through his Force Field. +25% Projectile Size.'
				}, {
					name: 'Plasma Mine',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Arc Mines deal increased damage to enemy shields. +50% Bonus Damage to Shields.'
				}],
				[{
					name: 'Riding the Rail',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/55/Upr_h8-ms_custom_railgun_icon.png/revision/latest?cb=20160302213846',
					description: 'Decreases the time required to fully charge Toby\'s Railgun. -20% Charging Time.'
				}, {
					name: 'Self Destruct Sequence',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/55/Upr_h8-ms_custom_railgun_icon.png/revision/latest?cb=20160302213846',
					description: 'On death, Toby\'s mech explodes, dealing damage to nearby enemies. +500 Damage.'
				}, {
					name: 'Heartpiercer',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/5/55/Upr_h8-ms_custom_railgun_icon.png/revision/latest?cb=20160302213846',
					description: 'Fully charged Railgun shots penetrate walls, objects in the world, and enemies.'
				}],
				[{
					name: 'Room for Improvement',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Enlarges Force Field\'s effective range. +50% Force Field Radius.'
				}, {
					name: 'Room for Mistakes',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/1/17/Force_field_icon.png/revision/latest?cb=20160302214236',
					description: 'Increases each Force Field\'s total health. +100% Force Field Health.'
				}],
				[{
					name: 'What\'s Mine is Yours',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Increases the range that Arc Mines can deal damage. +50% Area of Effect Radius.'
				}, {
					name: 'Mines, Mines, Mines!',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Reduces the cooldown of Arc Mine. -20% Cooldown Time.'
				}, {
					name: 'Primed Catalyzers',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/6/66/Arc_mine_icon.png/revision/latest?cb=20160302214019',
					description: 'Increases Arc Mine\'s base damage. +15% Damage.'
				}],
				[{
					name: 'Triple Charge',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9a/Core_discharge_icon.png/revision/latest?cb=20160302214125',
					description: 'Rather than a single focused beam, Core Discharge charges up three blasts firing one after the other, dealing 250 damage per blast.'
				}, {
					name: 'Endangering Species',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/9/9a/Core_discharge_icon.png/revision/latest?cb=20160302214125',
					description: 'Enemies damaged by Core Discharge blasts are slowed. +3 Second Slow Duration.'
				}],
			]
		},
		'Whiskey Foxtrot': {
			name: 'Whiskey Foxtrot',
			icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/a7/Whiskey_Foxtrot_-_Icon.png/revision/latest?cb=20160408095343',
			choices: [
				[{
					name: 'Weighed Down',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'If an enemy is stuck with a Sticky Bomb, they are slowed. +3 Seconds Slow Duration.'
				}, {
					name: 'Shield Scrapper',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Scrap Cannon does additional damage to shields. +50% Bonus Damage to Shields.'
				}, {
					name: 'Flak Off',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Scrap Cannon now pushes back enemies.'
				}],	
				[{
					name: 'Swiss Cheese',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Enemies hit by Scrap Cannon are revealed and take increased damage from Whiskey Foxtrot\'s Tactical Rifle. +15% Damage for 4 Seconds.'
				}, {
					name: 'Scrap Bank',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Enables Scrap Cannon to store 2 additional charges that can be fired without cooldown. +2 Scrap Charges.'
				}],
				[{
					name: 'Red Dot Sight',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/UPR-SL3_Tactical_Rifle.png/revision/latest?cb=20160408002009',
					description: 'Fits the Tactical Rifle with a Red Dot Sight, removes movement speed penalty while zoomed, and increases zoomed fire rate. +30% Scoped Movement Speed.'
				}, {
					name: 'Scoped Up',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/UPR-SL3_Tactical_Rifle.png/revision/latest?cb=20160408002009',
					description: 'Fits the Tactical Rifle with an ACOG Scope, increasing accuracy and zoom distance. +30% Scopes Accuracy.'
				}],
				[{
					name: 'Triple Threat',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Sticky Bomb launches 3 smaller grenades in rapid succession dealing 100 damage each.'
				}, {
					name: 'Sticky MIRV',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Sticky Bomb splits into 3 grenades in flight.'
				}, {
					name: 'Stick \'n\' Sap',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'When stuck to an enemy, Sticky Bomb grenades drain shields and health. Up to +216 Damage over 3 Seconds, +50% Bonus Damage to Shields.'
				}],
				[{
					name: 'Reload Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/01/Combat_Rhythm.png/revision/latest?cb=20160408002007',
					description: 'Kills grant increased reload speed for 10 seconds. +35% Reload Speed.'
				}, {
					name: 'Killer Regen',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/01/Combat_Rhythm.png/revision/latest?cb=20160408002007',
					description: 'Gain health regeneration for a short time after each kill. +220 Health Regeneration over 10 Seconds.'
				}, {
					name: 'Speed Burst',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/0/01/Combat_Rhythm.png/revision/latest?cb=20160408002007',
					description: 'Kills grants increased movement speed for 10 seconds. +20% Movement Speed.'
				}],
				[{
					name: 'Flack Back',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Scrap Cannon propels Whiskey Foxtrot backwards when fired.'
				}, {
					name: 'Napalm',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Sticky Bomb grenades burn the ground where they detonate. Up to 520 Damage over 6 Seconds.'
				}, {
					name: 'Sticky Speed',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Increases Sticky Bomb launch speed. +40% Grenade Speed.'
				}],
				[{
					name: 'Duct-taped Mags',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/UPR-SL3_Tactical_Rifle.png/revision/latest?cb=20160408002009',
					description: 'Fits the Tactical Rifle with 2 taped clips causing every other reload to be faster than normal. +60% Reload Speed.'
				}, {
					name: 'Shield Pen',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/UPR-SL3_Tactical_Rifle.png/revision/latest?cb=20160408002009',
					description: 'Normal Tactical Rifle shots penetrate enemy shields. +25% Shield Penetration.'
				}, {
					name: 'When Three Just Isn\'t Enough',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/2/28/UPR-SL3_Tactical_Rifle.png/revision/latest?cb=20160408002009',
					description: 'The Tactical Rifle fires in four-shot bursts.'
				}],
				[{
					name: 'Spread Shot',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Increases the spread and density of Scrap Cannon shots. +30% Flak.'
				}, {
					name: 'Long-Distance Flak',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/3/35/Scrap_Cannon.png/revision/latest?cb=20160408002008',
					description: 'Increases Scrap Cannon range and tightens its spread. +30% Range.'
				}],
				[{
					name: 'Swift Stickies',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Reduces Sticky Bomb cooldown time. -25% Cooldown Time.'
				}, {
					name: 'Stronger Stickies',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/7/74/Sticky_Bomb.png/revision/latest?cb=20160408002008',
					description: 'Increases Sticky Bomb damage. +15% Damage.'
				}],
				[{
					name: 'What Shields?',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ab/Overdrive.png/revision/latest?cb=20160408002007',
					description: 'Overdrive bullets bypass enemy shields entirely. +100% Shield Penetration.'
				}, {
					name: 'Overoverdrive',
					icon: 'https://vignette.wikia.nocookie.net/battleborn/images/a/ab/Overdrive.png/revision/latest?cb=20160408002007',
					description: 'Increases Overdrive magazine size to 100 rounds. +25 Clip Size.'
				}],
			]
		}
	},
	
	init: function() {
		this.preparePage();
		this.buildHeroesList();
	},
	
	onPageReady: function() {
		this.applyUrlParams();
	},
	
	setCookie: function(value) {
		var date = new Date();
		date.setTime(date.getTime() + (3650 * 24 * 60 * 60 * 1000));
		var expires = "expires=" + date.toUTCString();
		document.cookie = this.config.cookieName + "=" + value + "; " + expires;
	},
	
	getCookie: function() {
		var cookies = document.cookie.split(';');
		for(var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			while(cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1);
			}
			if(cookie.indexOf(this.config.cookieName) === 0) {
				return cookie.substring(this.config.cookieName.length + 1, cookie.length);
			}
		}
		return false;
	},
	
	preparePage: function() {
		this.config.appendTo.empty();
		this.config.appendTo.attr('style', '');
		this.config.appendTo.append('<div class="intro"><h1 class="intro-header">' + this.config.introHeader + '</h1>' + this.config.introText + '</div><div class="hero-selector"></div><div class="hero-chosen" style="display: none;"><h2 class="name"></h2><div class="helix-share helix-share-top"><a class="permalink">' + this.config.share.permalink + '</a><br><a class="facebook"><img src=' + this.config.share.facebookImage + '"></a><a class="twitter"><img src=' + this.config.share.twitterImage + '"></a></div><div class="choices clearfix"></div><div class="helix-share helix-share-bottom"><a class="permalink">' + this.config.share.permalink + '</a><br><a class="facebook"><img src=' + this.config.share.facebookImage + '"></a><a class="twitter"><img src=' + this.config.share.twitterImage + '"></a></div></div>');
	},
	
	buildHeroesList: function() {
		var heroSelector = $('.hero-selector', this.config.appendTo);
		$.each(this.heroes, function(index, value) {
			var html = '<img class="hero-icon" data-hero="' + value.name + '" src="' + value.icon + '">';
			heroSelector.append(html);
		});
		this.addHeroEventHandlers();
	},
	
	addHeroEventHandlers: function() {
		var builderClass = this;
		var heroIcon = $('.hero-icon', this.config.appendTo);
		$(heroIcon).on('click', function() {
			var hero = $(this).attr('data-hero');
			builderClass.heroSelected(hero, this);
		});
		this.onPageReady();
	},
	
	applyUrlParams: function() {
		var hero = decodeURI(mw.util.getParamValue('hero'));
		var choices = decodeURI(mw.util.getParamValue('choices'));
		if(choices) {
			choices = choices.split(',');
		}
		this.loadChoices(hero, choices, false);
	},
	
	loadChoices: function(hero, choices, skipHeroSelection) {
		if(hero && !skipHeroSelection) {
			$('.hero-icon[data-hero="' + hero + '"]', this.config.appendTo).click();
		}
		
		if((hero && choices) || (choices && skipHeroSelection)) {
			var builderClass = this;
			$.each(choices, function(index, value) {
				var row = $('.hero-row[data-index="' + index + '"]', builderClass.config.appendTo);
				$('.choice', row).removeClass('selected');
				$('.choice[data-choice="' + value + '"]', row).addClass('selected');
			});
		}
	},
	
	heroSelected: function(heroName, element) {
		var hero = this.heroes[heroName];
		var heroChosen = $('.hero-chosen', this.config.appendTo);
		var heroChoices = $('.choices', heroChosen);
		
		$('.hero-selector .hero-icon', this.config.appendTo).removeClass('selected');
		$(element).addClass('selected');	
		
		heroChoices.empty();
		heroChosen.attr('data-hero', hero.name);
		$('.name', heroChosen).text(hero.name);
		
		$.each(hero.choices, function(index, value) {
			var humanIndex = index + 1;
			var row = $('<div data-index="' + index + '" class="hero-row"><div class="index">' + humanIndex + '</div></div>');
			$(row).addClass('column-size-' + value.length);
			$(heroChoices).append(row);
			$.each(value, function(index, value) {
				$(row).append('<div class="choice" data-choice="' + index + '"><img class="icon" src="' + value.icon + '"><div class="name">' + value.name + '</div><div class="description">' + value.description + '</div></div>');
			});
		});
		this.addHelixEventHandlers();
		this.loadCookieData(hero.name);
		this.updateShareLinks();
		$(heroChosen).show();
	},
	
	addHelixEventHandlers: function() {
		var builderClass = this;
		$('.hero-chosen .choice', this.config.appendTo).on('click', function() {
			builderClass.helixSelected(this);
		});
	},
	
	helixSelected: function(helix) {
		var row = $(helix).closest('.hero-row');
		$('.choice', row).removeClass('selected');
		$(helix).addClass('selected');
		
		this.updateShareLinks();
				
		var hero = this.getActiveHero();
		var rowIndex = row.attr('data-index');
		var choiceNumber = $(helix).attr('data-choice');
		this.saveChoice(hero, rowIndex, choiceNumber);
	},
	
	saveChoice: function(hero, row, choice) {
		var cookie = this.getCookie();
		if(cookie) {
			var json = JSON.parse(cookie);
			if(typeof json[hero] === 'undefined') {
				json[hero] = [];
			}
			json[hero][row] = choice;
			this.setCookie(JSON.stringify(json));
		}
		else {
			var value = {};
			var choices = [];
			choices[row] = choice;
			value[hero] = choices;
			this.setCookie(JSON.stringify(value));
		}
	},
	
	getChoices: function(hero) {
		var cookie = this.getCookie();
		if(!cookie) {
			return false;
		}
		else {
			var json = JSON.parse(cookie);
			return json[hero];
		}
	},
	
	loadCookieData: function(hero) {
		var choices = this.getChoices(hero);
		if(!choices) {
			return false;
		}

		this.loadChoices(hero, choices, true);
	},
	
	getActiveHero: function() {
		var hero = $('.hero-chosen', this.config.appendTo).attr('data-hero');
		return hero;
	},
	
	generateShareUrl: function() {
		var hero = encodeURI(this.getActiveHero());
		var choicesArray = [];
		$('.hero-row .selected', this.config.appendTo).each(function() {
			var row = $(this).closest('.hero-row').attr('data-index');
			choicesArray[row] = $(this).attr('data-choice');
		});
		var url = wgServer + wgArticlePath.replace('$1', mw.config.get('wgPageName')) + '?hero=' + hero + '&choices=' + choicesArray.toString();
		return url;
	},
	
	updateShareLinks: function() {
		var share = $('.helix-share', this.config.appendTo);
		var shareUrl = this.generateShareUrl();
		var shareUrlEncoded = encodeURIComponent(shareUrl);
		var hero = this.getActiveHero();
		$('.permalink', share).attr('href', shareUrl);
		
		var facebookShareHeader = encodeURI(this.config.share.facebookShareHeader.replace('$1', hero));
		var facebookShareText =  encodeURI(this.config.share.facebookShareText.replace('$1', hero));
		var facebookURL = 'https://www.facebook.com/dialog/feed?display=popup&app_id=112328095453510&link=' + shareUrlEncoded + '&picture=' + this.config.share.facebookShareImage + '&name=' + facebookShareHeader + '&description=' + facebookShareText + '&redirect_uri=' + shareUrlEncoded;
		$('.facebook', share).attr('href', facebookURL);
		
		var twitterShareText = encodeURI(this.config.share.twitterShareText.replace('$1', hero));
		var twitterURL = 'https://twitter.com/intent/tweet?url=' + shareUrlEncoded + '&via=' + this.config.share.twitterShareVia + '&text=' + twitterShareText
		$('.twitter', share).attr('href', twitterURL);
	}
};

$(function() {
	if($.inArray(mw.config.get('wgPageName'), helix.config.initOn) > -1) {
		helix.init();
	}
});