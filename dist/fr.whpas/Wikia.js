/*Avert = {};
Avert.width = 400;
Avert.height = 315;
Avert.position = {};
Avert.page = "A faire";
Avert.save = function() {
        var text = {
            textarea: $("nav#avert-editeur textarea#avert-editeur-textarea").val(),
        };
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
		data: {
			format: 'json',
			action: 'edit',
			title: 'A faire',
			text: text.textarea,
                        section: 'new',
			token: mw.user.tokens.get("editToken")
		},
		dataType: 'json',
		type: 'POST',
		success: function( data ) {
			if ( data && data.edit && data.edit.result == 'Success' ) {
                                var conf = confirm("Fermer l'éditeur ?");
                                if ( conf == true) {
                                    var conf2 = confirm("Aller à la page ?");
                                        if ( conf2 == true ) {
                                            window.location.href = wgServer + '/wiki/' + encodeURIComponent('A faire');;
                                        } else {
                                            Avert.close();
                                        }
                                } else {
                                    return;
                                } 
			} else if ( data && data.error ) {
				alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
			} else {
				alert( 'Error: Unknown result from API.' );
			}
		},
		error: function( xhr ) {
			alert( 'Error: Request failed.' );
		}
	});
}
Avert.remplace = function() {
        var texte = {
            textarea: $("nav#avert-editeur textarea#avert-editeur-textarea").val(),
        };
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
		data: {
			format: 'json',
			action: 'edit',
			title: Avert.page,
			text: $("nav#avert-editeur textarea").val(),
			token: mw.user.tokens.get("editToken")
		},		dataType: 'json',
		type: 'POST',
		success: function( data ) {
			if ( data && data.edit && data.edit.result == 'Success' ) {
                                var confir = confirm("Fermer l'éditeur ?");
                                if ( confir == true) {
                                    var confir2 = confirm("Aller à la page ?");
                                        if ( confir2 == true ) {
                                            window.location.href = wgServer + '/wiki/' + encodeURIComponent('A faire');;
                                        } else {
                                            Avert.close();
                                        }
                                } else {
                                    return;
                                } 
			} else if ( data && data.error ) {
				alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
			} else {
				alert( 'Error: Unknown result from API.' );
			}
		},
		error: function( xhr ) {
			alert( 'Error: Request failed.' );
		}
	});
}
Avert.purge = function() {
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
		data: {
			format: 'json',
			action: 'edit',
			title: Avert.page,
			text: ":\'\'Liste de choses à faire\'\'",
			token: mw.user.tokens.get("editToken")
		},		dataType: 'json',
		type: 'POST',
		success: function( data ) {
			if ( data && data.edit && data.edit.result == 'Success' ) {
                                conff;
                                if ( conff == true) {
                                    conff2;
                                        if ( conff2 == true ) {
                                            window.location.href = wgServer + '/wiki/' + encodeURIComponent('A faire');;
                                        } else {
                                            Avert.close();
                                        }
                                } else {
                                    return;
                                } 
			} else if ( data && data.error ) {
				alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
			} else {
				alert( 'Error: Unknown result from API.' );
			}
		},
		error: function( xhr ) {
			alert( 'Error: Request failed.' );
		}
	});
}

//contenu de la page
Avert.update = function() {
	$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=" + encodeURIComponent(Avert.page.replace(/ /g,"_")) + "&rvprop=content&cb=" + new Date().getTime(), function(data) {
		var pageData = data.query.pages;
		for (var pageid in pageData) {
			var pageContent = pageData[pageid].revisions[0]["*"]; // updated page content
			$("nav#avert-editeur textarea").val(pageContent);
		}
	});
}
// close interface
Avert.close = function() {
	$("nav#avert-editeur").hide();
}
//select
Avert.select = function() {
        document.getElementById("avert-editeur-textarea").select();
}

$("body").append(
	'<nav id="avert-editeur" style="display: none;">\n' +
		'\t<h2><a href="/wiki/A_faire">À faire</a>&nbsp;<small>(<a href="/wiki/A_faire?action=history"><small>hist.</small></a>)</small><input type="button" id="avert-editeur-vider" value="Vider l\'éditeur"/><span id="avert-editeur-fermer"></span></h2>' +
		'\t<textarea id="avert-editeur-textarea"></textarea>' +
		'\t<input type="button" id="avert-editeur-save" value="Ajouter" /><input type="button" id="avert-editeur-select" value="Sélectionner" /><input type="button" id="avert-editeur-load" value="Charger" /><input type="button" id="avert-editeur-remplace" value="Remplacer" disabled/><input type="button" id="avert-editeur-purge" value="Purger (?)" title="Vider la page"/>' +
	'</nav>'
);
 
$('.wikia-bar').last().find('.tools').append('<li><a href="#" title="Liste des Choses à faire" id="avert-editeur-trigger">Ajouter</a></li>');
 
$("nav#avert-editeur #avert-editeur-save").click(function() {
	Avert.save();
        $("input#avert-editeur-remplace").prop('disabled', true);
});
 
$("nav#avert-editeur #avert-editeur-select").click(function() {
	Avert.select();
});
//Charger le contenu
$("nav#avert-editeur #avert-editeur-load").click(function() {
	Avert.update();
        $("input#avert-editeur-remplace").prop('disabled', false);
});
$("nav#avert-editeur #avert-editeur-remplace").click(function() {
	Avert.remplace();
});
$("nav#avert-editeur #avert-editeur-purge").click(function() {
	Avert.purge();
});
$("nav#avert-editeur #avert-editeur-vider").click(function() {
	$("nav#avert-editeur textarea#avert-editeur-textarea").val('');
});
$("#avert-editeur-trigger").click(function(event) {
	event.preventDefault();
	if ($("nav#avert-editeur").css("display") == "none") {
		$("nav#avert-editeur").show();
	}
});
 
$("nav#avert-editeur #avert-editeur-fermer").click(function() {
	Avert.close();
});
 
// css 
mw.util.addCSS(
	'nav#avert-editeur {\n' +
                '\tborder-radius: 10px;\n' +
		'\tz-index: 999999;\n' +
		'\twidth: ' + Avert.width + 'px;\n' +
		'\theight: ' + Avert.height + 'px;\n' +
		'\tposition: fixed;\n' +
		'\tleft: ' + ((screen.availWidth - Avert.width) / 2) + 'px;\n' +
		'\ttop: ' + ((screen.availHeight - Avert.height - 40) / 2) + 'px;\n' +
		'\tpadding: 10px 10px 3px 10px;\n' +
		'\tbackground: SkyBlue;\n' +
		'\tcursor: move;\n' +
	'}\n' +
	'nav#avert-editeur textarea#avert-editeur-textarea {\n' +
		'\twidth: ' + (Avert.width - 4) + 'px;\n' +
		'\theight: 260px;\n' +
		'\tresize: none;\n' +
                '\tmargin-bottom: 2px\n' +
	'}\n' +
	'nav#avert-editeur #avert-editeur-select,\n' +
        'nav#avert-editeur #avert-editeur-remplace,\n' +
        'nav#avert-editeur #avert-editeur-purge,\n' +
        'nav#avert-editeur #avert-editeur-load, \n' +
        'nav#avert-editeur #avert-editeur-vider {\n' +
                '\tmargin-left: 10px;\n' +
	'}\n' +
        'nav#avert-editeur #avert-editeur-vider {\n' +
                '\tmargin-bottom: 3px;\n' +
        '}\n' +
	'nav#avert-editeur textarea#avert-editeur-textarea-title {\n' +
		'\twidth: ' + (Avert.width - 4) + 'px;\n' +
                '\theight: 15px;\n' +
		'\tresize: none;\n' +
                '\tmargin-bottom: 3px;\n' +
	'}\n' +
	'nav#avert-editeur #avert-editeur-fermer {\n' +
		'\tdisplay: inline-block;\n' +
		'\twidth: 20px;\n' +
		'\theight: 20px;\n' +
		'\tfloat: right;\n' +
		'\tbackground: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emblem-unreadable.svg/20px-Emblem-unreadable.svg.png\') center no-repeat;\n' +
		'\tborder: 1px solid #cccccc;\n' +
		'\tborder-radius: 3px;\n' +
		'\t-moz-border-radius: 3px;\n' +
		'\t-webkit-border-radius: 3px;\n' +
		'\tcursor: hand;\n' +
		'\tcursor: pointer;\n' +
	'}'
);
 
// draggable code
$("nav#avert-editeur").mousedown(function(event) {
	if (["avert-editeur-enr","avert-editeur-textarea","avert-editeur-textarea-title"].indexOf(document.activeElement.id) == -1) { // didn't select textarea or save button
		var a = this.getBoundingClientRect();
		Avert.position.navTop = a.top;
		Avert.position.navLeft = a.left;
		Avert.position.curTop = event.clientY;
		Avert.position.curLeft = event.clientX;
		$(this).addClass("drag");
	}
});
$(document).on("mousemove", function(event) {
	if ($("nav#avert-editeur").hasClass("drag") && $("nav#avert-editeur").css("display") == "block") {
		var Y = event.clientY,
			X = event.clientX;
		$("nav#avert-editeur").css({
			"top": ( Avert.position.navTop + Y - Avert.position.curTop ),
			"left": ( Avert.position.navLeft + X - Avert.position.curLeft )
		});
	}
});
$("nav#avert-editeur").mouseup(function() {
	$(this).removeClass("drag");
});
*/

