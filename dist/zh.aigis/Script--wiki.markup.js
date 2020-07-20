/**
* __NOWYSIWYG__
* [[Category:Script|{{SUBPAGENAME}}]]
**/

$('span.external, div.external')
    .find('a.external, a.text, a.mw-redirect, a.title, a[href*="User:"]')
    .add('#WikiaArticle a.external, a.extiw, a.exitstitial')
        .addClass('external')
    .add('#RelatedForumDiscussion a')
    /*
    .add('#WikiaRandomWiki, #SPOTLIGHT_FOOTER')
    .add('.wikia-logo, .global-footer a, .hub-link, .hub-links a')
    */
        .attr('target', '_blank')
;

/*
$('#RelatedForumDiscussion a').attr('target', '_blank');

$('a.extiw').addClass('external').attr('target', '_blank');
*/

$('.infobox .editsection a').html('<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite edit-pencil" alt="Edit">');

$('.link-rewrite').each(function(){
	var _this = $(this);
	var _new = _this.data('link');
	
	if (_new)
	{
		_this.find('> a:first').attr('href', _new);
	}
});