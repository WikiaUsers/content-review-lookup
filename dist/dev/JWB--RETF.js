//This script functions as a small tool that makes it easy to perform typo fixes on any text using JavaScript.
/**<nowiki>
 * Usage: See [[User:Joeytje50/RETF]].

importScript('User:Joeytje50/RETF.js'); //backlink: [[User:Joeytje50/RETF.js]]
RETF.replace(text);

 * This will perform all of the replacement rules on the Project:AutoWikiBrowser/Typos page on wiki it's run from
 * on the entered piece of text via the first argument.
 * To reload the typo list, simply run the following:

RETF.load();

 * @licence
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * https://www.gnu.org/copyleft/gpl.html
 * @version 1.1
 * @author Joeytje50
 */

window.RETF = {}; //making a main object to store everything else
RETF.list = [];

RETF.load = function() {
	(new mw.Api()).get({
		action: 'query',
		prop: 'revisions',
        titles: 'Project:AutoWikiBrowser/Typos',
        rvprop: 'content',
        rvlimit: '1',
        indexpageids: true,
		format: 'json',
	}).done(function(response) {
		RETF.list = []; //reset list, in case this is a list refresh.
		if (response.query && response.query.pageids[0] === '-1') return; //abort if typos page doesn't exist.
        var page = response.query.pages[response.query.pageids[0]];
        var cont = page.revisions[0]['*'];
        var typoList = [];
		//make sure the string starts with a < by putting <typos></typos> around.
		var $typolists = $('<typos>'+cont+'</typos>').children('Typo:not([disabled])').each(function() {
			if (!/\?<=|\?<!/.test($(this).attr('find'))) { //skip rule if it contains lookbehinds.
				RETF.list.push([$(this).attr('find'), $(this).attr('replace')]); //store all typofixes in one big array
			}
		});
	});
};

RETF.replace = function(text) {
	var replaceText = function(match, g1) {
		//don't perform replaces when one of the excluded things has been matched (indicated by group 1 not being matched).
		if (!g1) return match;
		return g1.replace(new RegExp(RETF.list[i][0], 'g'), RETF.list[i][1]);
	};
	for (var i=0;i<RETF.list.length;i++) {
		//checks if the rule matches any wikilink targets.
		var wikiLinkTarget = new RegExp('\\[\\[[^\\|\\]]*' + RETF.list[i][0] + '[^\\|\\]]*(\\||\\]\\])');
		if (wikiLinkTarget.test(text)) {
			continue; //ignore this rule
		}
		//Regex based on https://stackoverflow.com/a/23589204/1256925.
		//Rules to skip based on https://en.wikipedia.org/wiki/Wikipedia:AutoWikiBrowser/Typos#AutoWikiBrowser_.28AWB.29
		//Rules are: File:links | templates | "quotes" | text after : or *
		var exclude = new RegExp('\\[\\[File:[^\\|\\]]+\\|?|{{.+?}}|"[^"]+"|[:\\*].*|('+RETF.list[i][0]+')', 'ig');
		text = text.replace(exclude, replaceText);
	}
	return text;
};

RETF.load();