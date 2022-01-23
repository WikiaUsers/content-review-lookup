/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
function runAsEarlyAsPossible( callback, $testElement, func ) {
	func = func || $;
	$testElement = $testElement || $( '.page-footer' );

	if ( $testElement.length ) {
		callback();
	} else {
		func( callback );
	}
}

runAsEarlyAsPossible( function () {
	/**
	 * {{executeJS}}
	 */
	$( '.executeJS' ).each( function () {
		var names = $( this ).data( 'scriptnames' );
		if (names) {
			names.split( ' ' ).forEach( function ( name ) {
				name = name.replace( /[^\w_-]/g, '' );
				if ( name ) {
					mw.loader.load( '//stakler.fandom.com/ru/wiki/MediaWiki:Script/' + name + '.js?action=raw&ctype=text/javascript');
				}
			} );
		}
	} );


}, $( '.page-footer' ), mw.hook( 'wikipage.content' ).add );

/*==================================================================================================
Inactive User Statuses 
==================================================================================================*/
//Inactive users
window.InactiveUsers = { 
    months: 1,
    text: 'НЕАКТИВЕН'
};


/*==================================================================================================
Счётчик для числа цитат. By Apologet 
==================================================================================================*/
function citeNum() {
    if (mw.config.get("wgPageName") == "Шаблон:Рандомная_цитата") {
        var opts = document.getElementsByClassName("cite-table"),
            num = opts.length - 1,
            tag = document.getElementById("cite-num");
        tag.innerText = "" + num;
    }
    else if (mw.config.get("wgPageName") == "Шаблон:А_вы_знали") {
        var opts2 = document.getElementsByClassName("cite-table"),
            num2 = opts2.length - 1,
            tag2 = document.getElementById("cite-num");
        tag2.innerText = "" + num2;
    }
    else if (mw.config.get("wgPageName") == "Шаблон:Анекдоты") {
        var opts3 = document.getElementsByClassName("cite-table"),
            num3 = opts3.length - 1,
            tag3 = document.getElementById("cite-num");
        tag3.innerText = "" + num3;
    }
}

citeNum();

/*=================================================================
Wikificator загружается только на странице редактирования
===================================================================*/
switch(mw.config.values.wgAction) {
    case 'edit':
    case 'submit':
    	importArticles({
    		type: "script",
    		articles: [
        		'u:dev:MediaWiki:Wikificator.js'
    		]
		});
    break;
}