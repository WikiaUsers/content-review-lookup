(function(mw, $, config){
	if (config.disabled) return;
	function PartyMode(){
		this.music = [].concat(config.tracks || []);
		this.version = '2.0.0';
		this.colors = ['red', 'blue', 'orange', 'green', 'yellow', 'pink'].concat(config.colors);
		this.skins = [].concat(config.skins || []);
		this.name = 'Chat Party';
		this.authors = ['Ultimate Dark Carnage', 'ShermanTheMythran'];
		this.i18n = $.extend(true, {
			en: {
				trigger: '$name',
				loaded: '$name $version has loaded successfully. The script has been created by $author.',
				failed: '$name $version failed to load.',
				enabled: '$name $version has been enabled. Have fun.',
				disabled: '$name $version has been disabled.'
			}
		}, config.i18n);
		this.msg = this.translate();
		this.enabled = false;
		this.chatWindow = '.ChatWindow';
		return this;
	}
	
	PartyMode.prototype.translate = function(){
		var msg = this.i18n[mw.config.get('wgUserLanguage')] || this.i18n[mw.config.get('wgContentLanguage')] || this.i18n.en;
		msg = this.parse(msg);
		return msg;
	};
	
	PartyMode.prototype.parse = function(text, replaceFn){
		var variables = $.extend(true, {
			'name': this.name,
			'version': this.version,
			'author': function(){
				return this.authors.map(function(author, index, array){
					if (array.length > 1){
						if (array.length === 2 && index === 0){
							return author + ' and ';
						} else if (array.length > 2){
							if (index < (array.length - 2)){
								return author + ', ';
							} else if (index === (array.length - 2)){
								return author + ' and ';
							}
						}
					}
					return author;
				}).join('');
			}
		}, config.variables);
		for (var variable in variables){
			if (variables.hasOwnProperty(variable)){
				var value = variables[variable];
				if (typeof value == 'function'){
					if (typeof replaceFn === 'undefined' || replaceFn === false){
						value = value.call(this, []);
						if (typeof value !== 'string') continue;
					}
					else value = $.proxy(value, this);
				}
				text = text.replace('$' + variable, value);
			}
		}
		return text;
	};
	
	PartyMode.prototype.Disco = $.extend(true, {
		orientation: 'right',
		speed: 'slow',
		interval: 40,
		active: false,
		ballsV: 8,
		ballsH: 6,
		width: document.body.clientWidth,
		height: document.body.clientHeight,
		options: $.extend(true, {
			white: {
				name: 'White',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(){
						var $l = $(this);
						$l.attr('class', function(index, value){
							var classNames = value.split(/\s+/g);
							classNames = classNames.filter(function(name){
								return !(name.indexOf('sepia-', 0) === 0) ||
									   !(name === 'monochrome') ||
								       !(name.indexOf('neon-', 0) === 0);
							});
							return classNames.join(' ');
						});
						$l.addClass('white');
					});
				}
			},
			colored: {
				name: 'Multi-Colored',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(){
						var $l = $(this);
						$l.attr('class', function(index, value){
							var classNames = value.split(/\s+/g);
							classNames = classNames.filter(function(name){
								return !(name.indexOf('sepia-', 0) === 0) ||
									   !(name === 'monochrome') ||
								       !(name.indexOf('neon-', 0) === 0) ||
									   !(name === 'white');
							});
							return classNames.join(' ');
						});
					});
				}
			},
			monochrome: {
				name: 'Monochrome',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(){
						var $l = $(this);
						$l.attr('class', function(index, value){
							var classNames = value.split(/\s+/g);
							classNames = classNames.filter(function(name){
								return !(name.indexOf('sepia-', 0) === 0) ||
								       !(name.indexOf('neon-', 0) === 0) ||
									   !(name === 'white');
							});
							return classNames.join(' ');
						});
						$l.addClass('monochrome');
					});
				}
			},
			neon: {
				name: 'Neon',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(_index){
						var $l = $(this),
							neonColors = ['blue', 'green', 'pink'].concat(config.neonColors || []),
							neonIndex = _index % neonColors.length,
							color = neonColors[Math.floor(Math.random() * neonIndex)];
						$l.attr('class', function(index, value){
							var classNames = value.split(/\s+/g);
							classNames = classNames.filter(function(name){
								return !(name.indexOf('sepia-', 0) === 0) ||
									   !(name === 'monochrome') ||
									   !(name === 'white');
							});
							return classNames.join(' ');
						});
						$l.addClass('neon-' + color);
					});
				}
			},
			sepia: {
				name: 'Sepia',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(_index){
						var $l = $(this),
							sepiaIndex = (_index % 4) + 1,
							percent = sepiaIndex * 25;
						$l.attr('class', function(index, value){
							var classNames = value.split(/\s+/g);
							classNames = classNames.filter(function(name){
								return !(name === 'monochrome') ||
								       !(name.indexOf('neon-', 0) === 0) ||
									   !(name === 'white');
							});
							return classNames.join(' ');
						});
						$l.addClass('sepia-' + percent);
					});
				}
			},
			off: {
				name: 'Off',
				handler: function(){
					var $chatWindow = $(this.chatWindow),
						$light = $chatWindow.find('#ChatPartySkin .light');
					$light.each(function(){
						var $l = $(this);
						$l.remove();
					});
					this.Disco.set('active', false);
				}
			}
		}, config.discoOptions)
	}, config.Disco);
	
	PartyMode.prototype.Disco.set = function(prop, value){
		if (typeof value === 'undefined'){
			throw new ReferenceError('A value is required for property: ' + prop + '.');
		} else {
			var obj = this.Disco[prop];
			this.Disco[prop] = value;
		}
	};
	
	PartyMode.prototype.Disco.activate = function(){
		this.Disco.create();
		var type = config.selectedDiscoType || 'white',
			disco = this.Disco.options,
			obj = type in disco ? disco[type] : disco.white;
		$('#ChatPartyUI .discoOptions[data-name="' + obj.name + '"]').prop('selected', true);
		obj.handler.call(this, []);
		this.Disco.set('active', true);
	};
	
	PartyMode.prototype.Disco.create = function(){
		var vertical_balls = this.Disco.ballsV,
			horizontal_balls = this.Disco.ballsH,
			offset = config.offset || 15,
			total = vertical_balls * horizontal_balls,
			startV = config.startV || Math.floor((1 / vertical_balls) * this.Disco.width), startVC = startV, endV = this.Disco.width - startV,
			startVt = startV,
			startH = config.startH || Math.floor((1 / horizontal_balls) * this.Disco.height), startHC = startH, endH = this.Disco.height - startH,
			startHt = startH,
			hIndex = 0, vIndex = 0;
		for (var i = 1; i < total; i++){
			var colors = this.colors,
				random_number = Math.floor(Math.random() * colors.length),
				color = colors[random_number],
				$ball = $('<div />', {
					'class': 'ball light ' + color
				});
			if ((i % vertical_balls) === 0){
				startV = startVC;
				if (i !== 0){
					startH += startHC;
					vIndex = 0;
					hIndex++;
				}
				if (hIndex % 2 === 0){
					startV += offset;
				}
			} else {
				startV += startVC;
				vIndex++;
			}
			
			$ball.css({
				'top': startH + 'px',
				'left': startV + 'px'
			});
			this.Disco.moveBall($ball);
			$('#ChatPartySkin').append($ball);
		}
	};
	
	PartyMode.prototype.Disco.moveBall = function moveBall($ball){
		var interval = this.Disco.interval, orientation = this.Disco.orientation,
			speed = this.Disco.speed, obj = this.Disco,
			position = {
				'left': '-=' + interval + 'px',
				'right': '+=' + interval + 'px'
			};
		$ball.animate({
			'left': position[orientation],
		}, {
			duration: speed,
			step: function(fx, now){
				var rect = this.getBoundingClientRect();
				if (orientation === 'left'){
					if (rect.y < -interval){
						$(this).css('left', (obj.width + interval) + 'px');
					}
				} else if (orientation === 'right'){
					if (rect.y > (obj.width + interval)){
						$(this).css('left', '-' + interval + 'px');
					}
				}
				moveBall($(this));
			}
		});
	};
	
	PartyMode.prototype.Skins = $.extend(true, {
		active: false,
		defaultSkin: 'normal',
		themes: $.extend(true, {
			'normal': {
				name: 'Default Theme',
				baseStylesheet: '',
				active: false,
				activate: function(theme, id){},
				beforedeactivate: function(theme, id){}
			},
			'neon': {
				name: 'Neon',
				baseStylesheet: 'MediaWiki:Neon.css',
				active: false,
				activate: function(theme, id){
					$(this.chatWindow).addClass('PartyModeTheme-' + id);
				},
				beforedeactivate: function(theme, id){
					$(this.chatWindow).removeClass('PartyModeTheme-' + id);
				}
			},
			'naruto': {
				name: 'Naruto',
				baseStylesheet: 'MediaWiki:Naruto.css',
				active: false,
				activate: function(theme, id){
					$(this.chatWindow).addClass('PartyModeTheme-' + id);
				},
				beforedeactivate: function(theme, id){
					$(this.chatWindow).removeClass('PartyModeTheme-' + id);
				}
			},
			'light': {
				name: 'Light Theme',
				baseStylesheet: 'MediaWiki:Light.css',
				active: false,
				activate: function(theme, id){
					$(this.chatWindow).addClass('PartyModeTheme-' + id);
				},
				beforedeactivate: function(theme, id){
					$(this.chatWindow).removeClass('PartyModeTheme-' + id);
				}
			},
			'metallic': {
				name: 'Metallic Theme',
				baseStylesheet: 'MediaWiki:Metallic.css',
				active: false,
				activate: function(theme, id){
					$(this.chatWindow).addClass('PartyModeTheme-' + id);
				},
				beforedeactivate: function(theme, id){
					$(this.chatWindow).removeClass('PartyModeTheme-' + id);
				}
			}
		}, config.skinThemes)
	}, config.Skins);
	
	PartyMode.prototype.Skins.exists = function(_theme, callback){
		var theme = this.Skins.themes[_theme],
			exists = typeof theme !== 'undefined';
		if (typeof callback == 'function'){
			if (exists === true){
				callback.apply(this, [theme]);
			}
		}
		return exists;
	};
	
	PartyMode.prototype.Skins.toggle = function(theme){
		this.Skins.exists(theme, function(theme){
			var targetTheme = this.Skins.themes[theme];
			if (targetTheme.active === false){
				this.Skins.themes[theme].active = true;
				targetTheme.activate.apply(this, [targetTheme, theme]);
			} else {
				targetTheme.beforedeactivate.apply(this, [targetTheme, theme]);
				this.Skins.themes[theme].active = false;
			}
		});
	};
	
	PartyMode.prototype.Skins.stylesheetFound = function(stylesheet){
		if (theme === 'normal') return;
		return new Promise(function(resolve, reject){
			$.get('/api.php', {
			    action: 'query',
			    prop: 'info|revisions',
			    intoken: 'edit',
			    titles: stylesheet,
			    rvprop: 'content',
			    rvlimit: '1',
			    indexpageids: 'true',
			    format: 'json'
			}).done(function(response){
			    var pageExists = response.query.pages['-1'] ? false : true;
			    if (pageExists){
			        resolve(stylesheet);
			    } else {
			        reject();
			    }
			}).fail(function(error){
			    reject();
			});
		});
	};
	
	PartyMode.prototype.Skins.importStylesheets = function(){
	    var themes = Object.keys(this.Skins.themes);
	    themes.forEach($.proxy(function(theme){
	        var stylesheet = this.Skins.themes[theme].baseStylesheet;
	        this.stylesheetFound(stylesheet).then(function(page){
	            importStylesheet(page);
	        });
	    }, this));
	};
	
	window.PartyMode = new PartyMode();
}(mediaWiki, jQuery, window.ChatPartyConfig = window.ChatPartyConfig || {}));