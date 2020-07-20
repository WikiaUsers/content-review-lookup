/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importArticles({
    type: "style",
    articles: [
        "MediaWiki:Sicherheit.css",
        "Vorlage:Ausrüstungsbox/css",
        "MediaWiki:Itembox.css"
    ]
});

/* ************ Simple damage calculator ************ */
// modified from http://folk.ntnu.no/magnusrk/dofus/dofus_simple.php

function appendScript(url) {
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',url);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

if(wgPageName=='Schaden_Kalkulator_(simpel)') { 
  appendScript('http://de.dofus.wikia.com/index.php?title=MediaWiki:Calc.js&action=raw&ctype=text/javascript&dontcountme=s')
  addOnloadHook(gencalc);
}

function gencalc() {
  if(!document.getElementById('damagecalc')) return
  var dc = document.getElementById('damagecalc');
  //innerHTML is bad, but this would be a pain to do with DOM (also, the script itself isn't DOM friendly)
  dc.innerHTML = '<table class="calctable">\n<tr>\n<td colspan="2">\nCharakter Klasse\n</td><td colspan="2">\n<select id="c_sel">\n<option value="">---</option>\n<option value="sad">Sadida</option>\n<option value="osa">Osamodas</option>\n<option value="enu">Enutrof</option>\n<option value="xel">Xelor</option>\n<option value="sra">Sram</option>\n<option value="eca">Ecaflip</option>\n<option value="eni">Eniripsa</option>\n<option value="iop">Iop</option>\n<option value="cra">Cra</option>\n<option value="fec">Feca</option>\n<option value="sac">Sacrier</option>\n</select>\n</td>\n</tr><tr>\n<td colspan="2">\nWaffentyp\n</td><td colspan="2">\n<select id="w_sel">\n<option value="">Zauberspruch</option>\n<option value="bow">Bogen</option>\n<option value="wand">Stab</option>\n<option value="staff">Stecken</option>\n<option value="dagger">Dolche</option>\n<option value="shovel">Schaufel</option>\n<option value="axe">Axt</option>\n<option value="hammer">Hammer</option>\n<option value="sword">Schwert</option>\n</select>\n</td>\n</tr><tr>\n<td colspan="3">\nKlassen Bonus\n</td><td>\n<input id="c_ski" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\nMeisterzauber\n</td><td>\n<select id="w_ski">\n<option value="">N/A</option>\n<option value="1">1</option>\n<option value="2">2</option>\n<option value="3">3</option>\n<option value="4">4</option>\n<option value="5">5</option>\n<option value="6">6</option>\n</select>\n</td>\n</tr><tr>\n<td>\nBasis Schaden\n</td><td>\n<input id="b_min" type="text">\n</td><td>\n~\n</td><td>\n<input id="b_max" type="text">\n</td>\n</tr><tr>\n<td>\nRelevantes Attribut\n</td><td>\n<input id="stat" type="text">\n</td><td>\n+\n</td><td>\n<input id="stat_ex" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\nkritischer Bonus\n</td><td>\n<input id="dmg_cri" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\n+% auf Schaden\n</td><td>\n<input id="dmg_pct" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\n+ auf Schaden\n</td><td>\n<input id="dmg_lin" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\nFeindliche Resistenzen\n</td><td>\n<input id="e_res" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\nReichweite modifizierung\n</td><td>\n<input id="e_ran" type="text">\n</td>\n</tr>\n</table>\n<hr>\n<div id="tout"></div>\n<hr>\n<p><input type="button" value="Speichern" onclick="save();"> <input type="button" value="Laden" onclick="load();">\n<br>State: <input type="text" id="state" size="40">\n<br>URL: <input type="text" id="stateurl" size="40">\n</p>';
  addOnloadHook(initcalc);
}

/* ************ End of Simple damage calculator ************ */

/* ************ Advanced damage calculator ************ */
// modified from http://folk.ntnu.no/magnusrk/dofus/dofus_full.php

if(wgPageName=='Schaden_Kalkulator_(erweitert)') { 
  appendScript('http://de.dofus.wikia.com/index.php?title=MediaWiki:Calc2.js&action=raw&ctype=text/javascript&dontcountme=s')
  addOnloadHook(gencalc2);
}

function gencalc2() {
  if(!document.getElementById('damagecalc2')) return
  var dc = document.getElementById('damagecalc2');
  //innerHTML is bad, but this would be a pain to do with DOM (also, the script itself isn't DOM friendly)
  dc.innerHTML = '<table class="calctable">\n<tr>\n<td colspan="2">\nCharakter Klasse\n</td><td colspan="2">\n<select id="c_sel">\n<option value="">---</option>\n<option value="sad">Sadida</option>\n<option value="osa">Osamodas</option>\n<option value="enu">Enutrof</option>\n<option value="xel">Xelor</option>\n<option value="sra">Sram</option>\n<option value="eca">Ecaflip</option>\n<option value="eni">Eniripsa</option>\n<option value="iop">Iop</option>\n<option value="cra">Cra</option>\n<option value="fec">Feca</option>\n<option value="sac">Sacrier</option>\n</select>\n</td><td colspan="3">\nKlassen Bonus\n</td><td>\n<input id="c_ski" type="text">\n</td><td rowspan="4">\nFeindliche<br>Resistenzen\n</td>\n</tr><tr>\n<td colspan="2">\nWaffentyp\n</td><td colspan="2">\n<select id="w_sel">\n<option value="">Zauberspruch</option>\n<option value="bow">Bogen</option>\n<option value="wand">Stab</option>\n<option value="staff">Stecken</option>\n<option value="dagger">Dolche</option>\n<option value="shovel">Schaufel</option>\n<option value="axe">Axt</option>\n<option value="hammer">Hammer</option>\n<option value="sword">Schwert</option>\n</select>\n</td><td colspan="3">\nMeisterzauber\n</td><td>\n<select id="w_ski">\n<option value="">N/A</option>\n<option value="1">1</option>\n<option value="2">2</option>\n<option value="3">3</option>\n<option value="4">4</option>\n<option value="5">5</option>\n<option value="6">6</option>\n</select>\n</td>\n</tr><tr>\n<td colspan="3">\n+ auf Schaden\n</td><td>\n<input id="dmg_lin" type="text">\n</td><td colspan="3">\nkritischer Bonus\n</td><td>\n<input id="dmg_cri" type="text">\n</td>\n</tr><tr>\n<td colspan="3">\n+% auf Schaden\n</td><td>\n<input id="dmg_pct" type="text">\n</td><td colspan="4">\nWaffen Schaden\n</td>\n</tr><tr>\n<td rowspan="2">\nStärke\n</td><td rowspan="2">\n<input id="stat_s" type="text">\n</td><td rowspan="2">\n+\n</td><td rowspan="2">\n<input id="statx_s" type="text">\n</td><td>\nNeutral\n</td><td>\n<input id="min_n" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_n" type="text">\n</td><td>\n<input id="res_n" type="text">\n</td>\n</tr><tr>\n<td>\nErde\n</td><td>\n<input id="min_e" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_e" type="text">\n</td><td>\n<input id="res_e" type="text">\n</td>\n</tr><tr>\n<td>\nGlück\n</td><td>\n<input id="stat_c" type="text">\n</td><td>\n+\n</td><td>\n<input id="statx_c" type="text">\n</td><td>\nWasser\n</td><td>\n<input id="min_w" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_w" type="text">\n</td><td>\n<input id="res_w" type="text">\n</td>\n</tr><tr>\n<td>\nFlinkheit\n</td><td>\n<input id="stat_a" type="text">\n</td><td>\n+\n</td><td>\n<input id="statx_a" type="text">\n</td><td>\nLuft\n</td><td>\n<input id="min_a" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_a" type="text">\n</td><td>\n<input id="res_a" type="text">\n</td>\n</tr><tr>\n<td rowspan="2">\nIntelligenz\n</td><td rowspan="2">\n<input id="stat_i" type="text">\n</td><td rowspan="2">\n+\n</td><td rowspan="2">\n<input id="statx_i" type="text">\n</td><td>\nFeuer\n</td><td>\n<input id="min_f" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_f" type="text">\n</td><td>\n<input id="res_f" type="text">\n</td>\n</tr><tr>\n<td>\nHeilung\n</td><td>\n<input id="min_h" type="text">\n</td><td>\n~\n</td><td>\n<input id="max_h" type="text">\n</td><td>\n<input id="res_h" value="" type="hidden">\n<br>\n</td>\n</tr>\n</table>\n<hr>\n<div id="tout"></div>\n<hr>\n<p><input type="button" value="Speichern" onclick="save();"> <input type="button" value="Laden" onclick="load();">\n<br>State: <input type="text" id="state" size="40">\n<br>URL: <input type="text" id="stateurl" size="40">\n</p>';
  addOnloadHook(initcalc);
}

/* ************ End of Advanced damage calculator ************ */

/* ************ Feca Shield calculator ************ */
// modified from http://www.geocities.com/dofuscalc/fsc.htm

if(wgPageName=='Feca_Schild_Kalkulator') { 
  appendScript('http://de.dofus.wikia.com/index.php?title=MediaWiki:Fscalc.js&action=raw&ctype=text/javascript&dontcountme=s')
  addOnloadHook(genfscalc);
}

function genfscalc() {
  if(!document.getElementById('fscalc2')) return
  var dc = document.getElementById('fscalc2');
  //innerHTML is bad, but this would be a pain to do with DOM (also, the script itself isn't DOM friendly)
  dc.innerHTML = '<table class="calctable">\n<tr>\n<td>\nSchild Name\n</td><td colspan="3">\n<select id="s_sel">\n<option value="">---</option>\n<option value="flammende">Flammende Rüstung</option>\n<option value="erd">Erd-Panzer</option>\n<option value="fluten">Panzer der Fluten</option>\n<option value="wirbelwind">Wirbelwind-Panzer</option>\n</select>\n</td><td colspan="2">\nSchild Level\n</td><td colspan="2">\n<select id="sl_sel">\n<option value="">N/A</option>\n<option value="1">1</option>\n<option value="2">2</option>\n<option value="3">3</option>\n<option value="4">4</option>\n<option value="5">5</option>\n<option value="6">6</option>\n</select>\n</td>\n</tr><tr>\n<td colspan="2">\nKörperlicher Schaden\n</td><td colspan="2">\n<input id="b_ks" type="text">\n</td><td colspan="2">\nMagischer Schaden\n</td><td colspan="2">\n<input id="b_ms" type="text">\n</td>\n</tr><tr>\n<td colspan="4">\nBasis Reduzierung NT\n</td><td colspan="4">\nBasis Reduzierung KT\n</td>\n</tr><tr>\n<td>\nauf sich selbst\n</td><td>\n<input id="b_minsnt" type="text">\n</td><td>\n~\n</td><td>\n<input id="b_maxsnt" type="text">\n</td><td>\nauf sich selbst\n</td><td>\n<input id="b_minskt" type="text">\n</td><td>\n~\n</td><td>\n<input id="b_maxskt" type="text">\n</td>\n</tr><tr>\n<td>\nauf andere\n</td><td>\n<input id="b_minant" type="text">\n</td><td>\n~\n</td><td>\n<input id="b_maxant" type="text">\n</td><td>\nauf andere\n</td><td>\n<input id="b_minakt" type="text">\n</td><td>\n~\n</td><td>\n<input id="b_maxakt" type="text">\n</td>\n</tr><tr>\n<td colspan="4">\nEigene Attribute\n</td><td colspan="4">\nEigene Resistenzen\n</td>\n</tr><tr>\n<td rowspan="2">\nStärke\n</td><td rowspan="2">\n<input id="base_st" type="text">\n</td><td rowspan="2">\n+\n</td><td rowspan="2">\n<input id="boost_st" type="text">\n</td><td colspan="2">\nNeutral\n</td><td colspan="2">\n<input id="r_neutral" type="text">\n</td>\n</tr><tr>\n<td colspan="2">\nErde\n</td><td colspan="2">\n<input id="r_erde" type="text">\n</td>\n</tr><tr>\n<td>\nGlück\n</td><td>\n<input id="base_gl" type="text">\n</td><td>\n+\n</td><td>\n<input id="boost_gl" type="text">\n</td><td colspan="2">\nWasser\n</td><td colspan="2">\n<input id="r_wasser" type="text">\n</td>\n</tr><tr>\n<td>\nFlinkheit\n</td><td>\n<input id="base_fl" type="text">\n</td><td>\n+\n</td><td>\n<input id="boost_fl" type="text">\n</td><td colspan="2">\nLuft\n</td><td colspan="2">\n<input id="r_luft" type="text">\n</td>\n</tr><tr>\n<td>\nIntelligenz\n</td><td>\n<input id="base_int" type="text">\n</td><td>\n+\n</td><td>\n<input id="boost_int" type="text">\n</td><td colspan="2">\nFeuer\n</td><td colspan="2">\n<input id="r_feuer" type="text">\n</td>\n</tr>\n</table>\n<hr>\n<div id="tout"></div>\n<hr>\n<p><input type="button" value="Speichern" onclick="save();"> <input type="button" value="Laden" onclick="load();">\n<br>State: <input type="text" id="state" size="40">\n<br>URL: <input type="text" id="stateurl" size="40">\n</p>';
  addOnloadHook(initcalc);
}

/* ************ End of Feca Shield calculator ************ */

// ListFiles - http://dev.wikia.com/wiki/ListFiles

importArticles({
  type: "script",
  articles: ["w:c:dev:ListFiles/code.js",
             "MediaWiki:InsertPreloads.js"
            ]
});

/**
 * Load withJS
 *
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL#Load_withJS
 * @rev 4
 *
 * Änderung durch [[Benutzer:Arkondi]]: mediawiki.notify entfernt, da (momentan?) nicht vorhanden, ersetzt durch jsMessage
 */
mw.loader.using( ['mediawiki.util'], function () {
        var extraJS = mw.util.getParamValue( 'withJS' );
        if ( extraJS ) {
                if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
                        importScript( extraJS );
                } else {
                        mw.util.jsMessage( 'Only pages from the MediaWiki namespace are allowed.' );
                }
        }
} );

