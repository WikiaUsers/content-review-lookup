// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">

/* Usuario con Cargo */

(function () {
    "use strict";
    var userRightsList = {
        "Carlos.nintendo": ["Reiniciante del Proyecto"]
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

/**** Aviso de licencias ****/

$(function(){
var texto = '<table style="border:2px solid #000080; background:DeepSkyBlue;" cellspacing="0">\
<tbody><tr>\
<td style="padding: 0.3em 2em; background:DeepSkyBlue;">\
<p>Las imágenes de Nintendo no nos pertenecen. Por eso las licencias nos ayudan a indicar el tipo de imagen y a quien pertenece (quien posee su copyright). Son muy importantes. <b>Ten en cuenta que si es de Mario, la imagen no podrá ser libre, por eso siempre tendrás que recurrir a las licencias de imágenes con copyrights.</b>\
</p>\
</td></tr></tbody></table>';
	if({ edit:1, submit:1 }[mw.config.get('wgAction')]) {
		WikiaEditor.load("WikiaMiniUpload").done(function() {
			var _texto = WMU_indicator;
			WMU_indicator = function(arg1, arg2) {
				_texto.call(this, arg1, arg2);
				if(arg1 === 1 && !arg2) {
					var element = $("#ImageUploadMain");
					if(element.html()) element.html(element.html() + texto);
				}
			};
		});
	}
});

// </source>