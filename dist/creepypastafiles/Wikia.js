$(function() {
	var images = [
		'https://imgix.ranker.com/user_node_img/50061/1001216290/original/my-liu-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces',
		'https://i.ytimg.com/vi/Ed9kqs-2OgI/hqdefault.jpg',
		'https://vignette.wikia.nocookie.net/creepypasta-the-fighters/images/b/b7/Homicidal_Liu.png/revision/latest?cb=20140726232929',
		'https://vignette.wikia.nocookie.net/scratchpad/images/4/46/Creepypasta_logo.jpg/revision/latest?cb=20180109164211',
		'https://vignette.wikia.nocookie.net/villains/images/d/db/Jackhd.jpg/revision/latest/scale-to-width-down/2000?cb=20180629003041',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrc-sj_d1tWKpUnqnWbwhA8LK02fftqtxrAME6MM9jAaQuoObK',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4EwdT6X3lCR1jQVsNSMepqYivKbBU5T1jy_44XM5AE5V6rMnAdA',
		'https://i.kym-cdn.com/photos/images/newsfeed/000/077/244/you_shouldn__t_have_done_that___by_kiss_da_grizzums-d30kv5x.jpg?1318992465'
	];
 
	$('.wds-community-header__wordmark img').attr('src', 
	  images[Math.floor(Math.random() * images.length)]);
});

/** Inactive and New Editor user tags **/

InactiveUsers = {months: Number(2), text: String('Reported Missing')};
importScriptPage("MediaWiki:InactiveUsers/code.js", "dev");

function NewEditorTag($, mw, Date) {
	"use strict";
	return {
		start: function(config, username, logger) {
			//Anonymous users don't work with Special:Editcount, it returns blank
			
			if (mw.util.isIPv4Address(username) || 
			mw.util.isIPv6Address(username)) return;
 
			//Options
			
			config = $.extend({edits: 15, days: 4}, config);
 
			// Convert to a computation function if there isn't one
			
			if (typeof(config.computation) !== 'function') {
				var minEdits = config.edits | 0;
				var minDays = config.days | 0;
				
				// Sanity. Give up if both days and edits are zero.
				
				if (minEdits < 1 && minDays < 1) return;
				config.computation = function(days, edits) {
					return days < minDays || edits < minEdits;
				};}this._logger = logger;
 
			// Our promises for the async data we need to do this calculation
			
			var daysPromise = this._daysPromise = $.Deferred(),
			    editsPromise = this._editsPromise = $.Deferred();
 
			// Sanity, convert namespace string to number.
			
			var namespace = config.namespace;
			if (namespace && typeof(namespace) !== 'number') {
				namespace = mw.config.get('wgNamespaceIds')[namespace];
				if (typeof(namespace) !== 'number') {
					logger.err('Invalid namespace:', config.namespace);
					namespace = null;
				}
			}
 
			/** Performance optimising the common case. ~
			     In Oasis, with no namespace configuration, we can just scrape 
			     the DOM contributions counter instead of AJAXing which is 
			     WAY faster (especially since we're manually AJAXing 
			     instead of using Sledge) **/
			      // n === n is false for NaN
			      
			if ((typeof(namespace) === 'number' && namespace === namespace)
			 || ({oasis:1, wikia:1})[mw.config.get('skin')] !== 1) 
			 {this._doCustomAjax(username, namespace);
			}else {$($.proxy(this._onDomReady, this, username));}
 
			/** Start the core AJAX if needed and return the promise to 
			    delay further processing until we're ready. **/
			    
			return {
				ajax: {
					type: 'contributions',
					limit: 1,
					dir: 'newer',
					prop: ['timestamp']
				},
				promise: $.when(daysPromise, editsPromise).then(function(a, b) {
					try {return config.computation(a, b) && ['newuser'];} 
					catch(e) {
						logger.err(
						'Custom Computation function exploded!', 
						e, 
						e.stack);return $.Deferred().reject();
					}
				})
			};
		},
		_onDomReady: function(username, $) {
			var $node = $('#UserProfileMasthead .masthead-info\
			.contributions-details > a > em');
			if ($node.length) {
				var num = $node.text().replace(/[^\d]/g, '');
				if (num) {return this._editsPromise.resolve(+num);}
				// uh
				this._logger.err(
				    'Oasis masthead gave us junk instead of a number:',
				    $node.text(), '(Falling back to AJAX)');} 
				else {
				this._logger.err(
				    'Cannot find Oasis masthead to scrape counter! Falling back\
				    to AJAX');} return this._doCustomAjax(username, null);},
		        _doCustomAjax: function(username, namespace) {
		            
			/** Construct the wikitext fragment to invoke the Special:Editcount
			    pseudo-template **/
			    
			var text = '{{Special:Editcount/' + username;
			if (typeof(namespace) === 'number') {text += '/' + namespace;}
			text += '}}';
 
			/** Issue our AJAX to run the parser. ~
			     I'm not using .then() as we need to wait for the generate() 
			     callback before we can actually issue a response. **/
			
			var editsPromise = this._editsPromise, logger = this._logger;
			this._selfajax = $.ajax({
				url: mw.util.wikiScript('api'),
				data: {
					action: 'parse',
					format: 'json',
					/** Force English so we don't have to deal with non-English
					    digit chars **/
					uselang: 'en', 
					text: text,
					prop: 'text',
					// Disable the preprocessor report (HTML comment at end)
					disablepp: 1 
				}, dataType: 'json'
			})
			.done(function(json) {
				if (json && json.parse && json.parse.text) {
					var num = $(document.createElement('div'))
					.html(json.parse.text['*']).text().replace(/[^\d]/g, '');
					if (num) {editsPromise.resolve(+num);return ;}}
				logger.err('Got a bad response from Special:Editcount:', json);
				editsPromise.reject();
			})
			.fail(function(xhr, status, exception) {
				logger.err('AJAX fail:', xhr.status, status, exception);
				editsPromise.reject();
			})
			;},
		generate: function(json) {
			json = json.query.usercontribs[0];
			if (!json) return this.generateFailed();
			// Calculate days since their oldest (i.e. first) edit was made
			this._daysPromise.resolve((Date.now() - 
			Date.parseISO8601(json.timestamp)) / 864e5);
		},
		generateFailed: function() {
			if (this._selfajax) this._selfajax.abort();
			this._daysPromise.reject();
		}
	};
} NewEditorTag();

mw.hook('dev.profile-tags').add(function () {
    
    /**Inactive tag. We set it to display after two months of inactivity
       and change its text to "Reported Missing" as reference to many
       Creepypastas. The hook prevents ProfileTags from removing it.**/
       
       importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MastheadRightsBadge.js',
    ]
});
    window.MastheadRightsBadgeSettings = {
    iconSize: '60px',
};   
    importScriptPage("MediaWiki:InactiveUsers/code.js", "dev");
    
    /**The "New Editor" tag. Again, we instruct ProfileTags to spare it
       and we set some options**/
    
    NewEditorTag();
});