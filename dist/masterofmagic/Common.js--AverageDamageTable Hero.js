// Read the hero's various abilities from hidden HTML spans.
var Melee = parseInt(document.getElementById('Melee').innerHTML) || 0;
var MeleeToHit = parseInt(document.getElementById('MeleeToHit').innerHTML) || 0;
var RangedMissile = parseInt(document.getElementById('RangedMissile').innerHTML) || 0;
var RangedMagic = parseInt(document.getElementById('RangedMagic').innerHTML) || 0;
var RangedToHit = parseInt(document.getElementById('RangedToHit').innerHTML) || 0;
var Thrown = parseInt(document.getElementById('Thrown').innerHTML) || 0;
var ThrownToHit = parseInt(document.getElementById('ThrownToHit').innerHTML) || 0;
var Breath = parseInt(document.getElementById('Breath').innerHTML) || 0;
var BreathToHit = parseInt(document.getElementById('BreathToHit').innerHTML) || 0;
var StaticAbilities = new Array();
StaticAbilities[0] = (document.getElementById('Static1').innerHTML).toLowerCase();
StaticAbilities[1] = (document.getElementById('Static2').innerHTML).toLowerCase();
StaticAbilities[2] = (document.getElementById('Static3').innerHTML).toLowerCase();
StaticAbilities[3] = (document.getElementById('Static4').innerHTML).toLowerCase();
StaticAbilities[4] = (document.getElementById('Static5').innerHTML).toLowerCase();
StaticAbilities[5] = (document.getElementById('Static6').innerHTML).toLowerCase();
StaticAbilities[6] = (document.getElementById('Static7').innerHTML).toLowerCase();
StaticAbilities[7] = (document.getElementById('Static8').innerHTML).toLowerCase();
StaticAbilities[8] = (document.getElementById('Static9').innerHTML).toLowerCase();
StaticAbilities[9] = (document.getElementById('Static10').innerHTML).toLowerCase();
var RandomAny = parseInt(document.getElementById('RandomAny').innerHTML) || 0;
var RandomFighter = parseInt(document.getElementById('RandomFighter').innerHTML) || 0;
var RandomMage = parseInt(document.getElementById('RandomMage').innerHTML) || 0;

////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////

