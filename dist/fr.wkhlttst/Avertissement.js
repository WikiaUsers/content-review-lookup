/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

Avert = {};
Avert.width = 400;
Avert.height = 340;
Avert.position = {};
Avert.save = function() {
        var text = {
            textarea: $("nav#avert-editeur textarea#avert-editeur-textarea").val(),
            title: '== ' + $("nav#avert-editeur textarea#avert-editeur-textarea-title").val() + ' =='
        };
        if($("nav#avert-editeur textarea#avert-editeur-textarea-title").val() === '') {
            text.title = '';
        }
        switch (nmspc) {
        // Page de discussion
        case 'User_talk':
	    $.ajax({
		    url: mw.util.wikiScript( 'api' ),
		    data: {
			    format: 'json',
			    action: 'edit',
			    title: mw.config.get( 'wgPageName' ),
			    text: text.title + '\n\n' + text.textarea,
                            section: 'new',
			    token: mw.user.tokens.get("editToken")
		    },
		    dataType: 'json',
		    type: 'POST',
		    success: function( data ) {
			    if ( data && data.edit && data.edit.result == 'Success' ) {
                                    var conf = confirm("Fermer l'éditeur ?");
                                    if ( conf == true) {
                                        Avert.close();
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
        case 'Message_Wall':
            
        }
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
		'\t<h2>Avertissement :<span id="avert-editeur-fermer"></span></h2>' +
		'\t<div id="avert-editeur-title"><textarea id="avert-editeur-textarea-title" placeholder="Titre de section h2..."></textarea></div>' +
		'\t<textarea id="avert-editeur-textarea" placeholder="Votre message va ici."></textarea>' +
		'\t<input type="button" id="avert-editeur-save" value="Publier" /><input type="button" id="avert-editeur-select" value="Sélectionner" />' +
	'</nav>'
);

$('.wikia-bar').last().find('.tools').append('<li><a href="#" title="Liste des Choses à faire" id="avert-editeur-trigger">Avertir</a></li>');

$("nav#avert-editeur #avert-editeur-save").click(function() {
	Avert.save();
});

$("nav#avert-editeur #avert-editeur-select").click(function() {
	Avert.select();
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
 
/* css */
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
	'nav#avert-editeur textarea#avert-editeur-title {\n' +
                '\tmargin-top: 100px;\n' +
	'}\n' +
	'nav#avert-editeur #avert-editeur-select {\n' +
                '\tmargin-left: 10px;\n' +
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
 
/* draggable code */
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