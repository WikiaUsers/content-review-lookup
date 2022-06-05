/* Any JavaScript here will be loaded for all users on every page load. */

if (mw.config.get('wgPageName') == 'Damage_Calculator') {
  importScript('MediaWiki:Common.js/DamageCalculator.js');
} else if (mw.config.get('wgPageName') == 'Advanced_Damage_Calculator') {
  importScript('MediaWiki:Common.js/AdvancedDamageCalculator.js');
} else if (mw.config.get('wgPageName') == 'Combat_Simulator') {
  importScript('MediaWiki:Common.js/CombatSimulator.js');
}

// The presence of this element triggers the creation of a functioning Average Damage box for Normal Units.
if (document.getElementById('AvgDamageTable_WeaponsMenu')) {
  importScript('MediaWiki:Common.js/AverageDamageTable.js');
}

// The presence of this element triggers the creation of a functioning Average Damage box for Heroes.
if (document.getElementById('AvgDamageTable_Hero_Abilities')) {
  importScript('MediaWiki:Common.js/AverageDamageTable_Hero.js');
}

// The presence of this elements triggers the creation of a functioning Max Content Population comparative table.
if (document.getElementsByClassName('maxpop-table').length > 0) {
  importScript('MediaWiki:Common.js/MaxContentPop.js');
}