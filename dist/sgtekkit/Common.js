/* Any JavaScript here will be loaded for all users on every page load. */

/** Infobox collapsing script **/
$(".infoboxBlockImage img").each(function(){
	width = parseInt($(this).attr("width"), 10);
	if(width > 240){
		$(this).attr("height","");
		$(this).attr("width","240");
	}
});
$(".infobox:not(.infoboxNoCollapse) td").each(function(){
	if($(this).html().match(/{{{[^}]+}}}/)) $(this).parent("tr").hide()
});
$(".infobox:not(.infoboxNoCollapse) .infoboxSubsectionBreak").each(function(){
	flag = true;
	next = $(this).next();
	while(next && next != undefined && next.html() != undefined && !next.hasClass("infoboxSubsectionBreak") && !next.hasClass("infoboxSectionHeader")){
		if(next.css("display") != "none") flag = false;
		//console.info(next.html());
		next = next.next();
	}
	//console.info(flag);
	if(flag) $(this).hide();
});
$(".infobox:not(.infoboxNoCollapse) tr.infoboxSectionHeader").each(function(){
	flag = true;
	next = $(this).next();
	while(next && next != undefined && next.html() != undefined && !next.hasClass("infoboxSectionHeader")){
		if(next.css("display") != "none") flag = false;
		//console.info(next.html());
		next = next.next();
	}
	//console.info(flag);
	if(flag) $(this).hide();
});

/** Ore dict testing script **/
if($(".OreDictTestingScriptsOutput").length){
	notices = 0;
	errs = 0;
	warns = 0;
	$(".gridContainer .gridImage").each(function(){
		tgt = "";
		if($(this).children("span").children("a.new").length){
			warns++;
			tgt = $(this).children("span").children("a.new").attr("href").match(/\/index.php\?title=([^&]+)&action=edit&redlink=1/);
			if(tgt != null) {
				tgt = tgt[1];
				tgt = tgt.replace(/_/g," ");
				$(".OreDictTestingScriptsOutput").append("<span style=\"color:orange; font-weight:bold;\">WARNING:</span> Link to a non-existent article: <b>"+tgt+"</b>\n");
			} else {
				$(".OreDictTestingScriptsOutput").append("<span style=\"color:orange; font-weight:bold;\">WARNING:</span> Link to a non-existent article: <b>"+$(this).children("span").children("a.new").attr("href")+"</b>\n");
				errs++;
				$(".OreDictTestingScriptsOutput").append("<span style=\"color:red; font-weight:bold;\">ERROR:  </span> Unexpected error.\n");
			}
		} else {
			if($(this).children("a:not(.new)").length)
				tgt = $(this).children("a:not(.new)").attr("href").match(/\/(.+)/);
			else {
				errs++;
				$(".OreDictTestingScriptsOutput").append("<span style=\"color:red; font-weight:bold;\">ERROR:  </span> Unexpected error.\n");
			}
			if(tgt != null) tgt = tgt[1];
			else {
				notices++;
				$(".OreDictTestingScriptsOutput").append("<span style=\"color:blue; font-weight:bold;\">NOTICE: </span> Link overriden to none.\n");
			}
		}
		itemName = $(this).find(".gridTooltipInner").html().match(/Variable 1: ([^<]+)/);
		itemMod = $(this).find(".gridTooltipInner").html().match(/Variable 3: ([^<]+)/);
		if(itemName != null) itemName = itemName[1];
		if(itemMod != null) itemMod = itemMod[1];
		if(itemName == null){
			warns++;
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:orange; font-weight:bold;\">WARNING:</span> Tooltip text overridden!\n");
		}
		if(itemMod == null) expected = itemName;
		else expected = itemName+" ("+itemMod+")";
		if(tgt != null) tgt = tgt.replace(/_/g," ");
		if(expected != tgt) {
			notices++;
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:blue; font-weight:bold;\">NOTICE: </span> Link overridden from <b>"+expected+"</b> to <b>"+tgt+"</b>!\n");
		}
		if($(this).children("a.new").length){
			errs++;
			filename = $(this).children("a.new").attr("href").match(/\/index\.php\?title=Special:Upload&wpDestFile=(.+)/);
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:red; font-weight:bold;\">ERROR:  </span> Missing file: <b>File:"+filename[1]+"</b>\n");
		}
		if(!$(this).hasClass("testingClass")){
			warns++;
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:orange; font-weight:bold;\">WARNING:</span> Image class overridden not appended!\n");
		}
		if(!$(this).find(".tooltip").hasClass("testingClass")){
			warns++;
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:orange; font-weight:bold;\">WARNING:</span> Image class overridden not appended!\n");
		}
		if($(this).find(".gridNumber a, .gridNumber span").html() != "8"){
			errs++;
			$(".OreDictTestingScriptsOutput").append("<span style=\"color:red; font-weight:bold;\">ERROR:  </span> Item count overridden!\n");
		}
	});
	if(errs + warns == 0) $(".OreDictTestingScriptsOutput").append("Done. <b>"+notices+"</b> <span style=\"color:blue;\">notices,</span> <span style=\"color:green\">no warnings</span>, <span style=\"color:green\">no errors</span>.");
	else $(".OreDictTestingScriptsOutput").append("Done. <b>"+notices+"</b> <span style=\"color:blue;\">notices</span>, <b>"+errs+"</b> <span style=\"color:red; font-weight:bold;\">errors</span>, <b>"+warns+"</b> <span style=\"color:orange; font-weight:bold;\">warnings</span>.");
}

