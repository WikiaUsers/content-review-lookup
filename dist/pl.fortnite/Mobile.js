/* Any JavaScript here will be loaded for users using the mobile site */

/* Any JavaScript here will be loaded for users using the mobile site */
/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2018-Jun-7
// License: CC-BY 3.0

// This script, paired with .mobilecollapsible styles in MediaWiki:Mobile.css, supports making .fpbox collapsible in the mobile view using both the standard
// 2 or 3-column responsive front pages.

// Making an .fpbox collapsible in mobile view involves the following:
//   1. Adding "mobilecollapsible" as another class alongside "fpbox".
//   2. Making sure there is a heading identified by the "fpbox-heading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "fpbox-body" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fpbox.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.fpbox-heading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.fpbox-body' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                if ( !( $( this ).hasClass( 'expanded') ) ) {
                    $( this ).addClass( 'collapsed' );
                }
                heading.first().html( $( '<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( '.fpbox.mobilecollapsible' + index ).each( function() {
            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( this ).addClass( 'expanded' );
            } else {
                $( this ).removeClass( 'expanded' );
                $( this ).addClass( 'collapsed' );
            }
        } );
    }
}

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/


    /**
        Toggles the display of elements on a page
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */

// indexed array of toggler ids to array of associated toggle operations
// each operation is a two element array, the first being the type, the second a class name or array of elements
// operation types are strings like "_reset" or "" for the default toggle operation
window.togglers = new Array();
window.allClasses = new Object(); // associative map of class names to page elements

