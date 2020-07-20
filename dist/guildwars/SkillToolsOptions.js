/* To be used with [[MediaWiki:SkillTools.js]].  Version 0.5alpha, licensed under BY-NC-SA 2.0 only.  An alternate GDFL licensed version is available elsewhere. <pre> */

var profAttribs = ['<option>No Attribute</option>\n',
		'<option>Strength</option>\n'
		+ '	<option>Axe Mastery</option>\n'
		+ '	<option>Hammer Mastery</option>\n'
		+ '	<option>Sword Mastery</option>\n'
		+ '	<option>Tactics</option>\n',
		'<option>Expertise</option>\n'
		+ '	<option>Beast Mastery</option>\n'
		+ '	<option>Marksmanship</option>\n'
		+ '	<option>Wilderness Survival</option>\n',
		'<option>Divine Favor</option>\n'
		+ '	<option>Healing Prayers</option>\n'
		+ '	<option>Protection Prayers</option>\n'
		+ '	<option>Smiting Prayers</option>\n',
		'<option>Soul Reaping</option>\n'
		+ '	<option>Blood Magic</option>\n'
		+ '	<option>Curses</option>\n'
		+ '	<option>Death Magic</option>\n',
		'<option>Fast Casting</option>\n'
		+ '	<option>Domination Magic</option>\n'
		+ '	<option>Illusion Magic</option>\n'
		+ '	<option>Inspiration Magic</option>\n',
		'<option>Energy Storage</option>\n'
		+ '	<option>Air Magic</option>\n'
		+ '	<option>Earth Magic</option>\n'
		+ '	<option>Fire Magic</option>\n'
		+ '	<option>Water Magic</option>\n',
		'<option>Critical Strikes</option>\n'
		+ '	<option>Dagger Mastery</option>\n'
		+ '	<option>Deadly Arts</option>\n'
		+ '	<option>Shadow Arts</option>\n',
		'<option>Spawning Power</option>\n'
		+ '	<option>Channeling Magic</option>\n'
		+ '	<option>Communing</option>\n'
		+ '	<option>Restoration Magic</option>\n',
		'<option>Leadership</option>\n'
		+ '	<option>Command</option>\n'
		+ '	<option>Motivation</option>\n'
		+ '	<option>Spear Mastery</option>\n',
		'<option>Mysticism</option>\n'
		+ '	<option>Earth Prayers</option>\n'
		+ '	<option>Scythe Mastery</option>\n'
		+ '	<option>Wind Prayers</option>\n',
		'<option>Other</option>\n'];

var commonTypes = '<option>Skill</option>\n'
		+ '	<option>Signet</option>\n';
var commonSpellTypes = '	<option>Spell</option>\n'
		+ '	<option>Enchantment Spell</option>\n'
		+ '	<option>Hex Spell</option>\n';

var skillTypes = [commonTypes, 
		commonTypes + '	<option>Melee Attack</option>\n'
		+ '	<option>Axe Attack</option>\n'
		+ '	<option>Hammer Attack</option>\n'
		+ '	<option>Sword Attack</option>\n'
		+ '	<option>Shout</option>\n'
		+ '	<option>Stance</option>\n',
		commonTypes+ '	<option>Bow Attack</option>\n'
		+ '	<option>Pet Attack</option>\n'
		+ '	<option>Stance</option>\n'
		+ '	<option>Nature Ritual</option>\n'
		+ '	<option>Preparation</option>\n'
		+ '	<option>Trap</option>\n',
		commonTypes+ commonSpellTypes, 
		commonTypes+ commonSpellTypes + '<option>Well Spell</option>\n', 
		commonTypes+ commonSpellTypes + '<option>Stance</option>\n',
		commonTypes+ commonSpellTypes + '<option>Ward Spell</option>\n<option>Glyph</option>\n', 
		commonTypes+ '	<option>Melee Attack</option>\n'
		+ '	<option>Lead Attack</option>\n'
		+ '	<option>Off-Hand Attack</option>\n'
		+ '	<option>Dual Attack</option>\n'
		+ commonSpellTypes
		+ '	<option>Stance</option>\n',
		commonTypes+ commonSpellTypes + '	<option>Item Spell</option>\n'
		+ '	<option>Weapon Spell</option>\n'
		+ '	<option>Bindiing Ritual</option>\n',
		commonTypes+ '	<option>Form</option>\n'
		+ '	<option>Melee Attack</option>\n'
		+ '	<option>Scythe Attack</option>\n'
		+ commonSpellTypes
		+ '	<option>Stance</option>\n',
		commonTypes+ '	<option>Spear Attack</option>\n'
		+ '	<option>Stance</option>\n'
		+ '	<option>Shout</option>\n'
		+ '	<option>Chant</option>\n'
		+ '	<option>Echo</option>\n',
		commonTypes];

var effectTypes = '	<option value="">Other:</option>\n'
		+ '	<option>Duration(s)</option>\n'
		+ '	<option>Damage</option>\n'
		+ '	<option>Additional Damage</option>\n'
		+ '	<option>Health Healed</option>\n'
		+ '	<option>Health Stolen</option>\n'
		+ '	<option>Health Regeneration</option>\n'
		+ '	<option>Health Degeneration</option>\n'
		+ '	<option>Energy Lost</option>\n'
		+ '	<option>Energy Gained</option>\n'
		+ '	<option>Energy Stolen</option>\n'
		+ '	<option>Energy Regeneration</option>\n'
		+ '	<option>Energy Degeneration</option>\n'
		+ '	<option>Gain</option>\n'
		+ '	<option>Loss</option>\n'
		+ '	<option>More(%)</option>\n'
		+ '	<option>Less(%)</option>\n'
		+ '';

/* </pre> */