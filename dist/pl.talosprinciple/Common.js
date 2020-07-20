/**
 * Importy
 */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

/** Wspaniały kod allahijski
 *  który nic nie robi.
 * (c) 2069 Allah Productions
 */

var allah = mw.config.get('wgUserName');

if(allah !== null) 
{
    $('.allah-username').html(allah);
    $('.allah-blank').html('&nbsp;');
}

/* Coś tam coś */
if(allah == 'MightySora' 
|| allah == 'Honka507'
|| allah == 'GodTyla'
|| allah == 'OwocekTV'
|| allah == 'BoskaZegareczka')
{
    $('.allah-sir').text('lady');
}

/* OwocekTV*/
if(allah == 'OwocekTV')
{
    $('.allah-sir').text('kaczko');
}

/* Allah Wszechmocny */
if(allah == 'Allah Wszechmocny')
{
    $('.allah-sir').text('lord');
    $('.allah-username').text('Allah');
}

/* Monsieur Rainbow z ziem Terrazone */
if(allah == 'Monsieur Rainbow z ziem Terrazone')
{
    $('.allah-sir').text('monsieur');
    $('.allah-username').text('Rainbow z ziem Terrazone');
}

/* Dettankarmen */
if(allah == 'Master Space')
{
    $('.allah-sir').text('panie');
    $('.allah-username').text('Dettankarmenie');
}