(function bang(window, mw, $) {

    if (window.bangLoaded) return;
    window.bangLoaded = true;

	var searchInputSelector = ".search-app.search-app__wrapper.search-app > input";
	var ns = mw.config.get('wgFormattedNamespaces'),
		namespaces = {
			t: ns[10], // Template
			mw: ns[8], // MediaWiki
			s: ns[-1], // Special
			h: ns[12], // Help
			m: ns[828], // Module
			f: ns[6], // File
			u: ns[2], // User
			ut: ns[3], // User talk
			w: ns[1200], // Message Wall
			ub: ns[500], // User blog
			p: ns[4], // Project
			c: ns[14], // Category
			fo: ns[110] // Forum
		};

        $(document).on('keyup', searchInputSelector, function() {
	        var old = $(this).val(),
                txt,
		        m = old.match(/^\!([a-z]+) /);
	
            if (m && namespaces.hasOwnProperty(m[1])) {
	    		txt = namespaces[m[1]] + ":" + old.substr(m[1].length + 2);
	    		// this method apparently prevents React from reverting the value
                Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    "value"
                ).set.call(this, txt);
                this.dispatchEvent(new Event("input", { bubbles: true }));
		    }
	    });    
}) (this, mediaWiki, jQuery);