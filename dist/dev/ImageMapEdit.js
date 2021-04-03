/*
	Copyright (c) 2007-2013 Peter Schlömer

	Released under the following licenses (to make reuse in other Wikis easier):

	GNU General Public License (GPL), version 2
	GNU Free Documentatin Licence (GFDL), version 1.2 or later
	Creative Commons Attribution ShareAlike (CC-by-sa), version 2 or later
	
	Source: https://imagemapedit.toolforge.org/ime.js
*/

if (mw.config.get('wgNamespaceNumber') == 6 && mw.config.get('wgAction') == 'view') {
	mw.loader.load('//imagemapedit.toolforge.org/ime.js');
}