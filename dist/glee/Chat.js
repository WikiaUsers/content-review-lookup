//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Glee Wiki chat. • <a href="/wiki/Glee_Wiki_Policies" target="_blank" title="Glee_Wiki_Policies" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/Glee_Wiki_Chat_Mods" target="_blank" title="Glee_Wiki_Chat_Mods" style="position:relative;text-decoration:underline;">Chat Mods</a> <br /> It is compulsory that you make an edit before entering, this can include a comment on an <a href="/wiki/Season_Six#WikiaArticleComments" target="_blank" title="Season_Six#WikiaArticleComments" style="position:relative;text-decoration:none;">article</a> or an edit to your <a href="/wiki/User:'+wgUserName+'" target="_blank" title="User:'+wgUserName+'" style="position:relative;text-decoration:none;">user page</a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// mark admins in chat
setInterval(function () {
        $('#Rail .User.chat-mod:not(.admin) .username').each(function() {
                // this is to differentiate the admins from the chat mods. Add chat mods to this
                // @example /chatmod1|chatmod2|chatmod3/
                if (!this.innerHTML.match(/Asian Persuasion|AudreyHepburnfan|BeccaToBe|BitchTookMyPillow|Blittany|EXO-M|ItAllRevolvesAroundKlaine|QuickForeverr|REBƎLReloaded|RiseAgainsT|TheFemaleBoss|/)) {
                        $(this).parent().addClass('admin');
                }
        });
}, 1000)