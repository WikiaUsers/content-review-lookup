//<source lang="javascript">
//QuickCommands version 1.0 created by Gguigui1 and Hulothe
//based on WHAM for ban and delete function
(function ($, mw, QuickComments) {
var lng = {
        // Chinese
        zh: {
            expiry: '封禁時間 :',
            reason: '封禁原因 :',
            success: '用戶已被封禁',
            deletetext: '刪除原因 :',
            deletebutton: '刪除',
            blockbutton: '封禁用戶',
            errorapi: '錯誤：API返回錯誤代碼'
        },
        // English
        en: {
            expiry: 'Block duration :',
            reason: 'Block reason :',
            success: 'User has been blocked',
            deletetext: 'Delete reason :',
            deletebutton: 'Delete',
            blockbutton: 'Block user',
            errorapi: 'Error: API returned error code'
        },
        // Français
        fr: {
            expiry: 'Durée du blocage :',
            reason: 'Motif du blocage :',
            success: 'L\'utilisateur a été bloqué avec succès.',
            deletetext: 'Raison de la suppression :',
            deletebutton: 'Supprimer',
            blockbutton: 'Bloquer l\'utilisateur',
            errorapi: 'Erreur: l\'API a retourné le code d\'erreur'
        },
        // Español
        es: {
            expiry: 'Duración del bloqueo:',
            reason: 'Motivo del bloqueo:',
            success: 'El usuario ha sido bloqueado',
            deletetext: 'Motivo de borrado:',
            deletebutton: 'Borrar',
            blockbutton: 'Bloquear usuario',
            errorapi: 'Error: se regresó un código de error desde la API'
        },
		// German
        de: {
            expiry: 'Dauer der Sperre :',
            reason: 'Sperrgrund :',
            success: 'Der Benutzer wurde erfolgreich gesperrt',
            deletetext: 'Löschgrund :',
            deletebutton: 'Löschen',
            blockbutton: 'Sperren',
            errorapi: 'Fehler: API gab einen Fehlercode'
        },
        // Català
        ca: {
            expiry: 'Durada del bloqueig:',
            reason: 'Motiu del bloqueig:',
            success: 'L\'usuaro ha estat bloquejat',
            deletetext: 'Motiu de esborrat:',
            deletebutton: 'Esborrar',
            blockbutton: 'Bloquejar usuari',
            errorapi: 'Error: es va tornar un codi d\'error des de la API'
        },
        // Occitan
        oc: {
            expiry: 'Durada del blocatge:',
            reason: 'Encausa del blocatge:',
            success: 'L\'utilizaire a estat blocat',
            deletetext: 'Encausa de supression:',
            deletebutton: 'Suprimir',
            blockbutton: 'Blocar l\'utilizaire',
            errorapi: 'Enganada : l\'API retornèt lo code d\'engana seguent'
        }, 
        // Brazilian Portuguese 
        'pt-BR': {
            expiry: 'Duração do bloqueio',
            reason: 'Motivo:',
            success: 'L\'O Usuário foi bloqueado',
            deletetext: 'Informe-nos por que você gostaria de remover este:',
            deletebutton: 'Deletar',
            blockbutton: 'Bloquear l\'Usuário',
            errorapi: 'Erro: API returned error code'
        },
       // Polski
        pl: {
            expiry: 'Długość trwania blokady:',
            reason: 'Powód blokady:',
            success: 'Użytkownik został zablokowany',
            deletetext: 'Powód usuwania komentarza:',
            deletebutton: 'Usuń',
            blockbutton: 'Zablokuj użytkownika',
            errorapi: 'Błąd: API zwróciło kod błędu'
        }
    };
	//Test if variable are undefined
    if (typeof QuickCommentsreason !== "string" || QuickCommentsreason == null) {
      QuickCommentsreason = "違反討論原則";
    }
	if (typeof QuickCommentsdeletereason !== "string" || QuickCommentsdeletereason == null) {
      QuickCommentsdeletereason = "違反討論原則";
    }
	if (typeof QuickCommentsduration !== "string" || QuickCommentsduration == null) {
      QuickCommentsduration = "3 天";
    }
	// UserLanguage > ContentLanguage > ENGLISH
    lng = $.extend(lng.zh, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
var QuickComments = {
  init: function() {
//Import needed script
importArticles({
    type: "script",
    articles: [
        "MediaWiki:APICall/code.js"
    ]
});


//Block and delete function
  function deletes(link,parent) {
				var title = link.replace('/wiki/','');
                                var success = function() {
                                  	      $(parent).css({'color':'grey','text-decoration':'line-through'});
                                              $(parent).find("a").removeAttr("href");
                                              $(parent).fadeOut(3000);
                                };
                                var fail = function() {
                                  	      alert( lng.errorapi + ' "' + data.error.code + '": ' + data.error.info );
                                };
                                var reason = prompt(lng.deletetext,QuickCommentsdeletereason);
				apideletepage(title, reason,success, fail);
			}
//Add button below each comment
$( "li.activity-type-talk.activity-ns-1" ).each(function() {
	$(this).append('<a href="javascript:void(0)" class="Delete" title="刪除評論">刪除</a>');
        $(this).append('  <a href="javascript:void(0)" class="Block" title="封禁用戶">封禁</a>');
});
//Change html with lng
$('a.Delete').html(lng.deletebutton);
$('a.Block').html(lng.blockbutton);
//Find the delete post or the block user and block/delete him
$( "a.Delete" ).click(function() {
	var parents = $(this).parent();
	deletes($(parents).find('a.title').attr("href"),parents);
	});
$('a.Block').click(function() {
	var parents = $(this).parent();
	var text = $(parents).find('a[rel="nofollow"]').attr('href');
        var lastSlash = text.lastIndexOf('/');
                if (lastSlash !== -1) {
                var ip = text.substr(lastSlash + 1);
                var messages = function(message) {
                  alert(message);
                };
                var expirys = prompt(lng.expiry,QuickCommentsduration);
                var reasons = prompt(lng.reason,QuickCommentsreason);
                apiblockuser(ip, expirys, reasons, messages, messages);
            }
	});
},
start: function() {
if (wgCanonicalSpecialPageName != "WikiActivity") {
	return false;
}
// If user can block and delete comments in this wiki, init the script
var ug = wgUserGroups.join(' ');
if (ug.indexOf('helper') + ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') > -4) {
QuickComments.init();
if (WikiActivity) {
var ajaxFunc = WikiActivity.ajax;
	WikiActivity.ajax = function (a, b, callback) {
		return ajaxFunc.call(this, a, b, function () {
		var result = callback.apply(this, arguments);
		QuickComments.init();
		return result;
		});
	};
}
}
if (!$.isArray(window.ajaxCallAgain)) {
                        window.ajaxCallAgain = [];
                    }
					if (!QuickComments.ajaxCall) {
                    window.ajaxCallAgain.push(QuickComments.start);
					QuickComments.ajaxCall = true;
					}
}
};
QuickComments.start();
// expose public interface
    window.QuickComments = QuickComments;
}(jQuery, mediaWiki, window.QuickComments));
//</source>