// Remove title from grid links
$(".gridImage .gridNumber a").removeAttr("title");

/** Langbar **/
$(".langbarLink").children("a.new").parent(".langbarLink").hide();

/** Tanks **/
/** Resize clip parent **/
$(".tankClip").each(function(e){
	$(this).parent("div").height($(this).children("img").height()).width($(this).children("img").width());
});
/** Clip tank image **/
$(".gridTankContainer").each(function(){
	// Tile liquid image
	$(this).find(".tankLiquidImage").each(function(){
		imglink = $(this).find("img").attr("src");
		$(this).find("img").hide();
		$(this).css({
			backgroundImage: 'url(' + imglink + ')',
			backgroundRepeat: 'repeat'
		});
	});
	$(this).find(".tankLiquidImage").height($(this).height());
	$(this).find(".tankLiquidImage").width($(this).width());
	$(this).find(".tankLiquidImageContainer").height($(this).height());
	$(this).find(".tankLiquidImageContainer").width($(this).width());
	// Get tank info
	max = parseInt($(this).find(".tankMax").html(), 10);
	$(this).find(".tankLiquidImage").each(function(){
		usage = parseInt($(this).find(".tankUsage").html(), 10);
		// Calculate stuff
		if(max == 0) max = 10000;
		height = $(this).height();
		width = $(this).width();
		cliptop = Math.ceil(height/2*(1-usage/max))*2;
		$(this).css("clip","rect("+String(cliptop)+"px auto auto auto)");
		// Replace vars
		tooltip = $(this).parent().find(".gridTooltipInner");
		text = tooltip.html();
		text = text.replace("$2", usage);
		text = text.replace("$3", max);
		tooltip.html(text);
	});
});

