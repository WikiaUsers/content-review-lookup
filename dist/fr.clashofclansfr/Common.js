/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
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
 
    articles = ['MediaWiki:Common.js/SubNav.js', 'w:c:dev:UserTags/code.js'];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window.localStorage));

/* Gem Calculators - Dahimi */
function doCalcDarkElixirToGems (resources) {
   var ranges = [1,10,100,1000,10000,100000];
   var gems = [1,5,25,125,600,3000];
   var storagemax = 200000;
   
   if (isNaN(resources)) return("???");
   
   if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
    
   for (var i = 1; i < ranges.length-1; i++)
      if (resources <= ranges[i]) 
         return(Math.round((resources - ranges[i-1])/((ranges[i] - ranges[i-1])/(gems[i] - gems[i-1])) + gems[i-1]));
   
   if (resources <= storagemax)
      return(Math.round((resources - ranges[ranges.length-2])/((ranges[ranges.length-1] - ranges[ranges.length-2])/(gems[gems.length-1] - gems[gems.length-2])) + gems[gems.length-2]));           
   else 
      return(doCalcDarkElixirToGems(resources % storagemax) + Math.floor(resources/storagemax)*doCalcDarkElixirToGems(storagemax));
      
   return("???");
}

function doCalcResourceToGems (resources) {
   var ranges = [100,1000,10000,100000,1000000,10000000];
   var gems = [1,5,25,125,600,3000];
   var storagemax = 8001000;
   
   if (isNaN(resources)) return("???");
   
   if (resources < 0) return("???");
   else if (resources == 0) return(0);
   else if (resources <= ranges[0]) return(gems[0]);
    
   for (var i = 1; i < ranges.length-1; i++)
      if (resources <= ranges[i]) 
         return(Math.round((resources - ranges[i-1])/((ranges[i] - ranges[i-1])/(gems[i] - gems[i-1])) + gems[i-1]));
   
   if (resources <= storagemax)
      return(Math.round((resources - ranges[ranges.length-2])/((ranges[ranges.length-1] - ranges[ranges.length-2])/(gems[gems.length-1] - gems[gems.length-2])) + gems[gems.length-2]));           
   else 
      return(doCalcResourceToGems(resources % storagemax) + Math.floor(resources/storagemax)*doCalcResourceToGems(storagemax));
      
   return("???");
}

function doCalcGemToCash (gemsinput) {
   var cost = [4.99, 9.99, 19.99, 49.99, 99.99];
   var gems = [500, 1200, 2500, 6500, 14000];
   
   if (isNaN(gemsinput)) return("???");
   
   if (gemsinput <= 0) return(0);
   
   for (var i = gems.length-1; i > 0; i--) 
      if (gemsinput > gems[i-1]*2)
         return(cost[i] + doCalcGemToCash(gemsinput - gems[i]));
            
   return(cost[0] + doCalcGemToCash(gemsinput - gems[0]));
}

function calcGemToCash (index) {
   var gems = parseInt(document.getElementById("gem_input_" + index).value);
   
   document.getElementById("cash_result_" + index).innerHTML = " = $" + Math.round(doCalcGemToCash(gems)*100)/100;
   
   return false;
}
 
function calcResourceToGems (index) {
   var resources = parseInt(document.getElementById("resource_input_" + index).value);
   
   result = doCalcResourceToGems(resources);
   
   if (result != 1)
      document.getElementById("gem_result_" + index).innerHTML = " = " + result + " gems";
   else
      document.getElementById("gem_result_" + index).innerHTML = " = " + result + " gem";    
   
   return false;
}

function calcDarkElixirToGems (index) {
   var resources = parseInt(document.getElementById("de_input_" + index).value);
   
   result = doCalcDarkElixirToGems(resources);
   
   if (result != 1)
      document.getElementById("de_gem_result_" + index).innerHTML = " = " + result + " gems";
   else
      document.getElementById("de_gem_result_" + index).innerHTML = " = " + result + " gem";    
   
   return false;
}

function calcGemsToTime (index) {
   var gems = parseInt(document.getElementById("gems2_input_" + index).value);
   
   var timerange = [60,3600,86400,604800];
   var gemsrange = [1,20,260,1000];
   var seconds = 0;
   var days = 0;
   var hours = 0;
   var minutes = 0;
   
   if (isNaN(gems)) gems = 0;

   if (gems < 0) {
       document.getElementById("time_result_" + index).innerHTML = " = ???";
       return false;
   }
   else if (gems == 0) {
       seconds = 0;
   }
   else if (gems <= gemsrange[0]) {
       seconds = 246;
   }
   else {
       gems = gems + 1;
   
       if (gems <= gemsrange[1]) {
           seconds = Math.ceil((gems - gemsrange[0])*((timerange[1] - timerange[0])/(gemsrange[1] - gemsrange[0])) + timerange[0])-1;
       }
       else if (gems <= gemsrange[2]) {
           seconds = Math.ceil((gems - gemsrange[1])*((timerange[2] - timerange[1])/(gemsrange[2] - gemsrange[1])) + timerange[1])-1;
       }
       else {
           seconds = Math.ceil((gems - gemsrange[2])*((timerange[3] - timerange[2])/(gemsrange[3] - gemsrange[2])) + timerange[2])-1;
       }
   }

   days = Math.floor(seconds/(24*60*60));
   seconds = seconds % (24*60*60);
   hours = Math.floor(seconds/(60*60));
   seconds = seconds % (60*60);
   minutes = Math.floor(seconds/60);
   seconds = seconds % 60;

   document.getElementById("time_result_" + index).innerHTML = " = " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
   
   return false;
}

