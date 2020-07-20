// <source lang="JavaScript">
 
// Restore Special:Random & Special:RecentChanges
// from User:Rappy 4187
 
$(function addEditorButtons() {
  if ($('.checkboxes').length) {
    $('<div style="margin: 0; padding: 0" id="WikiHeader" class="WikiHeader"><div class="buttons" style="float: right; position: relative; right: 0; bottom: 0"><a data-id="randompage" class="wikia-button secondary" accesskey="x" title="Random Page" href="/wiki/Special:Random"><img width="0" height="0" class="sprite random" src="' + wgBlankImgUrl + '"> Random Page</a><a data-id="wikiactivity" style="margin-left: 10px" class="wikia-button secondary" accesskey="g" title="Recent Changes" href="/wiki/Special:RecentChanges"><img width="0" height="0" src="' + wgBlankImgUrl + '" class="sprite activity">Recent Changes</a></div></div>').insertBefore('.checkboxes');
    liveClock();
    $('#utcdate').css('marginTop','0');
  }
});
 
// END Restore Special:Random & Special:RecentChanges
 
// </source>