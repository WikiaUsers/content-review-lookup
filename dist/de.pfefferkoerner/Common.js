/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */
//ext
/*importArticles({
    type: 'script',
    articles: [
    	'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        //'MediaWiki:EditEpisode.js'
        //'w:c:de.harry-grangers-test:MediaWiki:Functions.js',
        //'w:c:de.harry-grangers-test:MediaWiki:EditPage.js'
    ]
});*/

mw.user.getGroups().then(function (groups) {
	if (groups.includes('sysop') || groups.includes('bureaucrat')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:PatrolPanel.js',
				'u:dev:MediaWiki:JWB/load.js'
			]
		});
	}
});

$('.hidable-control').click(function() {
    $('.hidable-element').toggle();
});

function locationHashChanged() {
    console.log('hash changed',location.hash);
    var re1 = /#tab-([0-9])/;
    var subst1 = '$1';
    var re2 = /#dia-([0-9])/;
    var subst2 = '$1';
    if (re1.test(location.hash)) {
      tabchange(location.hash.replace(re1,subst1));
    }
    else if(re2.test(location.hash)) {
        diashowImgChange(location.hash.replace(re2,subst2));
    }
    else {
        console.log('no match found');
    }
}

function setHash(text) {
    location.hash = '#' + text;
}

window.onhashchange = locationHashChanged;

/*$('.button.api-edit').click(function() {
   window.location.href = '?spaction=edit&type=modal'; 
});*/

/*function pageExists(page) {
    function checkIfExists(page,fn) {
        $.get('http://pfefferkoerner.wikia.com/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=' + page + '&format=json').done(function exist(response) {
            fn(Number(Object.keys(response.query.pages)[0]));
            console.log('Page exists?',Number(Object.keys(response.query.pages)[0]));
        });
    }
    return checkIfExists(page, function(exist){
        var existing;
        if(exist !== -1) {
            console.log('existiert');
            existing = 'test';
        }
        else {
            console.log('existiert nicht');
            existing ='test2';
        }
        return existing;
    });
    
}*/

/* function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  console.log('Query Variable ' + variable + ' not found');
}

spAction = getQueryVariable('spaction') ? getQueryVariable('spaction') : 'view'; */

//int
/*importArticles({
    type: 'script',
    articles: [
        //'MediaWiki:Tables.js',
        //'MediaWiki:API.js',
        //'MediaWiki:Episodenlisten.js',
        //'MediaWiki:EditModal.js'
    ]
});*/

importArticles({
    type: 'style',
    articles: [
        'MediaWiki:MainPage.css'
    ]
});

$('.infobox-imagemap img').attr({'width':'350px','height':'auto'});
 
 // Import [[MediaWiki:Onlyifuploading.js]] 
 
/*if ( wgCanonicalSpecialPageName == "Upload" ) {
    document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}*/

/* Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $("span.insertusername").html(mw.config.get('wgUserName'));
}
$(document).ready(UserNameReplace);
 
/* End of the {{BENUTZERNAME}} replacement */

/* Replaces {{CURRENT_SEASON}} with the number of the current season.
   Requires copying Template:CURRENT_SEASON. */
   
   /*var Season = 12;
 
function SeasonReplace() {
    if (typeof (disableSeasonReplace) != 'undefined' && disableSeasonReplace || Season === null) return;
    $("span.insertseasonnumber").html(Season);
}
addOnloadHook(SeasonReplace);*/
 
/* End of the {{CURRENT_SEASON}} replacement */