// This function updates the appropriate spans to insert checkboxes. These are not allowed in normal Wikia source, so they must be inserted via Javascript.
function CreateAbilityList()
{
	// Get empty placeholder spans from original document.
	var ArcanePowerSpan = document.getElementById('AvgDamageTable_Random_ArcanePowerBox');
	var SuperArcanePowerSpan = document.getElementById('AvgDamageTable_Random_SuperArcanePowerBox');
	var BlademasterSpan = document.getElementById('AvgDamageTable_Random_BlademasterBox');
	var SuperBlademasterSpan = document.getElementById('AvgDamageTable_Random_SuperBlademasterBox');
	var LeadershipSpan = document.getElementById('AvgDamageTable_Random_LeadershipBox');
	var SuperLeadershipSpan = document.getElementById('AvgDamageTable_Random_SuperLeadershipBox');
	var LuckySpan = document.getElementById('AvgDamageTable_Random_LuckyBox');
	var MightSpan = document.getElementById('AvgDamageTable_Random_MightBox');
	var SuperMightSpan = document.getElementById('AvgDamageTable_Random_SuperMightBox');
	
	// Get label spans from original document.
	var ArcanePowerLabelSpan = document.getElementById('AvgDamageTable_Random_ArcanePowerLabel');
	var SuperArcanePowerLabelSpan = document.getElementById('AvgDamageTable_Random_SuperArcanePowerLabel');
	var BlademasterLabelSpan = document.getElementById('AvgDamageTable_Random_BlademasterLabel');
	var SuperBlademasterLabelSpan = document.getElementById('AvgDamageTable_Random_SuperBlademasterLabel');
	var LeadershipLabelSpan = document.getElementById('AvgDamageTable_Random_LeadershipLabel');
	var SuperLeadershipLabelSpan = document.getElementById('AvgDamageTable_Random_SuperLeadershipLabel');
	var LuckyLabelSpan = document.getElementById('AvgDamageTable_Random_LuckyLabel');
	var MightLabelSpan = document.getElementById('AvgDamageTable_Random_MightLabel');
	var SuperMightLabelSpan = document.getElementById('AvgDamageTable_Random_SuperMightLabel');
	
	ArcanePowerSpan.style.display='table-cell';
	SuperArcanePowerSpan.style.display='table-cell';
	BlademasterSpan.style.display='table-cell';
	SuperBlademasterSpan.style.display='table-cell';
	LeadershipSpan.style.display='table-cell';
	SuperLeadershipSpan.style.display='table-cell';
	LuckySpan.style.display='table-cell';
	MightSpan.style.display='table-cell';
	SuperMightSpan.style.display='table-cell';
	
	// Create checkboxes inside each span.
	ArcanePowerSpan.innerHTML = '<INPUT type="checkbox" id="ArcanePowerBox" onClick="UpdateAll();" >';
	SuperArcanePowerSpan.innerHTML = '<INPUT type="checkbox" id="SuperArcanePowerBox" onClick="UpdateAll();" >';
	BlademasterSpan.innerHTML = '<INPUT type="checkbox" id="BlademasterBox" onClick="UpdateAll();" >';
	SuperBlademasterSpan.innerHTML = '<INPUT type="checkbox" id="SuperBlademasterBox" onClick="UpdateAll();" >';
	LeadershipSpan.innerHTML = '<INPUT type="checkbox" id="LeadershipBox" onClick="UpdateAll();" >';
	SuperLeadershipSpan.innerHTML = '<INPUT type="checkbox" id="SuperLeadershipBox" onClick="UpdateAll();" >';
	LuckySpan.innerHTML = '<INPUT type="checkbox" id="LuckyBox" onClick="UpdateAll();" >';
	MightSpan.innerHTML = '<INPUT type="checkbox" id="MightBox" onClick="UpdateAll();" >';
	SuperMightSpan.innerHTML = '<INPUT type="checkbox" id="SuperMightBox" onClick="UpdateAll();" >';
	
	// Get checkbox objects
	var ArcanePowerBox = document.getElementById('ArcanePowerBox');
	var SuperArcanePowerBox = document.getElementById('SuperArcanePowerBox');
	var BlademasterBox = document.getElementById('BlademasterBox');
	var SuperBlademasterBox = document.getElementById('SuperBlademasterBox');
	var LeadershipBox = document.getElementById('LeadershipBox');
	var SuperLeadershipBox = document.getElementById('SuperLeadershipBox');
	var LuckyBox = document.getElementById('LuckyBox');
	var MightBox = document.getElementById('MightBox');
	var SuperMightBox = document.getElementById('SuperMightBox');
	
	// Test default abilities to see which checkboxes should be enabled.
	var HasDefaultArcanePower = false;
	var HasDefaultSuperArcanePower = false;
	var HasDefaultBlademaster = false;
	var HasDefaultSuperBlademaster = false;
	var HasDefaultLeadership = false;
	var HasDefaultSuperLeadership = false;
	var HasDefaultLucky	= false;
	var HasDefaultMight = false;
	var HasDefaultSuperMight = false;
	
	for (var x = 0; x < 10; x++)
	{
		if (StaticAbilities[x] == 'arcane power')
		{
			if (HasDefaultArcanePower)
			{
				HasDefaultSuperArcanePower = true;
			}
			else
			{
				HasDefaultArcanePower = true;
			}
		}
		else if (StaticAbilities[x] == 'blademaster')
		{
			if (HasDefaultBlademaster)
			{
				HasDefaultSuperBlademaster = true;
			}
			else
			{
				HasDefaultBlademaster = true;
			}
		}
		else if (StaticAbilities[x] == 'leadership')
		{
			if (HasDefaultLeadership)
			{
				HasDefaultSuperLeadership = true;
			}
			else
			{
				HasDefaultLeadership = true;
			}
		}		
		else if (StaticAbilities[x] == 'lucky')
		{
			HasDefaultLucky = true;
		}
		else if (StaticAbilities[x] == 'might')
		{
			if (HasDefaultMight)
			{
				HasDefaultSuperMight = true;
			}
			else
			{
				HasDefaultMight = true;
			}
		}
	}
	
	// Set the checkboxes accordingly.
	if (HasDefaultArcanePower)
	{
		ArcanePowerBox.checked = true;
		ArcanePowerSpan.style.display = 'none';
		ArcanePowerLabelSpan.style.display = 'none';
		if (HasDefaultSuperArcanePower)
		{
			SuperArcanePowerBox.checked = true;
			SuperArcanePowerSpan.style.display='none';
			SuperArcanePowerLabelSpan.style.display='none';
		}
		else if (RandomAny + RandomMage == 0)
		{
			SuperArcanePowerBox.checked = false;
			SuperArcanePowerSpan.style.display = 'none';
			SuperArcanePowerLabelSpan.style.display = 'none';
		}
	}
	else
	{
		if (RandomAny + RandomMage == 0)
		{
			ArcanePowerBox.checked = false;
			ArcanePowerSpan.style.display = 'none';
			ArcanePowerLabelSpan.style.display = 'none';
			SuperArcanePowerBox.checked = false;
			SuperArcanePowerSpan.style.display = 'none';
			SuperArcanePowerLabelSpan.style.display = 'none';
		}
		else if (RandomAny + RandomMage < 2)
		{
			SuperArcanePowerBox.checked = false;
			SuperArcanePowerSpan.style.display = 'none';
			SuperArcanePowerLabelSpan.style.display = 'none';
		}
		else
		{
			SuperArcanePowerBox.checked = false;
			SuperArcanePowerBox.style.display = 'none';
			SuperArcanePowerLabelSpan.style.color = '#888';
		}
	}
		
	if (HasDefaultBlademaster)
	{
		BlademasterBox.checked = true;
		BlademasterSpan.style.display = 'none';
		BlademasterLabelSpan.style.display = 'none';
		if (HasDefaultSuperBlademaster)
		{
			SuperBlademasterBox.checked = true;
			SuperBlademasterSpan.style.display='none';
			SuperBlademasterLabelSpan.style.display='none';
		}
		else if (RandomAny + RandomFighter == 0)
		{
			SuperBlademasterBox.checked = false;
			SuperBlademasterSpan.style.display = 'none';
			SuperBlademasterLabelSpan.style.display = 'none';
		}
	}
	else
	{
		if (RandomAny + RandomFighter == 0)
		{
			BlademasterBox.checked = false;
			BlademasterSpan.style.display = 'none';
			BlademasterLabelSpan.style.display = 'none';
			SuperBlademasterBox.checked = false;
			SuperBlademasterSpan.style.display = 'none';
			SuperBlademasterLabelSpan.style.display = 'none';
		}
		else if (RandomAny + RandomFighter < 2)
		{
			SuperBlademasterBox.checked = false;
			SuperBlademasterSpan.style.display = 'none';
			SuperBlademasterLabelSpan.style.display = 'none';
		}
		else
		{
			SuperBlademasterBox.checked = false;
			SuperBlademasterBox.style.display = 'none';
			SuperBlademasterLabelSpan.style.color = '#888';
		}
	}

	if (HasDefaultLeadership)
	{
		LeadershipBox.checked = true;
		LeadershipSpan.style.display = 'none';
		LeadershipLabelSpan.style.display = 'none';
		if (HasDefaultSuperLeadership)
		{
			SuperLeadershipBox.checked = true;
			SuperLeadershipSpan.style.display='none';
			SuperLeadershipLabelSpan.style.display='none';
		}
		else if (RandomAny + RandomFighter == 0)
		{
			SuperLeadershipBox.checked = false;
			SuperLeadershipSpan.style.display = 'none';
			SuperLeadershipLabelSpan.style.display = 'none';
		}
	}
	else
	{
		if (RandomAny + RandomFighter == 0)
		{
			LeadershipBox.checked = false;
			LeadershipSpan.style.display = 'none';
			LeadershipLabelSpan.style.display = 'none';
			SuperLeadershipBox.checked = false;
			SuperLeadershipSpan.style.display = 'none';
			SuperLeadershipLabelSpan.style.display = 'none';
		}
		else if (RandomAny + RandomFighter < 2)
		{
			SuperLeadershipBox.checked = false;
			SuperLeadershipSpan.style.display = 'none';
			SuperLeadershipLabelSpan.style.display = 'none';
		}
		else
		{
			SuperLeadershipBox.checked = false;
			SuperLeadershipBox.style.display = 'none';
			SuperLeadershipLabelSpan.style.color = '#888';
		}
	}
	
	if (HasDefaultLucky)
	{
		LuckyBox.checked = true;
		LuckySpan.style.display = 'none';
		LuckyLabelSpan.style.display = 'none';
	}
	else if (RandomAny + RandomFighter + RandomMage == 0)
	{
		LuckyBox.checked = false;
		LuckySpan.style.display = 'none';
		LuckyLabelSpan.style.display = 'none';
	}	
	
	if (HasDefaultMight)
	{
		MightBox.checked = true;
		MightSpan.style.display = 'none';
		MightLabelSpan.style.display = 'none';
		if (HasDefaultSuperMight)
		{
			SuperMightBox.checked = true;
			SuperMightSpan.style.display='none';
			SuperMightLabelSpan.style.display='none';
		}
		else if (RandomAny + RandomFighter == 0)
		{
			SuperMightBox.checked = false;
			SuperMightSpan.style.display = 'none';
			SuperMightLabelSpan.style.display = 'none';
		}
	}
	else
	{
		if (RandomAny + RandomFighter == 0)
		{
			MightBox.checked = false;
			MightSpan.style.display = 'none';
			MightLabelSpan.style.display = 'none';
			SuperMightBox.checked = false;
			SuperMightSpan.style.display = 'none';
			SuperMightLabelSpan.style.display = 'none';
		}
		else if (RandomAny + RandomFighter < 2)
		{
			SuperMightBox.checked = false;
			SuperMightSpan.style.display = 'none';
			SuperMightLabelSpan.style.display = 'none';
		}
		else
		{
			SuperMightBox.checked = false;
			SuperMightBox.style.display = 'none';
			SuperMightLabelSpan.style.color = '#888';
		}
	}
}