/*
* Automatic slide creation in crafting grids.
*/
$(".CraftingGrid").each(function(){
	maxFrames = 0;
	$(this).find(".CraftingGridCell").each(function(){
		frames = $(this).children("span:not(.ignore), div.GridTank:not(.ignore)").length;
		if(frames > maxFrames){
			maxFrames = frames;
		}
		// Initialize cell states
		$(this).children("span:first-child:not(.ignore), div.GridTank:first-child:not(.ignore)").addClass("ActiveSlide");
	});
	if(maxFrames == 1) return;
	// Create crafting grid controls
	$(this).append('<div class="CraftingGridControls" style="position:absolute; bottom:0; width:100%; text-align:center;"><input type="button" value="<" class="prevPage"><span class="pageNum">1</span>/<span class="pageCount">'+String(maxFrames)+'</span><input type="button" value=">" class="nextPage"></div>');
	$(this).height($(this).height() + $(this).children(".CraftingGridControls").height());
	// Implement controls
	$(this).find(".nextPage").click(function(){
		container = $(this).parents(".CraftingGrid");
		container.find(".CraftingGridCell").each(function(){
			if($(this).children(":not(.ignore)").length == 1){
				$(this).removeClass(".CraftingGridCell");
				return 0;
			}
			cur = $(this).find(".ActiveSlide");
			next = cur.next("span:not(.ignore), div.GridTank:not(.ignore)");
			if(next.length == 0){
				next = cur.siblings("span:not(.ignore), div.GridTank:not(.ignore)").first();
			}
			cur.removeClass("ActiveSlide");
			next.addClass("ActiveSlide");
		});
		pageNum = parseInt($(this).siblings("span.pageNum").html(),10) + 1;
		if(pageNum > parseInt($(this).siblings("span.pageCount").html(),10)) pageNum = 1;
		$(this).siblings("span.pageNum").html(pageNum);
	});
	$(this).find(".prevPage").click(function(){
		container = $(this).parents(".CraftingGrid");
		container.find(".CraftingGridCell").each(function(){
			if($(this).children(":not(.ignore)").length == 1){
				$(this).removeClass(".CraftingGridCell");
				return 0;
			}
			cur = $(this).find(".ActiveSlide");
			next = cur.prev("span:not(.ignore), div.GridTank:not(.ignore)");
			if(next.length == 0){
				next = cur.siblings("span:not(.ignore), div.GridTank:not(.ignore)").last();
			}
			cur.removeClass("ActiveSlide");
			next.addClass("ActiveSlide");
		});
		pageNum = parseInt($(this).siblings("span.pageNum").html(),10) - 1;
		if(pageNum == 0) pageNum = parseInt($(this).siblings("span.pageCount").html(),10);
		$(this).siblings("span.pageNum").html(pageNum);
	});
});

/*
* Script for flipping through galleries, intended to be used with crafting grids.
*/

$(".gallery > div, .gallery > span").addClass("page");
$(".gallery").append('<span class="controls"><input type="button" value="<" class="prevPage"><span class="pagenum"></span>/<span class="pagecount"></span><input type="button" value=">" class="nextPage"></span>');
$(".gallery > .page:first-child").addClass("active");
$(".gallery span.controls span.pagenum").html(1);
$(".gallery").each(function(){
	$(this).find("span.pagecount").html($(this).children(".page").length);
});
$(".gallery span.controls input.prevPage").click(function(){
	cur = $(this).parents(".gallery").children(".page.active");
	next = cur.prev(".page");
	if(next.length == 0){
		next = cur.siblings(".page").last();
	} 
	cur.removeClass("active");
	next.addClass("active");
	pageNum = parseInt($(this).siblings("span.pagenum").html(),10) - 1;
	if(pageNum == 0) pageNum = parseInt($(this).siblings("span.pagecount").html(),10);
	$(this).siblings("span.pagenum").html(pageNum);
});
$(".gallery span.controls input.nextPage").click(function(){
	cur = $(this).parents(".gallery").children(".page.active");
	next = cur.next(".page");
	if(next.length == 0){
		next = cur.siblings(".page").first();
	} 
	cur.removeClass("active");
	next.addClass("active");
	pageNum = parseInt($(this).siblings("span.pagenum").html(),10) + 1;
	if(pageNum > parseInt($(this).siblings("span.pagecount").html(),10)) pageNum = 1;
	$(this).siblings("span.pagenum").html(pageNum);
});

/*
* Following tooltips
*/

