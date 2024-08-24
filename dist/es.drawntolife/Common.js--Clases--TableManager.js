//<pre>
/************************************/
/* TableManager: Permite mostrar/ocultar y mover las columnas de una tabla a voluntad, y ordenar las filas por una o varias columnas
 * Copyright (C) 2008  Jes�s Mart�nez Novo ([[User:Ciencia Al Poder]])
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 *
 * @param {HTMLTable} table: Tabla sobre la que actuar
 * @param {object} cfg: (opcional) Configuraci�n adicional:
 *   unsortable:{bool} Indica si debe deshabilitar la ordenaci�n. En ese caso no aparecer�n controles de ordenaci�n. El mismo efecto se consigue con class="unsortable" en la tabla
 *   emptysort:{number} Indica la posici�n de las celdas vac�as: 1: siempre arriba (independientemente de la ordenaci�n), -1:siempre abajo (�dem), 0:lo determinar� la funci�n de ordenaci�n
 *   sortCfg:{obj} Funciones de ordenaci�n. El nombre de cada objeto se usar� como CSSClass en los botones de ordenaci�n (tm-sort-{nombre} (y sufijo -asc o -dsc seg�n estado actual)). Tambi�n sirve para determinar desde el inicio la funci�n de ordenaci�n a comprobar, oniendo como CSSClass en la columna sort{nombre}
 *    {
 *     testFn: {function} funci�n que determina si debe ser �sta la ordenaci�n. Par�metros: 1:celda 2:texto de la celda. Si es null se asume que debe usarse �ste par�metro de ordenaci�n y no comprueba el resto de opciones. �til para la �ltima funci�n.
 *     sortFn: {function} funci�n de ordenaci�n (compatible con funciones de SortableTables de MediaWiki). Par�metros: a,b = Array[1:fila, 2:texto de la celda, 3:�ndice actual de fila, en negativo si se ordena al rev�s, 4:celda].
 *     priority: {number} prioridad para determinar qu� reglas se comprobar�n antes
 *     title: {string} T�tulo del tipo de datos de ordenaci�n, para el texto de los botones.
 *    }
 */
function TableManager(table,cfg){
	cfg = cfg||{};
	// {obj} Configuraciones
	this.cfg = { unsortable:false, emptysort:0 };
	YAHOO.lang.augmentObject(this.cfg,cfg,true);
	// {HTMLTable} Tabla asociada
	this.table = table;
	// {bool} Si se ha cargado la configuraci�n de la tabla
	this.tableInit = false;
	// {bool} Recargar datos de di�logo
	this.reloadDlg = true;
	// {YUIDialog} Di�logo
	this.dlg = null;
	this.sortCfg = {
		number: {testFn:function(c,t){
			return (t=='') || (t=='-') || /^([-]\s*)?(\d+|\d{1,3}([.]\d{3})+)(,\d+)?(\s*[%\u00a3$\u20ac])?$/.test(t);
		}, sortFn:function(a,b){
			var A = a[1], B = b[1];
			if (A=='') return B=='' ? 0 : -1;
			else if (B == '') return 1;
			if (A=='-') A = '0';
			if (B=='-') B = '0';
			var aa = parseFloat(A.replace(/[.\s%\u00a3$\u20ac]/g,'').replace(',','.')), bb = parseFloat(B.replace(/[.\s%\u00a3$\u20ac]/g,'').replace(',','.'));
			return (isNaN(aa) ? 0 : aa) - (isNaN(bb) ? 0 : bb);
		}, priority:1, title:'num�rico'},
		text: {testFn:null, sortFn:function(a,b) {
			var A = a[1].toLowerCase(), B = b[1].toLowerCase();
			return (A<B ? -1 : A>B ? 1 : 0);
		}, priority:99, title:'alfab�tico'}
	};
	if (cfg.sortCfg) this.sortCfg = YAHOO.lang.augmentObject(this.sortCfg,cfg.sortCfg,true);
	this.init();
}

