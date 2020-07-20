// Read the unit's various abilities from hidden HTML spans.
var Melee = parseInt(document.getElementById('Melee').innerHTML) || 0;
var MeleeToHit = parseInt(document.getElementById('MeleeToHit').innerHTML) || 0;
var RangedMissile = parseInt(document.getElementById('RangedMissile').innerHTML) || 0;
var RangedMagic = parseInt(document.getElementById('RangedMagic').innerHTML) || 0;
var RangedBoulder = parseInt(document.getElementById('RangedBoulder').innerHTML) || 0;
var RangedToHit = parseInt(document.getElementById('RangedToHit').innerHTML) || 0;
var Thrown = parseInt(document.getElementById('Thrown').innerHTML) || 0;
var ThrownToHit = parseInt(document.getElementById('ThrownToHit').innerHTML) || 0;
var Breath = parseInt(document.getElementById('Breath').innerHTML) || 0;
var BreathToHit = parseInt(document.getElementById('BreathToHit').innerHTML) || 0;
var NoAG = parseInt(document.getElementById('NoAG').innerHTML) || 0;
var CurWeapon = 0;

////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////

// This function inserts a drop-box for weapon selection. This is not allowed in normal Wikia source, so it must be inserted via Javascript.
function CreateWeaponList()
{
	// Get empty placeholder spans from original document.
	var WeaponMenuSpan = document.getElementById('AvgDamageTable_WeaponsMenu');
	var WeaponIconSpan = document.getElementById('AvgDamageTable_WeaponsIcon');
	
	// Create the drop-down. If NoAG is defined, only list Normal and Magic Weapons
	if (NoAG)
	{
	    WeaponMenuSpan.innerHTML = '<SELECT id="WeaponsBox" onChange="UpdateAll();" ><OPTION value=0>Normal Weapons<OPTION value=1>Magic Weapons</SELECT>';
	}	
	else
	{
	    WeaponMenuSpan.innerHTML = '<SELECT id="WeaponsBox" onChange="UpdateAll();" ><OPTION value=0>Normal Weapons<OPTION value=1>Magic Weapons<OPTION value=2>Mithril Weapons<OPTION value=3>Adamantium Weapons</SELECT>';
	}

	// Set
	var WeaponsBox = document.getElementById('WeaponsBox');
	CurWeapon = WeaponsBox.value;
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
	if ((RangedMissile || RangedMagic || RangedBoulder) && RangedToHit)
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
	
	for (x = 0; x <= 5; x++)
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
	var WeaponBonus = 0;
	var WeaponToHitBonus = 0;
	var TotalStrength = 0;
	var TotalToHit = 0;
	var DamageVal = 0;
	var Damage = '';
	
	////////////// Melee Attack /////////////////
	if (HasMelee)
	{
		for (var curLevel = 0; curLevel <= 5; curLevel++)
		{
			BasicLevelBonus = Math.floor((curLevel+1) * 0.5);
			BasicLevelToHitBonus = 10 * (Math.max(0,curLevel - 2));
			WeaponBonus = 0;
			WeaponToHitBonus = 0;
			
			if (CurWeapon > 0)
			{
				WeaponToHitBonus = 10;
			}
			WeaponBonus = Math.max(0,CurWeapon - 1);
			
			TotalStrength = Melee + BasicLevelBonus + WeaponBonus;
			TotalToHit = Math.min(100, MeleeToHit + BasicLevelToHitBonus + WeaponToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_melee_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
	
	////////////// Ranged Attack /////////////////
	if (HasRanged)
	{
		for (var curLevel = 0; curLevel <= 5; curLevel++)
		{
			BasicLevelBonus = Math.floor((curLevel+1) * 0.5);
			BasicLevelToHitBonus = 10 * (Math.max(0,curLevel - 2));
			WeaponBonus = 0;
			WeaponToHitBonus = 0;
			
			if (RangedMissile || RangedBoulder)
			{
			        if (CurWeapon > 0) {
                                  WeaponToHitBonus = 10;
                                }
                                WeaponBonus = Math.max(0,CurWeapon - 1);
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
			else if (RangedBoulder)
			{
				Ranged = RangedBoulder;
			}
			
			TotalStrength = Ranged + BasicLevelBonus + WeaponBonus;
			TotalToHit = Math.min(100, RangedToHit + BasicLevelToHitBonus + WeaponToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_ranged_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
	
	////////////// Thrown Attack /////////////////
	if (HasThrown)
	{
		for (var curLevel = 0; curLevel <= 5; curLevel++)
		{
			BasicLevelBonus = Math.floor((curLevel+1) * 0.5);
			BasicLevelToHitBonus = 10 * (Math.max(0,curLevel - 2));
			WeaponBonus = 0;
			WeaponToHitBonus = 0;
			
			WeaponBonus = Math.max(0,CurWeapon - 1);
			
			TotalStrength = Thrown + BasicLevelBonus + WeaponBonus;
			TotalToHit = Math.min(100, ThrownToHit + BasicLevelToHitBonus + WeaponToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_thrown_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
	
	////////////// Breath Attack /////////////////
	if (HasBreath)
	{
		for (var curLevel = 0; curLevel <= 5; curLevel++)
		{
			BasicLevelBonus = Math.floor((curLevel+1) * 0.5);
			BasicLevelToHitBonus = 10 * (Math.max(0,curLevel - 2));
			WeaponBonus = 0;
			WeaponToHitBonus = 0;
			
			WeaponBonus = Math.max(0,CurWeapon - 1);
			
			TotalStrength = Breath + BasicLevelBonus + WeaponBonus;
			TotalToHit = Math.min(100, BreathToHit + BasicLevelToHitBonus + WeaponToHitBonus);
			
			DamageVal = (TotalStrength * TotalToHit) / 100;
			Damage = (DamageVal).toFixed(1);
			
			var curCell = document.getElementById('avgdmg_breath_'+curLevel);
			curCell.innerHTML = '<span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + Damage + '</span></span>';
		}
	}
}

function UpdateIcon()
{
	// Get icon span
	var WeaponIconSpan = document.getElementById('AvgDamageTable_WeaponsIcon');
	
	if (CurWeapon == 0)
	{
		WeaponIconSpan.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb20120103052414/masterofmagic/images/5/5a/Icon_Melee_Normal.png">';
	}
	else if (CurWeapon == 1)
	{
		WeaponIconSpan.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb20120103212632/masterofmagic/images/3/39/Icon_Melee_Magic.png">';
	}	
	else if (CurWeapon == 2)
	{
		WeaponIconSpan.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb20120103212639/masterofmagic/images/6/69/Icon_Melee_Mithril.png">';
	}
	else if (CurWeapon == 3)
	{
		WeaponIconSpan.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb20120103212643/masterofmagic/images/5/5e/Icon_Melee_Adamantium.png">';
	}
}
	
function UpdateAll( )
{
        CurWeapon = document.getElementById('WeaponsBox').value;
	UpdateIcon();
	UpdateTable();
}

// Create ability list for the first time.
CreateWeaponList();
// Update the icon
UpdateIcon();
// Update the table for the first time.
UpdateTable();