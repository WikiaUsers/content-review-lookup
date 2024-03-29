/* Any JavaScript here will be loaded for all users on every page load. */

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
    /* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
    emptylordGridContainer = '#emptylord-grid';
    emptylordGridFilters = {
        'search': 'search',
        'status': ['- Status -',
            ['Conceito','Conceito inicial'],
            ['Projeto','Projeto de trabalho'],
            ['Publicado','Publicado'],
            ['Desatualizado','Desatualizado'],
            ['Retirado','Retirado'],
            ['Não especificado','N/D']
        ],
        'tipo': ['- Tipo -',
            ['Qualidade','Alterações de balanço'],
            ['Retrabalho','Atualização da jogabilidade'],
            ['Relançado','Campeão relançado'],
            ['Original','Personagem original'],
            ['Não especificado','N/D']
        ],
        'classe': ['- Classe -',
            ['Lutador','Lutador'],
            ['Executor','• Executor'],
            ['Colosso','• Colosso'],
            ['Duelista','• Duelista'],
            ['Retalhador','Retalhador'],
            ['Artilharia','• Artilharia'],
            ['Mago','• Mago'],
            ['Guarda','• Guarda'],
            ['Rebelde','• Rebelde'],
            ['Especialista','Especialista'],
            ['Suporte','Suporte'],
            ['Disruptor','• Disruptor'],
            ['Encantador','• Encantador'],
            ['Protetor','• Protetor'],
            ['Não especificado','N/D']
        ],
        'tema': ['- Direção Temática -',
            ['Atual','Tema atual'],
            ['Revisitado','Tema revisitado'],
            ['Misturado','Tema misturado'],
            ['Novel','Tema de novel'],
            ['Importado','Tema importado'],
            ['Não especificado','N/D']
        ]
    };
/* End of mw.loader.using callback */
});
 
(function() {
    function rosterGrid() {
        $(".emptylord-icon").click(function (e){
            $(".roster-info").css("display", "none");
            $(this).find("+ .roster-info").css("display", "block"); 
        });
    }
    $(rosterGrid);
    mw.hook('wikipage.content').add(rosterGrid);
}());
 
/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
 
	function emptylordGridFiltering() {
		var emptylordGrid = $(emptylordGridContainer)
		if(!emptylordGrid.length) return
		if(!emptylordGridFilteringSwitches()) return
 
		window.emptylordGridElements = []
		emptylordGrid.find('.emptylord-icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in emptylordGridFilters) {
				obj[x] = elem.data(x).split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.emptylordGridElements.push(obj)
		})
	}
 
	function emptylordGridFilteringSwitches() {
		var flag = false
		for(x in emptylordGridFilters) {
			var container = $('#emptylord-grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(emptylordGridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					emptylordGridFilteringApply()
				})
			} else if(emptylordGridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(emptylordGridFilters[x][0])
				for(var y=1;y<emptylordGridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', emptylordGridFilters[x][y][0]).html(emptylordGridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					emptylordGridFilteringApply()
				})
			}
		}
		return flag
	}
	function emptylordGridFilteringClear() {
		for(x in emptylordGridFilters) {
			$('#emptylord-grid-filter-'+x+'-field').val('')
		}
		emptylordGridFilteringApply()
	}
	function emptylordGridFilteringApply() {
		for(var x=0;x<emptylordGridElements.length;x++) {
			var elem = $(emptylordGridElements[x]['*'])
			var active = true
			for(y in emptylordGridFilters) {
				var field = $('#emptylord-grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(emptylordGridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(emptylordGridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) emptylordGridFilteringShow(elem)
			else emptylordGridFilteringHide(elem)
		}
	}
	function emptylordGridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}
	function emptylordGridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}
	$( emptylordGridFiltering )
} )( jQuery );