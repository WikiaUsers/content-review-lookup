mw.loader.using(['mediawiki.util']).then(function () {
	function all(sel, ctx){return Array.prototype.slice.call((ctx||document).querySelectorAll(sel));}
	function start(ctx){ all('.pt-widget', ctx).forEach(boot); }
	if (mw.hook && mw.hook('wikipage.content')) mw.hook('wikipage.content').add(function($c){ start($c && $c[0] ? $c[0] : document); });
	if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ start(document); }); else start(document);

	function boot(mount){
	var dataNode = mount.querySelector('.pt-data'); if(!dataNode) return;
	var data={}; try{ data = JSON.parse(dataNode.textContent||'{}'); }catch(e){ return; }
	build(mount, data);
	}

	function el(tag, cls){ var x=document.createElement(tag); if(cls) x.className=cls; return x; }

	function build(mount, data){
	var names = data.mon.map(function(m){return m.name;});
	var byName = {}; data.mon.forEach(function(m){byName[m.name]=m;});
	var hiddenSkins = data.hiddenSkins || {};

	var root = el('div','pt-root');

	var top = el('div','pt-card pt-top');
	var form = el('form','pt-form');
	var label = el('label'); label.setAttribute('for','pt-pokemon'); label.textContent='Pokémon';
	var input = el('input'); input.type='text'; input.id='pt-pokemon'; input.placeholder='Type a Pokémon...';
	input.setAttribute('autocomplete','off');
	input.setAttribute('autocorrect','off');
	input.setAttribute('autocapitalize','off');
	input.setAttribute('name','pt-search');
	input.spellcheck = false;
	form.setAttribute('autocomplete','off');
	var submit = el('button','pt-submit'); submit.type='submit'; submit.textContent='Search';
	var suggest = el('div','pt-suggest-pop');
	form.appendChild(label); form.appendChild(input); form.appendChild(submit);
	top.appendChild(form); top.appendChild(suggest);

	var mid = el('div','pt-card pt-mid');
	var imgWrap = el('div','pt-image-wrap');
	var img = el('img','pt-image'); imgWrap.appendChild(img);
	
	var shinyBtn = el('img','pt-shiny-toggle');
	shinyBtn.src = mw.util.getUrl('Special:FilePath/ShinyIconOutline.png');
	imgWrap.appendChild(shinyBtn);
	
	var overlays = el('div','pt-overlays'); imgWrap.appendChild(overlays);
	var ovA = el('div','pt-overlay'); var ovB = el('div','pt-overlay');
	overlays.appendChild(ovA); overlays.appendChild(ovB);
	ovA.classList.add('is-show');
	overlays._active = 'A';
	
	var right = el('div');
	var count = el('div','pt-count'); count.textContent = 'Total tints applied: 0';
	var applied = el('div','pt-applied');
	var controls = el('div','pt-controls');
	var errorMsg = el('div','pt-inline-error'); errorMsg.textContent = 'Please apply a Pokémon before adding tints';
	var superBtn = el('button','pt-super'); superBtn.textContent='Apply Super Tintifier';
	var clearBtn = el('button','pt-clear'); clearBtn.textContent='Clear All';
	controls.appendChild(errorMsg);
	controls.appendChild(superBtn);
	controls.appendChild(clearBtn);
	right.appendChild(count);
	right.appendChild(applied);
	right.appendChild(controls);
	mid.appendChild(imgWrap); mid.appendChild(right);
	
	var leftControls = el('div','pt-left-controls');
	mid.appendChild(leftControls);
	var hiddenBtn = el('button','pt-hidden-btn');
	hiddenBtn.type = 'button';
	hiddenBtn.textContent = 'Apply Hidden Skin';
	hiddenBtn.style.display = 'none';
	leftControls.appendChild(hiddenBtn);
	
	function getHiddenList(name){
		var v = hiddenSkins && hiddenSkins[name];
		if (!v) return [];
		return Array.isArray(v) ? v : [v];
	}
	
	function supportsShiny(){
		return !currentHiddenSkin || !!currentHiddenSkin.shiny;
	}
	
	function updateShinyBtnVisibility(){
		shinyBtn.style.display = supportsShiny() ? '' : 'none';
		shinyBtn.src = mw.util.getUrl(
			shinyMode ? 'Special:FilePath/ShinyIcon.png'
					: 'Special:FilePath/ShinyIconOutline.png'
		);
	}
	
	function withShinySuffix(name){
		var m = String(name).match(/^(.*?)(\.(png|gif|jpg|jpeg))$/i);
		return m ? (m[1] + ' Shiny' + m[2]) : (name + ' Shiny');
	}
	
	function fileForDisplay(){
		if (!currentPokemon) return '';
		var baseFile = byName[currentPokemon].file;
		if (currentHiddenSkin){
			return (shinyMode && currentHiddenSkin.shiny)
			? withShinySuffix(currentHiddenSkin.name)
			: currentHiddenSkin.name;
		}
		return shinyMode ? ('Shiny ' + baseFile) : baseFile;
	}

	function updateHiddenBtnVisibility(){
		var show = !!(currentPokemon && getHiddenList(currentPokemon).length);
		hiddenBtn.style.display = show ? '' : 'none';
	}
	
	var modal = el('div','pt-modal');
	var sheet = el('div','pt-modal-sheet');
	var title = el('div','pt-modal-title'); title.textContent = 'Choose Hidden Skin';
	var list  = el('div','pt-skin-list');
	var close = el('button','pt-modal-close'); close.type='button'; close.textContent='Close';
	sheet.appendChild(title); sheet.appendChild(list); sheet.appendChild(close);
	modal.appendChild(sheet);
	root.appendChild(modal);
	
	function openHiddenPicker(){
		if(!currentPokemon) return;
		var skins = getHiddenList(currentPokemon);
		if (!skins.length) return;
	
		list.innerHTML = '';
		skins.forEach(function(skin){
			var item = el('button','pt-skin-item');
			item.type = 'button';
			var baseLabel = String(skin.name).replace(/\.(png|gif|jpg|jpeg)$/i,'');
			item.textContent = skin.shiny ? baseLabel + ' (Has a shiny variant)' : baseLabel;
			item.addEventListener('click', function(){
				currentHiddenSkin = skin;
				setSprite(fileForDisplay());
				clearInlineError();
				reset();
				updateShinyBtnVisibility();
				modal.classList.remove('is-open');
			});
			list.appendChild(item);
		});
	
		modal.classList.add('is-open');
	}
	
	close.addEventListener('click', function(){ modal.classList.remove('is-open'); });
	modal.addEventListener('click', function(e){ if (e.target === modal) modal.classList.remove('is-open'); });
	
	hiddenBtn.addEventListener('click', function(e){
		e.preventDefault();
		openHiddenPicker();
	});

	var bot = el('div','pt-card pt-bottom');

	var filterWrap = el('div','pt-color-filter');
	var filterInput = el('input');
	filterInput.type = 'text';
	filterInput.placeholder = 'Filter colors… (name or RGB)';
	filterInput.autocomplete = 'off';
	filterInput.spellcheck = false;
	filterWrap.appendChild(filterInput);
	
	var grid = el('div','pt-colors');
	
	bot.appendChild(filterWrap);
	bot.appendChild(grid);

	root.appendChild(top);
	root.appendChild(mid);
	root.appendChild(bot);
	mount.innerHTML=''; mount.appendChild(root); mount.style.display='';

	function showInlineError(){ errorMsg.classList.add('is-visible'); }
	function clearInlineError(){ errorMsg.classList.remove('is-visible'); }

	var appliedTints = [];
	var shinyMode = false;
	var currentPokemon = null;
	var currentHiddenSkin = null;

	function normalizeTitle(fileTitle){
		return String(fileTitle||'').replace(/%20/g,' ').replace(/_/g,' ').replace(/\s+/g,' ').trim().replace(/ /g,'_');
	}

	function setOverlayMask(node, cssUrl){
		node.style.maskImage = cssUrl;
		node.style.webkitMaskImage = cssUrl;
		node.style.maskMode = 'alpha';
		node.style.maskRepeat = 'no-repeat';
		node.style.webkitMaskRepeat = 'no-repeat';
		node.style.maskPosition = 'center';
		node.style.webkitMaskPosition = 'center';
		node.style.maskSize = 'contain';
		node.style.webkitMaskSize = 'contain';
	}

	function setSprite(fileTitle){
		var underscored = normalizeTitle(fileTitle);
		var url = mw.util.getUrl('Special:FilePath/' + underscored);
		var pre = new Image();
		pre.onload = function(){
		var inactive = overlays._active === 'A' ? ovB : ovA;
		var active = overlays._active === 'A' ? ovA : ovB;
		var cssUrl = 'url("' + url + '")';
		setOverlayMask(inactive, cssUrl);
		inactive.classList.add('is-show');
		active.classList.remove('is-show');
		overlays._active = (overlays._active === 'A' ? 'B' : 'A');
		img.src = url;
		};
		pre.src = url;
	}

	shinyBtn.addEventListener('click', function(){
		if (!currentPokemon) return;
		if (currentHiddenSkin && !currentHiddenSkin.shiny) return;
		shinyMode = !shinyMode;
		updateShinyBtnVisibility();
		setSprite(fileForDisplay());
	});

	superBtn.addEventListener('click',function(e){
		e.preventDefault();
		if (!img.src){ showInlineError(); return; }
		clearInlineError();
		if (!data.colors || !data.colors.length) return;
		for (var i=0;i<100;i++){
		var c = data.colors[Math.floor(Math.random()*data.colors.length)];
		appliedTints.push(c);
		}
		renderApplied();
		reset();
		if(!rafId){ startLoop(); } else { updateNow(); }
	});

	var suggestIndex = -1;
	var suggestItems = [];
	
	function chooseSuggestion(name){
		input.value = name;
		suggest.style.display = 'none';
		form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
		if (typeof updateHiddenBtnVisibility === 'function') updateHiddenBtnVisibility();
	}
	
	function renderSuggest(list){
		suggest.innerHTML = '';
		suggestItems = [];
		suggestIndex = list.length ? 0 : -1;
		list.forEach(function(v, i){
			var d = el('div');
			d.textContent = v;
			if (i === suggestIndex) d.classList.add('is-active');
			d.addEventListener('mouseover', function(){ 
				if (suggestIndex >= 0 && suggestItems[suggestIndex]) suggestItems[suggestIndex].classList.remove('is-active');
				suggestIndex = i; d.classList.add('is-active');
			});
			d.addEventListener('mousedown', function(e){
				e.preventDefault();
				chooseSuggestion(v);
			});
			suggest.appendChild(d);
			suggestItems.push(d);
		});
		suggest.style.display = list.length ? 'block' : 'none';
	}

	function showSuggest(q){
		if(!q){ suggest.style.display='none'; suggestItems=[]; suggestIndex=-1; return; }
		var l=q.toLowerCase();
		var matches=names.filter(function(v){return v.toLowerCase().indexOf(l)!==-1;}).slice(0,20);
		renderSuggest(matches);
	}
	input.addEventListener('input',function(){showSuggest(input.value);});
	document.addEventListener('click',function(e){ if(!suggest.contains(e.target)&&e.target!==input) suggest.style.display='none';});

	function renderApplied(){
		applied.innerHTML='';
		for (var k=0;k<appliedTints.length;k++){
		var t = appliedTints[k];
		var item = el('button','pt-applied-item '+(t._cls||''));
		item.type = 'button';
		item.draggable = true;
		item.dataset.index = String(k);
		item.setAttribute('data-rgb', t.rgb[0] + ', ' + t.rgb[1] + ', ' + t.rgb[2]);
		var nm = el('span','pt-applied-name'); nm.textContent = t.name;
		item.appendChild(nm);
		(function(idxLocal){
		item.addEventListener('click',function(){
			if (isDraggingApplied) return;
			appliedTints.splice(idxLocal,1);
			renderApplied();
			if(!appliedTints.length){ stopLoop(); ovA.style.background='none'; ovB.style.background='none'; return; }
			if(idx>=appliedTints.length) idx%=appliedTints.length;
			updateNow();
		});
		})(k);
		applied.appendChild(item);
		}
		count.textContent = 'Total tints applied: ' + appliedTints.length;
		fitTileLabels();
	}

	input.addEventListener('keydown', function(e){
		if (suggest.style.display !== 'block') return;
		if (e.key === 'ArrowDown'){
			if (suggestItems.length){
				if (suggestIndex >= 0 && suggestItems[suggestIndex]) suggestItems[suggestIndex].classList.remove('is-active');
				suggestIndex = (suggestIndex + 1) % suggestItems.length;
				suggestItems[suggestIndex].classList.add('is-active');
				suggestItems[suggestIndex].scrollIntoView({block:'nearest'});
			}
			e.preventDefault();
		} else if (e.key === 'ArrowUp'){
			if (suggestItems.length){
				if (suggestIndex >= 0 && suggestItems[suggestIndex]) suggestItems[suggestIndex].classList.remove('is-active');
				suggestIndex = (suggestIndex - 1 + suggestItems.length) % suggestItems.length;
				suggestItems[suggestIndex].classList.add('is-active');
				suggestItems[suggestIndex].scrollIntoView({block:'nearest'});
			}
			e.preventDefault();
		} else if (e.key === 'Enter'){
			if (suggestIndex >= 0 && suggestItems[suggestIndex]){
				chooseSuggestion(suggestItems[suggestIndex].textContent);
				e.preventDefault();
			}
		} else if (e.key === 'Escape'){
			suggest.style.display='none';
		}
	});

	var isDraggingApplied = false;
	var dragFrom = -1;
	var dndInited = false;
	
	function moveItem(arr, from, to){
	if (to < 0) to = 0;
	if (to > arr.length) to = arr.length;
	if (from === to || from < 0 || from >= arr.length) return arr;
	var x = arr.splice(from,1)[0];
	arr.splice(to,0,x);
	return arr;
	}
	
	function clearDropHints(){
	[].slice.call(applied.querySelectorAll('.is-drop-before, .is-drop-after'))
		.forEach(function(n){ n.classList.remove('is-drop-before','is-drop-after'); });
	}
	
	function initAppliedDnD(){
	if (dndInited) return;
	dndInited = true;
	
	applied.addEventListener('dragstart', function(e){
		var n = e.target.closest('.pt-applied-item'); if(!n) return;
		dragFrom = parseInt(n.dataset.index||'-1',10);
		isDraggingApplied = true;
		try{ e.dataTransfer.setData('text/plain',''); }catch(_){}
		e.dataTransfer.effectAllowed = 'move';
		n.classList.add('is-dragging');
	});
	
	applied.addEventListener('dragend', function(e){
		isDraggingApplied = false;
		dragFrom = -1;
		clearDropHints();
		var n = e.target.closest('.pt-applied-item'); if(n) n.classList.remove('is-dragging');
	});
	
	applied.addEventListener('dragover', function(e){
		if (!isDraggingApplied) return;
		e.preventDefault();
		var over = e.target.closest('.pt-applied-item');
		clearDropHints();
		if (!over) return;
		var r = over.getBoundingClientRect();
		var before = (e.clientY - r.top) < r.height/2;
		over.classList.add(before ? 'is-drop-before' : 'is-drop-after');
	});
	
	applied.addEventListener('drop', function(e){
		if (!isDraggingApplied) return;
		e.preventDefault();
		var target = e.target.closest('.pt-applied-item');
		var toIndex;
		if (target){
			var r = target.getBoundingClientRect();
			var base = parseInt(target.dataset.index||'0',10);
			var before = (e.clientY - r.top) < r.height/2;
			toIndex = base + (before ? 0 : 1);
		} else {
			toIndex = appliedTints.length;
		}
		var adjusted = toIndex > dragFrom ? toIndex - 1 : toIndex;
		moveItem(appliedTints, dragFrom, adjusted);
		clearDropHints();
		isDraggingApplied = false;
		dragFrom = -1;
		renderApplied();
		if(!rafId){ startLoop(); } else { if(idx>=appliedTints.length) idx%=appliedTints.length; updateNow(); }
		initAppliedDnD();
	});
	}
	
	initAppliedDnD();

	function fitTileLabels(){
		var tiles = [].slice.call(document.querySelectorAll('.pt-swatch-name, .pt-applied-name'));
		tiles.forEach(function(label){
		var box = label.parentElement;
		var size = 13;
		label.style.fontSize = size + 'px';
		var min = 8;
		var pad = 12;
		var guard = 24;
		while (guard-- && size > min && (label.scrollWidth > box.clientWidth - pad || label.scrollHeight > box.clientHeight - pad)){
			size -= 1;
			label.style.fontSize = size + 'px';
		}
		});
	}
	window.addEventListener('resize', fitTileLabels);

	function fitAppliedLabels(){
		var items = applied.querySelectorAll('.pt-applied-item');
		items.forEach(function(item){
		var label = item.querySelector('.pt-applied-name');
		if(!label) return;
		var size = 14;
		label.style.fontSize = size + 'px';
		var limit = 9;
		var guard = 20;
		while (guard-- && size > limit && (label.scrollWidth > item.clientWidth - 12 || label.scrollHeight > item.clientHeight - 12)){
			size -= 1;
			label.style.fontSize = size + 'px';
		}
		});
	}
	window.addEventListener('resize', fitAppliedLabels);

	function applyMask(){
		var cssUrl = 'url("' + img.src + '")';
		setOverlayMask(ovA, cssUrl);
		setOverlayMask(ovB, cssUrl);
	}
	img.addEventListener('load', applyMask);

	var styleBlock = document.createElement('style');
	document.head.appendChild(styleBlock);
	var css = [];
	data.colors.forEach(function(c, idxC){
		var cls = 'pt-color-' + idxC;
		c._cls = cls;
		css.push('.'+cls+'{background:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.18);border-color:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.35)}');
		css.push('.pt-swatch.'+cls+':hover, .pt-applied-item.'+cls+':hover{background:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.28);border-color:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.55)}');
		css.push('.pt-swatch.'+cls+':focus-visible, .pt-applied-item.'+cls+':focus-visible{background:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.28);border-color:rgba('+c.rgb[0]+','+c.rgb[1]+','+c.rgb[2]+',0.55)}');
		var a = el('button','pt-swatch '+cls);
		a.type = 'button';
		a.setAttribute('data-rgb', c.rgb[0] + ', ' + c.rgb[1] + ', ' + c.rgb[2]);
		a.setAttribute('data-name', c.name.toLowerCase());
		a.setAttribute('data-rgbflat', c.rgb.join(','));
		
		var nm = el('span','pt-swatch-name'); nm.textContent = c.name;
		a.appendChild(nm);
		
		a.addEventListener('click',function(){
		if (!img.src){ showInlineError(); return; }
		clearInlineError();
		appliedTints.push(c);
		renderApplied();
		reset();
		if(!rafId){ startLoop(); }
		else { if(idx>=appliedTints.length) idx%=appliedTints.length; updateNow(); }
		});
		
		grid.appendChild(a);
	});
	styleBlock.textContent = css.join('\n');
	fitTileLabels();

	function applyColorFilter(q){
	var s = String(q || '').trim().toLowerCase();
	var tiles = grid.querySelectorAll('.pt-swatch');
	tiles.forEach(function(t){
		var n = t.getAttribute('data-name') || '';
		var r = t.getAttribute('data-rgbflat') || '';
		var hit = !s || n.indexOf(s) !== -1 || r.indexOf(s) !== -1;
		t.style.display = hit ? '' : 'none';
	});
	}
	
	filterInput.addEventListener('input', function(){
		applyColorFilter(filterInput.value);
	});
	
	applyColorFilter('');

	clearBtn.addEventListener('click',function(e){
		e.preventDefault();
		appliedTints = [];
		renderApplied();
		stopLoop();
		ovA.style.background = 'none';
		ovB.style.background = 'none';
	});

	form.addEventListener('submit', function(e){
		e.preventDefault();
		var poke = input.value;
		if (!byName[poke]) return;
		currentPokemon = poke;
		currentHiddenSkin = null;
		setSprite(fileForDisplay());
		clearInlineError();
		reset();
		if (typeof updateHiddenBtnVisibility === 'function') updateHiddenBtnVisibility();
		updateShinyBtnVisibility();
	});

	var w0 = 28, w = w0, eps = 0.0001;
	var centerBias = 10;

	var rafId=null,last=0,center=0,idx=0,sweepMs=1000,pauseMs=100;
	var growing=true, pausing=false, pauseAcc=0;
	const clampDt = 200;

	function sweepGrad(cur, nxt, center){
		var a = center - w*0.5;
		var b = center + w*0.5;
		var a1 = Math.max(eps, Math.min(a, 100 - eps));
		var b1 = Math.max(a1 + 0.05, Math.min(100 - eps, b));
		var a0 = 0.85, a100 = 0.7;
		function A(p){ return a0 + (a100 - a0) * (p/100); }
		var span = b1 - a1;
		var f = Math.max(2, Math.min(12, span * 0.45));
		var aL = Math.max(eps, a1 - f);
		var aR = Math.min(100 - eps, a1 + f);
		var bL = Math.max(eps, b1 - f);
		var bR = Math.min(100 - eps, b1 + f);
		var alphaBlend1 = A((aL + aR) * 0.5);
		var alphaBlend2 = A((bL + bR) * 0.5);
		return 'linear-gradient(135deg,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+A(0)+') 0%,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+A(aL)+') '+aL+'%,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+alphaBlend1+') '+aL+'%,'+
		'rgba('+nxt[0]+','+nxt[1]+','+nxt[2]+','+alphaBlend1+') '+aR+'%,'+
		'rgba('+nxt[0]+','+nxt[1]+','+nxt[2]+','+alphaBlend2+') '+bL+'%,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+alphaBlend2+') '+bR+'%,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+A(bR)+') '+bR+'%,'+
		'rgba('+cur[0]+','+cur[1]+','+cur[2]+','+A(100)+') 100%)';
	}

	function rgbList(){ return appliedTints.length ? appliedTints.map(function(t){return t.rgb;}) : []; }

	function updateNow(){
		var L = rgbList(), n = L.length;
		if(!n){ ovA.style.background='none'; ovB.style.background='none'; return; }
		if(n===1){ var only=L[0]; var g=sweepGrad(only, only, center); ovA.style.background=g; ovB.style.background=g; return; }
		if(idx>=n) idx%=n;
		var cur = L[idx], nxt = L[(idx+1)%n] || cur;
		var g2 = pausing ? sweepGrad(nxt, nxt, center) : sweepGrad(cur, nxt, center);
		ovA.style.background = g2;
		ovB.style.background = g2;
	}

	function startLoop(){
		if(rafId) return;
		requestAnimationFrame(function(ts){ last=ts; rafId=requestAnimationFrame(step); });
	}

	function stopLoop(){
		if(!rafId) return;
		cancelAnimationFrame(rafId); rafId=null;
	}

	function reset(){
		stopLoop();
		idx = 0;
		w = w0;
		center = 100 - w*0.5 + centerBias;
		growing = true;
		pausing = false;
		pauseAcc = 0;
		updateNow();
		if(appliedTints.length) startLoop();
	}

	function step(ts){
		var dt = last ? (ts - last) : 0; last = ts;
		if (dt > clampDt) dt = clampDt;
		var L = rgbList(), n = L.length;
		if (!n){ ovA.style.background='none'; ovB.style.background='none'; stopLoop(); return; }
		if (growing){
		var target = 100 - 2*eps;
		var speed = (target - w0) / sweepMs;
		w += speed * dt;
		if (w >= target){
			w = target;
			pausing = true;
			growing = false;
			pauseAcc = 0;
		}
		center = 100 - w*0.5 + centerBias;
		var cur = L[idx], nxt = L[(idx+1)%n] || cur;
		var g = sweepGrad(cur, nxt, center);
		ovA.style.background = g; ovB.style.background = g;
		} else if (pausing){
		pauseAcc += dt;
		center = 100 - w*0.5 + centerBias;
		var cur2 = L[idx], nxt2 = L[(idx+1)%n] || cur2;
		var g3 = sweepGrad(nxt2, nxt2, center);
		ovA.style.background = g3; ovB.style.background = g3;
		if (pauseAcc >= pauseMs){
			idx = (idx + 1) % n;
			w = w0;
			growing = true;
			pausing = false;
			center = 100 - w*0.5 + centerBias;
		}
		}
		rafId = requestAnimationFrame(step);
	}

	renderApplied();
	reset();
	}
});