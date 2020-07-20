//Back to Top Button
importScriptPage('BackToTopButton/code.js', 'dev');

//Edit Dropdown
importScriptPage('AutoEditDropdown/code.js', 'dev');

//Purge Button
var PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

//Countdowns
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

//Show/hide
importScriptPage( 'ShowHide/code.js', 'dev' )

//Usertags
window.UserTagsJS = {
	modules: {},
	tags: {
           cat: { u:'Cat Lord', order:-1/0, title:':3'},
           bureaucrat: { u:'Bureaucrat'}
        },
	oasisPlaceBefore: ''
};
UserTagsJS.modules.custom = {
	'Overclocker2': ['cat', 'bureaucrat']
}

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
/* skin change buttons */
function CreateSkinChangeButtons() {
	//Oasis buttons
	$('div.buttons a:first-child').before('<a style="margin:0 3px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=monobook" title="Change to Monobook" accesskey="b" class="wikia-button secondary" id="skinChangeButton" data-id="monobookbutton">Monobook</a><a style="margin:0 42px 3px 0" href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector" accesskey="v" class="wikia-button secondary" id="skinChangeButton" data-id="vectorbutton">Vector</a>');
	//Monobook buttons
	$('#p-cactions .pBody ul li:nth-last-child(1)').after('<li id="ca-nstab-main" class="skinChangeTab" style="margin:0 3px 0 36px"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=wikia" title="Change to Oasis [o]" id="skinChangeButton" accesskey="o">Oasis</a></li><li id="ca-nstab-main" class="skinChangeTab"><a href="/index.php?title='+ encodeURIComponent(wgPageName) +'&useskin=vector" title="Change to Vector [v]" id="skinChangeButton" accesskey="o">Vector</a></li>');
}
addOnloadHook(CreateSkinChangeButtons);

/**
  * Function to easily embed SWF files
  * Place the following where you want to embed some file:
  * <div class="flash-wrapper">http://path/to/your/file</div>
  * Flash files from untrusted sources can be dangerous. Use caution.
*/

(function(){
	var flashobjects, i, url, embed;	
	
	// Enumerate over the files that need to be embedded
	flashobjects = document.getElementsByClassName( "flash-wrapper" ) || [];
	
	for ( i = 0; i < flashobjects.length; i++ ) {	
		url = flashobjects[i].textContent;
		
		if ( url.indexOf( "http" ) !== 0 ) {
			// If it's not a valid http(s) URL, continue, and log the error
			console.log( "Lightning: Skipped the" + ( i + 1 ) +
				"th Flash video - " + url + " is not a well-formed HTTP(S) URL" );
			continue;
			
		} else {
			// Otherwise, embed
			flashobjects[i].textContent = "";
			embed = document.createElement( "embed" );
			embed.src = url;
			embed.type = "application/x-shockwave-flash";
			flashobjects[i].appendChild( embed );
		}
	}
}());