function AbilityCount( AbilityNum )
{
	var AbilityCount = 0;
	if (AbilityNum == 2)
	{
		var ArcanePowerBox = document.getElementById('ArcanePowerBox');
		var SuperArcanePowerBox = document.getElementById('SuperArcanePowerBox');
		if (ArcanePowerBox.checked)
		{
			AbilityCount++;
		}
		if (SuperArcanePowerBox.checked)
		{
			AbilityCount++;
		}
	}
	else if (AbilityNum == 4)
	{
		var BlademasterBox = document.getElementById('BlademasterBox');
		var SuperBlademasterBox = document.getElementById('SuperBlademasterBox');
		if (BlademasterBox.checked)
		{
			AbilityCount++;
		}
		if (SuperBlademasterBox.checked)
		{
			AbilityCount++;
		}
	}
	else if (AbilityNum == 7)
	{
		var LeadershipBox = document.getElementById('LeadershipBox');
		var SuperLeadershipBox = document.getElementById('SuperLeadershipBox');
		if (LeadershipBox.checked)
		{
			AbilityCount++;
		}
		if (SuperLeadershipBox.checked)
		{
			AbilityCount++;
		}
	}		
	else if (AbilityNum == 10)
	{
		var LuckyBox = document.getElementById('LuckyBox');
		if (LuckyBox.checked)
		{
			AbilityCount++;
		}
	}	
	else if (AbilityNum == 11)
	{
		var MightBox = document.getElementById('MightBox');
		var SuperMightBox = document.getElementById('SuperMightBox');
		if (MightBox.checked)
		{
			AbilityCount++;
		}
		if (SuperMightBox.checked)
		{
			AbilityCount++;
		}
	}		
	
	return (AbilityCount);
}

