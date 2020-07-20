// <pre>
if(window.CreaEnlacesDex){
	CreaEnlacesDex.prototype.link = function(url, text, caption){
		if (!$G('widgets_1')) return;
		if (! $G('widget_901')){
			var pDd = $UT.create('li', {'class':'widget WidgetDexLinks', id:'widget_901'},[
				$UT.create('div', {'class':'sidebar clearfix', id:'widget_901'}, [
					$UT.create('h1', {id:'widget_901_header'}, 'Otras Pokédex'),
					$UT.create('div', {'class':'widgetContent WidgetSidebar', id:'widget_901_content'}, [
						'Consulta los datos '+(this.vars.tipo=='p'?'del Pokémon ':'del movimiento '),
						$UT.create('span', {'class':'dexitemname'}, (this.vars.nombre||wgTitle)),
						' en otras Pokédex:',
						$UT.create('ul', {'class':'listLeft'}),
						$UT.create('ul', {'class':'listRight'})
					])
				])
			]);
			$G('widgets_1').insertBefore(pDd, $G('widgets_1').firstChild);
			new YAHOO.wikia.ddObject(pDd.id);
		}
		var aUL = $G('widget_901_content').getElementsByTagName('ul');
		aUL[1].appendChild($UT.create('li', [
			$UT.create('a', {href:url, title:caption}, text)
		]));
		if (aUL[1].getElementsByTagName('li').length > aUL[0].getElementsByTagName('li').length){
			aUL[0].appendChild(aUL[1].getElementsByTagName('li')[0]);
		}
	}
}
// </pre>