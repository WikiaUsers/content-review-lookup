/** <nowiki>
 * Ajoute les contributions et la liste de suivi au menu déroulant des comptes utilisateurs
 * Auteur original inconnu
 *
 * Autres auteurs : Ryan PM et Cqm de RuneScape Wiki + Hulothe
 */
(function ($, console, document, rswiki) {
 
    'use strict';
 
    // make sure the gadgets property exists
    rswiki.gadgets = rswiki.gadgets || {};
 
    rswiki.gadgets.addContribs = function () {
        $('#AccountNavigation > li > .subnav > li:first-child').after(
            $('<li/>').attr({
                'id': 'MyContribs'
            }).append(
                $('<a/>').attr({
                    'href': '/wiki/Special:MyContributions'
                }).text('Contributions')
            ),

            $('<li/>').attr({
                'id': 'Liste'
            }).append(
                $('<a/>').attr({
                    'href': 'http://fr.ulote.wikia.com/'
                }).text('Mon Wiki')
            ),

            $('<li/>').attr({
                'id': 'Liste'
            }).append(
                $('<a/>').attr({
                    'href': 'http://ombredumordor.wikia.com/'
                }).text('Ombre du Mordor')
            ),
 
            $('<li/>').attr({
                'id': 'DevWiki'
            }).append(
                $('<a/>').attr({
                    'href': 'http://dev.wikia.com/wiki/Special:WikiActivity'
                }).text('Développeurs')
            )
        );
    };
 
    $(rswiki.gadgets.addContribs);
 
}(this.jQuery, this.console, this.document, this.rswiki = this.rswiki || {}));
 
/* </nowiki> */