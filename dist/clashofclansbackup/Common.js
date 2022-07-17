/* Any JavaScript here will be loaded for all users on every page load. */
/* <source lang="javascript"> */
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
        return;
    }
 
    window.UserTagsJS = {
	modules: {},
	tags: {}
    };
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
    UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
        rollback: ['sysop', 'bureaucrat']
    };
 
    articles =
       ['MediaWiki:Common.js/SubNav.js',
        'MediaWiki:Common.js/Sliders.js',
        'MediaWiki:Common.js/Lugia.js',
        'MediaWiki:Common.js/GemCalculators.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:Common.js/insertusername.js',
        'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));
 
function hasClassTest(element, className) {
   return element.className.indexOf(className) != -1;
}
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/*GorillaMan*/
 
////////////////////////////////////QUIZ/////////////////////////////////////////
/* Check for Answer = A */
 
function doAnsA (AnsA) {
   if (AnsA == "A" || AnsA == "a" || AnsA == 1) {
      return "Correct" ;
   } 
   else {
      return "Wrong" ;
   }
}
 
function calcAnsA (index) {
   var AnsA 
= parseInt(document.getElementById("ansA_input_" + index).value);
 
   var result 
= doAnsA(AnsA);
 
   if (result == "Correct")
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";
   else
      document.getElementById("ansA_result_" + index).innerHTML 
= " = " + result + " Answer (Used: '" + AnsA + "', Got: '" + result + "')";    
 
   return false;
}
 
function createAnsA() {
   var paras 
= document.getElementsByTagName("p");
   var offset 
= 0;
 
   for (var index 
= 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "check-ansA")) {
         var form 
= document.createElement("form");
         var input1 
= document.createElement("input");
         var input2 
= document.createElement("input");
         var span 
= document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcansA(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "ansA_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Check Answer");
         input2.setAttribute("onclick", "javascript:calcAnsA(" + offset + ");");
 
         span.setAttribute("id", "ansA_result_" + offset);
         span.innerHTML 
= " =  ???";
 
         form.appendChild(document.createTextNode("Answer: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createAnsA);
 
///////////////////////////////SpoilerAlert/////////////////////////////////////////
 
SpoilerAlert = {
    question: 'Chief! This page contains sneak peeks. Are you sure you want to enter?',
    yes: 'Yes, please',
    no: 'No, let it be a surprise',
    isSpoiler: function () {
        return (-1 !== wgCategories.indexOf('Spoiler') && Boolean($('.spoiler').length));
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

function sillyFounder(){
var d=document.getElementsByClassName('tag')[0];
var f=document.getElementsByClassName('masthead-info')[0].getElementsByTagName('hgroup')[0];
var e=f.getElementsByTagName('h1')[0].innerHTML;
var sp=document.createElement('span');
sp.setAttribute('class','tag');
if(d.innerHTML=='Founder'){
d.innerHTML='Founder';
sp.innerHTML='Awesome';
f.appendChild(sp);
}else if(e=='Pokemaster360'){
d.innerHTML='Admin';
f.appendChild(sp);
}else if(e=='XXSOCKSXx'){
d.innerHTML='Bureacrat';
}
}
addOnloadHook(sillyFounder);