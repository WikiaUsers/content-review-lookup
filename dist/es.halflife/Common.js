AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];

window.UserTagsJS = {
	modules: {},
	tags: {
        founder: {u: 'Director', order: -1/0 }, // siempre aparece al principio
		bureaucrat: { u: 'Burócrata', order: 0 },
		sysop: { m: 'Administrador', f: 'Administradora', u: 'Administrador/a', order: 1},
		'content-moderator': { m: 'Moderador de contenido', f: 'Moderadora de contenido', u: 'Moderador/a de contenido', order: 2},
		rollback: { m: 'Reversor', f: 'Reversora', u: 'Reversor/a', order: 3 },
		threadmoderator: { m: 'Moderador de discusiones', f: 'Moderadora de discusiones', u: 'Moderador/a de discusiones', order: 4},
		chatmoderator: { m: 'Moderador de chat', f: 'Moderadora de chat', u: 'Moderador/a de chat', order: 5},
		bot: { u: 'Bot', order: 6 },
		featured: { m: 'Usuario destacado', f: 'Usuaria destacada', u: 'Usuario/a destacado/a', order: 7 },
		newuser: { m: 'Nuevo editor', f: 'Nueva editora', u: 'Nuevo/a editor/a', order: 8 },
		inactive: { m: 'Inactivo', f: 'Inactiva', u: 'Inactivo/a', order: 9 }
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'], // quitar tag de admin en burócratas y fundador
	chatmoderator: ['sysop', 'bureaucrat'], // quitar tag mod.chat en admins y burócratas
	inactive: ['bot'] // quitar tag "inactivo" en bots
};
UserTagsJS.modules.userfilter = {
	'Pokimon Bot': ['chatmoderator', 'content-moderator', 'threadmoderator', 'rollback', 'sysop'] // eliminar estos tags si existen
};
UserTagsJS.modules.custom = {
	'Pokimon Bot': ['bot'] // añadir solamente tag de bot
};
UserTagsJS.modules.inactive = 45;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

(function(window, $, mw) {
  'use strict';
  var $rail = $('#WikiaRail');
  function mediaTags($content) {
    $content.find('.html5-audio').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
      $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
    $content.find('.html5-video').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.attr('data-width') || ''),
        height = esc($this.attr('data-height') || ''),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
      $this.html(
        '<video width="' +
          width +
          '" height="' +
          height +
          '" ' +
          options +
          '><source src="' +
          src +
          '" type="' +
          type +
          '"></video>'
      );
    });
  }
  mw.hook('wikipage.content').add(mediaTags);
  if ($rail.hasClass('loaded')) {
    mediaTags($rail);
  } else if ($rail.exists()) {
    $rail.on('afterLoad.rail', $.proxy(mediaTags, null, $rail));
  }
})(window, jQuery, mediaWiki);

$('.norc').bind('contextmenu', function(e) {
    return false;
});