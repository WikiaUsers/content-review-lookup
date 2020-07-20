// I want to put stuff directly beneath the infobox! :@
// 6 Jan 13 - this seemed to be interfering with Infobox Extensions
//$(".infobox").wrap('<div class="infoboxcolumn" style="float:right" />');
//$(".underinfobox").appendTo(".infoboxcolumn");
 
// Marquee text, might come in handy for main page announcements
//$('div.marquee').wrapInner('<marquee />').show();
 
$(".scenes.list ol").find("ol, ul, dl").remove();
$(".scenes.list+.alt-text").hide();
$(".scenes.list").show();
 
function RepeatText(text, times) {
    return (new Array(times + 1)).join(text);
}
 
if ( $("table.scenes").length && $("div.scenes.db").length ) {
 
    $("div.scenes.db>ol").addClass("master");
    $db = $("div.scenes.db").eq(0).clone();  
    scenecount = $("ol.master>li", $db).length;
 
    $("table.scenes").each( function() {
        col = $("tr:first-child th", this).length;
        rowstring = '<tr>'+ RepeatText('<td></td>',col) + '</tr>';
        $(this).append( RepeatText(rowstring, scenecount) );
 
        // applying header classes to cells, one column at a time
        for (j=1; j <= col; j++) {
            $( "td:nth-child(" +j+ ")", this).attr("class", $( "th:nth-child(" +j+ ")", this).attr("class") );
        }
 
        $(this).append( '<tr><td colspan=4> <i>List retrieved from the <a href="/wiki/Thread:8200"><b>Grand Unified Downfall Scenes Database.</b></a></i> </td></tr>' );
    });
 
    $("ol.master>li", $db).each( function() {
        idx = $(this).index()+1;
        $desc = $("ul",this);
        // notes = $("dt",this).text();
        $link = $("dd a",this);
        id = $("ol>li", this); // haven't figured out how to use this
        $("ul, dl, ol", this).remove();
        scenename = $(this).html();
 
        $row = $("table.scenes tr").eq(idx);
        $("td.index", $row).text(idx);
        $("td.name", $row).html(scenename);
        $("td.desc", $row).prepend($desc);
        // $("td.notes", $row).append(<i>notes</i>);
        $("td.links", $row).html( $link );
        $("td.links a", $row).wrap("<li></li>");
        $("td.links", $row).wrapInner("<ul></ul>");
    });
}