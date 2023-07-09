/* Any JavaScript here will be loaded for all users on every page load. */

var vng = document.getElementById('VilleinNumberGenerator');
var vn = document.getElementById('VilleinNumber');
if (vng || vn) importArticle({type: "script", article: "MediaWiki:Villein_Number.js"});

var mms = document.getElementById('maray_maze_solver');
if (mms && (mw.config.get('wgPageName') === 'Maray_Maze_Solver')) importArticle({type: "script", article: "MediaWiki:Maray_Maze_Solver.js"});