TableManager.prototype = {
	version:'1.1',
	init: function(args){
		var mb = $T.create('span', {'class':'menubtn'}, 'opciones de tabla');
		var panel = $T.create('div', {'class':'tm-ctrl noprint'}, [mb]);
		this.table.parentNode.insertBefore(panel,this.table);
		$E.on(mb,'click',this.menuClick,null,this);
	},
	menuClick:function(e){
		if (!this.tableInit) this.initTable();
		this.showDialog(e);
	},
	// Inicializaci�n y lectura de las propiedades de la tabla
	initTable:function(){
		for (var i=0, cs = this.table.rows[0].cells; i < cs.length; i++){
			cs[i].tmColDfn = {
				// {number} �ndice original
				originalIndex:cs[i].cellIndex,
				// {number} nuevo �ndice despu�s de mover
				newIndex:cs[i].cellIndex,
				// {bool} indica si est� visible
				visible:true,
				// {object}
				//  state: {number} 0: sin ordenar, 1: ascendente, -1:descendente
				//  oldState: {number} 0: sin ordenar, 1: ascendente, -1:descendente
				//  sortFn: {function} Funci�n de ordenaci�n.
				//  title: {string} t�tulo
				//  name: {string} nombre para className
				//  priority: {number} Prioridad en ordenaci�n multi-columna
				//  oldPriority: {number} Prioridad anterior
				sort:null
			};
		}
		// Si se define que la tabla no debe permitir ordenaci�n, no hace falta continuar
		if ((' '+this.table.className+' ').indexOf(' unsortable ') != -1) this.cfg.unsortable = true;
		if (this.cfg.unsortable || !this.sortCfg){
			this.tableInit = true;
			return;
		}
		// Determinamos la ordenaci�n
		// Generamos opciones de ordenaci�n por prioridad
		var cSort=[];
		for (var item in this.sortCfg){
			this.sortCfg[item].name = item;// Lo necesitamos para obtener el nombre despu�s
			cSort.push(this.sortCfg[item]);
		}
		if (!cSort.length){
			this.tableInit = true;
			return;
		}
		cSort.sort(function(a,b){ return (a.priority||0)-(b.priority||0); });
		var kSort=[]; // �ndice de funci�n de ordenaci�n
		// Primero si lo han definido en la propia columna
		for (var i=0, cs = this.table.rows[0].cells; i < cs.length; i++){
			// Si la columna tiene class unsortable, le deshabilitamos orden
			if ((' '+cs[i].className+' ').indexOf(' unsortable ') != -1){
				kSort[i] = -1;
				continue;
			}
			for (var j=0; j < cSort.length; j++){
				if ((' '+cs[i].className+' ').indexOf(' sort'+cSort[j].name+' ') != -1){
					kSort[i] = j;
					break;
				}
			}
		}
		// Determinamos la ordenaci�n a nivel de columna
		// Recorremos las filas para determinar el orden
		for (var i=1, rs = this.table.rows; i < rs.length; i++){
			var cSkip = 0;// Celdas ya completas
			for (var j=0, cs = rs[i].cells; j < cs.length; j++){
				kSort[j] = (kSort[j]||0);
				// Condici�n de salida r�pida: Si no es ordenable, o no tiene testFn
				if (kSort[j] == -1 || !cSort[kSort[j]].testFn ){
					cSkip++;
					continue;
				}
				var t = this.getTextContent(cs[j]);
				// Miramos si se saltan las celdas vac�as
				if (this.cfg.emptysort != 0 && t=='') continue;
				// Recorremos las funciones de ordenaci�n para encontrar la que funcione
				for (var k = kSort[j]; k < cSort.length; k++){
					if (!cSort[k].testFn || cSort[k].testFn(cs[j],t)){
						kSort[j] = k;
						break;
					}
					// Si no ha pasado la �ltima funci�n, no es ordenable
					if (k == cSort.length - 1) kSort[j] = -1;
				}
			}
			// Salida r�pida
			if (cSkip == cs.length) break;
		}
		// Indicamos la ordenaci�n final
		for (var i=0, cs = this.table.rows[0].cells; i < cs.length; i++){
			if (typeof kSort[i] != 'undefined' && kSort[i] != -1){
				var s = cSort[kSort[i]];
				cs[i].tmColDfn.sort = {state:0, oldState:0, sortFn:s.sortFn, title:s.title, name:s.name, priority:0, oldPriority:0};
			}
		}
		this.tableInit = true;
	},
	// Devuelve el valor en texto de un elemento HTML
	getTextContent:function(el){
		if ((el.nodeType == 1 && el.getElementsByTagName('img').lenght == 0) || el.nodeType != 1) return $T.trim(el.textContent || el.innerText || '');
		var str = '', cs = el.childNodes;
		for (var i = 0; i < cs.length; i++) {
			if (cs[i].nodeType == 1){ //ELEMENT
				if (cs[i].tagName.toLowerCase() == 'img') str += cs[i].alt;
				else str += this.getTextContent(cs[i]);
			} else if (cs[i].nodeType == 3){ //TEXT
				str += cs[i].nodeValue;
			}
		}
		return $T.trim(str);
	},
	showDialog:function(e){
		$E.stopEvent(e);
		if (this.reloadDlg) this.genDialog();
		this.dlg.show();
		this.dlg.center();
		// Se hace aqu� porque se desactivar� al ocultar
		this.dlg.cfg.setProperty('constraintoviewport',true);
	},
	// Crea el di�logo
	genDialog:function(){
		// Di�logo base
		if (!this.dlg){
			var el = $T.create('div');
			$D.generateId(el,'tm-dlg');
			document.body.appendChild(el);
			this.dlg = new YAHOO.widget.Dialog(el, {
				visible: false,
				modal: true,
				dragOnly: true,
				buttons: [
					{ text: 'Aplicar cambios', handler: { fn: this.applyChanges, scope: this } },
					{ text: 'Cancelar', handler: function(){ this.cancel();} }
				]
			});
			this.dlg.setHeader('Controles de tabla');
			this.dlg.subscribe('beforeHide', function(){
				// Desactivamos propiedad porque sino no dejar� hacer la siguiente instrucci�n
				this.cfg.setProperty('constraintoviewport',false);
				// Lo posicionamos fuera de los m�rgenes porque en FF2(X11) aun oculto se ve la silueta semitransparente del di�logo
				this.moveTo(-10000,-10000);
			});
			// Si ha cancelado, dejamos opciones como estaban
			this.dlg.subscribe('cancel', function(){ this.discardChanges(); }, null, this);
			// Hasta que no se renderiza no hay body. Si aun no existe, encolamos el evento. Una vez se haya hecho no se deber�a volver a agregar porque el elemento no se destruye.
			if (!this.dlg.body){
				this.dlg.subscribe('render', function(){
					$E.addListener(this.dlg.body,'mousedown',this.beginMove,null,this);
					$E.addListener(this.dlg.body,'click',this.dlgClick,null,this);
				}, null, this);
			}
			// Si se sobrescribe el contenido, borramos referencias
			this.dlg.subscribe('changeBody', function(){ this.moveArgs.locator = null; }, null, this);
			$D.addClass(this.dlg.element,'tm-dialog');
			// Datos para mover columnas:
			//  target: [HTMLTableCell] celda que inici� el movimiento
			//  proxy: [HTMLDiv] Div del contorno de lo que se mueve
			//  locator: [HTMLDiv] Div indicando la posici�n destino donde se mueve
			//  visible: [bool] Indica si el contorno se muestra
			//  rowRegionCache: [Array([Array([YUIRegion],[HTMLTableRow])])]  Array de colecci�n de region y TableRow para obtener la posici�n
			this.moveArgs = {target:null, proxy:null, locator:null, visible:false, rowRegionCache:null};
		}
		// Tabla con el contenido
		var t = $T.create('table');
		// Informamos el contenido
		this.dlg.setBody(t);
		for (var i=0, cs = this.table.rows[0].cells; i < cs.length; i++){
			var d = cs[i].tmColDfn;
			if (!d) continue;
			var r = t.insertRow(t.rows.length);
			// Asignamos una referencia a la celda
			r.tmCell = cs[i];
			this.dlg.cplTBody = t.tBodies[0];// Atajo
			// Check de "Visible"
			var c1 = r.insertCell(0);
			c1.className = 'tm-tc-vis';
			var chk = $T.create('input', { type:'checkbox' });
			if (cs[i].tmColDfn.visible) chk.checked = true;
			c1.appendChild(chk);
			// T�tulo de la columna
			var c2 = r.insertCell(1);
			c2.className = 'tm-tc-col';
			c2.appendChild(document.createTextNode( cs[i].innerText ? cs[i].innerText : cs[i].textContent ));
			if (!this.cfg.unsortable){
				// Bot�n ordenaci�n
				var c2 = r.insertCell(2);
				c2.className = 'tm-tc-sort';
				if (!d.sort) c2.appendChild($T.create('div', { 'class':'tm-unsortable', title:'Sin orden' }));
				else {
					c2.appendChild($T.create('div', [$T.create('span',{'class':'tm-sortpri'},'')]));
					this.changeSortState(i,0);
				}
			}
		}
		// Header
		var thr = t.createTHead().insertRow(0);
		thr.insertCell(0).appendChild($T.create('span', {title:'S�lo se mostrar�n las columnas que est�n marcadas'}, 'Mostrar'));
		thr.insertCell(1).appendChild($T.create('span', {title:'Puedes mover las columnas de posici�n con el mouse, haciendo clic y movi�ndolo sin soltar el bot�n'}, 'Columna'));
		if (!this.cfg.unsortable){
			thr.insertCell(2).appendChild($T.create('span', {title:'Selecciona la columna por la que se ordenar�n las filas'}, 'Orden'));
			var c = $T.create('input', {type:'checkbox'});
			this.dlg.body.appendChild($T.create('div', {'class':'tm-options'}, [c,$T.create('label',{'for':$D.generateId(c,'tm-chk')},'Permitir ordenar m�ltiples columnas')]));
			this.dlg.multiSort = c;// Atajo
		}
		// Renderizamos
		this.reloadDlg = false;
		this.dlg.render();
	},
	// Evento en MouseDown
	beginMove:function(e){
		if (e.button!=0 || e.ctrlKey || e.shiftKey || e.altKey) return;
		$E.stopEvent(e);
		var target = $E.getTarget(e);
		// S�lo si estamos sobre el nombre de columna
		if (target.tagName.toLowerCase() != 'td' || target.className != 'tm-tc-col') return;
		// Queremos trabajar sobre la row
		target = target.parentNode;
		this.moveArgs.target = target;
		// Agregamos eventos
		$E.addListener(document.body,'mousemove',this.colMove,null,this);
		$E.addListener(document.body,'mouseup',this.endMove,null,this);
		// Creamos indicadores
		if (!this.moveArgs.proxy){
			this.moveArgs.proxy = $T.create('div', {'class':'tm-dlg-proxy', style:'display:none;'});
			// Lo situamos fuera el body para que no se elimine si cambia �ste
			this.dlg.element.appendChild(this.moveArgs.proxy);
		}
		if (!this.moveArgs.locator){
			this.moveArgs.locator = $T.create('div', {'class':'tm-dlg-locator', style:'display:none;'});
			this.dlg.body.appendChild(this.moveArgs.locator);
		}
		// Region de TR
		var reg = $D.getRegion(target);
		$D.setStyle([this.moveArgs.proxy,this.moveArgs.locator], 'width', (reg.right - reg.left).toString()+'px');
		$D.setStyle(this.moveArgs.proxy, 'height', (reg.bottom - reg.top).toString()+'px');
		// Posicionamos proxy en mitad del puntero
		$D.setStyle(this.moveArgs.proxy, 'display', 'block');
		$D.setXY(this.moveArgs.proxy,[ ( $E.getXY(e)[0] - (reg.right - reg.left)/2 ) , ( $E.getXY(e)[1] - (reg.bottom - reg.top)/2 ) ]);
		// Esto para que no se seleccione texto al mover
		this.moveArgs.proxy.focus();
		// El otro s�lo lo posicionamos, pero no lo mostramos
		$D.setX(this.moveArgs.locator, reg.left);
		// Creamos la cache de region de todas las filas
		this.moveArgs.rowRegionCache = new Array();
		// Agregamos primero el contenedor para agilizar la detecci�n de que estamos fuera:
		var tb = this.dlg.cplTBody;
		this.moveArgs.rowRegionCache.push([$D.getRegion(tb),null]);
		for (var i=0; i < tb.rows.length; i++) this.moveArgs.rowRegionCache.push([$D.getRegion(tb.rows[i]), tb.rows[i]]);
		// Agregamos clase para marcar que est� seleccionada.
		if ((' '+target.className+' ').indexOf(' m-selected ') == -1) target.className += ' m-selected';
	},
	// Evento en MouseMove
	colMove:function(e){
		$E.stopEvent(e);
		// Posicionamos proxy en la mitad del puntero
		var reg = $D.getRegion(this.moveArgs.proxy);
		var eXY = $E.getXY(e);
		$D.setXY(this.moveArgs.proxy,[ ( $E.getXY(e)[0] - (reg.right - reg.left)/2 ) , ( $E.getXY(e)[1] - (reg.bottom - reg.top)/2 ) ]);
		var rowAct = this.getRowByMousePos(e);
		if (!rowAct){
			$D.setStyle(this.moveArgs.locator, 'display', 'none');
			this.moveArgs.visible = false;
			return;
		}
		if (!this.moveArgs.visible){
			$D.setStyle(this.moveArgs.locator, 'display', 'block');
			this.moveArgs.visible = true;
		}
		// Posicionamos el indicador entre dos filas, es decir, a partirde la fila donde estamos, obtenemos si estamos m�s cerca de arriba o de abajo.
		var yCentroRow = rowAct[0].top + (rowAct[0].bottom - rowAct[0].top)/2;
		$D.setY(this.moveArgs.locator, ( ( eXY[1] < yCentroRow ? rowAct[0].top : rowAct[0].bottom ) - 1));
	},
	// Evento en MouseUp
	endMove:function(e){
		$E.removeListener(document.body,'mousemove',this.colMove);
		$E.removeListener(document.body,'mouseup',this.endMove);
		var v = this.moveArgs.visible;
		// Ocultamos indicadores de posici�n
		$D.setStyle([this.moveArgs.proxy,this.moveArgs.locator], 'display', 'none');
		this.moveArgs.visible = false;
		if (this.moveArgs.target && (' '+this.moveArgs.target.className+' ').indexOf(' m-selected ') != -1)
			this.moveArgs.target.className = $T.trim((' '+this.moveArgs.target.className+' ').replace(' m-selected ',' '));
		// Si el indicador no estaba visible es que no es un destino v�lido.
		if (!v) return;
		// Obtenemos el destino de la fila
		var rowAct = this.getRowByMousePos(e);
		if (!rowAct) return;
		var yCentroRow = rowAct[0].top + (rowAct[0].bottom - rowAct[0].top)/2;
		if ($E.getXY(e)[1] < yCentroRow) rowAct[1].parentNode.insertBefore(this.moveArgs.target,rowAct[1]);
		else if (rowAct[1].nextSibling)  rowAct[1].parentNode.insertBefore(this.moveArgs.target,rowAct[1].nextSibling);
		else rowAct[1].parentNode.appendChild(this.moveArgs.target);
		// Vaciamos el cache, porque ha cambiado.
		this.moveArgs.rowRegionCache = null;
		this.moveArgs.target = null;
	},
	// Obtiene la row sobre la que se encuentra el puntero
	//  @param {event} e
	//  @returns {Array({region},{HTMLTableRow})}
	getRowByMousePos:function(e){
		var rowAct = null, eXY = $E.getXY(e), a = this.moveArgs.rowRegionCache, cReg = a[0][0];
		// Si no estamos en los l�mites del contenedor, salimos
		if (cReg.left > eXY[0] || cReg.right < eXY[0] || cReg.top > eXY[1] || cReg.bottom < eXY[1]) return null;
		for (var i=1; i < a.length; i++){
			// Ahora miramos s�lo l�mites verticales
			if (a[i][0].top <= eXY[1] && a[i][0].bottom >= eXY[1]){
				rowAct = a[i];
				break;
			}
		}
		return rowAct;
	},
	// Evento en Click
	dlgClick: function(e){
		var target = $E.getTarget(e);
		if (target.tagName.toLowerCase() != 'div' || target.parentNode.className != 'tm-tc-sort') return;
		var r = target.parentNode.parentNode, s = r.tmCell.tmColDfn.sort;
		// Inicializamos todos menos el actual
		for (var i = 0, rs = this.dlg.cplTBody.rows; i < rs.length; i++){
			if (i == r.rowIndex - 1) this.changeSortState(i);
			else if (!this.dlg.multiSort.checked) this.changeSortState(i,0);
		}
		this.rebuildMultiSort();
	},
	// Cambia el estado del bot�n de ordenaci�n. Si no se especifica estado, rota el estado actual
	changeSortState:function(pos, newState){
		var r = this.dlg.cplTBody.rows[pos];
		var bs = r.cells[2].firstChild, s = r.tmCell.tmColDfn.sort;
		if (!s) return;
		if (typeof newState == 'undefined'){
			if (s.state == 1) s.state = -2;
			s.state++;
		} else s.state = newState;
		bs.className = 'tm-sort' + s.name + (s.state < 0 ? '-dsc tm-sort-dsc' : (s.state > 0 ? '-asc tm-sort-asc' : ' tm-sort'));
		bs.title = s.state ? 'Orden ' + s.title + ' ' + (s.state < 0 ? 'de mayor a menor' : 'de menor a mayor' ) : 'Sin ordenar (tipo ' + s.title + ')';
		if (!s.state) s.priority = 0;
	},
	// Sincroniza la prioridad de ordenaci�n
	rebuildMultiSort:function(){
		var aSC = [], mc = this.dlg.multiSort.checked;
		for (var i=0, rs = this.dlg.cplTBody.rows; i < rs.length; i++){
			var s = rs[i].tmCell.tmColDfn.sort;
			if (s) aSC.push([rs[i].cells[2].firstChild.firstChild.firstChild, s]);
		}
		aSC.sort(function(a,b){
			if (!a[1].state) return b[1].state ? 1 : 0;
			else if (!b[1].state) return -1;
			// Si tiene ordenaci�n pero no prioridad, es que es la �ltima que se ha pulsado
			return a[1].priority ? a[1].priority - (b[1].priority || a[1].priority + 1) : 1;
		});
		// Prioridades desde 1
		for (var i=0; i < aSC.length; i++){
			if (aSC[i][1].state){
				aSC[i][1].priority = i + 1;
				aSC[i][0].data = mc ? (i + 1).toString() : '';
			} else aSC[i][0].data = '';
		}
	},
	// Sincroniza controles con el estado de la tabla
	discardChanges: function(){
		var rs = this.dlg.cplTBody.rows;
		var arRows = [];
		// Visibilidad
		for (var i = 0; i < rs.length; i++){
			var d = rs[i].tmCell.tmColDfn, s = d.sort;
			rs[i].cells[0].firstChild.checked = d.visible;
			if (!this.cfg.unsortable && s){
				this.changeSortState(i,s.oldState);
				s.priority = s.oldPriority;
			}
			arRows.push(rs[i]);
		}
		if (!this.cfg.unsortable){
			this.dlg.multiSort.checked = this.dlg.multiSort.defaultChecked;
			this.rebuildMultiSort();
		}
		// Distribuci�n filas
		arRows.sort(function(a,b){return a.tmCell.cellIndex - b.tmCell.cellIndex;});
		$T.makeChildren(arRows,this.dlg.cplTBody);
	},
	// Sincroniza la tabla con el estado de los controles
	applyChanges:function(){
		$D.setStyle(document.body,'cursor','wait');
		var rs = this.dlg.cplTBody.rows;
		var tagVis = false, cfgVis = [], tagPos = false, tagSort = false, cfgSort = [];
		for (var i = 0; i < rs.length; i++){
			var c = rs[i].tmCell, d = c.tmColDfn;
			if (rs[i].cells[0].firstChild.checked != d.visible){
				tagVis = true;
				cfgVis[c.cellIndex] = {changed: true, value: rs[i].cells[0].firstChild.checked};
			} else cfgVis[c.cellIndex] = null;
			if (c.cellIndex != i) tagPos = true;
			d.newIndex = i;
			if (!this.cfg.unsortable && d.sort){
				if (d.sort.state == 0){ // Si dejan de estar ordenadas todas, no haremos nada. En ese caso actualizamos aqu� las propiedades
					d.sort.oldState = 0;
					d.sort.oldPriority = 0;
				} else {
					cfgSort.push(c);
					if (d.sort.state != d.sort.oldState) tagSort = true;
				}
			}
		}
		if (!this.cfg.unsortable) this.dlg.multiSort.defaultChecked = this.dlg.multiSort.checked;
		// ocultando el elemento parece que es m�s r�pido
		$D.setStyle(this.table,'display','none');
		var ex = null;
		try{
			if (tagVis) this.applyVisibility(cfgVis);
			if (tagPos) this.applyColumnPosition();
			if (tagSort) this.applySort(cfgSort);
		}catch(e){
			ex = e;
		}
		$D.setStyle(this.table,'display','');
		$D.setStyle(document.body,'cursor','');
		this.dlg.hide();
		if (ex) throw ex;
	},
	// Aplica cambios de visibilidad en columnas de la tabla
	applyVisibility:function(cfgVis){
		for (var i = 0, rs = this.table.rows; i < rs.length; i++){
			for (var j = 0, cs = rs[i].cells; j < cs.length; j++){
				if (!cfgVis[j] || !cfgVis[j].changed) continue;
				$D.setStyle(cs[j], 'display', (cfgVis[j].value ? '' : 'none'));
				// Actualizamos la configuraci�n
				if (i == 0) cs[j].tmColDfn.visible = cfgVis[j].value;
			}
		}
	},
	// Aplica cambios de posici�n de columnas
	applyColumnPosition:function(){
		// Al rev�s
		for (var i = this.table.rows.length - 1, rs = this.table.rows; i >= 0; i--){
			var arCol = [];
			// Agregamos las celdas de cada fila para despu�s ordenarlas por su nuevo �ndice
			for (var j=0, cs = rs[i].cells; j < cs.length; j++) arCol.push(cs[j]);
			arCol.sort(function(a,b){
				var r0 = a.parentNode.parentNode.parentNode.rows[0];
				return r0.cells[a.cellIndex].tmColDfn.newIndex - r0.cells[b.cellIndex].tmColDfn.newIndex;
			});
			// Las volvemos a insertar en la fila con el nuevo orden
			$T.makeChildren(arCol,rs[i]);
		}
	},
	// Aplica ordenaci�n de filas
	applySort:function(cfgSort){
		var aRows = [],bottomRows = [];
		cfgSort.sort(function(a,b){return a.tmColDfn.sort.priority - b.tmColDfn.sort.priority});
		// Determinamos orden, dejando al final las filas de class sortbottom
		for (var i=1, rs = this.table.rows; i < rs.length; i++){
			if ((' '+rs[i].className+' ').indexOf(' sortbottom ') != -1) bottomRows.push(rs[i]);
			else aRows.push(rs[i]);
		}
		// En la funci�n de ordenaci�n queda feo pasarle un array siempre con los mimos par�metros. Las variables que necesitamos las creamos a nivel global y luego las eliminamos.
		window.__tm_cfgSort = cfgSort;
		window.__tm_this = this;
		aRows.sort(this.rowSortFunction);
		// Eliminamos las variables temporales
		delete window.__tm_cfgSort;
		delete window.__tm_this;
		// Aplicamos orden
		$T.makeChildren(aRows, this.table.tBodies[0]);
		$T.makeChildren(bottomRows, this.table.tBodies[0]);
		// Actualizamos la configuraci�n
		for (var i=0, cs = this.table.rows[0].cells; i < cs.length; i++){
			var s = cs[i].tmColDfn.sort;
			if (s){
				s.oldState = s.state;
				s.oldPriority = s.priority;
			}
		}
	},
	// Funci�n de ordenaci�n intermedia para permitir ordenar por varias columnas
	rowSortFunction:function(a,b){
		var res = 0, cfgSort = window.__tm_cfgSort, thisArg = window.__tm_this;
		for (var i=0; i < cfgSort.length; i++){
			var c = cfgSort[i], s = c.tmColDfn.sort, A = thisArg.getTextContent(a.cells[c.cellIndex]), B = thisArg.getTextContent(b.cells[c.cellIndex]);
			var es = thisArg.cfg.emptysort, ss = s.state;
			// Si uno de los dos est� vac�o, determinamos si deben ordenarse aparte. Si los dos son vac�o, pasamos a la siguiente funci�n pues son t�cnicamente iguales.
			if (es != 0 && (A != '' || B != '')){
				if (A == '') return (-1) * es;
				if (B == '') return es;
			}
			if (!s.sortFn) continue;
			// Se llama a la funci�n de ordenaci�n. Par�metros: row, texto de celda (trim), �ndice de row (negativo si orden descendente), celda
			res = ss * s.sortFn([ a, A, ss*a.rowIndex, a.cells[c.cellIndex] ], [ b, B, ss*b.rowIndex, b.cells[c.cellIndex] ]);
			// Si los dos son iguales, pasamos a la siguiente columna de ordenaci�n
			if (res) break;
		}
		return res;
	}
};
/**** END TABLEMANAGER ****/
if (window.postloadFunctionData && postloadFunctionData['tablemanager'] !== null) {
	for (var i = 0; i < postloadFunctionData['tablemanager'].length; i++) {
		var t = postloadFunctionData['tablemanager'][i];
		if ( $UT.hasClass(t, 'movnivel') ) {
			new TableManager(t, {emptysort:-1});
		} else {
			new TableManager(t);
		}
	}
}
// </pre>