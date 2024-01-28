;(function() {
	'use strict';
	if (window.SpriteEditorModules.spriteutils && window.SpriteEditorModules.spriteutils.loaded) {return;}
	var spriteBoxTemplate = document.createElement('li');
	spriteBoxTemplate.className = 'spritedoc-box';
	spriteBoxTemplate.innerHTML = '<div class="spritedoc-image"><span class="sprite"></span></div>' +
		'<ul class="spritedoc-names"></ul>';
	
	var sectionTemplate = document.createElement('div');
	sectionTemplate.className = 'spritedoc-section';
	sectionTemplate.innerHTML = '<h3></h3>' +
		'<ul class="spritedoc-boxes">' +
		'<div class="section-drag-overlay sprite-drop-area" style="top:0;left:0;z-index:99;display:none"></div>' +
		'</ul>';
	
	var highestSpriteId = 0;
	var possprite = 0;
	var notifiers = [];
	var editmode = true;
	var myRoot = document;
	var isDragging = false;
	var sectionDraggingEnabled = false;
	var oldSectionOrder;
	var width;
	var height;
	function _notify(name, data) {
		notifiers.forEach(function(a){
			a(name, data);
		});
	}
	function _getCodeField(name, type) {
		type = type || 'sprite';
		var boxCode = document.createElement('code');
		boxCode.contentEditable = editmode;
		boxCode.textContent = name;
	
		boxCode.onpaste = function(e) {
			e.preventDefault();
			var paste = (e.clipboardData || window.clipboardData).getData('text');
			paste = paste.replace( /\n/g, ' ' ).trim();
			window.document.execCommand( 'insertText', false, paste );
		};
		boxCode.onkeypress = function(e) {
			if ( e.keyCode !== 13 ) {return;}
			e.preventDefault();
			e.target.blur();
		};
		boxCode.addEventListener('focus', function() {
			if (!editmode) {
				boxCode.blur();
				_notify('spritename-click', {
					element: boxCode
				});
				return;
			}
			boxCode.setAttribute('data-original-text', boxCode.textContent);
		});
		boxCode.addEventListener('blur', function() {
			if (!editmode) {return;}
			boxCode.textContent = boxCode.textContent.trim();
			var orgT = boxCode.getAttribute('data-original-text');
			boxCode.removeAttribute('data-placeholder');
			boxCode.classList.remove('spriteedit-new');
			boxCode.removeAttribute('data-original-text');
			if (boxCode.textContent.length && (orgT || '') === boxCode.textContent) {return;}
			_notify('boxcode-content-changed', {
				element: boxCode,
				oldContent: orgT || '',
				newContent: boxCode.textContent
			});
		});
		if (type === 'sprite') {boxCode.setAttribute('issprite', '');}
		if (!(name || '').length) {
			boxCode.className = 'spriteedit-new';
			boxCode.setAttribute('data-placeholder', 'Placeholder text');
		}
		return boxCode;
	}
	function getSprite(source) {
		var ele;
		if (typeof(source) === 'number') {
			ele = myRoot.querySelector('.spritedoc-box[data-pos="' + source + '"]');
		} else {
			ele = source;
		}
		if (!ele) {return;}
		return {
			addName: function(name) {
				var c = _getCodeField(name, 'sprite');
				var li = document.createElement('li');
				li.className = 'spritedoc-name';
				ele.querySelector('.spritedoc-names').appendChild(li).appendChild(c);
				if (!name.length) {c.focus();}
				return c;
			},
			element: ele,
			getImage: function() {
				return ele.querySelector('.spritedoc-image .sprite').children[0];
			},
			getPosId: function() {
				return Number(ele.dataset.pos);
			},
			getNames: function() {
				return ele.querySelectorAll('code[issprite]');
			},
			setImage: function(e) {
				ele.querySelector('.spritedoc-image .sprite').replaceChildren(e);
			}
		};
	}
	function addNotifier(n) {
		notifiers.push(n);
	}
	function getSection(id) {
		var ele = myRoot.querySelector('.spritedoc-section[data-section-id="' + id + '"]');
		if (!ele) {return 'Section not found';}
		return {
			addSprite: function(sprite) {
				ele.querySelector('.spritedoc-boxes').appendChild(sprite);
			},
			element: ele,
			getSprites: function() {
				var result = [];
				ele.querySelectorAll('.spritedoc-box[data-pos]').forEach(function(e) {
					result.push(getSprite(Number(e.dataset.pos)));
				});
				return result;
			},
			id: id,
			removeSprite: function(id) {
				if (!ele.querySelector('.spritedoc-box[data-pos="' + id + '"]')) {return false;}
				return deleteSprite(id);
			}
		};
	}
	var createSprite;
	function setImage(file, sprite){
		var reader = new FileReader();
		reader.onloadend = function(readerEvent) {
			var imgEle = document.createElement('img');
			imgEle.src = readerEvent.target.result;
			imgEle.addEventListener('load', function() {
				var c = document.createElement('canvas');
				c.width = width;
				c.height = height;
				var ctx = c.getContext('2d');
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(imgEle,
					0, 0, imgEle.naturalWidth || imgEle.width, imgEle.naturalHeight || imgEle.height, // Source coords.
					0, 0, width, height // Canvas coords.
				);
				sprite.setImage(c);
			});
		};
		reader.readAsDataURL(file);
	}
	function addFile(f, sec) {
		// From original Sprite-Editor
		var fname = f.name.trim().replace( /\.[^\.]+$/, '' ).replace( /_/g, ' ' );
		if (!fname.length) {return;}
		highestSpriteId++;
		if (highestSpriteId === possprite) {
			highestSpriteId++;
		}
		var sprite = _createSprite(fname, false);
		sec.addSprite(sprite.element);
		setImage(f, sprite);
		return sprite;
	}
	function _createSprite(name, isNewButton) {
		var s = spriteBoxTemplate.cloneNode(true);
		var main = window.SpriteEditorModules.main;
		var btn = new main.OO.ui.ButtonInputWidget( {
			classes: [ 'spriteedit-add-name' ],
			framed: false,
			icon: 'add',
			title: main.msg('add-name-label').plain()
		});
		if (!isNewButton) {
			s.dataset.pos = highestSpriteId;
			s.querySelector('.spritedoc-image').onclick = function(e){
				_notify('image-click', {
					sprite: getSprite(Number(e.target.closest('.spritedoc-box').dataset.pos))
				});
			};
		}
		if (!isNewButton && editmode) {
			s.append(btn.$element.get(0));
			s.setAttribute('draggable', 'true');
			s.dataset.sortKey = name;
			s.ondragstart = function(event) {
				event.target.setAttribute('ghost', 'true');
				event.dataTransfer.setData('Text', event.target.dataset.pos);
			};
			btn.on('click', function() {
				var sprite = getSprite(Number(s.dataset.pos));
				_notify('button-add-name', {
					sprite: sprite
				});
				sprite.addName('');
			});
		} else if (editmode) {
			s.querySelector('.spritedoc-image .sprite').replaceChildren(new main.OO.ui.IconWidget( {
				icon: 'imageAdd',
				label: main.msg('new-images-hover').plain(),
				title: main.msg('new-images-label').plain(),
				classes: [ 'spriteeditor-newImagesBtn' ]
			} ).$element.get(0));
			s.onclick = function(e) {
				var sprites = [];
				var input = document.createElement('input');
				var sec = getSection(e.target.closest('.spritedoc-section').dataset.sectionId);
				var files = [];
				input.type = 'file';
				input.setAttribute('multiple', '');
				input.setAttribute('accept', 'image/*');
				input.onchange = function(f) {
					Array.prototype.forEach.call(f.target.files, function(file) {
						files.push(file);
						var s = addFile(file, sec);
						if (s) {sprites.push(s);}
					});
					_notify('files-added', {
						highestID: highestSpriteId,
						section: sec,
						files: files,
						sprites: sprites
					});
				};
				input.click();
			};
		}
		var sprite = getSprite(s);
		if (name.length) {sprite.addName(name);}
		if (isNewButton || !editmode) {sprite.getNames()[0].contentEditable=false;}
		return sprite;
	}
	createSprite = function(firstName, id) {
		var old = highestSpriteId;
		highestSpriteId = id || highestSpriteId;
		if (myRoot.querySelector('.spritedoc-box[data-pos="' + highestSpriteId + '"]')) {return;}
		var sprite = _createSprite(firstName, false);
		highestSpriteId = old;
		highestSpriteId++;
		return sprite;
	};
	function createSection(name, id, options) {
		if (myRoot.querySelector('.spritedoc-section[data-section-id="' + id + '"]')) {return;}
		options = options || {};
		var s = sectionTemplate.cloneNode(true);
		s.setAttribute('data-section-id', id);
		myRoot.appendChild(s);
		var c = _getCodeField(name, 'section');
		c.className = '.mw-headline';
		s.children[0].append(c); // append code-tag to h3-tag
		if (!name.length) {c.focus();}
	
		s.addEventListener('dragstart', function() {
			if (!sectionDraggingEnabled) {return;}
			oldSectionOrder = [];
			myRoot.querySelectorAll('.spritedoc-section').forEach(function(s) {
				oldSectionOrder.push(s.dataset.sectionId);
			});
			isDragging = true;
			s.classList.add('dragging');
		});
		s.addEventListener('dragend', function() {
			if (!sectionDraggingEnabled) {return;}
			var newSectionOrder = [];
			myRoot.querySelectorAll('.spritedoc-section').forEach(function(s) {
				newSectionOrder.push(s.dataset.sectionId);
			});
			_notify('sections reordered', {
				oldOrder: oldSectionOrder,
				newOrder: newSectionOrder
			});
			isDragging = false;
			s.classList.remove('dragging');
		});
		
		var section = getSection(id);
		if (options.withSampleSprite) {section.addSprite(createSprite('Sample name').element);}
		if (editmode) {
			var newImage = _createSprite('New Image', true).element;
			newImage.classList.add('spritedoc-newimageBtn');
			newImage.querySelector('code').removeAttribute('issprite');
			section.addSprite(newImage);
		}
		// Handles drag'n'drop
		var spriteBoxes = s.querySelector('.spritedoc-boxes');
		var dropZone = s.querySelector('.section-drag-overlay');
		spriteBoxes.addEventListener('dragenter', function(e) {
			if (isDragging) {return;}
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			dropZone.style.display = '';
		});
		var f = function(e) {
			if (isDragging) {return;}
			e.preventDefault();
		};
		dropZone.addEventListener('dragenter', f);
		dropZone.addEventListener('dragover', f);
		dropZone.addEventListener('dragleave', function(e) {
			if (isDragging) {return;}
			e.preventDefault();
			dropZone.style.display = 'none';
		});
		dropZone.addEventListener('drop', function(e) {
			if (isDragging) {return;}
			e.preventDefault();
			dropZone.style.display = 'none';
			var ele = e.dataTransfer.getData('Text');
			var files = e.dataTransfer.files;
			var newSec = e.target.closest('.spritedoc-section').dataset.sectionId;
			if (newSec && files.length > 0) { // Files
				var sec = getSection(newSec);
				var sprites = [];
				for (var i = 0; i < files.length; i++) {
					var s = addFile(files[i], sec);
					if (s) {sprites.push(s);}
				}
				_notify('files-added', {
					section: sec,
					files: files,
					sprites: sprites
				});
				return;
			}
			if (!ele) {return;}
			var selEle = getSprite(Number(ele));
			if (!selEle) {return;}
			var oldSec = selEle.element.closest('.spritedoc-section').dataset.sectionId;
			selEle.element.removeAttribute('ghost');
			if (!newSec || newSec === oldSec) {return;}
			myRoot.querySelector('div[data-section-id="' + newSec + '"] .spritedoc-boxes').appendChild(selEle.element);
			_notify('sprite-moved', {
				sprite: selEle,
				origin: oldSec,
				destination: newSec
			});
		});
		return section;
	}
	function deleteSprite(id) {
		var ele = myRoot.querySelector('.spritedoc-box[data-pos="' + id + '"]');
		if (!ele) {return false;}
		ele.parentElement.removeChild(ele);
		return true;
	}
	function getSections() {
		var result = [];
		myRoot.querySelectorAll('.spritedoc-section').forEach(function(e) {
			result[e.dataset.sectionId] = getSection(e.dataset.sectionId);
		});
		return result;
	}
	function isEditMode() {
		return editmode ? true : false;
	}
	function removeNotifier(n) {
		if (notifiers.indexOf(n) < 0) {return;}
		notifiers.splice(n, 1);
	}
	function setRootElement(e) {
		myRoot = e;
	}
	function setEditMode(a) {
		editmode = a;
	}
	function setPosSprite(a) {
		possprite = a;
	}
	myRoot.addEventListener('dragover', function(e) {
		if (!sectionDraggingEnabled) {return;} // Inspired by https://www.youtube.com/watch?v=9HUlUnM3UG8
		var list = [];
		var notDraggedElements = myRoot.querySelectorAll('.spritedoc-section:not(.dragging)');
		notDraggedElements.forEach(function(a){list.push(a);});
		var nextSibling = list.find(function(f) {
			return e.pageY <= f.offsetTop + f.offsetHeight / 2;
		});
		myRoot.insertBefore(myRoot.getElementsByClassName('dragging')[0], nextSibling);
	});
	function enableSectionDragging(state) {
		sectionDraggingEnabled = state;
		myRoot.classList.toggle('drag-enabled', state);
		getSections().forEach(function(b){
			if (state) {b.element.setAttribute('draggable', 'true');}
			else {b.element.removeAttribute('draggable');}
		});
	}
	function setSpriteDimension(w, h) {
		width = w;
		height = h;
	}
	function overrideHighestId(i) {
		highestSpriteId = i;
	}
	window.SpriteEditorModules.spriteutils = {
		addNotifier: addNotifier,
		createSection: createSection,
		createSprite: createSprite,
		deleteSprite: deleteSprite,
		enableSectionDragging: enableSectionDragging,
		getSection: getSection,
		getSections: getSections,
		getSprite: getSprite,
		isEditMode: isEditMode,
		loaded: true,
		overrideHighestId: overrideHighestId,
		removeNotifier: removeNotifier,
		setEditMode: setEditMode,
		setImage: setImage,
		setPosSprite: setPosSprite,
		setRootElement: setRootElement,
		setSpriteDimension: setSpriteDimension,
	};
})();