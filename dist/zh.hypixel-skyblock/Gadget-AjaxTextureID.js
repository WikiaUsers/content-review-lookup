// <pre> 
/* jshint esversion: 5, undef: true, jquery: true */
/* global mw */
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
    var config = mw.config.get([
        'wgCanonicalNamespace',
        'wgCanonicalSpecialPageName',
        'wgPageName'
    ]);

    if (
        config.wgCanonicalNamespace !== "File" ||
        config.wgCanonicalSpecialPageName ||
        window.AjaxTextureIDLoaded
    ) {
        return;
    }
    
    const logger = (function() { // jshint ignore:line
    	Object.keys(this).forEach(function(method) {
    		var oldMethod = this[method];
    		this[method] = function() {
    			var args = Array.from(arguments);
    			
    			if (args[args.length-1] === true) {
    				args.pop();
    				
    				mw.notify(args.join(' '), {
    					type: method,
    				});
    				oldMethod.apply(null, ['[AjaxTextureID] [' + method.toUpperCase() + ']:'].concat(args));
    			} else {
    				oldMethod.apply(null, ['[AjaxTextureID] [' + method.toUpperCase() + ']:'].concat(args));
    			}
    		}.bind(this);
    	}, this);
    	
    	return this;
    }).call({
    	log: console.log,
    	warn: console.warn,
    	error: console.error,
    });
    const api = new mw.Api(); // jshint ignore:line

    window.AjaxTextureIDLoaded = true;

    function respHandler(res, d) {
        if (res === true) {
            logger.log("Successfully added the ID to the file!", true);
            setTimeout(function() {
                window.location.reload();
            }, 3000);
        } else {
            logger.warn("Failed to add the ID to the file: " + d.error.info);
        }
    }

    function click(msg) {
        var texture = prompt("Enter " + msg.name);

        if (!texture) {
            logger.warn('Input box empty', true);
            return;
        } else if (!/^[a-f0-9]{59,64}$/i.test(texture.trim())) {
            logger.warn('Not a valid ID: ' + texture, true);
            return;
	    }

		texture = texture.trim().toLowerCase();

		api.get({
			action: "query",
			format: "json",
			prop: "revisions",
			titles: config.wgPageName,
			formatversion: 2,
			rvprop: "content",
			rvslots: "*",
		}).then(function(d) {
			var content = d.query.pages[0].revisions[0].slots.main.content;
			var regex = new RegExp("\\{\\{" + msg.template + "\\|?.*?\\}\\}\\s*", "ig");
			var options = {
	            action: 'edit',
	            watchlist: 'nochange',
	            summary: "Updated " + msg.name + " for [[" + config.wgPageName + "]]",
	            title: config.wgPageName,
	            minor: true,
	            prependtext: '{{' + msg.template + '|' + texture + '}}\n',
	            token: mw.user.tokens.get('editToken'),
	        };
			
			if (content.match(regex)) {
				delete options.prependtext;
				options.text = '{{' + msg.template + '|' + texture + '}}\n' + content.replace(regex, '');
				console.log("Replaced existing ID(s)");
			}
			
			return api.post(options);
		}).then(function(r) {
            respHandler(true, r);
        }).catch(function(_, e) {
			 respHandler(false, e);
		});
    }
    
    function textureId() {
    	click({
    		name: 'Texture ID',
    		template: 'HeadRender',
    	});
    }
    
    function skinId() {
    	click({
    		name: 'Skin ID',
    		template: 'SkinRender',
    	});
    }

    $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').first().append(
        $('<li>').append(
            $('<a>', {
                css: {
                    cursor: 'pointer'
                },
                text: 'Add Texture ID',
                click: textureId
            })
        ),
        $('<li>').append(
            $('<a>', {
                css: {
                    cursor: 'pointer'
                },
                text: 'Add Skin ID',
                click: skinId
            })
        )
    );
});