$( document ).ready(function () {
    $('.wikia-bar').last().find('.tools').append('<li><a href="#" title="Liste des Choses à faire" id="avert-editeur-trigger">Ajouter</a></li>');
    $( '#avert-editeur-trigger' ).click(function() {
        getUtilisateur();
    });
    function getUtilisateur() {
        if($( '#aaatextarea' ).length) {
            $('#aaatextarea, .aaa-actions').show();
        } else {
            $( '#globalNavigation, .WikiaBarWrapper' ).css('z-index', '999998');
            $( 'body' ).prepend('<style>.vert{color:green}.rouge{color:red}.aaa-actions div{clear:none;float:left}#crotz:hover, #publicar:hover{background-color:#271e1c;border-radius:15px!important;border:1px solid dimgrey!important}</style>');
            $( 'body' ).append('<textarea id="aaatextarea" style="z-index: 999999; position: fixed; left: 0px; top: 0px; padding: 20px; font-family: monaco,monospace; color: #9ac; height: 99%; width: 100%; background-color: #1d1e1c"></textarea><div class="aaa-actions" style="z-index: 1000000; position: fixed; right: 30px; top: 20px;"><div id="estatut" class="vert" style=" height: 106px; transition: 0.2s; font-size: 14px; padding: 50px; align: center;">Publié</div><div id="publicar" style="padding: 5px;border: 1px solid transparent;border-radius: 15px;transition: 0.5s;cursor: pointer;font-size: 300%;font-family: fantasy;padding: 30px;margin-right: 20px;">Publier</div><div id="crotz" style="padding: 5px;border: 1px solid transparent;border-radius: 15px;transition: 1s;cursor: pointer;"><div style="background: url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Noun_project_-_supprimer_round.svg/200px-Noun_project_-_supprimer_round.svg.png\'); height: 90px; width: 90px;background-size: contain;background-repeat: no-repeat;"></div></div></div><div class="successhehe" style="font-size: 230px; opacity: 0.1; font-weight: bold; position: fixed; color: green; display: none; z-index: 1000000">Succès !</div>');
            $.getJSON("/api.php?action=query&format=json&prop=revisions&titles=A_faire&rvprop=content&cb=" + new Date().getTime(), function(data) {
                if(data.query.pages[-1] === undefined) {
                    var page_Data = data.query.pages,
                        page_Content;
                    for (var page_id in page_Data) {
                        page_Content = page_Data[page_id].revisions[0]["*"]; // updated page content
                    }
                    $('.successhehe').css('top', (($(window).height() / 2) - ($( '.successhehe' ).height() / 2)) + 'px').css('left', (($(window).width() / 2) - ($( '.successhehe' ).width() / 2)) + 'px');
                    $('#aaatextarea').css('height', ($(window).height() - 32) + 'px');
                    $('#aaatextarea').text(page_Content);
                    ;(function($){
                        $.fn.extend({
                            acabat: function(callback,timeout){
                                timeout = timeout || 1e3; // 1 second default timeout
                                var timeoutReference,
                                    doneTyping = function(el){
                                        if (!timeoutReference) return;
                                        timeoutReference = null;
                                        callback.call(el);
                                    };
                                return this.each(function(i,el){
                                    var $el = $(el);
                                    $el.is(':input') && $el.on('keyup keypress', function(e){
                                        if (e.type=='keyup' && e.keyCode!=8) return;
                                        if (timeoutReference) clearTimeout(timeoutReference);
                                        timeoutReference = setTimeout(function(){
                                            doneTyping(el);
                                        }, timeout);
                                    }).on('blur',function(){
                                        doneTyping(el);
                                    });
                                });
                            }
                        });
                    })(jQuery);                        
                    $( '#aaatextarea' ).acabat(function() {
                        if($(this).val() == page_Content) {
                            $('#estatut').text('À jour');
                            $('#estatut').removeClass('rouge').addClass('vert');
                        } else {
                            $('#estatut').text('Pas à jour');
                            $('#estatut').removeClass('vert').addClass('rouge');
                        }
                    });
                } else {
                    alert('La page demandée n\'existe pas');
                }
            });
            $( '#publicar' ).on('click', function() {
                $.ajax({
                    url: mw.util.wikiScript( 'api' ),
                    data: {
                        format: 'json',
                        action: 'edit',
                        title: 'A faire',
                        text: $( '#aaatextarea' ).val(),
                        token: mw.user.tokens.get("editToken")
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function( data ) {
                        if ( data && data.edit && data.edit.result == 'Success' ) {
                            $(".successhehe").fadeIn('fast');
                            setTimeout(function() {
                                $(".successhehe").fadeOut();
                            }, 800);
                            var page_Content = $( '#aaatextarea' ).val();
                            $('#estatut').text('À jour');
                            $('#estatut').removeClass('rouge').addClass('vert');
                        } else if ( data && data.error ) {
                            alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                        } else {
                            alert( 'Error: Unknown result from API.' );
                        }
                    },
                    error: function( xhr ) {
                        alert( 'Error: Request failed.' );
                    }
                });
            });
        }
        $( '#crotz' ).click(function() {
            $( '#aaatextarea, .aaa-actions' ).hide();
        });
    }
    /*if(mw.config.get('wgPageName') === 'A_faire') {
        $( '.WikiaArticle li' ).each(function () {
            $(this).wrapInner('<span class="deleteinner"></span>');
            $(this).append('<span class="deleteli" style="background:url(\'https://upload.wikimedia.org/wikipedia/commons/2/21/DeleteWinIcon.png\');background-size:contain;cursor:pointer;float:right;padding:10px"></span>');
        });
        $('span.deleteli').on('click', function() {
            var $this = $(this);
            $.getJSON("/api.php?action=query&format=json&prop=revisions&titles=A_faire&rvprop=content&cb=" + new Date().getTime(), function(data) {
                if(data.query.pages[-1] === undefined) {
                    var Data = data.query.pages,
                        Content;
                    for (var pageid in Data) {
                        Content = Data[pageid].revisions[0]["*"]; // updated page content
                    }
                    var litext = $this.parent('li').find('.deleteinner').html();
                    alert(litext);
                    $this.parent('li').remove();
                    litexta = litext.replace(/<i>|<\/i>/g, '\'\'').replace(/<b>|<\/b>/g, '\'\'\'').replace('&nbsp;', ' ');
                    alert(litexta);
                    var litextb = Content.replace('*' + litexta, '').replace('* ' + litexta, '');
                    alert(litextb);
                    $.ajax({
                        url: mw.util.wikiScript( 'api' ),
                        data: {
                            format: 'json',
                            action: 'edit',
                            title: 'A faire',
                            text: litextb,
                            token: mw.user.tokens.get("editToken")
                        },
                        dataType: 'json',
                        type: 'POST',
                        success: function( data ) {
                            if ( data && data.edit && data.edit.result == 'Success' ) {
                                console.log('succès');
                            } else if ( data && data.error ) {
                                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
                            } else {
                                alert( 'Error: Unknown result from API.' );
                            }
                        },
                        error: function( xhr ) {
                            alert( 'Error: Request failed.' );
                        }
                    });
                } else {
                    alert('La page demandée n\'existe pas');
                }
            });
        });        
    }*/
});

/* Avertissement badges */

var ug = wgUserGroups.join(' ');
if (ug.indexOf('helper') + ug.indexOf('sysop') > -2) {
    $( document ).ready(function() {
    $('.WikiaArticle').prepend('<li><input type="button" value="Nouvelle activité" id="modif-badges-avert"></li>');
            var nauser1;
            var nauser2;
            var wgun = mw.config.get( 'wgUserName' );
            switch (wgun) {
                case "Hulothe":
                    nauser1 = "F.Halliwell";
                    nauser2 = "-Shinrabanshou.";
                    nauser3 = "Alastor le guerrier";
                    break;
                case "F.Halliwell":
                    nauser1 = "Hulothe";
                    nauser2 = "-Shinrabanshou.";
                    nauser3 = "Alastor le guerrier";
                    break;
                case "-Shinrabanshou.":
                    nauser1 = "Hulothe";
                    nauser2 = "F.Halliwell";
                    nauser3 = "Alastor le guerrier";
                    break;
            }
            var avertissement = '<p>Bonjour ' + nauser1 + ' ou ' + nauser2 + ' !</p>' +
'<p>Il y a du nouveau sur le WHPAS !</p>';
	    $('#modif-badges-avert').click(function() {
                var succès = "Message posté avec succès !";
	        $.post(mw.util.wikiScript('wikia'), {
                    controller   : 'WallExternal',
                    method       : 'postNewMessage',
                    pagenamespace: '1200',
                    pagetitle    : nauser1,
                    messagetitle : 'Nouvelle activité',
                    body         : avertissement + '\n\n~~' + '~',
                    format       : 'json'
                });
	        $.post(mw.util.wikiScript('wikia'), {
                    controller   : 'WallExternal',
                    method       : 'postNewMessage',
                    pagenamespace: '1200',
                    pagetitle    : nauser2,
                    messagetitle : 'Nouvelle activité',
                    body         : avertissement + '\n\n~~' + '~',
                    format       : 'json'
                });
                alert(succès);
                window.location.reload();			
        });
    });
}

$( '#bouton-slider' ).click(function() {
    var a = Number($( '#input-slider' ).val()) * 1.861111111111111111111111111,
        b = Math.round(a * 10) / 10;
    $( '#div-slider' ).text(b);
});
$( '#bouton-slider2' ).click(function() {
    var a = Number($( '#input-slider' ).val()) / 1.861111111111111111111111111,
        b = Math.round(a * 10) /10;
    $( '#div-slider' ).text(b);
});