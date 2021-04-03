/**
 * @name VisionaryPage
 * @author Xakuzyo
 * @version 0.1.0
 * @status WIP (if this script is submitted to revision PLEASE REJECT IT)
*/

(function() {
	var visionaryPage = {
		forms: [
			{
				name: 'Crear objeto',
				slug: 'CrearObjeto',
				content: [
					{
						type: 'paragraph',
						content: 'Aquí puedes crear un artículo para un objeto del juego Terraria de un mod de Terraria.'
					}
				]
			}
		],
		conf: mw.config.get([
			'wgCanonicalSpecialPageName',
			'wgTitle'
		]),
		formInject: 0,
		canExec: function() {
			var can = false;
			if (this.conf.wgCanonicalSpecialPageName !== 'Blankpage') return false;
			this.forms.forEach(function(form, i) {
				if (form.slug === visionaryPage.conf.wgTitle.split('/')[1]) {
					visionaryPage.formInject = i;
					can = true;
					return;
				}
			});
			return can;
		},
		init: function() {
			const formToInject = this.forms[this.formInject];
			$('.page-header__title').text(formToInject.name);
		}
	};
	
	mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        if (visionaryPage.canExec()) {
            $($.proxy(visionaryPage.init, visionaryPage));
        } else {
        	console.log('No se puede iniciar VisionaryPage aquí.');
        }
    });
})();

/**
 * @name Dstorly
 * @author Xakuzyo
 * @version 0.1.0
 * @status WIP (if this script is submitted to revision PLEASE REJECT IT)
*/

(function (){
	var Dstorly = {
		// Util
		err: function(s) {
			return console.error('[Dstorly] ' + s);
		},
		log: function(s) {
			return console.log('[Dstorly] ' + s);
		},
		newEl: function(tag, attrs) {
			if (typeof tag !== 'string') return this.err('Tag name string expected but got ' + typeof tag);
			if (!(attrs instanceof Object)) return this.err('Attrs object expected but got' + typeof attrs + ' ('+attrs.constructor.name+')');
			return $('<'+tag+'>', attrs);
		},
		init: function() {
			var self = this,
				button = this.newEl('button', { 
					text: 'Ajustes de interfaz',
					onclick: self.log('Test')
				});
			
			$('.WikiaPage').after(button);
		}
	};
	
	mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(function() {
        $($.proxy(Dstorly.init, Dstorly));
    });
})();