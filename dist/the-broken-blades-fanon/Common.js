/* Any JavaScript here will be loaded for all users on every page load. */
// Blocked Users
window.mbPartialStyle = 'opacity: 0.5';
window.mbTempStyle = 'opacity: 0.7; text-decoration: line-through';
window.mbIndefStyle = 'opacity: 0.4; font-style: italic; text-decoration: line-through';
window.mbTooltip = 'blocked ($1) by $2: $3 ($4 ago)';
window.mbTipBox = false;
window.mbTipBoxStyle = 'font-size:85%; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA';
window.mbLoadingOpacity = 0.85;
window.mbNoAutoStart = false;

// UTC Clock
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// Ripple
window.ripplesConfig = {
  'normalRipples': document.querySelectorAll('.elements-1, .elements-2'),
  'recenteredRipples': document.querySelectorAll('.foo .bar'),
  'unboundedRipples': document.querySelectorAll('.lorem .ipsum')
};

// Masthead Rights
window.MastheadRightsBadgeSettings = {
    iconSize: '45px',
};

//Link Preview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest/scale-to-width-down/350?cb=20170626182120&path-prefix=ru';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/five-broken-blades/images/e/ec/Noimageavailable.jpeg/revision/latest?cb=20250222224648';
window.pPreview.tlen = 1000;
window.pPreview.RegExp.iparents = ['.myclass', '#myid', 'div[data-ignore-me=1]'];

// MORE

window.pPreview.RegExp.iparents = ['.quote'];
window.pPreview.RegExp.iparents = ['user', '#myid', 'div[data-ignore-me=1]'];