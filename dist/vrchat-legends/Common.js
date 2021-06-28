/* Adds Template:Editing notice to encourage Visual mode users to use Source mode for advanced features */
$(function() {
	if (mw.config.get('wgNamespaceNumber') === 0) {
        $editLinks = $('a#ca-ve-edit,a.mw-editsection-visualeditor');
        $editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:Editing');
	}
});