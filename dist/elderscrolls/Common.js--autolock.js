/* BLOG COMMENTS (30 days)
   Original credit goes to [[User:Joeyaa|Joey Ahmadi]]
   Maintained by [[User:Mathmagician]]
*/
 
$(function () {
    function disableCommenting() {
        if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
            then = new String(then.match(/\d{8}/));
            var monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var year = then.match(/^\d{4}/);
            var month = then.substring(4, 6);
            var now = new Date();
            month--;
            month = monthnames[month];
            var day = then.match(/\d{2}$/);
            then = new Date(month + '' + day + ', ' + year);
            var old = parseInt(now - then);
            old = Math.floor(old / (1000 * 60 * 60 * 24));
            if (old > 30) {
                $('#article-comm-form').attr('disabled', 'disabled');
                $('#article-comm').attr('disabled', 'disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
                $('#article-comm-submit').attr('disabled', 'disabled');
                $('.article-comm-reply .wikia-button .secondary').remove();
            }
        }
    }
 
    if (window.ArticleComments && !ArticleComments.initOverride) {
        ArticleComments.initOverride = ArticleComments.init;
        ArticleComments.init = function () {
            ArticleComments.initOverride();
            disableCommenting();
        };
    }
});

/* FORUM PAGES
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
$( disableOldForumEdit );
}