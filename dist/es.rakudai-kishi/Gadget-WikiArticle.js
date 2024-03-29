/*<source lang="javascript">*/
/* WikiArticle - v3.0
 * Framework to easily generate urls to MediaWiki articles (actions, special pages) from an article name
 * (C) 2010-2017 Jesús Martínez Novo [[User:Ciencia_Al_Poder]]
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 */
(function(jQuery, mw, undef) {
	'use strict';
// @private globals
var defaultNsInfo = {id:0,'*':'',canonical:''},
	re_space = / /g,
	re_underscore = /_/g;

// @public class WikiArticle
window.WikiArticle = function(wikisiteinfo, title) {
	// Namespace configuration & localization
	this.wikisiteinfo = wikisiteinfo;
	// Normalized pagename
	this.pagename = null;
	// Whether the current page is a talk page
	this.isTalk = false;
	// Namespace information of the article
	this.articlens = null;
	this.talkns = null;
	this.realspecial = null;

	this.init(title);
};

window.WikiArticle.prototype = {
	init: function(title) {
		var t, scPos, tns, objns, tmpt, nsa, ansid, pos, base, extra;
		t = this.decode(title||''); // namespaces use slashes
		if (t==='') return;
		scPos = t.indexOf(':');
		if (scPos != -1) {
			// It looks like a namespace, try to get namespace information
			// Namespace is case insensitive
			tns = t.split(':')[0].toLowerCase();
			// Namespaces
			for (var ns in this.wikisiteinfo.namespaces) {
				if (this.wikisiteinfo.namespaces.hasOwnProperty(ns)) {
					objns = this.wikisiteinfo.namespaces[ns];
					if (tns == objns['*'].toLowerCase() || tns == objns.canonical.toLowerCase()) {
						this.articlens = jQuery.extend(true,{},objns); // Copy namespace object
						tmpt = t.substring(scPos+1);
						this.pagename = tmpt.substring(0,1).toUpperCase()+tmpt.substring(1);
						break;
					}
				}
			}
			if (this.articlens === null) {
				// Test against namespace aliases
				for (var i = 0; i < this.wikisiteinfo.namespacealiases.length; i++) {
					nsa = this.wikisiteinfo.namespacealiases[i];
					if (tns == nsa['*'].toLowerCase()) {
						objns = this.wikisiteinfo.namespaces[nsa.id.toString()];
						this.articlens = jQuery.extend(true,{},objns); // Copy namespace object
						tmpt = t.substring(scPos+1);
						this.pagename = tmpt.substring(0,1).toUpperCase()+tmpt.substring(1);
						break;
					}
				}
			}
		}
		if (!this.articlens) {
			// No namespace, or it's not known
			this.articlens = defaultNsInfo;
			this.pagename = t.substring(0,1).toUpperCase()+t.substring(1);
			this.isTalk = false;
		}
		if (this.articlens.id >= 0) {
			// Fill namespace info variables
			if (this.articlens.id % 2) {
				// Is talk page
				this.isTalk = true;
				// Switch article to talk and get the real article ns info
				this.talkns = this.articlens;
				ansid = this.talkns.id-1;
				this.articlens = jQuery.extend(true,{},this.wikisiteinfo.namespaces[ansid.toString()]); // Copy namespace object
				if (typeof this.articlens == 'undefined') {
					this.articlens = defaultNsInfo;
				}
			} else {
				// Get the talk ns info
				var tnsid = this.articlens.id+1;
				this.talkns = jQuery.extend(true,{},this.wikisiteinfo.namespaces[tnsid.toString()]); // Copy namespace object
				// Note that a particular NS could miss a talk namespace
				if (typeof this.talkns.id == 'undefined') {
					this.talkns = null;
				}
			}
		}
		if (this.articlens.id == -1) {
			// Special pages. Normalize the pagename
			pos = this.pagename.indexOf('/');
			if (pos != -1) {
				base = this.pagename.substr(0,pos);
				extra = this.pagename.substr(pos);
				this.pagename = this.getLocalizedSpecial(base, true) + extra;
			} else {
				this.pagename = this.getLocalizedSpecial(this.pagename, true);
			}
		}
	},
	toString: function() {
		var tns = this.isTalk ? this.talkns : this.articlens;
		if (tns['*'] === '') {
			return this.pagename;
		}
		return tns['*']+':'+this.pagename;
	},
	encode: function(str) {
		return str.replace(re_space,'_');
	},
	decode: function(str) {
		return jQuery.trim(str.replace(re_underscore,' '));
	},
	getFullUrl: function(oArgs) {
		var tns = this.isTalk ? this.talkns : this.articlens;
		var szNs = tns['*'];
		return mw.util.getUrl((szNs === '' ? '' : szNs+':') + this.pagename, oArgs);
	},
	getLocalizedSpecial: function(special, setReal) {
		var tsp = this.encode(special).toLowerCase(); // special aliases use slashes
		for (var i = 0; i < this.wikisiteinfo.specialpagealiases.length; i++) {
			var spa = this.wikisiteinfo.specialpagealiases[i];
			if (spa.realname.toLowerCase() == tsp) {
				if (setReal === true) {
					this.realspecial = spa.realname;
				}
				return spa.aliases[0];
			}
			for (var j = 0; j < spa.aliases.length; j++) {
				if (spa.aliases[j].toLowerCase() == tsp) {
					// Save the real name for future reference if we're setting the specialpage info
					if (setReal === true) {
						this.realspecial = spa.realname;
					}
					// Use the first alias
					return spa.aliases[0];
				}
			}
		}
		if (setReal === true) {
			this.realspecial = special;
		}
		return special;
	},
	// Returns a special page, appending /FULLPAGENAME. If oArgs is false then /PAGENAME is appended instead. if oArgs is an object then the page name is not appended at all
	//  specialpage: Special page name
	//  oArgs: additional queryString (in object notation)
	getSpecial: function(specialpage, oArgs) {
		var pagename = this.wikisiteinfo.namespaces['-1']['*'] + ':' + this.getLocalizedSpecial(specialpage);
		if (!oArgs) {
			pagename += '/' + ( (oArgs !== false) ? this.toString() : this.pagename );
			oArgs = undef;
		}
		return mw.util.getUrl(pagename, oArgs);
	}
};

}(jQuery, mw));
/*</source>*/