window.toggler=function(id)
{
    var toBeToggled = togglers[id];
    if (!toBeToggled)
        return;

    // if some element is in list more than once, it will be toggled multiple times
    for (var i = 0; i < toBeToggled.length; i++)
    {
        // get array of elements to operate on
        var toggles = toBeToggled[i][1];
        if (typeof(toggles) == "string")
        {
            if (toggles.charAt(0) == '-')
            {
                // treat as an element ID, not as class
                toggles = document.getElementById(toggles.substring(1));
                if (toggles)
                    toggles = new Array(toggles);
            }
            else
                toggles = allClasses[toggles];
        }
        if (!toggles || !toggles.length)
            continue;

        var op = toBeToggled[i][0]; // what the operation will be

        switch (op)
        {
            case "_reset":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = toggles[j]._toggle_original_display;
                break;
            case "_show":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = '';
                break;
            case "_hide":
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = 'none';
                break;
            case "_slidehide":
                for (var j = 0; j < toggles.length; j++){
                    if (toggles[j].style.display != 'none'){
                        $(toggles[j]).animate({width: 'toggle'});
                    }
                    }
                break;
            case "_slideshow":
                for (var j = 0; j < toggles.length; j++){
                    if (toggles[j].style.display == 'none'){
                        $(toggles[j]).animate({width: 'toggle'});
                    }
                    }
                break;
            case "_expand":
                for (var j = 0; j < toggles.length; j++){
                    var bracketCr2 = $(toggles[j]).find('*.oldr2');
                    var bracketCr3 = $(toggles[j]).find('*.oldr3');
                    var bracketCr4 = $(toggles[j]).find('*.oldr4');
                    var bracketCr5 = $(toggles[j]).find('*.oldr5');
                    var bracketCr6 = $(toggles[j]).find('*.oldr6');
                    function distinguishCell(cell, oRound){
                        var strNClass = "test";
                        if($(cell).is('*[class*="bracket-cell"]')){
                           strNClass = "bracket-cell-r" + oRound.toString();
                        }
                        else if($(cell).is('*[class*="bracket-line-left-top"]')){
                           strNClass = "bracket-line-left-top-r" + oRound.toString();
                        }
                        else if($(cell).is('*[class*="bracket-line-left-mid"]')){
                           strNClass = "bracket-line-left-mid-r" + oRound.toString();
                        }
                        else if($(cell).is('*[class*="bracket-line-left-bot"]')){
                           strNClass = "bracket-line-left-bot-r" + oRound.toString();
                        }
                        else if($(cell).is('*[class*="bracket-line-right-top"]')){
                           strNClass = "bracket-line-right-top-r" + oRound.toString();
                        }
                        else if($(cell).is('*[class*="bracket-line-right-bot"]')){
                           strNClass = "bracket-line-right-bot-r" + oRound.toString();
                        }
                        cell.className = strNClass;
                    }
                    for (var k = 0; k < bracketCr2.length; k++){
                        distinguishCell(bracketCr2[k],2);
                    }
                    for (var k = 0; k < bracketCr3.length; k++){
                        distinguishCell(bracketCr3[k],3);
                    }
                    for (var k = 0; k < bracketCr4.length; k++){
                        distinguishCell(bracketCr4[k],4);
                    }
                    for (var k = 0; k < bracketCr5.length; k++){
                        distinguishCell(bracketCr5[k],5);
                    }
                    for (var k = 0; k < bracketCr6.length; k++){
                        distinguishCell(bracketCr6[k],6);
                    }
                    }
                break;
             case "_shrink":
                setTimeout(function(){togglerShrink(toggler)},200);
                function togglerShrink(toggler) {
                var smallest = 7;
                var smallestL = 7;
                for (var j = 0; j < toggles.length; j++){
                    var bracketCr2 = $(toggles[j]).find('*.bracket-cell-r2');
                    var bracketCr3 = $(toggles[j]).find('*.bracket-cell-r3');
                    var bracketCr4 = $(toggles[j]).find('*.bracket-cell-r4');
                    var bracketCr5 = $(toggles[j]).find('*.bracket-cell-r5');
                    var bracketCr6 = $(toggles[j]).find('*.bracket-cell-r6');
                    if(bracketCr2.length > 0 && smallest > 2){
                       smallest = 2;
                    }
                    else if(bracketCr3.length > 0 && smallest > 3){
                       smallest = 3;
                    }
                    else if(bracketCr4.length > 0 && smallest > 4){
                       smallest = 4;
                    }
                    else if(bracketCr5.length > 0 && smallest > 5){
                       smallest = 5;
                    }
                    else if(bracketCr6.length > 0 && smallest > 6){
                       smallest = 6;
                    }

                    var bllt2 = $(toggles[j]).find('*.bracket-line-left-top-r2');
                    var bllt3 = $(toggles[j]).find('*.bracket-line-left-top-r3');
                    var bllt4 = $(toggles[j]).find('*.bracket-line-left-top-r4');
                    var bllt5 = $(toggles[j]).find('*.bracket-line-left-top-r5');
                    var bllt6 = $(toggles[j]).find('*.bracket-line-left-top-r6');

                    if(bllt2.length > 0 && smallestL > 2){
                       smallestL = 2;
                    }
                    else if(bllt3.length > 0 && smallestL > 3){
                       smallestL = 3;
                    }
                    else if(bllt4.length > 0 && smallestL > 4){
                       smallestL = 4;
                    }
                    else if(bllt5.length > 0 && smallestL > 5){
                       smallestL = 5;
                    }
                    else if(bllt6.length > 0 && smallestL > 6){
                       smallestL = 6;
                    }
                }
                for (var j = 0; j < toggles.length; j++){
                    var bracketCr2 = $(toggles[j]).find('*.bracket-cell-r2');
                    var bracketCr3 = $(toggles[j]).find('*.bracket-cell-r3');
                    var bracketCr4 = $(toggles[j]).find('*.bracket-cell-r4');
                    var bracketCr5 = $(toggles[j]).find('*.bracket-cell-r5');
                    var bracketCr6 = $(toggles[j]).find('*.bracket-cell-r6');

                    var bllt2 = $(toggles[j]).find('*.bracket-line-left-top-r2');
                    var bllm2 = $(toggles[j]).find('*.bracket-line-left-mid-r2');
                    var bllb2 = $(toggles[j]).find('*.bracket-line-left-bot-r2');
                    var blrt2 = $(toggles[j]).find('*.bracket-line-right-top-r2');
                    var blrb2 = $(toggles[j]).find('*.bracket-line-right-bot-r2');

                    var bllt3 = $(toggles[j]).find('*.bracket-line-left-top-r3');
                    var bllm3 = $(toggles[j]).find('*.bracket-line-left-mid-r3');
                    var bllb3 = $(toggles[j]).find('*.bracket-line-left-bot-r3');
                    var blrt3 = $(toggles[j]).find('*.bracket-line-right-top-r3');
                    var blrb3 = $(toggles[j]).find('*.bracket-line-right-bot-r3');

                    var bllt4 = $(toggles[j]).find('*.bracket-line-left-top-r4');
                    var bllm4 = $(toggles[j]).find('*.bracket-line-left-mid-r4');
                    var bllb4 = $(toggles[j]).find('*.bracket-line-left-bot-r4');
                    var blrt4 = $(toggles[j]).find('*.bracket-line-right-top-r4');
                    var blrb4 = $(toggles[j]).find('*.bracket-line-right-bot-r4');

                    var bllt5 = $(toggles[j]).find('*.bracket-line-left-top-r5');
                    var bllm5 = $(toggles[j]).find('*.bracket-line-left-mid-r5');
                    var bllb5 = $(toggles[j]).find('*.bracket-line-left-bot-r5');
                    var blrt5 = $(toggles[j]).find('*.bracket-line-right-top-r5');
                    var blrb5 = $(toggles[j]).find('*.bracket-line-right-bot-r5');

					for (var k = 0; k < bracketCr2.length; k++){
						var n = 3-smallest;
						var nClass = " bracket-cell-r" + n.toString();
						bracketCr2[k].className += nClass;
						$(bracketCr2[k]).removeClass("bracket-cell-r2");
						if($(bracketCr2[k]).is('*[class*="old"]')){
						}
						else{
							bracketCr2[k].className += " oldr2";
						}
					}
						for (var k = 0; k < bracketCr3.length; k++){
							var n = 4-smallest;
							var nClass = " bracket-cell-r" + n.toString();
							bracketCr3[k].className += nClass;
							$(bracketCr3[k]).removeClass("bracket-cell-r3");
							if($(bracketCr3[k]).is('*[class*="old"]')){
							}
							else{
								bracketCr3[k].className += " oldr3";
							}
						}
						for (var k = 0; k < bracketCr4.length; k++){
							var n = 5-smallest;
							var nClass = " bracket-cell-r" + n.toString();
							bracketCr4[k].className += nClass;
							$(bracketCr4[k]).removeClass("bracket-cell-r4");
							if($(bracketCr4[k]).is('*[class*="old"]')){
							}
							else{
								bracketCr4[k].className += " oldr4";
							}
						}
						for (var k = 0; k < bracketCr5.length; k++){
							var n = 6-smallest;
							var nClass = " bracket-cell-r" + n.toString();
							bracketCr5[k].className += nClass;
							$(bracketCr5[k]).removeClass("bracket-cell-r5");
							if($(bracketCr5[k]).is('*[class*="old"]')){
							}
							else{
								bracketCr5[k].className += " oldr5";
							}
						}
						for (var k = 0; k < bracketCr6.length; k++){
							var n = 7-smallest;
							var nClass = " bracket-cell-r" + n.toString();
							bracketCr6[k].className += nClass;
							$(bracketCr6[k]).removeClass("bracket-cell-r6");
							if($(bracketCr6[k]).is('*[class*="old"]')){
							}
							else{
								bracketCr6[k].className += " oldr6";
							}
						}
					for (var k = 0; k < bllt2.length; k++){
						var n = 3 - smallestL;
						var m1 = 2 * k;
						var m2 = 2 * k + 1;
                                                var nSt = " bracket-line-left-top-r" + n.toString();
                                                var nSm = " bracket-line-left-mid-r" + n.toString();
                                                var nSb = " bracket-line-left-bot-r" + n.toString();
                                                var nStr = " bracket-line-right-top-r" + n.toString();
                                                var nSbr = " bracket-line-right-bot-r" + n.toString();
						bllt2[k].className += nSt;
						bllm2[m1].className += nSm;
						bllm2[m2].className += nSm;
						bllb2[k].className += nSb;
						blrt2[k].className += nStr;
						blrb2[k].className += nSbr;
						$(bllt2[k]).removeClass("bracket-line-left-top-r2");
						$(bllm2[m1]).removeClass("bracket-line-left-mid-r2");
						$(bllm2[m2]).removeClass("bracket-line-left-mid-r2");
						$(bllb2[k]).removeClass("bracket-line-left-bot-r2");
						$(blrt2[k]).removeClass("bracket-line-right-top-r2");
						$(blrb2[k]).removeClass("bracket-line-right-bot-r2");
						if($(bllt2[k]).is('*[class*="old"]')){
						}
						else{
						   bllt2[k].className += " oldr2";
						   bllb2[k].className += " oldr2";
						   bllm2[m1].className += " oldr2";
						   bllm2[m2].className += " oldr2";
						   blrt2[k].className += " oldr2";
						   blrb2[k].className += " oldr2";
						}
					}
					for (var k = 0; k < bllt3.length; k++){
						var n = 4 - smallestL;
						var m1 = 2 * k;
						var m2 = 2 * k + 1;
                                                var nSt = " bracket-line-left-top-r" + n.toString();
                                                var nSm = " bracket-line-left-mid-r" + n.toString();
                                                var nSb = " bracket-line-left-bot-r" + n.toString();
                                                var nStr = " bracket-line-right-top-r" + n.toString();
                                                var nSbr = " bracket-line-right-bot-r" + n.toString();
						bllt3[k].className += nSt;
						bllm3[m1].className += nSm;
						bllm3[m2].className += nSm;
						bllb3[k].className += nSb;
						blrt3[k].className += nStr;
						blrb3[k].className += nSbr;
						$(bllt3[k]).removeClass("bracket-line-left-top-r3");
						$(bllm3[m1]).removeClass("bracket-line-left-mid-r3");
						$(bllm3[m2]).removeClass("bracket-line-left-mid-r3");
						$(bllb3[k]).removeClass("bracket-line-left-bot-r3");
						$(blrt3[k]).removeClass("bracket-line-right-top-r3");
						$(blrb3[k]).removeClass("bracket-line-right-bot-r3");
						if($(bllt3[k]).is('*[class*="old"]')){
						}
						else{
						   bllt3[k].className += " oldr3";
						   bllb3[k].className += " oldr3";
						   bllm3[m1].className += " oldr3";
						   bllm3[m2].className += " oldr3";
						   blrt3[k].className += " oldr3";
						   blrb3[k].className += " oldr3";
						}
					}
					for (var k = 0; k < bllt4.length; k++){
						var n = 5 - smallestL;
						var m1 = 2 * k;
						var m2 = 2 * k + 1;
                                                var nSt = " bracket-line-left-top-r" + n.toString();
                                                var nSm = " bracket-line-left-mid-r" + n.toString();
                                                var nSb = " bracket-line-left-bot-r" + n.toString();
                                                var nStr = " bracket-line-right-top-r" + n.toString();
                                                var nSbr = " bracket-line-right-bot-r" + n.toString();
						bllt4[k].className += nSt;
						bllm4[m1].className += nSm;
						bllm4[m2].className += nSm;
						bllb4[k].className += nSb;
						blrt4[k].className += nStr;
						blrb4[k].className += nSbr;
						$(bllt4[k]).removeClass("bracket-line-left-top-r4");
						$(bllm4[m1]).removeClass("bracket-line-left-mid-r4");
						$(bllm4[m2]).removeClass("bracket-line-left-mid-r4");
						$(bllb4[k]).removeClass("bracket-line-left-bot-r4");
						$(blrt4[k]).removeClass("bracket-line-right-top-r4");
						$(blrb4[k]).removeClass("bracket-line-right-bot-r4");
						if($(bllt4[k]).is('*[class*="old"]')){
						}
						else{
						   bllt4[k].className += " oldr4";
						   bllb4[k].className += " oldr4";
						   bllm4[m1].className += " oldr4";
						   bllm4[m2].className += " oldr4";
						   blrt4[k].className += " oldr4";
						   blrb4[k].className += " oldr4";
						}
					}
					for (var k = 0; k < bllt5.length; k++){
						var n = 6 - smallestL;
						var m1 = 2 * k;
						var m2 = 2 * k + 1;
                                                var nSt = " bracket-line-left-top-r" + n.toString();
                                                var nSm = " bracket-line-left-mid-r" + n.toString();
                                                var nSb = " bracket-line-left-bot-r" + n.toString();
                                                var nStr = " bracket-line-right-top-r" + n.toString();
                                                var nSbr = " bracket-line-right-bot-r" + n.toString();
						bllt5[k].className += nSt;
						bllm5[m1].className += nSm;
						bllm5[m2].className += nSm;
						bllb5[k].className += nSb;
						blrt5[k].className += nStr;
						blrb5[k].className += nSbr;
						$(bllt5[k]).removeClass("bracket-line-left-top-r5");
						$(bllm5[m1]).removeClass("bracket-line-left-mid-r5");
						$(bllm5[m2]).removeClass("bracket-line-left-mid-r5");
						$(bllb5[k]).removeClass("bracket-line-left-bot-r5");
						$(blrt5[k]).removeClass("bracket-line-right-top-r5");
						$(blrb5[k]).removeClass("bracket-line-right-bot-r5");
						if($(bllt5[k]).is('*[class*="old"]')){
						}
						else{
						   bllt5[k].className += " oldr5";
						   bllb5[k].className += " oldr5";
						   bllm5[m1].className += " oldr5";
						   bllm5[m2].className += " oldr5";
						   blrt5[k].className += " oldr5";
						   blrb5[k].className += " oldr5";
						}
					}
                 }
                }
                break;
            case "":
            default:
                // Toggle
                for (var j = 0; j < toggles.length; j++)
                    toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                break;
        }
    }
}

