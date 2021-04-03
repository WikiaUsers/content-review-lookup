// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var editLinkPre = 'http://terraria-fr.gamepedia.com/index.php?title=';
$('li[class^="mw-line"] a[href$="&action=history"]').each(function(){
	var $this = $(this);
	var receditTitle = $this.siblings('.mw-title').find('a.mw-changeslist-title').attr('title');
	if ($this.siblings('abbr.newpage').length < 1){
		var receditDiff = $this.siblings('a[href*="&diff="]').attr('href');
		var receditUndo = receditDiff
			.replace(/&curid=.*?&/, '&')
			.replace(/&diff=/, '&undo=')
			.replace(/&oldid=/, '&undoafter=');
		var receditUndoLink = '<a title="Annuler cette modification" href="' + receditUndo + '&action=edit">undo</a>';
	}
	var receditEditLink = '<a title="Modifier '+ receditTitle +'" href="' + editLinkPre + receditTitle + '&action=edit">edit</a>';
	$this.after(' <b>|</b> ' + (($this.siblings('abbr.newpage').length < 1) ? receditUndoLink + ' | ' : '') + receditEditLink);
});