function calcTimeToGems (index) {
   var days = parseInt(document.getElementById("days_input_" + index).value);
   var hours = parseInt(document.getElementById("hours_input_" + index).value);
   var minutes = parseInt(document.getElementById("minutes_input_" + index).value);
   var seconds = parseInt(document.getElementById("seconds_input_" + index).value);
   
   var ranges = [60,3600,86400,604800];
   var gems = [1,20,260,1000];
   var result = 0;
   
   if (isNaN(days)) days = 0;
   if (isNaN(hours)) hours = 0;
   if (isNaN(minutes)) minutes = 0;
   if (isNaN(seconds)) seconds = 0;
   
   seconds = seconds + minutes*60 + hours*3600 + days*86400;
   
   if (seconds < 0) {
       result = "???"
   }
   else if (seconds == 0) {
       result = 0;
   }
   else if (seconds <= ranges[0]) {
      result = 1;
   }
   else if (seconds <= ranges[1]) {
      result = Math.floor((seconds - ranges[0])/((ranges[1] - ranges[0])/(gems[1] - gems[0])) + gems[0]);
   }
   else if (seconds <= ranges[2]) {
      result = Math.floor((seconds - ranges[1])/((ranges[2] - ranges[1])/(gems[2] - gems[1])) + gems[1]);
   }
   else {
      result = Math.floor((seconds - ranges[2])/((ranges[3] - ranges[2])/(gems[3] - gems[2])) + gems[2]);
   }
   
   if (result != 1) {
       document.getElementById("gem_time_result_" + index).innerHTML = " = " + result + " gems";
   }
   else {
       document.getElementById("gem_time_result_" + index).innerHTML = " = " + result + " gem";    
   }
   
   return false;
}

function createGemToCashCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
   
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-g2c")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
         
         form.setAttribute("onSubmit", "return calcGemToCash(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "gem_input_" + offset);
         
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Cost");
         input2.setAttribute("onclick", "javascript:calcGemToCash(" + offset + ");");
         
         span.setAttribute("id", "cash_result_" + offset);
         span.innerHTML = " = $0";
         
         form.appendChild(document.createTextNode("Gems: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
         
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
function createResourceToGemCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
   
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-r2g")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
         
         form.setAttribute("onSubmit", "return calcResourceToGems(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "resource_input_" + offset);
         
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Gem Cost");
         input2.setAttribute("onclick", "javascript:calcResourceToGems(" + offset + ");");
         
         span.setAttribute("id", "gem_result_" + offset);
         span.innerHTML = " = 0 gems";
         
         form.appendChild(document.createTextNode("Gold/Elixir: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
         
         paras[index].appendChild(form);
         offset++;
      }
   }     
}

function createDarkElixirToGemCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
   
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-de2g")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
         
         form.setAttribute("onSubmit", "return calcDarkElixirToGems(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "de_input_" + offset);
         
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Gem Cost");
         input2.setAttribute("onclick", "javascript:calcDarkElixirToGems(" + offset + ");");
         
         span.setAttribute("id", "de_gem_result_" + offset);
         span.innerHTML = " = 0 gems";
         
         form.appendChild(document.createTextNode("Dark Elixir: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
         
         paras[index].appendChild(form);
         offset++;
      }
   }     
}

function createGemsToTimeCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
   
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-g2t")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
         
         form.setAttribute("onSubmit", "return calcGemsToTime(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "gems2_input_" + offset);
         
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Time");
         input2.setAttribute("onclick", "javascript:calcGemsToTime(" + offset + ");");
         
         span.setAttribute("id", "time_result_" + offset);
         span.innerHTML = " = 0d 0h 0m 0s";
         
         form.appendChild(document.createTextNode("Gems: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
         
         paras[index].appendChild(form);
         offset++;
      }
   }     
}

function createTimeToGemCalculator() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
   
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-t2g")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var input3 = document.createElement("input");
         var input4 = document.createElement("input");
         var input5 = document.createElement("input");
         var span = document.createElement("span");
         
         form.setAttribute("onSubmit", "return calcTimeToGems(" + offset + ");");
         input1.setAttribute("size", "5");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "days_input_" + offset);
         
         input2.setAttribute("size", "5");
         input2.setAttribute("value", "0");
         input2.setAttribute("id", "hours_input_" + offset);
         
         input3.setAttribute("size", "5");
         input3.setAttribute("value", "0");
         input3.setAttribute("id", "minutes_input_" + offset);
         
         input4.setAttribute("size", "5");
         input4.setAttribute("value", "0");
         input4.setAttribute("id", "seconds_input_" + offset);
         
         input5.setAttribute("type", "button");
         input5.setAttribute("value", "Calculate Gem Cost");
         input5.setAttribute("onclick", "javascript:calcTimeToGems(" + offset + ");");
         
         span.setAttribute("id", "gem_time_result_" + offset);
         span.innerHTML = " = 0 gems";
         
         form.appendChild(document.createTextNode("D: "));
         form.appendChild(input1);
         form.appendChild(document.createTextNode(" H: "));
         form.appendChild(input2);
         form.appendChild(document.createTextNode(" M: "));
         form.appendChild(input3);
         form.appendChild(document.createTextNode(" S: "));
         form.appendChild(input4);
         form.appendChild(input5);
         form.appendChild(span);
         
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
function hasClassTest(element, className) {
   return element.className.indexOf(className) != -1;
}

addOnloadHook(createGemToCashCalculator);
addOnloadHook(createTimeToGemCalculator);
addOnloadHook(createResourceToGemCalculator);
addOnloadHook(createGemsToTimeCalculator);
addOnloadHook(createDarkElixirToGemCalculator);

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