function UpdateTable()
{
	// We start by determining which attack modes are available to this hero.
	var HasMelee = false;
	var HasRanged = false;
	var HasThrown = false;
	var HasBreath = false;
	
	if (Melee && MeleeToHit)
	{
		HasMelee = true;
	}
	if ((RangedMissile || RangedMagic) && RangedToHit)
	{
		HasRanged = true;
	}
	if (Thrown && ThrownToHit)
	{
		HasThrown = true;
	}
	if (Breath && BreathToHit)
	{
		HasBreath = true;
	}
	
	// Now show/hide the columns that are not available.
	var curCell = document.getElementById('avgdmg_melee_header');
	if (!HasMelee)
	{
		curCell.style.display = 'none';
	}
	else
	{
		curCell.style.display = 'table-cell';
	}
	
	var curCell = document.getElementById('avgdmg_ranged_header');
	if (!HasRanged)
	{
		curCell.style.display = 'none';
	}
	else
	{
		curCell.style.display = 'table-cell';
	}
	
	var curCell = document.getElementById('avgdmg_thrown_header');
	if (!HasThrown)
	{
		curCell.style.display = 'none';
	}
	else
	{
		curCell.style.display = 'table-cell';
	}
	
	var curCell = document.getElementById('avgdmg_breath_header');
	if (!HasBreath)
	{
		curCell.style.display = 'none';
	}
	else
	{
		curCell.style.display = 'table-cell';
	}
	
	for (x = 0; x <= 8; x++)
	{		
		var curCell = document.getElementById('avgdmg_melee_'+x);
		if (!HasMelee)
		{
			curCell.style.display = 'none';
		}
		else
		{
			curCell.style.display = 'table-cell';
		}
		
		var curCell = document.getElementById('avgdmg_ranged_'+x);
		if (!HasRanged)
		{
			curCell.style.display = 'none';
		}
		else
		{
			curCell.style.display = 'table-cell';
		}
		
		var curCell = document.getElementById('avgdmg_thrown_'+x);
		if (!HasThrown)
		{
			curCell.style.display = 'none';
		}
		else
		{
			curCell.style.display = 'table-cell';
		}
		
		var curCell = document.getElementById('avgdmg_breath_'+x);
		if (!HasBreath)
		{
			curCell.style.display = 'none';
		}
		else
		{
			curCell.style.display = 'table-cell';
		}
	}
	
	////////////////////////////////////////////////////////
	// CALCULATE VALUES
	// This section calculates the values of each attack at each level.
	////////////////////////////////////////////////////////
	var BasicLevelBonus = 0;
	var BasicLevelToHitBonus = 0;
	var AbilityBonus = 0;
	var AbilityToHitBonus = 0;
	var TotalStrength = 0;
	var TotalToHit = 0;
	var DamageVal = 0;
	var Damage = '';
	
	////////////// Melee Attack /////////////////
	if (HasMelee)
	{
		for (var curLevel = 0; curLevel <= 8; curLevel++)
		{
			BasicLevelBonus = curLevel;
			BasicLevelToHitBonus = 10 * (Math.floor((curLevel+1) / 3));
			AbilityBonus = 0;
			AbilityToHitBonus = 0;
			
			var BlademasterBonus = 0;
			var Blademaster = AbilityCount(4);
			if (Blademaster >= 1)
			{
				BlademasterBonus = (curLevel+1) * 0.5;
			}
			if (Blademaster == 2)
			{
				BlademasterBonus = BlademasterBonus * 1.5;
			}
			BlademasterBonus = Math.floor(BlademasterBonus) * 10;
			
			var LeadershipBonus = 0;
			var Leadership = AbilityCount(7);
			if (Leadership == 1)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 3);
			}
			if (Leadership == 2)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 2);
			}			
			
			var LuckyBonus = 0;
			if (AbilityCount(10) == 1)
			{
				LuckyBonus = 10; 
			}
			
			var MightBonus = 0;
			var Might = AbilityCount(11);
			if (Might >= 1)
			{
				MightBonus = (curLevel+1);
			}
			if (Might == 2)
			{
				MightBonus = Math.floor(MightBonus * 1.5);
			}
			
			AbilityBonus = LeadershipBonus + MightBonus;
			AbilityToHitBonus = BlademasterBonus + LuckyBonus;
			
			TotalStrength = Melee + BasicLevelBonus + AbilityBonus;
			TotalToHit = Math.min(100, MeleeToHit + BasicLevelToHitBonus + AbilityToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_melee_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
	
	////////////// Ranged Attack /////////////////
	if (HasRanged)
	{
		for (var curLevel = 0; curLevel <= 8; curLevel++)
		{
			BasicLevelBonus = curLevel;
			BasicLevelToHitBonus = 10 * (Math.floor((curLevel+1) / 3));
			AbilityBonus = 0;
			AbilityToHitBonus = 0;
			
			var ArcanePowerBonus = 0;
			if (RangedMagic)
			{
				var ArcanePower = AbilityCount(2);
				if (ArcanePower >= 1)
				{
					ArcanePowerBonus = (curLevel+1);
				}
				if (ArcanePower == 2)
				{
					ArcanePowerBonus = Math.floor(ArcanePowerBonus * 1.5);
				}
			}
			
			var BlademasterBonus = 0;
			var Blademaster = AbilityCount(4);
			if (Blademaster >= 1)
			{
				BlademasterBonus = (curLevel+1) * 0.5;
			}
			if (Blademaster == 2)
			{
				BlademasterBonus = BlademasterBonus * 1.5;
			}
			BlademasterBonus = Math.floor(BlademasterBonus) * 10;	

			var LeadershipBonus = 0;
			if (RangedMissile)
			{
				var Leadership = AbilityCount(7);			
				if (Leadership == 1)
				{
					LeadershipBonus = Math.floor((curLevel+1) / 3);
				}
				if (Leadership == 2)
				{
					LeadershipBonus = Math.floor((curLevel+1) / 2);
				}
				LeadershipBonus = Math.floor(LeadershipBonus / 2);
			}
			
			var LuckyBonus = 0;
			if (AbilityCount(10) == 1)
			{
				LuckyBonus = 10; 
			}
			
			var Ranged = 0;
			if (RangedMissile)
			{
				Ranged = RangedMissile;
			}
			else if (RangedMagic)
			{
				Ranged = RangedMagic;
			}
			
			AbilityBonus = ArcanePowerBonus + LeadershipBonus;
			AbilityToHitBonus = BlademasterBonus + LuckyBonus;
			
			TotalStrength = Ranged + BasicLevelBonus + AbilityBonus;
			TotalToHit = Math.min(100, RangedToHit + BasicLevelToHitBonus + AbilityToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_ranged_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}	
		
	}
	
	////////////// Thrown Attack /////////////////
	if (HasThrown)
	{
		for (var curLevel = 0; curLevel <= 8; curLevel++)
		{
			BasicLevelBonus = curLevel;
			BasicLevelToHitBonus = 10 * (Math.floor((curLevel+1) / 3));
			AbilityBonus = 0;
			AbilityToHitBonus = 0;

			var BlademasterBonus = 0;
			var Blademaster = AbilityCount(4);
			if (Blademaster >= 1)
			{
				BlademasterBonus = (curLevel+1) * 0.5;
			}
			if (Blademaster == 2)
			{
				BlademasterBonus = BlademasterBonus * 1.5;
			}
			BlademasterBonus = Math.floor(BlademasterBonus) * 10;

			var LeadershipBonus = 0;
			var Leadership = AbilityCount(7);			
			if (Leadership == 1)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 3);
			}
			if (Leadership == 2)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 2);
			}
			LeadershipBonus = Math.floor(LeadershipBonus / 2);

			var LuckyBonus = 0;
			if (AbilityCount(10) == 1)
			{
				LuckyBonus = 10; 
			}
			
			AbilityBonus = LeadershipBonus;
			AbilityToHitBonus = BlademasterBonus + LuckyBonus;
			
			TotalStrength = Thrown + BasicLevelBonus + AbilityBonus;
			TotalToHit = Math.min(100, ThrownToHit + BasicLevelToHitBonus + AbilityToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_thrown_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
	
	////////////// Breath Attack /////////////////
	if (HasBreath)
	{
		for (var curLevel = 0; curLevel <= 8; curLevel++)
		{
			BasicLevelBonus = curLevel;
			BasicLevelToHitBonus = 10 * (Math.floor((curLevel+1) / 3));
			AbilityBonus = 0;
			AbilityToHitBonus = 0;

			var BlademasterBonus = 0;
			var Blademaster = AbilityCount(4);
			if (Blademaster >= 1)
			{
				BlademasterBonus = (curLevel+1) * 0.5;
			}
			if (Blademaster == 2)
			{
				BlademasterBonus = BlademasterBonus * 1.5;
			}
			BlademasterBonus = Math.floor(BlademasterBonus) * 10;	
			
			var LeadershipBonus = 0;
			var Leadership = AbilityCount(7);			
			if (Leadership == 1)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 3);
			}
			if (Leadership == 2)
			{
				LeadershipBonus = Math.floor((curLevel+1) / 2);
			}
			LeadershipBonus = Math.floor(LeadershipBonus / 2);
			
			var LuckyBonus = 0;
			if (AbilityCount(10) == 1)
			{
				LuckyBonus = 10; 
			}

			AbilityBonus = LeadershipBonus;
			AbilityToHitBonus = BlademasterBonus + LuckyBonus;
			
			TotalStrength = Breath + BasicLevelBonus + AbilityBonus;
			TotalToHit = Math.min(100, BreathToHit + BasicLevelToHitBonus + AbilityToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_breath_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}	
}

