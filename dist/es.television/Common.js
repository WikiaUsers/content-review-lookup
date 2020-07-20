// Variables (MediaWiki:ImportJS)
    // AjaxRC
    window.ajaxSpecialPages = ["RecentChanges", "WikiActivity", "Log", "Contributions"];
    window.ajaxRefresh = 10000;

// Plantilla:Usuario
$('.nombreusuario').html(wgUserName);

// Imágenes
$('.cargar-imagen').each(function() {
	var imagen = {
		url: $(this).data('url'),
		width: $(this).data('width') || '',
		align: $(this).data('align') || '',
		link: $(this).data('link') || '',
		extlink: $(this).data('link') || ''
	};
	if (imagen.url) {
		if (imagen.link) {
			$(this).html('<a href="/wiki/' + encodeURI(imagen.link) + '"><img src="' + imagen.url + '" align="' + imagen.align + '" width="' + imagen.width + '" /></a>');
		} else if (imagen.extlink) {
			$(this).html('<a href="' + encodeURI(imagen.extlink) + '"><img src="' + imagen.url + '" align="' + imagen.align + '" width="' + imagen.width + '" /></a>');
		} else {
			$(this).html('<img src="' + imagen.url + '" align="' + imagen.align + '" width="' + imagen.width + '" />');
		}
	} else {
		$(this).html('<strong style="color: red;">¡Debes especificar la URL de la imagen!</strong>');
	}
});

// Soundcloud
$(function() {
  var latino       = $('.soundcloud').data('latino') || '',
      espana       = $('.soundcloud').data('espana') || '';
  var playerlatino = '<iframe width="100%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + latino + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>',
      playerespana = '<iframe width="100%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + espana + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>';
  if (espana && latino) {
    $('.mw-content-ltr').prepend('<div id="version" style="background: #def1fa; border: 2px solid #08f; border-radius: 7px; margin: 13px; padding:13px; text-align:center; padding-top: 21px; padding-bottom: 21px;">¿Qué versión de ésta canción quieres escuchar? <br /> <a class="wikia-button latino">Latinoamérica</a> <a class="wikia-button espana">España</a></div>');
    $('#version a.latino').click(function() {
      $('#version').hide();
      $('.mw-content-ltr').prepend(playerlatino);
    });
    $('#version a.espana').click(function() {
      $('#version').hide();
      $('.mw-content-ltr').prepend(playerespana);
    });
  } else if (latino !== '') {
    $('.mw-content-ltr').prepend(playerlatino);
  } else if (espana !== '') {
    $('.mw-content-ltr').prepend(playerespana);
  }
});