window.createTogglerLink = function(toggler, id)
{
    var toggle = document.createElement("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute('id', 'toggler' + id);
    toggle.setAttribute('href', 'javascript:toggler("' + id + '");');
    var child = (toggler.childNodes[0].nodeName.toLowerCase()=="noscript")?toggler.querySelector(":not(noscript)"):toggler.firstChild;
    toggler.removeChild(child);
    toggle.appendChild(child);
    toggler.insertBefore(toggle, toggler.firstChild);
}

window.toggleInit = function()
{
    var togglerElems = new Array();
    var toggleGroup = new Array();

    // initialize/clear any old information
    togglers = new Array();
    allClasses = new Object();

    // make list of all document classes
    var elems = document.getElementsByTagName("*");
    var numelems = elems.length;
    for (var i = 0; i < elems.length; i++)
    {
        var elem = elems[i];
        if (!elem.className)
            continue;

        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        var elemClasses = elem.className.split(' '); // get list of classes
        for (var j = 0; j < elemClasses.length; j++)
        {
            var elemClass = elemClasses[j];
            if (! allClasses[elemClass])
                allClasses[elemClass] = new Array();
            allClasses[elemClass].push(elem);

            // all the special classes begin with _toggle
            if (elemClass.substring(0, 7) != "_toggle")
                continue;

            if (elemClass == "_togglegroup")
                toggleGroup = new Array();
            else if (elemClass == "_toggle")
                toggleGroup.push(elem);
            else if (elemClass.substring(0, 12) == "_toggle_init")
            {
                // set initial value for display (ignore the original CSS set value)
                // understands _toggle_initshow and _toggle_inithide
                var disp = elemClass.substring(12);
                if (disp == "show")
                    elem.style.display = '';
                else if (disp == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring(0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    togglers[togglerID] = new Array();
                    togglerElems[togglerID] = elem;
                }

                // all classes are of form _toggler_op-CLASS
                // figure out what class we're toggling
                // if none is specified, then we use the current toggle group
                var toBeToggled;
                var hyphen = elemClass.indexOf('-');
                if (hyphen != -1)
                    toBeToggled = elemClass.substring(hyphen+1);
                else
                {
                    toBeToggled = toggleGroup;
                    hyphen = elemClass.length;
                }

                var op = elemClass.substring(8, hyphen);
                togglers[togglerID].push(new Array(op, toBeToggled));
            }
        }
    }

    // add javascript links to all toggler elements
    for (var i = 0; i < togglerElems.length; i++)
        createTogglerLink(togglerElems[i], i);
}


$(toggleInit);