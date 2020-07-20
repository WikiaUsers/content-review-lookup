
// Permitir imagenes y videos en chat tags //

var chatags = { images: true, videos: true };

// boton de clear //



// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Bienvenido al chat de la wiki Freddy Fazbear\'s Pizza. Por favor asegurate de leer <a href="Wiki_Freddy_Fazbear%27s_Pizza:Reglas_y_Lineamientos" target="_blank">las reglas</a><br> Si necesitas a algún mod, para llamarlos mándales un mensaje en su Muro o usa !mods, pero recuerda no abusar de esto.';
 
$(function() { 
    $('#ChatHeader .public.wordmark')
        .prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:White;font-weight:bold;font-family:Candara;line-height:1.6;text-align:center;">' + chatTopic + '</div>')
        .find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// Evitar que hagan bromitas con el "Special:Logout" //
$(function() {
    var regexp = new Array();
        regexp[0] = new RegExp("Especial:Salida_del_usuario", "gi");
        regexp[1] = new RegExp("Special:Logout", "gi");
    $('[name="message"]').keypress(function (e) {
        if (e.which == 13) {
            for (var i = 0; i < regexp.length; i++) {
                this.value = this.value.replace(regexp[i], "");
            }
        }
    });
});


// Ping de mods
window.ModPing = "https://vignette.wikia.nocookie.net/freddy-fazbears-pizza/images/1/13/DarthVader_-_Noo_-_modsoundeffect.ogg/revision/latest?cb=20191224210607&path-prefix=es";

// Para el coso de los emotes :v
window.EmoticonsWindowVocab = {
	emoticons: "Emotes"
};
 
//Estados del chat //
window.ChatStatus = {
	statuses: {
		afk: "Mirando televisión",
		edit: "Ocupado",
		food: "Comiendo", 
		tv: "Escuchando música",
		game: "Jugando",
		ufo: "Estudiando",
		cake: "Observando",
		book: "Leyendo libros",
		code: "Editando",
		homo: "Bailando",
		notsoos: "Haciendo un roleplay",
		google: "Azotando niños",
	},
	debug: false
};
 
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
        var message = this.value;
        // Evitar mensajes de espacios en blanco
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
    }
});

var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/freddy-fazbears-pizza/images/5/57/Cool_Notification_2-608847.ogg/revision/latest?cb=20161013204746&path-prefix=es',
    message: '$1 envió un mensaje!',
    notifications: true,
    alertWhileFocused: true
};

/* Arreglando el maldito bug de los MP's >:v*/
ChatView.prototype.processText = function(text, allowHtml) {
	if (text === undefined)
		return '';
	if (!allowHtml) {
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
	}
	var localWikiLinkReg = '^' + wgServer + wgArticlePath;
	localWikiLinkReg = localWikiLinkReg.replace(/\$1/, "(\\S+[^.\\s\\?\\,])");
	localWikiLinkReg = new RegExp(localWikiLinkReg,"i");
	if (!allowHtml) {
		var exp = /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig;
		text = text.replace(exp, function(link) {
			var linkName = link;
			var match = localWikiLinkReg.exec(link);
			if (match !== null ) {
				linkName = match[1].replace(/_/g, " ");
			}
			try {
				linkName = decodeURIComponent(linkName);
			} catch (e) {}
			linkName = linkName.replace(/</g, "&lt;");
			linkName = linkName.replace(/>/g, "&gt;");
			return '<a href="' + link + '">' + linkName + '</a>';
		});
	}
	var linkify = function(article, linkText) {
		article = article.replace(/ /g, "_");
		linkText = linkText.replace(/_/g, " ");
		linkText = unescape(linkText);
		linkText = linkText.replace(/</g, "&lt;");
		linkText = linkText.replace(/>/g, "&gt;");
		var path = wgServer + wgArticlePath;
		article = encodeURIComponent(article);
		article = article.replace(/%2f/ig, "/");
		article = article.replace(/%3a/ig, ":");
		var url = path.replace("$1", article);
		return '<a href="' + url + '">' + linkText + '</a>';
	}
	var exp = /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig;
	text = text.replace(exp, function(wholeMatch, article, linkText) {
		if (!linkText) {
			var colonLocation = article.indexOf(":");
			if (colonLocation == -1) {
				linkText = article;
			} else {
				linkText = article.substring(colonLocation + 1);
			}
		}
		return linkify(article, linkText);
	});
	var exp = /(\[\[[^\[\]\r\n\t]*\]\])/ig;
	text = text.replace(exp, function(match) {
		var article = match.substr(2, match.length - 4);
		var linkText = article.replace(/_/g, " ");
		return linkify(article, linkText);
	});
	text = WikiaEmoticons.doReplacements(text, this.emoticonMapping);
	return text;
};


// NO poner nada bajo "ImportArticles" por favor mantenerlo limpio para mayor orden
importArticles({
    type: 'script',
    articles: [
        'u:dev:PrivateMessageAlert/code.js',       
        'u:dev:MediaWiki:EmoticonsWindow/code.js',    
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:GiveChatMod/code.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:ChatUserPageButton.js',
        'u:dev:MediaWiki:ChatLinkPreview.js',
    ]
});