/**
 * @author Markus Gebert (https://github.com/mgeb/mediawiki-drawio-editor)
 * @name DrawioEditor
 * @desc draw.io flow chart creation and inline editing
 * 
 *		Slightly reworked DrawioEditor for using without
 *		installing Mediawiki extension
 */

!(function(window, $) {
	console.log('Drawio-init');
	function DrawioEditor(id, filename, type, interactive, updateHeight, updateWidth, updateMaxWidth) {
		var that = this;
		this.id = id;
		this.filename = filename;
		this.imgType = type;
		this.interactive = interactive;
		this.updateHeight = updateHeight;
		this.updateWidth = updateWidth;
		this.updateMaxWidth = updateMaxWidth;

		if (this.imgType == 'svg') {
			this.imgMimeType = 'image/svg+xml';
		} else if (this.imgType == 'png') {
			this.imgMimeType = 'image/png';
		} else {
			throw new Error('unkown file type');
		}

		this.imageBox = $("#drawio-img-box-" + id);
		this.image = $("#drawio-img-" + id);
		if (interactive) {
			this.imageURL = this.image.attr('data');
		} else {
			this.imageURL = this.image.attr('src');
		}
		this.imageHref = $("#drawio-img-href-" + id);
		this.placeholder = $("#drawio-placeholder-" + id);

		this.iframeBox = $("#drawio-iframe-box-" + id);
		this.iframeBox.resizable({
			"handles": "s",
			"distance": 0,
			start: function(event, ui) {
				that.showOverlay();
			},
			stop: function(event, ui) {
				$(this).css("width", '');
				that.hideOverlay();
			}
		});
		this.iframeBox.resizable("enable");
	
		this.iframeOverlay = $("#drawio-iframe-overlay-" + id);
		this.iframeOverlay.hide();
	 
		this.iframe = $('<iframe>', {
			src: 'https://embed.diagrams.net/?embed=1&proto=json&spin=1&analytics=0&db=0&gapi=0&od=0&picker=0',
			id: 'drawio-iframe-' + id,
			class: 'DrawioEditorIframe'
		});
		this.iframe.appendTo(this.iframeBox);
		
		this.iframeWindow = this.iframe.prop('contentWindow');
	
		this.show();
	}
	
	DrawioEditor.prototype.destroy = function() {
		this.iframe.remove();
	};
	
	DrawioEditor.prototype.show = function() {
		this.imageBox.hide();
		this.iframeBox.height(Math.max(this.imageBox.height()+100, 800));
		this.iframeBox.show();
	};
	
	DrawioEditor.prototype.hide = function() {
		this.iframeBox.hide();
		this.imageBox.show();
	};
	
	DrawioEditor.prototype.showOverlay = function() {
		this.iframeOverlay.show();
	};
	
	DrawioEditor.prototype.hideOverlay = function() {
		this.iframeOverlay.hide();
	};
	
	DrawioEditor.prototype.updateImage = function (imageinfo) {
		this.imageURL = imageinfo.url + '?cb=' + imageinfo.timestamp;
		if (this.interactive) {
			this.image.attr("data", this.imageURL);
		} else {
			this.image.attr("src", this.imageURL);
		}
		this.imageHref.attr("href", imageinfo.descriptionurl);
		if (this.updateHeight)
			this.image.css('height', imageinfo.height);
		if (this.updateWidth)
			this.image.css('width', imageinfo.width);
		if (this.updateMaxWidth)
			this.image.css('max-width', imageinfo.width);
		if (this.placeholder) {
			this.placeholder.hide();
			this.image.show();
		}
	};
	
	DrawioEditor.prototype.sendMsgToIframe = function(data) {
		this.iframeWindow.postMessage(JSON.stringify(data), 'https://embed.diagrams.net');
	};
	
	DrawioEditor.prototype.showDialog = function(title, message) {
		this.hideSpinner();
		this.sendMsgToIframe({
			'action': 'dialog',
			'title': title,
			'message': message,
			'button': 'Discard',
			'modified': true
		});
	};
	
	DrawioEditor.prototype.showSpinner = function() {
		this.iframeBox.resizable("disable");
		this.showOverlay();
		this.sendMsgToIframe({
			'action': 'spinner',
		'show': true
		});
	};
	
	DrawioEditor.prototype.hideSpinner = function() {
		this.iframeBox.resizable("enable");
		this.hideOverlay();
		this.sendMsgToIframe({
			'action': 'spinner',
			'show': false
		});
	};
	
	DrawioEditor.prototype.downloadFromWiki = function() {
		var that = this;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4) {
			if (this.status == 200) {
					var res = this.response;
					var fr = new FileReader();
					fr.onload = function(ev) { that.loadImageFromDataURL(res.type, ev.target.result); };
					fr.readAsDataURL(res);
			} else {
				that.showDialog('Load failed',
					'HTTP request to fetch image failed: ' + this.status +
				'<br>Image: ' + that.imageURL);
			}
			}
		};
		xhr.onload = function() {
	
		};
		xhr.open('GET', this.imageURL);
		xhr.responseType = 'blob';
		xhr.send();
	};
	
	DrawioEditor.prototype.loadImageFromDataURL = function(type, dataurl) {
		if (type != this.imgMimeType) {
		this.showDialog('Load failed',
			'Invalid mime type when loading image from wiki:' +
			'<br>Actual: ' + type + ' / Expected: ' + this.imgMimeType +
			'<br>Image: ' + this.imageURL);
		return;
		}
		if (this.imgType == 'svg') {
			this.sendMsgToIframe({ action: 'load', xml: dataurl});
		} else if (this.imgType == 'png') {
			this.sendMsgToIframe({ action: 'load', xmlpng: dataurl});
		}
	};
	
	DrawioEditor.prototype.loadImage = function() {
		if (!this.imageURL.length) {
			// just load without data if there's no current image
			this.sendMsgToIframe({ action: 'load' });
		return;
		}
		// fetch image from wiki. it must contain both image data and
		// draw.io xml data. see DrawioEditor.saveCallback()
		this.downloadFromWiki();
	};
	 
	DrawioEditor.prototype.uploadToWiki = function(blob) {
		var that = this;
		formdata = new FormData();
		formdata.append("format", "json");
		formdata.append("action", "upload");
		formdata.append("ignorewarnings", "true");
		formdata.append("filename", this.filename);
		formdata.append("token", mw.user.tokens.get('csrfToken') );
		formdata.append("file", blob, this.filename);
	
		$.ajax({
			url: mw.util.wikiScript('api'),
		// contentType and processData must be false when using FormData
			contentType: false,
			processData: false,
		type: "POST",
		data: formdata,
			success: function(data) {
				if (!data.upload) {
					if (data.error) {
						that.showDialog('Save failed',
						 'The wiki returned the follwing error when uploading:<br>' +
						 data.error.info);
					} else {
						that.showDialog('Save failed',
						 'The upload to the wiki failed.' +
						 '<br>Check javascript console for details.');
					}
					console.log('upload to wiki failed');
					console.log(data, formdata);
				} else {
					that.showDialog('Файл збережено',
						 'Редактор можна закрити.');
					that.updateImage(data.upload.imageinfo);
					that.hideSpinner();
				}
			},
			error: function(xhr, status, error) {
			that.showDialog('Save failed', 
				'Upload to wiki failed!' +
			'<br>Error: ' + error +
			'<br>Check javascript console for details.');
			},
		});
	};
	
	DrawioEditor.prototype.save = function(datauri) {
		// the data in the data uri contains both the image _and_ draw.io XML, see
		// this.saveCallback()
	
		parts = /^data:([^;,=]+\/[^;,=]+)?((?:;[^;,=]+=[^;,=]+)+)?(?:;(base64))?,(.+)$/.exec(datauri);
		
		// currently this save/upload to wiki code assumes that drawio passes data
		// URIs with base64 encoded data. this is currently the case but may not be
		// true forever. the check below errors out if the URI data is not base64
		// encoded (and if the data URI is otherwise deemed invalid.
		if (!parts || parts[1] != this.imgMimeType || parts[3] != 'base64' ||
				typeof parts[4] !== 'string' || parts[4].length < 1) {
		that.showDialog('Save failed', 'Got unexpected data from drawio export.');
		return;
		}
	
		// convert base64 to uint8 array
		datastr = atob(parts[4]);
		data = new Uint8Array(datastr.length);
		for (i = 0; i < datastr.length; i++) {
			data[i] = datastr.charCodeAt(i);
		}
		
		this.uploadToWiki(new Blob([data], {type: this.imgMimeType}));
	};
	
	DrawioEditor.prototype.exit = function() {
		this.hide();
		editor = null;
		this.destroy();
		setInterval(location.reload(), 7000);
	};
	
	DrawioEditor.prototype.saveCallback = function() {
		this.showSpinner();
	
		// xmlsvg and xmlpng are known to work. the xml prefix causes the original
		// chart.io xml data to be added to the file, so it can be reimported later
		// without any data loss.
		var format = 'xml'+ this.imgType;
	
		this.sendMsgToIframe({
			'action': 'export',
			'embedImages': true,
			'format': format,
		});
	
		// TODO: prevent exit while saving
	};
	
	DrawioEditor.prototype.exportCallback = function(type, data) {
		this.showSpinner();
		this.save(data);
	};
	
	DrawioEditor.prototype.exitCallback = function() {
		this.exit();
	};
	
	DrawioEditor.prototype.initCallback = function () {
		this.loadImage();
	};
	
	
	var editor;
	
	window.editDrawio = function(id, filename, type, updateHeight, updateWidth, updateMaxWidth) {
		if (!editor) {
			editor = new DrawioEditor(id, filename, type, updateHeight, updateWidth, updateMaxWidth);
		} else {
			alert("Only one DrawioEditor can be open at the same time!");
		}
	};
	
	function drawioHandleMessage(e) {
		// we only act on event coming from draw.io iframes
		if (e.origin != 'https://embed.diagrams.net')
			return;
		
		if (!editor)
			return;
			 
		evdata = JSON.parse(e.data);
	
		switch(evdata['event']) {
			case 'init':
				editor.initCallback();
				break;
	
			case 'load':
				break;
	
			case 'save':
				editor.saveCallback();
				break;
	
			case 'export':
				editor.exportCallback(evdata['format'], evdata['data']);
				break;
	
			case 'exit':
				editor.exitCallback();
			// editor is null after this callback
				break;
	
			default:
				alert('Received unknown event from drawio iframe: ' + evdata['event']);
		}
	}
	
	window.addEventListener('message', drawioHandleMessage);


	String.prototype.format = function() {
		var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				number = number - 1;
				return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
	
	var loadScript = function(url) {
		return $.ajax({
			url: url,
			dataType: 'script',
			cache: true
    	});
	};
	
	
	var defaultImageType = 'png';
	var defaultInteractive = false;
	
	var $blocks = $('#drawio-template, #Drawio-template');
	if ($blocks.length < 0) return;
	$.when(
		loadScript('https://code.jquery.com/ui/1.12.1/jquery-ui.js')
	).then(function() {
		$blocks.each(function(index, item) {
			var $this = $(item);
			var options = $this.data();
			var id = Math.floor(Math.random() * 1000000);
			var name = options.image;
			var optType = options.type ? options.type : name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
			var imageName = name;// + ".drawio." + optType;
			var optInteractive = options.interactive ? options.interactive : defaultInteractive;
			var optHeight = options.height ? options.height : 'auto';
			var optWidth = options.width ? options.width : '100%';
			var optMaxWidth = options.maxWidth ? options.maxWidth : false;
			var optStyle;
			
			if (optMaxWidth) {
			} else {
				optMaxWidth = 'chart';
			}
			
			$.ajax({
				url: mw.util.wikiScript( 'api' ),
				type: 'GET',
				dataType: 'json',
				traditional: true,
				data: {
    	        	format: 'json',
    	        	action: 'query',
    	        	titles: 'Файл:' + imageName,
    	        	prop  : 'imageinfo',
    	        	iiprop: 'url|size',
    	        },
    	        success: function(image) {
    	        	var imageData;
					$.each(image.query.pages, function(index, item) {
						imageData = item;
					});
					var imgHeight;
					var imgWidth;
					var imgMaxWidth;
					var imgUrl;
					
					if (imageData.missing) {
						imgHeight = 0;
						imgWidth = 0;
						imgMaxWidth = 0;
						imgUrl = '';
					} else {
						imgHeight = imageData.imageinfo[0].height + 'px';
						imgWidth = imageData.imageinfo[0].width + 'px';
						imgMaxWidth = imageData.imageinfo[0].width + 'px';
						imgUrl = imageData.imageinfo[0].url;
					}
					
					var cssImgHeight  = optHeight === 'chart' ? optHeight : imgHeight;
					var cssImgWidth = optWidth === 'chart' ? optWidth: imgWidth;
					var cssImgMaxWidth = optMaxWidth === 'chart' ? imgMaxWidth : optMaxWidth;
					
					var optStyle = 'height: {1}; width: {2}; max-width: {3};'.format(
						cssImgHeight, cssImgWidth, cssImgMaxWidth
					);
					$this.append(
						$("<div>", {
							append: [
								$("<div>", {
									id: 'drawio-img-box-' + id,
									class: "drawio-img-box",
									style: "position:relative; width:fit-content;" + options.style,
									append: [
										$("<a>", {
											class: 'drawio-edit-btn',
											href: "javascript:editDrawio(\"{1}\", \"{2}\", \"{3}\", {4}, {5}, {6}, {7})".format(
												id, imageName, optType,
												optInteractive ? 'true' : 'false',
												optHeight === 'chart' ? 'true' : 'false',
												optWidth === 'chart' ? 'true' : 'false',
												optMaxWidth === 'chart' ? 'true' : 'false'
											),
											title: 'Редагувати',
											html: '&#128393;'
										}),
										//$("<object>", {
										//	data: 'https://static.wikia.nocookie.net/warframe/images/e/e4/SampleChart.drawio.svg	///revision	/latest?c		////=20230621055052&path-prefix=uk',
										//	id: "drawio-img-" + id,
										//	type:"text/svg+xml",
										//	style: "height: auto; width: 100%; max-width: 121px;"
										//}),
									]
								}),
								$("<div>", {
									id: "drawio-iframe-box-" + id,
									style: 'display:none',
									append: [
										$("<div>", {
											id: "drawio-iframe-overlay-" + id,
											class: 'DrawioEditorOverlay',
											style: 'display:none',
										}),
									]
								}),
							]
						})
					);
					$('#drawio-img-box-' + id ).append(
					'<object id="drawio-img-{1}" data="{2}" type="text/svg+xml" style="{3}"></object>'.format(
						id,
						imgUrl,
						optStyle
					));
    	        }
			});
		});
	});
})(window, jQuery);