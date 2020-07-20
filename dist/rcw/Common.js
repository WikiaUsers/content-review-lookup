$(document).ready(function() {
    
    $("#mw-content-text").prepend("<div style='clear:both'></div>");
    
    $(".wikia-gallery").removeClass().addClass("wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-small wikia-gallery-border-none wikia-gallery-captions-center wikia-gallery-caption-size-medium");

    var matches = window.location.href.match(/wpForReUpload/);
     
    if( matches && matches.length ) {
        function noop() { /* do nothin' */ }
    } else {
        $("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-HTMLTextAreaField td.mw-input textarea#wpUploadDescription").html("{{File info\n|description = \n|source      = \n|author      = \n|licensing   = \n}}\n\n[[Category:]]");
     
        $("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
    }

    var generateToc = {
        new_canon: function() {
            var ToC =
                "<nav class='toc'>" +
                    "<div id='toctitle'>" +
                        "<h2>Contents</h2>" +
                        "<span class='toctoggle'>" +
                            "<a href='#' class='internal' id='togglelink' data-show='show' data-hide='hide'>" +
                                "[show]" +
                            "</a>" +
                        "</span>" +
                    "</div>" +
                    "<ol>";
 
            var newLine, el, title, link;
 
            $("#mw-content-text > #at-page > #at-content-new .mw-headline").each(function() {
                el = $(this);
                title = el.text();
                link = "#" + el.attr("id");
                var tocLevel;
 
                if( $(this).parent().is("h2") ) {
                    tocLevel = "2";
                } else if( $(this).parent().is("h3") ) {
                    tocLevel = "3";
                } else if( $(this).parent().is("h4") ) {
                    tocLevel = "4";
                } else if( $(this).parent().is("h5") ) {
                    tocLevel = "5";
                }
 
                newLine =
                    "<li class='toclevel-" + tocLevel + "'>" +
                        "<a href='" + link + "' rel='nofollow'>" +
                            title +
                        "</a>" +
                    "</li>";
 
                ToC += newLine;
            });
 
            ToC +=
                    "</ul>" +
                "</nav>";
 
            $("#mw-content-text > #at-page > #at-content-new > p:first-child").after(ToC);
        },
 
        old_canon: function() {
            var nToC =
                "<nav class='toc'>" +
                    "<div id='toctitle'>" +
                        "<h2>Contents</h2>" +
                        "<span class='toctoggle'>" +
                            "<a href='#' class='internal' id='togglelink' data-show='show' data-hide='hide'>" +
                                "[show]" +
                            "</a>" +
                        "</span>" +
                    "</div>" +
                    "<ol>";
 
            var nnewLine, nel, ntitle, nlink;
 
            $("#mw-content-text > #at-page > #at-content-canon .mw-headline").each(function() {
                nel = $(this);
                ntitle = nel.text();
                nlink = "#" + nel.attr("id");
 
                var nparent = $(this)[0].parentElement;
                var ntagName = parent.tagName;
                var ntocLevel;
 
                if( $(this).parent().is("h2") ) {
                    ntocLevel = "2";
                } else if( $(this).parent().is("h3") ) {
                    ntocLevel = "3";
                } else if( $(this).parent().is("h4") ) {
                    ntocLevel = "4";
                } else if( $(this).parent().is("h5") ) {
                    ntocLevel = "5";
                }
 
                nnewLine =
                    "<li class='toclevel-" + ntocLevel + "'>" +
                        "<a href='" + nlink + "' rel='nofollow'>" +
                            ntitle +
                        "</a>" +
                    "</li>";
 
                nToC += nnewLine;
            });
 
            nToC +=
                    "</ul>" +
                "</nav>";
 
            $("#mw-content-text > #at-page > #at-content-canon > p:first-child").after(nToC);
        }
    };
 
    $("#toc.toc").empty().remove();
 
    function toggleLabelShowHide() {
        if($(".toc").hasClass("show")) {
            $(".toc .toctoggle #togglelink").html("[hide]");
        } else {
            $(".toc .toctoggle #togglelink").html("[show]");
        }
    }
 
	if( !($("#toc.toc").length) ) {
	    generateToc.new_canon();
	    generateToc.old_canon();
 
	    $(".toc").addClass("show");
 
        toggleLabelShowHide();
 
	    $(".toc .toctoggle #togglelink").on("click", function() {
	       $(".toc").toggleClass("show");
	       toggleLabelShowHide();
	    });
	}
 
	$("#at-label-new").on("click", function() {
		$(this).removeClass("inactive");
		$("#at-content-new").removeClass("inactive");
		$("#at-label-canon").addClass("inactive");
		$("#at-content-canon").addClass("inactive");
 
		$.cookie("state", 0, { expires: 365 * 10, path: '/' });
	});
 
	$("#at-label-canon").on("click", function() {
		$(this).removeClass("inactive");
		$("#at-content-canon").removeClass("inactive");
		$("#at-label-new").addClass("inactive");
		$("#at-content-new").addClass("inactive");
 
		$.cookie("state", 1, { expires: 365 * 10, path: '/' });
	});
 
	var default_active_label, default_active_content, default_inactive_label, default_inactive_content;
 
	if( $.cookie("state") == 1 ) {
		default_active_label = "#at-label-canon";
		default_active_content = "#at-content-canon"
		default_inactive_label = "#at-label-new";
		default_inactive_content = "#at-content-new";
	} else if( $.cookie("state") == 0 ) {
		default_active_label = "#at-label-new";
		default_active_content = "#at-content-new"
		default_inactive_label = "#at-label-canon";
		default_inactive_content = "#at-content-canon";
	}
 
	$(default_active_label).removeClass("inactive");
	$(default_active_content).removeClass("inactive");
	$(default_inactive_label).addClass("inactive");
	$(default_inactive_content).addClass("inactive");
	
	$("#at-page").fadeIn(200);
	
});