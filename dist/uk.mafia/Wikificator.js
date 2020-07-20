///////////////////////////////////////////////
///          Вікіфікатор в візуальний редактор.
///////////////////////////////////////////////

/*WikiEditor/Викификатор*/
if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
        mw.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript' );
}
 
var customizeToolbar = function() {
 
$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        'section': 'advanced',
        'group': 'format',
        'tools': {
                'wikify': {
                        label: 'Викификатор',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/0/06/Wikify-toolbutton.png',
                             action: {
                                  type: 'callback',
                                       execute: function(context){
                                              Wikify();
                                       } 
                             }
                }
        }
} );
};
 
if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
        mw.loader.using( 'user.options', function () {
                if ( mw.user.options.get('usebetatoolbar') ) {
                        mw.loader.using( 'ext.wikiEditor.toolbar', function () {
                                $(document).ready( customizeToolbar );
                        } );
                }
        } );
}

///////////////////////////////////////////////
///         Вікіфікатор в режим Вихідного коду.
///////////////////////////////////////////////

function addWikifButton() {
	var toolbar = document.getElementById('toolbar')
	if (!toolbar) return
	var i = document.createElement('img')
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png'
	i.alt = i.title = 'викификатор'
	i.onclick = Wikify
	i.style.cursor = 'pointer'
	toolbar.appendChild(i)
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript')
	addOnloadHook(addWikifButton)
}