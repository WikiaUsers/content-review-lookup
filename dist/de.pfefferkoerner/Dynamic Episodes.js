var fields = {
	title: 'Episodentitel',
	sequential_number: 'Episodennummer',
	season: 'Staffel',
	//premiere: 'Erstausstrahlung',
	image: 'Bild',
	writer: 'Drehbuch',
	director: 'Regie',
	topic: 'Thema',
	gang: 'Bandennummer',
	previous: 'vorherige',
	next: 'nächste',
};
//Optionale Parameter: "Arbeitstitel", "Bildunterschrift", "Drehbuchtitel", "Gastrolle", "Bildgröße", "Orte", "Episodenhauptcharakter"

function parseWikitext(text) {
	return new Promise(function(resolve, reject) {
		return (new mw.Api()).get({
			action: 'parse',
			prop: 'text',
			text: text,
			formatversion: 2,
			contentmodel: 'wikitext',
			disablelimitreport: 1
		}).then(function(res) {
			return res.parse.text;
		}).then(resolve)
		.catch(reject);
	});
}

function loadEpisodeArticle(input, fieldset) {
	var parser = new DOMParser();
	Promise.all(Object.entries(fields).map(function(field) {
		return parseWikitext('{{#dpl:title=' + input.value + '|include={Infobox Episode}:' + field[1] + '}}').then(function(res) {
			var htmlDoc = parser.parseFromString(res, 'text/html');
			var el = htmlDoc.querySelector('.mw-parser-output > p');
			var value = null
			if (el !== null) {
				value = el.textContent.trim()
			}
			return [ field[0], value ];
		});
	})).then(function(res) {
		fieldset.append(document.createTextNode(JSON.stringify(Object.fromEntries(res), null, '\ŧ')))
		console.log('done', )
	});
}

function renderDynamicEpisodeForm() {
		mw.loader.using(["oojs-ui-core", "oojs-ui-windows"], function() {
		var fieldset = new OO.ui.FieldsetLayout( { 
			//label: 'FieldsetLayout with an action field layout'
		} );
		var input = new OO.ui.TextInputWidget( {
				placeholder: 'Article name'
		} );
		var btn = new OO.ui.ButtonWidget( {
						label: 'Add',
						flags: [
								'primary',
								'progressive'
						]
				} );
		btn.on('click', loadEpisodeArticle.bind(window, input, fieldset.$element));
	
		// Add an action field layout: 
		fieldset.addItems( [ 
			new OO.ui.ActionFieldLayout(
				input,
				btn,
				{
						label: 'Enter name of episode page',
						align: 'top'
				}
			)
		] );
		// Example: Creating and opening a message dialog window.
		var messageDialog = new OO.ui.MessageDialog();
		
		// Create and append a window manager.
		var windowManager = new OO.ui.WindowManager();
		$( 'body' ).append( windowManager.$element );
		
		// Add the dialog to the window manager.
		windowManager.addWindows( [ messageDialog ] );
		
		// Configure the message dialog when it is opened with the window manager's openWindow() method.
		windowManager.openWindow( messageDialog, {
		  title: 'Basic message dialog',
		  message: fieldset.$element
		} );
	});
}

function renderAddButton() {
	mw.hook('dev.wds').add(function(wds) {
		var container = document.querySelector('.page-header__actions');
		var btn = Object.assign(document.createElement('button'), {
			textContent: 'Add dynamic episodes',
			//title: 'Episode "' + container.dataset.name + '" als ' + (episodes.has(container.dataset.name) ? 'noch nicht angesehen' : 'angesehen') + ' markieren',
			className: 'wds-button wds-is-text page-header__action-button has-label'
		});
		btn.prepend(wds.icon('add-small'));
		btn.addEventListener('click', renderDynamicEpisodeForm);
		container.prepend(btn);
	});
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
}

//mw.hook("wikipage.content").add(function($content) {
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('page-MediaWiki_Custom-Episodes_json')) { // We are on MediaWiki:Custom-Episodes.json
    	renderAddButton();
    }
});