/* Add powerusers checkbox to Special:Listuers */
if (wgCanonicalSpecialPageName == "Listusers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span> <span style="padding-bottom:5px;">Power Users</span></label></td>');

if ($(".WikiaPageHeaderDiffHistory").length && $(".wikia-button[data-id=edit]").length) {
    /* change the "edit" link of a diff page to edit the current version, as there is already an edit link for both diffs */
    oldhref = $(".wikia-button[data-id=edit]").attr("href");
    var newhref = oldhref.split("&oldid=")[0];
    $(".wikia-button[data-id=edit]").attr("href", newhref);
}
/* Add Last Diff link to Edit Drop-down */
/* Pop-up from QuickDiff */
if (!$("#ca-diff").length && $("a[data-id='history']").closest("ul").length) { //adapted from NullEditButton script
    $("a[data-id='history']").closest("ul").prepend($('<li>').html(
        $('<a/>').attr({
            href: $("li>a[data-id=history]").attr("href").replace("action=history", "diff=cur"),
            accesskey: "0",
            id: "ca-diff",
            title: "Xem nhanh lịch sử của " + mw.config.get('wgPageName')
        }).text("Quick History")
    ));
}

$(function() {
  //Fix issue first reported in 2012. http://community.wikia.com/wiki/User_blog:DaNASCAT/Technical_Update:_April_24,_2012#comm-378194
  if($("#mw-imagepage-nofile").length && !$("#filelogs").length) {
    $("#mw-imagepage-nofile").append("<div id='filelogs'></div>");
    $.getJSON('/api.php', {
	'action': 'query',
	'list': "logevents",			
	'format': "json",
	'leprop':"timestamp|user|type|parsedcomment|details",
	'letitle': wgPageName,
    }, function( data ) {
        if (!$("#filelogs:empty").length) return; //redundant race condition check
        $("#filelogs").append($("#ca-undelete")); //copy existing undelete link

	for (i in data.query.logevents) {
	  $("#filelogs").append("<br />"+data.query.logevents[i].timestamp+" - "+data.query.logevents[i].action+"/"+data.query.logevents[i].type+" - "+data.query.logevents[i].user);
          if (data.query.logevents[i].parsedcomment) $("#filelogs").append(" - "+data.query.logevents[i].parsedcomment);
          if (data.query.logevents[i].move) $("#filelogs").append(" : <a href='./"+escape(data.query.logevents[i].move.new_title)+"'>"+data.query.logevents[i].move.new_title+"</a>");
    	}
    });
  }
});

//Add extra classes
//For some creating ebook addon
$(document).ready(function() {
    $(".wikia-gallery, .header-tally, #toctitle, a.new").addClass("print-no dotEPUBremove entry-unrelated");
});

$(function() {
    //Display count at the top of unordered lists on special pages for easier counting (whatlinkshere, unusedfiles, and others.)
    $(".ns-special .WikiaArticle ul:not(.counted)").each(function() {
        if ($(">li", this).size() != 50 && $(">li", this).size() != $("input[name=limit]").attr("value") && $(">li", this).size() > 15) $(this).addClass("counted").before("<p>Displaying " + $(">li", this).size() + "</p>");
    });
    //When using ?useskin= on an edit page, return to the same skin upon submit.
    //Only functional on preview and show changes in monobook, since publish results in a "302 Found" redirect.
    if (mw.util.getParamValue('useskin') && $("#editform").length) $("#editform").attr("action", $("#editform").attr("action") + "&useskin=" + mw.util.getParamValue('useskin'));

    /* Add countdown to cached special pages.  Uses some of /countdown.js  */
    if (wgNamespaceNumber == -1) {
        var datestring = $('*:contains("The following data is cached, and was last updated")');
        if (datestring.length && !$("#UpdateCountdown").length) {
            founddate = datestring[datestring.length - 1].innerHTML.match(/updated (.*). A/)[1];
            now = new Date();
            now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            then = new Date(founddate.split(",")[1] + founddate.split(",")[2] + " " + founddate.split(",")[0]);
            next = new Date(then.getTime() + (24 * 60 * 60000));
            diff = count = Math.floor((next.getTime() - now_utc.getTime()) / 1000);
            if (diff > 0) {
                var left = (diff % 60) + 's';
                diff = Math.floor(diff / 60);
                if (diff > 0) left = (diff % 60) + 'm ' + left;
                diff = Math.floor(diff / 60);
                if (diff > 0) left = (diff % 24) + 'h ' + left;
                diff = Math.floor(diff / 24);
                if (diff > 0) left = diff + ' days ' + left;
                $(datestring[datestring.length - 1]).append("<div id='UpdateCountdown'>Time left until next update: " + left + "</div>");
            }
        }
    } //end special pages countdown
});