$(".tooltip").hide();
$(".tooltip").parent().addClass("tooltipParent");
$(".tooltip").parent().mousemove(function(e){
	$(this).children(".tooltip").show();
	$(this).children(".tooltip").css({ position: "absolute", marginLeft: 0, marginTop: 0, top: e.pageY - $(this).offset().top - 5 - $(this).children(".tooltip").outerHeight(true), left: e.pageX - $(this).offset().left + 5});
});
$(".tooltip").parent().mouseout(function(){
	$(this).children(".tooltip").hide();
});

// Remove titles of links inside of siblings of tooltips
$(".tooltipParent").children("a").attr('title','');

/**
 * Element animator (generic animation)
 *
 * Will cycle the active class on any child elements within an element with the animated class.
 */
// Remove from animated class if only one child
$('.animated').each(function(){
    if($(this).children("span, div").length == 1){
        $(this).removeClass("animated");
    }
});
// Add the active class to all of the first child of .animated
$('.animated > span:first-child, .animated > div:first-child').addClass('active');
if ( $( '.animated' ).length ) {
    setInterval( function(e) {
        $( '.animated' ).each( function() {
            var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
            if ( !current.next().length ) {
                next = $( this ).children().eq( 0 );
            }
            next.addClass( 'active' );
        } );
    }, 2000 );
}

/**
 * Pause grid templates with lots of cells in them (e.g. [[Template:Grid/Crafting Table]]) on mouseover
 *
 * This is so people have a chance to look at each image on the cell
 * and click on pages they want to view.
 */
function pauseGrid( grid ) {
    $( grid ).hover( function() { 
        $( this ).find( '.grid .animated' ).removeClass( 'animated' ).addClass( 'paused' );
    }, function() {
        $( this ).find( '.grid .paused' ).removeClass( 'paused' ).addClass( 'animated' );
    } );
}
pauseGrid( '.grid-Crafting_Table' );
pauseGrid( '.grid-Furnace' );
pauseGrid( '.grid-Brewing_Stand' );


/* Any JavaScript here will be loaded for all users on every page load. */
addOnloadHook( function() {
     var pops = function( elems ) {
         for (var i=0; i<elems.length; i++) {
             if ( !(' '+elems[i].className+' ').match( / pops / ) ) continue;
             var anchs = elems[i].getElementsByTagName('a');
             for (var j=0; j<anchs.length; j++) anchs[j].target = '_blank';
         }
     };
     var bc = document.getElementById('bodyContent');
     var tags = ['span', 'div', 'table', 'td', 'th'];
     for (var i=0; i<tags.length; i++) pops( bc.getElementsByTagName( tags[i] ) );
 } );


function ModifySidebar(action, section, name, link) {
    try {
        switch (section) {
          case "languages":
            var target = "p-lang";
            break;
          case "toolbox":
            var target = "p-tb";
            break;
          case "navigation":
            var target = "p-navigation";
            break;
          default:
            var target = "p-" + section;
            break;
        }
 
        if (action == "add") {
            var node = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var aNode = document.createElement('a');
            var liNode = document.createElement('li');
 
            aNode.appendChild(document.createTextNode(name));
            aNode.setAttribute('href', link);
            liNode.appendChild(aNode);
            liNode.className='plainlinks';
            node.appendChild(liNode);
        }
 
        if (action == "remove") {
            var list = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var listelements = list.getElementsByTagName('li');
 
            for (var i = 0; i < listelements.length; i++) {
                if (listelements[i].getElementsByTagName('a')[0].innerHTML == name ||
                    listelements[i].getElementsByTagName('a')[0].href == link) {
 
                    list.removeChild(listelements[i]);
                }
            }
        }
 
    } catch(e) {
      // lets just ignore what's happened
      return;
    }
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
                        Button.setAttribute( 'onClick', "collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        Header.setAttribute( 'onClick', "collapseTable(" + tableIndex + ");" );
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