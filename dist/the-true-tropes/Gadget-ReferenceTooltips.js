// See [[mw:Reference Tooltips]]
// Source https://en.wikipedia.org/wiki/MediaWiki:Gadget-ReferenceTooltips.js

window.pg || $(document).ready( function($) {

    // Make sure we are in article, project, or help namespace
    if ( $.inArray(mw.config.get('wgCanonicalNamespace'), [ "", "Project", "Help", "Draft" ]) !== -1 ) {
		mw.messages.set( {
			"RT-enable" : "Enable Reference Tooltips",
			"RT-disable" : "Disable Reference Tooltips",
			"RT-disablenote" : "Once disabled, Reference Tooltips can be re-enabled using a link in the footer of the page.",
			"RT-delay" : "Delay before the tooltip appears (in milliseconds): ",
			"RT-activationmethod" : "Tooltip is activated by:",
			"RT-hovering" : "hovering",
			"RT-clicking" : "clicking",
			"RT-options" : "Reference Tooltips options",
			"RT-options-save" : "Save settings",
			"RT-settings" :"Tooltip settings"
		} );
        function toggleRT(o){
            mw.loader.using("jquery.cookie",function(){
                    $.cookie("RTsettings",o+"|"+ settings[1] + "|" + settings[2], {path:"/",expires:90});
                    location.reload();
            });
        }
        var settings = document.cookie.split("RTsettings=")[1];
        settings = settings ? settings.split(";")[0].split("%7C") : [1, 200, +("ontouchstart" in document.documentElement)];
        if( settings[0] == 0 ) {
            var footer = $("#footer-places, #f-list");
            if( footer.length === 0 ) {
                    footer = $("#footer li").parent();
            }
            footer.append($("<li>").append(
            	$("<a>")
            		.text( mw.message( "RT-enable" ) )
            		.attr("href","javascript:(function(){})()")
            		.click(function(){toggleRT(1)})
            ));
            return;
        }
        var isTouchscreen = +settings[2],
            timerLength = isTouchscreen ? 0 : +settings[1],
            settingsMenu;
        $(".reference").each( function() {
            var tooltipNode, hideTimer, showTimer, checkFlip = false;
            function findRef( h ){
                    h = h.firstChild; h = h && h.getAttribute && h.getAttribute("href"); h = h && h.split("#"); h = h && h[1];
                    h = h && document.getElementById( h );
                    h = h && h.nodeName == "LI" && h;
                    return h;
            }
            function hide( refLink ) {
                    if( tooltipNode && tooltipNode.parentNode == document.body ) {
                            hideTimer = setTimeout( function() {
                                    $(tooltipNode).animate({opacity: 0}, 100, function(){ document.body.removeChild( tooltipNode ) });
                            }, isTouchscreen ? 16 : 100);
                    } else {
                            $( findRef( refLink ) ).removeClass("RTTarget");
                    }
            }
            function show(){
                    if( !tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11 ){
                            document.body.appendChild( tooltipNode );
                            checkFlip = true;
                    }
                    $(tooltipNode).stop().animate({opacity: 1}, 100);
                    clearTimeout( hideTimer );
            }
            function openSettingsMenu(){
                    if( settingsMenu ) {
                            settingsMenu.dialog( "open" );
                    } else {
                            settingsMenu = $("<form>")
                            	.append(
                                    $("<button>").css("width","100%").text( mw.msg( "RT-disable", mw.user ) ).button().click(function(){toggleRT(0)}),
                                    $("<br>"),
                                    $("<small>").text( mw.msg( "RT-disablenote") ),
                                    $("<hr>"),
                                    $("<label>").text( mw.msg( "RT-delay" ) ).append($("<input>").attr({"type":"number","value":settings[1],step:50,min:0,max:5000})),
                                    $("<br>"),
                                    $("<span>").text( mw.msg( "RT-activationmethod", mw.user ) ),
                                    $("<label>").append(
                                            $("<input>").attr({"type":"radio", "name":"RTActivate", "checked":settings[2]==0&&"checked", "disabled":"ontouchstart" in document.documentElement&&"disabled"}),
                                            mw.msg( "RT-hovering", mw.user )
                                    ),
                                    $("<label>").append(
                                            $("<input>").attr({"type":"radio", "name":"RTActivate", "checked":settings[2]==1&&"checked"}),
                                            mw.msg( "RT-clicking", mw.user )
                                    )
                            	)
                            .submit(function(e){e.preventDefault()})
                            .dialog({
                            	modal:true,
                            	width:500,
                            	title: mw.msg( "RT-options" ),
                            	buttons:[ { text: mw.msg( "RT-options-save", mw.user ), click: function(){
                                    var a = this.getElementsByTagName("input"),
                                            b = +a[0].value;
                                    $.cookie("RTsettings","1|"+ (b > -1 && b < 5001 ? b : settings[1]) + (a[1].checked ? "|0" : "|1"), {path:"/",expires:90});
                                    location.reload();
                            	}}]
                            });
                    }
            }
            $(this)[ isTouchscreen ? 'click' : 'hover' ](function( e ){
                    var _this = this;
                    if( isTouchscreen ) {
                            e.preventDefault();
                            (tooltipNode && tooltipNode.parentNode == document.body) || setTimeout( function(){
                                    $( document.body ).on("click touchstart", function( e ) {
                                            e = e || event;
                                            e = e.target || e.srcElement;
                                            for( ; e && !$( e ).hasClass( "referencetooltip" ) ; )
                                                    e = e.parentNode;
                                            if( !e ){
                                                    clearTimeout( showTimer );
                                                    hide( _this );
                                                    $(document.body).off("click touchstart", arguments.callee);
                                            }
                                    });
                            }, 0);
                    }
                    hideTimer && clearTimeout( hideTimer );
                    showTimer && clearTimeout( showTimer );
                    showTimer = setTimeout( function() {
                            var h = findRef( _this );
                            if( !h ){return}
                            var windowTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                                    hOffsetTop = $( h ).offset().top;
                            if( !isTouchscreen && windowTop < hOffsetTop && windowTop + $(window).height() > hOffsetTop + h.offsetHeight ) {
                                    $( h ).addClass("RTTarget");
                                    return;
                            }
                            if(!tooltipNode){
                                    tooltipNode = document.createElement("ul");
                                    tooltipNode.className = "referencetooltip";
                                    var c = tooltipNode.appendChild( $( h ).clone( true )[ 0 ] );
                                    try {
                                            if( c.firstChild.nodeName != "A" ) {
                                                    while( c.childNodes[1].nodeName == "A" && c.childNodes[1].getAttribute( "href" ).indexOf("#cite_ref-") !== -1 ) {
                                                            do { c.removeChild( c.childNodes[1] ) } while ( c.childNodes[1].nodeValue == " " );
                                                    }
                                            }
                                    } catch (e) { mw.log(e) }
                                    c.removeChild( c.firstChild );
                                    $( tooltipNode.firstChild.insertBefore( document.createElement( "span" ), tooltipNode.firstChild.firstChild ) ).addClass("RTsettings").attr("title", mw.msg( "RT-settings" )).click(function(){
                                            mw.loader.using(["jquery.cookie","jquery.ui.dialog"], openSettingsMenu);
                                    });
                                    tooltipNode.appendChild( document.createElement( "li" ) );
                                    isTouchscreen || $(tooltipNode).hover(show, hide);
                            }
                            show();
                            var o = $(_this).offset(), oH = tooltipNode.offsetHeight;
                            $(tooltipNode).css({top: o.top - oH, left: o.left - 7 });
                            if( tooltipNode.offsetHeight > oH ) { // is it squished against the right side of the page?
                                    $(tooltipNode).css({left:'auto',right:0});
                                    tooltipNode.lastChild.style.marginLeft = (o.left - tooltipNode.offsetLeft) + "px";
                            }
                            if( checkFlip ) {
                                    if( o.top < tooltipNode.offsetHeight + ( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 ) ) { // is part of it above the top of the screen?
                                            $(tooltipNode).addClass("RTflipped").css({top: o.top + 12});
                                    } else if( tooltipNode.className === "referencetooltip RTflipped" ) { // cancel previous
                                            $(tooltipNode).removeClass("RTflipped");
                                    }
                                    checkFlip = false;
                            }
                    }, timerLength);
            }, isTouchscreen ? undefined : function(){clearTimeout(showTimer); hide(this); } );
 
        } );
        
    }

} );