function UpdateCheckboxes()
{
	// Get spans objects
	var ArcanePowerSpan = document.getElementById('AvgDamageTable_Random_ArcanePowerBox');
	var SuperArcanePowerSpan = document.getElementById('AvgDamageTable_Random_SuperArcanePowerBox');
	var BlademasterSpan = document.getElementById('AvgDamageTable_Random_BlademasterBox');
	var SuperBlademasterSpan = document.getElementById('AvgDamageTable_Random_SuperBlademasterBox');
	var LeadershipSpan = document.getElementById('AvgDamageTable_Random_LeadershipBox');
	var SuperLeadershipSpan = document.getElementById('AvgDamageTable_Random_SuperLeadershipBox');
	var LuckySpan = document.getElementById('AvgDamageTable_Random_LuckyBox');
	var MightSpan = document.getElementById('AvgDamageTable_Random_MightBox');
	var SuperMightSpan = document.getElementById('AvgDamageTable_Random_SuperMightBox');
	
	// Get label span objects
	var ArcanePowerLabelSpan = document.getElementById('AvgDamageTable_Random_ArcanePowerLabel');
	var SuperArcanePowerLabelSpan = document.getElementById('AvgDamageTable_Random_SuperArcanePowerLabel');
	var BlademasterLabelSpan = document.getElementById('AvgDamageTable_Random_BlademasterLabel');
	var SuperBlademasterLabelSpan = document.getElementById('AvgDamageTable_Random_SuperBlademasterLabel');
	var LeadershipLabelSpan = document.getElementById('AvgDamageTable_Random_LeadershipLabel');
	var SuperLeadershipLabelSpan = document.getElementById('AvgDamageTable_Random_SuperLeadershipLabel');	
	var LuckyLabelSpan = document.getElementById('AvgDamageTable_Random_LuckyLabel');
	var MightLabelSpan = document.getElementById('AvgDamageTable_Random_MightLabel');
	var SuperMightLabelSpan = document.getElementById('AvgDamageTable_Random_SuperMightLabel');

	// Get checkbox objects
	var ArcanePowerBox = document.getElementById('ArcanePowerBox');
	var SuperArcanePowerBox = document.getElementById('SuperArcanePowerBox');
	var BlademasterBox = document.getElementById('BlademasterBox');
	var SuperBlademasterBox = document.getElementById('SuperBlademasterBox');
	var LeadershipBox = document.getElementById('LeadershipBox');
	var SuperLeadershipBox = document.getElementById('SuperLeadershipBox');	
	var LuckyBox = document.getElementById('LuckyBox');
	var MightBox = document.getElementById('MightBox');
	var SuperMightBox = document.getElementById('SuperMightBox');
	
	// Calculate how many picks we're already using.
	var UsedAny = 0;
	var UsedFighter = 0;
	var UsedMage = 0;

	if (ArcanePowerBox.checked && ArcanePowerSpan.style.display != 'none')
	{
		if (UsedMage < RandomMage)
		{
			UsedMage++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (SuperArcanePowerBox.checked && SuperArcanePowerSpan.style.display != 'none')
	{
		if (UsedMage < RandomMage)
		{
			UsedMage++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (BlademasterBox.checked && BlademasterSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (SuperBlademasterBox.checked && SuperBlademasterSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (LeadershipBox.checked && LeadershipSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (SuperLeadershipBox.checked && SuperLeadershipSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}	
	if (LuckyBox.checked && LuckySpan.style.display != 'none')
	{
		if (UsedMage < RandomMage)
		{
			UsedMage++;
		}
		else if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (MightBox.checked && MightSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}
	if (SuperMightBox.checked && SuperMightSpan.style.display != 'none')
	{
		if (UsedFighter < RandomFighter)
		{
			UsedFighter++;
		}
		else
		{
			UsedAny++;
		}
	}	
	
	// Check to see which boxes should be enabled now.
	if (ArcanePowerBox.checked == false)
	{
		if (RandomMage + RandomAny > 0)
		{
			if (UsedMage < RandomMage || UsedAny < RandomAny)
			{
				ArcanePowerBox.style.display = 'inline';
				ArcanePowerLabelSpan.style.color = '';
			}
			else
			{
				ArcanePowerBox.style.display = 'none';
				ArcanePowerLabelSpan.style.color = '#888';
			}
			
			if (RandomMage + RandomAny >= 2)
			{
				SuperArcanePowerBox.checked = false;
				SuperArcanePowerBox.style.display = 'none';
				SuperArcanePowerLabelSpan.style.color = '#888';
			}
		}
		else
		{
			ArcanePowerBox.style.display = 'none';
			ArcanePowerLabelSpan.color = '#888';
			SuperArcanePowerBox.style.display = 'none';
			SuperArcanePowerBox.style.display = 'none';
			SuperArcanePowerLabelSpan.color = '#888';
		}
	}
	else
	{
		if (SuperArcanePowerBox.checked == false)
		{
			if (UsedMage < RandomMage || UsedAny < RandomAny)
			{
				SuperArcanePowerBox.style.display = 'inline';
				SuperArcanePowerLabelSpan.style.color = '';
			}
			else
			{
				SuperArcanePowerBox.style.display = 'none';
				SuperArcanePowerLabelSpan.style.color = '#888';
			}			
		}
	}
	
	if (BlademasterBox.checked == false)
	{
		if (RandomFighter + RandomAny > 0)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				BlademasterBox.style.display = 'inline';
				BlademasterLabelSpan.style.color = '';
			}
			else
			{
				BlademasterBox.style.display = 'none';
				BlademasterLabelSpan.style.color = '#888';
			}
			
			if (RandomFighter + RandomAny >= 2)
			{
				SuperBlademasterBox.checked = false;
				SuperBlademasterBox.style.display = 'none';
				SuperBlademasterLabelSpan.style.color = '#888';
			}
		}
		else
		{
			BlademasterBox.style.display = 'none';
			BlademasterLabelSpan.style.color = '#888';
			SuperBlademasterBox.checked = false;
			SuperBlademasterBox.style.display = 'none';
			SuperBlademasterLabelSpan.style.color = '#888';
		}
	}
	else
	{
		if (SuperBlademasterBox.checked == false)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				SuperBlademasterBox.style.display = 'inline';
				SuperBlademasterLabelSpan.style.color = '';
			}
			else
			{
				SuperBlademasterBox.style.display = 'none';
				SuperBlademasterLabelSpan.style.color = '#888';
			}			
		}
	}	
	
	if (LeadershipBox.checked == false)
	{
		if (RandomFighter + RandomAny > 0)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				LeadershipBox.style.display = 'inline';
				LeadershipLabelSpan.style.color = '';
			}
			else
			{
				LeadershipBox.style.display = 'none';
				LeadershipLabelSpan.style.color = '#888';
			}
			
			if (RandomFighter + RandomAny >= 2)
			{
				SuperLeadershipBox.checked = false;
				SuperLeadershipBox.style.display = 'none';
				SuperLeadershipLabelSpan.style.color = '#888';
			}
		}
		else
		{
			LeadershipBox.style.display = 'none';
			LeadershipLabelSpan.style.color = '#888';
			SuperLeadershipBox.checked = false;
			SuperLeadershipBox.style.display = 'none';
			SuperLeadershipLabelSpan.style.color = '#888';
		}
	}
	else
	{
		if (SuperLeadershipBox.checked == false)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				SuperLeadershipBox.style.display = 'inline';
				SuperLeadershipLabelSpan.style.color = '';
			}
			else
			{
				SuperLeadershipBox.style.display = 'none';
				SuperLeadershipLabelSpan.style.color = '#888';
			}			
		}
	}		
	
	if (LuckyBox.checked == false)
	{
		if (UsedFighter < RandomFighter || UsedMage < RandomMage || UsedAny < RandomAny)
		{
			LuckyBox.style.display = 'inline';
			LuckyLabelSpan.style.color = '';
		}
		else
		{
			LuckyBox.style.display = 'none';
			LuckyLabelSpan.style.color = '#888';
		}
	}

	if (MightBox.checked == false)
	{
		if (RandomFighter + RandomAny > 0)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				MightBox.style.display = 'inline';
				MightLabelSpan.style.color = '';
			}
			else
			{
				MightBox.style.display = 'none';
				MightLabelSpan.style.color = '#888';
			}
			
			if (RandomFighter + RandomAny >= 2)
			{
				SuperMightBox.checked = false;
				SuperMightBox.style.display = 'none';
				SuperMightLabelSpan.style.color = '#888';
			}
		}
		else
		{
			MightBox.style.display = 'none';
			MightLabelSpan.style.color = '#888';
			SuperMightBox.checked = false;
			SuperMightBox.style.display = 'none';
			SuperMightLabelSpan.style.color = '#888';
		}		
	}
	else
	{
		if (SuperMightBox.checked == false)
		{
			if (UsedFighter < RandomFighter || UsedAny < RandomAny)
			{
				SuperMightBox.style.display = 'inline';
				SuperMightLabelSpan.style.color = '';
			}
			else
			{
				SuperMightBox.style.display = 'none';
				SuperMightLabelSpan.style.color = '#888';
			}			
		}
	}		
}
	
// Show the span that contains the drop-down menus.
if (RandomAny + RandomFighter + RandomMage > 0)
{
	var avgdamage_hero_abilityselect = document.getElementById('AvgDamageTable_Hero_Abilities');
	avgdamage_hero_abilityselect.style.display = 'table';
}

function UpdateAll( fromMenu )
{
	UpdateCheckboxes();
	UpdateTable();
}

// Create ability list for the first time.
CreateAbilityList();
// Update the table for the first time.
UpdateTable();