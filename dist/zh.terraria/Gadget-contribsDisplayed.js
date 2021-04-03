// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var contribCount = $('li:has(a.mw-changeslist-date)');
var contribNum = contribCount.length;
var contribUL = $('li:has(a.mw-changeslist-date):first').parent('ul');
contribUL.before('<div>Total edits displayed: <b>' + contribNum + '</b></div>');