/**
 * Load withCSS
 *
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL#Load_withCSS
 * @rev 4
 *
 * Änderung durch [[Benutzer:Arkondi]]: mediawiki.notify entfernt, da (momentan?) nicht vorhanden, ersetzt durch jsMessage
 */
mw.loader.using( ['mediawiki.util'], function () {
        var extraCSS = mw.util.getParamValue( 'withCSS' );
        if ( extraCSS ) {
                if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
                        importStylesheet( extraCSS );
                } else {
                        mw.util.jsMessage( 'Only pages from the MediaWiki namespace are allowed.' );
                }
        }
} );

/*
 * Load CSS and JS files temporarily through URL.
 * &use=File1.css|File2.css|File3.js
 *
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL#Load_multiple_files
 * @rev 4
 */
(function () {
        var files, user, FileRE, what, u, f, l;
        files = mw.util.getParamValue( 'use' )
        if ( !files ) {
                return;
        }
        files = files.split( '|' );
        user = $.escapeRE( mw.config.get( 'wgUserName', '' ) );
        FileRE = new RegExp( '^(?=MediaWiki:' + ( user ? '|User:' + user + '/' : '' ) + ').*\\.(js|css)$' );
        for ( u = 0, f = $.trim( files[u] ), l = files.length; u < l; f = $.trim( files[++u] ) ) {
                what = FileRE.exec(f);
                if ( what == null ) {
                        continue;
                }
                switch ( what[1] ) {
                        case 'js': importScript(f); break;
                        case 'css': importStylesheet(f); break;
                }
        }
}());