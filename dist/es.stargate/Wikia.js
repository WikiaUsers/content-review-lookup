// Etiquetas junto a los nombres de ciertos usuarios
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// Aviso de la columna derecha en todos los artículos
importScript('MediaWiki:Wikia.js/aviso.js');
// Agregamos más enlaces a la Navegación de la Cuenta
importScript('MediaWiki:Wikia.js/accountNavigation.js');
// Expandir al pasar el cursor
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});

// **************************************************
// Botones
// **************************************************
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "black",
	buttonSize: "23px",
	wikiTwitterAccount: "wikia_es"
};
importScriptPage('SocialIcons/code.js','dev');

/*<pre> MediaWiki:Wikia.js v.4 */ 
//Burócrata/
(function () {
        "use strict";
        var userRightsList = {
            "Roxas Nobody": ["Burócrata"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
//Reversor/
(function () {
        "use strict";
        var userRightsList = {
            "JMGB640": ["Reversor"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
 
(function () {
        "use strict";
        var userRightsList = {
            "¿?¿?": ["Reversor"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
 
(function () {
        "use strict";
        var userRightsList = {
            "¿?¿?": ["Reversor"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
 
//*bot/
(function () {
        "use strict";
        var userRightsList = {
            "RoxasBot": ["Bot"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());


highlight = { selectAll: true, chatmoderator: 'blue', rollback: 'green', sysop: 'red' bureaucrat: 'dark'  }; importArticles({ type: 'script', articles: [ 'u:dev:HighlightUsers/code.js' ] });